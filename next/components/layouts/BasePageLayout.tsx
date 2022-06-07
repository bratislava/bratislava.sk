import { AdvancedSearch, BAStickyMenu, FooterProps, MenuMainItem, SectionContainer } from '@bratislava/ui-bratislava'
import cx from 'classnames'
import { useState } from 'react'
import Footer from '../molecules/Footer'
import NavBar from '../molecules/NavBar'

interface BasePageLayoutProps {
  footer?: FooterProps
  menuItems?: MenuMainItem[]
  activeMenuItem?: string
}

const BasePageLayout = ({
  className,
  children,
  footer,
  menuItems,
  activeMenuItem,
}: React.HTMLAttributes<HTMLDivElement> & BasePageLayoutProps) => {
  const [searchOpen, setSearchOpen] = useState(false)
  return (
    <div className={cx('bg-background font-inter', className)}>
      <div className="bg-white h-20">
        <SectionContainer>
          <NavBar menuItems={menuItems ?? []} handleSearch={setSearchOpen} />
        </SectionContainer>
      </div>

      <div className="lg:h-[106px]">
        <div className="fixed hidden lg:block bg-white w-full shadow-lg drop-shadow-sm z-40 ">
          <BAStickyMenu menuItems={menuItems ?? []} active={activeMenuItem} />
        </div>
      </div>

      <div className={cx({ 'hidden lg:block': searchOpen })}>
        <div>{children}</div>

        {footer && <Footer {...footer} />}
      </div>

      <div className={cx('block lg:hidden w-full h-screen p-8 bg-font overflow-y-hidden', { hidden: !searchOpen })}>
        <AdvancedSearch className="text-white" />
      </div>
    </div>
  )
}

export default BasePageLayout
