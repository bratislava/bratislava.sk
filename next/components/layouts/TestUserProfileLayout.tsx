import { SectionContainer } from '@bratislava/ui-bratislava'
import cx from 'classnames'
import { usePageWrapperContext } from 'components/layouts/PageWrapper'
import React from 'react'

import AccountNavBar from '../forms/segments/AccountNavBar/AccountNavBar'

interface GeneralLayoutProps {
  className?: string
}

const TestUserProfileLayout = ({
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

export default TestUserProfileLayout
