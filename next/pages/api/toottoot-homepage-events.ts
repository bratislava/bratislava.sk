import { getTootTootHomepageEvents } from '@backend/services/toottoot'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const events = await getTootTootHomepageEvents()
  return res.json(events)
}

export default handler
