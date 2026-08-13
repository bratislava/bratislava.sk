import { useTranslation } from 'next-i18next/pages'

export const useLocale = () => {
  const { i18n } = useTranslation()

  return i18n.language
}
