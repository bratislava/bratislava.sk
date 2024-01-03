import {
  getGinisOfficialBoardQueryKey,
  ginisOfficialBoardFetcher,
} from '@backend/ginis/fetchers/ginisOfficialBoard.fetcher'
import {
  Enum_Componentblockstopservicesitem_Icon,
  Enum_Page_Pagecolor,
  Enum_Pagecategory_Color,
  LatestBlogPostEntityFragment,
} from '@backend/graphql'
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
import { useLocale } from 'next-intl'

export type SearchFilters = PagesFilters | BlogPostsFilters | InbaArticlesFilters

export type SearchResult = {
  title: string | null | undefined
  linkHref?: string | null | undefined
  metadata?: (string | null | undefined)[]
  coverImageSrc?: string | null | undefined
  pageColor?: Enum_Page_Pagecolor | Enum_Pagecategory_Color
  customIconName?: string
}

export const useQueryBySearchOption = (optionKey: SearchOption['id'], filters: SearchFilters) => {
  const locale = useLocale()

  const pagesQuery = useQuery({
    queryKey: getPagesQueryKey(filters, locale),
    queryFn: () => pagesFetcherUseQuery(filters, locale),
    keepPreviousData: true,
    select: (data) => {
      const formattedData: SearchResult[] =
        data?.hits.map((page: PageMeili): SearchResult => {
          return {
            title: page.title,
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
    keepPreviousData: true,
    select: (data) => {
      const formattedData: SearchResult[] =
        data?.hits?.map(
          (blogPostData: Pick<LatestBlogPostEntityFragment, 'attributes'>): SearchResult => {
            return {
              title: blogPostData.attributes?.title,
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
    keepPreviousData: true,
    select: (data) => {
      const formattedData: SearchResult[] =
        data?.hits?.map((inbaArticle): SearchResult => {
          return {
            title: inbaArticle.attributes.title,
            linkHref: `/inba/text/${inbaArticle.attributes.slug}`,
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

  const usersQuery = useQuery({
    queryKey: getMsGraphSearchQueryKey(filters.search),
    queryFn: () => msGraphSearchFetcher(filters.search),
    keepPreviousData: true,
    select: (axiosResponse) => {
      const formattedData: SearchResult[] =
        axiosResponse?.data.map((user) => {
          const mail = user.otherMails?.length > 0 ? user.otherMails[0] : user.mail

          return {
            title: user.displayName,
            metadata: [user.jobTitle, mail, user.businessPhones?.join(', ')],
            customIconName: Enum_Componentblockstopservicesitem_Icon.UradneHodiny,
          }
        }) ?? []

      return { searchResultsData: formattedData, searchResultsCount: formattedData.length }
    },
  })

  const officialBoardQuery = useQuery({
    queryKey: getGinisOfficialBoardQueryKey(filters.search),
    queryFn: () => ginisOfficialBoardFetcher(filters.search),
    keepPreviousData: true,
    select: (axiosResponse) => {
      const formattedData: SearchResult[] =
        axiosResponse.data?.map((boardItem) => {
          return {
            title: boardItem.title,
            metadata: [boardItem.createdAt],
          }
        }) ?? []

      return { searchResultsData: formattedData, searchResultsCount: formattedData.length }
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

    case 'officialBoard':
      return officialBoardQuery

    default:
      return null
  }
}
