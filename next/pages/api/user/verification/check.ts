import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import { totp } from 'otplib'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { token, phone } = req.body
  if (!token || !phone) {
    return res.status(400).json({ message: 'Bad Request' })
  }

  const isValid = totp.check(token, `${process.env.OTP_SECRET}.${phone}`)
  return res.status(200).json({ isValid })
}

export default withSentry(handler)
