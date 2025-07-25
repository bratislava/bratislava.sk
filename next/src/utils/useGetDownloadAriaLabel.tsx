import { FileBlockFragment, FileItemBlockFragment } from '@/src/services/graphql'
import { formatFileExtension } from '@/src/utils/formatFileExtension'
import { formatFileSize } from '@/src/utils/formatFileSize'
import { useLocale } from '@/src/utils/useLocale'
import { useTranslation } from '@/src/utils/useTranslation'

export const useGetDownloadAriaLabel = () => {
  const { t } = useTranslation()
  const locale = useLocale()

  const getDownloadAriaLabel = (file: FileItemBlockFragment | FileBlockFragment): string => {
    if (!file) return `${t('FileList.aria.downloadFile')}`

    const formattedFileFormat = formatFileExtension(file.media?.ext)
    const formattedFileSize = formatFileSize(file.media?.size, locale)

    return `${t('FileList.aria.downloadFileAriaLabel', {
      title: file.title ?? file.media?.name,
      format: formattedFileFormat,
      size: formattedFileSize,
    })}`
  }

  return { getDownloadAriaLabel }
}
