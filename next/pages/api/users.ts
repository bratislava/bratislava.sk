import { getToken } from '@utils/ms-graph'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { access_token } = await getToken()

  return res.json(access_token)
}
