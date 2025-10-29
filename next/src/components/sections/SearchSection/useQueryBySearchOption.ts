import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { ReactNode } from 'react'

import { SearchOption } from '@/src/components/sections/SearchSection/GlobalSearchSectionContent'
import {
  getOfficialBoardListQueryKey,
  officialBoardListFetcher,
  OfficialBoardListFilters,
} from '@/src/services/ginis/fetchers/officialBoardListFetcher'
import { Enum_Page_Pagecolor, Enum_Pagecategory_Color } from '@/src/services/graphql'
import {
  articlesFetcher,
  ArticlesFilters,
  getArticlesQueryKey,
} from '@/src/services/meili/fetchers/articlesFetcher'
import {
  documentsFetcher,
  getDocumentsQueryKey,
} from '@/src/services/meili/fetchers/documentsFetcher'
import {
  getInbaArticlesQueryKey,
  inbaArticlesFetcher,
  InbaArticlesFilters,
} from '@/src/services/meili/fetchers/inbaArticlesFetcher'
import {
  getPagesQueryKey,
  pagesFetcherUseQuery,
  PagesFilters,
} from '@/src/services/meili/fetchers/pagesFetcher'
import {
  getRegulationsQueryKey,
  RegulationFilters,
  regulationsFetcher,
} from '@/src/services/meili/fetchers/regulationsFetcher'
import { PageMeili } from '@/src/services/meili/types'
import {
  getMsGraphSearchQueryKey,
  msGraphSearchFetcher,
} from '@/src/services/ms-graph/fetchers/msGraphSearch.fetcher'
import { base64Encode } from '@/src/utils/base64'
import { formatDate } from '@/src/utils/formatDate'
import { isDefined } from '@/src/utils/isDefined'
import { useLocale } from '@/src/utils/useLocale'
import { useRegulationCategoryTranslationMap } from '@/src/utils/useRegulationCategoryTranslationMap'
import { useTranslation } from '@/src/utils/useTranslation'

export type SearchFilters =
  | PagesFilters
  | ArticlesFilters
  | InbaArticlesFilters
  | RegulationFilters
  | OfficialBoardListFilters

export type SearchResult = {
  title: string | null | undefined
  uniqueId?: string | null | undefined
  linkHref?: string | null | undefined
  metadata?: (string | null | undefined)[]
  coverImageSrc?: string | null | undefined
  pageColor?: Enum_Page_Pagecolor | Enum_Pagecategory_Color | null
  customIconName?: string
  customIcon?: ReactNode
}

