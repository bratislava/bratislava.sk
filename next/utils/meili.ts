import { MeiliSearch } from 'meilisearch'

export const MEILI_PAGE_SIZE = 10

const meiliClient = new MeiliSearch({
  host: process.env.NEXT_PUBLIC_MEILI_HOST,
  apiKey: process.env.NEXT_PUBLIC_MEILI_API_KEY,
})

export const searchVZN = async (search: string, offset: number, limit?: number) => {
  return meiliClient.index('vzn').search(search || '*', {
    sort: ['validFrom:desc'],
    offset,
    limit,
  })
}

export const searchArticles = async (search: string, locale: string, limit: number) => {
  const data = await meiliClient.index('blog-post').search(search || '*', {
    limit,
    sort: ['publishedAt:desc'],
    filter: [`locale = ${locale}`],
  })

  data.hits = data.hits.map((article) => {
    return {
      data: {
        attributes: {
          coverImage: {
            data: {
              attributes: {
                url: article?.coverImage?.url,
              },
            },
          },
          publishedAt: article.publishedAt,
          tag: {
            data: {
              attributes: {
                pageCategory: {
                  data: {
                    attributes: {
                      color: 'red', // hardcoded, api does not return this attribute
                      shortTitle: article?.tag?.title,
                    },
                  },
                },
              },
            },
          },
          title: article.title,
          slug: article.slug,
        },
      },
    }
  })
  return data
}

export const searchPages = async (search: string, locale: string, offset = 0) => {
  const data = await meiliClient.index('page').search(search || '*', {
    filter: [`locale = ${locale}`],
    // offset,
  })

  data.hits = data.hits.map((page) => {
    return {
      pageColor: page.pageColor,
      title: page.title,
      slug: page.slug,
    }
  })
  return data
}
