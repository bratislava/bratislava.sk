import { AdvancedSearchNew } from '@components/molecules/SearchPageNew/AdvancedSearchNew'
import BlogPostsResultsNew from '@components/molecules/SearchPageNew/BlogPostsResultsNew'
import PagesResultsNew from '@components/molecules/SearchPageNew/PagesResultsNew'
import UsersResultsNew from '@components/molecules/SearchPageNew/UsersResultsNew'
import { SectionContainer } from '@components/ui/SectionContainer/SectionContainer'
import { useTranslations } from 'next-intl'
import React, { useEffect, useState } from 'react'
import { StringParam, useQueryParam, withDefault } from 'use-query-params'
import { useDebounce } from 'usehooks-ts'

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

  const options = [
    { key: 'allResults', value: 'Všetky výsledky' },
    { key: 'articles', value: t('articles') },
    { key: 'pages', value: t('pages') },
    { key: 'users', value: t('organisationalStructure') },
  ]
  const defaultOption = options[0].key

  const [selectedOption, setselectedOption] = useState(defaultOption)

  const pagesFilters = { search: searchValue }
  const blogPostsFilters = { search: searchValue, page: 1, pageSize: 6 }
  const usersFilters = { search: searchValue }

  return (
    <SectionContainer className="mb-8">
      <div className="flex w-full flex-col gap-y-14 pt-14 md:pt-18 lg:gap-y-20">
        <div>
          <AdvancedSearchNew
            placeholder={t('enterKeyword')}
            title={t('searching')}
            options={options}
            selectedOption={selectedOption}
            defaultOption={defaultOption}
            setselectedOption={setselectedOption}
            input={input}
            setInput={setInput}
            setSearchQuery={setSearchValue}
          />
          {/* DEBUG */}
          {true &&
          <div>
          <p className="ml-[-10px] font-semibold">from SearchPageContent</p>
          <p>selectedOption: {JSON.stringify(selectedOption)}</p>
          <p>input: {input}</p>
          <p>debouncedInput: {debouncedInput}</p>
          <p>searchValue: {searchValue}</p>
          </div>}
        </div>
        {selectedOption === 'articles' ? <BlogPostsResultsNew filters={blogPostsFilters} /> : null}
        {selectedOption === 'pages' ? <PagesResultsNew filters={pagesFilters} /> : null}
        {selectedOption === 'users' ? <UsersResultsNew filters={usersFilters} /> : null}
      </div>
    </SectionContainer>
  )
}

export default SearchPageContentNew
