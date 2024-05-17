import * as React from 'react'

import DesktopFooter from '@/components/ui/Footer/DesktopFooter'
import MobileFooter from '@/components/ui/Footer/MobileFooter'

const Footer = () => {
  return (
    <>
      <div className="hidden md:block">
        <DesktopFooter />
      </div>
      <div className="md:hidden">
        <MobileFooter />
      </div>
    </>
  )
}

export default Footer
