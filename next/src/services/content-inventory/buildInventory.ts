import { environment } from '@/src/environment'
import { serverEnvironment } from '@/src/environment.server'
import {
  getMunicipalServiceCategories,
  getMunicipalServices,
} from '@/src/services/city-account/getMunicipalServices'
import { mockedParsedCategories, mockedParsedDocuments } from '@/src/services/ginis/mocks'
import { getOfficialBoardParsedCategories } from '@/src/services/ginis/server/getOfficialBoardParsedCategories'
import { getOfficialBoardParsedList } from '@/src/services/ginis/server/getOfficialBoardParsedList'
import { shouldMockGinis } from '@/src/services/ginis/utils/shouldMockGinis'
import {
  AssetSlugEntityFragment,
  ContactsSectionFragment,
  FileBlockFragment,
  FileItemBlockFragment,
  PageInventoryEntityFragment,
  UploadFileEntityFragment,
  UrbanStudyPartItemFragment,
} from '@/src/services/graphql'
import { client } from '@/src/services/graphql/gql'
import { base64Encode } from '@/src/utils/base64'
import { isDefined } from '@/src/utils/isDefined'

import {
  Inventory,
  InventoryCategory,
  InventoryContact,
  InventoryContactsSection,
  InventoryContactType,
  InventoryEntry,
  InventoryEntryBase,
  InventoryFile,
  InventoryLink,
  InventoryOwner,
  InventoryTaxonomies,
  InventoryTaxonomy,
  InventoryType,
  MunicipalServiceInventoryData,
} from './types'

// TODO: The paths are hardcoded the same way as in getLinkProps and next-sitemap.config.js, extract them once.
const getUrl = (path: string, locale = 'sk', siteUrl = environment.siteUrl) =>
  `${siteUrl.replace(/\/$/, '')}${locale === 'en' ? '/en' : ''}${path}`

const getFirstNonEmpty = (...values: (string | null | undefined)[]) =>
  values.find((value) => isDefined(value) && value.trim().length > 0) ?? undefined

/** Some dates are Strapi date fields (2026-08-03), the rest are datetimes - the api returns one format. */
const getIsoDate = (value: unknown) => {
  const date = value as string | null | undefined

  if (!date) {
    return null
  }

  return /^\d{4}-\d{2}-\d{2}$/.test(date) ? `${date}T00:00:00.000Z` : date
}

/** Omits the type specific object entirely when the content type has nothing to add. */
const getTypeData = <T extends object>(data: T) =>
  Object.values(data).some(isDefined) ? data : undefined

/** Maps a Strapi upload to the shared file shape. `title` falls back to the file name, the same way FileRowCard does. */
const getFile = (file: UploadFileEntityFragment, title?: string | null): InventoryFile => ({
  id: file.documentId,
  url: file.url,
  title: getFirstNonEmpty(title, file.name) ?? file.name,
})

/** For content types that link uploads directly. Drops the nulls the api allows in every relation. */
const getFiles = (files: (UploadFileEntityFragment | null)[]): InventoryFile[] =>
  files.filter(isDefined).map((file) => getFile(file))

/** Every block that wraps an upload with an editor title - blocks.file, accordion file items, urban study parts. */
type FileBlock = FileBlockFragment | FileItemBlockFragment | UrbanStudyPartItemFragment

/**
 * For content types that attach uploads through a block adding an editor title. The block's own id is not exposed - the
 * identity of the file is the upload it points to, so entries reusing one upload share the same `id`.
 */
const getBlockFiles = (blocks: (FileBlock | null)[] | null | undefined): InventoryFile[] =>
  (blocks ?? [])
    .filter(isDefined)
    .map((block) => (block.media ? getFile(block.media, block.title) : null))
    .filter(isDefined)

const getCategory = (
  category: InventoryCategory | null | undefined,
): InventoryCategory | undefined =>
  category ? { title: category.title, slug: category.slug } : undefined

