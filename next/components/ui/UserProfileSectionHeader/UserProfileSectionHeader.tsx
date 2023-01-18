import { Button } from '@storybook/components'
import cx from 'classnames'
import React from 'react'

interface UserProfileSectionHeaderProps {
  title: string
  text: string
  underline?: boolean
  children?: React.ReactNode
}

const UserProfileSectionHeader = ({
  title,
  text,
  underline,
  children,
}: UserProfileSectionHeaderProps) => {
  return (
    <div
      className={cx(
        'border-gray-200 p-4 flex flex-col gap-3',
        'xs:flex-row xs:flex-wrap xs:px-8 xs:py-6',
        {
          'border-b-2': underline,
        },
      )}
    >
      <div className="flex flex-col grow">
        <h5 className={cx('text-h5-bold', 'xs:text-h4-bold')}>{title}</h5>
        <p className="text-p2-normal">{text}</p>
      </div>
      {children && <div>{children}</div>}
    </div>
  )
}

export default UserProfileSectionHeader
