import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next' // TODO error types

import { getMsalToken } from '@/src/services/ms-graph/server/getMsalToken'
import { searchInOrgStructure } from '@/src/services/ms-graph/server/searchInOrgStructure'
import { MSGraphFilteredGroupUser } from '@/src/services/ms-graph/types'
// TODO error types

const handler = async (req: NextApiRequest, res: NextApiResponse<MSGraphFilteredGroupUser[]>) => {
  const { query: queryParam } = req.query

  const query = typeof queryParam === 'string' ? queryParam : queryParam?.[0]

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
      // @ts-expect-error - TODO type
      res.status(parseInt(error.code, 10)).json({ error: error.message })
    }
    // @ts-expect-error - TODO type
    res.status(500).json({ error: error.message })
  }
}

export default handler
