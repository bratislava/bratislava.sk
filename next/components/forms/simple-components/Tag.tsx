import CloseIcon from '@assets/images/close.svg'
import cx from 'classnames'
import { FC, useState } from 'react'

interface TagProps {
  text: string
  removable?: boolean
  size?: 'large' | 'small'
  branded?: boolean
  selectHashCode?: string
  onRemove?: () => void
}

const Tag: FC<TagProps> = (
  {
    text,
    removable,
    size,
    branded,
    selectHashCode,
    onRemove
  }
) => {
  // STATE
  const [isHovered, setIsHovered] = useState<boolean>(false)

  // STYLES
  const classStyles = cx(
    "tag align-items-start min-w-14 inline-block min-h-6 px-2 gap-2.5 text-center",
    {
      'text-20': size === 'large',
      'text-p3': size === 'small' || !size,
      'py-0.5': size === 'large',
      'rounded-lg': size === 'large',
      'rounded': size === 'small' || !size,
      'bg-gray-100': removable || !branded,
      'text-gray-700': (removable || !branded) && !isHovered,
      'text-gray-600': removable && isHovered,
      'bg-category-200': !removable && branded,
      'text-category-800': !removable && branded,
      'underline': !removable && isHovered
    },
    selectHashCode
  )

  const iconClassStyles = cx(
    "tag cursor-pointer self-center inline-block mx-1",
    {
      'text-20 w-3 h-3': size === 'large',
      'text-p3 w-2.5 h-2.5': size === 'small' || !size,
    },
    selectHashCode
  )

  // RENDER
  /* class name tag is crucial for good working of select dropdown */
  return (
    <div className={classStyles}
         onMouseOver={() => setIsHovered(true)}
         onFocus={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}>
      <p className={`${selectHashCode} tag cursor-default select-none inline-block`}>{text}</p>
      { removable && <CloseIcon className={iconClassStyles} onClick={onRemove}/> }
    </div>
  )
}

export default Tag
