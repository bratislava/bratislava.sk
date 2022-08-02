import { usersFromDepartmentFetcher } from '@utils/organisationalStructure'
import cx from 'classnames'
import { useState } from 'react'
import useSWR from 'swr'

import ChevronDown from '../../../assets/images/chevron-down-thin.svg'
import ChevronDownSmall from '../../../assets/images/chevron-down-thin-small.svg'

export interface AdvancedAccordionSubSubitemProps {
  title?: string
  titleOverride?: string
  extraPeople?: { email: string }[]
  className?: string
  cardClassName?: string
}

export const AdvancedAccordionSubSubitem = ({
  title,
  titleOverride,
  extraPeople,
  className,
  cardClassName,
}: AdvancedAccordionSubSubitemProps) => {
  const [open, setOpen] = useState(false)
  const [cards, setCards] = useState([])
  // TODO don't ignore error
  const { data } = useSWR(['usersFromDepartment', title], () => usersFromDepartmentFetcher(title))
  if (cards.length === 0 && data && data.length > 0) {
    setCards(data)
  }
  const displayTitle = titleOverride || title
  return (
    <div className="flex flex-col">
      <div
        className={cx(className, 'flex items-start lg:items-center cursor-pointer lg:px-5 ml-12')}
        onClick={() => setOpen(!open)}
      >
        <div className="pr-6 text-default lg:text-md">{displayTitle}</div>
        <div className={cx('ml-auto pt-2.5', { 'rotate-180': open })}>
          <ChevronDown className="hidden lg:flex" />
          <ChevronDownSmall className="flex lg:hidden" />
        </div>
      </div>

      {/* {open && cards && cards.length > 0 && (
        <div className={cx(cardClassName, 'lg:pt-8')}>
          <OrgStructureAccordionCards items={cards} emails={extraPeople} />
        </div>
      )} */}
    </div>
  )
}
