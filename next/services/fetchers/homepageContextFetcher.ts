import { HomepageEntityFragment, LatestBlogPostEntityFragment } from '@/services/graphql'
import { client } from '@/services/graphql/gql'
import {
  getTootootHomepageEvents,
  TootootEvent,
} from '@/services/tootoot/homepageTootootEvents.fetcher'
import { isDefined } from '@/utils/isDefined'

export type HomepageContext = {
  homepage: HomepageEntityFragment | null
  tootootEvents: TootootEvent[] | null
  blogPosts: LatestBlogPostEntityFragment[] | null
}

export const homepageContextFetcher = async (locale: string): Promise<HomepageContext> => {
  const [{ homepage }, tootootEvents, { blogPosts }] = await Promise.all([
    client.Homepage({ locale }),
    getTootootHomepageEvents().catch(() => null),
    client.LatestBlogsWithTags({
      limit: 7,
      sort: 'publishedAt:desc',
      locale,
    }),
  ])

  return {
    homepage: homepage?.data ?? null,
    tootootEvents,
    blogPosts: blogPosts?.data?.filter(isDefined) ?? null,
  }
}
