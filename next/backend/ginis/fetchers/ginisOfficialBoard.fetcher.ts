import { ParsedOfficialBoardDocument } from '@backend/ginis/types'
import axios from 'axios'

export const getGinisOfficialBoardQueryKey = (search: string) => ['ginisOfficialBoard', search]

export const ginisOfficialBoardFetcher = async (searchQuery: string) => {
  const queryParams = new URLSearchParams({ query: searchQuery })

  return axios.get<ParsedOfficialBoardDocument[]>(
    `/api/ginis/official-board?${queryParams.toString()}`,
  )
}
