import React from 'react'

import DesktopBreadcrumbs from '@/components/common/Breadcrumbs/DesktopBreadcrumbs'
import MobileBreadcrumbs from '@/components/common/Breadcrumbs/MobileBreadcrumbs'

export type Breadcrumb = {
  title: string
  path: string | null
}

export type BreadcrumbsProps = {
  breadcrumbs: Breadcrumb[]
}

const Breadcrumbs = (props: BreadcrumbsProps) => {
  return (
    <>
      <nav className="hidden lg:block">
        <DesktopBreadcrumbs {...props} />
      </nav>
      <nav className="lg:hidden">
        <MobileBreadcrumbs {...props} />
      </nav>
    </>
  )
}

export default Breadcrumbs
