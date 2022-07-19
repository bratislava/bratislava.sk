import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'
const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  if (process.env.IS_STAGING === 'true') {
    return res.send(
      `
      User-Agent: *
      Disallow: /
      `
    )
  } else {
    return res.send('')
  }
}

export default withSentry(handler)
