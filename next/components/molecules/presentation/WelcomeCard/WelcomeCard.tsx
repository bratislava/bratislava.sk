import { Typography } from '@bratislava/component-library'
import React, { useRef } from 'react'
import { useHover } from 'usehooks-ts'

import MLink from '@/components/forms/simple-components/MLink'
import WelcomeCardIcon from '@/components/molecules/presentation/WelcomeCard/WelcomeCardIcon'
import { MenuItem } from '@/components/organisms/NavBar/NavMenu/navMenuTypes'

export type WelcomeCardProps = {
  item: MenuItem
}

const WelcomeCard = ({ item }: WelcomeCardProps) => {
  const hoverRef = useRef<HTMLDivElement>(null)
  const isHover = useHover(hoverRef)

  return (
    <div
      ref={hoverRef}
      className="text-large group relative flex h-full w-full items-center gap-x-6 text-left md:px-2 md:py-1 lg:flex-col lg:gap-y-4 lg:pb-2 lg:text-center"
    >
      <WelcomeCardIcon isColored={isHover} icon={item.icon} />
      <div className="text-default overflow-hidden font-medium text-font/75 md:whitespace-pre-wrap">
        <MLink
          href={item.linkHref}
          className="underline after:absolute after:inset-0 group-hover:underline lg:no-underline"
        >
          <Typography type="p" fontWeight="medium">
            {item.label}
          </Typography>
        </MLink>
      </div>
    </div>
  )
}

export default WelcomeCard
