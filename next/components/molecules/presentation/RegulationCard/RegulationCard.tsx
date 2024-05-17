import { Typography } from '@bratislava/component-library'
import { useTranslations } from 'next-intl'
import React from 'react'
import { twMerge } from 'tailwind-merge'

import { ArrowRightIcon } from '@/assets/ui-icons'
import MLink from '@/components/forms/simple-components/MLink'

export type RegulationCardProps = {
  title: string
  path?: string
  className?: string
  ariaLabel?: string
  isUplneZnenie?: boolean | null | undefined
  metadata?: string | null
}

/**
 * Custom temporary component, based on FileCard
 * Figma for FileCard: https://www.figma.com/file/17wbd0MDQcMW9NbXl6UPs8/DS-ESBS%2BBK%3A-Component-library?type=design&node-id=7367-17767&t=Km8W7qXXiWIDWSYw-0
 */

const RegulationCard = ({
  title,
  path,
  className,
  isUplneZnenie,
  metadata,
  ariaLabel,
}: RegulationCardProps) => {
  const t = useTranslations()

  return (
    // 10rem = 160px (we force this height to keep consistent height of card rows when displayed in a grid)
    <div
      className={twMerge(
        'relative flex flex-col justify-between gap-2 rounded-lg border-2 border-gray-200 bg-white p-4 hover:border-gray-400 md:h-[10rem]',
        className,
      )}
    >
      <div className="flex flex-col gap-1">
        <MLink
          href={path ?? '#'}
          className="text-h5 line-clamp-1 break-words font-bold lg:line-clamp-3"
          stretched
          variant="underlineOnHover"
          target="_blank"
          rel="noreferrer"
          aria-label={ariaLabel ?? t('Regulation.aria.linkToRegulationAriaLabel', { title })}
        >
          {title}
        </MLink>
        {isUplneZnenie && (
          <Typography type="p" size="p-small" className="line-clamp-1">
            {t('Regulation.fullTextRegulation')}
          </Typography>
        )}
        {metadata && (
          <Typography type="p" size="p-small" className="line-clamp-1">
            {metadata}
          </Typography>
        )}
      </div>
      <div className="flex items-center gap-2 lg:gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-700 lg:h-10 lg:w-10">
          <ArrowRightIcon className="h-4 w-4" />
        </div>
        <Typography type="span">{t('Regulation.linkToRegulationMessage')}</Typography>
      </div>
    </div>
  )
}

export default RegulationCard
