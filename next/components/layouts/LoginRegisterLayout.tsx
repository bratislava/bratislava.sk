import { FooterProps, MenuMainItem, SectionContainer } from '@bratislava/ui-bratislava'
import cx from 'classnames'
import AccountNavBar from 'components/forms/segments/AccountNavBar/AccountNavBar'
import { usePageWrapperContext } from 'components/layouts/PageWrapper'

interface LoginRegisterLayoutProps {
  footer?: FooterProps
  menuItems?: MenuMainItem[]
  activeMenuItem?: string
  pageColor?: string
}

const LoginRegisterLayout = ({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement> & LoginRegisterLayoutProps) => {
  const { locale } = usePageWrapperContext()

  return (
    <div className={cx('flex', 'flex-col', 'min-h-screen', 'font-inter', className)}>
      <div className="h-16 bg-white lg:h-14">
        <SectionContainer>
          <AccountNavBar currentLanguage={locale} />
        </SectionContainer>
      </div>

      <div className="bg-main-100 flex grow">{children}</div>
    </div>
  )
}

export default LoginRegisterLayout
