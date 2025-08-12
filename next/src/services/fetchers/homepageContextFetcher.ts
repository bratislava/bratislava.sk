import {
  ArticleCardEntityFragment,
  HomepageEntityFragment,
  InbaReleaseHomepageInbaCardEntityFragment,
} from '@/src/services/graphql'
import { client } from '@/src/services/graphql/gql'
import { isDefined } from '@/src/utils/isDefined'

export type HomepageContext = {
  homepage: HomepageEntityFragment | null | undefined
  latestArticles: ArticleCardEntityFragment[]
  latestInbaRelease: InbaReleaseHomepageInbaCardEntityFragment | null | undefined
}

export const homepageContextFetcher = async (locale: string): Promise<HomepageContext> => {
  const [{ homepage }, { articles }, { inbaReleases }] = await Promise.all([
    client.Homepage({ locale }),
    client.Articles({
      limit: 7,
      sort: 'addedAt:desc',
      locale,
    }),
    client.LatestInbaRelease(),
  ])

  return {
    homepage,
    latestArticles: articles.filter(isDefined),
    latestInbaRelease: inbaReleases[0],
  }
}
