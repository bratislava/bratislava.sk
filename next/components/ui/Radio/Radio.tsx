import cx from 'classnames'
import * as React from 'react'

export interface RadioProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  key: string
  title: string
}
export const Radio = ({ className, id, title, ...rest }: RadioProps) => {
  return (
    <label
      htmlFor={id}
      className={cx(
        'base-radio',
        className,
        cx({
          'focus:outline-none focus:border-category-600 focus:border-opacity-100 hover:border-category-600 hover:border-opacity-100':
            !rest.checked,
          'outline-none border-category-600 border-opacity-100': rest.checked,
        })
      )}
    >
      <input id={id} className="hidden" type="radio" {...rest} />
      <div className={cx('absolute w-6 h-6 left-9 rounded-full bg-category-600 transform -translate-x-1/2')} />
      {rest.checked && (
        <div className={cx('absolute w-3 h-3 left-9 rounded-full bg-white transform -translate-x-1/2')} />
      )}
      {title}
    </label>
  )
}

export default Radio
