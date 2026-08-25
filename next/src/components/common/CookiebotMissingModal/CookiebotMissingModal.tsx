import { Button, Typography } from '@bratislava/component-library'

import Icon from '@/src/components/common/Icon/Icon'
import Dialog from '@/src/components/common/ModalDialog/Dialog'
import Modal from '@/src/components/common/ModalDialog/Modal'
import { CookiebotBannerFailure } from '@/src/utils/cookies/useCookiebotBanner'
import { isLocalDevelopment } from '@/src/utils/isLocalDevelopment'
import { useTranslation } from '@/src/utils/useTranslation'

/**
 * Shown when the consent banner cannot be opened, so a click never fails silently.
 *
 * We handle two observed causes:
 *  - 'script-missing' displays the translated ad-blocker copy because we expect this
 *    case to happen to an external user.
 *  - 'banner-not-rendered' means Cookiebot loaded but drew nothing, which locally
 *    is almost always caused by the domain missing from the Cookiebot account
 *    (see Cookiebot admin settings at https://admin.cookiebot.com/).
 *    This case happens only to a developer, so outside local development we
 *    fall back to the translated citizen-facing copy.
 */

type Props = {
  failure: CookiebotBannerFailure | null
  onDismiss: () => void
}

const CookiebotMissingModal = ({ failure, onDismiss: handleDismiss }: Props) => {
  const { t } = useTranslation()

  const showLocalDevelopmentCopy = isLocalDevelopment() && failure === 'banner-not-rendered'

  return (
    <Modal
      isOpen={failure !== null}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          handleDismiss()
        }
      }}
      modalClassname="h-fit"
    >
      <Dialog
        title={
          showLocalDevelopmentCopy
            ? 'Cookiebot banner is unavailable'
            : t('CookieConsentLink.missingScriptModal.title')
        }
      >
        <div className="flex w-full flex-col items-center gap-5 lg:gap-6">
          <div className="rounded-full bg-background-warning-soft-default p-4">
            <Icon name="warning" className="size-6 text-content-warning-default" />
          </div>
          <Typography variant="p-small" className="text-center">
            {showLocalDevelopmentCopy
              ? 'Cookiebot loaded correctly, but this domain is probably not registered in the Cookiebot account. Register this domain or run GTM preview mode to see the real banner.'
              : t('CookieConsentLink.missingScriptModal.description')}
          </Typography>
          <Button fullWidth variant="solid" onPress={handleDismiss}>
            {t('CookieConsentLink.missingScriptModal.closeButton')}
          </Button>
        </div>
      </Dialog>
    </Modal>
  )
}

export default CookiebotMissingModal
