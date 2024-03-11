import { OfficialBoardListResponse } from '@backend/ginis/types'
import axios from 'axios'

export type OfficialBoardListFilters = {
  search: string
  pageSize: number
  page: number
  categoryId?: string
}

export const officialBoardListDefaultFilters: OfficialBoardListFilters = {
  search: '',
  pageSize: 10,
  page: 1,
}

export const getOfficialBoardListQueryKey = (filters: OfficialBoardListFilters) => [
  'OfficialBoardList',
  filters,
]

export const officialBoardListFetcher = async (filters: OfficialBoardListFilters) => {
  console.log('filters', filters)

  return axios.get<OfficialBoardListResponse>(
    `/api/ginis/official-board-list?${[
      filters.search ? `search=${filters.search}` : '',
      filters.pageSize ? `pageSize=${filters.pageSize.toString()}` : '',
      filters.page ? `page=${filters.page.toString()}` : '',
      filters.categoryId ? `categoryId=${filters.categoryId}` : '',
    ]
      .filter(Boolean)
      .join('&')}`,
  )
}
