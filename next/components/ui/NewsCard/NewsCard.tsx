// @ts-strict-ignore
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import { Enum_Pagecategory_Color } from '@bratislava/strapi-sdk-homepage'
import Button from '@components/forms/simple-components/Button'
import { getCategoryColorLocalStyle } from '@utils/colors'
import { getNumericLocalDate } from '@utils/local-date'
import cx from 'classnames'

import BratislavaPlaceholder from '../../../public/bratislava-placeholder.jpg'
import { Tag } from '../Tag/Tag'
import { VerticalCard } from '../VerticalCard/VerticalCard'

export interface NewsCardProps {
  id?: string
  className?: string
  readMoreText?: string
  coverImage?: {
    data?: {
      attributes?: {
        url?: string | null
      } | null
    } | null
  } | null
  coverImageSizes?: string
  tag?: {
    data?: {
      attributes?: {
        title?: string | null
        pageCategory?: {
          data?: {
            attributes?: {
              color?: string | null
            } | null
          } | null
        } | null
      } | null
    } | null
  } | null
  title?: string | null
  excerpt?: string | null
  date_added?: string | null
  createdAt?: string | null
  updatedAt?: string | null
  publishedAt?: string | null
  slug?: string | null
  link?: string | null
}

export const NewsCard = ({
  className,
  coverImage = {
    data: { attributes: { url: BratislavaPlaceholder } },
  },
  coverImageSizes,
  tag,
  title,
  excerpt,
  updatedAt,
  date_added,
  publishedAt,
  readMoreText,
  slug,
}: NewsCardProps) => {
  const { Link: UILink } = useUIContext()
  const colorStyle = getCategoryColorLocalStyle({
    color: tag?.data?.attributes?.pageCategory?.data?.attributes?.color as Enum_Pagecategory_Color,
  })

  return (
    <VerticalCard
      className={cx(className, 'min-w-66 leading-[1.3]')}
      imageSrc={coverImage?.data?.attributes?.url}
      imageSizes={coverImageSizes}
      style={colorStyle}
    >
      <div className="space-y-5">
        {tag?.data?.attributes?.title && <Tag title={tag?.data?.attributes?.title} />}
        <h3 className="text-h4 line-clamp-3">{title}</h3>
        {/* TODO this will rarely matter (only once we start showing previews of unpublished posts to admins), but below we should prefer createdAt before updatedAt */}
        <span className="text-small font-medium">
          {getNumericLocalDate(date_added || publishedAt || updatedAt)}
        </span>
        <p className="text-default line-clamp-4">{excerpt}</p>
        <div>
          {slug && (
            <Button href={`/blog/${slug}`} variant="black-link" className="group mt-3">
              {readMoreText}
            </Button>
          )}
        </div>
      </div>
    </VerticalCard>
  )
}

export default NewsCard
