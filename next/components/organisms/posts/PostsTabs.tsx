import { HorizontalScrollWrapper, TabBarTab } from '@bratislava/ui-bratislava'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { Post, TAB_CATEGORY } from './types'

interface Props {
  posts: Post[]
  activeTab: TAB_CATEGORY

  onTabClick(post: Post): void
}

export const PostsTabs: FC<Props> = ({ posts, onTabClick, activeTab }) => {
  const { t } = useTranslation()
  return (
    <HorizontalScrollWrapper className="-mx-8 justify-start space-x-4 px-8 lg:justify-center">
      <div className="flex space-x-8 lg:space-x-32">
        {posts.map((post) => (
          <TabBarTab
            key={post.category}
            tabTitle={t(post.category)}
            onClick={() => {
              onTabClick(post)
            }}
            isActive={activeTab === post.tab}
          />
        ))}
      </div>
    </HorizontalScrollWrapper>
  )
}
