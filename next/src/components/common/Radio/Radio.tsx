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
          // TODO the border-opacity-* is deprecated in TW4, see https://tailwindcss.com/docs/upgrade-guide
          'hover:border-opacity-100 focus:border-opacity-100 hover:border-category-600 focus:border-category-600 focus:outline-hidden':
            !rest.checked,
          'border-opacity-100 border-category-600 outline-hidden': rest.checked,
        }),
      )}
    >
      <input id={id} className="hidden" type="radio" {...rest} />
      <div className="absolute left-9 size-6 -translate-x-1/2 rounded-full bg-category-600" />
      {rest.checked && (
        <div className="absolute left-9 size-3 -translate-x-1/2 rounded-full bg-white" />
      )}
      {title}
    </label>
  )
}

export default Radio
