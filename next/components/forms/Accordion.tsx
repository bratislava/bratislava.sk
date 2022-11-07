import cx from 'classnames'
import React, { useState } from 'react'

import ExpandMoreIcon from './icon-components/ExpandMoreIcon'

type AccordionBase = {
  size: 'sm' | 'md' | 'lg'
  title: string
  content: string
  className?: string
}

const Accordion = ({ title, content, size }: AccordionBase) => {
  const [isActive, setIsActive] = useState(false)

  const accordionContainerStyle = cx('flex flex-col gap-4 w-[480px] border-2 border-solid rounded-xl bg-white hover:border-form-calendar-placeholder', {
    'p-5': size === 'sm',
    'py-6 px-8': size === 'md',
    'py-8 px-10': size === 'lg',
    'h-16': !isActive && size === 'sm',
    'h-20': !isActive && size === 'md',
    'h-26': !isActive && size === 'lg',
    'border-form-input-default': !isActive,
    'border-form-black-default': isActive,
  })

  return (
    <div className={accordionContainerStyle}>
      <div className={cx('flex items-center justify-between cursor-pointer', {
        'h-5.5': size === 'sm',
        'h-8': size === 'md',
        'h-10': size === 'lg',
      })} onClick={() => setIsActive(!isActive)}>
        <div className={cx('font-semibold not-italic', {
          'text-h-base leading-7 w-[400px]': size === 'sm',
          'text-h-md leading-8 w-[368px]': size === 'md',
          'text-h-lg leading-9 w-[344px]': size === 'lg',
        })}>{title}</div>
        <div className={cx('flex items-center justify-center', {
          'w-10 h-10': size === 'lg',
          'w-8 h-8': size === 'md',
          'w-6 h-6': size === 'sm',
        })}>
          <ExpandMoreIcon className={cx('', {
            'transform rotate-180': isActive,
          })} size={size} />
        </div>
      </div>
      {isActive && <div className={cx('h-6 flex items-center font-normal leading-8 not-italic', {
        'w-[400px]': size === 'lg',
        'w-[416px]': size === 'md',
        'w-[440px]': size === 'sm',
      })}>{content}</div>}
    </div>
  )
}

export default Accordion