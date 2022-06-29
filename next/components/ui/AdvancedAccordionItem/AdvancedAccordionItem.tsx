import { useState } from 'react'
import ChevronDown from '../../../assets/images/chevron-down-thin.svg'
import ChevronDownSmall from '../../../assets/images/chevron-down-thin-small.svg'
import cx from 'classnames'
import {
  AdvancedAccordionDepartment,
  AdvancedAccordionDepartmentProps,
} from '../AdvancedAccordionDepartment/AdvancedAccordionDepartment'
import useSWR from 'swr'
import { usersFromDepartmentFetcher } from '@utils/ms-graph'
import { AccordionCard } from '../AccordionCard/AccordionCard'

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
      <div className="flex flex-col gap-y-8 cursor-pointer pt-8" onClick={() => setOpen(!open)}>
        <div className="flex items-center lg:px-5">
          <div className="bg-primary h-6 w-6 lg:h-8 lg:w-8 rounded-full mr-6 shrink-0" />
          <div className="text-default lg:text-lg font-semibold pr-6">{title}</div>
          <div className={cx('ml-auto', { 'rotate-180': open })}>
            <ChevronDown className="hidden lg:flex" />
            <ChevronDownSmall className="flex lg:hidden" />
          </div>
        </div>
        <div className="w-full h-1 bg-secondary rounded-sm border border-transparent" />
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
