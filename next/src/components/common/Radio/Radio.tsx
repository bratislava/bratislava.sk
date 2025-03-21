import * as React from 'react'

import cn from '@/src/utils/cn'

export type RadioProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  key: string
  title: string
}
const Radio = ({ className, id, title, ...rest }: RadioProps) => {
  return (
    <label
      htmlFor={id}
      className={cn(
        'base-radio',
        className,
        cn({
          'hover:border-category-600 hover:border-opacity-100 focus:border-category-600 focus:border-opacity-100 focus:outline-none':
            !rest.checked,
          'border-category-600 border-opacity-100 outline-none': rest.checked,
        }),
      )}
    >
      <input id={id} className="hidden" type="radio" {...rest} />
      <div className="absolute left-9 h-6 w-6 -translate-x-1/2 rounded-full bg-category-600" />
      {rest.checked && (
        <div className="absolute left-9 h-3 w-3 -translate-x-1/2 rounded-full bg-white" />
      )}
      {title}
    </label>
  )
}

export default Radio
