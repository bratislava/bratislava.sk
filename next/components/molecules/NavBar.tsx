import { BANavBar, MenuMainItem } from '@bratislava/ui-bratislava'
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
    <BANavBar
      menuItems={menuItems}
      onLanguageChange={handleLanguageChange}
      currentLanguage={locale}
      languages={[
        { key: 'sk', title: t('language_short.sk') },
        { key: 'en', title: t('language_short.en') },
      ]}
      pageColor={pageColor}
    />
  )
}

export default NavBar
