import React from 'react'
import {
  DisclosurePanel as RACDisclosurePanel,
  DisclosurePanelProps as RACDisclosurePanelProps,
} from 'react-aria-components'

import cn from '@/src/utils/cn'

interface DisclosurePanelProps extends RACDisclosurePanelProps {
  children: React.ReactNode
}

/*
 *  Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=16846-14458&t=bZNhZEkp3fhBtj7v-4
 */

const DisclosurePanel = ({ children, ...props }: DisclosurePanelProps) => {
  return (
    <RACDisclosurePanel
      {...props}
      className={cn(
        // animation
        'h-(--disclosure-panel-height) overflow-clip motion-safe:transition-[height]',
        props.className,
      )}
    >
      <div className="pb-4">{children}</div>
    </RACDisclosurePanel>
  )
}

export default DisclosurePanel
