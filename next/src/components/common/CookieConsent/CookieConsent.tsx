import Script from 'next/script'

import Button from '@/src/components/common/Button/Button'
import { useCookieConsent } from '@/src/components/common/CookieConsent/useCookieConsent'
import MLink from '@/src/components/common/MLink/MLink'
import cn from '@/src/utils/cn'
import { getCategoryColorLocalStyle } from '@/src/utils/colors'
import { useTranslation } from '@/src/utils/useTranslation'
import { isProductionDeployment } from '@/src/utils/utils'

type CookieConsentProps = {
  className?: string
}

// also takes care of loading all the consented 3rd parties - TODO consider better component name ?
const CookieConsent = ({ className }: CookieConsentProps) => {
  const { shouldShowBanner, setConsents, consents } = useCookieConsent()
  const { t } = useTranslation()

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
          className={cn('fixed inset-x-0 bottom-6 px-6', className)}
          style={getCategoryColorLocalStyle({ category: 'main' })}
        >
          <div className="mx-auto max-w-[1110px] rounded-lg bg-white px-6 py-8 shadow md:px-10">
            <h6 className="text-large mb-4">{t('CookieConsent.modalContentTitle')}</h6>
            <div className="text-default mb-8">
              {t('CookieConsent.body')}{' '}
              <MLink href={t('links.privacyPolicy')} variant="underlined" className="font-semibold">
                {t('CookieConsent.privacyPolicy')}
              </MLink>
            </div>
            <div className="flex flex-col gap-4 md:flex-row">
              <Button
                variant="solid"
                onPress={() => setConsents({ statistics: true })}
                fullWidthMobile
              >
                {t('CookieConsent.accept')}
              </Button>

              <Button
                variant="outline"
                onPress={() => setConsents({ statistics: false })}
                fullWidthMobile
              >
                {t('CookieConsent.reject')}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default CookieConsent
