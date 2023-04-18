import { CommonLinkFragment } from '@bratislava/strapi-sdk-homepage'
import { LinkPlausibleProps } from '@components/forms/simple-components/MLink'
import { ReactNode } from 'react'

export type CommonLinkProps = {
  children: ReactNode
  href: string
  target?: '_blank'
  plausibleProps?: LinkPlausibleProps
}

export const getCommonLinkProps = (link: CommonLinkFragment | null | undefined) => {
  let href = '#'
  let target: '_blank' | undefined

  if (link?.page?.data?.attributes?.slug) {
    href = `/${link.page.data.attributes.slug}`
  } else if (link?.blogPost?.data?.attributes?.slug) {
    href = `/blog/${link.blogPost.data.attributes.slug}`
  } else if (link?.url) {
    href = link.url
    target = '_blank'
  }

  const plausibleProps: LinkPlausibleProps | undefined = link?.plausibleId
    ? { id: link.plausibleId }
    : undefined

  return { children: link?.label ?? null, href, target, plausibleProps }
}
