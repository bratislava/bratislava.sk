import { Post, TAB_CATEGORY } from './types'

const ROAD_CLOSURES_URL = '/doprava-a-mapy/sprava-a-udrzba-komunikacii/aktualne-uzavierky'

export function getPosts(): Post[] {
  return [
    {
      category: 'news',
      tab: TAB_CATEGORY.NEWS,
      newsCards: [],
    },
    {
      category: 'officialNoticeBoard',
      tab: TAB_CATEGORY.OFFICIAL_BOARD,
      newsCards: [],
    },
    {
      category: 'roadClosures',
      tab: TAB_CATEGORY.ROAD_CLOSURES,
      url: ROAD_CLOSURES_URL,
      newsCards: [],
    },
    {
      category: 'publicationInformation',
      tab: TAB_CATEGORY.PUBLICATION,
      newsCards: [],
    },
  ]
}
