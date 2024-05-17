import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useLocale, useTranslations } from 'next-intl'
import { ReactNode } from 'react'

import {
  getOfficialBoardListQueryKey,
  officialBoardListFetcher,
  OfficialBoardListFilters,
} from '@/backend/ginis/fetchers/officialBoardListFetcher'
import {
  Enum_Page_Pagecolor,
  Enum_Pagecategory_Color,
  LatestBlogPostEntityFragment,
} from '@/backend/graphql'
import {
  blogPostsFetcher,
  BlogPostsFilters,
  getBlogPostsQueryKey,
} from '@/backend/meili/fetchers/blogPostsFetcherReactQuery'
import {
  getInbaArticlesQueryKey,
  inbaArticlesFetcher,
  InbaArticlesFilters,
} from '@/backend/meili/fetchers/inbaArticlesFetcher'
import {
  getPagesQueryKey,
  pagesFetcherUseQuery,
  PagesFilters,
} from '@/backend/meili/fetchers/pagesFetcher'
import {
  getRegulationsQueryKey,
  RegulationFilters,
  regulationsFetcher,
} from '@/backend/meili/fetchers/regulationsFetcher'
import { PageMeili } from '@/backend/meili/types'
import {
  getMsGraphSearchQueryKey,
  msGraphSearchFetcher,
} from '@/backend/ms-graph/fetchers/msGraphSearch.fetcher'
import { SearchOption } from '@/components/organisms/SearchSection/GlobalSearchSectionContent'
import { base64Encode } from '@/utils/base64'
import { isDefined } from '@/utils/isDefined'
import { formatDate } from '@/utils/local-date'

export type SearchFilters =
  | PagesFilters
  | BlogPostsFilters
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
}) => {
  const t = useTranslations()
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
            metadata: [page.pageCategory?.title, formatDate(page.publishedAt)],
            pageColor: page.pageColor ?? page.pageCategory?.color,
          }
        }) ?? []

      return { searchResultsData: formattedData, searchResultsCount: data?.estimatedTotalHits ?? 0 }
    },
  })

  const blogPostsQuery = useQuery({
    // TODO filters type
    queryKey: getBlogPostsQueryKey(filters as BlogPostsFilters, locale),
    queryFn: () => blogPostsFetcher(filters as BlogPostsFilters, locale),
    placeholderData: keepPreviousData,
    select: (data) => {
      const formattedData: SearchResult[] =
        data?.hits?.map(
          (blogPostData: Pick<LatestBlogPostEntityFragment, 'attributes'>): SearchResult => {
            return {
              title: blogPostData.attributes?.title,
              uniqueId: blogPostData.attributes?.slug,
              linkHref: `/blog/${blogPostData.attributes?.slug}`,
              metadata: [
                blogPostData.attributes?.tag?.data?.attributes?.title,
                formatDate(blogPostData.attributes?.publishedAt),
              ],
              coverImageSrc: blogPostData.attributes?.coverImage?.data?.attributes?.url,
            }
          },
        ) ?? []

      return { searchResultsData: formattedData, searchResultsCount: data?.estimatedTotalHits ?? 0 }
    },
  })

  const inbaArticlesQuery = useQuery({
    // TODO filters type
    queryKey: getInbaArticlesQueryKey(filters as InbaArticlesFilters, locale),
    queryFn: () => inbaArticlesFetcher(filters as InbaArticlesFilters, locale),
    placeholderData: keepPreviousData,
    select: (data) => {
      const formattedData: SearchResult[] =
        data?.hits?.map((inbaArticle): SearchResult => {
          return {
            title: inbaArticle.attributes.title,
            uniqueId: inbaArticle.attributes.slug,
            linkHref: `/inba/clanky/${inbaArticle.attributes.slug}`,
            metadata: [
              inbaArticle.attributes?.inbaTag?.data?.attributes?.title,
              formatDate(inbaArticle.attributes.publishedAt),
            ],
            coverImageSrc: inbaArticle.attributes.coverImage.data.attributes.url,
          }
        }) ?? []

      return { searchResultsData: formattedData, searchResultsCount: data?.estimatedTotalHits ?? 0 }
    },
  })

  const regulationsQuery = useQuery({
    // TODO filters type
    queryKey: getRegulationsQueryKey(filters),
    queryFn: () => regulationsFetcher(filters),
    placeholderData: keepPreviousData,
    select: (data) => {
      const formattedData: SearchResult[] =
        data?.hits?.map((regulation): SearchResult => {
          const categoryDisplayName = isDefined(regulation.category)
            ? t(`Regulation.category.${regulation.category}`)
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
            metadata: [user.jobTitle, mail, user.businessPhones?.join(', ')],
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
      return blogPostsQuery

    case 'inbaArticles':
      return inbaArticlesQuery

    case 'users':
      return usersQuery

    case 'regulations':
      return regulationsQuery

    case 'officialBoard':
      return officialBoardQuery

    default:
      return null
  }
}
