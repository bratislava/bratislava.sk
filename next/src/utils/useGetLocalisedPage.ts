import { AdminGroupEntityFragment } from '@/src/services/graphql'
import { useLocale } from '@/src/utils/useLocale'

// TODO this function may be extended to support more types
export const useGetLocalisedPage = (originalPage: AdminGroupEntityFragment['landingPage']) => {
  const locale = useLocale()

  if (!originalPage) return null

  // Strapi returns only other locales in localizations prop
  return originalPage.locale === locale
    ? originalPage
    : originalPage.localizations.find((page) => page?.locale === locale)
}
