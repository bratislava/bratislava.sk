import cx from 'classnames'
import React, { DOMAttributes, FC } from 'react'

import HelpIcon from '../../assets/images/icon-help.svg'

interface FieldHeaderProps {
  label: string
  htmlFor: string
  required?: boolean
  description?: string
  labelProps?: DOMAttributes<never>
  descriptionProps?: DOMAttributes<never>
  tooltip?: boolean
}

const FieldHeader: FC<FieldHeaderProps> = (
  { label,
    htmlFor,
    required,
    description,
    labelProps,
    descriptionProps,
    tooltip }
) => {
  // STYLES
  const labelStyle = cx(
    'relative mb-1 text-default font-semibold text-universal-black',
    {'after:content-["*"] after:ml-0.5 after:absolute after:-top-0.5 after:text-red-brick after:text-xs': required}
  )

  return (
    <>
      {/* LABEL */}
      <div className="flex justify-between">
        <label htmlFor={htmlFor} className={labelStyle} {...labelProps}>{label}</label>
        {tooltip && (
          <div className="flex-column flex items-center">
            <p className="mr-4.5 text-default">Optional</p>
            <div className="flex-column flex items-center">
              <HelpIcon />
            </div>
          </div>
        )}
      </div>
      { /* DESCRIPTION */
        description && (
          <div {...descriptionProps} className="mb-1 text-sm text-universal-black">
            {description}
          </div>
        )
      }
    </>
  )
}

export default FieldHeader
