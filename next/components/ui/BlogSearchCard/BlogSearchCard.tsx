import { useState, useEffect, useRef, RefObject } from 'react'
import Panel from '../Panel/Panel'
import cx from 'classnames'
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import { VerticalCardButton } from '../VerticalCardButton/VerticalCardButton'
import ArrowRightShort from '../../../assets/images/arrow-right-short.svg'
import { BlogItem } from '../FeaturedBlogs/FeaturedBlogs'

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

export interface BlogSearchCardProps {
  className?: string
  imageClassName?: string
  fullCardSizeImage?: boolean
  item: BlogItem
}

export const BlogSearchCard = ({ className, imageClassName, fullCardSizeImage, item }: BlogSearchCardProps) => {
  const { Link: UILink } = useUIContext()
  const publishedAt = new Date(item.data?.attributes?.publishedAt)
  const date = publishedAt.getDay() + '. ' + publishedAt.getMonth() + '. ' + publishedAt.getFullYear()
  const headline =
    item?.data?.attributes?.tag?.data?.attributes?.pageCategory?.data?.attributes?.shortTitle ?? 'No Title Found'
  const color = item?.data?.attributes?.tag?.data?.attributes?.pageCategory?.data?.attributes?.color
  const headlineColor = color ? `--color-${color}--light` : '--color-red'
  const slug = item.data?.attributes?.slug
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
        {item?.data?.attributes?.coverImage && (
          <div
            className={cx('flex flex-shrink-0 blog-card-image', imageClassName)}
            style={{
              backgroundImage: `url(${item?.data?.attributes?.coverImage?.data?.attributes?.url})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}
          />
        )}

        <div className="p-8 flex flex-col gap-y-4">
          <div
            className="px-3 py-1 rounded-lg w-fit font-medium"
            style={{ backgroundColor: `rgb(var(${headlineColor}))` }}
          >
            {headline}
          </div>
          <div className="text-ellipsis overflow-hidden text-default font-semibold line-clamp-2">
            {item.data?.attributes?.title}
          </div>
          <div>{date}</div>
        </div>
      </Panel>
      <Panel
        className={cx('group', className, { 'flex lg:hidden': !fullCardSizeImage }, { flex: fullCardSizeImage })}
        hoverable
      >
        <UILink href={`/blog/${slug}`}>
          <div
            className="flex flex-col justify-end w-full h-full rounded"
            style={{
              backgroundImage: `url(${item?.data?.attributes?.coverImage?.data?.attributes?.url})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          >
            {/* should be from-black but it doesn't work */}
            <div className="flex flex-col gap-y-4 p-4 lg:p-8 bg-gradient-to-t from-[#000000]">
              <div
                className="px-3 py-1 rounded-lg w-fit font-medium"
                style={{ backgroundColor: `rgb(var(${headlineColor}))` }}
              >
                {headline}
              </div>
              <div className="flex">
                <div className="text-default font-semibold text-white">{item?.data?.attributes?.title}</div>
                <VerticalCardButton className="invisible group-hover:lg:visible flex-shrink-0" size="medium">
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
