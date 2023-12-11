import Chip from '@components/forms/simple-components/Chip'
import BlogPostsResults from '@components/molecules/SearchPage/BlogPostsResults'
import PagesResults from '@components/molecules/SearchPage/PagesResults'
import UsersResults from '@components/molecules/SearchPage/UsersResults'
import { AdvancedSearchNew } from '@components/molecules/SearchPageNew/AdvancedSearchNew'
import BlogPostsResultsNew from '@components/molecules/SearchPageNew/BlogPostsResultsNew'
import OnlyBlogPostsResultsNew from '@components/molecules/SearchPageNew/OnlyBlogPostsResultsNew'
import OnlyPagesResultsNew from '@components/molecules/SearchPageNew/OnlyPagesResultsNew'
import PagesResultsNew from '@components/molecules/SearchPageNew/PagesResultsNew'
import UsersResultsNew from '@components/molecules/SearchPageNew/UsersResultsNew'
import { SectionContainer } from '@components/ui/SectionContainer/SectionContainer'
import { useTranslations } from 'next-intl'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Selection, TagGroup, TagList } from 'react-aria-components'
import { StringParam, useQueryParam, withDefault } from 'use-query-params'
import { useDebounce } from 'usehooks-ts'

// React-aria-components library recommends Selection as a type for selection state, which should behave like a Set object. However, common set methods such as .size and .values don't work on Selection, so as a workaround we transform the Selection to an array to find size and spread operator to find the first element

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
    { key: 'pages', value: t('pages') },
    { key: 'articles', value: t('articles') },
    { key: 'users', value: t('organisationalStructure') },
  ]
  const defaultOption = 'allResults'

  const [selectedOption, setSelectedOption] = useState<Selection>(new Set([defaultOption]))
  const [showNewTheme, setShowNewTheme] = useState(true)

  useLayoutEffect(() => {
    if (Array.from(selectedOption).length === 0) {
      setSelectedOption(new Set([defaultOption]))
    }
  }, [selectedOption])

  const pagesFilters = { search: searchValue }
  const blogPostsFilters = { search: searchValue, page: 1, pageSize: 6 }
  const usersFilters = { search: searchValue }

  return (
    <SectionContainer className="mb-8">
      {/* FIXME: ↓ DEBUG */}
      {true && (
        <div className="fixed left-0 bg-gray-50 p-3 text-size-p-small">
          <button
            className="mb-2 w-full rounded-full border-2 bg-white p-2 hover:font-semibold"
            type="button"
            onClick={() => {
              setShowNewTheme(!showNewTheme)
            }}
          >
            {`New theme: ${showNewTheme.toString()}`}
          </button>
          <p>selectedOption: {selectedOption}</p>
          {/* <p>typeof selectedOption: {typeof selectedOption}</p>
          <p>prototype of selectedOption: {Object.prototype.toString.call(selectedOption)}</p>
          <p>selectedOption JSON: {JSON.stringify(selectedOption)}</p>
          <p>Array.from selectedOption JSON: {JSON.stringify(Array.from(selectedOption))}</p> */}
        </div>
      )}
      {/* ↑ DEBUG */}
      <div className="flex w-full flex-col gap-y-8 md:pt-18">
        {/* Vyhladavanie */}
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
            selectedKeys={selectedOption}
            defaultSelectedKeys={new Set([defaultOption])}
            onSelectionChange={setSelectedOption}
          >
            <TagList className="mt-4 flex flex-wrap gap-2 lg:justify-start">
              {options.map((option) => {
                return (
                  <Chip
                    className="selected:border-gray-700 selected:bg-gray-700 selected:text-gray-0 hover:selected:bg-gray-700"
                    variant="small"
                    key={option.key}
                    id={option.key}
                  >
                    {option.value}
                  </Chip>
                )
              })}
            </TagList>
          </TagGroup>
          <p className="mt-8">Zobrazujeme XXXXXX výsledkov</p>
        </div>
        {[...selectedOption][0] === defaultOption && showNewTheme ? (
          <div className="flex flex-col gap-8">
            <PagesResultsNew
              title={t('websites')}
              filters={pagesFilters}
              handleShowMore={() => {
                setSelectedOption(new Set(['pages']))
              }}
            />
            <BlogPostsResultsNew
              title={t('articles')}
              filters={blogPostsFilters}
              handleShowMore={() => {
                setSelectedOption(new Set(['articles']))
              }}
            />
            <UsersResultsNew
              title={t('organisationalStructure')}
              filters={usersFilters}
              handleShowMore={() => {
                setSelectedOption(new Set(['users']))
              }}
            />
          </div>
        ) : null}
        {/* {[...selectedOption][0] === defaultOption ? (
          <>
            <PagesResults filters={pagesFilters} />
            <BlogPostsResults filters={blogPostsFilters} />
            <UsersResults filters={usersFilters} />
          </>
        ) : null} */}
        {[...selectedOption][0] === 'articles' ? (
          <OnlyBlogPostsResultsNew filters={blogPostsFilters} />
        ) : null}
        {[...selectedOption][0] === 'pages' ? <OnlyPagesResultsNew filters={pagesFilters} /> : null}
        {[...selectedOption][0] === 'users' ? <UsersResults filters={usersFilters} /> : null}
      </div>
    </SectionContainer>
  )
}

export default SearchPageContentNew
