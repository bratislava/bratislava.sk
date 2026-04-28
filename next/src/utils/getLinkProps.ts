import { i18n } from 'next-i18next'
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

type LinkFragment =
  | CommonLinkFragment
  | MenuLinkFragment
  | HeaderLinkFragment
  | PageLinkFragment
  | CardLinkFragment
  | SubnavigationLinkFragment
  | HomepageHighlightsItemFragment
  | null
  | undefined

const getEntityLinkData = (link: NonNullable<LinkFragment>) => {
  // Some content types are not in all strapi link fragments, so we have to check if they exist in the object first
  if ('page' in link && link.page) {
    return { href: `/${link.page.path}`, label: link.label ?? link.page.title }
  }

  if ('article' in link && link.article) {
    return { href: `/spravy/${link.article.slug}`, label: link.label ?? link.article.title }
  }

  if ('asset' in link && link.asset) {
    return { href: `/dokumenty/${link.asset.slug}`, label: link.label ?? link.asset.title }
  }

  if ('regulation' in link && link.regulation) {
    return {
      href: `/vzn/${link.regulation.slug}`,
      label: link.label ?? link.regulation.titleText ?? `VZN ${link.regulation.slug}`,
    }
  }

  if ('inbaRelease' in link && link.inbaRelease) {
    return {
      label: link.label ?? link.inbaRelease.title,
      href: `/inba/vydania/${link.inbaRelease.slug}`,
    }
  }

  return null
}

export const getLinkProps = (link: LinkFragment) => {
  let href = '#'
  let label = link?.label ?? ''
  let ariaLabel: string | undefined
  let target: '_blank' | undefined

  // To allow setting url query parameters from strapi we use the url field if it starts with '?'
  const queryParams = link?.url?.startsWith('?') ? link.url : ''

  if (!link) {
    return { children: label, href } // TODO?
  }

  const entityLinkData = getEntityLinkData(link)
  if (entityLinkData) {
    href = entityLinkData.href
    label = entityLinkData.label
    ariaLabel = entityLinkData.label
  } else if (link.url && !queryParams) {
    const isExternal = link.url.startsWith('http')
    href = link.url
    label = link.label ?? link.url
    ariaLabel = isExternal ? `${label} - ${i18n?.t('getLinkProps.openInNewTab') ?? ''}` : undefined
    target = isExternal ? '_blank' : undefined
  }

  if (queryParams) href = `${href}${queryParams}`

  const analyticsProps: LinkAnalyticsProps | undefined = link.analyticsId
    ? { id: link.analyticsId }
    : undefined

  return { href, children: label, 'aria-label': ariaLabel, target, analyticsProps }
}
