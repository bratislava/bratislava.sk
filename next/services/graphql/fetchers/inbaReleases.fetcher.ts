import { client } from '@/services/graphql/gql'

export type InbaReleasesFilters = {
  pageSize: number
  page: number
}

export const inbaReleasesDefaultFilters: InbaReleasesFilters = {
  pageSize: 10,
  page: 1,
}

export const getInbaReleasesQueryKey = (filters: InbaReleasesFilters) => ['inbaReleases', filters]

export const inbaReleasesFetcher = (filters: InbaReleasesFilters) => {
  return client.InbaReleasesPaginated({ ...filters })
}
