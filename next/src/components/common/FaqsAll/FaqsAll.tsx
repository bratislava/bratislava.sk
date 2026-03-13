import { Typography } from '@bratislava/component-library'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { Fragment, useEffect, useRef, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'

import Badge from '@/src/components/common/Badge/Badge'
import Disclosure from '@/src/components/common/Disclosure/Disclosure'
import DisclosureGroup from '@/src/components/common/Disclosure/DisclosureGroup'
import DisclosureHeader from '@/src/components/common/Disclosure/DisclosureHeader'
import DisclosurePanel from '@/src/components/common/Disclosure/DisclosurePanel'
import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'
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

  const {
    data,
    isError: isMeiliError,
    error: meiliError,
    isPending,
  } = useQuery({
    queryKey: getMeiliFaqsQueryKey(filters),
    queryFn: () => meiliFaqsFetcher(filters),
    placeholderData: keepPreviousData,
  })

  const { data: faqCategoriesData } = useQuery({
    queryKey: ['FaqCategories', locale],
    queryFn: () => client.FaqCategories({ locale }),
    select: (res) => res.faqCategories.filter(isDefined) ?? [],
    staleTime: Infinity,
  })

  const selectOptions = [
    {
      slug: 'all',
      title: t('FaqsSection.selectionOptions.allFaqs'),
    },
    ...(faqCategoriesData ?? []),
  ]

  const [selection, setSelection] = useState<string>(selectOptions[0].slug)

  useEffect(() => {
    setFilters((previousState) => ({
      ...previousState,
      page: 1,
      faqCategorySlugs: selection === 'all' ? [] : [selection],
    }))
  }, [selection, setFilters])

  if (isMeiliError) {
    return (
      <Typography variant="p-default">
        {t('common.error')}: {meiliError.message}
      </Typography>
    )
  }

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
        isLoading={isPending}
      />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <SelectField
          value={selection}
          items={selectOptions}
          onChange={(value) => setSelection(value as string)}
          placeholder={t('FaqsSection.selectionOptions.aria')}
          aria-label={t('FaqsSection.selectionOptions.aria')}
        >
          {(item) => <SelectItem label={item.title} id={item.slug} textValue={item.title} />}
        </SelectField>
      </div>

      {data?.hits.length ? (
        <DisclosureGroup className="rounded-xl border border-border-active-default bg-background-passive-base py-2">
          {data.hits.filter(isDefined).map((faq, index) => {
            return (
              <Fragment key={faq.documentId}>
                {index > 0 ? <HorizontalDivider className="mx-4 lg:mx-6" /> : null}
                <Disclosure id={`disclosure-faq-${faq.documentId}`}>
                  <DisclosureHeader className="p-4 ring-inset lg:px-6">
                    {faq.faqCategory?.title && <Badge label={faq.faqCategory.title} />}
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

      {data?.estimatedTotalHits ? (
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
    </div>
  )
}

export default FaqsAll
