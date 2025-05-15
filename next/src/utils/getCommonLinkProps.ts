import { ReactNode } from 'react'

import { LinkAnalyticsProps } from '@/src/components/common/MLink/MLink'
import { CommonLinkFragment, HeaderLinkFragment, MenuLinkFragment } from '@/src/services/graphql'

export type CommonLinkProps = {
  children: ReactNode
  href: string
  target?: '_blank'
  analyticsProps?: LinkAnalyticsProps
}

export const getCommonLinkProps = (
  link: CommonLinkFragment | MenuLinkFragment | HeaderLinkFragment | null | undefined,
  // eslint-disable-next-line sonarjs/cognitive-complexity
) => {
  let href = '#'
  let label = link?.label ?? ''
  let target: '_blank' | undefined

  if (!link) {
    return { children: label, href } // TODO
  }

  // Some content types are not in all strapi link fragments, so we have to check if they exist in the object first
  if ('page' in link && link.page?.data?.attributes) {
    label = link.label ?? link.page.data.attributes.title
    href = `/${link.page.data.attributes.slug}`
  } else if ('article' in link && link.article?.data?.attributes) {
    label = link.label ?? link.article.data.attributes.title
    href = `/spravy/${link.article.data.attributes.slug}`
  } else if ('email' in link && link.email) {
    label = link.label ?? link.email
    href = `mailto:${link.email}`
  } else if (link?.url) {
    label = link.label ?? link.url
    href = link.url
    target = href.startsWith('http') ? '_blank' : undefined
  }

  const analyticsProps: LinkAnalyticsProps | undefined = link?.analyticsId
    ? { id: link.analyticsId }
    : undefined

  return { children: label, href, target, analyticsProps }
}
