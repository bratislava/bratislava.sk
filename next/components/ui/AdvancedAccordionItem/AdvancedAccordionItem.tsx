import { usersFromDepartmentFetcher } from '@utils/organisationalStructure'
import cx from 'classnames'
import { useState } from 'react'
import useSWR from 'swr'

import ChevronDown from '../../../assets/images/chevron-down-thin.svg'
import ChevronDownSmall from '../../../assets/images/chevron-down-thin-small.svg'
import { AccordionCard } from '../AccordionCard/AccordionCard'
import {
  AdvancedAccordionDepartment,
  AdvancedAccordionDepartmentProps,
} from '../AdvancedAccordionDepartment/AdvancedAccordionDepartment'

export interface AdvancedAccordionItemProps {
  title?: string
  departments?: AdvancedAccordionDepartmentProps[]
}

export const AdvancedAccordionItem = ({ title, departments }: AdvancedAccordionItemProps) => {
  const [open, setOpen] = useState(false)
  const { data } = useSWR(title, usersFromDepartmentFetcher)

  const cardInfo = data && data[0]
  return (
    <div className="flex flex-col">
      <div className="flex cursor-pointer flex-col gap-y-8 pt-8" onClick={() => setOpen(!open)}>
        <div className="flex items-center lg:px-5">
          <div className="mr-6 h-6 w-6 shrink-0 rounded-full bg-primary lg:h-8 lg:w-8" />
          <div className="pr-6 text-default font-semibold lg:text-lg">{title}</div>
          <div className={cx('ml-auto', { 'rotate-180': open })}>
            <ChevronDown className="hidden lg:flex" />
            <ChevronDownSmall className="flex lg:hidden" />
          </div>
        </div>
        <div className="h-1 w-full rounded-sm border border-transparent bg-secondary" />
      </div>
      {open && (
        <div className="pt-8">
          <AccordionCard {...cardInfo} heading />
          {departments.map((department, index) => (
            <AdvancedAccordionDepartment {...department} key={index} />
          ))}
        </div>
      )}
    </div>
  )
}
