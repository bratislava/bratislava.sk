import Chip from '@components/forms/simple-components/Chip'
import AdvancedSearchNew from '@components/molecules/SearchPageNew/AdvancedSearchNew'
import GeneralSearchResults from '@components/molecules/SearchPageNew/GeneralSearchResults'
import { SearchFilters } from '@components/molecules/SearchPageNew/searchDataFetchers'
import { SectionContainer } from '@components/ui/SectionContainer/SectionContainer'
import { getCategoryColorLocalStyle } from '@utils/colors'
import { useTranslations } from 'next-intl'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Selection, TagGroup, TagList } from 'react-aria-components'
import { StringParam, useQueryParam, withDefault } from 'use-query-params'
import { useDebounce } from 'usehooks-ts'

/*
 * React-aria-components library recommends Selection as a type for selection state, which should behave like a Set object.
 * However, common set methods such as .size and .values don't work on Selection,
 * so as a workaround we use [...selectedOptionKey] to transform the Selection to an array to get its size and values.
 */

export type SearchOption = {
  id: 'allResults' | 'pages' | 'articles' | 'inbaArticles'
  displayName: string
  displayNamePlural?: string
}

const SearchPageContentNew = () => {
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
    displayName: t('SearchPage.allResults'),
  }
  const searchOptions: SearchOption[] = [
    { id: 'pages', displayName: t('SearchPage.page'), displayNamePlural: t('SearchPage.pages') },
    {
      id: 'articles',
      displayName: t('SearchPage.article'),
      displayNamePlural: t('SearchPage.articles'),
    },
    {
      id: 'inbaArticles',
      displayName: t('SearchPage.inbaArticle'),
      displayNamePlural: t('SearchPage.inbaArticles'),
    },
  ]

  const getSearchOptionByKeyValue = (key: string) => {
    return searchOptions.find((option) => option.id === key) ?? defaultSearchOption
  }

  const [selectedOptionKey, setSelectedOptionKey] = useState<Selection>(
    new Set([defaultSearchOption.id]),
  )

  // When clicking on an already selected option, we want to set the default option as selected. We use useLayoutEffect to avoid page flickering.
  useLayoutEffect(() => {
    if ([...selectedOptionKey].length === 0) {
      setSelectedOptionKey(new Set([defaultSearchOption.id]))
    }
  }, [selectedOptionKey])

  const [currentPage, setCurrentPage] = useState(1)

  useLayoutEffect(() => {
    setCurrentPage(1)
  }, [searchValue, selectedOptionKey])

  const searchFilters: SearchFilters = {
    search: searchValue,
    page: currentPage,
    pageSize: 24,
    // tagIds need to be here for now, because BlogPost and InbaArticle fetchers filter by tagIds
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
            defaultSelectedKeys={new Set([defaultSearchOption.id])}
            onSelectionChange={setSelectedOptionKey}
          >
            <TagList className="mt-3 flex flex-wrap gap-2 md:mt-4 lg:justify-start">
              {[defaultSearchOption, ...searchOptions].map((option) => {
                return (
                  <Chip
                    variant="large"
                    key={option.id}
                    id={option.id}
                    style={getCategoryColorLocalStyle({ category: 'gray' })}
                  >
                    {`${option.displayName}`}
                  </Chip>
                )
              })}
            </TagList>
          </TagGroup>
        </div>
        {[...selectedOptionKey][0] === defaultSearchOption.id ? (
          <div className="flex flex-col gap-8">
            {searchOptions.map((option) => {
              return (
                <GeneralSearchResults
                  variant="allResults"
                  searchOption={option}
                  filters={searchFilters}
                  handleShowMore={setSelectedOptionKey}
                  key={`allResults-${option.id}`}
                />
              )
            })}
          </div>
        ) : (
          <GeneralSearchResults
            variant="specificResults"
            searchOption={getSearchOptionByKeyValue(
              [...selectedOptionKey][0]?.toString() ?? defaultSearchOption.id,
            )}
            filters={searchFilters}
            handleShowMore={setSelectedOptionKey}
            handlePageChange={setCurrentPage}
            key={`specificResults-${[...selectedOptionKey][0]}`}
          />
        )}
      </div>
    </SectionContainer>
  )
}

export default SearchPageContentNew
