import {
  ArticleEntityFragment,
  DocumentEntityFragment,
  InbaReleaseEntityFragment,
  Page,
  PageEntityFragment,
  RegulationEntityFragment,
} from '../graphql'

/**
 * A type that describes an entity wrapped in shared search index.
 * E.g.:
 * {
 *     type: "article",
 *     article: {...}
 * }
 */
export type SearchIndexWrapped<T extends string, K extends object> = {
  [key in T]: K
} & {
  type: T
}

export type MixedResults =
  | SearchIndexWrapped<'page', PageMeili>
  | SearchIndexWrapped<'article', ArticleMeili>
  | SearchIndexWrapped<'regulation', RegulationMeili>

export type PageMeili = PageEntityFragment & Page['publishedAt']

export type ArticleMeili = ArticleEntityFragment

export type DocumentMeili = DocumentEntityFragment

export type InbaReleaseMeili = InbaReleaseEntityFragment

export type RegulationMeili = RegulationEntityFragment
