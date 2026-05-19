/* eslint-disable no-console */
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

/**
 * Ecomail API: https://docs.ecomail.cz/api-reference/lists/subscribe
 */

const SUBSCRIBER_LIST_ID = 50
const ECOMAIL_ADD_SUBSCRIBER_URL = `https://api2.ecomailapp.cz/lists/${SUBSCRIBER_LIST_ID}/subscribe`

/**
 * Based on City library:
 * https://github.com/bratislava/mestskakniznica.sk/blob/master/next/pages/api/subscribe.ts
 */

const Subscribe = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, firstName, lastName } = req.body

  console.log(JSON.stringify(req.body))

  if (!email) {
    res.status(400).json({ error: 'Newsletter subscription failed: Email is required' })

    return
  }

  try {
    if (!process.env.STARZ_ECOMAIL_API_KEY)
      throw new Error('Missing environment variable ECOMAIL_API_KEY')

    await axios.post(
      ECOMAIL_ADD_SUBSCRIBER_URL,
      {
        subscriber_data: {
          email,
          name: firstName,
          surname: lastName,
        },
        update_existing: true,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          key: process.env.STARZ_ECOMAIL_API_KEY,
        },
      },
    )

    res.status(201).json({ error: '' })
  } catch (error) {
    const message = error instanceof Error ? error.message : JSON.stringify(error)
    console.log('Newsletter subscription error: ', message)

    res.status(500).json({ error: message })
  }
}

export default Subscribe
