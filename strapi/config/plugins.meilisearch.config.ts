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
    'article.title',
    'article.perex',
    'blog-post.title',
    'blog-post.excerpt',
    'document.title',
    'document.description',
    'inba-article.title',
    'inba-release.title',
    'regulation.regNumber',
    'regulation.titleText',
    'regulation.fullTitle',
  ],
  filterableAttributes: [
    'type',
    'locale',
    'article.tag.documentId',
    'blog-post.tag.documentId',
    'document.documentCategory.documentId',
    'inba-article.inbaTag.documentId',
    'regulation.category',
  ],
  sortableAttributes: [
    'article.title',
    'article.addedAtTimestamp',
    'blog-post.title',
    'blog-post.addedAtTimestamp',
    'document.publishedAtTimestamp',
    'document.updatedAtTimestamp',
    'inba-article.title',
    'inba-article.publishedAtTimestamp',
    'inba-release.title',
    'inba-release.releaseDate', // releaseDate is not datetime but only date (e.g. 2025-12-07), so we can sort by it directly instead of creating timestamp
    'vzn.validFrom',
    'vzn.publishedAt', // TODO is it needed?
    'vzn.publishedAtTimestamp',
    'regulation.effectiveFromTimestamp',
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
      locale: '*',
    },
    settings: searchIndexSettings,
    transformEntry: ({ entry }) => wrapSearchIndexEntry('page', entry),
  },
  article: {
    indexName: 'search_index',
    entriesQuery: {
      locale: '*',
      populate: ['tag.pageCategory', 'coverMedia', 'articleCategory'],
    },
    settings: searchIndexSettings,
    transformEntry: ({ entry }) =>
      wrapSearchIndexEntry('article', {
        ...entry,
        // Meilisearch doesn't support filtering dates as ISO strings, therefore we convert it to UNIX timestamp to
        // use (number) filters.
        addedAtTimestamp: entry.addedAt ? new Date(entry.addedAt).getTime() : undefined,
        updatedAtTimestamp: entry.updated ? new Date(entry.updated).getTime() : undefined,
      }),
  },
  'blog-post': {
    indexName: 'search_index',
    entriesQuery: {
      locale: '*',
      populate: ['tag.pageCategory', 'coverImage'],
    },
    settings: searchIndexSettings,
    transformEntry: ({ entry }) =>
      wrapSearchIndexEntry('blog-post', {
        ...entry,
        // Meilisearch doesn't support filtering dates as ISO strings, therefore we convert it to UNIX timestamp to
        // use (number) filters.
        addedAtTimestamp: entry.addedAt ? new Date(entry.addedAt).getTime() : undefined,
      }),
  },
  document: {
    indexName: 'search_index',
    entriesQuery: {
      locale: '*',
    },
    settings: searchIndexSettings,
    transformEntry: ({ entry }) =>
      wrapSearchIndexEntry('document', {
        ...entry,
        // Meilisearch doesn't support filtering dates as ISO strings, therefore we convert it to UNIX timestamp to
        // use (number) filters.
        publishedAtTimestamp: entry.publishedAt ? new Date(entry.publishedAt).getTime() : undefined,
        updatedAtTimestamp: entry.updatedAt ? new Date(entry.updatedAt).getTime() : undefined,
      }),
  },
  'inba-article': {
    indexName: 'search_index',
    entriesQuery: {
      locale: '*',
      populate: ['inbaTag', 'coverImage'],
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
  'inba-release': {
    indexName: 'search_index',
    entriesQuery: {
      locale: '*',
    },
    settings: searchIndexSettings,
    transformEntry: ({ entry }) =>
      wrapSearchIndexEntry('inba-release', {
        ...entry,
      }),
  },
  regulation: {
    indexName: 'search_index',
    entriesQuery: {
      locale: '*',
      populate: ['amending', 'amending.cancellation', 'cancellation'],
    },
    settings: searchIndexSettings,
    transformEntry: ({ entry }) => {
      return wrapSearchIndexEntry('regulation', {
        ...entry,
        // Meilisearch doesn't support filtering dates as ISO strings, therefore we convert it to UNIX timestamp to
        // use (number) filters.
        effectiveFromTimestamp: entry.effectiveFrom
          ? new Date(entry.effectiveFrom).getTime()
          : undefined,
      })
    },
  },
}

export default config
