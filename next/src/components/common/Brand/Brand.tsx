import { Trans, useTranslation } from 'next-i18next'
import React from 'react'

import { BratislavaLogoSvg } from '@/src/assets/images'
import MLink from '@/src/components/common/MLink/MLink'
import cn from '@/src/utils/cn'

export type BrandProps = {
  className?: string
  url?: string
  withTitle?: boolean
}

const Brand = ({ className, url = '/', withTitle }: BrandProps) => {
  const { t } = useTranslation()

  return (
    <div className={cn('flex', className)}>
      <MLink
        // margin and padding added to show full focus ring
        className="-m-2 flex items-center gap-x-3 p-2 text-[#F23005] hover:opacity-80"
        href={url}
        aria-label={t('Brand.ariaLabel')}
      >
        <BratislavaLogoSvg aria-hidden className="shrink-0" />
        {withTitle ? (
          <span className="text-size-p-small">
            <Trans
              i18nKey="Brand.capitalCity"
              components={{
                semibold: <span className="font-semibold" />,
              }}
            />
          </span>
        ) : null}
      </MLink>
    </div>
  )
}

export default Brand
