/* eslint-disable no-console */
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  error?: string
}

const ECOMAIL_ADD_SUBSCRIBER_URL = 'https://api2.ecomailapp.cz/lists/47/subscribe'

/**
 * Based on City library: https://github.com/bratislava/mestskakniznica.sk/blob/master/next/pages/api/subscribe.ts
 */

const Subscribe = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  const { email } = req.body

  if (!email) {
    res.status(400).json({ error: 'Newsletter subscription failed: Email is required' })

    return
  }

  try {
    // TODO better error information, maybe assert all env vars globally
    if (!process.env.STARZ_ECOMAIL_API_KEY)
      throw new Error('Missing environment variable STARZ_ECOMAIL_API_KEY')

    await axios.post(
      ECOMAIL_ADD_SUBSCRIBER_URL,
      {
        subscriber_data: {
          email,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          key: process.env.STARZ_ECOMAIL_API_KEY,
        },
      },
    )

    // If the email is already subscribed, ecomail sends a successful response, so we don't handle this case differently

    res.status(201).json({ error: '' })
  } catch (error: any) {
    console.log('Newsletter subscription error:')
    console.log(error.message ?? JSON.stringify(error))

    res.status(500).json({ error: error.message || error })
  }
}

export default Subscribe
