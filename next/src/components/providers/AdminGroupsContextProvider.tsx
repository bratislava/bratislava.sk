import { createContext, ReactNode, useContext } from 'react'

import { AdminGroupEntityFragment } from '@/src/services/graphql'
import { isDefined } from '@/src/utils/isDefined'

const AdminGroupsContext = createContext<(AdminGroupEntityFragment | null)[] | null>(null)

export const AdminGroupsContextProvider = ({
  children,
  adminGroups,
}: {
  children: ReactNode
  adminGroups: (AdminGroupEntityFragment | null)[]
}) => {
  return <AdminGroupsContext.Provider value={adminGroups}>{children}</AdminGroupsContext.Provider>
}

export const useAdminGroupsContext = () => {
  return { adminGroups: useContext(AdminGroupsContext)?.filter(isDefined) ?? [] }
}
