import React from 'react'

import { SidebarsFragment } from '@/src/services/graphql'

/**
 * Based on OLO: https://github.com/bratislava/olo.sk/blob/master/next/src/components/layout/Sidebars.tsx
 */

type Sidebar = SidebarsFragment

type SidebarsProps = {
  sidebar: Sidebar
  className?: string
}

const SidebarContent = ({ sidebar }: Pick<SidebarsProps, 'sidebar'>) => {
  // eslint-disable-next-line sonarjs/no-small-switch
  switch (sidebar.__typename) {
    default:
      return null
  }
}

const Sidebars = ({ sidebar, className }: SidebarsProps) => {
  if (sidebar.__typename === 'ComponentSidebarsEmptySidebar') return null

  return (
    <div className={className}>
      <SidebarContent sidebar={sidebar} />
    </div>
  )
}

export default Sidebars
