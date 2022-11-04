// @ts-strict-ignore
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import cx from 'classnames'

import ArrowRightShort from '../../../assets/images/arrow-right-short.svg'
import { BlogPostMeili } from '../../../utils/meiliTypes'
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

export interface BlogSearchCardProps {
  className?: string
  imageClassName?: string
  fullCardSizeImage?: boolean
  item: BlogPostMeili
}

export const BlogSearchCard = ({ className, imageClassName, fullCardSizeImage, item }: BlogSearchCardProps) => {
  const { Link: UILink } = useUIContext()
  const publishedAt = new Date(item.publishedAt)
  const date = `${publishedAt.getDay()}. ${publishedAt.getMonth()}. ${publishedAt.getFullYear()}`
  const headline = item.tag.pageCategory?.shortTitle ?? 'No Title Found'
  const color = item.tag.pageCategory?.color
  const headlineColor = color ? `--color-${color}--light` : '--color-red'
  const { slug, coverImage, title } = item
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
        {coverImage && (
          <div
            className={cx('flex flex-shrink-0', imageClassName)}
            style={{
              backgroundImage: `url(${coverImage?.url})`,
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
          <div className="line-clamp-2 text-button-1 overflow-hidden text-ellipsis font-semibold">{title} </div>
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
              backgroundImage: `url(${coverImage?.url})`,
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
                <div className="line-clamp-2 text-button-1 overflow-hidden font-semibold text-white">{title}</div>
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
