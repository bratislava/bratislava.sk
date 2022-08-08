import { GetGroupMembersRecursiveResult } from 'services/ms-graph'

// not used, kept in case needed
export const usersFromDepartmentFetcher = (department) =>
  fetch(`/api/ms-graph/users/department/${department}`).then((r) => r.json())

// not used, kept in case needed
export const userDetailsFetcher = (email: string) => fetch(`/api/ms-graph/users/${email}`).then((r) => r.json())

export const userSearchFetcher = (search: string) => fetch(`/api/ms-graph/users/search/${search}`).then((r) => r.json())

export const structureFetcher = (): Promise<GetGroupMembersRecursiveResult> =>
  fetch('/api/ms-graph/structure').then((r) => r.json())

// for ordering people from most important within their department - the higher score the better
export const roleOrderingScore = (role: string | null | undefined) => {
  let score = 0
  if (!role) return score
  // puts leadership in front, their secretaries as second
  // counting on 'Veduci/Veduca' and 'Riaditel/Riaditelka' to be the Role names in AD
  // deals with '1. ...' or 'Prvý ...' as super-special role (i.e. '1. námestníčka primátora')
  if (role.startsWith('1.') || role.startsWith('Prv')) {
    score = 3
  } else if (role.startsWith('Vedúc') || role.startsWith('Riadit')) {
    score = 2
  } else if (role.includes('Vedúc') || role.includes('Riadit')) {
    score = 1
  }
  return score
  // TODO deal with other roles
}
