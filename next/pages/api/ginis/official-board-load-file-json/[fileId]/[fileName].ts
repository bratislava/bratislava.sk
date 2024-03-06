import { getUDEDocumentFileJson } from '@backend/ginis/server/ginisOfficialBoardLoadFileJson'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { fileId: fileIdParam } = req.query
  const encodedFileId = typeof fileIdParam === 'string' ? fileIdParam : fileIdParam?.[0] ?? ''

  const fileId = Buffer.from(encodedFileId, 'base64').toString('utf8')

  if (!fileId) {
    return res.status(400).json({ message: 'Missing fileId' })
  }

  try {
    const result = await getUDEDocumentFileJson(fileId)

    if (!result?.length) {
      return res.status(404).json({ message: 'File not found' })
    }

    // Result should contain only one item
    const buffer = Buffer.from(result[0].Data, 'base64')

    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', 'inline')

    return res.send(buffer)
  } catch (error) {
    res.status(500).json(error)
  }
}

export default handler
