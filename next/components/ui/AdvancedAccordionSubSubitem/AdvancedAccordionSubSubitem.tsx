import { useState } from 'react'
import ChevronDown from '../../../assets/images/chevron-down-thin.svg'
import ChevronDownSmall from '../../../assets/images/chevron-down-thin-small.svg'
import cx from 'classnames'
import { AccordionCardProps } from '../AccordionCard/AccordionCard'
import { AccordionCards } from '../AccordionCards/AccordionCards'

export interface AdvancedAccordionSubSubitemProps {
  title: string
  className?: string
  cardClassName?: string
  departmentCards?: AccordionCardProps[]
}

export const AdvancedAccordionSubSubitem = ({
  title,
  className,
  cardClassName,
  departmentCards,
}: AdvancedAccordionSubSubitemProps) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex flex-col">
      <div
        className={cx(className, 'flex items-start lg:items-center cursor-pointer lg:px-5 ml-12')}
        onClick={() => setOpen(!open)}
      >
        <div className="text-default lg:text-md pr-6">{title}</div>
        <div className={cx('ml-auto pt-2.5', { 'rotate-180': open })}>
          <ChevronDown className="hidden lg:flex" />
          <ChevronDownSmall className="flex lg:hidden" />
        </div>
      </div>

      {open && departmentCards && departmentCards.length > 0 && (
        <div className={cx(cardClassName, 'lg:pt-8')}>
          <AccordionCards items={departmentCards} />
        </div>
      )}
    </div>
  )
}
