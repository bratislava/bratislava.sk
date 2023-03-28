import React from 'react'

import BreadcrumbsChevronIcon from '../../../assets/images/breadcrumbs-chevron.svg'
import BreadcrumbsHomeIcon from '../../../assets/images/breadcrumbs-home.svg'
import MLink from '../../forms/simple-components/MLink'

export type Breadcrumb = {
  title: string
  path: string | null
}

export type BreadcrumbsProps = {
  breadcrumbs: Breadcrumb[]
}

/**
 * TODO: Mobile breadcrumbs.
 */
const Breadcrumbs = ({ breadcrumbs }: BreadcrumbsProps) => {
  return (
    <nav>
      <ol className="flex gap-x-1 gap-y-1.5 items-center flex-wrap py-3 lg:py-6">
        <MLink href="/" variant="breadcrumbs" className="shrink-0">
          <BreadcrumbsHomeIcon />
        </MLink>
        {breadcrumbs.map((breadcrumb, index) => (
          <li className="text-p3-medium flex gap-1" key={index}>
            <BreadcrumbsChevronIcon className="shrink-0" />
            {breadcrumb.path ? (
              <MLink href={breadcrumb.path} variant="breadcrumbs">
                {breadcrumb.title}
              </MLink>
            ) : (
              breadcrumb.title
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
