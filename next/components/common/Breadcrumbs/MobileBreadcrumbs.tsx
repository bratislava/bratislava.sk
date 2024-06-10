import React from 'react'

import BreadcrumbsChevronIcon from '@/assets/images/breadcrumbs-chevron.svg'
import { ChevronDownIcon } from '@/assets/ui-icons'
import type { BreadcrumbsProps } from '@/components/common/Breadcrumbs/Breadcrumbs'
import Button from '@/components/common/Button/Button'
import MLink from '@/components/common/MLink/MLink'
import { useTranslation } from '@/utils/useTranslation'

const goBack = () => {
  window.history.back()
}

/**
 * Figma: https://www.figma.com/file/17wbd0MDQcMW9NbXl6UPs8/DS-ESBS%3A-Component-library?node-id=4316-6581&t=h4JAjB29v0Uizs8Y-0
 */
const MobileBreadcrumbs = ({ breadcrumbs }: BreadcrumbsProps) => {
  const { t } = useTranslation()
  const witHome = [{ title: t('Breadcrumbs.homepage'), path: '/' }, ...breadcrumbs]
  const withHomeWithoutCurrent = witHome.slice(0, -1)
  const last = withHomeWithoutCurrent[withHomeWithoutCurrent.length - 1]
  const showDetails = withHomeWithoutCurrent.length > 0

  return (
    <div className="relative">
      <div className="flex justify-between">
        <div className="text-small -mx-4 flex items-center gap-2 font-medium">
          <Button
            onPress={goBack}
            variant="black-link"
            className="shrink-0 py-3 pl-4 text-[14px]"
            startIcon={<BreadcrumbsChevronIcon className="shrink-0 rotate-180" />}
          >
            {t('Breadcrumbs.back')}
          </Button>
          <div className="h-4 w-px bg-gray-300" />
          {last.path ? (
            <MLink href={last.path} variant="underlined" aria-hidden className="truncate py-3 pr-4">
              {last.title}
            </MLink>
          ) : (
            <div className="truncate py-3 pr-4">{last.title}</div>
          )}
        </div>
      </div>

      {/* TODO: Accordion height animation. */}
      {showDetails && (
        <details className="group">
          <summary className="absolute right-0 top-0 -mr-4 block cursor-pointer p-4">
            <ChevronDownIcon className="h-5 w-5 transition-transform group-open:rotate-180" />
          </summary>
          <ol className="flex flex-col flex-wrap gap-1 py-2">
            {withHomeWithoutCurrent.map((breadcrumb, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <li className="text-small font-medium" key={index}>
                {breadcrumb.path ? (
                  <MLink href={breadcrumb.path} variant="underlined" className="flex gap-1">
                    <BreadcrumbsChevronIcon className="shrink-0 rotate-180" />
                    {breadcrumb.title}
                  </MLink>
                ) : (
                  <div className="flex gap-1">
                    <BreadcrumbsChevronIcon className="shrink-0 rotate-180" />
                    {breadcrumb.title}
                  </div>
                )}
              </li>
            ))}
          </ol>
        </details>
      )}
    </div>
  )
}

export default MobileBreadcrumbs
