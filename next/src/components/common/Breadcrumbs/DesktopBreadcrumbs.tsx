import React from 'react'
import { ChevronRightIcon, HomeIcon } from 'src/assets/icons'

import type { BreadcrumbsProps } from '@/src/components/common/Breadcrumbs/Breadcrumbs'
import MLink from '@/src/components/common/MLink/MLink'
import { useTranslation } from '@/src/utils/useTranslation'

/**
 * Figma: https://www.figma.com/file/17wbd0MDQcMW9NbXl6UPs8/DS-ESBS%3A-Component-library?node-id=821-1994&t=pIPe0xK0FBdmOKH1-0
 */
const DesktopBreadcrumbs = ({ breadcrumbs }: BreadcrumbsProps) => {
  const { t } = useTranslation()

  return (
    <ol className="flex flex-wrap items-center gap-x-1 gap-y-1.5 py-3 lg:py-6">
      <li>
        <MLink
          href="/"
          variant="underlined"
          className="shrink-0"
          aria-label={t('Breadcrumbs.homepage')}
        >
          <HomeIcon className="size-5 shrink-0" />
        </MLink>
      </li>
      {breadcrumbs.map((breadcrumb, index) => {
        const isLast = index === breadcrumbs.length - 1

        return (
          // eslint-disable-next-line react/no-array-index-key
          <li className="flex gap-1 text-size-p-tiny font-medium" key={index}>
            <ChevronRightIcon className="size-5 shrink-0" aria-hidden />
            {breadcrumb.path && !isLast ? (
              <MLink href={breadcrumb.path} variant="underlined">
                {breadcrumb.title}
              </MLink>
            ) : (
              breadcrumb.title
            )}
          </li>
        )
      })}
    </ol>
  )
}

export default DesktopBreadcrumbs
