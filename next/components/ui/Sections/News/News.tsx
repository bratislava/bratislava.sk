import cx from 'classnames';
import { HorizontalScrollWrapper } from '../../HorizontalScrollWrapper/HorizontalScrollWrapper';
import { NewsCard, NewsCardProps } from '../../NewsCard/NewsCard';

export interface NewsProps {
  className?: string;
  news?: NewsCardProps[];
}

export const News = ({ className, news }: NewsProps) => (
  <HorizontalScrollWrapper
    className={cx(
      className,
      'space-x-4 max-w-6xl pb-14 lg:grid lg:grid-cols-3 lg:gap-8 lg:mx-auto'
    )}
  >
    {news?.map((newsItem, index) => (
      <NewsCard className="flex-shrink-0 w-11/12" key={index} {...newsItem} />
    ))}
  </HorizontalScrollWrapper>
);

export default News;
