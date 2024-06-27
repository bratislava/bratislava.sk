import React from 'react'
import cn from 'utils/cn'

import { AttachmentIcon, DownloadIcon } from '@/assets/ui-icons'
import { FileCardProps } from '@/components/cards/FileCard'
import MLink from '@/components/common/MLink/MLink'
import { isDefined } from '@/utils/isDefined'
import { useTranslation } from '@/utils/useTranslation'

import HorizontalDivider from '../common/Divider/HorizontalDivider'

/**
 * Figma: https://www.figma.com/file/17wbd0MDQcMW9NbXl6UPs8/DS-ESBS%2BBK%3A-Component-library?node-id=867%3A2067&mode=dev
 */

const FileRowCard = ({
  title,
  uploadDate,
  downloadLink,
  format,
  size,
  className,
  ariaLabel,
  variant,
}: FileCardProps) => {
  const { t } = useTranslation()

  return (
    <div className={cn('relative', className)}>
      <div className="flex flex-row justify-between gap-x-4 p-4 md:items-center md:px-6">
        <div className="flex flex-row justify-between gap-x-2 md:items-center md:gap-x-4">
          <div className="md:rounded-lg md:bg-background-tertiary md:p-3">
            <AttachmentIcon />
          </div>
          <div className="flex flex-col gap-x-4 gap-y-1 md:w-full">
            <MLink
              href={downloadLink ?? '#'}
              className="text-h5 line-clamp-3 break-words font-bold lg:line-clamp-2"
              stretched
              variant="underlineOnHover"
              target="_blank"
              rel="noreferrer"
              aria-label={
                ariaLabel ?? t('FileList.aria.downloadFileAriaLabel', { title, format, size })
              }
            >
              {title}
            </MLink>
            {(uploadDate || format || size) && (
              <span className="text-small text-grey-700 md:line-clamp-1">
                {/* TODO words should be separated by a dot with 12px gap, this is a simplified solution. Same in FileCard component. */}
                {[uploadDate, format, size].filter(isDefined).join(' • ')}
              </span>
            )}
          </div>
        </div>

        <div className="flex shrink-0 items-center justify-center text-grey-700 md:h-10 md:w-10 md:rounded-lg md:border-2 md:border-grey-200">
          <DownloadIcon className="h-4 w-4" />
        </div>
      </div>

      {variant === 'divider' ? (
        <div className="px-4 md:px-6">
          <HorizontalDivider />
        </div>
      ) : null}
    </div>
  )
}

export default FileRowCard
