// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @next/next/no-img-element */
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
      'rounded-lg overflow-hiddenbg-gray-universal-200 shadow-md': shadow,
    })}
  >
    <img src={src} alt={alt} />
  </span>
)

export default ContentImage
