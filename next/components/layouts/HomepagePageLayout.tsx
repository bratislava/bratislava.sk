import { FooterProps, MenuMainItem, SectionContainer } from '@bratislava/ui-bratislava'
import NavMenu, { MenuItem } from '@bratislava/ui-bratislava/NavMenu/NavMenu'
import React from 'react'

import Footer from '../molecules/Footer'
import NavBar from '../molecules/NavBar'

interface HomepagePageLayoutProps {
  footer?: FooterProps
  menuItemsOld?: MenuMainItem[]
  menus: MenuItem[]
}

const HomepagePageLayout = ({
  className,
  children,
  footer,
  menuItemsOld,
  menus,
}: React.HTMLAttributes<HTMLDivElement> & HomepagePageLayoutProps) => {
  // const isEN = true // TODO: use localization // TODO get bookmarks determined by localization

  return (
    <div className={className}>
      <header>
        <div className="h-14 w-full bg-white">
          <SectionContainer>
            <NavBar menuItems={menuItemsOld ?? []} />
          </SectionContainer>
        </div>
        <div className="mx-auto w-full fixed z-30 top-14 left-0 hidden lg:block">
          <NavMenu menus={menus} />
        </div>
      </header>
      {/* TODO tmp fix by lg:mt-20 - remove when solving layout */}
      <main id="content-anchor" className="lg:mt-20">
        {children}
      </main>
      {footer && <Footer {...footer} />}
    </div>
  )
}

export default HomepagePageLayout
