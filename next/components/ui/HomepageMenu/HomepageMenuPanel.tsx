import { ArrowRight } from '@assets/images'
import ChevronRight from '@assets/images/chevron-right.svg'
import CloseFilled from '@assets/images/close-filled.svg'
import { MenuMainItem, Panel } from '@bratislava/ui-bratislava'
import { useUIContext } from '@utils/ui-context'
import cx from 'classnames'
import { useEffect, useState } from 'react'

import { Icon } from '../../atoms/icon/Icon'
import { useClickOutsideHandler } from '../../utils/ClickOutsideHandler/useClickOutsideHandler'

interface Props {
  index: number
  item: MenuMainItem
  isActive: boolean

  onClosePanel(): void
}

export const HomepageMenuPanel = ({ item, index, isActive, onClosePanel }: Props) => {
  const { Link: UILink } = useUIContext()
  const [moreLinkHoverIdx, setMoreLinkHoverIdx] = useState(-1)
  const [shouldClosePanel, setShouldClosePanel] = useState(false)

  const handlePanelClick = () => {
    setShouldClosePanel((state) => !state)
  }

  useEffect(() => {
    if (shouldClosePanel) {
      onClosePanel()
    }
  }, [shouldClosePanel])

  const { clickOutsideRef } = useClickOutsideHandler(handlePanelClick)

  if (shouldClosePanel) {
    return null
  }

  return (
    <Panel
      overflowVisible
      data-hover-id={index}
      style={{ backgroundColor: item.color }}
      className={cx('absolute left-0 right-0 z-20 w-full px-6 py-10 grid-cols-3 gap-10', {
        grid: isActive,
        hidden: !isActive,
        'rounded-tl-none': index === 0,
        'rounded-tr-none': index === 5,
        'md:rounded-tl-none lg:rounded-tl-lg': index === 3,
        'md:rounded-tr-none lg:rounded-tr-lg': index === 2,
      })}
    >
      {/* SUB-ITEMS */}
      {item.subItems?.map((subItem, j) => {
        return (
          <div key={j} ref={clickOutsideRef}>
            <div className="text-20 flex items-center">
              <div className="flex shrink-0 grow-0 items-center justify-center">
                <Icon iconName={subItem.icon} />
              </div>
              <UILink href={subItem.url} className="text-20 flex items-center hover:underline">
                <div className="ml-4 flex-1 cursor-pointer font-semibold">{subItem.title}</div>
              </UILink>
            </div>
            <ul className="mt-8 space-y-3">
              {subItem.subItems?.map((subSubItem, k) => (
                <li key={k}>
                  <UILink href={subSubItem.url} className="hover:underline">
                    {subSubItem.title}
                  </UILink>
                </li>
              ))}
              {subItem.url && subItem.subItems.length > 2 ? (
                <li
                  onMouseEnter={() => setMoreLinkHoverIdx(j)}
                  onMouseLeave={() => setMoreLinkHoverIdx(-1)}
                  className="font-semibold"
                >
                  <UILink href={subItem.url}>
                    <div className="flex items-center gap-x-6">
                      <span className="py-0.5 underline">{subItem.moreLinkTitle}</span>
                      {moreLinkHoverIdx === j ? <ArrowRight /> : <ChevronRight />}
                    </div>
                  </UILink>
                </li>
              ) : null}
            </ul>
          </div>
        )
      })}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 cursor-pointer">
        <CloseFilled onClick={() => setShouldClosePanel(true)} style={{ color: item.colorDark }} />
      </div>
    </Panel>
  )
}
