import axios from 'axios'

import {
  OfficialBoardListResponse,
  OfficialBoardPublicationState,
} from '@/src/services/ginis/types'

export type OfficialBoardListFilters = {
  search: string
  pageSize: number
  page: number
  categoryId: string
  publicationState: OfficialBoardPublicationState
  publicationYear: string
}

export const officialBoardListDefaultFilters = {
  search: '',
  pageSize: 10,
  page: 1,
  categoryId: 'all',
  publicationState: 'vyveseno',
  publicationYear: 'all',
} satisfies OfficialBoardListFilters

export const getOfficialBoardListQueryKey = (filters: OfficialBoardListFilters) => [
  'Search',
  'OfficialBoardList',
  filters,
]

export const officialBoardListFetcher = async (filters: OfficialBoardListFilters) => {
  const { search, pageSize, page, publicationState, categoryId, publicationYear } = filters

  return axios.get<OfficialBoardListResponse>(
    `/api/ginis/official-board-list?${[
      search ? `search=${search}` : '',
      pageSize ? `pageSize=${pageSize.toString()}` : '',
      page ? `page=${page.toString()}` : '',
      // TODO revisit this
      // eslint-disable-next-line @typescript-eslint/no-base-to-string
      publicationState ? `publicationState=${publicationState}` : '',
      categoryId ? `categoryId=${categoryId === 'all' ? '' : categoryId}` : '',
      publicationYear ? `publicationYear=${publicationYear}` : '',
    ]
      .filter(Boolean)
      .join('&')}`,
  )
}
