import { Children, Fragment, isValidElement, ReactNode } from 'react'
import {
  DisclosureGroup as RACDisclosureGroup,
  DisclosureGroupProps as RACDisclosureGroupProps,
} from 'react-aria-components'

import {
  disclosureStyles,
  DisclosureVariant,
} from '@/src/components/common/Disclosure/disclosureStyles'
import { DisclosureVariantContext } from '@/src/components/common/Disclosure/DisclosureVariantContext'
import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'
import cn from '@/src/utils/cn'

interface DisclosureGroupProps extends Omit<RACDisclosureGroupProps, 'className'> {
  children: ReactNode
  className?: string
  /** Variant is passed down to all Disclosure parts inside. */
  variant?: DisclosureVariant
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=16846-14458&t=bZNhZEkp3fhBtj7v-4
 */

const DisclosureGroup = ({
  children,
  variant = 'boxed',
  allowsMultipleExpanded = true,
  className,
  ...props
}: DisclosureGroupProps) => {
  const { box: boxStyles, divider: dividerStyles } = disclosureStyles[variant]

  const childrenWithDividers =
    dividerStyles === null
      ? children
      : Children.toArray(children).map((child, index) => (
          <Fragment key={isValidElement(child) ? child.key : index}>
            {index > 0 ? <HorizontalDivider className={dividerStyles} /> : null}
            {child}
          </Fragment>
        ))

  return (
    <DisclosureVariantContext.Provider value={variant}>
      <RACDisclosureGroup
        allowsMultipleExpanded={allowsMultipleExpanded}
        {...props}
        className={cn(boxStyles, className)}
      >
        {childrenWithDividers}
      </RACDisclosureGroup>
    </DisclosureVariantContext.Provider>
  )
}

export default DisclosureGroup
