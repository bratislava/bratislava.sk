import * as React from 'react'
import { CSSProperties } from 'react'

const UIContext = React.createContext<IComponents>({
  Link: ({ ...props }) => <a {...props} />,
})

interface IComponents {
  Link: React.FC<{
    locale?: string
    className?: string
    href: string
    target?: string
    rel?: string
    style?: CSSProperties
    children: React.ReactNode
  }>
}

export const UIContextProvider = ({
  children,
  components,
}: {
  children: React.ReactNode
  components: IComponents
}) => {
  return <UIContext.Provider value={components}>{children}</UIContext.Provider>
}

export const useUIContext = () => {
  return React.useContext(UIContext)
}
