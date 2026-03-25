import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

import { environment } from '@/src/environment'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed', status: 405 })
  }

  try {
    const response = await axios.get(
      `https://ats.nalgoo.com/api/v3/organizations/${environment.nalgooApiKey}/jobs`,
    )

    return res.status(200).json(response.data)
  } catch (error) {
    console.error('Nalgoo API error:', error)

    return res.status(500).json({ message: error?.toString(), status: 500 })
  }
}
