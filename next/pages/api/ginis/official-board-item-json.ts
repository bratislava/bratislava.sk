import { getParsedUDEDocumentDetailJson } from '@backend/ginis/server/ginisOfficialBoardDocumentDetailJson'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { documentId: documentIdParam } = req.query
  const encodedDocumentId =
    typeof documentIdParam === 'string' ? documentIdParam : documentIdParam?.[0] ?? ''

  const documentId = Buffer.from(encodedDocumentId, 'base64').toString('utf8')

  if (!documentId) {
    return res.status(400).json({ message: 'Missing documentId' })
  }

  try {
    const result = await getParsedUDEDocumentDetailJson(documentId)
    return res.json(result)
  } catch (error) {
    console.log(error)
  }
}

export default handler
