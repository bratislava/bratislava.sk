import { fetchGooutEvents } from '../../utils/goout'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const events = await fetchGooutEvents()
  return res.json(events)
}
