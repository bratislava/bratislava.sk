import * as React from 'react'

import DesktopFooter from '@/components/common/Footer/DesktopFooter'
import MobileFooter from '@/components/common/Footer/MobileFooter'

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
