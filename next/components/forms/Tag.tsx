import CloseIcon from '@assets/images/close.svg'
import cx from 'classnames'
import { FC, useState } from 'react'

interface TagProps {
  text: string
  removable?: boolean
  size?: string
  branded?: boolean
  onRemove?: () => void
}

const Tag: FC<TagProps> = (
  {
    text,
    removable,
    size,
    branded,
    onRemove
  }
) => {
  // STATE
  const [isHovered, setIsHovered] = useState<boolean>(false)

  // STYLES
  const classStyles = cx(
    "flex flex-row align-items-start min-w-14 min-h-6 px-2 gap-2.5 text-center",
    {
      /* FONTS in TAILWIND have different line height in compare to FIGMA */
      'text-xl': size === 'large',
      'text-base': size === 'small' || !size,
      'py-0.5': size === 'large',
      'rounded-lg': size === 'large',
      'rounded': size === 'small' || !size,
      'bg-universal-gray-100': removable || !branded,
      'text-universal-gray-700': (removable || !branded) && !isHovered,
      'text-universal-gray-600': removable && isHovered,
      'bg-secondary': !removable && branded,
      'text-tertiary': !removable && branded,
      'underline': !removable && isHovered
    }
  )


  const iconClassStyles = cx(
    "cursor-pointer self-center",
    {
      'text-xl': size === 'large',
      'text-base': size === 'small' || !size,
    }
  )

  // RENDER
  return (
    <div className={classStyles}
         onMouseOver={() => setIsHovered(true)}
         onFocus={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}>
      <p className="cursor-default select-none">{text}</p>
      { removable && <CloseIcon className={iconClassStyles} onClick={onRemove}/> }
    </div>
  )
}

export default Tag
