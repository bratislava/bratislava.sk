/* eslint-disable @next/next/inline-script-id */
import 'react-vertical-timeline-component/style.min.css'
import '../styles/globals.css'

import { NavMenuContextProvider } from '@components/organisms/NavBar/NavMenu/navMenuContext'
import BAI18nProvider from '@components/providers/BAI18nProvider'
import { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import { NextIntlClientProvider } from 'next-intl'
import PlausibleProvider from 'next-plausible'
import { NextAdapter } from 'next-query-params'
import { OverlayProvider } from 'react-aria'
import { QueryParamProvider } from 'use-query-params'

import { isProductionDeployment } from '@/utils/utils'

import BAQueryClientProvider from '../components/providers/BAQueryClientProvider'

const inter = Inter({
  variable: '--inter-font',
  subsets: ['latin', 'latin-ext'],
})

const MyApp = ({ Component, pageProps }: AppProps) => {
  const isProd = isProductionDeployment()

  return (
    <>
      {/* https://nextjs.org/docs/pages/building-your-application/optimizing/fonts#apply-the-font-in-head */}
      {/* eslint-disable-next-line react/no-unknown-property */}
      <style jsx global>{`
        body {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#e46054" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        {/* look for CookieConsent component for 3rd party scripts you'd expect to find here */}
      </Head>

      <NextIntlClientProvider messages={pageProps.messages}>
        <PlausibleProvider
          domain={isProd ? 'bratislava.sk' : 'testing.bratislava.sk'}
          taggedEvents
          // uncomment for local testing, needs to be run with `yarn build && yarn start`
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
                  </NavMenuContextProvider>
                </OverlayProvider>
              </BAI18nProvider>
            </QueryParamProvider>
          </BAQueryClientProvider>
        </PlausibleProvider>
      </NextIntlClientProvider>
    </>
  )
}

export default MyApp
