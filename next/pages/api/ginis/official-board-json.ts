import { mockedParsedDocuments } from '@backend/ginis/mocks'
import { getParsedUDEDocumentsListJson } from '@backend/ginis/server/ginisOfficialBoardJson'
import { ParsedOfficialBoardDocument } from '@backend/ginis/types'
import { shouldMockGinis } from '@backend/ginis/utils'
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
      : await getParsedUDEDocumentsListJson(searchQuery)
  } catch (error) {
    console.log(error)
  }

  return res.json(result.slice(0, limit))
}

export default handler
