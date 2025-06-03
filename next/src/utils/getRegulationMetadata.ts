import { RegulationEntityFragment } from '@/src/services/graphql'
import { formatDate } from '@/src/utils/formatDate'
import { isDefined } from '@/src/utils/isDefined'

export function getRegulationMetadata(
  regulation: NonNullable<RegulationEntityFragment['attributes']>,
) {
  // We want to show whether this regulation is amending any cancelled regulations, because in that case, this regulation is also cancelled
  const cancelledAmendees =
    regulation.amending?.data.filter((amendee) =>
      isDefined(amendee?.attributes?.cancellation?.data),
    ) ?? []
  const isCancelledDirectly = isDefined(regulation.cancellation?.data)
  const hasCancelledAmendees = cancelledAmendees.length > 0

  const isCancelled = isCancelledDirectly || hasCancelledAmendees

  // eslint-disable-next-line prefer-destructuring
  const effectiveFrom = regulation.effectiveFrom
  const effectiveUntil = formatDate(
    regulation.cancellation?.data?.attributes?.effectiveFrom ??
      cancelledAmendees[0]?.attributes?.cancellation?.data?.attributes?.effectiveFrom,
  )

  const isAmendee = !!regulation.amending?.data?.length

  return {
    isCancelled,
    isCancelledDirectly,
    hasCancelledAmendees,
    cancelledAmendees,
    effectiveFrom,
    effectiveUntil,
    isAmendee,
  }
}
