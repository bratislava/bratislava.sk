import './index.css'

import { UIContextProvider } from '@bratislava/common-frontend-ui-context'
import { AppProps } from 'next/app'
import Link from 'next/link'
import Script from 'next/script'
import { appWithTranslation } from 'next-i18next'
import React from 'react'

import ContentImage from '../components/atoms/ContentImage'
import { HomepageMarkdown } from '../components/atoms/HomepageMarkdown'
import Head from 'next/head'

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
      </Head>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script strategy="lazyOnload">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
        page_path: window.location.pathname,
        });
    `}
      </Script>
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
          Markdown: ({ className, content, numericalList, hasBackground }) => (
            <HomepageMarkdown
              className={className}
              content={content}
              numericalList={numericalList}
              hasBackground={hasBackground}
            />
          ),
        }}
      >
        <Component {...pageProps} />
      </UIContextProvider>
    </>
  )
}

export default appWithTranslation(MyApp)
