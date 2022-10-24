import axios from 'axios'

export const uploadFiles = async (newFiles: File[]) => {
  const response = await axios.post('/api/forms/upload-files').then(res => res).catch(error => error)

  return response
}
