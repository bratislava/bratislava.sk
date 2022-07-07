import cx from 'classnames'
import * as React from 'react'

export interface FieldProps {
  children?: React.ReactNode
  tooltip?: React.ReactNode
  className?: string
  id?: string
  title?: string
  error?: string
}

export const Field = ({ children, tooltip, className, id, title, error }: FieldProps) => {
  return (
    <div className={cx(className, 'mt-8')}>
      {(title || tooltip) && (
        <div className="mb-3 flex items-center justify-between space-x-2 md:justify-start">
          <label className="text-base md:text-default" htmlFor={id}>
            {title}
          </label>
          {tooltip}
        </div>
      )}
      {children}

      {error && <p className="mt-2 text-center text-sm text-error sm:text-left">{error}</p>}
    </div>
  )
}

export default Field
