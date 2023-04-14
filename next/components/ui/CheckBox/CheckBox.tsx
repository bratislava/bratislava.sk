import CheckMark from '@assets/images/check-mark.svg'
import cx from 'classnames'
import React from 'react'

type ICheckBoxProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  id: string
  content?: React.ReactNode
  variant?: 'default' | 'circle'
}

export const CheckBox = ({
  className,
  id,
  content,
  variant = 'default',
  ...rest
}: ICheckBoxProps) => (
  <label
    htmlFor={id}
    className={cx('text-large inline-flex cursor-pointer gap-6 font-medium', className)}
  >
    <input type="checkbox" id={id} className="hidden" {...rest} />
    <div
      className={cx(
        'flex-0 box-border flex items-center justify-center overflow-hidden border-2 border-category-600 text-white',
        {
          'h-8 w-8 rounded-5': variant === 'default',
          'h-6 w-6 rounded-full': variant === 'circle',
          'bg-category-600': rest.checked,
          'bg-white': !rest.checked,
        },
        className,
      )}
    >
      <CheckMark className={cx({ hidden: !rest.checked })} />
    </div>
    <div className="flex-1 md:pt-1">{content}</div>
  </label>
)

export default CheckBox
