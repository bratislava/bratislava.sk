import { Typography } from '@bratislava/component-library'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'

import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'
import Pagination from '@/src/components/common/Pagination/Pagination'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import DocumentsFilterGroup from '@/src/components/sections/DocumentsSection/DocumentsFilterGroup'
import { useDocumentsFilters } from '@/src/components/sections/DocumentsSection/useDocumentsFilters'
import SearchBar from '@/src/components/sections/SearchSection/SearchBar'
import SearchResultCard from '@/src/components/sections/SearchSection/SearchResultCard'
import { DocumentsSectionFragment } from '@/src/services/graphql'
import {
  documentsFetcher,
  DocumentsFilters,
  getDocumentsQueryKey,
} from '@/src/services/meili/fetchers/documentsFetcher'
import { formatDate } from '@/src/utils/formatDate'
import { useTranslation } from '@/src/utils/useTranslation'

type Props = {
  section: DocumentsSectionFragment
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=19457-20726&t=LcZlYBrAqVmxmYDf-4
 */

const DocumentsAllSection = ({ section }: Props) => {
  const { t } = useTranslation()

  const { title, text, titleLevelDocumentsSection } = section

  const { filters, setFilters, setSearch, setPage } = useDocumentsFilters()

  const [input, setInput] = useState('')
  const [debouncedInput] = useDebounceValue(input, 300)

  const handleFiltersChange = (newFilters: DocumentsFilters) => {
    setFilters({ ...newFilters, page: 1 })
  }

  useEffect(() => {
    setSearch(debouncedInput)
  }, [debouncedInput, setSearch])

  const { data, isPending } = useQuery({
    queryKey: getDocumentsQueryKey(filters),
    queryFn: () => documentsFetcher(filters),
    placeholderData: keepPreviousData,
  })

  const searchRef = useRef<null | HTMLInputElement>(null)

  useEffect(() => {
    searchRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [filters.page, filters.pageSize])

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-6">
        <SectionHeader title={title} text={text} titleLevel={titleLevelDocumentsSection} />
        <SearchBar
          ref={searchRef}
          placeholder={t('SearchPage.enterKeyword')}
          input={input}
          setInput={setInput}
          setSearchQuery={setInput}
          isLoading={isPending}
        />
        <DocumentsFilterGroup filters={filters} onFiltersChange={handleFiltersChange} />
      </div>

      {data?.hits?.length ? (
        <ul className="flex flex-col rounded-lg border py-2" data-cy="search-results">
          {data.hits.map((document, index) => {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <Fragment key={index}>
                {index > 0 ? <HorizontalDivider asListItem className="mx-4 lg:mx-6" /> : null}
                <li>
                  <SearchResultCard
                    data={{
                      title: document.title,
                      linkHref: `/dokumenty/${document.slug}`,
                      metadata: [document.documentCategory?.title, formatDate(document.updatedAt)],
                      customIconName: 'search_result_official_board',
                    }}
                  />
                </li>
              </Fragment>
            )
          })}
        </ul>
      ) : filters.search ? (
        <Typography variant="p-small">{t('SearchPage.noResults')}</Typography>
      ) : (
        <Typography variant="p-small">{t('SearchPage.enterSearchQuery')}</Typography>
      )}

      {data?.estimatedTotalHits ? (
        // TODO Replace by PaingationWithInput
        <Pagination
          key={filters.search}
          totalCount={Math.ceil(data.estimatedTotalHits / filters.pageSize)}
          currentPage={filters.page}
          onPageChange={setPage}
        />
      ) : null}
    </div>
  )
}

export default DocumentsAllSection
