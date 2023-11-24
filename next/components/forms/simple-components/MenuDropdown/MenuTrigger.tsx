import cx from 'classnames'
import React, { ReactNode } from 'react'

interface ButtonProps {
  buttonTrigger?: ReactNode
  className?: string
}

const MenuTrigger = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { buttonTrigger, className, ...rest } = props
  return (
    <button
      type="button"
      ref={ref}
      {...rest}
      className={cx('flex items-center focus:outline-none', className)}
    >
      {buttonTrigger}
    </button>
  )
})

export default MenuTrigger
