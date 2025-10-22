 
import { Typography } from '@bratislava/component-library'
import React, { Fragment } from 'react'

import Alert from '@/src/components/common/Alert_Deprecated/Alert_Deprecated'
import MLink from '@/src/components/common/MLink/MLink'
import { RegulationEntityFragment } from '@/src/services/graphql'
import { formatDate } from '@/src/utils/formatDate'
import { getRegulationMetadata } from '@/src/utils/getRegulationMetadata'
import { isDefined } from '@/src/utils/isDefined'

type RegulationDetailMessageProps = {
  regulation: RegulationEntityFragment
}

type RegulationMLinkProps = {
  regNumber?: string
}

const RegulationMLink = ({ regNumber }: RegulationMLinkProps) => {
  if (!regNumber) return null
  const slug = regNumber.replace('/', '-')

  return (
    <MLink variant="underlined-medium" className="whitespace-nowrap" href={`/vzn/${slug}`}>
      VZN {regNumber}
    </MLink>
  )
}

const RegulationDetailMessage = ({ regulation }: RegulationDetailMessageProps) => {
  const amending = regulation.amending?.filter(isDefined)
  const { cancellation, effectiveFrom } = regulation

  const { isCancelledDirectly, hasCancelledAmendees, cancelledAmendees, effectiveUntil } =
    getRegulationMetadata(regulation)

  /* As a temporary solution, we use alert here, however incorrectly - its content should receive string,
   * but we need the ability to use bold text and links in the content.
   * A new component may be designed for this purpose.
   */

  // The regulation is considered as cancelled if it has a direct cancellation regulation, but also if it is amending any cancelled regulations
  const alertType = isCancelledDirectly || hasCancelledAmendees ? 'error' : 'success'
  const alertMessage = isCancelledDirectly || hasCancelledAmendees ? 'Zrušené' : 'Platné'

  // TODO translations - use translations after this component is refactored
  const alertContent = isCancelledDirectly ? (
    <Typography variant="p-small" className="whitespace-normal">
      Toto VZN bolo zrušené všeobecne záväzným nariadením{' '}
      <RegulationMLink regNumber={cancellation?.regNumber} /> dňa{' '}
      <span className="font-medium">{formatDate(effectiveUntil)}</span>.
    </Typography>
  ) : hasCancelledAmendees ? (
    <Typography variant="p-small" className="whitespace-normal">
      Toto VZN je dodatkom{' '}
      {cancelledAmendees.filter(isDefined).map((cancelledAmendee, index) => {
        return (
          <Fragment key={cancelledAmendee.documentId}>
            {index === 0 ? ' k ' : index === cancelledAmendees.length - 1 ? ' a k ' : ', k '}{' '}
            <RegulationMLink regNumber={cancelledAmendee.regNumber} />, ktoré bolo zrušené
            nariadením <RegulationMLink regNumber={cancelledAmendee.cancellation?.regNumber} /> s
            účinnosťou od{' '}
            <span className="font-medium whitespace-nowrap">
              {' '}
              {formatDate(
                amending?.find((amended) => amended.cancellation)?.cancellation?.effectiveFrom,
              )}
            </span>
          </Fragment>
        )
      })}
      .
    </Typography>
  ) : (
    <Typography variant="p-small" className="whitespace-normal">
      Toto VZN je aktuálne platné, s dátumom účinnosti od{' '}
      <span className="font-medium whitespace-nowrap">{formatDate(effectiveFrom)}</span>.
    </Typography>
  )

  return (
    <Alert
      type={alertType}
      message={alertMessage}
      variant="message"
      content={alertContent as any} // workaround so we can include links in Alert content, until new component is designed
      className="lg:max-w-[584px]" // workaround for width, so it fits to implied grid
    />
  )
}

export default RegulationDetailMessage
