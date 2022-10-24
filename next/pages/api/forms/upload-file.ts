import { withSentry } from '@sentry/nextjs'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST')
    return res.status(400).json({ message: 'Invalid method or missing "data" field on body' })

  return res.status(200).json({})
}

export default withSentry(handler)
