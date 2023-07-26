import { DownloadIcon } from '@assets/ui-icons'
import MLink from '@components/forms/simple-components/MLink'
import { isDefined } from '@utils/isDefined'
import { useTranslations } from 'next-intl'
import React from 'react'
import { twMerge } from 'tailwind-merge'

type FileCardProps = {
  title?: string
  uploadDate?: string
  downloadLink?: string
  format?: string
  size?: string
  className?: string
}

/**
 * Figma: https://www.figma.com/file/17wbd0MDQcMW9NbXl6UPs8/DS-ESBS%2BBK%3A-Component-library?type=design&node-id=7940-21473&mode=dev
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
              {/* TYCI prevzate z FileCard – gap medzi prvkami je rieseny jednoduchsie (medzerou) nez konstantnou vzdialenostou */}
              {[uploadDate, format, size].filter(isDefined).join(' • ')}
            </span>
          )}
        </div>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 border-gray-200 text-gray-700 lg:h-10 lg:w-10">
          <DownloadIcon className="h-4 w-4" />
        </div>
      </div>
    </div>

    // <div
    //   className={twMerge(
    //     'relative flex h-[132px] flex-col justify-between rounded-lg border-2 border-category-600 bg-white p-4 lg:h-48',
    //     className,
    //   )}
    // >
    //   <div className="flex flex-col gap-1">
    //     <MLink
    //       href={downloadLink ?? '#'}
    //       className="text-h5 line-clamp-1 break-words font-bold lg:line-clamp-3"
    //       stretched
    //       variant="underlineOnHover"
    //       target="_blank"
    //       rel="noreferrer"
    //     >
    //       {title}
    //     </MLink>
    //     {(uploadDate || format || size) && (
    //       <span className="text-small line-clamp-1 text-gray-700">
    //         {[uploadDate, format, size].filter(isDefined).join(' • ')}
    //       </span>
    //     )}
    //   </div>
    //   <div className="flex items-center gap-2 lg:gap-3">
    //     <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-category-100 text-category-700 lg:h-10 lg:w-10">
    //       <DownloadIcon className="h-4 w-4" />
    //     </div>
    //     <div className="font-semibold text-gray-700">{t('download')}</div>
    //   </div>
    // </div>
  )
}

export default FileRowCard
