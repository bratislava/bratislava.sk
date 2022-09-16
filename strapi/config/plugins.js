module.exports = {
  graphql: {
    config: {
      playgroundAlways: true,
      apolloServer: {
        introspection: true,
      },
    },
  },
  meilisearch: {
    config: {
      vzn: {
        // https://github.com/meilisearch/strapi-plugin-meilisearch/issues/506
        // populateEntryRule: [cancellationDocument],
        settings: {
          sortableAttributes: ['title','validFrom', 'publishedAt']
        }
      },
      'blog-post': {
        settings: {
          sortableAttributes: ['title', 'publishedAt'],
          filterableAttributes: ['locale']
        }
      },
      page: {
        settings: {
          filterableAttributes: ['locale']
        }
      }
    },
  },
}
