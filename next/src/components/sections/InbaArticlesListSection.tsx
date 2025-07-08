import { Typography } from '@bratislava/component-library'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import React, { useEffect, useRef, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'

import ArticleCard from '@/src/components/cards/ArticleCard'
import { transformInbaArticleProps } from '@/src/components/cards/transformInbaArticleProps'
import LoadingSpinner from '@/src/components/common/LoadingSpinner/LoadingSpinner'
import Pagination from '@/src/components/common/Pagination/Pagination'
import SelectField, { SelectOption } from '@/src/components/common/Select/Select'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import SearchBar from '@/src/components/sections/SearchSection/SearchBar'
import { InbaArticlesListSectionFragment } from '@/src/services/graphql'
import { client } from '@/src/services/graphql/gql'
import {
  getInbaArticlesQueryKey,
  inbaArticlesDefaultFilters,
  inbaArticlesFetcher,
} from '@/src/services/meili/fetchers/inbaArticlesFetcher'
import { isDefined } from '@/src/utils/isDefined'
import { useLocale } from '@/src/utils/useLocale'
import { useRoutePreservedState } from '@/src/utils/useRoutePreservedState'

type Props = {
  section: InbaArticlesListSectionFragment
}

/**
 * TODO Figma link
 */

const InbaArticlesListSection = ({ section }: Props) => {
  const { t } = useTranslation()
  const locale = useLocale()

  const { title, text } = section

  const [input, setInput] = useState('')
  const [debouncedInput] = useDebounceValue(input, 300)
  const searchRef = useRef<null | HTMLInputElement>(null)

  const [filters, setFilters] = useRoutePreservedState(inbaArticlesDefaultFilters)

  useEffect(() => {
    searchRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [filters.page, filters.pageSize])

  useEffect(() => {
    setFilters((previousState) => ({ ...previousState, search: debouncedInput, page: 1 }))
  }, [debouncedInput, setFilters])

  // TAGS
  const { data: tagData } = useQuery({
    queryKey: ['InbaTags', locale],
    queryFn: () => client.InbaTags({ locale }),
    staleTime: Infinity,
  })

  const defaultSelectionOption: SelectOption = {
    value: 'all',
    label: t('InbaArticlesListSection.selectionOptions.allTags'),
  }

  // Get tag names
  const selectOptions: SelectOption[] = [
    defaultSelectionOption,
    ...(
      tagData?.inbaTags?.data
        .map((tag) => {
          if (!tag.attributes || !tag.id) return null

          return {
            value: tag.id,
            label: tag.attributes.title,
          }
        })
        .filter(isDefined) ?? []
    ).sort((a, b) => a.label.localeCompare(b.label)),
  ]

  const selectOptionsMap = new Map(selectOptions.map((option) => [option.value, option]))

  // SELECTION

  const [selection, setSelection] = useState<string>(defaultSelectionOption.value)

  const handleSelectChange = (selectedOption: SelectOption | null) => {
    setSelection(selectedOption?.value ?? defaultSelectionOption.value)
  }

  // Extract URL query params
  // const [routerQueryCategoryValue] = useQueryParam(
  //   'documentCategory',
  //   withDefault(StringParam, 'all'),
  // )
  //
  // useEffect(() => {
  //   setSelection(routerQueryCategoryValue)
  // }, [routerQueryCategoryValue])

  // Adjust filters after selection change
  useEffect(() => {
    setFilters((previousState) => ({
      ...previousState,
      page: 1,
      tagIds: selection === 'all' ? [] : [selection],
    }))
  }, [selection, setFilters])

  // TODO prefetch section
  const { data, isPending, isError, error, isFetching } = useQuery({
    queryKey: getInbaArticlesQueryKey(filters, locale),
    queryFn: () => inbaArticlesFetcher(filters, locale),
    placeholderData: keepPreviousData,
  })

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page })
  }

  return (
    <SectionContainer>
      <div className="flex flex-col gap-8">
        <SectionHeader title={title} text={text} />

        <div className="flex flex-col gap-4">
          <SearchBar
            ref={searchRef}
            input={input}
            setInput={setInput}
            setSearchQuery={(value) =>
              setFilters((previousState) => ({ ...previousState, search: value, page: 1 }))
            }
            isLoading={isFetching}
          />

          <div className="grid gap-8 lg:grid-cols-3">
            <SelectField
              value={selectOptionsMap.get(selection) ?? defaultSelectionOption}
              options={selectOptions}
              onChange={handleSelectChange}
              placeholder={t('InbaArticlesListSection.selectionOptions.aria')}
              aria-label={t('InbaArticlesListSection.selectionOptions.aria')}
              className="max-w-100"
            />
          </div>
        </div>

        {isError ? (
          <Typography variant="p-default">{error.message}</Typography>
        ) : isPending ? (
          <LoadingSpinner />
        ) : (
          <div>
            <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {data?.hits.map((card) => {
                return card.attributes ? (
                  <li key={card.attributes.slug}>
                    <ArticleCard {...transformInbaArticleProps(card.attributes)} />
                  </li>
                ) : null
              })}
            </ul>

            {data?.estimatedTotalHits ? (
              <Pagination
                key={filters.search}
                totalCount={Math.ceil(data.estimatedTotalHits / filters.pageSize)}
                currentPage={filters.page}
                onPageChange={handlePageChange}
              />
            ) : (
              <Typography>{t('SearchPage.noResults')}</Typography>
            )}
          </div>
        )}
      </div>
    </SectionContainer>
  )
}

export default InbaArticlesListSection
