import React from 'react'
import {
  DisclosureGroup as RACDisclosureGroup,
  DisclosureGroupProps as RACDisclosureGroupProps,
} from 'react-aria-components'

interface DisclosureGroupProps extends RACDisclosureGroupProps {
  children: React.ReactNode
}

/*
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=16846-14458&t=bZNhZEkp3fhBtj7v-4
 */

const DisclosureGroup = ({ children, ...props }: DisclosureGroupProps) => {
  return (
    <RACDisclosureGroup className={props.className} {...props}>
      {children}
    </RACDisclosureGroup>
  )
}

export default DisclosureGroup
