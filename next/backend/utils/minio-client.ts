import { Client } from 'minio'

export const region = "us-east-1"
export const bucketName = "tkznmjmkzjbvwlmcogc3"

/*
https://www.npmjs.com/package/minio
Check files on testing site: https://play.min.io
Credentials are mapped as login=accessKey and password=secretKey
 */
const minioClient = new Client({
  endPoint: 'play.min.io',
  port: 9000,
  useSSL: true,
  accessKey: 'Q3AM3UQ867SPQQA43P2F',
  secretKey: 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG'
})

export default minioClient
