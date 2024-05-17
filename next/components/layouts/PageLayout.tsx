import React, { PropsWithChildren } from 'react'

import CookieConsent from '@/components/organisms/CookieConsent/CookieConsent'
import NavBar from '@/components/organisms/NavBar/NavBar'
import Footer from '@/components/ui/Footer/Footer'

type PageLayoutProps = {
  className?: string
}

const PageLayout = ({ className, children }: PropsWithChildren<PageLayoutProps>) => {
  return (
    // Z-indices are set to create stacking contexts for easier z-index management.
    <div className={className}>
      <CookieConsent className="z-30" /* position: fixed */ />

      <header className="relative z-30">
        <NavBar />
      </header>

      <main className="relative z-0">{children}</main>

      <Footer />
    </div>
  )
}

export default PageLayout