export const useQueryBySearchOption = ({
  optionKey,
  filters,
}: {
  optionKey: SearchOption['id']
  filters: SearchFilters
  // eslint-disable-next-line sonarjs/cognitive-complexity
}) => {
  const { t } = useTranslation()
  const locale = useLocale()

  const pagesQuery = useQuery({
    queryKey: getPagesQueryKey(filters, locale),
    queryFn: () => pagesFetcherUseQuery(filters, locale),
    placeholderData: keepPreviousData,
    select: (data) => {
      const formattedData: SearchResult[] =
        data?.hits.map((page: PageMeili): SearchResult => {
          return {
            title: page.title,
            uniqueId: page.slug,
            linkHref: `/${page.slug}`,
            metadata: [`/${page.slug}`, formatDate(page.publishedAt)],
            pageColor: page.pageColor,
          }
        }) ?? []

      return { searchResultsData: formattedData, searchResultsCount: data?.estimatedTotalHits ?? 0 }
    },
  })

  const articlesQuery = useQuery({
    queryKey: getArticlesQueryKey(filters, locale),
    queryFn: () => articlesFetcher(filters, locale),
    placeholderData: keepPreviousData,
    select: (data) => {
      const formattedData: SearchResult[] =
        data?.hits?.map((article) => {
          return {
            title: article.title,
            uniqueId: article.slug,
            linkHref: `/spravy/${article.slug}`,
            metadata: [article.articleCategory?.title, formatDate(article.addedAt)].filter(
              isDefined,
            ),
            coverImageSrc: article.coverMedia?.url,
          }
        }) ?? []

      return { searchResultsData: formattedData, searchResultsCount: data?.estimatedTotalHits ?? 0 }
    },
  })

  const documentsQuery = useQuery({
    queryKey: getDocumentsQueryKey(filters),
    queryFn: () => documentsFetcher(filters),
    placeholderData: keepPreviousData,
    select: (data) => {
      const formattedData: SearchResult[] =
        data?.hits?.map((document) => {
          return {
            title: document.title,
            uniqueId: document.slug,
            linkHref: `/dokumenty/${document.slug}`,
            metadata: [document.documentCategory?.title, formatDate(document.updatedAt)],
            customIconName: 'search_result_official_board',
          }
        }) ?? []

      return { searchResultsData: formattedData, searchResultsCount: data?.estimatedTotalHits ?? 0 }
    },
  })

  const inbaArticlesQuery = useQuery({
    queryKey: getInbaArticlesQueryKey(filters, locale),
    queryFn: () => inbaArticlesFetcher(filters, locale),
    placeholderData: keepPreviousData,
    select: (data) => {
      const formattedData: SearchResult[] =
        data?.hits?.map((inbaArticle) => {
          return {
            title: inbaArticle.title,
            uniqueId: inbaArticle.slug,
            linkHref: `/inba/clanky/${inbaArticle.slug}`,
            metadata: [inbaArticle.inbaTag?.title, formatDate(inbaArticle.publishedAt)],
            coverImageSrc: inbaArticle.coverImage?.url,
          }
        }) ?? []

      return { searchResultsData: formattedData, searchResultsCount: data?.estimatedTotalHits ?? 0 }
    },
  })

  const regulationCategoryTranslationMap = useRegulationCategoryTranslationMap()

  const regulationsQuery = useQuery({
    queryKey: getRegulationsQueryKey(filters),
    queryFn: () => regulationsFetcher(filters),
    placeholderData: keepPreviousData,
    select: (data) => {
      const formattedData: SearchResult[] =
        data?.hits?.map((regulation) => {
          const categoryDisplayName = isDefined(regulation.category)
            ? regulationCategoryTranslationMap[regulation.category]
            : null

          // we want to see, whether this regulation is amending any cancelled regulations, because in that case, this regulation is also cancelled
          const cancelledAmendees =
            regulation.amending?.filter(
              (amendee) => isDefined(amendee) && isDefined(amendee.cancellation),
            ) ?? []
          const isCancelled = cancelledAmendees.length > 0 || isDefined(regulation.cancellation)

          const effectivityStatus = isCancelled
            ? t('Regulation.validity.cancelled')
            : t('Regulation.validity.valid')
          const effectiveFrom = formatDate(regulation.effectiveFrom)
          const effectiveUntil = formatDate(
            regulation.cancellation?.effectiveFrom ??
              cancelledAmendees[0]?.cancellation?.effectiveFrom,
          )

          const effectivityMessage = `${effectivityStatus} (${
            isCancelled ? '' : `${t('Regulation.validity.since')} `
            // eslint-disable-next-line sonarjs/no-nested-template-literals
          }${effectiveFrom}${isCancelled ? ` – ${effectiveUntil}` : ''})`

          return {
            title: `VZN ${regulation.regNumber} ${regulation.titleText ?? ''}`,
            uniqueId: regulation.slug,
            linkHref: `/vzn/${regulation.slug}`,
            metadata: [categoryDisplayName, effectivityMessage],
            customIconName: `regulation_${regulation.category ?? 'ostatne'}`,
          }
        }) ?? []

      return { searchResultsData: formattedData, searchResultsCount: data?.estimatedTotalHits ?? 0 }
    },
  })

  const usersQuery = useQuery({
    queryKey: getMsGraphSearchQueryKey(filters.search),
    queryFn: () => msGraphSearchFetcher(filters.search),
    placeholderData: keepPreviousData,
    select: (axiosResponse) => {
      const formattedData: SearchResult[] =
        axiosResponse?.data.map((user) => {
          const mail = user.otherMails?.length ? user.otherMails[0] : user.mail

          return {
            title: user.displayName,
            metadata: [user.jobTitle, mail],
            customIconName: 'search_result_contacts',
          }
        }) ?? []

      return { searchResultsData: formattedData, searchResultsCount: formattedData.length }
    },
  })

  const officialBoardQuery = useQuery({
    queryKey: getOfficialBoardListQueryKey(filters),
    queryFn: () => officialBoardListFetcher(filters),
    placeholderData: keepPreviousData,
    select: (axiosResponse) => {
      const formattedData: SearchResult[] =
        axiosResponse.data.items.map((boardItem) => {
          return {
            title: boardItem.title,
            uniqueId: boardItem.id,
            linkHref: `/uradna-tabula/${base64Encode(boardItem.id)}`,
            metadata: [
              boardItem.categoryName,
              formatDate(boardItem.publishedFrom),
              boardItem.numberOfFiles > 1
                ? t('SearchPage.numberOfFiles', { count: boardItem.numberOfFiles })
                : undefined,
            ],
            customIconName: 'search_result_official_board',
          }
        }) ?? []

      return { searchResultsData: formattedData, searchResultsCount: axiosResponse.data.totalItems }
    },
  })

  switch (optionKey) {
    case 'pages':
      return pagesQuery

    case 'articles':
      return articlesQuery

    case 'documents':
      return documentsQuery

    case 'inbaArticles':
      return inbaArticlesQuery

    case 'users':
      return usersQuery

    case 'regulations':
      return regulationsQuery

    case 'officialBoard':
      return officialBoardQuery

    default:
      return pagesQuery
  }
}
