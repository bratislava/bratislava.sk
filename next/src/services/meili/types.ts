import {
  Article,
  ArticleCategory,
  ArticleEntity,
  Document,
  DocumentCategory,
  InbaArticle,
  InbaRelease,
  InbaReleaseEntity,
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
  | SearchIndexWrapped<'article', ArticleMeili>
  | SearchIndexWrapped<'regulation', RegulationMeili>

export type PageMeili = Omit<
  Page,
  '__typename' | 'pageCategory' | 'pageBackgroundImage' | 'parentPage' | 'childPages'
> & {
  pageCategory?: Omit<PageCategory, '__typename' | 'pages'>
  pageBackgroundImage?: UploadFile
}

export type ArticleMeili = Pick<ArticleEntity, 'id'> &
  Omit<Article, 'tag' | 'coverMedia' | 'articleCategory'> & {
    coverMedia?: UploadFile
    tag?: Omit<Tag, '__typename' | 'pageCategory' | 'articles'> & {
      pageCategory?: Omit<PageCategory, '__typename' | 'pages'>
    }
    articleCategory?: Omit<ArticleCategory, '__typename' | 'articles'>
  }

export type DocumentMeili = Omit<Document, '__typename' | 'documentCategory' | 'files'> & {
  documentCategory?: Omit<DocumentCategory, '__typename' | 'documents'>
}

export type InbaArticleMeili = Omit<InbaArticle, '__typename' | 'tags' | 'coverImage'> & {
  coverImage?: UploadFile
  inbaTag?: Pick<InbaTag, 'title'>
}

export type InbaReleaseMeili = Pick<InbaReleaseEntity, 'id'> &
  Omit<InbaRelease, '__typename' | 'coverImage' | 'rearImage' | 'inbaArticles' | 'files'> & {
    coverImage?: UploadFile
    rearImage?: UploadFile
  }

export type RegulationMeili = Omit<
  Regulation,
  '__typename' | 'amending' | 'cancellation' | 'effectiveFrom'
> & {
  amending?: RegulationMeili[]
  cancellation?: RegulationMeili
  effectiveFrom?: string
}
