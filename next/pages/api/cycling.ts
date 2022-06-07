import OpenDataClient from '../../utils/opendata'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await OpenDataClient.getCyclingData()
  return res.json(data)
}
