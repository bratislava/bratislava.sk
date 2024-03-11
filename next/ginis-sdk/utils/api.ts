import axios, { AxiosRequestConfig } from 'axios'
import crypto from 'crypto'
import type { GinisConfig } from '../ginis'

const defaultAxiosConfig: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
}

export const makeAxiosRequest = async <T>(
  axiosConfig: AxiosRequestConfig | undefined,
  url: string | undefined,
  body: string | object,
  debug?: boolean
) => {
  if (!url) {
    throw new Error('Missing GINIS url for the service you are trying to reach.')
  }

  const requestConfig = axiosConfig || defaultAxiosConfig

  if (debug) {
    console.log('########### GINIS REQUEST ###########')
    console.log('headers: ', requestConfig.headers)
    console.log('body: ', body)
    console.log('########### GINIS REQUEST END ###########')
  }
  let responseAxios
  try {
    responseAxios = await axios.post<T>(url, body, requestConfig)
  } catch (error) {
    if (debug) {
      let anyError = error as any
      console.log('########### GINIS ERROR RESPONSE ###########')
      console.log('status: ', anyError?.response?.status)
      console.log('statusText: ', anyError?.response?.statusText)
      console.log('data: ', anyError?.response?.data)
      console.log('########### GINIS RESPONSE END ###########')
    }
    throw error
  }
  if (debug) {
    console.log('########### GINIS RESPONSE ###########')
    console.log('status: ', responseAxios.status)
    console.log('statusText: ', responseAxios.statusText)
    console.log('data: ', responseAxios.data)
    console.log('########### GINIS RESPONSE END ###########')
  }
  return {
    data: responseAxios.data,
    status: responseAxios.status,
    statusText: responseAxios.statusText,
  }
}

export type GRestHeader = {
  RequestName: string
  RequestNamespace: string
  User: string
  Password: string
  PasswordText: boolean
  Nonce: string
  Created: string
}

export const getGRestHeader = (config: GinisConfig, requestNamespace: string): GRestHeader => {
  return {
    RequestName: 'Xrg',
    RequestNamespace: requestNamespace,
    User: config.username,
    Password: config.password,
    PasswordText: true,
    Nonce: crypto.randomBytes(10).toString('base64'),
    Created: new Date().toISOString(),
  }
}
