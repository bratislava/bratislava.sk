import { Typography } from '@bratislava/component-library'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'

import Badge from '@/src/components/common/Badge/Badge'
import Disclosure from '@/src/components/common/Disclosure/Disclosure'
import DisclosureGroup from '@/src/components/common/Disclosure/DisclosureGroup'
import DisclosureHeader from '@/src/components/common/Disclosure/DisclosureHeader'
import DisclosurePanel from '@/src/components/common/Disclosure/DisclosurePanel'
import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'
import LoadingSpinner from '@/src/components/common/LoadingSpinner/LoadingSpinner'
import PaginationWithInput from '@/src/components/common/Pagination/PaginationWithInput'
import SelectField, { SelectItem } from '@/src/components/common/SelectField/SelectField'
import Markdown from '@/src/components/formatting/Markdown/Markdown'
import SearchBar from '@/src/components/sections/SearchSection/SearchBar'
import { client } from '@/src/services/graphql/gql'
import {
  faqsDefaultFilters,
  getMeiliFaqsQueryKey,
  meiliFaqsFetcher,
} from '@/src/services/meili/fetchers/faqsFetcher'
import { isDefined } from '@/src/utils/isDefined'
import { useLocale } from '@/src/utils/useLocale'
import { useTranslation } from '@/src/utils/useTranslation'

/**
 * TODO Figma link
 */

const FaqsAll = () => {
  const { t } = useTranslation()
  const locale = useLocale()

  const [input, setInput] = useState('')
  const [debouncedInput] = useDebounceValue(input, 300)
  const searchRef = useRef<null | HTMLInputElement>(null)

  const [filters, setFilters] = useState(faqsDefaultFilters)

  useEffect(() => {
    setFilters((previousState) => ({ ...previousState, search: debouncedInput, page: 1 }))
  }, [debouncedInput, setFilters])

  useEffect(() => {
    searchRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [filters.page])

  //  MEILISEARCH
  const {
    data,
    isError: isMeiliError,
    error: meiliError,
    isFetching,
    isPending,
  } = useQuery({
    queryKey: getMeiliFaqsQueryKey(filters),
    queryFn: () => meiliFaqsFetcher(filters),
    placeholderData: keepPreviousData,
  })

  // FAQ CATEGORIES
  const {
    data: faqCategoriesData,
    isError: isCategoriesError,
    error: categoriesError,
  } = useQuery({
    queryKey: ['FaqCategories', locale],
    queryFn: () => client.FaqCategories({ locale }),
  })

  const defaultSelectionOption = {
    value: 'all',
    label: t('FaqsSection.selectionOptions.allFaqs'),
  }

  const options = faqCategoriesData?.faqCategories
    ? faqCategoriesData.faqCategories
        .map((category) => {
          return category?.slug && category.title
            ? { value: category.slug, label: category.title }
            : null
        })
        .filter(isDefined)
        .sort((a, b) => a.label.localeCompare(b.label))
    : []

  // Get category names
  const selectOptions = [defaultSelectionOption, ...options]

  // SELECTION
  const [selection, setSelection] = useState<string>(defaultSelectionOption.value)

  // Adjust filters after selection change
  useEffect(() => {
    setFilters((previousState) => ({
      ...previousState,
      page: 1,
      categorySlugs: selection === 'all' ? undefined : [selection],
    }))
  }, [selection, setFilters])

  return (
    <div className="flex flex-col gap-4">
      <SearchBar
        ref={searchRef}
        placeholder={t('SearchPage.enterKeyword')}
        input={input}
        setInput={setInput}
        setSearchQuery={(value) => {
          setFilters((previousState) => ({ ...previousState, search: value, page: 1 }))
        }}
        isLoading={isFetching}
      />
      <SelectField
        value={selection}
        items={selectOptions}
        onChange={(value) => setSelection(value as string)}
        placeholder={t('FaqSectionAll.selectionOptions.aria')}
        aria-label={t('FaqSectionAll.selectionOptions.aria')}
        className="max-w-100"
      >
        {(item) => <SelectItem label={item.label} id={item.value} textValue={item.label} />}
      </SelectField>

      {isMeiliError ? <Typography variant="p-default">{meiliError.message}</Typography> : null}
      {isCategoriesError ? (
        <Typography variant="p-default">{categoriesError.message}</Typography>
      ) : null}

      {isPending ? (
        <LoadingSpinner />
      ) : (
        <Fragment>
          {data?.hits.length ? (
            <DisclosureGroup className="rounded-xl border border-border-active-default bg-background-passive-base py-2">
              {data.hits.filter(isDefined).map((faq, index) => {
                return (
                  <Fragment key={faq.documentId}>
                    {index > 0 ? <HorizontalDivider className="mx-4 lg:mx-6" /> : null}
                    <Disclosure id={`disclosure-faq-${faq.documentId}`}>
                      <DisclosureHeader className="p-4 ring-inset lg:px-6">
                        <Badge label={faq.faqCategory?.title} />
                        <Typography variant="h4">{faq.title}</Typography>
                      </DisclosureHeader>
                      <DisclosurePanel className="px-4 lg:px-6">
                        <Markdown content={faq.body} variant="small" />
                      </DisclosurePanel>
                    </Disclosure>
                  </Fragment>
                )
              })}
            </DisclosureGroup>
          ) : (
            <Typography>{t('ArticlesAll.noResults')}</Typography>
          )}

          {data?.estimatedTotalHits && data.limit && data.estimatedTotalHits > data.limit ? (
            <div className="flex justify-center">
              <PaginationWithInput
                key={filters.search}
                totalCount={Math.ceil(data.estimatedTotalHits / filters.pageSize)}
                currentPage={filters.page}
                onPageChange={(page) =>
                  setFilters((prevState) => {
                    return { ...prevState, page }
                  })
                }
              />
            </div>
          ) : null}
        </Fragment>
      )}
    </div>
  )
}

export default FaqsAll
