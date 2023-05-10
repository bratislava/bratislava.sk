import { client } from '@utils/gql'

export const getRelatedBlogPostsQueryKey = (tags: string[], locale: string) => [
  'relatedBlogPosts',
  tags,
  locale,
]

export const relatedBlogPostsFetcher = (tags: string[], locale: string) =>
  // Change to limit: 9, when section with slider buttons is implemented
  client.LatestPostsByTags({ locale, tags, limit: 3 })
