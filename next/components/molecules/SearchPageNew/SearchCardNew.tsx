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
import MLink from '@components/forms/simple-components/MLink'
import Tag from '@components/forms/simple-components/Tag'
import CardBase from '@components/molecules/presentation/CardBase'
import CardContent from '@components/molecules/presentation/CardContent'
import { getCategoryColorLocalStyle } from '@utils/colors'

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
  picture,
}: SearchCardNewProps) => {
  const urlExcerpt = `www.bratislava.sk/${slug.slice(0, 15)}...`

  return (
    <MLink className="group flex flex-row items-center rounded-lg border-2" href={`/../${slug}`}>
      <img className="h-[150px] w-[150px]" src={picture} alt={title} />
      <div className="flex flex-col gap-y-1.5 p-8">
        {tag ? (
          <div>
            <Tag text={tag} size="small" />
          </div>
        ) : null}
        <p className="text-size-h5 font-semibold group-hover:underline">{title}</p>
        <div>{[urlExcerpt, ...(metadata ?? '')].join(' • ')}</div>
      </div>
      <div className="my-auto ml-auto pr-8 text-main-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="m7.93 4.16 7.94 7.89-7.94 7.89L8.99 21 18 12.05 8.99 3.1 7.93 4.16Z"
          />
        </svg>
      </div>
    </MLink>
  )
}

export const SearchCardNew = ({ title, slug = '', tag = '', metadata }: SearchCardNewProps) => {
  const urlExcerpt = `www.bratislava.sk/${slug.slice(0, 15)}...`

  return (
    <MLink className="group flex flex-row gap-x-8 px-6 py-4" href={`/../${slug}`}>
      <div className="flex flex-col gap-y-1.5">
        <div className="flex flex-row items-center gap-x-3	">
          <p className="text-size-h5 font-semibold group-hover:underline">{title}</p>
          {tag ? (
            <div>
              <Tag text={tag} size="small" />
            </div>
          ) : null}
        </div>
        <div>{[urlExcerpt, ...(metadata ?? '')].join(' • ')}</div>
      </div>
      <div className="my-auto ml-auto text-main-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="m7.93 4.16 7.94 7.89-7.94 7.89L8.99 21 18 12.05 8.99 3.1 7.93 4.16Z"
          />
        </svg>
      </div>
    </MLink>
  )
}

// const findIconByColor = (pageColor: Enum_Pagecategory_Color) => {
//   const icons = {
//     red: { default: PageRedIcon, small: PageRedIconSmall },
//     blue: { default: PageBlueIcon, small: PageBlueIconSmall },
//     green: { default: PageGreenIcon, small: PageGreenIconSmall },
//     yellow: { default: PageYellowIcon, small: PageYellowIconSmall },
//     purple: { default: PagePurpleIcon, small: PagePurpleIconSmall },
//     brown: { default: PageBrownIcon, small: PageBrownIconSmall },
//   }

//   return icons[pageColor] ?? icons.red
// }

// export interface SearchCardNewProps {
//   pageColor: Enum_Pagecategory_Color | Enum_Page_Pagecolor
//   title: string
//   slug: string
// }

// export const SearchCardNew = ({ pageColor, title, slug }: SearchCardNewProps) => {
//   const colorStyle = getCategoryColorLocalStyle({ color: pageColor as Enum_Pagecategory_Color })

//   const { default: PageIcon, small: SmallPageIcon } = findIconByColor(
//     pageColor as Enum_Pagecategory_Color,
//   )

//   return (
//     <CardBase variant="shadow" style={colorStyle} className="flex-row rounded-lg">
//       <div className="bg-category-200 p-4 md:px-12">
//         <PageIcon className="max-md:hidden" />
//         <SmallPageIcon className="md:hidden" />
//       </div>
//       <CardContent className="flex w-full flex-row items-center justify-between">
//         <h3 className="text-large-respo">
//           <MLink href={`/${slug}`} stretched variant="underlineOnHover">
//             {title}
//           </MLink>
//         </h3>
//         <ChevronRightIcon />
//       </CardContent>
//     </CardBase>
//   )
// }
