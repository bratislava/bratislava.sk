import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

import { fetchGooutEvents } from '../../utils/goout'

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const events = await fetchGooutEvents()
  return res.json(events)
}

export default withSentry(handler)
