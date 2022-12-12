import { PropsWithChildren } from 'react'

export const MenuDesktopLayout = ({ children }: PropsWithChildren) => (
  <div className="hidden relative md:grid md:grid-cols-3 md:gap-x-4 lg:gap-x-6 lg:grid-cols-6">
    {children}
  </div>
)
