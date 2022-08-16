import { BookmarkProps, Bookmarks, MenuMainItem, SectionContainer, Waves } from '@bratislava/ui-bratislava'
import { HomepageMenu } from '@bratislava/ui-bratislava/HomepageMenu/HomepageMenu'
import { STICKY_MENU_VISIBILITY } from '@bratislava/ui-bratislava/HomepageMenu/HomePageService'
import StickyNavigationMenu from '@bratislava/ui-bratislava/HomepageMenu/StickyNavigation/StickyNavigationMenu'
import { useHomePageMenu } from '@bratislava/ui-bratislava/HomepageMenu/useHomePageMenu'
import cx from 'classnames'
import React, { FC } from 'react'

import NavBar from '../../molecules/NavBar'
import PageCoverImage from '../../molecules/page-cover-image/PageCoverImage'
import { HomePageMetaHeader } from '../../molecules/page-meta-header/HomePageMetaHeader'
import { HomepageSearch } from './HomepageSearch'
import { Header, Homepage } from './types'

interface Props {
  header?: Header
  homepage?: Homepage
  menuItems?: MenuMainItem[]
  bookmarks?: BookmarkProps[]
  pageTitle?: string
  isSearchOpen?: boolean
  onSearchOpen?(isSearchOpen: boolean): void
}

export const HomepageHeader: FC<Props> = ({
  homepage,
  pageTitle,
  menuItems = [],
  bookmarks = [],
  header,
  onSearchOpen,
  isSearchOpen,
}) => {
  const { observableNodeRef, stickyMenuState } = useHomepageHeader()
  const { title, metaDescription } = homepage?.data?.attributes ?? {}

  return (
    <div className="flex flex-col lg:block lg:w-screen">
      {metaDescription && title && <HomePageMetaHeader metaContent={metaDescription} headTitle={title} />}
      <NavBar menuItems={menuItems} onSearchClick={onSearchOpen} isSearchOpen={isSearchOpen}>
        {stickyMenuState === STICKY_MENU_VISIBILITY.VISIBLE && (
          <StickyNavigationMenu menuItems={menuItems} className="hidden lg:flex" />
        )}
      </NavBar>
      {isSearchOpen && <HomepageSearch />}
      <div className={cx({ hidden: isSearchOpen }, 'lg:block')}>
        <Bookmarks bookmarks={bookmarks} className="top-56" />
        <SectionContainer>
          <PageCoverImage
            coverImageUrl={header?.picture?.data?.attributes?.url ?? ''}
            coverTitle={pageTitle}
            coverSubTitle={header?.subtitle ?? ''}
          />
        </SectionContainer>
        <div ref={observableNodeRef} className="hidden h-3 w-full lg:block" />
        {stickyMenuState === STICKY_MENU_VISIBILITY.INVISIBLE && <HomepageMenu items={menuItems} />}
        <Waves
          className={cx('w-screen mt-36 lg:mt-20')}
          waveColor="white"
          wavePosition="bottom"
          isRich
          backgroundColor="var(--background-color)"
        />
      </div>
    </div>
  )
}
