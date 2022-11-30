// @ts-strict-ignore
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import cx from 'classnames'

import ArrowRightShort from '../../../assets/images/arrow-right-short.svg'
import { Panel } from '../Panel/Panel'
import { VerticalCardButton } from '../VerticalCardButton/VerticalCardButton'

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
    slug?: string
    tag?: {
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
    title?: string
  }
}

export interface BlogSearchCardProps {
  className?: string
  imageClassName?: string
  fullCardSizeImage?: boolean
  item: BlogItem
}

export const BlogSearchCard = ({ className, imageClassName, fullCardSizeImage, item }: BlogSearchCardProps) => {
  const { Link: UILink } = useUIContext()

  const { slug, tag, coverImage, title } = item.attributes
  const { shortTitle, color } = tag.data.attributes.pageCategory.data.attributes

  const publishedAt = new Date(item.attributes.publishedAt)
  const date = `${publishedAt.getDay()}. ${publishedAt.getMonth()}. ${publishedAt.getFullYear()}`
  const headline = shortTitle ?? 'No Title Found'
  const headlineColor = color ? `--color-${color}--light` : '--color-red'
  return (
    <UILink href={slug ? `/blog/${slug}` : ''}>
      <Panel
        className={cx(
          className,
          'w-full',
          { 'hidden lg:flex lg:flex-row': !fullCardSizeImage },
          { hidden: fullCardSizeImage }
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
          <div
            className="w-fit rounded-lg px-3 py-1 font-medium"
            style={{ backgroundColor: `rgb(var(${headlineColor}))` }}
          >
            {headline}
          </div>
          <div className="line-clamp-2 text-20-semibold overflow-hidden text-ellipsis">{title} </div>
          <div>{date}</div>
        </div>
      </Panel>
      <Panel
        className={cx('group', className, { 'flex lg:hidden': !fullCardSizeImage }, { flex: fullCardSizeImage })}
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
              <div
                className="w-fit rounded-lg px-3 py-1 font-medium"
                style={{ backgroundColor: `rgb(var(${headlineColor}))` }}
              >
                {headline}
              </div>
              <div className="flex">
                <div className="line-clamp-2 text-20-semibold overflow-hidden text-white">{title}</div>
                <VerticalCardButton className="invisible shrink-0 group-hover:lg:visible" size="medium">
                  <ArrowRightShort className="scale-125" />
                </VerticalCardButton>
              </div>
              <div className="text-white">{date}</div>
            </div>
          </div>
        </UILink>
      </Panel>
    </UILink>
  )
}
