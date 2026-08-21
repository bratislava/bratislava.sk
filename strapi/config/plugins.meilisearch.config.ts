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
    documentId: data.documentId, // must be present to work correctly
    locale: data.locale,
    // [type] is used instead of "data", to avoid  naming clashes of filterable / sortable / searchable attributes
    [type]: newData,
  }
}

/**
 * Template used by Meilisearch conversational search (chat completions) to render a document for the LLM.
 * Liquid syntax, `doc` is the document as stored in the shared index (see wrapSearchIndexEntry).
 * Types with a dash in the name must be accessed with the bracket notation.
 * Every field must be wrapped in an `if`, Meilisearch renders the template strictly and a single missing (not just
 * empty) field makes the whole document unusable for the chat - it is then silently skipped.
 */
const chatDocumentTemplate = `{{ doc.type }} ({{ doc.locale }})
{%- case doc.type -%}
{%- when 'page' -%}
{% if doc.page.title %}
Title: {{ doc.page.title }}
{%- endif -%}
{% if doc.page.subtext %}
Subtext: {{ doc.page.subtext }}
{%- endif -%}
{% if doc.page.metaDescription %}
Meta description: {{ doc.page.metaDescription }}
{%- endif -%}
{% if doc.page.keywords %}
Keywords: {{ doc.page.keywords }}
{%- endif -%}
{% if doc.page.path %}
Path: {{ doc.page.path }}
{%- endif -%}
{%- when 'article' -%}
{% if doc.article.title %}
Title: {{ doc.article.title }}
{%- endif -%}
{% if doc.article.perex %}
Perex: {{ doc.article.perex }}
{%- endif -%}
{% if doc.article.articleCategory.title %}
Category: {{ doc.article.articleCategory.title }}
{%- endif -%}
{% if doc.article.addedAt %}
Published: {{ doc.article.addedAt }}
{%- endif -%}
{% if doc.article.slug %}
Slug: {{ doc.article.slug }}
{%- endif -%}
{%- when 'asset' -%}
{% if doc.asset.title %}
Title: {{ doc.asset.title }}
{%- endif -%}
{% if doc.asset.description %}
Description: {{ doc.asset.description }}
{%- endif -%}
{% if doc.asset.assetCategory.title %}
Category: {{ doc.asset.assetCategory.title }}
{%- endif -%}
{% if doc.asset.slug %}
Slug: {{ doc.asset.slug }}
{%- endif -%}
{%- when 'urban-study' -%}
{% if doc["urban-study"].title %}
Title: {{ doc["urban-study"].title }}
{%- endif -%}
{% if doc["urban-study"].year %}
Year: {{ doc["urban-study"].year }}
{%- endif -%}
{% if doc["urban-study"].procuredBy %}
Procured by: {{ doc["urban-study"].procuredBy }}
{%- endif -%}
{% if doc["urban-study"].preparedBy %}
Prepared by: {{ doc["urban-study"].preparedBy }}
{%- endif -%}
{% if doc["urban-study"].approvalText %}
Approval: {{ doc["urban-study"].approvalText }}
{%- endif -%}
{% if doc["urban-study"].body %}
Body: {{ doc["urban-study"].body }}
{%- endif -%}
{% if doc["urban-study"].slug %}
Slug: {{ doc["urban-study"].slug }}
{%- endif -%}
{%- when 'document' -%}
{% if doc.document.title %}
Title: {{ doc.document.title }}
{%- endif -%}
{% if doc.document.description %}
Description: {{ doc.document.description }}
{%- endif -%}
{% if doc.document.documentCategory.title %}
Category: {{ doc.document.documentCategory.title }}
{%- endif -%}
{% if doc.document.slug %}
Slug: {{ doc.document.slug }}
{%- endif -%}
{%- when 'inba-release' -%}
{% if doc["inba-release"].title %}
Title: {{ doc["inba-release"].title }}
{%- endif -%}
{% if doc["inba-release"].perex %}
Perex: {{ doc["inba-release"].perex }}
{%- endif -%}
{% if doc["inba-release"].releaseDate %}
Release date: {{ doc["inba-release"].releaseDate }}
{%- endif -%}
{% if doc["inba-release"].slug %}
Slug: {{ doc["inba-release"].slug }}
{%- endif -%}
{%- when 'regulation' -%}
{% if doc.regulation.regNumber %}
Number: {{ doc.regulation.regNumber }}
{%- endif -%}
{% if doc.regulation.titleText %}
Title: {{ doc.regulation.titleText }}
{%- endif -%}
{% if doc.regulation.fullTitle %}
Full title: {{ doc.regulation.fullTitle }}
{%- endif -%}
{% if doc.regulation.effectiveFrom %}
Effective from: {{ doc.regulation.effectiveFrom }}
{%- endif -%}
{% if doc.regulation.category %}
Category: {{ doc.regulation.category }}
{%- endif -%}
{% if doc.regulation.slug %}
Slug: {{ doc.regulation.slug }}
{%- endif -%}
{%- when 'faq' -%}
{% if doc.faq.title %}
Question: {{ doc.faq.title }}
{%- endif -%}
{% if doc.faq.body %}
Answer: {{ doc.faq.body }}
{%- endif -%}
{% if doc.faq.faqCategory.title %}
Category: {{ doc.faq.faqCategory.title }}
{%- endif -%}
{%- endcase -%}`

