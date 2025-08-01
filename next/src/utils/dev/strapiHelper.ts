/* eslint-disable no-console,@typescript-eslint/no-unused-vars */

import { SectionsFragment } from '@/src/services/graphql'
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

type SectionName = SectionsFragment['__typename']

const filterMarkdown = (text: string) => {
  const h1Headings = text.match(/^#\s+(.*)$/gm)
  const h2Headings = text.match(/^##\s+(.*)$/gm)
  const h3Headings = text.match(/^###\s+(.*)$/gm)
  const h4Headings = text.match(/^#{4}\s+(.*)$/gm)
  const boldHeadings = text.match(/^\*\*+\s*(.*)\s*\*\*+$/gm)
  const bullets = text.match(/^•+\s*(.*)$/gm) // • //	//
  // eslint-disable-next-line no-control-regex
  const tabs = text.match(/	+(.*)$/gm) // checking for tabs

  return { h1Headings, h2Headings, h3Headings, h4Headings, boldHeadings, bullets, tabs }
}

export async function listArticles() {
  const { articles } = await client.Dev_AllArticles({ locale: 'all', limit: -1 })

  const filteredArticles = articles
    .filter(isDefined)
    // .filter((article) => !article.perex?.length)
    // .filter((article) => !article.content?.length)
    .filter((article) => {
      // const perex = article.perex ?? ''
      const firstParagraph = (article.content ?? '').trim().split('\n')[0]
      const indexOfDash = (article.perex ?? '').trim().indexOf('–') // – // -

      const perexPurified = (article.perex?.slice(indexOfDash + 2) ?? '').trim()

      // return (article.content ?? '') !== (article.content ?? '').trim()
      // return firstParagraph.length === 0
      // return perex === firstParagraph
      return perexPurified === firstParagraph
    })

  console.log('-----------------------------------------------------------------------------------')
  console.log('Number of all articles:', articles.length)
  console.log('Number of filteredArticles:', filteredArticles.length)
  console.log(
    filteredArticles.map((article) => {
      return `${article.documentId} ${article.slug}`
    }),
  )
}

export async function listPages() {
  const { pages } = await client.Dev_AllPages({ locale: 'sk', limit: -1 })

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
        page.sections?.filter((section) => section?.__typename === 'ComponentSectionsVideos') ?? []

      return sections.some(
        (section) =>
          section?.__typename === 'ComponentSectionsVideos' &&
          section.videos?.filter(isDefined).some((video) => !video.url),
        // section.width === 'wide',
      )
    })

  console.log('-----------------------------------------------------------------------------------')
  console.log('Number of all pages:', pages.length)
  console.log('Number of filteredPages:', filteredPages.length)
  console.log(
    filteredPages.map((page) => {
      const length = page.sections
        ?.filter(isDefined)
        .filter((section) => section.__typename === 'ComponentSectionsVideos')
        .map((section) =>
          section.__typename === 'ComponentSectionsVideos' ? section.videos?.length : -1,
        )

      return `${page.documentId} ${length} ${page.slug}`
    }),
  )
}

// eslint-disable-next-line sonarjs/cognitive-complexity
export async function logAllSectionsByType({
  entityType,
  sectionName,
  locale,
  showExtendedInfo = false,
}: {
  entityType: 'page'
  sectionName: SectionName
  locale?: string
  showExtendedInfo?: boolean
}) {
  let data
  let entities

  const foundEntities: { count: number; [key: string]: number } = { count: 0 }
  let foundSectionsCount = 0

  // eslint-disable-next-line sonarjs/no-small-switch
  switch (entityType) {
    case 'page':
      data = await client.Dev_AllPages({ locale: locale ?? 'all', limit: -1 })
      entities = data.pages.filter(isDefined) ?? []
      break

    default:
      break
  }
  if (!entities) {
    return
  }

  console.log('\n')

  console.log(`Searching through ${CONSOLE_BLUE}${process.env.STRAPI_URL}${CONSOLE_WHITE}`)
  console.log(
    `For all entities of type ${CONSOLE_BLUE}${entityType}${CONSOLE_WHITE}, logging all sections with __typename ${CONSOLE_BLUE}${sectionName}${CONSOLE_WHITE}`,
  )
  console.log('\n')

  entities.forEach((entity) => {
    const strapiEntityLink = `${process.env.STRAPI_URL}/admin/content-manager/collection-types/api::${entityType}.${entityType}/${entity.documentId}`
    const strapiEntityLinkProd = `https://bratislava-strapi.bratislava.sk/admin/content-manager/collection-types/api::${entityType}.${entityType}/${entity.documentId}`
    // const nextEntityLinkProd = `https://bratislava.sk/${entity.attributes?.slug}`
    const nextEntityLinkProd = `http://localhost:3000/${entity.slug}`

    const entityLog: { __typename: SectionName; title: string | null | undefined }[] = []

    entity.sections?.forEach((section) => {
      if (section?.__typename === sectionName) {
        entityLog.push({
          __typename: sectionName,
          title: entity.title,
        })

        foundSectionsCount += 1
        if (entity.documentId && !foundEntities[entity.documentId]) {
          foundEntities.count += 1
        }
      }
    })

    const entityLogMessage = entityLog
      .map(
        (sectionLog) =>
          `- ${CONSOLE_GREEN}${sectionLog.title}${CONSOLE_WHITE} ${CONSOLE_GREY}${sectionLog.__typename}${CONSOLE_WHITE}`,
      )
      .join('\n')

    if (entityLog.length === 0) return

    if (showExtendedInfo) {
      console.log(`[${entityType}] ${entity.title}`)
      console.log(`${strapiEntityLink}`)
      console.log(`${strapiEntityLinkProd}`)
      console.log(`${nextEntityLinkProd}`)
      console.log(entityLogMessage)
      console.log('\n')
    } else {
      console.log(
        `${entityLog.length}x ${sectionName?.replace(
          'ComponentSections',
          '',
        )} found at ${nextEntityLinkProd} ${CONSOLE_GREY}${strapiEntityLink}${CONSOLE_WHITE}`,
      )
    }
  })

  console.log('\n')
  console.log(
    `${CONSOLE_YELLOW}Finished searching through ${CONSOLE_BLUE}${process.env.STRAPI_URL}${CONSOLE_GREY} (to search other Strapi instances, change your .env.local)`,
  )
  console.log(
    `${CONSOLE_YELLOW}Found ${CONSOLE_BLUE}${foundSectionsCount}${CONSOLE_YELLOW} sections with __typename ${CONSOLE_BLUE}${sectionName}${CONSOLE_YELLOW} within \u001B[34m${foundEntities.count} ${CONSOLE_YELLOW}entities of type ${CONSOLE_BLUE}${entityType}\u001B[0m `,
  )
  console.log(
    '_______________________________________________________________________________________________________________',
    '\n',
  )
}
