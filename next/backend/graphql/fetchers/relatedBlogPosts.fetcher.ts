import { PageEntityFragment } from '@backend/graphql'
import { isDefined } from '@utils/isDefined'
import { client } from '@backend/graphql/gql'

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

  // Change to limit: 9, when section with slider buttons is implemented
  return client.LatestPostsByTags({ locale, tags: extractedTags, limit: 3 })
}
