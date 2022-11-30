import {
  Bookmarks,
  BookmarksProps,
  FooterProps,
  MenuMainItem,
  SectionContainer,
} from '@bratislava/ui-bratislava'
import cx from 'classnames'
import React from 'react'

import Footer from '../molecules/Footer'
import NavBar from '../molecules/NavBar'

interface HomepagePageLayoutProps {
  footer?: FooterProps
  menuItems?: MenuMainItem[]
  bookmarks?: BookmarksProps['bookmarks']
}

const HomepagePageLayout = ({
  className,
  children,
  footer,
  menuItems,
  bookmarks,
}: React.HTMLAttributes<HTMLDivElement> & HomepagePageLayoutProps) => {
  // const isEN = true // TODO: use localization // TODO get bookmarks determined by localization
  const [searchOpen, setSearchOpen] = React.useState(false)

  return (
    <div className={cx('font-inter', className)}>
      <div className="h-14 w-full bg-white">
        <SectionContainer>
          <NavBar menuItems={menuItems ?? []} handleSearch={setSearchOpen} />
        </SectionContainer>
      </div>
      <Bookmarks bookmarks={bookmarks} className="top-56" />
      <div className={cx({ 'hidden lg:block': searchOpen })}>
        <div className="-mt-18">{children}</div>

        {footer && <Footer {...footer} />}
      </div>
    </div>
  )
}

export default HomepagePageLayout
