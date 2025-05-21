import { Typography } from '@bratislava/component-library'
import { useIsFetching } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { Selection, TagGroup, TagList } from 'react-aria-components'
import { StringParam, useQueryParam, withDefault } from 'use-query-params'
import { useDebounceValue } from 'usehooks-ts'

import Chip from '@/src/components/common/Chip/Chip'
import OfficialBoardAdditionalFilters from '@/src/components/sections/OfficialBoardSection/OfficialBoardAdditionalFilters'
import SearchBar from '@/src/components/sections/SearchSection/SearchBar'
import SearchResults from '@/src/components/sections/SearchSection/SearchResults'
import { SearchFilters } from '@/src/components/sections/SearchSection/useQueryBySearchOption'
import { officialBoardListDefaultFilters } from '@/src/services/ginis/fetchers/officialBoardListFetcher'
import { OfficialBoardPublicationState } from '@/src/services/ginis/types'
import { getCategoryColorLocalStyle } from '@/src/utils/colors'
import { useTranslation } from '@/src/utils/useTranslation'
/*
 * RAC library recommends Selection as type for selection state, which is of type `'all' | Set`.
 * To use standard operations on Set, you have to check if selection is not 'all' to satisfy Typescript.
 * Even though we never use 'all' for selection, because it acts differently than we want.
 */
/*
 * RAC library recommends Selection as type for selection state, which is of type `'all' | Set`.
 * To use standard operations on Set, you have to check if selection is not 'all' to satisfy Typescript.
 * Even though we never use 'all' for selection, because it acts differently than we want.
 */

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

type Props =
  | {
      variant: 'general'
      searchOption?: never
    }
  | {
      variant: 'specific'
      searchOption: Exclude<SearchOption['id'], 'allResults'>
    }

const GlobalSearchSectionContent = ({ variant, searchOption }: Props) => {
  const { t } = useTranslation()

  const [routerQueryValue] = useQueryParam('keyword', withDefault(StringParam, ''))
  const [input, setInput] = useState('')
  const [debouncedInput] = useDebounceValue(input, 300)
  const [searchValue, setSearchValue] = useState(debouncedInput)

  useEffect(() => {
    setInput(routerQueryValue)
  }, [routerQueryValue])

  useEffect(() => {
    setSearchValue(debouncedInput)
  }, [debouncedInput])

  let defaultSearchOption: SearchOption = {
    id: 'allResults',
    displayNamePlural: t('SearchPage.allResults'),
  }

  let searchOptions: SearchOption[] = [
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
    {
      id: 'regulations',
      displayName: t('SearchPage.regulation'),
      displayNamePlural: t('SearchPage.regulations'),
    },
    {
      id: 'officialBoard',
      displayName: t('SearchPage.document'),
      displayNamePlural: t('SearchPage.officialBoard'),
    },
  ]

  // TODO We mutate these values in order to use variable search sections, for example to search only in one search option. The current solution works, but it may be refactored in the future.
  if (variant === 'specific') {
    searchOptions = searchOptions.filter((option) => option.id === searchOption)
    defaultSearchOption = searchOptions[0]
  }

  const getSearchOptionByKeyValue = (key: string) => {
    return searchOptions.find((option) => option.id === key) ?? defaultSearchOption
  }

  const defaultSelection = new Set([defaultSearchOption.id])

  const [selection, setSelection] = useState<Selection>(defaultSelection)
  // This is how you get first element from Set (we can do it because we use selectionMode="single" on TagGroup)
  const [first] = selection
  const selectedKey =
    selection !== 'all' && selection.size === 1
      ? (first as SearchOption['id'])
      : defaultSearchOption.id

  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setCurrentPage(1)
  }, [searchValue, selection])

  /* OfficialBoard specific filters state */
  const [categoryId, setCategoryId] = useState<string | null>(null)
  const [publicationState, setPublicationState] = useState<OfficialBoardPublicationState>(
    officialBoardListDefaultFilters.publicationState,
  )

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

  const getResultsCountById = (optionId: SearchOption['id']) => {
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
      // If user click other chip than the selected one, the selection is changed to the new chip
      // If user click an already selected chip, the selection is changed to default (no filtering)
      setSelection(newSelection)
    } else {
      setSelection(defaultSelection)
    }
  }

  const searchFilters: SearchFilters = {
    search: searchValue,
    page: currentPage,
    pageSize: 12,
    // tagIds need to be here for now, because Articles and InbaArticle fetchers filter by tagIds
    tagIds: [],
    // Official board category id
    categoryId: !categoryId || categoryId === 'all' ? undefined : categoryId,
    publicationState: publicationState ?? undefined,
  }

  const searchRef = useRef<null | HTMLInputElement>(null)

  useEffect(() => {
    searchRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [searchFilters.page, searchFilters.pageSize])

  const fetchingQueriesCount = useIsFetching({ queryKey: ['Search'] })

  return (
    <div className="flex w-full flex-col gap-y-8">
      {/* Filters */}
      <div className="flex flex-col gap-3 lg:gap-4">
        <SearchBar
          ref={searchRef}
          placeholder={t('SearchPage.enterKeyword')}
          input={input}
          setInput={setInput}
          setSearchQuery={setSearchValue}
          isLoading={fetchingQueriesCount > 0}
        />

        {/* TagGroup to select content type to search in - when used on main search page */}
        {variant === 'general' ? (
          <TagGroup
            aria-label={t('SearchPage.searchOptions')}
            selectionMode="single"
            selectedKeys={selection}
            onSelectionChange={handleSelection}
          >
            <TagList className="-m-1.5 scrollbar-hide flex gap-x-2 overflow-auto p-1.5 max-md:negative-x-spacing max-md:flex-nowrap">
              {[defaultSearchOption, ...searchOptions].map((option) => {
                return (
                  <Chip
                    variant="large"
                    key={option.id}
                    id={option.id}
                    style={getCategoryColorLocalStyle({ category: 'grey' })}
                    data-cy={`${option.id}-tab`}
                  >
                    {option.displayNamePlural}
                  </Chip>
                )
              })}
            </TagList>
          </TagGroup>
        ) : null}

        {/* Additional filters, currently only for officialBoard */}
        {selectedKey === 'officialBoard' ? (
          <div className="flex flex-col gap-4 rounded-md bg-grey-100 p-4">
            {/* TODO heading "Doplnkovy filter" as it is in figma */}
            <div>
              <OfficialBoardAdditionalFilters
                categoryId={categoryId}
                setCategoryId={setCategoryId}
                publicationState={publicationState}
                setPublicationState={setPublicationState}
              />
            </div>
          </div>
        ) : null}
      </div>

      {getResultsCountById(selectedKey) > 0 ? (
        <Typography variant="p-small">
          {t('SearchPage.showingResults', {
            // `?? 0` is here only for i18next-parser, otherwise, it doesn't create plurals
            count: getResultsCountById(selectedKey) ?? 0,
          })}
        </Typography>
      ) : null}

      {selectedKey === 'allResults' ? (
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
  )
}

export default GlobalSearchSectionContent
