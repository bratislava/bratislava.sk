// GINIS is accessible only from internal network

import { serverEnvironment } from '@/src/environment.server'

// if developing from internal network, change here
export const shouldMockGinis = () => {
  return (
    serverEnvironment.nodeEnv === 'development' ||
    serverEnvironment.nodeEnv === 'test' ||
    process.env.CI === 'true'
  )
}
