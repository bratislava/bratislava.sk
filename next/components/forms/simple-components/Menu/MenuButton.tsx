import { AriaButtonProps } from '@react-types/button'
import React, { RefObject } from 'react'
import { mergeProps, useButton, useFocusRing } from 'react-aria'

interface ButtonProps extends AriaButtonProps {
  isPressed: boolean
}

const MenuButton = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { buttonProps } = useButton(props, ref as RefObject<HTMLButtonElement>)
  const { focusProps } = useFocusRing()
  const { children } = props

  return (
    <button
      {...mergeProps(buttonProps, focusProps)}
      ref={ref}
      className="relative flex cursor-pointer items-center focus:outline-none"
    >
      {children}
    </button>
  )
})

export default MenuButton
