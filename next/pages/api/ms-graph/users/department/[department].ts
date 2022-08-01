import { withSentry } from '@sentry/nextjs'
import { getToken, getUsersByDepartment } from 'services/ms-graph'
import type { NextApiRequest, NextApiResponse } from 'next'
import { forceString } from '@utils/utils'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { department } = req.query
  const { accessToken } = await getToken()
  const { value } = await getUsersByDepartment({ token: accessToken, department: forceString(department) })
  return res.json(value)
}

export default withSentry(handler)
