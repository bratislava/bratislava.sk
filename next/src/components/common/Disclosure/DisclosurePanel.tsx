import React from 'react'
import {
  DisclosurePanel as AriaDisclosurePanel,
  DisclosurePanelProps as AriaDisclosurePanelProps,
} from 'react-aria-components'

import cn from '@/src/utils/cn'

export interface DisclosurePanelProps extends AriaDisclosurePanelProps {
  children: React.ReactNode
}

/*
 *  Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=16846-14458&t=bZNhZEkp3fhBtj7v-4
 */

export const DisclosurePanel = ({ children, ...props }: DisclosurePanelProps) => {
  return (
    <AriaDisclosurePanel
      {...props}
      className={cn(
        'px-4 lg:px-6',
        // animation
        'h-(--disclosure-panel-height) overflow-clip motion-safe:transition-[height]',
        props.className,
      )}
    >
      <div className="pb-4">{children}</div>
    </AriaDisclosurePanel>
  )
}
