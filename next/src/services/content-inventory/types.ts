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

/** A file attached to an entry - what a visitor can download from its page. */
export type InventoryFile = {
  /** Strapi documentId of the upload, stable across the entries that reuse the same file. */
  id: string
  /** Absolute, as served to visitors. */
  url: string
  /** The title the editor gave the file where the content type allows one, otherwise the uploaded file name. */
  title: string
}

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
  /**
   * Files a visitor can download from the entry's page, in the order they are rendered. Empty for content that has
   * none.
   */
  files: InventoryFile[]
}

/** A reference from one entry to another entry of this inventory. */
export type InventoryLink = {
  /** The `id` of the linked entry, so it can be looked up without parsing the url. */
  id: string
  title: string
  url: string
}

/** The kind of contact a card holds - the contacts section groups its cards by these. */
export type InventoryContactType =
  | 'address'
  | 'openingHours'
  | 'email'
  | 'phone'
  | 'web'
  | 'postalAddress'
  | 'billingInfo'
  | 'bankConnection'

/**
 * One contacts section of a page. Its `title` is what the cards belong to - pages listing several people or departments
 * carry one section each, so the cards must not be flattened across them.
 */
export type InventoryContactsSection = {
  title?: string
  /** As the editor wrote it, i.e. markdown. */
  subtext?: string
  contactItems: InventoryContact[]
}

/** A single contact card of a contacts section, as it is rendered on the page. */
export type InventoryContact =
  | {
      type: InventoryContactType
      /** Set only where the editor overrode the default label of the type. */
      customLabel?: string
      value: string
    }
  | {
      type: 'person'
      /** The person's name, which is also the label the card is rendered with. */
      name: string
      email?: string
      phone?: string
      subtext?: string
    }
  | {
      type: 'directions'
      /** Set only where the editor overrode the default label. */
      customLabel?: string
      address: string
      parkingInfo?: string
      publicTransportInfo?: string
      barrierFreeInfo?: string
      /** The map embedded in the card, as the url of its iframe. */
      mapUrl?: string
    }

export type PageInventoryData = {
  metaDescription?: string
  keywords?: string
  /** Assets the page links through its document sections, in the order they are rendered. */
  assets?: InventoryLink[]
  /** Regulations the page links through its regulation sections. */
  regulations?: InventoryLink[]
  /** The page's contacts sections, in the order they are rendered, each with its own cards. */
  contacts?: InventoryContactsSection[]
}

export type ArticleInventoryData = {
  category?: InventoryCategory
  tags: { title: string; slug: string }[]
  /** The inba release the article was published in, for the articles that come from one. */
  inbaRelease?: InventoryLink
}

export type AssetInventoryData = {
  category?: InventoryCategory
}

export type RegulationInventoryData = {
  regNumber: string
  category?: InventoryCategory
  /** How the regulation relates to the other ones. Omitted for a regulation that stands on its own. */
  regRelations?: {
    /** Regulations that amend this one. */
    amendments?: InventoryLink[]
    /** Regulations this one amends. */
    amending?: InventoryLink[]
    /** The regulation cancelling this one, either directly or through an amendee that got cancelled. */
    cancelledBy?: InventoryLink
    /** Regulations this one cancels. */
    cancelling?: InventoryLink[]
  }
  validity: {
    isValid: boolean
    effectiveFrom: string | null
    /** When the cancellation took effect, whether this regulation was cancelled directly or through an amendee. */
    effectiveUntil: string | null
  }
}

export type InbaReleaseInventoryData = {
  /** Articles published in the release. */
  articles?: InventoryLink[]
}

export type UrbanStudyInventoryData = {
  year?: string
  category?: InventoryCategory
  state?: InventoryCategory
  /** Regulations the study is tied to. */
  regulations?: InventoryLink[]
}

/** Each content type carries only its own data, under the key named after the type. */
export type InventoryEntry =
  | (InventoryEntryBase & { type: 'page'; page?: PageInventoryData })
  | (InventoryEntryBase & { type: 'article'; article?: ArticleInventoryData })
  | (InventoryEntryBase & { type: 'asset'; asset?: AssetInventoryData })
  | (InventoryEntryBase & { type: 'regulation'; regulation: RegulationInventoryData })
  | (InventoryEntryBase & { type: 'inba-release'; 'inba-release'?: InbaReleaseInventoryData })
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
