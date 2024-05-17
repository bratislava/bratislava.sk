import { useLocale, useTranslations } from 'next-intl'

import { FileItemBlockFragment } from '@/services/graphql'
import { formatFileExtension } from '@/utils/formatFileExtension'
import { formatFileSize } from '@/utils/formatFileSize'

export const useGetDownloadAriaLabel = () => {
  const t = useTranslations('FileList.aria')
  const locale = useLocale()

  const getDownloadAriaLabel = (file: FileItemBlockFragment): string => {
    if (!file) return `${t('downloadFile')}`

    const formattedFileFormat = formatFileExtension(file.media.data?.attributes?.ext)
    const formattedFileSize = formatFileSize(file.media.data?.attributes?.size, locale)

    return `${t('downloadFileAriaLabel', {
      title: file.title ?? file.media.data?.attributes?.name,
      format: formattedFileFormat,
      size: formattedFileSize,
    })}`
  }

  return { getDownloadAriaLabel }
}
