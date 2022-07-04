import { GraphQLClient } from 'graphql-request'
import { getSdk } from '@bratislava/strapi-sdk-homepage'
import getConfig from 'next/config'
const { serverRuntimeConfig } = getConfig()

// URL becomes full url to strapi on server, but just /graphql (for proxy) on client

const protocol =
  serverRuntimeConfig?.strapiUrl &&
  (serverRuntimeConfig?.strapiUrl.startsWith('http://') || serverRuntimeConfig?.strapiUrl.startsWith('https://'))
    ? ''
    : 'http://'
const gql = new GraphQLClient(`${serverRuntimeConfig?.strapiUrl || window.location.origin}/graphql`)
export const client = getSdk(gql)
