import dotenv from 'dotenv'
import { GraphQLClient } from 'graphql-request'

import { FileListSectionFragment, getSdk } from '@/src/services/graphql'
import { isDefined } from '@/src/utils/isDefined'

dotenv.config({ path: '.env.local' })

const gql = new GraphQLClient(`${process.env.NEXT_PUBLIC_STRAPI_URL}/graphql`)
export const client = getSdk(gql)

const locale = 'sk'

/**
 * Temporary file to migrate strapi File List section to new Documents
 */
export const migrateDocuments = async () => {
  console.log(process.env.NEXT_PUBLIC_STRAPI_URL)

  const { pages } = await client.Dev_AllPages({ locale, limit: -1 })

  const filteredPages = pages
    .filter(isDefined)
    .filter((page) =>
      page.sections?.some((section) => section?.__typename === 'ComponentSectionsFileList'),
    )
    .filter(
      (page) =>
        page.slug &&
        !(
          page.slug.includes('platna-uzemnoplanovacia-dokumentacia') ||
          page.slug.includes('archivne-pomocky')
        ),
    )
  console.log(filteredPages.length)

  // eslint-disable-next-line no-restricted-syntax
  for (const page of filteredPages) {
    const fileListSections = (page.sections?.filter(
      (section) => section?.__typename === 'ComponentSectionsFileList',
    ) ?? []) as FileListSectionFragment[]

    const counts = fileListSections.map((section) => section.fileList?.length ?? 0)
    console.log(fileListSections.length, counts, `https://bratislava.sk/${page.slug}`)

    // eslint-disable-next-line no-await-in-loop
    // await client.updatePage({
    //   documentId: page.documentId,
    //   locale,
    //   pageInput: { subnavigation: { links } },
    // })
  }
}
