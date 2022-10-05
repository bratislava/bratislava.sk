import { FC } from 'react'
import cx from 'classnames'

interface TagProps {
  text: string
  colorVariant?: 'black' | 'red' | 'blue' | 'green' | 'purple' | 'yellow' | 'orange'
  removable?: boolean
  size?: string
  disabled?: boolean
  underlined?: boolean
}

const Tag: FC<TagProps> = (
  {
    text,
    colorVariant,
    removable,
    size,
    disabled,
    underlined
  }
) => {

  // STYLES
  const styles = cx(
    'rounded min-w-14 min-h-6 text-center p-1',
    {
      'bg-gray-200' : colorVariant === 'black'
    }
  )

  // RENDER
  return (
    <div className={styles}>
      {text}
    </div>
  )
}

export default Tag
