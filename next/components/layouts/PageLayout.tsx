import { useNavMenuContext } from '@bratislava/ui-bratislava/../organisms/NavBar/NavMenu/navMenuContext'
import cx from 'classnames'
import React, { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

import Footer from '../molecules/Footer'
import NavBar from '../organisms/NavBar/NavBar'

type PageLayoutProps = {
  className?: string
}

const PageLayout = ({ className, children }: PropsWithChildren<PageLayoutProps>) => {
  const { menuValue } = useNavMenuContext()

  return (
    <div
      className={twMerge(
        className,
        cx({
          // If menu is open, disable pointer events on the whole page (pointer events on menu must be re-enabled)
          'lg:pointer-events-none': menuValue !== '',
        }),
      )}
    >
      <header>
        <NavBar />
      </header>

      <main>{children}</main>

      <Footer />
    </div>
  )
}

export default PageLayout
