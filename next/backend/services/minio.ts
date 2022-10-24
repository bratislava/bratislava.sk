import axios from 'axios'

export const uploadFile = async () => {
  const response = await axios.post('/api/forms/upload-file').then(res => res).catch(error => error)
  console.log(response)
}
