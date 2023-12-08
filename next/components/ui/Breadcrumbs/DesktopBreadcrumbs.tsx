import BreadcrumbsChevronIcon from '@assets/images/breadcrumbs-chevron.svg'
import BreadcrumbsHomeIcon from '@assets/images/breadcrumbs-home.svg'
import Button from '@components/forms/simple-components/Button'
import type { BreadcrumbsProps } from '@components/ui/Breadcrumbs/Breadcrumbs'
import { useTranslations } from 'next-intl'
import React from 'react'
/**
 * Figma: https://www.figma.com/file/17wbd0MDQcMW9NbXl6UPs8/DS-ESBS%3A-Component-library?node-id=821-1994&t=pIPe0xK0FBdmOKH1-0
 */
const DesktopBreadcrumbs = ({ breadcrumbs }: BreadcrumbsProps) => {
  const t = useTranslations()
  return (
    <ol className="flex flex-wrap items-center gap-x-1 gap-y-1.5 py-3 lg:py-6">
      <Button
        href="/"
        aria-label={t('Breadcrumbs.homepage')}
        variant="unstyled"
        className="shrink-0"
        icon={<BreadcrumbsHomeIcon />}
      />
      {breadcrumbs.map((breadcrumb, index) => {
        const isLast = index === breadcrumbs.length - 1

        return (
          // eslint-disable-next-line react/no-array-index-key
          <li className="text-small flex gap-1 font-medium" key={index}>
            <BreadcrumbsChevronIcon className="shrink-0" />
            {breadcrumb.path && !isLast ? (
              <Button
                href={breadcrumb.path}
                variant="unstyled"
                className="w-full cursor-pointer outline-none"
              >
                {breadcrumb.title}{' '}
              </Button>
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
