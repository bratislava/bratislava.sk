import { GraphQLClient, RequestOptions } from 'graphql-request'
import gql from 'graphql-tag'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never
}
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders']
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: { input: any; output: any }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any }
  /** A string used to identify an i18n locale */
  I18NLocaleCode: { input: any; output: any }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any }
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  Long: { input: any; output: any }
  PagePageHeaderSectionsDynamicZoneInput: { input: any; output: any }
  PageSectionsDynamicZoneInput: { input: any; output: any }
  PageSidebarDynamicZoneInput: { input: any; output: any }
  /** A time string with format HH:mm:ss.SSS */
  Time: { input: any; output: any }
}

export type AdminGroup = {
  __typename?: 'AdminGroup'
  adminGroupId?: Maybe<Scalars['String']['output']>
  articles: Array<Maybe<Article>>
  articles_connection?: Maybe<ArticleRelationResponseCollection>
  assets: Array<Maybe<Asset>>
  assets_connection?: Maybe<AssetRelationResponseCollection>
  contentManagedBy: Scalars['String']['output']
  createdAt?: Maybe<Scalars['DateTime']['output']>
  documentId: Scalars['ID']['output']
  documents: Array<Maybe<Document>>
  documents_connection?: Maybe<DocumentRelationResponseCollection>
  faqs: Array<Maybe<Faq>>
  faqs_connection?: Maybe<FaqRelationResponseCollection>
  landingPage?: Maybe<Page>
  pages: Array<Maybe<Page>>
  pages_connection?: Maybe<PageRelationResponseCollection>
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  slug: Scalars['String']['output']
  submenuPages?: Maybe<Array<Maybe<ComponentBlocksPageLink>>>
  title: Scalars['String']['output']
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type AdminGroupArticlesArgs = {
  filters?: InputMaybe<ArticleFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type AdminGroupArticles_ConnectionArgs = {
  filters?: InputMaybe<ArticleFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type AdminGroupAssetsArgs = {
  filters?: InputMaybe<AssetFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type AdminGroupAssets_ConnectionArgs = {
  filters?: InputMaybe<AssetFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type AdminGroupDocumentsArgs = {
  filters?: InputMaybe<DocumentFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type AdminGroupDocuments_ConnectionArgs = {
  filters?: InputMaybe<DocumentFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type AdminGroupFaqsArgs = {
  filters?: InputMaybe<FaqFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type AdminGroupFaqs_ConnectionArgs = {
  filters?: InputMaybe<FaqFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type AdminGroupPagesArgs = {
  filters?: InputMaybe<PageFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type AdminGroupPages_ConnectionArgs = {
  filters?: InputMaybe<PageFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type AdminGroupSubmenuPagesArgs = {
  filters?: InputMaybe<ComponentBlocksPageLinkFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type AdminGroupEntity = {
  __typename?: 'AdminGroupEntity'
  attributes?: Maybe<AdminGroup>
  id?: Maybe<Scalars['ID']['output']>
}

export type AdminGroupEntityResponse = {
  __typename?: 'AdminGroupEntityResponse'
  data?: Maybe<AdminGroup>
}

export type AdminGroupEntityResponseCollection = {
  __typename?: 'AdminGroupEntityResponseCollection'
  nodes: Array<AdminGroup>
  pageInfo: Pagination
}

export type AdminGroupFiltersInput = {
  adminGroupId?: InputMaybe<StringFilterInput>
  and?: InputMaybe<Array<InputMaybe<AdminGroupFiltersInput>>>
  articles?: InputMaybe<ArticleFiltersInput>
  assets?: InputMaybe<AssetFiltersInput>
  contentManagedBy?: InputMaybe<StringFilterInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  documentId?: InputMaybe<IdFilterInput>
  documents?: InputMaybe<DocumentFiltersInput>
  faqs?: InputMaybe<FaqFiltersInput>
  landingPage?: InputMaybe<PageFiltersInput>
  not?: InputMaybe<AdminGroupFiltersInput>
  or?: InputMaybe<Array<InputMaybe<AdminGroupFiltersInput>>>
  pages?: InputMaybe<PageFiltersInput>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  slug?: InputMaybe<StringFilterInput>
  submenuPages?: InputMaybe<ComponentBlocksPageLinkFiltersInput>
  title?: InputMaybe<StringFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type AdminGroupInput = {
  adminGroupId?: InputMaybe<Scalars['String']['input']>
  articles?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  assets?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  contentManagedBy?: InputMaybe<Scalars['String']['input']>
  documents?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  faqs?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  landingPage?: InputMaybe<Scalars['ID']['input']>
  pages?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
  slug?: InputMaybe<Scalars['String']['input']>
  submenuPages?: InputMaybe<Array<InputMaybe<ComponentBlocksPageLinkInput>>>
  title?: InputMaybe<Scalars['String']['input']>
}

export type AdminGroupRelationResponseCollection = {
  __typename?: 'AdminGroupRelationResponseCollection'
  nodes: Array<AdminGroup>
}

export type Alert = {
  __typename?: 'Alert'
  createdAt?: Maybe<Scalars['DateTime']['output']>
  documentId: Scalars['ID']['output']
  locale?: Maybe<Scalars['String']['output']>
  localizations: Array<Maybe<Alert>>
  localizations_connection?: Maybe<AlertRelationResponseCollection>
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  text?: Maybe<Scalars['String']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type AlertEntity = {
  __typename?: 'AlertEntity'
  attributes?: Maybe<Alert>
  id?: Maybe<Scalars['ID']['output']>
}

export type AlertEntityResponse = {
  __typename?: 'AlertEntityResponse'
  data?: Maybe<Alert>
}

export type AlertEntityResponseCollection = {
  __typename?: 'AlertEntityResponseCollection'
  nodes: Array<Alert>
  pageInfo: Pagination
}

export type AlertFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<AlertFiltersInput>>>
  createdAt?: InputMaybe<DateTimeFilterInput>
  locale?: InputMaybe<StringFilterInput>
  localizations?: InputMaybe<AlertFiltersInput>
  not?: InputMaybe<AlertFiltersInput>
  or?: InputMaybe<Array<InputMaybe<AlertFiltersInput>>>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  text?: InputMaybe<StringFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type AlertInput = {
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
  text?: InputMaybe<Scalars['String']['input']>
}

export type AlertRelationResponseCollection = {
  __typename?: 'AlertRelationResponseCollection'
  nodes: Array<Alert>
}

export type Article = {
  __typename?: 'Article'
  addedAt: Scalars['DateTime']['output']
  adminGroups: Array<Maybe<AdminGroup>>
  adminGroups_connection?: Maybe<AdminGroupRelationResponseCollection>
  alias?: Maybe<Scalars['String']['output']>
  articleCategory?: Maybe<ArticleCategory>
  content?: Maybe<Scalars['String']['output']>
  coverMedia?: Maybe<UploadFile>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  documentId: Scalars['ID']['output']
  files?: Maybe<Array<Maybe<ComponentBlocksFile>>>
  gallery: Array<Maybe<UploadFile>>
  gallery_connection?: Maybe<UploadFileRelationResponseCollection>
  inbaRelease?: Maybe<InbaRelease>
  locale?: Maybe<Scalars['String']['output']>
  localizations: Array<Maybe<Article>>
  localizations_connection?: Maybe<ArticleRelationResponseCollection>
  perex?: Maybe<Scalars['String']['output']>
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  slug: Scalars['String']['output']
  tags: Array<Maybe<Tag>>
  tags_connection?: Maybe<TagRelationResponseCollection>
  title: Scalars['String']['output']
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type ArticleAdminGroupsArgs = {
  filters?: InputMaybe<AdminGroupFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ArticleAdminGroups_ConnectionArgs = {
  filters?: InputMaybe<AdminGroupFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ArticleFilesArgs = {
  filters?: InputMaybe<ComponentBlocksFileFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ArticleGalleryArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ArticleGallery_ConnectionArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ArticleLocalizationsArgs = {
  filters?: InputMaybe<ArticleFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ArticleLocalizations_ConnectionArgs = {
  filters?: InputMaybe<ArticleFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ArticleTagsArgs = {
  filters?: InputMaybe<TagFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ArticleTags_ConnectionArgs = {
  filters?: InputMaybe<TagFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ArticleCategory = {
  __typename?: 'ArticleCategory'
  articles: Array<Maybe<Article>>
  articles_connection?: Maybe<ArticleRelationResponseCollection>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  documentId: Scalars['ID']['output']
  locale?: Maybe<Scalars['String']['output']>
  localizations: Array<Maybe<ArticleCategory>>
  localizations_connection?: Maybe<ArticleCategoryRelationResponseCollection>
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  slug: Scalars['String']['output']
  title: Scalars['String']['output']
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type ArticleCategoryArticlesArgs = {
  filters?: InputMaybe<ArticleFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ArticleCategoryArticles_ConnectionArgs = {
  filters?: InputMaybe<ArticleFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ArticleCategoryLocalizationsArgs = {
  filters?: InputMaybe<ArticleCategoryFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ArticleCategoryLocalizations_ConnectionArgs = {
  filters?: InputMaybe<ArticleCategoryFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ArticleCategoryEntity = {
  __typename?: 'ArticleCategoryEntity'
  attributes?: Maybe<ArticleCategory>
  id?: Maybe<Scalars['ID']['output']>
}

export type ArticleCategoryEntityResponse = {
  __typename?: 'ArticleCategoryEntityResponse'
  data?: Maybe<ArticleCategory>
}

export type ArticleCategoryEntityResponseCollection = {
  __typename?: 'ArticleCategoryEntityResponseCollection'
  nodes: Array<ArticleCategory>
  pageInfo: Pagination
}

export type ArticleCategoryFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ArticleCategoryFiltersInput>>>
  articles?: InputMaybe<ArticleFiltersInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  documentId?: InputMaybe<IdFilterInput>
  locale?: InputMaybe<StringFilterInput>
  localizations?: InputMaybe<ArticleCategoryFiltersInput>
  not?: InputMaybe<ArticleCategoryFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ArticleCategoryFiltersInput>>>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  slug?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type ArticleCategoryInput = {
  articles?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
  slug?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type ArticleCategoryRelationResponseCollection = {
  __typename?: 'ArticleCategoryRelationResponseCollection'
  nodes: Array<ArticleCategory>
}

export type ArticleEntity = {
  __typename?: 'ArticleEntity'
  attributes?: Maybe<Article>
  id?: Maybe<Scalars['ID']['output']>
}

export type ArticleEntityResponse = {
  __typename?: 'ArticleEntityResponse'
  data?: Maybe<Article>
}

export type ArticleEntityResponseCollection = {
  __typename?: 'ArticleEntityResponseCollection'
  nodes: Array<Article>
  pageInfo: Pagination
}

export type ArticleFiltersInput = {
  addedAt?: InputMaybe<DateTimeFilterInput>
  adminGroups?: InputMaybe<AdminGroupFiltersInput>
  alias?: InputMaybe<StringFilterInput>
  and?: InputMaybe<Array<InputMaybe<ArticleFiltersInput>>>
  articleCategory?: InputMaybe<ArticleCategoryFiltersInput>
  content?: InputMaybe<StringFilterInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  documentId?: InputMaybe<IdFilterInput>
  files?: InputMaybe<ComponentBlocksFileFiltersInput>
  inbaRelease?: InputMaybe<InbaReleaseFiltersInput>
  locale?: InputMaybe<StringFilterInput>
  localizations?: InputMaybe<ArticleFiltersInput>
  not?: InputMaybe<ArticleFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ArticleFiltersInput>>>
  perex?: InputMaybe<StringFilterInput>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  slug?: InputMaybe<StringFilterInput>
  tags?: InputMaybe<TagFiltersInput>
  title?: InputMaybe<StringFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type ArticleInput = {
  addedAt?: InputMaybe<Scalars['DateTime']['input']>
  adminGroups?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  alias?: InputMaybe<Scalars['String']['input']>
  articleCategory?: InputMaybe<Scalars['ID']['input']>
  content?: InputMaybe<Scalars['String']['input']>
  coverMedia?: InputMaybe<Scalars['ID']['input']>
  files?: InputMaybe<Array<InputMaybe<ComponentBlocksFileInput>>>
  gallery?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  inbaRelease?: InputMaybe<Scalars['ID']['input']>
  perex?: InputMaybe<Scalars['String']['input']>
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
  slug?: InputMaybe<Scalars['String']['input']>
  tags?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  title?: InputMaybe<Scalars['String']['input']>
}

export type ArticleRelationResponseCollection = {
  __typename?: 'ArticleRelationResponseCollection'
  nodes: Array<Article>
}

export type Asset = {
  __typename?: 'Asset'
  adminGroups: Array<Maybe<AdminGroup>>
  adminGroups_connection?: Maybe<AdminGroupRelationResponseCollection>
  assetCategory?: Maybe<AssetCategory>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  description?: Maybe<Scalars['String']['output']>
  documentId: Scalars['ID']['output']
  files: Array<Maybe<UploadFile>>
  files_connection: UploadFileRelationResponseCollection
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  slug: Scalars['String']['output']
  title: Scalars['String']['output']
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type AssetAdminGroupsArgs = {
  filters?: InputMaybe<AdminGroupFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type AssetAdminGroups_ConnectionArgs = {
  filters?: InputMaybe<AdminGroupFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type AssetFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type AssetFiles_ConnectionArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type AssetCategory = {
  __typename?: 'AssetCategory'
  assets: Array<Maybe<Asset>>
  assets_connection?: Maybe<AssetRelationResponseCollection>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  documentId: Scalars['ID']['output']
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  slug: Scalars['String']['output']
  title: Scalars['String']['output']
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type AssetCategoryAssetsArgs = {
  filters?: InputMaybe<AssetFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type AssetCategoryAssets_ConnectionArgs = {
  filters?: InputMaybe<AssetFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type AssetCategoryEntity = {
  __typename?: 'AssetCategoryEntity'
  attributes?: Maybe<AssetCategory>
  id?: Maybe<Scalars['ID']['output']>
}

export type AssetCategoryEntityResponse = {
  __typename?: 'AssetCategoryEntityResponse'
  data?: Maybe<AssetCategory>
}

export type AssetCategoryEntityResponseCollection = {
  __typename?: 'AssetCategoryEntityResponseCollection'
  nodes: Array<AssetCategory>
  pageInfo: Pagination
}

export type AssetCategoryFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<AssetCategoryFiltersInput>>>
  assets?: InputMaybe<AssetFiltersInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  documentId?: InputMaybe<IdFilterInput>
  not?: InputMaybe<AssetCategoryFiltersInput>
  or?: InputMaybe<Array<InputMaybe<AssetCategoryFiltersInput>>>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  slug?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type AssetCategoryInput = {
  assets?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
  slug?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type AssetCategoryRelationResponseCollection = {
  __typename?: 'AssetCategoryRelationResponseCollection'
  nodes: Array<AssetCategory>
}

export type AssetEntity = {
  __typename?: 'AssetEntity'
  attributes?: Maybe<Asset>
  id?: Maybe<Scalars['ID']['output']>
}

export type AssetEntityResponse = {
  __typename?: 'AssetEntityResponse'
  data?: Maybe<Asset>
}

export type AssetEntityResponseCollection = {
  __typename?: 'AssetEntityResponseCollection'
  nodes: Array<Asset>
  pageInfo: Pagination
}

export type AssetFiltersInput = {
  adminGroups?: InputMaybe<AdminGroupFiltersInput>
  and?: InputMaybe<Array<InputMaybe<AssetFiltersInput>>>
  assetCategory?: InputMaybe<AssetCategoryFiltersInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  description?: InputMaybe<StringFilterInput>
  documentId?: InputMaybe<IdFilterInput>
  not?: InputMaybe<AssetFiltersInput>
  or?: InputMaybe<Array<InputMaybe<AssetFiltersInput>>>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  slug?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type AssetInput = {
  adminGroups?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  assetCategory?: InputMaybe<Scalars['ID']['input']>
  description?: InputMaybe<Scalars['String']['input']>
  files?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
  slug?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type AssetRelationResponseCollection = {
  __typename?: 'AssetRelationResponseCollection'
  nodes: Array<Asset>
}

export type BooleanFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>
  between?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>
  contains?: InputMaybe<Scalars['Boolean']['input']>
  containsi?: InputMaybe<Scalars['Boolean']['input']>
  endsWith?: InputMaybe<Scalars['Boolean']['input']>
  eq?: InputMaybe<Scalars['Boolean']['input']>
  eqi?: InputMaybe<Scalars['Boolean']['input']>
  gt?: InputMaybe<Scalars['Boolean']['input']>
  gte?: InputMaybe<Scalars['Boolean']['input']>
  in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>
  lt?: InputMaybe<Scalars['Boolean']['input']>
  lte?: InputMaybe<Scalars['Boolean']['input']>
  ne?: InputMaybe<Scalars['Boolean']['input']>
  nei?: InputMaybe<Scalars['Boolean']['input']>
  not?: InputMaybe<BooleanFilterInput>
  notContains?: InputMaybe<Scalars['Boolean']['input']>
  notContainsi?: InputMaybe<Scalars['Boolean']['input']>
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>
  notNull?: InputMaybe<Scalars['Boolean']['input']>
  null?: InputMaybe<Scalars['Boolean']['input']>
  or?: InputMaybe<Array<InputMaybe<Scalars['Boolean']['input']>>>
  startsWith?: InputMaybe<Scalars['Boolean']['input']>
}

export type ComponentAccordionItemsFlatText = {
  __typename?: 'ComponentAccordionItemsFlatText'
  category?: Maybe<Scalars['String']['output']>
  content?: Maybe<Scalars['String']['output']>
  fileList?: Maybe<Array<Maybe<ComponentBlocksFileItem>>>
  id: Scalars['ID']['output']
  moreLinkPage?: Maybe<Page>
  moreLinkTitle?: Maybe<Scalars['String']['output']>
  moreLinkUrl?: Maybe<Scalars['String']['output']>
}

export type ComponentAccordionItemsFlatTextFileListArgs = {
  filters?: InputMaybe<ComponentBlocksFileItemFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentAccordionItemsFlatTextFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentAccordionItemsFlatTextFiltersInput>>>
  category?: InputMaybe<StringFilterInput>
  content?: InputMaybe<StringFilterInput>
  fileList?: InputMaybe<ComponentBlocksFileItemFiltersInput>
  moreLinkPage?: InputMaybe<PageFiltersInput>
  moreLinkTitle?: InputMaybe<StringFilterInput>
  moreLinkUrl?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentAccordionItemsFlatTextFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentAccordionItemsFlatTextFiltersInput>>>
}

export type ComponentAccordionItemsFlatTextInput = {
  category?: InputMaybe<Scalars['String']['input']>
  content?: InputMaybe<Scalars['String']['input']>
  fileList?: InputMaybe<Array<InputMaybe<ComponentBlocksFileItemInput>>>
  id?: InputMaybe<Scalars['ID']['input']>
  moreLinkPage?: InputMaybe<Scalars['ID']['input']>
  moreLinkTitle?: InputMaybe<Scalars['String']['input']>
  moreLinkUrl?: InputMaybe<Scalars['String']['input']>
}

export type ComponentAccordionItemsInstitution = {
  __typename?: 'ComponentAccordionItemsInstitution'
  category?: Maybe<Scalars['String']['output']>
  firstColumn?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  secondColumn?: Maybe<Scalars['String']['output']>
  subtitle?: Maybe<Scalars['String']['output']>
  thirdColumn?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
  url?: Maybe<Scalars['String']['output']>
  urlLabel?: Maybe<Scalars['String']['output']>
}

export type ComponentAccordionItemsInstitutionFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentAccordionItemsInstitutionFiltersInput>>>
  category?: InputMaybe<StringFilterInput>
  firstColumn?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentAccordionItemsInstitutionFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentAccordionItemsInstitutionFiltersInput>>>
  secondColumn?: InputMaybe<StringFilterInput>
  subtitle?: InputMaybe<StringFilterInput>
  thirdColumn?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
  url?: InputMaybe<StringFilterInput>
  urlLabel?: InputMaybe<StringFilterInput>
}

export type ComponentAccordionItemsInstitutionInput = {
  category?: InputMaybe<Scalars['String']['input']>
  firstColumn?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  secondColumn?: InputMaybe<Scalars['String']['input']>
  subtitle?: InputMaybe<Scalars['String']['input']>
  thirdColumn?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
  url?: InputMaybe<Scalars['String']['input']>
  urlLabel?: InputMaybe<Scalars['String']['input']>
}

export type ComponentBlocksCardLink = {
  __typename?: 'ComponentBlocksCardLink'
  analyticsId?: Maybe<Scalars['String']['output']>
  article?: Maybe<Article>
  id: Scalars['ID']['output']
  label?: Maybe<Scalars['String']['output']>
  media?: Maybe<UploadFile>
  page?: Maybe<Page>
  subtext?: Maybe<Scalars['String']['output']>
  url?: Maybe<Scalars['String']['output']>
}

export type ComponentBlocksCardLinkFiltersInput = {
  analyticsId?: InputMaybe<StringFilterInput>
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksCardLinkFiltersInput>>>
  article?: InputMaybe<ArticleFiltersInput>
  label?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentBlocksCardLinkFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksCardLinkFiltersInput>>>
  page?: InputMaybe<PageFiltersInput>
  subtext?: InputMaybe<StringFilterInput>
  url?: InputMaybe<StringFilterInput>
}

export type ComponentBlocksCardLinkInput = {
  analyticsId?: InputMaybe<Scalars['String']['input']>
  article?: InputMaybe<Scalars['ID']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  label?: InputMaybe<Scalars['String']['input']>
  media?: InputMaybe<Scalars['ID']['input']>
  page?: InputMaybe<Scalars['ID']['input']>
  subtext?: InputMaybe<Scalars['String']['input']>
  url?: InputMaybe<Scalars['String']['input']>
}

export type ComponentBlocksColumnsItem = {
  __typename?: 'ComponentBlocksColumnsItem'
  id: Scalars['ID']['output']
  image?: Maybe<UploadFile>
  text?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
}

export type ComponentBlocksColumnsItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksColumnsItemFiltersInput>>>
  not?: InputMaybe<ComponentBlocksColumnsItemFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksColumnsItemFiltersInput>>>
  text?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
}

export type ComponentBlocksColumnsItemInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  image?: InputMaybe<Scalars['ID']['input']>
  text?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type ComponentBlocksColumnsListItem = {
  __typename?: 'ComponentBlocksColumnsListItem'
  content?: Maybe<Scalars['String']['output']>
  icon?: Maybe<UploadFile>
  id: Scalars['ID']['output']
}

export type ComponentBlocksColumnsListItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksColumnsListItemFiltersInput>>>
  content?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentBlocksColumnsListItemFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksColumnsListItemFiltersInput>>>
}

export type ComponentBlocksColumnsListItemInput = {
  content?: InputMaybe<Scalars['String']['input']>
  icon?: InputMaybe<Scalars['ID']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
}

export type ComponentBlocksCommonLink = {
  __typename?: 'ComponentBlocksCommonLink'
  analyticsId?: Maybe<Scalars['String']['output']>
  article?: Maybe<Article>
  id: Scalars['ID']['output']
  label?: Maybe<Scalars['String']['output']>
  page?: Maybe<Page>
  url?: Maybe<Scalars['String']['output']>
}

export type ComponentBlocksCommonLinkFiltersInput = {
  analyticsId?: InputMaybe<StringFilterInput>
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksCommonLinkFiltersInput>>>
  article?: InputMaybe<ArticleFiltersInput>
  label?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentBlocksCommonLinkFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksCommonLinkFiltersInput>>>
  page?: InputMaybe<PageFiltersInput>
  url?: InputMaybe<StringFilterInput>
}

export type ComponentBlocksCommonLinkInput = {
  analyticsId?: InputMaybe<Scalars['String']['input']>
  article?: InputMaybe<Scalars['ID']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  label?: InputMaybe<Scalars['String']['input']>
  page?: InputMaybe<Scalars['ID']['input']>
  url?: InputMaybe<Scalars['String']['input']>
}

export type ComponentBlocksComparisonCard = {
  __typename?: 'ComponentBlocksComparisonCard'
  iconMedia?: Maybe<UploadFile>
  id: Scalars['ID']['output']
  items: Array<Maybe<ComponentBlocksComparisonItem>>
  title: Scalars['String']['output']
}

export type ComponentBlocksComparisonCardItemsArgs = {
  filters?: InputMaybe<ComponentBlocksComparisonItemFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentBlocksComparisonCardFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksComparisonCardFiltersInput>>>
  items?: InputMaybe<ComponentBlocksComparisonItemFiltersInput>
  not?: InputMaybe<ComponentBlocksComparisonCardFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksComparisonCardFiltersInput>>>
  title?: InputMaybe<StringFilterInput>
}

export type ComponentBlocksComparisonCardInput = {
  iconMedia?: InputMaybe<Scalars['ID']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  items?: InputMaybe<Array<InputMaybe<ComponentBlocksComparisonItemInput>>>
  title?: InputMaybe<Scalars['String']['input']>
}

export type ComponentBlocksComparisonItem = {
  __typename?: 'ComponentBlocksComparisonItem'
  id: Scalars['ID']['output']
  label: Scalars['String']['output']
}

export type ComponentBlocksComparisonItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksComparisonItemFiltersInput>>>
  label?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentBlocksComparisonItemFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksComparisonItemFiltersInput>>>
}

export type ComponentBlocksComparisonItemInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  label?: InputMaybe<Scalars['String']['input']>
}

export type ComponentBlocksContactCard = {
  __typename?: 'ComponentBlocksContactCard'
  id: Scalars['ID']['output']
  overrideLabel?: Maybe<Scalars['String']['output']>
  value: Scalars['String']['output']
}

export type ComponentBlocksContactCardFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksContactCardFiltersInput>>>
  not?: InputMaybe<ComponentBlocksContactCardFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksContactCardFiltersInput>>>
  overrideLabel?: InputMaybe<StringFilterInput>
  value?: InputMaybe<StringFilterInput>
}

export type ComponentBlocksContactCardInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  overrideLabel?: InputMaybe<Scalars['String']['input']>
  value?: InputMaybe<Scalars['String']['input']>
}

export type ComponentBlocksContactDirectionsCard = {
  __typename?: 'ComponentBlocksContactDirectionsCard'
  address: Scalars['String']['output']
  barrierFreeInfo?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  iframeUrl?: Maybe<Scalars['String']['output']>
  overrideLabel?: Maybe<Scalars['String']['output']>
  parkingInfo?: Maybe<Scalars['String']['output']>
  publicTransportInfo?: Maybe<Scalars['String']['output']>
}

export type ComponentBlocksContactDirectionsCardFiltersInput = {
  address?: InputMaybe<StringFilterInput>
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksContactDirectionsCardFiltersInput>>>
  barrierFreeInfo?: InputMaybe<StringFilterInput>
  iframeUrl?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentBlocksContactDirectionsCardFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksContactDirectionsCardFiltersInput>>>
  overrideLabel?: InputMaybe<StringFilterInput>
  parkingInfo?: InputMaybe<StringFilterInput>
  publicTransportInfo?: InputMaybe<StringFilterInput>
}

export type ComponentBlocksContactDirectionsCardInput = {
  address?: InputMaybe<Scalars['String']['input']>
  barrierFreeInfo?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  iframeUrl?: InputMaybe<Scalars['String']['input']>
  overrideLabel?: InputMaybe<Scalars['String']['input']>
  parkingInfo?: InputMaybe<Scalars['String']['input']>
  publicTransportInfo?: InputMaybe<Scalars['String']['input']>
}

export type ComponentBlocksContactPersonCard = {
  __typename?: 'ComponentBlocksContactPersonCard'
  email?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  phone?: Maybe<Scalars['String']['output']>
  subtext?: Maybe<Scalars['String']['output']>
  title: Scalars['String']['output']
}

export type ComponentBlocksContactPersonCardFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksContactPersonCardFiltersInput>>>
  email?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentBlocksContactPersonCardFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksContactPersonCardFiltersInput>>>
  phone?: InputMaybe<StringFilterInput>
  subtext?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
}

export type ComponentBlocksContactPersonCardInput = {
  email?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  phone?: InputMaybe<Scalars['String']['input']>
  subtext?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type ComponentBlocksFile = {
  __typename?: 'ComponentBlocksFile'
  id: Scalars['ID']['output']
  media?: Maybe<UploadFile>
  title?: Maybe<Scalars['String']['output']>
}

export type ComponentBlocksFileFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksFileFiltersInput>>>
  not?: InputMaybe<ComponentBlocksFileFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksFileFiltersInput>>>
  title?: InputMaybe<StringFilterInput>
}

export type ComponentBlocksFileInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  media?: InputMaybe<Scalars['ID']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type ComponentBlocksFileItem = {
  __typename?: 'ComponentBlocksFileItem'
  id: Scalars['ID']['output']
  media: UploadFile
  title?: Maybe<Scalars['String']['output']>
}

export type ComponentBlocksFileItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksFileItemFiltersInput>>>
  not?: InputMaybe<ComponentBlocksFileItemFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksFileItemFiltersInput>>>
  title?: InputMaybe<StringFilterInput>
}

export type ComponentBlocksFileItemInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  media?: InputMaybe<Scalars['ID']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type ComponentBlocksFooterColumn = {
  __typename?: 'ComponentBlocksFooterColumn'
  id: Scalars['ID']['output']
  links?: Maybe<Array<Maybe<ComponentBlocksCommonLink>>>
  title: Scalars['String']['output']
}

export type ComponentBlocksFooterColumnLinksArgs = {
  filters?: InputMaybe<ComponentBlocksCommonLinkFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentBlocksFooterColumnFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksFooterColumnFiltersInput>>>
  links?: InputMaybe<ComponentBlocksCommonLinkFiltersInput>
  not?: InputMaybe<ComponentBlocksFooterColumnFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksFooterColumnFiltersInput>>>
  title?: InputMaybe<StringFilterInput>
}

export type ComponentBlocksFooterColumnInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  links?: InputMaybe<Array<InputMaybe<ComponentBlocksCommonLinkInput>>>
  title?: InputMaybe<Scalars['String']['input']>
}

export type ComponentBlocksHomepageHighlightsItem = {
  __typename?: 'ComponentBlocksHomepageHighlightsItem'
  analyticsId?: Maybe<Scalars['String']['output']>
  article?: Maybe<Article>
  id: Scalars['ID']['output']
  label?: Maybe<Scalars['String']['output']>
  media?: Maybe<UploadFile>
  page?: Maybe<Page>
  subtext?: Maybe<Scalars['String']['output']>
  url?: Maybe<Scalars['String']['output']>
}

export type ComponentBlocksHomepageHighlightsItemFiltersInput = {
  analyticsId?: InputMaybe<StringFilterInput>
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksHomepageHighlightsItemFiltersInput>>>
  article?: InputMaybe<ArticleFiltersInput>
  label?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentBlocksHomepageHighlightsItemFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksHomepageHighlightsItemFiltersInput>>>
  page?: InputMaybe<PageFiltersInput>
  subtext?: InputMaybe<StringFilterInput>
  url?: InputMaybe<StringFilterInput>
}

export type ComponentBlocksHomepageHighlightsItemInput = {
  analyticsId?: InputMaybe<Scalars['String']['input']>
  article?: InputMaybe<Scalars['ID']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  label?: InputMaybe<Scalars['String']['input']>
  media?: InputMaybe<Scalars['ID']['input']>
  page?: InputMaybe<Scalars['ID']['input']>
  subtext?: InputMaybe<Scalars['String']['input']>
  url?: InputMaybe<Scalars['String']['input']>
}

export type ComponentBlocksInBa = {
  __typename?: 'ComponentBlocksInBa'
  content?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  showMoreLink?: Maybe<ComponentBlocksCommonLink>
  title?: Maybe<Scalars['String']['output']>
}

export type ComponentBlocksInBaFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksInBaFiltersInput>>>
  content?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentBlocksInBaFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksInBaFiltersInput>>>
  showMoreLink?: InputMaybe<ComponentBlocksCommonLinkFiltersInput>
  title?: InputMaybe<StringFilterInput>
}

export type ComponentBlocksInBaInput = {
  content?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  showMoreLink?: InputMaybe<ComponentBlocksCommonLinkInput>
  title?: InputMaybe<Scalars['String']['input']>
}

export type ComponentBlocksNumbersOverviewItem = {
  __typename?: 'ComponentBlocksNumbersOverviewItem'
  id: Scalars['ID']['output']
  number: Scalars['String']['output']
  text: Scalars['String']['output']
}

export type ComponentBlocksNumbersOverviewItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksNumbersOverviewItemFiltersInput>>>
  not?: InputMaybe<ComponentBlocksNumbersOverviewItemFiltersInput>
  number?: InputMaybe<StringFilterInput>
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksNumbersOverviewItemFiltersInput>>>
  text?: InputMaybe<StringFilterInput>
}

export type ComponentBlocksNumbersOverviewItemInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  number?: InputMaybe<Scalars['String']['input']>
  text?: InputMaybe<Scalars['String']['input']>
}

export type ComponentBlocksNumericalListItem = {
  __typename?: 'ComponentBlocksNumericalListItem'
  id: Scalars['ID']['output']
  text?: Maybe<Scalars['String']['output']>
}

export type ComponentBlocksNumericalListItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksNumericalListItemFiltersInput>>>
  not?: InputMaybe<ComponentBlocksNumericalListItemFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksNumericalListItemFiltersInput>>>
  text?: InputMaybe<StringFilterInput>
}

export type ComponentBlocksNumericalListItemInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  text?: InputMaybe<Scalars['String']['input']>
}

export type ComponentBlocksOpeningHoursAlertMessage = {
  __typename?: 'ComponentBlocksOpeningHoursAlertMessage'
  id: Scalars['ID']['output']
  text?: Maybe<Scalars['String']['output']>
}

export type ComponentBlocksOpeningHoursAlertMessageFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksOpeningHoursAlertMessageFiltersInput>>>
  not?: InputMaybe<ComponentBlocksOpeningHoursAlertMessageFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksOpeningHoursAlertMessageFiltersInput>>>
  text?: InputMaybe<StringFilterInput>
}

export type ComponentBlocksOpeningHoursAlertMessageInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  text?: InputMaybe<Scalars['String']['input']>
}

export type ComponentBlocksOpeningHoursItem = {
  __typename?: 'ComponentBlocksOpeningHoursItem'
  id: Scalars['ID']['output']
  label: Scalars['String']['output']
  value: Scalars['String']['output']
}

export type ComponentBlocksOpeningHoursItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksOpeningHoursItemFiltersInput>>>
  label?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentBlocksOpeningHoursItemFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksOpeningHoursItemFiltersInput>>>
  value?: InputMaybe<StringFilterInput>
}

export type ComponentBlocksOpeningHoursItemInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  label?: InputMaybe<Scalars['String']['input']>
  value?: InputMaybe<Scalars['String']['input']>
}

export type ComponentBlocksPageLink = {
  __typename?: 'ComponentBlocksPageLink'
  analyticsId?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  page?: Maybe<Page>
  title?: Maybe<Scalars['String']['output']>
  url?: Maybe<Scalars['String']['output']>
}

export type ComponentBlocksPageLinkFiltersInput = {
  analyticsId?: InputMaybe<StringFilterInput>
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksPageLinkFiltersInput>>>
  not?: InputMaybe<ComponentBlocksPageLinkFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksPageLinkFiltersInput>>>
  page?: InputMaybe<PageFiltersInput>
  title?: InputMaybe<StringFilterInput>
  url?: InputMaybe<StringFilterInput>
}

export type ComponentBlocksPageLinkInput = {
  analyticsId?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  page?: InputMaybe<Scalars['ID']['input']>
  title?: InputMaybe<Scalars['String']['input']>
  url?: InputMaybe<Scalars['String']['input']>
}

export type ComponentBlocksPartner = {
  __typename?: 'ComponentBlocksPartner'
  id: Scalars['ID']['output']
  logo: UploadFile
  title: Scalars['String']['output']
  url?: Maybe<Scalars['String']['output']>
}

export type ComponentBlocksPartnerFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksPartnerFiltersInput>>>
  not?: InputMaybe<ComponentBlocksPartnerFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksPartnerFiltersInput>>>
  title?: InputMaybe<StringFilterInput>
  url?: InputMaybe<StringFilterInput>
}

export type ComponentBlocksPartnerInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  logo?: InputMaybe<Scalars['ID']['input']>
  title?: InputMaybe<Scalars['String']['input']>
  url?: InputMaybe<Scalars['String']['input']>
}

export type ComponentBlocksProsAndConsCard = {
  __typename?: 'ComponentBlocksProsAndConsCard'
  id: Scalars['ID']['output']
  items: Array<Maybe<ComponentBlocksComparisonItem>>
  title: Scalars['String']['output']
}

export type ComponentBlocksProsAndConsCardItemsArgs = {
  filters?: InputMaybe<ComponentBlocksComparisonItemFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentBlocksProsAndConsCardFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksProsAndConsCardFiltersInput>>>
  items?: InputMaybe<ComponentBlocksComparisonItemFiltersInput>
  not?: InputMaybe<ComponentBlocksProsAndConsCardFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksProsAndConsCardFiltersInput>>>
  title?: InputMaybe<StringFilterInput>
}

export type ComponentBlocksProsAndConsCardInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  items?: InputMaybe<Array<InputMaybe<ComponentBlocksComparisonItemInput>>>
  title?: InputMaybe<Scalars['String']['input']>
}

export type ComponentBlocksStarzLandingPageBanner = {
  __typename?: 'ComponentBlocksStarzLandingPageBanner'
  content?: Maybe<Scalars['String']['output']>
  contentPosition: Enum_Componentblocksstarzlandingpagebanner_Contentposition
  id: Scalars['ID']['output']
  media: UploadFile
  primaryLink?: Maybe<ComponentBlocksCommonLink>
  secondaryLink?: Maybe<ComponentBlocksCommonLink>
  tertiaryLink?: Maybe<ComponentBlocksCommonLink>
  title: Scalars['String']['output']
  variant: Enum_Componentblocksstarzlandingpagebanner_Variant
}

export type ComponentBlocksStarzLandingPageBannerFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksStarzLandingPageBannerFiltersInput>>>
  content?: InputMaybe<StringFilterInput>
  contentPosition?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentBlocksStarzLandingPageBannerFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksStarzLandingPageBannerFiltersInput>>>
  primaryLink?: InputMaybe<ComponentBlocksCommonLinkFiltersInput>
  secondaryLink?: InputMaybe<ComponentBlocksCommonLinkFiltersInput>
  tertiaryLink?: InputMaybe<ComponentBlocksCommonLinkFiltersInput>
  title?: InputMaybe<StringFilterInput>
  variant?: InputMaybe<StringFilterInput>
}

export type ComponentBlocksStarzLandingPageBannerInput = {
  content?: InputMaybe<Scalars['String']['input']>
  contentPosition?: InputMaybe<Enum_Componentblocksstarzlandingpagebanner_Contentposition>
  id?: InputMaybe<Scalars['ID']['input']>
  media?: InputMaybe<Scalars['ID']['input']>
  primaryLink?: InputMaybe<ComponentBlocksCommonLinkInput>
  secondaryLink?: InputMaybe<ComponentBlocksCommonLinkInput>
  tertiaryLink?: InputMaybe<ComponentBlocksCommonLinkInput>
  title?: InputMaybe<Scalars['String']['input']>
  variant?: InputMaybe<Enum_Componentblocksstarzlandingpagebanner_Variant>
}

export type ComponentBlocksSubnavigationLink = {
  __typename?: 'ComponentBlocksSubnavigationLink'
  analyticsId?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  label?: Maybe<Scalars['String']['output']>
  page?: Maybe<Page>
  subtext?: Maybe<Scalars['String']['output']>
  url?: Maybe<Scalars['String']['output']>
}

export type ComponentBlocksSubnavigationLinkFiltersInput = {
  analyticsId?: InputMaybe<StringFilterInput>
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksSubnavigationLinkFiltersInput>>>
  label?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentBlocksSubnavigationLinkFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksSubnavigationLinkFiltersInput>>>
  page?: InputMaybe<PageFiltersInput>
  subtext?: InputMaybe<StringFilterInput>
  url?: InputMaybe<StringFilterInput>
}

export type ComponentBlocksSubnavigationLinkInput = {
  analyticsId?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  label?: InputMaybe<Scalars['String']['input']>
  page?: InputMaybe<Scalars['ID']['input']>
  subtext?: InputMaybe<Scalars['String']['input']>
  url?: InputMaybe<Scalars['String']['input']>
}

export type ComponentBlocksTopServicesItem = {
  __typename?: 'ComponentBlocksTopServicesItem'
  icon: Enum_Componentblockstopservicesitem_Icon
  id: Scalars['ID']['output']
  link: ComponentBlocksCommonLink
}

export type ComponentBlocksTopServicesItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksTopServicesItemFiltersInput>>>
  icon?: InputMaybe<StringFilterInput>
  link?: InputMaybe<ComponentBlocksCommonLinkFiltersInput>
  not?: InputMaybe<ComponentBlocksTopServicesItemFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksTopServicesItemFiltersInput>>>
}

export type ComponentBlocksTopServicesItemInput = {
  icon?: InputMaybe<Enum_Componentblockstopservicesitem_Icon>
  id?: InputMaybe<Scalars['ID']['input']>
  link?: InputMaybe<ComponentBlocksCommonLinkInput>
}

export type ComponentBlocksVideo = {
  __typename?: 'ComponentBlocksVideo'
  id: Scalars['ID']['output']
  speaker?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
  url: Scalars['String']['output']
}

export type ComponentBlocksVideoFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksVideoFiltersInput>>>
  not?: InputMaybe<ComponentBlocksVideoFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksVideoFiltersInput>>>
  speaker?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
  url?: InputMaybe<StringFilterInput>
}

export type ComponentBlocksVideoInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  speaker?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
  url?: InputMaybe<Scalars['String']['input']>
}

export type ComponentGeneralHeader = {
  __typename?: 'ComponentGeneralHeader'
  accountLink?: Maybe<ComponentBlocksCommonLink>
  id: Scalars['ID']['output']
  links?: Maybe<Array<Maybe<ComponentGeneralHeaderLink>>>
}

export type ComponentGeneralHeaderLinksArgs = {
  filters?: InputMaybe<ComponentGeneralHeaderLinkFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentGeneralHeaderFiltersInput = {
  accountLink?: InputMaybe<ComponentBlocksCommonLinkFiltersInput>
  and?: InputMaybe<Array<InputMaybe<ComponentGeneralHeaderFiltersInput>>>
  links?: InputMaybe<ComponentGeneralHeaderLinkFiltersInput>
  not?: InputMaybe<ComponentGeneralHeaderFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentGeneralHeaderFiltersInput>>>
}

export type ComponentGeneralHeaderInput = {
  accountLink?: InputMaybe<ComponentBlocksCommonLinkInput>
  id?: InputMaybe<Scalars['ID']['input']>
  links?: InputMaybe<Array<InputMaybe<ComponentGeneralHeaderLinkInput>>>
}

export type ComponentGeneralHeaderLink = {
  __typename?: 'ComponentGeneralHeaderLink'
  analyticsId?: Maybe<Scalars['String']['output']>
  icon: Enum_Componentgeneralheaderlink_Icon
  id: Scalars['ID']['output']
  label?: Maybe<Scalars['String']['output']>
  page?: Maybe<Page>
  showOnDesktop: Scalars['Boolean']['output']
  showOnMobile: Scalars['Boolean']['output']
  url?: Maybe<Scalars['String']['output']>
}

export type ComponentGeneralHeaderLinkFiltersInput = {
  analyticsId?: InputMaybe<StringFilterInput>
  and?: InputMaybe<Array<InputMaybe<ComponentGeneralHeaderLinkFiltersInput>>>
  icon?: InputMaybe<StringFilterInput>
  label?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentGeneralHeaderLinkFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentGeneralHeaderLinkFiltersInput>>>
  page?: InputMaybe<PageFiltersInput>
  showOnDesktop?: InputMaybe<BooleanFilterInput>
  showOnMobile?: InputMaybe<BooleanFilterInput>
  url?: InputMaybe<StringFilterInput>
}

export type ComponentGeneralHeaderLinkInput = {
  analyticsId?: InputMaybe<Scalars['String']['input']>
  icon?: InputMaybe<Enum_Componentgeneralheaderlink_Icon>
  id?: InputMaybe<Scalars['ID']['input']>
  label?: InputMaybe<Scalars['String']['input']>
  page?: InputMaybe<Scalars['ID']['input']>
  showOnDesktop?: InputMaybe<Scalars['Boolean']['input']>
  showOnMobile?: InputMaybe<Scalars['Boolean']['input']>
  url?: InputMaybe<Scalars['String']['input']>
}

export type ComponentHeaderSectionsEvent = {
  __typename?: 'ComponentHeaderSectionsEvent'
  address?: Maybe<Scalars['String']['output']>
  date?: Maybe<Scalars['Date']['output']>
  id: Scalars['ID']['output']
}

export type ComponentHeaderSectionsEventFiltersInput = {
  address?: InputMaybe<StringFilterInput>
  and?: InputMaybe<Array<InputMaybe<ComponentHeaderSectionsEventFiltersInput>>>
  date?: InputMaybe<DateFilterInput>
  not?: InputMaybe<ComponentHeaderSectionsEventFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentHeaderSectionsEventFiltersInput>>>
}

export type ComponentHeaderSectionsEventInput = {
  address?: InputMaybe<Scalars['String']['input']>
  date?: InputMaybe<Scalars['Date']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
}

export type ComponentHeaderSectionsFacility = {
  __typename?: 'ComponentHeaderSectionsFacility'
  address?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  media: Array<Maybe<UploadFile>>
  media_connection: UploadFileRelationResponseCollection
  navigateToLink?: Maybe<Scalars['String']['output']>
}

export type ComponentHeaderSectionsFacilityMediaArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentHeaderSectionsFacilityMedia_ConnectionArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentHeaderSectionsFacilityFiltersInput = {
  address?: InputMaybe<StringFilterInput>
  and?: InputMaybe<Array<InputMaybe<ComponentHeaderSectionsFacilityFiltersInput>>>
  navigateToLink?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentHeaderSectionsFacilityFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentHeaderSectionsFacilityFiltersInput>>>
}

export type ComponentHeaderSectionsFacilityInput = {
  address?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  media?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  navigateToLink?: InputMaybe<Scalars['String']['input']>
}

export type ComponentMenuMenuItem = {
  __typename?: 'ComponentMenuMenuItem'
  icon: Enum_Componentmenumenuitem_Icon
  id: Scalars['ID']['output']
  label: Scalars['String']['output']
  page?: Maybe<Page>
  sections?: Maybe<Array<Maybe<ComponentMenuMenuSection>>>
}

export type ComponentMenuMenuItemSectionsArgs = {
  filters?: InputMaybe<ComponentMenuMenuSectionFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentMenuMenuItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentMenuMenuItemFiltersInput>>>
  icon?: InputMaybe<StringFilterInput>
  label?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentMenuMenuItemFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentMenuMenuItemFiltersInput>>>
  page?: InputMaybe<PageFiltersInput>
  sections?: InputMaybe<ComponentMenuMenuSectionFiltersInput>
}

export type ComponentMenuMenuItemInput = {
  icon?: InputMaybe<Enum_Componentmenumenuitem_Icon>
  id?: InputMaybe<Scalars['ID']['input']>
  label?: InputMaybe<Scalars['String']['input']>
  page?: InputMaybe<Scalars['ID']['input']>
  sections?: InputMaybe<Array<InputMaybe<ComponentMenuMenuSectionInput>>>
}

export type ComponentMenuMenuLink = {
  __typename?: 'ComponentMenuMenuLink'
  analyticsId?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  label?: Maybe<Scalars['String']['output']>
  page?: Maybe<Page>
  url?: Maybe<Scalars['String']['output']>
}

export type ComponentMenuMenuLinkFiltersInput = {
  analyticsId?: InputMaybe<StringFilterInput>
  and?: InputMaybe<Array<InputMaybe<ComponentMenuMenuLinkFiltersInput>>>
  label?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentMenuMenuLinkFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentMenuMenuLinkFiltersInput>>>
  page?: InputMaybe<PageFiltersInput>
  url?: InputMaybe<StringFilterInput>
}

export type ComponentMenuMenuLinkInput = {
  analyticsId?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  label?: InputMaybe<Scalars['String']['input']>
  page?: InputMaybe<Scalars['ID']['input']>
  url?: InputMaybe<Scalars['String']['input']>
}

export type ComponentMenuMenuSection = {
  __typename?: 'ComponentMenuMenuSection'
  icon: Enum_Componentmenumenusection_Icon
  id: Scalars['ID']['output']
  label: Scalars['String']['output']
  links?: Maybe<Array<Maybe<ComponentMenuMenuLink>>>
  page?: Maybe<Page>
  subtext?: Maybe<Scalars['String']['output']>
}

export type ComponentMenuMenuSectionLinksArgs = {
  filters?: InputMaybe<ComponentMenuMenuLinkFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentMenuMenuSectionFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentMenuMenuSectionFiltersInput>>>
  icon?: InputMaybe<StringFilterInput>
  label?: InputMaybe<StringFilterInput>
  links?: InputMaybe<ComponentMenuMenuLinkFiltersInput>
  not?: InputMaybe<ComponentMenuMenuSectionFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentMenuMenuSectionFiltersInput>>>
  page?: InputMaybe<PageFiltersInput>
  subtext?: InputMaybe<StringFilterInput>
}

export type ComponentMenuMenuSectionInput = {
  icon?: InputMaybe<Enum_Componentmenumenusection_Icon>
  id?: InputMaybe<Scalars['ID']['input']>
  label?: InputMaybe<Scalars['String']['input']>
  links?: InputMaybe<Array<InputMaybe<ComponentMenuMenuLinkInput>>>
  page?: InputMaybe<Scalars['ID']['input']>
  subtext?: InputMaybe<Scalars['String']['input']>
}

export type ComponentSectionsAccordion = {
  __typename?: 'ComponentSectionsAccordion'
  flatText?: Maybe<Array<Maybe<ComponentAccordionItemsFlatText>>>
  id: Scalars['ID']['output']
  institutions?: Maybe<Array<Maybe<ComponentAccordionItemsInstitution>>>
  title?: Maybe<Scalars['String']['output']>
  titleLevel?: Maybe<Enum_Componentsectionsaccordion_Titlelevel>
}

export type ComponentSectionsAccordionFlatTextArgs = {
  filters?: InputMaybe<ComponentAccordionItemsFlatTextFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsAccordionInstitutionsArgs = {
  filters?: InputMaybe<ComponentAccordionItemsInstitutionFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsAccordionFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsAccordionFiltersInput>>>
  flatText?: InputMaybe<ComponentAccordionItemsFlatTextFiltersInput>
  institutions?: InputMaybe<ComponentAccordionItemsInstitutionFiltersInput>
  not?: InputMaybe<ComponentSectionsAccordionFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsAccordionFiltersInput>>>
  title?: InputMaybe<StringFilterInput>
  titleLevel?: InputMaybe<StringFilterInput>
}

export type ComponentSectionsAccordionInput = {
  flatText?: InputMaybe<Array<InputMaybe<ComponentAccordionItemsFlatTextInput>>>
  id?: InputMaybe<Scalars['ID']['input']>
  institutions?: InputMaybe<Array<InputMaybe<ComponentAccordionItemsInstitutionInput>>>
  title?: InputMaybe<Scalars['String']['input']>
  titleLevel?: InputMaybe<Enum_Componentsectionsaccordion_Titlelevel>
}

export type ComponentSectionsAlert = {
  __typename?: 'ComponentSectionsAlert'
  alertText: Scalars['String']['output']
  alertVariant: Enum_Componentsectionsalert_Alertvariant
  id: Scalars['ID']['output']
  title?: Maybe<Scalars['String']['output']>
}

export type ComponentSectionsAlertFiltersInput = {
  alertText?: InputMaybe<StringFilterInput>
  alertVariant?: InputMaybe<StringFilterInput>
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsAlertFiltersInput>>>
  not?: InputMaybe<ComponentSectionsAlertFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsAlertFiltersInput>>>
  title?: InputMaybe<StringFilterInput>
}

export type ComponentSectionsAlertInput = {
  alertText?: InputMaybe<Scalars['String']['input']>
  alertVariant?: InputMaybe<Enum_Componentsectionsalert_Alertvariant>
  id?: InputMaybe<Scalars['ID']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type ComponentSectionsArticles = {
  __typename?: 'ComponentSectionsArticles'
  adminGroups: Array<Maybe<AdminGroup>>
  adminGroups_connection?: Maybe<AdminGroupRelationResponseCollection>
  articleCategories: Array<Maybe<ArticleCategory>>
  articleCategories_connection?: Maybe<ArticleCategoryRelationResponseCollection>
  articles: Array<Maybe<Article>>
  articles_connection?: Maybe<ArticleRelationResponseCollection>
  category?: Maybe<PageCategory>
  id: Scalars['ID']['output']
  showAll?: Maybe<Scalars['Boolean']['output']>
  showMoreLink?: Maybe<ComponentBlocksCommonLink>
  tags: Array<Maybe<Tag>>
  tags_connection?: Maybe<TagRelationResponseCollection>
  text?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
}

export type ComponentSectionsArticlesAdminGroupsArgs = {
  filters?: InputMaybe<AdminGroupFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsArticlesAdminGroups_ConnectionArgs = {
  filters?: InputMaybe<AdminGroupFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsArticlesArticleCategoriesArgs = {
  filters?: InputMaybe<ArticleCategoryFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsArticlesArticleCategories_ConnectionArgs = {
  filters?: InputMaybe<ArticleCategoryFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsArticlesArticlesArgs = {
  filters?: InputMaybe<ArticleFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsArticlesArticles_ConnectionArgs = {
  filters?: InputMaybe<ArticleFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsArticlesTagsArgs = {
  filters?: InputMaybe<TagFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsArticlesTags_ConnectionArgs = {
  filters?: InputMaybe<TagFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsArticlesFiltersInput = {
  adminGroups?: InputMaybe<AdminGroupFiltersInput>
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsArticlesFiltersInput>>>
  articleCategories?: InputMaybe<ArticleCategoryFiltersInput>
  articles?: InputMaybe<ArticleFiltersInput>
  category?: InputMaybe<PageCategoryFiltersInput>
  not?: InputMaybe<ComponentSectionsArticlesFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsArticlesFiltersInput>>>
  showAll?: InputMaybe<BooleanFilterInput>
  showMoreLink?: InputMaybe<ComponentBlocksCommonLinkFiltersInput>
  tags?: InputMaybe<TagFiltersInput>
  text?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
}

export type ComponentSectionsArticlesInput = {
  adminGroups?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  articleCategories?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  articles?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  category?: InputMaybe<Scalars['ID']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  showAll?: InputMaybe<Scalars['Boolean']['input']>
  showMoreLink?: InputMaybe<ComponentBlocksCommonLinkInput>
  tags?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  text?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type ComponentSectionsArticlesLandingPage = {
  __typename?: 'ComponentSectionsArticlesLandingPage'
  id: Scalars['ID']['output']
  leftArticle?: Maybe<Article>
  newsPageLink?: Maybe<ComponentBlocksCommonLink>
}

export type ComponentSectionsArticlesLandingPageFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsArticlesLandingPageFiltersInput>>>
  leftArticle?: InputMaybe<ArticleFiltersInput>
  newsPageLink?: InputMaybe<ComponentBlocksCommonLinkFiltersInput>
  not?: InputMaybe<ComponentSectionsArticlesLandingPageFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsArticlesLandingPageFiltersInput>>>
}

export type ComponentSectionsArticlesLandingPageInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  leftArticle?: InputMaybe<Scalars['ID']['input']>
  newsPageLink?: InputMaybe<ComponentBlocksCommonLinkInput>
}

export type ComponentSectionsAssets = {
  __typename?: 'ComponentSectionsAssets'
  assets: Array<Maybe<Asset>>
  assets_connection?: Maybe<AssetRelationResponseCollection>
  id: Scalars['ID']['output']
  showAll?: Maybe<Scalars['Boolean']['output']>
  text?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
  titleLevel?: Maybe<Enum_Componentsectionsassets_Titlelevel>
}

export type ComponentSectionsAssetsAssetsArgs = {
  filters?: InputMaybe<AssetFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsAssetsAssets_ConnectionArgs = {
  filters?: InputMaybe<AssetFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsAssetsFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsAssetsFiltersInput>>>
  assets?: InputMaybe<AssetFiltersInput>
  not?: InputMaybe<ComponentSectionsAssetsFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsAssetsFiltersInput>>>
  showAll?: InputMaybe<BooleanFilterInput>
  text?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
  titleLevel?: InputMaybe<StringFilterInput>
}

export type ComponentSectionsAssetsInput = {
  assets?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  id?: InputMaybe<Scalars['ID']['input']>
  showAll?: InputMaybe<Scalars['Boolean']['input']>
  text?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
  titleLevel?: InputMaybe<Enum_Componentsectionsassets_Titlelevel>
}

export type ComponentSectionsBanner = {
  __typename?: 'ComponentSectionsBanner'
  content?: Maybe<Scalars['String']['output']>
  contentPosition: Enum_Componentsectionsbanner_Contentposition
  id: Scalars['ID']['output']
  media: UploadFile
  primaryLink?: Maybe<ComponentBlocksCommonLink>
  secondaryLink?: Maybe<ComponentBlocksCommonLink>
  tertiaryLink?: Maybe<ComponentBlocksCommonLink>
  title: Scalars['String']['output']
  variant: Enum_Componentsectionsbanner_Variant
}

export type ComponentSectionsBannerFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsBannerFiltersInput>>>
  content?: InputMaybe<StringFilterInput>
  contentPosition?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentSectionsBannerFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsBannerFiltersInput>>>
  primaryLink?: InputMaybe<ComponentBlocksCommonLinkFiltersInput>
  secondaryLink?: InputMaybe<ComponentBlocksCommonLinkFiltersInput>
  tertiaryLink?: InputMaybe<ComponentBlocksCommonLinkFiltersInput>
  title?: InputMaybe<StringFilterInput>
  variant?: InputMaybe<StringFilterInput>
}

export type ComponentSectionsBannerInput = {
  content?: InputMaybe<Scalars['String']['input']>
  contentPosition?: InputMaybe<Enum_Componentsectionsbanner_Contentposition>
  id?: InputMaybe<Scalars['ID']['input']>
  media?: InputMaybe<Scalars['ID']['input']>
  primaryLink?: InputMaybe<ComponentBlocksCommonLinkInput>
  secondaryLink?: InputMaybe<ComponentBlocksCommonLinkInput>
  tertiaryLink?: InputMaybe<ComponentBlocksCommonLinkInput>
  title?: InputMaybe<Scalars['String']['input']>
  variant?: InputMaybe<Enum_Componentsectionsbanner_Variant>
}

export type ComponentSectionsColumnedText = {
  __typename?: 'ComponentSectionsColumnedText'
  content?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  title?: Maybe<Scalars['String']['output']>
}

export type ComponentSectionsColumnedTextFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsColumnedTextFiltersInput>>>
  content?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentSectionsColumnedTextFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsColumnedTextFiltersInput>>>
  title?: InputMaybe<StringFilterInput>
}

export type ComponentSectionsColumnedTextInput = {
  content?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type ComponentSectionsColumns = {
  __typename?: 'ComponentSectionsColumns'
  columns: Array<Maybe<ComponentBlocksColumnsItem>>
  id: Scalars['ID']['output']
  imageVariant: Enum_Componentsectionscolumns_Imagevariant
  responsiveLayout: Enum_Componentsectionscolumns_Responsivelayout
  text?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
}

export type ComponentSectionsColumnsColumnsArgs = {
  filters?: InputMaybe<ComponentBlocksColumnsItemFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsColumnsFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsColumnsFiltersInput>>>
  columns?: InputMaybe<ComponentBlocksColumnsItemFiltersInput>
  imageVariant?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentSectionsColumnsFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsColumnsFiltersInput>>>
  responsiveLayout?: InputMaybe<StringFilterInput>
  text?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
}

export type ComponentSectionsColumnsInput = {
  columns?: InputMaybe<Array<InputMaybe<ComponentBlocksColumnsItemInput>>>
  id?: InputMaybe<Scalars['ID']['input']>
  imageVariant?: InputMaybe<Enum_Componentsectionscolumns_Imagevariant>
  responsiveLayout?: InputMaybe<Enum_Componentsectionscolumns_Responsivelayout>
  text?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type ComponentSectionsColumnsList = {
  __typename?: 'ComponentSectionsColumnsList'
  id: Scalars['ID']['output']
  leftColumn?: Maybe<Array<Maybe<ComponentBlocksColumnsListItem>>>
  rightColumn?: Maybe<Array<Maybe<ComponentBlocksColumnsListItem>>>
  text?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
}

export type ComponentSectionsColumnsListLeftColumnArgs = {
  filters?: InputMaybe<ComponentBlocksColumnsListItemFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsColumnsListRightColumnArgs = {
  filters?: InputMaybe<ComponentBlocksColumnsListItemFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsColumnsListFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsColumnsListFiltersInput>>>
  leftColumn?: InputMaybe<ComponentBlocksColumnsListItemFiltersInput>
  not?: InputMaybe<ComponentSectionsColumnsListFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsColumnsListFiltersInput>>>
  rightColumn?: InputMaybe<ComponentBlocksColumnsListItemFiltersInput>
  text?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
}

export type ComponentSectionsColumnsListInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  leftColumn?: InputMaybe<Array<InputMaybe<ComponentBlocksColumnsListItemInput>>>
  rightColumn?: InputMaybe<Array<InputMaybe<ComponentBlocksColumnsListItemInput>>>
  text?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type ComponentSectionsComparisonSection = {
  __typename?: 'ComponentSectionsComparisonSection'
  cards: Array<Maybe<ComponentBlocksComparisonCard>>
  id: Scalars['ID']['output']
  text?: Maybe<Scalars['String']['output']>
  textAlign: Enum_Componentsectionscomparisonsection_Textalign
  title?: Maybe<Scalars['String']['output']>
}

export type ComponentSectionsComparisonSectionCardsArgs = {
  filters?: InputMaybe<ComponentBlocksComparisonCardFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsComparisonSectionFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsComparisonSectionFiltersInput>>>
  cards?: InputMaybe<ComponentBlocksComparisonCardFiltersInput>
  not?: InputMaybe<ComponentSectionsComparisonSectionFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsComparisonSectionFiltersInput>>>
  text?: InputMaybe<StringFilterInput>
  textAlign?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
}

export type ComponentSectionsComparisonSectionInput = {
  cards?: InputMaybe<Array<InputMaybe<ComponentBlocksComparisonCardInput>>>
  id?: InputMaybe<Scalars['ID']['input']>
  text?: InputMaybe<Scalars['String']['input']>
  textAlign?: InputMaybe<Enum_Componentsectionscomparisonsection_Textalign>
  title?: InputMaybe<Scalars['String']['input']>
}

export type ComponentSectionsContactsSection = {
  __typename?: 'ComponentSectionsContactsSection'
  addressContacts?: Maybe<Array<Maybe<ComponentBlocksContactCard>>>
  bankConnectionContacts?: Maybe<Array<Maybe<ComponentBlocksContactCard>>>
  billingInfoContacts?: Maybe<Array<Maybe<ComponentBlocksContactCard>>>
  description?: Maybe<Scalars['String']['output']>
  directionsContact?: Maybe<ComponentBlocksContactDirectionsCard>
  emailContacts?: Maybe<Array<Maybe<ComponentBlocksContactCard>>>
  id: Scalars['ID']['output']
  openingHoursContacts?: Maybe<Array<Maybe<ComponentBlocksContactCard>>>
  personContacts?: Maybe<Array<Maybe<ComponentBlocksContactPersonCard>>>
  phoneContacts?: Maybe<Array<Maybe<ComponentBlocksContactCard>>>
  postalAddressContacts?: Maybe<Array<Maybe<ComponentBlocksContactCard>>>
  title?: Maybe<Scalars['String']['output']>
  titleLevel?: Maybe<Enum_Componentsectionscontactssection_Titlelevel>
  webContacts?: Maybe<Array<Maybe<ComponentBlocksContactCard>>>
}

export type ComponentSectionsContactsSectionAddressContactsArgs = {
  filters?: InputMaybe<ComponentBlocksContactCardFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsContactsSectionBankConnectionContactsArgs = {
  filters?: InputMaybe<ComponentBlocksContactCardFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsContactsSectionBillingInfoContactsArgs = {
  filters?: InputMaybe<ComponentBlocksContactCardFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsContactsSectionEmailContactsArgs = {
  filters?: InputMaybe<ComponentBlocksContactCardFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsContactsSectionOpeningHoursContactsArgs = {
  filters?: InputMaybe<ComponentBlocksContactCardFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsContactsSectionPersonContactsArgs = {
  filters?: InputMaybe<ComponentBlocksContactPersonCardFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsContactsSectionPhoneContactsArgs = {
  filters?: InputMaybe<ComponentBlocksContactCardFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsContactsSectionPostalAddressContactsArgs = {
  filters?: InputMaybe<ComponentBlocksContactCardFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsContactsSectionWebContactsArgs = {
  filters?: InputMaybe<ComponentBlocksContactCardFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsContactsSectionFiltersInput = {
  addressContacts?: InputMaybe<ComponentBlocksContactCardFiltersInput>
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsContactsSectionFiltersInput>>>
  bankConnectionContacts?: InputMaybe<ComponentBlocksContactCardFiltersInput>
  billingInfoContacts?: InputMaybe<ComponentBlocksContactCardFiltersInput>
  description?: InputMaybe<StringFilterInput>
  directionsContact?: InputMaybe<ComponentBlocksContactDirectionsCardFiltersInput>
  emailContacts?: InputMaybe<ComponentBlocksContactCardFiltersInput>
  not?: InputMaybe<ComponentSectionsContactsSectionFiltersInput>
  openingHoursContacts?: InputMaybe<ComponentBlocksContactCardFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsContactsSectionFiltersInput>>>
  personContacts?: InputMaybe<ComponentBlocksContactPersonCardFiltersInput>
  phoneContacts?: InputMaybe<ComponentBlocksContactCardFiltersInput>
  postalAddressContacts?: InputMaybe<ComponentBlocksContactCardFiltersInput>
  title?: InputMaybe<StringFilterInput>
  titleLevel?: InputMaybe<StringFilterInput>
  webContacts?: InputMaybe<ComponentBlocksContactCardFiltersInput>
}

export type ComponentSectionsContactsSectionInput = {
  addressContacts?: InputMaybe<Array<InputMaybe<ComponentBlocksContactCardInput>>>
  bankConnectionContacts?: InputMaybe<Array<InputMaybe<ComponentBlocksContactCardInput>>>
  billingInfoContacts?: InputMaybe<Array<InputMaybe<ComponentBlocksContactCardInput>>>
  description?: InputMaybe<Scalars['String']['input']>
  directionsContact?: InputMaybe<ComponentBlocksContactDirectionsCardInput>
  emailContacts?: InputMaybe<Array<InputMaybe<ComponentBlocksContactCardInput>>>
  id?: InputMaybe<Scalars['ID']['input']>
  openingHoursContacts?: InputMaybe<Array<InputMaybe<ComponentBlocksContactCardInput>>>
  personContacts?: InputMaybe<Array<InputMaybe<ComponentBlocksContactPersonCardInput>>>
  phoneContacts?: InputMaybe<Array<InputMaybe<ComponentBlocksContactCardInput>>>
  postalAddressContacts?: InputMaybe<Array<InputMaybe<ComponentBlocksContactCardInput>>>
  title?: InputMaybe<Scalars['String']['input']>
  titleLevel?: InputMaybe<Enum_Componentsectionscontactssection_Titlelevel>
  webContacts?: InputMaybe<Array<InputMaybe<ComponentBlocksContactCardInput>>>
}

export type ComponentSectionsDivider = {
  __typename?: 'ComponentSectionsDivider'
  id: Scalars['ID']['output']
  style?: Maybe<Enum_Componentsectionsdivider_Style>
}

export type ComponentSectionsDividerFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsDividerFiltersInput>>>
  not?: InputMaybe<ComponentSectionsDividerFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsDividerFiltersInput>>>
  style?: InputMaybe<StringFilterInput>
}

export type ComponentSectionsDividerInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  style?: InputMaybe<Enum_Componentsectionsdivider_Style>
}

export type ComponentSectionsDocuments = {
  __typename?: 'ComponentSectionsDocuments'
  documents: Array<Maybe<Document>>
  documents_connection?: Maybe<DocumentRelationResponseCollection>
  id: Scalars['ID']['output']
  showAll?: Maybe<Scalars['Boolean']['output']>
  text?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
  titleLevel?: Maybe<Enum_Componentsectionsdocuments_Titlelevel>
}

export type ComponentSectionsDocumentsDocumentsArgs = {
  filters?: InputMaybe<DocumentFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsDocumentsDocuments_ConnectionArgs = {
  filters?: InputMaybe<DocumentFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsDocumentsFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsDocumentsFiltersInput>>>
  documents?: InputMaybe<DocumentFiltersInput>
  not?: InputMaybe<ComponentSectionsDocumentsFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsDocumentsFiltersInput>>>
  showAll?: InputMaybe<BooleanFilterInput>
  text?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
  titleLevel?: InputMaybe<StringFilterInput>
}

export type ComponentSectionsDocumentsInput = {
  documents?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  id?: InputMaybe<Scalars['ID']['input']>
  showAll?: InputMaybe<Scalars['Boolean']['input']>
  text?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
  titleLevel?: InputMaybe<Enum_Componentsectionsdocuments_Titlelevel>
}

export type ComponentSectionsEvents = {
  __typename?: 'ComponentSectionsEvents'
  eventPages: Array<Maybe<Page>>
  eventPages_connection?: Maybe<PageRelationResponseCollection>
  id: Scalars['ID']['output']
  text?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
  titleLevel?: Maybe<Enum_Componentsectionsevents_Titlelevel>
}

export type ComponentSectionsEventsEventPagesArgs = {
  filters?: InputMaybe<PageFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsEventsEventPages_ConnectionArgs = {
  filters?: InputMaybe<PageFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsEventsFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsEventsFiltersInput>>>
  eventPages?: InputMaybe<PageFiltersInput>
  not?: InputMaybe<ComponentSectionsEventsFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsEventsFiltersInput>>>
  text?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
  titleLevel?: InputMaybe<StringFilterInput>
}

export type ComponentSectionsEventsInput = {
  eventPages?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  id?: InputMaybe<Scalars['ID']['input']>
  text?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
  titleLevel?: InputMaybe<Enum_Componentsectionsevents_Titlelevel>
}

export type ComponentSectionsFacilities = {
  __typename?: 'ComponentSectionsFacilities'
  facilityPages: Array<Maybe<Page>>
  facilityPages_connection?: Maybe<PageRelationResponseCollection>
  id: Scalars['ID']['output']
  text?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
  titleLevel?: Maybe<Enum_Componentsectionsfacilities_Titlelevel>
}

export type ComponentSectionsFacilitiesFacilityPagesArgs = {
  filters?: InputMaybe<PageFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsFacilitiesFacilityPages_ConnectionArgs = {
  filters?: InputMaybe<PageFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsFacilitiesFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsFacilitiesFiltersInput>>>
  facilityPages?: InputMaybe<PageFiltersInput>
  not?: InputMaybe<ComponentSectionsFacilitiesFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsFacilitiesFiltersInput>>>
  text?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
  titleLevel?: InputMaybe<StringFilterInput>
}

export type ComponentSectionsFacilitiesInput = {
  facilityPages?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  id?: InputMaybe<Scalars['ID']['input']>
  text?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
  titleLevel?: InputMaybe<Enum_Componentsectionsfacilities_Titlelevel>
}

export type ComponentSectionsFaqCategories = {
  __typename?: 'ComponentSectionsFaqCategories'
  faqCategories: Array<Maybe<FaqCategory>>
  faqCategories_connection?: Maybe<FaqCategoryRelationResponseCollection>
  id: Scalars['ID']['output']
  text?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
}

export type ComponentSectionsFaqCategoriesFaqCategoriesArgs = {
  filters?: InputMaybe<FaqCategoryFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsFaqCategoriesFaqCategories_ConnectionArgs = {
  filters?: InputMaybe<FaqCategoryFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsFaqCategoriesFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsFaqCategoriesFiltersInput>>>
  faqCategories?: InputMaybe<FaqCategoryFiltersInput>
  not?: InputMaybe<ComponentSectionsFaqCategoriesFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsFaqCategoriesFiltersInput>>>
  text?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
}

export type ComponentSectionsFaqCategoriesInput = {
  faqCategories?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  id?: InputMaybe<Scalars['ID']['input']>
  text?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type ComponentSectionsFaqs = {
  __typename?: 'ComponentSectionsFaqs'
  faqs: Array<Maybe<Faq>>
  faqs_connection?: Maybe<FaqRelationResponseCollection>
  id: Scalars['ID']['output']
  text?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
  titleLevel?: Maybe<Enum_Componentsectionsfaqs_Titlelevel>
}

export type ComponentSectionsFaqsFaqsArgs = {
  filters?: InputMaybe<FaqFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsFaqsFaqs_ConnectionArgs = {
  filters?: InputMaybe<FaqFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsFaqsFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsFaqsFiltersInput>>>
  faqs?: InputMaybe<FaqFiltersInput>
  not?: InputMaybe<ComponentSectionsFaqsFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsFaqsFiltersInput>>>
  text?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
  titleLevel?: InputMaybe<StringFilterInput>
}

export type ComponentSectionsFaqsInput = {
  faqs?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  id?: InputMaybe<Scalars['ID']['input']>
  text?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
  titleLevel?: InputMaybe<Enum_Componentsectionsfaqs_Titlelevel>
}

export type ComponentSectionsFileList = {
  __typename?: 'ComponentSectionsFileList'
  fileList?: Maybe<Array<Maybe<ComponentBlocksFile>>>
  id: Scalars['ID']['output']
  text?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
  titleLevel?: Maybe<Enum_Componentsectionsfilelist_Titlelevel>
}

export type ComponentSectionsFileListFileListArgs = {
  filters?: InputMaybe<ComponentBlocksFileFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsFileListFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsFileListFiltersInput>>>
  fileList?: InputMaybe<ComponentBlocksFileFiltersInput>
  not?: InputMaybe<ComponentSectionsFileListFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsFileListFiltersInput>>>
  text?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
  titleLevel?: InputMaybe<StringFilterInput>
}

export type ComponentSectionsFileListInput = {
  fileList?: InputMaybe<Array<InputMaybe<ComponentBlocksFileInput>>>
  id?: InputMaybe<Scalars['ID']['input']>
  text?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
  titleLevel?: InputMaybe<Enum_Componentsectionsfilelist_Titlelevel>
}

export type ComponentSectionsGallery = {
  __typename?: 'ComponentSectionsGallery'
  id: Scalars['ID']['output']
  medias: Array<Maybe<UploadFile>>
  medias_connection: UploadFileRelationResponseCollection
  text?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
  titleLevel?: Maybe<Enum_Componentsectionsgallery_Titlelevel>
}

export type ComponentSectionsGalleryMediasArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsGalleryMedias_ConnectionArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsGalleryFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsGalleryFiltersInput>>>
  not?: InputMaybe<ComponentSectionsGalleryFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsGalleryFiltersInput>>>
  text?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
  titleLevel?: InputMaybe<StringFilterInput>
}

export type ComponentSectionsGalleryInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  medias?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  text?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
  titleLevel?: InputMaybe<Enum_Componentsectionsgallery_Titlelevel>
}

export type ComponentSectionsHomepageEvents = {
  __typename?: 'ComponentSectionsHomepageEvents'
  eventsPageLink?: Maybe<ComponentBlocksCommonLink>
  id: Scalars['ID']['output']
  text?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
}

export type ComponentSectionsHomepageEventsFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsHomepageEventsFiltersInput>>>
  eventsPageLink?: InputMaybe<ComponentBlocksCommonLinkFiltersInput>
  not?: InputMaybe<ComponentSectionsHomepageEventsFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsHomepageEventsFiltersInput>>>
  text?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
}

export type ComponentSectionsHomepageEventsInput = {
  eventsPageLink?: InputMaybe<ComponentBlocksCommonLinkInput>
  id?: InputMaybe<Scalars['ID']['input']>
  text?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type ComponentSectionsHomepageHighlights = {
  __typename?: 'ComponentSectionsHomepageHighlights'
  cards?: Maybe<Array<Maybe<ComponentBlocksHomepageHighlightsItem>>>
  id: Scalars['ID']['output']
  text?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
}

export type ComponentSectionsHomepageHighlightsCardsArgs = {
  filters?: InputMaybe<ComponentBlocksHomepageHighlightsItemFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsHomepageHighlightsFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsHomepageHighlightsFiltersInput>>>
  cards?: InputMaybe<ComponentBlocksHomepageHighlightsItemFiltersInput>
  not?: InputMaybe<ComponentSectionsHomepageHighlightsFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsHomepageHighlightsFiltersInput>>>
  text?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
}

export type ComponentSectionsHomepageHighlightsInput = {
  cards?: InputMaybe<Array<InputMaybe<ComponentBlocksHomepageHighlightsItemInput>>>
  id?: InputMaybe<Scalars['ID']['input']>
  text?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type ComponentSectionsHomepageMayorAndCouncil = {
  __typename?: 'ComponentSectionsHomepageMayorAndCouncil'
  councilCard?: Maybe<ComponentBlocksCommonLink>
  id: Scalars['ID']['output']
  mayorCard?: Maybe<ComponentBlocksCommonLink>
  text?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
}

export type ComponentSectionsHomepageMayorAndCouncilFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsHomepageMayorAndCouncilFiltersInput>>>
  councilCard?: InputMaybe<ComponentBlocksCommonLinkFiltersInput>
  mayorCard?: InputMaybe<ComponentBlocksCommonLinkFiltersInput>
  not?: InputMaybe<ComponentSectionsHomepageMayorAndCouncilFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsHomepageMayorAndCouncilFiltersInput>>>
  text?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
}

export type ComponentSectionsHomepageMayorAndCouncilInput = {
  councilCard?: InputMaybe<ComponentBlocksCommonLinkInput>
  id?: InputMaybe<Scalars['ID']['input']>
  mayorCard?: InputMaybe<ComponentBlocksCommonLinkInput>
  text?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type ComponentSectionsHomepageTabs = {
  __typename?: 'ComponentSectionsHomepageTabs'
  id: Scalars['ID']['output']
  leftArticle?: Maybe<Article>
  newsPageLink?: Maybe<ComponentBlocksCommonLink>
  officialBoardPageLink?: Maybe<ComponentBlocksCommonLink>
  rightArticle?: Maybe<Article>
  roadClosuresPageLink?: Maybe<ComponentBlocksCommonLink>
}

export type ComponentSectionsHomepageTabsFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsHomepageTabsFiltersInput>>>
  leftArticle?: InputMaybe<ArticleFiltersInput>
  newsPageLink?: InputMaybe<ComponentBlocksCommonLinkFiltersInput>
  not?: InputMaybe<ComponentSectionsHomepageTabsFiltersInput>
  officialBoardPageLink?: InputMaybe<ComponentBlocksCommonLinkFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsHomepageTabsFiltersInput>>>
  rightArticle?: InputMaybe<ArticleFiltersInput>
  roadClosuresPageLink?: InputMaybe<ComponentBlocksCommonLinkFiltersInput>
}

export type ComponentSectionsHomepageTabsInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  leftArticle?: InputMaybe<Scalars['ID']['input']>
  newsPageLink?: InputMaybe<ComponentBlocksCommonLinkInput>
  officialBoardPageLink?: InputMaybe<ComponentBlocksCommonLinkInput>
  rightArticle?: InputMaybe<Scalars['ID']['input']>
  roadClosuresPageLink?: InputMaybe<ComponentBlocksCommonLinkInput>
}

export type ComponentSectionsIframe = {
  __typename?: 'ComponentSectionsIframe'
  allowGeolocation?: Maybe<Scalars['Boolean']['output']>
  hasBorder?: Maybe<Scalars['Boolean']['output']>
  id: Scalars['ID']['output']
  iframeHeight: Scalars['String']['output']
  iframeTitle?: Maybe<Scalars['String']['output']>
  text?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
  titleLevel?: Maybe<Enum_Componentsectionsiframe_Titlelevel>
  url: Scalars['String']['output']
}

export type ComponentSectionsIframeFiltersInput = {
  allowGeolocation?: InputMaybe<BooleanFilterInput>
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsIframeFiltersInput>>>
  hasBorder?: InputMaybe<BooleanFilterInput>
  iframeHeight?: InputMaybe<StringFilterInput>
  iframeTitle?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentSectionsIframeFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsIframeFiltersInput>>>
  text?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
  titleLevel?: InputMaybe<StringFilterInput>
  url?: InputMaybe<StringFilterInput>
}

export type ComponentSectionsIframeInput = {
  allowGeolocation?: InputMaybe<Scalars['Boolean']['input']>
  hasBorder?: InputMaybe<Scalars['Boolean']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  iframeHeight?: InputMaybe<Scalars['String']['input']>
  iframeTitle?: InputMaybe<Scalars['String']['input']>
  text?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
  titleLevel?: InputMaybe<Enum_Componentsectionsiframe_Titlelevel>
  url?: InputMaybe<Scalars['String']['input']>
}

export type ComponentSectionsInbaLatestRelease = {
  __typename?: 'ComponentSectionsInbaLatestRelease'
  id: Scalars['ID']['output']
}

export type ComponentSectionsInbaLatestReleaseFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsInbaLatestReleaseFiltersInput>>>
  not?: InputMaybe<ComponentSectionsInbaLatestReleaseFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsInbaLatestReleaseFiltersInput>>>
}

export type ComponentSectionsInbaLatestReleaseInput = {
  id?: InputMaybe<Scalars['ID']['input']>
}

export type ComponentSectionsInbaReleases = {
  __typename?: 'ComponentSectionsInbaReleases'
  id: Scalars['ID']['output']
  showMoreLink?: Maybe<ComponentBlocksCommonLink>
  text?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
  variant?: Maybe<Enum_Componentsectionsinbareleases_Variant>
}

export type ComponentSectionsInbaReleasesFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsInbaReleasesFiltersInput>>>
  not?: InputMaybe<ComponentSectionsInbaReleasesFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsInbaReleasesFiltersInput>>>
  showMoreLink?: InputMaybe<ComponentBlocksCommonLinkFiltersInput>
  text?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
  variant?: InputMaybe<StringFilterInput>
}

export type ComponentSectionsInbaReleasesInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  showMoreLink?: InputMaybe<ComponentBlocksCommonLinkInput>
  text?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
  variant?: InputMaybe<Enum_Componentsectionsinbareleases_Variant>
}

export type ComponentSectionsJobOfferList = {
  __typename?: 'ComponentSectionsJobOfferList'
  id: Scalars['ID']['output']
  text?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
  titleLevel?: Maybe<Enum_Componentsectionsjobofferlist_Titlelevel>
}

export type ComponentSectionsJobOfferListFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsJobOfferListFiltersInput>>>
  not?: InputMaybe<ComponentSectionsJobOfferListFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsJobOfferListFiltersInput>>>
  text?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
  titleLevel?: InputMaybe<StringFilterInput>
}

export type ComponentSectionsJobOfferListInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  text?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
  titleLevel?: InputMaybe<Enum_Componentsectionsjobofferlist_Titlelevel>
}

export type ComponentSectionsLinks = {
  __typename?: 'ComponentSectionsLinks'
  id: Scalars['ID']['output']
  pageLinks?: Maybe<Array<Maybe<ComponentBlocksPageLink>>>
  title?: Maybe<Scalars['String']['output']>
  titleLevel?: Maybe<Enum_Componentsectionslinks_Titlelevel>
}

export type ComponentSectionsLinksPageLinksArgs = {
  filters?: InputMaybe<ComponentBlocksPageLinkFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsLinksFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsLinksFiltersInput>>>
  not?: InputMaybe<ComponentSectionsLinksFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsLinksFiltersInput>>>
  pageLinks?: InputMaybe<ComponentBlocksPageLinkFiltersInput>
  title?: InputMaybe<StringFilterInput>
  titleLevel?: InputMaybe<StringFilterInput>
}

export type ComponentSectionsLinksInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  pageLinks?: InputMaybe<Array<InputMaybe<ComponentBlocksPageLinkInput>>>
  title?: InputMaybe<Scalars['String']['input']>
  titleLevel?: InputMaybe<Enum_Componentsectionslinks_Titlelevel>
}

export type ComponentSectionsNarrowText = {
  __typename?: 'ComponentSectionsNarrowText'
  content?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  width?: Maybe<Enum_Componentsectionsnarrowtext_Width>
}

export type ComponentSectionsNarrowTextFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsNarrowTextFiltersInput>>>
  content?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentSectionsNarrowTextFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsNarrowTextFiltersInput>>>
  width?: InputMaybe<StringFilterInput>
}

export type ComponentSectionsNarrowTextInput = {
  content?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  width?: InputMaybe<Enum_Componentsectionsnarrowtext_Width>
}

export type ComponentSectionsNewsletter = {
  __typename?: 'ComponentSectionsNewsletter'
  facebookUrl?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  instagramUrl?: Maybe<Scalars['String']['output']>
  newsletterType: Enum_Componentsectionsnewsletter_Newslettertype
  socialLinksTitle?: Maybe<Scalars['String']['output']>
  text?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
}

export type ComponentSectionsNewsletterFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsNewsletterFiltersInput>>>
  facebookUrl?: InputMaybe<StringFilterInput>
  instagramUrl?: InputMaybe<StringFilterInput>
  newsletterType?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentSectionsNewsletterFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsNewsletterFiltersInput>>>
  socialLinksTitle?: InputMaybe<StringFilterInput>
  text?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
}

export type ComponentSectionsNewsletterInput = {
  facebookUrl?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  instagramUrl?: InputMaybe<Scalars['String']['input']>
  newsletterType?: InputMaybe<Enum_Componentsectionsnewsletter_Newslettertype>
  socialLinksTitle?: InputMaybe<Scalars['String']['input']>
  text?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type ComponentSectionsNumbersOverview = {
  __typename?: 'ComponentSectionsNumbersOverview'
  id: Scalars['ID']['output']
  numbersOverviewItems?: Maybe<Array<Maybe<ComponentBlocksNumbersOverviewItem>>>
  showMoreLink?: Maybe<ComponentBlocksCommonLink>
  text?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
}

export type ComponentSectionsNumbersOverviewNumbersOverviewItemsArgs = {
  filters?: InputMaybe<ComponentBlocksNumbersOverviewItemFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsNumbersOverviewFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsNumbersOverviewFiltersInput>>>
  not?: InputMaybe<ComponentSectionsNumbersOverviewFiltersInput>
  numbersOverviewItems?: InputMaybe<ComponentBlocksNumbersOverviewItemFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsNumbersOverviewFiltersInput>>>
  showMoreLink?: InputMaybe<ComponentBlocksCommonLinkFiltersInput>
  text?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
}

export type ComponentSectionsNumbersOverviewInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  numbersOverviewItems?: InputMaybe<Array<InputMaybe<ComponentBlocksNumbersOverviewItemInput>>>
  showMoreLink?: InputMaybe<ComponentBlocksCommonLinkInput>
  text?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type ComponentSectionsNumericalList = {
  __typename?: 'ComponentSectionsNumericalList'
  id: Scalars['ID']['output']
  items?: Maybe<Array<Maybe<ComponentBlocksNumericalListItem>>>
  text?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
  variant: Enum_Componentsectionsnumericallist_Variant
}

export type ComponentSectionsNumericalListItemsArgs = {
  filters?: InputMaybe<ComponentBlocksNumericalListItemFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsNumericalListFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsNumericalListFiltersInput>>>
  items?: InputMaybe<ComponentBlocksNumericalListItemFiltersInput>
  not?: InputMaybe<ComponentSectionsNumericalListFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsNumericalListFiltersInput>>>
  text?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
  variant?: InputMaybe<StringFilterInput>
}

export type ComponentSectionsNumericalListInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  items?: InputMaybe<Array<InputMaybe<ComponentBlocksNumericalListItemInput>>>
  text?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
  variant?: InputMaybe<Enum_Componentsectionsnumericallist_Variant>
}

export type ComponentSectionsOfficialBoard = {
  __typename?: 'ComponentSectionsOfficialBoard'
  id: Scalars['ID']['output']
}

export type ComponentSectionsOfficialBoardFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsOfficialBoardFiltersInput>>>
  not?: InputMaybe<ComponentSectionsOfficialBoardFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsOfficialBoardFiltersInput>>>
}

export type ComponentSectionsOfficialBoardInput = {
  id?: InputMaybe<Scalars['ID']['input']>
}

export type ComponentSectionsOpeningHours = {
  __typename?: 'ComponentSectionsOpeningHours'
  alertMessage?: Maybe<ComponentBlocksOpeningHoursAlertMessage>
  id: Scalars['ID']['output']
  openingHoursItems?: Maybe<Array<Maybe<ComponentBlocksOpeningHoursItem>>>
  text?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
  titleLevel?: Maybe<Enum_Componentsectionsopeninghours_Titlelevel>
}

export type ComponentSectionsOpeningHoursOpeningHoursItemsArgs = {
  filters?: InputMaybe<ComponentBlocksOpeningHoursItemFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsOpeningHoursFiltersInput = {
  alertMessage?: InputMaybe<ComponentBlocksOpeningHoursAlertMessageFiltersInput>
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsOpeningHoursFiltersInput>>>
  not?: InputMaybe<ComponentSectionsOpeningHoursFiltersInput>
  openingHoursItems?: InputMaybe<ComponentBlocksOpeningHoursItemFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsOpeningHoursFiltersInput>>>
  text?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
  titleLevel?: InputMaybe<StringFilterInput>
}

export type ComponentSectionsOpeningHoursInput = {
  alertMessage?: InputMaybe<ComponentBlocksOpeningHoursAlertMessageInput>
  id?: InputMaybe<Scalars['ID']['input']>
  openingHoursItems?: InputMaybe<Array<InputMaybe<ComponentBlocksOpeningHoursItemInput>>>
  text?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
  titleLevel?: InputMaybe<Enum_Componentsectionsopeninghours_Titlelevel>
}

export type ComponentSectionsOrganizationalStructure = {
  __typename?: 'ComponentSectionsOrganizationalStructure'
  id: Scalars['ID']['output']
  title?: Maybe<Scalars['String']['output']>
}

export type ComponentSectionsOrganizationalStructureFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsOrganizationalStructureFiltersInput>>>
  not?: InputMaybe<ComponentSectionsOrganizationalStructureFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsOrganizationalStructureFiltersInput>>>
  title?: InputMaybe<StringFilterInput>
}

export type ComponentSectionsOrganizationalStructureInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type ComponentSectionsPartners = {
  __typename?: 'ComponentSectionsPartners'
  id: Scalars['ID']['output']
  logoRatio: Enum_Componentsectionspartners_Logoratio
  partners: Array<Maybe<ComponentBlocksPartner>>
  text?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
  titleLevel?: Maybe<Enum_Componentsectionspartners_Titlelevel>
}

export type ComponentSectionsPartnersPartnersArgs = {
  filters?: InputMaybe<ComponentBlocksPartnerFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsPartnersFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsPartnersFiltersInput>>>
  logoRatio?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentSectionsPartnersFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsPartnersFiltersInput>>>
  partners?: InputMaybe<ComponentBlocksPartnerFiltersInput>
  text?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
  titleLevel?: InputMaybe<StringFilterInput>
}

export type ComponentSectionsPartnersInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  logoRatio?: InputMaybe<Enum_Componentsectionspartners_Logoratio>
  partners?: InputMaybe<Array<InputMaybe<ComponentBlocksPartnerInput>>>
  text?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
  titleLevel?: InputMaybe<Enum_Componentsectionspartners_Titlelevel>
}

export type ComponentSectionsProsAndConsSection = {
  __typename?: 'ComponentSectionsProsAndConsSection'
  cons: ComponentBlocksProsAndConsCard
  id: Scalars['ID']['output']
  pros: ComponentBlocksProsAndConsCard
  text?: Maybe<Scalars['String']['output']>
  textAlign: Enum_Componentsectionsprosandconssection_Textalign
  title?: Maybe<Scalars['String']['output']>
}

export type ComponentSectionsProsAndConsSectionFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsProsAndConsSectionFiltersInput>>>
  cons?: InputMaybe<ComponentBlocksProsAndConsCardFiltersInput>
  not?: InputMaybe<ComponentSectionsProsAndConsSectionFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsProsAndConsSectionFiltersInput>>>
  pros?: InputMaybe<ComponentBlocksProsAndConsCardFiltersInput>
  text?: InputMaybe<StringFilterInput>
  textAlign?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
}

export type ComponentSectionsProsAndConsSectionInput = {
  cons?: InputMaybe<ComponentBlocksProsAndConsCardInput>
  id?: InputMaybe<Scalars['ID']['input']>
  pros?: InputMaybe<ComponentBlocksProsAndConsCardInput>
  text?: InputMaybe<Scalars['String']['input']>
  textAlign?: InputMaybe<Enum_Componentsectionsprosandconssection_Textalign>
  title?: InputMaybe<Scalars['String']['input']>
}

export type ComponentSectionsRegulations = {
  __typename?: 'ComponentSectionsRegulations'
  id: Scalars['ID']['output']
  regulations: Array<Maybe<Regulation>>
  regulations_connection?: Maybe<RegulationRelationResponseCollection>
  showAll?: Maybe<Scalars['Boolean']['output']>
}

export type ComponentSectionsRegulationsRegulationsArgs = {
  filters?: InputMaybe<RegulationFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsRegulationsRegulations_ConnectionArgs = {
  filters?: InputMaybe<RegulationFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsRegulationsFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsRegulationsFiltersInput>>>
  not?: InputMaybe<ComponentSectionsRegulationsFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsRegulationsFiltersInput>>>
  regulations?: InputMaybe<RegulationFiltersInput>
  showAll?: InputMaybe<BooleanFilterInput>
}

export type ComponentSectionsRegulationsInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  regulations?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  showAll?: InputMaybe<Scalars['Boolean']['input']>
}

export type ComponentSectionsStarzLandingPage = {
  __typename?: 'ComponentSectionsStarzLandingPage'
  banner: ComponentBlocksStarzLandingPageBanner
  cardLinks?: Maybe<Array<Maybe<ComponentBlocksCardLink>>>
  id: Scalars['ID']['output']
}

export type ComponentSectionsStarzLandingPageCardLinksArgs = {
  filters?: InputMaybe<ComponentBlocksCardLinkFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsStarzLandingPageFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsStarzLandingPageFiltersInput>>>
  banner?: InputMaybe<ComponentBlocksStarzLandingPageBannerFiltersInput>
  cardLinks?: InputMaybe<ComponentBlocksCardLinkFiltersInput>
  not?: InputMaybe<ComponentSectionsStarzLandingPageFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsStarzLandingPageFiltersInput>>>
}

export type ComponentSectionsStarzLandingPageInput = {
  banner?: InputMaybe<ComponentBlocksStarzLandingPageBannerInput>
  cardLinks?: InputMaybe<Array<InputMaybe<ComponentBlocksCardLinkInput>>>
  id?: InputMaybe<Scalars['ID']['input']>
}

export type ComponentSectionsSubnavigation = {
  __typename?: 'ComponentSectionsSubnavigation'
  id: Scalars['ID']['output']
  links?: Maybe<Array<Maybe<ComponentBlocksSubnavigationLink>>>
}

export type ComponentSectionsSubnavigationLinksArgs = {
  filters?: InputMaybe<ComponentBlocksSubnavigationLinkFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsSubnavigationFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsSubnavigationFiltersInput>>>
  links?: InputMaybe<ComponentBlocksSubnavigationLinkFiltersInput>
  not?: InputMaybe<ComponentSectionsSubnavigationFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsSubnavigationFiltersInput>>>
}

export type ComponentSectionsSubnavigationInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  links?: InputMaybe<Array<InputMaybe<ComponentBlocksSubnavigationLinkInput>>>
}

export type ComponentSectionsTextWithImage = {
  __typename?: 'ComponentSectionsTextWithImage'
  content?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  imageAspectRatio?: Maybe<Enum_Componentsectionstextwithimage_Imageaspectratio>
  imagePosition: Enum_Componentsectionstextwithimage_Imageposition
  imageSrc: UploadFile
  links?: Maybe<Array<Maybe<ComponentBlocksCommonLink>>>
}

export type ComponentSectionsTextWithImageLinksArgs = {
  filters?: InputMaybe<ComponentBlocksCommonLinkFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsTextWithImageFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsTextWithImageFiltersInput>>>
  content?: InputMaybe<StringFilterInput>
  imageAspectRatio?: InputMaybe<StringFilterInput>
  imagePosition?: InputMaybe<StringFilterInput>
  links?: InputMaybe<ComponentBlocksCommonLinkFiltersInput>
  not?: InputMaybe<ComponentSectionsTextWithImageFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsTextWithImageFiltersInput>>>
}

export type ComponentSectionsTextWithImageInput = {
  content?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  imageAspectRatio?: InputMaybe<Enum_Componentsectionstextwithimage_Imageaspectratio>
  imagePosition?: InputMaybe<Enum_Componentsectionstextwithimage_Imageposition>
  imageSrc?: InputMaybe<Scalars['ID']['input']>
  links?: InputMaybe<Array<InputMaybe<ComponentBlocksCommonLinkInput>>>
}

export type ComponentSectionsTextWithImageOverlapped = {
  __typename?: 'ComponentSectionsTextWithImageOverlapped'
  content?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  image: UploadFile
  imagePosition: Enum_Componentsectionstextwithimageoverlapped_Imageposition
  links?: Maybe<Array<Maybe<ComponentBlocksCommonLink>>>
}

export type ComponentSectionsTextWithImageOverlappedLinksArgs = {
  filters?: InputMaybe<ComponentBlocksCommonLinkFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsTextWithImageOverlappedFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsTextWithImageOverlappedFiltersInput>>>
  content?: InputMaybe<StringFilterInput>
  imagePosition?: InputMaybe<StringFilterInput>
  links?: InputMaybe<ComponentBlocksCommonLinkFiltersInput>
  not?: InputMaybe<ComponentSectionsTextWithImageOverlappedFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsTextWithImageOverlappedFiltersInput>>>
}

export type ComponentSectionsTextWithImageOverlappedInput = {
  content?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  image?: InputMaybe<Scalars['ID']['input']>
  imagePosition?: InputMaybe<Enum_Componentsectionstextwithimageoverlapped_Imageposition>
  links?: InputMaybe<Array<InputMaybe<ComponentBlocksCommonLinkInput>>>
}

export type ComponentSectionsTootootEvents = {
  __typename?: 'ComponentSectionsTootootEvents'
  id: Scalars['ID']['output']
  showMoreLink?: Maybe<ComponentBlocksCommonLink>
  text?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
}

export type ComponentSectionsTootootEventsFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsTootootEventsFiltersInput>>>
  not?: InputMaybe<ComponentSectionsTootootEventsFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsTootootEventsFiltersInput>>>
  showMoreLink?: InputMaybe<ComponentBlocksCommonLinkFiltersInput>
  text?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
}

export type ComponentSectionsTootootEventsInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  showMoreLink?: InputMaybe<ComponentBlocksCommonLinkInput>
  text?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type ComponentSectionsTopServices = {
  __typename?: 'ComponentSectionsTopServices'
  id: Scalars['ID']['output']
  services: Array<Maybe<ComponentBlocksTopServicesItem>>
  title: Scalars['String']['output']
}

export type ComponentSectionsTopServicesServicesArgs = {
  filters?: InputMaybe<ComponentBlocksTopServicesItemFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsTopServicesFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsTopServicesFiltersInput>>>
  not?: InputMaybe<ComponentSectionsTopServicesFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsTopServicesFiltersInput>>>
  services?: InputMaybe<ComponentBlocksTopServicesItemFiltersInput>
  title?: InputMaybe<StringFilterInput>
}

export type ComponentSectionsTopServicesInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  services?: InputMaybe<Array<InputMaybe<ComponentBlocksTopServicesItemInput>>>
  title?: InputMaybe<Scalars['String']['input']>
}

export type ComponentSectionsVideos = {
  __typename?: 'ComponentSectionsVideos'
  id: Scalars['ID']['output']
  subtitle?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
  titleLevel?: Maybe<Enum_Componentsectionsvideos_Titlelevel>
  videos?: Maybe<Array<Maybe<ComponentBlocksVideo>>>
}

export type ComponentSectionsVideosVideosArgs = {
  filters?: InputMaybe<ComponentBlocksVideoFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsVideosFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSectionsVideosFiltersInput>>>
  not?: InputMaybe<ComponentSectionsVideosFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSectionsVideosFiltersInput>>>
  subtitle?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
  titleLevel?: InputMaybe<StringFilterInput>
  videos?: InputMaybe<ComponentBlocksVideoFiltersInput>
}

export type ComponentSectionsVideosInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  subtitle?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
  titleLevel?: InputMaybe<Enum_Componentsectionsvideos_Titlelevel>
  videos?: InputMaybe<Array<InputMaybe<ComponentBlocksVideoInput>>>
}

export type ComponentSidebarsEmptySidebar = {
  __typename?: 'ComponentSidebarsEmptySidebar'
  id: Scalars['ID']['output']
}

export type ComponentSidebarsEmptySidebarFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentSidebarsEmptySidebarFiltersInput>>>
  not?: InputMaybe<ComponentSidebarsEmptySidebarFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentSidebarsEmptySidebarFiltersInput>>>
}

export type ComponentSidebarsEmptySidebarInput = {
  id?: InputMaybe<Scalars['ID']['input']>
}

export type ComponentTaxAdministratorsTaxAdministrator = {
  __typename?: 'ComponentTaxAdministratorsTaxAdministrator'
  email: Scalars['String']['output']
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  officeNumber: Scalars['String']['output']
  phone: Scalars['String']['output']
  range: Scalars['String']['output']
}

export type ComponentTaxAdministratorsTaxAdministratorFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentTaxAdministratorsTaxAdministratorFiltersInput>>>
  email?: InputMaybe<StringFilterInput>
  name?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentTaxAdministratorsTaxAdministratorFiltersInput>
  officeNumber?: InputMaybe<StringFilterInput>
  or?: InputMaybe<Array<InputMaybe<ComponentTaxAdministratorsTaxAdministratorFiltersInput>>>
  phone?: InputMaybe<StringFilterInput>
  range?: InputMaybe<StringFilterInput>
}

export type ComponentTaxAdministratorsTaxAdministratorInput = {
  email?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  officeNumber?: InputMaybe<Scalars['String']['input']>
  phone?: InputMaybe<Scalars['String']['input']>
  range?: InputMaybe<Scalars['String']['input']>
}

export type DateFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Date']['input']>>>
  between?: InputMaybe<Array<InputMaybe<Scalars['Date']['input']>>>
  contains?: InputMaybe<Scalars['Date']['input']>
  containsi?: InputMaybe<Scalars['Date']['input']>
  endsWith?: InputMaybe<Scalars['Date']['input']>
  eq?: InputMaybe<Scalars['Date']['input']>
  eqi?: InputMaybe<Scalars['Date']['input']>
  gt?: InputMaybe<Scalars['Date']['input']>
  gte?: InputMaybe<Scalars['Date']['input']>
  in?: InputMaybe<Array<InputMaybe<Scalars['Date']['input']>>>
  lt?: InputMaybe<Scalars['Date']['input']>
  lte?: InputMaybe<Scalars['Date']['input']>
  ne?: InputMaybe<Scalars['Date']['input']>
  nei?: InputMaybe<Scalars['Date']['input']>
  not?: InputMaybe<DateFilterInput>
  notContains?: InputMaybe<Scalars['Date']['input']>
  notContainsi?: InputMaybe<Scalars['Date']['input']>
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Date']['input']>>>
  notNull?: InputMaybe<Scalars['Boolean']['input']>
  null?: InputMaybe<Scalars['Boolean']['input']>
  or?: InputMaybe<Array<InputMaybe<Scalars['Date']['input']>>>
  startsWith?: InputMaybe<Scalars['Date']['input']>
}

export type DateTimeFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>
  between?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>
  contains?: InputMaybe<Scalars['DateTime']['input']>
  containsi?: InputMaybe<Scalars['DateTime']['input']>
  endsWith?: InputMaybe<Scalars['DateTime']['input']>
  eq?: InputMaybe<Scalars['DateTime']['input']>
  eqi?: InputMaybe<Scalars['DateTime']['input']>
  gt?: InputMaybe<Scalars['DateTime']['input']>
  gte?: InputMaybe<Scalars['DateTime']['input']>
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>
  lt?: InputMaybe<Scalars['DateTime']['input']>
  lte?: InputMaybe<Scalars['DateTime']['input']>
  ne?: InputMaybe<Scalars['DateTime']['input']>
  nei?: InputMaybe<Scalars['DateTime']['input']>
  not?: InputMaybe<DateTimeFilterInput>
  notContains?: InputMaybe<Scalars['DateTime']['input']>
  notContainsi?: InputMaybe<Scalars['DateTime']['input']>
  notIn?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>
  notNull?: InputMaybe<Scalars['Boolean']['input']>
  null?: InputMaybe<Scalars['Boolean']['input']>
  or?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>
  startsWith?: InputMaybe<Scalars['DateTime']['input']>
}

export type DeleteMutationResponse = {
  __typename?: 'DeleteMutationResponse'
  documentId: Scalars['ID']['output']
}

export type Document = {
  __typename?: 'Document'
  adminGroups: Array<Maybe<AdminGroup>>
  adminGroups_connection?: Maybe<AdminGroupRelationResponseCollection>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  description?: Maybe<Scalars['String']['output']>
  documentCategory?: Maybe<DocumentCategory>
  documentId: Scalars['ID']['output']
  files: Array<Maybe<UploadFile>>
  files_connection: UploadFileRelationResponseCollection
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  slug: Scalars['String']['output']
  title: Scalars['String']['output']
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type DocumentAdminGroupsArgs = {
  filters?: InputMaybe<AdminGroupFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type DocumentAdminGroups_ConnectionArgs = {
  filters?: InputMaybe<AdminGroupFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type DocumentFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type DocumentFiles_ConnectionArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type DocumentCategory = {
  __typename?: 'DocumentCategory'
  createdAt?: Maybe<Scalars['DateTime']['output']>
  documentId: Scalars['ID']['output']
  documents: Array<Maybe<Document>>
  documents_connection?: Maybe<DocumentRelationResponseCollection>
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  slug: Scalars['String']['output']
  title: Scalars['String']['output']
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type DocumentCategoryDocumentsArgs = {
  filters?: InputMaybe<DocumentFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type DocumentCategoryDocuments_ConnectionArgs = {
  filters?: InputMaybe<DocumentFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type DocumentCategoryEntity = {
  __typename?: 'DocumentCategoryEntity'
  attributes?: Maybe<DocumentCategory>
  id?: Maybe<Scalars['ID']['output']>
}

export type DocumentCategoryEntityResponse = {
  __typename?: 'DocumentCategoryEntityResponse'
  data?: Maybe<DocumentCategory>
}

export type DocumentCategoryEntityResponseCollection = {
  __typename?: 'DocumentCategoryEntityResponseCollection'
  nodes: Array<DocumentCategory>
  pageInfo: Pagination
}

export type DocumentCategoryFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<DocumentCategoryFiltersInput>>>
  createdAt?: InputMaybe<DateTimeFilterInput>
  documentId?: InputMaybe<IdFilterInput>
  documents?: InputMaybe<DocumentFiltersInput>
  not?: InputMaybe<DocumentCategoryFiltersInput>
  or?: InputMaybe<Array<InputMaybe<DocumentCategoryFiltersInput>>>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  slug?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type DocumentCategoryInput = {
  documents?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
  slug?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type DocumentCategoryRelationResponseCollection = {
  __typename?: 'DocumentCategoryRelationResponseCollection'
  nodes: Array<DocumentCategory>
}

export type DocumentEntity = {
  __typename?: 'DocumentEntity'
  attributes?: Maybe<Document>
  id?: Maybe<Scalars['ID']['output']>
}

export type DocumentEntityResponse = {
  __typename?: 'DocumentEntityResponse'
  data?: Maybe<Document>
}

export type DocumentEntityResponseCollection = {
  __typename?: 'DocumentEntityResponseCollection'
  nodes: Array<Document>
  pageInfo: Pagination
}

export type DocumentFiltersInput = {
  adminGroups?: InputMaybe<AdminGroupFiltersInput>
  and?: InputMaybe<Array<InputMaybe<DocumentFiltersInput>>>
  createdAt?: InputMaybe<DateTimeFilterInput>
  description?: InputMaybe<StringFilterInput>
  documentCategory?: InputMaybe<DocumentCategoryFiltersInput>
  documentId?: InputMaybe<IdFilterInput>
  not?: InputMaybe<DocumentFiltersInput>
  or?: InputMaybe<Array<InputMaybe<DocumentFiltersInput>>>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  slug?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type DocumentInput = {
  adminGroups?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  description?: InputMaybe<Scalars['String']['input']>
  documentCategory?: InputMaybe<Scalars['ID']['input']>
  files?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
  slug?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type DocumentRelationResponseCollection = {
  __typename?: 'DocumentRelationResponseCollection'
  nodes: Array<Document>
}

export enum Enum_Componentblocksstarzlandingpagebanner_Contentposition {
  Left = 'left',
  Right = 'right',
}

export enum Enum_Componentblocksstarzlandingpagebanner_Variant {
  Color = 'color',
  Dark = 'dark',
  WhiteCondensed = 'white_condensed',
}

export enum Enum_Componentblockstopservicesitem_Icon {
  BratislavskeKonto = 'bratislavske_konto',
  DaneAPoplatky = 'dane_a_poplatky',
  KampaneAProjekty = 'kampane_a_projekty',
  NahlaseniePodnetov = 'nahlasenie_podnetov',
  OrganizacnaStruktura = 'organizacna_struktura',
  PracovnePrilezitosti = 'pracovne_prilezitosti',
  PrenajomPriestorov = 'prenajom_priestorov',
  TuristomVHlavnomMeste = 'turistom_v_hlavnom_meste',
  UradneHodiny = 'uradne_hodiny',
  VerejnePriestory = 'verejne_priestory',
}

export enum Enum_Componentgeneralheaderlink_Icon {
  Esluzby = 'esluzby',
  Kontakt = 'kontakt',
  SomTurista = 'som_turista',
  Ukraina = 'ukraina',
}

export enum Enum_Componentmenumenuitem_Icon {
  DopravaMapy_02 = 'doprava_mapy_02',
  Kultura_06 = 'kultura_06',
  Mesto_01 = 'mesto_01',
  SocialnaPomoc_04 = 'socialna_pomoc_04',
  Vzdelavanie_05 = 'vzdelavanie_05',
  ZpVystavba_03 = 'zp_vystavba_03',
}

export enum Enum_Componentmenumenusection_Icon {
  Aktivity_04 = 'aktivity_04',
  Byvanie_04 = 'byvanie_04',
  Covid_06 = 'covid_06',
  Cyklo_02 = 'cyklo_02',
  Dane_01 = 'dane_01',
  Dedicstvo_06 = 'dedicstvo_06',
  DetiAMladez_05 = 'deti_a_mladez_05',
  Doprava_02 = 'doprava_02',
  Dotacie_05 = 'dotacie_05',
  Kalendar_06 = 'kalendar_06',
  Klima_03 = 'klima_03',
  Komunity_06 = 'komunity_06',
  Koncepcia_06 = 'koncepcia_06',
  Mapy_02 = 'mapy_02',
  Mhd_02 = 'mhd_02',
  Ocenovanie_05 = 'ocenovanie_05',
  Organizacie_06 = 'organizacie_06',
  Parkovanie_02 = 'parkovanie_02',
  Partnerstva_01 = 'partnerstva_01',
  Pomoc_04 = 'pomoc_04',
  Projekty_01 = 'projekty_01',
  RozvojMesta_03 = 'rozvoj_mesta_03',
  Skolstvo_05 = 'skolstvo_05',
  Sluzby_04 = 'sluzby_04',
  Sluzby_06 = 'sluzby_06',
  Sport_05 = 'sport_05',
  SpravaAUdrzba_02 = 'sprava_a_udrzba_02',
  SpravaMesta_01 = 'sprava_mesta_01',
  TransparentneMesto_01 = 'transparentne_mesto_01',
  UzemnyPlan_03 = 'uzemny_plan_03',
  VerejneOsvetlenie_03 = 'verejne_osvetlenie_03',
  VystavbaANehnutelnosti_03 = 'vystavba_a_nehnutelnosti_03',
  Zariadenia_04 = 'zariadenia_04',
  ZdielanaMobilita_02 = 'zdielana_mobilita_02',
  Zelen_03 = 'zelen_03',
  ZivotneProstredie_03 = 'zivotne_prostredie_03',
}

export enum Enum_Componentsectionsaccordion_Titlelevel {
  H2 = 'h2',
  H3 = 'h3',
}

export enum Enum_Componentsectionsalert_Alertvariant {
  Error = 'error',
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
}

export enum Enum_Componentsectionsassets_Titlelevel {
  H2 = 'h2',
  H3 = 'h3',
}

export enum Enum_Componentsectionsbanner_Contentposition {
  Left = 'left',
  Right = 'right',
}

export enum Enum_Componentsectionsbanner_Variant {
  Color = 'color',
  Dark = 'dark',
  WhiteCondensed = 'white_condensed',
}

export enum Enum_Componentsectionscolumns_Imagevariant {
  ColumnsSectionImageVariantImageOriginalSize = 'columnsSection_imageVariant_imageOriginalSize',
  ColumnsSectionImageVariantWithCircleBackground = 'columnsSection_imageVariant_withCircleBackground',
}

export enum Enum_Componentsectionscolumns_Responsivelayout {
  ColumnsSectionResponsiveLayoutOneColumn = 'columnsSection_responsiveLayout_oneColumn',
  ColumnsSectionResponsiveLayoutSlider = 'columnsSection_responsiveLayout_slider',
}

export enum Enum_Componentsectionscomparisonsection_Textalign {
  Center = 'center',
  Left = 'left',
}

export enum Enum_Componentsectionscontactssection_Titlelevel {
  H2 = 'h2',
  H3 = 'h3',
}

export enum Enum_Componentsectionsdivider_Style {
  Bicykel_02FullWidth = 'bicykel_02_full_width',
  Budovy_04FullWidth = 'budovy_04_full_width',
  Byvanie_04FullWidth = 'byvanie_04_full_width',
  Divadlo = 'divadlo',
  Doprava_02FullWidth = 'doprava_02_full_width',
  Hrad_01FullWidth = 'hrad_01_full_width',
  Lod_02FullWidth = 'lod_02_full_width',
  Mesto_01FullWidth = 'mesto_01_full_width',
  Park_04FullWidth = 'park_04_full_width',
  Parkovanie_02FullWidth = 'parkovanie_02_full_width',
  Skola = 'skola',
  Stromy_03FullWidth = 'stromy_03_full_width',
  Vystavba_03FullWidth = 'vystavba_03_full_width',
  Vzdelavanie = 'vzdelavanie',
}

export enum Enum_Componentsectionsdocuments_Titlelevel {
  H2 = 'h2',
  H3 = 'h3',
}

export enum Enum_Componentsectionsevents_Titlelevel {
  H2 = 'h2',
  H3 = 'h3',
}

export enum Enum_Componentsectionsfacilities_Titlelevel {
  H2 = 'h2',
  H3 = 'h3',
}

export enum Enum_Componentsectionsfaqs_Titlelevel {
  H2 = 'h2',
  H3 = 'h3',
}

export enum Enum_Componentsectionsfilelist_Titlelevel {
  H2 = 'h2',
  H3 = 'h3',
}

export enum Enum_Componentsectionsgallery_Titlelevel {
  H2 = 'h2',
  H3 = 'h3',
}

export enum Enum_Componentsectionsiframe_Titlelevel {
  H2 = 'h2',
  H3 = 'h3',
}

export enum Enum_Componentsectionsinbareleases_Variant {
  Carousel = 'carousel',
  Grid = 'grid',
}

export enum Enum_Componentsectionsjobofferlist_Titlelevel {
  H2 = 'h2',
  H3 = 'h3',
}

export enum Enum_Componentsectionslinks_Titlelevel {
  H2 = 'h2',
  H3 = 'h3',
}

export enum Enum_Componentsectionsnarrowtext_Width {
  Default = 'default',
  Full = 'full',
  Narrow = 'narrow',
  Wide = 'wide',
}

export enum Enum_Componentsectionsnewsletter_Newslettertype {
  Starz = 'starz',
}

export enum Enum_Componentsectionsnumericallist_Variant {
  Basic = 'basic',
  Roadmap = 'roadmap',
}

export enum Enum_Componentsectionsopeninghours_Titlelevel {
  H2 = 'h2',
  H3 = 'h3',
}

export enum Enum_Componentsectionspartners_Logoratio {
  Ratio_4_1 = 'ratio_4_1',
  Ratio_4_3 = 'ratio_4_3',
}

export enum Enum_Componentsectionspartners_Titlelevel {
  H2 = 'h2',
  H3 = 'h3',
}

export enum Enum_Componentsectionsprosandconssection_Textalign {
  Center = 'center',
  Left = 'left',
}

export enum Enum_Componentsectionstextwithimageoverlapped_Imageposition {
  Left = 'left',
  LeftShifted = 'left_shifted',
  Right = 'right',
  RightShifted = 'right_shifted',
}

export enum Enum_Componentsectionstextwithimage_Imageaspectratio {
  Ratio_1_1 = 'ratio_1_1',
  Ratio_4_3 = 'ratio_4_3',
}

export enum Enum_Componentsectionstextwithimage_Imageposition {
  Left = 'left',
  Right = 'right',
}

export enum Enum_Componentsectionsvideos_Titlelevel {
  H2 = 'h2',
  H3 = 'h3',
}

export enum Enum_Internaljob_Jobtype {
  CreateRedirect = 'CREATE_REDIRECT',
  RecalculateFullpath = 'RECALCULATE_FULLPATH',
}

export enum Enum_Internaljob_State {
  Completed = 'completed',
  Failed = 'failed',
  Pending = 'pending',
}

export enum Enum_Pagecategory_Color {
  Blue = 'blue',
  Brown = 'brown',
  Green = 'green',
  Purple = 'purple',
  Red = 'red',
  Yellow = 'yellow',
}

export enum Enum_Pagecategory_Icon {
  DopravaMapy_02 = 'doprava_mapy_02',
  Kultura_06 = 'kultura_06',
  Mesto_01 = 'mesto_01',
  SocialnaPomoc_04 = 'socialna_pomoc_04',
  Vzdelavanie_05 = 'vzdelavanie_05',
  ZpVystavba_03 = 'zp_vystavba_03',
}

export enum Enum_Page_Pagecolor {
  Blue = 'blue',
  Brown = 'brown',
  Green = 'green',
  Purple = 'purple',
  Red = 'red',
  Starz = 'starz',
  Yellow = 'yellow',
}

export enum Enum_Regulation_Category {
  Archiv = 'archiv',
  DaneAPoplatky = 'daneAPoplatky',
  Hospodarenie = 'hospodarenie',
  Ostatne = 'ostatne',
  PomenovanieUlic = 'pomenovanieUlic',
  PoriadokACistota = 'poriadokACistota',
  SocialnaPomocASkolstvo = 'socialnaPomocASkolstvo',
  UzemnePlanovanie = 'uzemnePlanovanie',
}

export type Error = {
  __typename?: 'Error'
  code: Scalars['String']['output']
  message?: Maybe<Scalars['String']['output']>
}

export type Faq = {
  __typename?: 'Faq'
  adminGroups: Array<Maybe<AdminGroup>>
  adminGroups_connection?: Maybe<AdminGroupRelationResponseCollection>
  body?: Maybe<Scalars['String']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  documentId: Scalars['ID']['output']
  faqCategory?: Maybe<FaqCategory>
  locale?: Maybe<Scalars['String']['output']>
  localizations: Array<Maybe<Faq>>
  localizations_connection?: Maybe<FaqRelationResponseCollection>
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  title: Scalars['String']['output']
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type FaqAdminGroupsArgs = {
  filters?: InputMaybe<AdminGroupFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type FaqAdminGroups_ConnectionArgs = {
  filters?: InputMaybe<AdminGroupFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type FaqLocalizationsArgs = {
  filters?: InputMaybe<FaqFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type FaqLocalizations_ConnectionArgs = {
  filters?: InputMaybe<FaqFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type FaqCategory = {
  __typename?: 'FaqCategory'
  createdAt?: Maybe<Scalars['DateTime']['output']>
  documentId: Scalars['ID']['output']
  faqs: Array<Maybe<Faq>>
  faqs_connection?: Maybe<FaqRelationResponseCollection>
  locale?: Maybe<Scalars['String']['output']>
  localizations: Array<Maybe<FaqCategory>>
  localizations_connection?: Maybe<FaqCategoryRelationResponseCollection>
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  slug: Scalars['String']['output']
  title: Scalars['String']['output']
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type FaqCategoryFaqsArgs = {
  filters?: InputMaybe<FaqFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type FaqCategoryFaqs_ConnectionArgs = {
  filters?: InputMaybe<FaqFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type FaqCategoryLocalizationsArgs = {
  filters?: InputMaybe<FaqCategoryFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type FaqCategoryLocalizations_ConnectionArgs = {
  filters?: InputMaybe<FaqCategoryFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type FaqCategoryEntity = {
  __typename?: 'FaqCategoryEntity'
  attributes?: Maybe<FaqCategory>
  id?: Maybe<Scalars['ID']['output']>
}

export type FaqCategoryEntityResponse = {
  __typename?: 'FaqCategoryEntityResponse'
  data?: Maybe<FaqCategory>
}

export type FaqCategoryEntityResponseCollection = {
  __typename?: 'FaqCategoryEntityResponseCollection'
  nodes: Array<FaqCategory>
  pageInfo: Pagination
}

export type FaqCategoryFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<FaqCategoryFiltersInput>>>
  createdAt?: InputMaybe<DateTimeFilterInput>
  documentId?: InputMaybe<IdFilterInput>
  faqs?: InputMaybe<FaqFiltersInput>
  locale?: InputMaybe<StringFilterInput>
  localizations?: InputMaybe<FaqCategoryFiltersInput>
  not?: InputMaybe<FaqCategoryFiltersInput>
  or?: InputMaybe<Array<InputMaybe<FaqCategoryFiltersInput>>>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  slug?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type FaqCategoryInput = {
  faqs?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
  slug?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type FaqCategoryRelationResponseCollection = {
  __typename?: 'FaqCategoryRelationResponseCollection'
  nodes: Array<FaqCategory>
}

export type FaqEntity = {
  __typename?: 'FaqEntity'
  attributes?: Maybe<Faq>
  id?: Maybe<Scalars['ID']['output']>
}

export type FaqEntityResponse = {
  __typename?: 'FaqEntityResponse'
  data?: Maybe<Faq>
}

export type FaqEntityResponseCollection = {
  __typename?: 'FaqEntityResponseCollection'
  nodes: Array<Faq>
  pageInfo: Pagination
}

export type FaqFiltersInput = {
  adminGroups?: InputMaybe<AdminGroupFiltersInput>
  and?: InputMaybe<Array<InputMaybe<FaqFiltersInput>>>
  body?: InputMaybe<StringFilterInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  documentId?: InputMaybe<IdFilterInput>
  faqCategory?: InputMaybe<FaqCategoryFiltersInput>
  locale?: InputMaybe<StringFilterInput>
  localizations?: InputMaybe<FaqFiltersInput>
  not?: InputMaybe<FaqFiltersInput>
  or?: InputMaybe<Array<InputMaybe<FaqFiltersInput>>>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  title?: InputMaybe<StringFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type FaqInput = {
  adminGroups?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  body?: InputMaybe<Scalars['String']['input']>
  faqCategory?: InputMaybe<Scalars['ID']['input']>
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type FaqRelationResponseCollection = {
  __typename?: 'FaqRelationResponseCollection'
  nodes: Array<Faq>
}

export type FileInfoInput = {
  alternativeText?: InputMaybe<Scalars['String']['input']>
  caption?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
}

export type FloatFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>
  between?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>
  contains?: InputMaybe<Scalars['Float']['input']>
  containsi?: InputMaybe<Scalars['Float']['input']>
  endsWith?: InputMaybe<Scalars['Float']['input']>
  eq?: InputMaybe<Scalars['Float']['input']>
  eqi?: InputMaybe<Scalars['Float']['input']>
  gt?: InputMaybe<Scalars['Float']['input']>
  gte?: InputMaybe<Scalars['Float']['input']>
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>
  lt?: InputMaybe<Scalars['Float']['input']>
  lte?: InputMaybe<Scalars['Float']['input']>
  ne?: InputMaybe<Scalars['Float']['input']>
  nei?: InputMaybe<Scalars['Float']['input']>
  not?: InputMaybe<FloatFilterInput>
  notContains?: InputMaybe<Scalars['Float']['input']>
  notContainsi?: InputMaybe<Scalars['Float']['input']>
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>
  notNull?: InputMaybe<Scalars['Boolean']['input']>
  null?: InputMaybe<Scalars['Boolean']['input']>
  or?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>
  startsWith?: InputMaybe<Scalars['Float']['input']>
}

export type Footer = {
  __typename?: 'Footer'
  accessibilityPageLink?: Maybe<ComponentBlocksCommonLink>
  columns?: Maybe<Array<Maybe<ComponentBlocksFooterColumn>>>
  contactText?: Maybe<Scalars['String']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  documentId: Scalars['ID']['output']
  facebookUrl?: Maybe<Scalars['String']['output']>
  innovationsLink?: Maybe<ComponentBlocksCommonLink>
  instagramUrl?: Maybe<Scalars['String']['output']>
  linkedinUrl?: Maybe<Scalars['String']['output']>
  locale?: Maybe<Scalars['String']['output']>
  localizations: Array<Maybe<Footer>>
  localizations_connection?: Maybe<FooterRelationResponseCollection>
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  tiktokUrl?: Maybe<Scalars['String']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  youtubeUrl?: Maybe<Scalars['String']['output']>
}

export type FooterColumnsArgs = {
  filters?: InputMaybe<ComponentBlocksFooterColumnFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type FooterEntity = {
  __typename?: 'FooterEntity'
  attributes?: Maybe<Footer>
  id?: Maybe<Scalars['ID']['output']>
}

export type FooterEntityResponse = {
  __typename?: 'FooterEntityResponse'
  data?: Maybe<Footer>
}

export type FooterEntityResponseCollection = {
  __typename?: 'FooterEntityResponseCollection'
  nodes: Array<Footer>
  pageInfo: Pagination
}

export type FooterFiltersInput = {
  accessibilityPageLink?: InputMaybe<ComponentBlocksCommonLinkFiltersInput>
  and?: InputMaybe<Array<InputMaybe<FooterFiltersInput>>>
  columns?: InputMaybe<ComponentBlocksFooterColumnFiltersInput>
  contactText?: InputMaybe<StringFilterInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  facebookUrl?: InputMaybe<StringFilterInput>
  innovationsLink?: InputMaybe<ComponentBlocksCommonLinkFiltersInput>
  instagramUrl?: InputMaybe<StringFilterInput>
  linkedinUrl?: InputMaybe<StringFilterInput>
  locale?: InputMaybe<StringFilterInput>
  localizations?: InputMaybe<FooterFiltersInput>
  not?: InputMaybe<FooterFiltersInput>
  or?: InputMaybe<Array<InputMaybe<FooterFiltersInput>>>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  tiktokUrl?: InputMaybe<StringFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
  youtubeUrl?: InputMaybe<StringFilterInput>
}

export type FooterInput = {
  accessibilityPageLink?: InputMaybe<ComponentBlocksCommonLinkInput>
  columns?: InputMaybe<Array<InputMaybe<ComponentBlocksFooterColumnInput>>>
  contactText?: InputMaybe<Scalars['String']['input']>
  facebookUrl?: InputMaybe<Scalars['String']['input']>
  innovationsLink?: InputMaybe<ComponentBlocksCommonLinkInput>
  instagramUrl?: InputMaybe<Scalars['String']['input']>
  linkedinUrl?: InputMaybe<Scalars['String']['input']>
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
  tiktokUrl?: InputMaybe<Scalars['String']['input']>
  youtubeUrl?: InputMaybe<Scalars['String']['input']>
}

export type FooterRelationResponseCollection = {
  __typename?: 'FooterRelationResponseCollection'
  nodes: Array<Footer>
}

export type General = {
  __typename?: 'General'
  createdAt?: Maybe<Scalars['DateTime']['output']>
  documentId: Scalars['ID']['output']
  documentsPage?: Maybe<Page>
  header?: Maybe<ComponentGeneralHeader>
  inbaPage?: Maybe<Page>
  inbaReleasesPage?: Maybe<Page>
  locale?: Maybe<Scalars['String']['output']>
  localizations: Array<Maybe<General>>
  localizations_connection?: Maybe<GeneralRelationResponseCollection>
  newsPage?: Maybe<Page>
  officialBoardPage?: Maybe<Page>
  privacyPolicyPage?: Maybe<Page>
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  vznPage?: Maybe<Page>
}

export type GeneralEntity = {
  __typename?: 'GeneralEntity'
  attributes?: Maybe<General>
  id?: Maybe<Scalars['ID']['output']>
}

export type GeneralEntityResponse = {
  __typename?: 'GeneralEntityResponse'
  data?: Maybe<General>
}

export type GeneralEntityResponseCollection = {
  __typename?: 'GeneralEntityResponseCollection'
  nodes: Array<General>
  pageInfo: Pagination
}

export type GeneralFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<GeneralFiltersInput>>>
  createdAt?: InputMaybe<DateTimeFilterInput>
  documentsPage?: InputMaybe<PageFiltersInput>
  header?: InputMaybe<ComponentGeneralHeaderFiltersInput>
  inbaPage?: InputMaybe<PageFiltersInput>
  inbaReleasesPage?: InputMaybe<PageFiltersInput>
  locale?: InputMaybe<StringFilterInput>
  localizations?: InputMaybe<GeneralFiltersInput>
  newsPage?: InputMaybe<PageFiltersInput>
  not?: InputMaybe<GeneralFiltersInput>
  officialBoardPage?: InputMaybe<PageFiltersInput>
  or?: InputMaybe<Array<InputMaybe<GeneralFiltersInput>>>
  privacyPolicyPage?: InputMaybe<PageFiltersInput>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
  vznPage?: InputMaybe<PageFiltersInput>
}

export type GeneralInput = {
  documentsPage?: InputMaybe<Scalars['ID']['input']>
  header?: InputMaybe<ComponentGeneralHeaderInput>
  inbaPage?: InputMaybe<Scalars['ID']['input']>
  inbaReleasesPage?: InputMaybe<Scalars['ID']['input']>
  newsPage?: InputMaybe<Scalars['ID']['input']>
  officialBoardPage?: InputMaybe<Scalars['ID']['input']>
  privacyPolicyPage?: InputMaybe<Scalars['ID']['input']>
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
  vznPage?: InputMaybe<Scalars['ID']['input']>
}

export type GeneralRelationResponseCollection = {
  __typename?: 'GeneralRelationResponseCollection'
  nodes: Array<General>
}

export type GenericMorph =
  | AdminGroup
  | Alert
  | Article
  | ArticleCategory
  | Asset
  | AssetCategory
  | ComponentAccordionItemsFlatText
  | ComponentAccordionItemsInstitution
  | ComponentBlocksCardLink
  | ComponentBlocksColumnsItem
  | ComponentBlocksColumnsListItem
  | ComponentBlocksCommonLink
  | ComponentBlocksComparisonCard
  | ComponentBlocksComparisonItem
  | ComponentBlocksContactCard
  | ComponentBlocksContactDirectionsCard
  | ComponentBlocksContactPersonCard
  | ComponentBlocksFile
  | ComponentBlocksFileItem
  | ComponentBlocksFooterColumn
  | ComponentBlocksHomepageHighlightsItem
  | ComponentBlocksInBa
  | ComponentBlocksNumbersOverviewItem
  | ComponentBlocksNumericalListItem
  | ComponentBlocksOpeningHoursAlertMessage
  | ComponentBlocksOpeningHoursItem
  | ComponentBlocksPageLink
  | ComponentBlocksPartner
  | ComponentBlocksProsAndConsCard
  | ComponentBlocksStarzLandingPageBanner
  | ComponentBlocksSubnavigationLink
  | ComponentBlocksTopServicesItem
  | ComponentBlocksVideo
  | ComponentGeneralHeader
  | ComponentGeneralHeaderLink
  | ComponentHeaderSectionsEvent
  | ComponentHeaderSectionsFacility
  | ComponentMenuMenuItem
  | ComponentMenuMenuLink
  | ComponentMenuMenuSection
  | ComponentSectionsAccordion
  | ComponentSectionsAlert
  | ComponentSectionsArticles
  | ComponentSectionsArticlesLandingPage
  | ComponentSectionsAssets
  | ComponentSectionsBanner
  | ComponentSectionsColumnedText
  | ComponentSectionsColumns
  | ComponentSectionsColumnsList
  | ComponentSectionsComparisonSection
  | ComponentSectionsContactsSection
  | ComponentSectionsDivider
  | ComponentSectionsDocuments
  | ComponentSectionsEvents
  | ComponentSectionsFacilities
  | ComponentSectionsFaqCategories
  | ComponentSectionsFaqs
  | ComponentSectionsFileList
  | ComponentSectionsGallery
  | ComponentSectionsHomepageEvents
  | ComponentSectionsHomepageHighlights
  | ComponentSectionsHomepageMayorAndCouncil
  | ComponentSectionsHomepageTabs
  | ComponentSectionsIframe
  | ComponentSectionsInbaLatestRelease
  | ComponentSectionsInbaReleases
  | ComponentSectionsJobOfferList
  | ComponentSectionsLinks
  | ComponentSectionsNarrowText
  | ComponentSectionsNewsletter
  | ComponentSectionsNumbersOverview
  | ComponentSectionsNumericalList
  | ComponentSectionsOfficialBoard
  | ComponentSectionsOpeningHours
  | ComponentSectionsOrganizationalStructure
  | ComponentSectionsPartners
  | ComponentSectionsProsAndConsSection
  | ComponentSectionsRegulations
  | ComponentSectionsStarzLandingPage
  | ComponentSectionsSubnavigation
  | ComponentSectionsTextWithImage
  | ComponentSectionsTextWithImageOverlapped
  | ComponentSectionsTootootEvents
  | ComponentSectionsTopServices
  | ComponentSectionsVideos
  | ComponentSidebarsEmptySidebar
  | ComponentTaxAdministratorsTaxAdministrator
  | Document
  | DocumentCategory
  | Faq
  | FaqCategory
  | Footer
  | General
  | Homepage
  | I18NLocale
  | InbaArticle
  | InbaRelease
  | InbaTag
  | InternalJob
  | Menu
  | Page
  | PageCategory
  | Redirect
  | Regulation
  | ReviewWorkflowsWorkflow
  | ReviewWorkflowsWorkflowStage
  | Tag
  | TaxAdministratorsList
  | UploadFile
  | UsersPermissionsPermission
  | UsersPermissionsRole
  | UsersPermissionsUser

export type Homepage = {
  __typename?: 'Homepage'
  createdAt?: Maybe<Scalars['DateTime']['output']>
  documentId: Scalars['ID']['output']
  eventsSection?: Maybe<ComponentSectionsTootootEvents>
  highlights?: Maybe<ComponentSectionsHomepageHighlights>
  inba?: Maybe<ComponentBlocksInBa>
  locale?: Maybe<Scalars['String']['output']>
  localizations: Array<Maybe<Homepage>>
  localizations_connection?: Maybe<HomepageRelationResponseCollection>
  mayorAndCouncil?: Maybe<ComponentSectionsHomepageMayorAndCouncil>
  metaDescription: Scalars['String']['output']
  metaTitle: Scalars['String']['output']
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  tabs?: Maybe<ComponentSectionsHomepageTabs>
  topServices?: Maybe<ComponentSectionsTopServices>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  welcomeHeadline: Scalars['String']['output']
  welcomeMedia: UploadFile
}

export type HomepageEntity = {
  __typename?: 'HomepageEntity'
  attributes?: Maybe<Homepage>
  id?: Maybe<Scalars['ID']['output']>
}

export type HomepageEntityResponse = {
  __typename?: 'HomepageEntityResponse'
  data?: Maybe<Homepage>
}

export type HomepageEntityResponseCollection = {
  __typename?: 'HomepageEntityResponseCollection'
  nodes: Array<Homepage>
  pageInfo: Pagination
}

export type HomepageFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<HomepageFiltersInput>>>
  createdAt?: InputMaybe<DateTimeFilterInput>
  eventsSection?: InputMaybe<ComponentSectionsTootootEventsFiltersInput>
  highlights?: InputMaybe<ComponentSectionsHomepageHighlightsFiltersInput>
  inba?: InputMaybe<ComponentBlocksInBaFiltersInput>
  locale?: InputMaybe<StringFilterInput>
  localizations?: InputMaybe<HomepageFiltersInput>
  mayorAndCouncil?: InputMaybe<ComponentSectionsHomepageMayorAndCouncilFiltersInput>
  metaDescription?: InputMaybe<StringFilterInput>
  metaTitle?: InputMaybe<StringFilterInput>
  not?: InputMaybe<HomepageFiltersInput>
  or?: InputMaybe<Array<InputMaybe<HomepageFiltersInput>>>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  tabs?: InputMaybe<ComponentSectionsHomepageTabsFiltersInput>
  topServices?: InputMaybe<ComponentSectionsTopServicesFiltersInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
  welcomeHeadline?: InputMaybe<StringFilterInput>
}

export type HomepageInput = {
  eventsSection?: InputMaybe<ComponentSectionsTootootEventsInput>
  highlights?: InputMaybe<ComponentSectionsHomepageHighlightsInput>
  inba?: InputMaybe<ComponentBlocksInBaInput>
  mayorAndCouncil?: InputMaybe<ComponentSectionsHomepageMayorAndCouncilInput>
  metaDescription?: InputMaybe<Scalars['String']['input']>
  metaTitle?: InputMaybe<Scalars['String']['input']>
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
  tabs?: InputMaybe<ComponentSectionsHomepageTabsInput>
  topServices?: InputMaybe<ComponentSectionsTopServicesInput>
  welcomeHeadline?: InputMaybe<Scalars['String']['input']>
  welcomeMedia?: InputMaybe<Scalars['ID']['input']>
}

export type HomepageRelationResponseCollection = {
  __typename?: 'HomepageRelationResponseCollection'
  nodes: Array<Homepage>
}

export type I18NLocale = {
  __typename?: 'I18NLocale'
  code?: Maybe<Scalars['String']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  documentId: Scalars['ID']['output']
  name?: Maybe<Scalars['String']['output']>
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type I18NLocaleEntity = {
  __typename?: 'I18NLocaleEntity'
  attributes?: Maybe<I18NLocale>
  id?: Maybe<Scalars['ID']['output']>
}

export type I18NLocaleEntityResponse = {
  __typename?: 'I18NLocaleEntityResponse'
  data?: Maybe<I18NLocale>
}

export type I18NLocaleEntityResponseCollection = {
  __typename?: 'I18NLocaleEntityResponseCollection'
  nodes: Array<I18NLocale>
  pageInfo: Pagination
}

export type I18NLocaleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>
  code?: InputMaybe<StringFilterInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  documentId?: InputMaybe<IdFilterInput>
  name?: InputMaybe<StringFilterInput>
  not?: InputMaybe<I18NLocaleFiltersInput>
  or?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type I18NLocaleInput = {
  code?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
}

export type I18NLocaleRelationResponseCollection = {
  __typename?: 'I18NLocaleRelationResponseCollection'
  nodes: Array<I18NLocale>
}

export type IdFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  between?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  contains?: InputMaybe<Scalars['ID']['input']>
  containsi?: InputMaybe<Scalars['ID']['input']>
  endsWith?: InputMaybe<Scalars['ID']['input']>
  eq?: InputMaybe<Scalars['ID']['input']>
  eqi?: InputMaybe<Scalars['ID']['input']>
  gt?: InputMaybe<Scalars['ID']['input']>
  gte?: InputMaybe<Scalars['ID']['input']>
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  lt?: InputMaybe<Scalars['ID']['input']>
  lte?: InputMaybe<Scalars['ID']['input']>
  ne?: InputMaybe<Scalars['ID']['input']>
  nei?: InputMaybe<Scalars['ID']['input']>
  not?: InputMaybe<IdFilterInput>
  notContains?: InputMaybe<Scalars['ID']['input']>
  notContainsi?: InputMaybe<Scalars['ID']['input']>
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  notNull?: InputMaybe<Scalars['Boolean']['input']>
  null?: InputMaybe<Scalars['Boolean']['input']>
  or?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  startsWith?: InputMaybe<Scalars['ID']['input']>
}

export type InbaArticle = {
  __typename?: 'InbaArticle'
  content?: Maybe<Scalars['String']['output']>
  coverImage?: Maybe<UploadFile>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  documentId: Scalars['ID']['output']
  inbaTag?: Maybe<InbaTag>
  locale?: Maybe<Scalars['String']['output']>
  localizations: Array<Maybe<InbaArticle>>
  localizations_connection?: Maybe<InbaArticleRelationResponseCollection>
  perex?: Maybe<Scalars['String']['output']>
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  slug: Scalars['String']['output']
  tags: Array<Maybe<Tag>>
  tags_connection?: Maybe<TagRelationResponseCollection>
  title: Scalars['String']['output']
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type InbaArticleLocalizationsArgs = {
  filters?: InputMaybe<InbaArticleFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type InbaArticleLocalizations_ConnectionArgs = {
  filters?: InputMaybe<InbaArticleFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type InbaArticleTagsArgs = {
  filters?: InputMaybe<TagFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type InbaArticleTags_ConnectionArgs = {
  filters?: InputMaybe<TagFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type InbaArticleEntity = {
  __typename?: 'InbaArticleEntity'
  attributes?: Maybe<InbaArticle>
  id?: Maybe<Scalars['ID']['output']>
}

export type InbaArticleEntityResponse = {
  __typename?: 'InbaArticleEntityResponse'
  data?: Maybe<InbaArticle>
}

export type InbaArticleEntityResponseCollection = {
  __typename?: 'InbaArticleEntityResponseCollection'
  nodes: Array<InbaArticle>
  pageInfo: Pagination
}

export type InbaArticleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<InbaArticleFiltersInput>>>
  content?: InputMaybe<StringFilterInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  documentId?: InputMaybe<IdFilterInput>
  inbaTag?: InputMaybe<InbaTagFiltersInput>
  locale?: InputMaybe<StringFilterInput>
  localizations?: InputMaybe<InbaArticleFiltersInput>
  not?: InputMaybe<InbaArticleFiltersInput>
  or?: InputMaybe<Array<InputMaybe<InbaArticleFiltersInput>>>
  perex?: InputMaybe<StringFilterInput>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  slug?: InputMaybe<StringFilterInput>
  tags?: InputMaybe<TagFiltersInput>
  title?: InputMaybe<StringFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type InbaArticleInput = {
  content?: InputMaybe<Scalars['String']['input']>
  coverImage?: InputMaybe<Scalars['ID']['input']>
  inbaTag?: InputMaybe<Scalars['ID']['input']>
  perex?: InputMaybe<Scalars['String']['input']>
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
  slug?: InputMaybe<Scalars['String']['input']>
  tags?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  title?: InputMaybe<Scalars['String']['input']>
}

export type InbaArticleRelationResponseCollection = {
  __typename?: 'InbaArticleRelationResponseCollection'
  nodes: Array<InbaArticle>
}

export type InbaRelease = {
  __typename?: 'InbaRelease'
  articles: Array<Maybe<Article>>
  articles_connection?: Maybe<ArticleRelationResponseCollection>
  coverImage?: Maybe<UploadFile>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  documentId: Scalars['ID']['output']
  featuredArticles: Array<Maybe<Article>>
  featuredArticles_connection?: Maybe<ArticleRelationResponseCollection>
  files?: Maybe<Array<Maybe<ComponentBlocksFile>>>
  perex?: Maybe<Scalars['String']['output']>
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  rearImage?: Maybe<UploadFile>
  releaseDate: Scalars['Date']['output']
  slug: Scalars['String']['output']
  title: Scalars['String']['output']
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type InbaReleaseArticlesArgs = {
  filters?: InputMaybe<ArticleFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type InbaReleaseArticles_ConnectionArgs = {
  filters?: InputMaybe<ArticleFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type InbaReleaseFeaturedArticlesArgs = {
  filters?: InputMaybe<ArticleFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type InbaReleaseFeaturedArticles_ConnectionArgs = {
  filters?: InputMaybe<ArticleFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type InbaReleaseFilesArgs = {
  filters?: InputMaybe<ComponentBlocksFileFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type InbaReleaseEntity = {
  __typename?: 'InbaReleaseEntity'
  attributes?: Maybe<InbaRelease>
  id?: Maybe<Scalars['ID']['output']>
}

export type InbaReleaseEntityResponse = {
  __typename?: 'InbaReleaseEntityResponse'
  data?: Maybe<InbaRelease>
}

export type InbaReleaseEntityResponseCollection = {
  __typename?: 'InbaReleaseEntityResponseCollection'
  nodes: Array<InbaRelease>
  pageInfo: Pagination
}

export type InbaReleaseFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<InbaReleaseFiltersInput>>>
  articles?: InputMaybe<ArticleFiltersInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  documentId?: InputMaybe<IdFilterInput>
  featuredArticles?: InputMaybe<ArticleFiltersInput>
  files?: InputMaybe<ComponentBlocksFileFiltersInput>
  not?: InputMaybe<InbaReleaseFiltersInput>
  or?: InputMaybe<Array<InputMaybe<InbaReleaseFiltersInput>>>
  perex?: InputMaybe<StringFilterInput>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  releaseDate?: InputMaybe<DateFilterInput>
  slug?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type InbaReleaseInput = {
  articles?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  coverImage?: InputMaybe<Scalars['ID']['input']>
  featuredArticles?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  files?: InputMaybe<Array<InputMaybe<ComponentBlocksFileInput>>>
  perex?: InputMaybe<Scalars['String']['input']>
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
  rearImage?: InputMaybe<Scalars['ID']['input']>
  releaseDate?: InputMaybe<Scalars['Date']['input']>
  slug?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type InbaReleaseRelationResponseCollection = {
  __typename?: 'InbaReleaseRelationResponseCollection'
  nodes: Array<InbaRelease>
}

export type InbaTag = {
  __typename?: 'InbaTag'
  createdAt?: Maybe<Scalars['DateTime']['output']>
  documentId: Scalars['ID']['output']
  inbaArticles: Array<Maybe<InbaArticle>>
  inbaArticles_connection?: Maybe<InbaArticleRelationResponseCollection>
  locale?: Maybe<Scalars['String']['output']>
  localizations: Array<Maybe<InbaTag>>
  localizations_connection?: Maybe<InbaTagRelationResponseCollection>
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  title: Scalars['String']['output']
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type InbaTagInbaArticlesArgs = {
  filters?: InputMaybe<InbaArticleFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type InbaTagInbaArticles_ConnectionArgs = {
  filters?: InputMaybe<InbaArticleFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type InbaTagLocalizationsArgs = {
  filters?: InputMaybe<InbaTagFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type InbaTagLocalizations_ConnectionArgs = {
  filters?: InputMaybe<InbaTagFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type InbaTagEntity = {
  __typename?: 'InbaTagEntity'
  attributes?: Maybe<InbaTag>
  id?: Maybe<Scalars['ID']['output']>
}

export type InbaTagEntityResponse = {
  __typename?: 'InbaTagEntityResponse'
  data?: Maybe<InbaTag>
}

export type InbaTagEntityResponseCollection = {
  __typename?: 'InbaTagEntityResponseCollection'
  nodes: Array<InbaTag>
  pageInfo: Pagination
}

export type InbaTagFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<InbaTagFiltersInput>>>
  createdAt?: InputMaybe<DateTimeFilterInput>
  documentId?: InputMaybe<IdFilterInput>
  inbaArticles?: InputMaybe<InbaArticleFiltersInput>
  locale?: InputMaybe<StringFilterInput>
  localizations?: InputMaybe<InbaTagFiltersInput>
  not?: InputMaybe<InbaTagFiltersInput>
  or?: InputMaybe<Array<InputMaybe<InbaTagFiltersInput>>>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  title?: InputMaybe<StringFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type InbaTagInput = {
  inbaArticles?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type InbaTagRelationResponseCollection = {
  __typename?: 'InbaTagRelationResponseCollection'
  nodes: Array<InbaTag>
}

export type IntFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
  between?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
  contains?: InputMaybe<Scalars['Int']['input']>
  containsi?: InputMaybe<Scalars['Int']['input']>
  endsWith?: InputMaybe<Scalars['Int']['input']>
  eq?: InputMaybe<Scalars['Int']['input']>
  eqi?: InputMaybe<Scalars['Int']['input']>
  gt?: InputMaybe<Scalars['Int']['input']>
  gte?: InputMaybe<Scalars['Int']['input']>
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
  lt?: InputMaybe<Scalars['Int']['input']>
  lte?: InputMaybe<Scalars['Int']['input']>
  ne?: InputMaybe<Scalars['Int']['input']>
  nei?: InputMaybe<Scalars['Int']['input']>
  not?: InputMaybe<IntFilterInput>
  notContains?: InputMaybe<Scalars['Int']['input']>
  notContainsi?: InputMaybe<Scalars['Int']['input']>
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
  notNull?: InputMaybe<Scalars['Boolean']['input']>
  null?: InputMaybe<Scalars['Boolean']['input']>
  or?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>
  startsWith?: InputMaybe<Scalars['Int']['input']>
}

export type InternalJob = {
  __typename?: 'InternalJob'
  createdAt?: Maybe<Scalars['DateTime']['output']>
  documentId: Scalars['ID']['output']
  error?: Maybe<Scalars['String']['output']>
  jobType: Enum_Internaljob_Jobtype
  payload: Scalars['JSON']['output']
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  relatedDocumentId?: Maybe<Scalars['String']['output']>
  state: Enum_Internaljob_State
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type InternalJobEntity = {
  __typename?: 'InternalJobEntity'
  attributes?: Maybe<InternalJob>
  id?: Maybe<Scalars['ID']['output']>
}

export type InternalJobEntityResponse = {
  __typename?: 'InternalJobEntityResponse'
  data?: Maybe<InternalJob>
}

export type InternalJobEntityResponseCollection = {
  __typename?: 'InternalJobEntityResponseCollection'
  nodes: Array<InternalJob>
  pageInfo: Pagination
}

export type InternalJobFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<InternalJobFiltersInput>>>
  createdAt?: InputMaybe<DateTimeFilterInput>
  documentId?: InputMaybe<IdFilterInput>
  error?: InputMaybe<StringFilterInput>
  jobType?: InputMaybe<StringFilterInput>
  not?: InputMaybe<InternalJobFiltersInput>
  or?: InputMaybe<Array<InputMaybe<InternalJobFiltersInput>>>
  payload?: InputMaybe<JsonFilterInput>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  relatedDocumentId?: InputMaybe<StringFilterInput>
  state?: InputMaybe<StringFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type InternalJobInput = {
  error?: InputMaybe<Scalars['String']['input']>
  jobType?: InputMaybe<Enum_Internaljob_Jobtype>
  payload?: InputMaybe<Scalars['JSON']['input']>
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
  relatedDocumentId?: InputMaybe<Scalars['String']['input']>
  state?: InputMaybe<Enum_Internaljob_State>
}

export type InternalJobRelationResponseCollection = {
  __typename?: 'InternalJobRelationResponseCollection'
  nodes: Array<InternalJob>
}

export type JsonFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>
  between?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>
  contains?: InputMaybe<Scalars['JSON']['input']>
  containsi?: InputMaybe<Scalars['JSON']['input']>
  endsWith?: InputMaybe<Scalars['JSON']['input']>
  eq?: InputMaybe<Scalars['JSON']['input']>
  eqi?: InputMaybe<Scalars['JSON']['input']>
  gt?: InputMaybe<Scalars['JSON']['input']>
  gte?: InputMaybe<Scalars['JSON']['input']>
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>
  lt?: InputMaybe<Scalars['JSON']['input']>
  lte?: InputMaybe<Scalars['JSON']['input']>
  ne?: InputMaybe<Scalars['JSON']['input']>
  nei?: InputMaybe<Scalars['JSON']['input']>
  not?: InputMaybe<JsonFilterInput>
  notContains?: InputMaybe<Scalars['JSON']['input']>
  notContainsi?: InputMaybe<Scalars['JSON']['input']>
  notIn?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>
  notNull?: InputMaybe<Scalars['Boolean']['input']>
  null?: InputMaybe<Scalars['Boolean']['input']>
  or?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>
  startsWith?: InputMaybe<Scalars['JSON']['input']>
}

export type LongFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Long']['input']>>>
  between?: InputMaybe<Array<InputMaybe<Scalars['Long']['input']>>>
  contains?: InputMaybe<Scalars['Long']['input']>
  containsi?: InputMaybe<Scalars['Long']['input']>
  endsWith?: InputMaybe<Scalars['Long']['input']>
  eq?: InputMaybe<Scalars['Long']['input']>
  eqi?: InputMaybe<Scalars['Long']['input']>
  gt?: InputMaybe<Scalars['Long']['input']>
  gte?: InputMaybe<Scalars['Long']['input']>
  in?: InputMaybe<Array<InputMaybe<Scalars['Long']['input']>>>
  lt?: InputMaybe<Scalars['Long']['input']>
  lte?: InputMaybe<Scalars['Long']['input']>
  ne?: InputMaybe<Scalars['Long']['input']>
  nei?: InputMaybe<Scalars['Long']['input']>
  not?: InputMaybe<LongFilterInput>
  notContains?: InputMaybe<Scalars['Long']['input']>
  notContainsi?: InputMaybe<Scalars['Long']['input']>
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Long']['input']>>>
  notNull?: InputMaybe<Scalars['Boolean']['input']>
  null?: InputMaybe<Scalars['Boolean']['input']>
  or?: InputMaybe<Array<InputMaybe<Scalars['Long']['input']>>>
  startsWith?: InputMaybe<Scalars['Long']['input']>
}

export type Menu = {
  __typename?: 'Menu'
  createdAt?: Maybe<Scalars['DateTime']['output']>
  documentId: Scalars['ID']['output']
  locale?: Maybe<Scalars['String']['output']>
  localizations: Array<Maybe<Menu>>
  localizations_connection?: Maybe<MenuRelationResponseCollection>
  menus?: Maybe<Array<Maybe<ComponentMenuMenuItem>>>
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type MenuMenusArgs = {
  filters?: InputMaybe<ComponentMenuMenuItemFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type MenuEntity = {
  __typename?: 'MenuEntity'
  attributes?: Maybe<Menu>
  id?: Maybe<Scalars['ID']['output']>
}

export type MenuEntityResponse = {
  __typename?: 'MenuEntityResponse'
  data?: Maybe<Menu>
}

export type MenuEntityResponseCollection = {
  __typename?: 'MenuEntityResponseCollection'
  nodes: Array<Menu>
  pageInfo: Pagination
}

export type MenuFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<MenuFiltersInput>>>
  createdAt?: InputMaybe<DateTimeFilterInput>
  locale?: InputMaybe<StringFilterInput>
  localizations?: InputMaybe<MenuFiltersInput>
  menus?: InputMaybe<ComponentMenuMenuItemFiltersInput>
  not?: InputMaybe<MenuFiltersInput>
  or?: InputMaybe<Array<InputMaybe<MenuFiltersInput>>>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type MenuInput = {
  menus?: InputMaybe<Array<InputMaybe<ComponentMenuMenuItemInput>>>
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
}

export type MenuRelationResponseCollection = {
  __typename?: 'MenuRelationResponseCollection'
  nodes: Array<Menu>
}

export type Mutation = {
  __typename?: 'Mutation'
  /** Change user password. Confirm with the current password. */
  changePassword?: Maybe<UsersPermissionsLoginPayload>
  createAdminGroup?: Maybe<AdminGroup>
  createArticle?: Maybe<Article>
  createArticleCategory?: Maybe<ArticleCategory>
  createAsset?: Maybe<Asset>
  createAssetCategory?: Maybe<AssetCategory>
  createDocument?: Maybe<Document>
  createDocumentCategory?: Maybe<DocumentCategory>
  createFaq?: Maybe<Faq>
  createFaqCategory?: Maybe<FaqCategory>
  createInbaArticle?: Maybe<InbaArticle>
  createInbaRelease?: Maybe<InbaRelease>
  createInbaTag?: Maybe<InbaTag>
  createInternalJob?: Maybe<InternalJob>
  createPage?: Maybe<Page>
  createPageCategory?: Maybe<PageCategory>
  createRedirect?: Maybe<Redirect>
  createRegulation?: Maybe<Regulation>
  createReviewWorkflowsWorkflow?: Maybe<ReviewWorkflowsWorkflow>
  createReviewWorkflowsWorkflowStage?: Maybe<ReviewWorkflowsWorkflowStage>
  createTag?: Maybe<Tag>
  /** Create a new role */
  createUsersPermissionsRole?: Maybe<UsersPermissionsCreateRolePayload>
  /** Create a new user */
  createUsersPermissionsUser: UsersPermissionsUserEntityResponse
  deleteAdminGroup?: Maybe<DeleteMutationResponse>
  deleteAlert?: Maybe<DeleteMutationResponse>
  deleteArticle?: Maybe<DeleteMutationResponse>
  deleteArticleCategory?: Maybe<DeleteMutationResponse>
  deleteAsset?: Maybe<DeleteMutationResponse>
  deleteAssetCategory?: Maybe<DeleteMutationResponse>
  deleteDocument?: Maybe<DeleteMutationResponse>
  deleteDocumentCategory?: Maybe<DeleteMutationResponse>
  deleteFaq?: Maybe<DeleteMutationResponse>
  deleteFaqCategory?: Maybe<DeleteMutationResponse>
  deleteFooter?: Maybe<DeleteMutationResponse>
  deleteGeneral?: Maybe<DeleteMutationResponse>
  deleteHomepage?: Maybe<DeleteMutationResponse>
  deleteInbaArticle?: Maybe<DeleteMutationResponse>
  deleteInbaRelease?: Maybe<DeleteMutationResponse>
  deleteInbaTag?: Maybe<DeleteMutationResponse>
  deleteInternalJob?: Maybe<DeleteMutationResponse>
  deleteMenu?: Maybe<DeleteMutationResponse>
  deletePage?: Maybe<DeleteMutationResponse>
  deletePageCategory?: Maybe<DeleteMutationResponse>
  deleteRedirect?: Maybe<DeleteMutationResponse>
  deleteRegulation?: Maybe<DeleteMutationResponse>
  deleteReviewWorkflowsWorkflow?: Maybe<DeleteMutationResponse>
  deleteReviewWorkflowsWorkflowStage?: Maybe<DeleteMutationResponse>
  deleteTag?: Maybe<DeleteMutationResponse>
  deleteTaxAdministratorsList?: Maybe<DeleteMutationResponse>
  deleteUploadFile?: Maybe<UploadFile>
  /** Delete an existing role */
  deleteUsersPermissionsRole?: Maybe<UsersPermissionsDeleteRolePayload>
  /** Delete an existing user */
  deleteUsersPermissionsUser: UsersPermissionsUserEntityResponse
  /** Confirm an email users email address */
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>
  /** Request a reset password token */
  forgotPassword?: Maybe<UsersPermissionsPasswordPayload>
  login: UsersPermissionsLoginPayload
  /** Register a user */
  register: UsersPermissionsLoginPayload
  /** Reset user password. Confirm with a code (resetToken from forgotPassword) */
  resetPassword?: Maybe<UsersPermissionsLoginPayload>
  updateAdminGroup?: Maybe<AdminGroup>
  updateAlert?: Maybe<Alert>
  updateArticle?: Maybe<Article>
  updateArticleCategory?: Maybe<ArticleCategory>
  updateAsset?: Maybe<Asset>
  updateAssetCategory?: Maybe<AssetCategory>
  updateDocument?: Maybe<Document>
  updateDocumentCategory?: Maybe<DocumentCategory>
  updateFaq?: Maybe<Faq>
  updateFaqCategory?: Maybe<FaqCategory>
  updateFooter?: Maybe<Footer>
  updateGeneral?: Maybe<General>
  updateHomepage?: Maybe<Homepage>
  updateInbaArticle?: Maybe<InbaArticle>
  updateInbaRelease?: Maybe<InbaRelease>
  updateInbaTag?: Maybe<InbaTag>
  updateInternalJob?: Maybe<InternalJob>
  updateMenu?: Maybe<Menu>
  updatePage?: Maybe<Page>
  updatePageCategory?: Maybe<PageCategory>
  updateRedirect?: Maybe<Redirect>
  updateRegulation?: Maybe<Regulation>
  updateReviewWorkflowsWorkflow?: Maybe<ReviewWorkflowsWorkflow>
  updateReviewWorkflowsWorkflowStage?: Maybe<ReviewWorkflowsWorkflowStage>
  updateTag?: Maybe<Tag>
  updateTaxAdministratorsList?: Maybe<TaxAdministratorsList>
  updateUploadFile: UploadFile
  /** Update an existing role */
  updateUsersPermissionsRole?: Maybe<UsersPermissionsUpdateRolePayload>
  /** Update an existing user */
  updateUsersPermissionsUser: UsersPermissionsUserEntityResponse
}

export type MutationChangePasswordArgs = {
  currentPassword: Scalars['String']['input']
  password: Scalars['String']['input']
  passwordConfirmation: Scalars['String']['input']
}

export type MutationCreateAdminGroupArgs = {
  data: AdminGroupInput
  status?: InputMaybe<PublicationStatus>
}

export type MutationCreateArticleArgs = {
  data: ArticleInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  status?: InputMaybe<PublicationStatus>
}

export type MutationCreateArticleCategoryArgs = {
  data: ArticleCategoryInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  status?: InputMaybe<PublicationStatus>
}

export type MutationCreateAssetArgs = {
  data: AssetInput
  status?: InputMaybe<PublicationStatus>
}

export type MutationCreateAssetCategoryArgs = {
  data: AssetCategoryInput
  status?: InputMaybe<PublicationStatus>
}

export type MutationCreateDocumentArgs = {
  data: DocumentInput
  status?: InputMaybe<PublicationStatus>
}

export type MutationCreateDocumentCategoryArgs = {
  data: DocumentCategoryInput
  status?: InputMaybe<PublicationStatus>
}

export type MutationCreateFaqArgs = {
  data: FaqInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  status?: InputMaybe<PublicationStatus>
}

export type MutationCreateFaqCategoryArgs = {
  data: FaqCategoryInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  status?: InputMaybe<PublicationStatus>
}

export type MutationCreateInbaArticleArgs = {
  data: InbaArticleInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  status?: InputMaybe<PublicationStatus>
}

export type MutationCreateInbaReleaseArgs = {
  data: InbaReleaseInput
  status?: InputMaybe<PublicationStatus>
}

export type MutationCreateInbaTagArgs = {
  data: InbaTagInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  status?: InputMaybe<PublicationStatus>
}

export type MutationCreateInternalJobArgs = {
  data: InternalJobInput
  status?: InputMaybe<PublicationStatus>
}

export type MutationCreatePageArgs = {
  data: PageInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  status?: InputMaybe<PublicationStatus>
}

export type MutationCreatePageCategoryArgs = {
  data: PageCategoryInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  status?: InputMaybe<PublicationStatus>
}

export type MutationCreateRedirectArgs = {
  data: RedirectInput
  status?: InputMaybe<PublicationStatus>
}

export type MutationCreateRegulationArgs = {
  data: RegulationInput
  status?: InputMaybe<PublicationStatus>
}

export type MutationCreateReviewWorkflowsWorkflowArgs = {
  data: ReviewWorkflowsWorkflowInput
  status?: InputMaybe<PublicationStatus>
}

export type MutationCreateReviewWorkflowsWorkflowStageArgs = {
  data: ReviewWorkflowsWorkflowStageInput
  status?: InputMaybe<PublicationStatus>
}

export type MutationCreateTagArgs = {
  data: TagInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  status?: InputMaybe<PublicationStatus>
}

export type MutationCreateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput
}

export type MutationCreateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput
}

export type MutationDeleteAdminGroupArgs = {
  documentId: Scalars['ID']['input']
}

export type MutationDeleteAlertArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationDeleteArticleArgs = {
  documentId: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationDeleteArticleCategoryArgs = {
  documentId: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationDeleteAssetArgs = {
  documentId: Scalars['ID']['input']
}

export type MutationDeleteAssetCategoryArgs = {
  documentId: Scalars['ID']['input']
}

export type MutationDeleteDocumentArgs = {
  documentId: Scalars['ID']['input']
}

export type MutationDeleteDocumentCategoryArgs = {
  documentId: Scalars['ID']['input']
}

export type MutationDeleteFaqArgs = {
  documentId: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationDeleteFaqCategoryArgs = {
  documentId: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationDeleteFooterArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationDeleteGeneralArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationDeleteHomepageArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationDeleteInbaArticleArgs = {
  documentId: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationDeleteInbaReleaseArgs = {
  documentId: Scalars['ID']['input']
}

export type MutationDeleteInbaTagArgs = {
  documentId: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationDeleteInternalJobArgs = {
  documentId: Scalars['ID']['input']
}

export type MutationDeleteMenuArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationDeletePageArgs = {
  documentId: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationDeletePageCategoryArgs = {
  documentId: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationDeleteRedirectArgs = {
  documentId: Scalars['ID']['input']
}

export type MutationDeleteRegulationArgs = {
  documentId: Scalars['ID']['input']
}

export type MutationDeleteReviewWorkflowsWorkflowArgs = {
  documentId: Scalars['ID']['input']
}

export type MutationDeleteReviewWorkflowsWorkflowStageArgs = {
  documentId: Scalars['ID']['input']
}

export type MutationDeleteTagArgs = {
  documentId: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationDeleteUploadFileArgs = {
  id: Scalars['ID']['input']
}

export type MutationDeleteUsersPermissionsRoleArgs = {
  id: Scalars['ID']['input']
}

export type MutationDeleteUsersPermissionsUserArgs = {
  id: Scalars['ID']['input']
}

export type MutationEmailConfirmationArgs = {
  confirmation: Scalars['String']['input']
}

export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input']
}

export type MutationLoginArgs = {
  input: UsersPermissionsLoginInput
}

export type MutationRegisterArgs = {
  input: UsersPermissionsRegisterInput
}

export type MutationResetPasswordArgs = {
  code: Scalars['String']['input']
  password: Scalars['String']['input']
  passwordConfirmation: Scalars['String']['input']
}

export type MutationUpdateAdminGroupArgs = {
  data: AdminGroupInput
  documentId: Scalars['ID']['input']
  status?: InputMaybe<PublicationStatus>
}

export type MutationUpdateAlertArgs = {
  data: AlertInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  status?: InputMaybe<PublicationStatus>
}

export type MutationUpdateArticleArgs = {
  data: ArticleInput
  documentId: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  status?: InputMaybe<PublicationStatus>
}

export type MutationUpdateArticleCategoryArgs = {
  data: ArticleCategoryInput
  documentId: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  status?: InputMaybe<PublicationStatus>
}

export type MutationUpdateAssetArgs = {
  data: AssetInput
  documentId: Scalars['ID']['input']
  status?: InputMaybe<PublicationStatus>
}

export type MutationUpdateAssetCategoryArgs = {
  data: AssetCategoryInput
  documentId: Scalars['ID']['input']
  status?: InputMaybe<PublicationStatus>
}

export type MutationUpdateDocumentArgs = {
  data: DocumentInput
  documentId: Scalars['ID']['input']
  status?: InputMaybe<PublicationStatus>
}

export type MutationUpdateDocumentCategoryArgs = {
  data: DocumentCategoryInput
  documentId: Scalars['ID']['input']
  status?: InputMaybe<PublicationStatus>
}

export type MutationUpdateFaqArgs = {
  data: FaqInput
  documentId: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  status?: InputMaybe<PublicationStatus>
}

export type MutationUpdateFaqCategoryArgs = {
  data: FaqCategoryInput
  documentId: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  status?: InputMaybe<PublicationStatus>
}

export type MutationUpdateFooterArgs = {
  data: FooterInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  status?: InputMaybe<PublicationStatus>
}

export type MutationUpdateGeneralArgs = {
  data: GeneralInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  status?: InputMaybe<PublicationStatus>
}

export type MutationUpdateHomepageArgs = {
  data: HomepageInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  status?: InputMaybe<PublicationStatus>
}

export type MutationUpdateInbaArticleArgs = {
  data: InbaArticleInput
  documentId: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  status?: InputMaybe<PublicationStatus>
}

export type MutationUpdateInbaReleaseArgs = {
  data: InbaReleaseInput
  documentId: Scalars['ID']['input']
  status?: InputMaybe<PublicationStatus>
}

export type MutationUpdateInbaTagArgs = {
  data: InbaTagInput
  documentId: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  status?: InputMaybe<PublicationStatus>
}

export type MutationUpdateInternalJobArgs = {
  data: InternalJobInput
  documentId: Scalars['ID']['input']
  status?: InputMaybe<PublicationStatus>
}

export type MutationUpdateMenuArgs = {
  data: MenuInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  status?: InputMaybe<PublicationStatus>
}

export type MutationUpdatePageArgs = {
  data: PageInput
  documentId: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  status?: InputMaybe<PublicationStatus>
}

export type MutationUpdatePageCategoryArgs = {
  data: PageCategoryInput
  documentId: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  status?: InputMaybe<PublicationStatus>
}

export type MutationUpdateRedirectArgs = {
  data: RedirectInput
  documentId: Scalars['ID']['input']
  status?: InputMaybe<PublicationStatus>
}

export type MutationUpdateRegulationArgs = {
  data: RegulationInput
  documentId: Scalars['ID']['input']
  status?: InputMaybe<PublicationStatus>
}

export type MutationUpdateReviewWorkflowsWorkflowArgs = {
  data: ReviewWorkflowsWorkflowInput
  documentId: Scalars['ID']['input']
  status?: InputMaybe<PublicationStatus>
}

export type MutationUpdateReviewWorkflowsWorkflowStageArgs = {
  data: ReviewWorkflowsWorkflowStageInput
  documentId: Scalars['ID']['input']
  status?: InputMaybe<PublicationStatus>
}

export type MutationUpdateTagArgs = {
  data: TagInput
  documentId: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  status?: InputMaybe<PublicationStatus>
}

export type MutationUpdateTaxAdministratorsListArgs = {
  data: TaxAdministratorsListInput
  status?: InputMaybe<PublicationStatus>
}

export type MutationUpdateUploadFileArgs = {
  id: Scalars['ID']['input']
  info?: InputMaybe<FileInfoInput>
}

export type MutationUpdateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput
  id: Scalars['ID']['input']
}

export type MutationUpdateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput
  id: Scalars['ID']['input']
}

export type Page = {
  __typename?: 'Page'
  adminGroups: Array<Maybe<AdminGroup>>
  adminGroups_connection?: Maybe<AdminGroupRelationResponseCollection>
  alias?: Maybe<Scalars['String']['output']>
  breadcrumbTitle?: Maybe<Scalars['String']['output']>
  childPages: Array<Maybe<Page>>
  childPages_connection?: Maybe<PageRelationResponseCollection>
  children: Array<Maybe<Page>>
  children_connection?: Maybe<PageRelationResponseCollection>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  documentId: Scalars['ID']['output']
  fullPath?: Maybe<Scalars['String']['output']>
  headerLinks?: Maybe<Array<Maybe<ComponentBlocksCommonLink>>>
  keywords?: Maybe<Scalars['String']['output']>
  locale?: Maybe<Scalars['String']['output']>
  localizations: Array<Maybe<Page>>
  localizations_connection?: Maybe<PageRelationResponseCollection>
  metaDescription?: Maybe<Scalars['String']['output']>
  metaDiscription?: Maybe<Scalars['String']['output']>
  pageBackgroundImage?: Maybe<UploadFile>
  pageCategory?: Maybe<PageCategory>
  pageColor: Enum_Page_Pagecolor
  pageHeaderSections?: Maybe<Array<Maybe<PagePageHeaderSectionsDynamicZone>>>
  parent?: Maybe<Page>
  parentPage?: Maybe<Page>
  path?: Maybe<Scalars['String']['output']>
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  redirects: Array<Maybe<Redirect>>
  redirects_connection?: Maybe<RedirectRelationResponseCollection>
  relatedContents: Array<Maybe<Tag>>
  relatedContents_connection?: Maybe<TagRelationResponseCollection>
  sections?: Maybe<Array<Maybe<PageSectionsDynamicZone>>>
  showTableOfContents?: Maybe<Scalars['Boolean']['output']>
  sidebar?: Maybe<Array<Maybe<PageSidebarDynamicZone>>>
  slug?: Maybe<Scalars['String']['output']>
  subnavigation?: Maybe<ComponentSectionsSubnavigation>
  subtext?: Maybe<Scalars['String']['output']>
  title: Scalars['String']['output']
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type PageAdminGroupsArgs = {
  filters?: InputMaybe<AdminGroupFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type PageAdminGroups_ConnectionArgs = {
  filters?: InputMaybe<AdminGroupFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type PageChildPagesArgs = {
  filters?: InputMaybe<PageFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type PageChildPages_ConnectionArgs = {
  filters?: InputMaybe<PageFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type PageChildrenArgs = {
  filters?: InputMaybe<PageFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type PageChildren_ConnectionArgs = {
  filters?: InputMaybe<PageFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type PageHeaderLinksArgs = {
  filters?: InputMaybe<ComponentBlocksCommonLinkFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type PageLocalizationsArgs = {
  filters?: InputMaybe<PageFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type PageLocalizations_ConnectionArgs = {
  filters?: InputMaybe<PageFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type PageRedirectsArgs = {
  filters?: InputMaybe<RedirectFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type PageRedirects_ConnectionArgs = {
  filters?: InputMaybe<RedirectFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type PageRelatedContentsArgs = {
  filters?: InputMaybe<TagFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type PageRelatedContents_ConnectionArgs = {
  filters?: InputMaybe<TagFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type PageCategory = {
  __typename?: 'PageCategory'
  color?: Maybe<Enum_Pagecategory_Color>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  documentId: Scalars['ID']['output']
  icon?: Maybe<Enum_Pagecategory_Icon>
  locale?: Maybe<Scalars['String']['output']>
  localizations: Array<Maybe<PageCategory>>
  localizations_connection?: Maybe<PageCategoryRelationResponseCollection>
  pages: Array<Maybe<Page>>
  pages_connection?: Maybe<PageRelationResponseCollection>
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  shortTitle?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type PageCategoryLocalizationsArgs = {
  filters?: InputMaybe<PageCategoryFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type PageCategoryLocalizations_ConnectionArgs = {
  filters?: InputMaybe<PageCategoryFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type PageCategoryPagesArgs = {
  filters?: InputMaybe<PageFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type PageCategoryPages_ConnectionArgs = {
  filters?: InputMaybe<PageFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type PageCategoryEntity = {
  __typename?: 'PageCategoryEntity'
  attributes?: Maybe<PageCategory>
  id?: Maybe<Scalars['ID']['output']>
}

export type PageCategoryEntityResponse = {
  __typename?: 'PageCategoryEntityResponse'
  data?: Maybe<PageCategory>
}

export type PageCategoryEntityResponseCollection = {
  __typename?: 'PageCategoryEntityResponseCollection'
  nodes: Array<PageCategory>
  pageInfo: Pagination
}

export type PageCategoryFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<PageCategoryFiltersInput>>>
  color?: InputMaybe<StringFilterInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  documentId?: InputMaybe<IdFilterInput>
  icon?: InputMaybe<StringFilterInput>
  locale?: InputMaybe<StringFilterInput>
  localizations?: InputMaybe<PageCategoryFiltersInput>
  not?: InputMaybe<PageCategoryFiltersInput>
  or?: InputMaybe<Array<InputMaybe<PageCategoryFiltersInput>>>
  pages?: InputMaybe<PageFiltersInput>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  shortTitle?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type PageCategoryInput = {
  color?: InputMaybe<Enum_Pagecategory_Color>
  icon?: InputMaybe<Enum_Pagecategory_Icon>
  pages?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
  shortTitle?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type PageCategoryRelationResponseCollection = {
  __typename?: 'PageCategoryRelationResponseCollection'
  nodes: Array<PageCategory>
}

export type PageEntity = {
  __typename?: 'PageEntity'
  attributes?: Maybe<Page>
  id?: Maybe<Scalars['ID']['output']>
}

export type PageEntityResponse = {
  __typename?: 'PageEntityResponse'
  data?: Maybe<Page>
}

export type PageEntityResponseCollection = {
  __typename?: 'PageEntityResponseCollection'
  nodes: Array<Page>
  pageInfo: Pagination
}

export type PageFiltersInput = {
  adminGroups?: InputMaybe<AdminGroupFiltersInput>
  alias?: InputMaybe<StringFilterInput>
  and?: InputMaybe<Array<InputMaybe<PageFiltersInput>>>
  breadcrumbTitle?: InputMaybe<StringFilterInput>
  childPages?: InputMaybe<PageFiltersInput>
  children?: InputMaybe<PageFiltersInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  documentId?: InputMaybe<IdFilterInput>
  fullPath?: InputMaybe<StringFilterInput>
  headerLinks?: InputMaybe<ComponentBlocksCommonLinkFiltersInput>
  keywords?: InputMaybe<StringFilterInput>
  locale?: InputMaybe<StringFilterInput>
  localizations?: InputMaybe<PageFiltersInput>
  metaDescription?: InputMaybe<StringFilterInput>
  metaDiscription?: InputMaybe<StringFilterInput>
  not?: InputMaybe<PageFiltersInput>
  or?: InputMaybe<Array<InputMaybe<PageFiltersInput>>>
  pageCategory?: InputMaybe<PageCategoryFiltersInput>
  pageColor?: InputMaybe<StringFilterInput>
  parent?: InputMaybe<PageFiltersInput>
  parentPage?: InputMaybe<PageFiltersInput>
  path?: InputMaybe<StringFilterInput>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  redirects?: InputMaybe<RedirectFiltersInput>
  relatedContents?: InputMaybe<TagFiltersInput>
  showTableOfContents?: InputMaybe<BooleanFilterInput>
  slug?: InputMaybe<StringFilterInput>
  subnavigation?: InputMaybe<ComponentSectionsSubnavigationFiltersInput>
  subtext?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type PageInput = {
  adminGroups?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  alias?: InputMaybe<Scalars['String']['input']>
  breadcrumbTitle?: InputMaybe<Scalars['String']['input']>
  childPages?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  children?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  fullPath?: InputMaybe<Scalars['String']['input']>
  headerLinks?: InputMaybe<Array<InputMaybe<ComponentBlocksCommonLinkInput>>>
  keywords?: InputMaybe<Scalars['String']['input']>
  metaDescription?: InputMaybe<Scalars['String']['input']>
  metaDiscription?: InputMaybe<Scalars['String']['input']>
  pageBackgroundImage?: InputMaybe<Scalars['ID']['input']>
  pageCategory?: InputMaybe<Scalars['ID']['input']>
  pageColor?: InputMaybe<Enum_Page_Pagecolor>
  pageHeaderSections?: InputMaybe<Array<Scalars['PagePageHeaderSectionsDynamicZoneInput']['input']>>
  parent?: InputMaybe<Scalars['ID']['input']>
  parentPage?: InputMaybe<Scalars['ID']['input']>
  path?: InputMaybe<Scalars['String']['input']>
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
  redirects?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  relatedContents?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  sections?: InputMaybe<Array<Scalars['PageSectionsDynamicZoneInput']['input']>>
  showTableOfContents?: InputMaybe<Scalars['Boolean']['input']>
  sidebar?: InputMaybe<Array<Scalars['PageSidebarDynamicZoneInput']['input']>>
  slug?: InputMaybe<Scalars['String']['input']>
  subnavigation?: InputMaybe<ComponentSectionsSubnavigationInput>
  subtext?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type PagePageHeaderSectionsDynamicZone =
  | ComponentHeaderSectionsEvent
  | ComponentHeaderSectionsFacility
  | Error

export type PageRelationResponseCollection = {
  __typename?: 'PageRelationResponseCollection'
  nodes: Array<Page>
}

export type PageSectionsDynamicZone =
  | ComponentSectionsAccordion
  | ComponentSectionsAlert
  | ComponentSectionsArticles
  | ComponentSectionsArticlesLandingPage
  | ComponentSectionsAssets
  | ComponentSectionsBanner
  | ComponentSectionsColumnedText
  | ComponentSectionsColumns
  | ComponentSectionsColumnsList
  | ComponentSectionsComparisonSection
  | ComponentSectionsContactsSection
  | ComponentSectionsDivider
  | ComponentSectionsDocuments
  | ComponentSectionsEvents
  | ComponentSectionsFacilities
  | ComponentSectionsFaqCategories
  | ComponentSectionsFaqs
  | ComponentSectionsFileList
  | ComponentSectionsGallery
  | ComponentSectionsIframe
  | ComponentSectionsInbaLatestRelease
  | ComponentSectionsInbaReleases
  | ComponentSectionsJobOfferList
  | ComponentSectionsLinks
  | ComponentSectionsNarrowText
  | ComponentSectionsNewsletter
  | ComponentSectionsNumbersOverview
  | ComponentSectionsNumericalList
  | ComponentSectionsOfficialBoard
  | ComponentSectionsOpeningHours
  | ComponentSectionsOrganizationalStructure
  | ComponentSectionsPartners
  | ComponentSectionsProsAndConsSection
  | ComponentSectionsRegulations
  | ComponentSectionsStarzLandingPage
  | ComponentSectionsTextWithImage
  | ComponentSectionsTextWithImageOverlapped
  | ComponentSectionsTootootEvents
  | ComponentSectionsVideos
  | Error

export type PageSidebarDynamicZone = ComponentSidebarsEmptySidebar | Error

export type Pagination = {
  __typename?: 'Pagination'
  page: Scalars['Int']['output']
  pageCount: Scalars['Int']['output']
  pageSize: Scalars['Int']['output']
  total: Scalars['Int']['output']
}

export type PaginationArg = {
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  pageSize?: InputMaybe<Scalars['Int']['input']>
  start?: InputMaybe<Scalars['Int']['input']>
}

export enum PublicationStatus {
  Draft = 'DRAFT',
  Published = 'PUBLISHED',
}

export type Query = {
  __typename?: 'Query'
  adminGroup?: Maybe<AdminGroup>
  adminGroups: Array<Maybe<AdminGroup>>
  adminGroups_connection?: Maybe<AdminGroupEntityResponseCollection>
  alert?: Maybe<Alert>
  article?: Maybe<Article>
  articleCategories: Array<Maybe<ArticleCategory>>
  articleCategories_connection?: Maybe<ArticleCategoryEntityResponseCollection>
  articleCategory?: Maybe<ArticleCategory>
  articles: Array<Maybe<Article>>
  articles_connection?: Maybe<ArticleEntityResponseCollection>
  asset?: Maybe<Asset>
  assetCategories: Array<Maybe<AssetCategory>>
  assetCategories_connection?: Maybe<AssetCategoryEntityResponseCollection>
  assetCategory?: Maybe<AssetCategory>
  assets: Array<Maybe<Asset>>
  assets_connection?: Maybe<AssetEntityResponseCollection>
  document?: Maybe<Document>
  documentCategories: Array<Maybe<DocumentCategory>>
  documentCategories_connection?: Maybe<DocumentCategoryEntityResponseCollection>
  documentCategory?: Maybe<DocumentCategory>
  documents: Array<Maybe<Document>>
  documents_connection?: Maybe<DocumentEntityResponseCollection>
  faq?: Maybe<Faq>
  faqCategories: Array<Maybe<FaqCategory>>
  faqCategories_connection?: Maybe<FaqCategoryEntityResponseCollection>
  faqCategory?: Maybe<FaqCategory>
  faqs: Array<Maybe<Faq>>
  faqs_connection?: Maybe<FaqEntityResponseCollection>
  footer?: Maybe<Footer>
  general?: Maybe<General>
  homepage?: Maybe<Homepage>
  i18NLocale?: Maybe<I18NLocale>
  i18NLocales: Array<Maybe<I18NLocale>>
  i18NLocales_connection?: Maybe<I18NLocaleEntityResponseCollection>
  inbaArticle?: Maybe<InbaArticle>
  inbaArticles: Array<Maybe<InbaArticle>>
  inbaArticles_connection?: Maybe<InbaArticleEntityResponseCollection>
  inbaRelease?: Maybe<InbaRelease>
  inbaReleases: Array<Maybe<InbaRelease>>
  inbaReleases_connection?: Maybe<InbaReleaseEntityResponseCollection>
  inbaTag?: Maybe<InbaTag>
  inbaTags: Array<Maybe<InbaTag>>
  inbaTags_connection?: Maybe<InbaTagEntityResponseCollection>
  internalJob?: Maybe<InternalJob>
  internalJobs: Array<Maybe<InternalJob>>
  internalJobs_connection?: Maybe<InternalJobEntityResponseCollection>
  me?: Maybe<UsersPermissionsMe>
  menu?: Maybe<Menu>
  page?: Maybe<Page>
  pageCategories: Array<Maybe<PageCategory>>
  pageCategories_connection?: Maybe<PageCategoryEntityResponseCollection>
  pageCategory?: Maybe<PageCategory>
  pages: Array<Maybe<Page>>
  pages_connection?: Maybe<PageEntityResponseCollection>
  redirect?: Maybe<Redirect>
  redirects: Array<Maybe<Redirect>>
  redirects_connection?: Maybe<RedirectEntityResponseCollection>
  regulation?: Maybe<Regulation>
  regulations: Array<Maybe<Regulation>>
  regulations_connection?: Maybe<RegulationEntityResponseCollection>
  reviewWorkflowsWorkflow?: Maybe<ReviewWorkflowsWorkflow>
  reviewWorkflowsWorkflowStage?: Maybe<ReviewWorkflowsWorkflowStage>
  reviewWorkflowsWorkflowStages: Array<Maybe<ReviewWorkflowsWorkflowStage>>
  reviewWorkflowsWorkflowStages_connection?: Maybe<ReviewWorkflowsWorkflowStageEntityResponseCollection>
  reviewWorkflowsWorkflows: Array<Maybe<ReviewWorkflowsWorkflow>>
  reviewWorkflowsWorkflows_connection?: Maybe<ReviewWorkflowsWorkflowEntityResponseCollection>
  tag?: Maybe<Tag>
  tags: Array<Maybe<Tag>>
  tags_connection?: Maybe<TagEntityResponseCollection>
  taxAdministratorsList?: Maybe<TaxAdministratorsList>
  uploadFile?: Maybe<UploadFile>
  uploadFiles: Array<Maybe<UploadFile>>
  uploadFiles_connection?: Maybe<UploadFileEntityResponseCollection>
  usersPermissionsRole?: Maybe<UsersPermissionsRole>
  usersPermissionsRoles: Array<Maybe<UsersPermissionsRole>>
  usersPermissionsRoles_connection?: Maybe<UsersPermissionsRoleEntityResponseCollection>
  usersPermissionsUser?: Maybe<UsersPermissionsUser>
  usersPermissionsUsers: Array<Maybe<UsersPermissionsUser>>
  usersPermissionsUsers_connection?: Maybe<UsersPermissionsUserEntityResponseCollection>
}

export type QueryAdminGroupArgs = {
  documentId: Scalars['ID']['input']
  status?: InputMaybe<PublicationStatus>
}

export type QueryAdminGroupsArgs = {
  filters?: InputMaybe<AdminGroupFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryAdminGroups_ConnectionArgs = {
  filters?: InputMaybe<AdminGroupFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryAlertArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  status?: InputMaybe<PublicationStatus>
}

export type QueryArticleArgs = {
  documentId: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  status?: InputMaybe<PublicationStatus>
}

export type QueryArticleCategoriesArgs = {
  filters?: InputMaybe<ArticleCategoryFiltersInput>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryArticleCategories_ConnectionArgs = {
  filters?: InputMaybe<ArticleCategoryFiltersInput>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryArticleCategoryArgs = {
  documentId: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  status?: InputMaybe<PublicationStatus>
}

export type QueryArticlesArgs = {
  filters?: InputMaybe<ArticleFiltersInput>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryArticles_ConnectionArgs = {
  filters?: InputMaybe<ArticleFiltersInput>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryAssetArgs = {
  documentId: Scalars['ID']['input']
  status?: InputMaybe<PublicationStatus>
}

export type QueryAssetCategoriesArgs = {
  filters?: InputMaybe<AssetCategoryFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryAssetCategories_ConnectionArgs = {
  filters?: InputMaybe<AssetCategoryFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryAssetCategoryArgs = {
  documentId: Scalars['ID']['input']
  status?: InputMaybe<PublicationStatus>
}

export type QueryAssetsArgs = {
  filters?: InputMaybe<AssetFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryAssets_ConnectionArgs = {
  filters?: InputMaybe<AssetFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryDocumentArgs = {
  documentId: Scalars['ID']['input']
  status?: InputMaybe<PublicationStatus>
}

export type QueryDocumentCategoriesArgs = {
  filters?: InputMaybe<DocumentCategoryFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryDocumentCategories_ConnectionArgs = {
  filters?: InputMaybe<DocumentCategoryFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryDocumentCategoryArgs = {
  documentId: Scalars['ID']['input']
  status?: InputMaybe<PublicationStatus>
}

export type QueryDocumentsArgs = {
  filters?: InputMaybe<DocumentFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryDocuments_ConnectionArgs = {
  filters?: InputMaybe<DocumentFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryFaqArgs = {
  documentId: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  status?: InputMaybe<PublicationStatus>
}

export type QueryFaqCategoriesArgs = {
  filters?: InputMaybe<FaqCategoryFiltersInput>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryFaqCategories_ConnectionArgs = {
  filters?: InputMaybe<FaqCategoryFiltersInput>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryFaqCategoryArgs = {
  documentId: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  status?: InputMaybe<PublicationStatus>
}

export type QueryFaqsArgs = {
  filters?: InputMaybe<FaqFiltersInput>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryFaqs_ConnectionArgs = {
  filters?: InputMaybe<FaqFiltersInput>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryFooterArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  status?: InputMaybe<PublicationStatus>
}

export type QueryGeneralArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  status?: InputMaybe<PublicationStatus>
}

export type QueryHomepageArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  status?: InputMaybe<PublicationStatus>
}

export type QueryI18NLocaleArgs = {
  documentId: Scalars['ID']['input']
  status?: InputMaybe<PublicationStatus>
}

export type QueryI18NLocalesArgs = {
  filters?: InputMaybe<I18NLocaleFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryI18NLocales_ConnectionArgs = {
  filters?: InputMaybe<I18NLocaleFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryInbaArticleArgs = {
  documentId: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  status?: InputMaybe<PublicationStatus>
}

export type QueryInbaArticlesArgs = {
  filters?: InputMaybe<InbaArticleFiltersInput>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryInbaArticles_ConnectionArgs = {
  filters?: InputMaybe<InbaArticleFiltersInput>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryInbaReleaseArgs = {
  documentId: Scalars['ID']['input']
  status?: InputMaybe<PublicationStatus>
}

export type QueryInbaReleasesArgs = {
  filters?: InputMaybe<InbaReleaseFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryInbaReleases_ConnectionArgs = {
  filters?: InputMaybe<InbaReleaseFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryInbaTagArgs = {
  documentId: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  status?: InputMaybe<PublicationStatus>
}

export type QueryInbaTagsArgs = {
  filters?: InputMaybe<InbaTagFiltersInput>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryInbaTags_ConnectionArgs = {
  filters?: InputMaybe<InbaTagFiltersInput>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryInternalJobArgs = {
  documentId: Scalars['ID']['input']
  status?: InputMaybe<PublicationStatus>
}

export type QueryInternalJobsArgs = {
  filters?: InputMaybe<InternalJobFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryInternalJobs_ConnectionArgs = {
  filters?: InputMaybe<InternalJobFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryMenuArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  status?: InputMaybe<PublicationStatus>
}

export type QueryPageArgs = {
  documentId: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  status?: InputMaybe<PublicationStatus>
}

export type QueryPageCategoriesArgs = {
  filters?: InputMaybe<PageCategoryFiltersInput>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryPageCategories_ConnectionArgs = {
  filters?: InputMaybe<PageCategoryFiltersInput>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryPageCategoryArgs = {
  documentId: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  status?: InputMaybe<PublicationStatus>
}

export type QueryPagesArgs = {
  filters?: InputMaybe<PageFiltersInput>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryPages_ConnectionArgs = {
  filters?: InputMaybe<PageFiltersInput>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryRedirectArgs = {
  documentId: Scalars['ID']['input']
  status?: InputMaybe<PublicationStatus>
}

export type QueryRedirectsArgs = {
  filters?: InputMaybe<RedirectFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryRedirects_ConnectionArgs = {
  filters?: InputMaybe<RedirectFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryRegulationArgs = {
  documentId: Scalars['ID']['input']
  status?: InputMaybe<PublicationStatus>
}

export type QueryRegulationsArgs = {
  filters?: InputMaybe<RegulationFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryRegulations_ConnectionArgs = {
  filters?: InputMaybe<RegulationFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryReviewWorkflowsWorkflowArgs = {
  documentId: Scalars['ID']['input']
  status?: InputMaybe<PublicationStatus>
}

export type QueryReviewWorkflowsWorkflowStageArgs = {
  documentId: Scalars['ID']['input']
  status?: InputMaybe<PublicationStatus>
}

export type QueryReviewWorkflowsWorkflowStagesArgs = {
  filters?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryReviewWorkflowsWorkflowStages_ConnectionArgs = {
  filters?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryReviewWorkflowsWorkflowsArgs = {
  filters?: InputMaybe<ReviewWorkflowsWorkflowFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryReviewWorkflowsWorkflows_ConnectionArgs = {
  filters?: InputMaybe<ReviewWorkflowsWorkflowFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryTagArgs = {
  documentId: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  status?: InputMaybe<PublicationStatus>
}

export type QueryTagsArgs = {
  filters?: InputMaybe<TagFiltersInput>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryTags_ConnectionArgs = {
  filters?: InputMaybe<TagFiltersInput>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryTaxAdministratorsListArgs = {
  status?: InputMaybe<PublicationStatus>
}

export type QueryUploadFileArgs = {
  documentId: Scalars['ID']['input']
  status?: InputMaybe<PublicationStatus>
}

export type QueryUploadFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryUploadFiles_ConnectionArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryUsersPermissionsRoleArgs = {
  documentId: Scalars['ID']['input']
  status?: InputMaybe<PublicationStatus>
}

export type QueryUsersPermissionsRolesArgs = {
  filters?: InputMaybe<UsersPermissionsRoleFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryUsersPermissionsRoles_ConnectionArgs = {
  filters?: InputMaybe<UsersPermissionsRoleFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryUsersPermissionsUserArgs = {
  documentId: Scalars['ID']['input']
  status?: InputMaybe<PublicationStatus>
}

export type QueryUsersPermissionsUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type QueryUsersPermissionsUsers_ConnectionArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  status?: InputMaybe<PublicationStatus>
}

export type Redirect = {
  __typename?: 'Redirect'
  createdAt?: Maybe<Scalars['DateTime']['output']>
  destination: Scalars['String']['output']
  documentId: Scalars['ID']['output']
  page?: Maybe<Page>
  permanent?: Maybe<Scalars['Boolean']['output']>
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  source: Scalars['String']['output']
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type RedirectEntity = {
  __typename?: 'RedirectEntity'
  attributes?: Maybe<Redirect>
  id?: Maybe<Scalars['ID']['output']>
}

export type RedirectEntityResponse = {
  __typename?: 'RedirectEntityResponse'
  data?: Maybe<Redirect>
}

export type RedirectEntityResponseCollection = {
  __typename?: 'RedirectEntityResponseCollection'
  nodes: Array<Redirect>
  pageInfo: Pagination
}

export type RedirectFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<RedirectFiltersInput>>>
  createdAt?: InputMaybe<DateTimeFilterInput>
  destination?: InputMaybe<StringFilterInput>
  documentId?: InputMaybe<IdFilterInput>
  not?: InputMaybe<RedirectFiltersInput>
  or?: InputMaybe<Array<InputMaybe<RedirectFiltersInput>>>
  page?: InputMaybe<PageFiltersInput>
  permanent?: InputMaybe<BooleanFilterInput>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  source?: InputMaybe<StringFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type RedirectInput = {
  destination?: InputMaybe<Scalars['String']['input']>
  page?: InputMaybe<Scalars['ID']['input']>
  permanent?: InputMaybe<Scalars['Boolean']['input']>
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
  source?: InputMaybe<Scalars['String']['input']>
}

export type RedirectRelationResponseCollection = {
  __typename?: 'RedirectRelationResponseCollection'
  nodes: Array<Redirect>
}

export type Regulation = {
  __typename?: 'Regulation'
  amending: Array<Maybe<Regulation>>
  amending_connection?: Maybe<RegulationRelationResponseCollection>
  amendments: Array<Maybe<Regulation>>
  amendments_connection?: Maybe<RegulationRelationResponseCollection>
  attachments: Array<Maybe<UploadFile>>
  attachments_connection?: Maybe<UploadFileRelationResponseCollection>
  cancellation?: Maybe<Regulation>
  cancelling: Array<Maybe<Regulation>>
  cancelling_connection?: Maybe<RegulationRelationResponseCollection>
  category: Enum_Regulation_Category
  createdAt?: Maybe<Scalars['DateTime']['output']>
  documentId: Scalars['ID']['output']
  effectiveFrom: Scalars['Date']['output']
  fullTitle: Scalars['String']['output']
  isFullTextRegulation: Scalars['Boolean']['output']
  mainDocument: UploadFile
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  regNumber: Scalars['String']['output']
  slug: Scalars['String']['output']
  titleText?: Maybe<Scalars['String']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type RegulationAmendingArgs = {
  filters?: InputMaybe<RegulationFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type RegulationAmending_ConnectionArgs = {
  filters?: InputMaybe<RegulationFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type RegulationAmendmentsArgs = {
  filters?: InputMaybe<RegulationFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type RegulationAmendments_ConnectionArgs = {
  filters?: InputMaybe<RegulationFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type RegulationAttachmentsArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type RegulationAttachments_ConnectionArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type RegulationCancellingArgs = {
  filters?: InputMaybe<RegulationFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type RegulationCancelling_ConnectionArgs = {
  filters?: InputMaybe<RegulationFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type RegulationEntity = {
  __typename?: 'RegulationEntity'
  attributes?: Maybe<Regulation>
  id?: Maybe<Scalars['ID']['output']>
}

export type RegulationEntityResponse = {
  __typename?: 'RegulationEntityResponse'
  data?: Maybe<Regulation>
}

export type RegulationEntityResponseCollection = {
  __typename?: 'RegulationEntityResponseCollection'
  nodes: Array<Regulation>
  pageInfo: Pagination
}

export type RegulationFiltersInput = {
  amending?: InputMaybe<RegulationFiltersInput>
  amendments?: InputMaybe<RegulationFiltersInput>
  and?: InputMaybe<Array<InputMaybe<RegulationFiltersInput>>>
  cancellation?: InputMaybe<RegulationFiltersInput>
  cancelling?: InputMaybe<RegulationFiltersInput>
  category?: InputMaybe<StringFilterInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  documentId?: InputMaybe<IdFilterInput>
  effectiveFrom?: InputMaybe<DateFilterInput>
  fullTitle?: InputMaybe<StringFilterInput>
  isFullTextRegulation?: InputMaybe<BooleanFilterInput>
  not?: InputMaybe<RegulationFiltersInput>
  or?: InputMaybe<Array<InputMaybe<RegulationFiltersInput>>>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  regNumber?: InputMaybe<StringFilterInput>
  slug?: InputMaybe<StringFilterInput>
  titleText?: InputMaybe<StringFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type RegulationInput = {
  amending?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  amendments?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  attachments?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  cancellation?: InputMaybe<Scalars['ID']['input']>
  cancelling?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  category?: InputMaybe<Enum_Regulation_Category>
  effectiveFrom?: InputMaybe<Scalars['Date']['input']>
  fullTitle?: InputMaybe<Scalars['String']['input']>
  isFullTextRegulation?: InputMaybe<Scalars['Boolean']['input']>
  mainDocument?: InputMaybe<Scalars['ID']['input']>
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
  regNumber?: InputMaybe<Scalars['String']['input']>
  slug?: InputMaybe<Scalars['String']['input']>
  titleText?: InputMaybe<Scalars['String']['input']>
}

export type RegulationRelationResponseCollection = {
  __typename?: 'RegulationRelationResponseCollection'
  nodes: Array<Regulation>
}

export type ResponseCollectionMeta = {
  __typename?: 'ResponseCollectionMeta'
  pagination: Pagination
}

export type ReviewWorkflowsWorkflow = {
  __typename?: 'ReviewWorkflowsWorkflow'
  contentTypes: Scalars['JSON']['output']
  createdAt?: Maybe<Scalars['DateTime']['output']>
  documentId: Scalars['ID']['output']
  name: Scalars['String']['output']
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  stageRequiredToPublish?: Maybe<ReviewWorkflowsWorkflowStage>
  stages: Array<Maybe<ReviewWorkflowsWorkflowStage>>
  stages_connection?: Maybe<ReviewWorkflowsWorkflowStageRelationResponseCollection>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type ReviewWorkflowsWorkflowStagesArgs = {
  filters?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ReviewWorkflowsWorkflowStages_ConnectionArgs = {
  filters?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ReviewWorkflowsWorkflowEntity = {
  __typename?: 'ReviewWorkflowsWorkflowEntity'
  attributes?: Maybe<ReviewWorkflowsWorkflow>
  id?: Maybe<Scalars['ID']['output']>
}

export type ReviewWorkflowsWorkflowEntityResponse = {
  __typename?: 'ReviewWorkflowsWorkflowEntityResponse'
  data?: Maybe<ReviewWorkflowsWorkflow>
}

export type ReviewWorkflowsWorkflowEntityResponseCollection = {
  __typename?: 'ReviewWorkflowsWorkflowEntityResponseCollection'
  nodes: Array<ReviewWorkflowsWorkflow>
  pageInfo: Pagination
}

export type ReviewWorkflowsWorkflowFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ReviewWorkflowsWorkflowFiltersInput>>>
  contentTypes?: InputMaybe<JsonFilterInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  documentId?: InputMaybe<IdFilterInput>
  name?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ReviewWorkflowsWorkflowFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ReviewWorkflowsWorkflowFiltersInput>>>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  stageRequiredToPublish?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>
  stages?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type ReviewWorkflowsWorkflowInput = {
  contentTypes?: InputMaybe<Scalars['JSON']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
  stageRequiredToPublish?: InputMaybe<Scalars['ID']['input']>
  stages?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
}

export type ReviewWorkflowsWorkflowRelationResponseCollection = {
  __typename?: 'ReviewWorkflowsWorkflowRelationResponseCollection'
  nodes: Array<ReviewWorkflowsWorkflow>
}

export type ReviewWorkflowsWorkflowStage = {
  __typename?: 'ReviewWorkflowsWorkflowStage'
  color?: Maybe<Scalars['String']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  documentId: Scalars['ID']['output']
  name?: Maybe<Scalars['String']['output']>
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  workflow?: Maybe<ReviewWorkflowsWorkflow>
}

export type ReviewWorkflowsWorkflowStageEntity = {
  __typename?: 'ReviewWorkflowsWorkflowStageEntity'
  attributes?: Maybe<ReviewWorkflowsWorkflowStage>
  id?: Maybe<Scalars['ID']['output']>
}

export type ReviewWorkflowsWorkflowStageEntityResponse = {
  __typename?: 'ReviewWorkflowsWorkflowStageEntityResponse'
  data?: Maybe<ReviewWorkflowsWorkflowStage>
}

export type ReviewWorkflowsWorkflowStageEntityResponseCollection = {
  __typename?: 'ReviewWorkflowsWorkflowStageEntityResponseCollection'
  nodes: Array<ReviewWorkflowsWorkflowStage>
  pageInfo: Pagination
}

export type ReviewWorkflowsWorkflowStageFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>>>
  color?: InputMaybe<StringFilterInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  documentId?: InputMaybe<IdFilterInput>
  name?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ReviewWorkflowsWorkflowStageFiltersInput>>>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
  workflow?: InputMaybe<ReviewWorkflowsWorkflowFiltersInput>
}

export type ReviewWorkflowsWorkflowStageInput = {
  color?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
  workflow?: InputMaybe<Scalars['ID']['input']>
}

export type ReviewWorkflowsWorkflowStageRelationResponseCollection = {
  __typename?: 'ReviewWorkflowsWorkflowStageRelationResponseCollection'
  nodes: Array<ReviewWorkflowsWorkflowStage>
}

export type StringFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  between?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  contains?: InputMaybe<Scalars['String']['input']>
  containsi?: InputMaybe<Scalars['String']['input']>
  endsWith?: InputMaybe<Scalars['String']['input']>
  eq?: InputMaybe<Scalars['String']['input']>
  eqi?: InputMaybe<Scalars['String']['input']>
  gt?: InputMaybe<Scalars['String']['input']>
  gte?: InputMaybe<Scalars['String']['input']>
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  lt?: InputMaybe<Scalars['String']['input']>
  lte?: InputMaybe<Scalars['String']['input']>
  ne?: InputMaybe<Scalars['String']['input']>
  nei?: InputMaybe<Scalars['String']['input']>
  not?: InputMaybe<StringFilterInput>
  notContains?: InputMaybe<Scalars['String']['input']>
  notContainsi?: InputMaybe<Scalars['String']['input']>
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  notNull?: InputMaybe<Scalars['Boolean']['input']>
  null?: InputMaybe<Scalars['Boolean']['input']>
  or?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
  startsWith?: InputMaybe<Scalars['String']['input']>
}

export type Tag = {
  __typename?: 'Tag'
  articles: Array<Maybe<Article>>
  articles_connection?: Maybe<ArticleRelationResponseCollection>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  documentId: Scalars['ID']['output']
  locale?: Maybe<Scalars['String']['output']>
  localizations: Array<Maybe<Tag>>
  localizations_connection?: Maybe<TagRelationResponseCollection>
  pageCategory?: Maybe<PageCategory>
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  slug: Scalars['String']['output']
  title: Scalars['String']['output']
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type TagArticlesArgs = {
  filters?: InputMaybe<ArticleFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type TagArticles_ConnectionArgs = {
  filters?: InputMaybe<ArticleFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type TagLocalizationsArgs = {
  filters?: InputMaybe<TagFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type TagLocalizations_ConnectionArgs = {
  filters?: InputMaybe<TagFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type TagEntity = {
  __typename?: 'TagEntity'
  attributes?: Maybe<Tag>
  id?: Maybe<Scalars['ID']['output']>
}

export type TagEntityResponse = {
  __typename?: 'TagEntityResponse'
  data?: Maybe<Tag>
}

export type TagEntityResponseCollection = {
  __typename?: 'TagEntityResponseCollection'
  nodes: Array<Tag>
  pageInfo: Pagination
}

export type TagFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<TagFiltersInput>>>
  articles?: InputMaybe<ArticleFiltersInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  documentId?: InputMaybe<IdFilterInput>
  locale?: InputMaybe<StringFilterInput>
  localizations?: InputMaybe<TagFiltersInput>
  not?: InputMaybe<TagFiltersInput>
  or?: InputMaybe<Array<InputMaybe<TagFiltersInput>>>
  pageCategory?: InputMaybe<PageCategoryFiltersInput>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  slug?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type TagInput = {
  articles?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  pageCategory?: InputMaybe<Scalars['ID']['input']>
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
  slug?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type TagRelationResponseCollection = {
  __typename?: 'TagRelationResponseCollection'
  nodes: Array<Tag>
}

export type TaxAdministratorsList = {
  __typename?: 'TaxAdministratorsList'
  createdAt?: Maybe<Scalars['DateTime']['output']>
  documentId: Scalars['ID']['output']
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  taxAdministrators: Array<Maybe<ComponentTaxAdministratorsTaxAdministrator>>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type TaxAdministratorsListTaxAdministratorsArgs = {
  filters?: InputMaybe<ComponentTaxAdministratorsTaxAdministratorFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type TaxAdministratorsListEntity = {
  __typename?: 'TaxAdministratorsListEntity'
  attributes?: Maybe<TaxAdministratorsList>
  id?: Maybe<Scalars['ID']['output']>
}

export type TaxAdministratorsListEntityResponse = {
  __typename?: 'TaxAdministratorsListEntityResponse'
  data?: Maybe<TaxAdministratorsList>
}

export type TaxAdministratorsListEntityResponseCollection = {
  __typename?: 'TaxAdministratorsListEntityResponseCollection'
  nodes: Array<TaxAdministratorsList>
  pageInfo: Pagination
}

export type TaxAdministratorsListFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<TaxAdministratorsListFiltersInput>>>
  createdAt?: InputMaybe<DateTimeFilterInput>
  not?: InputMaybe<TaxAdministratorsListFiltersInput>
  or?: InputMaybe<Array<InputMaybe<TaxAdministratorsListFiltersInput>>>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  taxAdministrators?: InputMaybe<ComponentTaxAdministratorsTaxAdministratorFiltersInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type TaxAdministratorsListInput = {
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
  taxAdministrators?: InputMaybe<Array<InputMaybe<ComponentTaxAdministratorsTaxAdministratorInput>>>
}

export type TaxAdministratorsListRelationResponseCollection = {
  __typename?: 'TaxAdministratorsListRelationResponseCollection'
  nodes: Array<TaxAdministratorsList>
}

export type TimeFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Time']['input']>>>
  between?: InputMaybe<Array<InputMaybe<Scalars['Time']['input']>>>
  contains?: InputMaybe<Scalars['Time']['input']>
  containsi?: InputMaybe<Scalars['Time']['input']>
  endsWith?: InputMaybe<Scalars['Time']['input']>
  eq?: InputMaybe<Scalars['Time']['input']>
  eqi?: InputMaybe<Scalars['Time']['input']>
  gt?: InputMaybe<Scalars['Time']['input']>
  gte?: InputMaybe<Scalars['Time']['input']>
  in?: InputMaybe<Array<InputMaybe<Scalars['Time']['input']>>>
  lt?: InputMaybe<Scalars['Time']['input']>
  lte?: InputMaybe<Scalars['Time']['input']>
  ne?: InputMaybe<Scalars['Time']['input']>
  nei?: InputMaybe<Scalars['Time']['input']>
  not?: InputMaybe<TimeFilterInput>
  notContains?: InputMaybe<Scalars['Time']['input']>
  notContainsi?: InputMaybe<Scalars['Time']['input']>
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Time']['input']>>>
  notNull?: InputMaybe<Scalars['Boolean']['input']>
  null?: InputMaybe<Scalars['Boolean']['input']>
  or?: InputMaybe<Array<InputMaybe<Scalars['Time']['input']>>>
  startsWith?: InputMaybe<Scalars['Time']['input']>
}

export type UploadFile = {
  __typename?: 'UploadFile'
  alternativeText?: Maybe<Scalars['String']['output']>
  caption?: Maybe<Scalars['String']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  documentId: Scalars['ID']['output']
  ext?: Maybe<Scalars['String']['output']>
  formats?: Maybe<Scalars['JSON']['output']>
  hash: Scalars['String']['output']
  height?: Maybe<Scalars['Int']['output']>
  mime: Scalars['String']['output']
  name: Scalars['String']['output']
  previewUrl?: Maybe<Scalars['String']['output']>
  provider: Scalars['String']['output']
  provider_metadata?: Maybe<Scalars['JSON']['output']>
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  related?: Maybe<Array<Maybe<GenericMorph>>>
  size: Scalars['Float']['output']
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  url: Scalars['String']['output']
  width?: Maybe<Scalars['Int']['output']>
}

export type UploadFileEntity = {
  __typename?: 'UploadFileEntity'
  attributes?: Maybe<UploadFile>
  id?: Maybe<Scalars['ID']['output']>
}

export type UploadFileEntityResponse = {
  __typename?: 'UploadFileEntityResponse'
  data?: Maybe<UploadFile>
}

export type UploadFileEntityResponseCollection = {
  __typename?: 'UploadFileEntityResponseCollection'
  nodes: Array<UploadFile>
  pageInfo: Pagination
}

export type UploadFileFiltersInput = {
  alternativeText?: InputMaybe<StringFilterInput>
  and?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>
  caption?: InputMaybe<StringFilterInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  documentId?: InputMaybe<IdFilterInput>
  ext?: InputMaybe<StringFilterInput>
  formats?: InputMaybe<JsonFilterInput>
  hash?: InputMaybe<StringFilterInput>
  height?: InputMaybe<IntFilterInput>
  mime?: InputMaybe<StringFilterInput>
  name?: InputMaybe<StringFilterInput>
  not?: InputMaybe<UploadFileFiltersInput>
  or?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>
  previewUrl?: InputMaybe<StringFilterInput>
  provider?: InputMaybe<StringFilterInput>
  provider_metadata?: InputMaybe<JsonFilterInput>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  size?: InputMaybe<FloatFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
  url?: InputMaybe<StringFilterInput>
  width?: InputMaybe<IntFilterInput>
}

export type UploadFileInput = {
  alternativeText?: InputMaybe<Scalars['String']['input']>
  caption?: InputMaybe<Scalars['String']['input']>
  ext?: InputMaybe<Scalars['String']['input']>
  formats?: InputMaybe<Scalars['JSON']['input']>
  hash?: InputMaybe<Scalars['String']['input']>
  height?: InputMaybe<Scalars['Int']['input']>
  mime?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  previewUrl?: InputMaybe<Scalars['String']['input']>
  provider?: InputMaybe<Scalars['String']['input']>
  provider_metadata?: InputMaybe<Scalars['JSON']['input']>
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
  size?: InputMaybe<Scalars['Float']['input']>
  url?: InputMaybe<Scalars['String']['input']>
  width?: InputMaybe<Scalars['Int']['input']>
}

export type UploadFileRelationResponseCollection = {
  __typename?: 'UploadFileRelationResponseCollection'
  nodes: Array<UploadFile>
}

export type UsersPermissionsCreateRolePayload = {
  __typename?: 'UsersPermissionsCreateRolePayload'
  ok: Scalars['Boolean']['output']
}

export type UsersPermissionsDeleteRolePayload = {
  __typename?: 'UsersPermissionsDeleteRolePayload'
  ok: Scalars['Boolean']['output']
}

export type UsersPermissionsLoginInput = {
  identifier: Scalars['String']['input']
  password: Scalars['String']['input']
  provider?: Scalars['String']['input']
}

export type UsersPermissionsLoginPayload = {
  __typename?: 'UsersPermissionsLoginPayload'
  jwt?: Maybe<Scalars['String']['output']>
  user: UsersPermissionsMe
}

export type UsersPermissionsMe = {
  __typename?: 'UsersPermissionsMe'
  blocked?: Maybe<Scalars['Boolean']['output']>
  confirmed?: Maybe<Scalars['Boolean']['output']>
  documentId: Scalars['ID']['output']
  email?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  role?: Maybe<UsersPermissionsMeRole>
  username: Scalars['String']['output']
}

export type UsersPermissionsMeRole = {
  __typename?: 'UsersPermissionsMeRole'
  description?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  type?: Maybe<Scalars['String']['output']>
}

export type UsersPermissionsPasswordPayload = {
  __typename?: 'UsersPermissionsPasswordPayload'
  ok: Scalars['Boolean']['output']
}

export type UsersPermissionsPermission = {
  __typename?: 'UsersPermissionsPermission'
  action: Scalars['String']['output']
  createdAt?: Maybe<Scalars['DateTime']['output']>
  documentId: Scalars['ID']['output']
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  role?: Maybe<UsersPermissionsRole>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type UsersPermissionsPermissionEntity = {
  __typename?: 'UsersPermissionsPermissionEntity'
  attributes?: Maybe<UsersPermissionsPermission>
  id?: Maybe<Scalars['ID']['output']>
}

export type UsersPermissionsPermissionEntityResponse = {
  __typename?: 'UsersPermissionsPermissionEntityResponse'
  data?: Maybe<UsersPermissionsPermission>
}

export type UsersPermissionsPermissionEntityResponseCollection = {
  __typename?: 'UsersPermissionsPermissionEntityResponseCollection'
  nodes: Array<UsersPermissionsPermission>
  pageInfo: Pagination
}

export type UsersPermissionsPermissionFiltersInput = {
  action?: InputMaybe<StringFilterInput>
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>
  createdAt?: InputMaybe<DateTimeFilterInput>
  documentId?: InputMaybe<IdFilterInput>
  not?: InputMaybe<UsersPermissionsPermissionFiltersInput>
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type UsersPermissionsPermissionInput = {
  action?: InputMaybe<Scalars['String']['input']>
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
  role?: InputMaybe<Scalars['ID']['input']>
}

export type UsersPermissionsPermissionRelationResponseCollection = {
  __typename?: 'UsersPermissionsPermissionRelationResponseCollection'
  nodes: Array<UsersPermissionsPermission>
}

export type UsersPermissionsRegisterInput = {
  email: Scalars['String']['input']
  password: Scalars['String']['input']
  username: Scalars['String']['input']
}

export type UsersPermissionsRole = {
  __typename?: 'UsersPermissionsRole'
  createdAt?: Maybe<Scalars['DateTime']['output']>
  description?: Maybe<Scalars['String']['output']>
  documentId: Scalars['ID']['output']
  name: Scalars['String']['output']
  permissions: Array<Maybe<UsersPermissionsPermission>>
  permissions_connection?: Maybe<UsersPermissionsPermissionRelationResponseCollection>
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  type?: Maybe<Scalars['String']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  users: Array<Maybe<UsersPermissionsUser>>
  users_connection?: Maybe<UsersPermissionsUserRelationResponseCollection>
}

export type UsersPermissionsRolePermissionsArgs = {
  filters?: InputMaybe<UsersPermissionsPermissionFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type UsersPermissionsRolePermissions_ConnectionArgs = {
  filters?: InputMaybe<UsersPermissionsPermissionFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type UsersPermissionsRoleUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type UsersPermissionsRoleUsers_ConnectionArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type UsersPermissionsRoleEntity = {
  __typename?: 'UsersPermissionsRoleEntity'
  attributes?: Maybe<UsersPermissionsRole>
  id?: Maybe<Scalars['ID']['output']>
}

export type UsersPermissionsRoleEntityResponse = {
  __typename?: 'UsersPermissionsRoleEntityResponse'
  data?: Maybe<UsersPermissionsRole>
}

export type UsersPermissionsRoleEntityResponseCollection = {
  __typename?: 'UsersPermissionsRoleEntityResponseCollection'
  nodes: Array<UsersPermissionsRole>
  pageInfo: Pagination
}

export type UsersPermissionsRoleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>
  createdAt?: InputMaybe<DateTimeFilterInput>
  description?: InputMaybe<StringFilterInput>
  documentId?: InputMaybe<IdFilterInput>
  name?: InputMaybe<StringFilterInput>
  not?: InputMaybe<UsersPermissionsRoleFiltersInput>
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>
  permissions?: InputMaybe<UsersPermissionsPermissionFiltersInput>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  type?: InputMaybe<StringFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
  users?: InputMaybe<UsersPermissionsUserFiltersInput>
}

export type UsersPermissionsRoleInput = {
  description?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  permissions?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
  type?: InputMaybe<Scalars['String']['input']>
  users?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
}

export type UsersPermissionsRoleRelationResponseCollection = {
  __typename?: 'UsersPermissionsRoleRelationResponseCollection'
  nodes: Array<UsersPermissionsRole>
}

export type UsersPermissionsUpdateRolePayload = {
  __typename?: 'UsersPermissionsUpdateRolePayload'
  ok: Scalars['Boolean']['output']
}

export type UsersPermissionsUser = {
  __typename?: 'UsersPermissionsUser'
  blocked?: Maybe<Scalars['Boolean']['output']>
  confirmed?: Maybe<Scalars['Boolean']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  documentId: Scalars['ID']['output']
  email: Scalars['String']['output']
  provider?: Maybe<Scalars['String']['output']>
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  role?: Maybe<UsersPermissionsRole>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  username: Scalars['String']['output']
}

export type UsersPermissionsUserEntity = {
  __typename?: 'UsersPermissionsUserEntity'
  attributes?: Maybe<UsersPermissionsUser>
  id?: Maybe<Scalars['ID']['output']>
}

export type UsersPermissionsUserEntityResponse = {
  __typename?: 'UsersPermissionsUserEntityResponse'
  data?: Maybe<UsersPermissionsUser>
}

export type UsersPermissionsUserEntityResponseCollection = {
  __typename?: 'UsersPermissionsUserEntityResponseCollection'
  nodes: Array<UsersPermissionsUser>
  pageInfo: Pagination
}

export type UsersPermissionsUserFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>
  blocked?: InputMaybe<BooleanFilterInput>
  confirmed?: InputMaybe<BooleanFilterInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  documentId?: InputMaybe<IdFilterInput>
  email?: InputMaybe<StringFilterInput>
  not?: InputMaybe<UsersPermissionsUserFiltersInput>
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>
  provider?: InputMaybe<StringFilterInput>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
  username?: InputMaybe<StringFilterInput>
}

export type UsersPermissionsUserInput = {
  blocked?: InputMaybe<Scalars['Boolean']['input']>
  confirmed?: InputMaybe<Scalars['Boolean']['input']>
  email?: InputMaybe<Scalars['String']['input']>
  password?: InputMaybe<Scalars['String']['input']>
  provider?: InputMaybe<Scalars['String']['input']>
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
  role?: InputMaybe<Scalars['ID']['input']>
  username?: InputMaybe<Scalars['String']['input']>
}

export type UsersPermissionsUserRelationResponseCollection = {
  __typename?: 'UsersPermissionsUserRelationResponseCollection'
  nodes: Array<UsersPermissionsUser>
}

export type AdminGroupSlugEntityFragment = {
  __typename?: 'AdminGroup'
  documentId: string
  slug: string
  title: string
  adminGroupId?: string | null
}

export type AdminGroupEntityFragment = {
  __typename?: 'AdminGroup'
  contentManagedBy: string
  documentId: string
  slug: string
  title: string
  adminGroupId?: string | null
  landingPage?: {
    __typename?: 'Page'
    documentId: string
    slug?: string | null
    title: string
    locale?: string | null
    localizations: Array<{
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      title: string
      locale?: string | null
      childPages: Array<{
        __typename?: 'Page'
        documentId: string
        slug?: string | null
        title: string
        locale?: string | null
      } | null>
    } | null>
    childPages: Array<{
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      title: string
      locale?: string | null
    } | null>
  } | null
  submenuPages?: Array<{
    __typename?: 'ComponentBlocksPageLink'
    url?: string | null
    analyticsId?: string | null
    label?: string | null
    page?: {
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      title: string
      locale?: string | null
    } | null
  } | null> | null
}

export type PageSubnavigationEntityFragment = {
  __typename?: 'Page'
  documentId: string
  slug?: string | null
  title: string
  locale?: string | null
  childPages: Array<{
    __typename?: 'Page'
    documentId: string
    slug?: string | null
    title: string
    locale?: string | null
  } | null>
}

export type AdminGroupsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>
  >
}>

export type AdminGroupsQuery = {
  __typename?: 'Query'
  adminGroups: Array<{
    __typename?: 'AdminGroup'
    contentManagedBy: string
    documentId: string
    slug: string
    title: string
    adminGroupId?: string | null
    landingPage?: {
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      title: string
      locale?: string | null
      localizations: Array<{
        __typename?: 'Page'
        documentId: string
        slug?: string | null
        title: string
        locale?: string | null
        childPages: Array<{
          __typename?: 'Page'
          documentId: string
          slug?: string | null
          title: string
          locale?: string | null
        } | null>
      } | null>
      childPages: Array<{
        __typename?: 'Page'
        documentId: string
        slug?: string | null
        title: string
        locale?: string | null
      } | null>
    } | null
    submenuPages?: Array<{
      __typename?: 'ComponentBlocksPageLink'
      url?: string | null
      analyticsId?: string | null
      label?: string | null
      page?: {
        __typename?: 'Page'
        documentId: string
        slug?: string | null
        title: string
        locale?: string | null
      } | null
    } | null> | null
  } | null>
}

export type ArticleCategoryEntityFragment = {
  __typename?: 'ArticleCategory'
  documentId: string
  title: string
  slug: string
}

export type ArticleSlugEntityFragment = {
  __typename: 'Article'
  documentId: string
  slug: string
  title: string
  locale?: string | null
}

export type ArticleCardEntityFragment = {
  __typename: 'Article'
  perex?: string | null
  addedAt: any
  documentId: string
  slug: string
  title: string
  locale?: string | null
  coverMedia?: {
    __typename?: 'UploadFile'
    documentId: string
    url: string
    width?: number | null
    height?: number | null
    caption?: string | null
    alternativeText?: string | null
    name: string
  } | null
  articleCategory?: {
    __typename?: 'ArticleCategory'
    documentId: string
    title: string
    slug: string
  } | null
  tags: Array<{
    __typename?: 'Tag'
    documentId: string
    title: string
    slug: string
    pageCategory?: {
      __typename?: 'PageCategory'
      documentId: string
      title?: string | null
      color?: Enum_Pagecategory_Color | null
    } | null
  } | null>
}

export type ArticleEntityFragment = {
  __typename: 'Article'
  alias?: string | null
  content?: string | null
  perex?: string | null
  addedAt: any
  documentId: string
  slug: string
  title: string
  locale?: string | null
  articleCategory?: {
    __typename?: 'ArticleCategory'
    documentId: string
    title: string
    slug: string
  } | null
  files?: Array<{
    __typename?: 'ComponentBlocksFile'
    id: string
    title?: string | null
    media?: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      name: string
      ext?: string | null
      size: number
      createdAt?: any | null
      updatedAt?: any | null
    } | null
  } | null> | null
  gallery: Array<{
    __typename?: 'UploadFile'
    documentId: string
    url: string
    width?: number | null
    height?: number | null
    caption?: string | null
    alternativeText?: string | null
    name: string
  } | null>
  inbaRelease?: {
    __typename?: 'InbaRelease'
    perex?: string | null
    releaseDate: any
    documentId: string
    title: string
    slug: string
    coverImage?: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      width?: number | null
      height?: number | null
      caption?: string | null
      alternativeText?: string | null
      name: string
    } | null
  } | null
  adminGroups: Array<{
    __typename?: 'AdminGroup'
    documentId: string
    slug: string
    title: string
    adminGroupId?: string | null
  } | null>
  coverMedia?: {
    __typename?: 'UploadFile'
    documentId: string
    url: string
    width?: number | null
    height?: number | null
    caption?: string | null
    alternativeText?: string | null
    name: string
  } | null
  tags: Array<{
    __typename?: 'Tag'
    documentId: string
    title: string
    slug: string
    pageCategory?: {
      __typename?: 'PageCategory'
      documentId: string
      title?: string | null
      color?: Enum_Pagecategory_Color | null
    } | null
  } | null>
}

export type ArticleBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input']
  locale: Scalars['I18NLocaleCode']['input']
}>

export type ArticleBySlugQuery = {
  __typename?: 'Query'
  articles: Array<{
    __typename: 'Article'
    alias?: string | null
    content?: string | null
    perex?: string | null
    addedAt: any
    documentId: string
    slug: string
    title: string
    locale?: string | null
    articleCategory?: {
      __typename?: 'ArticleCategory'
      documentId: string
      title: string
      slug: string
    } | null
    files?: Array<{
      __typename?: 'ComponentBlocksFile'
      id: string
      title?: string | null
      media?: {
        __typename?: 'UploadFile'
        documentId: string
        url: string
        name: string
        ext?: string | null
        size: number
        createdAt?: any | null
        updatedAt?: any | null
      } | null
    } | null> | null
    gallery: Array<{
      __typename?: 'UploadFile'
      documentId: string
      url: string
      width?: number | null
      height?: number | null
      caption?: string | null
      alternativeText?: string | null
      name: string
    } | null>
    inbaRelease?: {
      __typename?: 'InbaRelease'
      perex?: string | null
      releaseDate: any
      documentId: string
      title: string
      slug: string
      coverImage?: {
        __typename?: 'UploadFile'
        documentId: string
        url: string
        width?: number | null
        height?: number | null
        caption?: string | null
        alternativeText?: string | null
        name: string
      } | null
    } | null
    adminGroups: Array<{
      __typename?: 'AdminGroup'
      documentId: string
      slug: string
      title: string
      adminGroupId?: string | null
    } | null>
    coverMedia?: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      width?: number | null
      height?: number | null
      caption?: string | null
      alternativeText?: string | null
      name: string
    } | null
    tags: Array<{
      __typename?: 'Tag'
      documentId: string
      title: string
      slug: string
      pageCategory?: {
        __typename?: 'PageCategory'
        documentId: string
        title?: string | null
        color?: Enum_Pagecategory_Color | null
      } | null
    } | null>
  } | null>
}

export type ArticlesStaticPathsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>
  locale: Scalars['I18NLocaleCode']['input']
}>

export type ArticlesStaticPathsQuery = {
  __typename?: 'Query'
  articles: Array<{
    __typename: 'Article'
    documentId: string
    slug: string
    title: string
    locale?: string | null
  } | null>
}

export type ArticleCategoriesQueryVariables = Exact<{
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  sort?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>
  >
}>

export type ArticleCategoriesQuery = {
  __typename?: 'Query'
  articleCategories: Array<{
    __typename?: 'ArticleCategory'
    documentId: string
    title: string
    slug: string
  } | null>
}

export type ArticlesQueryVariables = Exact<{
  sort?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>
  >
  limit?: InputMaybe<Scalars['Int']['input']>
  start?: InputMaybe<Scalars['Int']['input']>
  filters?: InputMaybe<ArticleFiltersInput>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}>

export type ArticlesQuery = {
  __typename?: 'Query'
  articles: Array<{
    __typename: 'Article'
    perex?: string | null
    addedAt: any
    documentId: string
    slug: string
    title: string
    locale?: string | null
    coverMedia?: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      width?: number | null
      height?: number | null
      caption?: string | null
      alternativeText?: string | null
      name: string
    } | null
    articleCategory?: {
      __typename?: 'ArticleCategory'
      documentId: string
      title: string
      slug: string
    } | null
    tags: Array<{
      __typename?: 'Tag'
      documentId: string
      title: string
      slug: string
      pageCategory?: {
        __typename?: 'PageCategory'
        documentId: string
        title?: string | null
        color?: Enum_Pagecategory_Color | null
      } | null
    } | null>
  } | null>
}

export type ArticlesRssFeedQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode']['input']
}>

export type ArticlesRssFeedQuery = {
  __typename?: 'Query'
  articles: Array<{
    __typename?: 'Article'
    documentId: string
    slug: string
    title: string
    addedAt: any
    perex?: string | null
    tags: Array<{
      __typename?: 'Tag'
      title: string
      pageCategory?: { __typename?: 'PageCategory'; title?: string | null } | null
    } | null>
    coverMedia?: { __typename?: 'UploadFile'; url: string; mime: string; size: number } | null
  } | null>
}

export type Dev_AllArticlesQueryVariables = Exact<{
  sort?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>
  >
  limit?: InputMaybe<Scalars['Int']['input']>
  start?: InputMaybe<Scalars['Int']['input']>
  filters?: InputMaybe<ArticleFiltersInput>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}>

export type Dev_AllArticlesQuery = {
  __typename?: 'Query'
  articles: Array<{
    __typename: 'Article'
    alias?: string | null
    content?: string | null
    perex?: string | null
    addedAt: any
    documentId: string
    slug: string
    title: string
    locale?: string | null
    articleCategory?: {
      __typename?: 'ArticleCategory'
      documentId: string
      title: string
      slug: string
    } | null
    files?: Array<{
      __typename?: 'ComponentBlocksFile'
      id: string
      title?: string | null
      media?: {
        __typename?: 'UploadFile'
        documentId: string
        url: string
        name: string
        ext?: string | null
        size: number
        createdAt?: any | null
        updatedAt?: any | null
      } | null
    } | null> | null
    gallery: Array<{
      __typename?: 'UploadFile'
      documentId: string
      url: string
      width?: number | null
      height?: number | null
      caption?: string | null
      alternativeText?: string | null
      name: string
    } | null>
    inbaRelease?: {
      __typename?: 'InbaRelease'
      perex?: string | null
      releaseDate: any
      documentId: string
      title: string
      slug: string
      coverImage?: {
        __typename?: 'UploadFile'
        documentId: string
        url: string
        width?: number | null
        height?: number | null
        caption?: string | null
        alternativeText?: string | null
        name: string
      } | null
    } | null
    adminGroups: Array<{
      __typename?: 'AdminGroup'
      documentId: string
      slug: string
      title: string
      adminGroupId?: string | null
    } | null>
    coverMedia?: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      width?: number | null
      height?: number | null
      caption?: string | null
      alternativeText?: string | null
      name: string
    } | null
    tags: Array<{
      __typename?: 'Tag'
      documentId: string
      title: string
      slug: string
      pageCategory?: {
        __typename?: 'PageCategory'
        documentId: string
        title?: string | null
        color?: Enum_Pagecategory_Color | null
      } | null
    } | null>
  } | null>
}

export type AssetCategoryEntityFragment = {
  __typename?: 'AssetCategory'
  documentId: string
  title: string
  slug: string
}

export type AssetSlugEntityFragment = {
  __typename: 'Asset'
  documentId: string
  slug: string
  title: string
}

export type AssetEntityFragment = {
  __typename: 'Asset'
  publishedAt?: any | null
  updatedAt?: any | null
  description?: string | null
  documentId: string
  slug: string
  title: string
  assetCategory?: {
    __typename?: 'AssetCategory'
    documentId: string
    title: string
    slug: string
  } | null
  files: Array<{
    __typename?: 'UploadFile'
    documentId: string
    url: string
    name: string
    ext?: string | null
    size: number
    createdAt?: any | null
    updatedAt?: any | null
  } | null>
}

export type AssetBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input']
}>

export type AssetBySlugQuery = {
  __typename?: 'Query'
  assets: Array<{
    __typename: 'Asset'
    publishedAt?: any | null
    updatedAt?: any | null
    description?: string | null
    documentId: string
    slug: string
    title: string
    assetCategory?: {
      __typename?: 'AssetCategory'
      documentId: string
      title: string
      slug: string
    } | null
    files: Array<{
      __typename?: 'UploadFile'
      documentId: string
      url: string
      name: string
      ext?: string | null
      size: number
      createdAt?: any | null
      updatedAt?: any | null
    } | null>
  } | null>
}

export type AssetCategoriesQueryVariables = Exact<{ [key: string]: never }>

export type AssetCategoriesQuery = {
  __typename?: 'Query'
  assetCategories: Array<{
    __typename?: 'AssetCategory'
    documentId: string
    title: string
    slug: string
  } | null>
}

export type DocumentCategoryEntityFragment = {
  __typename?: 'DocumentCategory'
  documentId: string
  title: string
  slug: string
}

export type DocumentSlugEntityFragment = {
  __typename: 'Document'
  documentId: string
  slug: string
  title: string
}

export type DocumentEntityFragment = {
  __typename: 'Document'
  publishedAt?: any | null
  updatedAt?: any | null
  description?: string | null
  documentId: string
  slug: string
  title: string
  documentCategory?: {
    __typename?: 'DocumentCategory'
    documentId: string
    title: string
    slug: string
  } | null
  files: Array<{
    __typename?: 'UploadFile'
    documentId: string
    url: string
    name: string
    ext?: string | null
    size: number
    createdAt?: any | null
    updatedAt?: any | null
  } | null>
}

export type DocumentBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input']
}>

export type DocumentBySlugQuery = {
  __typename?: 'Query'
  documents: Array<{
    __typename: 'Document'
    publishedAt?: any | null
    updatedAt?: any | null
    description?: string | null
    documentId: string
    slug: string
    title: string
    documentCategory?: {
      __typename?: 'DocumentCategory'
      documentId: string
      title: string
      slug: string
    } | null
    files: Array<{
      __typename?: 'UploadFile'
      documentId: string
      url: string
      name: string
      ext?: string | null
      size: number
      createdAt?: any | null
      updatedAt?: any | null
    } | null>
  } | null>
}

export type DocumentCategoriesQueryVariables = Exact<{ [key: string]: never }>

export type DocumentCategoriesQuery = {
  __typename?: 'Query'
  documentCategories: Array<{
    __typename?: 'DocumentCategory'
    documentId: string
    title: string
    slug: string
  } | null>
}

export type FaqCategoryEntityFragment = {
  __typename?: 'FaqCategory'
  documentId: string
  title: string
  slug: string
  faqs: Array<{
    __typename?: 'Faq'
    documentId: string
    title: string
    body?: string | null
  } | null>
}

export type FaqEntityFragment = {
  __typename?: 'Faq'
  documentId: string
  title: string
  body?: string | null
}

export type UploadFileFragment = { __typename?: 'UploadFile'; documentId: string }

export type AllFilesQueryVariables = Exact<{
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}>

export type AllFilesQuery = {
  __typename?: 'Query'
  articles: Array<{
    __typename?: 'Article'
    coverMedia?: { __typename?: 'UploadFile'; documentId: string } | null
    gallery: Array<{ __typename?: 'UploadFile'; documentId: string } | null>
    files?: Array<{
      __typename?: 'ComponentBlocksFile'
      media?: { __typename?: 'UploadFile'; documentId: string } | null
    } | null> | null
  } | null>
  inbaReleases: Array<{
    __typename?: 'InbaRelease'
    coverImage?: { __typename?: 'UploadFile'; documentId: string } | null
    rearImage?: { __typename?: 'UploadFile'; documentId: string } | null
    files?: Array<{
      __typename?: 'ComponentBlocksFile'
      media?: { __typename?: 'UploadFile'; documentId: string } | null
    } | null> | null
  } | null>
  regulations: Array<{
    __typename?: 'Regulation'
    mainDocument: { __typename?: 'UploadFile'; documentId: string }
    attachments: Array<{ __typename?: 'UploadFile'; documentId: string } | null>
  } | null>
  pages: Array<{
    __typename?: 'Page'
    pageBackgroundImage?: { __typename?: 'UploadFile'; documentId: string } | null
    pageHeaderSections?: Array<
      | { __typename?: 'ComponentHeaderSectionsEvent' }
      | {
          __typename?: 'ComponentHeaderSectionsFacility'
          media: Array<{ __typename?: 'UploadFile'; documentId: string } | null>
        }
      | { __typename?: 'Error' }
      | null
    > | null
    sections?: Array<
      | {
          __typename?: 'ComponentSectionsAccordion'
          flatText?: Array<{
            __typename?: 'ComponentAccordionItemsFlatText'
            fileList?: Array<{
              __typename?: 'ComponentBlocksFileItem'
              media: { __typename?: 'UploadFile'; documentId: string }
            } | null> | null
          } | null> | null
        }
      | { __typename?: 'ComponentSectionsAlert' }
      | { __typename?: 'ComponentSectionsArticles' }
      | { __typename?: 'ComponentSectionsArticlesLandingPage' }
      | { __typename?: 'ComponentSectionsAssets' }
      | {
          __typename?: 'ComponentSectionsBanner'
          media: { __typename?: 'UploadFile'; documentId: string }
        }
      | { __typename?: 'ComponentSectionsColumnedText' }
      | {
          __typename?: 'ComponentSectionsColumns'
          columns: Array<{
            __typename?: 'ComponentBlocksColumnsItem'
            image?: { __typename?: 'UploadFile'; documentId: string } | null
          } | null>
        }
      | { __typename?: 'ComponentSectionsColumnsList' }
      | {
          __typename?: 'ComponentSectionsComparisonSection'
          cards: Array<{
            __typename?: 'ComponentBlocksComparisonCard'
            iconMedia?: { __typename?: 'UploadFile'; documentId: string } | null
          } | null>
        }
      | { __typename?: 'ComponentSectionsContactsSection' }
      | { __typename?: 'ComponentSectionsDivider' }
      | { __typename?: 'ComponentSectionsDocuments' }
      | { __typename?: 'ComponentSectionsEvents' }
      | { __typename?: 'ComponentSectionsFacilities' }
      | { __typename?: 'ComponentSectionsFaqCategories' }
      | { __typename?: 'ComponentSectionsFaqs' }
      | {
          __typename?: 'ComponentSectionsFileList'
          fileList?: Array<{
            __typename?: 'ComponentBlocksFile'
            media?: { __typename?: 'UploadFile'; documentId: string } | null
          } | null> | null
        }
      | {
          __typename?: 'ComponentSectionsGallery'
          medias: Array<{ __typename?: 'UploadFile'; documentId: string } | null>
        }
      | { __typename?: 'ComponentSectionsIframe' }
      | { __typename?: 'ComponentSectionsInbaLatestRelease' }
      | { __typename?: 'ComponentSectionsInbaReleases' }
      | { __typename?: 'ComponentSectionsJobOfferList' }
      | { __typename?: 'ComponentSectionsLinks' }
      | { __typename?: 'ComponentSectionsNarrowText' }
      | { __typename?: 'ComponentSectionsNewsletter' }
      | { __typename?: 'ComponentSectionsNumbersOverview' }
      | { __typename?: 'ComponentSectionsNumericalList' }
      | { __typename?: 'ComponentSectionsOfficialBoard' }
      | { __typename?: 'ComponentSectionsOpeningHours' }
      | { __typename?: 'ComponentSectionsOrganizationalStructure' }
      | {
          __typename?: 'ComponentSectionsPartners'
          partners: Array<{
            __typename?: 'ComponentBlocksPartner'
            logo: { __typename?: 'UploadFile'; documentId: string }
          } | null>
        }
      | { __typename?: 'ComponentSectionsProsAndConsSection' }
      | { __typename?: 'ComponentSectionsRegulations' }
      | { __typename?: 'ComponentSectionsStarzLandingPage' }
      | {
          __typename?: 'ComponentSectionsTextWithImage'
          imageSrc: { __typename?: 'UploadFile'; documentId: string }
        }
      | {
          __typename?: 'ComponentSectionsTextWithImageOverlapped'
          image: { __typename?: 'UploadFile'; documentId: string }
        }
      | { __typename?: 'ComponentSectionsTootootEvents' }
      | { __typename?: 'ComponentSectionsVideos' }
      | { __typename?: 'Error' }
      | null
    > | null
  } | null>
}

export type UploadImageSrcEntityFragment = {
  __typename?: 'UploadFile'
  documentId: string
  url: string
}

export type UploadImageEntityFragment = {
  __typename?: 'UploadFile'
  documentId: string
  url: string
  width?: number | null
  height?: number | null
  caption?: string | null
  alternativeText?: string | null
  name: string
}

export type UploadFileEntityFragment = {
  __typename?: 'UploadFile'
  documentId: string
  url: string
  name: string
  ext?: string | null
  size: number
  createdAt?: any | null
  updatedAt?: any | null
}

export type CommonLinkFragment = {
  __typename?: 'ComponentBlocksCommonLink'
  label?: string | null
  url?: string | null
  analyticsId?: string | null
  page?: {
    __typename?: 'Page'
    documentId: string
    slug?: string | null
    title: string
    locale?: string | null
  } | null
  article?: {
    __typename: 'Article'
    documentId: string
    slug: string
    title: string
    locale?: string | null
  } | null
}

export type CardLinkFragment = {
  __typename?: 'ComponentBlocksCardLink'
  label?: string | null
  subtext?: string | null
  url?: string | null
  analyticsId?: string | null
  media?: {
    __typename?: 'UploadFile'
    documentId: string
    url: string
    width?: number | null
    height?: number | null
    caption?: string | null
    alternativeText?: string | null
    name: string
  } | null
  page?: {
    __typename?: 'Page'
    documentId: string
    slug?: string | null
    title: string
    locale?: string | null
    pageBackgroundImage?: { __typename?: 'UploadFile'; documentId: string; url: string } | null
  } | null
  article?: {
    __typename: 'Article'
    perex?: string | null
    addedAt: any
    documentId: string
    slug: string
    title: string
    locale?: string | null
    coverMedia?: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      width?: number | null
      height?: number | null
      caption?: string | null
      alternativeText?: string | null
      name: string
    } | null
    articleCategory?: {
      __typename?: 'ArticleCategory'
      documentId: string
      title: string
      slug: string
    } | null
    tags: Array<{
      __typename?: 'Tag'
      documentId: string
      title: string
      slug: string
      pageCategory?: {
        __typename?: 'PageCategory'
        documentId: string
        title?: string | null
        color?: Enum_Pagecategory_Color | null
      } | null
    } | null>
  } | null
}

export type PageLinkFragment = {
  __typename?: 'ComponentBlocksPageLink'
  url?: string | null
  analyticsId?: string | null
  label?: string | null
  page?: {
    __typename?: 'Page'
    documentId: string
    slug?: string | null
    title: string
    locale?: string | null
  } | null
}

export type FooterColumnBlockFragment = {
  __typename?: 'ComponentBlocksFooterColumn'
  title: string
  links?: Array<{
    __typename?: 'ComponentBlocksCommonLink'
    label?: string | null
    url?: string | null
    analyticsId?: string | null
    page?: {
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      title: string
      locale?: string | null
    } | null
    article?: {
      __typename: 'Article'
      documentId: string
      slug: string
      title: string
      locale?: string | null
    } | null
  } | null> | null
}

export type FooterFragment = {
  __typename?: 'Footer'
  facebookUrl?: string | null
  instagramUrl?: string | null
  youtubeUrl?: string | null
  linkedinUrl?: string | null
  tiktokUrl?: string | null
  contactText?: string | null
  columns?: Array<{
    __typename?: 'ComponentBlocksFooterColumn'
    title: string
    links?: Array<{
      __typename?: 'ComponentBlocksCommonLink'
      label?: string | null
      url?: string | null
      analyticsId?: string | null
      page?: {
        __typename?: 'Page'
        documentId: string
        slug?: string | null
        title: string
        locale?: string | null
      } | null
      article?: {
        __typename: 'Article'
        documentId: string
        slug: string
        title: string
        locale?: string | null
      } | null
    } | null> | null
  } | null> | null
  accessibilityPageLink?: {
    __typename?: 'ComponentBlocksCommonLink'
    label?: string | null
    url?: string | null
    analyticsId?: string | null
    page?: {
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      title: string
      locale?: string | null
    } | null
    article?: {
      __typename: 'Article'
      documentId: string
      slug: string
      title: string
      locale?: string | null
    } | null
  } | null
  innovationsLink?: {
    __typename?: 'ComponentBlocksCommonLink'
    label?: string | null
    url?: string | null
    analyticsId?: string | null
    page?: {
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      title: string
      locale?: string | null
    } | null
    article?: {
      __typename: 'Article'
      documentId: string
      slug: string
      title: string
      locale?: string | null
    } | null
  } | null
}

export type MenuLinkFragment = {
  __typename?: 'ComponentMenuMenuLink'
  id: string
  label?: string | null
  url?: string | null
  analyticsId?: string | null
  page?: {
    __typename?: 'Page'
    documentId: string
    slug?: string | null
    title: string
    locale?: string | null
  } | null
}

export type MenuSectionFragment = {
  __typename?: 'ComponentMenuMenuSection'
  id: string
  label: string
  icon: Enum_Componentmenumenusection_Icon
  subtext?: string | null
  page?: {
    __typename?: 'Page'
    documentId: string
    slug?: string | null
    title: string
    locale?: string | null
  } | null
  links?: Array<{
    __typename?: 'ComponentMenuMenuLink'
    id: string
    label?: string | null
    url?: string | null
    analyticsId?: string | null
    page?: {
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      title: string
      locale?: string | null
    } | null
  } | null> | null
}

export type MenuItemFragment = {
  __typename?: 'ComponentMenuMenuItem'
  id: string
  label: string
  icon: Enum_Componentmenumenuitem_Icon
  page?: {
    __typename?: 'Page'
    documentId: string
    slug?: string | null
    title: string
    locale?: string | null
  } | null
  sections?: Array<{
    __typename?: 'ComponentMenuMenuSection'
    id: string
    label: string
    icon: Enum_Componentmenumenusection_Icon
    subtext?: string | null
    page?: {
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      title: string
      locale?: string | null
    } | null
    links?: Array<{
      __typename?: 'ComponentMenuMenuLink'
      id: string
      label?: string | null
      url?: string | null
      analyticsId?: string | null
      page?: {
        __typename?: 'Page'
        documentId: string
        slug?: string | null
        title: string
        locale?: string | null
      } | null
    } | null> | null
  } | null> | null
}

export type HeaderLinkFragment = {
  __typename?: 'ComponentGeneralHeaderLink'
  label?: string | null
  url?: string | null
  analyticsId?: string | null
  showOnDesktop: boolean
  showOnMobile: boolean
  icon: Enum_Componentgeneralheaderlink_Icon
  page?: {
    __typename?: 'Page'
    documentId: string
    slug?: string | null
    title: string
    locale?: string | null
  } | null
}

export type GeneralFragment = {
  __typename?: 'General'
  header?: {
    __typename?: 'ComponentGeneralHeader'
    links?: Array<{
      __typename?: 'ComponentGeneralHeaderLink'
      label?: string | null
      url?: string | null
      analyticsId?: string | null
      showOnDesktop: boolean
      showOnMobile: boolean
      icon: Enum_Componentgeneralheaderlink_Icon
      page?: {
        __typename?: 'Page'
        documentId: string
        slug?: string | null
        title: string
        locale?: string | null
      } | null
    } | null> | null
    accountLink?: {
      __typename?: 'ComponentBlocksCommonLink'
      label?: string | null
      url?: string | null
      analyticsId?: string | null
      page?: {
        __typename?: 'Page'
        documentId: string
        slug?: string | null
        title: string
        locale?: string | null
      } | null
      article?: {
        __typename: 'Article'
        documentId: string
        slug: string
        title: string
        locale?: string | null
      } | null
    } | null
  } | null
  newsPage?: {
    __typename?: 'Page'
    documentId: string
    slug?: string | null
    locale?: string | null
    title: string
    parentPage?: {
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      locale?: string | null
      title: string
      parentPage?: {
        __typename?: 'Page'
        documentId: string
        slug?: string | null
        locale?: string | null
        title: string
        parentPage?: {
          __typename?: 'Page'
          documentId: string
          slug?: string | null
          locale?: string | null
          title: string
          parentPage?: {
            __typename?: 'Page'
            documentId: string
            slug?: string | null
            locale?: string | null
            title: string
          } | null
        } | null
      } | null
    } | null
  } | null
  officialBoardPage?: {
    __typename?: 'Page'
    documentId: string
    slug?: string | null
    locale?: string | null
    title: string
    parentPage?: {
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      locale?: string | null
      title: string
      parentPage?: {
        __typename?: 'Page'
        documentId: string
        slug?: string | null
        locale?: string | null
        title: string
        parentPage?: {
          __typename?: 'Page'
          documentId: string
          slug?: string | null
          locale?: string | null
          title: string
          parentPage?: {
            __typename?: 'Page'
            documentId: string
            slug?: string | null
            locale?: string | null
            title: string
          } | null
        } | null
      } | null
    } | null
  } | null
  privacyPolicyPage?: {
    __typename?: 'Page'
    documentId: string
    slug?: string | null
    locale?: string | null
    title: string
    parentPage?: {
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      locale?: string | null
      title: string
      parentPage?: {
        __typename?: 'Page'
        documentId: string
        slug?: string | null
        locale?: string | null
        title: string
        parentPage?: {
          __typename?: 'Page'
          documentId: string
          slug?: string | null
          locale?: string | null
          title: string
          parentPage?: {
            __typename?: 'Page'
            documentId: string
            slug?: string | null
            locale?: string | null
            title: string
          } | null
        } | null
      } | null
    } | null
  } | null
  vznPage?: {
    __typename?: 'Page'
    documentId: string
    slug?: string | null
    locale?: string | null
    title: string
    parentPage?: {
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      locale?: string | null
      title: string
      parentPage?: {
        __typename?: 'Page'
        documentId: string
        slug?: string | null
        locale?: string | null
        title: string
        parentPage?: {
          __typename?: 'Page'
          documentId: string
          slug?: string | null
          locale?: string | null
          title: string
          parentPage?: {
            __typename?: 'Page'
            documentId: string
            slug?: string | null
            locale?: string | null
            title: string
          } | null
        } | null
      } | null
    } | null
  } | null
  inbaPage?: {
    __typename?: 'Page'
    documentId: string
    slug?: string | null
    locale?: string | null
    title: string
    parentPage?: {
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      locale?: string | null
      title: string
      parentPage?: {
        __typename?: 'Page'
        documentId: string
        slug?: string | null
        locale?: string | null
        title: string
        parentPage?: {
          __typename?: 'Page'
          documentId: string
          slug?: string | null
          locale?: string | null
          title: string
          parentPage?: {
            __typename?: 'Page'
            documentId: string
            slug?: string | null
            locale?: string | null
            title: string
          } | null
        } | null
      } | null
    } | null
  } | null
  inbaReleasesPage?: {
    __typename?: 'Page'
    documentId: string
    slug?: string | null
    locale?: string | null
    title: string
    parentPage?: {
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      locale?: string | null
      title: string
      parentPage?: {
        __typename?: 'Page'
        documentId: string
        slug?: string | null
        locale?: string | null
        title: string
        parentPage?: {
          __typename?: 'Page'
          documentId: string
          slug?: string | null
          locale?: string | null
          title: string
          parentPage?: {
            __typename?: 'Page'
            documentId: string
            slug?: string | null
            locale?: string | null
            title: string
          } | null
        } | null
      } | null
    } | null
  } | null
  documentsPage?: {
    __typename?: 'Page'
    documentId: string
    slug?: string | null
    locale?: string | null
    title: string
    parentPage?: {
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      locale?: string | null
      title: string
      parentPage?: {
        __typename?: 'Page'
        documentId: string
        slug?: string | null
        locale?: string | null
        title: string
        parentPage?: {
          __typename?: 'Page'
          documentId: string
          slug?: string | null
          locale?: string | null
          title: string
          parentPage?: {
            __typename?: 'Page'
            documentId: string
            slug?: string | null
            locale?: string | null
            title: string
          } | null
        } | null
      } | null
    } | null
  } | null
}

export type AlertFragment = { __typename?: 'Alert'; updatedAt?: any | null; text?: string | null }

export type GeneralQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode']['input']
}>

export type GeneralQuery = {
  __typename?: 'Query'
  general?: {
    __typename?: 'General'
    header?: {
      __typename?: 'ComponentGeneralHeader'
      links?: Array<{
        __typename?: 'ComponentGeneralHeaderLink'
        label?: string | null
        url?: string | null
        analyticsId?: string | null
        showOnDesktop: boolean
        showOnMobile: boolean
        icon: Enum_Componentgeneralheaderlink_Icon
        page?: {
          __typename?: 'Page'
          documentId: string
          slug?: string | null
          title: string
          locale?: string | null
        } | null
      } | null> | null
      accountLink?: {
        __typename?: 'ComponentBlocksCommonLink'
        label?: string | null
        url?: string | null
        analyticsId?: string | null
        page?: {
          __typename?: 'Page'
          documentId: string
          slug?: string | null
          title: string
          locale?: string | null
        } | null
        article?: {
          __typename: 'Article'
          documentId: string
          slug: string
          title: string
          locale?: string | null
        } | null
      } | null
    } | null
    newsPage?: {
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      locale?: string | null
      title: string
      parentPage?: {
        __typename?: 'Page'
        documentId: string
        slug?: string | null
        locale?: string | null
        title: string
        parentPage?: {
          __typename?: 'Page'
          documentId: string
          slug?: string | null
          locale?: string | null
          title: string
          parentPage?: {
            __typename?: 'Page'
            documentId: string
            slug?: string | null
            locale?: string | null
            title: string
            parentPage?: {
              __typename?: 'Page'
              documentId: string
              slug?: string | null
              locale?: string | null
              title: string
            } | null
          } | null
        } | null
      } | null
    } | null
    officialBoardPage?: {
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      locale?: string | null
      title: string
      parentPage?: {
        __typename?: 'Page'
        documentId: string
        slug?: string | null
        locale?: string | null
        title: string
        parentPage?: {
          __typename?: 'Page'
          documentId: string
          slug?: string | null
          locale?: string | null
          title: string
          parentPage?: {
            __typename?: 'Page'
            documentId: string
            slug?: string | null
            locale?: string | null
            title: string
            parentPage?: {
              __typename?: 'Page'
              documentId: string
              slug?: string | null
              locale?: string | null
              title: string
            } | null
          } | null
        } | null
      } | null
    } | null
    privacyPolicyPage?: {
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      locale?: string | null
      title: string
      parentPage?: {
        __typename?: 'Page'
        documentId: string
        slug?: string | null
        locale?: string | null
        title: string
        parentPage?: {
          __typename?: 'Page'
          documentId: string
          slug?: string | null
          locale?: string | null
          title: string
          parentPage?: {
            __typename?: 'Page'
            documentId: string
            slug?: string | null
            locale?: string | null
            title: string
            parentPage?: {
              __typename?: 'Page'
              documentId: string
              slug?: string | null
              locale?: string | null
              title: string
            } | null
          } | null
        } | null
      } | null
    } | null
    vznPage?: {
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      locale?: string | null
      title: string
      parentPage?: {
        __typename?: 'Page'
        documentId: string
        slug?: string | null
        locale?: string | null
        title: string
        parentPage?: {
          __typename?: 'Page'
          documentId: string
          slug?: string | null
          locale?: string | null
          title: string
          parentPage?: {
            __typename?: 'Page'
            documentId: string
            slug?: string | null
            locale?: string | null
            title: string
            parentPage?: {
              __typename?: 'Page'
              documentId: string
              slug?: string | null
              locale?: string | null
              title: string
            } | null
          } | null
        } | null
      } | null
    } | null
    inbaPage?: {
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      locale?: string | null
      title: string
      parentPage?: {
        __typename?: 'Page'
        documentId: string
        slug?: string | null
        locale?: string | null
        title: string
        parentPage?: {
          __typename?: 'Page'
          documentId: string
          slug?: string | null
          locale?: string | null
          title: string
          parentPage?: {
            __typename?: 'Page'
            documentId: string
            slug?: string | null
            locale?: string | null
            title: string
            parentPage?: {
              __typename?: 'Page'
              documentId: string
              slug?: string | null
              locale?: string | null
              title: string
            } | null
          } | null
        } | null
      } | null
    } | null
    inbaReleasesPage?: {
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      locale?: string | null
      title: string
      parentPage?: {
        __typename?: 'Page'
        documentId: string
        slug?: string | null
        locale?: string | null
        title: string
        parentPage?: {
          __typename?: 'Page'
          documentId: string
          slug?: string | null
          locale?: string | null
          title: string
          parentPage?: {
            __typename?: 'Page'
            documentId: string
            slug?: string | null
            locale?: string | null
            title: string
            parentPage?: {
              __typename?: 'Page'
              documentId: string
              slug?: string | null
              locale?: string | null
              title: string
            } | null
          } | null
        } | null
      } | null
    } | null
    documentsPage?: {
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      locale?: string | null
      title: string
      parentPage?: {
        __typename?: 'Page'
        documentId: string
        slug?: string | null
        locale?: string | null
        title: string
        parentPage?: {
          __typename?: 'Page'
          documentId: string
          slug?: string | null
          locale?: string | null
          title: string
          parentPage?: {
            __typename?: 'Page'
            documentId: string
            slug?: string | null
            locale?: string | null
            title: string
            parentPage?: {
              __typename?: 'Page'
              documentId: string
              slug?: string | null
              locale?: string | null
              title: string
            } | null
          } | null
        } | null
      } | null
    } | null
  } | null
  menu?: {
    __typename?: 'Menu'
    menus?: Array<{
      __typename?: 'ComponentMenuMenuItem'
      id: string
      label: string
      icon: Enum_Componentmenumenuitem_Icon
      page?: {
        __typename?: 'Page'
        documentId: string
        slug?: string | null
        title: string
        locale?: string | null
      } | null
      sections?: Array<{
        __typename?: 'ComponentMenuMenuSection'
        id: string
        label: string
        icon: Enum_Componentmenumenusection_Icon
        subtext?: string | null
        page?: {
          __typename?: 'Page'
          documentId: string
          slug?: string | null
          title: string
          locale?: string | null
        } | null
        links?: Array<{
          __typename?: 'ComponentMenuMenuLink'
          id: string
          label?: string | null
          url?: string | null
          analyticsId?: string | null
          page?: {
            __typename?: 'Page'
            documentId: string
            slug?: string | null
            title: string
            locale?: string | null
          } | null
        } | null> | null
      } | null> | null
    } | null> | null
  } | null
  footer?: {
    __typename?: 'Footer'
    facebookUrl?: string | null
    instagramUrl?: string | null
    youtubeUrl?: string | null
    linkedinUrl?: string | null
    tiktokUrl?: string | null
    contactText?: string | null
    columns?: Array<{
      __typename?: 'ComponentBlocksFooterColumn'
      title: string
      links?: Array<{
        __typename?: 'ComponentBlocksCommonLink'
        label?: string | null
        url?: string | null
        analyticsId?: string | null
        page?: {
          __typename?: 'Page'
          documentId: string
          slug?: string | null
          title: string
          locale?: string | null
        } | null
        article?: {
          __typename: 'Article'
          documentId: string
          slug: string
          title: string
          locale?: string | null
        } | null
      } | null> | null
    } | null> | null
    accessibilityPageLink?: {
      __typename?: 'ComponentBlocksCommonLink'
      label?: string | null
      url?: string | null
      analyticsId?: string | null
      page?: {
        __typename?: 'Page'
        documentId: string
        slug?: string | null
        title: string
        locale?: string | null
      } | null
      article?: {
        __typename: 'Article'
        documentId: string
        slug: string
        title: string
        locale?: string | null
      } | null
    } | null
    innovationsLink?: {
      __typename?: 'ComponentBlocksCommonLink'
      label?: string | null
      url?: string | null
      analyticsId?: string | null
      page?: {
        __typename?: 'Page'
        documentId: string
        slug?: string | null
        title: string
        locale?: string | null
      } | null
      article?: {
        __typename: 'Article'
        documentId: string
        slug: string
        title: string
        locale?: string | null
      } | null
    } | null
  } | null
  alert?: { __typename?: 'Alert'; updatedAt?: any | null; text?: string | null } | null
}

export type AlertQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode']['input']
}>

export type AlertQuery = {
  __typename?: 'Query'
  alert?: { __typename?: 'Alert'; updatedAt?: any | null; text?: string | null } | null
}

export type HomepageEntityFragment = {
  __typename?: 'Homepage'
  documentId: string
  updatedAt?: any | null
  createdAt?: any | null
  metaTitle: string
  metaDescription: string
  welcomeHeadline: string
  welcomeMedia: { __typename?: 'UploadFile'; documentId: string; url: string }
  highlights?: {
    __typename?: 'ComponentSectionsHomepageHighlights'
    title?: string | null
    text?: string | null
    cards?: Array<{
      __typename?: 'ComponentBlocksHomepageHighlightsItem'
      id: string
      label?: string | null
      subtext?: string | null
      url?: string | null
      analyticsId?: string | null
      page?: {
        __typename?: 'Page'
        documentId: string
        slug?: string | null
        title: string
        locale?: string | null
        pageBackgroundImage?: { __typename?: 'UploadFile'; documentId: string; url: string } | null
      } | null
      article?: {
        __typename: 'Article'
        perex?: string | null
        addedAt: any
        documentId: string
        slug: string
        title: string
        locale?: string | null
        coverMedia?: {
          __typename?: 'UploadFile'
          documentId: string
          url: string
          width?: number | null
          height?: number | null
          caption?: string | null
          alternativeText?: string | null
          name: string
        } | null
        articleCategory?: {
          __typename?: 'ArticleCategory'
          documentId: string
          title: string
          slug: string
        } | null
        tags: Array<{
          __typename?: 'Tag'
          documentId: string
          title: string
          slug: string
          pageCategory?: {
            __typename?: 'PageCategory'
            documentId: string
            title?: string | null
            color?: Enum_Pagecategory_Color | null
          } | null
        } | null>
      } | null
      media?: {
        __typename?: 'UploadFile'
        documentId: string
        url: string
        width?: number | null
        height?: number | null
        caption?: string | null
        alternativeText?: string | null
        name: string
      } | null
    } | null> | null
  } | null
  tabs?: {
    __typename?: 'ComponentSectionsHomepageTabs'
    leftArticle?: {
      __typename: 'Article'
      perex?: string | null
      addedAt: any
      documentId: string
      slug: string
      title: string
      locale?: string | null
      coverMedia?: {
        __typename?: 'UploadFile'
        documentId: string
        url: string
        width?: number | null
        height?: number | null
        caption?: string | null
        alternativeText?: string | null
        name: string
      } | null
      articleCategory?: {
        __typename?: 'ArticleCategory'
        documentId: string
        title: string
        slug: string
      } | null
      tags: Array<{
        __typename?: 'Tag'
        documentId: string
        title: string
        slug: string
        pageCategory?: {
          __typename?: 'PageCategory'
          documentId: string
          title?: string | null
          color?: Enum_Pagecategory_Color | null
        } | null
      } | null>
    } | null
    rightArticle?: {
      __typename: 'Article'
      perex?: string | null
      addedAt: any
      documentId: string
      slug: string
      title: string
      locale?: string | null
      coverMedia?: {
        __typename?: 'UploadFile'
        documentId: string
        url: string
        width?: number | null
        height?: number | null
        caption?: string | null
        alternativeText?: string | null
        name: string
      } | null
      articleCategory?: {
        __typename?: 'ArticleCategory'
        documentId: string
        title: string
        slug: string
      } | null
      tags: Array<{
        __typename?: 'Tag'
        documentId: string
        title: string
        slug: string
        pageCategory?: {
          __typename?: 'PageCategory'
          documentId: string
          title?: string | null
          color?: Enum_Pagecategory_Color | null
        } | null
      } | null>
    } | null
    newsPageLink?: {
      __typename?: 'ComponentBlocksCommonLink'
      label?: string | null
      url?: string | null
      analyticsId?: string | null
      page?: {
        __typename?: 'Page'
        documentId: string
        slug?: string | null
        title: string
        locale?: string | null
      } | null
      article?: {
        __typename: 'Article'
        documentId: string
        slug: string
        title: string
        locale?: string | null
      } | null
    } | null
    officialBoardPageLink?: {
      __typename?: 'ComponentBlocksCommonLink'
      label?: string | null
      url?: string | null
      analyticsId?: string | null
      page?: {
        __typename?: 'Page'
        documentId: string
        slug?: string | null
        title: string
        locale?: string | null
      } | null
      article?: {
        __typename: 'Article'
        documentId: string
        slug: string
        title: string
        locale?: string | null
      } | null
    } | null
    roadClosuresPageLink?: {
      __typename?: 'ComponentBlocksCommonLink'
      label?: string | null
      url?: string | null
      analyticsId?: string | null
      page?: {
        __typename?: 'Page'
        documentId: string
        slug?: string | null
        title: string
        locale?: string | null
      } | null
      article?: {
        __typename: 'Article'
        documentId: string
        slug: string
        title: string
        locale?: string | null
      } | null
    } | null
  } | null
  mayorAndCouncil?: {
    __typename?: 'ComponentSectionsHomepageMayorAndCouncil'
    title?: string | null
    text?: string | null
    mayorCard?: {
      __typename?: 'ComponentBlocksCommonLink'
      label?: string | null
      url?: string | null
      analyticsId?: string | null
      page?: {
        __typename?: 'Page'
        documentId: string
        slug?: string | null
        title: string
        locale?: string | null
      } | null
      article?: {
        __typename: 'Article'
        documentId: string
        slug: string
        title: string
        locale?: string | null
      } | null
    } | null
    councilCard?: {
      __typename?: 'ComponentBlocksCommonLink'
      label?: string | null
      url?: string | null
      analyticsId?: string | null
      page?: {
        __typename?: 'Page'
        documentId: string
        slug?: string | null
        title: string
        locale?: string | null
      } | null
      article?: {
        __typename: 'Article'
        documentId: string
        slug: string
        title: string
        locale?: string | null
      } | null
    } | null
  } | null
  eventsSection?: {
    __typename?: 'ComponentSectionsTootootEvents'
    title?: string | null
    text?: string | null
    showMoreLink?: {
      __typename?: 'ComponentBlocksCommonLink'
      label?: string | null
      url?: string | null
      analyticsId?: string | null
      page?: {
        __typename?: 'Page'
        documentId: string
        slug?: string | null
        title: string
        locale?: string | null
      } | null
      article?: {
        __typename: 'Article'
        documentId: string
        slug: string
        title: string
        locale?: string | null
      } | null
    } | null
  } | null
  topServices?: {
    __typename?: 'ComponentSectionsTopServices'
    title: string
    services: Array<{
      __typename?: 'ComponentBlocksTopServicesItem'
      icon: Enum_Componentblockstopservicesitem_Icon
      link: {
        __typename?: 'ComponentBlocksCommonLink'
        label?: string | null
        url?: string | null
        analyticsId?: string | null
        page?: {
          __typename?: 'Page'
          documentId: string
          slug?: string | null
          title: string
          locale?: string | null
        } | null
        article?: {
          __typename: 'Article'
          documentId: string
          slug: string
          title: string
          locale?: string | null
        } | null
      }
    } | null>
  } | null
  inba?: {
    __typename?: 'ComponentBlocksInBa'
    title?: string | null
    content?: string | null
    showMoreLink?: {
      __typename?: 'ComponentBlocksCommonLink'
      label?: string | null
      url?: string | null
      analyticsId?: string | null
      page?: {
        __typename?: 'Page'
        documentId: string
        slug?: string | null
        title: string
        locale?: string | null
      } | null
      article?: {
        __typename: 'Article'
        documentId: string
        slug: string
        title: string
        locale?: string | null
      } | null
    } | null
  } | null
}

export type HomepageQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode']['input']
}>

export type HomepageQuery = {
  __typename?: 'Query'
  homepage?: {
    __typename?: 'Homepage'
    documentId: string
    updatedAt?: any | null
    createdAt?: any | null
    metaTitle: string
    metaDescription: string
    welcomeHeadline: string
    welcomeMedia: { __typename?: 'UploadFile'; documentId: string; url: string }
    highlights?: {
      __typename?: 'ComponentSectionsHomepageHighlights'
      title?: string | null
      text?: string | null
      cards?: Array<{
        __typename?: 'ComponentBlocksHomepageHighlightsItem'
        id: string
        label?: string | null
        subtext?: string | null
        url?: string | null
        analyticsId?: string | null
        page?: {
          __typename?: 'Page'
          documentId: string
          slug?: string | null
          title: string
          locale?: string | null
          pageBackgroundImage?: {
            __typename?: 'UploadFile'
            documentId: string
            url: string
          } | null
        } | null
        article?: {
          __typename: 'Article'
          perex?: string | null
          addedAt: any
          documentId: string
          slug: string
          title: string
          locale?: string | null
          coverMedia?: {
            __typename?: 'UploadFile'
            documentId: string
            url: string
            width?: number | null
            height?: number | null
            caption?: string | null
            alternativeText?: string | null
            name: string
          } | null
          articleCategory?: {
            __typename?: 'ArticleCategory'
            documentId: string
            title: string
            slug: string
          } | null
          tags: Array<{
            __typename?: 'Tag'
            documentId: string
            title: string
            slug: string
            pageCategory?: {
              __typename?: 'PageCategory'
              documentId: string
              title?: string | null
              color?: Enum_Pagecategory_Color | null
            } | null
          } | null>
        } | null
        media?: {
          __typename?: 'UploadFile'
          documentId: string
          url: string
          width?: number | null
          height?: number | null
          caption?: string | null
          alternativeText?: string | null
          name: string
        } | null
      } | null> | null
    } | null
    tabs?: {
      __typename?: 'ComponentSectionsHomepageTabs'
      leftArticle?: {
        __typename: 'Article'
        perex?: string | null
        addedAt: any
        documentId: string
        slug: string
        title: string
        locale?: string | null
        coverMedia?: {
          __typename?: 'UploadFile'
          documentId: string
          url: string
          width?: number | null
          height?: number | null
          caption?: string | null
          alternativeText?: string | null
          name: string
        } | null
        articleCategory?: {
          __typename?: 'ArticleCategory'
          documentId: string
          title: string
          slug: string
        } | null
        tags: Array<{
          __typename?: 'Tag'
          documentId: string
          title: string
          slug: string
          pageCategory?: {
            __typename?: 'PageCategory'
            documentId: string
            title?: string | null
            color?: Enum_Pagecategory_Color | null
          } | null
        } | null>
      } | null
      rightArticle?: {
        __typename: 'Article'
        perex?: string | null
        addedAt: any
        documentId: string
        slug: string
        title: string
        locale?: string | null
        coverMedia?: {
          __typename?: 'UploadFile'
          documentId: string
          url: string
          width?: number | null
          height?: number | null
          caption?: string | null
          alternativeText?: string | null
          name: string
        } | null
        articleCategory?: {
          __typename?: 'ArticleCategory'
          documentId: string
          title: string
          slug: string
        } | null
        tags: Array<{
          __typename?: 'Tag'
          documentId: string
          title: string
          slug: string
          pageCategory?: {
            __typename?: 'PageCategory'
            documentId: string
            title?: string | null
            color?: Enum_Pagecategory_Color | null
          } | null
        } | null>
      } | null
      newsPageLink?: {
        __typename?: 'ComponentBlocksCommonLink'
        label?: string | null
        url?: string | null
        analyticsId?: string | null
        page?: {
          __typename?: 'Page'
          documentId: string
          slug?: string | null
          title: string
          locale?: string | null
        } | null
        article?: {
          __typename: 'Article'
          documentId: string
          slug: string
          title: string
          locale?: string | null
        } | null
      } | null
      officialBoardPageLink?: {
        __typename?: 'ComponentBlocksCommonLink'
        label?: string | null
        url?: string | null
        analyticsId?: string | null
        page?: {
          __typename?: 'Page'
          documentId: string
          slug?: string | null
          title: string
          locale?: string | null
        } | null
        article?: {
          __typename: 'Article'
          documentId: string
          slug: string
          title: string
          locale?: string | null
        } | null
      } | null
      roadClosuresPageLink?: {
        __typename?: 'ComponentBlocksCommonLink'
        label?: string | null
        url?: string | null
        analyticsId?: string | null
        page?: {
          __typename?: 'Page'
          documentId: string
          slug?: string | null
          title: string
          locale?: string | null
        } | null
        article?: {
          __typename: 'Article'
          documentId: string
          slug: string
          title: string
          locale?: string | null
        } | null
      } | null
    } | null
    mayorAndCouncil?: {
      __typename?: 'ComponentSectionsHomepageMayorAndCouncil'
      title?: string | null
      text?: string | null
      mayorCard?: {
        __typename?: 'ComponentBlocksCommonLink'
        label?: string | null
        url?: string | null
        analyticsId?: string | null
        page?: {
          __typename?: 'Page'
          documentId: string
          slug?: string | null
          title: string
          locale?: string | null
        } | null
        article?: {
          __typename: 'Article'
          documentId: string
          slug: string
          title: string
          locale?: string | null
        } | null
      } | null
      councilCard?: {
        __typename?: 'ComponentBlocksCommonLink'
        label?: string | null
        url?: string | null
        analyticsId?: string | null
        page?: {
          __typename?: 'Page'
          documentId: string
          slug?: string | null
          title: string
          locale?: string | null
        } | null
        article?: {
          __typename: 'Article'
          documentId: string
          slug: string
          title: string
          locale?: string | null
        } | null
      } | null
    } | null
    eventsSection?: {
      __typename?: 'ComponentSectionsTootootEvents'
      title?: string | null
      text?: string | null
      showMoreLink?: {
        __typename?: 'ComponentBlocksCommonLink'
        label?: string | null
        url?: string | null
        analyticsId?: string | null
        page?: {
          __typename?: 'Page'
          documentId: string
          slug?: string | null
          title: string
          locale?: string | null
        } | null
        article?: {
          __typename: 'Article'
          documentId: string
          slug: string
          title: string
          locale?: string | null
        } | null
      } | null
    } | null
    topServices?: {
      __typename?: 'ComponentSectionsTopServices'
      title: string
      services: Array<{
        __typename?: 'ComponentBlocksTopServicesItem'
        icon: Enum_Componentblockstopservicesitem_Icon
        link: {
          __typename?: 'ComponentBlocksCommonLink'
          label?: string | null
          url?: string | null
          analyticsId?: string | null
          page?: {
            __typename?: 'Page'
            documentId: string
            slug?: string | null
            title: string
            locale?: string | null
          } | null
          article?: {
            __typename: 'Article'
            documentId: string
            slug: string
            title: string
            locale?: string | null
          } | null
        }
      } | null>
    } | null
    inba?: {
      __typename?: 'ComponentBlocksInBa'
      title?: string | null
      content?: string | null
      showMoreLink?: {
        __typename?: 'ComponentBlocksCommonLink'
        label?: string | null
        url?: string | null
        analyticsId?: string | null
        page?: {
          __typename?: 'Page'
          documentId: string
          slug?: string | null
          title: string
          locale?: string | null
        } | null
        article?: {
          __typename: 'Article'
          documentId: string
          slug: string
          title: string
          locale?: string | null
        } | null
      } | null
    } | null
  } | null
}

export type HomepageHighlightsItemFragment = {
  __typename?: 'ComponentBlocksHomepageHighlightsItem'
  id: string
  label?: string | null
  subtext?: string | null
  url?: string | null
  analyticsId?: string | null
  page?: {
    __typename?: 'Page'
    documentId: string
    slug?: string | null
    title: string
    locale?: string | null
    pageBackgroundImage?: { __typename?: 'UploadFile'; documentId: string; url: string } | null
  } | null
  article?: {
    __typename: 'Article'
    perex?: string | null
    addedAt: any
    documentId: string
    slug: string
    title: string
    locale?: string | null
    coverMedia?: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      width?: number | null
      height?: number | null
      caption?: string | null
      alternativeText?: string | null
      name: string
    } | null
    articleCategory?: {
      __typename?: 'ArticleCategory'
      documentId: string
      title: string
      slug: string
    } | null
    tags: Array<{
      __typename?: 'Tag'
      documentId: string
      title: string
      slug: string
      pageCategory?: {
        __typename?: 'PageCategory'
        documentId: string
        title?: string | null
        color?: Enum_Pagecategory_Color | null
      } | null
    } | null>
  } | null
  media?: {
    __typename?: 'UploadFile'
    documentId: string
    url: string
    width?: number | null
    height?: number | null
    caption?: string | null
    alternativeText?: string | null
    name: string
  } | null
}

export type HomepageTabsFragment = {
  __typename?: 'ComponentSectionsHomepageTabs'
  leftArticle?: {
    __typename: 'Article'
    perex?: string | null
    addedAt: any
    documentId: string
    slug: string
    title: string
    locale?: string | null
    coverMedia?: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      width?: number | null
      height?: number | null
      caption?: string | null
      alternativeText?: string | null
      name: string
    } | null
    articleCategory?: {
      __typename?: 'ArticleCategory'
      documentId: string
      title: string
      slug: string
    } | null
    tags: Array<{
      __typename?: 'Tag'
      documentId: string
      title: string
      slug: string
      pageCategory?: {
        __typename?: 'PageCategory'
        documentId: string
        title?: string | null
        color?: Enum_Pagecategory_Color | null
      } | null
    } | null>
  } | null
  rightArticle?: {
    __typename: 'Article'
    perex?: string | null
    addedAt: any
    documentId: string
    slug: string
    title: string
    locale?: string | null
    coverMedia?: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      width?: number | null
      height?: number | null
      caption?: string | null
      alternativeText?: string | null
      name: string
    } | null
    articleCategory?: {
      __typename?: 'ArticleCategory'
      documentId: string
      title: string
      slug: string
    } | null
    tags: Array<{
      __typename?: 'Tag'
      documentId: string
      title: string
      slug: string
      pageCategory?: {
        __typename?: 'PageCategory'
        documentId: string
        title?: string | null
        color?: Enum_Pagecategory_Color | null
      } | null
    } | null>
  } | null
  newsPageLink?: {
    __typename?: 'ComponentBlocksCommonLink'
    label?: string | null
    url?: string | null
    analyticsId?: string | null
    page?: {
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      title: string
      locale?: string | null
    } | null
    article?: {
      __typename: 'Article'
      documentId: string
      slug: string
      title: string
      locale?: string | null
    } | null
  } | null
  officialBoardPageLink?: {
    __typename?: 'ComponentBlocksCommonLink'
    label?: string | null
    url?: string | null
    analyticsId?: string | null
    page?: {
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      title: string
      locale?: string | null
    } | null
    article?: {
      __typename: 'Article'
      documentId: string
      slug: string
      title: string
      locale?: string | null
    } | null
  } | null
  roadClosuresPageLink?: {
    __typename?: 'ComponentBlocksCommonLink'
    label?: string | null
    url?: string | null
    analyticsId?: string | null
    page?: {
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      title: string
      locale?: string | null
    } | null
    article?: {
      __typename: 'Article'
      documentId: string
      slug: string
      title: string
      locale?: string | null
    } | null
  } | null
}

export type HomepageMayorAndCouncilSectionFragment = {
  __typename?: 'ComponentSectionsHomepageMayorAndCouncil'
  title?: string | null
  text?: string | null
  mayorCard?: {
    __typename?: 'ComponentBlocksCommonLink'
    label?: string | null
    url?: string | null
    analyticsId?: string | null
    page?: {
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      title: string
      locale?: string | null
    } | null
    article?: {
      __typename: 'Article'
      documentId: string
      slug: string
      title: string
      locale?: string | null
    } | null
  } | null
  councilCard?: {
    __typename?: 'ComponentBlocksCommonLink'
    label?: string | null
    url?: string | null
    analyticsId?: string | null
    page?: {
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      title: string
      locale?: string | null
    } | null
    article?: {
      __typename: 'Article'
      documentId: string
      slug: string
      title: string
      locale?: string | null
    } | null
  } | null
}

export type TopServicesItemFragment = {
  __typename?: 'ComponentBlocksTopServicesItem'
  icon: Enum_Componentblockstopservicesitem_Icon
  link: {
    __typename?: 'ComponentBlocksCommonLink'
    label?: string | null
    url?: string | null
    analyticsId?: string | null
    page?: {
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      title: string
      locale?: string | null
    } | null
    article?: {
      __typename: 'Article'
      documentId: string
      slug: string
      title: string
      locale?: string | null
    } | null
  }
}

export type HomepageInbaFragment = {
  __typename?: 'ComponentBlocksInBa'
  title?: string | null
  content?: string | null
  showMoreLink?: {
    __typename?: 'ComponentBlocksCommonLink'
    label?: string | null
    url?: string | null
    analyticsId?: string | null
    page?: {
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      title: string
      locale?: string | null
    } | null
    article?: {
      __typename: 'Article'
      documentId: string
      slug: string
      title: string
      locale?: string | null
    } | null
  } | null
}

export type InbaReleaseSlugEntityFragment = {
  __typename?: 'InbaRelease'
  documentId: string
  title: string
  slug: string
}

export type InbaReleaseCardEntityFragment = {
  __typename?: 'InbaRelease'
  perex?: string | null
  releaseDate: any
  documentId: string
  title: string
  slug: string
  coverImage?: {
    __typename?: 'UploadFile'
    documentId: string
    url: string
    width?: number | null
    height?: number | null
    caption?: string | null
    alternativeText?: string | null
    name: string
  } | null
}

export type InbaReleaseEntityFragment = {
  __typename?: 'InbaRelease'
  perex?: string | null
  releaseDate: any
  documentId: string
  title: string
  slug: string
  rearImage?: {
    __typename?: 'UploadFile'
    documentId: string
    url: string
    width?: number | null
    height?: number | null
    caption?: string | null
    alternativeText?: string | null
    name: string
  } | null
  files?: Array<{
    __typename?: 'ComponentBlocksFile'
    id: string
    title?: string | null
    media?: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      name: string
      ext?: string | null
      size: number
      createdAt?: any | null
      updatedAt?: any | null
    } | null
  } | null> | null
  articles: Array<{
    __typename: 'Article'
    perex?: string | null
    addedAt: any
    documentId: string
    slug: string
    title: string
    locale?: string | null
    coverMedia?: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      width?: number | null
      height?: number | null
      caption?: string | null
      alternativeText?: string | null
      name: string
    } | null
    articleCategory?: {
      __typename?: 'ArticleCategory'
      documentId: string
      title: string
      slug: string
    } | null
    tags: Array<{
      __typename?: 'Tag'
      documentId: string
      title: string
      slug: string
      pageCategory?: {
        __typename?: 'PageCategory'
        documentId: string
        title?: string | null
        color?: Enum_Pagecategory_Color | null
      } | null
    } | null>
  } | null>
  featuredArticles: Array<{
    __typename: 'Article'
    perex?: string | null
    addedAt: any
    documentId: string
    slug: string
    title: string
    locale?: string | null
    coverMedia?: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      width?: number | null
      height?: number | null
      caption?: string | null
      alternativeText?: string | null
      name: string
    } | null
    articleCategory?: {
      __typename?: 'ArticleCategory'
      documentId: string
      title: string
      slug: string
    } | null
    tags: Array<{
      __typename?: 'Tag'
      documentId: string
      title: string
      slug: string
      pageCategory?: {
        __typename?: 'PageCategory'
        documentId: string
        title?: string | null
        color?: Enum_Pagecategory_Color | null
      } | null
    } | null>
  } | null>
  coverImage?: {
    __typename?: 'UploadFile'
    documentId: string
    url: string
    width?: number | null
    height?: number | null
    caption?: string | null
    alternativeText?: string | null
    name: string
  } | null
}

export type InbaReleaseHomepageInbaCardEntityFragment = {
  __typename?: 'InbaRelease'
  documentId: string
  coverImage?: {
    __typename?: 'UploadFile'
    documentId: string
    url: string
    width?: number | null
    height?: number | null
    caption?: string | null
    alternativeText?: string | null
    name: string
  } | null
  rearImage?: {
    __typename?: 'UploadFile'
    documentId: string
    url: string
    width?: number | null
    height?: number | null
    caption?: string | null
    alternativeText?: string | null
    name: string
  } | null
}

export type InbaReleaseBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input']
}>

export type InbaReleaseBySlugQuery = {
  __typename?: 'Query'
  inbaReleases: Array<{
    __typename?: 'InbaRelease'
    perex?: string | null
    releaseDate: any
    documentId: string
    title: string
    slug: string
    rearImage?: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      width?: number | null
      height?: number | null
      caption?: string | null
      alternativeText?: string | null
      name: string
    } | null
    files?: Array<{
      __typename?: 'ComponentBlocksFile'
      id: string
      title?: string | null
      media?: {
        __typename?: 'UploadFile'
        documentId: string
        url: string
        name: string
        ext?: string | null
        size: number
        createdAt?: any | null
        updatedAt?: any | null
      } | null
    } | null> | null
    articles: Array<{
      __typename: 'Article'
      perex?: string | null
      addedAt: any
      documentId: string
      slug: string
      title: string
      locale?: string | null
      coverMedia?: {
        __typename?: 'UploadFile'
        documentId: string
        url: string
        width?: number | null
        height?: number | null
        caption?: string | null
        alternativeText?: string | null
        name: string
      } | null
      articleCategory?: {
        __typename?: 'ArticleCategory'
        documentId: string
        title: string
        slug: string
      } | null
      tags: Array<{
        __typename?: 'Tag'
        documentId: string
        title: string
        slug: string
        pageCategory?: {
          __typename?: 'PageCategory'
          documentId: string
          title?: string | null
          color?: Enum_Pagecategory_Color | null
        } | null
      } | null>
    } | null>
    featuredArticles: Array<{
      __typename: 'Article'
      perex?: string | null
      addedAt: any
      documentId: string
      slug: string
      title: string
      locale?: string | null
      coverMedia?: {
        __typename?: 'UploadFile'
        documentId: string
        url: string
        width?: number | null
        height?: number | null
        caption?: string | null
        alternativeText?: string | null
        name: string
      } | null
      articleCategory?: {
        __typename?: 'ArticleCategory'
        documentId: string
        title: string
        slug: string
      } | null
      tags: Array<{
        __typename?: 'Tag'
        documentId: string
        title: string
        slug: string
        pageCategory?: {
          __typename?: 'PageCategory'
          documentId: string
          title?: string | null
          color?: Enum_Pagecategory_Color | null
        } | null
      } | null>
    } | null>
    coverImage?: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      width?: number | null
      height?: number | null
      caption?: string | null
      alternativeText?: string | null
      name: string
    } | null
  } | null>
}

export type InbaReleasesStaticPathsQueryVariables = Exact<{ [key: string]: never }>

export type InbaReleasesStaticPathsQuery = {
  __typename?: 'Query'
  inbaReleases: Array<{ __typename?: 'InbaRelease'; documentId: string; slug: string } | null>
}

export type InbaReleasesRssFeedQueryVariables = Exact<{ [key: string]: never }>

export type InbaReleasesRssFeedQuery = {
  __typename?: 'Query'
  inbaReleases: Array<{
    __typename?: 'InbaRelease'
    perex?: string | null
    releaseDate: any
    documentId: string
    title: string
    slug: string
    coverImage?: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      width?: number | null
      height?: number | null
      caption?: string | null
      alternativeText?: string | null
      name: string
    } | null
  } | null>
}

export type HomepageLatestInbaReleaseQueryVariables = Exact<{ [key: string]: never }>

export type HomepageLatestInbaReleaseQuery = {
  __typename?: 'Query'
  inbaReleases: Array<{
    __typename?: 'InbaRelease'
    documentId: string
    coverImage?: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      width?: number | null
      height?: number | null
      caption?: string | null
      alternativeText?: string | null
      name: string
    } | null
    rearImage?: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      width?: number | null
      height?: number | null
      caption?: string | null
      alternativeText?: string | null
      name: string
    } | null
  } | null>
}

export type LatestInbaReleaseQueryVariables = Exact<{ [key: string]: never }>

export type LatestInbaReleaseQuery = {
  __typename?: 'Query'
  inbaReleases: Array<{
    __typename?: 'InbaRelease'
    perex?: string | null
    releaseDate: any
    documentId: string
    title: string
    slug: string
    rearImage?: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      width?: number | null
      height?: number | null
      caption?: string | null
      alternativeText?: string | null
      name: string
    } | null
    files?: Array<{
      __typename?: 'ComponentBlocksFile'
      id: string
      title?: string | null
      media?: {
        __typename?: 'UploadFile'
        documentId: string
        url: string
        name: string
        ext?: string | null
        size: number
        createdAt?: any | null
        updatedAt?: any | null
      } | null
    } | null> | null
    articles: Array<{
      __typename: 'Article'
      perex?: string | null
      addedAt: any
      documentId: string
      slug: string
      title: string
      locale?: string | null
      coverMedia?: {
        __typename?: 'UploadFile'
        documentId: string
        url: string
        width?: number | null
        height?: number | null
        caption?: string | null
        alternativeText?: string | null
        name: string
      } | null
      articleCategory?: {
        __typename?: 'ArticleCategory'
        documentId: string
        title: string
        slug: string
      } | null
      tags: Array<{
        __typename?: 'Tag'
        documentId: string
        title: string
        slug: string
        pageCategory?: {
          __typename?: 'PageCategory'
          documentId: string
          title?: string | null
          color?: Enum_Pagecategory_Color | null
        } | null
      } | null>
    } | null>
    featuredArticles: Array<{
      __typename: 'Article'
      perex?: string | null
      addedAt: any
      documentId: string
      slug: string
      title: string
      locale?: string | null
      coverMedia?: {
        __typename?: 'UploadFile'
        documentId: string
        url: string
        width?: number | null
        height?: number | null
        caption?: string | null
        alternativeText?: string | null
        name: string
      } | null
      articleCategory?: {
        __typename?: 'ArticleCategory'
        documentId: string
        title: string
        slug: string
      } | null
      tags: Array<{
        __typename?: 'Tag'
        documentId: string
        title: string
        slug: string
        pageCategory?: {
          __typename?: 'PageCategory'
          documentId: string
          title?: string | null
          color?: Enum_Pagecategory_Color | null
        } | null
      } | null>
    } | null>
    coverImage?: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      width?: number | null
      height?: number | null
      caption?: string | null
      alternativeText?: string | null
      name: string
    } | null
  } | null>
}

export type PageCategoryEntityFragment = {
  __typename?: 'PageCategory'
  documentId: string
  title?: string | null
  color?: Enum_Pagecategory_Color | null
}

export type PageCategoriesQueryVariables = Exact<{
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}>

export type PageCategoriesQuery = {
  __typename?: 'Query'
  pageCategories: Array<{
    __typename?: 'PageCategory'
    documentId: string
    title?: string | null
    color?: Enum_Pagecategory_Color | null
  } | null>
}

export type ParentPageFragment = {
  __typename?: 'Page'
  documentId: string
  slug?: string | null
  locale?: string | null
  title: string
}

export type PageParentPagesFragment = {
  __typename?: 'Page'
  documentId: string
  slug?: string | null
  locale?: string | null
  title: string
  parentPage?: {
    __typename?: 'Page'
    documentId: string
    slug?: string | null
    locale?: string | null
    title: string
    parentPage?: {
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      locale?: string | null
      title: string
      parentPage?: {
        __typename?: 'Page'
        documentId: string
        slug?: string | null
        locale?: string | null
        title: string
        parentPage?: {
          __typename?: 'Page'
          documentId: string
          slug?: string | null
          locale?: string | null
          title: string
        } | null
      } | null
    } | null
  } | null
}

export type PageSlugEntityFragment = {
  __typename?: 'Page'
  documentId: string
  slug?: string | null
  title: string
  locale?: string | null
}

export type PageCardEntityFragment = {
  __typename?: 'Page'
  documentId: string
  slug?: string | null
  title: string
  locale?: string | null
  pageBackgroundImage?: { __typename?: 'UploadFile'; documentId: string; url: string } | null
}

export type PageCardWithHeadersEntityFragment = {
  __typename?: 'Page'
  documentId: string
  slug?: string | null
  title: string
  locale?: string | null
  pageHeaderSections?: Array<
    | { __typename: 'ComponentHeaderSectionsEvent'; date?: any | null; address?: string | null }
    | {
        __typename: 'ComponentHeaderSectionsFacility'
        address?: string | null
        navigateToLink?: string | null
        media: Array<{
          __typename?: 'UploadFile'
          documentId: string
          url: string
          width?: number | null
          height?: number | null
          caption?: string | null
          alternativeText?: string | null
          name: string
        } | null>
      }
    | { __typename: 'Error' }
    | null
  > | null
  pageBackgroundImage?: { __typename?: 'UploadFile'; documentId: string; url: string } | null
}

export type PageEntityFragment = {
  __typename?: 'Page'
  alias?: string | null
  subtext?: string | null
  pageColor: Enum_Page_Pagecolor
  metaDiscription?: string | null
  keywords?: string | null
  showTableOfContents?: boolean | null
  documentId: string
  slug?: string | null
  title: string
  locale?: string | null
  adminGroups: Array<{
    __typename?: 'AdminGroup'
    contentManagedBy: string
    documentId: string
    slug: string
    title: string
    adminGroupId?: string | null
    landingPage?: {
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      title: string
      locale?: string | null
      localizations: Array<{
        __typename?: 'Page'
        documentId: string
        slug?: string | null
        title: string
        locale?: string | null
        childPages: Array<{
          __typename?: 'Page'
          documentId: string
          slug?: string | null
          title: string
          locale?: string | null
        } | null>
      } | null>
      childPages: Array<{
        __typename?: 'Page'
        documentId: string
        slug?: string | null
        title: string
        locale?: string | null
      } | null>
    } | null
    submenuPages?: Array<{
      __typename?: 'ComponentBlocksPageLink'
      url?: string | null
      analyticsId?: string | null
      label?: string | null
      page?: {
        __typename?: 'Page'
        documentId: string
        slug?: string | null
        title: string
        locale?: string | null
      } | null
    } | null> | null
  } | null>
  headerLinks?: Array<{
    __typename?: 'ComponentBlocksCommonLink'
    label?: string | null
    url?: string | null
    analyticsId?: string | null
    page?: {
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      title: string
      locale?: string | null
    } | null
    article?: {
      __typename: 'Article'
      documentId: string
      slug: string
      title: string
      locale?: string | null
    } | null
  } | null> | null
  pageHeaderSections?: Array<
    | { __typename: 'ComponentHeaderSectionsEvent'; date?: any | null; address?: string | null }
    | {
        __typename: 'ComponentHeaderSectionsFacility'
        address?: string | null
        navigateToLink?: string | null
        media: Array<{
          __typename?: 'UploadFile'
          documentId: string
          url: string
          width?: number | null
          height?: number | null
          caption?: string | null
          alternativeText?: string | null
          name: string
        } | null>
      }
    | { __typename: 'Error' }
    | null
  > | null
  subnavigation?: {
    __typename?: 'ComponentSectionsSubnavigation'
    links?: Array<{
      __typename?: 'ComponentBlocksSubnavigationLink'
      id: string
      label?: string | null
      subtext?: string | null
      url?: string | null
      analyticsId?: string | null
      page?: {
        __typename?: 'Page'
        documentId: string
        slug?: string | null
        title: string
        locale?: string | null
      } | null
    } | null> | null
  } | null
  sections?: Array<
    | {
        __typename: 'ComponentSectionsAccordion'
        title?: string | null
        titleLevelAccordionSection?: Enum_Componentsectionsaccordion_Titlelevel | null
        institutions?: Array<{
          __typename?: 'ComponentAccordionItemsInstitution'
          title?: string | null
          subtitle?: string | null
          category?: string | null
          firstColumn?: string | null
          secondColumn?: string | null
          thirdColumn?: string | null
          url?: string | null
          urlLabel?: string | null
        } | null> | null
        flatText?: Array<{
          __typename?: 'ComponentAccordionItemsFlatText'
          category?: string | null
          content?: string | null
          moreLinkTitle?: string | null
          moreLinkUrl?: string | null
          moreLinkPage?: {
            __typename?: 'Page'
            documentId: string
            slug?: string | null
            title: string
            locale?: string | null
          } | null
          fileList?: Array<{
            __typename?: 'ComponentBlocksFileItem'
            id: string
            title?: string | null
            media: {
              __typename?: 'UploadFile'
              documentId: string
              url: string
              name: string
              ext?: string | null
              size: number
              createdAt?: any | null
              updatedAt?: any | null
            }
          } | null> | null
        } | null> | null
      }
    | {
        __typename: 'ComponentSectionsAlert'
        title?: string | null
        alertText: string
        alertVariant: Enum_Componentsectionsalert_Alertvariant
      }
    | {
        __typename: 'ComponentSectionsArticles'
        title?: string | null
        text?: string | null
        showAll?: boolean | null
        articles: Array<{
          __typename: 'Article'
          perex?: string | null
          addedAt: any
          documentId: string
          slug: string
          title: string
          locale?: string | null
          coverMedia?: {
            __typename?: 'UploadFile'
            documentId: string
            url: string
            width?: number | null
            height?: number | null
            caption?: string | null
            alternativeText?: string | null
            name: string
          } | null
          articleCategory?: {
            __typename?: 'ArticleCategory'
            documentId: string
            title: string
            slug: string
          } | null
          tags: Array<{
            __typename?: 'Tag'
            documentId: string
            title: string
            slug: string
            pageCategory?: {
              __typename?: 'PageCategory'
              documentId: string
              title?: string | null
              color?: Enum_Pagecategory_Color | null
            } | null
          } | null>
        } | null>
        category?: {
          __typename?: 'PageCategory'
          documentId: string
          title?: string | null
          color?: Enum_Pagecategory_Color | null
        } | null
        articleCategories: Array<{
          __typename?: 'ArticleCategory'
          documentId: string
          title: string
          slug: string
        } | null>
        tags: Array<{
          __typename?: 'Tag'
          documentId: string
          title: string
          slug: string
          pageCategory?: {
            __typename?: 'PageCategory'
            documentId: string
            title?: string | null
            color?: Enum_Pagecategory_Color | null
          } | null
        } | null>
        adminGroups: Array<{
          __typename?: 'AdminGroup'
          documentId: string
          slug: string
          title: string
          adminGroupId?: string | null
        } | null>
        showMoreLink?: {
          __typename?: 'ComponentBlocksCommonLink'
          label?: string | null
          url?: string | null
          analyticsId?: string | null
          page?: {
            __typename?: 'Page'
            documentId: string
            slug?: string | null
            title: string
            locale?: string | null
          } | null
          article?: {
            __typename: 'Article'
            documentId: string
            slug: string
            title: string
            locale?: string | null
          } | null
        } | null
      }
    | {
        __typename: 'ComponentSectionsArticlesLandingPage'
        leftArticle?: {
          __typename: 'Article'
          perex?: string | null
          addedAt: any
          documentId: string
          slug: string
          title: string
          locale?: string | null
          coverMedia?: {
            __typename?: 'UploadFile'
            documentId: string
            url: string
            width?: number | null
            height?: number | null
            caption?: string | null
            alternativeText?: string | null
            name: string
          } | null
          articleCategory?: {
            __typename?: 'ArticleCategory'
            documentId: string
            title: string
            slug: string
          } | null
          tags: Array<{
            __typename?: 'Tag'
            documentId: string
            title: string
            slug: string
            pageCategory?: {
              __typename?: 'PageCategory'
              documentId: string
              title?: string | null
              color?: Enum_Pagecategory_Color | null
            } | null
          } | null>
        } | null
        newsPageLink?: {
          __typename?: 'ComponentBlocksCommonLink'
          label?: string | null
          url?: string | null
          analyticsId?: string | null
          page?: {
            __typename?: 'Page'
            documentId: string
            slug?: string | null
            title: string
            locale?: string | null
          } | null
          article?: {
            __typename: 'Article'
            documentId: string
            slug: string
            title: string
            locale?: string | null
          } | null
        } | null
      }
    | { __typename: 'ComponentSectionsAssets' }
    | {
        __typename: 'ComponentSectionsBanner'
        content?: string | null
        contentPosition: Enum_Componentsectionsbanner_Contentposition
        bannerTitle: string
        bannerVariant: Enum_Componentsectionsbanner_Variant
        media: { __typename?: 'UploadFile'; url: string }
        primaryLink?: {
          __typename?: 'ComponentBlocksCommonLink'
          label?: string | null
          url?: string | null
          analyticsId?: string | null
          page?: {
            __typename?: 'Page'
            documentId: string
            slug?: string | null
            title: string
            locale?: string | null
          } | null
          article?: {
            __typename: 'Article'
            documentId: string
            slug: string
            title: string
            locale?: string | null
          } | null
        } | null
        secondaryLink?: {
          __typename?: 'ComponentBlocksCommonLink'
          label?: string | null
          url?: string | null
          analyticsId?: string | null
          page?: {
            __typename?: 'Page'
            documentId: string
            slug?: string | null
            title: string
            locale?: string | null
          } | null
          article?: {
            __typename: 'Article'
            documentId: string
            slug: string
            title: string
            locale?: string | null
          } | null
        } | null
        tertiaryLink?: {
          __typename?: 'ComponentBlocksCommonLink'
          label?: string | null
          url?: string | null
          analyticsId?: string | null
          page?: {
            __typename?: 'Page'
            documentId: string
            slug?: string | null
            title: string
            locale?: string | null
          } | null
          article?: {
            __typename: 'Article'
            documentId: string
            slug: string
            title: string
            locale?: string | null
          } | null
        } | null
      }
    | {
        __typename: 'ComponentSectionsColumnedText'
        title?: string | null
        content?: string | null
      }
    | {
        __typename: 'ComponentSectionsColumns'
        title?: string | null
        text?: string | null
        imageVariant: Enum_Componentsectionscolumns_Imagevariant
        responsiveLayout: Enum_Componentsectionscolumns_Responsivelayout
        columns: Array<{
          __typename?: 'ComponentBlocksColumnsItem'
          title?: string | null
          text?: string | null
          image?: {
            __typename?: 'UploadFile'
            documentId: string
            url: string
            width?: number | null
            height?: number | null
            caption?: string | null
            alternativeText?: string | null
            name: string
          } | null
        } | null>
      }
    | {
        __typename: 'ComponentSectionsColumnsList'
        title?: string | null
        text?: string | null
        leftColumn?: Array<{
          __typename?: 'ComponentBlocksColumnsListItem'
          content?: string | null
          icon?: {
            __typename?: 'UploadFile'
            documentId: string
            url: string
            width?: number | null
            height?: number | null
            caption?: string | null
            alternativeText?: string | null
            name: string
          } | null
        } | null> | null
        rightColumn?: Array<{
          __typename?: 'ComponentBlocksColumnsListItem'
          content?: string | null
          icon?: {
            __typename?: 'UploadFile'
            documentId: string
            url: string
            width?: number | null
            height?: number | null
            caption?: string | null
            alternativeText?: string | null
            name: string
          } | null
        } | null> | null
      }
    | {
        __typename: 'ComponentSectionsComparisonSection'
        title?: string | null
        text?: string | null
        textAlignComparison: Enum_Componentsectionscomparisonsection_Textalign
        cards: Array<{
          __typename?: 'ComponentBlocksComparisonCard'
          title: string
          items: Array<{ __typename?: 'ComponentBlocksComparisonItem'; label: string } | null>
          iconMedia?: { __typename?: 'UploadFile'; url: string } | null
        } | null>
      }
    | {
        __typename: 'ComponentSectionsContactsSection'
        id: string
        title?: string | null
        description?: string | null
        titleLevelContactsSection?: Enum_Componentsectionscontactssection_Titlelevel | null
        addressContacts?: Array<{
          __typename?: 'ComponentBlocksContactCard'
          overrideLabel?: string | null
          value: string
        } | null> | null
        openingHoursContacts?: Array<{
          __typename?: 'ComponentBlocksContactCard'
          overrideLabel?: string | null
          value: string
        } | null> | null
        emailContacts?: Array<{
          __typename?: 'ComponentBlocksContactCard'
          overrideLabel?: string | null
          value: string
        } | null> | null
        phoneContacts?: Array<{
          __typename?: 'ComponentBlocksContactCard'
          overrideLabel?: string | null
          value: string
        } | null> | null
        webContacts?: Array<{
          __typename?: 'ComponentBlocksContactCard'
          overrideLabel?: string | null
          value: string
        } | null> | null
        postalAddressContacts?: Array<{
          __typename?: 'ComponentBlocksContactCard'
          overrideLabel?: string | null
          value: string
        } | null> | null
        billingInfoContacts?: Array<{
          __typename?: 'ComponentBlocksContactCard'
          overrideLabel?: string | null
          value: string
        } | null> | null
        bankConnectionContacts?: Array<{
          __typename?: 'ComponentBlocksContactCard'
          overrideLabel?: string | null
          value: string
        } | null> | null
        personContacts?: Array<{
          __typename?: 'ComponentBlocksContactPersonCard'
          title: string
          subtext?: string | null
          email?: string | null
          phone?: string | null
        } | null> | null
        directionsContact?: {
          __typename?: 'ComponentBlocksContactDirectionsCard'
          overrideLabel?: string | null
          address: string
          parkingInfo?: string | null
          publicTransportInfo?: string | null
          barrierFreeInfo?: string | null
          iframeUrl?: string | null
        } | null
      }
    | { __typename: 'ComponentSectionsDivider'; style?: Enum_Componentsectionsdivider_Style | null }
    | {
        __typename: 'ComponentSectionsDocuments'
        title?: string | null
        text?: string | null
        showAll?: boolean | null
        titleLevelDocumentsSection?: Enum_Componentsectionsdocuments_Titlelevel | null
        documents: Array<{
          __typename: 'Document'
          publishedAt?: any | null
          updatedAt?: any | null
          description?: string | null
          documentId: string
          slug: string
          title: string
          documentCategory?: {
            __typename?: 'DocumentCategory'
            documentId: string
            title: string
            slug: string
          } | null
          files: Array<{
            __typename?: 'UploadFile'
            documentId: string
            url: string
            name: string
            ext?: string | null
            size: number
            createdAt?: any | null
            updatedAt?: any | null
          } | null>
        } | null>
      }
    | {
        __typename: 'ComponentSectionsEvents'
        title?: string | null
        text?: string | null
        titleLevelEventsSection?: Enum_Componentsectionsevents_Titlelevel | null
        eventPages: Array<{
          __typename?: 'Page'
          documentId: string
          slug?: string | null
          title: string
          locale?: string | null
          pageHeaderSections?: Array<
            | {
                __typename: 'ComponentHeaderSectionsEvent'
                date?: any | null
                address?: string | null
              }
            | {
                __typename: 'ComponentHeaderSectionsFacility'
                address?: string | null
                navigateToLink?: string | null
                media: Array<{
                  __typename?: 'UploadFile'
                  documentId: string
                  url: string
                  width?: number | null
                  height?: number | null
                  caption?: string | null
                  alternativeText?: string | null
                  name: string
                } | null>
              }
            | { __typename: 'Error' }
            | null
          > | null
          pageBackgroundImage?: {
            __typename?: 'UploadFile'
            documentId: string
            url: string
          } | null
        } | null>
      }
    | {
        __typename: 'ComponentSectionsFacilities'
        title?: string | null
        text?: string | null
        titleLevelFacilitiesSection?: Enum_Componentsectionsfacilities_Titlelevel | null
        facilityPages: Array<{
          __typename?: 'Page'
          documentId: string
          slug?: string | null
          title: string
          locale?: string | null
          pageHeaderSections?: Array<
            | {
                __typename: 'ComponentHeaderSectionsEvent'
                date?: any | null
                address?: string | null
              }
            | {
                __typename: 'ComponentHeaderSectionsFacility'
                address?: string | null
                navigateToLink?: string | null
                media: Array<{
                  __typename?: 'UploadFile'
                  documentId: string
                  url: string
                  width?: number | null
                  height?: number | null
                  caption?: string | null
                  alternativeText?: string | null
                  name: string
                } | null>
              }
            | { __typename: 'Error' }
            | null
          > | null
          pageBackgroundImage?: {
            __typename?: 'UploadFile'
            documentId: string
            url: string
          } | null
        } | null>
      }
    | {
        __typename: 'ComponentSectionsFaqCategories'
        id: string
        title?: string | null
        text?: string | null
        faqCategories: Array<{
          __typename?: 'FaqCategory'
          documentId: string
          title: string
          slug: string
          faqs: Array<{
            __typename?: 'Faq'
            documentId: string
            title: string
            body?: string | null
          } | null>
        } | null>
      }
    | {
        __typename: 'ComponentSectionsFaqs'
        title?: string | null
        text?: string | null
        titleLevelFaqsSection?: Enum_Componentsectionsfaqs_Titlelevel | null
        faqs: Array<{
          __typename?: 'Faq'
          documentId: string
          title: string
          body?: string | null
        } | null>
      }
    | {
        __typename: 'ComponentSectionsFileList'
        title?: string | null
        text?: string | null
        titleLevelFileListSection?: Enum_Componentsectionsfilelist_Titlelevel | null
        fileList?: Array<{
          __typename?: 'ComponentBlocksFile'
          id: string
          title?: string | null
          media?: {
            __typename?: 'UploadFile'
            documentId: string
            url: string
            name: string
            ext?: string | null
            size: number
            createdAt?: any | null
            updatedAt?: any | null
          } | null
        } | null> | null
      }
    | {
        __typename: 'ComponentSectionsGallery'
        title?: string | null
        text?: string | null
        titleLevelGallerySection?: Enum_Componentsectionsgallery_Titlelevel | null
        medias: Array<{
          __typename?: 'UploadFile'
          documentId: string
          url: string
          width?: number | null
          height?: number | null
          caption?: string | null
          alternativeText?: string | null
          name: string
        } | null>
      }
    | {
        __typename: 'ComponentSectionsIframe'
        title?: string | null
        text?: string | null
        url: string
        iframeTitle?: string | null
        iframeHeight: string
        hasBorder?: boolean | null
        allowGeolocation?: boolean | null
        titleLevelIframeSection?: Enum_Componentsectionsiframe_Titlelevel | null
      }
    | { __typename: 'ComponentSectionsInbaLatestRelease' }
    | {
        __typename: 'ComponentSectionsInbaReleases'
        title?: string | null
        text?: string | null
        variantInbaReleasesSection?: Enum_Componentsectionsinbareleases_Variant | null
        showMoreLink?: {
          __typename?: 'ComponentBlocksCommonLink'
          label?: string | null
          url?: string | null
          analyticsId?: string | null
          page?: {
            __typename?: 'Page'
            documentId: string
            slug?: string | null
            title: string
            locale?: string | null
          } | null
          article?: {
            __typename: 'Article'
            documentId: string
            slug: string
            title: string
            locale?: string | null
          } | null
        } | null
      }
    | {
        __typename: 'ComponentSectionsJobOfferList'
        title?: string | null
        text?: string | null
        titleLevel?: Enum_Componentsectionsjobofferlist_Titlelevel | null
      }
    | {
        __typename: 'ComponentSectionsLinks'
        title?: string | null
        titleLevelLinksSection?: Enum_Componentsectionslinks_Titlelevel | null
        pageLinks?: Array<{
          __typename?: 'ComponentBlocksPageLink'
          url?: string | null
          analyticsId?: string | null
          label?: string | null
          page?: {
            __typename?: 'Page'
            documentId: string
            slug?: string | null
            title: string
            locale?: string | null
          } | null
        } | null> | null
      }
    | {
        __typename: 'ComponentSectionsNarrowText'
        content?: string | null
        width?: Enum_Componentsectionsnarrowtext_Width | null
      }
    | {
        __typename: 'ComponentSectionsNewsletter'
        title?: string | null
        text?: string | null
        newsletterType: Enum_Componentsectionsnewsletter_Newslettertype
        socialLinksTitle?: string | null
        facebookUrl?: string | null
        instagramUrl?: string | null
      }
    | {
        __typename: 'ComponentSectionsNumbersOverview'
        title?: string | null
        text?: string | null
        showMoreLink?: {
          __typename?: 'ComponentBlocksCommonLink'
          label?: string | null
          url?: string | null
          analyticsId?: string | null
          page?: {
            __typename?: 'Page'
            documentId: string
            slug?: string | null
            title: string
            locale?: string | null
          } | null
          article?: {
            __typename: 'Article'
            documentId: string
            slug: string
            title: string
            locale?: string | null
          } | null
        } | null
        numbersOverviewItems?: Array<{
          __typename?: 'ComponentBlocksNumbersOverviewItem'
          id: string
          number: string
          text: string
        } | null> | null
      }
    | {
        __typename: 'ComponentSectionsNumericalList'
        id: string
        title?: string | null
        text?: string | null
        variant: Enum_Componentsectionsnumericallist_Variant
        items?: Array<{
          __typename?: 'ComponentBlocksNumericalListItem'
          text?: string | null
        } | null> | null
      }
    | { __typename: 'ComponentSectionsOfficialBoard' }
    | {
        __typename: 'ComponentSectionsOpeningHours'
        title?: string | null
        text?: string | null
        titleLevelOpeningHoursSection?: Enum_Componentsectionsopeninghours_Titlelevel | null
        openingHoursItems?: Array<{
          __typename?: 'ComponentBlocksOpeningHoursItem'
          label: string
          value: string
        } | null> | null
        alertMessage?: {
          __typename?: 'ComponentBlocksOpeningHoursAlertMessage'
          text?: string | null
        } | null
      }
    | { __typename: 'ComponentSectionsOrganizationalStructure'; title?: string | null }
    | {
        __typename: 'ComponentSectionsPartners'
        title?: string | null
        text?: string | null
        logoRatio: Enum_Componentsectionspartners_Logoratio
        titleLevelPartnersSection?: Enum_Componentsectionspartners_Titlelevel | null
        partners: Array<{
          __typename?: 'ComponentBlocksPartner'
          title: string
          url?: string | null
          logo: {
            __typename?: 'UploadFile'
            documentId: string
            url: string
            width?: number | null
            height?: number | null
            caption?: string | null
            alternativeText?: string | null
            name: string
          }
        } | null>
      }
    | {
        __typename: 'ComponentSectionsProsAndConsSection'
        title?: string | null
        text?: string | null
        textAlignProsAndCons: Enum_Componentsectionsprosandconssection_Textalign
        pros: {
          __typename?: 'ComponentBlocksProsAndConsCard'
          title: string
          items: Array<{ __typename?: 'ComponentBlocksComparisonItem'; label: string } | null>
        }
        cons: {
          __typename?: 'ComponentBlocksProsAndConsCard'
          title: string
          items: Array<{ __typename?: 'ComponentBlocksComparisonItem'; label: string } | null>
        }
      }
    | {
        __typename: 'ComponentSectionsRegulations'
        showAll?: boolean | null
        regulations: Array<{
          __typename?: 'Regulation'
          documentId: string
          regNumber: string
          slug: string
          titleText?: string | null
          fullTitle: string
          effectiveFrom: any
          category: Enum_Regulation_Category
          isFullTextRegulation: boolean
          mainDocument: {
            __typename?: 'UploadFile'
            documentId: string
            url: string
            name: string
            ext?: string | null
            size: number
            createdAt?: any | null
            updatedAt?: any | null
          }
          attachments: Array<{
            __typename?: 'UploadFile'
            documentId: string
            url: string
            name: string
            ext?: string | null
            size: number
            createdAt?: any | null
            updatedAt?: any | null
          } | null>
          amendments: Array<{
            __typename?: 'Regulation'
            documentId: string
            regNumber: string
            slug: string
            effectiveFrom: any
            isFullTextRegulation: boolean
            attachments: Array<{
              __typename?: 'UploadFile'
              documentId: string
              url: string
              name: string
              ext?: string | null
              size: number
              createdAt?: any | null
              updatedAt?: any | null
            } | null>
          } | null>
          amending: Array<{
            __typename?: 'Regulation'
            documentId: string
            regNumber: string
            slug: string
            effectiveFrom: any
            cancellation?: {
              __typename?: 'Regulation'
              documentId: string
              regNumber: string
              slug: string
              effectiveFrom: any
            } | null
            amending: Array<{
              __typename?: 'Regulation'
              documentId: string
              regNumber: string
              slug: string
              cancellation?: {
                __typename?: 'Regulation'
                documentId: string
                regNumber: string
                slug: string
                effectiveFrom: any
              } | null
            } | null>
          } | null>
          cancellation?: {
            __typename?: 'Regulation'
            documentId: string
            regNumber: string
            slug: string
            effectiveFrom: any
          } | null
          cancelling: Array<{
            __typename?: 'Regulation'
            documentId: string
            regNumber: string
            slug: string
            effectiveFrom: any
          } | null>
        } | null>
      }
    | {
        __typename: 'ComponentSectionsStarzLandingPage'
        banner: {
          __typename?: 'ComponentBlocksStarzLandingPageBanner'
          title: string
          content?: string | null
          contentPosition: Enum_Componentblocksstarzlandingpagebanner_Contentposition
          variant: Enum_Componentblocksstarzlandingpagebanner_Variant
          media: {
            __typename?: 'UploadFile'
            documentId: string
            url: string
            width?: number | null
            height?: number | null
            caption?: string | null
            alternativeText?: string | null
            name: string
          }
          primaryLink?: {
            __typename?: 'ComponentBlocksCommonLink'
            label?: string | null
            url?: string | null
            analyticsId?: string | null
            page?: {
              __typename?: 'Page'
              documentId: string
              slug?: string | null
              title: string
              locale?: string | null
            } | null
            article?: {
              __typename: 'Article'
              documentId: string
              slug: string
              title: string
              locale?: string | null
            } | null
          } | null
          secondaryLink?: {
            __typename?: 'ComponentBlocksCommonLink'
            label?: string | null
            url?: string | null
            analyticsId?: string | null
            page?: {
              __typename?: 'Page'
              documentId: string
              slug?: string | null
              title: string
              locale?: string | null
            } | null
            article?: {
              __typename: 'Article'
              documentId: string
              slug: string
              title: string
              locale?: string | null
            } | null
          } | null
          tertiaryLink?: {
            __typename?: 'ComponentBlocksCommonLink'
            label?: string | null
            url?: string | null
            analyticsId?: string | null
            page?: {
              __typename?: 'Page'
              documentId: string
              slug?: string | null
              title: string
              locale?: string | null
            } | null
            article?: {
              __typename: 'Article'
              documentId: string
              slug: string
              title: string
              locale?: string | null
            } | null
          } | null
        }
        cardLinks?: Array<{
          __typename?: 'ComponentBlocksCardLink'
          label?: string | null
          subtext?: string | null
          url?: string | null
          analyticsId?: string | null
          media?: {
            __typename?: 'UploadFile'
            documentId: string
            url: string
            width?: number | null
            height?: number | null
            caption?: string | null
            alternativeText?: string | null
            name: string
          } | null
          page?: {
            __typename?: 'Page'
            documentId: string
            slug?: string | null
            title: string
            locale?: string | null
            pageBackgroundImage?: {
              __typename?: 'UploadFile'
              documentId: string
              url: string
            } | null
          } | null
          article?: {
            __typename: 'Article'
            perex?: string | null
            addedAt: any
            documentId: string
            slug: string
            title: string
            locale?: string | null
            coverMedia?: {
              __typename?: 'UploadFile'
              documentId: string
              url: string
              width?: number | null
              height?: number | null
              caption?: string | null
              alternativeText?: string | null
              name: string
            } | null
            articleCategory?: {
              __typename?: 'ArticleCategory'
              documentId: string
              title: string
              slug: string
            } | null
            tags: Array<{
              __typename?: 'Tag'
              documentId: string
              title: string
              slug: string
              pageCategory?: {
                __typename?: 'PageCategory'
                documentId: string
                title?: string | null
                color?: Enum_Pagecategory_Color | null
              } | null
            } | null>
          } | null
        } | null> | null
      }
    | {
        __typename: 'ComponentSectionsTextWithImage'
        content?: string | null
        imagePosition: Enum_Componentsectionstextwithimage_Imageposition
        imageAspectRatio?: Enum_Componentsectionstextwithimage_Imageaspectratio | null
        imageSrc: {
          __typename?: 'UploadFile'
          documentId: string
          url: string
          width?: number | null
          height?: number | null
          caption?: string | null
          alternativeText?: string | null
          name: string
        }
        links?: Array<{
          __typename?: 'ComponentBlocksCommonLink'
          label?: string | null
          url?: string | null
          analyticsId?: string | null
          page?: {
            __typename?: 'Page'
            documentId: string
            slug?: string | null
            title: string
            locale?: string | null
          } | null
          article?: {
            __typename: 'Article'
            documentId: string
            slug: string
            title: string
            locale?: string | null
          } | null
        } | null> | null
      }
    | {
        __typename: 'ComponentSectionsTextWithImageOverlapped'
        content?: string | null
        imagePositionTextWithImageOverlapped: Enum_Componentsectionstextwithimageoverlapped_Imageposition
        image: {
          __typename?: 'UploadFile'
          documentId: string
          url: string
          width?: number | null
          height?: number | null
          caption?: string | null
          alternativeText?: string | null
          name: string
        }
        links?: Array<{
          __typename?: 'ComponentBlocksCommonLink'
          label?: string | null
          url?: string | null
          analyticsId?: string | null
          page?: {
            __typename?: 'Page'
            documentId: string
            slug?: string | null
            title: string
            locale?: string | null
          } | null
          article?: {
            __typename: 'Article'
            documentId: string
            slug: string
            title: string
            locale?: string | null
          } | null
        } | null> | null
      }
    | {
        __typename: 'ComponentSectionsTootootEvents'
        title?: string | null
        text?: string | null
        showMoreLink?: {
          __typename?: 'ComponentBlocksCommonLink'
          label?: string | null
          url?: string | null
          analyticsId?: string | null
          page?: {
            __typename?: 'Page'
            documentId: string
            slug?: string | null
            title: string
            locale?: string | null
          } | null
          article?: {
            __typename: 'Article'
            documentId: string
            slug: string
            title: string
            locale?: string | null
          } | null
        } | null
      }
    | {
        __typename: 'ComponentSectionsVideos'
        id: string
        title?: string | null
        subtitle?: string | null
        titleLevelVideosSection?: Enum_Componentsectionsvideos_Titlelevel | null
        videos?: Array<{
          __typename?: 'ComponentBlocksVideo'
          id: string
          title?: string | null
          speaker?: string | null
          url: string
        } | null> | null
      }
    | { __typename: 'Error' }
    | null
  > | null
  sidebar?: Array<
    { __typename: 'ComponentSidebarsEmptySidebar' } | { __typename?: 'Error' } | null
  > | null
  localizations: Array<{ __typename?: 'Page'; slug?: string | null; locale?: string | null } | null>
  relatedContents: Array<{
    __typename?: 'Tag'
    documentId: string
    title: string
    slug: string
    pageCategory?: {
      __typename?: 'PageCategory'
      documentId: string
      title?: string | null
      color?: Enum_Pagecategory_Color | null
    } | null
  } | null>
  pageBackgroundImage?: { __typename?: 'UploadFile'; documentId: string; url: string } | null
  parentPage?: {
    __typename?: 'Page'
    documentId: string
    slug?: string | null
    locale?: string | null
    title: string
    parentPage?: {
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      locale?: string | null
      title: string
      parentPage?: {
        __typename?: 'Page'
        documentId: string
        slug?: string | null
        locale?: string | null
        title: string
        parentPage?: {
          __typename?: 'Page'
          documentId: string
          slug?: string | null
          locale?: string | null
          title: string
        } | null
      } | null
    } | null
  } | null
}

export type PagesStaticPathsQueryVariables = Exact<{ [key: string]: never }>

export type PagesStaticPathsQuery = {
  __typename?: 'Query'
  pages: Array<{ __typename?: 'Page'; documentId: string; slug?: string | null } | null>
}

export type PageBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input']
  locale: Scalars['I18NLocaleCode']['input']
}>

export type PageBySlugQuery = {
  __typename?: 'Query'
  pages: Array<{
    __typename?: 'Page'
    alias?: string | null
    subtext?: string | null
    pageColor: Enum_Page_Pagecolor
    metaDiscription?: string | null
    keywords?: string | null
    showTableOfContents?: boolean | null
    documentId: string
    slug?: string | null
    title: string
    locale?: string | null
    adminGroups: Array<{
      __typename?: 'AdminGroup'
      contentManagedBy: string
      documentId: string
      slug: string
      title: string
      adminGroupId?: string | null
      landingPage?: {
        __typename?: 'Page'
        documentId: string
        slug?: string | null
        title: string
        locale?: string | null
        localizations: Array<{
          __typename?: 'Page'
          documentId: string
          slug?: string | null
          title: string
          locale?: string | null
          childPages: Array<{
            __typename?: 'Page'
            documentId: string
            slug?: string | null
            title: string
            locale?: string | null
          } | null>
        } | null>
        childPages: Array<{
          __typename?: 'Page'
          documentId: string
          slug?: string | null
          title: string
          locale?: string | null
        } | null>
      } | null
      submenuPages?: Array<{
        __typename?: 'ComponentBlocksPageLink'
        url?: string | null
        analyticsId?: string | null
        label?: string | null
        page?: {
          __typename?: 'Page'
          documentId: string
          slug?: string | null
          title: string
          locale?: string | null
        } | null
      } | null> | null
    } | null>
    headerLinks?: Array<{
      __typename?: 'ComponentBlocksCommonLink'
      label?: string | null
      url?: string | null
      analyticsId?: string | null
      page?: {
        __typename?: 'Page'
        documentId: string
        slug?: string | null
        title: string
        locale?: string | null
      } | null
      article?: {
        __typename: 'Article'
        documentId: string
        slug: string
        title: string
        locale?: string | null
      } | null
    } | null> | null
    pageHeaderSections?: Array<
      | { __typename: 'ComponentHeaderSectionsEvent'; date?: any | null; address?: string | null }
      | {
          __typename: 'ComponentHeaderSectionsFacility'
          address?: string | null
          navigateToLink?: string | null
          media: Array<{
            __typename?: 'UploadFile'
            documentId: string
            url: string
            width?: number | null
            height?: number | null
            caption?: string | null
            alternativeText?: string | null
            name: string
          } | null>
        }
      | { __typename: 'Error' }
      | null
    > | null
    subnavigation?: {
      __typename?: 'ComponentSectionsSubnavigation'
      links?: Array<{
        __typename?: 'ComponentBlocksSubnavigationLink'
        id: string
        label?: string | null
        subtext?: string | null
        url?: string | null
        analyticsId?: string | null
        page?: {
          __typename?: 'Page'
          documentId: string
          slug?: string | null
          title: string
          locale?: string | null
        } | null
      } | null> | null
    } | null
    sections?: Array<
      | {
          __typename: 'ComponentSectionsAccordion'
          title?: string | null
          titleLevelAccordionSection?: Enum_Componentsectionsaccordion_Titlelevel | null
          institutions?: Array<{
            __typename?: 'ComponentAccordionItemsInstitution'
            title?: string | null
            subtitle?: string | null
            category?: string | null
            firstColumn?: string | null
            secondColumn?: string | null
            thirdColumn?: string | null
            url?: string | null
            urlLabel?: string | null
          } | null> | null
          flatText?: Array<{
            __typename?: 'ComponentAccordionItemsFlatText'
            category?: string | null
            content?: string | null
            moreLinkTitle?: string | null
            moreLinkUrl?: string | null
            moreLinkPage?: {
              __typename?: 'Page'
              documentId: string
              slug?: string | null
              title: string
              locale?: string | null
            } | null
            fileList?: Array<{
              __typename?: 'ComponentBlocksFileItem'
              id: string
              title?: string | null
              media: {
                __typename?: 'UploadFile'
                documentId: string
                url: string
                name: string
                ext?: string | null
                size: number
                createdAt?: any | null
                updatedAt?: any | null
              }
            } | null> | null
          } | null> | null
        }
      | {
          __typename: 'ComponentSectionsAlert'
          title?: string | null
          alertText: string
          alertVariant: Enum_Componentsectionsalert_Alertvariant
        }
      | {
          __typename: 'ComponentSectionsArticles'
          title?: string | null
          text?: string | null
          showAll?: boolean | null
          articles: Array<{
            __typename: 'Article'
            perex?: string | null
            addedAt: any
            documentId: string
            slug: string
            title: string
            locale?: string | null
            coverMedia?: {
              __typename?: 'UploadFile'
              documentId: string
              url: string
              width?: number | null
              height?: number | null
              caption?: string | null
              alternativeText?: string | null
              name: string
            } | null
            articleCategory?: {
              __typename?: 'ArticleCategory'
              documentId: string
              title: string
              slug: string
            } | null
            tags: Array<{
              __typename?: 'Tag'
              documentId: string
              title: string
              slug: string
              pageCategory?: {
                __typename?: 'PageCategory'
                documentId: string
                title?: string | null
                color?: Enum_Pagecategory_Color | null
              } | null
            } | null>
          } | null>
          category?: {
            __typename?: 'PageCategory'
            documentId: string
            title?: string | null
            color?: Enum_Pagecategory_Color | null
          } | null
          articleCategories: Array<{
            __typename?: 'ArticleCategory'
            documentId: string
            title: string
            slug: string
          } | null>
          tags: Array<{
            __typename?: 'Tag'
            documentId: string
            title: string
            slug: string
            pageCategory?: {
              __typename?: 'PageCategory'
              documentId: string
              title?: string | null
              color?: Enum_Pagecategory_Color | null
            } | null
          } | null>
          adminGroups: Array<{
            __typename?: 'AdminGroup'
            documentId: string
            slug: string
            title: string
            adminGroupId?: string | null
          } | null>
          showMoreLink?: {
            __typename?: 'ComponentBlocksCommonLink'
            label?: string | null
            url?: string | null
            analyticsId?: string | null
            page?: {
              __typename?: 'Page'
              documentId: string
              slug?: string | null
              title: string
              locale?: string | null
            } | null
            article?: {
              __typename: 'Article'
              documentId: string
              slug: string
              title: string
              locale?: string | null
            } | null
          } | null
        }
      | {
          __typename: 'ComponentSectionsArticlesLandingPage'
          leftArticle?: {
            __typename: 'Article'
            perex?: string | null
            addedAt: any
            documentId: string
            slug: string
            title: string
            locale?: string | null
            coverMedia?: {
              __typename?: 'UploadFile'
              documentId: string
              url: string
              width?: number | null
              height?: number | null
              caption?: string | null
              alternativeText?: string | null
              name: string
            } | null
            articleCategory?: {
              __typename?: 'ArticleCategory'
              documentId: string
              title: string
              slug: string
            } | null
            tags: Array<{
              __typename?: 'Tag'
              documentId: string
              title: string
              slug: string
              pageCategory?: {
                __typename?: 'PageCategory'
                documentId: string
                title?: string | null
                color?: Enum_Pagecategory_Color | null
              } | null
            } | null>
          } | null
          newsPageLink?: {
            __typename?: 'ComponentBlocksCommonLink'
            label?: string | null
            url?: string | null
            analyticsId?: string | null
            page?: {
              __typename?: 'Page'
              documentId: string
              slug?: string | null
              title: string
              locale?: string | null
            } | null
            article?: {
              __typename: 'Article'
              documentId: string
              slug: string
              title: string
              locale?: string | null
            } | null
          } | null
        }
      | { __typename: 'ComponentSectionsAssets' }
      | {
          __typename: 'ComponentSectionsBanner'
          content?: string | null
          contentPosition: Enum_Componentsectionsbanner_Contentposition
          bannerTitle: string
          bannerVariant: Enum_Componentsectionsbanner_Variant
          media: { __typename?: 'UploadFile'; url: string }
          primaryLink?: {
            __typename?: 'ComponentBlocksCommonLink'
            label?: string | null
            url?: string | null
            analyticsId?: string | null
            page?: {
              __typename?: 'Page'
              documentId: string
              slug?: string | null
              title: string
              locale?: string | null
            } | null
            article?: {
              __typename: 'Article'
              documentId: string
              slug: string
              title: string
              locale?: string | null
            } | null
          } | null
          secondaryLink?: {
            __typename?: 'ComponentBlocksCommonLink'
            label?: string | null
            url?: string | null
            analyticsId?: string | null
            page?: {
              __typename?: 'Page'
              documentId: string
              slug?: string | null
              title: string
              locale?: string | null
            } | null
            article?: {
              __typename: 'Article'
              documentId: string
              slug: string
              title: string
              locale?: string | null
            } | null
          } | null
          tertiaryLink?: {
            __typename?: 'ComponentBlocksCommonLink'
            label?: string | null
            url?: string | null
            analyticsId?: string | null
            page?: {
              __typename?: 'Page'
              documentId: string
              slug?: string | null
              title: string
              locale?: string | null
            } | null
            article?: {
              __typename: 'Article'
              documentId: string
              slug: string
              title: string
              locale?: string | null
            } | null
          } | null
        }
      | {
          __typename: 'ComponentSectionsColumnedText'
          title?: string | null
          content?: string | null
        }
      | {
          __typename: 'ComponentSectionsColumns'
          title?: string | null
          text?: string | null
          imageVariant: Enum_Componentsectionscolumns_Imagevariant
          responsiveLayout: Enum_Componentsectionscolumns_Responsivelayout
          columns: Array<{
            __typename?: 'ComponentBlocksColumnsItem'
            title?: string | null
            text?: string | null
            image?: {
              __typename?: 'UploadFile'
              documentId: string
              url: string
              width?: number | null
              height?: number | null
              caption?: string | null
              alternativeText?: string | null
              name: string
            } | null
          } | null>
        }
      | {
          __typename: 'ComponentSectionsColumnsList'
          title?: string | null
          text?: string | null
          leftColumn?: Array<{
            __typename?: 'ComponentBlocksColumnsListItem'
            content?: string | null
            icon?: {
              __typename?: 'UploadFile'
              documentId: string
              url: string
              width?: number | null
              height?: number | null
              caption?: string | null
              alternativeText?: string | null
              name: string
            } | null
          } | null> | null
          rightColumn?: Array<{
            __typename?: 'ComponentBlocksColumnsListItem'
            content?: string | null
            icon?: {
              __typename?: 'UploadFile'
              documentId: string
              url: string
              width?: number | null
              height?: number | null
              caption?: string | null
              alternativeText?: string | null
              name: string
            } | null
          } | null> | null
        }
      | {
          __typename: 'ComponentSectionsComparisonSection'
          title?: string | null
          text?: string | null
          textAlignComparison: Enum_Componentsectionscomparisonsection_Textalign
          cards: Array<{
            __typename?: 'ComponentBlocksComparisonCard'
            title: string
            items: Array<{ __typename?: 'ComponentBlocksComparisonItem'; label: string } | null>
            iconMedia?: { __typename?: 'UploadFile'; url: string } | null
          } | null>
        }
      | {
          __typename: 'ComponentSectionsContactsSection'
          id: string
          title?: string | null
          description?: string | null
          titleLevelContactsSection?: Enum_Componentsectionscontactssection_Titlelevel | null
          addressContacts?: Array<{
            __typename?: 'ComponentBlocksContactCard'
            overrideLabel?: string | null
            value: string
          } | null> | null
          openingHoursContacts?: Array<{
            __typename?: 'ComponentBlocksContactCard'
            overrideLabel?: string | null
            value: string
          } | null> | null
          emailContacts?: Array<{
            __typename?: 'ComponentBlocksContactCard'
            overrideLabel?: string | null
            value: string
          } | null> | null
          phoneContacts?: Array<{
            __typename?: 'ComponentBlocksContactCard'
            overrideLabel?: string | null
            value: string
          } | null> | null
          webContacts?: Array<{
            __typename?: 'ComponentBlocksContactCard'
            overrideLabel?: string | null
            value: string
          } | null> | null
          postalAddressContacts?: Array<{
            __typename?: 'ComponentBlocksContactCard'
            overrideLabel?: string | null
            value: string
          } | null> | null
          billingInfoContacts?: Array<{
            __typename?: 'ComponentBlocksContactCard'
            overrideLabel?: string | null
            value: string
          } | null> | null
          bankConnectionContacts?: Array<{
            __typename?: 'ComponentBlocksContactCard'
            overrideLabel?: string | null
            value: string
          } | null> | null
          personContacts?: Array<{
            __typename?: 'ComponentBlocksContactPersonCard'
            title: string
            subtext?: string | null
            email?: string | null
            phone?: string | null
          } | null> | null
          directionsContact?: {
            __typename?: 'ComponentBlocksContactDirectionsCard'
            overrideLabel?: string | null
            address: string
            parkingInfo?: string | null
            publicTransportInfo?: string | null
            barrierFreeInfo?: string | null
            iframeUrl?: string | null
          } | null
        }
      | {
          __typename: 'ComponentSectionsDivider'
          style?: Enum_Componentsectionsdivider_Style | null
        }
      | {
          __typename: 'ComponentSectionsDocuments'
          title?: string | null
          text?: string | null
          showAll?: boolean | null
          titleLevelDocumentsSection?: Enum_Componentsectionsdocuments_Titlelevel | null
          documents: Array<{
            __typename: 'Document'
            publishedAt?: any | null
            updatedAt?: any | null
            description?: string | null
            documentId: string
            slug: string
            title: string
            documentCategory?: {
              __typename?: 'DocumentCategory'
              documentId: string
              title: string
              slug: string
            } | null
            files: Array<{
              __typename?: 'UploadFile'
              documentId: string
              url: string
              name: string
              ext?: string | null
              size: number
              createdAt?: any | null
              updatedAt?: any | null
            } | null>
          } | null>
        }
      | {
          __typename: 'ComponentSectionsEvents'
          title?: string | null
          text?: string | null
          titleLevelEventsSection?: Enum_Componentsectionsevents_Titlelevel | null
          eventPages: Array<{
            __typename?: 'Page'
            documentId: string
            slug?: string | null
            title: string
            locale?: string | null
            pageHeaderSections?: Array<
              | {
                  __typename: 'ComponentHeaderSectionsEvent'
                  date?: any | null
                  address?: string | null
                }
              | {
                  __typename: 'ComponentHeaderSectionsFacility'
                  address?: string | null
                  navigateToLink?: string | null
                  media: Array<{
                    __typename?: 'UploadFile'
                    documentId: string
                    url: string
                    width?: number | null
                    height?: number | null
                    caption?: string | null
                    alternativeText?: string | null
                    name: string
                  } | null>
                }
              | { __typename: 'Error' }
              | null
            > | null
            pageBackgroundImage?: {
              __typename?: 'UploadFile'
              documentId: string
              url: string
            } | null
          } | null>
        }
      | {
          __typename: 'ComponentSectionsFacilities'
          title?: string | null
          text?: string | null
          titleLevelFacilitiesSection?: Enum_Componentsectionsfacilities_Titlelevel | null
          facilityPages: Array<{
            __typename?: 'Page'
            documentId: string
            slug?: string | null
            title: string
            locale?: string | null
            pageHeaderSections?: Array<
              | {
                  __typename: 'ComponentHeaderSectionsEvent'
                  date?: any | null
                  address?: string | null
                }
              | {
                  __typename: 'ComponentHeaderSectionsFacility'
                  address?: string | null
                  navigateToLink?: string | null
                  media: Array<{
                    __typename?: 'UploadFile'
                    documentId: string
                    url: string
                    width?: number | null
                    height?: number | null
                    caption?: string | null
                    alternativeText?: string | null
                    name: string
                  } | null>
                }
              | { __typename: 'Error' }
              | null
            > | null
            pageBackgroundImage?: {
              __typename?: 'UploadFile'
              documentId: string
              url: string
            } | null
          } | null>
        }
      | {
          __typename: 'ComponentSectionsFaqCategories'
          id: string
          title?: string | null
          text?: string | null
          faqCategories: Array<{
            __typename?: 'FaqCategory'
            documentId: string
            title: string
            slug: string
            faqs: Array<{
              __typename?: 'Faq'
              documentId: string
              title: string
              body?: string | null
            } | null>
          } | null>
        }
      | {
          __typename: 'ComponentSectionsFaqs'
          title?: string | null
          text?: string | null
          titleLevelFaqsSection?: Enum_Componentsectionsfaqs_Titlelevel | null
          faqs: Array<{
            __typename?: 'Faq'
            documentId: string
            title: string
            body?: string | null
          } | null>
        }
      | {
          __typename: 'ComponentSectionsFileList'
          title?: string | null
          text?: string | null
          titleLevelFileListSection?: Enum_Componentsectionsfilelist_Titlelevel | null
          fileList?: Array<{
            __typename?: 'ComponentBlocksFile'
            id: string
            title?: string | null
            media?: {
              __typename?: 'UploadFile'
              documentId: string
              url: string
              name: string
              ext?: string | null
              size: number
              createdAt?: any | null
              updatedAt?: any | null
            } | null
          } | null> | null
        }
      | {
          __typename: 'ComponentSectionsGallery'
          title?: string | null
          text?: string | null
          titleLevelGallerySection?: Enum_Componentsectionsgallery_Titlelevel | null
          medias: Array<{
            __typename?: 'UploadFile'
            documentId: string
            url: string
            width?: number | null
            height?: number | null
            caption?: string | null
            alternativeText?: string | null
            name: string
          } | null>
        }
      | {
          __typename: 'ComponentSectionsIframe'
          title?: string | null
          text?: string | null
          url: string
          iframeTitle?: string | null
          iframeHeight: string
          hasBorder?: boolean | null
          allowGeolocation?: boolean | null
          titleLevelIframeSection?: Enum_Componentsectionsiframe_Titlelevel | null
        }
      | { __typename: 'ComponentSectionsInbaLatestRelease' }
      | {
          __typename: 'ComponentSectionsInbaReleases'
          title?: string | null
          text?: string | null
          variantInbaReleasesSection?: Enum_Componentsectionsinbareleases_Variant | null
          showMoreLink?: {
            __typename?: 'ComponentBlocksCommonLink'
            label?: string | null
            url?: string | null
            analyticsId?: string | null
            page?: {
              __typename?: 'Page'
              documentId: string
              slug?: string | null
              title: string
              locale?: string | null
            } | null
            article?: {
              __typename: 'Article'
              documentId: string
              slug: string
              title: string
              locale?: string | null
            } | null
          } | null
        }
      | {
          __typename: 'ComponentSectionsJobOfferList'
          title?: string | null
          text?: string | null
          titleLevel?: Enum_Componentsectionsjobofferlist_Titlelevel | null
        }
      | {
          __typename: 'ComponentSectionsLinks'
          title?: string | null
          titleLevelLinksSection?: Enum_Componentsectionslinks_Titlelevel | null
          pageLinks?: Array<{
            __typename?: 'ComponentBlocksPageLink'
            url?: string | null
            analyticsId?: string | null
            label?: string | null
            page?: {
              __typename?: 'Page'
              documentId: string
              slug?: string | null
              title: string
              locale?: string | null
            } | null
          } | null> | null
        }
      | {
          __typename: 'ComponentSectionsNarrowText'
          content?: string | null
          width?: Enum_Componentsectionsnarrowtext_Width | null
        }
      | {
          __typename: 'ComponentSectionsNewsletter'
          title?: string | null
          text?: string | null
          newsletterType: Enum_Componentsectionsnewsletter_Newslettertype
          socialLinksTitle?: string | null
          facebookUrl?: string | null
          instagramUrl?: string | null
        }
      | {
          __typename: 'ComponentSectionsNumbersOverview'
          title?: string | null
          text?: string | null
          showMoreLink?: {
            __typename?: 'ComponentBlocksCommonLink'
            label?: string | null
            url?: string | null
            analyticsId?: string | null
            page?: {
              __typename?: 'Page'
              documentId: string
              slug?: string | null
              title: string
              locale?: string | null
            } | null
            article?: {
              __typename: 'Article'
              documentId: string
              slug: string
              title: string
              locale?: string | null
            } | null
          } | null
          numbersOverviewItems?: Array<{
            __typename?: 'ComponentBlocksNumbersOverviewItem'
            id: string
            number: string
            text: string
          } | null> | null
        }
      | {
          __typename: 'ComponentSectionsNumericalList'
          id: string
          title?: string | null
          text?: string | null
          variant: Enum_Componentsectionsnumericallist_Variant
          items?: Array<{
            __typename?: 'ComponentBlocksNumericalListItem'
            text?: string | null
          } | null> | null
        }
      | { __typename: 'ComponentSectionsOfficialBoard' }
      | {
          __typename: 'ComponentSectionsOpeningHours'
          title?: string | null
          text?: string | null
          titleLevelOpeningHoursSection?: Enum_Componentsectionsopeninghours_Titlelevel | null
          openingHoursItems?: Array<{
            __typename?: 'ComponentBlocksOpeningHoursItem'
            label: string
            value: string
          } | null> | null
          alertMessage?: {
            __typename?: 'ComponentBlocksOpeningHoursAlertMessage'
            text?: string | null
          } | null
        }
      | { __typename: 'ComponentSectionsOrganizationalStructure'; title?: string | null }
      | {
          __typename: 'ComponentSectionsPartners'
          title?: string | null
          text?: string | null
          logoRatio: Enum_Componentsectionspartners_Logoratio
          titleLevelPartnersSection?: Enum_Componentsectionspartners_Titlelevel | null
          partners: Array<{
            __typename?: 'ComponentBlocksPartner'
            title: string
            url?: string | null
            logo: {
              __typename?: 'UploadFile'
              documentId: string
              url: string
              width?: number | null
              height?: number | null
              caption?: string | null
              alternativeText?: string | null
              name: string
            }
          } | null>
        }
      | {
          __typename: 'ComponentSectionsProsAndConsSection'
          title?: string | null
          text?: string | null
          textAlignProsAndCons: Enum_Componentsectionsprosandconssection_Textalign
          pros: {
            __typename?: 'ComponentBlocksProsAndConsCard'
            title: string
            items: Array<{ __typename?: 'ComponentBlocksComparisonItem'; label: string } | null>
          }
          cons: {
            __typename?: 'ComponentBlocksProsAndConsCard'
            title: string
            items: Array<{ __typename?: 'ComponentBlocksComparisonItem'; label: string } | null>
          }
        }
      | {
          __typename: 'ComponentSectionsRegulations'
          showAll?: boolean | null
          regulations: Array<{
            __typename?: 'Regulation'
            documentId: string
            regNumber: string
            slug: string
            titleText?: string | null
            fullTitle: string
            effectiveFrom: any
            category: Enum_Regulation_Category
            isFullTextRegulation: boolean
            mainDocument: {
              __typename?: 'UploadFile'
              documentId: string
              url: string
              name: string
              ext?: string | null
              size: number
              createdAt?: any | null
              updatedAt?: any | null
            }
            attachments: Array<{
              __typename?: 'UploadFile'
              documentId: string
              url: string
              name: string
              ext?: string | null
              size: number
              createdAt?: any | null
              updatedAt?: any | null
            } | null>
            amendments: Array<{
              __typename?: 'Regulation'
              documentId: string
              regNumber: string
              slug: string
              effectiveFrom: any
              isFullTextRegulation: boolean
              attachments: Array<{
                __typename?: 'UploadFile'
                documentId: string
                url: string
                name: string
                ext?: string | null
                size: number
                createdAt?: any | null
                updatedAt?: any | null
              } | null>
            } | null>
            amending: Array<{
              __typename?: 'Regulation'
              documentId: string
              regNumber: string
              slug: string
              effectiveFrom: any
              cancellation?: {
                __typename?: 'Regulation'
                documentId: string
                regNumber: string
                slug: string
                effectiveFrom: any
              } | null
              amending: Array<{
                __typename?: 'Regulation'
                documentId: string
                regNumber: string
                slug: string
                cancellation?: {
                  __typename?: 'Regulation'
                  documentId: string
                  regNumber: string
                  slug: string
                  effectiveFrom: any
                } | null
              } | null>
            } | null>
            cancellation?: {
              __typename?: 'Regulation'
              documentId: string
              regNumber: string
              slug: string
              effectiveFrom: any
            } | null
            cancelling: Array<{
              __typename?: 'Regulation'
              documentId: string
              regNumber: string
              slug: string
              effectiveFrom: any
            } | null>
          } | null>
        }
      | {
          __typename: 'ComponentSectionsStarzLandingPage'
          banner: {
            __typename?: 'ComponentBlocksStarzLandingPageBanner'
            title: string
            content?: string | null
            contentPosition: Enum_Componentblocksstarzlandingpagebanner_Contentposition
            variant: Enum_Componentblocksstarzlandingpagebanner_Variant
            media: {
              __typename?: 'UploadFile'
              documentId: string
              url: string
              width?: number | null
              height?: number | null
              caption?: string | null
              alternativeText?: string | null
              name: string
            }
            primaryLink?: {
              __typename?: 'ComponentBlocksCommonLink'
              label?: string | null
              url?: string | null
              analyticsId?: string | null
              page?: {
                __typename?: 'Page'
                documentId: string
                slug?: string | null
                title: string
                locale?: string | null
              } | null
              article?: {
                __typename: 'Article'
                documentId: string
                slug: string
                title: string
                locale?: string | null
              } | null
            } | null
            secondaryLink?: {
              __typename?: 'ComponentBlocksCommonLink'
              label?: string | null
              url?: string | null
              analyticsId?: string | null
              page?: {
                __typename?: 'Page'
                documentId: string
                slug?: string | null
                title: string
                locale?: string | null
              } | null
              article?: {
                __typename: 'Article'
                documentId: string
                slug: string
                title: string
                locale?: string | null
              } | null
            } | null
            tertiaryLink?: {
              __typename?: 'ComponentBlocksCommonLink'
              label?: string | null
              url?: string | null
              analyticsId?: string | null
              page?: {
                __typename?: 'Page'
                documentId: string
                slug?: string | null
                title: string
                locale?: string | null
              } | null
              article?: {
                __typename: 'Article'
                documentId: string
                slug: string
                title: string
                locale?: string | null
              } | null
            } | null
          }
          cardLinks?: Array<{
            __typename?: 'ComponentBlocksCardLink'
            label?: string | null
            subtext?: string | null
            url?: string | null
            analyticsId?: string | null
            media?: {
              __typename?: 'UploadFile'
              documentId: string
              url: string
              width?: number | null
              height?: number | null
              caption?: string | null
              alternativeText?: string | null
              name: string
            } | null
            page?: {
              __typename?: 'Page'
              documentId: string
              slug?: string | null
              title: string
              locale?: string | null
              pageBackgroundImage?: {
                __typename?: 'UploadFile'
                documentId: string
                url: string
              } | null
            } | null
            article?: {
              __typename: 'Article'
              perex?: string | null
              addedAt: any
              documentId: string
              slug: string
              title: string
              locale?: string | null
              coverMedia?: {
                __typename?: 'UploadFile'
                documentId: string
                url: string
                width?: number | null
                height?: number | null
                caption?: string | null
                alternativeText?: string | null
                name: string
              } | null
              articleCategory?: {
                __typename?: 'ArticleCategory'
                documentId: string
                title: string
                slug: string
              } | null
              tags: Array<{
                __typename?: 'Tag'
                documentId: string
                title: string
                slug: string
                pageCategory?: {
                  __typename?: 'PageCategory'
                  documentId: string
                  title?: string | null
                  color?: Enum_Pagecategory_Color | null
                } | null
              } | null>
            } | null
          } | null> | null
        }
      | {
          __typename: 'ComponentSectionsTextWithImage'
          content?: string | null
          imagePosition: Enum_Componentsectionstextwithimage_Imageposition
          imageAspectRatio?: Enum_Componentsectionstextwithimage_Imageaspectratio | null
          imageSrc: {
            __typename?: 'UploadFile'
            documentId: string
            url: string
            width?: number | null
            height?: number | null
            caption?: string | null
            alternativeText?: string | null
            name: string
          }
          links?: Array<{
            __typename?: 'ComponentBlocksCommonLink'
            label?: string | null
            url?: string | null
            analyticsId?: string | null
            page?: {
              __typename?: 'Page'
              documentId: string
              slug?: string | null
              title: string
              locale?: string | null
            } | null
            article?: {
              __typename: 'Article'
              documentId: string
              slug: string
              title: string
              locale?: string | null
            } | null
          } | null> | null
        }
      | {
          __typename: 'ComponentSectionsTextWithImageOverlapped'
          content?: string | null
          imagePositionTextWithImageOverlapped: Enum_Componentsectionstextwithimageoverlapped_Imageposition
          image: {
            __typename?: 'UploadFile'
            documentId: string
            url: string
            width?: number | null
            height?: number | null
            caption?: string | null
            alternativeText?: string | null
            name: string
          }
          links?: Array<{
            __typename?: 'ComponentBlocksCommonLink'
            label?: string | null
            url?: string | null
            analyticsId?: string | null
            page?: {
              __typename?: 'Page'
              documentId: string
              slug?: string | null
              title: string
              locale?: string | null
            } | null
            article?: {
              __typename: 'Article'
              documentId: string
              slug: string
              title: string
              locale?: string | null
            } | null
          } | null> | null
        }
      | {
          __typename: 'ComponentSectionsTootootEvents'
          title?: string | null
          text?: string | null
          showMoreLink?: {
            __typename?: 'ComponentBlocksCommonLink'
            label?: string | null
            url?: string | null
            analyticsId?: string | null
            page?: {
              __typename?: 'Page'
              documentId: string
              slug?: string | null
              title: string
              locale?: string | null
            } | null
            article?: {
              __typename: 'Article'
              documentId: string
              slug: string
              title: string
              locale?: string | null
            } | null
          } | null
        }
      | {
          __typename: 'ComponentSectionsVideos'
          id: string
          title?: string | null
          subtitle?: string | null
          titleLevelVideosSection?: Enum_Componentsectionsvideos_Titlelevel | null
          videos?: Array<{
            __typename?: 'ComponentBlocksVideo'
            id: string
            title?: string | null
            speaker?: string | null
            url: string
          } | null> | null
        }
      | { __typename: 'Error' }
      | null
    > | null
    sidebar?: Array<
      { __typename: 'ComponentSidebarsEmptySidebar' } | { __typename?: 'Error' } | null
    > | null
    localizations: Array<{
      __typename?: 'Page'
      slug?: string | null
      locale?: string | null
    } | null>
    relatedContents: Array<{
      __typename?: 'Tag'
      documentId: string
      title: string
      slug: string
      pageCategory?: {
        __typename?: 'PageCategory'
        documentId: string
        title?: string | null
        color?: Enum_Pagecategory_Color | null
      } | null
    } | null>
    pageBackgroundImage?: { __typename?: 'UploadFile'; documentId: string; url: string } | null
    parentPage?: {
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      locale?: string | null
      title: string
      parentPage?: {
        __typename?: 'Page'
        documentId: string
        slug?: string | null
        locale?: string | null
        title: string
        parentPage?: {
          __typename?: 'Page'
          documentId: string
          slug?: string | null
          locale?: string | null
          title: string
          parentPage?: {
            __typename?: 'Page'
            documentId: string
            slug?: string | null
            locale?: string | null
            title: string
          } | null
        } | null
      } | null
    } | null
  } | null>
}

export type PageRedirectByAliasQueryVariables = Exact<{
  alias: Scalars['String']['input']
  locale: Scalars['I18NLocaleCode']['input']
}>

export type PageRedirectByAliasQuery = {
  __typename?: 'Query'
  pages: Array<{
    __typename?: 'Page'
    documentId: string
    slug?: string | null
    title: string
    locale?: string | null
  } | null>
  articles: Array<{
    __typename: 'Article'
    documentId: string
    slug: string
    title: string
    locale?: string | null
  } | null>
}

export type Dev_AllPagesQueryVariables = Exact<{
  sort?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>
  >
  limit?: InputMaybe<Scalars['Int']['input']>
  start?: InputMaybe<Scalars['Int']['input']>
  filters?: InputMaybe<PageFiltersInput>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}>

export type Dev_AllPagesQuery = {
  __typename?: 'Query'
  pages: Array<{
    __typename?: 'Page'
    alias?: string | null
    subtext?: string | null
    pageColor: Enum_Page_Pagecolor
    metaDiscription?: string | null
    keywords?: string | null
    showTableOfContents?: boolean | null
    documentId: string
    slug?: string | null
    title: string
    locale?: string | null
    adminGroups: Array<{
      __typename?: 'AdminGroup'
      contentManagedBy: string
      documentId: string
      slug: string
      title: string
      adminGroupId?: string | null
      landingPage?: {
        __typename?: 'Page'
        documentId: string
        slug?: string | null
        title: string
        locale?: string | null
        localizations: Array<{
          __typename?: 'Page'
          documentId: string
          slug?: string | null
          title: string
          locale?: string | null
          childPages: Array<{
            __typename?: 'Page'
            documentId: string
            slug?: string | null
            title: string
            locale?: string | null
          } | null>
        } | null>
        childPages: Array<{
          __typename?: 'Page'
          documentId: string
          slug?: string | null
          title: string
          locale?: string | null
        } | null>
      } | null
      submenuPages?: Array<{
        __typename?: 'ComponentBlocksPageLink'
        url?: string | null
        analyticsId?: string | null
        label?: string | null
        page?: {
          __typename?: 'Page'
          documentId: string
          slug?: string | null
          title: string
          locale?: string | null
        } | null
      } | null> | null
    } | null>
    headerLinks?: Array<{
      __typename?: 'ComponentBlocksCommonLink'
      label?: string | null
      url?: string | null
      analyticsId?: string | null
      page?: {
        __typename?: 'Page'
        documentId: string
        slug?: string | null
        title: string
        locale?: string | null
      } | null
      article?: {
        __typename: 'Article'
        documentId: string
        slug: string
        title: string
        locale?: string | null
      } | null
    } | null> | null
    pageHeaderSections?: Array<
      | { __typename: 'ComponentHeaderSectionsEvent'; date?: any | null; address?: string | null }
      | {
          __typename: 'ComponentHeaderSectionsFacility'
          address?: string | null
          navigateToLink?: string | null
          media: Array<{
            __typename?: 'UploadFile'
            documentId: string
            url: string
            width?: number | null
            height?: number | null
            caption?: string | null
            alternativeText?: string | null
            name: string
          } | null>
        }
      | { __typename: 'Error' }
      | null
    > | null
    subnavigation?: {
      __typename?: 'ComponentSectionsSubnavigation'
      links?: Array<{
        __typename?: 'ComponentBlocksSubnavigationLink'
        id: string
        label?: string | null
        subtext?: string | null
        url?: string | null
        analyticsId?: string | null
        page?: {
          __typename?: 'Page'
          documentId: string
          slug?: string | null
          title: string
          locale?: string | null
        } | null
      } | null> | null
    } | null
    sections?: Array<
      | {
          __typename: 'ComponentSectionsAccordion'
          title?: string | null
          titleLevelAccordionSection?: Enum_Componentsectionsaccordion_Titlelevel | null
          institutions?: Array<{
            __typename?: 'ComponentAccordionItemsInstitution'
            title?: string | null
            subtitle?: string | null
            category?: string | null
            firstColumn?: string | null
            secondColumn?: string | null
            thirdColumn?: string | null
            url?: string | null
            urlLabel?: string | null
          } | null> | null
          flatText?: Array<{
            __typename?: 'ComponentAccordionItemsFlatText'
            category?: string | null
            content?: string | null
            moreLinkTitle?: string | null
            moreLinkUrl?: string | null
            moreLinkPage?: {
              __typename?: 'Page'
              documentId: string
              slug?: string | null
              title: string
              locale?: string | null
            } | null
            fileList?: Array<{
              __typename?: 'ComponentBlocksFileItem'
              id: string
              title?: string | null
              media: {
                __typename?: 'UploadFile'
                documentId: string
                url: string
                name: string
                ext?: string | null
                size: number
                createdAt?: any | null
                updatedAt?: any | null
              }
            } | null> | null
          } | null> | null
        }
      | {
          __typename: 'ComponentSectionsAlert'
          title?: string | null
          alertText: string
          alertVariant: Enum_Componentsectionsalert_Alertvariant
        }
      | {
          __typename: 'ComponentSectionsArticles'
          title?: string | null
          text?: string | null
          showAll?: boolean | null
          articles: Array<{
            __typename: 'Article'
            perex?: string | null
            addedAt: any
            documentId: string
            slug: string
            title: string
            locale?: string | null
            coverMedia?: {
              __typename?: 'UploadFile'
              documentId: string
              url: string
              width?: number | null
              height?: number | null
              caption?: string | null
              alternativeText?: string | null
              name: string
            } | null
            articleCategory?: {
              __typename?: 'ArticleCategory'
              documentId: string
              title: string
              slug: string
            } | null
            tags: Array<{
              __typename?: 'Tag'
              documentId: string
              title: string
              slug: string
              pageCategory?: {
                __typename?: 'PageCategory'
                documentId: string
                title?: string | null
                color?: Enum_Pagecategory_Color | null
              } | null
            } | null>
          } | null>
          category?: {
            __typename?: 'PageCategory'
            documentId: string
            title?: string | null
            color?: Enum_Pagecategory_Color | null
          } | null
          articleCategories: Array<{
            __typename?: 'ArticleCategory'
            documentId: string
            title: string
            slug: string
          } | null>
          tags: Array<{
            __typename?: 'Tag'
            documentId: string
            title: string
            slug: string
            pageCategory?: {
              __typename?: 'PageCategory'
              documentId: string
              title?: string | null
              color?: Enum_Pagecategory_Color | null
            } | null
          } | null>
          adminGroups: Array<{
            __typename?: 'AdminGroup'
            documentId: string
            slug: string
            title: string
            adminGroupId?: string | null
          } | null>
          showMoreLink?: {
            __typename?: 'ComponentBlocksCommonLink'
            label?: string | null
            url?: string | null
            analyticsId?: string | null
            page?: {
              __typename?: 'Page'
              documentId: string
              slug?: string | null
              title: string
              locale?: string | null
            } | null
            article?: {
              __typename: 'Article'
              documentId: string
              slug: string
              title: string
              locale?: string | null
            } | null
          } | null
        }
      | {
          __typename: 'ComponentSectionsArticlesLandingPage'
          leftArticle?: {
            __typename: 'Article'
            perex?: string | null
            addedAt: any
            documentId: string
            slug: string
            title: string
            locale?: string | null
            coverMedia?: {
              __typename?: 'UploadFile'
              documentId: string
              url: string
              width?: number | null
              height?: number | null
              caption?: string | null
              alternativeText?: string | null
              name: string
            } | null
            articleCategory?: {
              __typename?: 'ArticleCategory'
              documentId: string
              title: string
              slug: string
            } | null
            tags: Array<{
              __typename?: 'Tag'
              documentId: string
              title: string
              slug: string
              pageCategory?: {
                __typename?: 'PageCategory'
                documentId: string
                title?: string | null
                color?: Enum_Pagecategory_Color | null
              } | null
            } | null>
          } | null
          newsPageLink?: {
            __typename?: 'ComponentBlocksCommonLink'
            label?: string | null
            url?: string | null
            analyticsId?: string | null
            page?: {
              __typename?: 'Page'
              documentId: string
              slug?: string | null
              title: string
              locale?: string | null
            } | null
            article?: {
              __typename: 'Article'
              documentId: string
              slug: string
              title: string
              locale?: string | null
            } | null
          } | null
        }
      | { __typename: 'ComponentSectionsAssets' }
      | {
          __typename: 'ComponentSectionsBanner'
          content?: string | null
          contentPosition: Enum_Componentsectionsbanner_Contentposition
          bannerTitle: string
          bannerVariant: Enum_Componentsectionsbanner_Variant
          media: { __typename?: 'UploadFile'; url: string }
          primaryLink?: {
            __typename?: 'ComponentBlocksCommonLink'
            label?: string | null
            url?: string | null
            analyticsId?: string | null
            page?: {
              __typename?: 'Page'
              documentId: string
              slug?: string | null
              title: string
              locale?: string | null
            } | null
            article?: {
              __typename: 'Article'
              documentId: string
              slug: string
              title: string
              locale?: string | null
            } | null
          } | null
          secondaryLink?: {
            __typename?: 'ComponentBlocksCommonLink'
            label?: string | null
            url?: string | null
            analyticsId?: string | null
            page?: {
              __typename?: 'Page'
              documentId: string
              slug?: string | null
              title: string
              locale?: string | null
            } | null
            article?: {
              __typename: 'Article'
              documentId: string
              slug: string
              title: string
              locale?: string | null
            } | null
          } | null
          tertiaryLink?: {
            __typename?: 'ComponentBlocksCommonLink'
            label?: string | null
            url?: string | null
            analyticsId?: string | null
            page?: {
              __typename?: 'Page'
              documentId: string
              slug?: string | null
              title: string
              locale?: string | null
            } | null
            article?: {
              __typename: 'Article'
              documentId: string
              slug: string
              title: string
              locale?: string | null
            } | null
          } | null
        }
      | {
          __typename: 'ComponentSectionsColumnedText'
          title?: string | null
          content?: string | null
        }
      | {
          __typename: 'ComponentSectionsColumns'
          title?: string | null
          text?: string | null
          imageVariant: Enum_Componentsectionscolumns_Imagevariant
          responsiveLayout: Enum_Componentsectionscolumns_Responsivelayout
          columns: Array<{
            __typename?: 'ComponentBlocksColumnsItem'
            title?: string | null
            text?: string | null
            image?: {
              __typename?: 'UploadFile'
              documentId: string
              url: string
              width?: number | null
              height?: number | null
              caption?: string | null
              alternativeText?: string | null
              name: string
            } | null
          } | null>
        }
      | {
          __typename: 'ComponentSectionsColumnsList'
          title?: string | null
          text?: string | null
          leftColumn?: Array<{
            __typename?: 'ComponentBlocksColumnsListItem'
            content?: string | null
            icon?: {
              __typename?: 'UploadFile'
              documentId: string
              url: string
              width?: number | null
              height?: number | null
              caption?: string | null
              alternativeText?: string | null
              name: string
            } | null
          } | null> | null
          rightColumn?: Array<{
            __typename?: 'ComponentBlocksColumnsListItem'
            content?: string | null
            icon?: {
              __typename?: 'UploadFile'
              documentId: string
              url: string
              width?: number | null
              height?: number | null
              caption?: string | null
              alternativeText?: string | null
              name: string
            } | null
          } | null> | null
        }
      | {
          __typename: 'ComponentSectionsComparisonSection'
          title?: string | null
          text?: string | null
          textAlignComparison: Enum_Componentsectionscomparisonsection_Textalign
          cards: Array<{
            __typename?: 'ComponentBlocksComparisonCard'
            title: string
            items: Array<{ __typename?: 'ComponentBlocksComparisonItem'; label: string } | null>
            iconMedia?: { __typename?: 'UploadFile'; url: string } | null
          } | null>
        }
      | {
          __typename: 'ComponentSectionsContactsSection'
          id: string
          title?: string | null
          description?: string | null
          titleLevelContactsSection?: Enum_Componentsectionscontactssection_Titlelevel | null
          addressContacts?: Array<{
            __typename?: 'ComponentBlocksContactCard'
            overrideLabel?: string | null
            value: string
          } | null> | null
          openingHoursContacts?: Array<{
            __typename?: 'ComponentBlocksContactCard'
            overrideLabel?: string | null
            value: string
          } | null> | null
          emailContacts?: Array<{
            __typename?: 'ComponentBlocksContactCard'
            overrideLabel?: string | null
            value: string
          } | null> | null
          phoneContacts?: Array<{
            __typename?: 'ComponentBlocksContactCard'
            overrideLabel?: string | null
            value: string
          } | null> | null
          webContacts?: Array<{
            __typename?: 'ComponentBlocksContactCard'
            overrideLabel?: string | null
            value: string
          } | null> | null
          postalAddressContacts?: Array<{
            __typename?: 'ComponentBlocksContactCard'
            overrideLabel?: string | null
            value: string
          } | null> | null
          billingInfoContacts?: Array<{
            __typename?: 'ComponentBlocksContactCard'
            overrideLabel?: string | null
            value: string
          } | null> | null
          bankConnectionContacts?: Array<{
            __typename?: 'ComponentBlocksContactCard'
            overrideLabel?: string | null
            value: string
          } | null> | null
          personContacts?: Array<{
            __typename?: 'ComponentBlocksContactPersonCard'
            title: string
            subtext?: string | null
            email?: string | null
            phone?: string | null
          } | null> | null
          directionsContact?: {
            __typename?: 'ComponentBlocksContactDirectionsCard'
            overrideLabel?: string | null
            address: string
            parkingInfo?: string | null
            publicTransportInfo?: string | null
            barrierFreeInfo?: string | null
            iframeUrl?: string | null
          } | null
        }
      | {
          __typename: 'ComponentSectionsDivider'
          style?: Enum_Componentsectionsdivider_Style | null
        }
      | {
          __typename: 'ComponentSectionsDocuments'
          title?: string | null
          text?: string | null
          showAll?: boolean | null
          titleLevelDocumentsSection?: Enum_Componentsectionsdocuments_Titlelevel | null
          documents: Array<{
            __typename: 'Document'
            publishedAt?: any | null
            updatedAt?: any | null
            description?: string | null
            documentId: string
            slug: string
            title: string
            documentCategory?: {
              __typename?: 'DocumentCategory'
              documentId: string
              title: string
              slug: string
            } | null
            files: Array<{
              __typename?: 'UploadFile'
              documentId: string
              url: string
              name: string
              ext?: string | null
              size: number
              createdAt?: any | null
              updatedAt?: any | null
            } | null>
          } | null>
        }
      | {
          __typename: 'ComponentSectionsEvents'
          title?: string | null
          text?: string | null
          titleLevelEventsSection?: Enum_Componentsectionsevents_Titlelevel | null
          eventPages: Array<{
            __typename?: 'Page'
            documentId: string
            slug?: string | null
            title: string
            locale?: string | null
            pageHeaderSections?: Array<
              | {
                  __typename: 'ComponentHeaderSectionsEvent'
                  date?: any | null
                  address?: string | null
                }
              | {
                  __typename: 'ComponentHeaderSectionsFacility'
                  address?: string | null
                  navigateToLink?: string | null
                  media: Array<{
                    __typename?: 'UploadFile'
                    documentId: string
                    url: string
                    width?: number | null
                    height?: number | null
                    caption?: string | null
                    alternativeText?: string | null
                    name: string
                  } | null>
                }
              | { __typename: 'Error' }
              | null
            > | null
            pageBackgroundImage?: {
              __typename?: 'UploadFile'
              documentId: string
              url: string
            } | null
          } | null>
        }
      | {
          __typename: 'ComponentSectionsFacilities'
          title?: string | null
          text?: string | null
          titleLevelFacilitiesSection?: Enum_Componentsectionsfacilities_Titlelevel | null
          facilityPages: Array<{
            __typename?: 'Page'
            documentId: string
            slug?: string | null
            title: string
            locale?: string | null
            pageHeaderSections?: Array<
              | {
                  __typename: 'ComponentHeaderSectionsEvent'
                  date?: any | null
                  address?: string | null
                }
              | {
                  __typename: 'ComponentHeaderSectionsFacility'
                  address?: string | null
                  navigateToLink?: string | null
                  media: Array<{
                    __typename?: 'UploadFile'
                    documentId: string
                    url: string
                    width?: number | null
                    height?: number | null
                    caption?: string | null
                    alternativeText?: string | null
                    name: string
                  } | null>
                }
              | { __typename: 'Error' }
              | null
            > | null
            pageBackgroundImage?: {
              __typename?: 'UploadFile'
              documentId: string
              url: string
            } | null
          } | null>
        }
      | {
          __typename: 'ComponentSectionsFaqCategories'
          id: string
          title?: string | null
          text?: string | null
          faqCategories: Array<{
            __typename?: 'FaqCategory'
            documentId: string
            title: string
            slug: string
            faqs: Array<{
              __typename?: 'Faq'
              documentId: string
              title: string
              body?: string | null
            } | null>
          } | null>
        }
      | {
          __typename: 'ComponentSectionsFaqs'
          title?: string | null
          text?: string | null
          titleLevelFaqsSection?: Enum_Componentsectionsfaqs_Titlelevel | null
          faqs: Array<{
            __typename?: 'Faq'
            documentId: string
            title: string
            body?: string | null
          } | null>
        }
      | {
          __typename: 'ComponentSectionsFileList'
          title?: string | null
          text?: string | null
          titleLevelFileListSection?: Enum_Componentsectionsfilelist_Titlelevel | null
          fileList?: Array<{
            __typename?: 'ComponentBlocksFile'
            id: string
            title?: string | null
            media?: {
              __typename?: 'UploadFile'
              documentId: string
              url: string
              name: string
              ext?: string | null
              size: number
              createdAt?: any | null
              updatedAt?: any | null
            } | null
          } | null> | null
        }
      | {
          __typename: 'ComponentSectionsGallery'
          title?: string | null
          text?: string | null
          titleLevelGallerySection?: Enum_Componentsectionsgallery_Titlelevel | null
          medias: Array<{
            __typename?: 'UploadFile'
            documentId: string
            url: string
            width?: number | null
            height?: number | null
            caption?: string | null
            alternativeText?: string | null
            name: string
          } | null>
        }
      | {
          __typename: 'ComponentSectionsIframe'
          title?: string | null
          text?: string | null
          url: string
          iframeTitle?: string | null
          iframeHeight: string
          hasBorder?: boolean | null
          allowGeolocation?: boolean | null
          titleLevelIframeSection?: Enum_Componentsectionsiframe_Titlelevel | null
        }
      | { __typename: 'ComponentSectionsInbaLatestRelease' }
      | {
          __typename: 'ComponentSectionsInbaReleases'
          title?: string | null
          text?: string | null
          variantInbaReleasesSection?: Enum_Componentsectionsinbareleases_Variant | null
          showMoreLink?: {
            __typename?: 'ComponentBlocksCommonLink'
            label?: string | null
            url?: string | null
            analyticsId?: string | null
            page?: {
              __typename?: 'Page'
              documentId: string
              slug?: string | null
              title: string
              locale?: string | null
            } | null
            article?: {
              __typename: 'Article'
              documentId: string
              slug: string
              title: string
              locale?: string | null
            } | null
          } | null
        }
      | {
          __typename: 'ComponentSectionsJobOfferList'
          title?: string | null
          text?: string | null
          titleLevel?: Enum_Componentsectionsjobofferlist_Titlelevel | null
        }
      | {
          __typename: 'ComponentSectionsLinks'
          title?: string | null
          titleLevelLinksSection?: Enum_Componentsectionslinks_Titlelevel | null
          pageLinks?: Array<{
            __typename?: 'ComponentBlocksPageLink'
            url?: string | null
            analyticsId?: string | null
            label?: string | null
            page?: {
              __typename?: 'Page'
              documentId: string
              slug?: string | null
              title: string
              locale?: string | null
            } | null
          } | null> | null
        }
      | {
          __typename: 'ComponentSectionsNarrowText'
          content?: string | null
          width?: Enum_Componentsectionsnarrowtext_Width | null
        }
      | {
          __typename: 'ComponentSectionsNewsletter'
          title?: string | null
          text?: string | null
          newsletterType: Enum_Componentsectionsnewsletter_Newslettertype
          socialLinksTitle?: string | null
          facebookUrl?: string | null
          instagramUrl?: string | null
        }
      | {
          __typename: 'ComponentSectionsNumbersOverview'
          title?: string | null
          text?: string | null
          showMoreLink?: {
            __typename?: 'ComponentBlocksCommonLink'
            label?: string | null
            url?: string | null
            analyticsId?: string | null
            page?: {
              __typename?: 'Page'
              documentId: string
              slug?: string | null
              title: string
              locale?: string | null
            } | null
            article?: {
              __typename: 'Article'
              documentId: string
              slug: string
              title: string
              locale?: string | null
            } | null
          } | null
          numbersOverviewItems?: Array<{
            __typename?: 'ComponentBlocksNumbersOverviewItem'
            id: string
            number: string
            text: string
          } | null> | null
        }
      | {
          __typename: 'ComponentSectionsNumericalList'
          id: string
          title?: string | null
          text?: string | null
          variant: Enum_Componentsectionsnumericallist_Variant
          items?: Array<{
            __typename?: 'ComponentBlocksNumericalListItem'
            text?: string | null
          } | null> | null
        }
      | { __typename: 'ComponentSectionsOfficialBoard' }
      | {
          __typename: 'ComponentSectionsOpeningHours'
          title?: string | null
          text?: string | null
          titleLevelOpeningHoursSection?: Enum_Componentsectionsopeninghours_Titlelevel | null
          openingHoursItems?: Array<{
            __typename?: 'ComponentBlocksOpeningHoursItem'
            label: string
            value: string
          } | null> | null
          alertMessage?: {
            __typename?: 'ComponentBlocksOpeningHoursAlertMessage'
            text?: string | null
          } | null
        }
      | { __typename: 'ComponentSectionsOrganizationalStructure'; title?: string | null }
      | {
          __typename: 'ComponentSectionsPartners'
          title?: string | null
          text?: string | null
          logoRatio: Enum_Componentsectionspartners_Logoratio
          titleLevelPartnersSection?: Enum_Componentsectionspartners_Titlelevel | null
          partners: Array<{
            __typename?: 'ComponentBlocksPartner'
            title: string
            url?: string | null
            logo: {
              __typename?: 'UploadFile'
              documentId: string
              url: string
              width?: number | null
              height?: number | null
              caption?: string | null
              alternativeText?: string | null
              name: string
            }
          } | null>
        }
      | {
          __typename: 'ComponentSectionsProsAndConsSection'
          title?: string | null
          text?: string | null
          textAlignProsAndCons: Enum_Componentsectionsprosandconssection_Textalign
          pros: {
            __typename?: 'ComponentBlocksProsAndConsCard'
            title: string
            items: Array<{ __typename?: 'ComponentBlocksComparisonItem'; label: string } | null>
          }
          cons: {
            __typename?: 'ComponentBlocksProsAndConsCard'
            title: string
            items: Array<{ __typename?: 'ComponentBlocksComparisonItem'; label: string } | null>
          }
        }
      | {
          __typename: 'ComponentSectionsRegulations'
          showAll?: boolean | null
          regulations: Array<{
            __typename?: 'Regulation'
            documentId: string
            regNumber: string
            slug: string
            titleText?: string | null
            fullTitle: string
            effectiveFrom: any
            category: Enum_Regulation_Category
            isFullTextRegulation: boolean
            mainDocument: {
              __typename?: 'UploadFile'
              documentId: string
              url: string
              name: string
              ext?: string | null
              size: number
              createdAt?: any | null
              updatedAt?: any | null
            }
            attachments: Array<{
              __typename?: 'UploadFile'
              documentId: string
              url: string
              name: string
              ext?: string | null
              size: number
              createdAt?: any | null
              updatedAt?: any | null
            } | null>
            amendments: Array<{
              __typename?: 'Regulation'
              documentId: string
              regNumber: string
              slug: string
              effectiveFrom: any
              isFullTextRegulation: boolean
              attachments: Array<{
                __typename?: 'UploadFile'
                documentId: string
                url: string
                name: string
                ext?: string | null
                size: number
                createdAt?: any | null
                updatedAt?: any | null
              } | null>
            } | null>
            amending: Array<{
              __typename?: 'Regulation'
              documentId: string
              regNumber: string
              slug: string
              effectiveFrom: any
              cancellation?: {
                __typename?: 'Regulation'
                documentId: string
                regNumber: string
                slug: string
                effectiveFrom: any
              } | null
              amending: Array<{
                __typename?: 'Regulation'
                documentId: string
                regNumber: string
                slug: string
                cancellation?: {
                  __typename?: 'Regulation'
                  documentId: string
                  regNumber: string
                  slug: string
                  effectiveFrom: any
                } | null
              } | null>
            } | null>
            cancellation?: {
              __typename?: 'Regulation'
              documentId: string
              regNumber: string
              slug: string
              effectiveFrom: any
            } | null
            cancelling: Array<{
              __typename?: 'Regulation'
              documentId: string
              regNumber: string
              slug: string
              effectiveFrom: any
            } | null>
          } | null>
        }
      | {
          __typename: 'ComponentSectionsStarzLandingPage'
          banner: {
            __typename?: 'ComponentBlocksStarzLandingPageBanner'
            title: string
            content?: string | null
            contentPosition: Enum_Componentblocksstarzlandingpagebanner_Contentposition
            variant: Enum_Componentblocksstarzlandingpagebanner_Variant
            media: {
              __typename?: 'UploadFile'
              documentId: string
              url: string
              width?: number | null
              height?: number | null
              caption?: string | null
              alternativeText?: string | null
              name: string
            }
            primaryLink?: {
              __typename?: 'ComponentBlocksCommonLink'
              label?: string | null
              url?: string | null
              analyticsId?: string | null
              page?: {
                __typename?: 'Page'
                documentId: string
                slug?: string | null
                title: string
                locale?: string | null
              } | null
              article?: {
                __typename: 'Article'
                documentId: string
                slug: string
                title: string
                locale?: string | null
              } | null
            } | null
            secondaryLink?: {
              __typename?: 'ComponentBlocksCommonLink'
              label?: string | null
              url?: string | null
              analyticsId?: string | null
              page?: {
                __typename?: 'Page'
                documentId: string
                slug?: string | null
                title: string
                locale?: string | null
              } | null
              article?: {
                __typename: 'Article'
                documentId: string
                slug: string
                title: string
                locale?: string | null
              } | null
            } | null
            tertiaryLink?: {
              __typename?: 'ComponentBlocksCommonLink'
              label?: string | null
              url?: string | null
              analyticsId?: string | null
              page?: {
                __typename?: 'Page'
                documentId: string
                slug?: string | null
                title: string
                locale?: string | null
              } | null
              article?: {
                __typename: 'Article'
                documentId: string
                slug: string
                title: string
                locale?: string | null
              } | null
            } | null
          }
          cardLinks?: Array<{
            __typename?: 'ComponentBlocksCardLink'
            label?: string | null
            subtext?: string | null
            url?: string | null
            analyticsId?: string | null
            media?: {
              __typename?: 'UploadFile'
              documentId: string
              url: string
              width?: number | null
              height?: number | null
              caption?: string | null
              alternativeText?: string | null
              name: string
            } | null
            page?: {
              __typename?: 'Page'
              documentId: string
              slug?: string | null
              title: string
              locale?: string | null
              pageBackgroundImage?: {
                __typename?: 'UploadFile'
                documentId: string
                url: string
              } | null
            } | null
            article?: {
              __typename: 'Article'
              perex?: string | null
              addedAt: any
              documentId: string
              slug: string
              title: string
              locale?: string | null
              coverMedia?: {
                __typename?: 'UploadFile'
                documentId: string
                url: string
                width?: number | null
                height?: number | null
                caption?: string | null
                alternativeText?: string | null
                name: string
              } | null
              articleCategory?: {
                __typename?: 'ArticleCategory'
                documentId: string
                title: string
                slug: string
              } | null
              tags: Array<{
                __typename?: 'Tag'
                documentId: string
                title: string
                slug: string
                pageCategory?: {
                  __typename?: 'PageCategory'
                  documentId: string
                  title?: string | null
                  color?: Enum_Pagecategory_Color | null
                } | null
              } | null>
            } | null
          } | null> | null
        }
      | {
          __typename: 'ComponentSectionsTextWithImage'
          content?: string | null
          imagePosition: Enum_Componentsectionstextwithimage_Imageposition
          imageAspectRatio?: Enum_Componentsectionstextwithimage_Imageaspectratio | null
          imageSrc: {
            __typename?: 'UploadFile'
            documentId: string
            url: string
            width?: number | null
            height?: number | null
            caption?: string | null
            alternativeText?: string | null
            name: string
          }
          links?: Array<{
            __typename?: 'ComponentBlocksCommonLink'
            label?: string | null
            url?: string | null
            analyticsId?: string | null
            page?: {
              __typename?: 'Page'
              documentId: string
              slug?: string | null
              title: string
              locale?: string | null
            } | null
            article?: {
              __typename: 'Article'
              documentId: string
              slug: string
              title: string
              locale?: string | null
            } | null
          } | null> | null
        }
      | {
          __typename: 'ComponentSectionsTextWithImageOverlapped'
          content?: string | null
          imagePositionTextWithImageOverlapped: Enum_Componentsectionstextwithimageoverlapped_Imageposition
          image: {
            __typename?: 'UploadFile'
            documentId: string
            url: string
            width?: number | null
            height?: number | null
            caption?: string | null
            alternativeText?: string | null
            name: string
          }
          links?: Array<{
            __typename?: 'ComponentBlocksCommonLink'
            label?: string | null
            url?: string | null
            analyticsId?: string | null
            page?: {
              __typename?: 'Page'
              documentId: string
              slug?: string | null
              title: string
              locale?: string | null
            } | null
            article?: {
              __typename: 'Article'
              documentId: string
              slug: string
              title: string
              locale?: string | null
            } | null
          } | null> | null
        }
      | {
          __typename: 'ComponentSectionsTootootEvents'
          title?: string | null
          text?: string | null
          showMoreLink?: {
            __typename?: 'ComponentBlocksCommonLink'
            label?: string | null
            url?: string | null
            analyticsId?: string | null
            page?: {
              __typename?: 'Page'
              documentId: string
              slug?: string | null
              title: string
              locale?: string | null
            } | null
            article?: {
              __typename: 'Article'
              documentId: string
              slug: string
              title: string
              locale?: string | null
            } | null
          } | null
        }
      | {
          __typename: 'ComponentSectionsVideos'
          id: string
          title?: string | null
          subtitle?: string | null
          titleLevelVideosSection?: Enum_Componentsectionsvideos_Titlelevel | null
          videos?: Array<{
            __typename?: 'ComponentBlocksVideo'
            id: string
            title?: string | null
            speaker?: string | null
            url: string
          } | null> | null
        }
      | { __typename: 'Error' }
      | null
    > | null
    sidebar?: Array<
      { __typename: 'ComponentSidebarsEmptySidebar' } | { __typename?: 'Error' } | null
    > | null
    localizations: Array<{
      __typename?: 'Page'
      slug?: string | null
      locale?: string | null
    } | null>
    relatedContents: Array<{
      __typename?: 'Tag'
      documentId: string
      title: string
      slug: string
      pageCategory?: {
        __typename?: 'PageCategory'
        documentId: string
        title?: string | null
        color?: Enum_Pagecategory_Color | null
      } | null
    } | null>
    pageBackgroundImage?: { __typename?: 'UploadFile'; documentId: string; url: string } | null
    parentPage?: {
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      locale?: string | null
      title: string
      parentPage?: {
        __typename?: 'Page'
        documentId: string
        slug?: string | null
        locale?: string | null
        title: string
        parentPage?: {
          __typename?: 'Page'
          documentId: string
          slug?: string | null
          locale?: string | null
          title: string
          parentPage?: {
            __typename?: 'Page'
            documentId: string
            slug?: string | null
            locale?: string | null
            title: string
          } | null
        } | null
      } | null
    } | null
  } | null>
}

export type UpdatePageMutationVariables = Exact<{
  documentId: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  pageInput: PageInput
}>

export type UpdatePageMutation = {
  __typename?: 'Mutation'
  updatePage?: { __typename?: 'Page'; documentId: string } | null
}

export type AllRegulationsQueryVariables = Exact<{ [key: string]: never }>

export type AllRegulationsQuery = {
  __typename?: 'Query'
  regulations: Array<{
    __typename?: 'Regulation'
    documentId: string
    regNumber: string
    slug: string
    titleText?: string | null
    fullTitle: string
    effectiveFrom: any
    category: Enum_Regulation_Category
    isFullTextRegulation: boolean
    mainDocument: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      name: string
      ext?: string | null
      size: number
      createdAt?: any | null
      updatedAt?: any | null
    }
    attachments: Array<{
      __typename?: 'UploadFile'
      documentId: string
      url: string
      name: string
      ext?: string | null
      size: number
      createdAt?: any | null
      updatedAt?: any | null
    } | null>
    amendments: Array<{
      __typename?: 'Regulation'
      documentId: string
      regNumber: string
      slug: string
      effectiveFrom: any
      isFullTextRegulation: boolean
      attachments: Array<{
        __typename?: 'UploadFile'
        documentId: string
        url: string
        name: string
        ext?: string | null
        size: number
        createdAt?: any | null
        updatedAt?: any | null
      } | null>
    } | null>
    amending: Array<{
      __typename?: 'Regulation'
      documentId: string
      regNumber: string
      slug: string
      effectiveFrom: any
      cancellation?: {
        __typename?: 'Regulation'
        documentId: string
        regNumber: string
        slug: string
        effectiveFrom: any
      } | null
      amending: Array<{
        __typename?: 'Regulation'
        documentId: string
        regNumber: string
        slug: string
        cancellation?: {
          __typename?: 'Regulation'
          documentId: string
          regNumber: string
          slug: string
          effectiveFrom: any
        } | null
      } | null>
    } | null>
    cancellation?: {
      __typename?: 'Regulation'
      documentId: string
      regNumber: string
      slug: string
      effectiveFrom: any
    } | null
    cancelling: Array<{
      __typename?: 'Regulation'
      documentId: string
      regNumber: string
      slug: string
      effectiveFrom: any
    } | null>
  } | null>
}

export type RegulationsStaticPathsQueryVariables = Exact<{ [key: string]: never }>

export type RegulationsStaticPathsQuery = {
  __typename?: 'Query'
  regulations: Array<{ __typename?: 'Regulation'; documentId: string; slug: string } | null>
}

export type RegulationByIdQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type RegulationByIdQuery = {
  __typename?: 'Query'
  regulation?: {
    __typename?: 'Regulation'
    documentId: string
    regNumber: string
    slug: string
    titleText?: string | null
    fullTitle: string
    effectiveFrom: any
    category: Enum_Regulation_Category
    isFullTextRegulation: boolean
    mainDocument: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      name: string
      ext?: string | null
      size: number
      createdAt?: any | null
      updatedAt?: any | null
    }
    attachments: Array<{
      __typename?: 'UploadFile'
      documentId: string
      url: string
      name: string
      ext?: string | null
      size: number
      createdAt?: any | null
      updatedAt?: any | null
    } | null>
    amendments: Array<{
      __typename?: 'Regulation'
      documentId: string
      regNumber: string
      slug: string
      effectiveFrom: any
      isFullTextRegulation: boolean
      attachments: Array<{
        __typename?: 'UploadFile'
        documentId: string
        url: string
        name: string
        ext?: string | null
        size: number
        createdAt?: any | null
        updatedAt?: any | null
      } | null>
    } | null>
    amending: Array<{
      __typename?: 'Regulation'
      documentId: string
      regNumber: string
      slug: string
      effectiveFrom: any
      cancellation?: {
        __typename?: 'Regulation'
        documentId: string
        regNumber: string
        slug: string
        effectiveFrom: any
      } | null
      amending: Array<{
        __typename?: 'Regulation'
        documentId: string
        regNumber: string
        slug: string
        cancellation?: {
          __typename?: 'Regulation'
          documentId: string
          regNumber: string
          slug: string
          effectiveFrom: any
        } | null
      } | null>
    } | null>
    cancellation?: {
      __typename?: 'Regulation'
      documentId: string
      regNumber: string
      slug: string
      effectiveFrom: any
    } | null
    cancelling: Array<{
      __typename?: 'Regulation'
      documentId: string
      regNumber: string
      slug: string
      effectiveFrom: any
    } | null>
  } | null
}

export type RegulationBySlugQueryVariables = Exact<{
  slug?: InputMaybe<Scalars['String']['input']>
}>

export type RegulationBySlugQuery = {
  __typename?: 'Query'
  regulations: Array<{
    __typename?: 'Regulation'
    documentId: string
    regNumber: string
    slug: string
    titleText?: string | null
    fullTitle: string
    effectiveFrom: any
    category: Enum_Regulation_Category
    isFullTextRegulation: boolean
    mainDocument: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      name: string
      ext?: string | null
      size: number
      createdAt?: any | null
      updatedAt?: any | null
    }
    attachments: Array<{
      __typename?: 'UploadFile'
      documentId: string
      url: string
      name: string
      ext?: string | null
      size: number
      createdAt?: any | null
      updatedAt?: any | null
    } | null>
    amendments: Array<{
      __typename?: 'Regulation'
      documentId: string
      regNumber: string
      slug: string
      effectiveFrom: any
      isFullTextRegulation: boolean
      attachments: Array<{
        __typename?: 'UploadFile'
        documentId: string
        url: string
        name: string
        ext?: string | null
        size: number
        createdAt?: any | null
        updatedAt?: any | null
      } | null>
    } | null>
    amending: Array<{
      __typename?: 'Regulation'
      documentId: string
      regNumber: string
      slug: string
      effectiveFrom: any
      cancellation?: {
        __typename?: 'Regulation'
        documentId: string
        regNumber: string
        slug: string
        effectiveFrom: any
      } | null
      amending: Array<{
        __typename?: 'Regulation'
        documentId: string
        regNumber: string
        slug: string
        cancellation?: {
          __typename?: 'Regulation'
          documentId: string
          regNumber: string
          slug: string
          effectiveFrom: any
        } | null
      } | null>
    } | null>
    cancellation?: {
      __typename?: 'Regulation'
      documentId: string
      regNumber: string
      slug: string
      effectiveFrom: any
    } | null
    cancelling: Array<{
      __typename?: 'Regulation'
      documentId: string
      regNumber: string
      slug: string
      effectiveFrom: any
    } | null>
  } | null>
}

export type RegulationByYearQueryVariables = Exact<{
  year?: InputMaybe<Scalars['String']['input']>
}>

export type RegulationByYearQuery = {
  __typename?: 'Query'
  regulations: Array<{
    __typename?: 'Regulation'
    documentId: string
    regNumber: string
    slug: string
    titleText?: string | null
    fullTitle: string
    effectiveFrom: any
    category: Enum_Regulation_Category
    isFullTextRegulation: boolean
    mainDocument: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      name: string
      ext?: string | null
      size: number
      createdAt?: any | null
      updatedAt?: any | null
    }
    attachments: Array<{
      __typename?: 'UploadFile'
      documentId: string
      url: string
      name: string
      ext?: string | null
      size: number
      createdAt?: any | null
      updatedAt?: any | null
    } | null>
    amendments: Array<{
      __typename?: 'Regulation'
      documentId: string
      regNumber: string
      slug: string
      effectiveFrom: any
      isFullTextRegulation: boolean
      attachments: Array<{
        __typename?: 'UploadFile'
        documentId: string
        url: string
        name: string
        ext?: string | null
        size: number
        createdAt?: any | null
        updatedAt?: any | null
      } | null>
    } | null>
    amending: Array<{
      __typename?: 'Regulation'
      documentId: string
      regNumber: string
      slug: string
      effectiveFrom: any
      cancellation?: {
        __typename?: 'Regulation'
        documentId: string
        regNumber: string
        slug: string
        effectiveFrom: any
      } | null
      amending: Array<{
        __typename?: 'Regulation'
        documentId: string
        regNumber: string
        slug: string
        cancellation?: {
          __typename?: 'Regulation'
          documentId: string
          regNumber: string
          slug: string
          effectiveFrom: any
        } | null
      } | null>
    } | null>
    cancellation?: {
      __typename?: 'Regulation'
      documentId: string
      regNumber: string
      slug: string
      effectiveFrom: any
    } | null
    cancelling: Array<{
      __typename?: 'Regulation'
      documentId: string
      regNumber: string
      slug: string
      effectiveFrom: any
    } | null>
  } | null>
}

export type SetFullTitleToRegulationMutationVariables = Exact<{
  regulationId: Scalars['ID']['input']
  fullTitle?: InputMaybe<Scalars['String']['input']>
}>

export type SetFullTitleToRegulationMutation = {
  __typename?: 'Mutation'
  updateRegulation?: { __typename?: 'Regulation'; documentId: string } | null
}

export type SetCancellationToRegulationMutationVariables = Exact<{
  regulationId: Scalars['ID']['input']
  cancellationId: Scalars['ID']['input']
}>

export type SetCancellationToRegulationMutation = {
  __typename?: 'Mutation'
  updateRegulation?: { __typename?: 'Regulation'; documentId: string } | null
}

export type SetAmendmentsToRegulationMutationVariables = Exact<{
  regulationId: Scalars['ID']['input']
  amendmentsIds?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>
}>

export type SetAmendmentsToRegulationMutation = {
  __typename?: 'Mutation'
  updateRegulation?: { __typename?: 'Regulation'; documentId: string } | null
}

export type DeleteRegulationByIdMutationVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type DeleteRegulationByIdMutation = {
  __typename?: 'Mutation'
  deleteRegulation?: { __typename?: 'DeleteMutationResponse'; documentId: string } | null
}

export type CreateBareRegulationMutationVariables = Exact<{
  regNumber: Scalars['String']['input']
  slug: Scalars['String']['input']
  titleText?: InputMaybe<Scalars['String']['input']>
  fullTitle?: InputMaybe<Scalars['String']['input']>
  effectiveFrom: Scalars['Date']['input']
  category?: InputMaybe<Enum_Regulation_Category>
  isFullTextRegulation?: InputMaybe<Scalars['Boolean']['input']>
  mainDocumentId?: InputMaybe<Scalars['ID']['input']>
  attachmentsIds?: InputMaybe<
    Array<InputMaybe<Scalars['ID']['input']>> | InputMaybe<Scalars['ID']['input']>
  >
}>

export type CreateBareRegulationMutation = {
  __typename?: 'Mutation'
  createRegulation?: { __typename?: 'Regulation'; documentId: string; regNumber: string } | null
}

export type RegulationEntityFragment = {
  __typename?: 'Regulation'
  documentId: string
  regNumber: string
  slug: string
  titleText?: string | null
  fullTitle: string
  effectiveFrom: any
  category: Enum_Regulation_Category
  isFullTextRegulation: boolean
  mainDocument: {
    __typename?: 'UploadFile'
    documentId: string
    url: string
    name: string
    ext?: string | null
    size: number
    createdAt?: any | null
    updatedAt?: any | null
  }
  attachments: Array<{
    __typename?: 'UploadFile'
    documentId: string
    url: string
    name: string
    ext?: string | null
    size: number
    createdAt?: any | null
    updatedAt?: any | null
  } | null>
  amendments: Array<{
    __typename?: 'Regulation'
    documentId: string
    regNumber: string
    slug: string
    effectiveFrom: any
    isFullTextRegulation: boolean
    attachments: Array<{
      __typename?: 'UploadFile'
      documentId: string
      url: string
      name: string
      ext?: string | null
      size: number
      createdAt?: any | null
      updatedAt?: any | null
    } | null>
  } | null>
  amending: Array<{
    __typename?: 'Regulation'
    documentId: string
    regNumber: string
    slug: string
    effectiveFrom: any
    cancellation?: {
      __typename?: 'Regulation'
      documentId: string
      regNumber: string
      slug: string
      effectiveFrom: any
    } | null
    amending: Array<{
      __typename?: 'Regulation'
      documentId: string
      regNumber: string
      slug: string
      cancellation?: {
        __typename?: 'Regulation'
        documentId: string
        regNumber: string
        slug: string
        effectiveFrom: any
      } | null
    } | null>
  } | null>
  cancellation?: {
    __typename?: 'Regulation'
    documentId: string
    regNumber: string
    slug: string
    effectiveFrom: any
  } | null
  cancelling: Array<{
    __typename?: 'Regulation'
    documentId: string
    regNumber: string
    slug: string
    effectiveFrom: any
  } | null>
}

export type SubnavigationSectionFragment = {
  __typename?: 'ComponentSectionsSubnavigation'
  links?: Array<{
    __typename?: 'ComponentBlocksSubnavigationLink'
    id: string
    label?: string | null
    subtext?: string | null
    url?: string | null
    analyticsId?: string | null
    page?: {
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      title: string
      locale?: string | null
    } | null
  } | null> | null
}

export type SubnavigationLinkFragment = {
  __typename?: 'ComponentBlocksSubnavigationLink'
  label?: string | null
  subtext?: string | null
  url?: string | null
  analyticsId?: string | null
  page?: {
    __typename?: 'Page'
    documentId: string
    slug?: string | null
    title: string
    locale?: string | null
  } | null
}

export type GallerySectionFragment = {
  __typename?: 'ComponentSectionsGallery'
  title?: string | null
  text?: string | null
  titleLevelGallerySection?: Enum_Componentsectionsgallery_Titlelevel | null
  medias: Array<{
    __typename?: 'UploadFile'
    documentId: string
    url: string
    width?: number | null
    height?: number | null
    caption?: string | null
    alternativeText?: string | null
    name: string
  } | null>
}

export type ArticlesSectionFragment = {
  __typename?: 'ComponentSectionsArticles'
  title?: string | null
  text?: string | null
  showAll?: boolean | null
  articles: Array<{
    __typename: 'Article'
    perex?: string | null
    addedAt: any
    documentId: string
    slug: string
    title: string
    locale?: string | null
    coverMedia?: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      width?: number | null
      height?: number | null
      caption?: string | null
      alternativeText?: string | null
      name: string
    } | null
    articleCategory?: {
      __typename?: 'ArticleCategory'
      documentId: string
      title: string
      slug: string
    } | null
    tags: Array<{
      __typename?: 'Tag'
      documentId: string
      title: string
      slug: string
      pageCategory?: {
        __typename?: 'PageCategory'
        documentId: string
        title?: string | null
        color?: Enum_Pagecategory_Color | null
      } | null
    } | null>
  } | null>
  category?: {
    __typename?: 'PageCategory'
    documentId: string
    title?: string | null
    color?: Enum_Pagecategory_Color | null
  } | null
  articleCategories: Array<{
    __typename?: 'ArticleCategory'
    documentId: string
    title: string
    slug: string
  } | null>
  tags: Array<{
    __typename?: 'Tag'
    documentId: string
    title: string
    slug: string
    pageCategory?: {
      __typename?: 'PageCategory'
      documentId: string
      title?: string | null
      color?: Enum_Pagecategory_Color | null
    } | null
  } | null>
  adminGroups: Array<{
    __typename?: 'AdminGroup'
    documentId: string
    slug: string
    title: string
    adminGroupId?: string | null
  } | null>
  showMoreLink?: {
    __typename?: 'ComponentBlocksCommonLink'
    label?: string | null
    url?: string | null
    analyticsId?: string | null
    page?: {
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      title: string
      locale?: string | null
    } | null
    article?: {
      __typename: 'Article'
      documentId: string
      slug: string
      title: string
      locale?: string | null
    } | null
  } | null
}

export type InbaReleasesSectionFragment = {
  __typename?: 'ComponentSectionsInbaReleases'
  title?: string | null
  text?: string | null
  variantInbaReleasesSection?: Enum_Componentsectionsinbareleases_Variant | null
  showMoreLink?: {
    __typename?: 'ComponentBlocksCommonLink'
    label?: string | null
    url?: string | null
    analyticsId?: string | null
    page?: {
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      title: string
      locale?: string | null
    } | null
    article?: {
      __typename: 'Article'
      documentId: string
      slug: string
      title: string
      locale?: string | null
    } | null
  } | null
}

export type DividerSectionFragment = {
  __typename?: 'ComponentSectionsDivider'
  style?: Enum_Componentsectionsdivider_Style | null
}

export type TextWithImageSectionFragment = {
  __typename?: 'ComponentSectionsTextWithImage'
  content?: string | null
  imagePosition: Enum_Componentsectionstextwithimage_Imageposition
  imageAspectRatio?: Enum_Componentsectionstextwithimage_Imageaspectratio | null
  imageSrc: {
    __typename?: 'UploadFile'
    documentId: string
    url: string
    width?: number | null
    height?: number | null
    caption?: string | null
    alternativeText?: string | null
    name: string
  }
  links?: Array<{
    __typename?: 'ComponentBlocksCommonLink'
    label?: string | null
    url?: string | null
    analyticsId?: string | null
    page?: {
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      title: string
      locale?: string | null
    } | null
    article?: {
      __typename: 'Article'
      documentId: string
      slug: string
      title: string
      locale?: string | null
    } | null
  } | null> | null
}

export type TextWithImageOverlappedSectionFragment = {
  __typename?: 'ComponentSectionsTextWithImageOverlapped'
  content?: string | null
  imagePositionTextWithImageOverlapped: Enum_Componentsectionstextwithimageoverlapped_Imageposition
  image: {
    __typename?: 'UploadFile'
    documentId: string
    url: string
    width?: number | null
    height?: number | null
    caption?: string | null
    alternativeText?: string | null
    name: string
  }
  links?: Array<{
    __typename?: 'ComponentBlocksCommonLink'
    label?: string | null
    url?: string | null
    analyticsId?: string | null
    page?: {
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      title: string
      locale?: string | null
    } | null
    article?: {
      __typename: 'Article'
      documentId: string
      slug: string
      title: string
      locale?: string | null
    } | null
  } | null> | null
}

export type IframeSectionFragment = {
  __typename?: 'ComponentSectionsIframe'
  title?: string | null
  text?: string | null
  url: string
  iframeTitle?: string | null
  iframeHeight: string
  hasBorder?: boolean | null
  allowGeolocation?: boolean | null
  titleLevelIframeSection?: Enum_Componentsectionsiframe_Titlelevel | null
}

export type FileBlockFragment = {
  __typename?: 'ComponentBlocksFile'
  id: string
  title?: string | null
  media?: {
    __typename?: 'UploadFile'
    documentId: string
    url: string
    name: string
    ext?: string | null
    size: number
    createdAt?: any | null
    updatedAt?: any | null
  } | null
}

export type FileListSectionFragment = {
  __typename?: 'ComponentSectionsFileList'
  title?: string | null
  text?: string | null
  titleLevelFileListSection?: Enum_Componentsectionsfilelist_Titlelevel | null
  fileList?: Array<{
    __typename?: 'ComponentBlocksFile'
    id: string
    title?: string | null
    media?: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      name: string
      ext?: string | null
      size: number
      createdAt?: any | null
      updatedAt?: any | null
    } | null
  } | null> | null
}

export type FileItemBlockFragment = {
  __typename?: 'ComponentBlocksFileItem'
  id: string
  title?: string | null
  media: {
    __typename?: 'UploadFile'
    documentId: string
    url: string
    name: string
    ext?: string | null
    size: number
    createdAt?: any | null
    updatedAt?: any | null
  }
}

export type ColumnedTextSectionFragment = {
  __typename?: 'ComponentSectionsColumnedText'
  title?: string | null
  content?: string | null
}

export type ColumnsItemFragment = {
  __typename?: 'ComponentBlocksColumnsItem'
  title?: string | null
  text?: string | null
  image?: {
    __typename?: 'UploadFile'
    documentId: string
    url: string
    width?: number | null
    height?: number | null
    caption?: string | null
    alternativeText?: string | null
    name: string
  } | null
}

export type ColumnsSectionFragment = {
  __typename?: 'ComponentSectionsColumns'
  title?: string | null
  text?: string | null
  imageVariant: Enum_Componentsectionscolumns_Imagevariant
  responsiveLayout: Enum_Componentsectionscolumns_Responsivelayout
  columns: Array<{
    __typename?: 'ComponentBlocksColumnsItem'
    title?: string | null
    text?: string | null
    image?: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      width?: number | null
      height?: number | null
      caption?: string | null
      alternativeText?: string | null
      name: string
    } | null
  } | null>
}

export type NarrowTextSectionFragment = {
  __typename?: 'ComponentSectionsNarrowText'
  content?: string | null
  width?: Enum_Componentsectionsnarrowtext_Width | null
}

export type LinksSectionFragment = {
  __typename?: 'ComponentSectionsLinks'
  title?: string | null
  titleLevelLinksSection?: Enum_Componentsectionslinks_Titlelevel | null
  pageLinks?: Array<{
    __typename?: 'ComponentBlocksPageLink'
    url?: string | null
    analyticsId?: string | null
    label?: string | null
    page?: {
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      title: string
      locale?: string | null
    } | null
  } | null> | null
}

export type ComponentAccordionItemsFlatTextFragment = {
  __typename?: 'ComponentAccordionItemsFlatText'
  category?: string | null
  content?: string | null
  moreLinkTitle?: string | null
  moreLinkUrl?: string | null
  moreLinkPage?: {
    __typename?: 'Page'
    documentId: string
    slug?: string | null
    title: string
    locale?: string | null
  } | null
  fileList?: Array<{
    __typename?: 'ComponentBlocksFileItem'
    id: string
    title?: string | null
    media: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      name: string
      ext?: string | null
      size: number
      createdAt?: any | null
      updatedAt?: any | null
    }
  } | null> | null
}

export type ComponentAccordionItemsInstitutionFragment = {
  __typename?: 'ComponentAccordionItemsInstitution'
  title?: string | null
  subtitle?: string | null
  category?: string | null
  firstColumn?: string | null
  secondColumn?: string | null
  thirdColumn?: string | null
  url?: string | null
  urlLabel?: string | null
}

export type AccordionSectionFragment = {
  __typename?: 'ComponentSectionsAccordion'
  title?: string | null
  titleLevelAccordionSection?: Enum_Componentsectionsaccordion_Titlelevel | null
  institutions?: Array<{
    __typename?: 'ComponentAccordionItemsInstitution'
    title?: string | null
    subtitle?: string | null
    category?: string | null
    firstColumn?: string | null
    secondColumn?: string | null
    thirdColumn?: string | null
    url?: string | null
    urlLabel?: string | null
  } | null> | null
  flatText?: Array<{
    __typename?: 'ComponentAccordionItemsFlatText'
    category?: string | null
    content?: string | null
    moreLinkTitle?: string | null
    moreLinkUrl?: string | null
    moreLinkPage?: {
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      title: string
      locale?: string | null
    } | null
    fileList?: Array<{
      __typename?: 'ComponentBlocksFileItem'
      id: string
      title?: string | null
      media: {
        __typename?: 'UploadFile'
        documentId: string
        url: string
        name: string
        ext?: string | null
        size: number
        createdAt?: any | null
        updatedAt?: any | null
      }
    } | null> | null
  } | null> | null
}

export type VideoBlockFragment = {
  __typename?: 'ComponentBlocksVideo'
  id: string
  title?: string | null
  speaker?: string | null
  url: string
}

export type VideosSectionFragment = {
  __typename?: 'ComponentSectionsVideos'
  id: string
  title?: string | null
  subtitle?: string | null
  titleLevelVideosSection?: Enum_Componentsectionsvideos_Titlelevel | null
  videos?: Array<{
    __typename?: 'ComponentBlocksVideo'
    id: string
    title?: string | null
    speaker?: string | null
    url: string
  } | null> | null
}

export type NumericalListItemBlockFragment = {
  __typename?: 'ComponentBlocksNumericalListItem'
  text?: string | null
}

export type NumericalListSectionFragment = {
  __typename?: 'ComponentSectionsNumericalList'
  id: string
  title?: string | null
  text?: string | null
  variant: Enum_Componentsectionsnumericallist_Variant
  items?: Array<{
    __typename?: 'ComponentBlocksNumericalListItem'
    text?: string | null
  } | null> | null
}

export type OrganizationalStructureSectionFragment = {
  __typename?: 'ComponentSectionsOrganizationalStructure'
  title?: string | null
}

export type ProsAndConsCardComponentFragment = {
  __typename?: 'ComponentBlocksProsAndConsCard'
  title: string
  items: Array<{ __typename?: 'ComponentBlocksComparisonItem'; label: string } | null>
}

export type ProsAndConsSectionFragment = {
  __typename?: 'ComponentSectionsProsAndConsSection'
  title?: string | null
  text?: string | null
  textAlignProsAndCons: Enum_Componentsectionsprosandconssection_Textalign
  pros: {
    __typename?: 'ComponentBlocksProsAndConsCard'
    title: string
    items: Array<{ __typename?: 'ComponentBlocksComparisonItem'; label: string } | null>
  }
  cons: {
    __typename?: 'ComponentBlocksProsAndConsCard'
    title: string
    items: Array<{ __typename?: 'ComponentBlocksComparisonItem'; label: string } | null>
  }
}

export type ComparisonCardComponentFragment = {
  __typename?: 'ComponentBlocksComparisonCard'
  title: string
  items: Array<{ __typename?: 'ComponentBlocksComparisonItem'; label: string } | null>
  iconMedia?: { __typename?: 'UploadFile'; url: string } | null
}

export type ComparisonSectionFragment = {
  __typename?: 'ComponentSectionsComparisonSection'
  title?: string | null
  text?: string | null
  textAlignComparison: Enum_Componentsectionscomparisonsection_Textalign
  cards: Array<{
    __typename?: 'ComponentBlocksComparisonCard'
    title: string
    items: Array<{ __typename?: 'ComponentBlocksComparisonItem'; label: string } | null>
    iconMedia?: { __typename?: 'UploadFile'; url: string } | null
  } | null>
}

export type BannerSectionFragment = {
  __typename?: 'ComponentSectionsBanner'
  content?: string | null
  contentPosition: Enum_Componentsectionsbanner_Contentposition
  bannerTitle: string
  bannerVariant: Enum_Componentsectionsbanner_Variant
  media: { __typename?: 'UploadFile'; url: string }
  primaryLink?: {
    __typename?: 'ComponentBlocksCommonLink'
    label?: string | null
    url?: string | null
    analyticsId?: string | null
    page?: {
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      title: string
      locale?: string | null
    } | null
    article?: {
      __typename: 'Article'
      documentId: string
      slug: string
      title: string
      locale?: string | null
    } | null
  } | null
  secondaryLink?: {
    __typename?: 'ComponentBlocksCommonLink'
    label?: string | null
    url?: string | null
    analyticsId?: string | null
    page?: {
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      title: string
      locale?: string | null
    } | null
    article?: {
      __typename: 'Article'
      documentId: string
      slug: string
      title: string
      locale?: string | null
    } | null
  } | null
  tertiaryLink?: {
    __typename?: 'ComponentBlocksCommonLink'
    label?: string | null
    url?: string | null
    analyticsId?: string | null
    page?: {
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      title: string
      locale?: string | null
    } | null
    article?: {
      __typename: 'Article'
      documentId: string
      slug: string
      title: string
      locale?: string | null
    } | null
  } | null
}

export type ContactCardBlockFragment = {
  __typename?: 'ComponentBlocksContactCard'
  overrideLabel?: string | null
  value: string
}

export type ContactPersonCardBlockFragment = {
  __typename?: 'ComponentBlocksContactPersonCard'
  title: string
  subtext?: string | null
  email?: string | null
  phone?: string | null
}

export type ContactDirectionsCardBlockFragment = {
  __typename?: 'ComponentBlocksContactDirectionsCard'
  overrideLabel?: string | null
  address: string
  parkingInfo?: string | null
  publicTransportInfo?: string | null
  barrierFreeInfo?: string | null
  iframeUrl?: string | null
}

export type ContactsSectionFragment = {
  __typename?: 'ComponentSectionsContactsSection'
  id: string
  title?: string | null
  description?: string | null
  titleLevelContactsSection?: Enum_Componentsectionscontactssection_Titlelevel | null
  addressContacts?: Array<{
    __typename?: 'ComponentBlocksContactCard'
    overrideLabel?: string | null
    value: string
  } | null> | null
  openingHoursContacts?: Array<{
    __typename?: 'ComponentBlocksContactCard'
    overrideLabel?: string | null
    value: string
  } | null> | null
  emailContacts?: Array<{
    __typename?: 'ComponentBlocksContactCard'
    overrideLabel?: string | null
    value: string
  } | null> | null
  phoneContacts?: Array<{
    __typename?: 'ComponentBlocksContactCard'
    overrideLabel?: string | null
    value: string
  } | null> | null
  webContacts?: Array<{
    __typename?: 'ComponentBlocksContactCard'
    overrideLabel?: string | null
    value: string
  } | null> | null
  postalAddressContacts?: Array<{
    __typename?: 'ComponentBlocksContactCard'
    overrideLabel?: string | null
    value: string
  } | null> | null
  billingInfoContacts?: Array<{
    __typename?: 'ComponentBlocksContactCard'
    overrideLabel?: string | null
    value: string
  } | null> | null
  bankConnectionContacts?: Array<{
    __typename?: 'ComponentBlocksContactCard'
    overrideLabel?: string | null
    value: string
  } | null> | null
  personContacts?: Array<{
    __typename?: 'ComponentBlocksContactPersonCard'
    title: string
    subtext?: string | null
    email?: string | null
    phone?: string | null
  } | null> | null
  directionsContact?: {
    __typename?: 'ComponentBlocksContactDirectionsCard'
    overrideLabel?: string | null
    address: string
    parkingInfo?: string | null
    publicTransportInfo?: string | null
    barrierFreeInfo?: string | null
    iframeUrl?: string | null
  } | null
}

export type RegulationsSectionFragment = {
  __typename?: 'ComponentSectionsRegulations'
  showAll?: boolean | null
  regulations: Array<{
    __typename?: 'Regulation'
    documentId: string
    regNumber: string
    slug: string
    titleText?: string | null
    fullTitle: string
    effectiveFrom: any
    category: Enum_Regulation_Category
    isFullTextRegulation: boolean
    mainDocument: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      name: string
      ext?: string | null
      size: number
      createdAt?: any | null
      updatedAt?: any | null
    }
    attachments: Array<{
      __typename?: 'UploadFile'
      documentId: string
      url: string
      name: string
      ext?: string | null
      size: number
      createdAt?: any | null
      updatedAt?: any | null
    } | null>
    amendments: Array<{
      __typename?: 'Regulation'
      documentId: string
      regNumber: string
      slug: string
      effectiveFrom: any
      isFullTextRegulation: boolean
      attachments: Array<{
        __typename?: 'UploadFile'
        documentId: string
        url: string
        name: string
        ext?: string | null
        size: number
        createdAt?: any | null
        updatedAt?: any | null
      } | null>
    } | null>
    amending: Array<{
      __typename?: 'Regulation'
      documentId: string
      regNumber: string
      slug: string
      effectiveFrom: any
      cancellation?: {
        __typename?: 'Regulation'
        documentId: string
        regNumber: string
        slug: string
        effectiveFrom: any
      } | null
      amending: Array<{
        __typename?: 'Regulation'
        documentId: string
        regNumber: string
        slug: string
        cancellation?: {
          __typename?: 'Regulation'
          documentId: string
          regNumber: string
          slug: string
          effectiveFrom: any
        } | null
      } | null>
    } | null>
    cancellation?: {
      __typename?: 'Regulation'
      documentId: string
      regNumber: string
      slug: string
      effectiveFrom: any
    } | null
    cancelling: Array<{
      __typename?: 'Regulation'
      documentId: string
      regNumber: string
      slug: string
      effectiveFrom: any
    } | null>
  } | null>
}

export type FaqsSectionFragment = {
  __typename?: 'ComponentSectionsFaqs'
  title?: string | null
  text?: string | null
  titleLevelFaqsSection?: Enum_Componentsectionsfaqs_Titlelevel | null
  faqs: Array<{
    __typename?: 'Faq'
    documentId: string
    title: string
    body?: string | null
  } | null>
}

export type FaqCategoriesSectionFragment = {
  __typename?: 'ComponentSectionsFaqCategories'
  id: string
  title?: string | null
  text?: string | null
  faqCategories: Array<{
    __typename?: 'FaqCategory'
    documentId: string
    title: string
    slug: string
    faqs: Array<{
      __typename?: 'Faq'
      documentId: string
      title: string
      body?: string | null
    } | null>
  } | null>
}

export type TootootEventsSectionFragment = {
  __typename?: 'ComponentSectionsTootootEvents'
  title?: string | null
  text?: string | null
  showMoreLink?: {
    __typename?: 'ComponentBlocksCommonLink'
    label?: string | null
    url?: string | null
    analyticsId?: string | null
    page?: {
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      title: string
      locale?: string | null
    } | null
    article?: {
      __typename: 'Article'
      documentId: string
      slug: string
      title: string
      locale?: string | null
    } | null
  } | null
}

export type PartnerBlockFragment = {
  __typename?: 'ComponentBlocksPartner'
  title: string
  url?: string | null
  logo: {
    __typename?: 'UploadFile'
    documentId: string
    url: string
    width?: number | null
    height?: number | null
    caption?: string | null
    alternativeText?: string | null
    name: string
  }
}

export type PartnersSectionFragment = {
  __typename?: 'ComponentSectionsPartners'
  title?: string | null
  text?: string | null
  logoRatio: Enum_Componentsectionspartners_Logoratio
  titleLevelPartnersSection?: Enum_Componentsectionspartners_Titlelevel | null
  partners: Array<{
    __typename?: 'ComponentBlocksPartner'
    title: string
    url?: string | null
    logo: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      width?: number | null
      height?: number | null
      caption?: string | null
      alternativeText?: string | null
      name: string
    }
  } | null>
}

export type DocumentsSectionFragment = {
  __typename?: 'ComponentSectionsDocuments'
  title?: string | null
  text?: string | null
  showAll?: boolean | null
  titleLevelDocumentsSection?: Enum_Componentsectionsdocuments_Titlelevel | null
  documents: Array<{
    __typename: 'Document'
    publishedAt?: any | null
    updatedAt?: any | null
    description?: string | null
    documentId: string
    slug: string
    title: string
    documentCategory?: {
      __typename?: 'DocumentCategory'
      documentId: string
      title: string
      slug: string
    } | null
    files: Array<{
      __typename?: 'UploadFile'
      documentId: string
      url: string
      name: string
      ext?: string | null
      size: number
      createdAt?: any | null
      updatedAt?: any | null
    } | null>
  } | null>
}

export type NumbersOverviewItemBlockFragment = {
  __typename?: 'ComponentBlocksNumbersOverviewItem'
  id: string
  number: string
  text: string
}

export type NumbersOverviewSectionFragment = {
  __typename?: 'ComponentSectionsNumbersOverview'
  title?: string | null
  text?: string | null
  showMoreLink?: {
    __typename?: 'ComponentBlocksCommonLink'
    label?: string | null
    url?: string | null
    analyticsId?: string | null
    page?: {
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      title: string
      locale?: string | null
    } | null
    article?: {
      __typename: 'Article'
      documentId: string
      slug: string
      title: string
      locale?: string | null
    } | null
  } | null
  numbersOverviewItems?: Array<{
    __typename?: 'ComponentBlocksNumbersOverviewItem'
    id: string
    number: string
    text: string
  } | null> | null
}

export type EventsSectionFragment = {
  __typename?: 'ComponentSectionsEvents'
  title?: string | null
  text?: string | null
  titleLevelEventsSection?: Enum_Componentsectionsevents_Titlelevel | null
  eventPages: Array<{
    __typename?: 'Page'
    documentId: string
    slug?: string | null
    title: string
    locale?: string | null
    pageHeaderSections?: Array<
      | { __typename: 'ComponentHeaderSectionsEvent'; date?: any | null; address?: string | null }
      | {
          __typename: 'ComponentHeaderSectionsFacility'
          address?: string | null
          navigateToLink?: string | null
          media: Array<{
            __typename?: 'UploadFile'
            documentId: string
            url: string
            width?: number | null
            height?: number | null
            caption?: string | null
            alternativeText?: string | null
            name: string
          } | null>
        }
      | { __typename: 'Error' }
      | null
    > | null
    pageBackgroundImage?: { __typename?: 'UploadFile'; documentId: string; url: string } | null
  } | null>
}

export type FacilitiesSectionFragment = {
  __typename?: 'ComponentSectionsFacilities'
  title?: string | null
  text?: string | null
  titleLevelFacilitiesSection?: Enum_Componentsectionsfacilities_Titlelevel | null
  facilityPages: Array<{
    __typename?: 'Page'
    documentId: string
    slug?: string | null
    title: string
    locale?: string | null
    pageHeaderSections?: Array<
      | { __typename: 'ComponentHeaderSectionsEvent'; date?: any | null; address?: string | null }
      | {
          __typename: 'ComponentHeaderSectionsFacility'
          address?: string | null
          navigateToLink?: string | null
          media: Array<{
            __typename?: 'UploadFile'
            documentId: string
            url: string
            width?: number | null
            height?: number | null
            caption?: string | null
            alternativeText?: string | null
            name: string
          } | null>
        }
      | { __typename: 'Error' }
      | null
    > | null
    pageBackgroundImage?: { __typename?: 'UploadFile'; documentId: string; url: string } | null
  } | null>
}

export type StarzLandingPageSectionFragment = {
  __typename?: 'ComponentSectionsStarzLandingPage'
  banner: {
    __typename?: 'ComponentBlocksStarzLandingPageBanner'
    title: string
    content?: string | null
    contentPosition: Enum_Componentblocksstarzlandingpagebanner_Contentposition
    variant: Enum_Componentblocksstarzlandingpagebanner_Variant
    media: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      width?: number | null
      height?: number | null
      caption?: string | null
      alternativeText?: string | null
      name: string
    }
    primaryLink?: {
      __typename?: 'ComponentBlocksCommonLink'
      label?: string | null
      url?: string | null
      analyticsId?: string | null
      page?: {
        __typename?: 'Page'
        documentId: string
        slug?: string | null
        title: string
        locale?: string | null
      } | null
      article?: {
        __typename: 'Article'
        documentId: string
        slug: string
        title: string
        locale?: string | null
      } | null
    } | null
    secondaryLink?: {
      __typename?: 'ComponentBlocksCommonLink'
      label?: string | null
      url?: string | null
      analyticsId?: string | null
      page?: {
        __typename?: 'Page'
        documentId: string
        slug?: string | null
        title: string
        locale?: string | null
      } | null
      article?: {
        __typename: 'Article'
        documentId: string
        slug: string
        title: string
        locale?: string | null
      } | null
    } | null
    tertiaryLink?: {
      __typename?: 'ComponentBlocksCommonLink'
      label?: string | null
      url?: string | null
      analyticsId?: string | null
      page?: {
        __typename?: 'Page'
        documentId: string
        slug?: string | null
        title: string
        locale?: string | null
      } | null
      article?: {
        __typename: 'Article'
        documentId: string
        slug: string
        title: string
        locale?: string | null
      } | null
    } | null
  }
  cardLinks?: Array<{
    __typename?: 'ComponentBlocksCardLink'
    label?: string | null
    subtext?: string | null
    url?: string | null
    analyticsId?: string | null
    media?: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      width?: number | null
      height?: number | null
      caption?: string | null
      alternativeText?: string | null
      name: string
    } | null
    page?: {
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      title: string
      locale?: string | null
      pageBackgroundImage?: { __typename?: 'UploadFile'; documentId: string; url: string } | null
    } | null
    article?: {
      __typename: 'Article'
      perex?: string | null
      addedAt: any
      documentId: string
      slug: string
      title: string
      locale?: string | null
      coverMedia?: {
        __typename?: 'UploadFile'
        documentId: string
        url: string
        width?: number | null
        height?: number | null
        caption?: string | null
        alternativeText?: string | null
        name: string
      } | null
      articleCategory?: {
        __typename?: 'ArticleCategory'
        documentId: string
        title: string
        slug: string
      } | null
      tags: Array<{
        __typename?: 'Tag'
        documentId: string
        title: string
        slug: string
        pageCategory?: {
          __typename?: 'PageCategory'
          documentId: string
          title?: string | null
          color?: Enum_Pagecategory_Color | null
        } | null
      } | null>
    } | null
  } | null> | null
}

export type OpeningHoursSectionFragment = {
  __typename?: 'ComponentSectionsOpeningHours'
  title?: string | null
  text?: string | null
  titleLevelOpeningHoursSection?: Enum_Componentsectionsopeninghours_Titlelevel | null
  openingHoursItems?: Array<{
    __typename?: 'ComponentBlocksOpeningHoursItem'
    label: string
    value: string
  } | null> | null
  alertMessage?: {
    __typename?: 'ComponentBlocksOpeningHoursAlertMessage'
    text?: string | null
  } | null
}

export type OpeningHoursItemFragment = {
  __typename?: 'ComponentBlocksOpeningHoursItem'
  label: string
  value: string
}

export type NewsletterSectionFragment = {
  __typename?: 'ComponentSectionsNewsletter'
  title?: string | null
  text?: string | null
  newsletterType: Enum_Componentsectionsnewsletter_Newslettertype
  socialLinksTitle?: string | null
  facebookUrl?: string | null
  instagramUrl?: string | null
}

export type ColumnsListItemFragment = {
  __typename?: 'ComponentBlocksColumnsListItem'
  content?: string | null
  icon?: {
    __typename?: 'UploadFile'
    documentId: string
    url: string
    width?: number | null
    height?: number | null
    caption?: string | null
    alternativeText?: string | null
    name: string
  } | null
}

export type ColumnsListSectionFragment = {
  __typename?: 'ComponentSectionsColumnsList'
  title?: string | null
  text?: string | null
  leftColumn?: Array<{
    __typename?: 'ComponentBlocksColumnsListItem'
    content?: string | null
    icon?: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      width?: number | null
      height?: number | null
      caption?: string | null
      alternativeText?: string | null
      name: string
    } | null
  } | null> | null
  rightColumn?: Array<{
    __typename?: 'ComponentBlocksColumnsListItem'
    content?: string | null
    icon?: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      width?: number | null
      height?: number | null
      caption?: string | null
      alternativeText?: string | null
      name: string
    } | null
  } | null> | null
}

export type ArticlesLandingPageSectionFragment = {
  __typename?: 'ComponentSectionsArticlesLandingPage'
  leftArticle?: {
    __typename: 'Article'
    perex?: string | null
    addedAt: any
    documentId: string
    slug: string
    title: string
    locale?: string | null
    coverMedia?: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      width?: number | null
      height?: number | null
      caption?: string | null
      alternativeText?: string | null
      name: string
    } | null
    articleCategory?: {
      __typename?: 'ArticleCategory'
      documentId: string
      title: string
      slug: string
    } | null
    tags: Array<{
      __typename?: 'Tag'
      documentId: string
      title: string
      slug: string
      pageCategory?: {
        __typename?: 'PageCategory'
        documentId: string
        title?: string | null
        color?: Enum_Pagecategory_Color | null
      } | null
    } | null>
  } | null
  newsPageLink?: {
    __typename?: 'ComponentBlocksCommonLink'
    label?: string | null
    url?: string | null
    analyticsId?: string | null
    page?: {
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      title: string
      locale?: string | null
    } | null
    article?: {
      __typename: 'Article'
      documentId: string
      slug: string
      title: string
      locale?: string | null
    } | null
  } | null
}

export type AlertSectionFragment = {
  __typename?: 'ComponentSectionsAlert'
  title?: string | null
  alertText: string
  alertVariant: Enum_Componentsectionsalert_Alertvariant
}

export type JobOfferListSectionFragment = {
  __typename?: 'ComponentSectionsJobOfferList'
  title?: string | null
  text?: string | null
  titleLevel?: Enum_Componentsectionsjobofferlist_Titlelevel | null
}

type Sections_ComponentSectionsAccordion_Fragment = {
  __typename: 'ComponentSectionsAccordion'
  title?: string | null
  titleLevelAccordionSection?: Enum_Componentsectionsaccordion_Titlelevel | null
  institutions?: Array<{
    __typename?: 'ComponentAccordionItemsInstitution'
    title?: string | null
    subtitle?: string | null
    category?: string | null
    firstColumn?: string | null
    secondColumn?: string | null
    thirdColumn?: string | null
    url?: string | null
    urlLabel?: string | null
  } | null> | null
  flatText?: Array<{
    __typename?: 'ComponentAccordionItemsFlatText'
    category?: string | null
    content?: string | null
    moreLinkTitle?: string | null
    moreLinkUrl?: string | null
    moreLinkPage?: {
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      title: string
      locale?: string | null
    } | null
    fileList?: Array<{
      __typename?: 'ComponentBlocksFileItem'
      id: string
      title?: string | null
      media: {
        __typename?: 'UploadFile'
        documentId: string
        url: string
        name: string
        ext?: string | null
        size: number
        createdAt?: any | null
        updatedAt?: any | null
      }
    } | null> | null
  } | null> | null
}

type Sections_ComponentSectionsAlert_Fragment = {
  __typename: 'ComponentSectionsAlert'
  title?: string | null
  alertText: string
  alertVariant: Enum_Componentsectionsalert_Alertvariant
}

type Sections_ComponentSectionsArticles_Fragment = {
  __typename: 'ComponentSectionsArticles'
  title?: string | null
  text?: string | null
  showAll?: boolean | null
  articles: Array<{
    __typename: 'Article'
    perex?: string | null
    addedAt: any
    documentId: string
    slug: string
    title: string
    locale?: string | null
    coverMedia?: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      width?: number | null
      height?: number | null
      caption?: string | null
      alternativeText?: string | null
      name: string
    } | null
    articleCategory?: {
      __typename?: 'ArticleCategory'
      documentId: string
      title: string
      slug: string
    } | null
    tags: Array<{
      __typename?: 'Tag'
      documentId: string
      title: string
      slug: string
      pageCategory?: {
        __typename?: 'PageCategory'
        documentId: string
        title?: string | null
        color?: Enum_Pagecategory_Color | null
      } | null
    } | null>
  } | null>
  category?: {
    __typename?: 'PageCategory'
    documentId: string
    title?: string | null
    color?: Enum_Pagecategory_Color | null
  } | null
  articleCategories: Array<{
    __typename?: 'ArticleCategory'
    documentId: string
    title: string
    slug: string
  } | null>
  tags: Array<{
    __typename?: 'Tag'
    documentId: string
    title: string
    slug: string
    pageCategory?: {
      __typename?: 'PageCategory'
      documentId: string
      title?: string | null
      color?: Enum_Pagecategory_Color | null
    } | null
  } | null>
  adminGroups: Array<{
    __typename?: 'AdminGroup'
    documentId: string
    slug: string
    title: string
    adminGroupId?: string | null
  } | null>
  showMoreLink?: {
    __typename?: 'ComponentBlocksCommonLink'
    label?: string | null
    url?: string | null
    analyticsId?: string | null
    page?: {
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      title: string
      locale?: string | null
    } | null
    article?: {
      __typename: 'Article'
      documentId: string
      slug: string
      title: string
      locale?: string | null
    } | null
  } | null
}

type Sections_ComponentSectionsArticlesLandingPage_Fragment = {
  __typename: 'ComponentSectionsArticlesLandingPage'
  leftArticle?: {
    __typename: 'Article'
    perex?: string | null
    addedAt: any
    documentId: string
    slug: string
    title: string
    locale?: string | null
    coverMedia?: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      width?: number | null
      height?: number | null
      caption?: string | null
      alternativeText?: string | null
      name: string
    } | null
    articleCategory?: {
      __typename?: 'ArticleCategory'
      documentId: string
      title: string
      slug: string
    } | null
    tags: Array<{
      __typename?: 'Tag'
      documentId: string
      title: string
      slug: string
      pageCategory?: {
        __typename?: 'PageCategory'
        documentId: string
        title?: string | null
        color?: Enum_Pagecategory_Color | null
      } | null
    } | null>
  } | null
  newsPageLink?: {
    __typename?: 'ComponentBlocksCommonLink'
    label?: string | null
    url?: string | null
    analyticsId?: string | null
    page?: {
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      title: string
      locale?: string | null
    } | null
    article?: {
      __typename: 'Article'
      documentId: string
      slug: string
      title: string
      locale?: string | null
    } | null
  } | null
}

type Sections_ComponentSectionsAssets_Fragment = { __typename: 'ComponentSectionsAssets' }

type Sections_ComponentSectionsBanner_Fragment = {
  __typename: 'ComponentSectionsBanner'
  content?: string | null
  contentPosition: Enum_Componentsectionsbanner_Contentposition
  bannerTitle: string
  bannerVariant: Enum_Componentsectionsbanner_Variant
  media: { __typename?: 'UploadFile'; url: string }
  primaryLink?: {
    __typename?: 'ComponentBlocksCommonLink'
    label?: string | null
    url?: string | null
    analyticsId?: string | null
    page?: {
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      title: string
      locale?: string | null
    } | null
    article?: {
      __typename: 'Article'
      documentId: string
      slug: string
      title: string
      locale?: string | null
    } | null
  } | null
  secondaryLink?: {
    __typename?: 'ComponentBlocksCommonLink'
    label?: string | null
    url?: string | null
    analyticsId?: string | null
    page?: {
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      title: string
      locale?: string | null
    } | null
    article?: {
      __typename: 'Article'
      documentId: string
      slug: string
      title: string
      locale?: string | null
    } | null
  } | null
  tertiaryLink?: {
    __typename?: 'ComponentBlocksCommonLink'
    label?: string | null
    url?: string | null
    analyticsId?: string | null
    page?: {
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      title: string
      locale?: string | null
    } | null
    article?: {
      __typename: 'Article'
      documentId: string
      slug: string
      title: string
      locale?: string | null
    } | null
  } | null
}

type Sections_ComponentSectionsColumnedText_Fragment = {
  __typename: 'ComponentSectionsColumnedText'
  title?: string | null
  content?: string | null
}

type Sections_ComponentSectionsColumns_Fragment = {
  __typename: 'ComponentSectionsColumns'
  title?: string | null
  text?: string | null
  imageVariant: Enum_Componentsectionscolumns_Imagevariant
  responsiveLayout: Enum_Componentsectionscolumns_Responsivelayout
  columns: Array<{
    __typename?: 'ComponentBlocksColumnsItem'
    title?: string | null
    text?: string | null
    image?: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      width?: number | null
      height?: number | null
      caption?: string | null
      alternativeText?: string | null
      name: string
    } | null
  } | null>
}

type Sections_ComponentSectionsColumnsList_Fragment = {
  __typename: 'ComponentSectionsColumnsList'
  title?: string | null
  text?: string | null
  leftColumn?: Array<{
    __typename?: 'ComponentBlocksColumnsListItem'
    content?: string | null
    icon?: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      width?: number | null
      height?: number | null
      caption?: string | null
      alternativeText?: string | null
      name: string
    } | null
  } | null> | null
  rightColumn?: Array<{
    __typename?: 'ComponentBlocksColumnsListItem'
    content?: string | null
    icon?: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      width?: number | null
      height?: number | null
      caption?: string | null
      alternativeText?: string | null
      name: string
    } | null
  } | null> | null
}

type Sections_ComponentSectionsComparisonSection_Fragment = {
  __typename: 'ComponentSectionsComparisonSection'
  title?: string | null
  text?: string | null
  textAlignComparison: Enum_Componentsectionscomparisonsection_Textalign
  cards: Array<{
    __typename?: 'ComponentBlocksComparisonCard'
    title: string
    items: Array<{ __typename?: 'ComponentBlocksComparisonItem'; label: string } | null>
    iconMedia?: { __typename?: 'UploadFile'; url: string } | null
  } | null>
}

type Sections_ComponentSectionsContactsSection_Fragment = {
  __typename: 'ComponentSectionsContactsSection'
  id: string
  title?: string | null
  description?: string | null
  titleLevelContactsSection?: Enum_Componentsectionscontactssection_Titlelevel | null
  addressContacts?: Array<{
    __typename?: 'ComponentBlocksContactCard'
    overrideLabel?: string | null
    value: string
  } | null> | null
  openingHoursContacts?: Array<{
    __typename?: 'ComponentBlocksContactCard'
    overrideLabel?: string | null
    value: string
  } | null> | null
  emailContacts?: Array<{
    __typename?: 'ComponentBlocksContactCard'
    overrideLabel?: string | null
    value: string
  } | null> | null
  phoneContacts?: Array<{
    __typename?: 'ComponentBlocksContactCard'
    overrideLabel?: string | null
    value: string
  } | null> | null
  webContacts?: Array<{
    __typename?: 'ComponentBlocksContactCard'
    overrideLabel?: string | null
    value: string
  } | null> | null
  postalAddressContacts?: Array<{
    __typename?: 'ComponentBlocksContactCard'
    overrideLabel?: string | null
    value: string
  } | null> | null
  billingInfoContacts?: Array<{
    __typename?: 'ComponentBlocksContactCard'
    overrideLabel?: string | null
    value: string
  } | null> | null
  bankConnectionContacts?: Array<{
    __typename?: 'ComponentBlocksContactCard'
    overrideLabel?: string | null
    value: string
  } | null> | null
  personContacts?: Array<{
    __typename?: 'ComponentBlocksContactPersonCard'
    title: string
    subtext?: string | null
    email?: string | null
    phone?: string | null
  } | null> | null
  directionsContact?: {
    __typename?: 'ComponentBlocksContactDirectionsCard'
    overrideLabel?: string | null
    address: string
    parkingInfo?: string | null
    publicTransportInfo?: string | null
    barrierFreeInfo?: string | null
    iframeUrl?: string | null
  } | null
}

type Sections_ComponentSectionsDivider_Fragment = {
  __typename: 'ComponentSectionsDivider'
  style?: Enum_Componentsectionsdivider_Style | null
}

type Sections_ComponentSectionsDocuments_Fragment = {
  __typename: 'ComponentSectionsDocuments'
  title?: string | null
  text?: string | null
  showAll?: boolean | null
  titleLevelDocumentsSection?: Enum_Componentsectionsdocuments_Titlelevel | null
  documents: Array<{
    __typename: 'Document'
    publishedAt?: any | null
    updatedAt?: any | null
    description?: string | null
    documentId: string
    slug: string
    title: string
    documentCategory?: {
      __typename?: 'DocumentCategory'
      documentId: string
      title: string
      slug: string
    } | null
    files: Array<{
      __typename?: 'UploadFile'
      documentId: string
      url: string
      name: string
      ext?: string | null
      size: number
      createdAt?: any | null
      updatedAt?: any | null
    } | null>
  } | null>
}

type Sections_ComponentSectionsEvents_Fragment = {
  __typename: 'ComponentSectionsEvents'
  title?: string | null
  text?: string | null
  titleLevelEventsSection?: Enum_Componentsectionsevents_Titlelevel | null
  eventPages: Array<{
    __typename?: 'Page'
    documentId: string
    slug?: string | null
    title: string
    locale?: string | null
    pageHeaderSections?: Array<
      | { __typename: 'ComponentHeaderSectionsEvent'; date?: any | null; address?: string | null }
      | {
          __typename: 'ComponentHeaderSectionsFacility'
          address?: string | null
          navigateToLink?: string | null
          media: Array<{
            __typename?: 'UploadFile'
            documentId: string
            url: string
            width?: number | null
            height?: number | null
            caption?: string | null
            alternativeText?: string | null
            name: string
          } | null>
        }
      | { __typename: 'Error' }
      | null
    > | null
    pageBackgroundImage?: { __typename?: 'UploadFile'; documentId: string; url: string } | null
  } | null>
}

type Sections_ComponentSectionsFacilities_Fragment = {
  __typename: 'ComponentSectionsFacilities'
  title?: string | null
  text?: string | null
  titleLevelFacilitiesSection?: Enum_Componentsectionsfacilities_Titlelevel | null
  facilityPages: Array<{
    __typename?: 'Page'
    documentId: string
    slug?: string | null
    title: string
    locale?: string | null
    pageHeaderSections?: Array<
      | { __typename: 'ComponentHeaderSectionsEvent'; date?: any | null; address?: string | null }
      | {
          __typename: 'ComponentHeaderSectionsFacility'
          address?: string | null
          navigateToLink?: string | null
          media: Array<{
            __typename?: 'UploadFile'
            documentId: string
            url: string
            width?: number | null
            height?: number | null
            caption?: string | null
            alternativeText?: string | null
            name: string
          } | null>
        }
      | { __typename: 'Error' }
      | null
    > | null
    pageBackgroundImage?: { __typename?: 'UploadFile'; documentId: string; url: string } | null
  } | null>
}

type Sections_ComponentSectionsFaqCategories_Fragment = {
  __typename: 'ComponentSectionsFaqCategories'
  id: string
  title?: string | null
  text?: string | null
  faqCategories: Array<{
    __typename?: 'FaqCategory'
    documentId: string
    title: string
    slug: string
    faqs: Array<{
      __typename?: 'Faq'
      documentId: string
      title: string
      body?: string | null
    } | null>
  } | null>
}

type Sections_ComponentSectionsFaqs_Fragment = {
  __typename: 'ComponentSectionsFaqs'
  title?: string | null
  text?: string | null
  titleLevelFaqsSection?: Enum_Componentsectionsfaqs_Titlelevel | null
  faqs: Array<{
    __typename?: 'Faq'
    documentId: string
    title: string
    body?: string | null
  } | null>
}

type Sections_ComponentSectionsFileList_Fragment = {
  __typename: 'ComponentSectionsFileList'
  title?: string | null
  text?: string | null
  titleLevelFileListSection?: Enum_Componentsectionsfilelist_Titlelevel | null
  fileList?: Array<{
    __typename?: 'ComponentBlocksFile'
    id: string
    title?: string | null
    media?: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      name: string
      ext?: string | null
      size: number
      createdAt?: any | null
      updatedAt?: any | null
    } | null
  } | null> | null
}

type Sections_ComponentSectionsGallery_Fragment = {
  __typename: 'ComponentSectionsGallery'
  title?: string | null
  text?: string | null
  titleLevelGallerySection?: Enum_Componentsectionsgallery_Titlelevel | null
  medias: Array<{
    __typename?: 'UploadFile'
    documentId: string
    url: string
    width?: number | null
    height?: number | null
    caption?: string | null
    alternativeText?: string | null
    name: string
  } | null>
}

type Sections_ComponentSectionsIframe_Fragment = {
  __typename: 'ComponentSectionsIframe'
  title?: string | null
  text?: string | null
  url: string
  iframeTitle?: string | null
  iframeHeight: string
  hasBorder?: boolean | null
  allowGeolocation?: boolean | null
  titleLevelIframeSection?: Enum_Componentsectionsiframe_Titlelevel | null
}

type Sections_ComponentSectionsInbaLatestRelease_Fragment = {
  __typename: 'ComponentSectionsInbaLatestRelease'
}

type Sections_ComponentSectionsInbaReleases_Fragment = {
  __typename: 'ComponentSectionsInbaReleases'
  title?: string | null
  text?: string | null
  variantInbaReleasesSection?: Enum_Componentsectionsinbareleases_Variant | null
  showMoreLink?: {
    __typename?: 'ComponentBlocksCommonLink'
    label?: string | null
    url?: string | null
    analyticsId?: string | null
    page?: {
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      title: string
      locale?: string | null
    } | null
    article?: {
      __typename: 'Article'
      documentId: string
      slug: string
      title: string
      locale?: string | null
    } | null
  } | null
}

type Sections_ComponentSectionsJobOfferList_Fragment = {
  __typename: 'ComponentSectionsJobOfferList'
  title?: string | null
  text?: string | null
  titleLevel?: Enum_Componentsectionsjobofferlist_Titlelevel | null
}

type Sections_ComponentSectionsLinks_Fragment = {
  __typename: 'ComponentSectionsLinks'
  title?: string | null
  titleLevelLinksSection?: Enum_Componentsectionslinks_Titlelevel | null
  pageLinks?: Array<{
    __typename?: 'ComponentBlocksPageLink'
    url?: string | null
    analyticsId?: string | null
    label?: string | null
    page?: {
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      title: string
      locale?: string | null
    } | null
  } | null> | null
}

type Sections_ComponentSectionsNarrowText_Fragment = {
  __typename: 'ComponentSectionsNarrowText'
  content?: string | null
  width?: Enum_Componentsectionsnarrowtext_Width | null
}

type Sections_ComponentSectionsNewsletter_Fragment = {
  __typename: 'ComponentSectionsNewsletter'
  title?: string | null
  text?: string | null
  newsletterType: Enum_Componentsectionsnewsletter_Newslettertype
  socialLinksTitle?: string | null
  facebookUrl?: string | null
  instagramUrl?: string | null
}

type Sections_ComponentSectionsNumbersOverview_Fragment = {
  __typename: 'ComponentSectionsNumbersOverview'
  title?: string | null
  text?: string | null
  showMoreLink?: {
    __typename?: 'ComponentBlocksCommonLink'
    label?: string | null
    url?: string | null
    analyticsId?: string | null
    page?: {
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      title: string
      locale?: string | null
    } | null
    article?: {
      __typename: 'Article'
      documentId: string
      slug: string
      title: string
      locale?: string | null
    } | null
  } | null
  numbersOverviewItems?: Array<{
    __typename?: 'ComponentBlocksNumbersOverviewItem'
    id: string
    number: string
    text: string
  } | null> | null
}

type Sections_ComponentSectionsNumericalList_Fragment = {
  __typename: 'ComponentSectionsNumericalList'
  id: string
  title?: string | null
  text?: string | null
  variant: Enum_Componentsectionsnumericallist_Variant
  items?: Array<{
    __typename?: 'ComponentBlocksNumericalListItem'
    text?: string | null
  } | null> | null
}

type Sections_ComponentSectionsOfficialBoard_Fragment = {
  __typename: 'ComponentSectionsOfficialBoard'
}

type Sections_ComponentSectionsOpeningHours_Fragment = {
  __typename: 'ComponentSectionsOpeningHours'
  title?: string | null
  text?: string | null
  titleLevelOpeningHoursSection?: Enum_Componentsectionsopeninghours_Titlelevel | null
  openingHoursItems?: Array<{
    __typename?: 'ComponentBlocksOpeningHoursItem'
    label: string
    value: string
  } | null> | null
  alertMessage?: {
    __typename?: 'ComponentBlocksOpeningHoursAlertMessage'
    text?: string | null
  } | null
}

type Sections_ComponentSectionsOrganizationalStructure_Fragment = {
  __typename: 'ComponentSectionsOrganizationalStructure'
  title?: string | null
}

type Sections_ComponentSectionsPartners_Fragment = {
  __typename: 'ComponentSectionsPartners'
  title?: string | null
  text?: string | null
  logoRatio: Enum_Componentsectionspartners_Logoratio
  titleLevelPartnersSection?: Enum_Componentsectionspartners_Titlelevel | null
  partners: Array<{
    __typename?: 'ComponentBlocksPartner'
    title: string
    url?: string | null
    logo: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      width?: number | null
      height?: number | null
      caption?: string | null
      alternativeText?: string | null
      name: string
    }
  } | null>
}

type Sections_ComponentSectionsProsAndConsSection_Fragment = {
  __typename: 'ComponentSectionsProsAndConsSection'
  title?: string | null
  text?: string | null
  textAlignProsAndCons: Enum_Componentsectionsprosandconssection_Textalign
  pros: {
    __typename?: 'ComponentBlocksProsAndConsCard'
    title: string
    items: Array<{ __typename?: 'ComponentBlocksComparisonItem'; label: string } | null>
  }
  cons: {
    __typename?: 'ComponentBlocksProsAndConsCard'
    title: string
    items: Array<{ __typename?: 'ComponentBlocksComparisonItem'; label: string } | null>
  }
}

type Sections_ComponentSectionsRegulations_Fragment = {
  __typename: 'ComponentSectionsRegulations'
  showAll?: boolean | null
  regulations: Array<{
    __typename?: 'Regulation'
    documentId: string
    regNumber: string
    slug: string
    titleText?: string | null
    fullTitle: string
    effectiveFrom: any
    category: Enum_Regulation_Category
    isFullTextRegulation: boolean
    mainDocument: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      name: string
      ext?: string | null
      size: number
      createdAt?: any | null
      updatedAt?: any | null
    }
    attachments: Array<{
      __typename?: 'UploadFile'
      documentId: string
      url: string
      name: string
      ext?: string | null
      size: number
      createdAt?: any | null
      updatedAt?: any | null
    } | null>
    amendments: Array<{
      __typename?: 'Regulation'
      documentId: string
      regNumber: string
      slug: string
      effectiveFrom: any
      isFullTextRegulation: boolean
      attachments: Array<{
        __typename?: 'UploadFile'
        documentId: string
        url: string
        name: string
        ext?: string | null
        size: number
        createdAt?: any | null
        updatedAt?: any | null
      } | null>
    } | null>
    amending: Array<{
      __typename?: 'Regulation'
      documentId: string
      regNumber: string
      slug: string
      effectiveFrom: any
      cancellation?: {
        __typename?: 'Regulation'
        documentId: string
        regNumber: string
        slug: string
        effectiveFrom: any
      } | null
      amending: Array<{
        __typename?: 'Regulation'
        documentId: string
        regNumber: string
        slug: string
        cancellation?: {
          __typename?: 'Regulation'
          documentId: string
          regNumber: string
          slug: string
          effectiveFrom: any
        } | null
      } | null>
    } | null>
    cancellation?: {
      __typename?: 'Regulation'
      documentId: string
      regNumber: string
      slug: string
      effectiveFrom: any
    } | null
    cancelling: Array<{
      __typename?: 'Regulation'
      documentId: string
      regNumber: string
      slug: string
      effectiveFrom: any
    } | null>
  } | null>
}

type Sections_ComponentSectionsStarzLandingPage_Fragment = {
  __typename: 'ComponentSectionsStarzLandingPage'
  banner: {
    __typename?: 'ComponentBlocksStarzLandingPageBanner'
    title: string
    content?: string | null
    contentPosition: Enum_Componentblocksstarzlandingpagebanner_Contentposition
    variant: Enum_Componentblocksstarzlandingpagebanner_Variant
    media: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      width?: number | null
      height?: number | null
      caption?: string | null
      alternativeText?: string | null
      name: string
    }
    primaryLink?: {
      __typename?: 'ComponentBlocksCommonLink'
      label?: string | null
      url?: string | null
      analyticsId?: string | null
      page?: {
        __typename?: 'Page'
        documentId: string
        slug?: string | null
        title: string
        locale?: string | null
      } | null
      article?: {
        __typename: 'Article'
        documentId: string
        slug: string
        title: string
        locale?: string | null
      } | null
    } | null
    secondaryLink?: {
      __typename?: 'ComponentBlocksCommonLink'
      label?: string | null
      url?: string | null
      analyticsId?: string | null
      page?: {
        __typename?: 'Page'
        documentId: string
        slug?: string | null
        title: string
        locale?: string | null
      } | null
      article?: {
        __typename: 'Article'
        documentId: string
        slug: string
        title: string
        locale?: string | null
      } | null
    } | null
    tertiaryLink?: {
      __typename?: 'ComponentBlocksCommonLink'
      label?: string | null
      url?: string | null
      analyticsId?: string | null
      page?: {
        __typename?: 'Page'
        documentId: string
        slug?: string | null
        title: string
        locale?: string | null
      } | null
      article?: {
        __typename: 'Article'
        documentId: string
        slug: string
        title: string
        locale?: string | null
      } | null
    } | null
  }
  cardLinks?: Array<{
    __typename?: 'ComponentBlocksCardLink'
    label?: string | null
    subtext?: string | null
    url?: string | null
    analyticsId?: string | null
    media?: {
      __typename?: 'UploadFile'
      documentId: string
      url: string
      width?: number | null
      height?: number | null
      caption?: string | null
      alternativeText?: string | null
      name: string
    } | null
    page?: {
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      title: string
      locale?: string | null
      pageBackgroundImage?: { __typename?: 'UploadFile'; documentId: string; url: string } | null
    } | null
    article?: {
      __typename: 'Article'
      perex?: string | null
      addedAt: any
      documentId: string
      slug: string
      title: string
      locale?: string | null
      coverMedia?: {
        __typename?: 'UploadFile'
        documentId: string
        url: string
        width?: number | null
        height?: number | null
        caption?: string | null
        alternativeText?: string | null
        name: string
      } | null
      articleCategory?: {
        __typename?: 'ArticleCategory'
        documentId: string
        title: string
        slug: string
      } | null
      tags: Array<{
        __typename?: 'Tag'
        documentId: string
        title: string
        slug: string
        pageCategory?: {
          __typename?: 'PageCategory'
          documentId: string
          title?: string | null
          color?: Enum_Pagecategory_Color | null
        } | null
      } | null>
    } | null
  } | null> | null
}

type Sections_ComponentSectionsTextWithImage_Fragment = {
  __typename: 'ComponentSectionsTextWithImage'
  content?: string | null
  imagePosition: Enum_Componentsectionstextwithimage_Imageposition
  imageAspectRatio?: Enum_Componentsectionstextwithimage_Imageaspectratio | null
  imageSrc: {
    __typename?: 'UploadFile'
    documentId: string
    url: string
    width?: number | null
    height?: number | null
    caption?: string | null
    alternativeText?: string | null
    name: string
  }
  links?: Array<{
    __typename?: 'ComponentBlocksCommonLink'
    label?: string | null
    url?: string | null
    analyticsId?: string | null
    page?: {
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      title: string
      locale?: string | null
    } | null
    article?: {
      __typename: 'Article'
      documentId: string
      slug: string
      title: string
      locale?: string | null
    } | null
  } | null> | null
}

type Sections_ComponentSectionsTextWithImageOverlapped_Fragment = {
  __typename: 'ComponentSectionsTextWithImageOverlapped'
  content?: string | null
  imagePositionTextWithImageOverlapped: Enum_Componentsectionstextwithimageoverlapped_Imageposition
  image: {
    __typename?: 'UploadFile'
    documentId: string
    url: string
    width?: number | null
    height?: number | null
    caption?: string | null
    alternativeText?: string | null
    name: string
  }
  links?: Array<{
    __typename?: 'ComponentBlocksCommonLink'
    label?: string | null
    url?: string | null
    analyticsId?: string | null
    page?: {
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      title: string
      locale?: string | null
    } | null
    article?: {
      __typename: 'Article'
      documentId: string
      slug: string
      title: string
      locale?: string | null
    } | null
  } | null> | null
}

type Sections_ComponentSectionsTootootEvents_Fragment = {
  __typename: 'ComponentSectionsTootootEvents'
  title?: string | null
  text?: string | null
  showMoreLink?: {
    __typename?: 'ComponentBlocksCommonLink'
    label?: string | null
    url?: string | null
    analyticsId?: string | null
    page?: {
      __typename?: 'Page'
      documentId: string
      slug?: string | null
      title: string
      locale?: string | null
    } | null
    article?: {
      __typename: 'Article'
      documentId: string
      slug: string
      title: string
      locale?: string | null
    } | null
  } | null
}

type Sections_ComponentSectionsVideos_Fragment = {
  __typename: 'ComponentSectionsVideos'
  id: string
  title?: string | null
  subtitle?: string | null
  titleLevelVideosSection?: Enum_Componentsectionsvideos_Titlelevel | null
  videos?: Array<{
    __typename?: 'ComponentBlocksVideo'
    id: string
    title?: string | null
    speaker?: string | null
    url: string
  } | null> | null
}

type Sections_Error_Fragment = { __typename: 'Error' }

export type SectionsFragment =
  | Sections_ComponentSectionsAccordion_Fragment
  | Sections_ComponentSectionsAlert_Fragment
  | Sections_ComponentSectionsArticles_Fragment
  | Sections_ComponentSectionsArticlesLandingPage_Fragment
  | Sections_ComponentSectionsAssets_Fragment
  | Sections_ComponentSectionsBanner_Fragment
  | Sections_ComponentSectionsColumnedText_Fragment
  | Sections_ComponentSectionsColumns_Fragment
  | Sections_ComponentSectionsColumnsList_Fragment
  | Sections_ComponentSectionsComparisonSection_Fragment
  | Sections_ComponentSectionsContactsSection_Fragment
  | Sections_ComponentSectionsDivider_Fragment
  | Sections_ComponentSectionsDocuments_Fragment
  | Sections_ComponentSectionsEvents_Fragment
  | Sections_ComponentSectionsFacilities_Fragment
  | Sections_ComponentSectionsFaqCategories_Fragment
  | Sections_ComponentSectionsFaqs_Fragment
  | Sections_ComponentSectionsFileList_Fragment
  | Sections_ComponentSectionsGallery_Fragment
  | Sections_ComponentSectionsIframe_Fragment
  | Sections_ComponentSectionsInbaLatestRelease_Fragment
  | Sections_ComponentSectionsInbaReleases_Fragment
  | Sections_ComponentSectionsJobOfferList_Fragment
  | Sections_ComponentSectionsLinks_Fragment
  | Sections_ComponentSectionsNarrowText_Fragment
  | Sections_ComponentSectionsNewsletter_Fragment
  | Sections_ComponentSectionsNumbersOverview_Fragment
  | Sections_ComponentSectionsNumericalList_Fragment
  | Sections_ComponentSectionsOfficialBoard_Fragment
  | Sections_ComponentSectionsOpeningHours_Fragment
  | Sections_ComponentSectionsOrganizationalStructure_Fragment
  | Sections_ComponentSectionsPartners_Fragment
  | Sections_ComponentSectionsProsAndConsSection_Fragment
  | Sections_ComponentSectionsRegulations_Fragment
  | Sections_ComponentSectionsStarzLandingPage_Fragment
  | Sections_ComponentSectionsTextWithImage_Fragment
  | Sections_ComponentSectionsTextWithImageOverlapped_Fragment
  | Sections_ComponentSectionsTootootEvents_Fragment
  | Sections_ComponentSectionsVideos_Fragment
  | Sections_Error_Fragment

export type EventPageHeaderSectionFragment = {
  __typename?: 'ComponentHeaderSectionsEvent'
  date?: any | null
  address?: string | null
}

export type FacilityPageHeaderSectionFragment = {
  __typename?: 'ComponentHeaderSectionsFacility'
  address?: string | null
  navigateToLink?: string | null
  media: Array<{
    __typename?: 'UploadFile'
    documentId: string
    url: string
    width?: number | null
    height?: number | null
    caption?: string | null
    alternativeText?: string | null
    name: string
  } | null>
}

type PageHeaderSections_ComponentHeaderSectionsEvent_Fragment = {
  __typename: 'ComponentHeaderSectionsEvent'
  date?: any | null
  address?: string | null
}

type PageHeaderSections_ComponentHeaderSectionsFacility_Fragment = {
  __typename: 'ComponentHeaderSectionsFacility'
  address?: string | null
  navigateToLink?: string | null
  media: Array<{
    __typename?: 'UploadFile'
    documentId: string
    url: string
    width?: number | null
    height?: number | null
    caption?: string | null
    alternativeText?: string | null
    name: string
  } | null>
}

type PageHeaderSections_Error_Fragment = { __typename: 'Error' }

export type PageHeaderSectionsFragment =
  | PageHeaderSections_ComponentHeaderSectionsEvent_Fragment
  | PageHeaderSections_ComponentHeaderSectionsFacility_Fragment
  | PageHeaderSections_Error_Fragment

type Sidebars_ComponentSidebarsEmptySidebar_Fragment = {
  __typename: 'ComponentSidebarsEmptySidebar'
}

type Sidebars_Error_Fragment = { __typename?: 'Error' }

export type SidebarsFragment =
  | Sidebars_ComponentSidebarsEmptySidebar_Fragment
  | Sidebars_Error_Fragment

export type TagEntityFragment = {
  __typename?: 'Tag'
  documentId: string
  title: string
  slug: string
  pageCategory?: {
    __typename?: 'PageCategory'
    documentId: string
    title?: string | null
    color?: Enum_Pagecategory_Color | null
  } | null
}

export type TagsQueryVariables = Exact<{
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  sort?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>
  >
}>

export type TagsQuery = {
  __typename?: 'Query'
  tags: Array<{
    __typename?: 'Tag'
    documentId: string
    title: string
    slug: string
    pageCategory?: {
      __typename?: 'PageCategory'
      documentId: string
      title?: string | null
      color?: Enum_Pagecategory_Color | null
    } | null
  } | null>
}

export const ArticleSlugEntityFragmentDoc = gql`
  fragment ArticleSlugEntity on Article {
    __typename
    documentId
    slug
    title
    locale
  }
`
export const UploadImageEntityFragmentDoc = gql`
  fragment UploadImageEntity on UploadFile {
    documentId
    url
    width
    height
    caption
    alternativeText
    name
  }
`
export const ArticleCategoryEntityFragmentDoc = gql`
  fragment ArticleCategoryEntity on ArticleCategory {
    documentId
    title
    slug
  }
`
export const PageCategoryEntityFragmentDoc = gql`
  fragment PageCategoryEntity on PageCategory {
    documentId
    title
    color
  }
`
export const TagEntityFragmentDoc = gql`
  fragment TagEntity on Tag {
    documentId
    title
    slug
    pageCategory {
      ...PageCategoryEntity
    }
  }
  ${PageCategoryEntityFragmentDoc}
`
export const ArticleCardEntityFragmentDoc = gql`
  fragment ArticleCardEntity on Article {
    ...ArticleSlugEntity
    perex
    addedAt
    coverMedia {
      ...UploadImageEntity
    }
    articleCategory {
      ...ArticleCategoryEntity
    }
    tags {
      ...TagEntity
    }
  }
  ${ArticleSlugEntityFragmentDoc}
  ${UploadImageEntityFragmentDoc}
  ${ArticleCategoryEntityFragmentDoc}
  ${TagEntityFragmentDoc}
`
export const UploadFileEntityFragmentDoc = gql`
  fragment UploadFileEntity on UploadFile {
    documentId
    url
    name
    ext
    size
    createdAt
    updatedAt
  }
`
export const FileBlockFragmentDoc = gql`
  fragment FileBlock on ComponentBlocksFile {
    id
    title
    media {
      ...UploadFileEntity
    }
  }
  ${UploadFileEntityFragmentDoc}
`
export const InbaReleaseSlugEntityFragmentDoc = gql`
  fragment InbaReleaseSlugEntity on InbaRelease {
    documentId
    title
    slug
  }
`
export const InbaReleaseCardEntityFragmentDoc = gql`
  fragment InbaReleaseCardEntity on InbaRelease {
    ...InbaReleaseSlugEntity
    perex
    releaseDate
    coverImage {
      ...UploadImageEntity
    }
  }
  ${InbaReleaseSlugEntityFragmentDoc}
  ${UploadImageEntityFragmentDoc}
`
export const AdminGroupSlugEntityFragmentDoc = gql`
  fragment AdminGroupSlugEntity on AdminGroup {
    documentId
    slug
    title
    adminGroupId
  }
`
export const ArticleEntityFragmentDoc = gql`
  fragment ArticleEntity on Article {
    ...ArticleCardEntity
    alias
    content
    articleCategory {
      ...ArticleCategoryEntity
    }
    files {
      ...FileBlock
    }
    gallery {
      ...UploadImageEntity
    }
    inbaRelease {
      ...InbaReleaseCardEntity
    }
    adminGroups {
      ...AdminGroupSlugEntity
    }
  }
  ${ArticleCardEntityFragmentDoc}
  ${ArticleCategoryEntityFragmentDoc}
  ${FileBlockFragmentDoc}
  ${UploadImageEntityFragmentDoc}
  ${InbaReleaseCardEntityFragmentDoc}
  ${AdminGroupSlugEntityFragmentDoc}
`
export const AssetSlugEntityFragmentDoc = gql`
  fragment AssetSlugEntity on Asset {
    __typename
    documentId
    slug
    title
  }
`
export const AssetCategoryEntityFragmentDoc = gql`
  fragment AssetCategoryEntity on AssetCategory {
    documentId
    title
    slug
  }
`
export const AssetEntityFragmentDoc = gql`
  fragment AssetEntity on Asset {
    ...AssetSlugEntity
    publishedAt
    updatedAt
    assetCategory {
      ...AssetCategoryEntity
    }
    description
    files {
      ...UploadFileEntity
    }
  }
  ${AssetSlugEntityFragmentDoc}
  ${AssetCategoryEntityFragmentDoc}
  ${UploadFileEntityFragmentDoc}
`
export const UploadFileFragmentDoc = gql`
  fragment UploadFile on UploadFile {
    documentId
  }
`
export const PageSlugEntityFragmentDoc = gql`
  fragment PageSlugEntity on Page {
    documentId
    slug
    title
    locale
  }
`
export const CommonLinkFragmentDoc = gql`
  fragment CommonLink on ComponentBlocksCommonLink {
    label
    page {
      ...PageSlugEntity
    }
    article {
      ...ArticleSlugEntity
    }
    url
    analyticsId
  }
  ${PageSlugEntityFragmentDoc}
  ${ArticleSlugEntityFragmentDoc}
`
export const FooterColumnBlockFragmentDoc = gql`
  fragment FooterColumnBlock on ComponentBlocksFooterColumn {
    title
    links {
      ...CommonLink
    }
  }
  ${CommonLinkFragmentDoc}
`
export const FooterFragmentDoc = gql`
  fragment Footer on Footer {
    facebookUrl
    instagramUrl
    youtubeUrl
    linkedinUrl
    tiktokUrl
    columns {
      ...FooterColumnBlock
    }
    accessibilityPageLink {
      ...CommonLink
    }
    innovationsLink {
      ...CommonLink
    }
    contactText
  }
  ${FooterColumnBlockFragmentDoc}
  ${CommonLinkFragmentDoc}
`
export const MenuLinkFragmentDoc = gql`
  fragment MenuLink on ComponentMenuMenuLink {
    id
    label
    page {
      ...PageSlugEntity
    }
    url
    analyticsId
  }
  ${PageSlugEntityFragmentDoc}
`
export const MenuSectionFragmentDoc = gql`
  fragment MenuSection on ComponentMenuMenuSection {
    id
    label
    icon
    subtext
    page {
      ...PageSlugEntity
    }
    links {
      ...MenuLink
    }
  }
  ${PageSlugEntityFragmentDoc}
  ${MenuLinkFragmentDoc}
`
export const MenuItemFragmentDoc = gql`
  fragment MenuItem on ComponentMenuMenuItem {
    id
    label
    icon
    page {
      ...PageSlugEntity
    }
    sections {
      ...MenuSection
    }
  }
  ${PageSlugEntityFragmentDoc}
  ${MenuSectionFragmentDoc}
`
export const HeaderLinkFragmentDoc = gql`
  fragment HeaderLink on ComponentGeneralHeaderLink {
    label
    page {
      ...PageSlugEntity
    }
    url
    analyticsId
    showOnDesktop
    showOnMobile
    icon
  }
  ${PageSlugEntityFragmentDoc}
`
export const ParentPageFragmentDoc = gql`
  fragment ParentPage on Page {
    documentId
    slug
    locale
    title
  }
`
export const PageParentPagesFragmentDoc = gql`
  fragment PageParentPages on Page {
    ...ParentPage
    parentPage {
      ...ParentPage
      parentPage {
        ...ParentPage
        parentPage {
          ...ParentPage
          parentPage {
            ...ParentPage
          }
        }
      }
    }
  }
  ${ParentPageFragmentDoc}
`
export const GeneralFragmentDoc = gql`
  fragment General on General {
    header {
      links {
        ...HeaderLink
      }
      accountLink {
        ...CommonLink
      }
    }
    newsPage {
      ...PageParentPages
    }
    officialBoardPage {
      ...PageParentPages
    }
    privacyPolicyPage {
      ...PageParentPages
    }
    vznPage {
      ...PageParentPages
    }
    inbaPage {
      ...PageParentPages
    }
    inbaReleasesPage {
      ...PageParentPages
    }
    documentsPage {
      ...PageParentPages
    }
  }
  ${HeaderLinkFragmentDoc}
  ${CommonLinkFragmentDoc}
  ${PageParentPagesFragmentDoc}
`
export const AlertFragmentDoc = gql`
  fragment Alert on Alert {
    updatedAt
    text
  }
`
export const UploadImageSrcEntityFragmentDoc = gql`
  fragment UploadImageSrcEntity on UploadFile {
    documentId
    url
  }
`
export const PageCardEntityFragmentDoc = gql`
  fragment PageCardEntity on Page {
    ...PageSlugEntity
    pageBackgroundImage {
      ...UploadImageSrcEntity
    }
  }
  ${PageSlugEntityFragmentDoc}
  ${UploadImageSrcEntityFragmentDoc}
`
export const HomepageHighlightsItemFragmentDoc = gql`
  fragment HomepageHighlightsItem on ComponentBlocksHomepageHighlightsItem {
    id
    label
    subtext
    page {
      ...PageCardEntity
    }
    article {
      ...ArticleCardEntity
    }
    url
    media {
      ...UploadImageEntity
    }
    analyticsId
  }
  ${PageCardEntityFragmentDoc}
  ${ArticleCardEntityFragmentDoc}
  ${UploadImageEntityFragmentDoc}
`
export const HomepageTabsFragmentDoc = gql`
  fragment HomepageTabs on ComponentSectionsHomepageTabs {
    leftArticle {
      ...ArticleCardEntity
    }
    rightArticle {
      ...ArticleCardEntity
    }
    newsPageLink {
      ...CommonLink
    }
    officialBoardPageLink {
      ...CommonLink
    }
    roadClosuresPageLink {
      ...CommonLink
    }
  }
  ${ArticleCardEntityFragmentDoc}
  ${CommonLinkFragmentDoc}
`
export const HomepageMayorAndCouncilSectionFragmentDoc = gql`
  fragment HomepageMayorAndCouncilSection on ComponentSectionsHomepageMayorAndCouncil {
    title
    text
    mayorCard {
      ...CommonLink
    }
    councilCard {
      ...CommonLink
    }
  }
  ${CommonLinkFragmentDoc}
`
export const TootootEventsSectionFragmentDoc = gql`
  fragment TootootEventsSection on ComponentSectionsTootootEvents {
    title
    text
    showMoreLink {
      ...CommonLink
    }
  }
  ${CommonLinkFragmentDoc}
`
export const TopServicesItemFragmentDoc = gql`
  fragment TopServicesItem on ComponentBlocksTopServicesItem {
    icon
    link {
      ...CommonLink
    }
  }
  ${CommonLinkFragmentDoc}
`
export const HomepageInbaFragmentDoc = gql`
  fragment HomepageInba on ComponentBlocksInBa {
    title
    content
    showMoreLink {
      ...CommonLink
    }
  }
  ${CommonLinkFragmentDoc}
`
export const HomepageEntityFragmentDoc = gql`
  fragment HomepageEntity on Homepage {
    documentId
    updatedAt
    createdAt
    metaTitle
    metaDescription
    welcomeHeadline
    welcomeMedia {
      ...UploadImageSrcEntity
    }
    highlights {
      title
      text
      cards {
        ...HomepageHighlightsItem
      }
    }
    tabs {
      ...HomepageTabs
    }
    mayorAndCouncil {
      ...HomepageMayorAndCouncilSection
    }
    eventsSection {
      ...TootootEventsSection
    }
    topServices {
      title
      services {
        ...TopServicesItem
      }
    }
    inba {
      ...HomepageInba
    }
  }
  ${UploadImageSrcEntityFragmentDoc}
  ${HomepageHighlightsItemFragmentDoc}
  ${HomepageTabsFragmentDoc}
  ${HomepageMayorAndCouncilSectionFragmentDoc}
  ${TootootEventsSectionFragmentDoc}
  ${TopServicesItemFragmentDoc}
  ${HomepageInbaFragmentDoc}
`
export const InbaReleaseEntityFragmentDoc = gql`
  fragment InbaReleaseEntity on InbaRelease {
    ...InbaReleaseCardEntity
    rearImage {
      ...UploadImageEntity
    }
    files {
      id
      title
      media {
        ...UploadFileEntity
      }
    }
    articles {
      ...ArticleCardEntity
    }
    featuredArticles {
      ...ArticleCardEntity
    }
  }
  ${InbaReleaseCardEntityFragmentDoc}
  ${UploadImageEntityFragmentDoc}
  ${UploadFileEntityFragmentDoc}
  ${ArticleCardEntityFragmentDoc}
`
export const InbaReleaseHomepageInbaCardEntityFragmentDoc = gql`
  fragment InbaReleaseHomepageInbaCardEntity on InbaRelease {
    documentId
    coverImage {
      ...UploadImageEntity
    }
    rearImage {
      ...UploadImageEntity
    }
  }
  ${UploadImageEntityFragmentDoc}
`
export const PageSubnavigationEntityFragmentDoc = gql`
  fragment PageSubnavigationEntity on Page {
    ...PageSlugEntity
    childPages {
      ...PageSlugEntity
    }
  }
  ${PageSlugEntityFragmentDoc}
`
export const PageLinkFragmentDoc = gql`
  fragment PageLink on ComponentBlocksPageLink {
    label: title
    page {
      ...PageSlugEntity
    }
    url
    analyticsId
  }
  ${PageSlugEntityFragmentDoc}
`
export const AdminGroupEntityFragmentDoc = gql`
  fragment AdminGroupEntity on AdminGroup {
    ...AdminGroupSlugEntity
    contentManagedBy
    landingPage {
      ...PageSubnavigationEntity
      localizations {
        ...PageSubnavigationEntity
      }
    }
    submenuPages {
      ...PageLink
    }
  }
  ${AdminGroupSlugEntityFragmentDoc}
  ${PageSubnavigationEntityFragmentDoc}
  ${PageLinkFragmentDoc}
`
export const EventPageHeaderSectionFragmentDoc = gql`
  fragment EventPageHeaderSection on ComponentHeaderSectionsEvent {
    date
    address
  }
`
export const FacilityPageHeaderSectionFragmentDoc = gql`
  fragment FacilityPageHeaderSection on ComponentHeaderSectionsFacility {
    address
    navigateToLink
    media {
      ...UploadImageEntity
    }
  }
  ${UploadImageEntityFragmentDoc}
`
export const PageHeaderSectionsFragmentDoc = gql`
  fragment PageHeaderSections on PagePageHeaderSectionsDynamicZone {
    __typename
    ... on ComponentHeaderSectionsEvent {
      ...EventPageHeaderSection
    }
    ... on ComponentHeaderSectionsFacility {
      ...FacilityPageHeaderSection
    }
  }
  ${EventPageHeaderSectionFragmentDoc}
  ${FacilityPageHeaderSectionFragmentDoc}
`
export const SubnavigationLinkFragmentDoc = gql`
  fragment SubnavigationLink on ComponentBlocksSubnavigationLink {
    label
    subtext
    page {
      ...PageSlugEntity
    }
    url
    analyticsId
  }
  ${PageSlugEntityFragmentDoc}
`
export const SubnavigationSectionFragmentDoc = gql`
  fragment SubnavigationSection on ComponentSectionsSubnavigation {
    links {
      id
      ...SubnavigationLink
    }
  }
  ${SubnavigationLinkFragmentDoc}
`
export const DividerSectionFragmentDoc = gql`
  fragment DividerSection on ComponentSectionsDivider {
    style
  }
`
export const TextWithImageSectionFragmentDoc = gql`
  fragment TextWithImageSection on ComponentSectionsTextWithImage {
    content
    imagePosition
    imageSrc {
      ...UploadImageEntity
    }
    imageAspectRatio
    links {
      ...CommonLink
    }
  }
  ${UploadImageEntityFragmentDoc}
  ${CommonLinkFragmentDoc}
`
export const TextWithImageOverlappedSectionFragmentDoc = gql`
  fragment TextWithImageOverlappedSection on ComponentSectionsTextWithImageOverlapped {
    content
    imagePositionTextWithImageOverlapped: imagePosition
    image {
      ...UploadImageEntity
    }
    links {
      ...CommonLink
    }
  }
  ${UploadImageEntityFragmentDoc}
  ${CommonLinkFragmentDoc}
`
export const IframeSectionFragmentDoc = gql`
  fragment IframeSection on ComponentSectionsIframe {
    title
    text
    url
    iframeTitle
    iframeHeight
    hasBorder
    allowGeolocation
    titleLevelIframeSection: titleLevel
  }
`
export const GallerySectionFragmentDoc = gql`
  fragment GallerySection on ComponentSectionsGallery {
    title
    text
    medias(pagination: { limit: -1 }) {
      ...UploadImageEntity
    }
    titleLevelGallerySection: titleLevel
  }
  ${UploadImageEntityFragmentDoc}
`
export const FileListSectionFragmentDoc = gql`
  fragment FileListSection on ComponentSectionsFileList {
    title
    text
    fileList(pagination: { limit: -1 }) {
      ...FileBlock
    }
    titleLevelFileListSection: titleLevel
  }
  ${FileBlockFragmentDoc}
`
export const ColumnedTextSectionFragmentDoc = gql`
  fragment ColumnedTextSection on ComponentSectionsColumnedText {
    title
    content
  }
`
export const ColumnsItemFragmentDoc = gql`
  fragment ColumnsItem on ComponentBlocksColumnsItem {
    title
    text
    image {
      ...UploadImageEntity
    }
  }
  ${UploadImageEntityFragmentDoc}
`
export const ColumnsSectionFragmentDoc = gql`
  fragment ColumnsSection on ComponentSectionsColumns {
    title
    text
    columns(pagination: { limit: -1 }) {
      ...ColumnsItem
    }
    imageVariant
    responsiveLayout
  }
  ${ColumnsItemFragmentDoc}
`
export const NarrowTextSectionFragmentDoc = gql`
  fragment NarrowTextSection on ComponentSectionsNarrowText {
    content
    width
  }
`
export const LinksSectionFragmentDoc = gql`
  fragment LinksSection on ComponentSectionsLinks {
    title
    pageLinks(pagination: { limit: -1 }) {
      ...PageLink
    }
    titleLevelLinksSection: titleLevel
  }
  ${PageLinkFragmentDoc}
`
export const ComponentAccordionItemsInstitutionFragmentDoc = gql`
  fragment ComponentAccordionItemsInstitution on ComponentAccordionItemsInstitution {
    title
    subtitle
    category
    firstColumn
    secondColumn
    thirdColumn
    url
    urlLabel
  }
`
export const FileItemBlockFragmentDoc = gql`
  fragment FileItemBlock on ComponentBlocksFileItem {
    id
    title
    media {
      ...UploadFileEntity
    }
  }
  ${UploadFileEntityFragmentDoc}
`
export const ComponentAccordionItemsFlatTextFragmentDoc = gql`
  fragment ComponentAccordionItemsFlatText on ComponentAccordionItemsFlatText {
    category
    content
    moreLinkTitle
    moreLinkUrl
    moreLinkPage {
      ...PageSlugEntity
    }
    fileList {
      ...FileItemBlock
    }
  }
  ${PageSlugEntityFragmentDoc}
  ${FileItemBlockFragmentDoc}
`
export const AccordionSectionFragmentDoc = gql`
  fragment AccordionSection on ComponentSectionsAccordion {
    title
    institutions(pagination: { limit: -1 }) {
      ...ComponentAccordionItemsInstitution
    }
    flatText(pagination: { limit: -1 }) {
      ...ComponentAccordionItemsFlatText
    }
    titleLevelAccordionSection: titleLevel
  }
  ${ComponentAccordionItemsInstitutionFragmentDoc}
  ${ComponentAccordionItemsFlatTextFragmentDoc}
`
export const VideoBlockFragmentDoc = gql`
  fragment VideoBlock on ComponentBlocksVideo {
    id
    title
    speaker
    url
  }
`
export const VideosSectionFragmentDoc = gql`
  fragment VideosSection on ComponentSectionsVideos {
    id
    title
    subtitle
    videos {
      ...VideoBlock
    }
    titleLevelVideosSection: titleLevel
  }
  ${VideoBlockFragmentDoc}
`
export const NumericalListItemBlockFragmentDoc = gql`
  fragment NumericalListItemBlock on ComponentBlocksNumericalListItem {
    text
  }
`
export const NumericalListSectionFragmentDoc = gql`
  fragment NumericalListSection on ComponentSectionsNumericalList {
    id
    title
    text
    items {
      ...NumericalListItemBlock
    }
    variant
  }
  ${NumericalListItemBlockFragmentDoc}
`
export const ArticlesSectionFragmentDoc = gql`
  fragment ArticlesSection on ComponentSectionsArticles {
    title
    text
    showAll
    articles {
      ...ArticleCardEntity
    }
    category {
      ...PageCategoryEntity
    }
    articleCategories {
      ...ArticleCategoryEntity
    }
    tags {
      ...TagEntity
    }
    adminGroups {
      ...AdminGroupSlugEntity
    }
    showMoreLink {
      ...CommonLink
    }
  }
  ${ArticleCardEntityFragmentDoc}
  ${PageCategoryEntityFragmentDoc}
  ${ArticleCategoryEntityFragmentDoc}
  ${TagEntityFragmentDoc}
  ${AdminGroupSlugEntityFragmentDoc}
  ${CommonLinkFragmentDoc}
`
export const InbaReleasesSectionFragmentDoc = gql`
  fragment InbaReleasesSection on ComponentSectionsInbaReleases {
    title
    text
    variantInbaReleasesSection: variant
    showMoreLink {
      ...CommonLink
    }
  }
  ${CommonLinkFragmentDoc}
`
export const OrganizationalStructureSectionFragmentDoc = gql`
  fragment OrganizationalStructureSection on ComponentSectionsOrganizationalStructure {
    title
  }
`
export const ProsAndConsCardComponentFragmentDoc = gql`
  fragment ProsAndConsCardComponent on ComponentBlocksProsAndConsCard {
    title
    items {
      label
    }
  }
`
export const ProsAndConsSectionFragmentDoc = gql`
  fragment ProsAndConsSection on ComponentSectionsProsAndConsSection {
    title
    text
    textAlignProsAndCons: textAlign
    pros {
      ...ProsAndConsCardComponent
    }
    cons {
      ...ProsAndConsCardComponent
    }
  }
  ${ProsAndConsCardComponentFragmentDoc}
`
export const ComparisonCardComponentFragmentDoc = gql`
  fragment ComparisonCardComponent on ComponentBlocksComparisonCard {
    title
    items {
      label
    }
    iconMedia {
      url
    }
  }
`
export const ComparisonSectionFragmentDoc = gql`
  fragment ComparisonSection on ComponentSectionsComparisonSection {
    title
    text
    textAlignComparison: textAlign
    cards {
      ...ComparisonCardComponent
    }
  }
  ${ComparisonCardComponentFragmentDoc}
`
export const BannerSectionFragmentDoc = gql`
  fragment BannerSection on ComponentSectionsBanner {
    bannerTitle: title
    content
    contentPosition
    bannerVariant: variant
    media {
      url
    }
    primaryLink {
      ...CommonLink
    }
    secondaryLink {
      ...CommonLink
    }
    tertiaryLink {
      ...CommonLink
    }
  }
  ${CommonLinkFragmentDoc}
`
export const ContactCardBlockFragmentDoc = gql`
  fragment ContactCardBlock on ComponentBlocksContactCard {
    overrideLabel
    value
  }
`
export const ContactPersonCardBlockFragmentDoc = gql`
  fragment ContactPersonCardBlock on ComponentBlocksContactPersonCard {
    title
    subtext
    email
    phone
  }
`
export const ContactDirectionsCardBlockFragmentDoc = gql`
  fragment ContactDirectionsCardBlock on ComponentBlocksContactDirectionsCard {
    overrideLabel
    address
    parkingInfo
    publicTransportInfo
    barrierFreeInfo
    iframeUrl
  }
`
export const ContactsSectionFragmentDoc = gql`
  fragment ContactsSection on ComponentSectionsContactsSection {
    id
    title
    description
    addressContacts {
      ...ContactCardBlock
    }
    openingHoursContacts {
      ...ContactCardBlock
    }
    emailContacts {
      ...ContactCardBlock
    }
    phoneContacts {
      ...ContactCardBlock
    }
    webContacts {
      ...ContactCardBlock
    }
    postalAddressContacts {
      ...ContactCardBlock
    }
    billingInfoContacts {
      ...ContactCardBlock
    }
    bankConnectionContacts {
      ...ContactCardBlock
    }
    personContacts {
      ...ContactPersonCardBlock
    }
    directionsContact {
      ...ContactDirectionsCardBlock
    }
    titleLevelContactsSection: titleLevel
  }
  ${ContactCardBlockFragmentDoc}
  ${ContactPersonCardBlockFragmentDoc}
  ${ContactDirectionsCardBlockFragmentDoc}
`
export const RegulationEntityFragmentDoc = gql`
  fragment RegulationEntity on Regulation {
    documentId
    regNumber
    slug
    titleText
    fullTitle
    effectiveFrom
    category
    isFullTextRegulation
    mainDocument {
      ...UploadFileEntity
    }
    attachments {
      ...UploadFileEntity
    }
    amendments {
      documentId
      regNumber
      slug
      effectiveFrom
      isFullTextRegulation
      attachments {
        ...UploadFileEntity
      }
    }
    amending {
      documentId
      regNumber
      slug
      effectiveFrom
      cancellation {
        documentId
        regNumber
        slug
        effectiveFrom
      }
      amending {
        documentId
        regNumber
        slug
        cancellation {
          documentId
          regNumber
          slug
          effectiveFrom
        }
      }
    }
    cancellation {
      documentId
      regNumber
      slug
      effectiveFrom
    }
    cancelling {
      documentId
      regNumber
      slug
      effectiveFrom
    }
  }
  ${UploadFileEntityFragmentDoc}
`
export const RegulationsSectionFragmentDoc = gql`
  fragment RegulationsSection on ComponentSectionsRegulations {
    showAll
    regulations {
      ...RegulationEntity
    }
  }
  ${RegulationEntityFragmentDoc}
`
export const FaqEntityFragmentDoc = gql`
  fragment FaqEntity on Faq {
    documentId
    title
    body
  }
`
export const FaqsSectionFragmentDoc = gql`
  fragment FaqsSection on ComponentSectionsFaqs {
    title
    text
    faqs {
      ...FaqEntity
    }
    titleLevelFaqsSection: titleLevel
  }
  ${FaqEntityFragmentDoc}
`
export const FaqCategoryEntityFragmentDoc = gql`
  fragment FaqCategoryEntity on FaqCategory {
    documentId
    title
    slug
    faqs {
      ...FaqEntity
    }
  }
  ${FaqEntityFragmentDoc}
`
export const FaqCategoriesSectionFragmentDoc = gql`
  fragment FaqCategoriesSection on ComponentSectionsFaqCategories {
    id
    title
    text
    faqCategories {
      ...FaqCategoryEntity
    }
  }
  ${FaqCategoryEntityFragmentDoc}
`
export const PartnerBlockFragmentDoc = gql`
  fragment PartnerBlock on ComponentBlocksPartner {
    title
    url
    logo {
      ...UploadImageEntity
    }
  }
  ${UploadImageEntityFragmentDoc}
`
export const PartnersSectionFragmentDoc = gql`
  fragment PartnersSection on ComponentSectionsPartners {
    title
    text
    partners(pagination: { limit: -1 }) {
      ...PartnerBlock
    }
    logoRatio
    titleLevelPartnersSection: titleLevel
  }
  ${PartnerBlockFragmentDoc}
`
export const DocumentSlugEntityFragmentDoc = gql`
  fragment DocumentSlugEntity on Document {
    __typename
    documentId
    slug
    title
  }
`
export const DocumentCategoryEntityFragmentDoc = gql`
  fragment DocumentCategoryEntity on DocumentCategory {
    documentId
    title
    slug
  }
`
export const DocumentEntityFragmentDoc = gql`
  fragment DocumentEntity on Document {
    ...DocumentSlugEntity
    publishedAt
    updatedAt
    documentCategory {
      ...DocumentCategoryEntity
    }
    description
    files {
      ...UploadFileEntity
    }
  }
  ${DocumentSlugEntityFragmentDoc}
  ${DocumentCategoryEntityFragmentDoc}
  ${UploadFileEntityFragmentDoc}
`
export const DocumentsSectionFragmentDoc = gql`
  fragment DocumentsSection on ComponentSectionsDocuments {
    title
    text
    documents(pagination: { limit: -1 }) {
      ...DocumentEntity
    }
    showAll
    titleLevelDocumentsSection: titleLevel
  }
  ${DocumentEntityFragmentDoc}
`
export const NumbersOverviewItemBlockFragmentDoc = gql`
  fragment NumbersOverviewItemBlock on ComponentBlocksNumbersOverviewItem {
    id
    number
    text
  }
`
export const NumbersOverviewSectionFragmentDoc = gql`
  fragment NumbersOverviewSection on ComponentSectionsNumbersOverview {
    title
    text
    showMoreLink {
      ...CommonLink
    }
    numbersOverviewItems {
      ...NumbersOverviewItemBlock
    }
  }
  ${CommonLinkFragmentDoc}
  ${NumbersOverviewItemBlockFragmentDoc}
`
export const PageCardWithHeadersEntityFragmentDoc = gql`
  fragment PageCardWithHeadersEntity on Page {
    ...PageCardEntity
    pageHeaderSections {
      ...PageHeaderSections
    }
  }
  ${PageCardEntityFragmentDoc}
  ${PageHeaderSectionsFragmentDoc}
`
export const EventsSectionFragmentDoc = gql`
  fragment EventsSection on ComponentSectionsEvents {
    title
    text
    eventPages {
      ...PageCardWithHeadersEntity
    }
    titleLevelEventsSection: titleLevel
  }
  ${PageCardWithHeadersEntityFragmentDoc}
`
export const FacilitiesSectionFragmentDoc = gql`
  fragment FacilitiesSection on ComponentSectionsFacilities {
    title
    text
    facilityPages {
      ...PageCardWithHeadersEntity
    }
    titleLevelFacilitiesSection: titleLevel
  }
  ${PageCardWithHeadersEntityFragmentDoc}
`
export const CardLinkFragmentDoc = gql`
  fragment CardLink on ComponentBlocksCardLink {
    label
    subtext
    media {
      ...UploadImageEntity
    }
    page {
      ...PageCardEntity
    }
    article {
      ...ArticleCardEntity
    }
    url
    analyticsId
  }
  ${UploadImageEntityFragmentDoc}
  ${PageCardEntityFragmentDoc}
  ${ArticleCardEntityFragmentDoc}
`
export const StarzLandingPageSectionFragmentDoc = gql`
  fragment StarzLandingPageSection on ComponentSectionsStarzLandingPage {
    banner {
      title
      content
      contentPosition
      variant
      media {
        ...UploadImageEntity
      }
      primaryLink {
        ...CommonLink
      }
      secondaryLink {
        ...CommonLink
      }
      tertiaryLink {
        ...CommonLink
      }
    }
    cardLinks {
      ...CardLink
    }
  }
  ${UploadImageEntityFragmentDoc}
  ${CommonLinkFragmentDoc}
  ${CardLinkFragmentDoc}
`
export const OpeningHoursItemFragmentDoc = gql`
  fragment OpeningHoursItem on ComponentBlocksOpeningHoursItem {
    label
    value
  }
`
export const OpeningHoursSectionFragmentDoc = gql`
  fragment OpeningHoursSection on ComponentSectionsOpeningHours {
    title
    text
    openingHoursItems {
      ...OpeningHoursItem
    }
    alertMessage {
      text
    }
    titleLevelOpeningHoursSection: titleLevel
  }
  ${OpeningHoursItemFragmentDoc}
`
export const NewsletterSectionFragmentDoc = gql`
  fragment NewsletterSection on ComponentSectionsNewsletter {
    title
    text
    newsletterType
    socialLinksTitle
    facebookUrl
    instagramUrl
  }
`
export const ColumnsListItemFragmentDoc = gql`
  fragment ColumnsListItem on ComponentBlocksColumnsListItem {
    icon {
      ...UploadImageEntity
    }
    content
  }
  ${UploadImageEntityFragmentDoc}
`
export const ColumnsListSectionFragmentDoc = gql`
  fragment ColumnsListSection on ComponentSectionsColumnsList {
    title
    text
    leftColumn {
      ...ColumnsListItem
    }
    rightColumn {
      ...ColumnsListItem
    }
  }
  ${ColumnsListItemFragmentDoc}
`
export const ArticlesLandingPageSectionFragmentDoc = gql`
  fragment ArticlesLandingPageSection on ComponentSectionsArticlesLandingPage {
    leftArticle {
      ...ArticleCardEntity
    }
    newsPageLink {
      ...CommonLink
    }
  }
  ${ArticleCardEntityFragmentDoc}
  ${CommonLinkFragmentDoc}
`
export const AlertSectionFragmentDoc = gql`
  fragment AlertSection on ComponentSectionsAlert {
    title
    alertText
    alertVariant
  }
`
export const JobOfferListSectionFragmentDoc = gql`
  fragment JobOfferListSection on ComponentSectionsJobOfferList {
    title
    text
    titleLevel
  }
`
export const SectionsFragmentDoc = gql`
  fragment Sections on PageSectionsDynamicZone {
    __typename
    ... on ComponentSectionsDivider {
      ...DividerSection
    }
    ... on ComponentSectionsTextWithImage {
      ...TextWithImageSection
    }
    ... on ComponentSectionsTextWithImageOverlapped {
      ...TextWithImageOverlappedSection
    }
    ... on ComponentSectionsIframe {
      ...IframeSection
    }
    ... on ComponentSectionsGallery {
      ...GallerySection
    }
    ... on ComponentSectionsFileList {
      ...FileListSection
    }
    ... on ComponentSectionsColumnedText {
      ...ColumnedTextSection
    }
    ... on ComponentSectionsColumns {
      ...ColumnsSection
    }
    ... on ComponentSectionsNarrowText {
      ...NarrowTextSection
    }
    ... on ComponentSectionsLinks {
      ...LinksSection
    }
    ... on ComponentSectionsAccordion {
      ...AccordionSection
    }
    ... on ComponentSectionsVideos {
      ...VideosSection
    }
    ... on ComponentSectionsNumericalList {
      ...NumericalListSection
    }
    ... on ComponentSectionsArticles {
      ...ArticlesSection
    }
    ... on ComponentSectionsInbaReleases {
      ...InbaReleasesSection
    }
    ... on ComponentSectionsOrganizationalStructure {
      ...OrganizationalStructureSection
    }
    ... on ComponentSectionsProsAndConsSection {
      ...ProsAndConsSection
    }
    ... on ComponentSectionsComparisonSection {
      ...ComparisonSection
    }
    ... on ComponentSectionsBanner {
      ...BannerSection
    }
    ... on ComponentSectionsContactsSection {
      ...ContactsSection
    }
    ... on ComponentSectionsRegulations {
      ...RegulationsSection
    }
    ... on ComponentSectionsFaqs {
      ...FaqsSection
    }
    ... on ComponentSectionsFaqCategories {
      ...FaqCategoriesSection
    }
    ... on ComponentSectionsTootootEvents {
      ...TootootEventsSection
    }
    ... on ComponentSectionsPartners {
      ...PartnersSection
    }
    ... on ComponentSectionsDocuments {
      ...DocumentsSection
    }
    ... on ComponentSectionsNumbersOverview {
      ...NumbersOverviewSection
    }
    ... on ComponentSectionsEvents {
      ...EventsSection
    }
    ... on ComponentSectionsFacilities {
      ...FacilitiesSection
    }
    ... on ComponentSectionsStarzLandingPage {
      ...StarzLandingPageSection
    }
    ... on ComponentSectionsOpeningHours {
      ...OpeningHoursSection
    }
    ... on ComponentSectionsNewsletter {
      ...NewsletterSection
    }
    ... on ComponentSectionsColumnsList {
      ...ColumnsListSection
    }
    ... on ComponentSectionsArticlesLandingPage {
      ...ArticlesLandingPageSection
    }
    ... on ComponentSectionsAlert {
      ...AlertSection
    }
    ... on ComponentSectionsJobOfferList {
      ...JobOfferListSection
    }
  }
  ${DividerSectionFragmentDoc}
  ${TextWithImageSectionFragmentDoc}
  ${TextWithImageOverlappedSectionFragmentDoc}
  ${IframeSectionFragmentDoc}
  ${GallerySectionFragmentDoc}
  ${FileListSectionFragmentDoc}
  ${ColumnedTextSectionFragmentDoc}
  ${ColumnsSectionFragmentDoc}
  ${NarrowTextSectionFragmentDoc}
  ${LinksSectionFragmentDoc}
  ${AccordionSectionFragmentDoc}
  ${VideosSectionFragmentDoc}
  ${NumericalListSectionFragmentDoc}
  ${ArticlesSectionFragmentDoc}
  ${InbaReleasesSectionFragmentDoc}
  ${OrganizationalStructureSectionFragmentDoc}
  ${ProsAndConsSectionFragmentDoc}
  ${ComparisonSectionFragmentDoc}
  ${BannerSectionFragmentDoc}
  ${ContactsSectionFragmentDoc}
  ${RegulationsSectionFragmentDoc}
  ${FaqsSectionFragmentDoc}
  ${FaqCategoriesSectionFragmentDoc}
  ${TootootEventsSectionFragmentDoc}
  ${PartnersSectionFragmentDoc}
  ${DocumentsSectionFragmentDoc}
  ${NumbersOverviewSectionFragmentDoc}
  ${EventsSectionFragmentDoc}
  ${FacilitiesSectionFragmentDoc}
  ${StarzLandingPageSectionFragmentDoc}
  ${OpeningHoursSectionFragmentDoc}
  ${NewsletterSectionFragmentDoc}
  ${ColumnsListSectionFragmentDoc}
  ${ArticlesLandingPageSectionFragmentDoc}
  ${AlertSectionFragmentDoc}
  ${JobOfferListSectionFragmentDoc}
`
export const SidebarsFragmentDoc = gql`
  fragment Sidebars on PageSidebarDynamicZone {
    ... on ComponentSidebarsEmptySidebar {
      __typename
    }
  }
`
export const PageEntityFragmentDoc = gql`
  fragment PageEntity on Page {
    ...PageCardEntity
    alias
    subtext
    pageColor
    metaDiscription
    keywords
    showTableOfContents
    adminGroups {
      ...AdminGroupEntity
    }
    headerLinks {
      ...CommonLink
    }
    pageHeaderSections {
      ...PageHeaderSections
    }
    subnavigation {
      ...SubnavigationSection
    }
    sections {
      ...Sections
    }
    sidebar {
      ...Sidebars
    }
    localizations {
      slug
      locale
    }
    relatedContents {
      ...TagEntity
    }
    ...PageParentPages
  }
  ${PageCardEntityFragmentDoc}
  ${AdminGroupEntityFragmentDoc}
  ${CommonLinkFragmentDoc}
  ${PageHeaderSectionsFragmentDoc}
  ${SubnavigationSectionFragmentDoc}
  ${SectionsFragmentDoc}
  ${SidebarsFragmentDoc}
  ${TagEntityFragmentDoc}
  ${PageParentPagesFragmentDoc}
`
export const AdminGroupsDocument = gql`
  query AdminGroups($limit: Int = -1, $sort: [String] = ["title"]) {
    adminGroups(pagination: { limit: $limit }, sort: $sort) {
      ...AdminGroupEntity
    }
  }
  ${AdminGroupEntityFragmentDoc}
`
export const ArticleBySlugDocument = gql`
  query ArticleBySlug($slug: String!, $locale: I18NLocaleCode!) {
    articles(filters: { slug: { eq: $slug } }, locale: $locale) {
      ...ArticleEntity
    }
  }
  ${ArticleEntityFragmentDoc}
`
export const ArticlesStaticPathsDocument = gql`
  query ArticlesStaticPaths($limit: Int = -1, $locale: I18NLocaleCode!) {
    articles(locale: $locale, sort: "addedAt:desc", pagination: { limit: $limit }) {
      ...ArticleSlugEntity
    }
  }
  ${ArticleSlugEntityFragmentDoc}
`
export const ArticleCategoriesDocument = gql`
  query ArticleCategories($locale: I18NLocaleCode, $sort: [String] = ["title"]) {
    articleCategories(pagination: { limit: -1 }, locale: $locale, sort: $sort) {
      ...ArticleCategoryEntity
    }
  }
  ${ArticleCategoryEntityFragmentDoc}
`
export const ArticlesDocument = gql`
  query Articles(
    $sort: [String]
    $limit: Int
    $start: Int
    $filters: ArticleFiltersInput
    $locale: I18NLocaleCode
  ) {
    articles(
      sort: $sort
      pagination: { limit: $limit, start: $start }
      filters: $filters
      locale: $locale
    ) {
      ...ArticleCardEntity
    }
  }
  ${ArticleCardEntityFragmentDoc}
`
export const ArticlesRssFeedDocument = gql`
  query ArticlesRssFeed($locale: I18NLocaleCode!) {
    articles(locale: $locale, sort: "addedAt:desc", pagination: { limit: 20 }) {
      documentId
      slug
      title
      addedAt
      perex
      tags {
        title
        pageCategory {
          title
        }
      }
      coverMedia {
        url
        mime
        size
      }
    }
  }
`
export const Dev_AllArticlesDocument = gql`
  query Dev_AllArticles(
    $sort: [String]
    $limit: Int
    $start: Int
    $filters: ArticleFiltersInput
    $locale: I18NLocaleCode
  ) {
    articles(
      sort: $sort
      pagination: { limit: $limit, start: $start }
      filters: $filters
      locale: $locale
    ) {
      ...ArticleEntity
    }
  }
  ${ArticleEntityFragmentDoc}
`
export const AssetBySlugDocument = gql`
  query AssetBySlug($slug: String!) {
    assets(filters: { slug: { eq: $slug } }) {
      ...AssetEntity
    }
  }
  ${AssetEntityFragmentDoc}
`
export const AssetCategoriesDocument = gql`
  query AssetCategories {
    assetCategories(pagination: { limit: -1 }) {
      ...AssetCategoryEntity
    }
  }
  ${AssetCategoryEntityFragmentDoc}
`
export const DocumentBySlugDocument = gql`
  query DocumentBySlug($slug: String!) {
    documents(filters: { slug: { eq: $slug } }) {
      ...DocumentEntity
    }
  }
  ${DocumentEntityFragmentDoc}
`
export const DocumentCategoriesDocument = gql`
  query DocumentCategories {
    documentCategories(pagination: { limit: -1 }) {
      ...DocumentCategoryEntity
    }
  }
  ${DocumentCategoryEntityFragmentDoc}
`
export const AllFilesDocument = gql`
  query allFiles($locale: I18NLocaleCode) {
    articles(locale: $locale, pagination: { limit: -1 }) {
      coverMedia {
        ...UploadFile
      }
      gallery(pagination: { limit: -1 }) {
        ...UploadFile
      }
      files(pagination: { limit: -1 }) {
        media {
          ...UploadFile
        }
      }
    }
    inbaReleases(pagination: { limit: -1 }) {
      coverImage {
        ...UploadFile
      }
      rearImage {
        ...UploadFile
      }
      files(pagination: { limit: -1 }) {
        media {
          ...UploadFile
        }
      }
    }
    regulations(pagination: { limit: -1 }) {
      mainDocument {
        ...UploadFile
      }
      attachments(pagination: { limit: -1 }) {
        ...UploadFile
      }
    }
    pages(locale: $locale, pagination: { limit: -1 }) {
      pageBackgroundImage {
        ...UploadFile
      }
      pageHeaderSections {
        ... on ComponentHeaderSectionsFacility {
          media(pagination: { limit: -1 }) {
            ...UploadFile
          }
        }
      }
      sections {
        ... on ComponentSectionsAccordion {
          flatText(pagination: { limit: -1 }) {
            fileList(pagination: { limit: -1 }) {
              media {
                ...UploadFile
              }
            }
          }
        }
        ... on ComponentSectionsBanner {
          media {
            ...UploadFile
          }
        }
        ... on ComponentSectionsColumns {
          columns(pagination: { limit: -1 }) {
            image {
              ...UploadFile
            }
          }
        }
        ... on ComponentSectionsComparisonSection {
          cards(pagination: { limit: -1 }) {
            iconMedia {
              ...UploadFile
            }
          }
        }
        ... on ComponentSectionsFileList {
          fileList(pagination: { limit: -1 }) {
            media {
              ...UploadFile
            }
          }
        }
        ... on ComponentSectionsGallery {
          medias(pagination: { limit: -1 }) {
            ...UploadFile
          }
        }
        ... on ComponentSectionsPartners {
          partners(pagination: { limit: -1 }) {
            logo {
              ...UploadFile
            }
          }
        }
        ... on ComponentSectionsTextWithImage {
          imageSrc {
            ...UploadFile
          }
        }
        ... on ComponentSectionsTextWithImageOverlapped {
          image {
            ...UploadFile
          }
        }
      }
    }
  }
  ${UploadFileFragmentDoc}
`
export const GeneralDocument = gql`
  query General($locale: I18NLocaleCode!) {
    general(locale: $locale) {
      ...General
    }
    menu(locale: $locale) {
      menus {
        ...MenuItem
      }
    }
    footer(locale: $locale) {
      ...Footer
    }
    alert(locale: $locale) {
      ...Alert
    }
  }
  ${GeneralFragmentDoc}
  ${MenuItemFragmentDoc}
  ${FooterFragmentDoc}
  ${AlertFragmentDoc}
`
export const AlertDocument = gql`
  query Alert($locale: I18NLocaleCode!) {
    alert(locale: $locale) {
      ...Alert
    }
  }
  ${AlertFragmentDoc}
`
export const HomepageDocument = gql`
  query Homepage($locale: I18NLocaleCode!) {
    homepage(locale: $locale) {
      ...HomepageEntity
    }
  }
  ${HomepageEntityFragmentDoc}
`
export const InbaReleaseBySlugDocument = gql`
  query InbaReleaseBySlug($slug: String!) {
    inbaReleases(filters: { slug: { eq: $slug } }) {
      ...InbaReleaseEntity
    }
  }
  ${InbaReleaseEntityFragmentDoc}
`
export const InbaReleasesStaticPathsDocument = gql`
  query InbaReleasesStaticPaths {
    inbaReleases(sort: "releaseDate:desc") {
      documentId
      slug
    }
  }
`
export const InbaReleasesRssFeedDocument = gql`
  query InbaReleasesRssFeed {
    inbaReleases(sort: "releaseDate:desc", pagination: { limit: -1 }) {
      ...InbaReleaseCardEntity
    }
  }
  ${InbaReleaseCardEntityFragmentDoc}
`
export const HomepageLatestInbaReleaseDocument = gql`
  query HomepageLatestInbaRelease {
    inbaReleases(sort: "releaseDate:desc", pagination: { limit: 1 }) {
      ...InbaReleaseHomepageInbaCardEntity
    }
  }
  ${InbaReleaseHomepageInbaCardEntityFragmentDoc}
`
export const LatestInbaReleaseDocument = gql`
  query LatestInbaRelease {
    inbaReleases(sort: "releaseDate:desc", pagination: { limit: 1 }) {
      ...InbaReleaseEntity
    }
  }
  ${InbaReleaseEntityFragmentDoc}
`
export const PageCategoriesDocument = gql`
  query PageCategories($locale: I18NLocaleCode) {
    pageCategories(pagination: { limit: -1 }, locale: $locale) {
      ...PageCategoryEntity
    }
  }
  ${PageCategoryEntityFragmentDoc}
`
export const PagesStaticPathsDocument = gql`
  query PagesStaticPaths {
    pages(pagination: { limit: -1 }) {
      documentId
      slug
    }
  }
`
export const PageBySlugDocument = gql`
  query PageBySlug($slug: String!, $locale: I18NLocaleCode!) {
    pages(filters: { slug: { eq: $slug } }, locale: $locale) {
      ...PageEntity
    }
  }
  ${PageEntityFragmentDoc}
`
export const PageRedirectByAliasDocument = gql`
  query PageRedirectByAlias($alias: String!, $locale: I18NLocaleCode!) {
    pages(filters: { alias: { eq: $alias } }, locale: $locale) {
      ...PageSlugEntity
    }
    articles(filters: { alias: { eq: $alias } }, locale: $locale) {
      ...ArticleSlugEntity
    }
  }
  ${PageSlugEntityFragmentDoc}
  ${ArticleSlugEntityFragmentDoc}
`
export const Dev_AllPagesDocument = gql`
  query Dev_AllPages(
    $sort: [String]
    $limit: Int
    $start: Int
    $filters: PageFiltersInput
    $locale: I18NLocaleCode
  ) {
    pages(
      sort: $sort
      pagination: { limit: $limit, start: $start }
      filters: $filters
      locale: $locale
    ) {
      ...PageEntity
    }
  }
  ${PageEntityFragmentDoc}
`
export const UpdatePageDocument = gql`
  mutation updatePage($documentId: ID!, $locale: I18NLocaleCode, $pageInput: PageInput!) {
    updatePage(documentId: $documentId, locale: $locale, data: $pageInput) {
      documentId
    }
  }
`
export const AllRegulationsDocument = gql`
  query allRegulations {
    regulations(pagination: { limit: -1 }) {
      ...RegulationEntity
    }
  }
  ${RegulationEntityFragmentDoc}
`
export const RegulationsStaticPathsDocument = gql`
  query RegulationsStaticPaths {
    regulations(sort: "updatedAt:desc", pagination: { limit: 30 }) {
      documentId
      slug
    }
  }
`
export const RegulationByIdDocument = gql`
  query RegulationById($id: ID!) {
    regulation(documentId: $id) {
      ...RegulationEntity
    }
  }
  ${RegulationEntityFragmentDoc}
`
export const RegulationBySlugDocument = gql`
  query RegulationBySlug($slug: String) {
    regulations(filters: { slug: { eq: $slug } }) {
      ...RegulationEntity
    }
  }
  ${RegulationEntityFragmentDoc}
`
export const RegulationByYearDocument = gql`
  query RegulationByYear($year: String) {
    regulations(filters: { slug: { endsWith: $year } }) {
      ...RegulationEntity
    }
  }
  ${RegulationEntityFragmentDoc}
`
export const SetFullTitleToRegulationDocument = gql`
  mutation setFullTitleToRegulation($regulationId: ID!, $fullTitle: String) {
    updateRegulation(documentId: $regulationId, data: { fullTitle: $fullTitle }) {
      documentId
    }
  }
`
export const SetCancellationToRegulationDocument = gql`
  mutation setCancellationToRegulation($regulationId: ID!, $cancellationId: ID!) {
    updateRegulation(documentId: $regulationId, data: { cancellation: $cancellationId }) {
      documentId
    }
  }
`
export const SetAmendmentsToRegulationDocument = gql`
  mutation setAmendmentsToRegulation($regulationId: ID!, $amendmentsIds: [ID!]) {
    updateRegulation(documentId: $regulationId, data: { amendments: $amendmentsIds }) {
      documentId
    }
  }
`
export const DeleteRegulationByIdDocument = gql`
  mutation deleteRegulationById($id: ID!) {
    deleteRegulation(documentId: $id) {
      documentId
    }
  }
`
export const CreateBareRegulationDocument = gql`
  mutation createBareRegulation(
    $regNumber: String!
    $slug: String!
    $titleText: String
    $fullTitle: String
    $effectiveFrom: Date!
    $category: ENUM_REGULATION_CATEGORY
    $isFullTextRegulation: Boolean
    $mainDocumentId: ID
    $attachmentsIds: [ID]
  ) {
    createRegulation(
      data: {
        regNumber: $regNumber
        slug: $slug
        titleText: $titleText
        fullTitle: $fullTitle
        effectiveFrom: $effectiveFrom
        category: $category
        isFullTextRegulation: $isFullTextRegulation
        mainDocument: $mainDocumentId
        attachments: $attachmentsIds
      }
    ) {
      documentId
      regNumber
    }
  }
`
export const TagsDocument = gql`
  query Tags($locale: I18NLocaleCode, $sort: [String] = ["title"]) {
    tags(pagination: { limit: -1 }, locale: $locale, sort: $sort) {
      ...TagEntity
    }
  }
  ${TagEntityFragmentDoc}
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
  variables?: any,
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) =>
  action()

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    AdminGroups(
      variables?: AdminGroupsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<AdminGroupsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AdminGroupsQuery>({
            document: AdminGroupsDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'AdminGroups',
        'query',
        variables,
      )
    },
    ArticleBySlug(
      variables: ArticleBySlugQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<ArticleBySlugQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ArticleBySlugQuery>({
            document: ArticleBySlugDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'ArticleBySlug',
        'query',
        variables,
      )
    },
    ArticlesStaticPaths(
      variables: ArticlesStaticPathsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<ArticlesStaticPathsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ArticlesStaticPathsQuery>({
            document: ArticlesStaticPathsDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'ArticlesStaticPaths',
        'query',
        variables,
      )
    },
    ArticleCategories(
      variables?: ArticleCategoriesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<ArticleCategoriesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ArticleCategoriesQuery>({
            document: ArticleCategoriesDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'ArticleCategories',
        'query',
        variables,
      )
    },
    Articles(
      variables?: ArticlesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<ArticlesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ArticlesQuery>({
            document: ArticlesDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'Articles',
        'query',
        variables,
      )
    },
    ArticlesRssFeed(
      variables: ArticlesRssFeedQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<ArticlesRssFeedQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ArticlesRssFeedQuery>({
            document: ArticlesRssFeedDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'ArticlesRssFeed',
        'query',
        variables,
      )
    },
    Dev_AllArticles(
      variables?: Dev_AllArticlesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<Dev_AllArticlesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<Dev_AllArticlesQuery>({
            document: Dev_AllArticlesDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'Dev_AllArticles',
        'query',
        variables,
      )
    },
    AssetBySlug(
      variables: AssetBySlugQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<AssetBySlugQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AssetBySlugQuery>({
            document: AssetBySlugDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'AssetBySlug',
        'query',
        variables,
      )
    },
    AssetCategories(
      variables?: AssetCategoriesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<AssetCategoriesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AssetCategoriesQuery>({
            document: AssetCategoriesDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'AssetCategories',
        'query',
        variables,
      )
    },
    DocumentBySlug(
      variables: DocumentBySlugQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<DocumentBySlugQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DocumentBySlugQuery>({
            document: DocumentBySlugDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'DocumentBySlug',
        'query',
        variables,
      )
    },
    DocumentCategories(
      variables?: DocumentCategoriesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<DocumentCategoriesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DocumentCategoriesQuery>({
            document: DocumentCategoriesDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'DocumentCategories',
        'query',
        variables,
      )
    },
    allFiles(
      variables?: AllFilesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<AllFilesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AllFilesQuery>({
            document: AllFilesDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'allFiles',
        'query',
        variables,
      )
    },
    General(
      variables: GeneralQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<GeneralQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GeneralQuery>({
            document: GeneralDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'General',
        'query',
        variables,
      )
    },
    Alert(
      variables: AlertQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<AlertQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AlertQuery>({
            document: AlertDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'Alert',
        'query',
        variables,
      )
    },
    Homepage(
      variables: HomepageQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<HomepageQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<HomepageQuery>({
            document: HomepageDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'Homepage',
        'query',
        variables,
      )
    },
    InbaReleaseBySlug(
      variables: InbaReleaseBySlugQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<InbaReleaseBySlugQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<InbaReleaseBySlugQuery>({
            document: InbaReleaseBySlugDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'InbaReleaseBySlug',
        'query',
        variables,
      )
    },
    InbaReleasesStaticPaths(
      variables?: InbaReleasesStaticPathsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<InbaReleasesStaticPathsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<InbaReleasesStaticPathsQuery>({
            document: InbaReleasesStaticPathsDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'InbaReleasesStaticPaths',
        'query',
        variables,
      )
    },
    InbaReleasesRssFeed(
      variables?: InbaReleasesRssFeedQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<InbaReleasesRssFeedQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<InbaReleasesRssFeedQuery>({
            document: InbaReleasesRssFeedDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'InbaReleasesRssFeed',
        'query',
        variables,
      )
    },
    HomepageLatestInbaRelease(
      variables?: HomepageLatestInbaReleaseQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<HomepageLatestInbaReleaseQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<HomepageLatestInbaReleaseQuery>({
            document: HomepageLatestInbaReleaseDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'HomepageLatestInbaRelease',
        'query',
        variables,
      )
    },
    LatestInbaRelease(
      variables?: LatestInbaReleaseQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<LatestInbaReleaseQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<LatestInbaReleaseQuery>({
            document: LatestInbaReleaseDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'LatestInbaRelease',
        'query',
        variables,
      )
    },
    PageCategories(
      variables?: PageCategoriesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<PageCategoriesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<PageCategoriesQuery>({
            document: PageCategoriesDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'PageCategories',
        'query',
        variables,
      )
    },
    PagesStaticPaths(
      variables?: PagesStaticPathsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<PagesStaticPathsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<PagesStaticPathsQuery>({
            document: PagesStaticPathsDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'PagesStaticPaths',
        'query',
        variables,
      )
    },
    PageBySlug(
      variables: PageBySlugQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<PageBySlugQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<PageBySlugQuery>({
            document: PageBySlugDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'PageBySlug',
        'query',
        variables,
      )
    },
    PageRedirectByAlias(
      variables: PageRedirectByAliasQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<PageRedirectByAliasQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<PageRedirectByAliasQuery>({
            document: PageRedirectByAliasDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'PageRedirectByAlias',
        'query',
        variables,
      )
    },
    Dev_AllPages(
      variables?: Dev_AllPagesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<Dev_AllPagesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<Dev_AllPagesQuery>({
            document: Dev_AllPagesDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'Dev_AllPages',
        'query',
        variables,
      )
    },
    updatePage(
      variables: UpdatePageMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<UpdatePageMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdatePageMutation>({
            document: UpdatePageDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'updatePage',
        'mutation',
        variables,
      )
    },
    allRegulations(
      variables?: AllRegulationsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<AllRegulationsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AllRegulationsQuery>({
            document: AllRegulationsDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'allRegulations',
        'query',
        variables,
      )
    },
    RegulationsStaticPaths(
      variables?: RegulationsStaticPathsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<RegulationsStaticPathsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<RegulationsStaticPathsQuery>({
            document: RegulationsStaticPathsDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'RegulationsStaticPaths',
        'query',
        variables,
      )
    },
    RegulationById(
      variables: RegulationByIdQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<RegulationByIdQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<RegulationByIdQuery>({
            document: RegulationByIdDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'RegulationById',
        'query',
        variables,
      )
    },
    RegulationBySlug(
      variables?: RegulationBySlugQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<RegulationBySlugQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<RegulationBySlugQuery>({
            document: RegulationBySlugDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'RegulationBySlug',
        'query',
        variables,
      )
    },
    RegulationByYear(
      variables?: RegulationByYearQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<RegulationByYearQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<RegulationByYearQuery>({
            document: RegulationByYearDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'RegulationByYear',
        'query',
        variables,
      )
    },
    setFullTitleToRegulation(
      variables: SetFullTitleToRegulationMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<SetFullTitleToRegulationMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<SetFullTitleToRegulationMutation>({
            document: SetFullTitleToRegulationDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'setFullTitleToRegulation',
        'mutation',
        variables,
      )
    },
    setCancellationToRegulation(
      variables: SetCancellationToRegulationMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<SetCancellationToRegulationMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<SetCancellationToRegulationMutation>({
            document: SetCancellationToRegulationDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'setCancellationToRegulation',
        'mutation',
        variables,
      )
    },
    setAmendmentsToRegulation(
      variables: SetAmendmentsToRegulationMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<SetAmendmentsToRegulationMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<SetAmendmentsToRegulationMutation>({
            document: SetAmendmentsToRegulationDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'setAmendmentsToRegulation',
        'mutation',
        variables,
      )
    },
    deleteRegulationById(
      variables: DeleteRegulationByIdMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<DeleteRegulationByIdMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteRegulationByIdMutation>({
            document: DeleteRegulationByIdDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'deleteRegulationById',
        'mutation',
        variables,
      )
    },
    createBareRegulation(
      variables: CreateBareRegulationMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<CreateBareRegulationMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateBareRegulationMutation>({
            document: CreateBareRegulationDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'createBareRegulation',
        'mutation',
        variables,
      )
    },
    Tags(
      variables?: TagsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
      signal?: RequestInit['signal'],
    ): Promise<TagsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<TagsQuery>({
            document: TagsDocument,
            variables,
            requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders },
            signal,
          }),
        'Tags',
        'query',
        variables,
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
