import { useUIContext } from '@bratislava/common-frontend-ui-context'
import cx from 'classnames'
import React, { useEffect, useState } from 'react'
import { useRef } from 'react'

import { ArrowRight, ChevronDownSmall, ChevronRight } from '@assets/images'
import StickyMenuTopper from '@assets/images/sticky-menu-topper.svg'
import { getIcon, MenuMainItem, Panel, Waves } from '../index'
import { isItExternal } from './external-link'
import { useOutsideClick } from 'rooks'
import { debounce } from 'lodash'

interface IProps {
  className?: string
  menuItems: MenuMainItem[]
  active?: string
}

export const BAStickyMenu = ({ className, menuItems, active }: IProps) => {
  const [panelHidden, setPanelHidden] = useState(true)
  const [disableHover, setDisableHover] = useState(false)

  const debouncedHandleMouseEnter = debounce(() => setDisableHover(false), 500)

  useEffect(() => {
    if (panelHidden) setPanelHidden(false)
  }, [panelHidden])

  const handleMenuCellClick = () => {
    setTimeout(() => {
      setPanelHidden(!panelHidden)
      setDisableHover(!disableHover)
    }, 500)
  }

  const handlOnMouseLeave = () => {
    setDisableHover(true)
    debouncedHandleMouseEnter.cancel()
  }

  return (
    <div
      className={cx('flex max-w-screen-1.5lg m-auto w-full justify-between', className)}
      onMouseEnter={debouncedHandleMouseEnter}
      onMouseLeave={handlOnMouseLeave}
    >
      {menuItems.map((item, i) => (
        <div key={i} className="group flex-1 cursor-pointer transition delay-500 duration-300 ease-in-out">
          <MenuCell item={item} isActive={item.id === active} handleClick={handleMenuCellClick} />
            <MenuPanel
            item={item}
            panelHidden={panelHidden} 
            setDisableHover={setDisableHover}
            setPanelHidden={setPanelHidden}
            disableHover={disableHover}
          />       
        </div>
      ))}
    </div>
  )
}

interface MenuCellProps {
  item: MenuMainItem
  isActive: boolean
  handleClick: () => void
}

const MenuCell = ({ item, isActive, handleClick }: MenuCellProps) => (
  <div className="flex h-[106px] w-40 flex-col items-center " onClick={handleClick}>
    <StickyMenuTopper
      style={{ color: item.colorDark }}
      className={cx(
        'absolute top-0 transition opacity-0 group-hover:opacity-100 w-30 transition delay-500 duration-300 ease-in-out',
        {
          'opacity-100': isActive,
        }
      )}
    />
    <p
      className={cx(
        'font-medium text-base mt-5 transition group-hover:font-bold text-center whitespace-pre transition delay-500 duration-300 ease-in-out',
        {
          'font-bold': isActive,
        }
      )}
    >
      {item.title}
    </p>
    <ChevronDownSmall
      className={cx('mt-3 group-hover:hidden transition delay-500 duration-300 ease-in-out', {
        hidden: isActive,
      })}
    />
    <ChevronDownSmall
      style={{ color: item.colorDark }}
      className={cx('mt-3 group-hover:block transition delay-500 duration-300 ease-in-out', {
        hidden: !isActive,
        block: isActive,
      })}
    />
  </div>
)

interface MenuPanelProps {
  item: MenuMainItem
  panelHidden: boolean
  setDisableHover: (value: boolean) => void
  setPanelHidden: (value: boolean) => void
  disableHover: boolean
}

const MenuPanel = ({ item, panelHidden, setPanelHidden, setDisableHover, disableHover }: MenuPanelProps) => {
  const [moreLinkHoverIdx, setMoreLinkHoverIdx] = React.useState(-1)
  const { Link: UILink } = useUIContext()
  const ref = useRef()
  const closeMenu = () => {
    setPanelHidden(true)
    setDisableHover(!disableHover)
  }
  useOutsideClick(ref, () => {
    setPanelHidden(true)
    setDisableHover(!disableHover)
  });

  return (
    <div
      className={cx(
        'cursor-default h-screen hidden opacity-0 pointer-events-none group-hover:pointer-events-auto fixed top-[106px] left-0 right-0 bottom-0 z-30 w-full bg-blackTransparent transition delay-500 duration-300 ease-in-out',
        // { hidden: panelHidden },
        { 'opacity-100': panelHidden === false },
        { 'group-hover:flex': disableHover === false }
      )}
    >
      <div
        className={cx(
          'cursor-default grid absolute top-0 left-0 right-0 z-30 w-full pb-20 bg-transparent opacity-0 group-hover:opacity-100 transition delay-500 duration-300 ease-in-out'
        )}
        ref={ref}
      >
        <Panel style={{ backgroundColor: item.color }} className={cx('px-6 pt-10 pb-10 rounded-none')}>
          <div className="m-auto grid w-full max-w-screen-1.5lg grid-cols-3 gap-10">
            {/* SUB-ITEMS */}
            {item.subItems?.map((subItem, j) => {
              const IconComponent = getIcon(subItem.icon)
              return (
                <div key={j}>
                  <button className="flex" onClick={() => setPanelHidden(true)}>
                    <UILink
                      href={isItExternal(subItem.url)}
                      className="flex items-center text-left text-[20px] hover:underline"
                    >
                      <div className="flex shrink-0 grow-0 items-center justify-center">
                        <IconComponent className="h-10 w-10" />
                      </div>
                      <div className="ml-4 flex-1 font-semibold">{subItem.title}</div>
                    </UILink>
                  </button>
                  <ul className="mt-8 space-y-3">
                    {subItem.subItems?.map((subSubItem, k) => (
                      <li key={k}>
                        <button className="flex" onClick={() => setPanelHidden(true)}>
                          <UILink href={isItExternal(subSubItem.url)} className="text-left hover:underline">
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
          className="absolute bottom-0 z-30 overflow-hidden bg-transparent"
          wavePosition="bottom"
          backgroundColor="transparent"
          waveColor={item.color}
          isRich
        />
      </div> 
    </div>
  )
}

export default BAStickyMenu
