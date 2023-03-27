import { MenuMainItem } from '@bratislava/ui-bratislava'
import BANavBar from '@bratislava/ui-bratislava/BANavBar/BANavBar'
import NavBarHeader from '@bratislava/ui-bratislava/NavBarHeader/NavBarHeader'
import * as Sentry from '@sentry/nextjs'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import * as React from 'react'

import { usePageWrapperContext } from '../layouts/PageWrapper'

interface IProps {
  menuItems: MenuMainItem[]
  pageColor?: string
}

const NavBar = ({ menuItems, pageColor }: IProps) => {
  const router = useRouter()
  const { locale, localizations = [] } = usePageWrapperContext()
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
      {/* TODO mobile header, NavBarHeader (= new component) renders only on desktop */}
      {/* TODO language change is overcomplicated */}
      <NavBarHeader
        className="hidden lg:block"
        onLanguageChange={handleLanguageChange}
        currentLanguage={locale}
        languages={[
          { key: 'sk', title: t('language_long.sk') },
          { key: 'en', title: t('language_long.en') },
        ]}
      />

      {/* TODO mobile header, BANavBar (= old component) renders only on mobile */}
      <BANavBar
        className="lg:hidden"
        menuItems={menuItems}
        onLanguageChange={handleLanguageChange}
        currentLanguage={locale}
        languages={[
          { key: 'sk', title: t('language_short.sk') },
          { key: 'en', title: t('language_short.en') },
        ]}
        pageColor={pageColor}
      />
    </>
  )
}

export default NavBar
