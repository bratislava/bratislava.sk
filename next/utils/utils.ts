// TODO use `isDefined` instead of `isPresent`
export const isPresent = <U>(a: U | null | undefined | void): a is U => {
  return a !== undefined && a !== null
}

const isServer = () => typeof window === 'undefined'

// TODO replace by `useIsClient` hook from `usehooks-ts`
export const isBrowser = () => !isServer()

export const isProductionDeployment = () => process.env.NEXT_PUBLIC_DEPLOYMENT === 'prod'
