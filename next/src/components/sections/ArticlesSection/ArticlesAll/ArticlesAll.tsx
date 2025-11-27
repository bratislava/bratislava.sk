import { Typography } from '@bratislava/component-library'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'

import { FilterIcon } from '@/src/assets/icons'
import ArticleRowCard from '@/src/components/cards/ArticleRowCard'
import Button from '@/src/components/common/Button/Button'
import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'
import PaginationWithInput from '@/src/components/common/Pagination/PaginationWithInput'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import ArticlesActiveFilters from '@/src/components/sections/ArticlesSection/ArticlesAll/ArticlesActiveFilters'
import ArticlesCheckboxFilters from '@/src/components/sections/ArticlesSection/ArticlesAll/ArticlesCheckboxFilters'
import ArticlesCheckboxFiltersModal from '@/src/components/sections/ArticlesSection/ArticlesAll/ArticlesCheckboxFiltersModal'
import { useArticlesFilters } from '@/src/components/sections/ArticlesSection/ArticlesAll/useArticlesFilters'
import SearchBar from '@/src/components/sections/SearchSection/SearchBar'
import { ArticlesSectionFragment } from '@/src/services/graphql'
import {
  articlesFetcher,
  ArticlesFilters,
  getArticlesQueryKey,
} from '@/src/services/meili/fetchers/articlesFetcher'
import { formatDate } from '@/src/utils/formatDate'
import { generateImageSizes } from '@/src/utils/generateImageSizes'
import { getLinkProps } from '@/src/utils/getLinkProps'
import { isDefined } from '@/src/utils/isDefined'
import { useLocale } from '@/src/utils/useLocale'
import { useTranslation } from '@/src/utils/useTranslation'

type Props = {
  section: ArticlesSectionFragment
}

const imageSizes = generateImageSizes({ default: '50vw', md: '33vw' })

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=18995-28122&m=dev
 */

const ArticlesAll = ({ section }: Props) => {
  const { t } = useTranslation()
  const locale = useLocale()

  const { title, text } = section

  const { filters, setFilters, setSearch, setPage } = useArticlesFilters()

  const [input, setInput] = useState('')
  const [debouncedInput] = useDebounceValue(input, 300)

  const handleFiltersChange = (newFilters: ArticlesFilters) => {
    setFilters({ ...newFilters, page: 1 })
  }

  useEffect(() => {
    setSearch(debouncedInput)
  }, [debouncedInput, setSearch])

  const { data, isPending } = useQuery({
    queryKey: getArticlesQueryKey(filters, locale),
    queryFn: () => articlesFetcher(filters, locale),
    placeholderData: keepPreviousData,
  })

  const searchRef = useRef<null | HTMLInputElement>(null)

  useEffect(() => {
    searchRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [filters.page, filters.pageSize])

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-6">
        <SectionHeader title={title} text={text} />
        <SearchBar
          ref={searchRef}
          placeholder={t('SearchPage.enterKeyword')}
          input={input}
          setInput={setInput}
          setSearchQuery={setSearch}
          isLoading={isPending}
        />
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
        {/* Screen: desktop */}
        <div className="w-100 shrink-0 max-lg:hidden">
          <ArticlesCheckboxFilters filters={filters} onFiltersChange={handleFiltersChange} />
        </div>
        {/* Screen: mobile */}
        <div className="lg:hidden">
          <ArticlesCheckboxFiltersModal
            filters={filters}
            onFiltersChange={handleFiltersChange}
            triggerButton={
              <Button variant="outline" startIcon={<FilterIcon />} fullWidth>
                {t(`ArticlesCheckboxFiltersModal.title`)}
              </Button>
            }
          />
        </div>
        <div className="flex grow flex-col gap-6">
          <ArticlesActiveFilters
            filters={filters}
            setFilters={setFilters}
            currentResultsCount={data?.hits.length ?? 0}
            totalCount={data?.estimatedTotalHits ?? 0}
          />
          {data?.hits?.length ? (
            <ul className="flex flex-col">
              {data.hits.map((article, index) => {
                const metadata = [
                  formatDate(article.addedAt),
                  article.articleCategory?.title,
                ].filter(isDefined)

                return (
                  <Fragment key={article.documentId}>
                    {index > 0 && <HorizontalDivider asListItem />}
                    <li className="py-4 first:pt-0">
                      <ArticleRowCard
                        title={article.title}
                        imgSrc={article.coverMedia?.url}
                        imgSizes={imageSizes}
                        metadata={metadata}
                        linkProps={getLinkProps({ article })}
                      />
                    </li>
                  </Fragment>
                )
              })}
            </ul>
          ) : (
            <Typography>{t('ArticlesAll.noResults')}</Typography>
          )}

          {data?.estimatedTotalHits ? (
            <div className="flex justify-center">
              <PaginationWithInput
                key={filters.search}
                totalCount={Math.ceil(data.estimatedTotalHits / filters.pageSize)}
                currentPage={filters.page}
                onPageChange={setPage}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default ArticlesAll
