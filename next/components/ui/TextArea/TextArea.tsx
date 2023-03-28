import cx from 'classnames'
import * as React from 'react'

interface IProps {
  hasError?: boolean
}

export const TextArea = ({
  className,
  hasError,
  ...props
}: React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> &
  IProps) => {
  return (
    <textarea
      className={cx('base-input h-auto w-full resize-none', className, {
        'base-input--with-error': hasError,
        'base-input--disabled': props.disabled,
      })}
      {...props}
    />
  )
}

export default TextArea
