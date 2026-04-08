// Inspired by https://jfranciscosousa.com/blog/validating-environment-variables-with-zod/
// Secures typesafe access to environmental variables.
// In browser process.env is an empty object, the values are replaced during the build time, so they need to be accessed
// via process.env.NEXT_PUBLIC_...

function assertEnv<T>(variable: string, value: T) {
  if (!value) {
    throw new Error(`Missing environment variable: ${variable}`)
  }

  return value
}

export const environment = {
  siteUrl: assertEnv('NEXT_PUBLIC_SITE_URL', process.env.NEXT_PUBLIC_SITE_URL),
  deployment: assertEnv('NEXT_PUBLIC_DEPLOYMENT', process.env.NEXT_PUBLIC_DEPLOYMENT),
  strapiUrl: assertEnv('NEXT_PUBLIC_STRAPI_URL', process.env.NEXT_PUBLIC_STRAPI_URL),
  meilisearchSearchApiKey: assertEnv(
    'NEXT_PUBLIC_MEILISEARCH_SEARCH_API_KEY',
    process.env.NEXT_PUBLIC_MEILISEARCH_SEARCH_API_KEY,
  ),
  meilisearchHost: assertEnv(
    'NEXT_PUBLIC_MEILISEARCH_HOST',
    process.env.NEXT_PUBLIC_MEILISEARCH_HOST,
  ),
  mapboxAccessToken: assertEnv(
    'NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN',
    process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
  ),
  gtmId: assertEnv('NEXT_PUBLIC_GTM_ID', process.env.NEXT_PUBLIC_GTM_ID),
  gtmAuth: assertEnv('NEXT_PUBLIC_GTM_AUTH', process.env.NEXT_PUBLIC_GTM_AUTH),
  gtmPreview: assertEnv('NEXT_PUBLIC_GTM_PREVIEW', process.env.NEXT_PUBLIC_GTM_PREVIEW),
  featureFlagRssFeed: assertEnv(
    'NEXT_PUBLIC_FEATURE_FLAG_RSS_FEED',
    process.env.NEXT_PUBLIC_FEATURE_FLAG_RSS_FEED,
  ),
}
