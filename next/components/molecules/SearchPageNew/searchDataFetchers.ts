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

export type SearchResponse = {
  hits: SearchResult[]
  estimatedTotalHits: number
}

export const getDataBySearchOptionKey = (
  optionKey: SearchOption['key'],
  filters: SearchFilters,
): SearchResponse => {
  switch (optionKey) {
    case 'pages':
      return getSearchPagesData(filters as PagesFilters)

    case 'articles':
      return getSearchBlogPostsData(filters as BlogPostsFilters)

    case 'inbaArticles':
      return getSearchInbaArticlesData(filters as InbaArticlesFilters)

    default:
      return getSearchInbaArticlesData(filters as InbaArticlesFilters)
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

  const formattedData =
    data?.hits.map((page: PageMeili) => {
      return {
        title: page.title,
        slug: page.slug,
        metadata: [page.pageCategory?.title, formatDate(page.publishedAt)],
        pageColor: page.pageColor,
      } as SearchResult
    }) ?? []

  return { hits: formattedData, estimatedTotalHits: data?.estimatedTotalHits ?? 0 }
}

const getSearchBlogPostsData = (filters: BlogPostsFilters): SearchResponse => {
  const t = useTranslations()
  const locale = useLocale()

  const { data } = useQuery({
    queryKey: getBlogPostsQueryKey(filters, locale),
    queryFn: () => blogPostsFetcher(filters, locale),
    keepPreviousData: true,
  })

  const formattedData =
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

  return { searchResultsHits: formattedData, estimatedTotalHits: data?.estimatedTotalHits ?? 0 }
}

const getSearchInbaArticlesData = (filters: InbaArticlesFilters): SearchResponse => {
  const t = useTranslations()
  const locale = useLocale()

  const { data } = useQuery({
    queryKey: getInbaArticlesQueryKey(filters, locale),
    queryFn: () => inbaArticlesFetcher(filters, locale),
    keepPreviousData: true,
  })

  const formattedData =
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

  return { searchResultsHits: formattedData, estimatedTotalHits: data?.estimatedTotalHits ?? 0 }
}
