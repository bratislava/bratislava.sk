import { ArrowRightIcon } from '@assets/ui-icons'
import { Typography } from '@bratislava/component-library'
import MLink from '@components/forms/simple-components/MLink'
import { useTranslations } from 'next-intl'
import React from 'react'
import { twMerge } from 'tailwind-merge'

export type RegulationCardProps = {
  title: string
  path?: string
  className?: string
  isUplneZnenie?: boolean | null | undefined
}

/**
 * Custom temporary component, based on FileCard
 * Figma for FileCard: https://www.figma.com/file/17wbd0MDQcMW9NbXl6UPs8/DS-ESBS%2BBK%3A-Component-library?type=design&node-id=7367-17767&t=Km8W7qXXiWIDWSYw-0
 */

const RegulationCard = ({ title, path, className, isUplneZnenie }: RegulationCardProps) => {
  const t = useTranslations()

  return (
    <div
      className={twMerge(
        'relative flex flex-col justify-between gap-2 rounded-lg border-2 border-category-600 bg-white p-4 lg:h-36',
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
        >
          {title}
        </MLink>
        {isUplneZnenie && (
          <Typography type="p" size="p-small" className="line-clamp-1">
            {t('Regulation.fullTextRegulation')}
          </Typography>
        )}
      </div>
      <div className="flex items-center gap-2 lg:gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-category-100 text-category-700 lg:h-10 lg:w-10">
          <ArrowRightIcon className="h-4 w-4" />
        </div>
        <Typography type="span">{t('Regulation.linkToRegulationMessage')}</Typography>
      </div>
    </div>
  )
}

export default RegulationCard
