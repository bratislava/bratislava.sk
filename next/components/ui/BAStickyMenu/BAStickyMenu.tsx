import { useUIContext } from '@bratislava/common-frontend-ui-context'
import cx from 'classnames'
import React from 'react'
import { getIcon, MenuMainItem, Panel, Waves } from '../index'
import { ArrowRight, ChevronDown, ChevronRight, ChevronDownSmall } from '../../../assets/images'
import StickyMenuTopper from '../../../assets/images/sticky-menu-topper.svg'
import { isItExternal } from './external-link'

interface IProps {
  className?: string
  menuItems: MenuMainItem[]
  active?: string
}

export const BAStickyMenu = ({ className, menuItems, active }: IProps) => (
  <div className={cx('flex max-w-screen-1.5lg m-auto w-full justify-between', className)}>
    {menuItems.map((item, i) => (
      <div key={i} className="group cursor-pointer flex-1">
        <MenuCell item={item} isActive={item.id === active} />
        <MenuPanel item={item} isFirst={i === 0} isLast={i === menuItems.length - 1} />
      </div>
    ))}
  </div>
)

interface MenuCellProps {
  item: MenuMainItem
  isActive: boolean
}

const MenuCell = ({ item, isActive }: MenuCellProps) => (
  <div className="flex flex-col items-center w-40 h-[106px]">
    <StickyMenuTopper
      style={{ color: item.colorDark }}
      className={cx('absolute top-0 transition opacity-0 group-hover:opacity-100 w-30', {
        'opacity-100': isActive,
      })}
    />
    <p
      className={cx('font-medium text-base mt-5 transition group-hover:font-bold text-center whitespace-pre', {
        'font-bold': isActive,
      })}
    >
      {item.title}
    </p>
    <ChevronDownSmall
      className={cx('mt-3 group-hover:hidden', {
        hidden: isActive,
      })}
    />
    <ChevronDownSmall
      style={{ color: item.colorDark }}
      className={cx('mt-3 group-hover:block', {
        hidden: !isActive,
        block: isActive,
      })}
    />
  </div>
)

interface MenuPanelProps {
  item: MenuMainItem
  isFirst?: boolean
  isLast?: boolean
}

const MenuPanel = ({ item, isFirst, isLast }: MenuPanelProps) => {
  const [panelHidden, setPanelHidden] = React.useState(false)
  const [moreLinkHoverIdx, setMoreLinkHoverIdx] = React.useState(-1)
  const { Link: UILink } = useUIContext()

  React.useEffect(() => {
    if (panelHidden) setPanelHidden(false)
  }, [panelHidden])

  return (
    <div
      className={cx(
        'cursor-default h-screen opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto fixed top-[106px] left-0 right-0 bottom-0 z-30 w-full bg-blackTransparent',
        { hidden: panelHidden }
      )}
    >
      <div className={cx('cursor-default grid absolute top-0 left-0 right-0 z-30 w-full pb-20 bg-transparent')}>
        <Panel style={{ backgroundColor: item.color }} className={cx('px-6 pt-10 pb-10 rounded-none')}>
          <div className="max-w-screen-1.5lg w-full m-auto grid grid-cols-3 gap-10">
            {/* SUB-ITEMS */}
            {item.subItems?.map((subItem, j) => {
              const IconComponent = getIcon(subItem.icon)
              return (
                <div key={j}>
                  <button className="flex" onClick={() => setPanelHidden(true)}>
                    <UILink
                      href={isItExternal(subItem.url)}
                      className="flex items-center text-[20px] text-left hover:underline"
                    >
                      <div className="flex-grow-0 flex-shrink-0 flex items-center justify-center">
                        <IconComponent className="w-10 h-10" />
                      </div>
                      <div className="flex-1 ml-4 font-semibold">{subItem.title}</div>
                    </UILink>
                  </button>
                  <ul className="mt-8 space-y-3">
                    {subItem.subItems?.map((subSubItem, k) => (
                      <li key={k}>
                        <button className="flex" onClick={() => setPanelHidden(true)}>
                          <UILink href={isItExternal(subSubItem.url)} className="hover:underline text-left">
                            {subSubItem.title}
                          </UILink>
                        </button>
                      </li>
                    ))}
                    {subItem.url && subItem.subItems.length > 2 ? (
                      <li className="font-semibold">
                        <button
                          onMouseEnter={() => setMoreLinkHoverIdx(j)}
                          onMouseLeave={() => setMoreLinkHoverIdx(-1)}
                          onClick={() => setPanelHidden(true)}
                          className="font-semibold"
                        >
                          <UILink href={isItExternal(subItem.url)}>
                            <div className="flex gap-x-6 items-center">
                              <span className="underline py-0.5">{subItem.moreLinkTitle}</span>
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
          className="z-30 bg-transparent overflow-hidden absolute bottom-0"
          wavePosition="bottom"
          backgroundColor={'transparent'}
          waveColor={item.color}
          isRich
        />
      </div>
    </div>
  )
}

export default BAStickyMenu
