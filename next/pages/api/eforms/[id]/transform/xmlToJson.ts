import { EFormValue } from '@backend/forms'
import { getEform, removeNeedlessXmlTransformArraysRecursive } from '@backend/utils/forms'
import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import { parseStringPromise } from 'xml2js'
import { firstCharLowerCase } from 'xml2js/lib/processors'

// takes slovensko.sk-ready xml (perhaps serialized from previously filled in eFrom and loaded into browser by user) and converts back to json which we can work with
// TODO figure out if usable or if it should be rewritten

// TODO needs verification & tests
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

  // xml2js has issues when top level element isn't a single node
  const wrappedXmlString = `<wrapper>${req.body.data}</wrapper>`
  const obj = await parseStringPromise(wrappedXmlString, { tagNameProcessors: [firstCharLowerCase]})
  const body = obj.wrapper['e-form'] ? obj.wrapper['e-form'][0].body[0] : obj.wrapper
  removeNeedlessXmlTransformArraysRecursive(body, [], eform.schema)
  return res.json(body)
}

export default withSentry(handler)
