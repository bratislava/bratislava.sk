import { fetchGooutEvents } from '../../utils/goout'
import type { NextApiRequest, NextApiResponse } from 'next'
import { withSentry } from '@sentry/nextjs'

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const events = await fetchGooutEvents()
  return res.json(events)
}

export default withSentry(handler)
