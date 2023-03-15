import CityIcon from '@assets/images/account/city.svg'
import HelpIcon from '@assets/images/account/help-icon.svg'
import LogoutIcon from '@assets/images/account/logout.svg'
import ProfileIcon from '@assets/images/account/profile.svg'
import { SectionContainer } from '@bratislava/ui-bratislava'
import * as Sentry from '@sentry/nextjs'
import cx from 'classnames'
import AccountNavBar from 'components/forms/segments/AccountNavBar/AccountNavBar'
import { usePageWrapperContext } from 'components/layouts/PageWrapper'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

type FormPageLayoutBase = {
  className?: string
  children: ReactNode
  navHidden?: boolean
}

const menuItems = [
  {
    id: 1,
    title: 'account:menu_account_link',
    icon: <CityIcon />,
    link: '/account',
  },
  {
    id: 2,
    title: 'account:menu_profile_link',
    icon: <ProfileIcon />,
    link: '/user-profile',
  },
  {
    id: 3,
    title: 'account:menu_help_link',
    icon: <HelpIcon />,
    link: '/account/i-have-a-problem',
  },
  {
    id: 4,
    title: 'account:menu_logout_link',
    icon: <LogoutIcon />,
    link: '/logout',
  },
]

const FormPageLayout = ({ className, navHidden, children }: FormPageLayoutBase) => {
  const { locale, localizations = [] } = usePageWrapperContext()
  const router = useRouter()

  const [t] = useTranslation()

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
    <div className={cx('flex flex-col min-h-screen', className)}>
      <SectionContainer>
        <AccountNavBar
          currentLanguage={locale}
          onLanguageChange={handleLanguageChange}
          menuItems={menuItems}
          navHidden={navHidden}
          languages={[
            { key: 'sk', title: t('language_long.sk') },
            { key: 'en', title: t('language_long.en') },
          ]}
        />
      </SectionContainer>

      <div className="bg-gray-0">{children}</div>
    </div>
  )
}

export default FormPageLayout
