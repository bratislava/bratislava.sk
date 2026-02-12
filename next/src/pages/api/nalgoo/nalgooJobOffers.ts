import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const response = await axios.get(
      `https://ats.nalgoo.com/api/v3/organizations/${process.env.NALGOO_API_KEY}/jobs`,
    )

    return res.status(200).json(response.data)
  } catch (error) {
    console.error('Nalgoo API error:', error)

    return res.status(500).json({ message: 'Failed to fetch job offers' })
  }
}
