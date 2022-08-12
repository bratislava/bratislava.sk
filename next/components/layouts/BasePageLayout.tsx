import {
  AdvancedSearch,
  FooterProps,
  MenuMainItem,
  StickyNavigationMenu,
} from '@bratislava/ui-bratislava'
import cx from 'classnames'
import { useState } from 'react'

import Footer from '../molecules/Footer'
import NavBar from '../molecules/NavBar'

interface BasePageLayoutProps {
  footer?: FooterProps
  menuItems?: MenuMainItem[]
  pageColor?: string
}

const BasePageLayout = ({
  className,
  children,
  footer,
  menuItems,
  pageColor,
}: React.HTMLAttributes<HTMLDivElement> & BasePageLayoutProps) => {
  const [searchOpen, setSearchOpen] = useState(false)
  return (
    <div className={cx('bg-background font-inter', className)}>
      <div className="h-16 bg-white lg:h-14">
        <NavBar menuItems={menuItems} onSearchClick={setSearchOpen} pageColor={pageColor} isSearchOpen={searchOpen} />
      </div>

      <div id="sticky-menu" className="lg:h-[106px]">
        <div className="fixed z-40 hidden w-full bg-white shadow-lg drop-shadow-sm lg:block ">
          <StickyNavigationMenu menuItems={menuItems ?? []} />
        </div>
      </div>

      <div className={cx({ 'hidden lg:block': searchOpen })}>
        <div>{children}</div>

        {footer && <Footer {...footer} />}
      </div>

      <div className={cx('block lg:hidden w-full h-screen p-8 bg-font overflow-y-hidden', { hidden: !searchOpen })}>
        <AdvancedSearch className="text-white" placeholder="" title="" buttonText="TODO-FIX" /* options={[]} */ />
      </div>
    </div>
  )
}

export default BasePageLayout
