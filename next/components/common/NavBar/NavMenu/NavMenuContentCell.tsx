import cx from 'classnames'
import React, { PropsWithChildren } from 'react'

type NavMenuCellProps = {
  colSpan: number
}

const NavMenuContentCell = ({ colSpan, children }: PropsWithChildren<NavMenuCellProps>) => {
  return (
    <div
      className={cx('w-full', {
        'col-span-1': colSpan === 1,
        'col-span-2': colSpan === 2,
      })}
    >
      {children}
    </div>
  )
}

export default NavMenuContentCell
