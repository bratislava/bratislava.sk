import cx from 'classnames'

import { HorizontalScrollWrapper } from '../../HorizontalScrollWrapper/HorizontalScrollWrapper'
import { NewsCard, NewsCardProps } from '../../NewsCard/NewsCard'

export interface NewsProps {
  className?: string
  news?: NewsCardProps[]
}

export const News = ({ className, news }: NewsProps) => (
  <HorizontalScrollWrapper
    className={cx(
      className,
      'max-w-6xl space-x-4 pb-14 lg:mx-auto lg:grid lg:grid-cols-3 lg:gap-8',
    )}
  >
    {news?.map((newsItem, index) => (
      <NewsCard className="w-11/12 shrink-0" key={index} {...newsItem} />
    ))}
  </HorizontalScrollWrapper>
)

export default News
