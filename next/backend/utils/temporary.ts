import axios, { AxiosRequestConfig } from 'axios'

export const fetchProjects = async (page: number) => {
  const axiosConfig: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  }

  return axios.get(
    `${process.env.NEXT_PUBLIC_TEMPORARY_API}user/projects?page=${page}&pageSize=10`,
    axiosConfig,
  )
}
export const fetchProject = async (id: string) => {
  const axiosConfig: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  }

  return axios.get(`${process.env.NEXT_PUBLIC_TEMPORARY_API}user/projects/${id}`, axiosConfig)
}
