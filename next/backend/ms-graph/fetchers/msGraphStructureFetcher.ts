import { GetGroupMembersRecursiveResult } from '@backend/ms-graph/ms-graph'

// TODO revisit this, use axios?
export const structureFetcher = (): Promise<GetGroupMembersRecursiveResult> =>
  fetch('/api/ms-graph/structure').then((r) => r.json())
