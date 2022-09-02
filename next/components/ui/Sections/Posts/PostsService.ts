import { Post, TAB_CATEGORY } from '../../../organisms/posts/types'

export function getRoadClosuresUrl(posts: Post[]): string | undefined {
  return posts.find(({ category }) => TAB_CATEGORY.ROAD_CLOSURES === category)?.url
}
