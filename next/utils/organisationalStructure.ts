export const usersFromDepartmentFetcher = (department) =>
  fetch(`/api/users?$filter=Department eq '${department}'`).then((r) => r.json())
