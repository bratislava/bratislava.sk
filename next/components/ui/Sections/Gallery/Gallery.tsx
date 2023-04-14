import cx from 'classnames'

import { HorizontalScrollWrapper } from '../../HorizontalScrollWrapper/HorizontalScrollWrapper'

export interface GalleryProps {
  className?: string
  title?: string
  images?: string[]
}

export const Gallery = ({ className, title, images }: GalleryProps) => (
  <div className={cx(className, 'ml-5 mt-20 flex flex-col xl:items-center')}>
    <div className="text-h1 mb-7 font-semibold">{title}</div>
    <HorizontalScrollWrapper
      className={cx(
        className,
        'flex space-x-5 xl:my-14 xl:grid xl:grid-cols-3 xl:gap-8 xl:space-x-0',
      )}
    >
      {images?.map(
        (image, i) =>
          image && (
            <img
              key={i}
              src={image}
              className="rounded-lg"
              alt="Gallery"
              width="350"
              height="300"
            />
          ),
      )}
    </HorizontalScrollWrapper>
  </div>
)

export default Gallery
