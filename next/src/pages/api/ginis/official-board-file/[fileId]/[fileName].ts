import type { NextApiRequest, NextApiResponse } from 'next'
import { pipeline } from 'stream/promises'

import { getOfficialBoardFileStream } from '@/src/services/ginis/server/getOfficialBoardFileStream'
import { base64Decode } from '@/src/utils/base64'

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

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { fileId: fileIdParam } = req.query
  const encodedFileId = typeof fileIdParam === 'string' ? fileIdParam : (fileIdParam?.[0] ?? '')

  const fileId = base64Decode(encodedFileId)

  if (!fileId) {
    res.status(400).json({ message: 'Missing fileId' })

    return
  }
  const fileIdRegex = /.*#\d+#.*/ // requires # followed by at least one digit followed by another #
  if (!fileIdRegex.test(fileId)) {
    console.log(
      `Invalid file ID for GINIS nacistSoubor. Encoded: ${encodedFileId} Decoded: ${fileId}`,
    )

    res.status(400).json({ message: 'Invalid fileId' })

    return
  }

  try {
    const fileStream = await getOfficialBoardFileStream(fileId)

    if (!fileStream) {
      res.status(404).json({ message: 'File not found' })

      return
    }

    // Set content type to pdf. It's not guaranteed, but we have been told it's always pdf by the admin.
    res.setHeader('Content-Type', 'application/pdf')
    // Use 'inline' to open the file in the browser (instead of 'attachment' that would download the file)
    // Do not specify filename, because it's already encoded in the URL. Specifying filename has a problem with encoding special characters.
    // See https://stackoverflow.com/questions/93551/how-to-encode-the-filename-parameter-of-content-disposition-header-in-http
    res.setHeader('Content-Disposition', 'inline')
    await pipeline(fileStream, res)
  } catch (error) {
    if (res.headersSent) {
      res.destroy(error instanceof Error ? error : new Error(String(error)))

      return
    }

    res.status(500).json(error)
  }
}

export default handler
