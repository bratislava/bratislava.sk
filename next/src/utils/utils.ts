// TODO use `isDefined` instead of `isPresent`
export const isPresent = <U>(a: U | null | undefined | void): a is U => {
  return a !== undefined && a !== null
}

export const isProductionDeployment = () => process.env.NEXT_PUBLIC_DEPLOYMENT === 'prod'
