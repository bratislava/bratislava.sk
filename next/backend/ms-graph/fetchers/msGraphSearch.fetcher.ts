import axios from 'axios'

import { MSGraphFilteredGroupUser } from '@/backend/ms-graph/types'

export const getMsGraphSearchQueryKey = (search: string) => ['Search', 'msGraphSearch', search]

export const msGraphSearchFetcher = async (searchQuery: string) => {
  return axios.get<MSGraphFilteredGroupUser[]>(
    `/api/ms-graph/search-in-structure?query=${searchQuery}`,
  )
}
