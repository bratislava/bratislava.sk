import { SectionContainer } from '@bratislava/ui-bratislava'
import cx from 'classnames'
import AccountNavBar from 'components/forms/segments/AccountNavBar/AccountNavBar'
import { usePageWrapperContext } from 'components/layouts/PageWrapper'
import { ReactNode } from 'react'

type AccountPageLayoutBase = {
  className?: string
  children: ReactNode
}

const AccountPageLayout = ({ className, children }: AccountPageLayoutBase) => {
  const { locale } = usePageWrapperContext()

  return (
    <div className={cx('flex flex-col min-h-screen', className)}>
      <SectionContainer>
        <AccountNavBar currentLanguage={locale} />
      </SectionContainer>

      <div className="bg-gray-0">{children}</div>
    </div>
  )
}

export default AccountPageLayout
