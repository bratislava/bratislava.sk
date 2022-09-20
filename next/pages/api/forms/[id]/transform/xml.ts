import { withSentry } from '@sentry/nextjs'
import { buildXmlRecursive, validateFormName } from '@utils/forms'
import { forceString } from '@utils/utils'
import * as cheerio from 'cheerio'
import type { NextApiRequest, NextApiResponse } from 'next'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { cwd } from 'node:process'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST' || !req.body?.data)
    return res.status(400).json({ message: 'Invalid method or missing "data" field on body' })
  let fileBuffer: Buffer
  try {
    const formName = await validateFormName(req.query.id)
    if (!formName) throw new Error(`Invalid form name - validateFormName returned: ${formName}`)
    const filePath = resolve(cwd(), 'forms', forceString(req.query.id), 'template.xml')
    // TODO consider changing to streamed buffer
    fileBuffer = await readFile(filePath)
  } catch (e) {
    console.error(e)
    return res.status(400).json({ message: 'Invalid form name or url' })
  }
  const $ = cheerio.load(fileBuffer, { xmlMode: true })
  buildXmlRecursive(['E-form', 'Body'], $, req.body.data)

  // res.setHeader('Content-Type', 'application/pdf')
  // res.setHeader('Content-Disposition', 'attachment; filename=dummy.pdf')
  res.setHeader('Content-Type', 'text/xml')
  res.setHeader('Content-Disposition', 'attachment; filename=test.xml')
  res.send($.html())
  return res.end()
  // return res.json({})
}

export default withSentry(handler)
