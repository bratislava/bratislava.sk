import { getTootTootHomepageEvents, ToottootEvent } from '@backend/services/toottoot'
import {
  HomepageEntityFragment,
  LatestBlogPostEntityFragment,
} from '@bratislava/strapi-sdk-homepage'
import { client } from '@utils/gql'
import { isDefined } from '@utils/isDefined'

export type HomepageContext = {
  homepage: HomepageEntityFragment | null
  toottootEvents: ToottootEvent[] | null
  blogPosts: LatestBlogPostEntityFragment[] | null
  rozkopavkyBlogPosts: LatestBlogPostEntityFragment[] | null
}

export const homepageContextFetcher = async (locale: string): Promise<HomepageContext> => {
  const [{ homepage }, toottootEvents, { blogPosts }, { blogPosts: rozkopavkyBlogPosts }] =
    await Promise.all([
      client.Homepage({ locale }),
      getTootTootHomepageEvents().catch(() => null),
      client.LatestBlogsWithTags({
        limit: 5,
        sort: 'publishedAt:desc',
        locale,
      }),
      client.LatestBlogsWithTags({
        limit: 7,
        sort: 'publishedAt:desc',
        filters: {
          tag: {
            title: {
              eq: 'Rozkopávky a uzávierky',
            },
          },
        },
        locale,
      }),
    ])

  return {
    homepage: homepage?.data ?? null,
    toottootEvents,
    blogPosts: blogPosts?.data?.filter(isDefined) ?? null,
    rozkopavkyBlogPosts: rozkopavkyBlogPosts?.data?.filter(isDefined) ?? null,
  }
}
