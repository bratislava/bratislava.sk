import ChevronRight from '@assets/images/chevron-right-large.svg'
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
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import { Enum_Page_Pagecolor, Enum_Pagecategory_Color } from '@bratislava/strapi-sdk-homepage'
import { getCategoryColorLocalStyle } from '@utils/colors'

import Panel from '../Panel/Panel'

const findIconByColor = (pageColor: Enum_Pagecategory_Color) => {
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

export interface PageCardProps {
  pageColor: Enum_Pagecategory_Color | Enum_Page_Pagecolor
  title: string
  slug: string
}

export const PageCard = ({ pageColor, title, slug }: PageCardProps) => {
  const { Link: UILink } = useUIContext()

  const colorStyle = getCategoryColorLocalStyle({ color: pageColor as Enum_Pagecategory_Color })
  const { default: PageIcon, small: SmallPageIcon } = findIconByColor(
    pageColor as Enum_Pagecategory_Color,
  )

  return (
    <UILink href={slug ? `/${slug}` : ''} style={colorStyle}>
      <Panel className="hidden w-full lg:flex" hoverable>
        <div className="bg-category-200 px-12 py-4">
          <PageIcon />
        </div>
        <div className="flex w-full items-center justify-between px-14">
          <span className="text-p1-semibold">{title}</span>
          <ChevronRight />
        </div>
      </Panel>
      <Panel className="min-w-76 flex flex-col gap-y-4 px-6 py-4 lg:hidden" hoverable>
        <div className="flex items-center justify-between">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-category-200">
            <SmallPageIcon />
          </div>
          <div className="pr-8">
            <ChevronRight />
          </div>
        </div>

        <span className="text-p2-medium">{title}</span>
      </Panel>
    </UILink>
  )
}
