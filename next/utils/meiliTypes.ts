import { BlogPost, Page, PageCategory, Tag, UploadFile } from '../graphql'

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
