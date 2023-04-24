// @ts-strict-ignore
import { ArrowRightIcon } from '@assets/images'
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import { Enum_Pagecategory_Color } from '@bratislava/strapi-sdk-homepage'
import { VerticalCardButton } from '@components/ui/VerticalCardButton/VerticalCardButton'
import { getCategoryColorLocalStyle } from '@utils/colors'
import cx from 'classnames'

import { Panel } from '../Panel/Panel'

export interface BlogImage {
  url: string
}

export interface BlogTag {
  data?: {
    attributes?: {
      pageCategory?: {
        data?: {
          attributes?: {
            color?: string
            shortTitle?: string
          }
        }
      }
    }
  }
}

export interface BlogItem {
  attributes?: {
    coverImage?: {
      data?: {
        attributes?: {
          url?: string
        }
      }
    }
    publishedAt?: string
    date_added?: string
    slug?: string
    tag?: {
      data?: {
        attributes?: {
          pageCategory?: {
            data?: {
              attributes?: {
                color?: Enum_Pagecategory_Color
                shortTitle?: string
              }
            }
          }
        }
      }
    }
    title?: string
  }
}

export interface BlogSearchCardProps {
  className?: string
  imageClassName?: string
  fullCardSizeImage?: boolean
  item: BlogItem
}

export const BlogSearchCard = ({
  className,
  imageClassName,
  fullCardSizeImage,
  item,
}: BlogSearchCardProps) => {
  const { Link: UILink } = useUIContext()

  const { slug, tag, coverImage, title, publishedAt, date_added } = item.attributes
  const { shortTitle: tagTitle, color } = tag.data.attributes.pageCategory.data.attributes

  // TODO use formatter function, add locale
  const date = new Date(date_added ?? publishedAt).toLocaleDateString('sk-SK')

  const colorStyle = getCategoryColorLocalStyle({ color })

  return (
    <UILink href={slug ? `/blog/${slug}` : ''} style={colorStyle}>
      <Panel
        className={cx(
          className,
          'w-full',
          { 'hidden lg:flex lg:flex-row': !fullCardSizeImage },
          { hidden: fullCardSizeImage },
        )}
        hoverable
      >
        {coverImage.data.attributes && (
          <div
            className={cx('flex flex-shrink-0', imageClassName)}
            style={{
              backgroundImage: `url(${coverImage.data.attributes.url})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}
          />
        )}

        <div className="flex flex-col gap-y-4 p-8">
          {tagTitle && <div className="w-fit rounded-lg bg-category-200 px-3 py-1">{tagTitle}</div>}
          <div className="text-large line-clamp-2 font-semibold">{title} </div>
          <div>{date}</div>
        </div>
      </Panel>
      <Panel
        className={cx(
          'group',
          className,
          { 'flex lg:hidden': !fullCardSizeImage },
          { flex: fullCardSizeImage },
        )}
        hoverable
      >
        <UILink href={`/blog/${slug}`}>
          <div
            className="flex h-full w-full flex-col justify-end rounded"
            style={{
              backgroundImage: `url(${coverImage.data.attributes.url})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          >
            {/* should be from-black but it doesn't work */}
            <div className="flex flex-col gap-y-4 bg-gradient-to-t from-[#000000] p-4 lg:p-8">
              {tagTitle && (
                <div className="w-fit rounded-lg px-3 py-1 text-category-200">{tagTitle}</div>
              )}
              <div className="flex">
                <div className="text-large line-clamp-2 font-semibold text-white">{title}</div>
                <VerticalCardButton
                  className="invisible shrink-0 group-hover:lg:visible"
                  icon={<ArrowRightIcon />}
                  variant="category"
                />
              </div>
              <div className="text-white">{date}</div>
            </div>
          </div>
        </UILink>
      </Panel>
    </UILink>
  )
}
