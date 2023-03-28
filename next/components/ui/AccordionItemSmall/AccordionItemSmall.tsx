// @ts-strict-ignore
import cx from 'classnames'
import React from 'react'

// import Chevron from '@assets/images/chevron.svg'
import Chevron from '@assets/images/chevron-down-small.svg'
import { SwitchToggle } from '../SwitchToggle/SwitchToggle'

export interface AccordionItemSmallProps {
  className?: string
  title: string
  secondaryTitle?: string
  initialState?: boolean
  isOpen?: boolean
  onOpen?: () => void
  children?: React.ReactNode
  paddingVariant?: 'normal' | 'narrow'
  value?: boolean
  onValueChange?: (boolean) => void
  isDisabled?: boolean
}

export const AccordionItemSmall = ({
  initialState = false,
  isOpen,
  title,
  onOpen,
  children,
  className,
  secondaryTitle,
  paddingVariant = 'normal',
  value,
  onValueChange,
  isDisabled,
}: AccordionItemSmallProps) => {
  const [active, setActive] = React.useState<boolean>(initialState)

  React.useEffect(() => {
    if (isOpen !== undefined) setActive(isOpen)
  }, [isOpen])

  const handleClick = () => {
    if (isDisabled) return null
    return onOpen ? onOpen() : setActive(!active)
  }

  return (
    <>
      <div
        className={cx(
          'drop-shadow-[0 8 24 black] rounded-lg py-3 px-4 md:py-4 md:px-6',
          {
            'border-2 border-solid border-category-600 bg-category-200 shadow-lg': active,
            'border-2 border-category-600 bg-transparent': !active,
            'md:hover:bg-category-200 md:hover:stroke-current': !isDisabled && !active,
          },
          className,
        )}
      >
        <div className={cx('flex w-full items-center justify-between font-medium')}>
          <span
            className={cx('flex items-center', { 'cursor-pointer': !isDisabled })}
            aria-hidden="true"
            onClick={handleClick}
          >
            <div className="mr-4 grow-0 md:mr-5 ">
              <Chevron className={cx('', { 'rotate-180': active })} />
            </div>
            <div className="flex flex-row font-medium">
              <p className="text-p4-medium md:text-p2-medium text-left text-font">{title}</p>
              {secondaryTitle && (
                <p className="text-p4 md:text-p2 text-left text-font">&nbsp;{secondaryTitle}</p>
              )}
            </div>
          </span>
          <div>
            <SwitchToggle
              titleLeft=""
              titleRight=""
              variant="primary"
              value={value}
              onValueChange={onValueChange}
            />
          </div>
        </div>
      </div>
      <div
        className={cx('text-fontBlack text-p2 overflow-hidden', {
          'h-auto': active,
          'h-0': !active,
          'p-3 md:p-6': active && paddingVariant === 'narrow',
          'py-3 md:py-6': active && paddingVariant === 'normal',
        })}
      >
        {children}
      </div>
    </>
  )
}

export default AccordionItemSmall
