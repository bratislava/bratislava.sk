import cx from 'classnames'
import React from 'react'

import CheckMark from '../../../assets/images/check-mark.svg'

type ICheckBoxProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  id: string
  content?: React.ReactNode
  variant?: 'default' | 'circle'
}

export const CheckBox = ({ className, id, content, variant = 'default', ...rest }: ICheckBoxProps) => (
  <label htmlFor={id} className={cx('cursor-pointer inline-flex gap-6 text-20-medium', className)}>
    <input type="checkbox" id={id} className="hidden" {...rest} />
    <div
      className={cx(
        'border-primary border-2 text-white flex flex-0 items-center justify-center box-border overflow-hidden',
        {
          'rounded-5 w-8 h-8': variant === 'default',
          'rounded-full w-6 h-6': variant === 'circle',
          'bg-primary': rest.checked,
          'bg-input-nav-bg': !rest.checked,
        },
        className
      )}
    >
      <CheckMark className={cx({ hidden: !rest.checked })} />
    </div>
    <div className="flex-1 md:pt-1">{content}</div>
  </label>
)

export default CheckBox
