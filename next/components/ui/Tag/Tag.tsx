import cx from 'classnames'
import { useState } from 'react'

export interface TagProps {
  className?: string
  title?: string
  color?: string
  interactable?: boolean
  handleClick?: (arg0: string) => void
  alreadySelected?: boolean
}

export const Tag = ({
  className,
  title,
  color = 'transparent',
  interactable = false,
  handleClick,
  alreadySelected,
}: TagProps) => {
  const [isSelected, setSelected] = useState(alreadySelected)

  return (
    <div
      onClick={
        interactable
          ? () => {
              setSelected(!isSelected)
              handleClick(title)
            }
          : null
      }
      style={{
        backgroundColor: isSelected ? `rgb(var(--color-${  color  }--dark)` : `rgb(var(--color-${  color  }--light)`,
      }}
      className={cx('inline-block rounded-md px-3 py-1 text-center text-sm pt-1', className, {
        'cursor-pointer': interactable,
      })}
    >
      {title}
    </div>
  )
}

export default Tag
