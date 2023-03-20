import { MenuItem } from '@bratislava/ui-bratislava/NavMenu/NavMenu'
import WelcomeCardIcon from '@bratislava/ui-bratislava/WelcomeCard/WelcomeCardIcon'
import React, { useRef } from 'react'
import { useHover } from 'usehooks-ts'

import MLink from '../../forms/simple-components/MLink'

export interface WelcomeCardProps {
  item: MenuItem
}

export const WelcomeCard = ({ item }: WelcomeCardProps) => {
  const hoverRef = useRef<HTMLDivElement>(null)
  const isHover = useHover(hoverRef)

  return (
    <div
      ref={hoverRef}
      className="text-20 group relative w-full h-full flex items-center gap-x-6 text-left md:px-2 md:py-1 lg:pb-2 lg:flex-col lg:gap-y-4 lg:text-center"
    >
      <div>
        {/* TODO color */}
        <WelcomeCardIcon isColored={isHover} color={item.hoverColor} icon={item.icon} />
      </div>
      <div className="text-p2-medium text-font/75 lg:whitespace-pre overflow-hidden">
        <MLink href={item.linkHref} className="after:inset-0 after:absolute group-hover:underline">
          {item.label}
        </MLink>
      </div>
    </div>
  )
}

export default WelcomeCard
