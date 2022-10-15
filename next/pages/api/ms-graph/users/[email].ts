import { withSentry } from '@sentry/nextjs'
import { forceString } from '@utils/utils'
import { getToken, getUserByEmail } from 'backend/services/ms-graph'
import _ from 'lodash'
import type { NextApiRequest, NextApiResponse } from 'next'

// not used, kept in case needed
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  return res.status(404).json({})
  const { email } = req.query
  const { accessToken } = await getToken()
  const user = await getUserByEmail({ token: accessToken, email: forceString(email) })
  res.json(_.pick(user, ['businessPhones', 'displayName', 'jobTitle', 'mail', 'mobilePhone']))
}

export default withSentry(handler)
