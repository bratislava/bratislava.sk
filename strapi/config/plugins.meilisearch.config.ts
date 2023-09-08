/**
 * The indexes that are used in search are stored in one shared index. This wraps them to have a unified way for search
 * and easily unwrappable structure to be used separately.
 */
const wrapSearchIndexEntry = (type, data) => {
  // Remove when https://github.com/meilisearch/strapi-plugin-meilisearch/pull/554 merged
  const newData = { ...data }
  delete newData.createdBy
  delete newData.updatedBy

  return {
    type,
    id: data.id, // must be present to work correctly
    locale: data.locale,
    // [type] is used instead of "data", to avoid  naming clashes of filterable / sortable / searchable attributes
    [type]: newData,
  }
}

// Because a bug in Meilisearch shared index, only the last added entity's settings are used and the old ones are overwritten
// instead of merging. Therefore, for all entities we must provide shared settings.
const searchIndexSettings = {
  searchableAttributes: [
    'page.title',
    'page.keywords',
    'page.subtext',
    'page.metaDiscription', // yes, it's a typo in the field name
    'blog-post.title',
    'inba-article.title',
    'vzn.title',
    'vzn.amedmentDocument.title', // yes, it's a typo in the field name
    'vzn.cancellationDocument.title',
  ],
  filterableAttributes: [
    // All
    'type',
    // Page + Blog post + Inba article
    'locale',
    'blog-post.tag.id',
    'inba-article.tags.id',
  ],
  sortableAttributes: [
    // Blog post
    'blog-post.title',
    'blog-post.publishedAt', // TODO is it needed?
    'blog-post.publishedAtTimestamp',
    // Inba article
    'inba-article.title',
    'inba-article.publishedAtTimestamp',
    // Vzn
    'vzn.validFrom',
    'vzn.publishedAt', // TODO is it needed?
    'vzn.publishedAtTimestamp',
  ],
  pagination: {
    // https://docs.meilisearch.com/learn/advanced/known_limitations.html#maximum-number-of-results-per-search
    maxTotalHits: 100000,
  },
}

const config = {
  host: process.env.MEILISEARCH_HOST,
  apiKey: process.env.MEILISEARCH_ADMIN_API_KEY,
  page: {
    indexName: 'search_index',
    entriesQuery: {
      locale: 'all',
    },
    settings: searchIndexSettings,
    transformEntry: ({ entry }) => wrapSearchIndexEntry('page', entry),
  },
  'blog-post': {
    indexName: 'search_index',
    entriesQuery: {
      locale: 'all',
      populate: ['tag.pageCategory', 'coverImage'],
    },
    settings: searchIndexSettings,
    transformEntry: ({ entry }) =>
      wrapSearchIndexEntry('blog-post', {
        ...entry,
        // Meilisearch doesn't support filtering dates as ISO strings, therefore we convert it to UNIX timestamp to
        // use (number) filters.
        publishedAtTimestamp: entry.publishedAt ? new Date(entry.publishedAt).getTime() : undefined,
      }),
  },
  'inba-article': {
    indexName: 'search_index',
    entriesQuery: {
      locale: 'all',
      populate: ['tags', 'coverImage'],
    },
    settings: searchIndexSettings,
    transformEntry: ({ entry }) =>
      wrapSearchIndexEntry('inba-article', {
        ...entry,
        // Meilisearch doesn't support filtering dates as ISO strings, therefore we convert it to UNIX timestamp to
        // use (number) filters.
        publishedAtTimestamp: entry.publishedAt ? new Date(entry.publishedAt).getTime() : undefined,
      }),
  },
  vzn: {
    indexName: 'search_index',
    entriesQuery: {
      locale: 'all',
    },
    settings: searchIndexSettings,
    transformEntry: ({ entry }) =>
      wrapSearchIndexEntry('vzn', {
        ...entry,
        // Meilisearch doesn't support filtering dates as ISO strings, therefore we convert it to UNIX timestamp to
        // use (number) filters.
        publishedAtTimestamp: entry.publishedAt ? new Date(entry.publishedAt).getTime() : undefined,
      }),
  },
}

export default config
