import DesktopFooter from '@components/ui/Footer/DesktopFooter'
import MobileFooter from '@components/ui/Footer/MobileFooter'
import * as React from 'react'

const Footer = ({ footer }: { footer: any }) => {
  return (
    <>
      <div className="hidden md:block">
        <DesktopFooter footer={footer} />
      </div>
      <div className="md:hidden">
        <MobileFooter footer={footer} />
      </div>
    </>
  )
}

export default Footer
