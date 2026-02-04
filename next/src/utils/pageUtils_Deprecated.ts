import groupBy from 'lodash/groupBy'
import sortBy from 'lodash/sortBy'

import { Breadcrumb } from '@/src/components/common/Breadcrumbs/Breadcrumbs'
import { PageParentPagesFragment } from '@/src/services/graphql'

// TODO this should be thrown away
// Page Accordion Items
export const groupByCategory = <T extends { category?: string | null }>(items: T[]) => {
  const grouped = groupBy(items, (item) => item?.category)
  const sorted = sortBy(grouped, (group) => items.indexOf(group[0]))

  return Object.keys(sorted).map((key) => ({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    category: sorted[key].length > 0 ? sorted[key][0]?.category : (key as string | null),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    items: sorted[key] as T[],
  }))
}

// TODO: Replace with Navikronos.
export const getPageBreadcrumbs = (page: PageParentPagesFragment) => {
  const current = page
  if (!current) {
    return [] as Breadcrumb[]
  }
  let parentPage = current?.parentPage
  const breadcrumbs: Breadcrumb[] = [
    {
      title: current?.title ?? '',
      path: current?.slug ? `/${current.slug}` : null,
    },
  ]
  while (parentPage) {
    breadcrumbs.push({
      title: parentPage.title ?? '',
      path: parentPage.slug ? `/${parentPage.slug}` : null,
    })
    parentPage = parentPage.parentPage
  }

  return breadcrumbs.reverse()
}
