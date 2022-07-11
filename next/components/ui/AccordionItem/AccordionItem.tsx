import cx from 'classnames'
import React from 'react'

import Chevron from '@assets/images/chevron-small.svg'

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
    <>
      <div
        className={cx(
          'rounded-lg drop-shadow-[0 8 24 black] py-4 px-10',
          {
            'border-transparent border-2 border-solid shadow-lg bg-secondary': active,
            'md:hover:bg-secondary md:hover:stroke-current border-2 border-primary  bg-transparent': !active,
          },
          className
        )}
      >
        <button
          className={cx('flex items-center cursor-pointer justify-between w-full font-medium')}
          onClick={handleClick}
        >
          <div className="flex flex-row font-medium">
            <p className="text-left text-md text-font">{title}</p>
            {secondaryTitle && <p className="text-left text-md text-gray-universal-500 ">&nbsp;{secondaryTitle}</p>}
          </div>
          <div className="ml-5 grow-0">
            <Chevron className={cx('w-[24px] h-[12px]', { 'rotate-180': active })} />
          </div>
        </button>
      </div>
      <div
        className={cx('overflow-hidden text-fontBlack text-sm', {
          'h-auto': active,
          'h-0': !active,
          'p-6': active && paddingVariant === 'narrow',
          'py-14': active && paddingVariant === 'normal',
        })}
      >
        {children}
      </div>
    </>
  )
}

export default AccordionItem
