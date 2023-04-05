import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import * as React from 'react'

import { usePageContext } from '../../layouts/PageContextProvider'
import MobileNavBar from './MobileNavBar'
import NavBarHeader from './NavBarHeader/NavBarHeader'
import NavMenu from './NavMenu/NavMenu'

const NavBar = () => {
  const router = useRouter()
  const { locale, localizations = [] } = usePageContext()
  const [t] = useTranslation('common')

  const handleLanguageChange = async ({ key }: { key: string }) => {
    const path = localizations.find((l) => l.locale === key)?.slug || ''
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    try {
      await router.push(`/${path}`, undefined, { locale: key })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="fixed top-0 z-30 hidden w-full bg-white lg:block">
        <div className="w-full">
          {/* TODO mobile header, NavBarHeader (= new component) renders only on desktop */}
          {/* TODO language change is overcomplicated */}
          <NavBarHeader
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
      <div className="hidden h-[137px] lg:block" />

      <MobileNavBar
        className="lg:hidden"
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
