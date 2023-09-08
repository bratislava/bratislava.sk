import { TFile } from '@bratislava/ui-bratislava/FileList/FileList'
import { useTranslations } from 'next-intl'
import { useLocale } from 'next-intl'
import { formatFileSize } from '@utils/formatFileSize'

export const useGetDownloadAriaLabel = () => {
  const t = useTranslations('FileList.aria')
  const locale = useLocale()

  const getDownloadAriaLabel = (file: TFile): string => {
    if (!file) return `${t('downloadFile')}`
    // TODO return file name if file title not provided

    const formattedFileFormat = file.media?.ext?.replace(/^\./, '').toUpperCase()
    const formattedFileSize = formatFileSize(file.media?.size, locale)

    return `${t('downloadFileAriaLabel', {
      title: file.title ?? '',
      format: formattedFileFormat,
      size: formattedFileSize,
    })}`
  }

  return { getDownloadAriaLabel }
}
