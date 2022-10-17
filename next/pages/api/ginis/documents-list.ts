import { withSentry } from '@sentry/nextjs'
import { ResponseGinisDocumentsList } from 'backend/dtos/ginis/api-data.dto'
import { getUDEDocumentsList } from 'backend/services/ginis'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { search } = req.query
  let parsedSearch: string | undefined
  let result: ResponseGinisDocumentsList[] = []
  if (search && typeof search === 'string') {
    parsedSearch = search
  }
  try {
    result = await getUDEDocumentsList(parsedSearch)
  } catch (error) {
    console.log(error)
  }

  return res.json(result)
}

export default withSentry(handler)
