import { Typography } from '@bratislava/component-library'
import { useTranslation } from 'next-i18next'
import React, { Fragment, useId } from 'react'

import { LanguageIcon } from '@/src/assets/material-icons'
import CardBase from '@/src/components/cards/CardBase'
import { CardTitleLevel } from '@/src/components/cards/getCardTitleLevel'
import Button from '@/src/components/common/Button/Button'
import cn from '@/src/utils/cn'

export type LinkRowCardProps = {
  title: string
  cardTitleLevel?: CardTitleLevel
  linkHref: string
  metadata?: string[]
  className?: string
}

/**
 * TODO Figma link
 */

const LinkRowCard = ({
  title,
  cardTitleLevel = 'h3',
  linkHref,
  metadata,
  className,
}: LinkRowCardProps) => {
  const { t } = useTranslation()

  const titleId = useId()

  return (
    <CardBase variant="no-border" className={cn('bg-background-passive-base', className)}>
      <div className="flex items-center gap-3 py-4 lg:gap-4">
        <div className="flex grow items-center gap-3 lg:gap-4">
          <div className="lg:rounded-lg lg:bg-background-passive-secondary lg:p-3 lg:text-content-passive-secondary">
            <LanguageIcon className="size-5 shrink-0 md:size-6" />
          </div>
          <div className="flex grow flex-col gap-1">
            <Typography
              id={titleId}
              variant="h6"
              as={cardTitleLevel}
              className="group-hover:underline"
            >
              {title}
            </Typography>
            {metadata?.length ? (
              <div className="flex flex-wrap items-center gap-x-3 text-content-passive-secondary">
                {metadata.map((item, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Fragment key={index}>
                    {index > 0 ? (
                      <div
                        className="size-1 rounded-full bg-content-passive-secondary"
                        aria-hidden
                      />
                    ) : null}
                    {/* Using break-all because we pass very long urls to metadata */}
                    <Typography variant="p-small" className="break-all">
                      {item}
                    </Typography>
                  </Fragment>
                ))}
              </div>
            ) : null}
          </div>
        </div>
        {/* Screen: desktop */}
        <Button
          variant="outline"
          href={linkHref}
          aria-labelledby={titleId}
          stretched
          className="whitespace-nowrap max-lg:hidden"
        >
          {t('LinkRowCard.goToWeb')}
        </Button>
        {/* Screen: mobile */}
        <Button
          variant="unstyled"
          href={linkHref}
          aria-labelledby={titleId}
          stretched
          className="ml-auto p-1.5 lg:hidden"
        />
      </div>
    </CardBase>
  )
}

export default LinkRowCard
