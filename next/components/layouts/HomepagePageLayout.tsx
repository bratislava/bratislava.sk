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
import { STICKY_MENU_STATE, useWithoutMenuSection } from 'components/sections/useWithoutMenuSection'
import { WithoutMenuSection } from 'components/sections/WithoutMenuSection'
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
  const [searchOpen, setSearchOpen] = React.useState(false)
  const { elementRef, menuState } = useWithoutMenuSection()

  return (
    <div className={cx('font-inter', className)}>
      <div className="h-14 w-full bg-white">
        <SectionContainer>
          <NavBar menuItems={menuItems ?? []} handleSearch={setSearchOpen} />
        </SectionContainer>
      </div>
      <Bookmarks bookmarks={bookmarks} className="top-56" />
      <div className={cx({ 'hidden lg:block': searchOpen })}>
        <div className="bg-white">
          <WithoutMenuSection
            mainMenuItems={menuItems}
            homepageHeader={header}
            elementRef={elementRef}
          />
          <div
            className={cx(
              'mx-auto w-full bg-white fixed z-40 drop-shadow-sm shadow-lg left-0 hidden lg:block',
              {
                'top-14 transition-all duration-300': menuState === STICKY_MENU_STATE.VISIBLE,
                '-top-14 transition-all duration-300': menuState === STICKY_MENU_STATE.HIDDEN,
              },
            )}
          >
            <BAStickyMenu
              menuItems={menuItems}
              isVisible={menuState === STICKY_MENU_STATE.VISIBLE}
            />
          </div>
        </div>
        {children}

        {footer && <Footer {...footer} />}
      </div>
    </div>
  )
}

export default HomepagePageLayout