// Because a bug in Meilisearch shared index, only the last added entity's settings are used and the old ones are overwritten
// instead of merging. Therefore, for all entities we must provide shared settings.
const searchIndexSettings = {
  searchableAttributes: [
    'page.title',
    'page.keywords',
    'page.subtext',
    'page.metaDescription',
    'article.title',
    'article.perex',
    'asset.title',
    'asset.description',
    'urban-study.title',
    'urban-study.body',
    'urban-study.approvalText',
    'urban-study.year',
    'document.title',
    'document.description',
    'inba-article.title',
    'inba-release.title',
    'regulation.regNumber',
    'regulation.titleText',
    'regulation.fullTitle',
    'faq.title',
    'faq.body',
  ],
  filterableAttributes: [
    'type',
    'locale',
    'article.articleCategory.slug',
    'article.tags.slug',
    'article.adminGroups.documentId',
    'article.adminGroups.slug',
    'article.inbaRelease.slug',
    'asset.assetCategory.slug',
    'asset.adminGroups.documentId',
    'asset.adminGroups.slug',
    'document.documentCategory.slug',
    'document.adminGroups.documentId',
    'document.adminGroups.slug',
    'urban-study.urbanStudyState.slug',
    'urban-study.urbanStudyCategory.slug',
    'faq.faqCategory.slug',
  ],
  sortableAttributes: [
    'article.title',
    'article.addedAtTimestamp',
    'document.updatedAtTimestamp',
    'asset.updatedAtTimestamp',
    'urban-study.updatedAtTimestamp',
    'urban-study.customPublishedAtTimestamp',
    'inba-release.releaseDate', // releaseDate is not datetime but only date (e.g. 2025-12-07), so we can sort by it directly instead of creating timestamp
    'regulation.effectiveFromTimestamp',
    'faq.publishedAtTimestamp',
    'faq.faqCategory.title',
  ],
  pagination: {
    // https://docs.meilisearch.com/learn/advanced/known_limitations.html#maximum-number-of-results-per-search
    maxTotalHits: 100000,
  },
  // Settings for conversational search (chat completions). Requires the `chatCompletions` experimental feature and a
  // configured chat workspace (LLM provider) on the Meilisearch instance - neither can be set from Strapi.
  // https://www.meilisearch.com/docs/reference/api/settings#chat
  chat: {
    // Used by the LLM to decide whether this index is relevant for the question.
    description:
      'Content of the official website of the city of Bratislava (bratislava.sk), in Slovak (locale "sk") and English (locale "en"). Contains city pages, news articles, official documents and assets, urban studies, city regulations (VZN), Inba magazine releases and FAQs. Use it to answer questions about city services, offices, official documents and city life in Bratislava. Documents of the type asset, regulation and inba-release have no locale field, so never filter by locale alone - either omit the locale filter completely or write it as "(locale = sk OR locale NOT EXISTS)". Most of the content is in Slovak, so search with Slovak keywords even when the question is in English.',
    documentTemplate: chatDocumentTemplate,
    // Default is 400 bytes which truncates longer documents (e.g. urban studies or FAQ answers).
    documentTemplateMaxBytes: 4000,
    searchParameters: {
      limit: 20,
      // The LLM sends whole natural language questions as the query, "last" / "all" then return nothing for most of
      // them. "frequency" drops the most common words first, which is what works for such queries.
      matchingStrategy: 'frequency',
    },
  },
}

// Complex fields have to be populated manually in the entriesQuery.
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
      populate: [
        'tags',
        'tags.pageCategory',
        'coverMedia',
        'articleCategory',
        'adminGroups',
        'inbaRelease',
      ],
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
  asset: {
    indexName: 'search_index',
    entriesQuery: {
      locale: '*',
      populate: ['assetCategory', 'adminGroups'],
    },
    settings: searchIndexSettings,
    transformEntry: ({ entry }) =>
      wrapSearchIndexEntry('asset', {
        ...entry,
        // Meilisearch doesn't support filtering dates as ISO strings, therefore we convert it to UNIX timestamp to
        // use (number) filters.
        publishedAtTimestamp: entry.publishedAt ? new Date(entry.publishedAt).getTime() : undefined,
        updatedAtTimestamp: entry.updatedAt ? new Date(entry.updatedAt).getTime() : undefined,
      }),
  },
  'urban-study': {
    indexName: 'search_index',
    entriesQuery: {
      locale: '*',
      populate: ['urbanStudyCategory', 'urbanStudyState'],
    },
    settings: searchIndexSettings,
    transformEntry: ({ entry }) =>
      wrapSearchIndexEntry('urban-study', {
        ...entry,
        // Meilisearch doesn't support filtering dates as ISO strings, therefore we convert it to UNIX timestamp to
        // use (number) filters.
        publishedAtTimestamp: entry.publishedAt ? new Date(entry.publishedAt).getTime() : undefined,
        updatedAtTimestamp: entry.updatedAt ? new Date(entry.updatedAt).getTime() : undefined,
        customPublishedAtTimestamp: entry.customPublishedAt
          ? new Date(entry.customPublishedAt).getTime()
          : undefined,
      }),
  },
  document: {
    indexName: 'search_index',
    entriesQuery: {
      locale: '*',
      populate: ['documentCategory', 'adminGroups'],
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
  faq: {
    indexName: 'search_index',
    entriesQuery: {
      locale: '*',
      populate: ['faqCategory'],
    },
    settings: searchIndexSettings,
    transformEntry: ({ entry }) =>
      wrapSearchIndexEntry('faq', {
        ...entry,
        // Meilisearch doesn't support filtering dates as ISO strings, therefore we convert it to UNIX timestamp to
        // use (number) filters.
        publishedAtTimestamp: entry.publishedAt ? new Date(entry.publishedAt).getTime() : undefined,
      }),
  },
}

export default config
