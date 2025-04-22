/* eslint-disable no-console */

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
  const tabs = text.match(/	+(.*)$/gm) // • //	//

  return { h1Headings, h2Headings, h3Headings, h4Headings, boldHeadings, bullets, tabs }
}

export async function listBlogPosts() {
  const { blogPosts } = await client.Dev_AllBlogPosts({ locale: 'all', limit: -1 })

  const posts = blogPosts?.data ?? []

  const filteredPosts = posts
    .map(({ id, attributes }) => {
      return { id, ...attributes }
    })
    .filter(isDefined)
    // .filter((post) => post.title?.trim().includes('\n'))
    // .filter((post) => !post.addedAt)
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
    // .filter((post) => post.sections && post.sections.length === 0)
    // .filter((post) => post.sections && post.sections.length > 1 && post.tag?.data?.id !== '37')
    // .filter((post) => post.sections && post.sections.length > 2)
    // .filter(
    //   (post) =>
    //     post.sections &&
    //     post.sections.length === 2 &&
    //     post.sections[0]?.__typename !== 'ComponentSectionsNarrowText',
    // )
    // .filter(
    //   (post) =>
    //     post.sections &&
    //     post.sections.length === 2 &&
    //     post.sections[1]?.__typename !== 'ComponentSectionsFileList',
    // )
    // .filter(
    //   (post) =>
    //     post.slug ===
    //     post.localizations?.data.find((post) => post.attributes?.locale === 'en')?.attributes?.slug,
    // )
    .filter((post) => {
      const { h1Headings, h2Headings, h3Headings, h4Headings, boldHeadings, bullets } =
        filterMarkdown(
          post.sections?.length && post.sections[0]?.__typename === 'ComponentSectionsNarrowText'
            ? (post.sections[0].content ?? '')
            : '',
        )

      const h1HeadingsLength = h1Headings?.length ?? 0
      const h2HeadingsLength = h2Headings?.length ?? 0
      const h3HeadingsLength = h3Headings?.length ?? 0
      const h4HeadingsLength = h4Headings?.length ?? 0
      const boldHeadingsLength = boldHeadings?.length ?? 0
      const bulletsLength = bullets?.length ?? 0

      return bulletsLength > 0
    })

  console.log('-----------------------------------------------------------------------------------')
  console.log('Number of all posts:', posts.length)
  console.log('Number of filteredPosts:', filteredPosts.length)
  const contentToWrite = filteredPosts.map((post) => {
    const strapiEntityLink = `${process.env.STRAPI_URL}/admin/content-manager/collection-types/api::blog-post.blog-post/${post.id}`
    const strapiEntityLinkProd = `https://bratislava-strapi.bratislava.sk/admin/content-manager/collection-types/api::blog-post.blog-post/${post.id}`
    const prodLink = `https://bratislava.sk/${post.locale === 'en' ? 'en/' : ''}blog/${post.slug}`

    return [post.id, post.slug, prodLink, strapiEntityLink, strapiEntityLinkProd].join(',')
  })

  // fs.writeFile('./test.txt', contentToWrite.join('\n'), (err) => {
  //   if (err) {
  //     console.error(err)
  //   } else {
  //     console.log('Successfully written to file.')
  //   }
  // })
}

// eslint-disable-next-line sonarjs/cognitive-complexity
export async function logAllSectionsByType({
  entityType,
  sectionName,
  locale,
  showExtendedInfo = false,
}: {
  entityType: 'blog-post'
  sectionName: SectionName
  locale?: string
  showExtendedInfo?: boolean
}) {
  let data
  let entities

  const foundEntities: { count: number; [key: string]: number } = { count: 0 }
  let foundSectionsCount = 0

  switch (entityType) {
    case 'blog-post':
      data = await client.Dev_AllBlogPosts({ locale: locale ?? 'all', limit: -1 })
      entities = data.blogPosts?.data ?? []
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
    const strapiEntityLink = `${process.env.STRAPI_URL}/admin/content-manager/collection-types/api::${entityType}.${entityType}/${entity.id}`
    const strapiEntityLinkProd = `https://bratislava-strapi.bratislava.sk/admin/content-manager/collection-types/api::${entityType}.${entityType}/${entity.id}`
    const nextEntityLinkProd = `https://bratislava.sk/blog/${entity.attributes?.slug}`

    const entityLog: { __typename: SectionName; title: string | undefined }[] = []

    entity.attributes?.sections?.forEach((section) => {
      if (section?.__typename === sectionName) {
        entityLog.push({
          __typename: sectionName,
          title: entity.attributes?.title,
        })

        foundSectionsCount += 1
        if (entity.id && !foundEntities[entity.id]) {
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
      console.log(`[${entityType}] ${entity.attributes?.title}`)
      console.log(`${strapiEntityLink}`)
      console.log(`${strapiEntityLinkProd}`)
      console.log(`${nextEntityLinkProd}`)
      console.log(entityLogMessage)
      console.log('\n')
    } else {
      console.log(
        `${entityLog.length}x ${sectionName?.replace('ComponentSections', '')} found at ${entity.attributes?.slug} ${CONSOLE_GREY}${strapiEntityLink}${CONSOLE_WHITE}`,
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
