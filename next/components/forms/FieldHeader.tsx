import cx from 'classnames'
import React, { DOMAttributes, FC, useState } from 'react'

import HelpIcon from '@assets/images/forms/icon-help.svg'
import Tooltip from './Tooltip'

interface FieldHeaderProps {
  label: string
  htmlFor?: string
  required?: boolean
  description?: string
  labelProps?: DOMAttributes<never>
  descriptionProps?: DOMAttributes<never>
  tooltip?: string
}

const FieldHeader: FC<FieldHeaderProps> = (
  { label,
    htmlFor,
    required,
    description,
    labelProps,
    descriptionProps,
    tooltip
  }
) => {
  const [isTooltipOpened, setIsTooltipOpened] = useState<boolean>(false)

  // STYLES
  const labelStyle = cx(
    'relative mb-1 text-button-1 font-semibold text-universal-black',
    {'after:content-["*"] after:ml-0.5 after:absolute after:-top-0.5 after:text-red-brick after:text-p3': required}
  )

  return (
    <div className="w-full">
      {/* TOOLTIP */
       tooltip && (
         <div className="relative">
          <Tooltip text={tooltip} visible={isTooltipOpened} arrow="bottom" alignArrow="right" bottom={0} right={-13} absolute/>
        </div>
       )
      }
      <div className="flex justify-between">
        {/* LABEL */}
        <label htmlFor={htmlFor} className={labelStyle} {...labelProps}>{label}</label>
        <div className="flex-column flex items-center">
          {/* OPTIONAL */
            !required && <p className="text-button-1 mr-4">Optional</p>
          }
          {/* TOOLTIP ICON */
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
          <div {...descriptionProps} className="mb-1 text-p2 text-universal-black">
            {description}
          </div>
        )
      }
    </div>
  )
}

export default FieldHeader
