import { ArrowRight, ChevronRight } from '@assets/images'
import { MenuMainItem, Panel, Waves } from '@bratislava/ui-bratislava'
import { isItExternal } from '@bratislava/ui-bratislava/BAStickyMenu/external-link'
import { useUIContext } from '@utils/ui-context'
import { useClickOutsideHandler } from 'components/utils/ClickOutsideHandler/useClickOutsideHandler'
import React, { useEffect, useState } from 'react'

import { Icon } from '../../atoms/icon/Icon'

interface MenuPanelProps {
  item: MenuMainItem

  onClosePanel(): void
}

export const MenuPanel = ({ item, onClosePanel }: MenuPanelProps) => {
  const [moreLinkHoverIdx, setMoreLinkHoverIdx] = React.useState(-1)
  const [shouldClosePanel, setShouldClosePanel] = useState(false)

  const handlePanelClick = () => {
    setShouldClosePanel((state) => !state)
  }

  useEffect(() => {
    if (shouldClosePanel) {
      onClosePanel()
    }
  }, [shouldClosePanel])

  const { Link: UILink } = useUIContext()
  const { clickOutsideRef } = useClickOutsideHandler(handlePanelClick)

  if (shouldClosePanel) {
    return null
  }

  return (
    <div className="bg-gray-900/50 z-30 h-screen fixed top-[106px] inset-x-0 w-full transition delay-500 duration-300 ease-in-out text-left">
      <div className="cursor-default grid absolute top-0 inset-x-0 z-30 w-full pb-20 bg-transparent">
        <Panel style={{ backgroundColor: item.color }} className="px-6 py-10 rounded-none">
          <div
            className="m-auto grid w-full max-w-screen-1.5lg grid-cols-3 gap-10"
            ref={clickOutsideRef}
          >
            {/* SUB-ITEMS */}
            {item.subItems?.map((subItem, j) => {
              return (
                <div key={j}>
                  <button type="button" className="flex">
                    <UILink
                      href={isItExternal(subItem.url)}
                      className="text-p1 flex items-center text-left hover:underline"
                    >
                      <div className="flex shrink-0 grow-0 items-center justify-center">
                        <Icon iconName={subItem.icon} />
                      </div>
                      <div className="ml-4 flex-1 font-semibold">{subItem.title}</div>
                    </UILink>
                  </button>
                  <ul className="mt-8 space-y-3">
                    {subItem.subItems?.map((subSubItem, k) => (
                      <li key={k}>
                        <button type="button" className="flex">
                          <UILink
                            href={isItExternal(subSubItem.url)}
                            className="text-left hover:underline"
                          >
                            {subSubItem.title}
                          </UILink>
                        </button>
                      </li>
                    ))}
                    {subItem.url && subItem.subItems.length > 2 ? (
                      <li className="font-semibold">
                        <button
                          type="button"
                          onMouseEnter={() => setMoreLinkHoverIdx(j)}
                          onMouseLeave={() => setMoreLinkHoverIdx(-1)}
                          className="font-semibold"
                        >
                          <UILink href={isItExternal(subItem.url)}>
                            <div className="flex items-center gap-x-6">
                              <span className="py-0.5 underline">{subItem.moreLinkTitle}</span>
                              {moreLinkHoverIdx === j ? <ArrowRight /> : <ChevronRight />}
                            </div>
                          </UILink>
                        </button>
                      </li>
                    ) : null}
                  </ul>
                </div>
              )
            })}
          </div>
        </Panel>
        <Waves
          className="absolute bottom-0 z-40 overflow-hidden bg-transparent"
          wavePosition="bottom"
          backgroundColor="transparent"
          waveColor={item.color}
          isRich
        />
      </div>
    </div>
  )
}
