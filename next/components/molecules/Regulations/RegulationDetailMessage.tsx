import { RegulationEntityFragment } from '@backend/graphql'
import { Typography } from '@bratislava/component-library'
import Alert from '@components/forms/info-components/Alert'
import MLink from '@components/forms/simple-components/MLink'
import { isDefined } from '@utils/isDefined'
import { formatDate } from '@utils/local-date'
import React, { Fragment } from 'react'

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
  const amending = regulation.attributes?.amending?.data.filter(isDefined)
  const cancellation = regulation.attributes?.cancellation?.data

  const isCancelled = isDefined(cancellation)

  // We want to show whether this regulation is amending any cancelled regulations, because in that case, this regulation is also cancelled
  const cancelledAmendees = amending?.filter(
    (amendee) => isDefined(amendee) && amendee.attributes?.cancellation?.data,
  )
  const hasCancelledAmendees = (cancelledAmendees?.length ?? 0) > 0

  /* As a temporary solution, we use alert here, however incorrectly - its content should receive string,
   * but we need the ability to use bold text and links in the content.
   * A new component may be designed for this purpose.
   */

  const alertType = isCancelled ? 'error' : hasCancelledAmendees ? 'warning' : 'success'

  const alertMessage = isCancelled
    ? 'Zrušené'
    : hasCancelledAmendees
    ? 'Dopĺňa neplatné VZN'
    : 'Platné'

  // TODO Add sk localization after this component is refactored
  const alertContent = isCancelled ? (
    <Typography type="p" className="whitespace-normal">
      Toto VZN bolo zrušené všeobecne záväzným nariadením{' '}
      <RegulationMLink regNumber={cancellation.attributes?.regNumber} /> dňa{' '}
      <span className="font-medium">{formatDate(cancellation?.attributes?.effectiveFrom)}</span>.
    </Typography>
  ) : hasCancelledAmendees ? (
    <Typography type="p" className="whitespace-normal">
      Toto VZN je dodatkom{' '}
      {cancelledAmendees!.map((cancelledAmendee, index) => {
        return (
          <Fragment key={cancelledAmendee.id}>
            {index === 0
              ? ' k '
              : index === (cancelledAmendees?.length ?? 0) - 1
              ? ' a k '
              : ', k '}{' '}
            <RegulationMLink regNumber={cancelledAmendee.attributes?.regNumber} />, ktoré bolo
            zrušené nariadením{' '}
            <RegulationMLink
              regNumber={cancelledAmendee.attributes?.cancellation?.data?.attributes?.regNumber}
            />{' '}
            s účinnosťou od{' '}
            <span className="whitespace-nowrap font-medium">
              {' '}
              {formatDate(
                amending?.find((amended) => amended.attributes?.cancellation?.data)?.attributes
                  ?.cancellation?.data?.attributes?.effectiveFrom,
              )}
            </span>
          </Fragment>
        )
      })}
      .
    </Typography>
  ) : (
    <Typography type="p" className="whitespace-normal">
      Toto VZN je aktuálne platné, s dátumom účinnosti od{' '}
      <span className="whitespace-nowrap font-medium">
        {formatDate(regulation.attributes?.effectiveFrom)}
      </span>
      .
    </Typography>
  )

  return (
    <Alert
      type={alertType}
      message={alertMessage}
      variant="message"
      content={alertContent as any} // workaround so we can include links in Alert content, until new component is designed
      className="lg:max-w-[584px] " // workaround for width, so it fits to implied grid
    />
  )
}

export default RegulationDetailMessage
