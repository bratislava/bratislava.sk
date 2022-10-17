import { BANavBar } from '@bratislava/ui-bratislava'
import * as Sentry from '@sentry/nextjs'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import * as React from 'react'
import { ReactNode } from 'react'

import { usePageWrapperContext } from '../layouts/PageWrapper'
import { MenuMainItem } from '@bratislava/ui-bratislava/HomepageMenu/types'

interface Props {
  menuItems?: MenuMainItem[]
  onSearchClick?(isSarchOpen: boolean): void
  isSearchOpen?: boolean
  pageColor?: string | null
  children?: ReactNode
}

const NavBar = ({ menuItems = [], onSearchClick, pageColor, children, isSearchOpen = false }: Props) => {
  const router = useRouter()
  const { locale, localizations = [] } = usePageWrapperContext()
  const [t] = useTranslation('common')

  const handleLanguageChange = async ({ key }: { key: string }): Promise<void> => {
    const path = localizations.find((l) => l.locale === key)?.slug || ''
    try {
      await router.push(`/${path}`, undefined, { locale: key })
    } catch (error) {
      Sentry.captureException(error)
    }
  }

  return (
    <div className="z-[9999] h-auto w-full bg-white">
      <BANavBar
        menuItems={menuItems}
        onLanguageChange={handleLanguageChange}
        currentLanguage={locale}
        onSearchClick={onSearchClick}
        isSearchOpen={isSearchOpen}
        languages={[
          { key: 'sk', title: t('language_short.sk') },
          { key: 'en', title: t('language_short.en') },
        ]}
        pageColor={pageColor}
      />
      {children}
    </div>
  )
}

export default NavBar
