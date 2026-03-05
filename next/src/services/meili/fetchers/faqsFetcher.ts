import { isDefined } from '@/src/utils/isDefined'

import { meiliClient } from '../meiliClient'
import { SearchIndexWrapped } from '../types'
import { getMeilisearchPageOptions, unwrapFromSearchIndex } from '../utils'

export type FaqsFilters = {
  search: string
  page: number
  pageSize: number
  categorySlugs?: string[]
}

export const faqsDefaultFilters: FaqsFilters = {
  search: '',
  page: 1,
  pageSize: 12,
}

export const getMeiliFaqsQueryKey = (filters: FaqsFilters) => ['Search', 'Faqs', filters]

export const meiliFaqsFetcher = (filters: FaqsFilters) => {
  return meiliClient
    .index('search_index')
    .search<SearchIndexWrapped<'faq', any>>(filters.search, {
      ...getMeilisearchPageOptions({ page: filters.page, pageSize: filters.pageSize }),
      filter: [
        'type = "faq"',
        filters.categorySlugs?.length
          ? filters.categorySlugs.map((categorySlug) => `faq.faqCategory.slug = ${categorySlug}`)
          : null,
      ].filter(isDefined),
    })
    .then(unwrapFromSearchIndex('faq'))
}
