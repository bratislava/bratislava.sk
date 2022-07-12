import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import robots from '../../../strapi/public/robots.txt'
const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  return res.send(robots)
}

export default withSentry(handler)
