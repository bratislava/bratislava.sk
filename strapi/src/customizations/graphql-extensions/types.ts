import type { Core } from '@strapi/strapi'
import type * as Nexus from 'nexus'

/**
 * A per-content-type GraphQL extension, in the shape the GraphQL plugin's extension service takes. One per content
 * type, all of them registered in ./index.ts.
 */
export type GraphqlExtension = (options: {
  strapi: Core.Strapi
  nexus: typeof Nexus
  typeRegistry: object
}) => {
  types?: unknown[]
  typeDefs?: string
  resolvers?: object
  resolversConfig?: object
}
