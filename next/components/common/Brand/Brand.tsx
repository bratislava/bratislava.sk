import { Typography } from '@bratislava/component-library'
import { useTranslations } from 'next-intl'
import React from 'react'
import { twMerge } from 'tailwind-merge'

import BALogo from '@/assets/images/BALogo.svg'
import MLink from '@/components/common/MLink/MLink'

export type BrandProps = {
  className?: string
  url?: string
  withTitle?: boolean
}

const Brand = ({ className, url = '#', withTitle }: BrandProps) => {
  const t = useTranslations()

  return (
    <div className={twMerge('flex', className)}>
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
