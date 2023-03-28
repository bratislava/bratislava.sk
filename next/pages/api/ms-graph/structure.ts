// @ts-strict-ignore
import { getGroupMembersRecursive, getToken } from 'backend/services/ms-graph'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { accessToken } = await getToken()
  // e2a318ff-fadb-4950-8ff0-a69660788e9d is id of 'Struktura pre web' group
  return res.json(
    await getGroupMembersRecursive(accessToken, 'e2a318ff-fadb-4950-8ff0-a69660788e9d', null),
  )
}

export default handler
