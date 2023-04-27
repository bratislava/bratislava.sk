import meilisearchConfig from './plugins.meilisearch.config'

export default {
  graphql: {
    config: {
      playgroundAlways: true,
      apolloServer: {
        introspection: true,
      },
      artifacts: {
        // When changing schema path, also change watchIgnoreFiles in strapi/config/admin.js
        schema: true,
      },
    },
  },
  meilisearch: {
    config: meilisearchConfig,
  },
}
