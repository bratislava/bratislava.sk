import React from 'react'
import {
  DisclosureGroup as AriaDisclosureGroup,
  DisclosureGroupProps as AriaDisclosureGroupProps,
} from 'react-aria-components'

import cn from '@/src/utils/cn'

export interface DisclosureGroupProps extends AriaDisclosureGroupProps {
  children: React.ReactNode
}

/*
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=16846-14458&t=bZNhZEkp3fhBtj7v-4
 */

export const DisclosureGroup = ({ children, ...props }: DisclosureGroupProps) => {
  return (
    <AriaDisclosureGroup
      className={cn('rounded-xl border border-grey-200 bg-white py-2', props.className)}
      {...props}
    >
      {children}
    </AriaDisclosureGroup>
  )
}
