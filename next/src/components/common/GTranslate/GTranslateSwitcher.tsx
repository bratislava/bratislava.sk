import Script from 'next/script'

import { environment } from '@/src/environment'

/**
 * GTranslate floating language switcher (free / client-side widget).
 *
 * Adds machine translation (Google Translate) on top of the curated `sk`/`en` content.
 * Gated by the `NEXT_PUBLIC_FEATURE_FLAG_GTRANSLATE` env var (set to `'true'` to enable).
 *
 * Docs: https://gtranslate.support/en/collections/551610-how-tos
 *
 * NOTE: This is the free, client-side widget — translations are NOT indexed by search
 * engines. For SEO-friendly URL-based translations a paid GTranslate plan + DNS/server
 * config is required (see https://gtranslate.io/).
 */

// Edit this list to control which languages the widget offers.
// Codes follow GTranslate / Google Translate language codes.
const GTRANSLATE_LANGUAGES = ['sk', 'en', 'uk', 'de', 'hu', 'fr']

const gtranslateSettings = {
  default_language: 'sk',
  languages: GTRANSLATE_LANGUAGES,
  wrapper_selector: '.gtranslate_wrapper',
  native_language_names: true,
  detect_browser_language: false,
  flag_style: '2d',
  float_switcher_open_direction: 'bottom',
}

const GTranslateSwitcher = () => {
  if (environment.featureFlagGTranslate !== 'true') {
    return null
  }

  return (
    <>
      {/* eslint-disable-next-line better-tailwindcss/no-unknown-classes -- GTranslate mounts its widget into this selector */}
      <div className="gtranslate_wrapper" />
      <Script id="gtranslate-settings" strategy="afterInteractive">
        {`window.gtranslateSettings = ${JSON.stringify(gtranslateSettings)}`}
      </Script>
      <Script
        id="gtranslate-float"
        src="https://cdn.gtranslate.net/widgets/latest/float.js"
        strategy="afterInteractive"
        defer
      />
    </>
  )
}

export default GTranslateSwitcher
