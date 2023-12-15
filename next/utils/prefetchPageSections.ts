import {
  getGinisOfficialBoardQueryKey,
  ginisOfficialBoardFetcher,
} from '@backend/ginis/fetchers/ginisOfficialBoard.fetcher'
import { PageEntityFragment } from '@backend/graphql'
import {
  getRelatedBlogPostsQueryKey,
  relatedBlogPostsFetcher,
} from '@backend/graphql/fetchers/relatedBlogPosts.fetcher'
import { client } from '@backend/graphql/gql'
import {
  getMsGraphStructureQueryKey,
  msGraphStructureFetcher,
} from '@backend/ms-graph/fetchers/msGraphStructure.fetcher'
import { dehydrate, QueryClient } from '@tanstack/react-query'

export const prefetchPageSections = async (page: PageEntityFragment, locale: string) => {
  const queryClient = new QueryClient()

  // TODO prefetch all needed sections
  const sectionTypes = page?.attributes?.sections?.map((section) => section?.__typename) ?? []

  // if (sectionTypes.includes('ComponentSectionsPartners')) {
  //   await queryClient.prefetchQuery(getPartnersQueryKey(locale), () => partnersFetcher(locale))
  // }

  if (sectionTypes.includes('ComponentSectionsBlogPostsList')) {
    await queryClient.prefetchQuery(['blogPostsTags', locale], () =>
      client.blogPostsTags({ locale }),
    )
    await queryClient.prefetchQuery(['pageCategories', locale], () =>
      client.pageCategories({ locale }),
    )
  }

  if (sectionTypes.includes('ComponentSectionsInbaArticlesList')) {
    await queryClient.prefetchQuery(['InbaTags', locale], () => client.InbaTags({ locale }))
  }

  if (sectionTypes.includes('ComponentSectionsOfficialBoard')) {
    await queryClient.prefetchQuery(getGinisOfficialBoardQueryKey(''), () =>
      ginisOfficialBoardFetcher(''),
    )
  }

  if (sectionTypes.includes('ComponentSectionsOrganizationalStructure')) {
    await queryClient.prefetchQuery(getMsGraphStructureQueryKey(), () => msGraphStructureFetcher())
  }

  await queryClient.prefetchQuery(getRelatedBlogPostsQueryKey(page, locale), () =>
    relatedBlogPostsFetcher(page, locale),
  )

  return dehydrate(queryClient)
}
