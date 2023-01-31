import { Client } from 'minio'

export const region = "us-east-1"
export const bucketName = "forms-dev"

/*
https://www.npmjs.com/package/minio
TODO just for dev, likely to be replaced by slightly different approach
TODO replace with a more restrictive key, this one limits it just to the bucket but allows all operations
 */
const minioClient = new Client({
  endPoint: 'cdn-api.bratislava.sk',
  port: 443,
  useSSL: true,
  accessKey: 'FORMS_DEV_ALL',
  secretKey: 'cfB1t2jBVi39fHT5Mxae3gz70b8TBbDh',
})

export default minioClient
