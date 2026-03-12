import { isDefined } from '@/src/utils/isDefined'

import { meiliClient } from '../meiliClient'
import { SearchIndexWrapped } from '../types'
import { getMeilisearchPageOptions, unwrapFromSearchIndex } from '../utils'

export type FaqsFilters = {
  search: string
  pageSize: number
  page: number
  assetCategorySlugs?: string[]
  adminGroupSlugs?: string[]
  excludeAssetsWithAssignedAdminGroups?: boolean
}

export const faqsDefaultFilters: Required<FaqsFilters> = {
  search: '',
  pageSize: 10,
  page: 1,
  assetCategorySlugs: [],
  adminGroupSlugs: [],
  excludeAssetsWithAssignedAdminGroups: false,
}

export const getMeiliFaqsQueryKey = (filters: FaqsFilters) => ['Search', 'Faqs', filters]

export const meiliFaqsFetcher = (filters: FaqsFilters) => {
  return meiliClient
    .index('search_index')
    .search<SearchIndexWrapped<'faq', any>>(filters.search, {
      ...getMeilisearchPageOptions({ page: filters.page, pageSize: filters.pageSize }),
      filter: [
        'type = "faq"',
        filters.assetCategorySlugs?.length
          ? `faq.faqCategory.slug IN [${filters.assetCategorySlugs.join(',')}]`
          : '',
      ].filter(isDefined),
    })
    .then(unwrapFromSearchIndex('faq'))
}
