import { getMsalToken } from '@backend/ms-graph/server/getMsalToken'
import { searchInOrgStructure } from '@backend/ms-graph/server/searchInOrgStructure'
import { MSGraphFilteredGroupUser } from '@backend/ms-graph/types'
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
// TODO error types

const handler = async (req: NextApiRequest, res: NextApiResponse<MSGraphFilteredGroupUser[]>) => {
  const { query: queryParam } = req.query

  const query = typeof queryParam === 'string' ? queryParam : queryParam[0]

  if (!query) {
    res.status(200).json([])
    return
  }

  try {
    const { accessToken } = (await getMsalToken()) ?? {}

    const users = await searchInOrgStructure(query, accessToken ?? '')

    res.status(200).json(users)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // @ts-ignore
      res.status(parseInt(error.code, 10)).json({ error: error.message })
    }
    // TODO type
    // @ts-ignore
    res.status(500).json({ error: error.message })
  }
}

export default handler
