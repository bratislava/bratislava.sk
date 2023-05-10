import { PageEntityFragment } from '@backend/graphql'
import {
  getRelatedBlogPostsQueryKey,
  relatedBlogPostsFetcher,
} from '@backend/graphql/fetchers/relatedBlogPosts.fetcher'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { isDefined } from '@utils/isDefined'

export const prefetchPageSections = async (page: PageEntityFragment, locale: string) => {
  const queryClient = new QueryClient()

  // TODO prefetch all needed sections
  const sectionTypes = page?.attributes?.sections?.map((section) => section?.__typename) ?? []

  const relatedContentTags =
    page.attributes?.relatedContents?.data.map((tag) => tag.id).filter(isDefined) ?? []

  // if (sectionTypes.includes('ComponentSectionsPartners')) {
  //   await queryClient.prefetchQuery(getPartnersQueryKey(locale), () => partnersFetcher(locale))
  // }

  if (relatedContentTags.length > 0) {
    await queryClient.prefetchQuery(getRelatedBlogPostsQueryKey(relatedContentTags, locale), () =>
      relatedBlogPostsFetcher(relatedContentTags, locale),
    )
  }

  return dehydrate(queryClient)
}
