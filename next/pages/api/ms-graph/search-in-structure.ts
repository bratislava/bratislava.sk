import { getMsalToken } from '@backend/ms-graph/server/getMsalToken'
import { searchInOrgStructure } from '@backend/ms-graph/server/searchInOrgStructure'
import { MSGraphFilteredGroupUser } from '@backend/ms-graph/types'
import type { NextApiRequest, NextApiResponse } from 'next'

// TODO error types

/**
 * Docs:
 * https://learn.microsoft.com/en-us/graph/api/group-list-transitivemembers?view=graph-rest-1.0&tabs=http
 * https://learn.microsoft.com/en-us/graph/api/resources/user?view=graph-rest-1.0
 * https://learn.microsoft.com/en-us/graph/search-query-parameter?tabs=http#using-search-on-directory-object-collections
 *
 * @param req
 * @param res
 */
const handler = async (req: NextApiRequest, res: NextApiResponse<MSGraphFilteredGroupUser[]>) => {
  const { query: queryParam } = req.query

  const query = typeof queryParam === 'string' ? queryParam.trim() : null

  if (!query) {
    res.status(200).json([])
    return
  }

  try {
    const { accessToken } = (await getMsalToken()) ?? {}

    const users = await searchInOrgStructure(query, accessToken ?? '')

    res.status(200).json(users)
  } catch (error) {
    // TODO type
    // @ts-ignore
    res.status(500).json({ error: error.message })
  }
}

export default handler
