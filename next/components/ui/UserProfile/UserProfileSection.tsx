import cx from 'classnames'
import React from 'react'

interface UserProfileSectionProps {
  children?: React.ReactNode
}

const UserProfileSection = ({ children }: UserProfileSectionProps) => {
  return (
    <div className={cx('bg-white flex flex-col items-center', 'sm:py-3 sm:px-8')}>
      <div className={cx('w-full rounded-lg border-gray-200', 'sm:border-2 sm:max-w-6xl')}>
        {children}
      </div>
    </div>
  )
}

export default UserProfileSection
