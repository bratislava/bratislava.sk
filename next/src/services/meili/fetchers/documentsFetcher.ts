import { isDefined } from '@/src/utils/isDefined'

import { meiliClient } from '../meiliClient'
import { DocumentMeili, SearchIndexWrapped } from '../types'
import { getMeilisearchPageOptions, unwrapFromSearchIndex } from '../utils'

export type DocumentsFilters = {
  search: string
  pageSize: number
  page: number
  documentCategorySlugs?: string[]
  adminGroupSlugs?: string[]
  excludeDocumentsWithAssignedAdminGroups?: boolean
}

export const documentsDefaultFilters: Required<DocumentsFilters> = {
  search: '',
  pageSize: 9,
  page: 1,
  documentCategorySlugs: [],
  adminGroupSlugs: [],
  excludeDocumentsWithAssignedAdminGroups: false,
}

export const getDocumentsQueryKey = (filters: DocumentsFilters) => ['Search', 'Documents', filters]

export const documentsFetcher = (filters: DocumentsFilters) => {
  return meiliClient
    .index('search_index')
    .search<SearchIndexWrapped<'document', DocumentMeili>>(filters.search, {
      ...getMeilisearchPageOptions({ page: filters.page, pageSize: filters.pageSize }),
      filter: [
        'type = "document"',
        filters.documentCategorySlugs?.length
          ? `document.documentCategory.slug IN [${filters.documentCategorySlugs.join(',')}]`
          : '',
        filters.adminGroupSlugs?.length
          ? `document.adminGroups.slug IN [${filters.adminGroupSlugs.join(',')}]`
          : '',
        filters.excludeDocumentsWithAssignedAdminGroups
          ? 'document.adminGroups.documentId NOT EXISTS'
          : '',
      ].filter(isDefined),
      sort: ['document.updatedAtTimestamp:desc'],
    })
    .then(unwrapFromSearchIndex('document'))
}
