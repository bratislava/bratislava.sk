import { FC } from 'react'
import cx from 'classnames'

interface TagProps {
  text: string
  colorVariant?: string
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
  const styles = cx(

  )

  return (
    <div className={styles}>
      {text}
    </div>
  )
}

export default Tag
