import { EFormValue } from '@backend/forms'
import {
  getEform,
  loadAndBuildXml,
  validateDataWithJsonSchema,
  validateDataWithXsd,
} from '@backend/utils/forms'
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

  let errors = []
  errors = await validateDataWithJsonSchema(req.body.data, eform.schema)
  if (errors.length > 0)
    return res.status(400).json({ message: `Data did not pass JSON validation`, errors })

  const xml = loadAndBuildXml(eform.xmlTemplate, req.body.data, eform.schema)
  errors = validateDataWithXsd(xml, eform.xsd)
  if (errors.length > 0)
    return res.status(400).json({ message: `Data did not pass XSD validation`, errors })

  res.setHeader('Content-Type', 'text/xml')
  res.setHeader('Content-Disposition', 'attachment; filename=test.xml')
  res.send(xml)
  return res.end()
}

export default withSentry(handler)
