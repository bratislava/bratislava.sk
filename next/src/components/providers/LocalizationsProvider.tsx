import { createContext, ReactNode, useContext } from 'react'

import { useLocale } from '@/src/utils/useLocale'
import { useTranslation } from '@/src/utils/useTranslation'

export type LanguageCode = 'en' | 'sk'
export type Localizations = Partial<Record<LanguageCode, string>>

const LocalizationsContext = createContext<Localizations | null>(null)

export const LocalizationsProvider = ({
  children,
  localizations,
}: {
  children: ReactNode
  localizations: Localizations
}) => {
  return (
    <LocalizationsContext.Provider value={localizations}>{children}</LocalizationsContext.Provider>
  )
}

export const useLocalizations = () => {
  const context = useContext(LocalizationsContext)
  const { t } = useTranslation()
  const locale = useLocale()

  const shortNameMap = {
    en: t('useLocalizations.shortName.en'),
    sk: t('useLocalizations.shortName.sk'),
  } as const

  const longNameMap = {
    en: t('useLocalizations.longName.en'),
    sk: t('useLocalizations.longName.sk'),
  } as const

  const currentLanguageCode = locale as LanguageCode
  const otherLanguageCode = ['sk', 'en'].find((l) => l !== currentLanguageCode) as
    | LanguageCode
    | undefined

  return {
    currentLanguage: {
      locale: currentLanguageCode,
      shortName: shortNameMap[currentLanguageCode],
      longName: longNameMap[currentLanguageCode],
    },
    otherLanguage: otherLanguageCode && {
      locale: otherLanguageCode,
      shortName: shortNameMap[otherLanguageCode],
      longName: longNameMap[otherLanguageCode],
       
      path: context?.[otherLanguageCode] ?? '/',
    },
  }
}
