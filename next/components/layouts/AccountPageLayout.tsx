import BusinessIcon from '@assets/images/account/business-icon.svg'
import HelpIcon from '@assets/images/account/help-icon.svg'
import HomeIcon from '@assets/images/account/home-icon.svg'
import PaymentIcon from '@assets/images/account/payment-icon.svg'
import { SectionContainer } from '@bratislava/ui-bratislava'
import cx from 'classnames'
import AccountNavBar from 'components/forms/segments/AccountNavBar/AccountNavBar'
import AccountSectionHeader from 'components/forms/segments/AccountSectionHeader/AccountSectionHeader'
import { SectionItemBase } from 'components/forms/types/AccountTypes'
import { usePageWrapperContext } from 'components/layouts/PageWrapper'
import { useTranslation } from 'next-i18next'
import { ReactNode } from 'react'

type AccountPageLayoutBase = {
  className?: string
  children: ReactNode
}

const AccountPageLayout = ({ className, children }: AccountPageLayoutBase) => {
  const { t } = useTranslation('account')
  const { locale } = usePageWrapperContext()

  const sectionsList: SectionItemBase[] = [
    { id: 0, title: t('account_section_intro'), icon: <HomeIcon />, link: '/intro' },
    {
      id: 1,
      title: t('account_section_services'),
      icon: <BusinessIcon />,
      link: '/municipal-services',
    },
    {
      id: 2,
      title: t('account_section_payment'),
      icon: <PaymentIcon />,
      link: '/taxes-and-fees',
    },
    { id: 3, title: t('account_section_help'), icon: <HelpIcon />, link: '/i-have-a-problem' },
  ]

  return (
    <div className={cx('flex flex-col min-h-screen', className)}>
      <SectionContainer>
        <AccountNavBar currentLanguage={locale} sectionsList={sectionsList} />
      </SectionContainer>

      <AccountSectionHeader sectionsList={sectionsList} />
      <div className="bg-gray-0 flex grow">{children}</div>
    </div>
  )
}

export default AccountPageLayout
