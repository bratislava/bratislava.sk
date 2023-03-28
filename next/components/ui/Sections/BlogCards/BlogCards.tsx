import { ArrowRight, ChevronRight } from '@assets/images'
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import cx from 'classnames'
import { useTranslation } from 'next-i18next'

import { Carousel } from '../../Carousel/Carousel'
import { HorizontalCard } from '../../HorizontalCard/HorizontalCard'

export interface BlogCardsProps {
  className?: string
  shiftIndex?: number
  posts:
    | {
        imageSrc?: string | null | undefined
        title?: string | null | undefined
        url?: string | null | undefined
      }[]
    | undefined
}

export const BlogCards = ({ className, shiftIndex, posts = [] }: BlogCardsProps) => {
  const { Link: UILink } = useUIContext()
  const { t } = useTranslation()

  return (
    <div className={cx(className)}>
      <div>
        <Carousel
          shiftIndex={shiftIndex}
          className="flex"
          items={posts.map((blogCard, index) => (
            <HorizontalCard
              className="h-full min-h-[350px] py-16"
              key={index}
              imageSrc={blogCard.imageSrc ?? ''}
            >
              <p className="text-p2 lg:text-p1 text-left line-clamp-3">{blogCard.title}</p>
              <UILink
                className="group mt-3 flex h-6 cursor-pointer items-center space-x-5 text-gray-700 underline after:absolute after:inset-0 hover:text-category-600"
                href={blogCard?.url || ''}
                target={blogCard?.url?.startsWith('http') ? '_blank' : undefined}
              >
                <span className="text-p2-semibold">{t('readMore')}</span>
                <span className="group-hover:hidden">
                  <ChevronRight />
                </span>
                <span className="hidden group-hover:block">
                  <ArrowRight />
                </span>
              </UILink>
            </HorizontalCard>
          ))}
        />
      </div>
    </div>
  )
}

export default BlogCards
