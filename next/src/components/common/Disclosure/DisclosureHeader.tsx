import React, { useContext } from 'react'
import {
  DisclosureStateContext as RACDisclosureStateContext,
  Heading as RACHeading,
} from 'react-aria-components'

import { ChevronDownIcon } from '@/src/assets/icons'
import Button from '@/src/components/common/Button/Button'
import cn from '@/src/utils/cn'

interface DisclosureHeaderProps {
  children: React.ReactNode
  className?: string
}

/*
 *  Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=16846-14458&t=bZNhZEkp3fhBtj7v-4
 */

const DisclosureHeader = ({ children, ...props }: DisclosureHeaderProps) => {
  const { isExpanded } = useContext(RACDisclosureStateContext)!

  return (
    <RACHeading>
      <Button
        slot="trigger"
        variant="unstyled"
        className={cn('w-full p-4 text-left ring-inset lg:px-6', props.className)}
      >
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
    </RACHeading>
  )
}

export default DisclosureHeader
