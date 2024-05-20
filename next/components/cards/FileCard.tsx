import { Typography } from '@bratislava/component-library'
import { useTranslations } from 'next-intl'
import React from 'react'
import { twMerge } from 'tailwind-merge'

import { DownloadIcon } from '@/assets/ui-icons'
import MLink from '@/components/common/MLink/MLink'
import { isDefined } from '@/utils/isDefined'

export type FileCardProps = {
  title: string
  uploadDate?: string
  downloadLink?: string
  format?: string
  size?: string
  className?: string
  ariaLabel?: string
}

/**
 * Figma: https://www.figma.com/file/17wbd0MDQcMW9NbXl6UPs8/DS-ESBS%2BBK%3A-Component-library?type=design&node-id=7367-17767&t=Km8W7qXXiWIDWSYw-0
 */
const FileCard = ({
  title,
  uploadDate,
  downloadLink,
  format,
  size,
  className,
  ariaLabel,
}: FileCardProps) => {
  const t = useTranslations()

  return (
    <div
      className={twMerge(
        'relative flex h-[132px] flex-col justify-between rounded-lg border-2 border-category-600 bg-white p-4 lg:h-48',
        className,
      )}
      data-cy="file-card"
    >
      <div className="flex flex-col gap-1">
        {/* FIXME Typography. Convert to use Typography. Issue: Different font weight than figma h3 */}
        <MLink
          href={downloadLink ?? '#'}
          className="text-h5 line-clamp-1 break-words font-bold lg:line-clamp-3"
          stretched
          variant="underlineOnHover"
          target="_blank"
          rel="noreferrer"
          data-cy="file-card-download"
          aria-label={
            ariaLabel ?? t('FileList.aria.downloadFileAriaLabel', { title, format, size })
          }
        >
          {title}
        </MLink>

        {/* FIXME Typography. Convert to use Typography. Issue: Different font size and weight than figma span or p */}
        {(uploadDate || format || size) && (
          <span className="text-small line-clamp-1 text-gray-700">
            {[uploadDate, format, size].filter(isDefined).join(' • ')}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2 lg:gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-category-100 text-category-700 lg:h-10 lg:w-10">
          <DownloadIcon className="h-4 w-4" />
        </div>
        <Typography type="span">{t('download')}</Typography>
      </div>
    </div>
  )
}

export default FileCard
