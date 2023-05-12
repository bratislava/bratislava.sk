import { getTootootHomepageEvents } from '@backend/services/tootoot'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const events = await getTootootHomepageEvents()
  return res.json(events)
}

export default handler
