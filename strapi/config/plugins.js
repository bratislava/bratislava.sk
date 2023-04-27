const meilisearchConfig = require('./plugins.meilisearch.config')

module.exports = {
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
