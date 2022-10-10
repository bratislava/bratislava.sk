import { FC } from 'react'
import cx from 'classnames'
import CloseIcon from '@assets/images/close.svg'

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

  // STYLES

  const classStyles = cx(
    "flex flex-row align-items-start min-w-14 min-h-6 px-2 gap-2.5 text-center",
    {
      'text-xl': size === 'large',
      'text-base': size === 'small' || !size,
      'py-0.5': size === 'large',
      'rounded-lg': size === 'large',
      'rounded': size === 'small' || !size,
      'text-primary': branded,
      'bg-secondary': branded,
      'text-universal-gray-700': !branded,
      'bg-universal-gray-100': !branded
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
    <div className={classStyles}>
      <p>{text}</p>
      { removable && <CloseIcon className={iconClassStyles} onClick={onRemove}/> }
    </div>
  )
}

export default Tag
