import axios, { AxiosRequestConfig } from 'axios'

export const fetchPosts = async () => {
  const axiosConfig: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  }

  return axios.get(process.env.NEXT_PUBLIC_TEMPORARY_API, axiosConfig)
}