/**
 * An entry has at most one owner, even though Strapi models admin groups as a many to many relation - the extra groups
 * are an editing permission, not a second owner, so only the first one is carried.
 */
const getOwner = (
  adminGroups: (InventoryOwner | null)[] | null | undefined,
): InventoryOwner | undefined => {
  const adminGroup = (adminGroups ?? []).filter(isDefined).at(0)

  return adminGroup ? { title: adminGroup.title, slug: adminGroup.slug } : undefined
}

/** Entries are keyed by type, documentId and locale - content that exists only once in Strapi is keyed as `sk`. */
const getEntryId = (type: InventoryType, documentId: string, locale?: string | null) =>
  `${type}:${documentId}:${locale ?? 'sk'}`

/**
 * The part of an entry that is the same for every content type. `addedAt` unifies the various "published" dates - each
 * content type passes in its own one (addedAt, customPublishedAt, releaseDate), falling back to Strapi's publishedAt.
 */
const getBase = <TType extends InventoryType>(
  type: TType,
  entry: {
    documentId: string
    path: string
    /** Only for content hosted elsewhere, i.e. the city account - everything else lives on this website. */
    siteUrl?: string
    locale?: string | null
    title: string
    summary?: string
    owner?: InventoryOwner
    addedAt?: unknown
    modifiedAt?: unknown
    files?: InventoryFile[]
  },
): InventoryEntryBase & { type: TType } => ({
  id: getEntryId(type, entry.documentId, entry.locale),
  type,
  url: getUrl(entry.path, entry.locale ?? 'sk', entry.siteUrl),
  locale: entry.locale ?? 'sk',
  isLocalized: isDefined(entry.locale),
  title: entry.title,
  summary: entry.summary,
  owner: entry.owner,
  addedAt: getIsoDate(entry.addedAt),
  modifiedAt: getIsoDate(entry.modifiedAt),
  files: entry.files ?? [],
})

/**
 * Pages carry their files in the sections dynamic zone, so the file list sections and the file lists nested in
 * accordion items are flattened into one list, in the order they appear on the page. The other sections are selected
 * by their `__typename` alone.
 */
const getPageFiles = (sections: PageInventoryEntityFragment['sections']): InventoryFile[] =>
  getBlockFiles(
    (sections ?? []).filter(isDefined).flatMap<FileBlock | null>((section) => {
      if (section.__typename === 'ComponentSectionsFileList') {
        return section.fileList ?? []
      }

      if (section.__typename === 'ComponentSectionsAccordion') {
        return (section.flatText ?? []).filter(isDefined).flatMap((item) => item.fileList ?? [])
      }

      return []
    }),
  )

/** Links to the article entries of the inventory - articles are localized, so the locale is part of their id and url. */
const getArticleLinks = (
  articles: ({ documentId: string; slug: string; title: string; locale?: string | null } | null)[],
): InventoryLink[] | undefined => {
  const links = articles.filter(isDefined).map((article) => ({
    id: getEntryId('article', article.documentId, article.locale),
    title: article.title,
    url: getUrl(`/spravy/${article.slug}`, article.locale ?? 'sk'),
  }))

  return links.length > 0 ? links : undefined
}

type RegulationLink = { documentId: string; slug: string; regNumber: string }

/** A regulation is linked by its number - `fullTitle` is the legal wording and belongs to its own entry. */
const getRegulationLink = (regulation: RegulationLink): InventoryLink => ({
  id: getEntryId('regulation', regulation.documentId),
  title: regulation.regNumber,
  url: getUrl(`/vzn/${regulation.slug}`),
})

const getRegulationLinks = (
  regulations: (RegulationLink | null)[],
): InventoryLink[] | undefined => {
  const links = regulations.filter(isDefined).map((regulation) => getRegulationLink(regulation))

  return links.length > 0 ? links : undefined
}

/**
 * Assets a page links through its document sections, in the order the sections are rendered. Undefined instead of an
 * empty list, so that pages linking nothing do not carry an empty key.
 */
