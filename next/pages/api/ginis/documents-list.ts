import { withSentry } from '@sentry/nextjs'
import {
  getParsedUDEDocumentsList,
  mockedParsedDocuments,
  ParsedOfficialBoardDocument,
  shouldMockGinis,
} from 'backend/services/ginis'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { search } = req.query
  let parsedSearch: string | undefined
  let result: ParsedOfficialBoardDocument[] = []
  if (search && typeof search === 'string') {
    parsedSearch = search
  }
  try {
    result = shouldMockGinis()
      ? mockedParsedDocuments
      : await getParsedUDEDocumentsList(parsedSearch)
  } catch (error) {
    console.log(error)
  }

  return res.json(result)
}

export default withSentry(handler)
