import cx from 'classnames'
import React from 'react'

import ChevronDown from '@assets/images/chevron-down.svg'
import ChevronRight from '@assets/images/chevron-right.svg'
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
    <div className={cx(className, 'flex w-full flex-col items-center')}>
      {tabs?.map((tab, i) => (
        <div key={i} className={cx(sectionClassName, 'flex w-full flex-col items-center gap-5')}>
          {tabsVariant === 'default' ? (
            <Button
              className={cx(tabClassName, 'text-h4-normal py-2', {
                'text-font': !(tab.key === activeSection),
                'text-category-600': tab.key === activeSection,
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
          <div className={cx(contentClassName, 'flex w-full flex-col gap-y-3')}>
            {tab.key === activeSection && contents && <div>{contents[i]}</div>}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Accordion
