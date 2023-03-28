import cx from 'classnames'
import * as React from 'react'

interface IProps {
  hasError?: boolean
}

export const Input = ({
  className,
  hasError,
  ...props
}: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> &
  IProps) => (
  <input
    className={cx('base-input w-full', className, {
      'base-input--with-error': hasError,
      'base-input--disabled': props.disabled,
    })}
    {...props}
  />
)

export default Input
