import { withSentry } from '@sentry/nextjs'
import { forceString } from '@utils/utils'
import { getToken, getUsersByDepartment } from 'backend/services/ms-graph'
import type { NextApiRequest, NextApiResponse } from 'next'

// not used, kept in case needed
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  return res.status(404).json({})
  const { department } = req.query
  const { accessToken } = await getToken()
  const { value } = await getUsersByDepartment({
    token: accessToken,
    department: forceString(department),
  })
  return res.json(value)
}

export default withSentry(handler)
