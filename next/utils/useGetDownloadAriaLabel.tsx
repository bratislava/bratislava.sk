import { FileBlockFragment, FileItemBlockFragment } from '@/services/graphql'
import { formatFileExtension } from '@/utils/formatFileExtension'
import { formatFileSize } from '@/utils/formatFileSize'
import { useLocale } from '@/utils/useLocale'
import { useTranslation } from '@/utils/useTranslation'

export const useGetDownloadAriaLabel = () => {
  const { t } = useTranslation()
  const locale = useLocale()

  const getDownloadAriaLabel = (file: FileItemBlockFragment | FileBlockFragment): string => {
    if (!file) return `${t('FileList.aria.downloadFile')}`

    const formattedFileFormat = formatFileExtension(file.media?.data?.attributes?.ext)
    const formattedFileSize = formatFileSize(file.media?.data?.attributes?.size, locale)

    return `${t('FileList.aria.downloadFileAriaLabel', {
      title: file.title ?? file.media?.data?.attributes?.name,
      format: formattedFileFormat,
      size: formattedFileSize,
    })}`
  }

  return { getDownloadAriaLabel }
}
