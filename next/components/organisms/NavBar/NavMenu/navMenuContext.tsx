import React, { createContext, PropsWithChildren, useContext, useState } from 'react'

type NavMenuContextType = {
  menuValue: string
  setMenuValue: (value: string) => void
}

const NavMenuContext = createContext<NavMenuContextType>({
  menuValue: '',
  setMenuValue: () => {},
})

export const NavMenuContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [menuValue, setMenuValue] = useState<string>('')

  return (
    <NavMenuContext.Provider value={{ menuValue, setMenuValue }}>
      {children}
    </NavMenuContext.Provider>
  )
}

export const useNavMenuContext = () => {
  return useContext(NavMenuContext)
}
