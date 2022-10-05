import cx from 'classnames'
import React, { DOMAttributes, FC, useState } from 'react'

import HelpIcon from '../../assets/images/icon-help.svg'

interface FieldHeaderProps {
  label: string
  htmlFor: string
  required?: boolean
  description?: string
  labelProps?: DOMAttributes<never>
  descriptionProps?: DOMAttributes<never>
  tooltip?: string
  optional?: boolean
}

const FieldHeader: FC<FieldHeaderProps> = (
  { label,
    htmlFor,
    required,
    description,
    labelProps,
    descriptionProps,
    tooltip ,
    optional
  }
) => {
  const [isTooltipOpened, setIsTooltipOpened] = useState<boolean>(false)

  // STYLES
  const labelStyle = cx(
    'relative mb-1 text-default font-semibold text-universal-black',
    {'after:content-["*"] after:ml-0.5 after:absolute after:-top-0.5 after:text-red-brick after:text-xs': required}
  )

  return (
    <div className="w-full">
      <div className="relative">
        {
          isTooltipOpened && <div className="absolute bottom-0 right-0 h-16 w-96 rounded-lg bg-white p-2 drop-shadow-lg">{tooltip}</div>
        }
      </div>
      <div className="flex justify-between">
        {/* LABEL */}
        <label htmlFor={htmlFor} className={labelStyle} {...labelProps}>{label}</label>
        <div className="flex-column flex items-center">
          {/* OPTIONAL */
            optional && <p className="mr-4.5 text-default">Optional</p>
          }
          {/* TOOLTIP */
            tooltip && (
              <div className="flex-column flex items-center">
                <HelpIcon className="cursor-pointer"
                          onMouseOver={() => setIsTooltipOpened(true)}
                          onMouseLeave={() => setIsTooltipOpened(false)}/>
              </div>
            )
          }
        </div>
      </div>
      { /* DESCRIPTION */
        description && (
          <div {...descriptionProps} className="mb-1 text-sm text-universal-black">
            {description}
          </div>
        )
      }
    </div>
  )
}

export default FieldHeader
