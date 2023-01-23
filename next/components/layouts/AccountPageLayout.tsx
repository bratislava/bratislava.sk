import BusinessIcon from '@assets/images/account/business-icon.svg'
import HelpIcon from '@assets/images/account/help-icon.svg'
import HomeIcon from '@assets/images/account/home-icon.svg'
import PaymentIcon from '@assets/images/account/payment-icon.svg'
import { FooterProps, MenuMainItem, SectionContainer } from '@bratislava/ui-bratislava'
import cx from 'classnames'
import AccountNavBar from 'components/forms/segments/AccountNavBar/AccountNavBar'
import { usePageWrapperContext } from 'components/layouts/PageWrapper'
import { ReactNode, useState } from 'react'

interface AccountPageLayoutProps {
  footer?: FooterProps
  menuItems?: MenuMainItem[]
  activeMenuItem?: string
  pageColor?: string
}

type AccountPageLayoutBase = {
  className?: string
  children: ReactNode
}

interface SectionItemBase {
  id: number
  title: string
  icon: ReactNode
}

const sectionsList: SectionItemBase[] = [
  { id: 0, title: 'Úvod', icon: <HomeIcon /> },
  { id: 1, title: 'Mestské služby', icon: <BusinessIcon /> },
  { id: 2, title: 'Dane a poplatky', icon: <PaymentIcon /> },
  { id: 3, title: 'Mám problém', icon: <HelpIcon /> },
]

const AccountPageLayout = ({
  className,
  children,
}: AccountPageLayoutBase & AccountPageLayoutProps) => {
  const { locale } = usePageWrapperContext()
  // need todo context with states
  const [activeSection, setActiveSection] = useState<number>(0)

  return (
    <div className={cx('flex flex-col min-h-screen', className)}>
      {/* <div className=""> */}
      <SectionContainer>
        <AccountNavBar
          currentLanguage={locale}
          sectionsList={sectionsList}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      </SectionContainer>
      {/* </div> */}

      <div className="bg-gray-50 h-[136px] mt-28">
        <span className="text-h1 flex items-end w-full h-full max-w-screen-1.5lg m-auto pb-8">
          {sectionsList[activeSection].title}
        </span>
      </div>
      <div className="bg-gray-0 flex grow">{children}</div>
    </div>
  )
}

export default AccountPageLayout
