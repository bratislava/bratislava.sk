import { Card } from '@bratislava/ui-bratislava'
import cx from 'classnames'
import Image, { StaticImageData } from 'next/image'
import NextLink from 'next/link'

import image1 from '../../assets/images/blog-image.png'
import image2 from '../../assets/images/blog-mobile-image.png'
import ChevronRight from '../../assets/images/chevron-right.svg'

export interface BlogCardProps {
  className?: string
  image?: string | StaticImageData
  mobileImage?: string | StaticImageData
  content?: React.ReactNode
  href?: string
}

export const BlogCard = ({
  className,
  image = image1,
  mobileImage = image2,
  content = 'Verejný priestor na Kazanskej ulici vo Vrakuni sa dočká obnovy',
  href = '/',
}: BlogCardProps) => (
  <NextLink href={href} passHref>
    <div className={cx(className, 'inline-flex flex-col 2xl:pr-8 xl:pr-5 cursor-pointer bg-white py-5')}>
      <Card
        className={cx(
          className,
          'rounded-b-lg xl:rounded-l-none xl:rounded-r-lg xl:inline-flex xl:flex-row xl:items-center'
        )}
        buttonContent={<ChevronRight />}
        buttonPosition="mx-auto left-0 right-0 xl:hidden"
        buttonVariant="circle"
      >
        <div className="inline-flex xl:hidden">
          {image && <Image src={mobileImage} alt="blog" width="280" height="190" />}
        </div>
        <div className="hidden xl:inline-flex">
          {image && <Image src={image} alt="blog" width="225" height="200" />}
        </div>

        <div className="mx-6 flex h-48 w-52 items-center justify-center text-center xl:w-[264px] xl:px-12 xl:text-left">
          <span className="text-p1 font-medium">{content}</span>
        </div>
      </Card>
    </div>
  </NextLink>
)

export default BlogCard
