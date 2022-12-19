import {
  BAStickyMenu,
  FooterProps,
  MenuMainItem,
  SectionContainer,
} from '@bratislava/ui-bratislava'
import cx from 'classnames'
import { useState } from 'react'

import Footer from '../molecules/Footer'
import NavBar from '../molecules/NavBar'

interface BasePageLayoutProps {
  footer?: FooterProps
  menuItems?: MenuMainItem[]
  activeMenuItem?: string
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
    <div className={cx('font-inter', className)}>
      <div className="h-16 bg-white lg:h-14">
        <SectionContainer>
          <NavBar menuItems={menuItems ?? []} handleSearch={setSearchOpen} pageColor={pageColor} />
        </SectionContainer>
      </div>

      <div id="sticky-menu" className="lg:h-[106px]">
        <div className="fixed z-40 hidden w-full bg-white shadow-lg drop-shadow-sm lg:block ">
          <BAStickyMenu menuItems={menuItems ?? []} isVisible />
        </div>
      </div>

      <div className={cx({ 'hidden lg:block': searchOpen })}>
        <div>{children}</div>

        {footer && <Footer {...footer} />}
      </div>
    </div>
  )
}

export default BasePageLayout
