import { EFormValue } from '@backend/forms'
import { getEform, xmlToJson } from '@backend/utils/forms'
import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

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

  const data = await xmlToJson(req.body.data, eform.schema)
  return res.json(data)
}

export default withSentry(handler)
