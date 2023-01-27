// @ts-strict-ignore
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import { Enum_Pagecategory_Color } from '@bratislava/strapi-sdk-homepage'
import { getHoverColor } from '@bratislava/ui-bratislava/Sections/Posts/Posts'
import { getNumericLocalDate } from '@utils/local-date'
import { transformColorToCategory } from '@utils/page'
import cx from 'classnames'

import { ArrowRight, ChevronRight } from '../../../assets/images'
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

  return (
    <VerticalCard
      className={cx(className, 'min-w-66 leading-[1.3]')}
      imageSrc={coverImage?.data?.attributes?.url}
    >
      <div className="space-y-5">
        {tag?.data?.attributes?.title && (
          <Tag
            title={tag?.data?.attributes?.title}
            color={transformColorToCategory(
              tag?.data?.attributes?.pageCategory?.data?.attributes?.color,
            )}
          />
        )}
        <h3 className="text-h4 line-clamp-3">{title}</h3>
        {/* TODO this will rarely matter (only once we start showing previews of unpublished posts to admins), but below we should prefer createdAt before updatedAt */}
        <span className="text-p4-medium">
          {getNumericLocalDate(date_added || publishedAt || updatedAt)}
        </span>
        <p className="text-p2 line-clamp-4">{excerpt}</p>
        <div>
          {slug && (
            <UILink
              className={cx(
                'group mt-3 flex h-6 cursor-pointer items-center space-x-5 text-gray-700 hover:text-category-600 underline after:absolute after:inset-0',
                getHoverColor(
                  tag?.data?.attributes?.pageCategory?.data?.attributes
                    ?.color as Enum_Pagecategory_Color,
                ),
              )}
              href={`/blog/${slug}`}
            >
              <span className="text-p2-semibold">{readMoreText}</span>
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
