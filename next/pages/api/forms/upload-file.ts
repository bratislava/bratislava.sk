import { withSentry } from '@sentry/nextjs'
import formidable, { PersistentFile } from 'formidable'
import { NextApiRequest, NextApiResponse } from 'next'

import minioClient from '../../../backend/utils/minio-client'

interface ParsedFormidableFileData {
  files: {
    file: typeof PersistentFile
  }
}

const parseFormidableFile = async (req: NextApiRequest) => {
  const rawData = await new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm({ keepExtensions: true })
    form.parse(req, (err, _, files) => {
      if (err) return reject(err)
      return resolve({ files })
    })
  })

  const data = rawData as ParsedFormidableFileData
  return JSON.parse(JSON.stringify(data.files.file))
}

const handlePostRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const file = await parseFormidableFile(req)
  console.log('DATA:', file)
  const isBucketExisting = await minioClient.bucketExists("1st").catch(error => console.log(error))
  console.log('IS BUCKET EXISTING:', isBucketExisting)
}

export const config = {
  api: {
    bodyParser: false,
  },
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    await handlePostRequest(req, res)
    return res.status(200).json({ data: 'success' });
  }
  return res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
}



export default withSentry(handler)
