import { BlogPost, Page, PageCategory, Tag, UploadFile, Vzn } from '../../graphql'

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

export type PageMeili = Omit<
  Page,
  '__typename' | 'pageCategory' | 'pageBackgroundImage' | 'parentPage' | 'childPages'
> & {
  pageCategory?: Omit<PageCategory, '__typename' | 'pages'>
  pageBackgroundImage?: UploadFile
}

export type BlogPostMeili = Omit<BlogPost, '__typename' | 'author' | 'tag' | 'coverImage'> & {
  coverImage?: UploadFile
  tag?: Omit<Tag, '__typename' | 'pageCategory' | 'blogPosts'> & {
    pageCategory?: Omit<PageCategory, '__typename' | 'pages'>
  }
}

export type VznMeili = Omit<
  Vzn,
  '__typename' | 'mainDocument' | 'consolidatedText' | 'cancelationDocument' | 'amendmentDocument'
> & {
  mainDocument?: UploadFile
  consolidatedText?: UploadFile
}
