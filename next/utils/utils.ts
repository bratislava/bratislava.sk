import getConfig from 'next/config'

const { serverRuntimeConfig } = getConfig()

export const arrayify = (input: string | string[] | undefined | null) => {
  if (input === undefined || input === null) {
    return [] as undefined[]
  }
  if (typeof input === 'string') return [input]
  return input
}

// turn unknown values into (empty) strings, return string if it's a string
export const forceString = (input: unknown) => {
  if (typeof input === 'string') return input
  if (typeof input === 'number') return input.toString()
  if (Array.isArray(input)) return input.join(', ')
  return ''
}

export const fileCountVzns = (data: any) => {
  let count = 0
  if (data?.mainDocument?.url) {
    count += 1
  }
  if (data?.amedmentDocument) {
    count += data?.amedmentDocument.length
  }
  if (data?.cancellationDocument) {
    count += data?.cancellationDocument.length
  }
  if (data?.consolidatedText) {
    count += 1
  }
  return count
}

export const isPresent = <U>(a: U | null | undefined | void): a is U => {
  if (a === null || a === undefined) return false
  return true
}

type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T

const isServer = () => typeof window === 'undefined'

export const isBrowser = () => !isServer()

export const isProductionDeployment = () => process.env.NEXT_PUBLIC_IS_STAGING !== 'true'

// https://stackoverflow.com/questions/8511281/check-if-a-value-is-an-object-in-javascript
export const isObject = (value: any) =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

export const getLanguageKey = (currentLanguage?: string) => {
  return currentLanguage === 'sk' ? 'sk' : 'en'
}
