/* eslint-disable react/button-has-type */
import { ChevronDownIcon } from '@assets/ui-icons'
import cx from 'classnames'
import React from 'react'

export interface AccordionItemProps {
  className?: string
  title: string
  secondaryTitle?: string
  initialState?: boolean
  isOpen?: boolean
  onOpen?: () => void
  children?: React.ReactNode
  paddingVariant?: 'normal' | 'narrow'
}

export const AccordionItem = ({
  initialState = false,
  isOpen,
  title,
  onOpen,
  children,
  className,
  secondaryTitle,
  paddingVariant = 'normal',
}: AccordionItemProps) => {
  const [active, setActive] = React.useState<boolean>(initialState)

  React.useEffect(() => {
    if (isOpen !== undefined) setActive(isOpen)
  }, [isOpen])

  const handleClick = () => {
    return onOpen ? onOpen() : setActive(!active)
  }

  return (
    <div className="mb-6 last:mb-0">
      <div
        className={cx(
          'drop-shadow-[0 8 24 black] rounded-lg px-6 py-3 lg:px-10 lg:py-4',
          {
            'border-2 border-solid border-transparent bg-category-200 shadow-lg': active,
            'border-2 border-category-600 bg-transparent md:hover:bg-category-200': !active,
          },
          className,
        )}
      >
        <button
          className={cx('flex w-full cursor-pointer items-center justify-between font-medium')}
          onClick={handleClick}
        >
          <div className="flex flex-row">
            <p className="text-h4 text-left font-medium text-font">
              {title}
              {secondaryTitle && (
                <span className="text-left text-font ">&nbsp;{secondaryTitle}</span>
              )}
            </p>
          </div>
          <div className="ml-5 grow-0">
            <ChevronDownIcon className={cx('h-6 w-6 lg:h-8 lg:w-8', { 'rotate-180': active })} />
          </div>
        </button>
      </div>
      <div
        className={cx('text-fontBlack text-default overflow-hidden', {
          'h-auto': active,
          'h-0': !active,
          'p-6': active && paddingVariant === 'narrow',
          'mt-7 last:mb-0 lg:mt-14': active && paddingVariant === 'normal',
        })}
      >
        {children}
      </div>
    </div>
  )
}

export default AccordionItem
