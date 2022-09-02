import { NewsCardProps } from '@bratislava/ui-bratislava'

export enum TAB_CATEGORY {
  NEWS = 'Aktuality',
  OFFICIAL_BOARD = 'Úradná tabuľa',
  ROAD_CLOSURES = 'Uzávierky',
  PUBLICATION = 'Zverejňovanie',
}

interface PostTab {
  category: TAB_CATEGORY
  newsCards?: NewsCardProps[]
  url?: string
}

export interface Post {
  category?: TAB_CATEGORY
  newsCards?: NewsCardProps[]
  url?: string
}

export const POSTS_TABS: PostTab[] = [
  {
    category: TAB_CATEGORY.NEWS,
  },
  {
    category: TAB_CATEGORY.OFFICIAL_BOARD,
  },
  {
    category: TAB_CATEGORY.ROAD_CLOSURES,
    url: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/aktualne-uzavierky',
  },
  {
    category: TAB_CATEGORY.PUBLICATION,
  },
]
