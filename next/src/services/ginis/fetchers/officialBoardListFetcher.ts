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
  publicationYear?: string
}

/** Values accepted by GINIS `Stav` for list filtering (see getOfficialBoardParsedList). */
export const OFFICIAL_BOARD_PUBLICATION_STATES = ['vyveseno', 'sejmuto'] as const satisfies readonly OfficialBoardPublicationState[]

export type OfficialBoardPublicationStateInUrl = (typeof OFFICIAL_BOARD_PUBLICATION_STATES)[number]

export function toOfficialBoardPublicationStateInUrl(
  value: OfficialBoardPublicationState | undefined | null,
): OfficialBoardPublicationStateInUrl {
  return value === 'vyveseno' || value === 'sejmuto' ? value : 'vyveseno'
}

export const officialBoardListDefaultFilters = {
  search: '',
  pageSize: 10,
  page: 1,
  publicationState: 'vyveseno',
  publicationYear: 'all',
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
      filters.publicationYear ? `publicationYear=${filters.publicationYear}` : '',
    ]
      .filter(Boolean)
      .join('&')}`,
  )
}
