import BALogo from '@assets/images/BALogo.svg'
import MLink from '@components/forms/simple-components/MLink'
import cx from 'classnames'
import { Trans } from 'next-i18next'
import React from 'react'

export interface BrandProps {
  className?: string
  url?: string
  withTitle?: boolean
}

export const Brand = ({ className, url = '#', withTitle }: BrandProps) => {
  return (
    <div className={cx('flex', className)} aria-label="brand">
      <MLink className="flex items-center gap-x-3 text-[#F23005]" href={url} variant="unstyled">
        <BALogo />
        {withTitle && (
          <span className="text-p2">
            <Trans
              i18nKey="capitalCity"
              ns="common"
              components={{
                semibold: <span className="font-semibold" />,
              }}
            />
          </span>
        )}
      </MLink>
    </div>
  )
}

export default Brand
