import { ArrowRight, ChevronRight } from '@assets/images'
import { isLinkExternal } from '@bratislava/ui-bratislava/HomepageMenu/external-link'
import { MenuSubItem } from '@bratislava/ui-bratislava/HomepageMenu/types'
import { useUIContext } from '@utils/ui-context'
import React, { FC, useState } from 'react'

interface Props {
  subItem: MenuSubItem
}

export const MenuPanelSubItem: FC<Props> = ({ subItem }) => {
  const { Link: UILink } = useUIContext()
  const [isLinkActive, setIsLinkActive] = useState(false)

  const handleMouseEnter = () => setIsLinkActive(true)
  const handleMouseLeave = () => setIsLinkActive(false)

  return (
    <li className="font-semibold">
      <button type="button" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="font-semibold">
        <UILink href={isLinkExternal(subItem.url)}>
          <div className="flex items-center gap-x-6" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <span className="py-0.5 underline">{subItem.moreLinkTitle}</span>
            {isLinkActive && <ArrowRight />}
            {!isLinkActive && <ChevronRight />}
          </div>
        </UILink>
      </button>
    </li>
  )
}
