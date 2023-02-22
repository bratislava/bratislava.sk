import cx from 'classnames'
import React, { useState } from 'react'

import ExpandMoreIcon from '../icon-components/ExpandMoreIcon'
import PersonIcon from '../icon-components/PersonIcon'
import AccountMarkdownTable from '../segments/AccountMarkdown/AccountMarkdownTable'
import AccountMarkdownModal from '../segments/AccountMarkdownModal/AccountMarkdownModal'

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

const AccordionTableContent = ({
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

  const paddingStyles = cx({
    'px-4 py-3 lg:p-4': accordionSize === 'xs',
    'p-4 lg:p-5': accordionSize === 'sm',
    'p-4 lg:py-6 lg:px-8': accordionSize === 'md',
    'py-5 px-6 lg:py-8 lg:px-10': accordionSize === 'lg',
  })

  const accordionHeaderStyle = cx(
    'flex flex-col gap-4 w-full rounded-xl bg-gray-0',
    className,
    paddingStyles,
  )
  const accordionContainerStyle = cx('flex flex-col w-full rounded-xl bg-gray-0', className, {
    'border-gray-200': !isActive && !shadow,
    'border-gray-700': isActive && !shadow,
    'border-2 border-solid hover:border-gray-500': !shadow,
    'hover:shadow-[0_8px_16px_0_rgba(0,0,0,0.08)]': shadow,
    'shadow-[0_0_16px_0_rgba(0,0,0,0.08)]': isActive && shadow,
    'shadow-[0_4px_16px_0_rgba(0,0,0,0.08)]': !isActive && shadow,
  })
  return (
    <>
      <div className="lg:hidden block">
        <AccountMarkdownModal
          show={isActive}
          onClose={() => setIsActive(false)}
          content={content}
          onSubmit={() => {}}
          header={title}
        />
      </div>
      <div className={accordionContainerStyle}>
        <div className={cx('flex gap-4', accordionHeaderStyle)}>
          {icon && (
            <div
              className={cx('flex items-center justify-center', {
                'w-6 h-6': accordionSize === 'sm' || accordionSize === 'xs',
                'w-8 h-8': accordionSize === 'md',
                'w-10 h-10': accordionSize === 'lg',
              })}
            >
              <PersonIcon
                className={cx('', {
                  'w-4 h-4': accordionSize === 'sm' || accordionSize === 'xs',
                  'w-5 h-5': accordionSize === 'md',
                  'w-6 h-6': accordionSize === 'lg',
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
                  'lg:text-h-md text-p-base': size === 'md',
                  'text-h-lg': size === 'lg',
                })}
              >
                {secondTitle}
              </div>
              <div
                className={cx('flex items-center justify-center', {
                  'w-10 h-10': accordionSize === 'lg',
                  'w-8 h-8': accordionSize === 'md',
                  'w-6 h-6': accordionSize === 'sm' || accordionSize === 'xs',
                })}
              >
                <ExpandMoreIcon
                  className={cx('', {
                    'transform rotate-180': isActive,
                  })}
                  size={accordionSize}
                />
              </div>
            </button>
          </div>
        </div>
        <div
          className={cx('h-0.5 w-full bg-gray-200', {
            hidden: !isActive,
          })}
        />
        {isActive && (
          <div
            className={cx('flex flex-col font-normal lg:block hidden', paddingStyles, {
              'text-h6': accordionSize === 'sm' || accordionSize === 'xs',
              'text-20': accordionSize === 'lg' || accordionSize === 'md',
            })}
          >
            <AccountMarkdownTable content={content} className={className} />
          </div>
        )}
      </div>
    </>
  )
}

export default AccordionTableContent
