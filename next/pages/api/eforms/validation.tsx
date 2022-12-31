import { withSentry } from '@sentry/nextjs'
import { ajvKeywords } from '@utils/forms'
import { AnySchemaObject } from 'ajv/dist/types'
import type { NextApiRequest, NextApiResponse } from 'next'

interface Body {
  parentSchema: AnySchemaObject
  schema: any
  value: any
  keyword: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { keyword, schema, value, parentSchema }: Body = req.body
  const keywordDefinition = ajvKeywords.find((k) => k.keyword === keyword)

  if (!keywordDefinition) {
    return res.status(400).json({ message: 'Keyword definition not found' })
  }

  const isValid = keywordDefinition.validate
    ? await keywordDefinition.validate(schema, value, parentSchema)
    : true
  return res.status(200).json({ isValid })
}

export default withSentry(handler)
