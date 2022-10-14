import { MenuSubItem } from '@bratislava/ui-bratislava'
import { isItExternal } from '@bratislava/ui-bratislava/HomepageMenu/external-link'
import { shouldRenderLink } from '@bratislava/ui-bratislava/HomepageMenu/Panel/MenuPanelItemService'
import { MenuPanelSubItem } from '@bratislava/ui-bratislava/HomepageMenu/Panel/MenuPanelSubItem'
import { useUIContext } from '@utils/ui-context'
import React, { FC } from 'react'

import { Icon } from '../../../atoms/icon/Icon'

interface Props {
  subItems?: MenuSubItem[]
}

export const MenuPanelItems: FC<Props> = ({ subItems }) => {
  const { Link: UILink } = useUIContext()

  if (!subItems) {
    return null
  }

  return (
    <>
      {subItems?.map((subItem, j) => {
        return (
          <div key={j} className="mb-4">
            <button type="button" className="flex" onClick={() => {}}>
              <UILink
                href={isItExternal(subItem.url)}
                className="flex items-center text-left text-[20px] hover:underline"
              >
                <div className="flex shrink-0 grow-0 items-center justify-center">
                  <Icon iconName={subItem.icon} />
                </div>
                <div className="font-semibold">{subItem.title}</div>
              </UILink>
            </button>
            <ul className="text mt-6 space-y-2 text-left">
              {subItem.subItems?.map((subSubItem, k) => (
                <li key={k}>
                  <button className="flex" onClick={() => {}}>
                    <UILink href={isItExternal(subSubItem.url)} className="text-left hover:underline">
                      {subSubItem.title}
                    </UILink>
                  </button>
                </li>
              ))}
              {shouldRenderLink(subItem) && <MenuPanelSubItem subItem={subItem} />}
            </ul>
          </div>
        )
      })}
    </>
  )
}
