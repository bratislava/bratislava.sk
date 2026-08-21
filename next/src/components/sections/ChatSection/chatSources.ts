export type ChatSource = {
  id: string
  type: string
  title: string
  href: string | null
}

type SourceDocument = {
  _meilisearch_id?: string
  type?: string
  [key: string]: unknown
}

/**
 * The documents in the shared search index are wrapped - see `wrapSearchIndexEntry` in the Strapi Meilisearch config.
 * Types that don't have a detail page (faq) are displayed without a link.
 */
const getTitleAndHref = (type: string, data: Record<string, any>) => {
  switch (type) {
    case 'page': {
      return { title: data.title, href: data.path ? `/${data.path}` : null }
    }
    case 'article': {
      return { title: data.title, href: data.slug ? `/spravy/${data.slug}` : null }
    }
    case 'asset': {
      return { title: data.title, href: data.slug ? `/dokumenty/${data.slug}` : null }
    }
    case 'urban-study': {
      return { title: data.title, href: data.slug ? `/uzemne-studie/${data.slug}` : null }
    }
    case 'regulation': {
      return {
        title: data.titleText ?? data.fullTitle ?? `VZN ${data.regNumber}`,
        href: data.slug ? `/vzn/${data.slug}` : null,
      }
    }
    case 'inba-release': {
      return { title: data.title, href: data.slug ? `/inba/vydania/${data.slug}` : null }
    }
    case 'faq': {
      return { title: data.title, href: null }
    }
    default: {
      return { title: data.title, href: null }
    }
  }
}

export const parseChatSources = (rawSources: unknown): ChatSource[] => {
  if (!Array.isArray(rawSources)) {
    return []
  }

  return rawSources
    .map((document_: SourceDocument, index) => {
      const { type } = document_
      if (!type) {
        return null
      }

      const data = document_[type] as Record<string, any> | undefined
      if (!data) {
        return null
      }

      const { title, href } = getTitleAndHref(type, data)
      if (typeof title !== 'string' || title.length === 0) {
        return null
      }

      // eslint-disable-next-line no-underscore-dangle
      const id = document_._meilisearch_id ?? `${type}-${index}`

      return { id, type, title, href }
    })
    .filter((source): source is ChatSource => source !== null)
}
