import cx from 'classnames'

import { Carousel } from '../../Carousel/Carousel'
import { HorizontalScrollWrapper } from '../../HorizontalScrollWrapper/HorizontalScrollWrapper'
import { NewsCard, NewsCardProps } from '../../NewsCard/NewsCard'

export interface RelatedContentProps {
  className?: string
  cards?: NewsCardProps[]
  fetchMoreItems?: () => void
  shiftIndex?: number
  visibleItems?: number
}

export const RelatedContent = ({
  className,
  cards = [],
  shiftIndex = 1,
  visibleItems = 2,
  fetchMoreItems,
}: RelatedContentProps) => (
  <div className={cx(className)}>
    <div className="hidden xl:block">
      <Carousel
        visibleItems={visibleItems}
        shiftIndex={shiftIndex}
        fetchMoreItems={fetchMoreItems}
        items={cards.map((card, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} className="box-content flex py-16">
            <NewsCard {...card} />
          </div>
        ))}
      />
    </div>

    <HorizontalScrollWrapper className={cx(className, 'gap-x-4 py-10 pl-8 xl:hidden')}>
      {cards.map((card, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <NewsCard className="w-10/12 shrink-0" key={index} {...card} />
      ))}
    </HorizontalScrollWrapper>
  </div>
)

export default RelatedContent
