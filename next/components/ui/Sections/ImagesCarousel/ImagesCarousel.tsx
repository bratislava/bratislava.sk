import cx from 'classnames'

import { Carousel } from '../../Carousel/Carousel'
import { HorizontalScrollWrapper } from '../../HorizontalScrollWrapper/HorizontalScrollWrapper'

export interface ImagesCarouselProps {
  className?: string
  title?: string
  shiftIndex?: number
  visibleItems?: number
  items: TImageCarouselItem[]
  fetchMoreItems?: () => void
}

export type TImageCarouselItem = {
  id: string
  url?: string
  mainImage: { id: string; src: string }
  title?: string
}

export const ImagesCarousel = ({
  className,
  shiftIndex = 1,
  title,
  visibleItems = 3,
  items,
  fetchMoreItems,
}: ImagesCarouselProps) => (
  <div className={cx(className, 'flex flex-col')}>
    {title && <div className="text-h1 pb-10 text-center">{title}</div>}
    <div className="hidden xl:block">
      <Carousel
        scrollerClassName="py-6"
        items={items.map((item) => (
          <a
            className="relative inline-block h-76 w-88 cursor-pointer rounded-lg pt-2 transition-all hover:-translate-y-2 hover:drop-shadow-lg"
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noreferrer"
          >
            <img className="h-full w-full rounded-lg object-cover" src={item.mainImage.src} alt={item.title} />
            {item.title && <p className="absolute bottom-0 p-6 text-button-1 font-semibold text-white">{item.title}</p>}
          </a>
        ))}
        visibleItems={visibleItems}
        shiftIndex={shiftIndex}
        fetchMoreItems={fetchMoreItems}
      />
    </div>

    {/* Mobile */}
    <HorizontalScrollWrapper className="xl:hidden">
      <div className="flex gap-x-5">
        {items.map((item) => (
          <a
            className="relative h-60 w-18 cursor-pointer rounded-lg pt-2 transition-all hover:-translate-y-2 hover:shadow-lg"
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noreferrer"
          >
            <img className="h-full w-full rounded-lg object-cover" src={item.mainImage.src} alt={item.title} />
            {item.title && (
              <p className="absolute bottom-0 px-6 py-5 text-button-1 font-semibold text-white">{item.title}</p>
            )}
          </a>
        ))}
      </div>
    </HorizontalScrollWrapper>
  </div>
)

export default ImagesCarousel
