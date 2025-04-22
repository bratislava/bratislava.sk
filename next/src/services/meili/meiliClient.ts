import { MeiliSearch } from 'meilisearch'

export const MEILI_PAGE_SIZE = 10

// eslint-disable-next-line no-console
console.log(
  'NEXT_PUBLIC_MEILISEARCH_HOST:',
  process.env.NEXT_PUBLIC_MEILISEARCH_HOST,
  process.env.NEXT_PUBLIC_MEILISEARCH_SEARCH_API_KEY,
)

export const meiliClient = new MeiliSearch({
  host: process.env.NEXT_PUBLIC_MEILISEARCH_HOST ?? '',
  apiKey: process.env.NEXT_PUBLIC_MEILISEARCH_SEARCH_API_KEY,
})
