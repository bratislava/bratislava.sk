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
}: FileCardProps) => {
  const { t } = useTranslation()

  return (
    <div className={cn('relative', className)}>
      <div className="flex flex-row items-center justify-between gap-x-4 py-4">
        <div className="rounded-lg bg-background-tertiary p-3">
          <AttachmentIcon />
        </div>
        <div className="flex w-full flex-col gap-y-1">
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
            <span className="text-small line-clamp-1 text-grey-700">
              {/* TODO words should be separated by a dot with 12px gap, this is a simplified solution. Same in FileCard component. */}
              {[uploadDate, format, size].filter(isDefined).join(' • ')}
            </span>
          )}
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-2 border-grey-200 text-grey-700">
          <DownloadIcon className="h-4 w-4" />
        </div>
      </div>
      <HorizontalDivider />
    </div>
  )
}

export default FileRowCard
