import { Typography } from '@bratislava/component-library'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { Fragment, useEffect, useRef, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'

import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'
import PaginationWithInput from '@/src/components/common/Pagination/PaginationWithInput'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import AssetsFilterGroup from '@/src/components/sections/AssetsSection/AssetsFilterGroup'
import { useAssetsFilters } from '@/src/components/sections/AssetsSection/useAssetsFilters'
import SearchBar from '@/src/components/sections/SearchSection/SearchBar'
import SearchResultCard from '@/src/components/sections/SearchSection/SearchResultCard'
import { AssetsSectionFragment } from '@/src/services/graphql'
import { assetsFetcher, AssetsFilters, getAssetsQueryKey } from '@/src/services/meili/fetchers/assetsFetcher'
import { formatDate } from '@/src/utils/formatDate'
import { useTranslation } from '@/src/utils/useTranslation'

type Props = {
  section: AssetsSectionFragment
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=19457-20726&t=LcZlYBrAqVmxmYDf-4
 */

const AssetsAllSection = ({ section }: Props) => {
  const { t } = useTranslation()

  const { title, text, titleLevelAssetsSection: titleLevel } = section

  const { filters, setFilters, setSearch, setPage } = useAssetsFilters()

  const [input, setInput] = useState('')
  const [debouncedInput] = useDebounceValue(input, 300)

  const handleFiltersChange = (newFilters: AssetsFilters) => {
    setFilters({ ...newFilters, page: 1 })
  }

  useEffect(() => {
    setSearch(debouncedInput)
  }, [debouncedInput, setSearch])

  const { data, isPending } = useQuery({
    queryKey: getAssetsQueryKey(filters),
    queryFn: () => assetsFetcher(filters),
    placeholderData: keepPreviousData,
  })

  const searchRef = useRef<null | HTMLInputElement>(null)

  useEffect(() => {
    searchRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [filters.page, filters.pageSize])

  const currentResultsCount = data?.hits.length ?? 0
  const totalCount = data?.estimatedTotalHits ?? 0
  const articlesCountMessage = t('ArticlesAll.resultsCountMessage', {
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
        <AssetsFilterGroup filters={filters} onFiltersChange={handleFiltersChange} />
      </div>

      {data?.hits?.length ? (
        <ul className="flex flex-col rounded-lg border py-2" data-cy="search-results">
          {data.hits.map((asset, index) => {
            return (
              <Fragment key={index}>
                {index > 0 ? <HorizontalDivider asListItem className="mx-4 lg:mx-6" /> : null}
                <li>
                  <SearchResultCard
                    data={{
                      title: asset.title,
                      linkHref: `/dokumenty/${asset.slug}`,
                      metadata: [asset.assetCategory?.title, formatDate(asset.updatedAt)],
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
          <Typography variant="p-default">{articlesCountMessage}</Typography>
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

export default AssetsAllSection
