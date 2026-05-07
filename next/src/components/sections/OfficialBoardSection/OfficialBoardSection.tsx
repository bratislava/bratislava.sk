import { Typography } from '@bratislava/component-library'
import { useIsFetching } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'

import SectionContainer from '@/src/components/layouts/SectionContainer'
import OfficialBoardAdditionalFilters from '@/src/components/sections/OfficialBoardSection/OfficialBoardAdditionalFilters'
import { useOfficialBoardFilters } from '@/src/components/sections/OfficialBoardSection/useOfficialBoardFilters'
import SearchBar from '@/src/components/sections/SearchSection/SearchBar'
import SearchResults from '@/src/components/sections/SearchSection/SearchResults'
import { OfficialBoardPublicationState } from '@/src/services/ginis/types'
import { useTranslation } from '@/src/utils/useTranslation'

/**
 * TODO Add Figma link
 * Design temporarily based on AssetsSection:
 * https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=19457-20726&t=LcZlYBrAqVmxmYDf-4
 */

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

  useEffect(() => {
    setPage(1)
  }, [filters.search, filters.categoryId, filters.publicationState, filters.publicationYear])

  const searchRef = useRef<null | HTMLInputElement>(null)

  useEffect(() => {
    searchRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [filters.page, filters.pageSize])

  const fetchingQueriesCount = useIsFetching({ queryKey: ['Search'] })

  return (
    <SectionContainer>
      <div className="flex w-full flex-col gap-8">
        <SearchBar
          ref={searchRef}
          placeholder={t('SearchPage.enterKeyword')}
          input={input}
          setInput={setInput}
          setSearchQuery={setSearch}
          isLoading={fetchingQueriesCount > 0}
        />

        <div className="rounded-md bg-background-passive-secondary p-4">
          <OfficialBoardAdditionalFilters
            categoryId={categoryId}
            setCategoryId={(categoryIdValue) =>
              setFilters({ categoryId: categoryIdValue ?? undefined })
            }
            publicationState={publicationState}
            setPublicationState={(publicationStateValue) => {
              setFilters({
                ...filters,
                publicationState:
                  (publicationStateValue as OfficialBoardPublicationState) ?? undefined,
              })
            }}
            publicationYear={publicationYear}
            setPublicationYear={(publicationYearValue) =>
              setFilters({ publicationYear: publicationYearValue ?? undefined })
            }
          />
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
