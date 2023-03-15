import { HomepageHeaderFragment } from '@bratislava/strapi-sdk-homepage'
import {
  BAStickyMenu,
  Bookmarks,
  BookmarksProps,
  FooterProps,
  MenuMainItem,
  SectionContainer,
} from '@bratislava/ui-bratislava'
import cx from 'classnames'
import {
  STICKY_MENU_STATE,
  useWithoutStickyMenuSection,
} from 'components/sections/useWithoutStickyMenuSection'
import { WithoutStickyMenuSection } from 'components/sections/WithoutStickyMenuSection'
import React from 'react'

import Footer from '../molecules/Footer'
import NavBar from '../molecules/NavBar'

interface HomepagePageLayoutProps {
  header?: HomepageHeaderFragment | null | undefined
  footer?: FooterProps
  menuItems?: MenuMainItem[]
  bookmarks?: BookmarksProps['bookmarks']
}

const HomepagePageLayout = ({
  header,
  className,
  children,
  footer,
  menuItems,
  bookmarks,
}: React.HTMLAttributes<HTMLDivElement> & HomepagePageLayoutProps) => {
  // const isEN = true // TODO: use localization // TODO get bookmarks determined by localization
  const { elementRef, menuState } = useWithoutStickyMenuSection()

  return (
    <div className={className}>
      <header>
        <div className="h-14 w-full bg-white">
          <SectionContainer>
            <NavBar menuItems={menuItems ?? []} />
          </SectionContainer>
        </div>
        <div className="bg-white">
          <WithoutStickyMenuSection
            mainMenuItems={menuItems ?? []}
            homepageHeader={header}
            elementRef={elementRef}
          />
          <div
            className={cx(
              'mx-auto w-full bg-white fixed z-30 drop-shadow-sm shadow-lg left-0 hidden lg:block',
              {
                'top-14 transition-all duration-300': menuState === STICKY_MENU_STATE.VISIBLE,
                '-top-14 transition-all duration-300': menuState === STICKY_MENU_STATE.HIDDEN,
              },
            )}
          >
            <BAStickyMenu
              menuItems={menuItems ?? []}
              isVisible={menuState === STICKY_MENU_STATE.VISIBLE}
            />
          </div>
        </div>
      </header>
      <Bookmarks bookmarks={bookmarks} className="top-56" />
      <main id="content-anchor">{children}</main>
      {footer && <Footer {...footer} />}
    </div>
  )
}

export default HomepagePageLayout
