import { Typography } from '@bratislava/component-library'
import Chip from '@components/forms/simple-components/Chip'
import SearchBarRAC from '@components/organisms/SearchPage/SearchBarRAC'
import SearchResults from '@components/organisms/SearchPage/SearchResults'
import { SearchFilters } from '@components/organisms/SearchPage/useQueryBySearchOption'
import { SectionContainer } from '@components/ui/SectionContainer/SectionContainer'
import { getCategoryColorLocalStyle } from '@utils/colors'
import { useTranslations } from 'next-intl'
import React, { useEffect, useRef, useState } from 'react'
import { Selection, TagGroup, TagList } from 'react-aria-components'
import { StringParam, useQueryParam, withDefault } from 'use-query-params'
import { useDebounce } from 'usehooks-ts'

/*
 * RAC library recommends Selection as type for selection state, which is of type `'all' | Set`.
 * To use standard operations on Set, you have to check if selection is not 'all' to satisfy Typescript.
 * Even though we never use 'all' for selection, because it acts differently than we want.
 */

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

const SearchPageContent = () => {
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
    id: 'allResults',
    displayNamePlural: t('SearchPage.allResults'),
  }

  const searchOptions: SearchOption[] = [
    { id: 'pages', displayName: t('SearchPage.page'), displayNamePlural: t('SearchPage.pages') },
    {
      id: 'articles',
      displayName: t('SearchPage.article'),
      displayNamePlural: t('SearchPage.articles'),
    },
    // {
    //   id: 'inbaArticles',
    //   displayName: t('SearchPage.inbaArticle'),
    //   displayNamePlural: t('SearchPage.inbaArticles'),
    // },
    {
      id: 'users',
      displayName: t('SearchPage.contact'),
      displayNamePlural: t('SearchPage.contacts'),
    },
    // {
    //   id: 'regulations',
    //   displayName: t('SearchPage.regulation'),
    //   displayNamePlural: t('SearchPage.regulations'),
    // },
    // {
    //   id: 'officialBoard',
    //   displayName: t('SearchPage.document'),
    //   displayNamePlural: t('officialBoard'),
    // },
  ]

  const getSearchOptionByKeyValue = (key: string) => {
    return searchOptions.find((option) => option.id === key) ?? defaultSearchOption
  }

  const defaultSelection = new Set([defaultSearchOption.id])

  const [selection, setSelection] = useState<Selection>(defaultSelection)
  // This is how you get first element from Set (we can do it because we use selectionMode="single" on TagGroup)
  const selectedKey: SearchOption['id'] =
    selection !== 'all' && selection.size === 1
      ? selection.values().next().value
      : defaultSearchOption.id

  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setCurrentPage(1)
  }, [searchValue, selection])

  const [resultsCount, setResultsCount] = useState(
    Object.fromEntries(searchOptions.map((option): [string, number] => [option.id, 0])),
  )

  const setResultsCountById = (optionId: SearchOption['id'], count: number) => {
    setResultsCount((prevResultsCount) => {
      return {
        ...prevResultsCount,
        [optionId]: count,
      }
    })
  }

  const getResultsCountById = (optionId: SearchOption['id']): number => {
    if (optionId === defaultSearchOption.id) {
      return Object.values(resultsCount).reduce((a, b) => a + b, 0)
    }
    if (optionId in resultsCount) {
      return resultsCount[optionId]
    }
    return 0
  }

  /**
   * If the user clicks other Chip than the selected one, the new selection size will be 1. We can safely set the selected option to the new selection.
   * If the user clicks the selected Chip, the new selection size will be 0, and therefore we set the default selection.
   *
   * Prerequisites are selectionMode="single" (and disallowEmptySelection={false} but it's default) on TagGroup.
   *
   * @param newSelection
   */
  const handleSelection = (newSelection: Selection) => {
    // Checking 'all' just to get pure Set type, 'all' is not used in our case
    if (newSelection !== 'all' && newSelection.size === 1) {
      /** If user click other chip than the selected one, and */
      setSelection(newSelection)
    } else {
      setSelection(defaultSelection)
    }
  }

  const searchFilters: SearchFilters = {
    search: searchValue,
    page: currentPage,
    pageSize: 12,
    // tagIds need to be here for now, because BlogPost and InbaArticle fetchers filter by tagIds
    tagIds: [],
  }

  const searchRef = useRef(null)

  useEffect(() => {
    searchRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [searchFilters.page, searchFilters.pageSize])

  return (
    <SectionContainer className="mb-8">
      <div className="flex w-full flex-col gap-y-8 pt-12">
        <Typography type="h1">{t('searching')}</Typography>
        <div className="flex flex-col gap-3 lg:gap-4">
          <SearchBarRAC
            ref={searchRef}
            placeholder={t('enterKeyword')}
            input={input}
            setInput={setInput}
            setSearchQuery={setSearchValue}
          />

          <TagGroup
            aria-label={t('SearchPage.searchOptions')}
            selectionMode="single"
            selectedKeys={selection}
            onSelectionChange={handleSelection}
          >
            <TagList className="max-md:negative-x-spacing -m-1.5 flex gap-x-2 overflow-auto p-1.5 scrollbar-hide max-md:flex-nowrap">
              {[defaultSearchOption, ...searchOptions].map((option) => {
                return (
                  <Chip
                    variant="large"
                    key={option.id}
                    id={option.id}
                    style={getCategoryColorLocalStyle({ category: 'gray' })}
                  >
                    {option.displayNamePlural}
                  </Chip>
                )
              })}
            </TagList>
          </TagGroup>
        </div>
        {getResultsCountById(selectedKey) > 0 ? (
          <Typography type="p">
            {t('SearchPage.showingResults', {
              count: getResultsCountById(selectedKey),
            })}
          </Typography>
        ) : null}
        {selectedKey === defaultSearchOption.id ? (
          <div className="flex flex-col gap-8">
            {searchOptions.map((option) => {
              return (
                <SearchResults
                  variant="allResults"
                  searchOption={option}
                  filters={searchFilters}
                  onSetResultsCount={setResultsCountById}
                  onShowMore={setSelection}
                  key={`allResults-${option.id}`}
                />
              )
            })}
          </div>
        ) : (
          <SearchResults
            variant="specificResults"
            searchOption={getSearchOptionByKeyValue(selectedKey)}
            filters={searchFilters}
            onSetResultsCount={setResultsCountById}
            onShowMore={setSelection}
            onPageChange={setCurrentPage}
            key={`specificResults-${selectedKey}`}
          />
        )}
      </div>
    </SectionContainer>
  )
}

export default SearchPageContent
