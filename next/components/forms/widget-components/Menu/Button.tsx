import { AriaButtonProps } from '@react-types/button'
import React, { RefObject } from 'react'
import { mergeProps, useButton, useFocusRing } from 'react-aria'

interface ButtonProps extends AriaButtonProps {
  isPressed: boolean
}

// const Button = forwardRef<HTMLAnchorElement | HTMLButtonElement, PolymorphicProps>(
//   (
//     {
//       className,
//       disabled,
//       variant = 'black',
//       size = 'lg',
//       icon,
//       text,
//       startIcon,
//       endIcon,
//       hrefIconHidden,
//       ...rest
//     },
//     ref,
//   ) => {
//     const { buttonProps } = useButton(
//       {
//         ...rest,
//         elementType: rest.href ? 'a' : 'button',
//         isDisabled: disabled,
//       },
//       ref as RefObject<HTMLAnchorElement | HTMLButtonElement>,
//     )

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { buttonProps } = useButton(props, ref as RefObject<HTMLButtonElement>)
  const { focusProps } = useFocusRing()

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
