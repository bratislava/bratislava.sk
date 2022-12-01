import { EFormValue } from '@backend/forms'
import { getEform, loadAndBuildXml, validateDataWithJsonSchema, validateDataWithXsd } from '@backend/utils/forms'
import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('-------------------')
  console.log('Validating form:', req.query.id)
  console.log(req.body)
  if (req.method !== 'POST') return res.status(400).json({ message: 'Invalid method or missing "data" field on body' })

  let eform: EFormValue
  try {
    eform = getEform(req.query.id)
  } catch (error) {
    console.error(error)
    return res.status(400).json({ message: 'Invalid form name or url' })
  }

  let errors = []
  errors = validateDataWithJsonSchema(req.body, eform.schema)
  if (errors.length > 0) return res.status(400).json({ message: `Data did not pass JSON validation`, errors })

  const xml = loadAndBuildXml(eform.xmlTemplate, req.body, eform.schema)
  errors = validateDataWithXsd(xml, eform.xsd)
  if (errors.length > 0) return res.status(400).json({ message: `Data did not pass XSD validation`, errors })

  // TODO when no errors, send the xml to slovensko.sk BE

  return res.status(200).json({})
}

export default withSentry(handler)
