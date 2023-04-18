import Button from '@components/forms/simple-components/Button'
import MLink from '@components/forms/simple-components/MLink'
import { getCategoryColorLocalStyle } from '@utils/colors'
import { isProductionDeployment } from '@utils/utils'
import { useCookieConsent } from 'backend/utils/cookies'
import Script from 'next/script'
import { useTranslations } from 'next-intl';

import React from 'react'
import { twMerge } from 'tailwind-merge'

type CookieConsentProps = {
  className?: string
}

// also takes care of loading all the consented 3rd parties - TODO consider better component name ?
export const CookieConsent = ({ className }: CookieConsentProps) => {
  const { shouldShowBanner, setConsents, consents } = useCookieConsent()
  const t = useTranslations()

  return (
    <>
      {/* all 3rd party scrips loading here */}
      {/* don't use any of the analytics/tracking in staging/dev - change this if you need testing */}
      {isProductionDeployment() ? (
        <>
          {consents?.statistics ? (
            <Script
              id="hotjar"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `(function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:3082371,hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
              }}
            />
          ) : null}
        </>
      ) : null}

      {shouldShowBanner ? (
        <div
          className={twMerge('fixed inset-x-0 bottom-6 px-6', className)}
          style={getCategoryColorLocalStyle({ category: 'main' })}
        >
          <div className="mx-auto max-w-[1110px] rounded-lg bg-white px-6 py-8 shadow md:px-10">
            <h6 className="text-large mb-4 ">{t('cookie_consent_modal_content_title')}</h6>
            <div className="text-default mb-8">
              {t('cookie_consent_body')}{' '}
              <MLink
                href={t('cookie_consent_privacy_policy_link')}
                variant="underlined"
                className="font-semibold"
              >
                {t('cookie_consent_privacy_policy')}
              </MLink>
            </div>
            <div className="flex flex-col gap-4 md:flex-row">
              <Button
                variant="category"
                onPress={() => setConsents({ statistics: true })}
                fullWidthMobile
              >
                {t('cookie_consent_accept')}
              </Button>

              <Button
                variant="category-outline"
                onPress={() => setConsents({ statistics: false })}
                fullWidthMobile
              >
                {t('cookie_consent_reject')}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default CookieConsent
