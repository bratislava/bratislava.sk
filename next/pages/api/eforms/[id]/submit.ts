import { withSentry } from '@sentry/nextjs'
import { buildXmlRecursive, validateDataWithJsonSchema, validateFormName, validateXmlWithXsdSchema } from '@utils/forms'
import { forceString } from '@utils/utils'
import * as cheerio from 'cheerio'
import forms, { EFormKey, EFormValue } from 'forms'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('-------------------')
  console.log('Validating form: ', req.query.id)
  console.log(req.body)
  if (req.method !== 'POST') return res.status(400).json({ message: 'Invalid method or missing "data" field on body' })

  let formSlug: EFormKey | undefined
  let eform: EFormValue | undefined
  try {
    formSlug = forceString(req.query.id) as EFormKey
    eform = forms[formSlug]
    if (!eform) return { notFound: true }
  } catch (e) {
    console.error(e)
    return { notFound: true }
  }

  const errors = validateDataWithJsonSchema(req.body, eform.schema)

  // TODO convert to xml && validate it against xsd schema around here - if it does not pass, return errors

  if (errors) return res.status(400).json({ message: `Data did not pass validation`, errors })

  // TODO when no errors, send the xml to slovensko.sk BE

  return res.status(200).json({})
}

export default withSentry(handler)
