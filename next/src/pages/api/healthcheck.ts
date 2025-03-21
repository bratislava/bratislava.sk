import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  return res.json({ status: 'ok' })
}

export default handler
