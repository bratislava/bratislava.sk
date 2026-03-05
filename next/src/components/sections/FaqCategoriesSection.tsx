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
import { SelectOption } from '@/src/components/common/Select/Select'
import SelectField, { SelectItem } from '@/src/components/common/SelectField/SelectField'
// import FaqsGroup from '@/src/components/common/FaqsGroup/FaqsGroup'
import Markdown from '@/src/components/formatting/Markdown/Markdown'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import SectionHeader from '@/src/components/layouts/SectionHeader'
// import { useArticlesFilters } from '@/src/components/sections/ArticlesSection/ArticlesAll/useArticlesFilters'
import SearchBar from '@/src/components/sections/SearchSection/SearchBar'
import { FaqCategoriesSectionFragment } from '@/src/services/graphql'
// import { client } from '@/src/services/graphql/gql'
import {
  faqsDefaultFilters,
  getMeiliFaqsQueryKey,
  meiliFaqsFetcher,
} from '@/src/services/meili/fetchers/faqsFetcher'
import { isDefined } from '@/src/utils/isDefined'
// import { useLocale } from '@/src/utils/useLocale'
import { useTranslation } from '@/src/utils/useTranslation'

type Props = {
  section: FaqCategoriesSectionFragment
}

/**
 * TODO Figma link
 */

const FaqCategoriesSection = ({ section }: Props) => {
  const { t } = useTranslation()
  // const locale = useLocale()
  // const locale = i18n.language
  const { title: sectionTitle, text, faqCategories } = section ?? {}

  console.log('SECTIONS', faqCategories)

  const [input, setInput] = useState('')
  const [debouncedInput] = useDebounceValue(input, 300)
  const searchRef = useRef<null | HTMLInputElement>(null)

  const [filters, setFilters] = useState(faqsDefaultFilters)

  useEffect(() => {
    setFilters((previousState) => ({ ...previousState, search: debouncedInput, page: 1 }))
  }, [debouncedInput, setFilters])

  const { data, isError, error, isFetching, isPending } = useQuery({
    queryKey: getMeiliFaqsQueryKey(filters),
    queryFn: () => meiliFaqsFetcher(filters),
    placeholderData: keepPreviousData,
  })

  useEffect(() => {
    searchRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [filters.page])

  // FAQ CATEGORIES

  // const { data: faqCategoriesData, error: categoriesError } = useQuery({
  //   queryKey: ['FaqCategories', locale],
  //   queryFn: () => client.FaqCategories({ locale }),
  // })

  const defaultSelectionOption: SelectOption = {
    value: 'all',
    label: t('FaqsSection.selectionOptions.allFaqs'),
  }

  const options = faqCategories
    .map((category) => {
      return category?.slug && category.title
        ? { value: category.slug, label: category.title }
        : null
    })
    .filter(isDefined)
    .sort((a, b) => a.label.localeCompare(b.label))

  // Get category names
  const selectOptions: SelectOption[] = [defaultSelectionOption, ...options]
  // const selectOptionsMap = new Map(selectOptions.map((option) => [option.value, option]))

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
    <SectionContainer>
      <div className="flex flex-col gap-6 lg:gap-12">
        <SectionHeader title={sectionTitle} text={text} />
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
          // value={selectOptionsMap.get(selection) ?? defaultSelectionOption}
          value={selection}
          items={selectOptions}
          onChange={(value) => setSelection(value as string)}
          placeholder={t('FaqSectionAll.selectionOptions.aria')}
          aria-label={t('FaqSectionAll.selectionOptions.aria')}
          className="max-w-100"
        >
          {(item) => <SelectItem label={item.label} id={item.value} textValue={item.label} />}
        </SelectField>

        {isError ? (
          <Typography variant="p-default">{error.message}</Typography>
        ) : isPending ? (
          <LoadingSpinner />
        ) : (
          <Fragment>
            {data?.hits?.length ? (
              <DisclosureGroup className="rounded-xl border border-border-active-default bg-background-passive-base py-2">
                {data?.hits.filter(isDefined).map((faq, index) => {
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

                  // TODO: remove FaqsGroup
                  // return (
                  //   <div key={slug} className="flex flex-col gap-8 lg:gap-10">
                  //     <Typography variant="h3">{title}</Typography>
                  //     <FaqsGroup faqs={faqs} />
                  //   </div>
                  // )
                })}
              </DisclosureGroup>
            ) : (
              <Typography>{t('ArticlesAll.noResults')}</Typography>
            )}

            {data.estimatedTotalHits && data.limit && data.estimatedTotalHits > data.limit ? (
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
    </SectionContainer>
  )
}

export default FaqCategoriesSection
