import cx from 'classnames'
import React from 'react'

interface UserProfileSectionProps {
  children?: React.ReactNode
}

const UserProfileSection = ({ children }: UserProfileSectionProps) => {
  return (
    <div
      className={cx(
        'bg-white flex flex-col items-center grow overflow-y-scroll',
        'md:py-3 md:px-8',
      )}
    >
      <div className={cx('w-full rounded-lg border-gray-200', 'md:border-2 md:max-w-6xl')}>
        {children}
      </div>
    </div>
  )
}

export default UserProfileSection
