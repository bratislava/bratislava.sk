import BALogo from '@assets/images/BALogo.svg'
import MLink from '@components/forms/simple-components/MLink'
import cx from 'classnames'
import React from 'react'
import { useTranslations } from 'next-intl'

export interface BrandProps {
  className?: string
  url?: string
  withTitle?: boolean
}

export const Brand = ({ className, url = '#', withTitle }: BrandProps) => {
  const t = useTranslations();

  return (
    <div className={cx('flex', className)} aria-label="brand">
      <MLink className="flex items-center gap-x-3 text-[#F23005]" href={url}>
        <BALogo className="shrink-0" />
        {withTitle && (
          <span className="text-default">
            {t.rich('capitalCity', {semibold: (chunks) => <span className="font-semibold">{chunks}</span>})}
          </span>
        )}
      </MLink>
    </div>
  )
}

export default Brand
