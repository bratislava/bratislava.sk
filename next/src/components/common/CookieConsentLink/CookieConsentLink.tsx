import { Button, Typography } from '@bratislava/component-library'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import Dialog from '@/src/components/common/ModalDialog/Dialog'
import Modal from '@/src/components/common/ModalDialog/Modal'
import { isBrowser } from '@/src/utils/utils'

/**
 * Based on Konto: https://github.com/bratislava/konto.bratislava.sk/blob/ac31f2bc2db8863268e6e2d1ac1ea06631bc40e9/next/src/components/segments/CookieConsentLink/CookieConsentLink.tsx
 */

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
 * For additional info and access to Cookiebot and GMT, see our team docs.
 *
 * Cookiebot can also be blocked at runtime by adblock extensions (e.g. uBlock Origin).
 * In that case `window.Cookiebot` is undefined and we show a modal explaining the
 * likely cause instead of letting the click fail silently.
 */

const CookieConsentLink = () => {
  const { t } = useTranslation()
  const [isMissingModalOpen, setIsMissingModalOpen] = useState(false)

  const showCookiebotConsentBanner = () => {
    if (!isBrowser()) {
      return
    }

    if (typeof window.Cookiebot?.show === 'function') {
      window.Cookiebot.show()

      return
    }

    setIsMissingModalOpen(true)
  }

  return (
    <>
      <Button variant="link" className="font-normal" onPress={showCookiebotConsentBanner}>
        {t('CookieConsentLink.label')}
      </Button>
      <Modal
        isDismissable
        isOpen={isMissingModalOpen}
        onOpenChange={setIsMissingModalOpen}
        modalClassname="h-fit"
      >
        <Dialog title={t('CookieConsentLink.missingScriptModal.title')}>
          <div className="flex w-full flex-col gap-5 lg:gap-6">
            <Typography variant="p-small">
              {t('CookieConsentLink.missingScriptModal.description')}
            </Typography>
            <Button fullWidth variant="solid" onPress={() => setIsMissingModalOpen(false)}>
              {t('CookieConsentLink.missingScriptModal.closeButton')}
            </Button>
          </div>
        </Dialog>
      </Modal>
    </>
  )
}

export default CookieConsentLink
