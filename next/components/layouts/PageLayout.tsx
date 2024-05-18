import React, { PropsWithChildren } from 'react'

import CookieConsent from '@/components/common/CookieConsent/CookieConsent'
import Footer from '@/components/common/Footer/Footer'
import NavBar from '@/components/common/NavBar/NavBar'

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
