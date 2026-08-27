// Document Service middlewares docs: https://docs.strapi.io/cms/api/document-service/middlewares#context

import { Core } from '@strapi/strapi'
import { errors } from '@strapi/utils'

const REGULATION_UID = 'api::regulation.regulation'

/** Amendment chains are a few hops long at most; the cap only stops a walk over broken data. */
const MAX_AMENDMENT_DEPTH = 10

/**
 * Relations reach the document service in several shapes - a documentId, an object holding one, an array of either,
 * or a `connect` / `set` wrapper (what the admin panel sends). This flattens all of them to plain documentIds.
 */
const getRelatedDocumentIds = (value: unknown): string[] => {
  if (!value) {
    return []
  }
  if (typeof value === 'string') {
    return [value]
  }
  if (Array.isArray(value)) {
    return value.flatMap((item) => getRelatedDocumentIds(item))
  }
  if (typeof value === 'object') {
    const relation = value as Record<string, unknown>
    if (typeof relation.documentId === 'string') {
      return [relation.documentId]
    }

    return [...getRelatedDocumentIds(relation.connect), ...getRelatedDocumentIds(relation.set)]
  }

  return []
}

type RegulationRelations = {
  documentId: string
  effectiveFrom?: string | null
  amending?: { documentId: string }[] | null
}

/**
 * Read through `db.query` rather than the document service on purpose: the document service would re-enter the whole
 * middleware chain on every hop of the walk, and its generics are deep enough to make editors report TS2589.
 * The draft version is the one being edited, so relations are read from it.
 */
const loadRegulation = async ({
  documentId,
  strapi,
}: {
  documentId: string
  strapi: Core.Strapi
}): Promise<RegulationRelations | null> => {
  const query = {
    select: ['documentId', 'effectiveFrom'],
    populate: { amending: { select: ['documentId'] } },
  }

  const draft = await strapi.db
    .query(REGULATION_UID)
    .findOne({ ...query, where: { documentId, publishedAt: null } })

  return (draft ??
    (await strapi.db
      .query(REGULATION_UID)
      .findOne({ ...query, where: { documentId } }))) as RegulationRelations | null
}

/**
 * Whether `documentId` can be reached by following what `startId` amends. Used to reject a cycle before it is
 * written - a regulation amending a regulation which (directly or through others) amends it back.
 */
const amendsBackTo = async ({
  startId,
  documentId,
  strapi,
  visitedIds = new Set<string>(),
  depth = 0,
}: {
  startId: string
  documentId: string
  strapi: Core.Strapi
  visitedIds?: Set<string>
  depth?: number
}): Promise<boolean> => {
  if (startId === documentId) {
    return true
  }
  if (visitedIds.has(startId) || depth > MAX_AMENDMENT_DEPTH) {
    return false
  }
  visitedIds.add(startId)

  const regulation = await loadRegulation({ documentId: startId, strapi })
  if (!regulation) {
    return false
  }

  for (const amendee of regulation.amending ?? []) {
    // Sequential on purpose - the first hit ends the walk and chains are short.
    // eslint-disable-next-line no-await-in-loop
    if (
      await amendsBackTo({
        startId: amendee.documentId,
        documentId,
        strapi,
        visitedIds,
        depth: depth + 1,
      })
    ) {
      return true
    }
  }

  return false
}

/** Both directions of the amendment relation lead to the same broken shape, so they share the message. */
const CYCLE_MESSAGE =
  'Väzba by vytvorila cyklus - nariadenia by sa dopĺňali navzájom, priamo alebo cez ďalšie nariadenia.'

/**
 * A regulation cannot amend or cancel itself, cannot amend a regulation which became effective later, and cannot
 * close a cycle in the amendment chain.
 *
 * Both sides of each relation are checked, because saving `amendments` on one regulation writes `amending` on the
 * other, and the same holds for `cancelling` / `cancellation`.
 *
 * On create only the rules that do not need the document's own id apply - the dates and the cycle between the
 * regulations named in the payload. Self-reference is impossible there, as there is no id to point at yet.
 *
 * See also patches/strapi-plugin-meilisearch+0.16.5.patch - the meilisearch own document middleware
 * wraps the whole chain in try/catch and used to swallow the error, so the save would silently fail.
 */
