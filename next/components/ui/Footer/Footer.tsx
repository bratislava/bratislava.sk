import DesktopFooter from '@components/ui/Footer/DesktopFooter'
import MobileFooter from '@components/ui/Footer/MobileFooter'
import * as React from 'react'

const Footer = () => {
  return (
    <>
      <div className="hidden lg:block">
        <DesktopFooter />
      </div>
      <div className="lg:hidden">
        <MobileFooter />
      </div>
    </>
  )
}

export default Footer
