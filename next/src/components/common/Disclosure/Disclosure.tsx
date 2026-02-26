import React from 'react'
import {
  Disclosure as RACDisclosure,
  DisclosureProps as RACDisclosureProps,
} from 'react-aria-components'

interface DisclosureProps extends RACDisclosureProps {
  children: React.ReactNode
}

/*
 *  Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=16846-14458&t=bZNhZEkp3fhBtj7v-4
 */

const Disclosure = ({ children, ...props }: DisclosureProps) => {
  return (
    <RACDisclosure {...props} className={props.className}>
      {children}
    </RACDisclosure>
  )
}

export default Disclosure
