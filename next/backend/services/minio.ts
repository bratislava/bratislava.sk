import axios from 'axios'

import { UploadMinioFile } from '../dtos/minio/upload-minio-file.dto'

export const uploadFile = async (newFile: UploadMinioFile) => {
  const response = await axios.post('/api/forms/upload-file').then(res => res)
  console.log(response)
  return response
}
