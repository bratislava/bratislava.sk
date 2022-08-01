import { forceString } from '@utils/utils'
import { withSentry } from '@sentry/nextjs'
import { getToken, getUserByEmail } from 'services/ms-graph'
import type { NextApiRequest, NextApiResponse } from 'next'
import _ from 'lodash'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.query
  const { accessToken } = await getToken()
  const user = await getUserByEmail({ token: accessToken, email: forceString(email) })
  res.json(_.pick(user, ['businessPhones', 'displayName', 'jobTitle', 'mail', 'mobilePhone']))
}

export default withSentry(handler)
