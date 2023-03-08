/* eslint-disable @next/next/inline-script-id */
import './index.css'

import { UIContextProvider } from '@bratislava/common-frontend-ui-context'
import { AccountProvider } from '@utils/useAccount'
import { isProductionDeployment } from '@utils/utils'
import { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Link from 'next/link'
import { appWithTranslation } from 'next-i18next'
import { NextAdapter } from 'next-query-params'
import { SSRProvider } from 'react-aria'
import { QueryParamProvider } from 'use-query-params'
import { useIsClient } from 'usehooks-ts'

import ContentImage from '../components/atoms/ContentImage'
import { HomepageMarkdown } from '../components/atoms/HomepageMarkdown'
import BAQueryClientProvider from '../components/providers/BAQueryClientProvider'

// error with 'window' is not defined, that's beacause server side rendering + (ReactWebChat + DirectLine)
// https://github.com/microsoft/BotFramework-WebChat/issues/4607
const DynamicChat = dynamic(() => import('../components/molecules/chat'), {
  ssr: false,
})

const MyApp = ({ Component, pageProps }: AppProps) => {
  const isClient = useIsClient()

  const shouldDisplayUkraineSupportChat =
    isClient &&
    pageProps?.page?.data?.length > 0 &&
    (pageProps.page.data[0].id === '611' || // /bratislava-pre-ukrainu
      pageProps.page.data[0].id === '612' || // /братислава-для-украiни
      pageProps.page.data[0].id === '635' || // /en/bratislava-for-ukraine
      pageProps.page.data[0].id === '636' || // /en/братислава-для-украiни
      pageProps.page.data[0].attributes.parentPage.data?.attributes.slug ===
        'bratislava-pre-ukrajinu' || // /bratislava-pre-ukrajinu/...
      pageProps.page.data[0].attributes.parentPage.data?.attributes.slug ===
        'братислава-для-украiни') // /братислава-для-украiни/... || /en/братислава-для-украiни... because parent page slug is same for all languages

  return (
    <>
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
      <UIContextProvider
        components={{
          Link: ({ href, className, children, locale, target, rel }) => {
            if (href === undefined || href === null) return null
            return (
              <Link href={href} locale={locale}>
                <a target={target} rel={rel} href={href} className={className}>
                  {children}
                </a>
              </Link>
            )
          },
          Image: ({ alt, src, shadow }) => <ContentImage alt={alt} src={src} shadow={shadow} />,
          Markdown: ({ className, content, numericalList }) => (
            <HomepageMarkdown
              className={className}
              content={content}
              numericalList={numericalList}
            />
          ),
        }}
      >
        <BAQueryClientProvider>
          <QueryParamProvider adapter={NextAdapter}>
            <SSRProvider>
              <AccountProvider>
                <Component {...pageProps} />

                {isProductionDeployment() && shouldDisplayUkraineSupportChat && <DynamicChat />}
              </AccountProvider>
            </SSRProvider>
          </QueryParamProvider>
        </BAQueryClientProvider>
      </UIContextProvider>
    </>
  )
}

export default appWithTranslation(MyApp)
