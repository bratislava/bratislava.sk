import { MenuMainItem } from '@bratislava/ui-bratislava'
import cx from 'classnames'
import { FC, ReactNode } from 'react'

interface Props {
  isPanelVisible: boolean
  item: MenuMainItem
  buttons: ReactNode
  onMouseEnter?(itemId: string): void
  onMouseLeave?(): void
  onClick(itemId: string): void
  children: ReactNode
  className?: string
}

export const MenuItem: FC<Props> = ({
  item,
  children,
  isPanelVisible,
  onMouseLeave,
  onMouseEnter,
  onClick,
  buttons,
  className,
}) => {
  const highlightColor = isPanelVisible ? item.color : undefined

  return (
    <button
      style={{ backgroundColor: highlightColor }}
      type="button"
      className={cx('flex w-full flex-row items-center rounded-t-md lg:flex-col', className)}
      onClick={() => onClick(item.id)}
      onMouseLeave={onMouseLeave}
      onMouseEnter={() => onMouseEnter?.(item.id)}
    >
      {buttons}
      {isPanelVisible && <div className="mt-[70px] lg:mt-[10px]">{children}</div>}
    </button>
  )
}
