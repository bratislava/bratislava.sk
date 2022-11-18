// @ts-strict-ignore
import {
  BlogPostFragment,
  BlogPostLinkFragment,
  FileFragment,
  FooterFragment,
  MainMenuItemFragment,
  PageLinkFragment,
} from '@bratislava/strapi-sdk-homepage'
import { FooterProps, MenuMainItem, NewsCardProps, TFile } from '@bratislava/ui-bratislava'
import _, { groupBy, sortBy } from 'lodash'

import { getLocalDate, getNumericLocalDate } from './local-date'
import { isPresent } from './utils'

export type CategoriesType =
  | 'main'
  | 'transport'
  | 'environment'
  | 'social'
  | 'education'
  | 'culture'

export const COLOR_VARIABLES: {
  [key: string]: {
    c800: string
    c700: string
    c600: string
    c500: string
    c400: string
    c300: string
    c200: string
    c100: string
  }
} = {
  main: {
    c800: '--color-main-800',
    c700: '--color-main-700',
    c600: '--color-main-600',
    c500: '--color-main-500',
    c400: '--color-main-400',
    c300: '--color-main-300',
    c200: '--color-main-200',
    c100: '--color-main-100',
  },
  transport: {
    c800: '--color-transport-800',
    c700: '--color-transport-700',
    c600: '--color-transport-600',
    c500: '--color-transport-500',
    c400: '--color-transport-400',
    c300: '--color-transport-300',
    c200: '--color-transport-200',
    c100: '--color-transport-100',
  },
  environment: {
    c800: '--color-environment-800',
    c700: '--color-environment-700',
    c600: '--color-environment-600',
    c500: '--color-environment-500',
    c400: '--color-environment-400',
    c300: '--color-environment-300',
    c200: '--color-environment-200',
    c100: '--color-environment-100',
  },
  social: {
    c800: '--color-social-800',
    c700: '--color-social-700',
    c600: '--color-social-600',
    c500: '--color-social-500',
    c400: '--color-social-400',
    c300: '--color-social-300',
    c200: '--color-social-200',
    c100: '--color-social-100',
  },
  education: {
    c800: '--color-education-800',
    c700: '--color-education-700',
    c600: '--color-education-600',
    c500: '--color-education-500',
    c400: '--color-education-400',
    c300: '--color-education-300',
    c200: '--color-education-200',
    c100: '--color-education-100',
  },
  culture: {
    c800: '--color-culture-800',
    c700: '--color-culture-700',
    c600: '--color-culture-600',
    c500: '--color-culture-500',
    c400: '--color-culture-400',
    c300: '--color-culture-300',
    c200: '--color-culture-200',
    c100: '--color-culture-100',
  },
}
// Return object with colors by category
const getColorsVariables = (pageCategory: string) =>
  COLOR_VARIABLES[pageCategory] ?? COLOR_VARIABLES.main

// We get colors from the server and we need to transorm it to category.
// Function which get color (red, blue, green...) and tranform it to category (main, transport, environment ...)
export const transformColorToCategory = (pageColor: string): string => {
  let category: string
  switch (pageColor) {
    case 'red':
      category = 'main'
      break
    case 'blue':
      category = 'transport'
      break
    case 'green':
      category = 'environment'
      break
    case 'yellow':
      category = 'social'
      break
    case 'purple':
      category = 'education'
      break
    case 'brown':
      category = 'culture'
      break

    default:
      category = pageColor
      break
  }
  return category
}

// Page
export const pageStyle = (pageColor: string) => {
  const category = transformColorToCategory(pageColor)
  const color = getColorsVariables(category)

  return `
:root {
  --color-category-800: var(${color.c800}) !important;
  --color-category-700: var(${color.c700}) !important;
  --color-category-600: var(${color.c600}) !important;
  --color-category-500: var(${color.c500}) !important;
  --color-category-400: var(${color.c400}) !important;
  --color-category-300: var(${color.c300}) !important;
  --color-category-200: var(${color.c200}) !important;
  --color-category-100: var(${color.c100}) !important;
}
  `
}

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
  pageLink?: PageLinkFragment | null,
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

export const parseBlogPostLink = (
  blogPostLink?: BlogPostLinkFragment | null,
  slug?: string,
): { title: string; url: string } | null => {
  if (!blogPostLink)
    return {
      title: '',
      url: `/blog/${slug}` ?? '',
    }

  return {
    title: blogPostLink.title || blogPostLink.blogPost?.data?.attributes?.title || '',
    url: blogPostLink.url ?? `/blog/${blogPostLink.blogPost?.data?.attributes?.slug}` ?? '',
  }
}

