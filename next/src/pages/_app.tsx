/* eslint-disable @next/next/inline-script-id */
import '@/src/styles/globals.css'

import { GoogleTagManager } from '@next/third-parties/google'
import { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import { appWithTranslation } from 'next-i18next'
import PlausibleProvider from 'next-plausible'
import { NextAdapter } from 'next-query-params'
import { OverlayProvider } from 'react-aria'
import { QueryParamProvider } from 'use-query-params'

import { NavMenuContextProvider } from '@/src/components/common/NavBar/NavMenu/navMenuContext'
import BAI18nProvider from '@/src/components/providers/BAI18nProvider'
import BAQueryClientProvider from '@/src/components/providers/BAQueryClientProvider'
import { isProductionDeployment } from '@/src/utils/utils'

const inter = Inter({
  variable: '--inter-font',
  subsets: ['latin', 'latin-ext'],
})

const MyApp = ({ Component, pageProps }: AppProps) => {
  const isProd = isProductionDeployment()

  return (
    <>
      <Head>
        {/* https://nextjs.org/docs/pages/building-your-application/optimizing/fonts#apply-the-font-in-head */}
        {/* eslint-disable-next-line react/no-unknown-property */}
        <style jsx global>{`
          body {
            font-family: ${inter.style.fontFamily};
          }
        `}</style>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#e46054" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <PlausibleProvider
        domain={isProd ? 'bratislava.sk' : 'testing.bratislava.sk'}
        taggedEvents
        // uncomment for local testing, needs to be run with `build` and `start`
        // trackLocalhost
      >
        <BAQueryClientProvider>
          <QueryParamProvider adapter={NextAdapter}>
            <BAI18nProvider>
              <OverlayProvider>
                <NavMenuContextProvider>
                  {/* This root div is used for locked body when mobile menu ist open, see MobileNavMenu component */}
                  <div id="root">
                    <Component {...pageProps} />
                  </div>
                  <GoogleTagManager
                    gtmId={process.env.NEXT_PUBLIC_GTM_ID ?? ''}
                    auth={process.env.NEXT_PUBLIC_GTM_AUTH ?? ''}
                    preview={process.env.NEXT_PUBLIC_GTM_PREVIEW ?? ''}
                  />
                </NavMenuContextProvider>
              </OverlayProvider>
            </BAI18nProvider>
          </QueryParamProvider>
        </BAQueryClientProvider>
      </PlausibleProvider>
    </>
  )
}

export default appWithTranslation(MyApp)
