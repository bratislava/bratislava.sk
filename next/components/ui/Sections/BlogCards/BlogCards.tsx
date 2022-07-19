import { ArrowRight, ChevronRight } from '@assets/images'
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import cx from 'classnames'
import { useTranslation } from 'next-i18next'

import { Carousel } from '../../Carousel/Carousel'
import { HorizontalCard } from '../../HorizontalCard/HorizontalCard'
import { HorizontalScrollWrapper } from '../../HorizontalScrollWrapper/HorizontalScrollWrapper'
import { VerticalCardButton } from '../../VerticalCardButton/VerticalCardButton'

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
      <div className="hidden xl:block">
        <Carousel
          shiftIndex={shiftIndex}
          items={posts.map((blogCard, i) => (
            <div key={i} className="box-content flex py-16">
              <HorizontalCard className="min-h-220 w-540" key={i} imageSrc={blogCard.imageSrc}>
                <p className="line-clamp-4 overflow-hidden text-ellipsis">{blogCard.title}</p>
                <UILink
                  className="group mt-3 flex h-6 cursor-pointer items-center space-x-5 text-primary underline"
                  href={`${blogCard?.url}` || ''}
                >
                  <span className="text-sm font-semibold">{t('readMore')}</span>
                  <span className="group-hover:hidden">
                    <ChevronRight />
                  </span>
                  <span className="hidden group-hover:block">
                    <ArrowRight />
                  </span>
                </UILink>
              </HorizontalCard>
            </div>
          ))}
        />
      </div>

      <HorizontalScrollWrapper className={cx(className, 'xl:hidden pt-10 pb-14 lg:pb-5 pl-8 gap-x-4 -mx-8 px-8 mb-0')}>
        {posts.map((blogCard, i) => (
          <HorizontalCard
            key={i}
            imageSrc={blogCard.imageSrc}
            className="w-11/12 shrink-0"
            // accessory={<VerticalCardButton />}
          >
            <p className="line-clamp-4 text-left overflow-hidden text-ellipsis">{blogCard.title}</p>
            <UILink
              className="group mt-3 flex h-6 cursor-pointer items-center space-x-5 text-primary underline"
              href={`${blogCard?.url}` || ''}
            >
              <span className="text-sm font-semibold">{t('readMore')}</span>
              <span className="group-hover:hidden">
                <ChevronRight />
              </span>
              <span className="hidden group-hover:block">
                <ArrowRight />
              </span>
            </UILink>
          </HorizontalCard>
        ))}
      </HorizontalScrollWrapper>
    </div>
  )
}

export default BlogCards
