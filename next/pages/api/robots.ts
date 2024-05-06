import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  /* Disallow to crawl the website completely, if not in production */
  if (process.env.NEXT_PUBLIC_IS_STAGING === 'true') {
    return res.send(
      `
      User-Agent: *
      Disallow: /
      `,
    )
  }

  /* In production, disallow to crawl /api endpoints */
  return res.send(
    `
      User-Agent: *
      Disallow: /api/
      `,
  )
}

export default handler
