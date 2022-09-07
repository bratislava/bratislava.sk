/* eslint-disable @next/next/inline-script-id */
import './index.css'

import { UIContextProvider } from '@bratislava/common-frontend-ui-context'
import { AppProps } from 'next/app'
import Head from 'next/head'
import Link from 'next/link'
import { appWithTranslation } from 'next-i18next'
import React from 'react'

import ContentImage from '../components/atoms/ContentImage'
import { HomepageMarkdown } from '../components/atoms/HomepageMarkdown'

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
              <Link href={href} locale={locale}>
                <a target={target} rel={rel} href={href} className={className}>
                  {children}
                </a>
              </Link>
            )
          },
          Image: ({ alt, src, shadow }) => <ContentImage alt={alt} src={src} shadow={shadow} />,
          Markdown: ({ className, content, numericalList }) => (
            <HomepageMarkdown className={className} content={content} numericalList={numericalList} />
          ),
        }}
      >
        <Component {...pageProps} />
      </UIContextProvider>
    </>
  )
}

export default appWithTranslation(MyApp)
