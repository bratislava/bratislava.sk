import Button from '@bratislava/ui-bratislava/Button/Button'
import { isProductionDeployment } from '@utils/utils'
import { useCookieConsent } from 'backend/utils/cookies'
import NextLink from 'next/link'
import Script from 'next/script'
import { useTranslation } from 'next-i18next'
import React from 'react'

interface IProps {
  pageColor?: string
}

// also takes care of loading all the consented 3rd parties - TODO consider better component name ?
export const CookieConsent = ({ pageColor }: IProps) => {
  const { shouldShowBanner, setConsents, consents } = useCookieConsent()
  const { t } = useTranslation(['common'])

  return (
    <>
      {/* all 3rd party scrips loading here */}
      {/* don't use any of the analytics/tracking in staging/dev - change this if you need testing */}
      {isProductionDeployment() ? (
        <>
          {/* no consent needed for plausible - always load it after page is interactive */}
          <Script
            strategy="afterInteractive"
            data-domain="nova.bratislava.sk"
            src="https://plausible.io/js/plausible.js"
          />
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
        <div className="fixed inset-x-0 bottom-6 z-50 px-6">
          <div className="mx-auto max-w-[1110px] rounded-lg bg-white py-8 px-6 shadow md:px-10">
            <h6 className="text-20-semibold mb-4"> {t('cookie_consent_modal_content_title')} </h6>
            <p className="text-p2 mb-8">
              {' '}
              {t('cookie_consent_body')}{' '}
              <NextLink href={t('cookie_consent_privacy_policy_link')} passHref>
                <a href={t('cookie_consent_privacy_policy_link')} className="cursor-pointer font-semibold underline">
                  {' '}
                  {t('cookie_consent_privacy_policy')}{' '}
                </a>
              </NextLink>
            </p>
            <div className="block sm:flex">
              <Button
                className="text-16-medium mb-3 h-12 px-6 sm:my-0 sm:mr-6"
                variant={pageColor === 'yellow' || pageColor === 'brown' ? 'tertiary-dark-text' : 'tertiary'}
                onClick={() => setConsents({ statistics: true })}
              >
                {t('cookie_consent_accept')}
              </Button>
              <Button
                className="text-16-medium mt-0 h-12 px-6"
                variant="secondary-dark-text"
                onClick={() => setConsents({ statistics: false })}
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
