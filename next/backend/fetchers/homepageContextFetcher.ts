import { getTootTootHomepageEvents, ToottootEvent } from '@backend/services/toottoot'
import { HomepageEntityFragment, LatestBlogFragment } from '@bratislava/strapi-sdk-homepage'
import { client } from '@utils/gql'
import { isDefined } from '@utils/isDefined'

export type HomepageContext = {
  homepage: HomepageEntityFragment | null
  toottootEvents: ToottootEvent[]
  blogPosts: LatestBlogFragment[]
  rozkopavkyBlogPosts: LatestBlogFragment[]
}

export const homepageContextFetcher = async (locale: string): Promise<HomepageContext> => {
  const [{ homepage }, toottootEvents, { blogPosts }, { blogPosts: rozkopavkyBlogPosts }] =
    await Promise.all([
      client.Homepage({ locale }),
      getTootTootHomepageEvents().catch(() => []),
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
    blogPosts: blogPosts?.data?.filter(isDefined) ?? [],
    rozkopavkyBlogPosts: rozkopavkyBlogPosts?.data?.filter(isDefined) ?? [],
  }
}
