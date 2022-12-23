import { Enum_Pagecategory_Color, LatestBlogsFragment } from '@bratislava/strapi-sdk-homepage'
import { Tag } from '@bratislava/ui-bratislava'
import { transformColorToCategory } from '@utils/page'
import { useUIContext } from '@utils/ui-context'
import cx from 'classnames'
import React, { FC, ReactNode } from 'react'

const HOVER_COLOR = {
  [Enum_Pagecategory_Color.Red]: 'hover:text-main-600',
  [Enum_Pagecategory_Color.Blue]: 'hover:text-transport-600',
  [Enum_Pagecategory_Color.Green]: 'hover:text-environment-600',
  [Enum_Pagecategory_Color.Yellow]: 'hover:text-social-600',
  [Enum_Pagecategory_Color.Purple]: 'hover:text-education-600',
  [Enum_Pagecategory_Color.Brown]: 'hover:text-culture-600',
  default: 'hover:text-gray-600',
}

function getHoverColor(color: Enum_Pagecategory_Color | undefined | null): string {
  if (!color) {
    return HOVER_COLOR.default
  }

  return HOVER_COLOR[color] ?? HOVER_COLOR.default
}

interface Props {
  blogPosts: LatestBlogsFragment['data'] | null | undefined
  readMoreButton: ReactNode
}

export const SidePosts: FC<Props> = ({ blogPosts, readMoreButton }) => {
  const { Link: UILink } = useUIContext()

  if (!blogPosts || blogPosts.length === 0) {
    return null
  }

  return (
    <>
      <div className="hidden lg:block">
        {blogPosts.map((newsCard, i) => {
          const card = newsCard.attributes
          const tag = card?.tag?.data?.attributes
          const tagTitle = tag?.title ?? ''
          return (
            <div key={i} className="relative">
              {tag && (
                <div className="mb-5">
                  <Tag
                    title={tagTitle}
                    color={transformColorToCategory(tag?.pageCategory?.data?.attributes?.color)}
                  />
                </div>
              )}
              <UILink href={`/blog/${card?.slug}`}>
                <div
                  className={cx(
                    `text-font mb-8 font-semibold underline after:absolute after:inset-0`,
                    getHoverColor(tag?.pageCategory?.data?.attributes?.color),
                  )}
                >
                  {card?.title}
                </div>
              </UILink>
            </div>
          )
        })}
      </div>
      <div className="col-span-3 mt-14 hidden justify-center lg:flex">
        {blogPosts.length > 0 && readMoreButton}
      </div>
    </>
  )
}
