import * as React from 'react'

import cn from '@/src/utils/cn'

type InputProps = {
  hasError?: boolean
}

const Input = ({
  // eslint-disable-next-line react/prop-types
  className,
  hasError,
  ...props
}: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> &
  InputProps) => (
  <input
    className={cn('base-input w-full', className, {
      'base-input--with-error': hasError,
      // eslint-disable-next-line react/prop-types
      'base-input--disabled': props.disabled,
    })}
    {...props}
  />
)

export default Input
