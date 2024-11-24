import axios from 'axios'

import { MSGraphFilteredGroupUser } from '@/services/ms-graph/types'

export const getMsGraphSearchQueryKey = (search: string, pageSize: number) => [
  'Search',
  'msGraphSearch',
  search,
  pageSize,
]

export const msGraphSearchFetcher = async (searchQuery: string, pageSize: number) => {
  return axios.get<MSGraphFilteredGroupUser[]>(
    `/api/ms-graph/search-in-structure?query=${searchQuery}&pageSize=${pageSize}`,
  )
}
