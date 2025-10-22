import { GraphQLClient } from 'graphql-request'

import { getSdk } from '@/src/services/graphql/index'

const gql = new GraphQLClient(`${process.env.NEXT_PUBLIC_STRAPI_URL}/graphql`)
export const client = getSdk(gql)

