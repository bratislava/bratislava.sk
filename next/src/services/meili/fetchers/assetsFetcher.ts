import { isDefined } from '@/src/utils/isDefined'

import { meiliClient } from '../meiliClient'
import { AssetMeili, SearchIndexWrapped } from '../types'
import { getMeilisearchPageOptions, unwrapFromSearchIndex } from '../utils'

export type AssetsFilters = {
  search: string
  pageSize: number
  page: number
  assetCategorySlugs?: string[]
  adminGroupSlugs?: string[]
  excludeAssetsWithAssignedAdminGroups?: boolean
}

export const assetsDefaultFilters: Required<AssetsFilters> = {
  search: '',
  pageSize: 9,
  page: 1,
  assetCategorySlugs: [],
  adminGroupSlugs: [],
  excludeAssetsWithAssignedAdminGroups: false,
}

export const getAssetsQueryKey = (filters: AssetsFilters) => ['Search', 'Assets', filters]

export const assetsFetcher = (filters: AssetsFilters) => {
  return meiliClient
    .index('search_index')
    .search<SearchIndexWrapped<'asset', AssetMeili>>(filters.search, {
      ...getMeilisearchPageOptions({ page: filters.page, pageSize: filters.pageSize }),
      filter: [
        'type = "asset"',
        filters.assetCategorySlugs?.length
          ? `asset.assetCategory.slug IN [${filters.assetCategorySlugs.join(',')}]`
          : '',
        filters.adminGroupSlugs?.length
          ? `asset.adminGroups.slug IN [${filters.adminGroupSlugs.join(',')}]`
          : '',
        filters.excludeAssetsWithAssignedAdminGroups
          ? 'asset.adminGroups.documentId NOT EXISTS'
          : '',
      ].filter(isDefined),
      sort: ['asset.updatedAtTimestamp:desc'],
    })
    .then(unwrapFromSearchIndex('asset'))
}
