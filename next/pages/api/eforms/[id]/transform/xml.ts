import { EFormValue } from '@backend/forms'
import { buildXmlRecursive, getEform } from '@backend/utils/forms'
import { withSentry } from '@sentry/nextjs'
import * as cheerio from 'cheerio'
import type { NextApiRequest, NextApiResponse } from 'next'

// takes json as returned by rjsf and converts to xml accepted by slovensko.sk
// TODO figure out if usable or if it should be rewritten

// TODO needs verification & tests
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

  const $ = cheerio.load(eform.xmlTemplate, { xmlMode: true, decodeEntities: false })
  buildXmlRecursive(['E-form', 'Body'], $, req.body.data)

  res.setHeader('Content-Type', 'text/xml')
  res.setHeader('Content-Disposition', 'attachment; filename=test.xml')
  res.send($.html())
  return res.end()
}

export default withSentry(handler)
