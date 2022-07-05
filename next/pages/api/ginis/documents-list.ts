import type { NextApiRequest, NextApiResponse } from 'next'
import { ResponseGinisDocumentsList } from 'dtos/ginis/api-data.dto'
import { getUDEDocumentsList } from 'services/ginis'

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { search } = req.query
  let parsedSearch: string | undefined
  let result: ResponseGinisDocumentsList[] = []
  if (search && typeof search === 'string') {
    parsedSearch = search
  }
  try {
    result = await getUDEDocumentsList(parsedSearch)
  } catch (e) {
    console.log(e)
  }

  return res.json(result)
}
