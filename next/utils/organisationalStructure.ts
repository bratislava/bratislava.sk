export const usersFromDepartmentFetcher = (department) =>
  fetch(`/api/ms-graph/users/department/${department}`).then((r) => r.json())

export const userDetailsFetcher = (email: string) => fetch(`/api/ms-graph/users/${email}`).then((r) => r.json())
