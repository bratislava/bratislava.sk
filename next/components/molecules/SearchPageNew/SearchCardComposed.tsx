import { ChevronRightIcon } from '@assets/ui-icons'
import { Enum_Page_Pagecolor, Enum_Pagecategory_Color } from '@backend/graphql'
import { Typography } from '@bratislava/component-library'
import ImagePlaceholder from '@components/atoms/ImagePlaceholder'
import MLink from '@components/forms/simple-components/MLink'
import Tag from '@components/forms/simple-components/Tag'
import { SearchResult } from '@components/molecules/SearchPageNew/useQueryBySearchOption'
import { getCategoryColorLocalStyle } from '@utils/colors'
import { generateImageSizes } from '@utils/generateImageSizes'
import { isDefined } from '@utils/isDefined'
import { findIconByPageColor } from '@utils/pageIcons'
import cx from 'classnames'
import Image from 'next/image'
import React, { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type SearchCardComposedProps = {
  data: SearchResult
  tagText?: string
  variant: 'default' | 'withPicture'
}

const SearchCardComposed = ({ data, variant = 'default', tagText }: SearchCardComposedProps) => {
  return (
    <>
      {variant === 'default' && (
        <div className="group relative flex flex-row overflow-hidden">
          <div className="flex w-full flex-row gap-6 px-6 py-4">
            <SearchCardComposed.InfoContainer className="gap-1.5">
              <div className="flex flex-row flex-wrap items-center gap-x-3 gap-y-1.5 lg:flex-nowrap">
                <SearchCardComposed.TitleWithLink title={data.title} url={data.linkHref} />
                <SearchCardComposed.Tag text={tagText} />
              </div>
              <SearchCardComposed.Metadata metadata={data.metadata} />
            </SearchCardComposed.InfoContainer>
            {data.linkHref && <SearchCardComposed.Button />}
          </div>
        </div>
      )}
      {variant === 'withPicture' && (
        <div
          className={cx(
            'group relative flex flex-row items-stretch overflow-hidden rounded-none border-b-2 lg:rounded-lg lg:border-2',
            { 'hover:border-gray-400': data.linkHref },
          )}
        >
          {data.coverImageSrc ? (
            <SearchCardComposed.ImageFromUrl imgUrl={data.coverImageSrc} />
          ) : data.pageColor ? (
            <SearchCardComposed.ImageFromPageColor pageColor={data.pageColor} />
          ) : (
            <SearchCardComposed.ImageFromPageColor pageColor={Enum_Pagecategory_Color.Red} />
          )}
          <div className="flex w-full flex-row gap-6 py-4 lg:p-6">
            <SearchCardComposed.InfoContainer className="flex flex-col gap-3">
              <div className="flex flex-col gap-y-2">
                <SearchCardComposed.Tag text={tagText} />
                <SearchCardComposed.TitleWithLink
                  className=""
                  title={data.title}
                  url={data.linkHref}
                />
              </div>
              <SearchCardComposed.Metadata metadata={data.metadata} />
            </SearchCardComposed.InfoContainer>
            {data.linkHref && <SearchCardComposed.Button className="hidden lg:block" />}
          </div>
        </div>
      )}
    </>
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
  const { default: PageIcon } = findIconByPageColor(pageColor as Enum_Pagecategory_Color)

  return (
    <div
      style={colorStyle}
      className={twMerge(
        'relative hidden w-[150px] shrink-0 items-center justify-center overflow-hidden bg-category-200 lg:flex',
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
        'relative hidden w-[150px] shrink-0 items-center justify-center overflow-hidden bg-category-200 lg:flex',
        className,
      )}
    >
      <Image
        src={imgUrl}
        alt=""
        sizes={generateImageSizes({ default: '150px' })}
        fill
        className="h-full object-cover"
      />
      <ImagePlaceholder />
    </div>
  )
}

SearchCardComposed.InfoContainer = function ({
  children,
  className,
}: {
  children: React.PropsWithChildren<ReactNode>
  className?: string
}) {
  return <div className={twMerge('flex w-full flex-col justify-center', className)}>{children}</div>
}

SearchCardComposed.TitleWithLink = function ({
  title,
  url,
  className,
}: {
  title: string
  url?: string
  className?: string
}) {
  return (
    <>
      {url ? (
        <MLink stretched href={url ?? ''}>
          <Typography
            type="h3"
            size="h5"
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
          size="h5"
          className={twMerge('line-clamp-3 md:line-clamp-2 lg:line-clamp-1', className)}
        >
          {title}
        </Typography>
      )}
    </>
  )
}

SearchCardComposed.Tag = function ({ text, className }: { text: string; className?: string }) {
  return (
    <div className={twMerge('', className)}>
      <Tag text={text} size="small" />
    </div>
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
        <>
          {index > 0 && (
            <Typography type="p" className="max-lg:hidden">
              •
            </Typography>
          )}
          <Typography type="p" className="max-lg:first-of-type:font-medium">
            {item}
          </Typography>
        </>
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
