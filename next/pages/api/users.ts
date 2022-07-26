import { withSentry } from '@sentry/nextjs'
import { getToken, getUsers } from '@utils/ms-graph'
import type { NextApiRequest, NextApiResponse } from 'next'

// TODO consider nicer params instead of forwarding exact query to Azure in getUsers ?
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { url } = req
  const { accessToken } = await getToken()
  const { value } = await getUsers({ token: accessToken, url })
  return res.json(value)
}

export default withSentry(handler)
