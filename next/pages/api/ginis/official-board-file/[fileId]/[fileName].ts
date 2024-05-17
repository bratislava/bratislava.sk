import { getOfficialBoardFileBase64Encoded } from '@backend/ginis/server/getOfficialBoardFileBase64Encoded'
import type { NextApiRequest, NextApiResponse } from 'next'

import { base64Decode } from '@/utils/base64'

/**
 * This handler serves files from official board (Ginis UDE = Úřední deska = Úradná tabuľa) as pdf.
 * The api url is publicly visible, and therefore it is in slovak language.
 *
 * Query params:
 * - fileId: base64 encoded file id
 * - fileName: not used specifically, but it is used automatically as filename when downloading the file
 *   (the last part of url is used as filename by default if none is specified in headers)
 *
 * @param req
 * @param res
 */
const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { fileId: fileIdParam } = req.query
  const encodedFileId = typeof fileIdParam === 'string' ? fileIdParam : fileIdParam?.[0] ?? ''

  const fileId = base64Decode(encodedFileId)

  if (!fileId) {
    return res.status(400).json({ message: 'Missing fileId' })
  }

  try {
    const result = await getOfficialBoardFileBase64Encoded(fileId)

    if (!result?.length) {
      return res.status(404).json({ message: 'File not found' })
    }

    // Result should contain only one item
    const buffer = Buffer.from(result[0].Data, 'base64')

    // Set content type to pdf. It's not guaranteed, but we have been told it's always pdf by the admin.
    res.setHeader('Content-Type', 'application/pdf')
    // Use 'inline' to open the file in the browser (instead of 'attachment' that would download the file)
    // Do not specify filename, because it's already encoded in the URL. Specifying filename has a problem with encoding special characters.
    // See https://stackoverflow.com/questions/93551/how-to-encode-the-filename-parameter-of-content-disposition-header-in-http
    res.setHeader('Content-Disposition', 'inline')

    return res.send(buffer)
  } catch (error) {
    res.status(500).json(error)
  }
}

export default handler
