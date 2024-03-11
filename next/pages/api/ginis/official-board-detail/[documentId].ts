import { getOfficialBoardParsedDocument } from '@backend/ginis/server/getOfficialBoardParsedDocument'
import { base64Decode } from '@utils/base64'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { documentId: documentIdParam } = req.query
  const encodedDocumentId =
    typeof documentIdParam === 'string' ? documentIdParam : documentIdParam?.[0] ?? ''

  const documentId = base64Decode(encodedDocumentId)

  if (!documentId) {
    return res.status(400).json({ message: 'Missing documentId' })
  }

  try {
    const result = await getOfficialBoardParsedDocument(documentId)
    return res.json(result ?? null)
  } catch (error) {
    // TODO handle error
    console.log(error)
  }
}

export default handler
