import { PageEntityFragment } from '@/services/graphql'
import { isDefined } from '@/utils/isDefined'
import { client } from '@/services/graphql/gql'

const extractTags = (page: PageEntityFragment) => {
  return page.attributes?.relatedContents?.data
    .map((tag) => tag?.attributes?.title)
    .filter(isDefined)
}
export const getRelatedBlogPostsQueryKey = (page: PageEntityFragment, locale: string) => [
  'relatedBlogPosts',
  extractTags(page) ?? null,
  locale,
]

export const relatedBlogPostsFetcher = (page: PageEntityFragment, locale: string) => {
  const extractedTags = extractTags(page)

  if (!extractedTags || extractedTags.length === 0) {
    return Promise.resolve(null)
  }

  return client.LatestPostsByTags({ locale, tags: extractedTags, limit: 9 })
}
