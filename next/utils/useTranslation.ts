import { useTranslation as useTranslationI18n } from 'next-i18next'

// TODO to be replaced by direct import
export const useTranslation = (key?: string) => {
  const { t } = useTranslationI18n('common', { keyPrefix: key })

  return { t }
}
