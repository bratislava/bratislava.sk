import BlogPostsResults from '@components/molecules/SearchPage/BlogPostsResults'
import PagesResults from '@components/molecules/SearchPage/PagesResults'
import UsersResults from '@components/molecules/SearchPage/UsersResults'
import { AdvancedSearch, SectionContainer } from '@components/ui'
import { useTranslations } from 'next-intl'

import React, { useEffect, useState } from 'react'
import { StringParam, useQueryParam, withDefault } from 'use-query-params'
import { useDebounce } from 'usehooks-ts'

const SearchPageContent = () => {
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

  const defaultOptions = [
    { key: 'articles', value: t('articles') },
    { key: 'pages', value: t('pages') },
  ]
  const [checkedOptions, setCheckedOptions] = useState(defaultOptions)

  const blogPostsSelected = checkedOptions.some(({ key }) => key === 'articles')
  const pagesSelected = checkedOptions.some(({ key }) => key === 'pages')
  const usersSelected = checkedOptions.some(({ key }) => key === 'users')

  const pagesFilters = { search: searchValue }
  const blogPostsFilters = { search: searchValue, page: 1, pageSize: 6 }
  const usersFilters = { search: searchValue }

  return (
    <SectionContainer>
      <div className="flex w-full flex-col gap-y-14 pt-14 md:pt-18 lg:gap-y-20">
        <AdvancedSearch
          placeholder={t('enterKeyword')}
          title={t('searching')}
          buttonText={t('search')}
          checkedOptions={checkedOptions}
          handleSelect={setCheckedOptions}
          input={input}
          setInput={setInput}
          setSearchQuery={setSearchValue}
        />

        {blogPostsSelected && <BlogPostsResults filters={blogPostsFilters} />}
        {pagesSelected && <PagesResults filters={pagesFilters} />}
        {usersSelected && <UsersResults filters={usersFilters} />}
      </div>
    </SectionContainer>
  )
}

export default SearchPageContent
