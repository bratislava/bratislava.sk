import {
  blogPostsFetcher,
  BlogPostsFilters,
  getBlogPostsSwrKey,
} from '@backend/meili/fetchers/blogPostsFetcher'
import {
  getInbaArticlesQueryKey,
  inbaArticlesFetcher,
  InbaArticlesFilters,
} from '@backend/meili/fetchers/inbaArticlesFetcher'
import { getPagesSwrKey, pagesFetcher, PagesFilters } from '@backend/meili/fetchers/pagesFetcher'
import { PageMeili } from '@backend/meili/types'
import { MSGraphFilteredGroupUser } from '@backend/services/ms-graph'
import { userSearchFetcher } from '@backend/utils/organisationalStructure'
import { BlogItem } from '@components/ui/BlogSearchCard/BlogSearchCard'
import { useQuery } from '@tanstack/react-query'
import { formatDate } from '@utils/local-date'
import { useLocale, useTranslations } from 'next-intl'
import useSwr from 'swr'

export type UsersFilters = {
  search: string
}

export type GeneralSearchResult = {
  title: string
  slug: string
  metadata: string[]
  picture?: any
}

export const getSearchPagesData = (filters: PagesFilters): GeneralSearchResult[] => {
  const t = useTranslations()
  const locale = useLocale()

  const { data } = useSwr(getPagesSwrKey(filters, locale), pagesFetcher(filters, locale))

  const formattedData =
    data?.hits.map((page: PageMeili) => {
      return {
        title: page.title ?? '',
        slug: page.slug ?? '',
        metadata: [page.pageCategory?.title ?? '', formatDate(page.publishedAt)] ?? [],
        picture: page.pageBackgroundImage,
      }
    }) ?? []

  return formattedData ?? []
}

export const getSearchUsersData = (filters: UsersFilters): GeneralSearchResult[] => {
  const t = useTranslations()

  const { data } = useSwr(['Users', filters], () => userSearchFetcher(filters.search))

  const formattedData =
    data?.hits?.map((userData: MSGraphFilteredGroupUser) => {
      return {
        title: userData.displayName,
        slug: '',
        metadata: [] ?? [],
      }
    }) ?? []

  return formattedData ?? []
}

export const getSearchBlogPostsData = (filters: BlogPostsFilters): GeneralSearchResult[] => {
  const t = useTranslations()
  const locale = useLocale()

  const { data } = useSwr(getBlogPostsSwrKey(filters, locale), blogPostsFetcher(filters, locale))

  const formattedData =
    data?.hits?.map((blogPostData: BlogItem) => {
      return {
        title: blogPostData.attributes?.title ?? '',
        slug: `blog/${blogPostData.attributes?.slug}` ?? '',
        metadata:
          [
            blogPostData.attributes?.tag?.data?.attributes?.pageCategory?.data?.attributes
              ?.shortTitle ?? '',
            formatDate(blogPostData.attributes?.publishedAt),
          ] ?? [],
        picture: blogPostData.attributes?.coverImage?.data?.attributes?.url,
      }
    }) ?? []

  return formattedData ?? []
}

export const getSearchInbaArticlesData = (filters: InbaArticlesFilters): GeneralSearchResult[] => {
  const t = useTranslations()
  const locale = useLocale()

  const { data } = useQuery({
    queryKey: getInbaArticlesQueryKey(filters, locale),
    queryFn: () => inbaArticlesFetcher(filters, locale),
    keepPreviousData: true,
  })

  const formattedData =
    data?.hits?.map((blogPostData: BlogItem) => {
      return {
        title: blogPostData.attributes?.title ?? '',
        slug: `inba/text/${blogPostData.attributes?.slug}` ?? '',
        metadata:
          [
            blogPostData.attributes?.tag?.data?.attributes?.pageCategory?.data?.attributes
              ?.shortTitle ?? '',
            formatDate(blogPostData.attributes?.publishedAt),
          ] ?? [],
        picture: blogPostData.attributes?.coverImage?.data?.attributes?.url,
      }
    }) ?? []

  return formattedData ?? []
}
