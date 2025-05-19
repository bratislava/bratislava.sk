import { ArticleCardEntityFragment, HomepageEntityFragment } from '@/src/services/graphql'
import { client } from '@/src/services/graphql/gql'
import { isDefined } from '@/src/utils/isDefined'

export type HomepageContext = {
  homepage: HomepageEntityFragment | null
  latestArticles: ArticleCardEntityFragment[] | null
}

export const homepageContextFetcher = async (locale: string): Promise<HomepageContext> => {
  const [{ homepage }, { articles }] = await Promise.all([
    client.Homepage({ locale }),
    client.Articles({
      limit: 7,
      sort: 'addedAt:desc',
      locale,
    }),
  ])

  return {
    homepage: homepage?.data ?? null,
    latestArticles: articles?.data?.filter(isDefined) ?? null,
  }
}
