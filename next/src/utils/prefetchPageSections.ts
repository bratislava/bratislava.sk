import { dehydrate, QueryClient } from '@tanstack/react-query'

import { PageEntityFragment } from '@/src/services/graphql'
import {
  getRelatedBlogPostsQueryKey,
  relatedBlogPostsFetcher,
} from '@/src/services/graphql/fetchers/relatedBlogPosts.fetcher'
import { client } from '@/src/services/graphql/gql'
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
      queryKey: ['blogPostsTags', locale],
      queryFn: () => client.blogPostsTags({ locale }),
    })
    await queryClient.prefetchQuery({
      queryKey: ['pageCategories', locale],
      queryFn: () => client.pageCategories({ locale }),
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
    queryKey: getRelatedBlogPostsQueryKey(page, locale),
    queryFn: () => relatedBlogPostsFetcher(page, locale),
  })

  return dehydrate(queryClient)
}
