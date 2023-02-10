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
  // Get props for the menu item element
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

  // Handle focus events so we can apply highlighted
  // style to the focused menu item
  // const isFocused = state.selectionManager.focusedKey === item.key
  // const focusBg = item.key === 'delete' ? 'bg-red-500' : 'bg-blue-500'
  // const focus = isFocused ? `${focusBg} text-white` : 'text-gray-900'

  // console.log(item)

  return (
    <li {...menuItemProps} ref={ref} className="focus:outline-none">
      {item.rendered}
    </li>
  )
}

export default MenuItem
