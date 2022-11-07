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
  return axios.post('/api/eforms/upload-file', formData, config)
}


export const deleteFile = async (fileName: string) => {
  const params = { params: { fileName } }
  return axios.delete('/api/eforms/delete-file', params)
}
