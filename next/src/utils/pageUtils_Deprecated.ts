import groupBy from 'lodash/groupBy'
import sortBy from 'lodash/sortBy'

import { Breadcrumb } from '@/src/components/common/Breadcrumbs/Breadcrumbs'
import { PageLinkBlockFragment, PageParentPagesFragment } from '@/src/services/graphql'

// TODO this should be thrown away

export const localePath = (locale: string, slug: string) => {
  // Special case for slovak homepage, so it is not empty string
  if (locale === 'sk' && slug === '') return '/'
  const localePrefix = locale === 'sk' ? '' : `${locale}/`
  return `${localePrefix}${slug || ''}`
}

export const pagePath = (
  page?: {
    locale?: string | null
    slug?: string | null
  } | null,
): string | null => {
  if (!page) return null
  const { locale, slug } = page
  if (!locale || !slug) return slug ?? null
  return localePath(locale, slug)
}

export const parsePageLink = (
  pageLink?: PageLinkBlockFragment | null,
): { title: string; url: string; anchor?: string } | null => {
  if (!pageLink) return null
  const param = {
    locale: pageLink?.page?.data?.attributes?.locale,
    slug: pageLink?.page?.data?.attributes?.slug,
  }
  if (pageLink.url === '') {
    // eslint-disable-next-line no-param-reassign
    pageLink.url = null
  }
  return {
    title: pageLink.title || pageLink.page?.data?.attributes?.title || '',
    url: pageLink.url ?? pagePath(param) ?? pageLink.page?.data?.attributes?.slug ?? '#',
    anchor: pageLink.anchor ?? '',
  }
}

// Page Accordion Items
export const groupByCategory = <Category extends string | null, T extends { category?: Category }>(
  items: T[],
) => {
  const grouped = groupBy(items, (item) => item?.category)
  const sorted = sortBy(grouped, (group) => items.indexOf(group[0]))

  return Object.keys(sorted).map((key) => ({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    category: sorted[key].length > 0 ? sorted[key][0]?.category : (key as Category),
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
  let parentPage = current?.attributes?.parentPage
  const breadcrumbs: Breadcrumb[] = [
    {
      title: current?.attributes?.title ?? '',
      path: current?.attributes?.slug ? `/${current.attributes.slug}` : null,
    },
  ]
  while (parentPage?.data?.attributes) {
    breadcrumbs.push({
      title: parentPage?.data?.attributes?.title ?? '',
      path: parentPage?.data?.attributes?.slug ? `/${parentPage.data.attributes.slug}` : null,
    })
    parentPage = parentPage?.data?.attributes?.parentPage
  }

  return breadcrumbs.reverse()
}
