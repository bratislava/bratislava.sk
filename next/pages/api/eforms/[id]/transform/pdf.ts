import { EFormValue } from '@backend/forms'
import { getEform } from '@backend/utils/forms'
import { withSentry } from '@sentry/nextjs'
import * as Sentry from '@sentry/react'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST' || typeof req.body?.data !== 'string')
    return res.status(400).json({ message: 'Invalid method or missing "data" field on body' })

  let eform: EFormValue
  try {
    eform = getEform(req.query.id)
  } catch (error) {
    console.error(error)
    return res.status(400).json({ message: 'Invalid form name or url' })
  }

  try {
    const response = await fetch(`${process.env.FOP_URL}/fop`, {
      method: 'POST',
      body: JSON.stringify({ data: req.body.data, xslt: eform.pdfStylesheet }),
    })
    if (response.ok) {
      const stream = response.body as unknown as NodeJS.ReadableStream
      stream.pipe(res)
    } else {
      const error = await response.json()
      return res.status(response.status).json(error)
    }
  } catch (error) {
    console.error(error)
    Sentry.captureException(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export default withSentry(handler)
