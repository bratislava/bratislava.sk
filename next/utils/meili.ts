// export interface SearchRequest {
//   index: string
//   keyword: string
// }

// export const search = async ({ index, keyword }: SearchRequest): Promise<any> => {
//   const raw = JSON.stringify({
//     q: keyword,
//   })
//   const result = await fetch(`${process.env.MEILI_URL}indexes/${index}/search`, {
//     method: 'post',
//     headers: {
//       Authorization: `Bearer ${process.env.MEILI_API_KEY}`,
//       'Content-Type': 'application/json',
//     },
//     body: raw,
//   })

//   const resultData = await result.json()

//   if (resultData.error) {
//     const error = new Error(resultData.error.message)
//     console.error(error)

//     return {
//       value: [],
//     }
//   }

//   return resultData
// }

// export interface SearchFetcherProps {
//   index: string
//   keyword: string
// }

// export const searchFetcher = (props: SearchFetcherProps) => {
//   const { index, keyword } = props
//   console.log('index je ', index)
//   console.log('key je ', keyword)
//   return fetch(`/api/search?index=${index}&q=${keyword}`).then((r) => r.json())
// }

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
  return await meiliClient.index('blog-post').search(search || '*', {
    // TODO fix sortable attributes
    // sort: ['publishedAt:desc'],
    // offset,
  })
}
export const searchPages = async (search: string, offset = 0) => {
  return await meiliClient.index('page').search(search || '*', {
    // TODO fix sortable attributes
    // sort: ['publishedAt:desc'],
    // offset,
  })
}
