import axios from 'axios'

import { GetGroupMembersRecursiveResult } from '@/backend/ms-graph/types'

export const getMsGraphStructureQueryKey = () => ['msGraphStructure']

export const msGraphStructureFetcher = async () => {
  return axios.get<GetGroupMembersRecursiveResult>('/api/ms-graph/structure')
}
