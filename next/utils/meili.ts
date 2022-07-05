import { MeiliSearch } from 'meilisearch'

export const MEILI_PAGE_SIZE = 10

console.log(process.env.NEXT_PUBLIC_MEILI_HOST)
console.log(process.env.NEXT_PUBLIC_MEILI_API_KEY)

const meiliClient = new MeiliSearch({
  host: process.env.NEXT_PUBLIC_MEILI_HOST,
  apiKey: process.env.NEXT_PUBLIC_MEILI_API_KEY,
})

export const searchVZN = async (search: string, offset: number) => {
  return await meiliClient.index('vzn').search(search || '*', {
    // TODO fix sortable attributes
    // sort: ['publishedAt:desc'],
    // offset,
  })
}

export const searchArticles = async (search: string, offset = 0) => {
  const data = await meiliClient.index('blog-post').search(search || '*', {
    // TODO fix sortable attributes
    // sort: ['publishedAt:desc'],
    // offset,
  })

  const mappedArticles = data.hits.map((article) => {
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
                      color: 'red', //hardcoded, api does not return this attribute
                      shortTitle: article?.tag?.title,
                    },
                  },
                },
              },
            },
          },
          title: article.title,
        },
      },
    }
  })
  return mappedArticles
}

export const searchPages = async (search: string, offset = 0) => {
  const data = await meiliClient.index('page').search(search || '*', {
    // TODO fix sortable attributes
    // sort: ['publishedAt:desc'],
    // offset,
  })

  const mappedPages = data.hits.map((page) => {
    return {
      pageColor: page.pageColor,
      title: page.title,
    }
  })
  return mappedPages
}
