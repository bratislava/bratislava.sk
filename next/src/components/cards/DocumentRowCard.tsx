import { Typography } from '@bratislava/component-library'
import { useTranslation } from 'next-i18next'
import React, { Fragment } from 'react'

import { ArrowRightIcon, AttachmentIcon, DownloadIcon } from '@/src/assets/icons'
import { FolderIcon } from '@/src/assets/material-icons'
import CardBase from '@/src/components/cards/CardBase'
import { CardTitleLevel } from '@/src/components/cards/getCardTitleLevel'
import Button from '@/src/components/common/Button/Button'
import cn from '@/src/utils/cn'

export type DocumentRowCardProps = {
  variant: 'single-file' | 'multiple-files'
  title: string
  cardTitleLevel?: CardTitleLevel
  linkHref: string
  metadata?: string[]
  className?: string
  ariaLabel?: string
}

/**
 * Based on OLO https://github.com/bratislava/olo.sk/blob/master/next/src/components/cards/FileRowCard.tsx
 *
 * Figma OLO: https://www.figma.com/file/2qF09hDT9QNcpdztVMNAY4/OLO-Web?type=design&node-id=42-2223&mode=dev
 */

const DocumentRowCard = ({
  variant,
  title,
  cardTitleLevel = 'h3',
  linkHref,
  metadata,
  className,
  ariaLabel,
}: DocumentRowCardProps) => {
  const { t } = useTranslation()

  return (
    <CardBase variant="no-border" className={cn('bg-background-passive-base', className)}>
      <div className="flex items-center gap-3 py-4 lg:gap-4">
        <div className="flex grow items-start gap-3 lg:gap-4">
          <div className="lg:rounded-lg lg:bg-background-passive-secondary lg:p-3 lg:text-content-passive-secondary">
            {variant === 'single-file' ? (
              <AttachmentIcon className="size-5 md:size-6" />
            ) : (
              <FolderIcon className="size-5 md:size-6" />
            )}
          </div>
          <div className="flex grow flex-col gap-1">
            <Typography variant="h6" as={cardTitleLevel} className="group-hover:underline">
              {title}
            </Typography>
            {metadata?.length ? (
              <div className="flex flex-wrap items-center gap-x-3">
                {metadata.map((item, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Fragment key={index}>
                    {index > 0 ? (
                      <div
                        className="size-1 rounded-full bg-content-passive-secondary"
                        aria-hidden
                      />
                    ) : null}
                    <Typography variant="p-small">{item}</Typography>
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
          stretched
          hasLinkIcon={false}
          // eslint-disable-next-line sonarjs/no-duplicate-string
          startIcon={variant === 'single-file' ? <DownloadIcon /> : undefined}
          // eslint-disable-next-line sonarjs/no-duplicate-string
          aria-label={ariaLabel ?? `${t('common.showMore')}: ${title}`}
          endIcon={variant === 'multiple-files' ? <ArrowRightIcon /> : undefined}
          className="whitespace-nowrap max-lg:hidden"
        >
          {variant === 'single-file' ? t('common.download') : t('common.show')}
        </Button>
        {/* Screen: mobile */}
        <Button
          variant="unstyled"
          href={linkHref}
          aria-label={ariaLabel ?? `${t('common.showMore')}: ${title}`}
          stretched
          hasLinkIcon={false}
          icon={variant === 'single-file' ? <DownloadIcon /> : <ArrowRightIcon />}
          className="ml-auto p-1.5 lg:hidden"
        />
      </div>
    </CardBase>
  )
}

export default DocumentRowCard
