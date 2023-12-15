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
import { getCategoryColorLocalStyle } from '@utils/colors'
import { generateImageSizes } from '@utils/generateImageSizes'
import { isDefined } from '@utils/isDefined'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

export interface SearchCardNewProps {
  title: string
  slug?: string
  tag?: string
  metadata?: string[]
  pageColor?: Enum_Pagecategory_Color | Enum_Page_Pagecolor
  picture?: any
}

export const SearchCardWithPictureNew = ({
  title,
  slug = '',
  tag = '',
  metadata,
  pageColor,
  picture,
}: SearchCardNewProps) => {
  const urlExcerpt = `www.bratislava.sk/${slug.slice(0, 15)}...`
  const cleanedMetadata = metadata?.filter(isDefined).filter((item) => item !== '') ?? []

  const colorStyle = getCategoryColorLocalStyle({ color: pageColor as Enum_Pagecategory_Color })
  const { default: PageIcon, small: SmallPageIcon } = findIconByPageColor(
    pageColor as Enum_Pagecategory_Color,
  )

  return (
    <MLink className="group flex flex-row overflow-hidden rounded-lg border-2" href={`/../${slug}`}>
      {/* PICTURE */}
      <div className="hidden sm:block">
        {/* FIXME: velkost dzivna */}
        {picture && (
          <div className="relative h-[150px] w-[150px] shrink-0 overflow-hidden">
            {picture ? (
              <Image
                className="object-cover"
                fill
                src={picture}
                // sizes={generateImageSizes({ lg: '150px', default: '150px' })}
                alt=""
              />
            ) : (
              <ImagePlaceholder />
            )}
          </div>
        )}
        {pageColor && (
          <div
            style={colorStyle}
            className="relative flex h-[150px] w-[150px] shrink-0 items-center justify-center overflow-hidden bg-category-200"
          >
            <PageIcon className="max-md:hidden" />
            <SmallPageIcon className="md:hidden" />
          </div>
        )}
      </div>
      <div className="flex w-full gap-6 p-6">
        {/* INFO */}
        <div className="flex w-full flex-col flex-wrap gap-y-3  sm:flex-nowrap">
          {tag ? (
            <div>
              <Tag text={tag} size="small" />
            </div>
          ) : null}
          line-clamp-3 break-words text-size-h5 font-semibold group-hover:underline md:line-clamp-1
          <p className="">{title}</p>
          <div>{cleanedMetadata.join(' • ')}</div>
        </div>
        {/* SIPKA */}
        <ChevronRight />
      </div>
    </MLink>
  )
}

export const SearchCardNew = ({ title, slug = '', tag = '', metadata }: SearchCardNewProps) => {
  const cleanedMetadata = metadata?.filter(isDefined).filter((item) => item !== '') ?? []

  return (
    <MLink className="group flex flex-row items-center gap-6 px-6 py-4" href={`/../${slug}`}>
      {/* INFO */}
      <div className="flex w-full flex-col gap-y-1.5">
        <div className="flex flex-row flex-wrap items-center gap-x-3 sm:flex-nowrap">
          <p className="line-clamp-3 break-words text-size-h5 font-semibold group-hover:underline md:line-clamp-1">
            {title}
          </p>
          {tag ? (
            <div>
              <Tag text={tag} size="small" />
            </div>
          ) : null}
        </div>
        <div>{cleanedMetadata.join(' • ')}</div>
      </div>
      {/* SIPKA */}
      <ChevronRight />
    </MLink>
  )
}

const ChevronRight = () => {
  return (
    <div className="my-auto self-end text-main-700">
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
