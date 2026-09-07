import DesktopBreadcrumbs from '@/src/components/common/Breadcrumbs/DesktopBreadcrumbs'
import MobileBreadcrumbs from '@/src/components/common/Breadcrumbs/MobileBreadcrumbs'

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
      {/* Even tho it's hidden on desktop, it's still rendered in html, so we exclude it fro crawler */}
      <nav className="lg:hidden" data-ai-crawl-exclude>
        <MobileBreadcrumbs {...props} />
      </nav>
    </>
  )
}

export default Breadcrumbs
