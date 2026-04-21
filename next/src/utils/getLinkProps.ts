import { i18n } from 'next-i18next'
import { createElement, Fragment, ReactNode } from 'react'

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
  let label: ReactNode = link?.label ?? ''
  let target: '_blank' | undefined

  // To allow setting url query parameters from strapi we use the url field if it starts with '?'
  const queryParams = link?.url?.startsWith('?') ? link.url : ''

  if (!link) {
    return { children: label, href } // TODO?
  }

  // Some content types are not in all strapi link fragments, so we have to check if they exist in the object first
  if ('page' in link && link.page) {
    label = link.label ?? link.page.title
    href = `/${link.page.path}`
  } else if ('article' in link && link.article) {
    label = link.label ?? link.article.title
    href = `/spravy/${link.article.slug}`
  } else if (link.url && !queryParams) {
    target = link.url.startsWith('http') ? '_blank' : undefined
    const urlLabel = link.label ?? link.url
    label = target
      ? createElement(
          Fragment,
          null,
          urlLabel,
          ' ',
          // Screen reader only text for the open in new tab icon
          createElement(
            'span',
            { className: 'sr-only' },
            `- ${i18n?.t('Link.openInNewTab') ?? ''}`,
          ),
        )
      : urlLabel
    href = link.url
  }

  if (queryParams) href = `${href}${queryParams}`

  const analyticsProps: LinkAnalyticsProps | undefined = link.analyticsId
    ? { id: link.analyticsId }
    : undefined

  return { children: label, href, target, analyticsProps }
}
