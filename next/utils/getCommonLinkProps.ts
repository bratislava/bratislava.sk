import { CommonLinkFragment } from '@bratislava/strapi-sdk-homepage'
import { LinkPlausibleProps } from '@components/forms/simple-components/MLink'

export const getCommonLinkProps = (link: CommonLinkFragment) => {
  let href = '#'
  let target: '_blank' | undefined

  if (link.page?.data?.attributes?.slug) {
    href = `/${link.page?.data?.attributes?.slug}`
  } else if (link.blogPost?.data?.attributes?.slug) {
    href = `/blog/${link.blogPost?.data?.attributes?.slug}`
  } else if (link.url) {
    href = link.url
    target = '_blank'
  }

  const plausibleProps: LinkPlausibleProps | undefined = link.plausibleId
    ? { id: link.plausibleId }
    : undefined

  return { label: link.label, href, target, plausibleProps }
}
