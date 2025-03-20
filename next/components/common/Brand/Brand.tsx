import { Trans } from 'next-i18next'
import React from 'react'
import cn from 'utils/cn'

import BALogo from '@/assets/images/BALogo.svg'
import MLink from '@/components/common/MLink/MLink'

export type BrandProps = {
  className?: string
  url?: string
  withTitle?: boolean
}

const Brand = ({ className, url = '#', withTitle }: BrandProps) => {
  return (
    <div className={cn('flex', className)}>
      <MLink className="flex items-center gap-x-3 text-[#F23005]" href={url}>
        <BALogo className="shrink-0" />
        {withTitle && (
          <span className="text-default">
            <Trans
              i18nKey="Brand.capitalCity"
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
