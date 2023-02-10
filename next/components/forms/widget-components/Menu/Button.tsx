import { AriaButtonProps } from '@react-types/button'
import React from 'react'
import { mergeProps, useButton, useFocusRing } from 'react-aria'

interface ButtonProps extends AriaButtonProps {
  isPressed: boolean
}

const Button = React.forwardRef((props: ButtonProps, ref: React.RefObject<HTMLButtonElement>) => {
  const { buttonProps, isPressed } = useButton(props, ref)
  const { focusProps, isFocusVisible } = useFocusRing()

  let bg = 'bg-blue-500'
  if (props.isDisabled) {
    bg = 'bg-gray-400'
  } else if (isPressed || props.isPressed) {
    bg = 'bg-blue-600'
  }

  const focus = isFocusVisible ? 'ring ring-offset-2 ring-blue-400' : ''

  return (
    <button
      {...mergeProps(buttonProps, focusProps)}
      ref={ref}
      className="relative flex cursor-pointer items-center focus:outline-none"
    >
      {props.children}
    </button>
  )
})

export default Button
