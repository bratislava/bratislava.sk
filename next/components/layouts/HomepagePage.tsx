import { FooterFragment, LatestBlogsFragment } from '@bratislava/strapi-sdk-homepage'
import { BookmarkProps, MenuMainItem, TPostsTab } from '@bratislava/ui-bratislava'
import { InBaProps } from '@bratislava/ui-bratislava/InBaCard/types'
import { DataProps } from '@utils/homepage-mockdata'
import { parseFooter } from '@utils/page'
import React, { FC } from 'react'

import { ParsedOfficialBoardDocument } from '../../services/ginis'
import Footer from '../molecules/Footer'
import { HomepageContent } from '../pages/homepage/HomepageContent'
import { HomepageHeader } from '../pages/homepage/HomepageHeader'
import { BlogPost, Header, Homepage } from '../pages/homepage/types'

interface HomepagePageLayoutProps {
  menuItems?: MenuMainItem[]
  footer?: FooterFragment
  header?: Header
  homepage?: Homepage
  bookmarks?: BookmarkProps[]
  pageTitle?: string
  homepagePosts: BlogPost[]
  posts?: TPostsTab[]
  rozkoPosts?: unknown
  latestBlogposts?: LatestBlogsFragment
  inBaProps: InBaProps
  data: DataProps
}

const HomepagePage: FC<HomepagePageLayoutProps> = ({
  header,
  menuItems,
  bookmarks,
  homepage,
  footer,
  pageTitle,
  data,
  inBaProps,
  homepagePosts,
  posts,
  rozkoPosts,
  latestBlogposts,
}) => {
  const isEN = true // TODO: use localization // TODO get bookmarks determined by localization
  const [isSearchOpen, setIsSearchOpen] = React.useState(false)

  return (
    <div className="block bg-white">
      <HomepageHeader
        homepage={homepage}
        header={header}
        pageTitle={pageTitle}
        bookmarks={bookmarks}
        menuItems={menuItems}
        onSearchOpen={setIsSearchOpen}
        isSearchOpen={isSearchOpen}
      />
      {!isSearchOpen && (
        <>
          <HomepageContent
            data={data}
            homepagePosts={homepagePosts}
            homepage={homepage}
            inBaProps={inBaProps}
            posts={posts}
            rozkoPosts={rozkoPosts}
            latestBlogposts={latestBlogposts}
          />
          {footer && <Footer {...parseFooter(footer)} />}
        </>
      )}
    </div>
  )
}

export default HomepagePage
