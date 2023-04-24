import '../../styles/globals.css'

import NavBar from '@components/organisms/NavBar/NavBar'
import Providers from '@components/providers/Providers'
import Footer from '@components/ui/Footer/Footer'
import { GeneralContextProvider } from '@utils/generalContext'
import { client } from '@utils/gql'
import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import React, { PropsWithChildren, ReactNode } from 'react'

export function generateStaticParams() {
  return [{ locale: 'sk' }, { locale: 'en' }]
}

const inter = Inter({
  variable: '--inter-font',
  subsets: ['latin', 'latin-ext'],
})

export default async function LocaleLayout({
  children,
  footer,
  params: { locale },
}: PropsWithChildren<{ params: { locale: string } }> & { footer: ReactNode }) {
  let messages
  try {
    messages = (await import(`../../messages/${locale}.json`)).default
  } catch (error) {
    notFound()
  }

  const general = await client.General({ locale })

  return (
    <html lang={locale} className={`${inter.variable} font-sans`}>
      <body>
        <Providers>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <GeneralContextProvider general={general}>
              <div>
                <header className="relative z-30">
                  <NavBar />
                </header>
                <main className="relative z-0">{children}</main>
                <Footer footer={general.footer} />
                {footer}
              </div>
            </GeneralContextProvider>
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  )
}
