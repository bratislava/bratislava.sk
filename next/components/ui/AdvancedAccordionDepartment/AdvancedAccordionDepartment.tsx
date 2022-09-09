/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { usersFromDepartmentFetcher } from '@utils/organisationalStructure'
import { useState } from 'react'
import useSWR from 'swr'

// import Phone from '../../../assets/images/phone-medium.svg'
// import { AccordionCardProps } from '../AccordionCard/AccordionCard'
import { AccordionCards } from '../AccordionCards/AccordionCards'
import {
  AdvancedAccordionSubitem,
  AdvancedAccordionSubitemProps,
} from '../AdvancedAccordionSubitem/AdvancedAccordionSubitem'

/* export interface AdvancedAccordionSubSubdepartment {
  title: string;
  departmentCards?: AccordionCardProps[];
  subdepartments?: AdvancedAccordionSubitemProps[];
}

export interface AdvancedAccordionSubdepartment {
  groupHeading?: string;
  departments: AdvancedAccordionSubSubdepartment[];
  //departmentCards?: AccordionCardProps[];
} */

export interface AdvancedAccordionDepartmentProps {
  title?: string
  // items?: { title: string; isGroupTitle?: boolean }[]
  items?: AdvancedAccordionSubitemProps[]
  // subdepartments?: AdvancedAccordionSubdepartment[];
  // subitems?: AdvancedAccordionSubitemProps[]
  // departmentCards?: AccordionCardProps[]
  // departmentPhone?: string
}

interface AccordionItemHeadingProps {
  title: string
}
const AccordionItemHeading = ({ title }: AccordionItemHeadingProps) => {
  return (
    <div className="flex items-center gap-x-3 pb-8 lg:gap-x-6 lg:px-5">
      <div className="h-6 w-6 rounded-full border-4 border-primary" />
      <div className="text-default lg:text-md">{title}</div>
    </div>
  )
}

export const AdvancedAccordionDepartment = ({
  title,
  items,
}: // subitems,
// departmentCards,
// departmentPhone,
AdvancedAccordionDepartmentProps) => {
  const [cards, setCards] = useState([])
  const { data } = useSWR(title, usersFromDepartmentFetcher)
  if (cards.length === 0 && data && data.length > 0) {
    setCards(data)
  }
  return (
    <div className="flex flex-col pt-1 pb-14 lg:pb-18">
      {title && <AccordionItemHeading title={title} />}
      {/*       {departmentPhone && (
        <div className="flex items-center pl-9 pb-5 lg:pb-8 lg:pl-16 gap-x-8">
          <Phone />
          <div className="font-semibold text-red-brick text-default">{departmentPhone}</div>
        </div>
      )} */}
      {cards.length > 0 && <AccordionCards items={cards} />}
      {/* {subitems?.map((subitem, subIndex) => ( */}
      <div /* key={subIndex} */ className="flex flex-col">
        {/*           {subitem.departmentCards && (
            <div className="pt-14">
              <AccordionCards items={subitem.departmentCards} />
            </div>
          )} */}
        {/* {subitem.groupHeading && (
            <div className="text-default lg:text-md pt-8 lg:pt-10 font-semibold">
              {subitem.groupHeading}
            </div>
          )} */}
        {items?.map((item, index) => (
          <AdvancedAccordionSubitem
            className="pt-8"
            key={index}
            /* title={item.title}
              departmentCards={department.departmentCards}
              subdepartments={department.subdepartments} */
            {...item}
          />
        ))}
      </div>
      {/* ))} */}
    </div>
  )
}
