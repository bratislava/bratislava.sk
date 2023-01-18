import { SectionContainer } from '@bratislava/ui-bratislava'
import AccountNavBar from '@bratislava/ui-bratislava/AccountNavBar/AccountNavBar'
import cx from 'classnames'
import { usePageWrapperContext } from 'components/layouts/PageWrapper'

interface GeneralLayoutProps {
  className?: string
}

const GeneralLayout = ({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement> & GeneralLayoutProps) => {
  const { locale } = usePageWrapperContext()

  return (
    <div className={cx('flex', 'flex-col', 'h-screen', 'font-inter', className)}>
      <div className="h-16 bg-white lg:h-14">
        <SectionContainer>
          <AccountNavBar currentLanguage={locale} />
        </SectionContainer>
      </div>

      <div className="bg-gray-50 flex flex-col grow">{children}</div>
    </div>
  )
}

export default GeneralLayout
