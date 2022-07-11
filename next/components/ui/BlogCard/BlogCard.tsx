/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @next/next/no-img-element */
import cx from 'classnames'

import ChevronRight from '../../../assets/images/chevron-right.svg'
import { Card } from '../Card/Card'

export interface BlogCardProps {
  className?: string
  image?: string
  mobileImage?: string
  content?: React.ReactNode
  href?: string
}

export const BlogCard = ({ className, image, mobileImage, content, href }: BlogCardProps) => (
  <a href={href}>
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
          {image && <img src={mobileImage} alt="blog" width="280" height="190" />}
        </div>
        <div className="hidden xl:inline-flex">{image && <img src={image} alt="blog" width="225" height="200" />}</div>

        <div className="mx-6 flex h-48 w-52 items-center justify-center text-center xl:w-65 xl:px-12 xl:text-left">
          <span className="text-default font-medium">{content}</span>
        </div>
      </Card>
    </div>
  </a>
)

export default BlogCard
