import OpenDataClient from 'backend/utils/opendata'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const data = await OpenDataClient.getCyclingData()
  return res.json(data)
}

export default handler