const getPageAssets = (
  sections: PageInventoryEntityFragment['sections'],
): InventoryLink[] | undefined => {
  const assets = (sections ?? [])
    .filter(isDefined)
    .flatMap<AssetSlugEntityFragment | null>((section) =>
      section.__typename === 'ComponentSectionsAssets' ? section.assets : [],
    )
    .filter(isDefined)
    .map((asset) => ({
      id: getEntryId('asset', asset.documentId),
      title: asset.title,
      url: getUrl(`/dokumenty/${asset.slug}`),
    }))

  return assets.length > 0 ? assets : undefined
}

/**
 * The contacts section groups its simple cards into one list per kind - flattened here into the order `Contacts`
 * renders them in, so a section's cards read the way a visitor sees them.
 */
const contactCardTypes = {
  addressContacts: 'address',
  openingHoursContacts: 'openingHours',
  emailContacts: 'email',
  phoneContacts: 'phone',
  webContacts: 'web',
  postalAddressContacts: 'postalAddress',
  billingInfoContacts: 'billingInfo',
  bankConnectionContacts: 'bankConnection',
} as const satisfies Record<string, InventoryContactType>

/**
 * The city account uses the same contacts section as this website, so the mapping is written against the generated
 * fragment without the fields that identify it as this Strapi's - the city account's rest api names its own
 * differently, and the mapping reads neither.
 */
type ContactsSection = Omit<
  ContactsSectionFragment,
  '__typename' | 'id' | 'titleLevelContactsSection'
>

/** The person and directions cards carry their own fields, so they are mapped separately from the simple ones. */
const getSectionContacts = (section: ContactsSection): InventoryContact[] => [
  ...Object.entries(contactCardTypes).flatMap(([key, type]) =>
    (section[key as keyof typeof contactCardTypes] ?? []).filter(isDefined).map((card) => ({
      type,
      customLabel: getFirstNonEmpty(card.overrideLabel),
      value: card.value,
    })),
  ),
  ...(section.personContacts ?? []).filter(isDefined).map((person) => ({
    type: 'person' as const,
    // The card is labelled with the person's name, so it has no `customLabel` the way the other cards do.
    name: person.title,
    email: getFirstNonEmpty(person.email),
    phone: getFirstNonEmpty(person.phone),
    subtext: getFirstNonEmpty(person.subtext),
  })),
  ...(section.directionsContact
    ? [
        {
          type: 'directions' as const,
          customLabel: getFirstNonEmpty(section.directionsContact.overrideLabel),
          address: section.directionsContact.address,
          parkingInfo: getFirstNonEmpty(section.directionsContact.parkingInfo),
          publicTransportInfo: getFirstNonEmpty(section.directionsContact.publicTransportInfo),
          barrierFreeInfo: getFirstNonEmpty(section.directionsContact.barrierFreeInfo),
          mapUrl: getFirstNonEmpty(section.directionsContact.iframeUrl),
        },
      ]
    : []),
]

/**
 * The contacts sections of an entry, in the order they are rendered. The cards are kept grouped by their section - a
 * page listing several people or departments carries one section each, and its title is what the cards belong to.
 */
const getContactsSections = (
  sections: (ContactsSection | null)[],
): InventoryContactsSection[] | undefined => {
  const contactsSections = sections
    .filter(isDefined)
    .map((section) => ({
      title: getFirstNonEmpty(section.title),
      subtext: getFirstNonEmpty(section.description),
      contactItems: getSectionContacts(section),
    }))
    // A section an editor left empty adds nothing to the inventory.
    .filter((section) => section.contactItems.length > 0)

  return contactsSections.length > 0 ? contactsSections : undefined
}

/** Picks the contacts sections out of a page's dynamic zone, the same way the assets and regulations are picked. */
const getPageContacts = (sections: PageInventoryEntityFragment['sections']) =>
  getContactsSections(
    (sections ?? [])
      .filter(isDefined)
      .flatMap((section) =>
        section.__typename === 'ComponentSectionsContactsSection' ? [section] : [],
      ),
  )

