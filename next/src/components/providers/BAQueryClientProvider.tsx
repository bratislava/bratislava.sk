import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren, useState } from 'react'

/**
 * Docs: https://tanstack.com/query/latest/docs/framework/react/guides/ssr#initial-setup
 *
 * @param children
 * @constructor
 */
const BAQueryClientProvider = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(() => new QueryClient())

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default BAQueryClientProvider
