import { HorizontalScrollWrapper, NewsCard, NewsCardProps } from '@bratislava/ui-bratislava'
import cx from 'classnames'

interface IProps {
  className?: string
  newsCards?: Array<NewsCardProps>
}

const News = ({ className, newsCards }: IProps) => {
  return (
    <HorizontalScrollWrapper className={cx(className, 'lg:grid lg:grid-cols-3 px-7 gap-x-5 lg:gap-8 max-w-6xl')}>
      {newsCards.map((newsCard, index) => (
        <NewsCard key={index} {...newsCard} />
      ))}
    </HorizontalScrollWrapper>
  )
}

export default News
