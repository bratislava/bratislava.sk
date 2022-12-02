import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import { totp } from 'otplib'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { phone } = req.body
  if (!phone) {
    return res.status(400).json({ message: 'Bad Request' })
  }

  // TODO: check if user already exists

  const token = totp.generate(`${process.env.OTP_SECRET}.${phone}`)
  return res.status(200).json({ token })
}

export default withSentry(handler)
