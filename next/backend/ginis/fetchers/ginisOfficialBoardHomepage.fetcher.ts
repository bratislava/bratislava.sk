import { ParsedOfficialBoardDocument } from '@backend/ginis/types'
import axios from 'axios'

const defaultLimit = 3

export const getGinisOfficialBoardHomepageQueryKey = (limit = defaultLimit) => [
  'ginisOfficialBoardHomepage',
  limit,
]

export const ginisOfficialBoardHomepageFetcher = async (limit = defaultLimit) => {
  const queryParams = new URLSearchParams({ limit: limit.toString() })

  return axios.get<ParsedOfficialBoardDocument[]>(
    `/api/ginis/official-board?${queryParams.toString()}`,
  )
}
