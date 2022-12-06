// TODO waiting on #305 to get merged, afterwards might move elsewhere
// frontend code for calling api endpoints grouped
import * as Sentry from '@sentry/react'
import { ErrorObject } from 'ajv'
import { get } from 'lodash'

export const API_ERROR_TEXT = 'API_ERROR'

export class ApiError extends Error {
  errors: Array<ErrorObject>

  constructor(m: string, errors: Array<ErrorObject>) {
    super(m)
    // Set the prototype explicitly - workaround while target is es5, cosnsider bumping target so we don't have to deal with this
    Object.setPrototypeOf(this, ApiError.prototype)
    this.errors = errors
  }
}

const fetchJsonApi = async (path: string, options?: RequestInit) => {
  try {
    const response = await fetch(path, options)
    if (response.ok) {
      return await response.json()
    }
    console.log('response not ok')
    // try parsing errors - if they may apper in different format extend here
    const responseText = await response.text()
    console.log('got text')
    let responseJson: any = {}
    try {
      console.log('try json')
      responseJson = JSON.parse(responseText)
    } catch (error) {
      throw new Error(API_ERROR_TEXT)
    }
    console.log('have json', responseJson)
    if (responseJson?.errors) {
      throw new ApiError(responseJson?.message || API_ERROR_TEXT, responseJson.errors)
    }
    throw new Error(API_ERROR_TEXT)
  } catch (error) {
    // caught & rethrown so that we can handle Sentry in one place
    console.error(error)
    Sentry.captureException(error)
    throw error
  }
}

// TODO move error handling here
export const submitEform = async (eformKey: string, data: Record<string, any>) => {
  console.log('-------------------')
  console.log(eformKey)
  return fetchJsonApi(`/api/eforms/${eformKey}/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

interface PhoneResponse {
  token: string
}

export const checkIsPhone = async (schema: any, value: string): Promise<boolean> => {
  if (!value) {
    return false
  }

  try {
    const { token }: PhoneResponse = await fetchJsonApi(`/api/user/verification/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone: value }),
    })

    console.log(`TOKEN ${token}`)
    return true
  } catch (error) {
    return false
  }
}

interface TokenResponse {
  isValid: boolean
}

export const checkIsToken = async (schema: any, value: string, data: any): Promise<boolean> => {
  if (!value) {
    return false
  }

  const phone = get(data, schema.ref)

  try {
    const { isValid }: TokenResponse = await fetchJsonApi(`/api/user/verification/check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone, token: value }),
    })

    return isValid
  } catch (error) {
    return false
  }
}
