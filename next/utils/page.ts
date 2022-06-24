import {
  BlogPostFragment,
  BlogPostLinkFragment,
  FileFragment,
  FooterFragment,
  MainMenuItemFragment,
  PageLinkFragment,
} from '@bratislava/strapi-sdk-homepage'
import { FooterProps, MenuMainItem, NewsCardProps, TFile } from '@bratislava/ui-bratislava'
import groupBy from 'lodash/groupBy'
import { getLocalDate, getNumericLocalDate } from './local-date'
import orderBy from 'lodash/orderBy'
import { isPresent } from './utils'

// Use explocitly named color variables so their usage can be easily found in project
const COLOR_VARIABLES: {
  [key: string]: { default: string; light: string; dark: string }
} = {
  red: {
    default: '--color-red',
    light: '--color-red--light',
    dark: '--color-red--dark',
  },
  blue: {
    default: '--color-blue',
    light: '--color-blue--light',
    dark: '--color-blue--dark',
  },
  green: {
    default: '--color-green',
    light: '--color-green--light',
    dark: '--color-green--dark',
  },
  yellow: {
    default: '--color-yellow',
    light: '--color-yellow--light',
    dark: '--color-yellow--dark',
  },
  purple: {
    default: '--color-purple',
    light: '--color-purple--light',
    dark: '--color-purple--dark',
  },
  brown: {
    default: '--color-brown',
    light: '--color-brown--light',
    dark: '--color-brown--dark',
  },
}

const getColorVariables = (pageColor: string) => COLOR_VARIABLES[pageColor] ?? COLOR_VARIABLES.red // use red as default

// Page
export const pageStyle = (pageColor: string) => {
  const color = getColorVariables(pageColor)

  return `
:root {
  --color-primary: var(${color.default}) !important;
  --color-secondary: var(${color.light}) !important;
}
  `
}

export const localePath = (locale: string, slug: string) => {
  // Special case for slovak homepage, so it is not empty string
  if (locale === 'sk' && slug === '') return '/'
  const localePrefix = locale === 'sk' ? '' : `${locale}/`
  return `${localePrefix}${slug}`
}

export const pagePath = (
  page?: {
    locale?: string | null
    slug?: string | null
  } | null
): string | null => {
  if (!page) return null
  const { locale, slug } = page
  if (!locale || !slug) return slug ?? null
  return localePath(locale, slug)
}

export const parsePageLink = (
  pageLink?: PageLinkFragment | null
): { title: string; url: string; anchor?: string } | null => {
  if (!pageLink) return null
  const param = {
    locale: pageLink?.page?.data?.attributes?.locale,
    slug: pageLink?.page?.data?.attributes?.slug
  }
  return {
    title: pageLink.title || pageLink.page?.data?.attributes?.title || '',
    url: pageLink.url ?? pagePath(param) ?? '',
    anchor: pageLink.anchor ?? '',
  }
}

export const parseBlogPostLink = (
  blogPostLink?: BlogPostLinkFragment | null,
  slug?: string
): { title: string; url: string } | null => {
  if (!blogPostLink)
    return {
      title: '',
      url: `/blog/${slug}` ?? '',
    }

  return {
    title: blogPostLink.title || blogPostLink.blogPost?.title || '',
    url: blogPostLink.url ?? `/blog/${blogPostLink.blogPost?.slug}` ?? '',
  }
}

// Page FileList
export const formatFiles = (files: FileFragment[]): TFile[] =>
  files.map((file) => ({
    title: file.title ?? undefined,
    category: file.category ?? undefined,
    media: {
      url: file.media?.url ?? '',
      size: file.media?.size ?? 0,
      created_at: file.media?.created_at ? getLocalDate(file.media?.created_at) : '',
      ext: file.media?.ext ?? undefined,
    },
  }))

export const groupByCategoryFileList = (fileList: FileFragment[]) => {
  const files = fileList.map((file) => ({
    category: file.category ?? '',
    media: file.media,
    title: file.title,
  }))
  const grouped = groupBy(files, 'category')
  const groupedFileList = Object.keys(grouped).map((key) => ({
    category: key === 'null' ? '' : key,
    files: formatFiles(grouped[key]),
  }))
  return groupedFileList
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
export const parseMainMenu = (menu: MainMenuItemFragment): MenuMainItem[] =>
  orderBy(menu.data, ['priority'], ['asc']).map((item) => ({
    id: item.id ?? '',
    color: `rgb(var(${getColorVariables(item.attributes.color ?? '').light}))`,
    colorDark: `rgb(var(${getColorVariables(item.attributes.color ?? '').dark}))`,
    icon: item.attributes.icon ?? '',
    coloredIcon: item?.attributes.iconHover ?? item.attributes.icon ?? '',
    title: item.attributes.title ?? '',
    subItems: orderBy(item?.attributes?.subcategories?.data ?? [], ['priority'], ['asc'])
      .map((subCategory) => ({
        icon: subCategory.attributes.icon ?? '',
        title: (subCategory.attributes.title || subCategory.attributes.moreLink?.title) ?? '',
        moreLinkTitle: (subCategory.attributes.moreLink?.title || subCategory.attributes.title) ?? '',
        url: parsePageLink(subCategory.attributes.moreLink)?.url ?? '',
        subItems: subCategory.attributes.pages?.map(parsePageLink).filter(isPresent) ?? [],
      })),
  }))

// Page Accordion Items
export const groupByCategory = <T>(items: T[]) => {
  const grouped = groupBy(items, 'category')
  const groupedItems = Object.keys(grouped).map((key) => ({
    category: key,
    items: grouped[key],
  }))
  return groupedItems
}
//Page Related Content
export const parseRelatedBlogPosts = (RelatedContentBlogPosts: BlogPostFragment[]): NewsCardProps[] => {
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
            title: blogpost.attributes?.tag?.data?.attributes?.pageCategory?.data?.attributes?.title,
            pageCategory: {
              data: {
                attributes: {
                  color: blogpost.attributes?.tag?.data?.attributes?.pageCategory?.data?.attributes?.color,
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
  } else {
    return { title: category, secondaryTitle: '' }
  }
}
