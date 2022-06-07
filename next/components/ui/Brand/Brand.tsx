import { ReactComponent as BALogo } from '../../../assets/images/BALogo.svg'
import cx from 'classnames'
import React from 'react'
import { useUIContext } from '@bratislava/common-frontend-ui-context'

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
        <BALogo />
        {title && <div>{title}</div>}
      </UILink>
    </div>
  )
}

export default Brand
