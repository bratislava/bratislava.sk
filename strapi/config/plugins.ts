import meilisearchConfig from './plugins.meilisearch.config'
import graphqlConfig from './plugins.graphql.config'
import configSyncConfig from './plugins.config-sync.config'

export default {
  graphql: {
    config: graphqlConfig,
  },
  meilisearch: {
    config: meilisearchConfig,
  },
  'config-sync': {
    enabled: true,
    config: configSyncConfig,
  },
}
