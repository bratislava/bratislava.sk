import { usersFromDepartmentFetcher } from '@utils/organisationalStructure'
import cx from 'classnames'
import { useState } from 'react'
import useSWR from 'swr'

import ChevronDown from '../../../assets/images/chevron-down-thin.svg'
import ChevronDownSmall from '../../../assets/images/chevron-down-thin-small.svg'
import { AccordionCard, AccordionCardProps } from '../AccordionCard/AccordionCard'
import { AccordionCards } from '../AccordionCards/AccordionCards'
import {
  AdvancedAccordionSubSubitem,
  AdvancedAccordionSubSubitemProps,
} from '../AdvancedAccordionSubSubitem/AdvancedAccordionSubSubitem'
import { OrgStructureAccordionCards } from 'components/molecules/OrgStructureAccordionCards'

export interface AdvancedAccordionSubitemProps {
  title?: string
  titleOverride?: string
  isGroupTitle?: boolean
  items?: AdvancedAccordionSubSubitemProps[]
  extraPeople?: { email: string }[]
  namesToOmit?: { name: string }[]
  className?: string
  cardClassName?: string
}

export const AdvancedAccordionSubitem = ({
  title,
  titleOverride,
  isGroupTitle,
  items,
  extraPeople,
  namesToOmit,
  className,
  cardClassName,
}: AdvancedAccordionSubitemProps) => {
  const [open, setOpen] = useState(false)
  const [cards, setCards] = useState([])
  const { data, error } = useSWR(title, usersFromDepartmentFetcher)
  if (cards.length === 0 && data && data.length > 0) {
    setCards(data)
  }
  const displayTitle = titleOverride || title
  const subDataExists = cards?.length > 0 || extraPeople?.length > 0
  const subSubDataExists = items?.length > 0
  return (
    <div className="flex flex-col">
      <div
        className={cx(className, 'flex items-start lg:items-center cursor-pointer lg:px-5')}
        onClick={() => setOpen(!open)}
      >
        {isGroupTitle ?? <div className="mr-3 mt-1 h-6 w-6 shrink-0 rounded-full bg-secondary lg:mr-6 lg:mt-0" />}
        {/* TODO optimize this  */}
        {isGroupTitle ? (
          <div className="pt-8 text-default font-semibold lg:pt-10 lg:text-md">{displayTitle}</div>
        ) : (
          <div className="pr-6 text-default lg:text-md">{displayTitle}</div>
        )}
        {isGroupTitle ?? (
          <div className={cx('ml-auto pt-2.5', { 'rotate-180': open })}>
            <ChevronDown className="hidden lg:flex" />
            <ChevronDownSmall className="flex lg:hidden" />
          </div>
        )}
      </div>

      {open && subDataExists && (
        <div className={cx(cardClassName, 'lg:pt-8')}>
          <OrgStructureAccordionCards items={cards} emails={extraPeople} namesToOmit={namesToOmit} />
        </div>
      )}
      {open && subSubDataExists && (
        <div className="flex flex-col gap-y-6 pt-10">
          {items.map((sub, index) => (
            <AdvancedAccordionSubSubitem
              key={index}
              title={sub.title}
              titleOverride={sub.titleOverride}
              extraPeople={sub.extraPeople}
              namesToOmit={sub.namesToOmit}
            />
          ))}
        </div>
      )}
    </div>
  )
}
