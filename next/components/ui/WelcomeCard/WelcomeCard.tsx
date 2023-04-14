import WelcomeCardIcon from '@bratislava/ui-bratislava/WelcomeCard/WelcomeCardIcon'
import MLink from '@components/forms/simple-components/MLink'
import React, { useRef } from 'react'
import { useHover } from 'usehooks-ts'

import { MenuItem } from '../../organisms/NavBar/NavMenu/navMenuTypes'

export interface WelcomeCardProps {
  item: MenuItem
}

export const WelcomeCard = ({ item }: WelcomeCardProps) => {
  const hoverRef = useRef<HTMLDivElement>(null)
  const isHover = useHover(hoverRef)

  return (
    <div
      ref={hoverRef}
      className="text-20 group relative flex h-full w-full items-center gap-x-6 text-left md:px-2 md:py-1 lg:flex-col lg:gap-y-4 lg:pb-2 lg:text-center"
    >
      <WelcomeCardIcon isColored={isHover} icon={item.icon} />
      <div className="text-p2 overflow-hidden font-medium text-font/75 md:whitespace-pre-wrap">
        <MLink
          href={item.linkHref}
          className="underline after:absolute after:inset-0 group-hover:underline lg:no-underline"
        >
          {item.label}
        </MLink>
      </div>
    </div>
  )
}

export default WelcomeCard
