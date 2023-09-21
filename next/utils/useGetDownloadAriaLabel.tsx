import { FileItemBlockFragment } from '@backend/graphql'
import { formatFileSize } from '@utils/formatFileSize'
import { useLocale, useTranslations } from 'next-intl'

export const useGetDownloadAriaLabel = () => {
  const t = useTranslations('FileList.aria')
  const locale = useLocale()

  const getDownloadAriaLabel = (file: FileItemBlockFragment): string => {
    if (!file) return `${t('downloadFile')}`

    const formattedFileFormat = file.media.data?.attributes?.ext?.replace(/^\./, '').toUpperCase()
    const formattedFileSize = formatFileSize(file.media.data?.attributes?.size, locale)

    return `${t('downloadFileAriaLabel', {
      title: file.title ?? file.media.data?.attributes?.name,
      format: formattedFileFormat,
      size: formattedFileSize,
    })}`
  }

  return { getDownloadAriaLabel }
}
