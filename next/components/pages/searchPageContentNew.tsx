import { Breadcrumb } from '@bratislava/ui-bratislava/Breadcrumbs/Breadcrumbs'
import PageHeader from '@bratislava/ui-bratislava/PageHeader/PageHeader'
import Chip from '@components/forms/simple-components/Chip'
import { AdvancedSearchNew } from '@components/molecules/SearchPageNew/AdvancedSearchNew'
import { GeneralSearchResults } from '@components/molecules/SearchPageNew/GeneralSearchResults'
import { SearchFilters } from '@components/molecules/SearchPageNew/searchDataFetchers'
import { SectionContainer } from '@components/ui/SectionContainer/SectionContainer'
import { useGeneralContext } from '@utils/generalContext'
import { getPageBreadcrumbs } from '@utils/page'
import { useTranslations } from 'next-intl'
import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { Selection, TagGroup, TagList } from 'react-aria-components'
import { StringParam, useQueryParam, withDefault } from 'use-query-params'
import { useDebounce } from 'usehooks-ts'

// React-aria-components library recommends Selection as a type for selection state, which should behave like a Set object. However, common set methods such as .size and .values don't work on Selection, so as a workaround we use [...selectedOptionKey][0] to transform the Selection to an array to het its size and values

export type SearchOption = {
  key: 'allResults' | 'pages' | 'articles' | 'inbaArticles'
  displayName: string
  displayNamePlural?: string
}

const SearchPageContentNew = () => {
  const t = useTranslations()

  const [routerQueryValue, setRouterQueryValue] = useQueryParam(
    'keyword',
    withDefault(StringParam, ''),
  )
  const [input, setInput] = useState<string>('')
  const debouncedInput = useDebounce<string>(input, 300)
  const [searchValue, setSearchValue] = useState<string>(debouncedInput)

  // TODO: on enter
  useEffect(() => {
    setInput(routerQueryValue)
  }, [routerQueryValue])

  useEffect(() => {
    setSearchValue(debouncedInput)
    setRouterQueryValue(debouncedInput)
  }, [debouncedInput])

  const searchOptions: SearchOption[] = [
    { key: 'allResults', displayName: t('SearchPage.allResults') },
    { key: 'pages', displayName: t('page'), displayNamePlural: t('pages') },
    { key: 'articles', displayName: t('article'), displayNamePlural: t('articles') },
    { key: 'inbaArticles', displayName: t('inbaArticle'), displayNamePlural: t('inbaArticles') },
    // { key: 'users', displayName: t('organisationalStructure') },
  ]
  const defaultOption = searchOptions[0]

  const getSearchOptionByKey = (key: string): SearchOption => {
    return searchOptions.find((option) => option.key === key) ?? defaultOption
  }

  const [selectedOptionKey, setSelectedOptionKey] = useState<Selection>(
    new Set([defaultOption.key]),
  )
  const [currentPage, setCurrentPage] = useState(1)

  useLayoutEffect(() => {
    if ([...selectedOptionKey].length === 0) {
      setSelectedOptionKey(new Set([defaultOption.key]))
    }
  }, [selectedOptionKey])

  useLayoutEffect(() => {
    setCurrentPage(1)
  }, [searchValue, selectedOptionKey])

  const searchFilters: SearchFilters = {
    search: searchValue,
    page: currentPage,
    pageSize: 24,
    // TODO tagIds need to be here for now, because fetchers filter by tagIds
    tagIds: [],
  }

  return (
    <SectionContainer className="mb-8">
      <div className="flex w-full flex-col gap-y-8 pt-12">
        <div className="flex flex-col">
          <AdvancedSearchNew
            placeholder={t('enterKeyword')}
            title={t('searching')}
            input={input}
            setInput={setInput}
            setSearchQuery={setSearchValue}
          />
          <TagGroup
            selectionMode="single"
            selectedKeys={selectedOptionKey}
            defaultSelectedKeys={new Set([defaultOption.key])}
            onSelectionChange={setSelectedOptionKey}
          >
            <TagList className="mt-3 flex flex-wrap gap-2 sm:mt-4 lg:justify-start">
              {searchOptions.map((option) => {
                return (
                  <Chip
                    className="selected:border-gray-700 selected:bg-gray-700 hover:selected:bg-gray-700"
                    variant="large"
                    key={option.key}
                    id={option.key}
                  >
                    {`${option.displayName} `}
                  </Chip>
                )
              })}
            </TagList>
          </TagGroup>
          {/* <p className="mt-8">
            {t('SearchPage.showingResults', { resultsCount: 'XXXX (value hardcoded)' })}
          </p> */}
        </div>
        {[...selectedOptionKey][0] === defaultOption.key ? (
          <div className="flex flex-col gap-8">
            {searchOptions.slice(1).map((option) => {
              return (
                <GeneralSearchResults
                  variant="allResults"
                  searchOption={option}
                  filters={searchFilters}
                  handleShowMore={setSelectedOptionKey}
                />
              )
            })}
          </div>
        ) : null}
        {
          // eslint-disable-next-line unicorn/no-negated-condition
          [...selectedOptionKey][0] !== defaultOption.key ? (
            <GeneralSearchResults
              variant="specificResults"
              searchOption={getSearchOptionByKey(
                [...selectedOptionKey][0]?.toString() ?? defaultOption.key,
              )}
              filters={searchFilters}
              handleShowMore={setSelectedOptionKey}
              handlePageChange={setCurrentPage}
            />
          ) : null
        }
      </div>
    </SectionContainer>
  )
}

export default SearchPageContentNew
