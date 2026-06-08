import { Typography } from '@bratislava/component-library'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { Fragment, useEffect, useRef, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'

import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'
import PaginationWithInput from '@/src/components/common/Pagination/PaginationWithInput'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import SearchBar from '@/src/components/sections/SearchSection/SearchBar'
import SearchResultCard from '@/src/components/sections/SearchSection/SearchResultCard'
import { UrbanStudiesSectionFragment } from '@/src/services/graphql'
import {
  getUrbanStudiesQueryKey,
  urbanStudiesDefaultFilters,
  urbanStudiesFetcher,
} from '@/src/services/meili/fetchers/urbanStudiesFetcher'
import { formatDate } from '@/src/utils/formatDate'
import { isDefined } from '@/src/utils/isDefined'
import { useTranslation } from '@/src/utils/useTranslation'
import { useUrbanStudyTypeTranslationMap } from '@/src/utils/useUrbanStudyTypeTranslationMap'

type Props = {
  section: UrbanStudiesSectionFragment
}

/**
 * Searchable, paginated list of all urban studies. Mirrors AssetsAll, but urban studies have no
 * category/author filters, so only full-text search + pagination is provided.
 */
const UrbanStudiesAll = ({ section }: Props) => {
  const { t } = useTranslation()

  const { title, text, titleLevelUrbanStudiesSection: titleLevel } = section

  const urbanStudyTypeTranslationMap = useUrbanStudyTypeTranslationMap()

  const [input, setInput] = useState('')
  const [debouncedInput] = useDebounceValue(input, 300)
  const [search, setSearch] = useState(urbanStudiesDefaultFilters.search)
  const [page, setPage] = useState(urbanStudiesDefaultFilters.page)

  useEffect(() => {
    setSearch(debouncedInput)
    setPage(1)
  }, [debouncedInput])

  const filters = { search, page, pageSize: urbanStudiesDefaultFilters.pageSize }

  const { data, isPending } = useQuery({
    queryKey: getUrbanStudiesQueryKey(filters),
    queryFn: () => urbanStudiesFetcher(filters),
    placeholderData: keepPreviousData,
  })

  const searchRef = useRef<null | HTMLInputElement>(null)

  useEffect(() => {
    searchRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [filters.page])

  const currentResultsCount = data?.hits.length ?? 0
  const totalCount = data?.estimatedTotalHits ?? 0
  const resultsCountMessage = t('ArticlesAll.resultsCountMessage', {
    count: currentResultsCount,
    totalCount,
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6">
        <SectionHeader title={title} text={text} titleLevel={titleLevel} />
        <SearchBar
          ref={searchRef}
          placeholder={t('SearchPage.enterKeyword')}
          input={input}
          setInput={setInput}
          setSearchQuery={setSearch}
          isLoading={isPending}
        />
      </div>

      {data?.hits?.length ? (
        <ul className="flex flex-col rounded-lg border py-2" data-cy="search-results">
          {data.hits.map((urbanStudy, index) => {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <Fragment key={index}>
                {index > 0 ? <HorizontalDivider asListItem className="mx-4 lg:mx-6" /> : null}
                <li>
                  <SearchResultCard
                    data={{
                      title: urbanStudy.title,
                      linkHref: `/uzemne-studie/${urbanStudy.slug}`,
                      metadata: [
                        urbanStudy.urbanStudyType
                          ? urbanStudyTypeTranslationMap[urbanStudy.urbanStudyType]
                          : undefined,
                        urbanStudy.year,
                        formatDate(urbanStudy.updatedAt),
                      ].filter(isDefined),
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
        <div className="flex flex-col items-center gap-4 lg:flex-row lg:justify-between">
          <Typography variant="p-default">{resultsCountMessage}</Typography>
          <PaginationWithInput
            key={filters.search}
            totalCount={Math.ceil(data.estimatedTotalHits / filters.pageSize)}
            currentPage={filters.page}
            onPageChange={setPage}
          />
        </div>
      ) : null}
    </div>
  )
}

export default UrbanStudiesAll