/** Regulations a page links through its regulation sections, the same way `getPageAssets` collects the assets. */
const getPageRegulations = (sections: PageInventoryEntityFragment['sections']) =>
  getRegulationLinks(
    (sections ?? [])
      .filter(isDefined)
      .flatMap((section) =>
        section.__typename === 'ComponentSectionsRegulations' ? section.regulations : [],
      ),
  )

const buildPages = async (): Promise<InventoryEntry[]> => {
  const { pages } = await client.PagesInventory()

  return pages.filter(isDefined).map((page) => ({
    ...getBase('page', {
      ...page,
      path: `/${page.path}`,
      summary: getFirstNonEmpty(page.subtext, page.metaDescription),
      owner: getOwner(page.adminGroups),
      addedAt: page.publishedAt,
      modifiedAt: page.updatedAt,
      files: getPageFiles(page.sections),
    }),
    page: getTypeData({
      metaDescription: page.metaDescription ?? undefined,
      keywords: page.keywords ?? undefined,
      assets: getPageAssets(page.sections),
      regulations: getPageRegulations(page.sections),
      contacts: getPageContacts(page.sections),
    }),
  }))
}

const buildArticles = async (): Promise<InventoryEntry[]> => {
  const { articles } = await client.ArticlesInventory()

  return articles.filter(isDefined).map((article) => ({
    ...getBase('article', {
      ...article,
      path: `/spravy/${article.slug}`,
      summary: getFirstNonEmpty(article.perex),
      owner: getOwner(article.adminGroups),
      addedAt: article.addedAt,
      modifiedAt: article.updatedAt,
      files: getBlockFiles(article.files),
    }),
    article: {
      category: getCategory(article.articleCategory),
      inbaRelease: article.inbaRelease
        ? {
            id: getEntryId('inba-release', article.inbaRelease.documentId),
            title: article.inbaRelease.title,
            url: getUrl(`/inba/vydania/${article.inbaRelease.slug}`),
          }
        : undefined,
      tags: article.tags.filter(isDefined).map(({ title, slug }) => ({ title, slug })),
    },
  }))
}

const buildAssets = async (): Promise<InventoryEntry[]> => {
  const { assets } = await client.AssetsInventory()

  return assets.filter(isDefined).map((asset) => ({
    ...getBase('asset', {
      ...asset,
      path: `/dokumenty/${asset.slug}`,
      summary: getFirstNonEmpty(asset.description),
      owner: getOwner(asset.adminGroups),
      addedAt: asset.customPublishedAt ?? asset.publishedAt,
      modifiedAt: asset.updatedAt,
      files: getFiles(asset.files),
    }),
    asset: getTypeData({ category: getCategory(asset.assetCategory) }),
  }))
}

const buildRegulations = async (): Promise<InventoryEntry[]> => {
  const { regulations } = await client.RegulationsInventory()

  return regulations.filter(isDefined).map((regulation) => {
    // Cancelled either directly, or through an amendee that got cancelled - same rule as getRegulationMetadata.ts.
    const cancellation =
      regulation.cancellation ??
      regulation.amending.filter(isDefined).find((amendee) => isDefined(amendee.cancellation))
        ?.cancellation

    return {
      ...getBase('regulation', {
        ...regulation,
        path: `/vzn/${regulation.slug}`,
        title: getFirstNonEmpty(regulation.titleText, regulation.fullTitle) ?? regulation.regNumber,
        summary: getFirstNonEmpty(regulation.fullTitle),
        addedAt: regulation.publishedAt,
        modifiedAt: regulation.updatedAt,
        // The main document first, the same order the page lists them in. Files of the amendments belong to their own
        // entries, so they are not repeated here.
        files: [getFile(regulation.mainDocument), ...getFiles(regulation.attachments)],
      }),
      regulation: {
        regNumber: regulation.regNumber,
        category: getCategory(regulation.regulationCategory),
        regRelations: getTypeData({
          amendments: getRegulationLinks(regulation.amendments),
          amending: getRegulationLinks(regulation.amending),
          // The same cancellation the validity is derived from - directly, or inherited from a cancelled amendee.
          cancelledBy: cancellation ? getRegulationLink(cancellation) : undefined,
          cancelling: getRegulationLinks(regulation.cancelling),
        }),
        validity: {
          isValid: !cancellation,
          effectiveFrom: getIsoDate(regulation.effectiveFrom),
          effectiveUntil: getIsoDate(cancellation?.effectiveFrom),
        },
      },
    }
  })
}

