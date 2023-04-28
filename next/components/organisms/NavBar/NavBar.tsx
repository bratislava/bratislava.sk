import AlertBanner from '@components/organisms/NavBar/AlertBanner'
import * as React from 'react'
import { useElementSize } from 'usehooks-ts'

import MobileNavBar from './MobileNavBar'
import NavBarHeader from './NavBarHeader/NavBarHeader'
import NavMenu from './NavMenu/NavMenu'

const NavBar = () => {
  const [alertRef, { height }] = useElementSize<HTMLDivElement>()

  return (
    <>
      <div className="fixed top-0 z-30 hidden w-full bg-white lg:block">
        <AlertBanner ref={alertRef} />
        <div className="relative w-full">
          <NavBarHeader />
          <NavMenu />
        </div>
      </div>
      <div style={{ height }} aria-hidden className="hidden lg:block" />
      <div className="hidden h-[137px] lg:block" aria-hidden />

      <MobileNavBar className="lg:hidden" />
    </>
  )
}

export default NavBar
