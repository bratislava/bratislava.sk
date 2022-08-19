import { client } from '../backend/utils/gql'

export const fetchBlogPosts = async (tags: string[], limit: number, start: number) => {
  const { blogPosts } = await client.LatestPostsByTags({
    tags,
    limit,
    start,
  })

  return blogPosts
}
