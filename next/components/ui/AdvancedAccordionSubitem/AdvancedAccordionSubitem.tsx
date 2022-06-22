import { useState } from 'react'
import ChevronDown from '../../../assets/images/chevron-down-thin.svg'
import ChevronDownSmall from '../../../assets/images/chevron-down-thin-small.svg'
import cx from 'classnames'
import { AccordionCard, AccordionCardProps } from '../AccordionCard/AccordionCard'
import { AccordionCards } from '../AccordionCards/AccordionCards'
import {
  AdvancedAccordionSubSubitem,
  AdvancedAccordionSubSubitemProps,
} from '../AdvancedAccordionSubSubitem/AdvancedAccordionSubSubitem'

export interface AdvancedAccordionSubitemProps {
  groupHeading?: string
  title: string
  className?: string
  cardClassName?: string
  groupCard?: AccordionCardProps
  departmentCards?: AccordionCardProps[]
  subdepartments?: AdvancedAccordionSubSubitemProps[]
}

export const AdvancedAccordionSubitem = ({
  groupHeading,
  title,
  className,
  cardClassName,
  groupCard,
  departmentCards,
  subdepartments,
}: AdvancedAccordionSubitemProps) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex flex-col">
      {groupCard && <AccordionCard {...groupCard} className="mt-14" />}
      {groupHeading && <div className="pt-10 text-default lg:text-md font font-semibold">{groupHeading}</div>}
      <div
        className={cx(className, 'flex items-start lg:items-center cursor-pointer lg:px-5')}
        onClick={() => setOpen(!open)}
      >
        <div className="bg-secondary h-6 w-6 rounded-full mr-3 lg:mr-6 shrink-0 mt-1 lg:mt-0" />

        <div className="text-default lg:text-md pr-6">{title}</div>
        <div className={cx('ml-auto pt-2.5', { 'rotate-180': open })}>
          <ChevronDown className="hidden lg:flex" />
          <ChevronDownSmall className="flex lg:hidden" />
        </div>
      </div>

      {open && departmentCards && departmentCards?.length > 0 && (
        <div className={cx(cardClassName, 'lg:pt-8')}>
          <AccordionCards items={departmentCards} />
        </div>
      )}
      {open && subdepartments && subdepartments?.length > 0 && (
        <div className="flex flex-col gap-y-6 pt-10">
          {subdepartments.map((sub, index) => (
            <AdvancedAccordionSubSubitem key={index} title={sub.title} departmentCards={sub.departmentCards} />
          ))}
        </div>
      )}
    </div>
  )
}
