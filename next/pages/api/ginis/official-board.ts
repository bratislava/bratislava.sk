import { mockedParsedDocuments } from '@backend/ginis/mocks'
import { getParsedUDEDocumentsList } from '@backend/ginis/server/ginisOfficialBoard'
import { ParsedOfficialBoardDocument } from '@backend/ginis/types'
import { forceString, shouldMockGinis } from '@backend/ginis/utils'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { query: queryParam, limit: limitParam } = req.query
  const query = forceString(queryParam)
  const limit = typeof limitParam === 'string' ? parseInt(limitParam, 10) : undefined

  let result: ParsedOfficialBoardDocument[] = []

  try {
    result = shouldMockGinis() ? mockedParsedDocuments : await getParsedUDEDocumentsList(query)
  } catch (error) {
    console.log(error)
  }

  return res.json(result.slice(0, limit ?? -1))
}

export default handler
