import { HorizontalScrollWrapper } from '@bratislava/ui-bratislava'
import React, { FC, ReactNode } from 'react'

interface Props {
  highlightedPosts: ReactNode
  sidePosts: ReactNode
  button: ReactNode
}

export const PostCard: FC<Props> = ({ highlightedPosts, sidePosts, button }) => {
  return (
    <div className="mt-8 block lg:mt-14">
      <HorizontalScrollWrapper className="-mx-8 space-x-4 px-8 pb-8 lg:pb-0">
        <div className="lg:gap-x-7.5 flex grid-cols-3 gap-x-5 lg:grid">
          {highlightedPosts}
          {sidePosts}
        </div>
      </HorizontalScrollWrapper>
      <div className="flex justify-center lg:hidden">{button}</div>
    </div>
  )
}
