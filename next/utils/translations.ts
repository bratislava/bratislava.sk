import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import cfg from '../next.config'

const cachedSsrTranslations = {
  en: {},
  sk: {},
}

// cache more subsets using this if needed
const preCachedNamespaces = [['common']]

export const ssrTranslations = async (ctx: { locale?: string } | undefined, namespaces?: string[]) => {
  const locale = ctx?.locale ?? 'sk'
  const namespaceString = (namespaces || []).join('-')
  const cachedValue = cachedSsrTranslations[locale][namespaceString]
  // TODO don't do this in development
  if (cachedValue) {
    console.log(`Loading translations under cache key: ${namespaceString}`)
    return cachedValue
  }
  const { i18n, localePath, reloadOnPrerender } = cfg(null, {
    defaultConfig: {},
  })
  const result = await serverSideTranslations(locale, namespaces, {
    i18n,
    localePath,
    reloadOnPrerender,
  })
  cachedSsrTranslations[locale][namespaceString] = result
  return result
}

// warm-up the cache
;(async () => {
  console.log('Warming up SSR translation cache')
  for (const locale in cachedSsrTranslations) {
    await Promise.all(
      preCachedNamespaces.map((arr) => {
        console.log('Caching translations: ', arr)
        return ssrTranslations({ locale }, arr)
      })
    )
  }
})().catch((e) => {
  console.log('Error caching translations - will fall back')
  console.log(e)
})
