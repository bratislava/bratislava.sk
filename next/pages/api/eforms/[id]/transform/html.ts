import forms, { EFormKey, EFormValue } from '@backend/forms'
import { withSentry } from '@sentry/nextjs'
import { forceString } from '@utils/utils'
import { transform } from '@utils/xslt'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST' || typeof req.body?.data !== 'string')
    return res.status(400).json({ message: 'Invalid method or missing "data" field on body' })

  let formSlug: EFormKey
  let eform: EFormValue
  try {
    formSlug = forceString(req.query.id) as any
    eform = forms[formSlug]
    // sanity check
    if (!eform) throw new Error(`Invalid form name - validateFormName returned: ${formSlug}`)
  } catch (error) {
    console.error(error)
    return res.status(400).json({ message: 'Invalid form name or url' })
  }

  const data = await transform(eform.htmlStylesheet, req.body.data)

  res.setHeader('Content-Type', 'text/html')
  return res.send(data)
}

export default withSentry(handler)
