import cx from 'classnames'

import { HorizontalScrollWrapper } from '../../HorizontalScrollWrapper/HorizontalScrollWrapper'

export interface GalleryProps {
  className?: string
  title?: string
  images?: string[]
}

export const Gallery = ({ className, title, images }: GalleryProps) => (
  <div className={cx(className, 'flex flex-col mt-20 ml-5 xl:items-center')}>
    <div className="text-h1 mb-7">{title}</div>
    <HorizontalScrollWrapper
      className={cx(className, 'flex space-x-5 xl:space-x-0 xl:grid xl:grid-cols-3 xl:gap-8 xl:my-14')}
    >
      {images?.map(
        (image, i) => image && <img key={i} src={image} className="rounded-lg" alt="Gallery" width="350" height="300" />
      )}
    </HorizontalScrollWrapper>
  </div>
)

export default Gallery
