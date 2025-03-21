import type { NextApiRequest, NextApiResponse } from 'next'

import { MS_GRAPH_GROUP_ID } from '@/src/services/ms-graph/server/constants'
import { getGroupMembersRecursive } from '@/src/services/ms-graph/server/getGroupMembers'
import { getMsalToken } from '@/src/services/ms-graph/server/getMsalToken'
import { GetGroupMembersRecursiveResult } from '@/src/services/ms-graph/types'

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
