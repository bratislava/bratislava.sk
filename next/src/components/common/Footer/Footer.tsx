import * as React from 'react'

import DesktopFooter from '@/src/components/common/Footer/DesktopFooter'
import MobileFooter from '@/src/components/common/Footer/MobileFooter'

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
