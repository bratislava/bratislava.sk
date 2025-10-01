import React, { PropsWithChildren } from 'react'

import cn from '@/src/utils/cn'

type NavMenuCellProps = {
  colSpan: number
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=19079-20827&m=dev
 */

const NavMenuContentCell = ({ colSpan, children }: PropsWithChildren<NavMenuCellProps>) => {
  return (
    <div
      className={cn('w-full', {
        'col-span-1': colSpan === 1,
        'col-span-2': colSpan === 2,
      })}
    >
      {children}
    </div>
  )
}

export default NavMenuContentCell
