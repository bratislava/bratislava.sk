import { ArrowRightIcon } from '@assets/images'
import MLink, { LinkPlausibleProps } from '@components/forms/simple-components/MLink'
import { generateImageSizes } from '@utils/generateImageSizes'
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
        plausibleId?: string | null | undefined
      }[]
    | undefined
}

export const BlogCards = ({ className, shiftIndex, posts = [] }: BlogCardsProps) => {
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
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              imageSrc={blogCard.imageSrc ?? ''}
              imageSizes={generateImageSizes({ lg: '224px', default: '50vw' })}
            >
              <h3 className="text-h5 lg:text-p1 line-clamp-3 text-left font-semibold">
                {blogCard.title}
              </h3>
              <MLink
                className="mt-3 flex space-x-2 text-[16px] font-semibold text-gray-700 underline hover:text-category-600"
                href={blogCard?.url || ''}
                target={blogCard?.url?.startsWith('http') ? '_blank' : undefined}
                stretched
                plausibleProps={
                  blogCard.plausibleId
                    ? ({ id: blogCard.plausibleId } as LinkPlausibleProps)
                    : undefined
                }
              >
                {t('readMore')}
                <ArrowRightIcon />
              </MLink>
            </HorizontalCard>
          ))}
        />
      </div>
    </div>
  )
}

export default BlogCards
