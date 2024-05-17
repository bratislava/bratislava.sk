import { Enum_Pagecategory_Color } from '@backend/graphql'

import PageBlueIcon from '@/assets/images/page-blue-icon.svg'
import PageBlueIconSmall from '@/assets/images/page-blue-icon-small.svg'
import PageBrownIcon from '@/assets/images/page-brown-icon.svg'
import PageBrownIconSmall from '@/assets/images/page-brown-icon-small.svg'
import PageGreenIcon from '@/assets/images/page-green-icon.svg'
import PageGreenIconSmall from '@/assets/images/page-green-icon-small.svg'
import PagePurpleIcon from '@/assets/images/page-purple-icon.svg'
import PagePurpleIconSmall from '@/assets/images/page-purple-icon-small.svg'
import PageRedIcon from '@/assets/images/page-red-icon.svg'
import PageRedIconSmall from '@/assets/images/page-red-icon-small.svg'
import PageYellowIcon from '@/assets/images/page-yellow-icon.svg'
import PageYellowIconSmall from '@/assets/images/page-yellow-icon-small.svg'

export const findIconByPageColor = (pageColor: Enum_Pagecategory_Color) => {
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
