import { environment } from '@/src/environment'
import { client } from '@/src/services/graphql/gql'
import { isDefined } from '@/src/utils/isDefined'

import { InventoryCategory, InventoryEntry, InventoryEntryBase, InventoryType } from './types'

// TODO: The paths are hardcoded the same way as in getLinkProps and next-sitemap.config.js, extract them once.
const getUrl = (path: string, locale = 'sk') =>
  `${environment.siteUrl.replace(/\/$/, '')}${locale === 'en' ? '/en' : ''}${path}`

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

const getCategory = (
  category: InventoryCategory | null | undefined,
): InventoryCategory | undefined =>
  category ? { title: category.title, slug: category.slug } : undefined

/**
 * The part of an entry that is the same for every content type. `addedAt` unifies the various "published" dates - each
 * content type passes in its own one (addedAt, customPublishedAt, releaseDate), falling back to Strapi's publishedAt.
 */
const getBase = <TType extends InventoryType>(
  type: TType,
  entry: {
    documentId: string
    path: string
    locale?: string | null
    title: string
    summary?: string
    addedAt?: unknown
    modifiedAt?: unknown
  },
): InventoryEntryBase & { type: TType } => ({
  id: `${type}:${entry.documentId}:${entry.locale ?? 'sk'}`,
  type,
  url: getUrl(entry.path, entry.locale ?? 'sk'),
  locale: entry.locale ?? 'sk',
  isLocalized: isDefined(entry.locale),
  title: entry.title,
  summary: entry.summary,
  addedAt: getIsoDate(entry.addedAt),
  modifiedAt: getIsoDate(entry.modifiedAt),
})

const buildPages = async (): Promise<InventoryEntry[]> => {
  const { pages } = await client.PagesInventory()

  return pages.filter(isDefined).map((page) => ({
    ...getBase('page', {
      ...page,
      path: `/${page.path}`,
      summary: getFirstNonEmpty(page.subtext, page.metaDescription),
      addedAt: page.publishedAt,
      modifiedAt: page.updatedAt,
    }),
    page: getTypeData({
      metaDescription: page.metaDescription ?? undefined,
      keywords: page.keywords ?? undefined,
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
      addedAt: article.addedAt,
      modifiedAt: article.updatedAt,
    }),
    article: {
      category: getCategory(article.articleCategory),
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
      addedAt: asset.customPublishedAt ?? asset.publishedAt,
      modifiedAt: asset.updatedAt,
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
      }),
      regulation: {
        regNumber: regulation.regNumber,
        category: regulation.category,
        validity: {
          isValid: !cancellation,
          effectiveFrom: getIsoDate(regulation.effectiveFrom),
          effectiveUntil: getIsoDate(cancellation?.effectiveFrom),
          cancelledBy: cancellation
            ? {
                regNumber: cancellation.regNumber,
                url: getUrl(`/vzn/${cancellation.slug}`),
              }
            : null,
        },
      },
    }
  })
}

const buildInbaReleases = async (): Promise<InventoryEntry[]> => {
  const { inbaReleases } = await client.InbaReleasesInventory()

  return inbaReleases.filter(isDefined).map((inbaRelease) =>
    getBase('inba-release', {
      ...inbaRelease,
      path: `/inba/vydania/${inbaRelease.slug}`,
      summary: getFirstNonEmpty(inbaRelease.perex),
      addedAt: inbaRelease.releaseDate ?? inbaRelease.publishedAt,
      modifiedAt: inbaRelease.updatedAt,
    }),
  )
}

const buildUrbanStudies = async (): Promise<InventoryEntry[]> => {
  const { urbanStudies } = await client.UrbanStudiesInventory()

  return urbanStudies.filter(isDefined).map((urbanStudy) => ({
    ...getBase('urban-study', {
      ...urbanStudy,
      path: `/uzemne-studie/${urbanStudy.slug}`,
      addedAt: urbanStudy.customPublishedAt ?? urbanStudy.publishedAt,
      modifiedAt: urbanStudy.updatedAt,
    }),
    'urban-study': getTypeData({
      year: urbanStudy.year ?? undefined,
      category: getCategory(urbanStudy.urbanStudyCategory),
      state: getCategory(urbanStudy.urbanStudyState),
    }),
  }))
}

/**
 * Builds the inventory of everything on the website that has its own url. Published content only - the Strapi GraphQL
 * api returns published documents by default.
 */
export const buildInventory = async (): Promise<InventoryEntry[]> => {
  const [pages, articles, assets, regulations, inbaReleases, urbanStudies] = await Promise.all([
    buildPages(),
    buildArticles(),
    buildAssets(),
    buildRegulations(),
    buildInbaReleases(),
    buildUrbanStudies(),
  ])

  return [...pages, ...articles, ...assets, ...regulations, ...inbaReleases, ...urbanStudies].sort(
    (a, b) => (b.modifiedAt ?? '').localeCompare(a.modifiedAt ?? ''),
  )
}
