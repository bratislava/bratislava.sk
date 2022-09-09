import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  if (process.env.NEXT_PUBLIC_IS_STAGING === 'true') {
    return res.send(
      `
      User-Agent: *
      Disallow: /
      `
    )
  } 
    return res.send('')
  
}

export default withSentry(handler)
