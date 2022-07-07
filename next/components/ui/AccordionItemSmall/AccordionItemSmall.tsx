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
}: AccordionItemSmallProps) => {
  const [active, setActive] = React.useState<boolean>(initialState)

  React.useEffect(() => {
    if (isOpen !== undefined) setActive(isOpen)
  }, [isOpen])

  const handleClick = () => {
    return onOpen ? onOpen() : setActive(!active)
  }

  const [switchValue, setSwitchValue] = React.useState<'left' | 'right'>(
    'left'
  );

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
        <button
          className={cx('flex items-center cursor-pointer justify-between w-full font-medium')}
          onClick={handleClick}
        >
          <div className='flex items-center'>
            <div className="mr-4 grow-0 md:mr-5">
              <Chevron className={cx('', { 'rotate-180': active })} />
            </div>
            <div className="flex flex-row font-medium">
              <p className="text-left text-xxs font-medium text-font md:text-sm">{title}</p>
              {secondaryTitle && <p className="text-left text-xxs text-gray-universal-500 md:text-sm ">&nbsp;{secondaryTitle}</p>}
            </div>
          </div>
          <div>
            <SwitchToggle
                  titleLeft=""
                  titleRight=""
                  variant='primary'
                  value={switchValue}
                  onValueChange={(val) => setSwitchValue(val)}
                />
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
