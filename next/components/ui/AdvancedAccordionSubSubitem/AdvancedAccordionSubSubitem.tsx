/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import ChevronDown from '@assets/images/chevron-down-thin.svg'
import ChevronDownSmall from '@assets/images/chevron-down-thin-small.svg'
import { usersFromDepartmentFetcher } from 'backend/utils/organisationalStructure'
import cx from 'classnames'
import { useState } from 'react'
import useSWR from 'swr'

import { AccordionCards } from '../AccordionCards/AccordionCards'

export interface AdvancedAccordionSubSubitemProps {
  title?: string
  className?: string
  cardClassName?: string
}

export const AdvancedAccordionSubSubitem = ({
  title,
  className,
  cardClassName,
}: AdvancedAccordionSubSubitemProps) => {
  const [open, setOpen] = useState(false)
  const [cards, setCards] = useState([])
  const { data } = useSWR(title, usersFromDepartmentFetcher)
  if (cards.length === 0 && data && data.length > 0) {
    setCards(data)
  }
  return (
    <div className="flex flex-col">
      <div
        className={cx(className, 'ml-12 flex cursor-pointer items-start lg:items-center lg:px-5')}
        onClick={() => setOpen(!open)}
      >
        <div className="text-p1 pr-6">{title}</div>
        <div className={cx('ml-auto pt-2.5', { 'rotate-180': open })}>
          <ChevronDown className="hidden lg:flex" />
          <ChevronDownSmall className="flex lg:hidden" />
        </div>
      </div>

      {open && cards && cards.length > 0 && (
        <div className={cx(cardClassName, 'lg:pt-8')}>
          <AccordionCards items={cards} />
        </div>
      )}
    </div>
  )
}
