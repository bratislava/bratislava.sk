import HelpIcon from '@assets/images/forms/icon-help.svg'
import cx from 'classnames'
import React, { DOMAttributes, FC, useState } from 'react'

import Tooltip from './Tooltip'

interface FieldHeaderProps {
  label: string
  htmlFor?: string
  required?: boolean
  explicitOptional?: boolean
  description?: string
  labelProps?: DOMAttributes<never>
  descriptionProps?: DOMAttributes<never>
  tooltip?: string
}

const FieldHeader: FC<FieldHeaderProps> = ({
  label,
  htmlFor,
  required,
  explicitOptional,
  description,
  labelProps,
  descriptionProps,
  tooltip,
}) => {
  const [isTooltipOpened, setIsTooltipOpened] = useState<boolean>(false)

  // STYLES
  const labelStyle = cx('relative mb-1 text-20-semibold text-gray-800', {
    'after:content-["*"] after:ml-0.5 after:absolute after:-top-0.5 after:text-main-700 after:text-20-semibold':
      required,
  })

  return (
    <div className="w-full">
      {
        /* TOOLTIP */
        tooltip && (
          <div className="relative">
            <Tooltip
              text={tooltip}
              visible={isTooltipOpened}
              arrow="bottom"
              alignArrow="right"
              bottom={0}
              right={-13}
              absolute
            />
          </div>
        )
      }
      <div className="flex justify-between">
        {/* LABEL */}
        <label htmlFor={htmlFor} className={labelStyle} {...labelProps}>
          {label}
        </label>
        <div className="flex-column flex items-center">
          {/* OPTIONAL */ !required && explicitOptional && <p className="text-20">Optional</p>}
          {
            /* TOOLTIP ICON */
            tooltip && (
              <div className="flex-column ml-4 flex items-center">
                <HelpIcon
                  className="cursor-pointer"
                  onMouseOver={() => setIsTooltipOpened(true)}
                  onMouseLeave={() => setIsTooltipOpened(false)}
                />
              </div>
            )
          }
        </div>
      </div>
      {
        /* DESCRIPTION */
        description && (
          <div {...descriptionProps} className="text-16 mb-1 text-gray-700">
            {description}
          </div>
        )
      }
    </div>
  )
}

export default FieldHeader
