import { UIContextProvider } from '@bratislava/common-frontend-ui-context';
import { AuthProvider } from '@bratislava/next-frontend-auth';
import { appWithTranslation } from 'next-i18next';
import { AppProps } from 'next/app';
import Link from 'next/link';
import React from 'react';
import ContentImage from '../components/atoms/ContentImage';
import { HomepageMarkdown } from '../components/atoms/HomepageMarkdown';
import './index.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider
      clientId={process.env.NEXT_PUBLIC_MSAL_CLIENT_ID ?? ''}
      redirectUri="/"
      postLogoutRedirectUri="/"
    >
      <UIContextProvider
        components={{
          Link: ({ href, className, children, locale, target, rel }) => {
            if (href === undefined || href === null) return null;
            return (
              <Link href={href} locale={locale}>
                <a target={target} rel={rel} href={href} className={className}>
                  {children}
                </a>
              </Link>
            );
          },
          Image: ({ alt, src, shadow }) => (
            <ContentImage alt={alt} src={src} shadow={shadow} />
          ),
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
    </AuthProvider>
  );
}

export default appWithTranslation(MyApp);
