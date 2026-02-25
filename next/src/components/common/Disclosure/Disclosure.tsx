import React from 'react'
import {
  Disclosure as AriaDisclosure,
  DisclosureProps as AriaDisclosureProps,
} from 'react-aria-components'

import cn from '@/src/utils/cn'

export interface DisclosureProps extends AriaDisclosureProps {
  children: React.ReactNode
}

/*
 *  Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=16846-14458&t=bZNhZEkp3fhBtj7v-4
 */

export const Disclosure = ({ children, ...props }: DisclosureProps) => {
  return (
    <AriaDisclosure {...props} className={cn(props.className)}>
      {children}
    </AriaDisclosure>
  )
}
