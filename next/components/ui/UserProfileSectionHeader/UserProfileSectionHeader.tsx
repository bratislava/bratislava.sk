import cx from 'classnames'
import React from 'react'

interface UserProfileSectionHeaderProps {
  title: string
  text: string
  button?: React.ReactNode
}

const UserProfileSectionHeader = ({ title, text, button }: UserProfileSectionHeaderProps) => {
  return (
    <div className={cx('border-b-2 border-gray-200 p-4', 'xs:px-8 xs:py-6')}>
      <h5 className={cx('text-h5-bold', 'xs:text-h4-bold')}>{title}</h5>
      <p className="text-p2-normal">{text}</p>
    </div>
  )
}

export default UserProfileSectionHeader
