import AccordionChevron from '@assets/images/accordion-chevron.svg'
import BreadcrumbsChevronIcon from '@assets/images/breadcrumbs-chevron.svg'
import MLink from '@components/forms/simple-components/MLink'
import type { BreadcrumbsProps } from '@components/ui/Breadcrumbs/Breadcrumbs'
import { useTranslation } from 'next-i18next'
import React from 'react'

const goBack = () => {
  window.history.back()
}

/**
 * Figma: https://www.figma.com/file/17wbd0MDQcMW9NbXl6UPs8/DS-ESBS%3A-Component-library?node-id=4316-6581&t=h4JAjB29v0Uizs8Y-0
 */
const MobileBreadcrumbs = ({ breadcrumbs }: BreadcrumbsProps) => {
  const { t } = useTranslation('common', { keyPrefix: 'Breadcrumbs' })
  const witHome = [{ title: t('homepage'), path: '/' }, ...breadcrumbs]
  const withHomeWithoutCurrent = witHome.slice(0, -1)
  const last = withHomeWithoutCurrent[withHomeWithoutCurrent.length - 1]
  const showDetails = withHomeWithoutCurrent.length > 0

  return (
    <div className="relative">
      <div className="flex justify-between">
        <div className="text-p3-medium -mx-4 flex items-center gap-2">
          {/* TODO: Convert to shared link/button component. Detect if user can actually go back. */}
          <button
            type="button"
            className="flex items-center gap-1 py-3 pl-4 underline hover:text-gray-600"
            onClick={goBack}
          >
            <BreadcrumbsChevronIcon className="shrink-0 rotate-180" />
            <span>{t('back')}</span>
          </button>
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
            <AccordionChevron className="h-5 w-5 transition-transform group-open:rotate-180" />
          </summary>
          <ol className="flex flex-col flex-wrap gap-1 py-2">
            {withHomeWithoutCurrent.map((breadcrumb, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <li className="text-p3-medium" key={index}>
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
