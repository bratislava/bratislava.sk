import { UploadFileEntityFragment } from '@bratislava/strapi-sdk-homepage'
import { getFileSize } from '@utils/getFileSize'
import { useLocale, useTranslations } from 'next-intl'
import { useCallback } from 'react'

export const useDownloadAriaLabel = () => {
  const t = useTranslations('DownloadAriaLabel')
  const locale = useLocale()

  // borrowed from project https://github.com/bratislava/marianum
  const getDownloadAriaLabel = useCallback(
    (file: UploadFileEntityFragment, title: string): string => {
      if (!file.attributes) {
        return t('downloadFile')
      }
      const { size, ext } = file.attributes
      const formattedSize = getFileSize(size, locale)
      const extFormatted = ext ?? t('unknownFormat')

      return t('downloadFileAriaLabel', {
        title,
        ext: extFormatted,
        size: formattedSize,
      })
    },
    [locale, t],
  )
  return { getDownloadAriaLabel }
}
