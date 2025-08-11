import { getSdk } from '@/src/services/graphql/index'
import { GraphQLClient } from 'graphql-request'

const gql = new GraphQLClient(`${process.env.STRAPI_URL}/graphql`)
export const client = getSdk(gql)

