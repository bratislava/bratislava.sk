import { DownloadIcon } from '@assets/ui-icons'
import MLink from '@components/forms/simple-components/MLink'
import { FileCardProps } from '@components/molecules/presentation/FileCard'
import { isDefined } from '@utils/isDefined'
import { useTranslations } from 'next-intl'
import React from 'react'
import { twMerge } from 'tailwind-merge'

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
}: FileCardProps) => {
  const t = useTranslations()

  return (
    <div className={twMerge('relative', className)}>
      <div className="flex flex-row items-center justify-between gap-x-6 border-b-2 border-gray-200 py-4">
        <div className="flex w-full flex-col gap-y-1.5">
          <MLink
            href={downloadLink ?? '#'}
            className="text-h5 line-clamp-1 break-words font-bold lg:line-clamp-3"
            stretched
            variant="underlineOnHover"
            target="_blank"
            rel="noreferrer"
          >
            {title}
          </MLink>
          {(uploadDate || format || size) && (
            <span className="text-small line-clamp-1 text-gray-700">
              {/* TODO words should be separated by a dot with 12px gap, this is a simplified solution. Same in FileCard component.*/}
              {[uploadDate, format, size].filter(isDefined).join(' • ')}
            </span>
          )}
        </div>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 border-gray-200 text-gray-700 lg:h-10 lg:w-10">
          <DownloadIcon className="h-4 w-4" />
        </div>
      </div>
    </div>
  )
}

export default FileRowCard
