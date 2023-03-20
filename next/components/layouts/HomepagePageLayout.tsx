import { HomepageHeaderFragment } from '@bratislava/strapi-sdk-homepage'
import {
  Bookmarks,
  BookmarksProps,
  FooterProps,
  MenuMainItem,
  SectionContainer,
} from '@bratislava/ui-bratislava'
import NavMenu, { MenuItem } from '@bratislava/ui-bratislava/NavMenu/NavMenu'
import cx from 'classnames'
import { WelcomeSection } from 'components/sections/WelcomeSection'
import React from 'react'

import Footer from '../molecules/Footer'
import NavBar from '../molecules/NavBar'

interface HomepagePageLayoutProps {
  header?: HomepageHeaderFragment | null | undefined
  footer?: FooterProps
  menuItemsOld?: MenuMainItem[]
  menus: MenuItem[]
  bookmarks?: BookmarksProps['bookmarks']
}

const HomepagePageLayout = ({
  header,
  className,
  children,
  footer,
  menuItemsOld,
  menus,
  bookmarks,
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
        <div className="mx-auto w-full bg-white fixed z-30 drop-shadow-sm shadow-lg top-14 left-0 hidden lg:block">
          <NavMenu menus={menus} />
        </div>
        <div className="bg-white">
          <WelcomeSection
            menus={menus}
            mainMenuItems={menuItemsOld ?? []}
            homepageHeader={header}
          />
        </div>
      </header>
      <Bookmarks bookmarks={bookmarks} className="top-56" />
      <main id="content-anchor">{children}</main>
      {footer && <Footer {...footer} />}
    </div>
  )
}

export default HomepagePageLayout
