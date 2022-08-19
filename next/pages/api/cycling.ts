import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

import OpenDataClient from '../../backend/utils/opendata'

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const data = await OpenDataClient.getCyclingData()
  return res.json(data)
}

export default withSentry(handler)
