// @ts-strict-ignore
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { ArrowRight, ChevronDownSmall, ChevronRight } from '@assets/images'
import StickyMenuTopper from '@assets/images/sticky-menu-topper.svg'
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import cx from 'classnames'
import React, { useCallback, useRef, useState } from 'react'
import { useDebounce, useOutsideClick } from 'rooks'

import { Icon } from '../../atoms/icon/Icon'
import { MenuMainItem, Panel, Waves } from '../index'
import { isItExternal } from './external-link'

interface IProps {
  className?: string
  menuItems: MenuMainItem[]
  active?: string
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
  panelHidden: boolean
  setPanelHidden: (value: boolean) => void
  disableHover: boolean
  setDisableHover: (value: boolean) => void
}

const MenuPanel = ({ item, panelHidden, setPanelHidden, disableHover, setDisableHover }: MenuPanelProps) => {
  const [moreLinkHoverIdx, setMoreLinkHoverIdx] = React.useState(-1)
  const { Link: UILink } = useUIContext()
  const ref = useRef()

  useOutsideClick(ref, () => {
    setPanelHidden(true)
    setDisableHover(true)
  })

  return (
    <div
      className={cx(
        'cursor-default h-screen hidden opacity-0 pointer-events-none group-hover:pointer-events-auto fixed top-[106px] left-0 right-0 bottom-0 z-30 w-full bg-blackTransparent transition delay-500 duration-300 ease-in-out',
        { hidden: panelHidden && disableHover },
        { 'opacity-100': panelHidden === false },
        { 'group-hover:flex': disableHover === false }
      )}
    >
      <div
        className={cx(
          'cursor-default grid absolute top-0 left-0 right-0 z-30 w-full pb-20 bg-transparent opacity-0 group-hover:opacity-100'
        )}
        ref={ref}
      >
        <Panel style={{ backgroundColor: item.color }} className={cx('px-6 pt-10 pb-10 rounded-none')}>
          <div className="m-auto grid w-full max-w-screen-1.5lg grid-cols-3 gap-10">
            {/* SUB-ITEMS */}
            {item.subItems?.map((subItem, j) => {
              return (
                <div key={j}>
                  <button type="button" className="flex" onClick={() => setPanelHidden(true)}>
                    <UILink
                      href={isItExternal(subItem.url)}
                      className="flex items-center text-left text-[20px] hover:underline"
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
                        <button type="button" className="flex" onClick={() => setPanelHidden(true)}>
                          <UILink href={isItExternal(subSubItem.url)} className="text-left hover:underline">
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

export const BAStickyMenu = ({ className, menuItems, active }: IProps) => {
  // TODO this whole logic is a tangled mess - it's fix to work to a degree, but needs refactor
  // TODO consider state machine for this
  const [panelHidden, setPanelHidden] = useState(false)
  const [disableHover, setDisableHover] = useState(false)

  const debouncedHandleMouseEnter = useDebounce(() => {
    setDisableHover(false)
    setPanelHidden(false)
  }, 500)

  const handleMenuCellClick = useCallback(() => {
    if (panelHidden) {
      setPanelHidden(false)
      setDisableHover(false)
    } else {
      setPanelHidden(true)
      setDisableHover(false)
    }
  }, [panelHidden])

  const handleOnMouseLeave = () => {
    setDisableHover(true)
    debouncedHandleMouseEnter.cancel()
  }

  return (
    <div
      className={cx('flex max-w-screen-1.5lg m-auto w-full justify-between', className)}
      onMouseEnter={debouncedHandleMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    >
      {menuItems.map((item, i) => (
        <div key={i} className="group flex-1 cursor-pointer">
          <MenuCell item={item} isActive={item.id === active} handleClick={handleMenuCellClick} />
          <MenuPanel
            item={item}
            panelHidden={panelHidden}
            setPanelHidden={setPanelHidden}
            disableHover={disableHover}
            setDisableHover={setDisableHover}
          />
        </div>
      ))}
    </div>
  )
}

export default BAStickyMenu
