import { Button, Typography } from '@bratislava/component-library'
import { CSSProperties, ReactNode } from 'react'

import CookiebotMissingModal from '@/src/components/common/CookiebotMissingModal/CookiebotMissingModal'
import Icon from '@/src/components/common/Icon/Icon'
import { environment } from '@/src/environment'
import cn from '@/src/utils/cn'
import { isCookieConsentCompliantToCookiePolicy } from '@/src/utils/cookies/cookiePolicy'
import { useCookiebotBanner } from '@/src/utils/cookies/useCookiebotBanner'
import { useCookiebotConsent } from '@/src/utils/cookies/useCookiebotConsent'
import { useTranslation } from '@/src/utils/useTranslation'

/**
 * Withholds a third-party embed until the user has consented to every gateable cookie category.
 *
 * Once a cross-origin frame loads, nothing on our side can stop it storing cookies:
 * the `sandbox` attribute only restricts JavaScript, while most third-party cookies
 * arrive as HttpOnly `Set-Cookie` response headers that never touch JS.
 *
 * `useCookieConsent` reacts to Cookiebot's decline event and the embed unmounts.
 * Cookies already stored are not removed by that — clearing those is a Cookiebot account setting.
 */

type Props = {
  children: ReactNode
  style?: CSSProperties
  className?: string
} & (
  | {
      variant?: 'single'
      providerName?: string | null
      contentUrl: string
    }
  | {
      variant: 'multiple'
      providerName?: never
      contentUrl?: never
    }
)

const getHostnameFromUrl = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url // (in case URL parsing fails)
  }
}

const CookieConsentGate = (props: Props) => {
  const { t } = useTranslation()
  const { consent } = useCookiebotConsent()
  const { showCookiebotBanner, cookiebotBannerFailure, dismissCookiebotBannerFailure } =
    useCookiebotBanner()

  const { variant, children, providerName, contentUrl, style, className } = props

  if (
    isCookieConsentCompliantToCookiePolicy(consent) ||
    environment.featureFlagCookieConsentGate !== 'true'
  ) {
    return <>{children}</>
  }

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4 rounded-lg bg-background-passive-secondary p-4 text-center lg:p-8',
        className,
      )}
      style={style}
    >
      <div className="rounded-full bg-white p-4">
        <Icon name="lock" className="size-6" />
      </div>

      <div className="flex max-w-[75ch] flex-col gap-2">
        <Typography variant="h4" as="h3">
          {t('CookieConsentGate.title')}
        </Typography>
        <Typography variant="p-small">
          {variant === 'multiple'
            ? t('CookieConsentGate.descriptionMultiple')
            : t('CookieConsentGate.description', {
                provider: providerName ?? getHostnameFromUrl(contentUrl),
              })}
        </Typography>
      </div>

      <div className="flex w-full flex-wrap justify-center gap-3">
        <Button variant="solid" onPress={showCookiebotBanner} fullWidthMobile>
          {t('CookieConsentGate.consentButton')}
        </Button>
        {variant === 'multiple' ? null : (
          <Button variant="outline" href={contentUrl} fullWidthMobile>
            {t('CookieConsentGate.openInNewTabButton')}
          </Button>
        )}
      </div>

      <CookiebotMissingModal
        failure={cookiebotBannerFailure}
        onDismiss={dismissCookiebotBannerFailure}
      />
    </div>
  )
}

export default CookieConsentGate
