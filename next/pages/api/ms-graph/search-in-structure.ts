import { MS_GRAPH_GROUP_ID } from '@backend/ms-graph/constants'
import { getMsalToken } from '@backend/ms-graph/getMsalToken'
import { MSGraphFilteredGroupUser } from '@backend/ms-graph/types'
import { forceString } from '@backend/ms-graph/utils'
import pick from 'lodash/pick'
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
  const { query } = req.query
  const sanitizedQuery = forceString(query).trim()

  if (!sanitizedQuery) {
    // 204 No Content
    res.status(204).json([])
    return
  }

  try {
    const { accessToken } = (await getMsalToken()) ?? {}

    if (!accessToken) {
      // TODO type
      // @ts-ignore
      res.status(500).json({ error: 'No access token' })

      return
    }

    const paramsToPick = ['id', 'displayName', 'mail', 'businessPhones', 'jobTitle', 'otherMails']
    const url = `https://graph.microsoft.com/v1.0/groups/${MS_GRAPH_GROUP_ID}/transitiveMembers?${[
      `$select=${paramsToPick.join(',')}`,
      `$search="displayName:${sanitizedQuery}" OR "jobTitle:${sanitizedQuery}" OR "mail:${sanitizedQuery}"`,
      // TODO add support for searching in businessPhones and mobilePhone
      // `$filter=businessPhones/any(p:startsWith(p, '+421-'))`,
    ].join('&')}`

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ConsistencyLevel: 'eventual',
      },
    })

    if (!response.ok) {
      console.log(response)

      return
    }

    const resultData = await response.json()

    const users: MSGraphFilteredGroupUser[] =
      resultData?.value?.map((user: any) => pick(user, paramsToPick)) ?? []

    res.status(200).json(users)
  } catch (error) {
    console.error(error)
    // TODO type
    // @ts-ignore
    res.status(500).json({ error: error.message })
  }
}

export default handler
