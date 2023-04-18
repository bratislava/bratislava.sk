import Button from '@components/forms/simple-components/Button'
import { LinkPlausibleProps } from '@components/forms/simple-components/MLink'
import { generateImageSizes } from '@utils/generateImageSizes'
import cx from 'classnames'
import { useTranslations } from 'next-intl';


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
  const t = useTranslations();

  return (
    <div className={cx(className)}>
      <div>
        <Carousel
          shiftIndex={shiftIndex}
          visibleItems={2}
          className="flex"
          items={posts.map((blogCard, index) => (
            <HorizontalCard
              // 324px includes padding
              className="flex h-full min-h-[324px] flex-col py-16"
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              imageSrc={blogCard.imageSrc ?? ''}
              imageSizes={generateImageSizes({ default: '90vw', lg: '224px' })}
            >
              <div className="flex h-full flex-col justify-between">
                <h3 className="text-h5 lg:text-large-respo line-clamp-3 grow text-left">
                  {blogCard.title}
                </h3>
                <Button
                  variant="black-link"
                  href={blogCard?.url || '#'}
                  target={blogCard?.url?.startsWith('http') ? '_blank' : undefined}
                  stretched
                  plausibleProps={
                    blogCard.plausibleId
                      ? ({ id: blogCard.plausibleId } as LinkPlausibleProps)
                      : undefined
                  }
                >
                  {t('readMore')}
                </Button>
              </div>
            </HorizontalCard>
          ))}
        />
      </div>
    </div>
  )
}

export default BlogCards
