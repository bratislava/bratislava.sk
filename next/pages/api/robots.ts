import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import robots from '../../../strapi/public/robots.txt'
const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Content-Type', 'text/plain')
  return res.json(robots)
}

export default withSentry(handler)
