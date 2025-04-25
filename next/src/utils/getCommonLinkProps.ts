import { ReactNode } from 'react'

import { LinkAnalyticsProps } from '@/src/components/common/MLink/MLink'
import { CommonLinkFragment } from '@/src/services/graphql'

export type CommonLinkProps = {
  children: ReactNode
  href: string
  target?: '_blank'
  analyticsProps?: LinkAnalyticsProps
}

export const getCommonLinkProps = (link: CommonLinkFragment | null | undefined) => {
  let href = '#'
  let target: '_blank' | undefined

  if (link?.page?.data?.attributes?.slug) {
    href = `/${link.page.data.attributes.slug}`
  } else if (link?.article?.data?.attributes?.slug) {
    href = `/spravy/${link.article.data.attributes.slug}`
  } else if (link?.url) {
    href = link.url
    target = '_blank'
  }

  const analyticsProps: LinkAnalyticsProps | undefined = link?.analyticsId
    ? { id: link.analyticsId }
    : undefined

  return { children: link?.label ?? null, href, target, analyticsProps }
}
