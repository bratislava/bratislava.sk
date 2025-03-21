import { Enum_Pagecategory_Color } from '@/src/services/graphql'
import PageBlueIcon from '@/src/assets/images/page-blue-icon.svg'
import PageBlueIconSmall from '@/src/assets/images/page-blue-icon-small.svg'
import PageBrownIcon from '@/src/assets/images/page-brown-icon.svg'
import PageBrownIconSmall from '@/src/assets/images/page-brown-icon-small.svg'
import PageGreenIcon from '@/src/assets/images/page-green-icon.svg'
import PageGreenIconSmall from '@/src/assets/images/page-green-icon-small.svg'
import PagePurpleIcon from '@/src/assets/images/page-purple-icon.svg'
import PagePurpleIconSmall from '@/src/assets/images/page-purple-icon-small.svg'
import PageRedIcon from '@/src/assets/images/page-red-icon.svg'
import PageRedIconSmall from '@/src/assets/images/page-red-icon-small.svg'
import PageYellowIcon from '@/src/assets/images/page-yellow-icon.svg'
import PageYellowIconSmall from '@/src/assets/images/page-yellow-icon-small.svg'

export const getIconByPageColor = (pageColor: Enum_Pagecategory_Color) => {
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
