import { useState } from 'react'
import { useLockedBody } from 'usehooks-ts'

export const useMobileNavMenu = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

  useLockedBody(isMobileMenuOpen, 'root')

  const openMobileMenu = () => {
    setMobileMenuOpen(true)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return {
    isMobileMenuOpen,
    openMobileMenu,
    closeMobileMenu,
  }
}
