import { Post, TAB_CATEGORY } from './types'

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
      url: '/doprava-a-mapy/sprava-a-udrzba-komunikacii/aktualne-uzavierky',
      newsCards: [],
    },
    {
      category: 'publicationInformation',
      tab: TAB_CATEGORY.PUBLICATION,
      newsCards: [],
    },
  ]
}
