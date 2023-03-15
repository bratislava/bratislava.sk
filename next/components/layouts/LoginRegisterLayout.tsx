import { SectionContainer } from '@bratislava/ui-bratislava'
import cx from 'classnames'
import LoginRegisterNavBar from 'components/forms/segments/LoginRegisterNavBar/LoginRegisterNavBar'
import { usePageWrapperContext } from 'components/layouts/PageWrapper'
import { ReactNode } from 'react'

interface LoginRegisterLayoutProps {
  className?: string
  children: ReactNode
  backButtonHidden?: boolean
}

const LoginRegisterLayout = ({
  className,
  children,
  backButtonHidden,
}: React.HTMLAttributes<HTMLDivElement> & LoginRegisterLayoutProps) => {
  const { locale } = usePageWrapperContext()

  return (
    <div className={cx('flex', 'flex-col', 'min-h-screen', className)}>
      <div className="h-16 bg-white lg:h-14">
        <SectionContainer>
          <LoginRegisterNavBar currentLanguage={locale} backButtonHidden={backButtonHidden} />
        </SectionContainer>
      </div>

      <div className="md:bg-main-100 flex flex-col gap-0 md:gap-6 grow pt-0 md:pt-8">
        {children}
      </div>
    </div>
  )
}

export default LoginRegisterLayout
