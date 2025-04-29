import { Typography } from '@bratislava/component-library'
import React from 'react'

import { ChevronRightIcon } from '@/src/assets/ui-icons'
import CardBase from '@/src/components/cards/CardBase'
import MLink from '@/src/components/common/MLink/MLink'
import { isDefined } from '@/src/utils/isDefined'
import { useTranslation } from '@/src/utils/useTranslation'

type Props = {
  title: string
  path?: string
  className?: string
  isUplneZnenie?: boolean | null | undefined
  metadata?: string[] | null
}

/**
 * Figma: https://www.figma.com/file/17wbd0MDQcMW9NbXl6UPs8/DS-ESBS%2BBK%3A-Component-library?node-id=867%3A2067&mode=dev
 */

const RegulationRowCard = ({ title, path, className, isUplneZnenie, metadata }: Props) => {
  const { t } = useTranslation()

  return (
    <CardBase className={className} variant="no-border">
      <div className="flex flex-row items-start justify-between gap-4 py-4 lg:items-center">
        <div className="flex flex-col gap-1">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-4">
            <MLink
              href={path ?? '#'}
              className="text-h6 break-words font-bold"
              stretched
              variant="underlineOnHover"
            >
              {title}
            </MLink>
            {isUplneZnenie && (
              <Typography type="p" size="p-small" className="rounded border px-1 py-0.5">
                {t('Regulation.fullTextRegulation')}
              </Typography>
            )}
          </div>
          {metadata?.length ? (
            <span className="text-component-default text-grey-700">
              {metadata.filter(isDefined).join(' • ')}
            </span>
          ) : null}
        </div>
        <div className="flex shrink-0 items-center justify-center text-grey-700 md:rounded-lg md:border-grey-200">
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
