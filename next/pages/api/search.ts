import { search } from '@utils/meili'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req
  const { index: queryIndex, q: queryKeyword } = query
  const index = Array.isArray(queryIndex) ? queryIndex[0] : queryIndex
  const keyword = Array.isArray(queryKeyword) ? queryKeyword[0] : queryKeyword
  let result = []
  try {
    const { hits } = await search({ index, keyword })
    result = hits
  } catch (e) {
    console.log(e)
  }

  return res.json(result)
}
