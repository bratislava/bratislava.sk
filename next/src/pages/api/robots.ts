import type { NextApiRequest, NextApiResponse } from 'next'

import { environment } from '@/src/environment'

// Copied from bratislava.sk https://github.com/bratislava/bratislava.sk/blob/master/next/pages/api/robots.ts
const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  if (environment.nextPublicDeployment === 'prod') {
    /* In production, disallow to crawl /api endpoints */
    res.send(
      `
        User-agent: *
        Disallow: /api/
      `,
    )

    return
  }

  /* If not in production, disallow to crawl the website completely */
  res.send(
    `
      User-Agent: *
      Disallow: /
    `,
  )
}

export default handler
