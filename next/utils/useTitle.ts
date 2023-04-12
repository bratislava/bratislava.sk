import { useTranslation } from 'next-i18next'

export const useTitle = (childTitle?: string | null) => {
  const { t } = useTranslation(['common'])

  if (childTitle) {
    return t('titleWithChild', { childTitle })
  }
  return t('title')
}
