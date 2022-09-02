import { HorizontalScrollWrapper, TabBarTab } from '@bratislava/ui-bratislava'
import React, { FC } from 'react'

import { Post, TAB_CATEGORY } from './types'

interface Props {
  posts: Post[]
  onClick(tabCategory: TAB_CATEGORY): void
  activeTab: TAB_CATEGORY
}

export const PostsTabs: FC<Props> = ({ posts, onClick, activeTab }) => (
  <HorizontalScrollWrapper className="-mx-8 justify-start space-x-4 px-8 lg:justify-center">
    <div className="flex space-x-8 lg:space-x-32">
      {posts.map((post) => (
        <TabBarTab
          key={post.category}
          tabTitle={post.category}
          onClick={() => {
            onClick(post.category)
          }}
          isActive={activeTab === post.category}
        />
      ))}
    </div>
  </HorizontalScrollWrapper>
)
