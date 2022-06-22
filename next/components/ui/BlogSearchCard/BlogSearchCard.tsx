import Panel from '../Panel/Panel'
import cx from 'classnames'
import { VerticalCardButton } from '../VerticalCardButton/VerticalCardButton'
import ArrowRightShort from '../../../assets/images/arrow-right-short.svg'

export interface BlogImage {
  url: string
}

export interface BlogTag {
  pageCategory: { color: string; shortTitle: string }
}

export interface BlogSearchCardProps {
  className?: string
  imageClassName?: string
  fullCardSizeImage?: boolean
  title?: string
  published_at?: string
  coverImage?: BlogImage
  tag?: BlogTag
}

export const BlogSearchCard = ({
  coverImage,
  tag,
  title,
  published_at,
  className,
  imageClassName,
  fullCardSizeImage,
}: BlogSearchCardProps) => {
  const publishedAt = new Date(published_at)
  const date = publishedAt.getDay() + '. ' + publishedAt.getMonth() + '. ' + publishedAt.getFullYear()
  const headline = tag?.pageCategory?.shortTitle ?? 'No Title Found'
  const color = tag?.pageCategory?.color
  const headlineColor = color ? `--color-${color}--light` : '--color-red'
  return (
    <>
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
            className={cx('flex flex-shrink-0 blog-card-image', imageClassName)}
            style={{
              backgroundImage: `url(${coverImage.url})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}
          />
        )}
        <div className="p-8 flex flex-col gap-y-5">
          <div
            className="px-3 py-1 rounded-lg w-fit font-medium"
            style={{ backgroundColor: `rgb(var(${headlineColor}))` }}
          >
            {headline}
          </div>
          <div className="text-ellipsis overflow-hidden text-default font-semibold">{title}</div>
          <div>{date}</div>
        </div>
      </Panel>
      <Panel
        className={cx('group', className, { 'flex lg:hidden': !fullCardSizeImage }, { flex: fullCardSizeImage })}
        hoverable
      >
        <div
          className="flex flex-col justify-end w-full h-full rounded"
          style={{
            backgroundImage: `url(${coverImage?.url})`,
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
              <div className="text-default font-semibold text-white">{title}</div>
              <VerticalCardButton className="invisible group-hover:lg:visible flex-shrink-0" size="medium">
                <ArrowRightShort className="scale-125" />
              </VerticalCardButton>
            </div>
            <div className="text-white">{date}</div>
          </div>
        </div>
      </Panel>
    </>
  )
}
