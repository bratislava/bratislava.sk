import type { NextApiRequest, NextApiResponse } from 'next'

import { officialBoardListDefaultFilters } from '@/services/ginis/fetchers/officialBoardListFetcher'
import { mockedParsedDocuments } from '@/services/ginis/mocks'
import { getOfficialBoardParsedList } from '@/services/ginis/server/getOfficialBoardParsedList'
import { OfficialBoardListResponse, ParsedOfficialBoardDocument } from '@/services/ginis/types'
import { shouldMockGinis } from '@/services/ginis/utils/shouldMockGinis'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<OfficialBoardListResponse>,
): Promise<void> => {
  const {
    search: searchParam,
    pageSize: pageSizeParam,
    page: pageParam,
    publicationState: publicationStateParam,
    categoryId: categoryIdParam,
  } = req.query

  // TODO parse query params in cleaner way
  const search =
    typeof searchParam === 'string'
      ? searchParam
      : searchParam?.[0] ?? officialBoardListDefaultFilters.search
  const pageSize =
    typeof pageSizeParam === 'string'
      ? parseInt(pageSizeParam, 10)
      : officialBoardListDefaultFilters.pageSize
  const page =
    typeof pageParam === 'string' ? parseInt(pageParam, 10) : officialBoardListDefaultFilters.page
  const publicationState =
    typeof publicationStateParam === 'string' ? publicationStateParam : publicationStateParam?.[0]
  const categoryId =
    typeof categoryIdParam === 'string' ? categoryIdParam : categoryIdParam?.[0] ?? ''

  let result: ParsedOfficialBoardDocument[] = []

  try {
    result = shouldMockGinis()
      ? mockedParsedDocuments
      : await getOfficialBoardParsedList({ searchQuery: search, publicationState, categoryId })
  } catch (error) {
    // TODO handle error
    // eslint-disable-next-line no-console
    console.log(error)
  }

  // Convert page and pageSize to zero-based index
  const start = (page - 1) * pageSize
  const end = start + pageSize

  return res.json({
    // TODO remove this hacky solution
    // ignoring negative pageSize to be able to return all results for old approach in OfficialBoardSection
    items: pageSize < 0 ? result : result.slice(start, end),
    totalItems: result.length,
  })
}

export default handler
