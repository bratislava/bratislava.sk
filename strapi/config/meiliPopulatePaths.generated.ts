/* eslint-disable */
// Shared populate paths for Strapi Meilisearch `entriesQuery.populate` and Next `*Meili` types.
//
// AUTO-GENERATED FROM `strapi/config/plugins.meilisearch.config.ts` (resolved `entriesQuery.populate`).
// To refresh, run from `next/`:
//   npm run gen:meili:populate

export const meiliPopulatePaths = {
  page: [] as const,
  article: [
    "tags",
    "tags.pageCategory",
    "coverMedia",
    "articleCategory",
    "adminGroups",
    "inbaRelease"
  ] as const,
  asset: [
    "assetCategory",
    "adminGroups"
  ] as const,
  document: [
    "documentCategory",
    "adminGroups"
  ] as const,
  'inba-release': [] as const,
  regulation: [
    "amending",
    "amending.cancellation",
    "cancellation"
  ] as const,
  faq: [
    "faqCategory"
  ] as const,
} as const
