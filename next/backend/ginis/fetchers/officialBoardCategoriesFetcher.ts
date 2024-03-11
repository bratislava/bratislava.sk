import { OfficialBoardCategoryListResponse } from '@backend/ginis/types'
import axios from 'axios'

export const getOfficialBoardCategoriesQueryKey = () => ['OfficialBoardCategories']

export const officialBoardCategoriesFetcher = async () => {
  return axios.get<OfficialBoardCategoryListResponse>(`/api/ginis/official-board-categories`)
}
