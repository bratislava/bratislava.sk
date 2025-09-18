import { createContext, ReactNode, useContext } from 'react'

import { AdminGroupEntityFragment } from '@/src/services/graphql'

const AdminGroupsContext = createContext<{ adminGroups: AdminGroupEntityFragment[] } | null>(null)

export const AdminGroupsContextProvider = ({
  children,
  adminGroups,
}: {
  children: ReactNode
  adminGroups: AdminGroupEntityFragment[]
}) => {
  return (
    <AdminGroupsContext.Provider value={{ adminGroups }}>{children}</AdminGroupsContext.Provider>
  )
}

export const useAdminGroupsContext = () => {
  const result = useContext(AdminGroupsContext)

  // AdminGroups context is required in the whole app, so it's correct that it fails when used and not initialized.
  if (!result) {
    throw new Error('AdminGroups context is not initialized.')
  }

  return result
}
