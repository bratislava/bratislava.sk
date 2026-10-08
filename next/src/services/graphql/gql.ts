import { GraphQLClient } from 'graphql-request'

import { getSdk } from '@/src/services/graphql/index'
import { environment } from '@/src/environment'

// Server-only override, so `next build` can prerender against a different Strapi than the public one
// (e.g. a throwaway instance in CI, see .github/workflows/prerender-benchmark.yml). It is never set
// at runtime, so the deployed server and the browser keep using NEXT_PUBLIC_STRAPI_URL.
const strapiUrl =
  (typeof window === 'undefined' && process.env.STRAPI_PRERENDER_URL) || environment.strapiUrl

const gql = new GraphQLClient(`${strapiUrl}/graphql`)
export const client = getSdk(gql)
