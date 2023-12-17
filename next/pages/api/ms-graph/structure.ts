import { MS_GRAPH_GROUP_ID } from '@backend/ms-graph/server/constants'
import { getGroupMembersRecursive } from '@backend/ms-graph/server/getGroupMembers'
import { getMsalToken } from '@backend/ms-graph/server/getMsalToken'
import { GetGroupMembersRecursiveResult } from '@backend/ms-graph/types'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<GetGroupMembersRecursiveResult>,
) => {
  try {
    const { accessToken } = (await getMsalToken()) ?? {}

    const orgStructure = await getGroupMembersRecursive(accessToken ?? '', MS_GRAPH_GROUP_ID, null)

    return res.status(200).json(orgStructure)
  } catch (error) {
    // TODO type
    // @ts-ignore
    return res.status(500).json({ error: error.message })
  }
}

export default handler
