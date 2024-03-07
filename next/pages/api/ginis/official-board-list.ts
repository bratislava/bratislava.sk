import { mockedParsedDocuments } from '@backend/ginis/mocks'
import { getOfficialBoardParsedList } from '@backend/ginis/server/getOfficialBoardParsedList'
import { ParsedOfficialBoardDocument } from '@backend/ginis/types'
import { shouldMockGinis } from '@backend/ginis/utils/shouldMockGinis'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { searchQuery: searchQueryParam, limit: limitParam } = req.query
  const searchQuery =
    typeof searchQueryParam === 'string' ? searchQueryParam : searchQueryParam?.[0] ?? ''
  const limit = typeof limitParam === 'string' ? parseInt(limitParam, 10) : undefined

  let result: ParsedOfficialBoardDocument[] = []

  try {
    result = shouldMockGinis()
      ? mockedParsedDocuments
      : await getOfficialBoardParsedList(searchQuery)
  } catch (error) {
    // TODO handle error
    console.log(error)
  }

  // If limit is undefined, slice returns all results
  return res.json(result.slice(0, limit))
}

export default handler
