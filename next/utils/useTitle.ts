import { useTranslation } from '@/utils/useTranslation'

export const useTitle = (childTitle?: string | null) => {
  const { t } = useTranslation()

  if (childTitle) {
    return t('titleWithChild', { childTitle })
  }
  return t('title')
}
