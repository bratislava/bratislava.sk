import { mockedParsedDocuments } from '@backend/ginis/mocks'
import { getParsedUDEDocumentsList } from '@backend/ginis/server/ginisOfficialBoard'
import { ParsedOfficialBoardDocument } from '@backend/ginis/types'
import { shouldMockGinis } from '@backend/ginis/utils'
import type { NextApiRequest, NextApiResponse } from 'next'

// returns the 3 newest documents - used for front page
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let latestOfficialBoard: ParsedOfficialBoardDocument[] = []
  latestOfficialBoard = shouldMockGinis()
    ? mockedParsedDocuments
    : await getParsedUDEDocumentsList()
  return res.json(latestOfficialBoard)
}

export default handler
