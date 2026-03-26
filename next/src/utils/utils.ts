import { environment } from '@/src/environment'

// TODO use `isDefined` instead of `isPresent`
export const isPresent = <U>(a: U | null | undefined): a is U => {
  return a !== undefined && a !== null
}

export const isProductionDeployment = () => environment.deployment === 'prod'
