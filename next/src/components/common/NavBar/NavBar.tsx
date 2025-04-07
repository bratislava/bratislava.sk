import { useRef } from 'react'
import { useResizeObserver } from 'usehooks-ts'

import AlertBanner from '@/src/components/common/NavBar/AlertBanner'

import MobileNavBar from './MobileNavBar'
import NavBarHeader from './NavBarHeader/NavBarHeader'
import NavMenu from './NavMenu/NavMenu'

const NavBar = () => {
  const alertRef = useRef<HTMLDivElement>(null)
  const { height } = useResizeObserver({ ref: alertRef })

  return (
    <>
      <div className="hidden w-full bg-white lg:block">
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
