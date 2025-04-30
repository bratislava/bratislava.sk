import { PropsWithChildren } from 'react'

import Footer from '@/src/components/common/Footer/Footer'
import NavBar from '@/src/components/common/NavBar/NavBar'
import ScrollToTopButton from '@/src/components/common/ScrollToTopButton/ScrollToTopButton'

type PageLayoutProps = {
  className?: string
}

const PageLayout = ({ className, children }: PropsWithChildren<PageLayoutProps>) => {
  return (
    // Z-indices are set to create stacking contexts for easier z-index management.
    <div className={className}>
      <header className="relative">
        <NavBar />
      </header>

      <main className="relative">
        {children}
        <ScrollToTopButton />
      </main>

      <Footer />
    </div>
  )
}

export default PageLayout
