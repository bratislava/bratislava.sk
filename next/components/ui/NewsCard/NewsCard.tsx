// @ts-strict-ignore
import { ArrowRight, ChevronRight } from '@assets/images'
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import { Enum_Pagecategory_Color } from '@bratislava/strapi-sdk-homepage'
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
        <span className="text-p4 font-medium">
          {getNumericLocalDate(date_added || publishedAt || updatedAt)}
        </span>
        <p className="text-p2 line-clamp-4">{excerpt}</p>
        <div>
          {slug && (
            <UILink
              className={cx(
                'group mt-3 flex h-6 cursor-pointer items-center space-x-5 text-gray-700 underline after:absolute after:inset-0 hover:text-category-600',
              )}
              href={`/blog/${slug}`}
            >
              <span className="text-p2 font-semibold">{readMoreText}</span>
              <span className="group-hover:hidden">
                <ChevronRight />
              </span>
              <span className="hidden group-hover:block">
                <ArrowRight />
              </span>
            </UILink>
          )}
        </div>
      </div>
    </VerticalCard>
  )
}

export default NewsCard
