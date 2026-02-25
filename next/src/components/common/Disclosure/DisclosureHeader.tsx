import React, { useContext } from 'react'
import { Button, DisclosureStateContext } from 'react-aria-components'

import { ChevronDownIcon } from '@/src/assets/icons'
import cn from '@/src/utils/cn'

export interface DisclosureHeaderProps {
  children: React.ReactNode
  className?: string
}

/*
 *  Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=16846-14458&t=bZNhZEkp3fhBtj7v-4
 */

export const DisclosureHeader = ({ children, ...props }: DisclosureHeaderProps) => {
  const { isExpanded } = useContext(DisclosureStateContext)!

  return (
    <Button slot="trigger" className={cn('w-full justify-start p-4 lg:px-6', props.className)}>
      <div className="flex w-full justify-between">
        <div className="flex flex-col gap-2">{children}</div>
        <ChevronDownIcon
          aria-hidden
          className={cn('shrink-0 self-center transition-transform duration-200 ease-in-out', {
            'rotate-180 transform': isExpanded,
          })}
        />
      </div>
    </Button>
  )
}
