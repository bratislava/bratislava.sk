import { withSentry } from '@sentry/nextjs'
import { removeNeedlessXmlTransformArraysRecursive } from '@backend/utils/forms'
import { forceString } from '@utils/utils'
import type { NextApiRequest, NextApiResponse } from 'next'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { cwd } from 'node:process'
import { parseStringPromise } from 'xml2js'

// takes slovensko.sk-ready xml (perhaps serialized from previously filled in eFrom and loaded into browser by user) and converts back to json which we can work with
// TODO figure out if usable or if it should be rewritten

// TODO needs verification & tests
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST' || typeof req.body?.data !== 'string')
    return res.status(400).json({ message: 'Invalid method or missing "data" field on body' })
  let jsonSchema
  try {
    // TODO change how to look up for the schema
    const formName = req.query.id
    if (!formName) throw new Error(`Invalid form name - validateFormName returned: ${formName}`)
    const filePath = resolve(cwd(), 'forms', forceString(req.query.id), 'schema.json')
    jsonSchema = JSON.parse(await readFile(filePath, 'utf8'))
    // TODO validate shcema is valid ?
  } catch (error) {
    console.error(error)
    return res.status(400).json({ message: 'Invalid form name or url' })
  }
  // xml2js has issues when top level element isn't a single node
  const wrappedXmlString = `<wrapper>${req.body.data}</wrapper>`
  const obj = (await parseStringPromise(wrappedXmlString))['wrapper']
  removeNeedlessXmlTransformArraysRecursive(obj, [], jsonSchema)
  return res.json(obj)
}

export default withSentry(handler)
