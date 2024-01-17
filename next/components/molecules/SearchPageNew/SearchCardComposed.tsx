import { ChevronRightIcon } from '@assets/ui-icons'
import { Enum_Page_Pagecolor, Enum_Pagecategory_Color } from '@backend/graphql'
import { Typography } from '@bratislava/component-library'
import { Icon } from '@components/atoms/icon/Icon'
import ImagePlaceholder from '@components/atoms/ImagePlaceholder'
import MLink from '@components/forms/simple-components/MLink'
import { SearchResult } from '@components/molecules/SearchPageNew/useQueryBySearchOption'
import { getCategoryColorLocalStyle } from '@utils/colors'
import { generateImageSizes } from '@utils/generateImageSizes'
import { isDefined } from '@utils/isDefined'
import { findIconByPageColor } from '@utils/pageIcons'
import cx from 'classnames'
import Image from 'next/image'
import React, { Fragment } from 'react'
import { twMerge } from 'tailwind-merge'

type SearchCardComposedProps = {
  data: SearchResult
}

const SearchCardComposed = ({ data }: SearchCardComposedProps) => {
  return (
    <div
      className={cx(
        'group relative flex flex-row items-stretch overflow-hidden rounded-none border-b-2 lg:rounded-lg lg:border-2',
        { 'hover:border-gray-400': data.linkHref },
      )}
    >
      {data.coverImageSrc ? (
        <SearchCardComposed.ImageFromUrl imgUrl={data.coverImageSrc} />
      ) : data.customIconName ? (
        <SearchCardComposed.ImageFromIcon iconName={data.customIconName} />
      ) : data.pageColor ? (
        <SearchCardComposed.ImageFromPageColor pageColor={data.pageColor} />
      ) : (
        <SearchCardComposed.ImageFromIcon iconName={null} />
      )}
      <div className="flex w-full flex-row gap-6 py-4 lg:p-6">
        <div className="flex w-full flex-col justify-center gap-2">
          <SearchCardComposed.TitleWithLink title={data.title} href={data.linkHref} />
          <SearchCardComposed.Metadata metadata={data.metadata} />
        </div>
        {data.linkHref && <SearchCardComposed.Button className="hidden lg:block" />}
      </div>
    </div>
  )
}

SearchCardComposed.ImageFromIcon = function ({
  iconName,
  className,
}: {
  iconName?: string
  className?: string
}) {
  if (!iconName) return null
  return (
    <div
      className={twMerge(
        'hidden w-[104px] shrink-0 items-center justify-center bg-gray-100 lg:flex',
        className,
      )}
    >
      <Icon iconName={iconName} />
    </div>
  )
}

SearchCardComposed.ImageFromPageColor = function ({
  pageColor,
  className,
}: {
  pageColor: Enum_Page_Pagecolor | Enum_Pagecategory_Color
  className?: string
}) {
  const colorStyle = getCategoryColorLocalStyle({ color: pageColor as Enum_Pagecategory_Color })
  const { small: PageIcon } = findIconByPageColor(pageColor as Enum_Pagecategory_Color)

  return (
    <div
      style={colorStyle}
      className={twMerge(
        'relative hidden w-[104px] shrink-0 items-center justify-center overflow-hidden bg-category-100 lg:flex',
        className,
      )}
    >
      <PageIcon />
    </div>
  )
}

SearchCardComposed.ImageFromUrl = function ({
  imgUrl,
  className,
}: {
  imgUrl: string
  className?: string
}) {
  return (
    <div
      className={twMerge(
        'relative hidden w-[104px] shrink-0 items-center justify-center overflow-hidden bg-category-200 lg:flex',
        className,
      )}
    >
      <Image
        src={imgUrl}
        alt=""
        sizes={generateImageSizes({ default: '150px' })}
        fill
        className="object-cover"
      />
      <ImagePlaceholder />
    </div>
  )
}

SearchCardComposed.TitleWithLink = function ({
  title,
  href,
  className,
}: {
  title: string
  href?: string
  className?: string
}) {
  return (
    <>
      {href ? (
        <MLink stretched href={href}>
          <Typography
            type="h3"
            size="h6"
            className={twMerge(
              'line-clamp-3 group-hover:underline md:line-clamp-2 lg:line-clamp-1',
              className,
            )}
          >
            {title}
          </Typography>
        </MLink>
      ) : (
        <Typography
          type="h3"
          size="h6"
          className={twMerge('line-clamp-3 md:line-clamp-2 lg:line-clamp-1', className)}
        >
          {title}
        </Typography>
      )}
    </>
  )
}

SearchCardComposed.Metadata = function ({
  metadata,
  className,
}: {
  metadata: string[]
  className?: string
}) {
  const cleanedMetadata = metadata?.filter(isDefined).filter((item: string) => item !== '')
  const metaDataRow =
    cleanedMetadata?.map((item: string, index: number) => {
      return (
        <Fragment key={item}>
          {index > 0 && (
            <Typography type="p" className="max-lg:hidden">
              •
            </Typography>
          )}
          <Typography type="p" className="max-lg:first-of-type:font-medium">
            {item}
          </Typography>
        </Fragment>
      )
    }) ?? null
  return (
    <div
      className={twMerge(
        'flex flex-col flex-wrap items-stretch gap-x-3 gap-y-1 text-gray-700 lg:flex-row',
        className,
      )}
    >
      {metaDataRow}
    </div>
  )
}

SearchCardComposed.Button = function ({ className }: { className?: string }) {
  return (
    <div className={twMerge('my-auto self-end text-main-700', className)}>
      <ChevronRightIcon />
    </div>
  )
}

export default SearchCardComposed
