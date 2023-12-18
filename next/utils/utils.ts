export const arrayify = (input: string | string[] | undefined | null) => {
  if (input === undefined || input === null) {
    return [] as undefined[]
  }
  if (typeof input === 'string') return [input]
  return input
}

export const isPresent = <U>(a: U | null | undefined | void): a is U => {
  return a !== undefined && a !== null
}

const isServer = () => typeof window === 'undefined'

export const isBrowser = () => !isServer()

export const isProductionDeployment = () => process.env.NEXT_PUBLIC_IS_STAGING !== 'true'
