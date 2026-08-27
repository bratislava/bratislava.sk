import { PageEntityFragment } from '@/src/services/graphql'
import {
  articlesDefaultFilters,
  articlesFetcher,
  ArticlesFilters,
  getArticlesQueryKey,
} from '@/src/services/meili/fetchers/articlesFetcher'
import { isDefined } from '@/src/utils/isDefined'

const extractTagSlugs = (page: PageEntityFragment) => {
  return page.relatedContents?.map((tag) => tag?.slug).filter(isDefined) ?? []
}

const relatedArticlesFilters = (page: PageEntityFragment): ArticlesFilters => ({
  ...articlesDefaultFilters,
  tagSlugs: extractTagSlugs(page),
  pageSize: 9,
})

export const getRelatedArticlesQueryKey = (page: PageEntityFragment, locale: string) =>
  getArticlesQueryKey(relatedArticlesFilters(page), locale)

export const relatedArticlesFetcher = (page: PageEntityFragment, locale: string) => {
  const extractedTagSlugs = extractTagSlugs(page)

  if (extractedTagSlugs.length === 0) {
    return Promise.resolve(null)
  }

  return articlesFetcher(relatedArticlesFilters(page), locale)
}
