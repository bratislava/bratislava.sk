import { withSentry } from '@sentry/nextjs'
import formidable, { PersistentFile } from 'formidable'
import { NextApiRequest, NextApiResponse } from 'next'

import minioClient, { bucketName, region } from '../../../backend/utils/minio-client'

export const config = {
  api: {
    bodyParser: false,
  },
}

interface ParsedFormidableFileData {
  files: {
    file: typeof PersistentFile
  }
}

interface UploadedFileInfo {
  size: number
  filepath: string
  newFilename: string
  mimetype: string
  mtime: string
  originalFilename: string
}

const parseFormidableFile = async (req: NextApiRequest): Promise<UploadedFileInfo> => {
  const rawData = await new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm({ keepExtensions: true })
    form.parse(req, (err, _, files) => {
      if (err) return reject(err)
      return resolve({ files })
    })
  })

  const data = rawData as ParsedFormidableFileData
  return  JSON.parse(JSON.stringify(data.files.file)) as UploadedFileInfo
}

const handleBucketCreation = async () => {
  const isBucketExisting = await minioClient.bucketExists(bucketName)
  if (!isBucketExisting) {
    await minioClient.makeBucket(bucketName, region)
      .then(() => console.log(`Bucket ${bucketName} created successfully in ${region}`))
  }
}


const handlePostRequest = async (req: NextApiRequest) => {
  const file = await parseFormidableFile(req)
  console.log("DATA:", file)
  await handleBucketCreation()
  await minioClient.fPutObject(bucketName, file.originalFilename, file.filepath)
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    await handlePostRequest(req)
      .then(response => res.status(200).json({ data: 'success', response }))
      .catch(error => {
        console.log(error)
        res.status(500).json({ error })
      })
    return res
  }
  return res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
}



export default withSentry(handler)
