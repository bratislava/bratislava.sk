import { Typography } from '@bratislava/component-library'
import Image from 'next/image'
import React, { Fragment, ReactNode } from 'react'

import { ChevronRightIcon } from '@/src/assets/ui-icons'
import ImagePlaceholder from '@/src/components/common/Image/ImagePlaceholder'
import MLink from '@/src/components/common/MLink/MLink'
import Pictogram from '@/src/components/common/Pictogram/Pictogram'
import { SearchResult } from '@/src/components/sections/SearchSection/useQueryBySearchOption'
import { Enum_Page_Pagecolor, Enum_Pagecategory_Color } from '@/src/services/graphql'
import cn from '@/src/utils/cn'
import { getCategoryColorLocalStyle } from '@/src/utils/colors'
import { generateImageSizes } from '@/src/utils/generateImageSizes'
import { getIconByPageColor } from '@/src/utils/getIconByPageColor'
import { isDefined } from '@/src/utils/isDefined'

type SearchResultCardProps = {
  data: SearchResult
}

const SearchResultCard = ({ data }: SearchResultCardProps) => {
  return (
    <div className="px-5 lg:px-6">
      <div
        className="group relative flex flex-row items-stretch gap-4 overflow-hidden bg-white py-4"
        data-cy="search-result-card"
      >
        {data.coverImageSrc ? (
          <SearchResultCard.ImageFromUrl imgUrl={data.coverImageSrc} />
        ) : data.customIconName ? (
          <SearchResultCard.ImageFromIconName iconName={data.customIconName} />
        ) : data.pageColor ? (
          <SearchResultCard.ImageFromPageColor pageColor={data.pageColor} />
        ) : null}

        <div className="flex w-full flex-row gap-4">
          <div className="flex w-full flex-col justify-center gap-3 lg:gap-2">
            <SearchResultCard.TitleWithLink title={data.title ?? ''} href={data.linkHref ?? ''} />
            <SearchResultCard.Metadata metadata={data.metadata?.filter(isDefined) ?? []} />
          </div>
          {data.linkHref && <SearchResultCard.Button className="hidden lg:block" />}
        </div>
      </div>
    </div>
  )
}

SearchResultCard.IconContainer = function ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'hidden h-20 w-20 shrink-0 items-center justify-center self-center rounded-lg bg-grey-100 lg:flex',
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
      <Pictogram iconName={iconName} />
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
  const { small: PageIcon } = getIconByPageColor(pageColor as Enum_Pagecategory_Color)

  return (
    <div
      style={colorStyle}
      className={cn(
        'relative hidden h-20 w-20 shrink-0 items-center justify-center self-center overflow-hidden rounded-lg bg-category-100 lg:flex',
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
      className={cn(
        'relative hidden h-20 w-20 shrink-0 items-center justify-center self-center overflow-hidden rounded-lg bg-category-200 lg:flex',
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
            className={cn(
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
          className={cn('line-clamp-3 md:line-clamp-2 lg:line-clamp-1', className)}
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
            <Typography type="p" size="p-small" className="max-lg:hidden">
              •
            </Typography>
          )}
          <Typography type="p" size="p-small">
            {item}
          </Typography>
        </Fragment>
      )
    }) ?? null

  return (
    <div
      className={cn(
        'flex flex-col flex-wrap items-stretch gap-x-3 gap-y-1 text-grey-700 lg:flex-row',
        className,
      )}
    >
      {metaDataRow}
    </div>
  )
}

SearchResultCard.Button = function ({ className }: { className?: string }) {
  return (
    <div className={cn('my-auto self-end text-action-content-default', className)}>
      <ChevronRightIcon />
    </div>
  )
}

export default SearchResultCard
