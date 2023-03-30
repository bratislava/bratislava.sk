import * as React from 'react'

const UIContext = React.createContext<IComponents>({
  Link: ({ ...props }) => <a {...props} />,
  Markdown: ({ ...props }) => <div {...props}>{props.content}</div>,
})

interface IComponents {
  Link: React.FC<{
    locale?: string
    className?: string
    href: string
    target?: string
    rel?: string
    children: React.ReactNode
  }>
  Markdown: React.FC<{
    className?: string
    paragraphClassName?: string
    numericalList?: boolean
    hasBackground?: boolean
    content: string
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
