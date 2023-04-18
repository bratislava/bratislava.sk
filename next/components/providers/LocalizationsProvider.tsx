import { useLocale, useTranslations } from 'next-intl'

import { createContext, ReactNode, useContext } from 'react'
import MessageKeys from 'use-intl/dist/core/utils/MessageKeys'

export type LanguageCode = 'en' | 'sk'
export type Localizations = Partial<Record<LanguageCode, string>>

const LocalizationsContext = createContext<Localizations | null>(null)

const shortNameMap = {
  en: 'language_short.en',
  sk: 'language_short.sk',
} as const

const longNameMap = {
  en: 'language_long.en',
  sk: 'language_long.sk',
} as const

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
  const t = useTranslations()
  const locale = useLocale()

  const currentLanguageCode = locale as LanguageCode
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
