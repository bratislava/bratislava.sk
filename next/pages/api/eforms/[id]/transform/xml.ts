import { EFormValue } from '@backend/forms'
import { getEform, loadAndBuildXml } from '@backend/utils/forms'
import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST' || !req.body?.data)
    return res.status(400).json({ message: 'Invalid method or missing "data" field on body' })

  let eform: EFormValue
  try {
    eform = getEform(req.query.id)
  } catch (error) {
    console.error(error)
    return res.status(400).json({ message: 'Invalid form name or url' })
  }

  const xml = loadAndBuildXml(eform.xmlTemplate, req.body.data, eform.schema)
  res.setHeader('Content-Type', 'text/xml')
  res.setHeader('Content-Disposition', 'attachment; filename=test.xml')
  res.send(xml)
  return res.end()
}

export default withSentry(handler)
