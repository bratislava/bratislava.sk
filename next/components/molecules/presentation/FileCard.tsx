import { DownloadIcon } from '@assets/images'
import { UploadFileEntityFragment } from '@bratislava/strapi-sdk-homepage'
import MLink from '@components/forms/simple-components/MLink'
import CardBase, { CardBaseProps } from '@components/molecules/presentation/CardBase'
import CardContent from '@components/molecules/presentation/CardContent'
import { getFileSize } from '@utils/getFileSize'
import { useDownloadAriaLabel } from '@utils/useDownloadAriaLabel'
import { useLocale, useTranslations } from 'next-intl'
import React from 'react'

type Props = {
  fileEntity: UploadFileEntityFragment
} & CardBaseProps

const FileCard = ({ fileEntity, ...rest }: Props) => {
  const t = useTranslations()
  const locale = useLocale()

  const { getDownloadAriaLabel } = useDownloadAriaLabel()

  if (!fileEntity?.attributes) {
    return null
  }

  const { name, url, size, ext, updatedAt } = fileEntity.attributes

  return (
    <CardBase className="h-[196px]" {...rest}>
      <CardContent className="h-full justify-between p-4 lg:p-4">
        <div>
          <h3 className="text-h5 line-clamp-3 group-hover:underline">{name}</h3>
          <div className="text-gray-700">
            {updatedAt} &bull; {ext} &bull; {getFileSize(size, locale)}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="shrink-0 rounded-full bg-category-100 p-2.5 text-category-700">
            <DownloadIcon />
          </div>
          <MLink
            href={url}
            stretched
            className="text-button font-semibold"
            aria-label={getDownloadAriaLabel(fileEntity, name)}
          >
            {t('download')}
          </MLink>
        </div>
      </CardContent>
    </CardBase>
  )
}

export default FileCard
