// @ts-strict-ignore
import {
  FileBlockFragment,
  FooterFragment,
  PageLinkBlockFragment,
} from '@bratislava/strapi-sdk-homepage'
import { FooterProps, TFile } from '@bratislava/ui-bratislava'
import groupBy from 'lodash/groupBy'
import sortBy from 'lodash/sortBy'

import { getLocalDate } from './local-date'
import { isPresent } from './utils'

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
  if (pageLink.url === '') pageLink.url = null
  return {
    title: pageLink.title || pageLink.page?.data?.attributes?.title || '',
    url: pageLink.url ?? pagePath(param) ?? pageLink.page?.data?.attributes?.slug,
    anchor: pageLink.anchor ?? '',
  }
}

// Page FileList
export const formatFiles = (files: FileBlockFragment[]): TFile[] =>
  files.map((file) => ({
    title: file.title ?? undefined,
    category: file.category ?? undefined,
    media: {
      url: file.media?.data?.attributes?.url ?? '',
      size: file.media?.data?.attributes?.size ?? 0,
      created_at: file.media?.data?.attributes?.createdAt
        ? getLocalDate(file.media?.data?.attributes?.createdAt)
        : '',
      ext: file.media?.data?.attributes?.ext ?? undefined,
    },
  }))

export const groupByCategoryFileList = (fileList: FileBlockFragment[]) => {
  const files = fileList.map((file) => ({
    category: file.category ?? '',
    media: file.media,
    title: file.title,
  }))
  const grouped = groupBy(files, 'category')
  return Object.keys(grouped).map((key) => ({
    category: key === 'null' ? '' : key,
    files: formatFiles(grouped[key]),
  }))
}

// Page Footer
export const parseFooter = (footer?: FooterFragment | null): FooterProps => {
  return {
    accessibilityLink: parsePageLink(footer?.accessibilityLink) ?? undefined,
    address: footer?.address ?? undefined,
    copyright: footer?.copyright ?? undefined,
    email: footer?.email ?? undefined,
    facebookLink: footer?.facebookUrl ?? undefined,
    instagramLink: footer?.instagramUrl ?? undefined,
    phone: footer?.phone ?? undefined,
    youtubeLink: footer?.youtubeUrl ?? undefined,
    sections: footer?.footerSections?.filter(isPresent).map((s) => ({
      title: s.title ?? '',
      pageLinks: s.pageLinks?.map((l) => parsePageLink(l)).filter(isPresent),
    })),
  }
}

// Page Accordion Items
export const groupByCategory = <Category extends string | null, T extends { category?: Category }>(
  items: T[],
) => {
  const grouped = groupBy(items, (item) => item?.category)
  const sorted = sortBy(grouped, (group) => items.indexOf(group[0]))

  return Object.keys(sorted).map((key) => ({
    category: sorted[key].length > 0 ? sorted[key][0]?.category : (key as Category),
    items: sorted[key] as T[],
  }))
}

// Page Accordion Item - regex for secondary text
export const parseCategory = (category: string) => {
  const match = /(.*)(\(.*\))/.exec(category)
  if (match) {
    return { title: match[1], secondaryTitle: match[2] }
  }
  return { title: category, secondaryTitle: '' }
}
