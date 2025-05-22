import { Trans } from 'next-i18next'
import React from 'react'

import BALogo from '@/src/assets/images/BALogo.svg'
import MLink from '@/src/components/common/MLink/MLink'
import cn from '@/src/utils/cn'

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
          <span className="text-size-p-small">
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
