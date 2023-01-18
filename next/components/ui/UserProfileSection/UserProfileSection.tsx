import cx from 'classnames'
import React from 'react'

interface UserProfileSectionProps {
  children?: React.ReactNode
}

const UserProfileSection = ({ children }: UserProfileSectionProps) => {
  return (
    <div className={cx('bg-white flex flex-col items-center h-full', 'xs:py-3 xs:px-8')}>
      <div className={cx('w-full rounded-lg border-gray-200', 'xs:border-2 xs:max-w-6xl')}>
        {children}
      </div>
    </div>
  )
}

export default UserProfileSection
