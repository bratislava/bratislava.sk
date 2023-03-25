// @ts-strict-ignore
import { GetGroupMembersRecursiveResult } from 'backend/services/ms-graph'

// not used, kept in case needed
export const usersFromDepartmentFetcher = (department) =>
  fetch(`/api/ms-graph/users/department/${department}`).then((r) => r.json())

// not used, kept in case needed
export const userDetailsFetcher = (email: string) =>
  fetch(`/api/ms-graph/users/${email}`).then((r) => r.json())

export const userSearchFetcher = (search: string) => {
  if (search.length > 0) {
    return fetch(`/api/ms-graph/users/search/${search}`).then((r) => r.json())
  }
  return Promise.resolve([])
}

export const structureFetcher = (): Promise<GetGroupMembersRecursiveResult> =>
  fetch('/api/ms-graph/structure').then((r) => r.json())
