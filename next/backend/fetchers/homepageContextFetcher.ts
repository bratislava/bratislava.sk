import { HomepageEntityFragment, LatestBlogPostEntityFragment } from '@backend/graphql'
import { getTootootHomepageEvents, TootootEvent } from '@backend/services/tootoot'
import { client } from '@utils/gql'
import { isDefined } from '@utils/isDefined'

export type HomepageContext = {
  homepage: HomepageEntityFragment | null
  tootootEvents: TootootEvent[] | null
  blogPosts: LatestBlogPostEntityFragment[] | null
  rozkopavkyBlogPosts: LatestBlogPostEntityFragment[] | null
}

export const homepageContextFetcher = async (locale: string): Promise<HomepageContext> => {
  const [{ homepage }, tootootEvents, { blogPosts }, { blogPosts: rozkopavkyBlogPosts }] =
    await Promise.all([
      client.Homepage({ locale }),
      getTootootHomepageEvents().catch(() => null),
      client.LatestBlogsWithTags({
        limit: 7,
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
    tootootEvents,
    blogPosts: blogPosts?.data?.filter(isDefined) ?? null,
    rozkopavkyBlogPosts: rozkopavkyBlogPosts?.data?.filter(isDefined) ?? null,
  }
}
