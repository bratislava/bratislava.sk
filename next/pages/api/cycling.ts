import OpenDataClient from '../../utils/opendata'
import type { NextApiRequest, NextApiResponse } from 'next'
import { withSentry } from '@sentry/nextjs'

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const data = await OpenDataClient.getCyclingData()
  return res.json(data)
}

export default withSentry(handler)
