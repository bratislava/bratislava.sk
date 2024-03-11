import { officialBoardListDefaultFilters } from '@backend/ginis/fetchers/officialBoardListFetcher'
import { mockedParsedDocuments } from '@backend/ginis/mocks'
import { getOfficialBoardParsedList } from '@backend/ginis/server/getOfficialBoardParsedList'
import { OfficialBoardListResponse, ParsedOfficialBoardDocument } from '@backend/ginis/types'
import { shouldMockGinis } from '@backend/ginis/utils/shouldMockGinis'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<OfficialBoardListResponse>,
): Promise<void> => {
  const {
    search: searchParam,
    pageSize: pageSizeParam,
    page: pageParam,
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
  const categoryId =
    typeof categoryIdParam === 'string' ? categoryIdParam : categoryIdParam?.[0] ?? ''

  let result: ParsedOfficialBoardDocument[] = []

  try {
    result = shouldMockGinis()
      ? mockedParsedDocuments
      : await getOfficialBoardParsedList(search, categoryId)
  } catch (error) {
    // TODO handle error
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
