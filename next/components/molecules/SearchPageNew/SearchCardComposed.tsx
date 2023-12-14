import PageBlueIcon from '@assets/images/page-blue-icon.svg'
import PageBlueIconSmall from '@assets/images/page-blue-icon-small.svg'
import PageBrownIcon from '@assets/images/page-brown-icon.svg'
import PageBrownIconSmall from '@assets/images/page-brown-icon-small.svg'
import PageGreenIcon from '@assets/images/page-green-icon.svg'
import PageGreenIconSmall from '@assets/images/page-green-icon-small.svg'
import PagePurpleIcon from '@assets/images/page-purple-icon.svg'
import PagePurpleIconSmall from '@assets/images/page-purple-icon-small.svg'
import PageRedIcon from '@assets/images/page-red-icon.svg'
import PageRedIconSmall from '@assets/images/page-red-icon-small.svg'
import PageYellowIcon from '@assets/images/page-yellow-icon.svg'
import PageYellowIconSmall from '@assets/images/page-yellow-icon-small.svg'
import { ChevronRightIcon } from '@assets/ui-icons'
import { Enum_Page_Pagecolor, Enum_Pagecategory_Color } from '@backend/graphql'
import ImagePlaceholder from '@components/atoms/ImagePlaceholder'
import MLink from '@components/forms/simple-components/MLink'
import Tag from '@components/forms/simple-components/Tag'
import { GeneralSearchResult } from '@components/molecules/SearchPageNew/searchDataFetchers'
import { getCategoryColorLocalStyle } from '@utils/colors'
import { isDefined } from '@utils/isDefined'
import cx from 'classnames'
import Image from 'next/image'
import React, { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export type SearchCardComposedProps = {
  data: GeneralSearchResult
  variant: 'default' | 'withPicture'
}

export const SearchCardComposed = ({ data, variant = 'default' }: SearchCardComposedProps) => {
  return (
    <>
      {variant === 'default' && (
        <MLink className="group flex flex-row overflow-hidden" href={`/../${data.slug}`}>
          <div className="flex w-full flex-row gap-6 px-6 py-4">
            <SearchCardComposed.InfoContainer className="gap-1.5">
              <div className="flex flex-row flex-wrap items-center gap-x-3 gap-y-1.5 sm:flex-nowrap">
                <SearchCardComposed.Title title={data.title} />
                <SearchCardComposed.Tag text={data.tag} />
              </div>
              <SearchCardComposed.Metadata metadata={data.metadata} />
            </SearchCardComposed.InfoContainer>
            <SearchCardComposed.Button />
          </div>
        </MLink>
      )}
      {variant === 'withPicture' && (
        <MLink
          className="group flex flex-row overflow-hidden rounded-lg border-2"
          href={`/../${data.slug}`}
        >
          <SearchCardComposed.Image />
          <div className="flex w-full flex-row gap-6 p-6">
            <SearchCardComposed.InfoContainer className="gap-3">
              <SearchCardComposed.Tag text={data.tag} />
              <SearchCardComposed.Title title={data.title} />
              <SearchCardComposed.Metadata metadata={data.metadata} />
            </SearchCardComposed.InfoContainer>
            <SearchCardComposed.Button />
          </div>
        </MLink>
      )}
    </>
  )
}

SearchCardComposed.Image = function ({ className }: any) {
  const colorStyle = getCategoryColorLocalStyle({ color: Enum_Pagecategory_Color.Blue })
  const { default: PageIcon, small: SmallPageIcon } = findIconByPageColor(
    Enum_Pagecategory_Color.Blue,
  )

  return (
    <div
      style={colorStyle}
      className={twMerge(
        'relative flex h-[150px] w-[150px] shrink-0 items-center justify-center overflow-hidden bg-category-200',
        className,
      )}
    >
      <PageIcon className="max-md:hidden" />
      <SmallPageIcon className="md:hidden" />
    </div>
  )
}

SearchCardComposed.InfoContainer = function ({ children, className }: any) {
  return <div className={twMerge('flex w-full flex-col justify-center', className)}>{children}</div>
}

SearchCardComposed.Title = function ({ title, className }: any) {
  return (
    <div
      className={twMerge(
        'line-clamp-3 text-size-h5 font-semibold group-hover:underline md:line-clamp-2 lg:line-clamp-1',
        className,
      )}
    >
      {title}
    </div>
  )
}

SearchCardComposed.Tag = function ({ text, className }: any) {
  return (
    <div className={twMerge('', className)}>
      <Tag text={text} size="small" />
    </div>
  )
}

SearchCardComposed.Metadata = function ({ metadata, className }: any) {
  const cleanedMetadata =
    metadata
      ?.filter(isDefined)
      .filter((item: any) => item !== '')
      .join(' • ') ?? []
  return <div className={twMerge('', className)}>{cleanedMetadata}</div>
}

SearchCardComposed.Button = function ({ text, className }: any) {
  return (
    <div className={twMerge('my-auto self-end text-main-700', className)}>
      <ChevronRightIcon />
    </div>
  )
}

const findIconByPageColor = (pageColor: Enum_Pagecategory_Color) => {
  const icons = {
    red: { default: PageRedIcon, small: PageRedIconSmall },
    blue: { default: PageBlueIcon, small: PageBlueIconSmall },
    green: { default: PageGreenIcon, small: PageGreenIconSmall },
    yellow: { default: PageYellowIcon, small: PageYellowIconSmall },
    purple: { default: PagePurpleIcon, small: PagePurpleIconSmall },
    brown: { default: PageBrownIcon, small: PageBrownIconSmall },
  }

  return icons[pageColor] ?? icons.red
}
