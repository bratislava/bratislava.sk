import { GetGroupMembersRecursiveResult } from '@backend/ms-graph/types'
import axios from 'axios'

export const getMsGraphStructureQueryKey = () => ['msGraphStructure']

export const msGraphStructureFetcher = async () => {
  return axios.get<GetGroupMembersRecursiveResult>('/api/ms-graph/structure')
}
