import { MeiliSearch } from 'meilisearch'

import { environment } from '@/src/environment'

export const MEILI_PAGE_SIZE = 10

// eslint-disable-next-line no-console
console.log(
  'NEXT_PUBLIC_MEILISEARCH_HOST:',
  environment.meilisearchHost,
  environment.meilisearchSearchApiKey,
)

export const meiliClient = new MeiliSearch({
  host: environment.meilisearchHost,
  apiKey: environment.meilisearchSearchApiKey,
})
