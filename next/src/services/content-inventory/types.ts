/** Every content type that has its own url on the website, i.e. everything the inventory can list. */
export const inventoryTypes = [
  'page',
  'article',
  'asset',
  'regulation',
  'inba-release',
  'urban-study',
  'official-board',
  'municipal-service',
] as const

export type InventoryType = (typeof inventoryTypes)[number]

/** A taxonomy an entry is filed under - categories are their own content types in Strapi, shared across entries. */
export type InventoryCategory = {
  title: string
  /** Slug can serve as an unique identifier. */
  slug: string
}

/** The organisation an entry's content belongs to, taken from its admin group. */
export type InventoryOwner = {
  title: string
  /** Slug can serve as an unique identifier. */
  slug: string
}

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
  /** `sk` or `en`. Content that is not localised is listed as `sk`. */
  locale: string
  /** False for every content type but page and article - the rest exists only once, in Slovak. */
  isLocalized: boolean
  /** As shown to a visitor. */
  title: string
  /** First non-empty of perex / subtext / description. */
  summary?: string
  /**
   * Who the content belongs to, from the entry's admin group. Absent for content that has no admin group, which is
   * most of the website - the city itself is not modelled as one.
   */
  owner?: InventoryOwner
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
  /** How the link names its target. */
  title: string
  /** The `url` of the linked entry, absolute and locale prefixed. */
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
  /** Usually "Kontakty", but it's helpful when page contains more contacts sections to distinguish between them. */
  title?: string
  /** As the editor wrote it in markdown. Sometimes contains important information how the contact should be used. */
  subtext?: string
  /** The section's contact cards, in the order they are rendered. */
  contactItems: InventoryContact[]
}

/** A single contact card of a contacts section, as it is rendered on the page. */
export type InventoryContact =
  | {
      type: InventoryContactType
      /** Set only where the editor overrode the default label of the type. */
      customLabel?: string
      /** The contact itself, as the editor wrote it - an address, an email, a phone number, an IBAN and so on. */
      value: string
    }
  | {
      type: 'person'
      /** The person's name, which is also the card's label. */
      name: string
      email?: string
      phone?: string
      /** What the person is responsible for, or their role. */
      subtext?: string
    }
  | {
      type: 'directions'
      /** Set only where the editor overrode the default label. */
      customLabel?: string
      /** The street address the directions lead to. */
      address: string
      /** Where and how to park. */
      parkingInfo?: string
      /** Which lines stop nearby. */
      publicTransportInfo?: string
      /** How accessible the place is. */
      barrierFreeInfo?: string
      /** The map embedded in the card, as the url of its iframe. */
      mapUrl?: string
    }

export type PageInventoryData = {
  /** The SEO meta description. */
  metaDescription?: string
  /** The SEO keywords, separated by coma (or semicolon). */
  keywords?: string
  /** Assets the page links through its document sections, in the order they are rendered. */
  assets?: InventoryLink[]
  /** Regulations the page links through its regulation sections. */
  regulations?: InventoryLink[]
  /** The page's contacts sections, in the order they are rendered, each with its own cards. */
  contacts?: InventoryContactsSection[]
}

export type ArticleInventoryData = {
  /** The type of article. */
  category?: InventoryCategory
  /** The article's topics. */
  tags: { title: string; slug: string }[]
  /** The inba release the article was published in, for the articles that come from one. */
  inbaRelease?: InventoryLink
}

export type AssetInventoryData = {
  /** The single category the asset is filed under. */
  category?: InventoryCategory
}

export type RegulationInventoryData = {
  /** The number the regulation is cited by, e.g. `1/2023`. */
  regNumber: string
  /** The single category the regulation is filed under. */
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
    /** False once the regulation is cancelled, i.e. whenever `regRelations.cancelledBy` is set. */
    isValid: boolean
    /** When the regulation took effect. */
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
  /** The year the study was released. */
  year?: string
  /** The type of urban study. */
  category?: InventoryCategory
  /** How far along the study is, e.g. whether it is in progress or finished. */
  state?: InventoryCategory
  /** Regulations the study is tied to. */
  regulations?: InventoryLink[]
}

/**
 * Official board documents come from GINIS, not from Strapi - they carry no slug, no locale and no editor metadata,
 * only what the board's document list returns.
 */