const buildInbaReleases = async (): Promise<InventoryEntry[]> => {
  const { inbaReleases } = await client.InbaReleasesInventory()

  return inbaReleases.filter(isDefined).map((inbaRelease) => ({
    ...getBase('inba-release', {
      ...inbaRelease,
      path: `/inba/vydania/${inbaRelease.slug}`,
      summary: getFirstNonEmpty(inbaRelease.perex),
      addedAt: inbaRelease.releaseDate ?? inbaRelease.publishedAt,
      modifiedAt: inbaRelease.updatedAt,
      files: getBlockFiles(inbaRelease.files),
    }),
    'inba-release': getTypeData({ articles: getArticleLinks(inbaRelease.articles) }),
  }))
}

const buildUrbanStudies = async (): Promise<InventoryEntry[]> => {
  const { urbanStudies } = await client.UrbanStudiesInventory()

  return urbanStudies.filter(isDefined).map((urbanStudy) => ({
    ...getBase('urban-study', {
      ...urbanStudy,
      path: `/uzemne-studie/${urbanStudy.slug}`,
      addedAt: urbanStudy.customPublishedAt ?? urbanStudy.publishedAt,
      modifiedAt: urbanStudy.updatedAt,
      // The parts only group the files on the page, so the inventory flattens them into one list.
      files: getBlockFiles(
        urbanStudy.urbanStudyParts?.filter(isDefined).flatMap((part) => part.items ?? []),
      ),
    }),
    'urban-study': getTypeData({
      year: urbanStudy.year ?? undefined,
      category: getCategory(urbanStudy.urbanStudyCategory),
      state: getCategory(urbanStudy.urbanStudyState),
      regulations: getRegulationLinks(urbanStudy.regulations),
    }),
  }))
}

/**
 * Official board documents live in GINIS, not in Strapi. Only the currently published documents are listed.
 *
 * GINIS is reachable from the internal network only, so the mocked documents are used wherever the rest of the app
 * mocks it. `getOfficialBoardParsedList` swallows its own errors and returns nothing, so an unreachable GINIS costs the
 * inventory this content type instead of the whole snapshot.
 */
const buildOfficialBoard = async (): Promise<InventoryEntry[]> => {
  const documents = shouldMockGinis()
    ? mockedParsedDocuments
    : await getOfficialBoardParsedList({ publicationState: 'vyveseno' })

  return documents.map((document) => ({
    ...getBase('official-board', {
      // The board has no slugs - a document is addressed by its GINIS id, base64 encoded because it contains a `#`.
      documentId: document.id,
      path: `/uradna-tabula/${base64Encode(document.id)}`,
      title: document.title,
      // Editors often repeat the title as the description, which would make every second entry carry it twice.
      summary:
        getFirstNonEmpty(document.description) === document.title
          ? undefined
          : getFirstNonEmpty(document.description),
      addedAt: document.publishedFrom,
      // GINIS does not track when a posted document was last changed, so the only date it has is when it went up.
      modifiedAt: document.publishedFrom,
    }),
    'official-board': {
      category: getFirstNonEmpty(document.categoryName),
      numberOfFiles: document.numberOfFiles,
      publishedUntil: getIsoDate(document.publishedTo) ?? undefined,
    },
  }))
}

