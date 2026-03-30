// GINIS is accessible only from internal network

import { environment } from '@/src/environment'

// if developing from internal network, change here
export const shouldMockGinis = () => {
  return (
    environment.nodeEnv === 'development' ||
    environment.nodeEnv === 'test' ||
    process.env.CI === 'true'
  )
}
