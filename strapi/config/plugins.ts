import meilisearchConfig from './plugins.meilisearch.config'
import graphqlConfig from './plugins.graphql.config'
import configSyncConfig from './plugins.config-sync.config'

export default ({ env }) => ({
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
  email: {
    config: {
      //  mailgun email provider https://www.npmjs.com/package/@strapi/provider-email-mailgun
      provider: 'mailgun',
      providerOptions: {
        key: env('MAILGUN_API_KEY'), // Required
        domain: env('MAILGUN_DOMAIN'), // Required
        url: 'https://api.eu.mailgun.net', //Optional. If domain region is Europe use 'https://api.eu.mailgun.net'
      },
      settings: {
        defaultFrom: env('MAILGUN_EMAIL'),
        defaultReplyTo: env('MAILGUN_EMAIL')
      },
    },
  },
})
