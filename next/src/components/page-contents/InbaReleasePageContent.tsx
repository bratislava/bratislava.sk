import { Typography } from '@bratislava/component-library'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import * as React from 'react'
import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'

import { Breadcrumb } from '@/src/components/common/Breadcrumbs/Breadcrumbs'
import Button from '@/src/components/common/Button/Button'
import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'
import FileList from '@/src/components/common/FileList/FileList'
import ImagePlaceholder from '@/src/components/common/Image/ImagePlaceholder'
import StrapiImage from '@/src/components/common/Image/StrapiImage'
import LoadingSpinner from '@/src/components/common/LoadingSpinner/LoadingSpinner'
import PageHeader from '@/src/components/common/PageHeader/PageHeader'
import Pagination from '@/src/components/common/Pagination/Pagination'
import Markdown from '@/src/components/formatting/Markdown/Markdown'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import { useGeneralContext } from '@/src/components/providers/GeneralContextProvider'
import SearchBar from '@/src/components/sections/SearchSection/SearchBar'
import SearchResultCard from '@/src/components/sections/SearchSection/SearchResultCard'
import { SearchResult } from '@/src/components/sections/SearchSection/useQueryBySearchOption'
import ShareButtons from '@/src/components/sections/ShareButtons_Deprecated'
import { InbaReleaseEntityFragment } from '@/src/services/graphql'
import {
  getInbaArticlesQueryKey,
  inbaArticlesDefaultFilters,
  inbaArticlesFetcher,
} from '@/src/services/meili/fetchers/inbaArticlesFetcher'
import { formatDate } from '@/src/utils/formatDate'
import { isDefined } from '@/src/utils/isDefined'
import { getPageBreadcrumbs } from '@/src/utils/pageUtils_Deprecated'
import { useLocale } from '@/src/utils/useLocale'
import { useRoutePreservedState } from '@/src/utils/useRoutePreservedState'
import { useTranslation } from '@/src/utils/useTranslation'

type Props = {
  inbaRelease: InbaReleaseEntityFragment
}

/**
 * Figma: https://www.figma.com/design/A9aoQH2FGhR1D14wvvk6FW/Mestsk%C3%BD-web--bratislava.sk-?node-id=2452-2134&m=dev
 */

const InbaReleasePageContent = ({ inbaRelease }: Props) => {
  const { t } = useTranslation()
  const locale = useLocale()

  const { title, coverImage, perex, releaseDate, files } = inbaRelease

  const { general } = useGeneralContext()
  const parentBreadcrumbPageEntity = general?.inbaReleasesPage

  const breadcrumbs = useMemo(() => {
    return [
      ...(parentBreadcrumbPageEntity ? getPageBreadcrumbs(parentBreadcrumbPageEntity) : []),
      { title, path: null } as Breadcrumb,
    ]
  }, [parentBreadcrumbPageEntity, title])

  const [filters, setFilters] = useRoutePreservedState({
    ...inbaArticlesDefaultFilters,
    releaseDocumentIds: [inbaRelease.documentId],
  })
  const [input, setInput] = useState('')
  const [debouncedInput] = useDebounceValue(input, 300)
  const searchRef = useRef<null | HTMLInputElement>(null)

  const { data, isPending, isError, error, isFetching } = useQuery({
    queryKey: getInbaArticlesQueryKey(filters, locale),
    queryFn: () => inbaArticlesFetcher(filters, locale),
    placeholderData: keepPreviousData,
  })

  useEffect(() => {
    searchRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [filters.page, filters.pageSize])

  useEffect(() => {
    setFilters((previousState) => ({ ...previousState, search: debouncedInput, page: 1 }))
  }, [debouncedInput, setFilters])

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page })
  }

  return (
    <>
      <PageHeader
        title={title}
        breadcrumbs={breadcrumbs}
        subtext={releaseDate && t('InbaRelease.releasedOn', { date: formatDate(releaseDate) })}
        hasWaves={false}
      />

      <SectionContainer className="pt-10 md:pt-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[592fr_488fr] lg:gap-34">
          <div className="flex w-full flex-col gap-12">
            <div className="flex w-full flex-col gap-8">
              {perex ? (
                <div className="flex flex-col gap-4">
                  <Typography variant="h3" as="h2">
                    {t('InbaRelease.inThisRelease')}
                  </Typography>
                  {/* Perex comes as plain text from Strapi, but we format it using Markdown component */}
                  <Markdown content={perex} />
                </div>
              ) : null}

              <Button href="#clanky-v-tomto-cisle" variant="link">
                {t('InbaRelease.articlesInThisRelease')}
              </Button>
            </div>

            <div className="flex flex-col gap-4">
              <Typography variant="h3" as="h2">
                {t('InbaRelease.toDownload')}
              </Typography>

              <FileList files={files?.filter(isDefined) ?? []} />
            </div>
          </div>

          <div
            // Negative top margin was set so its top edge is aligned with title's top edge
            className="aspect-inba overflow-hidden rounded-xl border lg:-mt-45"
          >
            {coverImage ? <StrapiImage alt="" image={coverImage} /> : <ImagePlaceholder />}
          </div>
        </div>
      </SectionContainer>

      {isError ? (
        <Typography variant="p-default">{error.message}</Typography>
      ) : isPending ? (
        <LoadingSpinner />
      ) : (
        <SectionContainer className="pt-10 md:pt-18">
          <div className="flex flex-col gap-5 lg:gap-6">
            <Typography variant="h3" as="h2" id="clanky-v-tomto-cisle">
              {t('InbaRelease.articlesInThisRelease')}
            </Typography>

            <SearchBar
              ref={searchRef}
              input={input}
              setInput={setInput}
              setSearchQuery={(value) => {
                setFilters((previousState) => ({ ...previousState, search: value, page: 1 }))
              }}
              isLoading={isFetching}
            />

            {data.hits.length > 0 ? (
              <ul className="flex flex-col rounded-lg border py-2">
                {data.hits.map((article, index) => {
                  const cardData: SearchResult = {
                    title: article.title,
                    uniqueId: article.slug,
                    linkHref: `/inba/clanky/${article.slug}`,
                    coverImageSrc: article.coverImage?.url,
                    metadata: [article.inbaTag?.title].filter(isDefined),
                  }

                  return (
                    <Fragment key={article.slug}>
                      {index > 0 ? <HorizontalDivider asListItem className="mx-4 lg:mx-5" /> : null}
                      <li>
                        <SearchResultCard data={cardData} />
                      </li>
                    </Fragment>
                  )
                })}
              </ul>
            ) : null}

            {data.estimatedTotalHits ? (
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
        </SectionContainer>
      )}

      <SectionContainer className="pt-10 pb-8 md:pt-18">
        <ShareButtons twitterTitle={title} />
      </SectionContainer>
    </>
  )
}

export default InbaReleasePageContent
