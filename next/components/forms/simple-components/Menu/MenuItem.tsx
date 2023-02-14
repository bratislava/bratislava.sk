import type { Node } from '@react-types/shared'
import React from 'react'
import { useMenuItem } from 'react-aria'
import { TreeState } from 'react-stately'

interface MenuItemProps<T> {
  item: Node<T>
  state: TreeState<T>
  onAction?: (key: React.Key) => void
  onClose: () => void
}

const MenuItem = <T,>({ item, state, onAction, onClose }: MenuItemProps<T>) => {
  const ref = React.useRef(null)
  const { menuItemProps } = useMenuItem(
    {
      key: item.key,
      onAction,
      onClose,
    },
    state,
    ref,
  )

  return (
    <li {...menuItemProps} ref={ref} className="focus:outline-none">
      {item.rendered}
    </li>
  )
}

export default MenuItem
