import { withSentry } from '@sentry/nextjs'
import { NextApiRequest, NextApiResponse } from 'next'
import minioClient from '../../../backend/utils/minio-client'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST')
    return res.status(400).json({ message: 'Invalid method or missing "data" field on body' })
  const isBucketExisting = await minioClient.bucketExists("kravina")
  console.log('IS BUCKET EXISTING:', isBucketExisting)
  return res.status(200).json({})
}

export default withSentry(handler)
