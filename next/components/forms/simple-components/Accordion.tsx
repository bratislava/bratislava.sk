import cx from 'classnames'
import AccountMarkdown from 'components/forms/segments/AccountMarkdown/AccountMarkdown'
import React, { useState } from 'react'

import ExpandMoreIcon from '../icon-components/ExpandMoreIcon'
import PersonIcon from '../icon-components/PersonIcon'

export type AccordionSizeType = 'xs' | 'sm' | 'md' | 'lg'

export type AccordionBase = {
  size: AccordionSizeType
  title: string
  secondTitle?: string
  content: string
  icon?: boolean
  shadow?: boolean
  className?: string
}
export const isAccordionSizeType = (size: string) =>
  ['xs', 'sm', 'md', 'lg'].includes(size) ? size : 'sm'

const Accordion = ({
  title,
  secondTitle,
  content,
  size = 'sm',
  icon = false,
  shadow = false,
  className,
}: AccordionBase) => {
  const [isActive, setIsActive] = useState(false)

  const accordionSize = isAccordionSizeType(size) as AccordionSizeType

  const accordionContainerStyle = cx('flex flex-col gap-4 w-full rounded-xl bg-gray-0', className, {
    'px-4 py-3 lg:p-4': accordionSize === 'xs',
    'p-4 lg:p-5': accordionSize === 'sm',
    'p-4 lg:py-6 lg:px-8': accordionSize === 'md',
    'py-5 px-6 lg:py-8 lg:px-10': accordionSize === 'lg',
    'border-gray-200': !isActive && !shadow,
    'border-gray-700': isActive && !shadow,
    'border-2 border-solid hover:border-gray-500': !shadow,
    'hover:shadow-[0_8px_16px_0_rgba(0,0,0,0.08)]': shadow,
    'shadow-[0_0_16px_0_rgba(0,0,0,0.08)]': isActive && shadow,
    'shadow-[0_4px_16px_0_rgba(0,0,0,0.08)]': !isActive && shadow,
  })

  return (
    <div className={accordionContainerStyle}>
      <div className={cx('flex gap-4', {})}>
        {icon && (
          <div
            className={cx('flex items-center justify-center', {
              'h-6 w-6': accordionSize === 'sm' || accordionSize === 'xs',
              'h-8 w-8': accordionSize === 'md',
              'h-10 w-10': accordionSize === 'lg',
            })}
          >
            <PersonIcon
              className={cx('', {
                'h-4 w-4': accordionSize === 'sm' || accordionSize === 'xs',
                'h-5 w-5': accordionSize === 'md',
                'h-6 w-6': accordionSize === 'lg',
              })}
            />
          </div>
        )}
        <div className="flex w-full flex-col gap-2 lg:gap-4">
          <button
            type="button"
            className="flex cursor-pointer items-center gap-4"
            onClick={() => setIsActive(!isActive)}
          >
            <div
              className={cx('flex grow', {
                'text-h6': accordionSize === 'xs',
                'text-h5': accordionSize === 'sm',
                'text-h4': accordionSize === 'md',
                'text-h3': accordionSize === 'lg',
              })}
            >
              {title}
            </div>
            <div
              className={cx('lg:font-semibold', {
                'text-p-base': size === 'xs',
                'text-h-base': size === 'sm',
                'text-p-base lg:text-h-md': size === 'md',
                'text-h-lg': size === 'lg',
              })}
            >
              {secondTitle}
            </div>
            <div
              className={cx('flex items-center justify-center', {
                'h-10 w-10': accordionSize === 'lg',
                'h-8 w-8': accordionSize === 'md',
                'h-6 w-6': accordionSize === 'sm' || accordionSize === 'xs',
              })}
            >
              <ExpandMoreIcon
                className={cx('', {
                  'rotate-180 transform': isActive,
                })}
                size={accordionSize}
              />
            </div>
          </button>
          {isActive && (
            <div
              className={cx('flex flex-col font-normal', {
                'text-h6': accordionSize === 'sm' || accordionSize === 'xs',
                'text-20': accordionSize === 'lg' || accordionSize === 'md',
              })}
            >
              <AccountMarkdown content={content} className={className} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Accordion
