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
  hideBottomDivider,
}: FileCardProps) => {
  const { t } = useTranslation()

  return (
    <div className={cn('relative', className)}>
      <div className="flex flex-row items-start justify-between gap-x-4 py-4 pl-4 pr-2.5 md:px-6 lg:items-center">
        <div className="flex flex-row justify-between gap-x-2 md:items-center md:gap-x-4">
          <div className="md:rounded-lg md:bg-background-tertiary">
            {/* TODO create a proper wrapper for the icon component to handle paddings */}
            <div className="md:p-3">
              <AttachmentIcon className="h-5 w-5 md:h-6 md:w-6" />
            </div>
          </div>
          <div className="flex flex-col gap-x-4 gap-y-1 md:w-full">
            <MLink
              href={downloadLink ?? '#'}
              className="text-h6 line-clamp-3 break-words font-bold lg:line-clamp-2"
              stretched
              variant="underlineOnHover"
              target="_blank"
              title={title}
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
        <div className="flex shrink-0 items-center justify-center text-grey-700 md:rounded-lg md:border-2 md:border-grey-200">
          {/* TODO create a proper wrapper for the icon component to handle paddings */}
          <div className="p-1.5 md:p-2.5">
            <DownloadIcon className="h-5 w-5" />
          </div>
        </div>
      </div>
      {/* TODO consider using conditional styling instead of the HorizontalDivider component */}
      {hideBottomDivider ? null : (
        <div className="px-4 md:px-6">
          <HorizontalDivider />
        </div>
      )}
    </div>
  )
}

export default FileRowCard
