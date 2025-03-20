import cx from 'classnames'
import * as React from 'react'

type InputProps = {
  hasError?: boolean
}

const Input = ({
  className,
  hasError,
  ...props
}: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> &
  InputProps) => (
  <input
    className={cx('base-input w-full', className, {
      'base-input--with-error': hasError,
      'base-input--disabled': props.disabled,
    })}
    {...props}
  />
)

export default Input
