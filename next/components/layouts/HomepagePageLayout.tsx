import {
  AdvancedSearch,
  BAStickyMenu,
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
  const isEN = true // TODO: use localization // TODO get bookmarks determined by localization

  const [stickyMenuVisible, setStickyMenuVisible] = React.useState(false)
  const [searchOpen, setSearchOpen] = React.useState(false)

  const handleScroll = () => {
    const heightToShowFrom = 400
    const topOffset = document.body.scrollTop || document.documentElement.scrollTop

    if (topOffset > heightToShowFrom) {
      !stickyMenuVisible && // to limit setting state only the first time
        setStickyMenuVisible(true)
    } else {
      setStickyMenuVisible(false)
    }
  }

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={cx('bg-background font-inter', className)}>
      <div className="h-14 w-full bg-white">
        <SectionContainer>
          <NavBar menuItems={menuItems ?? []} handleSearch={setSearchOpen} />
        </SectionContainer>
      </div>

      <Bookmarks bookmarks={bookmarks} className="top-56" />

      <div
        className={cx('transition transform hidden lg:block bg-white w-full fixed z-40', {
          '-translate-y-full': !stickyMenuVisible,
          'drop-shadow-sm shadow-lg': stickyMenuVisible,
        })}
      >
        <BAStickyMenu menuItems={menuItems ?? []} active="1" />
      </div>
      <div className={cx({ 'hidden lg:block': searchOpen })}>
        <div className="-mt-18">{children}</div>

        {footer && <Footer {...footer} />}
      </div>

      <div className={cx('block lg:hidden w-full h-screen p-8 bg-font overflow-y-hidden', { hidden: !searchOpen })}>
        <AdvancedSearch className="text-white" placeholder="" title="" buttonText="TODO-FIX" /* options={[]} */ />
      </div>
    </div>
  )
}

export default HomepagePageLayout
