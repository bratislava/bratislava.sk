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
    {title && <div className="font-semibold text-default sm:text-lg md:text-2xl pb-10 text-center">{title}</div>}
    <div className="hidden xl:block">
      <Carousel
        scrollerClassName="py-6"
        items={items.map((item) => (
          <a
            className="relative inline-block h-74 w-87 cursor-pointer transition-all pt-2 transform hover:-translate-y-2 hover:drop-shadow-lg rounded-lg"
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noreferrer"
          >
            <img className="w-full h-full object-cover rounded-lg" src={item.mainImage.src} alt={item.title} />
            {item.title && <p className="absolute bottom-0 text-white p-6 text-default font-semibold">{item.title}</p>}
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
            className="relative w-72 h-60 pt-2 cursor-pointer transition-all transform hover:-translate-y-2 hover:shadow-lg rounded-lg"
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noreferrer"
          >
            <img className="w-full h-full rounded-lg object-cover" src={item.mainImage.src} alt={item.title} />
            {item.title && (
              <p className="absolute bottom-0 text-white px-6 py-5 text-default font-semibold">{item.title}</p>
            )}
          </a>
        ))}
      </div>
    </HorizontalScrollWrapper>
  </div>
)

export default ImagesCarousel
