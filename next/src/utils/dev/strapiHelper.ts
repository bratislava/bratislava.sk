/* eslint-disable no-console */

import { client } from '@/src/services/graphql/gql'
import { isDefined } from '@/src/utils/isDefined'

const CONSOLE_BLUE = '\u001B[34m'
const CONSOLE_YELLOW = '\u001B[33m'
const CONSOLE_GREEN = '\u001B[32m'
const CONSOLE_WHITE = '\u001B[0m'
const CONSOLE_GREY = '\u001B[90m'

// Based on strapi graphql helper: https://github.com/bratislava/strapi-graphql-migration-helper

//  Usage example - put this inside index.tsx, inside getStaticProps:
//   await logAllSectionsByType({
//     entityType: 'page',
//     sectionName: 'ComponentSectionsBanner',
//   })

export async function listBlogPosts() {
  const { blogPosts } = await client.Dev_AllBlogPosts({ locale: 'all', limit: -1 })

  const posts = blogPosts?.data ?? []

  const filteredPosts = posts
    .map((post) => post.attributes)
    .filter(isDefined)
    // .filter((post) => post.title?.trim().includes('\n'))
    // .filter((post) => (post.title ?? '').length === 0)
    // .filter((post) => (post.title ?? '').trim().length === 0)
    // .filter((post) => (post.title ?? '').length > 255) // The most important
    // .filter((post) => (post.slug ?? '').length === 0)
    // .filter((post) => (post.slug ?? '').trim().length !== (post.slug ?? '').length)
    // .filter((post) => (post.slug ?? '').match(/[^\da-z-]/g)) // checks other characters in slug thant low letters, numbers and dashes
    // .filter((post) => post.author?.data?.attributes?.username.length)
    // .filter((post) => post.date_added == null)
    // .filter((post) => post.date_added != null && new Date(post.date_added).getHours() === 0)
    // .filter(
    //   (post) =>
    //     new Date(post.publishedAt).setUTCHours(0, 0, 0, 0) !==
    //     new Date(post.addedAt).setUTCHours(0, 0, 0, 0),
    // )
    // .filter((post) => post.moreLink)
    .filter(Boolean)

  console.log('Number of all posts:', posts.length)
  console.log('Number of filteredPosts:', filteredPosts.length)
  console.log(
    'Filtered posts:',
    filteredPosts.map((post) => {
      return `${post.slug}`
    }),
  )
}

// TODO simplify
// eslint-disable-next-line sonarjs/cognitive-complexity
// export async function logAllSectionsByType({
//   entityType,
//   sectionName,
//   locale,
//   showExtendedInfo = false,
// }: {
//   entityType: 'page' | 'workshop' | 'service'
//   sectionName: SectionName
//   locale?: string
//   showExtendedInfo?: boolean
// }) {
//   const LOCALE_DEFAULT = 'sk'
//
//   let data
//   let entities
//
//   const foundEntities: { count: number; [key: string]: number } = { count: 0 }
//   let foundSectionsCount = 0
//
//   switch (entityType) {
//     case 'page':
//       data = await client.Pages({ locale: locale ?? LOCALE_DEFAULT })
//       entities = data.pages?.data
//       break
//
//     case 'workshop':
//       data = await client.Workshops()
//       entities = data.workshops?.data
//       break
//
//     case 'service':
//       data = await client.Services({ locale: locale ?? LOCALE_DEFAULT })
//       entities = data.services?.data
//       break
//
//     default:
//       break
//   }
//   if (!entities) {
//     return
//   }
//
//   console.log('\n')
//
//   console.log(
//     `Searching through ${CONSOLE_BLUE}${process.env.NEXT_PUBLIC_STRAPI_URL}${CONSOLE_WHITE}`,
//   )
//   console.log(
//     `For all entities of type ${CONSOLE_BLUE}${entityType}${CONSOLE_WHITE}, logging all sections with __typename ${CONSOLE_BLUE}${sectionName}${CONSOLE_WHITE}`,
//   )
//   console.log('\n')
//
//   entities.forEach((entity) => {
//     const strapiEntityLink = `${process.env.NEXT_PUBLIC_STRAPI_URL}/admin/content-manager/collection-types/api::${entityType}.${entityType}/${entity.id}`
//
//     const entityLog: { __typename: SectionName; title: string | undefined }[] = []
//
//     entity.attributes?.sections?.forEach((section) => {
//       if (section?.__typename === sectionName) {
//         entityLog.push({
//           __typename: sectionName,
//           title: entity.attributes?.title,
//         })
//
//         foundSectionsCount += 1
//         if (entity.id && !foundEntities[entity.id]) {
//           foundEntities.count += 1
//         }
//       }
//     })
//
//     const entityLogMessage = entityLog
//       .map(
//         (sectionLog) =>
//           `- ${CONSOLE_GREEN}${sectionLog.title}${CONSOLE_WHITE} ${CONSOLE_GREY}${sectionLog.__typename}${CONSOLE_WHITE}`,
//       )
//       .join('\n')
//
//     if (entityLog.length === 0) return
//
//     if (showExtendedInfo) {
//       console.log(`[${entityType}] ${entity.attributes?.title}`)
//       console.log(`${strapiEntityLink}`)
//       console.log(entityLogMessage)
//       console.log('\n')
//     } else {
//       console.log(
//         `${entityLog.length}x ${sectionName?.replace('ComponentSections', '')} found at ${entity.attributes?.title} ${CONSOLE_GREY}${strapiEntityLink}${CONSOLE_WHITE}`,
//       )
//     }
//   })
//
//   console.log('\n')
//   console.log(
//     `${CONSOLE_YELLOW}Finished searching through ${CONSOLE_BLUE}${process.env.NEXT_PUBLIC_STRAPI_URL}${CONSOLE_GREY} (to search other Strapi instances, change your .env.local)`,
//   )
//   console.log(
//     `${CONSOLE_YELLOW}Found ${CONSOLE_BLUE}${foundSectionsCount}${CONSOLE_YELLOW} sections with __typename ${CONSOLE_BLUE}${sectionName}${CONSOLE_YELLOW} within \u001B[34m${foundEntities.count} ${CONSOLE_YELLOW}entities of type ${CONSOLE_BLUE}${entityType}\u001B[0m `,
//   )
//   console.log(
//     '_______________________________________________________________________________________________________________',
//     '\n',
//   )
// }
