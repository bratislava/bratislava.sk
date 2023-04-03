import type { HomepageContext } from '@backend/fetchers/homepageContextFetcher'
import { createContext, ReactNode, useContext } from 'react'

const HomepageContext = createContext<HomepageContext | null>(null)

export const HomepageContextProvider = ({
  children,
  homepageContext,
}: {
  children: ReactNode
  homepageContext: HomepageContext
}) => {
  return <HomepageContext.Provider value={homepageContext}>{children}</HomepageContext.Provider>
}

export const useHomepageContext = () => {
  const result = useContext(HomepageContext)

  // Homepage context is required in the whole app, so it's correct that it fails when used and
  // not initialized.
  if (!result) {
    throw new Error('HomepageContext is not initialized.')
  }

  return result
}
