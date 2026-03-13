import { isDefined } from '@/src/utils/isDefined'

import { meiliClient } from '../meiliClient'
import { SearchIndexWrapped } from '../types'
import { getMeilisearchPageOptions, unwrapFromSearchIndex } from '../utils'

export type FaqsFilters = {
  search: string
  pageSize: number
  page: number
  faqCategorySlugs?: string[]
  adminGroupSlugs?: string[]
  excludeFaqsWithAssignedAdminGroups?: boolean
}

export const faqsDefaultFilters: Required<FaqsFilters> = {
  search: '',
  pageSize: 10,
  page: 1,
  faqCategorySlugs: [],
  adminGroupSlugs: [],
  excludeFaqsWithAssignedAdminGroups: false,
}

export const getMeiliFaqsQueryKey = (filters: FaqsFilters) => ['Search', 'Faqs', filters]

export const meiliFaqsFetcher = (filters: FaqsFilters) => {
  return meiliClient
    .index('search_index')
    .search<SearchIndexWrapped<'faq', any>>(filters.search, {
      ...getMeilisearchPageOptions({ page: filters.page, pageSize: filters.pageSize }),
      filter: [
        'type = "faq"',
        filters.faqCategorySlugs?.length
          ? `faq.faqCategory.slug IN [${filters.faqCategorySlugs.join(',')}]`
          : '',
      ].filter(isDefined),
    })
    .then(unwrapFromSearchIndex('faq'))
}
