import { RegulationsListSectionFragment } from '@backend/graphql'
import { Typography } from '@bratislava/component-library'
import SearchBar from '@components/organisms/SearchSection/SearchBar'
import SearchResults from '@components/organisms/SearchSection/SearchResults'
import { SearchFilters } from '@components/organisms/SearchSection/useQueryBySearchOption'
import { useTranslations } from 'next-intl'
import React, { useEffect, useRef, useState } from 'react'
import { StringParam, useQueryParam, withDefault } from 'use-query-params'
import { useDebounce } from 'usehooks-ts'

// This component was created by reducing some functionality from the main search component GlobalSearchPageContent
// Same as in OfficialBoardSection.
// TODO there's too much code duplication here, it would be better to have one component that takes selected search options as props

export type SearchOption = {
  id:
    | 'allResults'
    | 'pages'
    | 'articles'
    | 'inbaArticles'
    | 'regulations'
    | 'users'
    | 'officialBoard'
  displayName?: string
  displayNamePlural: string
}

type RegulationsListSectionProps = {
  section: RegulationsListSectionFragment
}

const RegulationsListSection = ({ section }: RegulationsListSectionProps) => {
  // TODO return only GlobalSearchPageContent with specific search option when regulations are enabled
  // return <GlobalSearchPageContent variant="specific" searchOption="regulations" />

  const t = useTranslations()

  const [routerQueryValue] = useQueryParam('keyword', withDefault(StringParam, ''))
  const [input, setInput] = useState('')
  const debouncedInput = useDebounce(input, 300)
  const [searchValue, setSearchValue] = useState(debouncedInput)

  useEffect(() => {
    setInput(routerQueryValue)
  }, [routerQueryValue])

  useEffect(() => {
    setSearchValue(debouncedInput)
  }, [debouncedInput])

  const defaultSearchOption: SearchOption = {
    id: 'regulations',
    displayName: t('SearchPage.regulation'),
    displayNamePlural: t('SearchPage.regulations'),
  }

  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setCurrentPage(1)
  }, [searchValue])

  const [resultsCount, setResultsCount] = useState(0)

  const setResultsCountById = (optionId: SearchOption['id'], count: number) => {
    setResultsCount(count)
  }

  const searchFilters: SearchFilters = {
    search: searchValue,
    page: currentPage,
    pageSize: 12,
    // tagIds need to be here for now, because BlogPost and InbaArticle fetchers filter by tagIds
    tagIds: [],
  }

  const searchRef = useRef<null | HTMLInputElement>(null)

  useEffect(() => {
    searchRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [searchFilters.page, searchFilters.pageSize])

  return (
    <div className="flex w-full flex-col gap-y-8">
      <Typography type="h1">{t('searching')}</Typography>
      <div className="flex flex-col gap-3 lg:gap-4">
        <SearchBar
          ref={searchRef}
          placeholder={t('enterKeyword')}
          input={input}
          setInput={setInput}
          setSearchQuery={setSearchValue}
        />
      </div>
      {resultsCount > 0 ? (
        <Typography type="p">
          {t('SearchPage.showingResults', {
            count: resultsCount,
          })}
        </Typography>
      ) : null}
      <SearchResults
        variant="specificResults"
        searchOption={defaultSearchOption}
        filters={searchFilters}
        onSetResultsCount={setResultsCountById}
        onPageChange={setCurrentPage}
        key={`specificResults-${defaultSearchOption.id}`}
      />
    </div>
  )
}

export default RegulationsListSection
