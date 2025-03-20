import React, { createContext, PropsWithChildren, useContext, useState } from 'react'

type NavMenuContextType = {
  menuValue: string
  setMenuValue: (value: string) => void
  isMobileMenuOpen: boolean
  setMobileMenuOpen: (value: boolean) => void
}

const NavMenuContext = createContext<NavMenuContextType>({
  menuValue: '',
  setMenuValue: () => {},
  isMobileMenuOpen: false,
  setMobileMenuOpen: () => {},
})

export const NavMenuContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [menuValue, setMenuValue] = useState<string>('')
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <NavMenuContext.Provider
      value={{ menuValue, setMenuValue, isMobileMenuOpen, setMobileMenuOpen }}
    >
      {children}
    </NavMenuContext.Provider>
  )
}

export const useNavMenuContext = () => {
  return useContext(NavMenuContext)
}
