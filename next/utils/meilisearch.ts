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
