import { dehydrate, QueryClient } from '@tanstack/react-query'

import { PageEntityFragment } from '@/src/services/graphql'
import { client } from '@/src/services/graphql/gql'
import {
  getInbaArticlesQueryKey,
  inbaArticlesDefaultFilters,
  inbaArticlesFetcher,
} from '@/src/services/meili/fetchers/inbaArticlesFetcher'
import {
  getInbaReleasesQueryKey,
  inbaReleasesDefaultFilters,
  inbaReleasesFetcher,
} from '@/src/services/meili/fetchers/inbaReleasesFetcher'
import {
  getRelatedArticlesQueryKey,
  relatedArticlesFetcher,
} from '@/src/services/meili/fetchers/relatedArticlesFetcher'
import {
  getMsGraphStructureQueryKey,
  msGraphStructureFetcher,
} from '@/src/services/ms-graph/fetchers/msGraphStructure.fetcher'
import {
  getTootootEvents,
  getTootootEventsQueryKey,
} from '@/src/services/tootoot/tootootEvents.fetcher'

export const prefetchPageSections = async (page: PageEntityFragment, locale: string) => {
  const queryClient = new QueryClient()

  // TODO prefetch all needed sections
  const sectionTypes = page?.sections?.map((section) => section?.__typename) ?? []

  // if (sectionTypes.includes('ComponentSectionsPartners')) {
  //   await queryClient.prefetchQuery(getPartnersQueryKey(locale), () => partnersFetcher(locale))
  // }

  if (sectionTypes.includes('ComponentSectionsArticles')) {
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
    await queryClient.prefetchQuery({
      queryKey: getInbaArticlesQueryKey(inbaArticlesDefaultFilters, locale),
      queryFn: () => inbaArticlesFetcher(inbaArticlesDefaultFilters, locale),
    })
  }

  if (sectionTypes.includes('ComponentSectionsInbaReleases')) {
    await queryClient.prefetchQuery({
      queryKey: getInbaReleasesQueryKey(inbaReleasesDefaultFilters),
      queryFn: () => inbaReleasesFetcher(inbaReleasesDefaultFilters),
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

  if (sectionTypes.includes('ComponentSectionsTootootEvents')) {
    await queryClient.prefetchQuery({
      queryKey: getTootootEventsQueryKey(),
      queryFn: () => getTootootEvents(),
    })
  }

  await queryClient.prefetchQuery({
    queryKey: getRelatedArticlesQueryKey(page, locale),
    queryFn: () => relatedArticlesFetcher(page, locale),
  })

  return dehydrate(queryClient)
}
