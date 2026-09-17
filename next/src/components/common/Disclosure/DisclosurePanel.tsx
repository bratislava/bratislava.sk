import { ReactNode } from 'react'
import {
  DisclosurePanel as RACDisclosurePanel,
  DisclosurePanelProps as RACDisclosurePanelProps,
} from 'react-aria-components'

import { disclosureStyles } from '@/src/components/common/Disclosure/disclosureStyles'
import { useDisclosureVariant } from '@/src/components/common/Disclosure/DisclosureVariantContext'
import cn from '@/src/utils/cn'

interface DisclosurePanelProps extends Omit<RACDisclosurePanelProps, 'className'> {
  children: ReactNode
  className?: string
  /**
   * Classes for the inner content wrapper, which carries the vertical padding - pass `py-0` to
   * remove it, e.g. when the content brings its own spacing or has to touch the panel edges.
   */
  innerClassName?: string
}

/**
 *  Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=16846-14458&t=bZNhZEkp3fhBtj7v-4
 */

const DisclosurePanel = ({
  children,
  className,
  innerClassName,
  ...props
}: DisclosurePanelProps) => {
  const variant = useDisclosureVariant()

  return (
    <RACDisclosurePanel
      {...props}
      className={cn(
        // animation
        'h-(--disclosure-panel-height) overflow-clip motion-safe:transition-[height]',
        disclosureStyles[variant].panel,
        className,
      )}
    >
      <div className={cn(disclosureStyles[variant].panelInner, innerClassName)}>{children}</div>
    </RACDisclosurePanel>
  )
}

export default DisclosurePanel
