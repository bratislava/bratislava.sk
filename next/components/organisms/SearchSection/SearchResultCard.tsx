import { Typography } from '@bratislava/component-library'
import cx from 'classnames'
import Image from 'next/image'
import React, { Fragment } from 'react'
import { twMerge } from 'tailwind-merge'

import { ChevronRightIcon } from '@/assets/ui-icons'
import Icon from '@/components/atoms/icon/Icon'
import ImagePlaceholder from '@/components/atoms/ImagePlaceholder'
import MLink from '@/components/forms/simple-components/MLink'
import { SearchResult } from '@/components/organisms/SearchSection/useQueryBySearchOption'
import { Enum_Page_Pagecolor, Enum_Pagecategory_Color } from '@/services/graphql'
import { getCategoryColorLocalStyle } from '@/utils/colors'
import { generateImageSizes } from '@/utils/generateImageSizes'
import { isDefined } from '@/utils/isDefined'
import { findIconByPageColor } from '@/utils/pageIcons'

type SearchResultCardProps = {
  data: SearchResult
  hideBottomDivider?: boolean
}

const SearchResultCard = ({ data, hideBottomDivider }: SearchResultCardProps) => {
  return (
    <div
      className={cx(
        'group relative flex flex-row items-stretch overflow-hidden rounded-none bg-white lg:rounded-lg lg:border-2',
        { 'hover:border-gray-400': data.linkHref, 'border-b-2': !hideBottomDivider },
      )}
      data-cy="search-result-card"
    >
      {data.coverImageSrc ? (
        <SearchResultCard.ImageFromUrl imgUrl={data.coverImageSrc} />
      ) : data.customIconName ? (
        <SearchResultCard.ImageFromIconName iconName={data.customIconName} />
      ) : data.pageColor ? (
        <SearchResultCard.ImageFromPageColor pageColor={data.pageColor} />
      ) : null}
      <div className="flex w-full flex-row gap-6 py-4 lg:p-6">
        <div className="flex w-full flex-col justify-center gap-3 lg:gap-2">
          <SearchResultCard.TitleWithLink title={data.title ?? ''} href={data.linkHref ?? ''} />
          <SearchResultCard.Metadata metadata={data.metadata?.filter(isDefined) ?? []} />
        </div>
        {data.linkHref && <SearchResultCard.Button className="hidden lg:block" />}
      </div>
    </div>
  )
}

SearchResultCard.IconContainer = function ({
  children,
  className,
}: {
  children: any
  className?: string
}) {
  return (
    <div
      className={twMerge(
        'hidden w-[6.5rem] shrink-0 items-center justify-center bg-gray-100 lg:flex',
        className,
      )}
    >
      {children}
    </div>
  )
}

SearchResultCard.ImageFromIconName = function ({
  iconName,
  className,
}: {
  iconName?: string
  className?: string
}) {
  if (!iconName) return null
  return (
    <SearchResultCard.IconContainer className={className}>
      <Icon iconName={iconName} />
    </SearchResultCard.IconContainer>
  )
}

SearchResultCard.ImageFromPageColor = function ({
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
        'relative hidden w-[6.5rem] shrink-0 items-center justify-center overflow-hidden bg-category-100 lg:flex',
        className,
      )}
    >
      <PageIcon />
    </div>
  )
}

SearchResultCard.ImageFromUrl = function ({
  imgUrl,
  className,
}: {
  imgUrl: string
  className?: string
}) {
  return (
    <div
      className={twMerge(
        'relative hidden w-[6.5rem] shrink-0 items-center justify-center overflow-hidden bg-category-200 lg:flex',
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

SearchResultCard.TitleWithLink = function ({
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

SearchResultCard.Metadata = function ({
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

SearchResultCard.Button = function ({ className }: { className?: string }) {
  return (
    <div className={twMerge('my-auto self-end text-main-700', className)}>
      <ChevronRightIcon />
    </div>
  )
}

export default SearchResultCard
