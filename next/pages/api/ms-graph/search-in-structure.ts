import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next' // TODO error types

import { getMsalToken } from '@/services/ms-graph/server/getMsalToken'
import { searchInOrgStructure } from '@/services/ms-graph/server/searchInOrgStructure'
import { MSGraphFilteredGroupUser } from '@/services/ms-graph/types'
// TODO error types

const handler = async (req: NextApiRequest, res: NextApiResponse<MSGraphFilteredGroupUser[]>) => {
  const { query: queryParam, pageSize: pageSizeParam } = req.query

  const query = typeof queryParam === 'string' ? queryParam : queryParam?.[0]
  const pageSize = typeof pageSizeParam === 'string' ? parseInt(pageSizeParam, 10) : undefined

  if (!query) {
    res.status(200).json([])
    return
  }

  try {
    const { accessToken } = (await getMsalToken()) ?? {}

    const users = await searchInOrgStructure(accessToken ?? '', query, pageSize)

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
