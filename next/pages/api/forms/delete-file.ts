import { withSentry } from '@sentry/nextjs'
import { NextApiRequest, NextApiResponse } from 'next'

import minioClient, { bucketName } from '../../../backend/utils/minio-client'

const handleDeleteRequest = async (req: NextApiRequest) => {
  const isBucketExisting = await minioClient.bucketExists(bucketName)
  if (!isBucketExisting) throw new Error("S3 Bucket does not exists")
  console.log("TU SOM")
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'DELETE') {
    await handleDeleteRequest(req)
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
