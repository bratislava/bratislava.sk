import { Breadcrumb } from '@/src/components/common/Breadcrumbs/Breadcrumbs'
import { PageParentPagesFragment } from '@/src/services/graphql'

export const getPageBreadcrumbs = (page: PageParentPagesFragment) => {
  const current = page
  if (!current) {
    return [] as Breadcrumb[]
  }
  let parentPage = current?.parentPage
  const breadcrumbs: Breadcrumb[] = [
    {
      title: current?.title ?? '',
      path: current?.path ? `/${current.path}` : null,
    },
  ]
  while (parentPage) {
    breadcrumbs.push({
      title: parentPage.title ?? '',
      path: parentPage.path ? `/${parentPage.path}` : null,
    })
    parentPage = parentPage.parentPage
  }

  return breadcrumbs.reverse()
}
