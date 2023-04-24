'use client'

import { NavMenuContextProvider } from '@components/organisms/NavBar/NavMenu/navMenuContext'
import { UIContextProvider } from '@utils/ui-context'
import { isProductionDeployment } from '@utils/utils'
import Link from 'next/link'
import PlausibleProvider from 'next-plausible'
import { NextAdapter } from 'next-query-params'
import React, { PropsWithChildren } from 'react'
import { SSRProvider } from 'react-aria'
import { QueryParamProvider } from 'use-query-params'

import BAQueryClientProvider from './BAQueryClientProvider'

const Providers = ({ children }: PropsWithChildren) => {
  const isProd = isProductionDeployment()

  return (
    <UIContextProvider
      components={{
        Link: ({ href, className, children, locale, target, rel, style }) => {
          if (href === undefined || href === null) return null
          return (
            <Link
              href={href}
              locale={locale}
              target={target}
              rel={rel}
              className={className}
              style={style}
            >
              {children}
            </Link>
          )
        },
      }}
    >
      <PlausibleProvider
        domain={isProd ? 'bratislava.sk' : 'testing.bratislava.sk'}
        taggedEvents
        // uncomment for local testing, needs to be run with `yarn build && yarn start`
        // trackLocalhost
      >
        <BAQueryClientProvider>
          {/* <QueryParamProvider adapter={NextAdapter}> */}
          <SSRProvider>
            <NavMenuContextProvider>{children}</NavMenuContextProvider>
          </SSRProvider>
          {/* </QueryParamProvider> */}
        </BAQueryClientProvider>
      </PlausibleProvider>
    </UIContextProvider>
  )
}

export default Providers
