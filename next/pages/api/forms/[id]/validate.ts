import { withSentry } from '@sentry/nextjs'
import { buildXmlRecursive, validateDataWithJsonSchema, validateFormName, validateXmlWithXsdSchema } from '@utils/forms'
import { forceString } from '@utils/utils'
import * as cheerio from 'cheerio'
import type { NextApiRequest, NextApiResponse } from 'next'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { cwd } from 'node:process'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST' || !req.body?.data)
    return res.status(400).json({ message: 'Invalid method or missing "data" field on body' })
  // TODO wrap in function, import in submit
  const formName = await validateFormName(req.query.id)
  if (!formName) return res.status(400).json({ message: `Invalid form name - validateFormName returned: ${formName}` })

  const xmlTemplatePath = resolve(cwd(), 'forms', formName, 'template.xml')
  const jsonSchemaPath = resolve(cwd(), 'forms', formName, 'schema.json')
  const xsdSchemaPath = resolve(cwd(), 'forms', formName, 'schema.xsd')
  const xmlTemplateBuffer = await readFile(xmlTemplatePath)
  // TODO there may be ways to make this faster
  const jsonSchemaString = await readFile(jsonSchemaPath, 'utf8')

  const $ = cheerio.load(xmlTemplateBuffer, { xmlMode: true })
  buildXmlRecursive(['E-form', 'Body'], $, req.body.data)

  // TODO verify we can pass jsonschema as string
  const errors =
    validateDataWithJsonSchema(req.body?.data, jsonSchemaString) || validateXmlWithXsdSchema($.html(), xsdSchemaPath)

  if (errors) return res.status(400).json({ message: `Data did not pass validation`, errors })
  return res.status(200).json({})
}

export default withSentry(handler)
