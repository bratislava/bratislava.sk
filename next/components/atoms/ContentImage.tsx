import cx from 'classnames'
import * as React from 'react'

interface IProps {
  src: string
  alt?: string
  shadow?: boolean
}

const ContentImage = ({ src, alt, shadow }: IProps) => (
  <span
    className={cx('inline-block', {
      'overflow-hiddenbg-gray-300 rounded-lg shadow-md': shadow,
    })}
  >
    <img src={src} alt={alt} />
  </span>
)

export default ContentImage
