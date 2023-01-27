// @ts-strict-ignore
import { BlogItem, BlogSearchCard } from '@bratislava/ui-bratislava'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { Button } from '../Button/Button'
import { HorizontalScrollWrapper } from '../HorizontalScrollWrapper/HorizontalScrollWrapper'

export interface BlogSearchCardsProps {
  blogs: BlogItem[]
}

export const BlogSearchCards = ({ blogs }: BlogSearchCardsProps) => {
  const { t } = useTranslation('common')
  const [isOpen, setIsOpen] = useState(false)
  const SHOW_LESS_COUNT = 3

  const blogsToShow = isOpen ? blogs : blogs.slice(0, SHOW_LESS_COUNT)

  return (
    <div className="flex flex-col gap-y-3 lg:gap-y-6">
      <div className="hidden flex-col gap-y-6 lg:flex">
        <div className="flex flex-col gap-y-6">
          {blogsToShow.map((blog) => {
            return (
              <BlogSearchCard
                key={blog.attributes.slug}
                item={blog}
                className="h-50"
                imageClassName="w-56 h-50"
              />
            )
          })}
        </div>
        {blogs.length > SHOW_LESS_COUNT && (
          <Button
            variant="transparent"
            className="text-20 w-fit self-center px-6 py-2.5"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? t('showLess') : t('showMore')}
          </Button>
        )}
      </div>
      <HorizontalScrollWrapper className="gap-x-4 pt-4 pb-6 lg:hidden">
        {blogs.map((blog) => {
          return (
            <BlogSearchCard key={blog.attributes.slug} item={blog} className="w-74 h-60 shrink-0" />
          )
        })}
      </HorizontalScrollWrapper>
    </div>
  )
}
