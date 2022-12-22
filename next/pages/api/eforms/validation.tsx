import { withSentry } from '@sentry/nextjs'
import { ajvKeywords } from '@utils/forms'
import { AnySchemaObject, DataValidationCxt } from 'ajv/dist/types'
import type { NextApiRequest, NextApiResponse } from 'next'

interface Body {
  parentSchema: AnySchemaObject
  schema: any
  value: any
  keyword: string
  dataCxt: DataValidationCxt
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { keyword, schema, value, parentSchema, dataCxt }: Body = req.body
  const keywordDefinition = ajvKeywords.find((k) => k.keyword === keyword)
  if (!keywordDefinition) {
    return res.status(400).json({ message: 'Keyword definition not found' })
  }

  const isValid = await keywordDefinition.validate(schema, value, parentSchema, dataCxt)
  return res.status(200).json({ isValid })
}

export default withSentry(handler)
