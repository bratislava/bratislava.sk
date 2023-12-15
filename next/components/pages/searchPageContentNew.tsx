import Chip from '@components/forms/simple-components/Chip'
import { AdvancedSearchNew } from '@components/molecules/SearchPageNew/AdvancedSearchNew'
import GeneralSearchResults from '@components/molecules/SearchPageNew/GeneralSearchResults'
import { SectionContainer } from '@components/ui/SectionContainer/SectionContainer'
import { useTranslations } from 'next-intl'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Selection, TagGroup, TagList } from 'react-aria-components'
import { StringParam, useQueryParam, withDefault } from 'use-query-params'
import { useDebounce } from 'usehooks-ts'

// React-aria-components library recommends Selection as a type for selection state, which should behave like a Set object. However, common set methods such as .size and .values don't work on Selection, so as a workaround we transform the Selection to an array to find size and spread operator to find the first element

type SearchOption = {
  key: string
  title: string
}

const SearchPageContentNew = () => {
  const t = useTranslations()

  const [routerQueryValue] = useQueryParam('keyword', withDefault(StringParam, ''))
  const [input, setInput] = useState<string>('')
  const debouncedInput = useDebounce<string>(input, 300)
  const [searchValue, setSearchValue] = useState<string>(debouncedInput)

  useEffect(() => {
    setInput(routerQueryValue)
  }, [routerQueryValue])

  useEffect(() => {
    setSearchValue(debouncedInput)
  }, [debouncedInput])

  const options: SearchOption[] = [
    { key: 'allResults', title: t('SearchPage.allResults') },
    { key: 'pages', title: t('websites') },
    { key: 'articles', title: t('articles') },
    { key: 'inbaArticles', title: t('inbaArticles') },
    // TODO: enable when users are searchable
    // { key: 'users', title: t('organisationalStructure') },
  ]

  const defaultOptionKey = 'allResults'

  const getOptionByKey = (key: string): SearchOption | null => {
    // TODO: maybe use .find
    const filteredOptions = options.filter((option) => {
      return option.key === key
    })
    if (filteredOptions?.length > 0) return filteredOptions[0]
    return null
  }

  const [selectedOptionKey, setSelectedOptionKey] = useState<Selection>(new Set([defaultOptionKey]))
  const [currentPage, setCurrentPage] = useState(1)

  useLayoutEffect(() => {
    if (Array.from(selectedOptionKey).length === 0) {
      setSelectedOptionKey(new Set([defaultOptionKey]))
    }
  }, [selectedOptionKey])

  useLayoutEffect(() => {
    setCurrentPage(1)
  }, [searchValue, selectedOptionKey])

  const commonFilters = { search: searchValue, page: currentPage, pageSize: 10, tagIds: [] }

  return (
    <SectionContainer className="mb-8">
      <div className="flex w-full flex-col gap-y-8 pt-12 md:pt-18">
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
            defaultSelectedKeys={new Set([defaultOptionKey])}
            onSelectionChange={setSelectedOptionKey}
          >
            <TagList className="mt-4 flex flex-wrap gap-2 lg:justify-start">
              {options.map((option) => {
                return (
                  <Chip
                    className="selected:border-gray-700 selected:bg-gray-700 hover:selected:bg-gray-700"
                    variant="small"
                    key={option.key}
                    id={option.key}
                  >
                    {option.title}
                  </Chip>
                )
              })}
            </TagList>
          </TagGroup>
          <p className="mt-8">
            {t('SearchPage.showingResults', { resultsCount: 'XXXX (value hardcoded)' })}
          </p>
        </div>
        {[...selectedOptionKey][0] === 'allResults' ? (
          <div className="flex flex-col gap-8">
            {options.slice(1).map((option) => {
              return (
                <GeneralSearchResults
                  variant="basic"
                  searchOption={option}
                  filters={commonFilters}
                  handleShowMore={setSelectedOptionKey}
                />
              )
            })}
          </div>
        ) : null}
        {
          // eslint-disable-next-line unicorn/no-negated-condition
          [...selectedOptionKey][0] !== 'allResults' ? (
            <GeneralSearchResults
              variant="advanced"
              searchOption={getOptionByKey([...selectedOptionKey][0]?.toString() ?? 'allResults')}
              filters={commonFilters}
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
