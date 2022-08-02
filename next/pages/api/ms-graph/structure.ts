import { withSentry } from '@sentry/nextjs'
import { forceString } from '@utils/utils'
import _ from 'lodash'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getGroupMembersByGroupId, getGroupMembersRecursive, getToken, getUsersByDepartment } from 'services/ms-graph'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { accessToken } = await getToken()
  // e2a318ff-fadb-4950-8ff0-a69660788e9d is id of 'Struktura pre web' group
  return res.json(await getGroupMembersRecursive(accessToken, 'e2a318ff-fadb-4950-8ff0-a69660788e9d'))
}

export default withSentry(handler)
