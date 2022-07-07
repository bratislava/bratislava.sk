import { MeiliSearch } from 'meilisearch'

export const MEILI_PAGE_SIZE = 10

const meiliClient = new MeiliSearch({
  host: process.env.NEXT_PUBLIC_MEILI_HOST,
  apiKey: process.env.NEXT_PUBLIC_MEILI_API_KEY,
})

export const searchVZN = async (search: string, offset: number) => {
  return meiliClient.index('vzn').search(search || '*', {
    sort: ['validFrom:desc'],
    offset,
  })
}
