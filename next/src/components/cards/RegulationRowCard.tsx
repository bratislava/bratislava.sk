import { Typography } from '@bratislava/component-library'
import React from 'react'
import { ChevronRightIcon } from 'src/assets/icons'

import CardBase from '@/src/components/cards/CardBase'
import MLink from '@/src/components/common/MLink/MLink'
import { isDefined } from '@/src/utils/isDefined'
import { useTranslation } from '@/src/utils/useTranslation'

type Props = {
  title: string
  path?: string
  className?: string
  isFullTextRegulation?: boolean | null | undefined
  isAmendee?: boolean | null | undefined
  isCancelled?: boolean | null | undefined
  metadata?: string[] | null
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=14811-27790&m=dev
 */

const RegulationRowCard = ({
  title,
  path,
  className,
  isFullTextRegulation,
  isAmendee,
  isCancelled,
  metadata,
}: Props) => {
  const { t } = useTranslation()

  return (
    <CardBase className={className} variant="no-border">
      <div className="flex flex-row justify-between gap-4 py-4">
        <div className="flex flex-col gap-2 lg:gap-1">
          <div className="flex flex-col items-start gap-2 lg:flex-row lg:items-center lg:gap-4">
            <MLink
              href={path ?? '#'}
              className="text-h6 font-bold wrap-break-word"
              stretched
              variant="underlineOnHover"
            >
              {title}
            </MLink>
            {/* TODO style https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=14811-28150&m=dev */}
            {isFullTextRegulation && (
              <Typography variant="p-small" className="rounded-sm border px-2 py-0.5">
                {t('Regulation.fullTextRegulation')}
              </Typography>
            )}
            {/* TODO style and wording */}
            {isAmendee && (
              <Typography variant="p-small" className="rounded-sm border px-2 py-0.5">
                {t('Regulation.amendment')}
              </Typography>
            )}
            {/* TODO style */}
            {isCancelled && (
              <Typography variant="p-small" className="rounded-sm border px-2 py-0.5">
                {t('Regulation.cancelled')}
              </Typography>
            )}
          </div>
          {metadata?.length ? (
            <span className="text-size-p-small text-grey-700">
              {metadata.filter(isDefined).join(' • ')}
            </span>
          ) : null}
        </div>
        {/* TODO styling (hover...) */}
        <div className="flex shrink-0 items-center justify-center text-grey-700">
          {/* TODO create a proper wrapper for the icon component to handle paddings */}
          <div className="p-1.5 md:p-2.5">
            <ChevronRightIcon className="size-5" />
          </div>
        </div>
      </div>
    </CardBase>
  )
}

export default RegulationRowCard
