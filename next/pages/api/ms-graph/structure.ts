import { MS_GRAPH_GROUP_ID } from '@backend/ms-graph/constants'
import { getMsalToken } from '@backend/ms-graph/getMsalToken'
import { getGroupMembersRecursive } from '@backend/ms-graph/ms-graph'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { accessToken } = (await getMsalToken()) ?? {}
  return res.json(await getGroupMembersRecursive(accessToken ?? '', MS_GRAPH_GROUP_ID, null))
}

export default handler
