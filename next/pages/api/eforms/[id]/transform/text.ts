import { EFormValue } from '@backend/forms'
import { getEform } from '@backend/utils/forms'
import { transform } from '@backend/utils/xslt'
import { withSentry } from '@sentry/nextjs'
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

  const data = await transform(eform.textStylesheet, req.body.data)

  res.setHeader('Content-Type', 'text/plain')
  return res.send(data)
}

export default withSentry(handler)
