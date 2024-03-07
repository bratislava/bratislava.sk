import { ParsedOfficialBoardDocument } from '@backend/ginis/types'
import axios from 'axios'

export type OfficialBoardListFilters = {
  search?: string
  limit?: number
}

export const officialBoardListDefaultFilters: OfficialBoardListFilters = {
  search: '',
}

export const getOfficialBoardListQueryKey = (filters?: OfficialBoardListFilters) => [
  'OfficialBoardList',
  filters,
]

export const officialBoardListFetcher = async (filters?: OfficialBoardListFilters) => {
  return axios.get<ParsedOfficialBoardDocument[]>(
    `/api/ginis/official-board-list?${[
      filters?.search ? `searchQuery=${filters.search}` : '',
      filters?.limit ? `limit=${filters.limit.toString()}` : '',
    ]
      .filter(Boolean)
      .join('&')}`,
  )
}
