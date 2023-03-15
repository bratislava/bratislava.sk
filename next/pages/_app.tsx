/* eslint-disable @next/next/inline-script-id */
import './index.css'

import { UIContextProvider } from '@bratislava/common-frontend-ui-context'
import { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import Link from 'next/link'
import { appWithTranslation } from 'next-i18next'
import { NextAdapter } from 'next-query-params'
import { SSRProvider } from 'react-aria'
import { QueryParamProvider } from 'use-query-params'

import ContentImage from '../components/atoms/ContentImage'
import { HomepageMarkdown } from '../components/atoms/HomepageMarkdown'
import BAQueryClientProvider from '../components/providers/BAQueryClientProvider'

const inter = Inter({
  variable: '--inter-font',
  subsets: ['latin', 'latin-ext'],
})

const MyApp = ({ Component, pageProps }: AppProps) => {
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
              <Link href={href} locale={locale} target={target} rel={rel} className={className}>
                {children}
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
              <div className={`${inter.variable} font-sans`}>
                <Component {...pageProps} />
              </div>
            </SSRProvider>
          </QueryParamProvider>
        </BAQueryClientProvider>
      </UIContextProvider>
    </>
  )
}

export default appWithTranslation(MyApp)
