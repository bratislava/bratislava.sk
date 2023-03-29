import { CommonLinkFragment } from '@bratislava/strapi-sdk-homepage'

export const getCommonLinkProps = (link: CommonLinkFragment) => {
  let href = ''
  let target: '_blank' | undefined

  if (link.page?.data?.attributes?.slug) {
    href = `/${link.page?.data?.attributes?.slug}`
  } else if (link.blogPost?.data?.attributes?.slug) {
    href = `/blog/${link.blogPost?.data?.attributes?.slug}`
  } else if (link.url) {
    href = link.url
    target = '_blank'
  }

  return { label: link.label, href, target }
}
