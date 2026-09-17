import { ReactNode, useContext } from 'react'
import {
  Disclosure as RACDisclosure,
  DisclosureProps as RACDisclosureProps,
} from 'react-aria-components'

import {
  disclosureStyles,
  DisclosureVariant,
} from '@/src/components/common/Disclosure/disclosureStyles'
import { DisclosureVariantContext } from '@/src/components/common/Disclosure/DisclosureVariantContext'
import cn from '@/src/utils/cn'

interface DisclosureProps extends Omit<RACDisclosureProps, 'className'> {
  children: ReactNode
  className?: string
  /**
   * Inherited from DisclosureGroup if not provided. Defaults to `boxed` for a
   * standalone Disclosure.
   */
  variant?: DisclosureVariant
}

/**
 *  Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=16846-14458&t=bZNhZEkp3fhBtj7v-4
 */

const Disclosure = ({ children, variant, className, ...props }: DisclosureProps) => {
  const groupVariant = useContext(DisclosureVariantContext)
  const resolvedVariant = variant ?? groupVariant ?? 'boxed'

  // Inside a DisclosureGroup, the box is rendered by the group
  const isStandalone = groupVariant === null

  return (
    <DisclosureVariantContext.Provider value={resolvedVariant}>
      <RACDisclosure
        {...props}
        className={cn(isStandalone && disclosureStyles[resolvedVariant].box, className)}
      >
        {children}
      </RACDisclosure>
    </DisclosureVariantContext.Provider>
  )
}

export default Disclosure
