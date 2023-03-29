import { getSdk } from '@bratislava/strapi-sdk-homepage'
import { GraphQLClient } from 'graphql-request'
import getConfig from 'next/config'

type serverTypeConfig = {
  strapiUrl: string
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const { serverRuntimeConfig }: { serverRuntimeConfig: serverTypeConfig } = getConfig()

// URL becomes full url to strapi on server, but just /graphql (for proxy) on client

const protocol =
  serverRuntimeConfig?.strapiUrl &&
  (serverRuntimeConfig?.strapiUrl.startsWith('http://') ||
    serverRuntimeConfig?.strapiUrl.startsWith('https://'))
    ? ''
    : 'http://'

const urlWithProtocol = `${protocol}${serverRuntimeConfig.strapiUrl}`
const gql = new GraphQLClient(
  `${serverRuntimeConfig?.strapiUrl ? urlWithProtocol : window.location.origin}/graphql`,
)
export const client = getSdk(gql)
