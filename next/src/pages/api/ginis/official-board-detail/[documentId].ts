import type { NextApiRequest, NextApiResponse } from 'next'

import { getOfficialBoardParsedDocument } from '@/src/services/ginis/server/getOfficialBoardParsedDocument'
import { base64Decode } from '@/src/utils/base64'

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { documentId: documentIdParam } = req.query
  const encodedDocumentId =
    typeof documentIdParam === 'string' ? documentIdParam : documentIdParam?.[0] ?? ''

  const documentId = base64Decode(encodedDocumentId)

  if (!documentId) {
    return res.status(400).json({ message: 'Missing documentId' })
  }

  try {
    return res.json(await getOfficialBoardParsedDocument(documentId))
  } catch (error) {
    // TODO handle error
    // eslint-disable-next-line no-console
    console.log(error)
  }
}

export default handler
