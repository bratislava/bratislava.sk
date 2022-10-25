import axios, { AxiosRequestConfig } from 'axios'

export const uploadFile = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Accept': 'application/json'
    }
  }
  const response = await axios.post('/api/forms/upload-file', formData, config)
  console.log('RESPONSE:', response)
  return response
}
