import { useTranslation } from 'next-i18next'

export const useLocale = () => {
  const { i18n } = useTranslation()

  return i18n.language
}
