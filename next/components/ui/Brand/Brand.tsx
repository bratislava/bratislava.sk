import BALogo from '@assets/images/BALogo.svg'
import { Typography } from '@bratislava/component-library'
import MLink from '@components/forms/simple-components/MLink'
import cx from 'classnames'
import { useTranslations } from 'next-intl'
import React from 'react'

export type BrandProps = {
  className?: string
  url?: string
  withTitle?: boolean
}

export const Brand = ({ className, url = '#', withTitle }: BrandProps) => {
  const t = useTranslations()

  return (
    <div className={cx('flex', className)} aria-label="brand">
      <MLink className="flex items-center gap-x-3 text-[#F23005]" href={url}>
        <BALogo className="shrink-0" />
        {withTitle && (
          <span className="text-default">
            {t.rich('capitalCity', {
              semibold: (chunks) => <Typography type="span">{chunks}</Typography>,
            })}
          </span>
        )}
      </MLink>
    </div>
  )
}

export default Brand
