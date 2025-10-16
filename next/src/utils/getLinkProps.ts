import { ReactNode } from 'react'

import { LinkAnalyticsProps } from '@/src/components/common/MLink/MLink'
import {
  CardLinkFragment,
  CommonLinkFragment,
  HeaderLinkFragment,
  HomepageHighlightsItemFragment,
  MenuLinkFragment,
  PageLinkFragment,
  SubnavigationLinkFragment,
} from '@/src/services/graphql'

export type CommonLinkProps = {
  children: ReactNode
  href: string
  target?: '_blank'
  analyticsProps?: LinkAnalyticsProps
}

export const getLinkProps = (
  link:
    | CommonLinkFragment
    | MenuLinkFragment
    | HeaderLinkFragment
    | PageLinkFragment
    | CardLinkFragment
    | SubnavigationLinkFragment
    | HomepageHighlightsItemFragment
    | null
    | undefined,
) => {
  let href = '#'
  let label = link?.label ?? ''
  let target: '_blank' | undefined

  if (!link) {
    return { children: label, href } // TODO?
  }

  // Some content types are not in all strapi link fragments, so we have to check if they exist in the object first
  if ('page' in link && link.page) {
    label = link.label ?? link.page.title
    href = `/${link.page.slug}`
  } else if ('article' in link && link.article) {
    label = link.label ?? link.article.title
    href = `/spravy/${link.article.slug}`
  } else if (link?.url) {
    label = link.label ?? link.url
    target = href.startsWith('http') ? '_blank' : undefined

    // To allow setting url query parameters from strapi we use the url field if it starts with '?'
    if (link?.url?.startsWith('?')) {
      href += link.url
    } else href = link.url
  }

  const analyticsProps: LinkAnalyticsProps | undefined = link?.analyticsId
    ? { id: link.analyticsId }
    : undefined

  return { children: label, href, target, analyticsProps }
}
