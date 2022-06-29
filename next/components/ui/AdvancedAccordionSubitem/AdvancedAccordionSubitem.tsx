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
import useSWR from 'swr'
import { usersFromDepartmentFetcher } from '@utils/ms-graph'

export interface AdvancedAccordionSubitemProps {
  title: string
  isGroupTitle?: boolean
  items?: AdvancedAccordionSubSubitemProps[]
  className?: string
  cardClassName?: string
}

export const AdvancedAccordionSubitem = ({
  title,
  isGroupTitle,
  items,
  className,
  cardClassName,
}: AdvancedAccordionSubitemProps) => {
  const [open, setOpen] = useState(false)
  const [cards, setCards] = useState([])
  const { data, error } = useSWR(title, usersFromDepartmentFetcher)
  if (!cards.length && data && data.length > 0) {
    setCards(data)
  }
  return (
    <div className="flex flex-col">
      <div
        className={cx(className, 'flex items-start lg:items-center cursor-pointer lg:px-5')}
        onClick={() => setOpen(!open)}
      >
        {isGroupTitle ?? <div className="bg-secondary h-6 w-6 rounded-full mr-3 lg:mr-6 shrink-0 mt-1 lg:mt-0" />}
        {/* TODO optimize this  */}
        {isGroupTitle ? (
          <div className="text-default lg:text-md pt-8 lg:pt-10 font-semibold">{title}</div>
        ) : (
          <div className="text-default lg:text-md pr-6">{title}</div>
        )}
        {isGroupTitle ?? (
          <div className={cx('ml-auto pt-2.5', { 'rotate-180': open })}>
            <ChevronDown className="hidden lg:flex" />
            <ChevronDownSmall className="flex lg:hidden" />
          </div>
        )}
      </div>

      {open && cards && cards.length > 0 && (
        <div className={cx(cardClassName, 'lg:pt-8')}>
          <AccordionCards items={cards} />
        </div>
      )}
      {open && items && items?.length > 0 && (
        <div className="flex flex-col gap-y-6 pt-10">
          {items.map((sub, index) => (
            <AdvancedAccordionSubSubitem key={index} title={sub.title} />
          ))}
        </div>
      )}
    </div>
  )
}
