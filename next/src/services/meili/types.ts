import {
  Article,
  BlogPost,
  InbaArticle,
  InbaTag,
  Page,
  PageCategory,
  Regulation,
  Tag,
  UploadFile,
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

// Meilisearch doesn't nest entities in `data.attributes`, therefore in order to use Strapi types we need to `Omit` those
// attributes that are nested and replace them with their direct representations.

export type MixedResults =
  | SearchIndexWrapped<'page', PageMeili>
  | SearchIndexWrapped<'blog-post', InbaArticleMeili>
  | SearchIndexWrapped<'regulation', RegulationMeili>

export type PageMeili = Omit<
  Page,
  '__typename' | 'pageCategory' | 'pageBackgroundImage' | 'parentPage' | 'childPages'
> & {
  pageCategory?: Omit<PageCategory, '__typename' | 'pages'>
  pageBackgroundImage?: UploadFile
}

export type ArticleMeili = Omit<Article, '__typename' | 'tag' | 'coverMedia'> & {
  coverMedia?: UploadFile
  tags?: Array<
    Omit<Tag, '__typename' | 'pageCategory' | 'blogPosts' | 'articles'> & {
      pageCategory?: Omit<PageCategory, '__typename' | 'pages'>
    }
  >
}

export type BlogPostMeili = Omit<BlogPost, '__typename' | 'tag' | 'coverImage'> & {
  coverImage?: UploadFile
  tag?: Omit<Tag, '__typename' | 'pageCategory' | 'blogPosts' | 'articles'> & {
    pageCategory?: Omit<PageCategory, '__typename' | 'pages'>
  }
}

export type InbaArticleMeili = Omit<InbaArticle, '__typename' | 'tags' | 'coverImage'> & {
  coverImage?: UploadFile
  inbaTag?: Pick<InbaTag, 'title'>
}

export type RegulationMeili = Omit<
  Regulation,
  '__typename' | 'amending' | 'cancellation' | 'effectiveFrom'
> & {
  amending?: RegulationMeili[]
  cancellation?: RegulationMeili
  effectiveFrom?: string
}
