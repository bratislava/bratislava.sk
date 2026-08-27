export const inventoryTypes = [
  'page',
  'article',
  'asset',
  'regulation',
  'inba-release',
  'urban-study',
] as const

export type InventoryType = (typeof inventoryTypes)[number]

export type InventoryCategory = { title: string; slug: string }

/**
 * Fields shared by every content type. Anything type specific lives under the `[type]` key of the entry, the same way
 * documents are wrapped in the shared Meilisearch index.
 */
export type InventoryEntryBase = {
  /** Unique key, `${type}:${documentId}:${locale}` - Strapi shares documentId across locales. */
  id: string
  /** Absolute, locale prefixed. Null only for content whose host page could not be resolved. */
  url: string | null
  locale: string
  /** False for content types that exist only once in Strapi (asset, regulation, inba-release, urban-study). */
  isLocalized: boolean
  title: string
  /** First non-empty of perex / subtext / description. */
  summary?: string
  /**
   * When the content was added, i.e. first published. Editors can override the publication date on some content types,
   * so this is the first non-empty of the type's own date (addedAt, customPublishedAt, releaseDate) and Strapi's
   * publishedAt.
   */
  addedAt: string | null
  /** When the last change was published. */
  modifiedAt: string | null
}

export type PageInventoryData = {
  metaDescription?: string
  keywords?: string
}

export type ArticleInventoryData = {
  category?: InventoryCategory
  tags: { title: string; slug: string }[]
}

export type AssetInventoryData = {
  category?: InventoryCategory
}

export type RegulationInventoryData = {
  regNumber: string
  category?: InventoryCategory
  validity: {
    isValid: boolean
    effectiveFrom: string | null
    effectiveUntil: string | null
    cancelledBy: { regNumber: string; url: string } | null
  }
}

export type UrbanStudyInventoryData = {
  year?: string
  category?: InventoryCategory
  state?: InventoryCategory
}

/** Each content type carries only its own data - `inba-release` has none beyond the shared fields. */
export type InventoryEntry =
  | (InventoryEntryBase & { type: 'page'; page?: PageInventoryData })
  | (InventoryEntryBase & { type: 'article'; article?: ArticleInventoryData })
  | (InventoryEntryBase & { type: 'asset'; asset?: AssetInventoryData })
  | (InventoryEntryBase & { type: 'regulation'; regulation: RegulationInventoryData })
  | (InventoryEntryBase & { type: 'inba-release' })
  | (InventoryEntryBase & { type: 'urban-study'; 'urban-study'?: UrbanStudyInventoryData })

/** Reduced entry returned for `?fields=url`, meant for cheap diffing (including detecting removals). */
export type InventoryUrlEntry = Pick<InventoryEntryBase, 'id' | 'url' | 'modifiedAt'>

export type InventoryResponse = {
  version: number
  generatedAt: string
  /** Number of entries matching the filters, across all pages. */
  totalItems: number
  page: number
  pageSize: number
  pageCount: number
  items: (InventoryEntry | InventoryUrlEntry)[]
}
