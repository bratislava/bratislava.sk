import { withSentry } from '@sentry/nextjs'
import { validateFormName } from '@utils/forms'
import { forceString } from '@utils/utils'
import { transform } from '@utils/xslt'
import type { NextApiRequest, NextApiResponse } from 'next'
import { resolve } from 'node:path'
import { cwd } from 'node:process'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST' || typeof req.body?.data !== 'string')
    return res.status(400).json({ message: 'Invalid method or missing "data" field on body' })

  try {
    const formName = await validateFormName(req.query.id)
    if (!formName) throw new Error(`Invalid form name - validateFormName returned: ${formName}`)
  } catch (e) {
    console.error(e)
    return res.status(400).json({ message: 'Invalid form name or url' })
  }

  const xsltPath = resolve(cwd(), 'forms', forceString(req.query.id), 'Content', 'form.sb.sef.json')
  const data = await transform(xsltPath, req.body.data)

  res.setHeader('Content-Type', 'text/plain')
  return res.send(data)
}

export default withSentry(handler)
