import { useUIContext } from '@bratislava/common-frontend-ui-context'
import cx from 'classnames'
import React from 'react'

import BALogo from '@assets/images/BALogo.svg'

export interface BrandProps {
  className?: string
  title?: React.ReactNode
  url?: string
}

export const Brand = ({ className, title, url = '#' }: BrandProps) => {
  const { Link: UILink } = useUIContext()
  return (
    <div className={cx('flex', className)} aria-label="brand">
      <UILink className="flex items-center space-x-3" href={url}>
        <BALogo className="lg:w-6.5 h-8 w-8 lg:h-6" />
        {title && <div>{title}</div>}
      </UILink>
    </div>
  )
}

export default Brand
