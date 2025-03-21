import { useTranslation } from '@/src/utils/useTranslation'

export const useTitle = (childTitle?: string | null) => {
  const { t } = useTranslation()

  if (childTitle) {
    return t('useTitle.titleWithChild', { childTitle })
  }
  return t('useTitle.title')
}
