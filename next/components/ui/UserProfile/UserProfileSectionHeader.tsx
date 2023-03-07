import cx from 'classnames'
import React from 'react'

interface UserProfileSectionHeaderProps {
  title: string
  text: string
  underline?: boolean
  isMobileColumn?: boolean
  isEditing?: boolean
  children?: React.ReactNode
}

const UserProfileSectionHeader = ({
  title,
  text,
  underline,
  isMobileColumn,
  isEditing,
  children,
}: UserProfileSectionHeaderProps) => {
  return (
    <div
      className={cx('border-gray-200 p-4 flex gap-3', 'sm:flex-row sm:flex-wrap sm:px-8 sm:py-6', {
        'border-b-2': underline,
        'flex-col': isMobileColumn,
        'flex-row': !isMobileColumn,
      })}
    >
      <div className="flex flex-col grow">
        <h5 className={cx('text-h5-bold', 'sm:text-h4-bold')}>{title}</h5>
        <p className={cx('text-p2-normal', 'sm:block', { hidden: isEditing })}>{text}</p>
      </div>
      {children && <div>{children}</div>}
    </div>
  )
}

export default UserProfileSectionHeader
