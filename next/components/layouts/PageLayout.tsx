import { FooterProps } from '@bratislava/ui-bratislava'
import { useNavMenuContext } from '@bratislava/ui-bratislava/../organisms/NavBar/NavMenu/navMenuContext'
import cx from 'classnames'
import React from 'react'

import Footer from '../molecules/Footer'
import NavBar from '../organisms/NavBar/NavBar'

interface BasePageLayoutProps {
  footer?: FooterProps
}

const PageLayout = ({
  className,
  children,
  footer,
}: React.HTMLAttributes<HTMLDivElement> & BasePageLayoutProps) => {
  const { menuValue } = useNavMenuContext()

  return (
    <div
      className={cx(className, {
        // If menu is open, disable pointer events on the whole page (pointer events on menu must be re-enabled)
        'lg:pointer-events-none': menuValue !== '',
      })}
    >
      <header>
        <NavBar />
      </header>

      <main>{children}</main>

      {footer && <Footer {...footer} />}
    </div>
  )
}

export default PageLayout
