import { dehydrate, QueryClient } from '@tanstack/react-query'

import { PageEntityFragment } from '@/src/services/graphql'
import { client } from '@/src/services/graphql/gql'
import {
  getRelatedArticlesQueryKey,
  relatedArticlesFetcher,
} from '@/src/services/meili/fetchers/relatedArticlesFetcher'
import {
  getMsGraphStructureQueryKey,
  msGraphStructureFetcher,
} from '@/src/services/ms-graph/fetchers/msGraphStructure.fetcher'

export const prefetchPageSections = async (page: PageEntityFragment, locale: string) => {
  const queryClient = new QueryClient()

  // TODO prefetch all needed sections
  const sectionTypes = page?.attributes?.sections?.map((section) => section?.__typename) ?? []

  // if (sectionTypes.includes('ComponentSectionsPartners')) {
  //   await queryClient.prefetchQuery(getPartnersQueryKey(locale), () => partnersFetcher(locale))
  // }

  if (sectionTypes.includes('ComponentSectionsBlogPostsList')) {
    await queryClient.prefetchQuery({
      queryKey: ['Tags', locale],
      queryFn: () => client.Tags({ locale }),
    })
    await queryClient.prefetchQuery({
      queryKey: ['PageCategories', locale],
      queryFn: () => client.PageCategories({ locale }),
    })
  }

  if (sectionTypes.includes('ComponentSectionsInbaArticlesList')) {
    await queryClient.prefetchQuery({
      queryKey: ['InbaTags', locale],
      queryFn: () => client.InbaTags({ locale }),
    })
  }

  // TODO this does not work, throws ERR_CONNECTION_REFUSED
  // if (sectionTypes.includes('ComponentSectionsOfficialBoard')) {
  //   await queryClient.prefetchQuery(getGinisOfficialBoardQueryKeyJson(), () =>
  //     ginisOfficialBoardFetcherJson(),
  //   )
  // }

  if (sectionTypes.includes('ComponentSectionsOrganizationalStructure')) {
    await queryClient.prefetchQuery({
      queryKey: getMsGraphStructureQueryKey(),
      queryFn: () => msGraphStructureFetcher(),
    })
  }

  await queryClient.prefetchQuery({
    queryKey: getRelatedArticlesQueryKey(page, locale),
    queryFn: () => relatedArticlesFetcher(page, locale),
  })

  return dehydrate(queryClient)
}
