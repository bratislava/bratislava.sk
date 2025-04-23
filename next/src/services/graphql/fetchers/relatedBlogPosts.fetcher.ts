import { PageEntityFragment } from '@/src/services/graphql'
import { isDefined } from '@/src/utils/isDefined'
import {
  articlesDefaultFilters,
  articlesFetcher,
  getArticlesQueryKey,
} from '@/src/services/meili/fetchers/articlesFetcher'

const extractTags = (page: PageEntityFragment) => {
  return page.attributes?.relatedContents?.data.map((tag) => tag?.id).filter(isDefined) ?? []
}

const relatedArticlesFilters = (page: PageEntityFragment) => ({
  ...articlesDefaultFilters,
  tagIds: extractTags(page),
  pageSize: 9,
})

export const getRelatedBlogPostsQueryKey = (page: PageEntityFragment, locale: string) =>
  getArticlesQueryKey(relatedArticlesFilters(page), locale)

export const relatedBlogPostsFetcher = (page: PageEntityFragment, locale: string) => {
  const extractedTags = extractTags(page)

  if (!extractedTags.length) {
    return Promise.resolve(null)
  }

  console.log('related Articles filters', relatedArticlesFilters(page))

  return articlesFetcher(relatedArticlesFilters(page), locale)
}
