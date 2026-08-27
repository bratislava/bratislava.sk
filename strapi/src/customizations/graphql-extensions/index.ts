// GraphQL schema extensions docs: https://docs.strapi.io/cms/plugins/graphql#extending-the-schema

import { Core } from '@strapi/strapi'
import { regulationGraphqlExtension } from './regulation'
import { GraphqlExtension } from './types'

const graphqlExtensions: GraphqlExtension[] = [regulationGraphqlExtension]

export const registerGraphqlExtensions = ({ strapi }: { strapi: Core.Strapi }) => {
  const extensionService = strapi.plugin('graphql').service('extension')

  graphqlExtensions.forEach((extension) => extensionService.use(extension))
}
