import { MenuMainItem } from '@bratislava/ui-bratislava'
import * as Sentry from '@sentry/nextjs'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import * as React from 'react'

import { usePageContext } from '../../layouts/PageContextProvider'
import CookieConsent from '../CookieConsent'
import MobileNavBar from './MobileNavBar'
import NavBarHeader from './NavBarHeader/NavBarHeader'
import NavMenu from './NavMenu/NavMenu'

interface IProps {
  menuItems: MenuMainItem[]
  pageColor?: string
}

const NavBar = ({ menuItems, pageColor }: IProps) => {
  const router = useRouter()
  const { locale, localizations = [] } = usePageContext()
  const [t] = useTranslation('common')

  const handleLanguageChange = async ({ key }: { key: string }) => {
    const path = localizations.find((l) => l.locale === key)?.slug || ''
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    try {
      await router.push(`/${path}`, undefined, { locale: key })
    } catch (error) {
      Sentry.captureException(error)
    }
  }

  return (
    <>
      <CookieConsent />

      <div className="fixed top-0 bg-white w-full z-30 hidden lg:block">
        <div className="w-full">
          {/* TODO mobile header, NavBarHeader (= new component) renders only on desktop */}
          {/* TODO language change is overcomplicated */}
          <NavBarHeader
            className=""
            onLanguageChange={handleLanguageChange}
            currentLanguage={locale}
            languages={[
              { key: 'sk', title: t('language_long.sk') },
              { key: 'en', title: t('language_long.en') },
            ]}
          />
          <NavMenu />
        </div>
      </div>
      <div className="h-[137px] hidden lg:block" />

      {/* TODO mobile header, BANavBar (= old component) renders only on mobile */}
      <MobileNavBar
        className="lg:hidden"
        menuItems={menuItems}
        onLanguageChange={handleLanguageChange}
        currentLanguage={locale}
        languages={[
          { key: 'sk', title: t('language_short.sk') },
          { key: 'en', title: t('language_short.en') },
        ]}
      />
    </>
  )
}

export default NavBar