export const registerRegulationValidation = ({ strapi }: { strapi: Core.Strapi }) => {
  strapi.documents.use(async (context, next) => {
    if (context.uid !== REGULATION_UID) {
      return next()
    }
    if (context.action !== 'create' && context.action !== 'update') {
      return next()
    }

    // `documentId` is present on update only. A plain type also keeps Strapi's deep param generics out of the way.
    const { documentId, data } = context.params as {
      documentId?: string
      data?: Record<string, unknown>
    }
    if (!data) {
      return next()
    }

    // What this regulation amends, and what amends it - writing one side writes the other.
    const amendeeIds = getRelatedDocumentIds(data.amending)
    const amenderIds = getRelatedDocumentIds(data.amendments)

    if (documentId) {
      if (amendeeIds.includes(documentId) || amenderIds.includes(documentId)) {
        throw new errors.ApplicationError('Nariadenie nemôže byť dodatkom samo k sebe.')
      }

      const cancelsItself =
        getRelatedDocumentIds(data.cancellation).includes(documentId) ||
        getRelatedDocumentIds(data.cancelling).includes(documentId)

      if (cancelsItself) {
        throw new errors.ApplicationError('Nariadenie nemôže zrušiť samo seba.')
      }
    }

    if (amendeeIds.length === 0 && amenderIds.length === 0) {
      return next()
    }

    if (amendeeIds.some((amendeeId) => amenderIds.includes(amendeeId))) {
      throw new errors.ApplicationError(CYCLE_MESSAGE)
    }

    const current = documentId ? await loadRegulation({ documentId, strapi }) : null
    // The payload wins - the date can be edited in the same save.
    const effectiveFrom = (data.effectiveFrom as string | undefined) ?? current?.effectiveFrom

    /* eslint-disable no-await-in-loop */
    for (const amendeeId of amendeeIds) {
      const amendee = await loadRegulation({ documentId: amendeeId, strapi })
      if (!amendee) {
        continue
      }

      if (effectiveFrom && amendee.effectiveFrom && effectiveFrom < amendee.effectiveFrom) {
        throw new errors.ApplicationError(
          `Nariadenie nemôže byť dodatkom k nariadeniu, ktoré nadobudlo účinnosť neskôr (${amendee.effectiveFrom}). Skontrolujte dátumy účinnosti oboch nariadení.`
        )
      }

      // The regulation we are about to amend already leads back to this one...
      if (documentId && (await amendsBackTo({ startId: amendeeId, documentId, strapi }))) {
        throw new errors.ApplicationError(CYCLE_MESSAGE)
      }

      // ...or back to something the same save declares an amendment of this one.
      for (const amenderId of amenderIds) {
        if (await amendsBackTo({ startId: amendeeId, documentId: amenderId, strapi })) {
          throw new errors.ApplicationError(CYCLE_MESSAGE)
        }
      }
    }

    for (const amenderId of amenderIds) {
      const amender = await loadRegulation({ documentId: amenderId, strapi })
      if (!amender) {
        continue
      }

      if (effectiveFrom && amender.effectiveFrom && amender.effectiveFrom < effectiveFrom) {
        throw new errors.ApplicationError(
          `Dodatok nemôže nadobudnúť účinnosť skôr (${amender.effectiveFrom}) ako nariadenie, ktoré dopĺňa. Skontrolujte dátumy účinnosti oboch nariadení.`
        )
      }

      if (
        documentId &&
        (await amendsBackTo({ startId: documentId, documentId: amenderId, strapi }))
      ) {
        throw new errors.ApplicationError(CYCLE_MESSAGE)
      }
    }
    /* eslint-enable no-await-in-loop */

    return next()
  })
}
