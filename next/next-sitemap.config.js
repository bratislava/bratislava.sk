// Note: read from next-i18next.config.js (the source of truth that next.config.ts itself imports) —
// next.config is TypeScript since Next 16 and cannot be require()d from this CommonJS config.
const { i18n } = require('./next-i18next.config')
const { client } = require('./dist/services/graphql/gql')

//  Documentation: https://github.com/iamvishnusankar/next-sitemap

const { defaultLocale, locales } = i18n

/** Locale path prefix — the default locale is served without a prefix. */
const localePrefix = (locale) => (locale === defaultLocale ? '' : `/${locale}`)

/**
 * Builds `alternateRefs` for a localised entity: the entity itself plus all its Strapi localizations.
 * `getPath` returns the locale-less path (e.g. `/spravy/my-article`) for one localization.
 */
const getAlternateRefs = ({ siteUrl, entity, getPath }) => {
  const baseUrl = siteUrl.replace(/\/$/, '')

  return [entity, ...(entity.localizations ?? [])]
    .filter((localization) => localization?.locale && getPath(localization))
    .map((localization) => ({
      href: `${baseUrl}${localePrefix(localization.locale)}${getPath(localization)}`,
      hreflang: localization.locale,
      // Without this, next-sitemap treats `href` as a per-language site root and appends `loc` to it.
      hrefIsAbsolute: true,
    }))
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  generateRobotsTxt: false,
  changefreq: 'weekly',
  // generate paths dynamically from Strapi
  additionalPaths: async (config) => {
    const { siteUrl } = config

    const fetchArticlePaths = async () => {
      const results = await Promise.all(
        locales.map(async (locale) => {
          const { articles } = await client.ArticlesStaticPathsForSitemap({
            limit: -1,
            locale,
          })
          return articles.map((article) => ({
            loc: `${localePrefix(locale)}/spravy/${article.slug}`,
            lastmod: article.updatedAt,
            alternateRefs: getAlternateRefs({
              siteUrl,
              entity: article,
              getPath: ({ slug }) => `/spravy/${slug}`,
            }),
          }))
        }),
      )
      return results.flat()
    }

    const fetchPagePaths = async () => {
      const results = await Promise.all(
        locales.map(async (locale) => {
          const { pages } = await client.PagesStaticPathsForSitemap({ limit: -1, locale })
          return pages.map((page) => ({
            loc: `${localePrefix(locale)}/${page.path}`,
            lastmod: page.updatedAt,
            alternateRefs: getAlternateRefs({
              siteUrl,
              entity: page,
              getPath: ({ path }) => `/${path}`,
            }),
          }))
        }),
      )
      return results.flat()
    }

    // Content types below are not localised in Strapi, so they have no alternate refs.
    const fetchInbaReleasePaths = async () => {
      const { inbaReleases } = await client.InbaReleasesStaticPathsForSitemap({ limit: -1 })
      return inbaReleases.map((release) => ({
        loc: `/inba/vydania/${release.slug}`,
        lastmod: release.updatedAt,
      }))
    }

    const fetchRegulationPaths = async () => {
      const { regulations } = await client.RegulationsStaticPathsForSitemap({ limit: -1 })
      return regulations.map((regulation) => ({
        loc: `/vzn/${regulation.slug}`,
        lastmod: regulation.updatedAt,
      }))
    }

    const fetchAssetPaths = async () => {
      const { assets } = await client.AssetsStaticPathsForSitemap({ limit: -1 })
      return assets.map((asset) => ({
        loc: `/dokumenty/${asset.slug}`,
        lastmod: asset.updatedAt,
      }))
    }

    const fetchUrbanStudyPaths = async () => {
      const { urbanStudies } = await client.UrbanStudiesStaticPathsForSitemap({ limit: -1 })
      return urbanStudies.map((urbanStudy) => ({
        loc: `/uzemne-studie/${urbanStudy.slug}`,
        lastmod: urbanStudy.updatedAt,
      }))
    }

    const pathGroups = await Promise.all([
      fetchArticlePaths(),
      fetchPagePaths(),
      fetchInbaReleasePaths(),
      fetchRegulationPaths(),
      fetchAssetPaths(),
      fetchUrbanStudyPaths(),
    ])
    const paths = pathGroups.flat()

    return paths.map((path) => ({
      loc: path.loc,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: path.lastmod ? new Date(path.lastmod).toISOString() : undefined,
      alternateRefs: path.alternateRefs ?? [],
    }))
  },
}
