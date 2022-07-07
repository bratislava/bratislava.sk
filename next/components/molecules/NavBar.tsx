import { BANavBar, MenuMainItem } from '@bratislava/ui-bratislava'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import * as React from 'react'

import { usePageWrapperContext } from '../layouts/PageWrapper'

interface IProps {
  menuItems: MenuMainItem[]
  handleSearch?: (searchOpen: boolean) => void
}

const NavBar = ({ menuItems, handleSearch }: IProps) => {
  const router = useRouter()
  const { locale, localizations = [] } = usePageWrapperContext()
  const [t] = useTranslation('common')

  const handleLanguageChange = ({ key }: { key: string }) => {
    const path = localizations.find((l) => l.locale === key)?.slug || ''
    router.push(`/${path}`, undefined, { locale: key })
  }

  return (
    <BANavBar
      menuItems={menuItems}
      onLanguageChange={handleLanguageChange}
      currentLanguage={locale}
      handleSearch={handleSearch}
      languages={[
        { key: 'sk', title: t('language_short.sk') },
        { key: 'en', title: t('language_short.en') },
      ]}
    />
  )
}

export default NavBar
