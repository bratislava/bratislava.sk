import BusinessIcon from '@assets/images/account/business-icon.svg'
import HelpFilledIcon from '@assets/images/account/help-filled.svg'
import HelpIcon from '@assets/images/account/help-icon.svg'
import HomeIcon from '@assets/images/account/home-icon.svg'
import LogoutIcon from '@assets/images/account/logout.svg'
import PaymentIcon from '@assets/images/account/payment-icon.svg'
import ProfileIcon from '@assets/images/account/profile.svg'
import { SectionContainer } from '@bratislava/ui-bratislava'
import * as Sentry from '@sentry/nextjs'
import useAccount from '@utils/useAccount'
import cx from 'classnames'
import AccountNavBar from 'components/forms/segments/AccountNavBar/AccountNavBar'
import { usePageWrapperContext } from 'components/layouts/PageWrapper'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { ReactNode, useEffect } from 'react'

type AccountPageLayoutBase = {
  className?: string
  children: ReactNode
}

const sectionsList = [
  {
    id: 0,
    title: 'account:account_section_intro.navigation',
    icon: <HomeIcon />,
    link: '/account',
  },
  {
    id: 1,
    title: 'account:account_section_services',
    icon: <BusinessIcon />,
    link: '/account/municipal-services',
  },
  {
    id: 2,
    title: 'account:account_section_payment',
    icon: <PaymentIcon />,
    link: '/account/taxes-and-fees',
  },
  {
    id: 3,
    title: 'account:account_section_help',
    icon: <HelpIcon />,
    link: '/account/i-have-a-problem',
  },
]

const menuItems = [
  {
    id: 1,
    title: 'account:menu_profile_link',
    icon: <ProfileIcon />,
    link: '/',
  },
  {
    id: 2,
    title: 'account:menu_help_link',
    icon: <HelpFilledIcon />,
    link: '/',
  },
  {
    id: 3,
    title: 'account:menu_logout_link',
    icon: <LogoutIcon />,
    link: '/logout',
  },
]

const AccountPageLayout = ({ className, children }: AccountPageLayoutBase) => {
  const { locale, localizations = [] } = usePageWrapperContext()
  const router = useRouter()
  const { isAuth } = useAccount()
  useEffect(() => {
    if (!isAuth) {
      router.push({ pathname: '/login', query: { from: router.route } })
    }
  }, [isAuth])

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
    <div className={cx('flex flex-col min-h-screen', className)}>
      <SectionContainer>
        <AccountNavBar
          currentLanguage={locale}
          onLanguageChange={handleLanguageChange}
          sectionsList={sectionsList}
          menuItems={menuItems}
          navHidden
          languages={[
            { key: 'sk', title: t('language_short.sk') },
            { key: 'en', title: t('language_short.en') },
          ]}
        />
      </SectionContainer>

      <div className="bg-gray-0">{children}</div>
    </div>
  )
}

export default AccountPageLayout
