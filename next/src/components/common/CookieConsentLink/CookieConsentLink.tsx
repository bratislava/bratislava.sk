import { Button } from '@bratislava/component-library'

import CookiebotMissingModal from '@/src/components/common/CookiebotMissingModal/CookiebotMissingModal'
import { useCookiebotBanner } from '@/src/utils/cookies/useCookiebotBanner'
import { useTranslation } from '@/src/utils/useTranslation'

/**
 * Based on Konto: https://github.com/bratislava/konto.bratislava.sk/blob/ac31f2bc2db8863268e6e2d1ac1ea06631bc40e9/next/src/components/segments/CookieConsentLink/CookieConsentLink.tsx
 */

const CookieConsentLink = () => {
  const { t } = useTranslation()
  const { showCookiebotBanner, cookiebotBannerFailure, dismissCookiebotBannerFailure } =
    useCookiebotBanner()

  return (
    <>
      <Button variant="link" size="large" className="font-normal" onPress={showCookiebotBanner}>
        {t('CookieConsentLink.label')}
      </Button>
      <CookiebotMissingModal
        failure={cookiebotBannerFailure}
        onDismiss={dismissCookiebotBannerFailure}
      />
    </>
  )
}

export default CookieConsentLink
