const { i18n } = require('@/next.config')
const { client } = require('./dist/src/services/graphql/gql')

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'bratislava.sk',
  generateRobotsTxt: false,
  changefreq: 'weekly',
  sitemapSize: 7000,
  additionalPaths: async (config) => {
    const { locales } = i18n

    const fetchArticlePaths = async () => {
      const results = await Promise.all(
        locales.map(async (locale) => {
          const { articles } = await client.Articles({ limit: -1, locale })
          return articles.map((article) => ({
            loc: `${locale !== 'sk' ? `/${locale}` : ''}/spravy/${article.slug}`,
          }))
        }),
      )
      return results.flat()
    }

    const fetchInbaReleasePaths = async () => {
      const { inbaReleases } = await client.InbaReleasesStaticPaths({ limit: -1 })
      return inbaReleases.map((release) => ({ loc: `/inba/vydania/${release.slug}` }))
    }

    const fetchRegulationPaths = async () => {
      const { regulations } = await client.RegulationsStaticPaths({ limit: -1 })
      return regulations.map((regulation) => ({ loc: `/vzn/${regulation.slug}` }))
    }

    const fetchOtherPaths = async () => {
      const results = await Promise.all(
        locales.map(async (locale) => {
          const { pages } = await client.PagesStaticPaths({ limit: -1, locale })
          return pages.map((page) => ({
            loc: `${locale !== 'sk' ? `/${locale}` : ''}/${page.path}`,
          }))
        }),
      )
      return results.flat()
    }

    const [articlePaths, inbaReleasePaths, regulationPaths, otherPaths] = await Promise.all([
      fetchArticlePaths(),
      fetchInbaReleasePaths(),
      fetchRegulationPaths(),
      fetchOtherPaths(),
    ])
    const paths = [...articlePaths, ...inbaReleasePaths, ...regulationPaths, ...otherPaths]

    return paths.map((path) => ({
      loc: path.loc,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    }))
  },
}
