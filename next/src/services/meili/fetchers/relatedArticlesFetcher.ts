import { PageEntityFragment } from '@/src/services/graphql'
import {
  articlesDefaultFilters,
  articlesFetcher,
  getArticlesQueryKey,
} from '@/src/services/meili/fetchers/articlesFetcher'
import { isDefined } from '@/src/utils/isDefined'

const extractTags = (page: PageEntityFragment) => {
  return page.relatedContents?.map((tag) => tag?.documentId).filter(isDefined) ?? []
}

const relatedArticlesFilters = (page: PageEntityFragment) => ({
  ...articlesDefaultFilters,
  tagIds: extractTags(page),
  pageSize: 9,
})

export const getRelatedArticlesQueryKey = (page: PageEntityFragment, locale: string) =>
  getArticlesQueryKey(relatedArticlesFilters(page), locale)

export const relatedArticlesFetcher = (page: PageEntityFragment, locale: string) => {
  const extractedTags = extractTags(page)

  if (extractedTags.length === 0) {
    return Promise.resolve(null)
  }

  return articlesFetcher(relatedArticlesFilters(page), locale)
}
