import {
  getGinisOfficialBoardQueryKey,
  ginisOfficialBoardFetcher,
} from '@backend/ginis/fetchers/ginisOfficialBoard.fetcher'
import { Enum_Page_Pagecolor, LatestBlogPostEntityFragment } from '@backend/graphql'
import {
  blogPostsFetcher,
  BlogPostsFilters,
  getBlogPostsQueryKey,
} from '@backend/meili/fetchers/blogPostsFetcherReactQuery'
import {
  getInbaArticlesQueryKey,
  inbaArticlesFetcher,
  InbaArticlesFilters,
} from '@backend/meili/fetchers/inbaArticlesFetcher'
import {
  getPagesQueryKey,
  pagesFetcherUseQuery,
  PagesFilters,
} from '@backend/meili/fetchers/pagesFetcher'
import { PageMeili } from '@backend/meili/types'
import {
  getMsGraphSearchQueryKey,
  msGraphSearchFetcher,
} from '@backend/ms-graph/fetchers/msGraphSearch.fetcher'
import { SearchOption } from '@components/pages/searchPageContentNew'
import { useQuery } from '@tanstack/react-query'
import { formatDate } from '@utils/local-date'
import { useLocale, useTranslations } from 'next-intl'

export type SearchFilters = PagesFilters | BlogPostsFilters | InbaArticlesFilters

export type SearchResult = {
  title: string | null | undefined
  url?: string | null | undefined
  metadata?: (string | null | undefined)[]
  coverImageSrc?: string | null | undefined
  pageColor?: Enum_Page_Pagecolor
}

export type SearchResponse = {
  searchResultsData: SearchResult[]
  searchResultsCount: number
}

export const getDataBySearchOptionKey = (
  optionKey: SearchOption['id'],
  filters: SearchFilters,
): SearchResponse => {
  switch (optionKey) {
    case 'pages':
      return getSearchPagesData(filters as PagesFilters)

    case 'articles':
      return getSearchBlogPostsData(filters as BlogPostsFilters)

    case 'inbaArticles':
      return getSearchInbaArticlesData(filters as InbaArticlesFilters)

    case 'users':
      // TODO type filters
      return getSearchUsersData(filters as PagesFilters)

    case 'officialBoard':
      // TODO type filters
      return getSearchOfficialBoardData(filters as PagesFilters)

    default:
      return {
        searchResultsData: [],
        searchResultsCount: 0,
      }
  }
}

const getSearchPagesData = (filters: PagesFilters): SearchResponse => {
  const t = useTranslations()
  const locale = useLocale()

  const { data } = useQuery({
    queryKey: getPagesQueryKey(filters, locale),
    queryFn: () => pagesFetcherUseQuery(filters, locale),
    keepPreviousData: true,
  })

  const formattedData: SearchResult[] =
    data?.hits.map((page: PageMeili): SearchResult => {
      return {
        title: page.title,
        url: page.slug,
        metadata: [page.pageCategory?.title, formatDate(page.publishedAt)],
        pageColor: page.pageColor,
      }
    }) ?? []

  return { searchResultsData: formattedData, searchResultsCount: data?.estimatedTotalHits ?? 0 }
}

const getSearchBlogPostsData = (filters: BlogPostsFilters): SearchResponse => {
  const t = useTranslations()
  const locale = useLocale()

  const { data } = useQuery({
    queryKey: getBlogPostsQueryKey(filters, locale),
    queryFn: () => blogPostsFetcher(filters, locale),
    keepPreviousData: true,
  })

  const formattedData: SearchResult[] =
    data?.hits?.map(
      (blogPostData: Pick<LatestBlogPostEntityFragment, 'attributes'>): SearchResult => {
        return {
          title: blogPostData.attributes?.title,
          url: `blog/${blogPostData.attributes?.slug}`,
          metadata: [
            blogPostData.attributes?.tag?.data?.attributes?.title,
            formatDate(blogPostData.attributes?.publishedAt),
          ],
          coverImageSrc: blogPostData.attributes?.coverImage?.data?.attributes?.url,
        }
      },
    ) ?? []

  return { searchResultsData: formattedData, searchResultsCount: data?.estimatedTotalHits ?? 0 }
}

const getSearchInbaArticlesData = (filters: InbaArticlesFilters): SearchResponse => {
  const t = useTranslations()
  const locale = useLocale()

  const { data } = useQuery({
    queryKey: getInbaArticlesQueryKey(filters, locale),
    queryFn: () => inbaArticlesFetcher(filters, locale),
    keepPreviousData: true,
  })

  const formattedData: SearchResult[] =
    data?.hits?.map((inbaArticle): SearchResult => {
      return {
        title: inbaArticle.attributes.title,
        url: `inba/text/${inbaArticle.attributes.slug}`,
        metadata: [
          inbaArticle.attributes?.inbaTag?.data?.attributes?.title,
          formatDate(inbaArticle.attributes.publishedAt),
        ],
        coverImageSrc: inbaArticle.attributes.coverImage.data.attributes.url,
      }
    }) ?? []

  return { searchResultsData: formattedData, searchResultsCount: data?.estimatedTotalHits ?? 0 }
}

const getSearchOfficialBoardData = (filters: PagesFilters): SearchResponse => {
  const { data } = useQuery({
    queryKey: getGinisOfficialBoardQueryKey(filters.search),
    queryFn: () => ginisOfficialBoardFetcher(filters.search),
    keepPreviousData: true,
    select: (res) => res.data,
  })

  const formattedData: SearchResult[] =
    data?.map((boardItem) => {
      return {
        title: boardItem.title,
        metadata: [boardItem.createdAt],
      }
    }) ?? []

  // TODO get better result count
  return { searchResultsData: formattedData, searchResultsCount: formattedData.length }
}

const getSearchUsersData = (filters: PagesFilters): SearchResponse => {
  const { data } = useQuery({
    queryKey: getMsGraphSearchQueryKey(filters.search),
    queryFn: () => msGraphSearchFetcher(filters.search),
    keepPreviousData: true,
  })

  const formattedData: SearchResult[] =
    data?.data.map((user) => {
      return {
        title: user.displayName,
        metadata: [user.jobTitle],
      }
    }) ?? []

  // TODO get better result count
  return { searchResultsData: formattedData, searchResultsCount: formattedData.length }
}
