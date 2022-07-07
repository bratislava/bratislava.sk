import cx from 'classnames'
import React from 'react'

import ChevronDown from '../../../assets/images/chevron-down.svg'
import ChevronRight from '../../../assets/images/chevron-right.svg'
import { Button } from '../Button/Button'

export type TAccordionTab = { key: string; title: string | React.ReactNode }

export interface AccordionProps {
  className?: string
  tabs: TAccordionTab[]
  tabsVariant?: 'default' | 'custom'
  tabClassName?: string
  sectionClassName?: string
  contentClassName?: string
  activeSection?: string
  onSelect?: (tab: string) => void
  contents?: React.ReactNode[] | string[]
}

export const Accordion = ({
  className,
  tabs,
  tabsVariant = 'default',
  tabClassName,
  sectionClassName,
  contentClassName,
  activeSection,
  onSelect,
  contents,
}: AccordionProps) => {
  return (
    <div className={cx(className, 'w-full flex items-center flex-col')}>
      {tabs?.map((tab, i) => (
        <div key={i} className={cx(sectionClassName, 'flex flex-col w-full gap-5 items-center')}>
          {tabsVariant === 'default' ? (
            <Button
              className={cx(tabClassName, 'text-md py-2', {
                'text-font': !(tab.key === activeSection),
                'text-primary': tab.key === activeSection,
              })}
              icon={tab.key === activeSection ? <ChevronDown /> : <ChevronRight />}
              onClick={() => onSelect?.(tab.key)}
              shape="none"
            >
              {tab.title}
            </Button>
          ) : (
            tab.title
          )}
          <div className={cx(contentClassName, 'flex flex-col gap-y-3 w-full')}>
            {tab.key === activeSection && contents && <div>{contents[i]}</div>}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Accordion