export type OfficialBoardInventoryData = {
  /** The board category the document is posted under, as GINIS names it - a plain name, with no slug behind it. */
  category?: string
  /**
   * How many files are attached to the document. The board's document list returns only their count - the files
   * themselves would need one detail request per document, so `files` stays empty for this type.
   */
  numberOfFiles: number
  /** When the document is taken off the board. Absent for a document posted without an end date. */
  publishedUntil?: string
}

/**
 * Municipal services come from the city account (konto.bratislava.sk) and its own Strapi, so they carry that site's
 * taxonomies instead of this website's ones.
 */
export type MunicipalServiceInventoryData = {
  /** The categories the service is filed under on the city account - most services have exactly one. */
  categories?: InventoryCategory[]
  /** The service's contacts sections, the same shape a page of this website carries them in. */
  contacts?: InventoryContactsSection[]
}

/** What one build of the inventory produces - the entries plus the taxonomies listed next to them. */
export type Inventory = {
  entries: InventoryEntry[]
  taxonomies: InventoryTaxonomies
}

/** Each content type carries only its own data, under the key named after the type. */
export type InventoryEntry =
  | (InventoryEntryBase & { type: 'page'; page?: PageInventoryData })
  | (InventoryEntryBase & { type: 'article'; article?: ArticleInventoryData })
  | (InventoryEntryBase & { type: 'asset'; asset?: AssetInventoryData })
  | (InventoryEntryBase & { type: 'regulation'; regulation: RegulationInventoryData })
  | (InventoryEntryBase & { type: 'inba-release'; 'inba-release'?: InbaReleaseInventoryData })
  | (InventoryEntryBase & { type: 'urban-study'; 'urban-study'?: UrbanStudyInventoryData })
  | (InventoryEntryBase & { type: 'official-board'; 'official-board': OfficialBoardInventoryData })
  | (InventoryEntryBase & {
      type: 'municipal-service'
      'municipal-service'?: MunicipalServiceInventoryData
    })

/**
 * One value of a taxonomy, listed alongside the entries so a consumer sees the whole taxonomy and not only the values
 * in use. The entries reference these by slug, the way they name their own category and tags.
 */
export type InventoryTaxonomy = {
  title: string
  /** Absent for the official board, whose categories come from GINIS and are named rather than slugged. */
  slug?: string
  /** `sk` for the taxonomies that are not localized, the way an entry of a content type that is not localized is. */
  locale: string
}

/** Every taxonomy the entries are filed under, each listed whole. */
export type InventoryTaxonomies = {
  /** The types of an article, i.e. what `article.category` names. */
  articleCategories: InventoryTaxonomy[]
  /** The topics of an article, i.e. what `article.tags` name. */
  tags: InventoryTaxonomy[]
  /** What `asset.category` names. */
  assetCategories: InventoryTaxonomy[]
  /** What `regulation.category` names. */
  regulationCategories: InventoryTaxonomy[]
  /** What `urban-study.category` names. */
  urbanStudyCategories: InventoryTaxonomy[]
  /** What `urban-study.state` names. */
  urbanStudyStates: InventoryTaxonomy[]
  /** The board's own categories, from GINIS. `official-board.category` names them by their title. */
  officialBoardCategories: InventoryTaxonomy[]
  /** The city account's categories, i.e. what `municipal-service.categories` name. */
  municipalServiceCategories: InventoryTaxonomy[]
}

/** Reduced entry returned for `?fields=url`, meant for cheap diffing (including detecting removals). */
export type InventoryUrlEntry = Pick<InventoryEntryBase, 'id' | 'url' | 'modifiedAt'>

export type InventoryResponse = {
  /** The shape of the entries, bumped whenever a change can break consumers. Changelog in content-inventory.md. */
  version: number
  /** When the snapshot the response is served from was built, not when the request was handled. */
  generatedAt: string
  /** Number of entries matching the filters, across all pages. */
  totalItems: number
  /** The requested page, 1 based. 1 for a response that was not paginated. */
  page: number
  /** How many entries a page holds. `totalItems` for a response that was not paginated. */
  pageSize: number
  /** How many pages the filtered entries span. */
  pageCount: number
  /** The entries themselves, the most recently changed first. Reduced to `InventoryUrlEntry` for `?fields=url`. */
  items: (InventoryEntry | InventoryUrlEntry)[]
  /** Every taxonomy there is, whole - the filters and the pagination apply to `items` alone. */
  taxonomies: InventoryTaxonomies
}
