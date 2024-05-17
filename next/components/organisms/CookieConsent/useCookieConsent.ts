import mapValues from 'lodash/mapValues'
import pick from 'lodash/pick'
import { useCallback, useEffect, useState } from 'react'
// TODO swap for js-cookie
import { Cookies } from 'react-cookie-consent'

import { isDefined } from '@/utils/isDefined'
import { isBrowser } from '@/utils/utils'

// TODO revisit

const availableConsents = ['statistics']
const pickConsents = (consents: object) => mapValues(pick(consents, availableConsents), Boolean)

// returns all 'consents' given (currently only 'statistics', can be easily expanded)
// along with a refresh function and whether the banner was ever dismissed
// not using context as it's usually simple enough to keep this together with the scripts, but it may be nice to use it
export const useCookieConsent = () => {
  const [consents, setConsentsState] = useState<Record<string, any> | null>(null)
  // defaults to true so that it does not flash into being in the beginning
  const [bannerDismissed, setBannerDismissed] = useState(true)

  const shouldShowBanner = !bannerDismissed && !consents
  const dismissBanner = () => setBannerDismissed(true)

  const refresh = useCallback(async () => {
    try {
      const consentValue = Cookies.get('gdpr-consents')
      const parsedConsent = JSON.parse(consentValue)
      if (typeof parsedConsent === 'object') {
        setConsentsState(pickConsents(parsedConsent))
      }
    } catch (error) {
      console.error(error)
    }
    setBannerDismissed(false)
  }, [])

  useEffect(() => {
    if (isBrowser()) {
      refresh()
    }
  }, [refresh])

  const setConsents = useCallback(
    (value: unknown) => {
      if (typeof value === 'object' && isDefined(value)) {
        const consentValue = pickConsents(value)
        const mergedConsents = { ...consents, ...consentValue }
        Cookies.set('gdpr-consents', mergedConsents, { expires: 365 })
        setConsentsState(mergedConsents)
      }
    },
    [consents],
  )

  return { dismissBanner, shouldShowBanner, setConsents, consents, refresh }
}
