import { ParsedOfficialBoardDocument } from '@backend/ginis/types'
import axios from 'axios'

export type GinisOfficialBoardFilters = {
  search?: string
  limit?: number
}

export const ginisOfficialBoardDefaultFilters: GinisOfficialBoardFilters = {
  search: '',
}

export const getGinisOfficialBoardQueryKeyJson = (filters?: GinisOfficialBoardFilters) => [
  'ginisOfficialBoardJson',
  filters,
]

export const ginisOfficialBoardFetcherJson = async (filters?: GinisOfficialBoardFilters) => {
  return axios.get<ParsedOfficialBoardDocument[]>(
    `/api/ginis/official-board-json?${[
      filters?.search ? `searchQuery=${filters.search}` : '',
      filters?.limit ? `limit=${filters.limit.toString()}` : '',
    ]
      .filter(Boolean)
      .join('&')}`,
  )
}
