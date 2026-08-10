/**
 * Our rules for embedding third-party content: which URLs need cookie consent, and which
 * consent categories that means. `useCookieConsent` reports what Cookiebot says, this file
 * decides what we demand of it.
 *
 * Iframe sections take arbitrary URLs from strapi, so we cannot categorise
 * them statically. Cookies are often stored via http Set-Cookie headers,
 * which are invisible to JavaScript, so we cannot detect them dynamically either.
 *
 * The rule is therefore "gate everything, allowlist the proven
 * exceptions".
 *
 */

const COOKIE_CONSENT_HOST_WHITELIST = new Set([
  // Static maps and dashboards served from our own S3 bucket.
  'static-pages.s3.bratislava.sk',
])

export const isCookieConsentNeededForUrl = (url: string) => {
  try {
    return !COOKIE_CONSENT_HOST_WHITELIST.has(new URL(url).hostname)
  } catch {
    // An unparseable URL is not something we can vouch for.
    return true
  }
}

export type CookieConsentCategory = 'marketing' | 'statistics' | 'preferences' | 'necessary'
export type GateableConsentCategory = Exclude<CookieConsentCategory, 'necessary'>

const COOKIE_CONSENT_GATED_CATEGORIES = [
  // 'necessary' is absent because it is granted unconditionally and so never gates anything.
  'preferences',
  'statistics',
  'marketing',
] satisfies GateableConsentCategory[]

export type CookieConsent = Record<CookieConsentCategory, boolean>

export const NO_COOKIE_CONSENT: CookieConsent = {
  necessary: false,
  preferences: false,
  statistics: false,
  marketing: false,
}

/**
 * Every gateable category is required, because the embeds we gate are arbitrary third
 * parties we have not categorised. Cookiebot's categories are independent of each other and
 * our banner lets users accept them individually.
 */
export const isCookieConsentCompliantToCookiePolicy = (consent: CookieConsent) =>
  COOKIE_CONSENT_GATED_CATEGORIES.every((category) => consent[category])
