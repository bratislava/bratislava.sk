import { ArticleCardEntityFragment, HomepageEntityFragment } from '@/src/services/graphql'
import { client } from '@/src/services/graphql/gql'
import {
  getTootootHomepageEvents,
  TootootEvent,
} from '@/src/services/tootoot/homepageTootootEvents.fetcher'
import { isDefined } from '@/src/utils/isDefined'

export type HomepageContext = {
  homepage: HomepageEntityFragment | null
  tootootEvents: TootootEvent[] | null
  latestArticles: ArticleCardEntityFragment[] | null
}

export const homepageContextFetcher = async (locale: string): Promise<HomepageContext> => {
  const [{ homepage }, tootootEvents, { articles }] = await Promise.all([
    client.Homepage({ locale }),
    getTootootHomepageEvents().catch(() => null),
    client.Articles({
      limit: 7,
      sort: 'addedAt:desc',
      locale,
    }),
  ])

  return {
    homepage: homepage?.data ?? null,
    tootootEvents,
    latestArticles: articles?.data?.filter(isDefined) ?? null,
  }
}
