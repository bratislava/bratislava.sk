import { GraphQLClient } from 'graphql-request'

import { getSdk } from '@/src/services/graphql/index'
import { environment } from '@/src/environment'

const gql = new GraphQLClient(`${environment.strapiUrl}/graphql`)
export const client = getSdk(gql)
