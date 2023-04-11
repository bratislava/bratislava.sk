import * as React from 'react'

import MobileNavBar from './MobileNavBar'
import NavBarHeader from './NavBarHeader/NavBarHeader'
import NavMenu from './NavMenu/NavMenu'

const NavBar = () => {
  return (
    <>
      <div className="fixed top-0 z-30 hidden w-full bg-white lg:block">
        <div className="w-full">
          {/* TODO mobile header, NavBarHeader (= new component) renders only on desktop */}
          <NavBarHeader />
          <NavMenu />
        </div>
      </div>
      <div className="hidden h-[137px] lg:block" />

      <MobileNavBar className="lg:hidden" />
    </>
  )
}

export default NavBar
