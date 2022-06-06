import cx from 'classnames';
import { Carousel } from '../../Carousel/Carousel';
import { HorizontalScrollWrapper } from '../../HorizontalScrollWrapper/HorizontalScrollWrapper';
import { NewsCard, NewsCardProps } from '../../NewsCard/NewsCard';

export interface RelatedContentProps {
  className?: string;
  cards?: NewsCardProps[];
  fetchMoreItems?: () => void;
  shiftIndex?: number;
  visibleItems?: number;
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
        items={cards.map((card, i) => (
          <div key={i} className="box-content flex py-16">
            <NewsCard key={i} {...card} />
          </div>
        ))}
      />
    </div>

    <HorizontalScrollWrapper
      className={cx(className, 'xl:hidden py-10 pl-8 gap-x-4')}
    >
      {cards.map((card, index) => (
        <NewsCard className="flex-shrink-0 w-10/12" key={index} {...card} />
      ))}
    </HorizontalScrollWrapper>
  </div>
);

export default RelatedContent;
