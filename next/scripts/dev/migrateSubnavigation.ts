import dotenv from 'dotenv'
import { GraphQLClient } from 'graphql-request'

import { getSdk } from '@/src/services/graphql'
import { isDefined } from '@/src/utils/isDefined'

dotenv.config({ path: '.env.local' })

const gql = new GraphQLClient(`${process.env.STRAPI_URL}/graphql`)
export const client = getSdk(gql)

// Triple-check & test locally before running!
// Run the script for both locales separately.

const locale = 'sk'

/**
 * Temporary script to migrate SubpageList header section to new Subnavigation (rozcestnik)
 */
export const migrateSubnavigation = async () => {
  console.log(process.env.STRAPI_URL)

  const { pages } = await client.Dev_AllPages({ locale, limit: -1 })

  const filteredPages = pages
    .filter(isDefined)
    .filter((page) =>
      page.pageHeaderSections?.some(
        (section) => section?.__typename === 'ComponentSectionsSubpageList',
      ),
    )

  console.log(filteredPages.length)

  // eslint-disable-next-line no-restricted-syntax
  for (const page of filteredPages) {
    const [subpageList] =
      page.pageHeaderSections?.filter(
        (header) => header?.__typename === 'ComponentSectionsSubpageList',
      ) ?? []

    if (!(subpageList && subpageList.__typename === 'ComponentSectionsSubpageList')) {
      // eslint-disable-next-line no-continue
      continue
    }

    const oldLinks = subpageList.subpageList?.filter(isDefined) ?? []

    if (oldLinks.length === 0) {
      // eslint-disable-next-line no-continue
      continue
    }

    console.log(page.slug, page.documentId, oldLinks.length)

    const links =
      oldLinks.map((link) => {
        return {
          label: link.label,
          url: link.url,
          analyticsId: link.analyticsId,
          page: link.page?.documentId,
        }
      }) ?? []

    // console.log(links)

    // eslint-disable-next-line no-await-in-loop
    await client.updatePage({
      documentId: page.documentId,
      locale,
      pageInput: { subnavigation: { links } },
    })
  }
}

migrateSubnavigation()
