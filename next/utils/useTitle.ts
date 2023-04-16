import { useTranslations } from 'next-intl';


export const useTitle = (childTitle?: string | null) => {
  const t = useTranslations()

  if (childTitle) {
    return t('titleWithChild', { childTitle })
  }
  return t('title')
}
