import cx from 'classnames'
import React from 'react'

// import Chevron from '../../../assets/images/chevron.svg'
import Chevron from '../../../assets/images/chevron-down-small.svg'
import SwitchToggle from '../SwitchToggle/SwitchToggle'

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
}: AccordionItemSmallProps) => {
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
          'rounded-lg drop-shadow-[0 8 24 black] py-3 px-4 md:py-4 md:px-6',
          {
            'border-primary border-2 border-solid shadow-lg bg-secondary': active,
            'md:hover:bg-secondary md:hover:stroke-current border-2 border-primary bg-transparent': !active,
          },
          className
        )}
      >
        <button className={cx('flex items-center cursor-pointer justify-between w-full font-medium')}>
          <div className="flex items-center">
            <div className="mr-4 md:mr-5 flex-grow-0">
              <Chevron className={cx('', { 'rotate-180': active })} onClick={handleClick} />
            </div>
            <div className="flex flex-row font-medium"  onClick={handleClick}>
              <p className="text-font text-xxs md:text-sm text-left font-medium">{title}</p>
              {secondaryTitle && (
                <p className="text-xxs md:text-sm text-left text-gray-universal-500 ">&nbsp;{secondaryTitle}</p>
              )}
            </div>
          </div>
          <div>
            <SwitchToggle titleLeft="" titleRight="" variant="primary" value={value} onValueChange={onValueChange} />
          </div>
        </button>
      </div>
      <div
        className={cx('overflow-hidden text-fontBlack text-sm', {
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
