import {
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
import { SearchOption } from '@components/pages/searchPageContentNew'
import { useQuery } from '@tanstack/react-query'
import { formatDate } from '@utils/local-date'
import { useLocale, useTranslations } from 'next-intl'

export type SearchFilters = PagesFilters | BlogPostsFilters | InbaArticlesFilters

export type SearchResult = {
  title: string | null | undefined
  slug: string | null | undefined
  metadata?: (string | null | undefined)[]
  coverImageURL?: string | null | undefined
  pageColor?: Enum_Page_Pagecolor | Enum_Pagecategory_Color
}

type SearchResults = SearchResult[] | []

export const getSearchPagesTotalHits = (filters: PagesFilters): number => {
  const t = useTranslations()
  const locale = useLocale()

  const { data } = useQuery({
    queryKey: getPagesQueryKey(filters, locale),
    queryFn: () => pagesFetcherUseQuery(filters, locale),
    keepPreviousData: true,
  })

  return data?.estimatedTotalHits ?? 0
}

export const getSearchPagesData = (filters: PagesFilters): SearchResults => {
  const t = useTranslations()
  const locale = useLocale()

  const { data } = useQuery({
    queryKey: getPagesQueryKey(filters, locale),
    queryFn: () => pagesFetcherUseQuery(filters, locale),
    keepPreviousData: true,
  })

  return (
    data?.hits.map((page: PageMeili) => {
      return {
        title: page.title,
        slug: page.slug,
        metadata: [page.pageCategory?.title, formatDate(page.publishedAt)],
        pageColor: page.pageColor,
      } as SearchResult
    }) ?? []
  )
}

export const getSearchBlogPostsData = (filters: BlogPostsFilters): SearchResults => {
  const t = useTranslations()
  const locale = useLocale()

  const { data } = useQuery({
    queryKey: getBlogPostsQueryKey(filters, locale),
    queryFn: () => blogPostsFetcher(filters, locale),
    keepPreviousData: true,
  })

  return (
    data?.hits?.map(
      (blogPostData: Pick<LatestBlogPostEntityFragment, 'attributes'>): SearchResult => {
        return {
          title: blogPostData.attributes?.title,
          slug: `blog/${blogPostData.attributes?.slug}`,
          metadata: [
            blogPostData.attributes?.tag?.data?.attributes?.title,
            formatDate(blogPostData.attributes?.publishedAt),
          ],
          coverImageURL: blogPostData.attributes?.coverImage?.data?.attributes?.url,
        }
      },
    ) ?? []
  )
}

export const getSearchBlogPostsTotalHits = (filters: BlogPostsFilters): number => {
  const t = useTranslations()
  const locale = useLocale()

  const { data } = useQuery({
    queryKey: getBlogPostsQueryKey(filters, locale),
    queryFn: () => blogPostsFetcher(filters, locale),
    keepPreviousData: true,
  })

  return data?.estimatedTotalHits ?? 0
}

export const getSearchInbaArticlesData = (filters: InbaArticlesFilters): SearchResults => {
  const t = useTranslations()
  const locale = useLocale()

  const { data } = useQuery({
    queryKey: getInbaArticlesQueryKey(filters, locale),
    queryFn: () => inbaArticlesFetcher(filters, locale),
    keepPreviousData: true,
  })

  return (
    data?.hits?.map((inbaArticle): SearchResult => {
      return {
        title: inbaArticle.attributes.title,
        slug: `inba/text/${inbaArticle.attributes.title}`,
        metadata: [
          inbaArticle.attributes?.inbaTag?.data?.attributes?.title,
          formatDate(inbaArticle.attributes.publishedAt),
        ],
        coverImageURL: inbaArticle.attributes.coverImage.data.attributes.url,
      }
    }) ?? []
  )
}

export const getSearchInbaArticlesTotalHits = (filters: InbaArticlesFilters): number => {
  const t = useTranslations()
  const locale = useLocale()

  const { data } = useQuery({
    queryKey: getInbaArticlesQueryKey(filters, locale),
    queryFn: () => inbaArticlesFetcher(filters, locale),
    keepPreviousData: true,
  })

  return data?.estimatedTotalHits ?? 0
}

export const getDataBySearchOptionKey = (optionKey: SearchOption['key']) => {
  switch (optionKey) {
    case 'pages':
      return { dataFetcher: getSearchPagesData, numberOfHits: getSearchPagesTotalHits }

    case 'articles':
      return { dataFetcher: getSearchBlogPostsData, numberOfHits: getSearchBlogPostsTotalHits }

    case 'inbaArticles':
      return {
        dataFetcher: getSearchInbaArticlesData,
        numberOfHits: getSearchInbaArticlesTotalHits,
      }

    default:
      return {
        dataFetcher: getSearchPagesData,
        numberOfHits: getSearchPagesTotalHits,
      }

    // default:
    //   return {
    //     dataFetcher: () => {
    //       // console.warn('no data fetcher available for this search option')
    //       return []
    //     },
    //     numberOfHits: () => 0,
    //   }
  }
}

// type UsersFilters = {
//   search: string
// }

// export const getSearchUsersData = (filters: UsersFilters): GeneralSearchResults => {
//   const t = useTranslations()

//   const { data } = useSwr(['Users', filters], () => userSearchFetcher(filters.search))

//   const formattedData =
//     data?.hits?.map((userData: MSGraphFilteredGroupUser) => {
//       return {
//         title: userData.displayName,
//         slug: '',
//         metadata: [] ?? [],
//       }
//     }) ?? []

//   return formattedData ?? []
// }

// export const getSearchUsersTotalHits = (filters: UsersFilters): number => {
//   const t = useTranslations()

//   const { data } = useSwr(['Users', filters], () => userSearchFetcher(filters.search))

//   return data?.estimatedTotalHits ?? 0
// }
