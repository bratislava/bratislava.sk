import { getUDEDocumentFileJson } from '@backend/ginis/server/ginisOfficialBoardLodaFileJson'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { fileId: fileIdParam } = req.query
  const encodedFileId = typeof fileIdParam === 'string' ? fileIdParam : fileIdParam?.[0] ?? ''

  const fileId = Buffer.from(encodedFileId, 'base64').toString('utf8')

  console.log('handler: fileId', fileId)

  if (!fileId) {
    return res.status(400).json({ message: 'Missing fileId' })
  }

  try {
    const result = await getUDEDocumentFileJson(fileId)

    const loadedFile = result?.[0]

    if (!loadedFile) {
      return res.status(404).json({ message: 'File not found' })
    }

    const buffer = Buffer.from(loadedFile.Data, 'base64')
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename=${loadedFile.JmenoSouboru}`)
    return res.json(result)
  } catch (error) {
    console.log(error)
  }
}

export default handler
