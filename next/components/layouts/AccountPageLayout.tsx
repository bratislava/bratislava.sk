import { FooterProps, MenuMainItem, SectionContainer } from '@bratislava/ui-bratislava'
import AccountNavBar from '@bratislava/ui-bratislava/AccountNavBar/AccountNavBar'
import cx from 'classnames'
import { usePageWrapperContext } from 'components/layouts/PageWrapper'

interface AccountPageLayoutProps {
  footer?: FooterProps
  menuItems?: MenuMainItem[]
  activeMenuItem?: string
  pageColor?: string
}

const AccountPageLayout = ({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement> & AccountPageLayoutProps) => {
  const { locale } = usePageWrapperContext()

  return (
    <div className={cx('flex', 'flex-col', 'h-screen', 'font-inter', className)}>
      <div className="h-16 bg-white lg:h-14">
        <SectionContainer>
          <AccountNavBar currentLanguage={locale} />
        </SectionContainer>
      </div>

      <div className="bg-main-100 flex grow">{children}</div>
    </div>
  )
}

export default AccountPageLayout
