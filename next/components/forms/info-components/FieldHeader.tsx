import HelpIcon from '@assets/images/forms/icon-help.svg'
import cx from 'classnames'
import React, { DOMAttributes, FC, useState } from 'react'

import Tooltip from './Tooltip'

interface FieldHeaderProps {
  label: string
  htmlFor?: string
  required?: boolean
  explicitOptional?: 'none' | 'right' | 'left'
  helptext?: string
  labelProps?: DOMAttributes<never>
  descriptionProps?: DOMAttributes<never>
  tooltip?: string
}

const FieldHeader = (props: FieldHeaderProps) => {
  const {
    label,
    htmlFor,
    required,
    explicitOptional = 'none',
    helptext = '',
    labelProps,
    descriptionProps,
    tooltip,
  } = props
  const [isTooltipOpened, setIsTooltipOpened] = useState<boolean>(false)

  // STYLES
  const labelStyle = cx('text-20-semibold leading-7 relative text-gray-800', {
    'after:text-20-semibold after:content-["*"] after:ml-0.5 after:absolute after:bottom-0.5 after:text-main-700':
      required,
  })

  const helptextHandler = () =>
    helptext
      .trim()
      .split('\n')
      .map((sentence, i) => <span key={i}>{sentence}</span>)

  return (
    <div className="w-full">
      <div className="flex justify-between mb-1">
        <div className="flex w-full justify-between">
          {/* LABEL */}
          <label htmlFor={htmlFor} className={labelStyle} {...labelProps}>
            {label}
          </label>
          {
            /* OPTIONAL */ !required && explicitOptional === 'left' && (
              <p className="text-16 ml-2 flex items-center">(optional)</p>
            )
          }
          <div className="flex-column flex items-center">
            {
              /* TOOLTIP ICON */
              tooltip && (
                <div
                  className={cx('flex-column flex items-center', {
                    'ml-5': required,
                    'ml-2': !required,
                  })}
                >
                  <HelpIcon
                    className="cursor-pointer"
                    onMouseOver={() => setIsTooltipOpened(true)}
                    onMouseLeave={() => setIsTooltipOpened(false)}
                  />
                  <div className="relative">
                    <Tooltip
                      text={tooltip}
                      visible={isTooltipOpened}
                      arrow="bottom"
                      alignArrow="right"
                      bottom={15}
                      right={-13}
                      absolute
                    />
                  </div>
                </div>
              )
            }
          </div>
        </div>
        {
          /* OPTIONAL */ !required && explicitOptional === 'right' && (
            <p className="text-16 ml-2 flex items-center">(optional)</p>
          )
        }
      </div>
      {
        /* DESCRIPTION */
        helptext && (
          <div {...descriptionProps} className="text-16 mb-1 text-gray-700">
            {helptextHandler()}
          </div>
        )
      }
    </div>
  )
}

export default FieldHeader
