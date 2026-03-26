const { client } = require('./dist/src/services/graphql/gql')

const getDynamicPaths = async () => {
  const { pages } = await client.PagesStaticPaths({ locale: 'sk' })
  return pages.map((page) => ({
    loc: `/${page.path}`,
  }))
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'bratislava.sk',
  generateRobotsTxt: false,
  changefreq: 'weekly',
  sitemapSize: 5000,
  additionalPaths: async (config) => {
    const paths = await getDynamicPaths()

    return paths.map((path) => ({
      loc: path.loc,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    }))
  },
}
