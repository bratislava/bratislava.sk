import type { Core } from '@strapi/strapi'
import { GraphqlExtension } from './types'

const REGULATION_UID = 'api::regulation.regulation'

type RegulationRow = {
  id: number
  effectiveFrom?: string | null
  cancellation?: RegulationRow | null
  amending?: RegulationRow[] | null
}

type RegulationRowCache = Map<number, Promise<RegulationRow | null>>

/**
 * The `isCancelled` / `cancelledBy` / `effectiveUntil` resolvers all need the same row, so it's loaded once per
 * regulation per request.
 */
const getRequestCache = (context: any): RegulationRowCache => {
  const state = context?.state
  if (!state) {
    return new Map()
  }
  state.regulationRowCache = state.regulationRowCache ?? new Map()

  return state.regulationRowCache
}

const loadRegulationRow = ({
  id,
  strapi,
  cache,
}: {
  id: number
  strapi: Core.Strapi
  cache: RegulationRowCache
}) => {
  const cached = cache.get(id)
  if (cached) {
    return cached
  }

  // Queried by `id` and not by `documentId` on purpose - it keeps us on the same draft/published version as the parent.
  const row = strapi.db.query(REGULATION_UID).findOne({
    where: { id },
    populate: {
      cancellation: true,
      amending: { populate: { cancellation: true } },
    },
  }) as Promise<RegulationRow | null>

  cache.set(id, row)

  return row
}

/**
 * Amendments can themselves be amended - a regulation is often both a standalone regulation and an amendment of
 * another one (e.g. VZN 13/2012 "o miestnom poplatku ... a o zmene a doplnení VZN 12/2001") - so the amendment chain
 * is walked to its end. Depth is only capped as a safety net; the longest real chain is a few hops.
 */
const MAX_AMENDMENT_DEPTH = 10

/**
 * The cancellation which ended the regulation with the given `id`, or null if it is still in force.
 *
 * A regulation is cancelled directly, or - being an amendment - when everything it amends is cancelled. An amendment
 * lives inside the regulations it amends, so as long as one of them is in force, part of the amendment still applies
 * and the amendment is not cancelled. Once all of them are gone, the one which went last is the day the amendment
 * stopped having any effect.
 *
 * A cancellation by the regulation we started from (`rootId`) doesn't count - a regulation cancelling something it
 * also amends does not cancel itself.
 */
const resolveCancellation = async ({
  id,
  rootId,
  strapi,
  cache,
  visitedIds,
  depth = 0,
}: {
  id: number
  rootId: number
  strapi: Core.Strapi
  cache: RegulationRowCache
  visitedIds: Set<number>
  depth?: number
}): Promise<RegulationRow | null> => {
  if (visitedIds.has(id) || depth > MAX_AMENDMENT_DEPTH) {
    return null
  }

  const regulation = await loadRegulationRow({ id, strapi, cache })
  if (!regulation) {
    return null
  }
  if (regulation.cancellation) {
    return regulation.cancellation.id === rootId ? null : regulation.cancellation
  }

  const amendees = regulation.amending ?? []
  if (amendees.length === 0) {
    return null
  }

  const cancellations = await Promise.all(
    amendees.map((amendee) =>
      resolveCancellation({
        id: amendee.id,
        rootId,
        strapi,
        cache,
        // A copy per branch, so that a regulation shared by two branches doesn't get skipped in the second one.
        visitedIds: new Set([...visitedIds, id]),
        depth: depth + 1,
      })
    )
  )
  if (cancellations.some((cancellation) => !cancellation)) {
    return null
  }

  return cancellations.reduce((latest, cancellation) =>
    (cancellation.effectiveFrom ?? '') > (latest.effectiveFrom ?? '') ? cancellation : latest
  )
}

/**
 * The regulation cancelling the one with the given `id`, or null if it isn't cancelled. A direct cancellation always
 * wins; otherwise the amendment chain decides, see resolveCancellation. A cancellation which took effect before this
 * regulation did is ignored - it says nothing about the validity of a regulation which didn't exist yet.
 */
const resolveCancelledBy = async ({
  id,
  strapi,
  cache,
}: {
  id: number
  strapi: Core.Strapi
  cache: RegulationRowCache
}): Promise<RegulationRow | null> => {
  const regulation = await loadRegulationRow({ id, strapi, cache })
  if (!regulation) {
    return null
  }
  // Return direct cancellation if present. Ignore self-cancelation relation.
  if (regulation.cancellation && regulation.cancellation.id !== id) {
    return regulation.cancellation
  }

  const cancellation = await resolveCancellation({
    id,
    rootId: id,
    strapi,
    cache,
    visitedIds: new Set(),
  })
  if (!cancellation) {
    return null
  }

  // Return cancellation by amendee. Ignore if it's before self effectiveFrom date.
  return (cancellation.effectiveFrom ?? '') >= (regulation.effectiveFrom ?? '')
    ? cancellation
    : null
}

export const regulationGraphqlExtension: GraphqlExtension = ({ strapi, nexus }) => ({
  types: [
    nexus.extendType({
      type: 'Regulation',
      definition(t) {
        t.nonNull.boolean('isCancelled', {
          description:
            'Whether this regulation is no longer valid - cancelled directly, or by amending a cancelled regulation(s).',
          resolve: async (parent: RegulationRow, _args, context) =>
            Boolean(
              await resolveCancelledBy({ id: parent.id, strapi, cache: getRequestCache(context) })
            ),
        })

        t.field('effectiveUntil', {
          type: 'Date',
          description:
            'The day the cancelling regulation took effect, i.e. until when this regulation was valid. Null if it is still valid.',
          resolve: async (parent: RegulationRow, _args, context) => {
            const cancelledBy = await resolveCancelledBy({
              id: parent.id,
              strapi,
              cache: getRequestCache(context),
            })

            return cancelledBy?.effectiveFrom ?? null
          },
        })

        t.field('cancelledBy', {
          type: 'Regulation',
          description:
            'The regulation cancelling this one, either directly or through an amended regulation which got cancelled.',
          resolve: (parent: RegulationRow, _args, context) =>
            resolveCancelledBy({ id: parent.id, strapi, cache: getRequestCache(context) }),
        })
      },
    }),
  ],
})
