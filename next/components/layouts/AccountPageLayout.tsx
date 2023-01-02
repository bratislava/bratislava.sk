import { FooterProps, MenuMainItem, SectionContainer } from '@bratislava/ui-bratislava'
import cx from 'classnames'
import { useState } from 'react'

import NavBar from '../molecules/NavBar'

interface AccountPageLayoutProps {
  footer?: FooterProps
  menuItems?: MenuMainItem[]
  activeMenuItem?: string
  pageColor?: string
}

const AccountPageLayout = ({
  className,
  children,
  menuItems,
  pageColor,
}: React.HTMLAttributes<HTMLDivElement> & AccountPageLayoutProps) => {
  const [searchOpen, setSearchOpen] = useState(false)
  return (
    <div className={cx('flex', 'flex-col', 'h-screen', 'font-inter', className)}>
      <div className="h-16 bg-white lg:h-14">
        <SectionContainer>
          <NavBar menuItems={menuItems ?? []} handleSearch={setSearchOpen} pageColor={pageColor} />
        </SectionContainer>
      </div>

      <div
        className={cx('bg-main-100 flex flex-grow', {
          'hidden lg:block': searchOpen,
        })}
      >
        {children}
      </div>
    </div>
  )
}

export default AccountPageLayout
