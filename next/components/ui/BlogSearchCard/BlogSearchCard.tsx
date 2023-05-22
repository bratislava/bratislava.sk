// @ts-strict-ignore
import { Enum_Pagecategory_Color } from '@backend/graphql'
import MLink from '@components/forms/simple-components/MLink'
import Tag from '@components/forms/simple-components/Tag'
import CardBase from '@components/molecules/presentation/CardBase'
import CardContent from '@components/molecules/presentation/CardContent'
import { getCategoryColorLocalStyle } from '@utils/colors'
import { getNumericLocalDate } from '@utils/local-date'
import cx from 'classnames'

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
  const { slug, tag, coverImage, title, publishedAt, date_added } = item.attributes
  const { shortTitle: tagTitle, color } = tag.data.attributes.pageCategory.data.attributes

  const date = getNumericLocalDate(date_added ?? publishedAt)

  const colorStyle = getCategoryColorLocalStyle({ color })

  return (
    <>
      <CardBase
        style={colorStyle}
        variant="shadow"
        className={cx(
          className,
          'relative w-full rounded-lg',
          { 'hidden lg:flex lg:flex-row': !fullCardSizeImage },
          { hidden: fullCardSizeImage },
        )}
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

        <CardContent className="gap-y-4">
          {tagTitle && <Tag text={tagTitle} isColored />}
          <h3 className="text-large line-clamp-3">
            <MLink href={`/blog/${slug}`} stretched variant="underlineOnHover">
              {title}
            </MLink>
          </h3>
          <div>{date}</div>
        </CardContent>
      </CardBase>
      <CardBase
        style={colorStyle}
        variant="shadow"
        className={cx(
          'group',
          className,
          { 'flex lg:hidden': !fullCardSizeImage },
          { flex: fullCardSizeImage },
        )}
      >
        <div
          className="flex h-full w-full flex-col justify-end rounded"
          style={{
            backgroundImage: `url(${coverImage.data.attributes.url})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <CardContent className="gap-y-4 bg-gradient-to-t from-[black] text-white">
            {tagTitle && <Tag text={tagTitle} isColored />}
            <h3 className="text-large-respo line-clamp-3">
              <MLink href={`/blog/${slug}`} stretched variant="underlineOnHover">
                {title}
              </MLink>
            </h3>
            <div className="text-default-respo">{date}</div>
          </CardContent>
        </div>
      </CardBase>
    </>
  )
}
