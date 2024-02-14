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

const RegulationDetailMessage = ({ regulation }: RegulationDetailMessageProps) => {
  const amending = regulation.attributes?.amending?.data.filter(isDefined)
  const cancellation = regulation.attributes?.cancellation?.data

  const isCancelled = isDefined(cancellation)

  const cancelledAmendees = amending?.filter((amendee) => amendee.attributes?.cancellation?.data)
  const isAmendeningCancelled = cancelledAmendees?.length

  /* TODO As a temporary solution, we use alert incorrectly here, as its content should receive only string,
   * but we need the ability to use bold text and links in the content.
   * A new component may be designed for this purpose.
   */

  const alertProps = {
    type: isCancelled ? 'error' : isAmendeningCancelled ? 'warning' : 'success',
    message: isCancelled ? 'Zrušené' : isAmendeningCancelled ? 'Dopĺňa neplatné VZN' : 'Platné',
    content: isCancelled ? (
      <Typography type="p" className="whitespace-normal">
        Toto VZN bolo zrušené všeobecne záväzným nariadením{' '}
        <MLink
          variant="underlined-medium"
          className="whitespace-nowrap"
          href={`/vzn/${cancellation?.attributes?.slug}`}
        >
          VZN {cancellation.attributes?.regNumber}
        </MLink>{' '}
        od dňa{' '}
        <span className="font-semibold">{formatDate(cancellation?.attributes?.effectiveFrom)}</span>
        .
      </Typography>
    ) : isAmendeningCancelled ? (
      <Typography type="p" className="whitespace-normal">
        Toto VZN je dodatkom{' '}
        {cancelledAmendees.map((cancelledAmendee, index) => {
          return (
            <Fragment key={cancelledAmendee.id}>
              {index === 0 ? ' k ' : index === cancelledAmendees.length - 1 ? ' a k ' : ', k '}{' '}
              <MLink
                variant="underlined-medium"
                className="whitespace-nowrap"
                href={`/vzn/${cancelledAmendee.attributes?.slug}`}
              >
                {' '}
                VZN {cancelledAmendee.attributes?.regNumber}
              </MLink>
              , ktoré bolo zrušené nariadením{' '}
              <MLink
                variant="underlined-medium"
                className="whitespace-nowrap"
                href={`/vzn/${cancelledAmendee.attributes?.cancellation?.data?.attributes?.slug}`}
              >
                {' '}
                VZN {cancelledAmendee.attributes?.cancellation?.data?.attributes?.regNumber ?? ''}
              </MLink>{' '}
              s účinnosťou od{' '}
              <span className="font-semibold">
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
        <span className="font-semibold">{formatDate(regulation.attributes?.effectiveFrom)}</span>.{' '}
      </Typography>
    ),
  }

  return isCancelled || isAmendeningCancelled ? (
    <Alert
      type={alertProps.type as any}
      message={alertProps.message}
      variant="message"
      content={alertProps.content as any}
      className="lg:max-w-[584px] " // workaround for width, so it fits to implied grid
    />
  ) : null
}

export default RegulationDetailMessage
