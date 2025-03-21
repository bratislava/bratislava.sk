import type { NextApiRequest, NextApiResponse } from 'next'

// Copied from bratislava.sk https://github.com/bratislava/bratislava.sk/blob/master/next/pages/api/robots.ts
const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  if (process.env.NEXT_PUBLIC_DEPLOYMENT === 'prod') {
    /* In production, disallow to crawl /api endpoints */
    return res.send(
      `
        User-agent: *
        Disallow: /api/
      `,
    )
  }

  /* If not in production, disallow to crawl the website completely */
  return res.send(
    `
      User-Agent: *
      Disallow: /
    `,
  )
}

export default handler
