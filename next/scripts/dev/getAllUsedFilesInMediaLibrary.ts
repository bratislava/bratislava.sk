import dotenv from 'dotenv'
import { GraphQLClient } from 'graphql-request'

import { getSdk } from '@/src/services/graphql'
import { isDefined } from '@/src/utils/isDefined'

// Load envs
dotenv.config({ path: '.env.local' })

const gql = new GraphQLClient(`${process.env.NEXT_PUBLIC_STRAPI_URL}/graphql`)
export const client = getSdk(gql)

// Run for both locales separately
const locale = 'sk'

const getAllUsedFilesInMediaLibrary = async () => {
  const allFilesQuery = await client.allFiles({ locale })

  const ids: Array<string | null | undefined> = []
  allFilesQuery.articles.forEach((article) => {
    ids.push(article?.coverMedia?.documentId)
    article?.files?.forEach((file) => ids.push(file?.media?.documentId))
    article?.gallery?.forEach((image) => ids.push(image?.documentId))
  })
  allFilesQuery.inbaReleases.forEach((release) => {
    ids.push(release?.coverImage?.documentId, release?.rearImage?.documentId)
    release?.files?.forEach((file) => ids.push(file?.media?.documentId))
  })
  allFilesQuery.regulations.forEach((regulation) => {
    ids.push(regulation?.mainDocument.documentId)
    regulation?.attachments?.forEach((attachment) => ids.push(attachment?.documentId))
  })
  allFilesQuery.pages.forEach((page) => {
    ids.push(page?.pageBackgroundImage?.documentId)
    page?.pageHeaderSections?.forEach((pageHeaderSection) => {
      if (pageHeaderSection?.__typename === 'ComponentHeaderSectionsFacility') {
        pageHeaderSection.media.forEach((media) => ids.push(media?.documentId))
      }
    })
    page?.sections?.forEach((section) => {
      // eslint-disable-next-line default-case
      switch (section?.__typename) {
        case 'ComponentSectionsAccordion':
          section?.flatText?.forEach((flatText) => {
            flatText?.fileList?.forEach((file) => ids.push(file?.media?.documentId))
          })
          break

        case 'ComponentSectionsBanner':
          ids.push(section?.media?.documentId)
          break

        case 'ComponentSectionsColumns':
          section?.columns?.forEach((column) => ids.push(column?.image?.documentId))
          break

        case 'ComponentSectionsComparisonSection':
          section?.cards?.forEach((card) => ids.push(card?.iconMedia?.documentId))
          break

        case 'ComponentSectionsFileList':
          section?.fileList?.forEach((file) => ids.push(file?.media?.documentId))
          break

        case 'ComponentSectionsGallery':
          section?.medias?.forEach((media) => ids.push(media?.documentId))
          break

        case 'ComponentSectionsPartners':
          section?.partners?.forEach((partner) => ids.push(partner?.logo?.documentId))
          break

        case 'ComponentSectionsTextWithImage':
          ids.push(section?.imageSrc?.documentId)
          break

        case 'ComponentSectionsTextWithImageOverlapped':
          ids.push(section?.image?.documentId)
          break
      }
    })
  })

  const filteredIds = ids.filter(isDefined)

  console.log('all used files length', filteredIds.length, new Set(filteredIds).size)
}

// migrateDocuments()
getAllUsedFilesInMediaLibrary()
