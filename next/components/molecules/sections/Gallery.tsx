import { HorizontalScrollWrapper, StaticImageData } from '@bratislava/ui-bratislava'
import cx from 'classnames'
import Image from 'next/image'

import Rectangle from '../../../assets/images/news.svg'

export interface GalleryProps {
  className?: string
  images?: StaticImageData[] | string[]
}

const Gallery = ({
  className,
}: // images = [Rectangle, Rectangle, Rectangle, Rectangle, Rectangle, Rectangle],
GalleryProps) => (
  <div className={cx(className, 'flex md:items-center flex-col mt-20')}>
    <h1 className="ml-8 text-2xl font-semibold md:ml-0 md:text-5xl">Galéria</h1>
    <HorizontalScrollWrapper className={cx(className, 'md:grid md:grid-cols-3 px-7 gap-x-5 md:gap-8 max-w-6xl my-14')}>
      {/* {images.map((image, index) => (
        <div key={index} className="flex flex-col w-72 md:w-auto 2xl:w-87 my-5 md:pl-0">
          <div className="w-72 2xl:w-87 md:w-auto rounded-lg">
            {image && <Image src={image} alt="Gallery" width="350" height="300" />}
          </div>
        </div>
      ))} */}
    </HorizontalScrollWrapper>
  </div>
)

export default Gallery
