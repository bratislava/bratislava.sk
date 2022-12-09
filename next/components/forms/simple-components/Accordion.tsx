import cx from 'classnames'
import React, { useState } from 'react'

import ExpandMoreIcon from '../icon-components/ExpandMoreIcon'
import PersonIcon from '../icon-components/PersonIcon'

type AccordionBase = {
  size: 'sm' | 'md' | 'lg'
  title: string
  content: string
  icon?: boolean
  className?: string
}

const Accordion = ({ title, content, size, icon = false, className }: AccordionBase) => {
  const [isActive, setIsActive] = useState(false)

  const accordionContainerStyle = cx(
    'flex flex-col gap-4 w-full border-2 border-solid rounded-xl bg-gray-0 hover:border-gray-500',
    className,
    {
      'p-5': size === 'sm',
      'py-6 px-8': size === 'md',
      'py-8 px-10': size === 'lg',
      'border-gray-200': !isActive,
      'border-gray-700': isActive,
    },
  )

  return (
    <div className={accordionContainerStyle}>
      <div
        className={cx('flex w-full items-center justify-between cursor-pointer gap-4', {})}
        onClick={() => setIsActive(!isActive)}
      >
        {icon && (
          <div
            className={cx('flex items-center justify-center', {
              'w-6 h-6': size === 'sm',
              'w-8 h-8': size === 'md',
              'w-10 h-10': size === 'lg',
            })}
          >
            <PersonIcon
              className={cx('', {
                'w-4 h-4': size === 'sm',
                'w-5 h-5': size === 'md',
                'w-6 h-6': size === 'lg',
              })}
            />
          </div>
        )}
        <div
          className={cx('font-semibold not-italic w-full', {
            'text-h-base': size === 'sm',
            'text-h-md': size === 'md',
            'text-h-lg': size === 'lg',
          })}
        >
          {title}
        </div>
        <div
          className={cx('flex items-center justify-center', {
            'w-10 h-10': size === 'lg',
            'w-8 h-8': size === 'md',
            'w-6 h-6': size === 'sm',
          })}
        >
          <ExpandMoreIcon
            className={cx('', {
              'transform rotate-180': isActive,
            })}
            size={size}
          />
        </div>
      </div>
      {isActive && (
        <div
          className={cx('flex w-full items-center font-normal not-italic', {
            'text-h-sm': size === 'sm',
            'text-p-md': size === 'lg' || size === 'md',
          })}
        >
          {content}
        </div>
      )}
    </div>
  )
}

export default Accordion
