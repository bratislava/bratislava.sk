import axios from 'axios'
import { UploadMinioFile } from '../dtos/minio/upload-minio-file.dto'

export const uploadFiles = async (newFiles: UploadMinioFile[]) => {
  const response = await axios.post('/api/forms/upload-files').then(res => res).catch(error => error)

  return response
}
