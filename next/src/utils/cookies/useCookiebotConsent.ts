import { useEffect, useState } from 'react'
import { useIsClient } from 'usehooks-ts'

import { NO_COOKIE_CONSENT } from '@/src/utils/cookies/cookiePolicy'

/**
 * Cookiebot docs: https://www.cookiebot.com/en/developer/
 *
 * Cookiebot is injected via Google Tag Manager (GTM)
 * For local testing, you need to enable preview mode for localhost in GTM:
 * https://support.google.com/tagmanager/thread/347094327/localhost-testing?hl=en
 * Otherwise, Cookiebot script will not be injected.
 *
 * Note that in GTM, we have a custom script adjusting Cookiebot behavior.
 *
 * For additional info and access to Cookiebot and GTM, see our team docs.
 *
 * Cookiebot can also be blocked at runtime by adblock extensions (e.g. uBlock Origin).
 * In that case `window.Cookiebot` is undefined and we show a modal explaining the
 * likely cause instead of letting the click fail silently.
 *
 * Because Cookiebot is injected via GTM, it may become available before or after any
 * given component mounts. Both orderings are covered: we read the current state
 * on mount and subscribe to Cookiebot's events for anything that happens later.
 */

const COOKIEBOT_EVENTS = [
  'CookiebotOnLoad',
  'CookiebotOnConsentReady',
  'CookiebotOnAccept',
  'CookiebotOnDecline',
] satisfies (keyof WindowEventMap)[]

/**
 * Copied into our own object rather than returned by reference, because Cookiebot mutates
 * its `consent` object in place - holding a reference to it would defeat change detection.
 */
const readConsent = () => {
  const consent = window.Cookiebot?.consent

  return consent
    ? {
        necessary: consent.necessary,
        preferences: consent.preferences,
        statistics: consent.statistics,
        marketing: consent.marketing,
      }
    : NO_COOKIE_CONSENT
}

export const useCookiebotConsent = () => {
  const isClient = useIsClient()
  const [state, setState] = useState({ consent: NO_COOKIE_CONSENT })

  useEffect(() => {
    const sync = () => {
      setState({
        consent: readConsent(),
      })
    }

    // Cookiebot may already have loaded and answered before we mounted.
    sync()

    COOKIEBOT_EVENTS.forEach((event) => window.addEventListener(event, sync))

    return () => {
      COOKIEBOT_EVENTS.forEach((event) => window.removeEventListener(event, sync))
    }
  }, [])

  return {
    // Gating on isClient keeps the server render and the first client render in
    // agreement - the server cannot know the user's consent.
    consent: isClient ? state.consent : NO_COOKIE_CONSENT,
  }
}
