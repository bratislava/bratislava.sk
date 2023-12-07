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
import CardBase from '@components/molecules/presentation/CardBase'
import CardContent from '@components/molecules/presentation/CardContent'
import { getCategoryColorLocalStyle } from '@utils/colors'

export interface SearchCardNewProps {
  title: string
  url?: string
  metadata?: string[]
  pageColor?: Enum_Pagecategory_Color | Enum_Page_Pagecolor
}

export const SearchCardNew = ({ title, url, metadata }: SearchCardNewProps) => {
  return (
    <div className="border-2 p-2">
      <p>{title}</p>
      <p>{`${url ?? 'no URL given'} ${metadata?.toString() ?? 'no metadata given'}`}</p>
    </div>
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
