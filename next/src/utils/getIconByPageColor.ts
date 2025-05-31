import {
  PageBlueIcon,
  PageBlueIconSmall,
  PageBrownIcon,
  PageBrownIconSmall,
  PageGreenIcon,
  PageGreenIconSmall,
  PagePurpleIcon,
  PagePurpleIconSmall,
  PageRedIcon,
  PageRedIconSmall,
  PageYellowIcon,
  PageYellowIconSmall,
} from '@/src/assets/icons-search-results'
import { Enum_Pagecategory_Color } from '@/src/services/graphql'

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
