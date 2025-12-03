import dotenv from 'dotenv'
import { GraphQLClient } from 'graphql-request'

import { getSdk } from '@/src/services/graphql'
import { isDefined } from '@/src/utils/isDefined'

// Load envs
dotenv.config({ path: '.env.local' })

const gql = new GraphQLClient(`${process.env.NEXT_PUBLIC_STRAPI_URL}/graphql`)
export const client = getSdk(gql)

export const listPages = async () => {
  const { pages } = await client.Dev_AllPages({ locale: 'sk', limit: -1 })

  console.log('≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥≥')

  const filteredPages = pages
    .filter(isDefined)
    // .filter((page) => !page.title?.trim())
    // .filter((page) => page.title?.includes('/n'))
    // .filter((page) => page.title && page.title.length > 255)
    // .filter((page) => {
    // return page.pageColor !== page.pageCategory?.data?.attributes?.color
    // })
    // .filter((page) => !page.slug?.includes('/'))
    .filter((page) => {
      const sections =
        page.sections?.filter((section) => section?.__typename === 'ComponentSectionsIframe') ?? []

      sections.forEach((section) => {
        console.log(
          `${page.documentId} iframeHeight: ${section.iframeHeight}, allowGeolocation: ${section.allowGeolocation} ${page.slug}`,
        )
      })

      return sections.some(
        (section) => section?.__typename === 'ComponentSectionsIframe',
        // section.width === 'wide',
      )
    })

  console.log('-----------------------------------------------------------------------------------')
  console.log('Number of all pages:', pages.length)
  console.log('Number of filteredPages:', filteredPages.length)
}

// eslint-disable-next-line unicorn/prefer-top-level-await
listPages()
