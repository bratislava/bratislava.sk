import { Typography } from '@bratislava/component-library'
import { useIsFetching } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'

import SectionContainer from '@/src/components/layouts/SectionContainer'
import OfficialBoardAdditionalFilters from '@/src/components/sections/OfficialBoardSection/OfficialBoardAdditionalFilters'
import { useOfficialBoardFilters } from '@/src/components/sections/OfficialBoardSection/useOfficialBoardFilters'
import SearchBar from '@/src/components/sections/SearchSection/SearchBar'
import SearchResults from '@/src/components/sections/SearchSection/SearchResults'
import { SearchFilters } from '@/src/components/sections/SearchSection/useQueryBySearchOption'
import { OfficialBoardPublicationState } from '@/src/services/ginis/types'
import { useTranslation } from '@/src/utils/useTranslation'

const OfficialBoardSection = () => {
  const { t } = useTranslation()
  const { filters, setFilters, setSearch, setPage } = useOfficialBoardFilters()
  const { categoryId, publicationState, publicationYear } = filters

  const [resultsCount, setResultsCount] = useState(0)

  const [input, setInput] = useState('')
  const [debouncedInput] = useDebounceValue(input, 300)

  useEffect(() => {
    setSearch(debouncedInput)
  }, [debouncedInput, setSearch])

  const searchFilters: SearchFilters = {
    search: filters.search,
    page: filters.page,
    pageSize: 12,
    categoryId: !categoryId || categoryId === 'all' ? undefined : categoryId,
    publicationState: publicationState ?? undefined,
    publicationYear: publicationYear ?? undefined,
  }

  useEffect(() => {
    setPage(1)
  }, [
    searchFilters.search,
    searchFilters.categoryId,
    searchFilters.publicationState,
    searchFilters.publicationYear,
  ])

  const searchRef = useRef<null | HTMLInputElement>(null)

  useEffect(() => {
    searchRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [searchFilters.page, searchFilters.pageSize])

  const fetchingQueriesCount = useIsFetching({ queryKey: ['Search'] })

  return (
    <SectionContainer>
      <div className="flex w-full flex-col gap-y-8">
        <SearchBar
          ref={searchRef}
          placeholder={t('SearchPage.enterKeyword')}
          input={input}
          setInput={setInput}
          setSearchQuery={setSearch}
          isLoading={fetchingQueriesCount > 0}
        />

        <div className="flex flex-col gap-4 rounded-md bg-background-passive-secondary p-4">
          <div>
            <OfficialBoardAdditionalFilters
              categoryId={categoryId}
              setCategoryId={(categoryIdValue) =>
                setFilters({ ...filters, categoryId: categoryIdValue ?? undefined })
              }
              publicationState={publicationState}
              setPublicationState={(publicationStateValue) =>
                setFilters({
                  ...filters,
                  publicationState:
                    (publicationStateValue as OfficialBoardPublicationState) ?? undefined,
                })
              }
              publicationYear={publicationYear}
              setPublicationYear={(publicationYearValue) =>
                setFilters({ ...filters, publicationYear: publicationYearValue ?? undefined })
              }
            />
          </div>
        </div>

        {resultsCount > 0 ? (
          <Typography variant="p-small">
            {t('SearchPage.showingResults', {
              // `?? 0` is here only for i18next-parser, otherwise, it doesn't create plurals
              count: resultsCount ?? 0,
            })}
          </Typography>
        ) : null}

        <SearchResults
          variant="specificResults"
          searchOption={{
            id: 'officialBoard',
            displayName: t('SearchPage.document'),
            displayNamePlural: t('SearchPage.officialBoard'),
          }}
          filters={filters}
          onSetResultsCount={(_, count) => setResultsCount(count)}
          onPageChange={setPage}
        />
      </div>
    </SectionContainer>
  )
}

export default OfficialBoardSection
