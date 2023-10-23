import axios, { AxiosRequestConfig } from 'axios'

export const fetchEvents = async (page: number) => {
  const axiosConfig: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  }

  return axios.get(
    `${process.env.NEXT_PUBLIC_TEMPORARY_API}user/events?page=${page}&pageSize=99`,
    axiosConfig,
  )
}
export const fetchEvent = async (id: string) => {
  const axiosConfig: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  }

  return axios.get(`${process.env.NEXT_PUBLIC_TEMPORARY_API}user/events/${id}`, axiosConfig)
}

export const fetchProjects = async (page: number) => {
  const axiosConfig: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  }

  return axios.get(
    `${process.env.NEXT_PUBLIC_TEMPORARY_API}user/projects?page=${page}&pageSize=99`,
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

export const upvoteProject = async (id: number) => {
  const axiosConfig: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  }

  return axios.put(
    `${process.env.NEXT_PUBLIC_TEMPORARY_API}user/projects/${id}/up`,
    {},
    axiosConfig,
  )
}

export const downvoteProject = async (id: number) => {
  const axiosConfig: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  }

  return axios.put(
    `${process.env.NEXT_PUBLIC_TEMPORARY_API}user/projects/${id}/down`,
    {},
    axiosConfig,
  )
}