// Page FileList
export const formatFiles = (files: FileFragment[]): TFile[] =>
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

export const groupByCategoryFileList = (fileList: FileFragment[]) => {
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
  const data = footer?.data?.attributes
  return {
    accessibilityLink: parsePageLink(data?.accessibilityLink) ?? undefined,
    address: data?.address ?? undefined,
    copyright: data?.copyright ?? undefined,
    email: data?.email ?? undefined,
    facebookLink: data?.facebookUrl ?? undefined,
    instagramLink: data?.instagramUrl ?? undefined,
    phone: data?.phone ?? undefined,
    youtubeLink: data?.youtubeUrl ?? undefined,
    sections: data?.footerSections?.filter(isPresent).map((s) => ({
      title: s.title ?? '',
      pageLinks: s.pageLinks?.map((l) => parsePageLink(l)).filter(isPresent),
    })),
  }
}

// Main Menu
// TODO
export const parseMainMenu = (menu: MainMenuItemFragment): MenuMainItem[] =>
  sortBy(
    menu.data.map((item) => ({
      id: item.id ?? '',
      color: `rgb(var(${
        getColorsVariables(transformColorToCategory(item.attributes.color) ?? '').c100
      }))`,
      colorDark: `rgb(var(${
        getColorsVariables(transformColorToCategory(item.attributes.color) ?? '').c800
      }))`,
      icon: item.attributes.icon ?? '',
      coloredIcon: item?.attributes.iconHover ?? item.attributes.icon ?? '',
      priority: item.attributes.priority ?? 0,
      title: item.attributes.title ?? '',
      subItems: sortBy(
        item?.attributes?.subcategories?.data.map((subCategory) => ({
          icon: subCategory.attributes.icon ?? '',
          title: (subCategory.attributes.title || subCategory.attributes.moreLink?.title) ?? '',
          moreLinkTitle:
            (subCategory.attributes.moreLink?.title || subCategory.attributes.title) ?? '',
          url: parsePageLink(subCategory.attributes.moreLink)?.url ?? '',
          subItems: subCategory.attributes.pages?.map(parsePageLink).filter(isPresent) ?? [],
          priority: subCategory.attributes.priority ?? 0,
        })) ?? [],
        ['priority'],
      ),
    })),
    ['priority'],
  )

// Page Accordion Items
export const groupByCategory = <T extends { category?: string }>(items: T[]) => {
  const grouped = _(items)
    .groupBy((item) => item?.category)
    .sortBy((group) => items.indexOf(group[0]))
    .value()
  return Object.keys(grouped).map((key) => ({
    category: grouped[key].length > 0 ? grouped[key][0]?.category : key,
    items: grouped[key],
  }))
}

// Page Related Content
export const parseRelatedBlogPosts = (
  RelatedContentBlogPosts: BlogPostFragment[],
): NewsCardProps[] => {
  const array: NewsCardProps[] = RelatedContentBlogPosts.map((relatedBlogPost) => {
    const blogpost = relatedBlogPost.data[0]
    return {
      id: blogpost.id,
      title: blogpost.attributes?.title ?? undefined,
      coverImage: {
        data: {
          attributes: {
            url: blogpost.attributes?.coverImage?.data?.attributes?.url,
          },
        },
      },
      tag: {
        data: {
          attributes: {
            title:
              blogpost.attributes?.tag?.data?.attributes?.pageCategory?.data?.attributes?.title,
            pageCategory: {
              data: {
                attributes: {
                  color:
                    blogpost.attributes?.tag?.data?.attributes?.pageCategory?.data?.attributes
                      ?.color,
                },
              },
            },
          },
        },
      },
      excerpt: blogpost.attributes?.excerpt ?? undefined,
      updatedAt: getNumericLocalDate(blogpost.attributes?.updatedAt).split('.').join('.  '),
      createdAt: getNumericLocalDate(blogpost.attributes?.date_added).split('.').join('.  '),
      moreLink: parseBlogPostLink(blogpost.attributes?.moreLink, blogpost.attributes?.slug),
    }
  })
  return array
}

// Page Accordion Item - regex for secondary text
export const parseCategory = (category: string) => {
  const match = /(.*)(\(.*\))/.exec(category)
  if (match) {
    return { title: match[1], secondaryTitle: match[2] }
  }
  return { title: category, secondaryTitle: '' }
}
