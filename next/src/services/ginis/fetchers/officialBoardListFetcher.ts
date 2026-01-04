import axios from 'axios'

import {
  OfficialBoardListResponse,
  OfficialBoardPublicationState,
} from '@/src/services/ginis/types'

export type OfficialBoardListFilters = {
  search: string
  pageSize: number
  page: number
  categoryId?: string
  publicationState?: OfficialBoardPublicationState
}

export const officialBoardListDefaultFilters = {
  search: '',
  pageSize: 10,
  page: 1,
  publicationState: 'vyveseno',
} satisfies OfficialBoardListFilters

export const getOfficialBoardListQueryKey = (filters: OfficialBoardListFilters) => [
  'Search',
  'OfficialBoardList',
  filters,
]

export const officialBoardListFetcher = async (filters: OfficialBoardListFilters) => {
  return axios.get<OfficialBoardListResponse>(
    `/api/ginis/official-board-list?${[
      filters.search ? `search=${filters.search}` : '',
      filters.pageSize ? `pageSize=${filters.pageSize.toString()}` : '',
      filters.page ? `page=${filters.page.toString()}` : '',
      // TODO revisit this
      // eslint-disable-next-line @typescript-eslint/no-base-to-string
      filters.publicationState ? `publicationState=${filters.publicationState}` : '',
      filters.categoryId ? `categoryId=${filters.categoryId}` : '',
    ]
      .filter(Boolean)
      .join('&')}`,
  )
}
