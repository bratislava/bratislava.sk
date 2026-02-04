import { RegulationEntityFragment } from '@/src/services/graphql'
import { formatDate } from '@/src/utils/formatDate'
import { isDefined } from '@/src/utils/isDefined'

export function getRegulationMetadata(regulation: NonNullable<RegulationEntityFragment>) {
  // We want to show whether this regulation is amending any cancelled regulations, because in that case, this regulation is also cancelled
  const cancelledAmendees =
    regulation.amending?.filter((amendee) => isDefined(amendee?.cancellation)) ?? []
  const isCancelledDirectly = isDefined(regulation.cancellation)
  const hasCancelledAmendees = cancelledAmendees.length > 0

  const isCancelled = isCancelledDirectly || hasCancelledAmendees

  const effectiveFrom = regulation.effectiveFrom
  const effectiveUntil = formatDate(
    regulation.cancellation?.effectiveFrom ?? cancelledAmendees[0]?.cancellation?.effectiveFrom,
  )

  const isAmendee = !!regulation.amending?.length

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
