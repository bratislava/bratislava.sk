import { NewsCardProps } from '@bratislava/ui-bratislava'

export enum TAB_CATEGORY {
  NEWS,
  OFFICIAL_BOARD,
  ROAD_CLOSURES,
  PUBLICATION,
}

export interface Post {
  tab: TAB_CATEGORY
  category: string
  newsCards?: NewsCardProps[]
  url?: string
}
