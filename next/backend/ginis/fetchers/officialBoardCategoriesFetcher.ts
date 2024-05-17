import axios from 'axios'

import { OfficialBoardCategoryListResponse } from '@/backend/ginis/types'

export const getOfficialBoardCategoriesQueryKey = () => ['OfficialBoardCategories']

export const officialBoardCategoriesFetcher = async () => {
  return axios.get<OfficialBoardCategoryListResponse>(`/api/ginis/official-board-categories`)
}