/** The categories of a municipal service are plain title and slug pairs, the way this website's ones are. */
const getServiceCategories = (
  categories: { title: string; slug: string }[] | null | undefined,
): InventoryCategory[] | undefined => {
  const mapped = (categories ?? []).map(({ title, slug }) => ({ title, slug }))

  return mapped.length > 0 ? mapped : undefined
}

/**
 * Municipal services are the city account's content, not this website's - each of them has its own page there, which is
 * what the entry's url points to.
 */
const buildMunicipalServices = async (): Promise<InventoryEntry[]> => {
  const services = await getMunicipalServices()

  return services.map((service) => ({
    ...getBase('municipal-service', {
      documentId: service.documentId,
      path: `/mestske-sluzby/${service.slug}`,
      siteUrl: serverEnvironment.cityAccountUrl,
      title: service.title,
      summary: getFirstNonEmpty(service.description),
      addedAt: service.publishedAt,
      modifiedAt: service.updatedAt,
    }),
    'municipal-service': getTypeData<MunicipalServiceInventoryData>({
      categories: getServiceCategories(service.categories),
      contacts: getContactsSections(service.sections ?? []),
    }),
  }))
}

/** A taxonomy is only its identity here - what it is filed with is on the entries, which name it by its slug. */
const getTaxonomy = (
  values: ({ title: string; slug: string; locale?: string | null } | null)[],
): InventoryTaxonomy[] =>
  values.filter(isDefined).map((value) => ({
    title: value.title,
    slug: value.slug,
    locale: value.locale ?? 'sk',
  }))

/**
 * The board's categories come from GINIS, which names them instead of slugging them - `official-board.category` names
 * them the same way, by their title.
 */
const buildOfficialBoardCategories = async (): Promise<InventoryTaxonomy[]> => {
  const categories = shouldMockGinis()
    ? mockedParsedCategories
    : await getOfficialBoardParsedCategories()

  return categories.map((category) => ({ title: category.title, locale: 'sk' }))
}

/** Every taxonomy of the website, listed whole so a consumer sees the values that nothing is filed under too. */
const buildTaxonomies = async (): Promise<InventoryTaxonomies> => {
  const [taxonomies, officialBoardCategories, municipalServiceCategories] = await Promise.all([
    client.TaxonomiesInventory(),
    buildOfficialBoardCategories(),
    getMunicipalServiceCategories(),
  ])

  return {
    officialBoardCategories,
    municipalServiceCategories: getTaxonomy(municipalServiceCategories),
    articleCategories: getTaxonomy(taxonomies.articleCategories),
    tags: getTaxonomy(taxonomies.tags),
    assetCategories: getTaxonomy(taxonomies.assetCategories),
    regulationCategories: getTaxonomy(taxonomies.regulationCategories),
    urbanStudyCategories: getTaxonomy(taxonomies.urbanStudyCategories),
    urbanStudyStates: getTaxonomy(taxonomies.urbanStudyStates),
  }
}

/**
 * Builds the inventory of everything on the website that has its own url. Published content only - the Strapi GraphQL
 * api returns published documents by default.
 */
export const buildInventory = async (): Promise<Inventory> => {
  const [
    pages,
    articles,
    assets,
    regulations,
    inbaReleases,
    urbanStudies,
    officialBoard,
    municipalServices,
    taxonomies,
  ] = await Promise.all([
    buildPages(),
    buildArticles(),
    buildAssets(),
    buildRegulations(),
    buildInbaReleases(),
    buildUrbanStudies(),
    buildOfficialBoard(),
    buildMunicipalServices(),
    buildTaxonomies(),
  ])

  const entries = [
    ...pages,
    ...articles,
    ...assets,
    ...regulations,
    ...inbaReleases,
    ...urbanStudies,
    ...officialBoard,
    ...municipalServices,
  ].sort((a, b) => (b.modifiedAt ?? '').localeCompare(a.modifiedAt ?? ''))

  return { entries, taxonomies }
}
