import { RegulationsListSectionFragment } from '@backend/graphql'
import { Typography } from '@bratislava/component-library'
import AdvancedSearchNew from '@components/molecules/SearchPageNew/AdvancedSearchNew'
import GeneralSearchResults from '@components/molecules/SearchPageNew/GeneralSearchResults'
import { SearchFilters } from '@components/molecules/SearchPageNew/useQueryBySearchOption'
import { SectionContainer } from '@components/ui/SectionContainer/SectionContainer'
import { useTranslations } from 'next-intl'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { StringParam, useQueryParam, withDefault } from 'use-query-params'
import { useDebounce } from 'usehooks-ts'

// This component was created by reducing some functionality from the main search component SearchPageContentNew
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
    <SectionContainer className="mb-8">
      <div className="flex w-full flex-col gap-y-8 pt-12">
        <Typography type="h1">{t('searching')}</Typography>
        <div className="flex flex-col gap-3 lg:gap-4">
          <AdvancedSearchNew
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
        <GeneralSearchResults
          variant="specificResults"
          searchOption={defaultSearchOption}
          filters={searchFilters}
          onSetResultsCount={setResultsCountById}
          onPageChange={setCurrentPage}
          key={`specificResults-${defaultSearchOption.id}`}
        />
      </div>
    </SectionContainer>
  )
}

export default RegulationsListSection
