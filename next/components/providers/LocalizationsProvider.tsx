import { useTranslation } from 'next-i18next'
import { createContext, ReactNode, useContext } from 'react'

export type LanguageCode = 'en' | 'sk'
export type Localizations = Partial<Record<LanguageCode, string>>

const LocalizationsContext = createContext<Localizations | null>(null)

const shortNameMap: Record<LanguageCode, string> = {
  en: 'language_short.en',
  sk: 'language_short.sk',
}

const longNameMap: Record<LanguageCode, string> = {
  en: 'language_long.en',
  sk: 'language_long.sk',
}

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
  const { i18n, t } = useTranslation('common')

  const currentLanguageCode = i18n.language as LanguageCode
  const otherLanguageCode = ['sk', 'en'].find((l) => l !== currentLanguageCode) as
    | LanguageCode
    | undefined

  return {
    currentLanguage: {
      locale: currentLanguageCode,
      shortName: t(shortNameMap[currentLanguageCode]),
      longName: t(longNameMap[currentLanguageCode]),
    },
    otherLanguage: otherLanguageCode && {
      locale: otherLanguageCode,
      shortName: t(shortNameMap[otherLanguageCode]),
      longName: t(longNameMap[otherLanguageCode]),
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      path: context?.[otherLanguageCode] ?? '/',
    },
  }
}
