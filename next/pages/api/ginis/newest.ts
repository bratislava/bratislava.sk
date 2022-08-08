import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import {
  getParsedUDEDocumentsList,
  mockedParsedDocuments,
  ParsedOfficialBoardDocument,
  shouldMockGinis,
} from 'services/ginis'

// returns the 3 newest documents - used for front page
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let latestOfficialBoard: ParsedOfficialBoardDocument[] = []
  latestOfficialBoard = shouldMockGinis() ? mockedParsedDocuments : await getParsedUDEDocumentsList(undefined, 3)
  return res.json(latestOfficialBoard)
}

export default withSentry(handler)
