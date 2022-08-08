import { FC, ReactNode } from 'react'

interface Props {
  children: ReactNode
}
export const MenuDesktopLayout: FC<Props> = ({ children }) => (
  <div className="relative hidden justify-between gap-y-4 md:grid md:grid-cols-3 lg:flex lg:flex-row lg:gap-y-0">
    {children}
  </div>
)
