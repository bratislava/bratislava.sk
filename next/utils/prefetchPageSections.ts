import { PageEntityFragment } from '@backend/graphql'
import {
  getRelatedBlogPostsQueryKey,
  relatedBlogPostsFetcher,
} from '@backend/graphql/fetchers/relatedBlogPosts.fetcher'
import { dehydrate, QueryClient } from '@tanstack/react-query'

export const prefetchPageSections = async (page: PageEntityFragment, locale: string) => {
  const queryClient = new QueryClient()

  // TODO prefetch all needed sections
  const sectionTypes = page?.attributes?.sections?.map((section) => section?.__typename) ?? []

  // if (sectionTypes.includes('ComponentSectionsPartners')) {
  //   await queryClient.prefetchQuery(getPartnersQueryKey(locale), () => partnersFetcher(locale))
  // }

  await queryClient.prefetchQuery(getRelatedBlogPostsQueryKey(page, locale), () =>
    relatedBlogPostsFetcher(page, locale),
  )

  return dehydrate(queryClient)
}
