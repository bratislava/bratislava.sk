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
  BlogPostSectionsDynamicZoneInput: { input: any; output: any }
  Date: { input: any; output: any }
  DateTime: { input: any; output: any }
  I18NLocaleCode: { input: any; output: any }
  JSON: { input: any; output: any }
  PagePageHeaderSectionsDynamicZoneInput: { input: any; output: any }
  PageSectionsDynamicZoneInput: { input: any; output: any }
  Upload: { input: any; output: any }
}

export type Alert = {
  __typename?: 'Alert'
  createdAt?: Maybe<Scalars['DateTime']['output']>
  locale?: Maybe<Scalars['String']['output']>
  localizations?: Maybe<AlertRelationResponseCollection>
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
  data?: Maybe<AlertEntity>
}

export type AlertInput = {
  text?: InputMaybe<Scalars['String']['input']>
}

export type AlertRelationResponseCollection = {
  __typename?: 'AlertRelationResponseCollection'
  data: Array<AlertEntity>
}

export type BlogPost = {
  __typename?: 'BlogPost'
  addedAt?: Maybe<Scalars['DateTime']['output']>
  author?: Maybe<UsersPermissionsUserEntityResponse>
  coverImage?: Maybe<UploadFileEntityResponse>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  date_added?: Maybe<Scalars['DateTime']['output']>
  excerpt?: Maybe<Scalars['String']['output']>
  locale?: Maybe<Scalars['String']['output']>
  localizations?: Maybe<BlogPostRelationResponseCollection>
  moreLink?: Maybe<ComponentBlocksBlogPostLink>
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  sections?: Maybe<Array<Maybe<BlogPostSectionsDynamicZone>>>
  slug?: Maybe<Scalars['String']['output']>
  tag?: Maybe<TagEntityResponse>
  title?: Maybe<Scalars['String']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type BlogPostLocalizationsArgs = {
  filters?: InputMaybe<BlogPostFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type BlogPostEntity = {
  __typename?: 'BlogPostEntity'
  attributes?: Maybe<BlogPost>
  id?: Maybe<Scalars['ID']['output']>
}

export type BlogPostEntityResponse = {
  __typename?: 'BlogPostEntityResponse'
  data?: Maybe<BlogPostEntity>
}

export type BlogPostEntityResponseCollection = {
  __typename?: 'BlogPostEntityResponseCollection'
  data: Array<BlogPostEntity>
  meta: ResponseCollectionMeta
}

export type BlogPostFiltersInput = {
  addedAt?: InputMaybe<DateTimeFilterInput>
  and?: InputMaybe<Array<InputMaybe<BlogPostFiltersInput>>>
  author?: InputMaybe<UsersPermissionsUserFiltersInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  date_added?: InputMaybe<DateTimeFilterInput>
  excerpt?: InputMaybe<StringFilterInput>
  id?: InputMaybe<IdFilterInput>
  locale?: InputMaybe<StringFilterInput>
  localizations?: InputMaybe<BlogPostFiltersInput>
  moreLink?: InputMaybe<ComponentBlocksBlogPostLinkFiltersInput>
  not?: InputMaybe<BlogPostFiltersInput>
  or?: InputMaybe<Array<InputMaybe<BlogPostFiltersInput>>>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  slug?: InputMaybe<StringFilterInput>
  tag?: InputMaybe<TagFiltersInput>
  title?: InputMaybe<StringFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type BlogPostInput = {
  addedAt?: InputMaybe<Scalars['DateTime']['input']>
  author?: InputMaybe<Scalars['ID']['input']>
  coverImage?: InputMaybe<Scalars['ID']['input']>
  date_added?: InputMaybe<Scalars['DateTime']['input']>
  excerpt?: InputMaybe<Scalars['String']['input']>
  moreLink?: InputMaybe<ComponentBlocksBlogPostLinkInput>
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
  sections?: InputMaybe<Array<Scalars['BlogPostSectionsDynamicZoneInput']['input']>>
  slug?: InputMaybe<Scalars['String']['input']>
  tag?: InputMaybe<Scalars['ID']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type BlogPostRelationResponseCollection = {
  __typename?: 'BlogPostRelationResponseCollection'
  data: Array<BlogPostEntity>
}

export type BlogPostSectionsDynamicZone =
  | ComponentSectionsColumnedText
  | ComponentSectionsDivider
  | ComponentSectionsFileList
  | ComponentSectionsGallery
  | ComponentSectionsNarrowText
  | ComponentSectionsNumericalList
  | ComponentSectionsRegulations
  | ComponentSectionsTextWithImage
  | ComponentSectionsVideos
  | Error

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
  align?: Maybe<Enum_Componentaccordionitemsflattext_Align>
  category?: Maybe<Scalars['String']['output']>
  content?: Maybe<Scalars['String']['output']>
  fileList?: Maybe<Array<Maybe<ComponentBlocksFileItem>>>
  id: Scalars['ID']['output']
  moreLinkPage?: Maybe<PageEntityResponse>
  moreLinkTitle?: Maybe<Scalars['String']['output']>
  moreLinkUrl?: Maybe<Scalars['String']['output']>
  width?: Maybe<Enum_Componentaccordionitemsflattext_Width>
}

export type ComponentAccordionItemsFlatTextFileListArgs = {
  filters?: InputMaybe<ComponentBlocksFileItemFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentAccordionItemsFlatTextFiltersInput = {
  align?: InputMaybe<StringFilterInput>
  and?: InputMaybe<Array<InputMaybe<ComponentAccordionItemsFlatTextFiltersInput>>>
  category?: InputMaybe<StringFilterInput>
  content?: InputMaybe<StringFilterInput>
  fileList?: InputMaybe<ComponentBlocksFileItemFiltersInput>
  moreLinkPage?: InputMaybe<PageFiltersInput>
  moreLinkTitle?: InputMaybe<StringFilterInput>
  moreLinkUrl?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentAccordionItemsFlatTextFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentAccordionItemsFlatTextFiltersInput>>>
  width?: InputMaybe<StringFilterInput>
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

export type ComponentAccordionItemsInstitutionNarrow = {
  __typename?: 'ComponentAccordionItemsInstitutionNarrow'
  category?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  subtitle?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
  url?: Maybe<Scalars['String']['output']>
  urlLabel?: Maybe<Scalars['String']['output']>
}

export type ComponentAccordionItemsInstitutionNarrowFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentAccordionItemsInstitutionNarrowFiltersInput>>>
  category?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentAccordionItemsInstitutionNarrowFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentAccordionItemsInstitutionNarrowFiltersInput>>>
  subtitle?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
  url?: InputMaybe<StringFilterInput>
  urlLabel?: InputMaybe<StringFilterInput>
}

export type ComponentBlocksBlogPostLink = {
  __typename?: 'ComponentBlocksBlogPostLink'
  blogPost?: Maybe<BlogPostEntityResponse>
  id: Scalars['ID']['output']
  title?: Maybe<Scalars['String']['output']>
  url?: Maybe<Scalars['String']['output']>
}

export type ComponentBlocksBlogPostLinkFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksBlogPostLinkFiltersInput>>>
  blogPost?: InputMaybe<BlogPostFiltersInput>
  not?: InputMaybe<ComponentBlocksBlogPostLinkFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksBlogPostLinkFiltersInput>>>
  title?: InputMaybe<StringFilterInput>
  url?: InputMaybe<StringFilterInput>
}

export type ComponentBlocksBlogPostLinkInput = {
  blogPost?: InputMaybe<Scalars['ID']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  title?: InputMaybe<Scalars['String']['input']>
  url?: InputMaybe<Scalars['String']['input']>
}

export type ComponentBlocksBookmarkLink = {
  __typename?: 'ComponentBlocksBookmarkLink'
  href?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  title?: Maybe<Scalars['String']['output']>
}

export type ComponentBlocksBookmarkLinkFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksBookmarkLinkFiltersInput>>>
  href?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentBlocksBookmarkLinkFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksBookmarkLinkFiltersInput>>>
  title?: InputMaybe<StringFilterInput>
}

export type ComponentBlocksBookmarkLinkInput = {
  href?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type ComponentBlocksCommonLink = {
  __typename?: 'ComponentBlocksCommonLink'
  blogPost?: Maybe<BlogPostEntityResponse>
  id: Scalars['ID']['output']
  label: Scalars['String']['output']
  page?: Maybe<PageEntityResponse>
  plausibleId?: Maybe<Scalars['String']['output']>
  url?: Maybe<Scalars['String']['output']>
}

export type ComponentBlocksCommonLinkFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksCommonLinkFiltersInput>>>
  blogPost?: InputMaybe<BlogPostFiltersInput>
  label?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentBlocksCommonLinkFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksCommonLinkFiltersInput>>>
  page?: InputMaybe<PageFiltersInput>
  plausibleId?: InputMaybe<StringFilterInput>
  url?: InputMaybe<StringFilterInput>
}

export type ComponentBlocksCommonLinkInput = {
  blogPost?: InputMaybe<Scalars['ID']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  label?: InputMaybe<Scalars['String']['input']>
  page?: InputMaybe<Scalars['ID']['input']>
  plausibleId?: InputMaybe<Scalars['String']['input']>
  url?: InputMaybe<Scalars['String']['input']>
}

export type ComponentBlocksComparisonCard = {
  __typename?: 'ComponentBlocksComparisonCard'
  iconMedia?: Maybe<UploadFileEntityResponse>
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

export type ComponentBlocksFile = {
  __typename?: 'ComponentBlocksFile'
  id: Scalars['ID']['output']
  media?: Maybe<UploadFileEntityResponse>
  title?: Maybe<Scalars['String']['output']>
}

export type ComponentBlocksFileFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksFileFiltersInput>>>
  not?: InputMaybe<ComponentBlocksFileFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksFileFiltersInput>>>
  title?: InputMaybe<StringFilterInput>
}

export type ComponentBlocksFileItem = {
  __typename?: 'ComponentBlocksFileItem'
  id: Scalars['ID']['output']
  media: UploadFileEntityResponse
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

export type ComponentBlocksFooterContactItem = {
  __typename?: 'ComponentBlocksFooterContactItem'
  id: Scalars['ID']['output']
  label: Scalars['String']['output']
  mail?: Maybe<Scalars['String']['output']>
  phone?: Maybe<Scalars['String']['output']>
}

export type ComponentBlocksFooterContactItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksFooterContactItemFiltersInput>>>
  label?: InputMaybe<StringFilterInput>
  mail?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentBlocksFooterContactItemFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksFooterContactItemFiltersInput>>>
  phone?: InputMaybe<StringFilterInput>
}

export type ComponentBlocksFooterContactItemInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  label?: InputMaybe<Scalars['String']['input']>
  mail?: InputMaybe<Scalars['String']['input']>
  phone?: InputMaybe<Scalars['String']['input']>
}

export type ComponentBlocksHomepageBookmark = {
  __typename?: 'ComponentBlocksHomepageBookmark'
  headline?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  link?: Maybe<ComponentBlocksBookmarkLink>
  picture?: Maybe<UploadFileEntityResponse>
  text?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
  variant?: Maybe<Scalars['String']['output']>
}

export type ComponentBlocksHomepageBookmarkFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksHomepageBookmarkFiltersInput>>>
  headline?: InputMaybe<StringFilterInput>
  link?: InputMaybe<ComponentBlocksBookmarkLinkFiltersInput>
  not?: InputMaybe<ComponentBlocksHomepageBookmarkFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksHomepageBookmarkFiltersInput>>>
  text?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
  variant?: InputMaybe<StringFilterInput>
}

export type ComponentBlocksHomepageBookmarkInput = {
  headline?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  link?: InputMaybe<ComponentBlocksBookmarkLinkInput>
  picture?: InputMaybe<Scalars['ID']['input']>
  text?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
  variant?: InputMaybe<Scalars['String']['input']>
}

export type ComponentBlocksHomepageHighlightsItem = {
  __typename?: 'ComponentBlocksHomepageHighlightsItem'
  id: Scalars['ID']['output']
  image: UploadFileEntityResponse
  link: ComponentBlocksCommonLink
}

export type ComponentBlocksHomepageHighlightsItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksHomepageHighlightsItemFiltersInput>>>
  link?: InputMaybe<ComponentBlocksCommonLinkFiltersInput>
  not?: InputMaybe<ComponentBlocksHomepageHighlightsItemFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksHomepageHighlightsItemFiltersInput>>>
}

export type ComponentBlocksHomepageHighlightsItemInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  image?: InputMaybe<Scalars['ID']['input']>
  link?: InputMaybe<ComponentBlocksCommonLinkInput>
}

export type ComponentBlocksIconWithTitleAndDescription = {
  __typename?: 'ComponentBlocksIconWithTitleAndDescription'
  desc?: Maybe<Scalars['String']['output']>
  disableIconBackground?: Maybe<Scalars['Boolean']['output']>
  icon?: Maybe<UploadFileEntityResponse>
  id: Scalars['ID']['output']
  title?: Maybe<Scalars['String']['output']>
}

export type ComponentBlocksIconWithTitleAndDescriptionFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksIconWithTitleAndDescriptionFiltersInput>>>
  desc?: InputMaybe<StringFilterInput>
  disableIconBackground?: InputMaybe<BooleanFilterInput>
  not?: InputMaybe<ComponentBlocksIconWithTitleAndDescriptionFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksIconWithTitleAndDescriptionFiltersInput>>>
  title?: InputMaybe<StringFilterInput>
}

export type ComponentBlocksInBa = {
  __typename?: 'ComponentBlocksInBa'
  content?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  title?: Maybe<Scalars['String']['output']>
}

export type ComponentBlocksInBaInput = {
  content?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  title?: InputMaybe<Scalars['String']['input']>
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
  title?: InputMaybe<StringFilterInput>
}

export type ComponentBlocksPageLink = {
  __typename?: 'ComponentBlocksPageLink'
  anchor?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  page?: Maybe<PageEntityResponse>
  title?: Maybe<Scalars['String']['output']>
  url?: Maybe<Scalars['String']['output']>
}

export type ComponentBlocksPageLinkFiltersInput = {
  anchor?: InputMaybe<StringFilterInput>
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksPageLinkFiltersInput>>>
  not?: InputMaybe<ComponentBlocksPageLinkFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksPageLinkFiltersInput>>>
  page?: InputMaybe<PageFiltersInput>
  title?: InputMaybe<StringFilterInput>
  url?: InputMaybe<StringFilterInput>
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

export type ComponentBlocksSubpage = {
  __typename?: 'ComponentBlocksSubpage'
  id: Scalars['ID']['output']
  link?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
}

export type ComponentBlocksTestimonialItem = {
  __typename?: 'ComponentBlocksTestimonialItem'
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
  quote: Scalars['String']['output']
}

export type ComponentBlocksTestimonialItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksTestimonialItemFiltersInput>>>
  name?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentBlocksTestimonialItemFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksTestimonialItemFiltersInput>>>
  quote?: InputMaybe<StringFilterInput>
}

export type ComponentBlocksTimelineItem = {
  __typename?: 'ComponentBlocksTimelineItem'
  content?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  title?: Maybe<Scalars['String']['output']>
}

export type ComponentBlocksTimelineItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksTimelineItemFiltersInput>>>
  content?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentBlocksTimelineItemFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksTimelineItemFiltersInput>>>
  title?: InputMaybe<StringFilterInput>
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
  url?: Maybe<Scalars['String']['output']>
}

export type ComponentBlocksVideoFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksVideoFiltersInput>>>
  not?: InputMaybe<ComponentBlocksVideoFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksVideoFiltersInput>>>
  speaker?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
  url?: InputMaybe<StringFilterInput>
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

export type ComponentGeneralHeaderInput = {
  accountLink?: InputMaybe<ComponentBlocksCommonLinkInput>
  id?: InputMaybe<Scalars['ID']['input']>
  links?: InputMaybe<Array<InputMaybe<ComponentGeneralHeaderLinkInput>>>
}

export type ComponentGeneralHeaderLink = {
  __typename?: 'ComponentGeneralHeaderLink'
  icon: Enum_Componentgeneralheaderlink_Icon
  id: Scalars['ID']['output']
  label: Scalars['String']['output']
  page?: Maybe<PageEntityResponse>
  showOnDesktop: Scalars['Boolean']['output']
  showOnMobile: Scalars['Boolean']['output']
  url?: Maybe<Scalars['String']['output']>
}

export type ComponentGeneralHeaderLinkFiltersInput = {
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
  icon?: InputMaybe<Enum_Componentgeneralheaderlink_Icon>
  id?: InputMaybe<Scalars['ID']['input']>
  label?: InputMaybe<Scalars['String']['input']>
  page?: InputMaybe<Scalars['ID']['input']>
  showOnDesktop?: InputMaybe<Scalars['Boolean']['input']>
  showOnMobile?: InputMaybe<Scalars['Boolean']['input']>
  url?: InputMaybe<Scalars['String']['input']>
}

export type ComponentMenuMenuItem = {
  __typename?: 'ComponentMenuMenuItem'
  icon: Enum_Componentmenumenuitem_Icon
  id: Scalars['ID']['output']
  label: Scalars['String']['output']
  page?: Maybe<PageEntityResponse>
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
  id: Scalars['ID']['output']
  label: Scalars['String']['output']
  page?: Maybe<PageEntityResponse>
  url?: Maybe<Scalars['String']['output']>
}

export type ComponentMenuMenuLinkFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentMenuMenuLinkFiltersInput>>>
  label?: InputMaybe<StringFilterInput>
  not?: InputMaybe<ComponentMenuMenuLinkFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentMenuMenuLinkFiltersInput>>>
  page?: InputMaybe<PageFiltersInput>
  url?: InputMaybe<StringFilterInput>
}

export type ComponentMenuMenuLinkInput = {
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
  page?: Maybe<PageEntityResponse>
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
}

export type ComponentMenuMenuSectionInput = {
  icon?: InputMaybe<Enum_Componentmenumenusection_Icon>
  id?: InputMaybe<Scalars['ID']['input']>
  label?: InputMaybe<Scalars['String']['input']>
  links?: InputMaybe<Array<InputMaybe<ComponentMenuMenuLinkInput>>>
  page?: InputMaybe<Scalars['ID']['input']>
}

export type ComponentOsItemsAdvancedAccordionDepartment = {
  __typename?: 'ComponentOsItemsAdvancedAccordionDepartment'
  id: Scalars['ID']['output']
  items?: Maybe<Array<Maybe<ComponentOsItemsAdvancedAccordionSubItem>>>
  title?: Maybe<Scalars['String']['output']>
}

export type ComponentOsItemsAdvancedAccordionDepartmentItemsArgs = {
  filters?: InputMaybe<ComponentOsItemsAdvancedAccordionSubItemFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentOsItemsAdvancedAccordionDepartmentFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentOsItemsAdvancedAccordionDepartmentFiltersInput>>>
  items?: InputMaybe<ComponentOsItemsAdvancedAccordionSubItemFiltersInput>
  not?: InputMaybe<ComponentOsItemsAdvancedAccordionDepartmentFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentOsItemsAdvancedAccordionDepartmentFiltersInput>>>
  title?: InputMaybe<StringFilterInput>
}

export type ComponentOsItemsAdvancedAccordionItem = {
  __typename?: 'ComponentOsItemsAdvancedAccordionItem'
  departments?: Maybe<Array<Maybe<ComponentOsItemsAdvancedAccordionDepartment>>>
  id: Scalars['ID']['output']
  title?: Maybe<Scalars['String']['output']>
}

export type ComponentOsItemsAdvancedAccordionItemDepartmentsArgs = {
  filters?: InputMaybe<ComponentOsItemsAdvancedAccordionDepartmentFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentOsItemsAdvancedAccordionItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentOsItemsAdvancedAccordionItemFiltersInput>>>
  departments?: InputMaybe<ComponentOsItemsAdvancedAccordionDepartmentFiltersInput>
  not?: InputMaybe<ComponentOsItemsAdvancedAccordionItemFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentOsItemsAdvancedAccordionItemFiltersInput>>>
  title?: InputMaybe<StringFilterInput>
}

export type ComponentOsItemsAdvancedAccordionSubItem = {
  __typename?: 'ComponentOsItemsAdvancedAccordionSubItem'
  id: Scalars['ID']['output']
  isGroupTitle?: Maybe<Scalars['Boolean']['output']>
  items?: Maybe<Array<Maybe<ComponentOsItemsAdvancedAccordionSubSubItem>>>
  title?: Maybe<Scalars['String']['output']>
}

export type ComponentOsItemsAdvancedAccordionSubItemItemsArgs = {
  filters?: InputMaybe<ComponentOsItemsAdvancedAccordionSubSubItemFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentOsItemsAdvancedAccordionSubItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentOsItemsAdvancedAccordionSubItemFiltersInput>>>
  isGroupTitle?: InputMaybe<BooleanFilterInput>
  items?: InputMaybe<ComponentOsItemsAdvancedAccordionSubSubItemFiltersInput>
  not?: InputMaybe<ComponentOsItemsAdvancedAccordionSubItemFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentOsItemsAdvancedAccordionSubItemFiltersInput>>>
  title?: InputMaybe<StringFilterInput>
}

export type ComponentOsItemsAdvancedAccordionSubSubItem = {
  __typename?: 'ComponentOsItemsAdvancedAccordionSubSubItem'
  id: Scalars['ID']['output']
  title?: Maybe<Scalars['String']['output']>
}

export type ComponentOsItemsAdvancedAccordionSubSubItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentOsItemsAdvancedAccordionSubSubItemFiltersInput>>>
  not?: InputMaybe<ComponentOsItemsAdvancedAccordionSubSubItemFiltersInput>
  or?: InputMaybe<Array<InputMaybe<ComponentOsItemsAdvancedAccordionSubSubItemFiltersInput>>>
  title?: InputMaybe<StringFilterInput>
}

export type ComponentSectionsAccordion = {
  __typename?: 'ComponentSectionsAccordion'
  flatText?: Maybe<Array<Maybe<ComponentAccordionItemsFlatText>>>
  id: Scalars['ID']['output']
  institutions?: Maybe<Array<Maybe<ComponentAccordionItemsInstitution>>>
  institutionsNarrow?: Maybe<Array<Maybe<ComponentAccordionItemsInstitutionNarrow>>>
  title?: Maybe<Scalars['String']['output']>
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

export type ComponentSectionsAccordionInstitutionsNarrowArgs = {
  filters?: InputMaybe<ComponentAccordionItemsInstitutionNarrowFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsBanner = {
  __typename?: 'ComponentSectionsBanner'
  content?: Maybe<Scalars['String']['output']>
  contentPosition: Enum_Componentsectionsbanner_Contentposition
  id: Scalars['ID']['output']
  media: UploadFileEntityResponse
  primaryLink?: Maybe<ComponentBlocksCommonLink>
  secondaryLink?: Maybe<ComponentBlocksCommonLink>
  tertiaryLink?: Maybe<ComponentBlocksCommonLink>
  title: Scalars['String']['output']
  variant: Enum_Componentsectionsbanner_Variant
}

export type ComponentSectionsBlogPostsByCategory = {
  __typename?: 'ComponentSectionsBlogPostsByCategory'
  category?: Maybe<PageCategoryEntityResponse>
  id: Scalars['ID']['output']
  text?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
}

export type ComponentSectionsBlogPostsByTags = {
  __typename?: 'ComponentSectionsBlogPostsByTags'
  id: Scalars['ID']['output']
  tags?: Maybe<TagRelationResponseCollection>
  text?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
}

export type ComponentSectionsBlogPostsByTagsTagsArgs = {
  filters?: InputMaybe<TagFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsBlogPostsList = {
  __typename?: 'ComponentSectionsBlogPostsList'
  id: Scalars['ID']['output']
  text?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
}

export type ComponentSectionsCalculator = {
  __typename?: 'ComponentSectionsCalculator'
  another_adult_value?: Maybe<Scalars['Float']['output']>
  child_value?: Maybe<Scalars['Float']['output']>
  hasBackground?: Maybe<Scalars['Boolean']['output']>
  id: Scalars['ID']['output']
  single_adult_value?: Maybe<Scalars['Float']['output']>
}

export type ComponentSectionsColumnedText = {
  __typename?: 'ComponentSectionsColumnedText'
  content?: Maybe<Scalars['String']['output']>
  contentAlignment?: Maybe<Enum_Componentsectionscolumnedtext_Contentalignment>
  id: Scalars['ID']['output']
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

export type ComponentSectionsContactsSection = {
  __typename?: 'ComponentSectionsContactsSection'
  addressContacts?: Maybe<Array<Maybe<ComponentBlocksContactCard>>>
  description?: Maybe<Scalars['String']['output']>
  emailContacts?: Maybe<Array<Maybe<ComponentBlocksContactCard>>>
  hasBackground?: Maybe<Scalars['Boolean']['output']>
  id: Scalars['ID']['output']
  phoneContacts?: Maybe<Array<Maybe<ComponentBlocksContactCard>>>
  title?: Maybe<Scalars['String']['output']>
  type: Enum_Componentsectionscontactssection_Type
  webContacts?: Maybe<Array<Maybe<ComponentBlocksContactCard>>>
}

export type ComponentSectionsContactsSectionAddressContactsArgs = {
  filters?: InputMaybe<ComponentBlocksContactCardFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsContactsSectionEmailContactsArgs = {
  filters?: InputMaybe<ComponentBlocksContactCardFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsContactsSectionPhoneContactsArgs = {
  filters?: InputMaybe<ComponentBlocksContactCardFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsContactsSectionWebContactsArgs = {
  filters?: InputMaybe<ComponentBlocksContactCardFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsDivider = {
  __typename?: 'ComponentSectionsDivider'
  id: Scalars['ID']['output']
  style?: Maybe<Enum_Componentsectionsdivider_Style>
}

export type ComponentSectionsFaqCategories = {
  __typename?: 'ComponentSectionsFaqCategories'
  faqCategories?: Maybe<FaqCategoryRelationResponseCollection>
  id: Scalars['ID']['output']
  text?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
}

export type ComponentSectionsFaqCategoriesFaqCategoriesArgs = {
  filters?: InputMaybe<FaqCategoryFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsFaqs = {
  __typename?: 'ComponentSectionsFaqs'
  faqs?: Maybe<FaqRelationResponseCollection>
  id: Scalars['ID']['output']
  text?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
}

export type ComponentSectionsFaqsFaqsArgs = {
  filters?: InputMaybe<FaqFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsFileList = {
  __typename?: 'ComponentSectionsFileList'
  fileList?: Maybe<Array<Maybe<ComponentBlocksFile>>>
  id: Scalars['ID']['output']
  text?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
}

export type ComponentSectionsFileListFileListArgs = {
  filters?: InputMaybe<ComponentBlocksFileFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsGallery = {
  __typename?: 'ComponentSectionsGallery'
  id: Scalars['ID']['output']
  medias: UploadFileRelationResponseCollection
  text?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
}

export type ComponentSectionsGalleryMediasArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsHomepageEvents = {
  __typename?: 'ComponentSectionsHomepageEvents'
  eventsPageLink?: Maybe<ComponentBlocksCommonLink>
  id: Scalars['ID']['output']
  text?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
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
  leftNewsItem?: Maybe<BlogPostEntityResponse>
  newsPageLink?: Maybe<ComponentBlocksCommonLink>
  officialBoardPageLink?: Maybe<ComponentBlocksCommonLink>
  rightNewsItem?: Maybe<BlogPostEntityResponse>
  roadClosuresPageLink?: Maybe<ComponentBlocksCommonLink>
}

export type ComponentSectionsHomepageTabsInput = {
  id?: InputMaybe<Scalars['ID']['input']>
  leftNewsItem?: InputMaybe<Scalars['ID']['input']>
  newsPageLink?: InputMaybe<ComponentBlocksCommonLinkInput>
  officialBoardPageLink?: InputMaybe<ComponentBlocksCommonLinkInput>
  rightNewsItem?: InputMaybe<Scalars['ID']['input']>
  roadClosuresPageLink?: InputMaybe<ComponentBlocksCommonLinkInput>
}

export type ComponentSectionsIconTitleDesc = {
  __typename?: 'ComponentSectionsIconTitleDesc'
  id: Scalars['ID']['output']
  list?: Maybe<Array<Maybe<ComponentBlocksIconWithTitleAndDescription>>>
  title?: Maybe<Scalars['String']['output']>
}

export type ComponentSectionsIconTitleDescListArgs = {
  filters?: InputMaybe<ComponentBlocksIconWithTitleAndDescriptionFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsIframe = {
  __typename?: 'ComponentSectionsIframe'
  allowFullscreen: Scalars['Boolean']['output']
  allowGeolocation?: Maybe<Scalars['Boolean']['output']>
  css?: Maybe<Scalars['String']['output']>
  fullHeight: Scalars['Boolean']['output']
  id: Scalars['ID']['output']
  iframeHeight: Scalars['String']['output']
  iframeWidth: Enum_Componentsectionsiframe_Iframewidth
  url: Scalars['String']['output']
}

export type ComponentSectionsInbaArticlesList = {
  __typename?: 'ComponentSectionsInbaArticlesList'
  featuredArts?: Maybe<InbaArticleRelationResponseCollection>
  id: Scalars['ID']['output']
  text?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
}

export type ComponentSectionsInbaArticlesListFeaturedArtsArgs = {
  filters?: InputMaybe<InbaArticleFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsInbaReleases = {
  __typename?: 'ComponentSectionsInbaReleases'
  id: Scalars['ID']['output']
  text?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
}

export type ComponentSectionsLinks = {
  __typename?: 'ComponentSectionsLinks'
  id: Scalars['ID']['output']
  pageLinks?: Maybe<Array<Maybe<ComponentBlocksPageLink>>>
  title?: Maybe<Scalars['String']['output']>
}

export type ComponentSectionsLinksPageLinksArgs = {
  filters?: InputMaybe<ComponentBlocksPageLinkFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsNarrowText = {
  __typename?: 'ComponentSectionsNarrowText'
  align?: Maybe<Enum_Componentsectionsnarrowtext_Align>
  content?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  width?: Maybe<Enum_Componentsectionsnarrowtext_Width>
}

export type ComponentSectionsNumericalList = {
  __typename?: 'ComponentSectionsNumericalList'
  buttonLink?: Maybe<Scalars['String']['output']>
  buttonText?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  items?: Maybe<Array<Maybe<ComponentBlocksNumericalListItem>>>
  title?: Maybe<Scalars['String']['output']>
  variant?: Maybe<Enum_Componentsectionsnumericallist_Variant>
}

export type ComponentSectionsNumericalListItemsArgs = {
  filters?: InputMaybe<ComponentBlocksNumericalListItemFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsOfficialBoard = {
  __typename?: 'ComponentSectionsOfficialBoard'
  id: Scalars['ID']['output']
}

export type ComponentSectionsOrganizationalStructure = {
  __typename?: 'ComponentSectionsOrganizationalStructure'
  id: Scalars['ID']['output']
  items?: Maybe<Array<Maybe<ComponentOsItemsAdvancedAccordionItem>>>
  title?: Maybe<Scalars['String']['output']>
}

export type ComponentSectionsOrganizationalStructureItemsArgs = {
  filters?: InputMaybe<ComponentOsItemsAdvancedAccordionItemFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
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

export type ComponentSectionsRegulations = {
  __typename?: 'ComponentSectionsRegulations'
  id: Scalars['ID']['output']
  regulations?: Maybe<RegulationRelationResponseCollection>
}

export type ComponentSectionsRegulationsRegulationsArgs = {
  filters?: InputMaybe<RegulationFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsRegulationsList = {
  __typename?: 'ComponentSectionsRegulationsList'
  id: Scalars['ID']['output']
  text?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
}

export type ComponentSectionsSubpageList = {
  __typename?: 'ComponentSectionsSubpageList'
  id: Scalars['ID']['output']
  subpageList?: Maybe<Array<Maybe<ComponentBlocksPageLink>>>
}

export type ComponentSectionsSubpageListSubpageListArgs = {
  filters?: InputMaybe<ComponentBlocksPageLinkFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsTestimonials = {
  __typename?: 'ComponentSectionsTestimonials'
  hasBackground?: Maybe<Scalars['Boolean']['output']>
  id: Scalars['ID']['output']
  testimonials: Array<Maybe<ComponentBlocksTestimonialItem>>
  text?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
}

export type ComponentSectionsTestimonialsTestimonialsArgs = {
  filters?: InputMaybe<ComponentBlocksTestimonialItemFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsTextWithImage = {
  __typename?: 'ComponentSectionsTextWithImage'
  content?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  imagePosition?: Maybe<Enum_Componentsectionstextwithimage_Imageposition>
  imageShadow?: Maybe<Scalars['Boolean']['output']>
  imageSrc?: Maybe<UploadFileEntityResponse>
}

export type ComponentSectionsTimeline = {
  __typename?: 'ComponentSectionsTimeline'
  id: Scalars['ID']['output']
  timelineItems?: Maybe<Array<Maybe<ComponentBlocksTimelineItem>>>
}

export type ComponentSectionsTimelineTimelineItemsArgs = {
  filters?: InputMaybe<ComponentBlocksTimelineItemFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
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
  videos?: Maybe<Array<Maybe<ComponentBlocksVideo>>>
}

export type ComponentSectionsVideosVideosArgs = {
  filters?: InputMaybe<ComponentBlocksVideoFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type ComponentSectionsWaves = {
  __typename?: 'ComponentSectionsWaves'
  id: Scalars['ID']['output']
  position?: Maybe<Enum_Componentsectionswaves_Position>
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

export enum Enum_Componentaccordionitemsflattext_Align {
  Center = 'center',
  Left = 'left',
  Right = 'right',
}

export enum Enum_Componentaccordionitemsflattext_Width {
  Default = 'default',
  Full = 'full',
  Narrow = 'narrow',
  Wide = 'wide',
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

export enum Enum_Componentsectionsbanner_Contentposition {
  Left = 'left',
  Right = 'right',
}

export enum Enum_Componentsectionsbanner_Variant {
  Color = 'color',
  Dark = 'dark',
  WhiteCondensed = 'white_condensed',
}

export enum Enum_Componentsectionscolumnedtext_Contentalignment {
  Center = 'center',
  Left = 'left',
  Right = 'right',
}

export enum Enum_Componentsectionscomparisonsection_Textalign {
  Center = 'center',
  Left = 'left',
}

export enum Enum_Componentsectionscontactssection_Type {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
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

export enum Enum_Componentsectionsiframe_Iframewidth {
  Container = 'container',
  Full = 'full',
}

export enum Enum_Componentsectionsnarrowtext_Align {
  Center = 'center',
  Left = 'left',
  Right = 'right',
}

export enum Enum_Componentsectionsnarrowtext_Width {
  Default = 'default',
  Full = 'full',
  Narrow = 'narrow',
  Wide = 'wide',
}

export enum Enum_Componentsectionsnumericallist_Variant {
  Basic = 'basic',
  Combined = 'combined',
  Roadmap = 'roadmap',
}

export enum Enum_Componentsectionsprosandconssection_Textalign {
  Center = 'center',
  Left = 'left',
}

export enum Enum_Componentsectionstextwithimage_Imageposition {
  Left = 'left',
  Right = 'right',
}

export enum Enum_Componentsectionswaves_Position {
  Bottom = 'bottom',
  Top = 'top',
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
  body?: Maybe<Scalars['String']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  faqCategory?: Maybe<FaqCategoryEntityResponse>
  locale?: Maybe<Scalars['String']['output']>
  localizations?: Maybe<FaqRelationResponseCollection>
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  title: Scalars['String']['output']
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type FaqLocalizationsArgs = {
  filters?: InputMaybe<FaqFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type FaqCategory = {
  __typename?: 'FaqCategory'
  createdAt?: Maybe<Scalars['DateTime']['output']>
  faqs?: Maybe<FaqRelationResponseCollection>
  locale?: Maybe<Scalars['String']['output']>
  localizations?: Maybe<FaqCategoryRelationResponseCollection>
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  slug: Scalars['String']['output']
  title: Scalars['String']['output']
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type FaqCategoryFaqsArgs = {
  filters?: InputMaybe<FaqFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type FaqCategoryLocalizationsArgs = {
  filters?: InputMaybe<FaqCategoryFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type FaqCategoryEntity = {
  __typename?: 'FaqCategoryEntity'
  attributes?: Maybe<FaqCategory>
  id?: Maybe<Scalars['ID']['output']>
}

export type FaqCategoryEntityResponse = {
  __typename?: 'FaqCategoryEntityResponse'
  data?: Maybe<FaqCategoryEntity>
}

export type FaqCategoryEntityResponseCollection = {
  __typename?: 'FaqCategoryEntityResponseCollection'
  data: Array<FaqCategoryEntity>
  meta: ResponseCollectionMeta
}

export type FaqCategoryFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<FaqCategoryFiltersInput>>>
  createdAt?: InputMaybe<DateTimeFilterInput>
  faqs?: InputMaybe<FaqFiltersInput>
  id?: InputMaybe<IdFilterInput>
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
  data: Array<FaqCategoryEntity>
}

export type FaqEntity = {
  __typename?: 'FaqEntity'
  attributes?: Maybe<Faq>
  id?: Maybe<Scalars['ID']['output']>
}

export type FaqEntityResponse = {
  __typename?: 'FaqEntityResponse'
  data?: Maybe<FaqEntity>
}

export type FaqEntityResponseCollection = {
  __typename?: 'FaqEntityResponseCollection'
  data: Array<FaqEntity>
  meta: ResponseCollectionMeta
}

export type FaqFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<FaqFiltersInput>>>
  body?: InputMaybe<StringFilterInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  faqCategory?: InputMaybe<FaqCategoryFiltersInput>
  id?: InputMaybe<IdFilterInput>
  locale?: InputMaybe<StringFilterInput>
  localizations?: InputMaybe<FaqFiltersInput>
  not?: InputMaybe<FaqFiltersInput>
  or?: InputMaybe<Array<InputMaybe<FaqFiltersInput>>>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  title?: InputMaybe<StringFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type FaqInput = {
  body?: InputMaybe<Scalars['String']['input']>
  faqCategory?: InputMaybe<Scalars['ID']['input']>
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type FaqRelationResponseCollection = {
  __typename?: 'FaqRelationResponseCollection'
  data: Array<FaqEntity>
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
  address?: Maybe<Scalars['String']['output']>
  columns?: Maybe<Array<Maybe<ComponentBlocksFooterColumn>>>
  contacts?: Maybe<Array<Maybe<ComponentBlocksFooterContactItem>>>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  facebookUrl?: Maybe<Scalars['String']['output']>
  innovationsLink?: Maybe<ComponentBlocksCommonLink>
  instagramUrl?: Maybe<Scalars['String']['output']>
  locale?: Maybe<Scalars['String']['output']>
  localizations?: Maybe<FooterRelationResponseCollection>
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type FooterColumnsArgs = {
  filters?: InputMaybe<ComponentBlocksFooterColumnFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type FooterContactsArgs = {
  filters?: InputMaybe<ComponentBlocksFooterContactItemFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type FooterLocalizationsArgs = {
  publicationState?: InputMaybe<PublicationState>
}

export type FooterEntity = {
  __typename?: 'FooterEntity'
  attributes?: Maybe<Footer>
  id?: Maybe<Scalars['ID']['output']>
}

export type FooterEntityResponse = {
  __typename?: 'FooterEntityResponse'
  data?: Maybe<FooterEntity>
}

export type FooterInput = {
  accessibilityPageLink?: InputMaybe<ComponentBlocksCommonLinkInput>
  address?: InputMaybe<Scalars['String']['input']>
  columns?: InputMaybe<Array<InputMaybe<ComponentBlocksFooterColumnInput>>>
  contacts?: InputMaybe<Array<InputMaybe<ComponentBlocksFooterContactItemInput>>>
  facebookUrl?: InputMaybe<Scalars['String']['input']>
  innovationsLink?: InputMaybe<ComponentBlocksCommonLinkInput>
  instagramUrl?: InputMaybe<Scalars['String']['input']>
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
}

export type FooterRelationResponseCollection = {
  __typename?: 'FooterRelationResponseCollection'
  data: Array<FooterEntity>
}

export type General = {
  __typename?: 'General'
  createdAt?: Maybe<Scalars['DateTime']['output']>
  header?: Maybe<ComponentGeneralHeader>
  inbaPage?: Maybe<PageEntityResponse>
  inbaReleasesPage?: Maybe<PageEntityResponse>
  locale?: Maybe<Scalars['String']['output']>
  localizations?: Maybe<GeneralRelationResponseCollection>
  newsPage?: Maybe<PageEntityResponse>
  officialBoardPage?: Maybe<PageEntityResponse>
  privacyPolicyPage?: Maybe<PageEntityResponse>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  vznPage?: Maybe<PageEntityResponse>
}

export type GeneralEntity = {
  __typename?: 'GeneralEntity'
  attributes?: Maybe<General>
  id?: Maybe<Scalars['ID']['output']>
}

export type GeneralEntityResponse = {
  __typename?: 'GeneralEntityResponse'
  data?: Maybe<GeneralEntity>
}

export type GeneralInput = {
  header?: InputMaybe<ComponentGeneralHeaderInput>
  inbaPage?: InputMaybe<Scalars['ID']['input']>
  inbaReleasesPage?: InputMaybe<Scalars['ID']['input']>
  newsPage?: InputMaybe<Scalars['ID']['input']>
  officialBoardPage?: InputMaybe<Scalars['ID']['input']>
  privacyPolicyPage?: InputMaybe<Scalars['ID']['input']>
  vznPage?: InputMaybe<Scalars['ID']['input']>
}

export type GeneralRelationResponseCollection = {
  __typename?: 'GeneralRelationResponseCollection'
  data: Array<GeneralEntity>
}

export type GenericMorph =
  | Alert
  | BlogPost
  | ComponentAccordionItemsFlatText
  | ComponentAccordionItemsInstitution
  | ComponentAccordionItemsInstitutionNarrow
  | ComponentBlocksBlogPostLink
  | ComponentBlocksBookmarkLink
  | ComponentBlocksCommonLink
  | ComponentBlocksComparisonCard
  | ComponentBlocksComparisonItem
  | ComponentBlocksContactCard
  | ComponentBlocksFile
  | ComponentBlocksFileItem
  | ComponentBlocksFooterColumn
  | ComponentBlocksFooterContactItem
  | ComponentBlocksHomepageBookmark
  | ComponentBlocksHomepageHighlightsItem
  | ComponentBlocksIconWithTitleAndDescription
  | ComponentBlocksInBa
  | ComponentBlocksNumericalListItem
  | ComponentBlocksPageLink
  | ComponentBlocksProsAndConsCard
  | ComponentBlocksSubpage
  | ComponentBlocksTestimonialItem
  | ComponentBlocksTimelineItem
  | ComponentBlocksTopServicesItem
  | ComponentBlocksVideo
  | ComponentGeneralHeader
  | ComponentGeneralHeaderLink
  | ComponentMenuMenuItem
  | ComponentMenuMenuLink
  | ComponentMenuMenuSection
  | ComponentOsItemsAdvancedAccordionDepartment
  | ComponentOsItemsAdvancedAccordionItem
  | ComponentOsItemsAdvancedAccordionSubItem
  | ComponentOsItemsAdvancedAccordionSubSubItem
  | ComponentSectionsAccordion
  | ComponentSectionsBanner
  | ComponentSectionsBlogPostsByCategory
  | ComponentSectionsBlogPostsByTags
  | ComponentSectionsBlogPostsList
  | ComponentSectionsCalculator
  | ComponentSectionsColumnedText
  | ComponentSectionsComparisonSection
  | ComponentSectionsContactsSection
  | ComponentSectionsDivider
  | ComponentSectionsFaqCategories
  | ComponentSectionsFaqs
  | ComponentSectionsFileList
  | ComponentSectionsGallery
  | ComponentSectionsHomepageEvents
  | ComponentSectionsHomepageHighlights
  | ComponentSectionsHomepageMayorAndCouncil
  | ComponentSectionsHomepageTabs
  | ComponentSectionsIconTitleDesc
  | ComponentSectionsIframe
  | ComponentSectionsInbaArticlesList
  | ComponentSectionsInbaReleases
  | ComponentSectionsLinks
  | ComponentSectionsNarrowText
  | ComponentSectionsNumericalList
  | ComponentSectionsOfficialBoard
  | ComponentSectionsOrganizationalStructure
  | ComponentSectionsProsAndConsSection
  | ComponentSectionsRegulations
  | ComponentSectionsRegulationsList
  | ComponentSectionsSubpageList
  | ComponentSectionsTestimonials
  | ComponentSectionsTextWithImage
  | ComponentSectionsTimeline
  | ComponentSectionsTopServices
  | ComponentSectionsVideos
  | ComponentSectionsWaves
  | ComponentTaxAdministratorsTaxAdministrator
  | Faq
  | FaqCategory
  | Footer
  | General
  | Homepage
  | I18NLocale
  | InbaArticle
  | InbaRelease
  | InbaTag
  | Menu
  | Page
  | PageCategory
  | Regulation
  | Tag
  | TaxAdministratorsList
  | UploadFile
  | UploadFolder
  | UsersPermissionsPermission
  | UsersPermissionsRole
  | UsersPermissionsUser

export type Homepage = {
  __typename?: 'Homepage'
  bookmarkTourists?: Maybe<ComponentBlocksHomepageBookmark>
  bookmarkUkraine?: Maybe<ComponentBlocksHomepageBookmark>
  cards?: Maybe<Array<Maybe<ComponentBlocksHomepageBookmark>>>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  eventsSection?: Maybe<ComponentSectionsHomepageEvents>
  highlights?: Maybe<ComponentSectionsHomepageHighlights>
  inba?: Maybe<ComponentBlocksInBa>
  inbaFrontImage: UploadFileEntityResponse
  inbaRearImage: UploadFileEntityResponse
  inbaUrl?: Maybe<Scalars['String']['output']>
  locale?: Maybe<Scalars['String']['output']>
  localizations?: Maybe<HomepageRelationResponseCollection>
  mayorAndCouncil?: Maybe<ComponentSectionsHomepageMayorAndCouncil>
  metaDescription: Scalars['String']['output']
  metaTitle: Scalars['String']['output']
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  tabs?: Maybe<ComponentSectionsHomepageTabs>
  topServices?: Maybe<ComponentSectionsTopServices>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  welcomeHeadline: Scalars['String']['output']
  welcomeMedia: UploadFileEntityResponse
}

export type HomepageCardsArgs = {
  filters?: InputMaybe<ComponentBlocksHomepageBookmarkFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type HomepageLocalizationsArgs = {
  publicationState?: InputMaybe<PublicationState>
}

export type HomepageEntity = {
  __typename?: 'HomepageEntity'
  attributes?: Maybe<Homepage>
  id?: Maybe<Scalars['ID']['output']>
}

export type HomepageEntityResponse = {
  __typename?: 'HomepageEntityResponse'
  data?: Maybe<HomepageEntity>
}

export type HomepageInput = {
  bookmarkTourists?: InputMaybe<ComponentBlocksHomepageBookmarkInput>
  bookmarkUkraine?: InputMaybe<ComponentBlocksHomepageBookmarkInput>
  cards?: InputMaybe<Array<InputMaybe<ComponentBlocksHomepageBookmarkInput>>>
  eventsSection?: InputMaybe<ComponentSectionsHomepageEventsInput>
  highlights?: InputMaybe<ComponentSectionsHomepageHighlightsInput>
  inba?: InputMaybe<ComponentBlocksInBaInput>
  inbaFrontImage?: InputMaybe<Scalars['ID']['input']>
  inbaRearImage?: InputMaybe<Scalars['ID']['input']>
  inbaUrl?: InputMaybe<Scalars['String']['input']>
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
  data: Array<HomepageEntity>
}

export type I18NLocale = {
  __typename?: 'I18NLocale'
  code?: Maybe<Scalars['String']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  name?: Maybe<Scalars['String']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type I18NLocaleEntity = {
  __typename?: 'I18NLocaleEntity'
  attributes?: Maybe<I18NLocale>
  id?: Maybe<Scalars['ID']['output']>
}

export type I18NLocaleEntityResponse = {
  __typename?: 'I18NLocaleEntityResponse'
  data?: Maybe<I18NLocaleEntity>
}

export type I18NLocaleEntityResponseCollection = {
  __typename?: 'I18NLocaleEntityResponseCollection'
  data: Array<I18NLocaleEntity>
  meta: ResponseCollectionMeta
}

export type I18NLocaleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>
  code?: InputMaybe<StringFilterInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  id?: InputMaybe<IdFilterInput>
  name?: InputMaybe<StringFilterInput>
  not?: InputMaybe<I18NLocaleFiltersInput>
  or?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>
  updatedAt?: InputMaybe<DateTimeFilterInput>
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
  coverImage?: Maybe<UploadFileEntityResponse>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  inbaRelease?: Maybe<InbaReleaseEntityResponse>
  inbaTag?: Maybe<InbaTagEntityResponse>
  locale?: Maybe<Scalars['String']['output']>
  localizations?: Maybe<InbaArticleRelationResponseCollection>
  perex?: Maybe<Scalars['String']['output']>
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  slug: Scalars['String']['output']
  title: Scalars['String']['output']
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type InbaArticleLocalizationsArgs = {
  filters?: InputMaybe<InbaArticleFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type InbaArticleEntity = {
  __typename?: 'InbaArticleEntity'
  attributes?: Maybe<InbaArticle>
  id?: Maybe<Scalars['ID']['output']>
}

export type InbaArticleEntityResponse = {
  __typename?: 'InbaArticleEntityResponse'
  data?: Maybe<InbaArticleEntity>
}

export type InbaArticleEntityResponseCollection = {
  __typename?: 'InbaArticleEntityResponseCollection'
  data: Array<InbaArticleEntity>
  meta: ResponseCollectionMeta
}

export type InbaArticleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<InbaArticleFiltersInput>>>
  content?: InputMaybe<StringFilterInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  id?: InputMaybe<IdFilterInput>
  inbaRelease?: InputMaybe<InbaReleaseFiltersInput>
  inbaTag?: InputMaybe<InbaTagFiltersInput>
  locale?: InputMaybe<StringFilterInput>
  localizations?: InputMaybe<InbaArticleFiltersInput>
  not?: InputMaybe<InbaArticleFiltersInput>
  or?: InputMaybe<Array<InputMaybe<InbaArticleFiltersInput>>>
  perex?: InputMaybe<StringFilterInput>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  slug?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type InbaArticleInput = {
  content?: InputMaybe<Scalars['String']['input']>
  coverImage?: InputMaybe<Scalars['ID']['input']>
  inbaRelease?: InputMaybe<Scalars['ID']['input']>
  inbaTag?: InputMaybe<Scalars['ID']['input']>
  perex?: InputMaybe<Scalars['String']['input']>
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
  slug?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type InbaArticleRelationResponseCollection = {
  __typename?: 'InbaArticleRelationResponseCollection'
  data: Array<InbaArticleEntity>
}

export type InbaRelease = {
  __typename?: 'InbaRelease'
  coverImage?: Maybe<UploadFileEntityResponse>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  files?: Maybe<Array<Maybe<ComponentBlocksFileItem>>>
  inbaArticles?: Maybe<InbaArticleRelationResponseCollection>
  perex?: Maybe<Scalars['String']['output']>
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  rearImage?: Maybe<UploadFileEntityResponse>
  releaseDate: Scalars['Date']['output']
  slug: Scalars['String']['output']
  title: Scalars['String']['output']
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type InbaReleaseFilesArgs = {
  filters?: InputMaybe<ComponentBlocksFileItemFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type InbaReleaseInbaArticlesArgs = {
  filters?: InputMaybe<InbaArticleFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type InbaReleaseEntity = {
  __typename?: 'InbaReleaseEntity'
  attributes?: Maybe<InbaRelease>
  id?: Maybe<Scalars['ID']['output']>
}

export type InbaReleaseEntityResponse = {
  __typename?: 'InbaReleaseEntityResponse'
  data?: Maybe<InbaReleaseEntity>
}

export type InbaReleaseEntityResponseCollection = {
  __typename?: 'InbaReleaseEntityResponseCollection'
  data: Array<InbaReleaseEntity>
  meta: ResponseCollectionMeta
}

export type InbaReleaseFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<InbaReleaseFiltersInput>>>
  createdAt?: InputMaybe<DateTimeFilterInput>
  files?: InputMaybe<ComponentBlocksFileItemFiltersInput>
  id?: InputMaybe<IdFilterInput>
  inbaArticles?: InputMaybe<InbaArticleFiltersInput>
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
  coverImage?: InputMaybe<Scalars['ID']['input']>
  files?: InputMaybe<Array<InputMaybe<ComponentBlocksFileItemInput>>>
  inbaArticles?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  perex?: InputMaybe<Scalars['String']['input']>
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
  rearImage?: InputMaybe<Scalars['ID']['input']>
  releaseDate?: InputMaybe<Scalars['Date']['input']>
  slug?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type InbaTag = {
  __typename?: 'InbaTag'
  createdAt?: Maybe<Scalars['DateTime']['output']>
  inbaArticles?: Maybe<InbaArticleRelationResponseCollection>
  locale?: Maybe<Scalars['String']['output']>
  localizations?: Maybe<InbaTagRelationResponseCollection>
  title: Scalars['String']['output']
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type InbaTagInbaArticlesArgs = {
  filters?: InputMaybe<InbaArticleFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type InbaTagLocalizationsArgs = {
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
  data?: Maybe<InbaTagEntity>
}

export type InbaTagEntityResponseCollection = {
  __typename?: 'InbaTagEntityResponseCollection'
  data: Array<InbaTagEntity>
  meta: ResponseCollectionMeta
}

export type InbaTagFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<InbaTagFiltersInput>>>
  createdAt?: InputMaybe<DateTimeFilterInput>
  id?: InputMaybe<IdFilterInput>
  inbaArticles?: InputMaybe<InbaArticleFiltersInput>
  locale?: InputMaybe<StringFilterInput>
  localizations?: InputMaybe<InbaTagFiltersInput>
  not?: InputMaybe<InbaTagFiltersInput>
  or?: InputMaybe<Array<InputMaybe<InbaTagFiltersInput>>>
  title?: InputMaybe<StringFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type InbaTagInput = {
  inbaArticles?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  title?: InputMaybe<Scalars['String']['input']>
}

export type InbaTagRelationResponseCollection = {
  __typename?: 'InbaTagRelationResponseCollection'
  data: Array<InbaTagEntity>
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

export type Menu = {
  __typename?: 'Menu'
  createdAt?: Maybe<Scalars['DateTime']['output']>
  locale?: Maybe<Scalars['String']['output']>
  localizations?: Maybe<MenuRelationResponseCollection>
  menus?: Maybe<Array<Maybe<ComponentMenuMenuItem>>>
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
  data?: Maybe<MenuEntity>
}

export type MenuInput = {
  menus?: InputMaybe<Array<InputMaybe<ComponentMenuMenuItemInput>>>
}

export type MenuRelationResponseCollection = {
  __typename?: 'MenuRelationResponseCollection'
  data: Array<MenuEntity>
}

export type Mutation = {
  __typename?: 'Mutation'
  /** Change user password. Confirm with the current password. */
  changePassword?: Maybe<UsersPermissionsLoginPayload>
  createAlertLocalization?: Maybe<AlertEntityResponse>
  createBlogPost?: Maybe<BlogPostEntityResponse>
  createBlogPostLocalization?: Maybe<BlogPostEntityResponse>
  createFaq?: Maybe<FaqEntityResponse>
  createFaqCategory?: Maybe<FaqCategoryEntityResponse>
  createFaqCategoryLocalization?: Maybe<FaqCategoryEntityResponse>
  createFaqLocalization?: Maybe<FaqEntityResponse>
  createFooterLocalization?: Maybe<FooterEntityResponse>
  createGeneralLocalization?: Maybe<GeneralEntityResponse>
  createHomepageLocalization?: Maybe<HomepageEntityResponse>
  createInbaArticle?: Maybe<InbaArticleEntityResponse>
  createInbaArticleLocalization?: Maybe<InbaArticleEntityResponse>
  createInbaRelease?: Maybe<InbaReleaseEntityResponse>
  createInbaTag?: Maybe<InbaTagEntityResponse>
  createInbaTagLocalization?: Maybe<InbaTagEntityResponse>
  createMenuLocalization?: Maybe<MenuEntityResponse>
  createPage?: Maybe<PageEntityResponse>
  createPageCategory?: Maybe<PageCategoryEntityResponse>
  createPageCategoryLocalization?: Maybe<PageCategoryEntityResponse>
  createPageLocalization?: Maybe<PageEntityResponse>
  createRegulation?: Maybe<RegulationEntityResponse>
  createTag?: Maybe<TagEntityResponse>
  createTagLocalization?: Maybe<TagEntityResponse>
  createUploadFile?: Maybe<UploadFileEntityResponse>
  createUploadFolder?: Maybe<UploadFolderEntityResponse>
  /** Create a new role */
  createUsersPermissionsRole?: Maybe<UsersPermissionsCreateRolePayload>
  /** Create a new user */
  createUsersPermissionsUser: UsersPermissionsUserEntityResponse
  deleteAlert?: Maybe<AlertEntityResponse>
  deleteBlogPost?: Maybe<BlogPostEntityResponse>
  deleteFaq?: Maybe<FaqEntityResponse>
  deleteFaqCategory?: Maybe<FaqCategoryEntityResponse>
  deleteFooter?: Maybe<FooterEntityResponse>
  deleteGeneral?: Maybe<GeneralEntityResponse>
  deleteHomepage?: Maybe<HomepageEntityResponse>
  deleteInbaArticle?: Maybe<InbaArticleEntityResponse>
  deleteInbaRelease?: Maybe<InbaReleaseEntityResponse>
  deleteInbaTag?: Maybe<InbaTagEntityResponse>
  deleteMenu?: Maybe<MenuEntityResponse>
  deletePage?: Maybe<PageEntityResponse>
  deletePageCategory?: Maybe<PageCategoryEntityResponse>
  deleteRegulation?: Maybe<RegulationEntityResponse>
  deleteTag?: Maybe<TagEntityResponse>
  deleteTaxAdministratorsList?: Maybe<TaxAdministratorsListEntityResponse>
  deleteUploadFile?: Maybe<UploadFileEntityResponse>
  deleteUploadFolder?: Maybe<UploadFolderEntityResponse>
  /** Delete an existing role */
  deleteUsersPermissionsRole?: Maybe<UsersPermissionsDeleteRolePayload>
  /** Delete an existing user */
  deleteUsersPermissionsUser: UsersPermissionsUserEntityResponse
  /** Confirm an email users email address */
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>
  /** Request a reset password token */
  forgotPassword?: Maybe<UsersPermissionsPasswordPayload>
  login: UsersPermissionsLoginPayload
  multipleUpload: Array<Maybe<UploadFileEntityResponse>>
  /** Register a user */
  register: UsersPermissionsLoginPayload
  removeFile?: Maybe<UploadFileEntityResponse>
  /** Reset user password. Confirm with a code (resetToken from forgotPassword) */
  resetPassword?: Maybe<UsersPermissionsLoginPayload>
  updateAlert?: Maybe<AlertEntityResponse>
  updateBlogPost?: Maybe<BlogPostEntityResponse>
  updateFaq?: Maybe<FaqEntityResponse>
  updateFaqCategory?: Maybe<FaqCategoryEntityResponse>
  updateFileInfo: UploadFileEntityResponse
  updateFooter?: Maybe<FooterEntityResponse>
  updateGeneral?: Maybe<GeneralEntityResponse>
  updateHomepage?: Maybe<HomepageEntityResponse>
  updateInbaArticle?: Maybe<InbaArticleEntityResponse>
  updateInbaRelease?: Maybe<InbaReleaseEntityResponse>
  updateInbaTag?: Maybe<InbaTagEntityResponse>
  updateMenu?: Maybe<MenuEntityResponse>
  updatePage?: Maybe<PageEntityResponse>
  updatePageCategory?: Maybe<PageCategoryEntityResponse>
  updateRegulation?: Maybe<RegulationEntityResponse>
  updateTag?: Maybe<TagEntityResponse>
  updateTaxAdministratorsList?: Maybe<TaxAdministratorsListEntityResponse>
  updateUploadFile?: Maybe<UploadFileEntityResponse>
  updateUploadFolder?: Maybe<UploadFolderEntityResponse>
  /** Update an existing role */
  updateUsersPermissionsRole?: Maybe<UsersPermissionsUpdateRolePayload>
  /** Update an existing user */
  updateUsersPermissionsUser: UsersPermissionsUserEntityResponse
  upload: UploadFileEntityResponse
}

export type MutationChangePasswordArgs = {
  currentPassword: Scalars['String']['input']
  password: Scalars['String']['input']
  passwordConfirmation: Scalars['String']['input']
}

export type MutationCreateAlertLocalizationArgs = {
  data?: InputMaybe<AlertInput>
  id?: InputMaybe<Scalars['ID']['input']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationCreateBlogPostArgs = {
  data: BlogPostInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationCreateBlogPostLocalizationArgs = {
  data?: InputMaybe<BlogPostInput>
  id?: InputMaybe<Scalars['ID']['input']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationCreateFaqArgs = {
  data: FaqInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationCreateFaqCategoryArgs = {
  data: FaqCategoryInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationCreateFaqCategoryLocalizationArgs = {
  data?: InputMaybe<FaqCategoryInput>
  id?: InputMaybe<Scalars['ID']['input']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationCreateFaqLocalizationArgs = {
  data?: InputMaybe<FaqInput>
  id?: InputMaybe<Scalars['ID']['input']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationCreateFooterLocalizationArgs = {
  data?: InputMaybe<FooterInput>
  id?: InputMaybe<Scalars['ID']['input']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationCreateGeneralLocalizationArgs = {
  data?: InputMaybe<GeneralInput>
  id?: InputMaybe<Scalars['ID']['input']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationCreateHomepageLocalizationArgs = {
  data?: InputMaybe<HomepageInput>
  id?: InputMaybe<Scalars['ID']['input']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationCreateInbaArticleArgs = {
  data: InbaArticleInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationCreateInbaArticleLocalizationArgs = {
  data?: InputMaybe<InbaArticleInput>
  id?: InputMaybe<Scalars['ID']['input']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationCreateInbaReleaseArgs = {
  data: InbaReleaseInput
}

export type MutationCreateInbaTagArgs = {
  data: InbaTagInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationCreateInbaTagLocalizationArgs = {
  data?: InputMaybe<InbaTagInput>
  id?: InputMaybe<Scalars['ID']['input']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationCreateMenuLocalizationArgs = {
  data?: InputMaybe<MenuInput>
  id?: InputMaybe<Scalars['ID']['input']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationCreatePageArgs = {
  data: PageInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationCreatePageCategoryArgs = {
  data: PageCategoryInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationCreatePageCategoryLocalizationArgs = {
  data?: InputMaybe<PageCategoryInput>
  id?: InputMaybe<Scalars['ID']['input']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationCreatePageLocalizationArgs = {
  data?: InputMaybe<PageInput>
  id?: InputMaybe<Scalars['ID']['input']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationCreateRegulationArgs = {
  data: RegulationInput
}

export type MutationCreateTagArgs = {
  data: TagInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationCreateTagLocalizationArgs = {
  data?: InputMaybe<TagInput>
  id?: InputMaybe<Scalars['ID']['input']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationCreateUploadFileArgs = {
  data: UploadFileInput
}

export type MutationCreateUploadFolderArgs = {
  data: UploadFolderInput
}

export type MutationCreateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput
}

export type MutationCreateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput
}

export type MutationDeleteAlertArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationDeleteBlogPostArgs = {
  id: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationDeleteFaqArgs = {
  id: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationDeleteFaqCategoryArgs = {
  id: Scalars['ID']['input']
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
  id: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationDeleteInbaReleaseArgs = {
  id: Scalars['ID']['input']
}

export type MutationDeleteInbaTagArgs = {
  id: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationDeleteMenuArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationDeletePageArgs = {
  id: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationDeletePageCategoryArgs = {
  id: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationDeleteRegulationArgs = {
  id: Scalars['ID']['input']
}

export type MutationDeleteTagArgs = {
  id: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationDeleteUploadFileArgs = {
  id: Scalars['ID']['input']
}

export type MutationDeleteUploadFolderArgs = {
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

export type MutationMultipleUploadArgs = {
  field?: InputMaybe<Scalars['String']['input']>
  files: Array<InputMaybe<Scalars['Upload']['input']>>
  ref?: InputMaybe<Scalars['String']['input']>
  refId?: InputMaybe<Scalars['ID']['input']>
}

export type MutationRegisterArgs = {
  input: UsersPermissionsRegisterInput
}

export type MutationRemoveFileArgs = {
  id: Scalars['ID']['input']
}

export type MutationResetPasswordArgs = {
  code: Scalars['String']['input']
  password: Scalars['String']['input']
  passwordConfirmation: Scalars['String']['input']
}

export type MutationUpdateAlertArgs = {
  data: AlertInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationUpdateBlogPostArgs = {
  data: BlogPostInput
  id: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationUpdateFaqArgs = {
  data: FaqInput
  id: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationUpdateFaqCategoryArgs = {
  data: FaqCategoryInput
  id: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationUpdateFileInfoArgs = {
  id: Scalars['ID']['input']
  info?: InputMaybe<FileInfoInput>
}

export type MutationUpdateFooterArgs = {
  data: FooterInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationUpdateGeneralArgs = {
  data: GeneralInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationUpdateHomepageArgs = {
  data: HomepageInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationUpdateInbaArticleArgs = {
  data: InbaArticleInput
  id: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationUpdateInbaReleaseArgs = {
  data: InbaReleaseInput
  id: Scalars['ID']['input']
}

export type MutationUpdateInbaTagArgs = {
  data: InbaTagInput
  id: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationUpdateMenuArgs = {
  data: MenuInput
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationUpdatePageArgs = {
  data: PageInput
  id: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationUpdatePageCategoryArgs = {
  data: PageCategoryInput
  id: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationUpdateRegulationArgs = {
  data: RegulationInput
  id: Scalars['ID']['input']
}

export type MutationUpdateTagArgs = {
  data: TagInput
  id: Scalars['ID']['input']
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type MutationUpdateTaxAdministratorsListArgs = {
  data: TaxAdministratorsListInput
}

export type MutationUpdateUploadFileArgs = {
  data: UploadFileInput
  id: Scalars['ID']['input']
}

export type MutationUpdateUploadFolderArgs = {
  data: UploadFolderInput
  id: Scalars['ID']['input']
}

export type MutationUpdateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput
  id: Scalars['ID']['input']
}

export type MutationUpdateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput
  id: Scalars['ID']['input']
}

export type MutationUploadArgs = {
  field?: InputMaybe<Scalars['String']['input']>
  file: Scalars['Upload']['input']
  info?: InputMaybe<FileInfoInput>
  ref?: InputMaybe<Scalars['String']['input']>
  refId?: InputMaybe<Scalars['ID']['input']>
}

export type Page = {
  __typename?: 'Page'
  childPages?: Maybe<PageRelationResponseCollection>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  headerLinks?: Maybe<Array<Maybe<ComponentBlocksCommonLink>>>
  keywords?: Maybe<Scalars['String']['output']>
  locale?: Maybe<Scalars['String']['output']>
  localizations?: Maybe<PageRelationResponseCollection>
  metaDiscription?: Maybe<Scalars['String']['output']>
  pageBackgroundImage?: Maybe<UploadFileEntityResponse>
  pageCategory?: Maybe<PageCategoryEntityResponse>
  pageColor?: Maybe<Enum_Page_Pagecolor>
  pageHeaderSections?: Maybe<Array<Maybe<PagePageHeaderSectionsDynamicZone>>>
  parentPage?: Maybe<PageEntityResponse>
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  relatedContents?: Maybe<TagRelationResponseCollection>
  sections?: Maybe<Array<Maybe<PageSectionsDynamicZone>>>
  slug?: Maybe<Scalars['String']['output']>
  subtext?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type PageChildPagesArgs = {
  filters?: InputMaybe<PageFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
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
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type PageRelatedContentsArgs = {
  filters?: InputMaybe<TagFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type PageCategory = {
  __typename?: 'PageCategory'
  color?: Maybe<Enum_Pagecategory_Color>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  icon?: Maybe<Enum_Pagecategory_Icon>
  locale?: Maybe<Scalars['String']['output']>
  localizations?: Maybe<PageCategoryRelationResponseCollection>
  pages?: Maybe<PageRelationResponseCollection>
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  shortTitle?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type PageCategoryLocalizationsArgs = {
  filters?: InputMaybe<PageCategoryFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type PageCategoryPagesArgs = {
  filters?: InputMaybe<PageFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type PageCategoryEntity = {
  __typename?: 'PageCategoryEntity'
  attributes?: Maybe<PageCategory>
  id?: Maybe<Scalars['ID']['output']>
}

export type PageCategoryEntityResponse = {
  __typename?: 'PageCategoryEntityResponse'
  data?: Maybe<PageCategoryEntity>
}

export type PageCategoryEntityResponseCollection = {
  __typename?: 'PageCategoryEntityResponseCollection'
  data: Array<PageCategoryEntity>
  meta: ResponseCollectionMeta
}

export type PageCategoryFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<PageCategoryFiltersInput>>>
  color?: InputMaybe<StringFilterInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  icon?: InputMaybe<StringFilterInput>
  id?: InputMaybe<IdFilterInput>
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
  data: Array<PageCategoryEntity>
}

export type PageEntity = {
  __typename?: 'PageEntity'
  attributes?: Maybe<Page>
  id?: Maybe<Scalars['ID']['output']>
}

export type PageEntityResponse = {
  __typename?: 'PageEntityResponse'
  data?: Maybe<PageEntity>
}

export type PageEntityResponseCollection = {
  __typename?: 'PageEntityResponseCollection'
  data: Array<PageEntity>
  meta: ResponseCollectionMeta
}

export type PageFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<PageFiltersInput>>>
  childPages?: InputMaybe<PageFiltersInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  headerLinks?: InputMaybe<ComponentBlocksCommonLinkFiltersInput>
  id?: InputMaybe<IdFilterInput>
  keywords?: InputMaybe<StringFilterInput>
  locale?: InputMaybe<StringFilterInput>
  localizations?: InputMaybe<PageFiltersInput>
  metaDiscription?: InputMaybe<StringFilterInput>
  not?: InputMaybe<PageFiltersInput>
  or?: InputMaybe<Array<InputMaybe<PageFiltersInput>>>
  pageCategory?: InputMaybe<PageCategoryFiltersInput>
  pageColor?: InputMaybe<StringFilterInput>
  parentPage?: InputMaybe<PageFiltersInput>
  publishedAt?: InputMaybe<DateTimeFilterInput>
  relatedContents?: InputMaybe<TagFiltersInput>
  slug?: InputMaybe<StringFilterInput>
  subtext?: InputMaybe<StringFilterInput>
  title?: InputMaybe<StringFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type PageInput = {
  childPages?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  headerLinks?: InputMaybe<Array<InputMaybe<ComponentBlocksCommonLinkInput>>>
  keywords?: InputMaybe<Scalars['String']['input']>
  metaDiscription?: InputMaybe<Scalars['String']['input']>
  pageBackgroundImage?: InputMaybe<Scalars['ID']['input']>
  pageCategory?: InputMaybe<Scalars['ID']['input']>
  pageColor?: InputMaybe<Enum_Page_Pagecolor>
  pageHeaderSections?: InputMaybe<Array<Scalars['PagePageHeaderSectionsDynamicZoneInput']['input']>>
  parentPage?: InputMaybe<Scalars['ID']['input']>
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>
  relatedContents?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  sections?: InputMaybe<Array<Scalars['PageSectionsDynamicZoneInput']['input']>>
  slug?: InputMaybe<Scalars['String']['input']>
  subtext?: InputMaybe<Scalars['String']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type PagePageHeaderSectionsDynamicZone = ComponentSectionsSubpageList | Error

export type PageRelationResponseCollection = {
  __typename?: 'PageRelationResponseCollection'
  data: Array<PageEntity>
}

export type PageSectionsDynamicZone =
  | ComponentSectionsAccordion
  | ComponentSectionsBanner
  | ComponentSectionsBlogPostsByCategory
  | ComponentSectionsBlogPostsByTags
  | ComponentSectionsBlogPostsList
  | ComponentSectionsCalculator
  | ComponentSectionsColumnedText
  | ComponentSectionsComparisonSection
  | ComponentSectionsContactsSection
  | ComponentSectionsDivider
  | ComponentSectionsFaqCategories
  | ComponentSectionsFaqs
  | ComponentSectionsFileList
  | ComponentSectionsGallery
  | ComponentSectionsIconTitleDesc
  | ComponentSectionsIframe
  | ComponentSectionsInbaArticlesList
  | ComponentSectionsInbaReleases
  | ComponentSectionsLinks
  | ComponentSectionsNarrowText
  | ComponentSectionsNumericalList
  | ComponentSectionsOfficialBoard
  | ComponentSectionsOrganizationalStructure
  | ComponentSectionsProsAndConsSection
  | ComponentSectionsRegulations
  | ComponentSectionsRegulationsList
  | ComponentSectionsTestimonials
  | ComponentSectionsTextWithImage
  | ComponentSectionsTimeline
  | ComponentSectionsVideos
  | ComponentSectionsWaves
  | Error

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

export enum PublicationState {
  Live = 'LIVE',
  Preview = 'PREVIEW',
}

export type Query = {
  __typename?: 'Query'
  alert?: Maybe<AlertEntityResponse>
  blogPost?: Maybe<BlogPostEntityResponse>
  blogPosts?: Maybe<BlogPostEntityResponseCollection>
  faq?: Maybe<FaqEntityResponse>
  faqCategories?: Maybe<FaqCategoryEntityResponseCollection>
  faqCategory?: Maybe<FaqCategoryEntityResponse>
  faqs?: Maybe<FaqEntityResponseCollection>
  footer?: Maybe<FooterEntityResponse>
  general?: Maybe<GeneralEntityResponse>
  homepage?: Maybe<HomepageEntityResponse>
  i18NLocale?: Maybe<I18NLocaleEntityResponse>
  i18NLocales?: Maybe<I18NLocaleEntityResponseCollection>
  inbaArticle?: Maybe<InbaArticleEntityResponse>
  inbaArticles?: Maybe<InbaArticleEntityResponseCollection>
  inbaRelease?: Maybe<InbaReleaseEntityResponse>
  inbaReleases?: Maybe<InbaReleaseEntityResponseCollection>
  inbaTag?: Maybe<InbaTagEntityResponse>
  inbaTags?: Maybe<InbaTagEntityResponseCollection>
  me?: Maybe<UsersPermissionsMe>
  menu?: Maybe<MenuEntityResponse>
  page?: Maybe<PageEntityResponse>
  pageCategories?: Maybe<PageCategoryEntityResponseCollection>
  pageCategory?: Maybe<PageCategoryEntityResponse>
  pages?: Maybe<PageEntityResponseCollection>
  regulation?: Maybe<RegulationEntityResponse>
  regulations?: Maybe<RegulationEntityResponseCollection>
  tag?: Maybe<TagEntityResponse>
  tags?: Maybe<TagEntityResponseCollection>
  taxAdministratorsList?: Maybe<TaxAdministratorsListEntityResponse>
  uploadFile?: Maybe<UploadFileEntityResponse>
  uploadFiles?: Maybe<UploadFileEntityResponseCollection>
  uploadFolder?: Maybe<UploadFolderEntityResponse>
  uploadFolders?: Maybe<UploadFolderEntityResponseCollection>
  usersPermissionsRole?: Maybe<UsersPermissionsRoleEntityResponse>
  usersPermissionsRoles?: Maybe<UsersPermissionsRoleEntityResponseCollection>
  usersPermissionsUser?: Maybe<UsersPermissionsUserEntityResponse>
  usersPermissionsUsers?: Maybe<UsersPermissionsUserEntityResponseCollection>
}

export type QueryAlertArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type QueryBlogPostArgs = {
  id?: InputMaybe<Scalars['ID']['input']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type QueryBlogPostsArgs = {
  filters?: InputMaybe<BlogPostFiltersInput>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type QueryFaqArgs = {
  id?: InputMaybe<Scalars['ID']['input']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type QueryFaqCategoriesArgs = {
  filters?: InputMaybe<FaqCategoryFiltersInput>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type QueryFaqCategoryArgs = {
  id?: InputMaybe<Scalars['ID']['input']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type QueryFaqsArgs = {
  filters?: InputMaybe<FaqFiltersInput>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type QueryFooterArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  publicationState?: InputMaybe<PublicationState>
}

export type QueryGeneralArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type QueryHomepageArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  publicationState?: InputMaybe<PublicationState>
}

export type QueryI18NLocaleArgs = {
  id?: InputMaybe<Scalars['ID']['input']>
}

export type QueryI18NLocalesArgs = {
  filters?: InputMaybe<I18NLocaleFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type QueryInbaArticleArgs = {
  id?: InputMaybe<Scalars['ID']['input']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type QueryInbaArticlesArgs = {
  filters?: InputMaybe<InbaArticleFiltersInput>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type QueryInbaReleaseArgs = {
  id?: InputMaybe<Scalars['ID']['input']>
}

export type QueryInbaReleasesArgs = {
  filters?: InputMaybe<InbaReleaseFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type QueryInbaTagArgs = {
  id?: InputMaybe<Scalars['ID']['input']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type QueryInbaTagsArgs = {
  filters?: InputMaybe<InbaTagFiltersInput>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type QueryMenuArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type QueryPageArgs = {
  id?: InputMaybe<Scalars['ID']['input']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type QueryPageCategoriesArgs = {
  filters?: InputMaybe<PageCategoryFiltersInput>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type QueryPageCategoryArgs = {
  id?: InputMaybe<Scalars['ID']['input']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type QueryPagesArgs = {
  filters?: InputMaybe<PageFiltersInput>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type QueryRegulationArgs = {
  id?: InputMaybe<Scalars['ID']['input']>
}

export type QueryRegulationsArgs = {
  filters?: InputMaybe<RegulationFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type QueryTagArgs = {
  id?: InputMaybe<Scalars['ID']['input']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}

export type QueryTagsArgs = {
  filters?: InputMaybe<TagFiltersInput>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type QueryUploadFileArgs = {
  id?: InputMaybe<Scalars['ID']['input']>
}

export type QueryUploadFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type QueryUploadFolderArgs = {
  id?: InputMaybe<Scalars['ID']['input']>
}

export type QueryUploadFoldersArgs = {
  filters?: InputMaybe<UploadFolderFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type QueryUsersPermissionsRoleArgs = {
  id?: InputMaybe<Scalars['ID']['input']>
}

export type QueryUsersPermissionsRolesArgs = {
  filters?: InputMaybe<UsersPermissionsRoleFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type QueryUsersPermissionsUserArgs = {
  id?: InputMaybe<Scalars['ID']['input']>
}

export type QueryUsersPermissionsUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type Regulation = {
  __typename?: 'Regulation'
  amending?: Maybe<RegulationRelationResponseCollection>
  amendments?: Maybe<RegulationRelationResponseCollection>
  attachments?: Maybe<UploadFileRelationResponseCollection>
  cancellation?: Maybe<RegulationEntityResponse>
  cancelling?: Maybe<RegulationRelationResponseCollection>
  category: Enum_Regulation_Category
  createdAt?: Maybe<Scalars['DateTime']['output']>
  effectiveFrom: Scalars['Date']['output']
  fullTitle: Scalars['String']['output']
  isFullTextRegulation: Scalars['Boolean']['output']
  mainDocument: UploadFileEntityResponse
  publishedAt?: Maybe<Scalars['DateTime']['output']>
  regNumber: Scalars['String']['output']
  slug: Scalars['String']['output']
  titleText?: Maybe<Scalars['String']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type RegulationAmendingArgs = {
  filters?: InputMaybe<RegulationFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type RegulationAmendmentsArgs = {
  filters?: InputMaybe<RegulationFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type RegulationAttachmentsArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type RegulationCancellingArgs = {
  filters?: InputMaybe<RegulationFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  publicationState?: InputMaybe<PublicationState>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type RegulationEntity = {
  __typename?: 'RegulationEntity'
  attributes?: Maybe<Regulation>
  id?: Maybe<Scalars['ID']['output']>
}

export type RegulationEntityResponse = {
  __typename?: 'RegulationEntityResponse'
  data?: Maybe<RegulationEntity>
}

export type RegulationEntityResponseCollection = {
  __typename?: 'RegulationEntityResponseCollection'
  data: Array<RegulationEntity>
  meta: ResponseCollectionMeta
}

export type RegulationFiltersInput = {
  amending?: InputMaybe<RegulationFiltersInput>
  amendments?: InputMaybe<RegulationFiltersInput>
  and?: InputMaybe<Array<InputMaybe<RegulationFiltersInput>>>
  cancellation?: InputMaybe<RegulationFiltersInput>
  cancelling?: InputMaybe<RegulationFiltersInput>
  category?: InputMaybe<StringFilterInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  effectiveFrom?: InputMaybe<DateFilterInput>
  fullTitle?: InputMaybe<StringFilterInput>
  id?: InputMaybe<IdFilterInput>
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
  data: Array<RegulationEntity>
}

export type ResponseCollectionMeta = {
  __typename?: 'ResponseCollectionMeta'
  pagination: Pagination
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
  createdAt?: Maybe<Scalars['DateTime']['output']>
  locale?: Maybe<Scalars['String']['output']>
  localizations?: Maybe<TagRelationResponseCollection>
  pageCategory?: Maybe<PageCategoryEntityResponse>
  title?: Maybe<Scalars['String']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type TagLocalizationsArgs = {
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
  data?: Maybe<TagEntity>
}

export type TagEntityResponseCollection = {
  __typename?: 'TagEntityResponseCollection'
  data: Array<TagEntity>
  meta: ResponseCollectionMeta
}

export type TagFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<TagFiltersInput>>>
  createdAt?: InputMaybe<DateTimeFilterInput>
  id?: InputMaybe<IdFilterInput>
  locale?: InputMaybe<StringFilterInput>
  localizations?: InputMaybe<TagFiltersInput>
  not?: InputMaybe<TagFiltersInput>
  or?: InputMaybe<Array<InputMaybe<TagFiltersInput>>>
  pageCategory?: InputMaybe<PageCategoryFiltersInput>
  title?: InputMaybe<StringFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type TagInput = {
  pageCategory?: InputMaybe<Scalars['ID']['input']>
  title?: InputMaybe<Scalars['String']['input']>
}

export type TagRelationResponseCollection = {
  __typename?: 'TagRelationResponseCollection'
  data: Array<TagEntity>
}

export type TaxAdministratorsList = {
  __typename?: 'TaxAdministratorsList'
  createdAt?: Maybe<Scalars['DateTime']['output']>
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
  data?: Maybe<TaxAdministratorsListEntity>
}

export type TaxAdministratorsListInput = {
  taxAdministrators?: InputMaybe<Array<InputMaybe<ComponentTaxAdministratorsTaxAdministratorInput>>>
}

export type UploadFile = {
  __typename?: 'UploadFile'
  alternativeText?: Maybe<Scalars['String']['output']>
  caption?: Maybe<Scalars['String']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  ext?: Maybe<Scalars['String']['output']>
  formats?: Maybe<Scalars['JSON']['output']>
  hash: Scalars['String']['output']
  height?: Maybe<Scalars['Int']['output']>
  mime: Scalars['String']['output']
  name: Scalars['String']['output']
  previewUrl?: Maybe<Scalars['String']['output']>
  provider: Scalars['String']['output']
  provider_metadata?: Maybe<Scalars['JSON']['output']>
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
  data?: Maybe<UploadFileEntity>
}

export type UploadFileEntityResponseCollection = {
  __typename?: 'UploadFileEntityResponseCollection'
  data: Array<UploadFileEntity>
  meta: ResponseCollectionMeta
}

export type UploadFileFiltersInput = {
  alternativeText?: InputMaybe<StringFilterInput>
  and?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>
  caption?: InputMaybe<StringFilterInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  ext?: InputMaybe<StringFilterInput>
  folder?: InputMaybe<UploadFolderFiltersInput>
  folderPath?: InputMaybe<StringFilterInput>
  formats?: InputMaybe<JsonFilterInput>
  hash?: InputMaybe<StringFilterInput>
  height?: InputMaybe<IntFilterInput>
  id?: InputMaybe<IdFilterInput>
  mime?: InputMaybe<StringFilterInput>
  name?: InputMaybe<StringFilterInput>
  not?: InputMaybe<UploadFileFiltersInput>
  or?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>
  previewUrl?: InputMaybe<StringFilterInput>
  provider?: InputMaybe<StringFilterInput>
  provider_metadata?: InputMaybe<JsonFilterInput>
  size?: InputMaybe<FloatFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
  url?: InputMaybe<StringFilterInput>
  width?: InputMaybe<IntFilterInput>
}

export type UploadFileInput = {
  alternativeText?: InputMaybe<Scalars['String']['input']>
  caption?: InputMaybe<Scalars['String']['input']>
  ext?: InputMaybe<Scalars['String']['input']>
  folder?: InputMaybe<Scalars['ID']['input']>
  folderPath?: InputMaybe<Scalars['String']['input']>
  formats?: InputMaybe<Scalars['JSON']['input']>
  hash?: InputMaybe<Scalars['String']['input']>
  height?: InputMaybe<Scalars['Int']['input']>
  mime?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  previewUrl?: InputMaybe<Scalars['String']['input']>
  provider?: InputMaybe<Scalars['String']['input']>
  provider_metadata?: InputMaybe<Scalars['JSON']['input']>
  size?: InputMaybe<Scalars['Float']['input']>
  url?: InputMaybe<Scalars['String']['input']>
  width?: InputMaybe<Scalars['Int']['input']>
}

export type UploadFileRelationResponseCollection = {
  __typename?: 'UploadFileRelationResponseCollection'
  data: Array<UploadFileEntity>
}

export type UploadFolder = {
  __typename?: 'UploadFolder'
  children?: Maybe<UploadFolderRelationResponseCollection>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  files?: Maybe<UploadFileRelationResponseCollection>
  name: Scalars['String']['output']
  parent?: Maybe<UploadFolderEntityResponse>
  path: Scalars['String']['output']
  pathId: Scalars['Int']['output']
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type UploadFolderChildrenArgs = {
  filters?: InputMaybe<UploadFolderFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type UploadFolderFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type UploadFolderEntity = {
  __typename?: 'UploadFolderEntity'
  attributes?: Maybe<UploadFolder>
  id?: Maybe<Scalars['ID']['output']>
}

export type UploadFolderEntityResponse = {
  __typename?: 'UploadFolderEntityResponse'
  data?: Maybe<UploadFolderEntity>
}

export type UploadFolderEntityResponseCollection = {
  __typename?: 'UploadFolderEntityResponseCollection'
  data: Array<UploadFolderEntity>
  meta: ResponseCollectionMeta
}

export type UploadFolderFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UploadFolderFiltersInput>>>
  children?: InputMaybe<UploadFolderFiltersInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  files?: InputMaybe<UploadFileFiltersInput>
  id?: InputMaybe<IdFilterInput>
  name?: InputMaybe<StringFilterInput>
  not?: InputMaybe<UploadFolderFiltersInput>
  or?: InputMaybe<Array<InputMaybe<UploadFolderFiltersInput>>>
  parent?: InputMaybe<UploadFolderFiltersInput>
  path?: InputMaybe<StringFilterInput>
  pathId?: InputMaybe<IntFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type UploadFolderInput = {
  children?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  files?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  name?: InputMaybe<Scalars['String']['input']>
  parent?: InputMaybe<Scalars['ID']['input']>
  path?: InputMaybe<Scalars['String']['input']>
  pathId?: InputMaybe<Scalars['Int']['input']>
}

export type UploadFolderRelationResponseCollection = {
  __typename?: 'UploadFolderRelationResponseCollection'
  data: Array<UploadFolderEntity>
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
  role?: Maybe<UsersPermissionsRoleEntityResponse>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type UsersPermissionsPermissionEntity = {
  __typename?: 'UsersPermissionsPermissionEntity'
  attributes?: Maybe<UsersPermissionsPermission>
  id?: Maybe<Scalars['ID']['output']>
}

export type UsersPermissionsPermissionFiltersInput = {
  action?: InputMaybe<StringFilterInput>
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>
  createdAt?: InputMaybe<DateTimeFilterInput>
  id?: InputMaybe<IdFilterInput>
  not?: InputMaybe<UsersPermissionsPermissionFiltersInput>
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
}

export type UsersPermissionsPermissionRelationResponseCollection = {
  __typename?: 'UsersPermissionsPermissionRelationResponseCollection'
  data: Array<UsersPermissionsPermissionEntity>
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
  name: Scalars['String']['output']
  permissions?: Maybe<UsersPermissionsPermissionRelationResponseCollection>
  type?: Maybe<Scalars['String']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  users?: Maybe<UsersPermissionsUserRelationResponseCollection>
}

export type UsersPermissionsRolePermissionsArgs = {
  filters?: InputMaybe<UsersPermissionsPermissionFiltersInput>
  pagination?: InputMaybe<PaginationArg>
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>
}

export type UsersPermissionsRoleUsersArgs = {
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
  data?: Maybe<UsersPermissionsRoleEntity>
}

export type UsersPermissionsRoleEntityResponseCollection = {
  __typename?: 'UsersPermissionsRoleEntityResponseCollection'
  data: Array<UsersPermissionsRoleEntity>
  meta: ResponseCollectionMeta
}

export type UsersPermissionsRoleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>
  createdAt?: InputMaybe<DateTimeFilterInput>
  description?: InputMaybe<StringFilterInput>
  id?: InputMaybe<IdFilterInput>
  name?: InputMaybe<StringFilterInput>
  not?: InputMaybe<UsersPermissionsRoleFiltersInput>
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>
  permissions?: InputMaybe<UsersPermissionsPermissionFiltersInput>
  type?: InputMaybe<StringFilterInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
  users?: InputMaybe<UsersPermissionsUserFiltersInput>
}

export type UsersPermissionsRoleInput = {
  description?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  permissions?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
  type?: InputMaybe<Scalars['String']['input']>
  users?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>
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
  email: Scalars['String']['output']
  posts?: Maybe<BlogPostEntityResponse>
  provider?: Maybe<Scalars['String']['output']>
  role?: Maybe<UsersPermissionsRoleEntityResponse>
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
  data?: Maybe<UsersPermissionsUserEntity>
}

export type UsersPermissionsUserEntityResponseCollection = {
  __typename?: 'UsersPermissionsUserEntityResponseCollection'
  data: Array<UsersPermissionsUserEntity>
  meta: ResponseCollectionMeta
}

export type UsersPermissionsUserFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>
  blocked?: InputMaybe<BooleanFilterInput>
  confirmationToken?: InputMaybe<StringFilterInput>
  confirmed?: InputMaybe<BooleanFilterInput>
  createdAt?: InputMaybe<DateTimeFilterInput>
  email?: InputMaybe<StringFilterInput>
  id?: InputMaybe<IdFilterInput>
  not?: InputMaybe<UsersPermissionsUserFiltersInput>
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>
  password?: InputMaybe<StringFilterInput>
  posts?: InputMaybe<BlogPostFiltersInput>
  provider?: InputMaybe<StringFilterInput>
  resetPasswordToken?: InputMaybe<StringFilterInput>
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>
  updatedAt?: InputMaybe<DateTimeFilterInput>
  username?: InputMaybe<StringFilterInput>
}

export type UsersPermissionsUserInput = {
  blocked?: InputMaybe<Scalars['Boolean']['input']>
  confirmationToken?: InputMaybe<Scalars['String']['input']>
  confirmed?: InputMaybe<Scalars['Boolean']['input']>
  email?: InputMaybe<Scalars['String']['input']>
  password?: InputMaybe<Scalars['String']['input']>
  posts?: InputMaybe<Scalars['ID']['input']>
  provider?: InputMaybe<Scalars['String']['input']>
  resetPasswordToken?: InputMaybe<Scalars['String']['input']>
  role?: InputMaybe<Scalars['ID']['input']>
  username?: InputMaybe<Scalars['String']['input']>
}

export type UsersPermissionsUserRelationResponseCollection = {
  __typename?: 'UsersPermissionsUserRelationResponseCollection'
  data: Array<UsersPermissionsUserEntity>
}

export type BlogPostBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input']
  locale: Scalars['I18NLocaleCode']['input']
}>

export type BlogPostBySlugQuery = {
  __typename?: 'Query'
  blogPosts?: {
    __typename?: 'BlogPostEntityResponseCollection'
    data: Array<{
      __typename?: 'BlogPostEntity'
      id?: string | null
      attributes?: {
        __typename?: 'BlogPost'
        slug?: string | null
        excerpt?: string | null
        title?: string | null
        updatedAt?: any | null
        publishedAt?: any | null
        date_added?: any | null
        createdAt?: any | null
        tag?: {
          __typename?: 'TagEntityResponse'
          data?: {
            __typename?: 'TagEntity'
            id?: string | null
            attributes?: {
              __typename?: 'Tag'
              title?: string | null
              pageCategory?: {
                __typename?: 'PageCategoryEntityResponse'
                data?: {
                  __typename?: 'PageCategoryEntity'
                  id?: string | null
                  attributes?: {
                    __typename?: 'PageCategory'
                    title?: string | null
                    color?: Enum_Pagecategory_Color | null
                  } | null
                } | null
              } | null
            } | null
          } | null
        } | null
        coverImage?: {
          __typename?: 'UploadFileEntityResponse'
          data?: {
            __typename?: 'UploadFileEntity'
            attributes?: { __typename?: 'UploadFile'; url: string } | null
          } | null
        } | null
        moreLink?: {
          __typename?: 'ComponentBlocksBlogPostLink'
          title?: string | null
          url?: string | null
          blogPost?: {
            __typename?: 'BlogPostEntityResponse'
            data?: {
              __typename?: 'BlogPostEntity'
              id?: string | null
              attributes?: {
                __typename?: 'BlogPost'
                title?: string | null
                slug?: string | null
              } | null
            } | null
          } | null
        } | null
        sections?: Array<
          | {
              __typename: 'ComponentSectionsColumnedText'
              content?: string | null
              contentAlignment?: Enum_Componentsectionscolumnedtext_Contentalignment | null
            }
          | {
              __typename: 'ComponentSectionsDivider'
              style?: Enum_Componentsectionsdivider_Style | null
            }
          | {
              __typename: 'ComponentSectionsFileList'
              title?: string | null
              text?: string | null
              fileList?: Array<{
                __typename?: 'ComponentBlocksFile'
                title?: string | null
                media?: {
                  __typename?: 'UploadFileEntityResponse'
                  data?: {
                    __typename?: 'UploadFileEntity'
                    id?: string | null
                    attributes?: {
                      __typename?: 'UploadFile'
                      url: string
                      name: string
                      ext?: string | null
                      size: number
                      createdAt?: any | null
                      updatedAt?: any | null
                    } | null
                  } | null
                } | null
              } | null> | null
            }
          | {
              __typename: 'ComponentSectionsGallery'
              title?: string | null
              text?: string | null
              medias: {
                __typename?: 'UploadFileRelationResponseCollection'
                data: Array<{
                  __typename?: 'UploadFileEntity'
                  id?: string | null
                  attributes?: {
                    __typename?: 'UploadFile'
                    url: string
                    width?: number | null
                    height?: number | null
                    caption?: string | null
                    alternativeText?: string | null
                    name: string
                  } | null
                }>
              }
            }
          | {
              __typename: 'ComponentSectionsNarrowText'
              content?: string | null
              width?: Enum_Componentsectionsnarrowtext_Width | null
              align?: Enum_Componentsectionsnarrowtext_Align | null
            }
          | {
              __typename: 'ComponentSectionsNumericalList'
              id: string
              title?: string | null
              variant?: Enum_Componentsectionsnumericallist_Variant | null
              buttonText?: string | null
              buttonLink?: string | null
              items?: Array<{
                __typename?: 'ComponentBlocksNumericalListItem'
                text?: string | null
              } | null> | null
            }
          | {
              __typename: 'ComponentSectionsRegulations'
              regulations?: {
                __typename?: 'RegulationRelationResponseCollection'
                data: Array<{
                  __typename?: 'RegulationEntity'
                  id?: string | null
                  attributes?: {
                    __typename?: 'Regulation'
                    regNumber: string
                    slug: string
                    titleText?: string | null
                    fullTitle: string
                    effectiveFrom: any
                    category: Enum_Regulation_Category
                    isFullTextRegulation: boolean
                    mainDocument: {
                      __typename?: 'UploadFileEntityResponse'
                      data?: {
                        __typename?: 'UploadFileEntity'
                        id?: string | null
                        attributes?: {
                          __typename?: 'UploadFile'
                          url: string
                          name: string
                          ext?: string | null
                          size: number
                          createdAt?: any | null
                          updatedAt?: any | null
                        } | null
                      } | null
                    }
                    attachments?: {
                      __typename?: 'UploadFileRelationResponseCollection'
                      data: Array<{
                        __typename?: 'UploadFileEntity'
                        id?: string | null
                        attributes?: {
                          __typename?: 'UploadFile'
                          url: string
                          name: string
                          ext?: string | null
                          size: number
                          createdAt?: any | null
                          updatedAt?: any | null
                        } | null
                      }>
                    } | null
                    amendments?: {
                      __typename?: 'RegulationRelationResponseCollection'
                      data: Array<{
                        __typename?: 'RegulationEntity'
                        id?: string | null
                        attributes?: {
                          __typename?: 'Regulation'
                          regNumber: string
                          slug: string
                          effectiveFrom: any
                          isFullTextRegulation: boolean
                          attachments?: {
                            __typename?: 'UploadFileRelationResponseCollection'
                            data: Array<{
                              __typename?: 'UploadFileEntity'
                              id?: string | null
                              attributes?: {
                                __typename?: 'UploadFile'
                                url: string
                                name: string
                                ext?: string | null
                                size: number
                                createdAt?: any | null
                                updatedAt?: any | null
                              } | null
                            }>
                          } | null
                        } | null
                      }>
                    } | null
                    amending?: {
                      __typename?: 'RegulationRelationResponseCollection'
                      data: Array<{
                        __typename?: 'RegulationEntity'
                        id?: string | null
                        attributes?: {
                          __typename?: 'Regulation'
                          regNumber: string
                          slug: string
                          effectiveFrom: any
                          cancellation?: {
                            __typename?: 'RegulationEntityResponse'
                            data?: {
                              __typename?: 'RegulationEntity'
                              id?: string | null
                              attributes?: {
                                __typename?: 'Regulation'
                                regNumber: string
                                slug: string
                                effectiveFrom: any
                              } | null
                            } | null
                          } | null
                          amending?: {
                            __typename?: 'RegulationRelationResponseCollection'
                            data: Array<{
                              __typename?: 'RegulationEntity'
                              id?: string | null
                              attributes?: {
                                __typename?: 'Regulation'
                                regNumber: string
                                slug: string
                                cancellation?: {
                                  __typename?: 'RegulationEntityResponse'
                                  data?: {
                                    __typename?: 'RegulationEntity'
                                    id?: string | null
                                    attributes?: {
                                      __typename?: 'Regulation'
                                      regNumber: string
                                      slug: string
                                      effectiveFrom: any
                                    } | null
                                  } | null
                                } | null
                              } | null
                            }>
                          } | null
                        } | null
                      }>
                    } | null
                    cancellation?: {
                      __typename?: 'RegulationEntityResponse'
                      data?: {
                        __typename?: 'RegulationEntity'
                        id?: string | null
                        attributes?: {
                          __typename?: 'Regulation'
                          regNumber: string
                          slug: string
                          effectiveFrom: any
                        } | null
                      } | null
                    } | null
                    cancelling?: {
                      __typename?: 'RegulationRelationResponseCollection'
                      data: Array<{
                        __typename?: 'RegulationEntity'
                        id?: string | null
                        attributes?: {
                          __typename?: 'Regulation'
                          regNumber: string
                          slug: string
                          effectiveFrom: any
                        } | null
                      }>
                    } | null
                  } | null
                }>
              } | null
            }
          | {
              __typename: 'ComponentSectionsTextWithImage'
              content?: string | null
              imagePosition?: Enum_Componentsectionstextwithimage_Imageposition | null
              imageShadow?: boolean | null
              imageSrc?: {
                __typename?: 'UploadFileEntityResponse'
                data?: {
                  __typename?: 'UploadFileEntity'
                  attributes?: {
                    __typename?: 'UploadFile'
                    url: string
                    alternativeText?: string | null
                    width?: number | null
                    height?: number | null
                  } | null
                } | null
              } | null
            }
          | {
              __typename: 'ComponentSectionsVideos'
              id: string
              title?: string | null
              subtitle?: string | null
              videos?: Array<{
                __typename?: 'ComponentBlocksVideo'
                id: string
                title?: string | null
                speaker?: string | null
                url?: string | null
              } | null> | null
            }
          | { __typename: 'Error' }
          | null
        > | null
      } | null
    }>
  } | null
}

export type LatestPostsByTagsQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode']['input']
  tags: Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>
  limit?: InputMaybe<Scalars['Int']['input']>
  start?: InputMaybe<Scalars['Int']['input']>
}>

export type LatestPostsByTagsQuery = {
  __typename?: 'Query'
  blogPosts?: {
    __typename?: 'BlogPostEntityResponseCollection'
    data: Array<{
      __typename?: 'BlogPostEntity'
      id?: string | null
      attributes?: {
        __typename?: 'BlogPost'
        slug?: string | null
        excerpt?: string | null
        title?: string | null
        updatedAt?: any | null
        publishedAt?: any | null
        date_added?: any | null
        createdAt?: any | null
        tag?: {
          __typename?: 'TagEntityResponse'
          data?: {
            __typename?: 'TagEntity'
            id?: string | null
            attributes?: {
              __typename?: 'Tag'
              title?: string | null
              pageCategory?: {
                __typename?: 'PageCategoryEntityResponse'
                data?: {
                  __typename?: 'PageCategoryEntity'
                  id?: string | null
                  attributes?: {
                    __typename?: 'PageCategory'
                    title?: string | null
                    color?: Enum_Pagecategory_Color | null
                  } | null
                } | null
              } | null
            } | null
          } | null
        } | null
        coverImage?: {
          __typename?: 'UploadFileEntityResponse'
          data?: {
            __typename?: 'UploadFileEntity'
            attributes?: { __typename?: 'UploadFile'; url: string } | null
          } | null
        } | null
        moreLink?: {
          __typename?: 'ComponentBlocksBlogPostLink'
          title?: string | null
          url?: string | null
          blogPost?: {
            __typename?: 'BlogPostEntityResponse'
            data?: {
              __typename?: 'BlogPostEntity'
              id?: string | null
              attributes?: {
                __typename?: 'BlogPost'
                title?: string | null
                slug?: string | null
              } | null
            } | null
          } | null
        } | null
        sections?: Array<
          | {
              __typename: 'ComponentSectionsColumnedText'
              content?: string | null
              contentAlignment?: Enum_Componentsectionscolumnedtext_Contentalignment | null
            }
          | {
              __typename: 'ComponentSectionsDivider'
              style?: Enum_Componentsectionsdivider_Style | null
            }
          | {
              __typename: 'ComponentSectionsFileList'
              title?: string | null
              text?: string | null
              fileList?: Array<{
                __typename?: 'ComponentBlocksFile'
                title?: string | null
                media?: {
                  __typename?: 'UploadFileEntityResponse'
                  data?: {
                    __typename?: 'UploadFileEntity'
                    id?: string | null
                    attributes?: {
                      __typename?: 'UploadFile'
                      url: string
                      name: string
                      ext?: string | null
                      size: number
                      createdAt?: any | null
                      updatedAt?: any | null
                    } | null
                  } | null
                } | null
              } | null> | null
            }
          | {
              __typename: 'ComponentSectionsGallery'
              title?: string | null
              text?: string | null
              medias: {
                __typename?: 'UploadFileRelationResponseCollection'
                data: Array<{
                  __typename?: 'UploadFileEntity'
                  id?: string | null
                  attributes?: {
                    __typename?: 'UploadFile'
                    url: string
                    width?: number | null
                    height?: number | null
                    caption?: string | null
                    alternativeText?: string | null
                    name: string
                  } | null
                }>
              }
            }
          | {
              __typename: 'ComponentSectionsNarrowText'
              content?: string | null
              width?: Enum_Componentsectionsnarrowtext_Width | null
              align?: Enum_Componentsectionsnarrowtext_Align | null
            }
          | {
              __typename: 'ComponentSectionsNumericalList'
              id: string
              title?: string | null
              variant?: Enum_Componentsectionsnumericallist_Variant | null
              buttonText?: string | null
              buttonLink?: string | null
              items?: Array<{
                __typename?: 'ComponentBlocksNumericalListItem'
                text?: string | null
              } | null> | null
            }
          | {
              __typename: 'ComponentSectionsRegulations'
              regulations?: {
                __typename?: 'RegulationRelationResponseCollection'
                data: Array<{
                  __typename?: 'RegulationEntity'
                  id?: string | null
                  attributes?: {
                    __typename?: 'Regulation'
                    regNumber: string
                    slug: string
                    titleText?: string | null
                    fullTitle: string
                    effectiveFrom: any
                    category: Enum_Regulation_Category
                    isFullTextRegulation: boolean
                    mainDocument: {
                      __typename?: 'UploadFileEntityResponse'
                      data?: {
                        __typename?: 'UploadFileEntity'
                        id?: string | null
                        attributes?: {
                          __typename?: 'UploadFile'
                          url: string
                          name: string
                          ext?: string | null
                          size: number
                          createdAt?: any | null
                          updatedAt?: any | null
                        } | null
                      } | null
                    }
                    attachments?: {
                      __typename?: 'UploadFileRelationResponseCollection'
                      data: Array<{
                        __typename?: 'UploadFileEntity'
                        id?: string | null
                        attributes?: {
                          __typename?: 'UploadFile'
                          url: string
                          name: string
                          ext?: string | null
                          size: number
                          createdAt?: any | null
                          updatedAt?: any | null
                        } | null
                      }>
                    } | null
                    amendments?: {
                      __typename?: 'RegulationRelationResponseCollection'
                      data: Array<{
                        __typename?: 'RegulationEntity'
                        id?: string | null
                        attributes?: {
                          __typename?: 'Regulation'
                          regNumber: string
                          slug: string
                          effectiveFrom: any
                          isFullTextRegulation: boolean
                          attachments?: {
                            __typename?: 'UploadFileRelationResponseCollection'
                            data: Array<{
                              __typename?: 'UploadFileEntity'
                              id?: string | null
                              attributes?: {
                                __typename?: 'UploadFile'
                                url: string
                                name: string
                                ext?: string | null
                                size: number
                                createdAt?: any | null
                                updatedAt?: any | null
                              } | null
                            }>
                          } | null
                        } | null
                      }>
                    } | null
                    amending?: {
                      __typename?: 'RegulationRelationResponseCollection'
                      data: Array<{
                        __typename?: 'RegulationEntity'
                        id?: string | null
                        attributes?: {
                          __typename?: 'Regulation'
                          regNumber: string
                          slug: string
                          effectiveFrom: any
                          cancellation?: {
                            __typename?: 'RegulationEntityResponse'
                            data?: {
                              __typename?: 'RegulationEntity'
                              id?: string | null
                              attributes?: {
                                __typename?: 'Regulation'
                                regNumber: string
                                slug: string
                                effectiveFrom: any
                              } | null
                            } | null
                          } | null
                          amending?: {
                            __typename?: 'RegulationRelationResponseCollection'
                            data: Array<{
                              __typename?: 'RegulationEntity'
                              id?: string | null
                              attributes?: {
                                __typename?: 'Regulation'
                                regNumber: string
                                slug: string
                                cancellation?: {
                                  __typename?: 'RegulationEntityResponse'
                                  data?: {
                                    __typename?: 'RegulationEntity'
                                    id?: string | null
                                    attributes?: {
                                      __typename?: 'Regulation'
                                      regNumber: string
                                      slug: string
                                      effectiveFrom: any
                                    } | null
                                  } | null
                                } | null
                              } | null
                            }>
                          } | null
                        } | null
                      }>
                    } | null
                    cancellation?: {
                      __typename?: 'RegulationEntityResponse'
                      data?: {
                        __typename?: 'RegulationEntity'
                        id?: string | null
                        attributes?: {
                          __typename?: 'Regulation'
                          regNumber: string
                          slug: string
                          effectiveFrom: any
                        } | null
                      } | null
                    } | null
                    cancelling?: {
                      __typename?: 'RegulationRelationResponseCollection'
                      data: Array<{
                        __typename?: 'RegulationEntity'
                        id?: string | null
                        attributes?: {
                          __typename?: 'Regulation'
                          regNumber: string
                          slug: string
                          effectiveFrom: any
                        } | null
                      }>
                    } | null
                  } | null
                }>
              } | null
            }
          | {
              __typename: 'ComponentSectionsTextWithImage'
              content?: string | null
              imagePosition?: Enum_Componentsectionstextwithimage_Imageposition | null
              imageShadow?: boolean | null
              imageSrc?: {
                __typename?: 'UploadFileEntityResponse'
                data?: {
                  __typename?: 'UploadFileEntity'
                  attributes?: {
                    __typename?: 'UploadFile'
                    url: string
                    alternativeText?: string | null
                    width?: number | null
                    height?: number | null
                  } | null
                } | null
              } | null
            }
          | {
              __typename: 'ComponentSectionsVideos'
              id: string
              title?: string | null
              subtitle?: string | null
              videos?: Array<{
                __typename?: 'ComponentBlocksVideo'
                id: string
                title?: string | null
                speaker?: string | null
                url?: string | null
              } | null> | null
            }
          | { __typename: 'Error' }
          | null
        > | null
      } | null
    }>
  } | null
}

export type BlogPostsStaticPathsQueryVariables = Exact<{ [key: string]: never }>

export type BlogPostsStaticPathsQuery = {
  __typename?: 'Query'
  blogPosts?: {
    __typename?: 'BlogPostEntityResponseCollection'
    data: Array<{
      __typename?: 'BlogPostEntity'
      id?: string | null
      attributes?: { __typename?: 'BlogPost'; slug?: string | null; locale?: string | null } | null
    }>
  } | null
}

export type BlogPostsRssFeedQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode']['input']
}>

export type BlogPostsRssFeedQuery = {
  __typename?: 'Query'
  blogPosts?: {
    __typename?: 'BlogPostEntityResponseCollection'
    data: Array<{
      __typename?: 'BlogPostEntity'
      id?: string | null
      attributes?: {
        __typename?: 'BlogPost'
        slug?: string | null
        title?: string | null
        publishedAt?: any | null
        date_added?: any | null
        excerpt?: string | null
        tag?: {
          __typename?: 'TagEntityResponse'
          data?: {
            __typename?: 'TagEntity'
            attributes?: {
              __typename?: 'Tag'
              title?: string | null
              pageCategory?: {
                __typename?: 'PageCategoryEntityResponse'
                data?: {
                  __typename?: 'PageCategoryEntity'
                  attributes?: { __typename?: 'PageCategory'; title?: string | null } | null
                } | null
              } | null
            } | null
          } | null
        } | null
        coverImage?: {
          __typename?: 'UploadFileEntityResponse'
          data?: {
            __typename?: 'UploadFileEntity'
            attributes?: {
              __typename?: 'UploadFile'
              url: string
              mime: string
              size: number
            } | null
          } | null
        } | null
      } | null
    }>
  } | null
}

export type LatestBlogsWithTagsQueryVariables = Exact<{
  sort?: InputMaybe<
    Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>
  >
  limit?: InputMaybe<Scalars['Int']['input']>
  start?: InputMaybe<Scalars['Int']['input']>
  filters?: InputMaybe<BlogPostFiltersInput>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}>

export type LatestBlogsWithTagsQuery = {
  __typename?: 'Query'
  blogPosts?: {
    __typename?: 'BlogPostEntityResponseCollection'
    data: Array<{
      __typename?: 'BlogPostEntity'
      id?: string | null
      attributes?: {
        __typename?: 'BlogPost'
        slug?: string | null
        title?: string | null
        excerpt?: string | null
        date_added?: any | null
        publishedAt?: any | null
        updatedAt?: any | null
        coverImage?: {
          __typename?: 'UploadFileEntityResponse'
          data?: {
            __typename?: 'UploadFileEntity'
            attributes?: { __typename?: 'UploadFile'; url: string } | null
          } | null
        } | null
        tag?: {
          __typename?: 'TagEntityResponse'
          data?: {
            __typename?: 'TagEntity'
            attributes?: {
              __typename?: 'Tag'
              title?: string | null
              pageCategory?: {
                __typename?: 'PageCategoryEntityResponse'
                data?: {
                  __typename?: 'PageCategoryEntity'
                  attributes?: {
                    __typename?: 'PageCategory'
                    title?: string | null
                    color?: Enum_Pagecategory_Color | null
                  } | null
                } | null
              } | null
            } | null
          } | null
        } | null
      } | null
    }>
  } | null
}

export type LatestBlogPostEntityFragment = {
  __typename?: 'BlogPostEntity'
  id?: string | null
  attributes?: {
    __typename?: 'BlogPost'
    slug?: string | null
    title?: string | null
    excerpt?: string | null
    date_added?: any | null
    publishedAt?: any | null
    updatedAt?: any | null
    coverImage?: {
      __typename?: 'UploadFileEntityResponse'
      data?: {
        __typename?: 'UploadFileEntity'
        attributes?: { __typename?: 'UploadFile'; url: string } | null
      } | null
    } | null
    tag?: {
      __typename?: 'TagEntityResponse'
      data?: {
        __typename?: 'TagEntity'
        attributes?: {
          __typename?: 'Tag'
          title?: string | null
          pageCategory?: {
            __typename?: 'PageCategoryEntityResponse'
            data?: {
              __typename?: 'PageCategoryEntity'
              attributes?: {
                __typename?: 'PageCategory'
                title?: string | null
                color?: Enum_Pagecategory_Color | null
              } | null
            } | null
          } | null
        } | null
      } | null
    } | null
  } | null
}

export type TotalPostsCountQueryVariables = Exact<{
  where?: InputMaybe<BlogPostFiltersInput>
  limit?: InputMaybe<Scalars['Int']['input']>
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}>

export type TotalPostsCountQuery = {
  __typename?: 'Query'
  blogPosts?: {
    __typename?: 'BlogPostEntityResponseCollection'
    meta: {
      __typename?: 'ResponseCollectionMeta'
      pagination: { __typename?: 'Pagination'; total: number; pageCount: number }
    }
  } | null
}

export type RelatedTagsQueryVariables = Exact<{
  where?: InputMaybe<TagFiltersInput>
}>

export type RelatedTagsQuery = {
  __typename?: 'Query'
  tags?: {
    __typename?: 'TagEntityResponseCollection'
    data: Array<{
      __typename?: 'TagEntity'
      attributes?: {
        __typename?: 'Tag'
        title?: string | null
        pageCategory?: {
          __typename?: 'PageCategoryEntityResponse'
          data?: {
            __typename?: 'PageCategoryEntity'
            attributes?: {
              __typename?: 'PageCategory'
              title?: string | null
              color?: Enum_Pagecategory_Color | null
            } | null
          } | null
        } | null
      } | null
    }>
  } | null
}

export type BlogPostEntityFragment = {
  __typename?: 'BlogPostEntity'
  id?: string | null
  attributes?: {
    __typename?: 'BlogPost'
    slug?: string | null
    excerpt?: string | null
    title?: string | null
    updatedAt?: any | null
    publishedAt?: any | null
    date_added?: any | null
    createdAt?: any | null
    tag?: {
      __typename?: 'TagEntityResponse'
      data?: {
        __typename?: 'TagEntity'
        id?: string | null
        attributes?: {
          __typename?: 'Tag'
          title?: string | null
          pageCategory?: {
            __typename?: 'PageCategoryEntityResponse'
            data?: {
              __typename?: 'PageCategoryEntity'
              id?: string | null
              attributes?: {
                __typename?: 'PageCategory'
                title?: string | null
                color?: Enum_Pagecategory_Color | null
              } | null
            } | null
          } | null
        } | null
      } | null
    } | null
    coverImage?: {
      __typename?: 'UploadFileEntityResponse'
      data?: {
        __typename?: 'UploadFileEntity'
        attributes?: { __typename?: 'UploadFile'; url: string } | null
      } | null
    } | null
    moreLink?: {
      __typename?: 'ComponentBlocksBlogPostLink'
      title?: string | null
      url?: string | null
      blogPost?: {
        __typename?: 'BlogPostEntityResponse'
        data?: {
          __typename?: 'BlogPostEntity'
          id?: string | null
          attributes?: {
            __typename?: 'BlogPost'
            title?: string | null
            slug?: string | null
          } | null
        } | null
      } | null
    } | null
    sections?: Array<
      | {
          __typename: 'ComponentSectionsColumnedText'
          content?: string | null
          contentAlignment?: Enum_Componentsectionscolumnedtext_Contentalignment | null
        }
      | {
          __typename: 'ComponentSectionsDivider'
          style?: Enum_Componentsectionsdivider_Style | null
        }
      | {
          __typename: 'ComponentSectionsFileList'
          title?: string | null
          text?: string | null
          fileList?: Array<{
            __typename?: 'ComponentBlocksFile'
            title?: string | null
            media?: {
              __typename?: 'UploadFileEntityResponse'
              data?: {
                __typename?: 'UploadFileEntity'
                id?: string | null
                attributes?: {
                  __typename?: 'UploadFile'
                  url: string
                  name: string
                  ext?: string | null
                  size: number
                  createdAt?: any | null
                  updatedAt?: any | null
                } | null
              } | null
            } | null
          } | null> | null
        }
      | {
          __typename: 'ComponentSectionsGallery'
          title?: string | null
          text?: string | null
          medias: {
            __typename?: 'UploadFileRelationResponseCollection'
            data: Array<{
              __typename?: 'UploadFileEntity'
              id?: string | null
              attributes?: {
                __typename?: 'UploadFile'
                url: string
                width?: number | null
                height?: number | null
                caption?: string | null
                alternativeText?: string | null
                name: string
              } | null
            }>
          }
        }
      | {
          __typename: 'ComponentSectionsNarrowText'
          content?: string | null
          width?: Enum_Componentsectionsnarrowtext_Width | null
          align?: Enum_Componentsectionsnarrowtext_Align | null
        }
      | {
          __typename: 'ComponentSectionsNumericalList'
          id: string
          title?: string | null
          variant?: Enum_Componentsectionsnumericallist_Variant | null
          buttonText?: string | null
          buttonLink?: string | null
          items?: Array<{
            __typename?: 'ComponentBlocksNumericalListItem'
            text?: string | null
          } | null> | null
        }
      | {
          __typename: 'ComponentSectionsRegulations'
          regulations?: {
            __typename?: 'RegulationRelationResponseCollection'
            data: Array<{
              __typename?: 'RegulationEntity'
              id?: string | null
              attributes?: {
                __typename?: 'Regulation'
                regNumber: string
                slug: string
                titleText?: string | null
                fullTitle: string
                effectiveFrom: any
                category: Enum_Regulation_Category
                isFullTextRegulation: boolean
                mainDocument: {
                  __typename?: 'UploadFileEntityResponse'
                  data?: {
                    __typename?: 'UploadFileEntity'
                    id?: string | null
                    attributes?: {
                      __typename?: 'UploadFile'
                      url: string
                      name: string
                      ext?: string | null
                      size: number
                      createdAt?: any | null
                      updatedAt?: any | null
                    } | null
                  } | null
                }
                attachments?: {
                  __typename?: 'UploadFileRelationResponseCollection'
                  data: Array<{
                    __typename?: 'UploadFileEntity'
                    id?: string | null
                    attributes?: {
                      __typename?: 'UploadFile'
                      url: string
                      name: string
                      ext?: string | null
                      size: number
                      createdAt?: any | null
                      updatedAt?: any | null
                    } | null
                  }>
                } | null
                amendments?: {
                  __typename?: 'RegulationRelationResponseCollection'
                  data: Array<{
                    __typename?: 'RegulationEntity'
                    id?: string | null
                    attributes?: {
                      __typename?: 'Regulation'
                      regNumber: string
                      slug: string
                      effectiveFrom: any
                      isFullTextRegulation: boolean
                      attachments?: {
                        __typename?: 'UploadFileRelationResponseCollection'
                        data: Array<{
                          __typename?: 'UploadFileEntity'
                          id?: string | null
                          attributes?: {
                            __typename?: 'UploadFile'
                            url: string
                            name: string
                            ext?: string | null
                            size: number
                            createdAt?: any | null
                            updatedAt?: any | null
                          } | null
                        }>
                      } | null
                    } | null
                  }>
                } | null
                amending?: {
                  __typename?: 'RegulationRelationResponseCollection'
                  data: Array<{
                    __typename?: 'RegulationEntity'
                    id?: string | null
                    attributes?: {
                      __typename?: 'Regulation'
                      regNumber: string
                      slug: string
                      effectiveFrom: any
                      cancellation?: {
                        __typename?: 'RegulationEntityResponse'
                        data?: {
                          __typename?: 'RegulationEntity'
                          id?: string | null
                          attributes?: {
                            __typename?: 'Regulation'
                            regNumber: string
                            slug: string
                            effectiveFrom: any
                          } | null
                        } | null
                      } | null
                      amending?: {
                        __typename?: 'RegulationRelationResponseCollection'
                        data: Array<{
                          __typename?: 'RegulationEntity'
                          id?: string | null
                          attributes?: {
                            __typename?: 'Regulation'
                            regNumber: string
                            slug: string
                            cancellation?: {
                              __typename?: 'RegulationEntityResponse'
                              data?: {
                                __typename?: 'RegulationEntity'
                                id?: string | null
                                attributes?: {
                                  __typename?: 'Regulation'
                                  regNumber: string
                                  slug: string
                                  effectiveFrom: any
                                } | null
                              } | null
                            } | null
                          } | null
                        }>
                      } | null
                    } | null
                  }>
                } | null
                cancellation?: {
                  __typename?: 'RegulationEntityResponse'
                  data?: {
                    __typename?: 'RegulationEntity'
                    id?: string | null
                    attributes?: {
                      __typename?: 'Regulation'
                      regNumber: string
                      slug: string
                      effectiveFrom: any
                    } | null
                  } | null
                } | null
                cancelling?: {
                  __typename?: 'RegulationRelationResponseCollection'
                  data: Array<{
                    __typename?: 'RegulationEntity'
                    id?: string | null
                    attributes?: {
                      __typename?: 'Regulation'
                      regNumber: string
                      slug: string
                      effectiveFrom: any
                    } | null
                  }>
                } | null
              } | null
            }>
          } | null
        }
      | {
          __typename: 'ComponentSectionsTextWithImage'
          content?: string | null
          imagePosition?: Enum_Componentsectionstextwithimage_Imageposition | null
          imageShadow?: boolean | null
          imageSrc?: {
            __typename?: 'UploadFileEntityResponse'
            data?: {
              __typename?: 'UploadFileEntity'
              attributes?: {
                __typename?: 'UploadFile'
                url: string
                alternativeText?: string | null
                width?: number | null
                height?: number | null
              } | null
            } | null
          } | null
        }
      | {
          __typename: 'ComponentSectionsVideos'
          id: string
          title?: string | null
          subtitle?: string | null
          videos?: Array<{
            __typename?: 'ComponentBlocksVideo'
            id: string
            title?: string | null
            speaker?: string | null
            url?: string | null
          } | null> | null
        }
      | { __typename: 'Error' }
      | null
    > | null
  } | null
}

export type BlogPostLinkFragment = {
  __typename?: 'ComponentBlocksBlogPostLink'
  title?: string | null
  url?: string | null
  blogPost?: {
    __typename?: 'BlogPostEntityResponse'
    data?: {
      __typename?: 'BlogPostEntity'
      id?: string | null
      attributes?: { __typename?: 'BlogPost'; title?: string | null; slug?: string | null } | null
    } | null
  } | null
}

export type PageCategoriesQueryVariables = Exact<{
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}>

export type PageCategoriesQuery = {
  __typename?: 'Query'
  pageCategories?: {
    __typename?: 'PageCategoryEntityResponseCollection'
    data: Array<{
      __typename?: 'PageCategoryEntity'
      id?: string | null
      attributes?: {
        __typename?: 'PageCategory'
        title?: string | null
        color?: Enum_Pagecategory_Color | null
      } | null
    }>
  } | null
}

export type BlogPostsTagsQueryVariables = Exact<{
  locale?: InputMaybe<Scalars['I18NLocaleCode']['input']>
}>

export type BlogPostsTagsQuery = {
  __typename?: 'Query'
  tags?: {
    __typename?: 'TagEntityResponseCollection'
    data: Array<{
      __typename?: 'TagEntity'
      id?: string | null
      attributes?: {
        __typename?: 'Tag'
        title?: string | null
        pageCategory?: {
          __typename?: 'PageCategoryEntityResponse'
          data?: {
            __typename?: 'PageCategoryEntity'
            id?: string | null
            attributes?: {
              __typename?: 'PageCategory'
              title?: string | null
              color?: Enum_Pagecategory_Color | null
            } | null
          } | null
        } | null
      } | null
    }>
  } | null
}

export type TagEntityFragment = {
  __typename?: 'TagEntity'
  id?: string | null
  attributes?: {
    __typename?: 'Tag'
    title?: string | null
    pageCategory?: {
      __typename?: 'PageCategoryEntityResponse'
      data?: {
        __typename?: 'PageCategoryEntity'
        id?: string | null
        attributes?: {
          __typename?: 'PageCategory'
          title?: string | null
          color?: Enum_Pagecategory_Color | null
        } | null
      } | null
    } | null
  } | null
}

export type PageCategoryEntityFragment = {
  __typename?: 'PageCategoryEntity'
  id?: string | null
  attributes?: {
    __typename?: 'PageCategory'
    title?: string | null
    color?: Enum_Pagecategory_Color | null
  } | null
}

export type FaqCategoryEntityFragment = {
  __typename?: 'FaqCategoryEntity'
  id?: string | null
  attributes?: {
    __typename?: 'FaqCategory'
    title: string
    slug: string
    faqs?: {
      __typename?: 'FaqRelationResponseCollection'
      data: Array<{
        __typename?: 'FaqEntity'
        id?: string | null
        attributes?: { __typename?: 'Faq'; title: string; body?: string | null } | null
      }>
    } | null
  } | null
}

export type FaqEntityFragment = {
  __typename?: 'FaqEntity'
  id?: string | null
  attributes?: { __typename?: 'Faq'; title: string; body?: string | null } | null
}

export type UploadImageSrcEntityFragment = {
  __typename?: 'UploadFileEntity'
  id?: string | null
  attributes?: { __typename?: 'UploadFile'; url: string } | null
}

export type UploadImageEntityFragment = {
  __typename?: 'UploadFileEntity'
  id?: string | null
  attributes?: {
    __typename?: 'UploadFile'
    url: string
    width?: number | null
    height?: number | null
    caption?: string | null
    alternativeText?: string | null
    name: string
  } | null
}

export type UploadFileEntityFragment = {
  __typename?: 'UploadFileEntity'
  id?: string | null
  attributes?: {
    __typename?: 'UploadFile'
    url: string
    name: string
    ext?: string | null
    size: number
    createdAt?: any | null
    updatedAt?: any | null
  } | null
}

export type CommonLinkFragment = {
  __typename?: 'ComponentBlocksCommonLink'
  label: string
  url?: string | null
  plausibleId?: string | null
  page?: {
    __typename?: 'PageEntityResponse'
    data?: {
      __typename?: 'PageEntity'
      id?: string | null
      attributes?: { __typename?: 'Page'; title?: string | null; slug?: string | null } | null
    } | null
  } | null
  blogPost?: {
    __typename?: 'BlogPostEntityResponse'
    data?: {
      __typename?: 'BlogPostEntity'
      id?: string | null
      attributes?: { __typename?: 'BlogPost'; title?: string | null; slug?: string | null } | null
    } | null
  } | null
}

export type FooterContactItemFragment = {
  __typename?: 'ComponentBlocksFooterContactItem'
  label: string
  phone?: string | null
  mail?: string | null
}

export type FooterColumnBlockFragment = {
  __typename?: 'ComponentBlocksFooterColumn'
  title: string
  links?: Array<{
    __typename?: 'ComponentBlocksCommonLink'
    label: string
    url?: string | null
    plausibleId?: string | null
    page?: {
      __typename?: 'PageEntityResponse'
      data?: {
        __typename?: 'PageEntity'
        id?: string | null
        attributes?: { __typename?: 'Page'; title?: string | null; slug?: string | null } | null
      } | null
    } | null
    blogPost?: {
      __typename?: 'BlogPostEntityResponse'
      data?: {
        __typename?: 'BlogPostEntity'
        id?: string | null
        attributes?: { __typename?: 'BlogPost'; title?: string | null; slug?: string | null } | null
      } | null
    } | null
  } | null> | null
}

export type FooterFragment = {
  __typename?: 'Footer'
  address?: string | null
  facebookUrl?: string | null
  instagramUrl?: string | null
  contacts?: Array<{
    __typename?: 'ComponentBlocksFooterContactItem'
    label: string
    phone?: string | null
    mail?: string | null
  } | null> | null
  columns?: Array<{
    __typename?: 'ComponentBlocksFooterColumn'
    title: string
    links?: Array<{
      __typename?: 'ComponentBlocksCommonLink'
      label: string
      url?: string | null
      plausibleId?: string | null
      page?: {
        __typename?: 'PageEntityResponse'
        data?: {
          __typename?: 'PageEntity'
          id?: string | null
          attributes?: { __typename?: 'Page'; title?: string | null; slug?: string | null } | null
        } | null
      } | null
      blogPost?: {
        __typename?: 'BlogPostEntityResponse'
        data?: {
          __typename?: 'BlogPostEntity'
          id?: string | null
          attributes?: {
            __typename?: 'BlogPost'
            title?: string | null
            slug?: string | null
          } | null
        } | null
      } | null
    } | null> | null
  } | null> | null
  accessibilityPageLink?: {
    __typename?: 'ComponentBlocksCommonLink'
    label: string
    url?: string | null
    plausibleId?: string | null
    page?: {
      __typename?: 'PageEntityResponse'
      data?: {
        __typename?: 'PageEntity'
        id?: string | null
        attributes?: { __typename?: 'Page'; title?: string | null; slug?: string | null } | null
      } | null
    } | null
    blogPost?: {
      __typename?: 'BlogPostEntityResponse'
      data?: {
        __typename?: 'BlogPostEntity'
        id?: string | null
        attributes?: { __typename?: 'BlogPost'; title?: string | null; slug?: string | null } | null
      } | null
    } | null
  } | null
  innovationsLink?: {
    __typename?: 'ComponentBlocksCommonLink'
    label: string
    url?: string | null
    plausibleId?: string | null
    page?: {
      __typename?: 'PageEntityResponse'
      data?: {
        __typename?: 'PageEntity'
        id?: string | null
        attributes?: { __typename?: 'Page'; title?: string | null; slug?: string | null } | null
      } | null
    } | null
    blogPost?: {
      __typename?: 'BlogPostEntityResponse'
      data?: {
        __typename?: 'BlogPostEntity'
        id?: string | null
        attributes?: { __typename?: 'BlogPost'; title?: string | null; slug?: string | null } | null
      } | null
    } | null
  } | null
}

export type PageForMenuEntityFragment = {
  __typename?: 'PageEntity'
  id?: string | null
  attributes?: { __typename?: 'Page'; title?: string | null; slug?: string | null } | null
}

export type MenuLinkFragment = {
  __typename?: 'ComponentMenuMenuLink'
  id: string
  label: string
  url?: string | null
  page?: {
    __typename?: 'PageEntityResponse'
    data?: {
      __typename?: 'PageEntity'
      id?: string | null
      attributes?: { __typename?: 'Page'; title?: string | null; slug?: string | null } | null
    } | null
  } | null
}

export type MenuSectionFragment = {
  __typename?: 'ComponentMenuMenuSection'
  id: string
  label: string
  icon: Enum_Componentmenumenusection_Icon
  page?: {
    __typename?: 'PageEntityResponse'
    data?: {
      __typename?: 'PageEntity'
      id?: string | null
      attributes?: { __typename?: 'Page'; title?: string | null; slug?: string | null } | null
    } | null
  } | null
  links?: Array<{
    __typename?: 'ComponentMenuMenuLink'
    id: string
    label: string
    url?: string | null
    page?: {
      __typename?: 'PageEntityResponse'
      data?: {
        __typename?: 'PageEntity'
        id?: string | null
        attributes?: { __typename?: 'Page'; title?: string | null; slug?: string | null } | null
      } | null
    } | null
  } | null> | null
}

export type MenuItemFragment = {
  __typename?: 'ComponentMenuMenuItem'
  id: string
  label: string
  icon: Enum_Componentmenumenuitem_Icon
  page?: {
    __typename?: 'PageEntityResponse'
    data?: {
      __typename?: 'PageEntity'
      id?: string | null
      attributes?: { __typename?: 'Page'; title?: string | null; slug?: string | null } | null
    } | null
  } | null
  sections?: Array<{
    __typename?: 'ComponentMenuMenuSection'
    id: string
    label: string
    icon: Enum_Componentmenumenusection_Icon
    page?: {
      __typename?: 'PageEntityResponse'
      data?: {
        __typename?: 'PageEntity'
        id?: string | null
        attributes?: { __typename?: 'Page'; title?: string | null; slug?: string | null } | null
      } | null
    } | null
    links?: Array<{
      __typename?: 'ComponentMenuMenuLink'
      id: string
      label: string
      url?: string | null
      page?: {
        __typename?: 'PageEntityResponse'
        data?: {
          __typename?: 'PageEntity'
          id?: string | null
          attributes?: { __typename?: 'Page'; title?: string | null; slug?: string | null } | null
        } | null
      } | null
    } | null> | null
  } | null> | null
}

export type HeaderLinkFragment = {
  __typename?: 'ComponentGeneralHeaderLink'
  label: string
  url?: string | null
  showOnDesktop: boolean
  showOnMobile: boolean
  icon: Enum_Componentgeneralheaderlink_Icon
  page?: {
    __typename?: 'PageEntityResponse'
    data?: {
      __typename?: 'PageEntity'
      id?: string | null
      attributes?: { __typename?: 'Page'; title?: string | null; slug?: string | null } | null
    } | null
  } | null
}

export type GeneralPageRelationFragment = {
  __typename?: 'PageEntity'
  id?: string | null
  attributes?: { __typename?: 'Page'; title?: string | null; slug?: string | null } | null
}

export type GeneralFragment = {
  __typename?: 'General'
  header?: {
    __typename?: 'ComponentGeneralHeader'
    links?: Array<{
      __typename?: 'ComponentGeneralHeaderLink'
      label: string
      url?: string | null
      showOnDesktop: boolean
      showOnMobile: boolean
      icon: Enum_Componentgeneralheaderlink_Icon
      page?: {
        __typename?: 'PageEntityResponse'
        data?: {
          __typename?: 'PageEntity'
          id?: string | null
          attributes?: { __typename?: 'Page'; title?: string | null; slug?: string | null } | null
        } | null
      } | null
    } | null> | null
    accountLink?: {
      __typename?: 'ComponentBlocksCommonLink'
      label: string
      url?: string | null
      plausibleId?: string | null
      page?: {
        __typename?: 'PageEntityResponse'
        data?: {
          __typename?: 'PageEntity'
          id?: string | null
          attributes?: { __typename?: 'Page'; title?: string | null; slug?: string | null } | null
        } | null
      } | null
      blogPost?: {
        __typename?: 'BlogPostEntityResponse'
        data?: {
          __typename?: 'BlogPostEntity'
          id?: string | null
          attributes?: {
            __typename?: 'BlogPost'
            title?: string | null
            slug?: string | null
          } | null
        } | null
      } | null
    } | null
  } | null
  newsPage?: {
    __typename?: 'PageEntityResponse'
    data?: {
      __typename?: 'PageEntity'
      id?: string | null
      attributes?: {
        __typename?: 'Page'
        title?: string | null
        slug?: string | null
        locale?: string | null
        parentPage?: {
          __typename?: 'PageEntityResponse'
          data?: {
            __typename?: 'PageEntity'
            attributes?: {
              __typename?: 'Page'
              slug?: string | null
              locale?: string | null
              title?: string | null
              parentPage?: {
                __typename?: 'PageEntityResponse'
                data?: {
                  __typename?: 'PageEntity'
                  attributes?: {
                    __typename?: 'Page'
                    slug?: string | null
                    locale?: string | null
                    title?: string | null
                    parentPage?: {
                      __typename?: 'PageEntityResponse'
                      data?: {
                        __typename?: 'PageEntity'
                        attributes?: {
                          __typename?: 'Page'
                          slug?: string | null
                          locale?: string | null
                          title?: string | null
                          parentPage?: {
                            __typename?: 'PageEntityResponse'
                            data?: {
                              __typename?: 'PageEntity'
                              attributes?: {
                                __typename?: 'Page'
                                slug?: string | null
                                locale?: string | null
                                title?: string | null
                              } | null
                            } | null
                          } | null
                        } | null
                      } | null
                    } | null
                  } | null
                } | null
              } | null
            } | null
          } | null
        } | null
      } | null
    } | null
  } | null
  officialBoardPage?: {
    __typename?: 'PageEntityResponse'
    data?: {
      __typename?: 'PageEntity'
      id?: string | null
      attributes?: { __typename?: 'Page'; title?: string | null; slug?: string | null } | null
    } | null
  } | null
  privacyPolicyPage?: {
    __typename?: 'PageEntityResponse'
    data?: {
      __typename?: 'PageEntity'
      id?: string | null
      attributes?: { __typename?: 'Page'; title?: string | null; slug?: string | null } | null
    } | null
  } | null
  vznPage?: {
    __typename?: 'PageEntityResponse'
    data?: {
      __typename?: 'PageEntity'
      id?: string | null
      attributes?: { __typename?: 'Page'; title?: string | null; slug?: string | null } | null
    } | null
  } | null
  inbaPage?: {
    __typename?: 'PageEntityResponse'
    data?: {
      __typename?: 'PageEntity'
      id?: string | null
      attributes?: { __typename?: 'Page'; title?: string | null; slug?: string | null } | null
    } | null
  } | null
  inbaReleasesPage?: {
    __typename?: 'PageEntityResponse'
    data?: {
      __typename?: 'PageEntity'
      id?: string | null
      attributes?: { __typename?: 'Page'; title?: string | null; slug?: string | null } | null
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
    __typename?: 'GeneralEntityResponse'
    data?: {
      __typename?: 'GeneralEntity'
      attributes?: {
        __typename?: 'General'
        header?: {
          __typename?: 'ComponentGeneralHeader'
          links?: Array<{
            __typename?: 'ComponentGeneralHeaderLink'
            label: string
            url?: string | null
            showOnDesktop: boolean
            showOnMobile: boolean
            icon: Enum_Componentgeneralheaderlink_Icon
            page?: {
              __typename?: 'PageEntityResponse'
              data?: {
                __typename?: 'PageEntity'
                id?: string | null
                attributes?: {
                  __typename?: 'Page'
                  title?: string | null
                  slug?: string | null
                } | null
              } | null
            } | null
          } | null> | null
          accountLink?: {
            __typename?: 'ComponentBlocksCommonLink'
            label: string
            url?: string | null
            plausibleId?: string | null
            page?: {
              __typename?: 'PageEntityResponse'
              data?: {
                __typename?: 'PageEntity'
                id?: string | null
                attributes?: {
                  __typename?: 'Page'
                  title?: string | null
                  slug?: string | null
                } | null
              } | null
            } | null
            blogPost?: {
              __typename?: 'BlogPostEntityResponse'
              data?: {
                __typename?: 'BlogPostEntity'
                id?: string | null
                attributes?: {
                  __typename?: 'BlogPost'
                  title?: string | null
                  slug?: string | null
                } | null
              } | null
            } | null
          } | null
        } | null
        newsPage?: {
          __typename?: 'PageEntityResponse'
          data?: {
            __typename?: 'PageEntity'
            id?: string | null
            attributes?: {
              __typename?: 'Page'
              title?: string | null
              slug?: string | null
              locale?: string | null
              parentPage?: {
                __typename?: 'PageEntityResponse'
                data?: {
                  __typename?: 'PageEntity'
                  attributes?: {
                    __typename?: 'Page'
                    slug?: string | null
                    locale?: string | null
                    title?: string | null
                    parentPage?: {
                      __typename?: 'PageEntityResponse'
                      data?: {
                        __typename?: 'PageEntity'
                        attributes?: {
                          __typename?: 'Page'
                          slug?: string | null
                          locale?: string | null
                          title?: string | null
                          parentPage?: {
                            __typename?: 'PageEntityResponse'
                            data?: {
                              __typename?: 'PageEntity'
                              attributes?: {
                                __typename?: 'Page'
                                slug?: string | null
                                locale?: string | null
                                title?: string | null
                                parentPage?: {
                                  __typename?: 'PageEntityResponse'
                                  data?: {
                                    __typename?: 'PageEntity'
                                    attributes?: {
                                      __typename?: 'Page'
                                      slug?: string | null
                                      locale?: string | null
                                      title?: string | null
                                    } | null
                                  } | null
                                } | null
                              } | null
                            } | null
                          } | null
                        } | null
                      } | null
                    } | null
                  } | null
                } | null
              } | null
            } | null
          } | null
        } | null
        officialBoardPage?: {
          __typename?: 'PageEntityResponse'
          data?: {
            __typename?: 'PageEntity'
            id?: string | null
            attributes?: { __typename?: 'Page'; title?: string | null; slug?: string | null } | null
          } | null
        } | null
        privacyPolicyPage?: {
          __typename?: 'PageEntityResponse'
          data?: {
            __typename?: 'PageEntity'
            id?: string | null
            attributes?: { __typename?: 'Page'; title?: string | null; slug?: string | null } | null
          } | null
        } | null
        vznPage?: {
          __typename?: 'PageEntityResponse'
          data?: {
            __typename?: 'PageEntity'
            id?: string | null
            attributes?: { __typename?: 'Page'; title?: string | null; slug?: string | null } | null
          } | null
        } | null
        inbaPage?: {
          __typename?: 'PageEntityResponse'
          data?: {
            __typename?: 'PageEntity'
            id?: string | null
            attributes?: { __typename?: 'Page'; title?: string | null; slug?: string | null } | null
          } | null
        } | null
        inbaReleasesPage?: {
          __typename?: 'PageEntityResponse'
          data?: {
            __typename?: 'PageEntity'
            id?: string | null
            attributes?: { __typename?: 'Page'; title?: string | null; slug?: string | null } | null
          } | null
        } | null
      } | null
    } | null
  } | null
  menu?: {
    __typename?: 'MenuEntityResponse'
    data?: {
      __typename?: 'MenuEntity'
      attributes?: {
        __typename?: 'Menu'
        menus?: Array<{
          __typename?: 'ComponentMenuMenuItem'
          id: string
          label: string
          icon: Enum_Componentmenumenuitem_Icon
          page?: {
            __typename?: 'PageEntityResponse'
            data?: {
              __typename?: 'PageEntity'
              id?: string | null
              attributes?: {
                __typename?: 'Page'
                title?: string | null
                slug?: string | null
              } | null
            } | null
          } | null
          sections?: Array<{
            __typename?: 'ComponentMenuMenuSection'
            id: string
            label: string
            icon: Enum_Componentmenumenusection_Icon
            page?: {
              __typename?: 'PageEntityResponse'
              data?: {
                __typename?: 'PageEntity'
                id?: string | null
                attributes?: {
                  __typename?: 'Page'
                  title?: string | null
                  slug?: string | null
                } | null
              } | null
            } | null
            links?: Array<{
              __typename?: 'ComponentMenuMenuLink'
              id: string
              label: string
              url?: string | null
              page?: {
                __typename?: 'PageEntityResponse'
                data?: {
                  __typename?: 'PageEntity'
                  id?: string | null
                  attributes?: {
                    __typename?: 'Page'
                    title?: string | null
                    slug?: string | null
                  } | null
                } | null
              } | null
            } | null> | null
          } | null> | null
        } | null> | null
      } | null
    } | null
  } | null
  footer?: {
    __typename?: 'FooterEntityResponse'
    data?: {
      __typename?: 'FooterEntity'
      attributes?: {
        __typename?: 'Footer'
        address?: string | null
        facebookUrl?: string | null
        instagramUrl?: string | null
        contacts?: Array<{
          __typename?: 'ComponentBlocksFooterContactItem'
          label: string
          phone?: string | null
          mail?: string | null
        } | null> | null
        columns?: Array<{
          __typename?: 'ComponentBlocksFooterColumn'
          title: string
          links?: Array<{
            __typename?: 'ComponentBlocksCommonLink'
            label: string
            url?: string | null
            plausibleId?: string | null
            page?: {
              __typename?: 'PageEntityResponse'
              data?: {
                __typename?: 'PageEntity'
                id?: string | null
                attributes?: {
                  __typename?: 'Page'
                  title?: string | null
                  slug?: string | null
                } | null
              } | null
            } | null
            blogPost?: {
              __typename?: 'BlogPostEntityResponse'
              data?: {
                __typename?: 'BlogPostEntity'
                id?: string | null
                attributes?: {
                  __typename?: 'BlogPost'
                  title?: string | null
                  slug?: string | null
                } | null
              } | null
            } | null
          } | null> | null
        } | null> | null
        accessibilityPageLink?: {
          __typename?: 'ComponentBlocksCommonLink'
          label: string
          url?: string | null
          plausibleId?: string | null
          page?: {
            __typename?: 'PageEntityResponse'
            data?: {
              __typename?: 'PageEntity'
              id?: string | null
              attributes?: {
                __typename?: 'Page'
                title?: string | null
                slug?: string | null
              } | null
            } | null
          } | null
          blogPost?: {
            __typename?: 'BlogPostEntityResponse'
            data?: {
              __typename?: 'BlogPostEntity'
              id?: string | null
              attributes?: {
                __typename?: 'BlogPost'
                title?: string | null
                slug?: string | null
              } | null
            } | null
          } | null
        } | null
        innovationsLink?: {
          __typename?: 'ComponentBlocksCommonLink'
          label: string
          url?: string | null
          plausibleId?: string | null
          page?: {
            __typename?: 'PageEntityResponse'
            data?: {
              __typename?: 'PageEntity'
              id?: string | null
              attributes?: {
                __typename?: 'Page'
                title?: string | null
                slug?: string | null
              } | null
            } | null
          } | null
          blogPost?: {
            __typename?: 'BlogPostEntityResponse'
            data?: {
              __typename?: 'BlogPostEntity'
              id?: string | null
              attributes?: {
                __typename?: 'BlogPost'
                title?: string | null
                slug?: string | null
              } | null
            } | null
          } | null
        } | null
      } | null
    } | null
  } | null
  alert?: {
    __typename?: 'AlertEntityResponse'
    data?: {
      __typename?: 'AlertEntity'
      attributes?: { __typename?: 'Alert'; updatedAt?: any | null; text?: string | null } | null
    } | null
  } | null
}

export type AlertQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode']['input']
}>

export type AlertQuery = {
  __typename?: 'Query'
  alert?: {
    __typename?: 'AlertEntityResponse'
    data?: {
      __typename?: 'AlertEntity'
      attributes?: { __typename?: 'Alert'; updatedAt?: any | null; text?: string | null } | null
    } | null
  } | null
}

export type HomepageEntityFragment = {
  __typename?: 'HomepageEntity'
  id?: string | null
  attributes?: {
    __typename?: 'Homepage'
    updatedAt?: any | null
    createdAt?: any | null
    metaTitle: string
    metaDescription: string
    welcomeHeadline: string
    inbaUrl?: string | null
    welcomeMedia: {
      __typename?: 'UploadFileEntityResponse'
      data?: {
        __typename?: 'UploadFileEntity'
        id?: string | null
        attributes?: { __typename?: 'UploadFile'; url: string } | null
      } | null
    }
    highlights?: {
      __typename?: 'ComponentSectionsHomepageHighlights'
      title?: string | null
      text?: string | null
      cards?: Array<{
        __typename?: 'ComponentBlocksHomepageHighlightsItem'
        id: string
        link: {
          __typename?: 'ComponentBlocksCommonLink'
          label: string
          url?: string | null
          plausibleId?: string | null
          page?: {
            __typename?: 'PageEntityResponse'
            data?: {
              __typename?: 'PageEntity'
              id?: string | null
              attributes?: {
                __typename?: 'Page'
                title?: string | null
                slug?: string | null
              } | null
            } | null
          } | null
          blogPost?: {
            __typename?: 'BlogPostEntityResponse'
            data?: {
              __typename?: 'BlogPostEntity'
              id?: string | null
              attributes?: {
                __typename?: 'BlogPost'
                title?: string | null
                slug?: string | null
              } | null
            } | null
          } | null
        }
        image: {
          __typename?: 'UploadFileEntityResponse'
          data?: {
            __typename?: 'UploadFileEntity'
            id?: string | null
            attributes?: { __typename?: 'UploadFile'; url: string } | null
          } | null
        }
      } | null> | null
    } | null
    tabs?: {
      __typename?: 'ComponentSectionsHomepageTabs'
      leftNewsItem?: {
        __typename?: 'BlogPostEntityResponse'
        data?: {
          __typename?: 'BlogPostEntity'
          id?: string | null
          attributes?: {
            __typename?: 'BlogPost'
            slug?: string | null
            title?: string | null
            excerpt?: string | null
            date_added?: any | null
            publishedAt?: any | null
            updatedAt?: any | null
            coverImage?: {
              __typename?: 'UploadFileEntityResponse'
              data?: {
                __typename?: 'UploadFileEntity'
                attributes?: { __typename?: 'UploadFile'; url: string } | null
              } | null
            } | null
            tag?: {
              __typename?: 'TagEntityResponse'
              data?: {
                __typename?: 'TagEntity'
                attributes?: {
                  __typename?: 'Tag'
                  title?: string | null
                  pageCategory?: {
                    __typename?: 'PageCategoryEntityResponse'
                    data?: {
                      __typename?: 'PageCategoryEntity'
                      attributes?: {
                        __typename?: 'PageCategory'
                        title?: string | null
                        color?: Enum_Pagecategory_Color | null
                      } | null
                    } | null
                  } | null
                } | null
              } | null
            } | null
          } | null
        } | null
      } | null
      rightNewsItem?: {
        __typename?: 'BlogPostEntityResponse'
        data?: {
          __typename?: 'BlogPostEntity'
          id?: string | null
          attributes?: {
            __typename?: 'BlogPost'
            slug?: string | null
            title?: string | null
            excerpt?: string | null
            date_added?: any | null
            publishedAt?: any | null
            updatedAt?: any | null
            coverImage?: {
              __typename?: 'UploadFileEntityResponse'
              data?: {
                __typename?: 'UploadFileEntity'
                attributes?: { __typename?: 'UploadFile'; url: string } | null
              } | null
            } | null
            tag?: {
              __typename?: 'TagEntityResponse'
              data?: {
                __typename?: 'TagEntity'
                attributes?: {
                  __typename?: 'Tag'
                  title?: string | null
                  pageCategory?: {
                    __typename?: 'PageCategoryEntityResponse'
                    data?: {
                      __typename?: 'PageCategoryEntity'
                      attributes?: {
                        __typename?: 'PageCategory'
                        title?: string | null
                        color?: Enum_Pagecategory_Color | null
                      } | null
                    } | null
                  } | null
                } | null
              } | null
            } | null
          } | null
        } | null
      } | null
      newsPageLink?: {
        __typename?: 'ComponentBlocksCommonLink'
        label: string
        url?: string | null
        plausibleId?: string | null
        page?: {
          __typename?: 'PageEntityResponse'
          data?: {
            __typename?: 'PageEntity'
            id?: string | null
            attributes?: { __typename?: 'Page'; title?: string | null; slug?: string | null } | null
          } | null
        } | null
        blogPost?: {
          __typename?: 'BlogPostEntityResponse'
          data?: {
            __typename?: 'BlogPostEntity'
            id?: string | null
            attributes?: {
              __typename?: 'BlogPost'
              title?: string | null
              slug?: string | null
            } | null
          } | null
        } | null
      } | null
      officialBoardPageLink?: {
        __typename?: 'ComponentBlocksCommonLink'
        label: string
        url?: string | null
        plausibleId?: string | null
        page?: {
          __typename?: 'PageEntityResponse'
          data?: {
            __typename?: 'PageEntity'
            id?: string | null
            attributes?: { __typename?: 'Page'; title?: string | null; slug?: string | null } | null
          } | null
        } | null
        blogPost?: {
          __typename?: 'BlogPostEntityResponse'
          data?: {
            __typename?: 'BlogPostEntity'
            id?: string | null
            attributes?: {
              __typename?: 'BlogPost'
              title?: string | null
              slug?: string | null
            } | null
          } | null
        } | null
      } | null
      roadClosuresPageLink?: {
        __typename?: 'ComponentBlocksCommonLink'
        label: string
        url?: string | null
        plausibleId?: string | null
        page?: {
          __typename?: 'PageEntityResponse'
          data?: {
            __typename?: 'PageEntity'
            id?: string | null
            attributes?: { __typename?: 'Page'; title?: string | null; slug?: string | null } | null
          } | null
        } | null
        blogPost?: {
          __typename?: 'BlogPostEntityResponse'
          data?: {
            __typename?: 'BlogPostEntity'
            id?: string | null
            attributes?: {
              __typename?: 'BlogPost'
              title?: string | null
              slug?: string | null
            } | null
          } | null
        } | null
      } | null
    } | null
    mayorAndCouncil?: {
      __typename?: 'ComponentSectionsHomepageMayorAndCouncil'
      title?: string | null
      text?: string | null
      mayorCard?: {
        __typename?: 'ComponentBlocksCommonLink'
        label: string
        url?: string | null
        plausibleId?: string | null
        page?: {
          __typename?: 'PageEntityResponse'
          data?: {
            __typename?: 'PageEntity'
            id?: string | null
            attributes?: { __typename?: 'Page'; title?: string | null; slug?: string | null } | null
          } | null
        } | null
        blogPost?: {
          __typename?: 'BlogPostEntityResponse'
          data?: {
            __typename?: 'BlogPostEntity'
            id?: string | null
            attributes?: {
              __typename?: 'BlogPost'
              title?: string | null
              slug?: string | null
            } | null
          } | null
        } | null
      } | null
      councilCard?: {
        __typename?: 'ComponentBlocksCommonLink'
        label: string
        url?: string | null
        plausibleId?: string | null
        page?: {
          __typename?: 'PageEntityResponse'
          data?: {
            __typename?: 'PageEntity'
            id?: string | null
            attributes?: { __typename?: 'Page'; title?: string | null; slug?: string | null } | null
          } | null
        } | null
        blogPost?: {
          __typename?: 'BlogPostEntityResponse'
          data?: {
            __typename?: 'BlogPostEntity'
            id?: string | null
            attributes?: {
              __typename?: 'BlogPost'
              title?: string | null
              slug?: string | null
            } | null
          } | null
        } | null
      } | null
    } | null
    eventsSection?: {
      __typename?: 'ComponentSectionsHomepageEvents'
      title?: string | null
      text?: string | null
      eventsPageLink?: {
        __typename?: 'ComponentBlocksCommonLink'
        label: string
        url?: string | null
        plausibleId?: string | null
        page?: {
          __typename?: 'PageEntityResponse'
          data?: {
            __typename?: 'PageEntity'
            id?: string | null
            attributes?: { __typename?: 'Page'; title?: string | null; slug?: string | null } | null
          } | null
        } | null
        blogPost?: {
          __typename?: 'BlogPostEntityResponse'
          data?: {
            __typename?: 'BlogPostEntity'
            id?: string | null
            attributes?: {
              __typename?: 'BlogPost'
              title?: string | null
              slug?: string | null
            } | null
          } | null
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
          label: string
          url?: string | null
          plausibleId?: string | null
          page?: {
            __typename?: 'PageEntityResponse'
            data?: {
              __typename?: 'PageEntity'
              id?: string | null
              attributes?: {
                __typename?: 'Page'
                title?: string | null
                slug?: string | null
              } | null
            } | null
          } | null
          blogPost?: {
            __typename?: 'BlogPostEntityResponse'
            data?: {
              __typename?: 'BlogPostEntity'
              id?: string | null
              attributes?: {
                __typename?: 'BlogPost'
                title?: string | null
                slug?: string | null
              } | null
            } | null
          } | null
        }
      } | null>
    } | null
    inba?: {
      __typename?: 'ComponentBlocksInBa'
      title?: string | null
      content?: string | null
    } | null
    inbaFrontImage: {
      __typename?: 'UploadFileEntityResponse'
      data?: {
        __typename?: 'UploadFileEntity'
        id?: string | null
        attributes?: { __typename?: 'UploadFile'; url: string } | null
      } | null
    }
    inbaRearImage: {
      __typename?: 'UploadFileEntityResponse'
      data?: {
        __typename?: 'UploadFileEntity'
        id?: string | null
        attributes?: { __typename?: 'UploadFile'; url: string } | null
      } | null
    }
    cards?: Array<{
      __typename?: 'ComponentBlocksHomepageBookmark'
      title?: string | null
      headline?: string | null
      text?: string | null
      variant?: string | null
      link?: {
        __typename?: 'ComponentBlocksBookmarkLink'
        title?: string | null
        href?: string | null
      } | null
      picture?: {
        __typename?: 'UploadFileEntityResponse'
        data?: {
          __typename?: 'UploadFileEntity'
          attributes?: { __typename?: 'UploadFile'; url: string } | null
        } | null
      } | null
    } | null> | null
    bookmarkTourists?: {
      __typename?: 'ComponentBlocksHomepageBookmark'
      title?: string | null
      headline?: string | null
      text?: string | null
      variant?: string | null
      link?: {
        __typename?: 'ComponentBlocksBookmarkLink'
        title?: string | null
        href?: string | null
      } | null
      picture?: {
        __typename?: 'UploadFileEntityResponse'
        data?: {
          __typename?: 'UploadFileEntity'
          attributes?: { __typename?: 'UploadFile'; url: string } | null
        } | null
      } | null
    } | null
    bookmarkUkraine?: {
      __typename?: 'ComponentBlocksHomepageBookmark'
      title?: string | null
      headline?: string | null
      text?: string | null
      variant?: string | null
      link?: {
        __typename?: 'ComponentBlocksBookmarkLink'
        title?: string | null
        href?: string | null
      } | null
      picture?: {
        __typename?: 'UploadFileEntityResponse'
        data?: {
          __typename?: 'UploadFileEntity'
          attributes?: { __typename?: 'UploadFile'; url: string } | null
        } | null
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
    __typename?: 'HomepageEntityResponse'
    data?: {
      __typename?: 'HomepageEntity'
      id?: string | null
      attributes?: {
        __typename?: 'Homepage'
        updatedAt?: any | null
        createdAt?: any | null
        metaTitle: string
        metaDescription: string
        welcomeHeadline: string
        inbaUrl?: string | null
        welcomeMedia: {
          __typename?: 'UploadFileEntityResponse'
          data?: {
            __typename?: 'UploadFileEntity'
            id?: string | null
            attributes?: { __typename?: 'UploadFile'; url: string } | null
          } | null
        }
        highlights?: {
          __typename?: 'ComponentSectionsHomepageHighlights'
          title?: string | null
          text?: string | null
          cards?: Array<{
            __typename?: 'ComponentBlocksHomepageHighlightsItem'
            id: string
            link: {
              __typename?: 'ComponentBlocksCommonLink'
              label: string
              url?: string | null
              plausibleId?: string | null
              page?: {
                __typename?: 'PageEntityResponse'
                data?: {
                  __typename?: 'PageEntity'
                  id?: string | null
                  attributes?: {
                    __typename?: 'Page'
                    title?: string | null
                    slug?: string | null
                  } | null
                } | null
              } | null
              blogPost?: {
                __typename?: 'BlogPostEntityResponse'
                data?: {
                  __typename?: 'BlogPostEntity'
                  id?: string | null
                  attributes?: {
                    __typename?: 'BlogPost'
                    title?: string | null
                    slug?: string | null
                  } | null
                } | null
              } | null
            }
            image: {
              __typename?: 'UploadFileEntityResponse'
              data?: {
                __typename?: 'UploadFileEntity'
                id?: string | null
                attributes?: { __typename?: 'UploadFile'; url: string } | null
              } | null
            }
          } | null> | null
        } | null
        tabs?: {
          __typename?: 'ComponentSectionsHomepageTabs'
          leftNewsItem?: {
            __typename?: 'BlogPostEntityResponse'
            data?: {
              __typename?: 'BlogPostEntity'
              id?: string | null
              attributes?: {
                __typename?: 'BlogPost'
                slug?: string | null
                title?: string | null
                excerpt?: string | null
                date_added?: any | null
                publishedAt?: any | null
                updatedAt?: any | null
                coverImage?: {
                  __typename?: 'UploadFileEntityResponse'
                  data?: {
                    __typename?: 'UploadFileEntity'
                    attributes?: { __typename?: 'UploadFile'; url: string } | null
                  } | null
                } | null
                tag?: {
                  __typename?: 'TagEntityResponse'
                  data?: {
                    __typename?: 'TagEntity'
                    attributes?: {
                      __typename?: 'Tag'
                      title?: string | null
                      pageCategory?: {
                        __typename?: 'PageCategoryEntityResponse'
                        data?: {
                          __typename?: 'PageCategoryEntity'
                          attributes?: {
                            __typename?: 'PageCategory'
                            title?: string | null
                            color?: Enum_Pagecategory_Color | null
                          } | null
                        } | null
                      } | null
                    } | null
                  } | null
                } | null
              } | null
            } | null
          } | null
          rightNewsItem?: {
            __typename?: 'BlogPostEntityResponse'
            data?: {
              __typename?: 'BlogPostEntity'
              id?: string | null
              attributes?: {
                __typename?: 'BlogPost'
                slug?: string | null
                title?: string | null
                excerpt?: string | null
                date_added?: any | null
                publishedAt?: any | null
                updatedAt?: any | null
                coverImage?: {
                  __typename?: 'UploadFileEntityResponse'
                  data?: {
                    __typename?: 'UploadFileEntity'
                    attributes?: { __typename?: 'UploadFile'; url: string } | null
                  } | null
                } | null
                tag?: {
                  __typename?: 'TagEntityResponse'
                  data?: {
                    __typename?: 'TagEntity'
                    attributes?: {
                      __typename?: 'Tag'
                      title?: string | null
                      pageCategory?: {
                        __typename?: 'PageCategoryEntityResponse'
                        data?: {
                          __typename?: 'PageCategoryEntity'
                          attributes?: {
                            __typename?: 'PageCategory'
                            title?: string | null
                            color?: Enum_Pagecategory_Color | null
                          } | null
                        } | null
                      } | null
                    } | null
                  } | null
                } | null
              } | null
            } | null
          } | null
          newsPageLink?: {
            __typename?: 'ComponentBlocksCommonLink'
            label: string
            url?: string | null
            plausibleId?: string | null
            page?: {
              __typename?: 'PageEntityResponse'
              data?: {
                __typename?: 'PageEntity'
                id?: string | null
                attributes?: {
                  __typename?: 'Page'
                  title?: string | null
                  slug?: string | null
                } | null
              } | null
            } | null
            blogPost?: {
              __typename?: 'BlogPostEntityResponse'
              data?: {
                __typename?: 'BlogPostEntity'
                id?: string | null
                attributes?: {
                  __typename?: 'BlogPost'
                  title?: string | null
                  slug?: string | null
                } | null
              } | null
            } | null
          } | null
          officialBoardPageLink?: {
            __typename?: 'ComponentBlocksCommonLink'
            label: string
            url?: string | null
            plausibleId?: string | null
            page?: {
              __typename?: 'PageEntityResponse'
              data?: {
                __typename?: 'PageEntity'
                id?: string | null
                attributes?: {
                  __typename?: 'Page'
                  title?: string | null
                  slug?: string | null
                } | null
              } | null
            } | null
            blogPost?: {
              __typename?: 'BlogPostEntityResponse'
              data?: {
                __typename?: 'BlogPostEntity'
                id?: string | null
                attributes?: {
                  __typename?: 'BlogPost'
                  title?: string | null
                  slug?: string | null
                } | null
              } | null
            } | null
          } | null
          roadClosuresPageLink?: {
            __typename?: 'ComponentBlocksCommonLink'
            label: string
            url?: string | null
            plausibleId?: string | null
            page?: {
              __typename?: 'PageEntityResponse'
              data?: {
                __typename?: 'PageEntity'
                id?: string | null
                attributes?: {
                  __typename?: 'Page'
                  title?: string | null
                  slug?: string | null
                } | null
              } | null
            } | null
            blogPost?: {
              __typename?: 'BlogPostEntityResponse'
              data?: {
                __typename?: 'BlogPostEntity'
                id?: string | null
                attributes?: {
                  __typename?: 'BlogPost'
                  title?: string | null
                  slug?: string | null
                } | null
              } | null
            } | null
          } | null
        } | null
        mayorAndCouncil?: {
          __typename?: 'ComponentSectionsHomepageMayorAndCouncil'
          title?: string | null
          text?: string | null
          mayorCard?: {
            __typename?: 'ComponentBlocksCommonLink'
            label: string
            url?: string | null
            plausibleId?: string | null
            page?: {
              __typename?: 'PageEntityResponse'
              data?: {
                __typename?: 'PageEntity'
                id?: string | null
                attributes?: {
                  __typename?: 'Page'
                  title?: string | null
                  slug?: string | null
                } | null
              } | null
            } | null
            blogPost?: {
              __typename?: 'BlogPostEntityResponse'
              data?: {
                __typename?: 'BlogPostEntity'
                id?: string | null
                attributes?: {
                  __typename?: 'BlogPost'
                  title?: string | null
                  slug?: string | null
                } | null
              } | null
            } | null
          } | null
          councilCard?: {
            __typename?: 'ComponentBlocksCommonLink'
            label: string
            url?: string | null
            plausibleId?: string | null
            page?: {
              __typename?: 'PageEntityResponse'
              data?: {
                __typename?: 'PageEntity'
                id?: string | null
                attributes?: {
                  __typename?: 'Page'
                  title?: string | null
                  slug?: string | null
                } | null
              } | null
            } | null
            blogPost?: {
              __typename?: 'BlogPostEntityResponse'
              data?: {
                __typename?: 'BlogPostEntity'
                id?: string | null
                attributes?: {
                  __typename?: 'BlogPost'
                  title?: string | null
                  slug?: string | null
                } | null
              } | null
            } | null
          } | null
        } | null
        eventsSection?: {
          __typename?: 'ComponentSectionsHomepageEvents'
          title?: string | null
          text?: string | null
          eventsPageLink?: {
            __typename?: 'ComponentBlocksCommonLink'
            label: string
            url?: string | null
            plausibleId?: string | null
            page?: {
              __typename?: 'PageEntityResponse'
              data?: {
                __typename?: 'PageEntity'
                id?: string | null
                attributes?: {
                  __typename?: 'Page'
                  title?: string | null
                  slug?: string | null
                } | null
              } | null
            } | null
            blogPost?: {
              __typename?: 'BlogPostEntityResponse'
              data?: {
                __typename?: 'BlogPostEntity'
                id?: string | null
                attributes?: {
                  __typename?: 'BlogPost'
                  title?: string | null
                  slug?: string | null
                } | null
              } | null
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
              label: string
              url?: string | null
              plausibleId?: string | null
              page?: {
                __typename?: 'PageEntityResponse'
                data?: {
                  __typename?: 'PageEntity'
                  id?: string | null
                  attributes?: {
                    __typename?: 'Page'
                    title?: string | null
                    slug?: string | null
                  } | null
                } | null
              } | null
              blogPost?: {
                __typename?: 'BlogPostEntityResponse'
                data?: {
                  __typename?: 'BlogPostEntity'
                  id?: string | null
                  attributes?: {
                    __typename?: 'BlogPost'
                    title?: string | null
                    slug?: string | null
                  } | null
                } | null
              } | null
            }
          } | null>
        } | null
        inba?: {
          __typename?: 'ComponentBlocksInBa'
          title?: string | null
          content?: string | null
        } | null
        inbaFrontImage: {
          __typename?: 'UploadFileEntityResponse'
          data?: {
            __typename?: 'UploadFileEntity'
            id?: string | null
            attributes?: { __typename?: 'UploadFile'; url: string } | null
          } | null
        }
        inbaRearImage: {
          __typename?: 'UploadFileEntityResponse'
          data?: {
            __typename?: 'UploadFileEntity'
            id?: string | null
            attributes?: { __typename?: 'UploadFile'; url: string } | null
          } | null
        }
        cards?: Array<{
          __typename?: 'ComponentBlocksHomepageBookmark'
          title?: string | null
          headline?: string | null
          text?: string | null
          variant?: string | null
          link?: {
            __typename?: 'ComponentBlocksBookmarkLink'
            title?: string | null
            href?: string | null
          } | null
          picture?: {
            __typename?: 'UploadFileEntityResponse'
            data?: {
              __typename?: 'UploadFileEntity'
              attributes?: { __typename?: 'UploadFile'; url: string } | null
            } | null
          } | null
        } | null> | null
        bookmarkTourists?: {
          __typename?: 'ComponentBlocksHomepageBookmark'
          title?: string | null
          headline?: string | null
          text?: string | null
          variant?: string | null
          link?: {
            __typename?: 'ComponentBlocksBookmarkLink'
            title?: string | null
            href?: string | null
          } | null
          picture?: {
            __typename?: 'UploadFileEntityResponse'
            data?: {
              __typename?: 'UploadFileEntity'
              attributes?: { __typename?: 'UploadFile'; url: string } | null
            } | null
          } | null
        } | null
        bookmarkUkraine?: {
          __typename?: 'ComponentBlocksHomepageBookmark'
          title?: string | null
          headline?: string | null
          text?: string | null
          variant?: string | null
          link?: {
            __typename?: 'ComponentBlocksBookmarkLink'
            title?: string | null
            href?: string | null
          } | null
          picture?: {
            __typename?: 'UploadFileEntityResponse'
            data?: {
              __typename?: 'UploadFileEntity'
              attributes?: { __typename?: 'UploadFile'; url: string } | null
            } | null
          } | null
        } | null
      } | null
    } | null
  } | null
}

export type HomepageBookmarkFragment = {
  __typename?: 'ComponentBlocksHomepageBookmark'
  title?: string | null
  headline?: string | null
  text?: string | null
  variant?: string | null
  link?: {
    __typename?: 'ComponentBlocksBookmarkLink'
    title?: string | null
    href?: string | null
  } | null
  picture?: {
    __typename?: 'UploadFileEntityResponse'
    data?: {
      __typename?: 'UploadFileEntity'
      attributes?: { __typename?: 'UploadFile'; url: string } | null
    } | null
  } | null
}

export type HomepageHighlightsItemFragment = {
  __typename?: 'ComponentBlocksHomepageHighlightsItem'
  id: string
  link: {
    __typename?: 'ComponentBlocksCommonLink'
    label: string
    url?: string | null
    plausibleId?: string | null
    page?: {
      __typename?: 'PageEntityResponse'
      data?: {
        __typename?: 'PageEntity'
        id?: string | null
        attributes?: { __typename?: 'Page'; title?: string | null; slug?: string | null } | null
      } | null
    } | null
    blogPost?: {
      __typename?: 'BlogPostEntityResponse'
      data?: {
        __typename?: 'BlogPostEntity'
        id?: string | null
        attributes?: { __typename?: 'BlogPost'; title?: string | null; slug?: string | null } | null
      } | null
    } | null
  }
  image: {
    __typename?: 'UploadFileEntityResponse'
    data?: {
      __typename?: 'UploadFileEntity'
      id?: string | null
      attributes?: { __typename?: 'UploadFile'; url: string } | null
    } | null
  }
}

export type HomepageTabsFragment = {
  __typename?: 'ComponentSectionsHomepageTabs'
  leftNewsItem?: {
    __typename?: 'BlogPostEntityResponse'
    data?: {
      __typename?: 'BlogPostEntity'
      id?: string | null
      attributes?: {
        __typename?: 'BlogPost'
        slug?: string | null
        title?: string | null
        excerpt?: string | null
        date_added?: any | null
        publishedAt?: any | null
        updatedAt?: any | null
        coverImage?: {
          __typename?: 'UploadFileEntityResponse'
          data?: {
            __typename?: 'UploadFileEntity'
            attributes?: { __typename?: 'UploadFile'; url: string } | null
          } | null
        } | null
        tag?: {
          __typename?: 'TagEntityResponse'
          data?: {
            __typename?: 'TagEntity'
            attributes?: {
              __typename?: 'Tag'
              title?: string | null
              pageCategory?: {
                __typename?: 'PageCategoryEntityResponse'
                data?: {
                  __typename?: 'PageCategoryEntity'
                  attributes?: {
                    __typename?: 'PageCategory'
                    title?: string | null
                    color?: Enum_Pagecategory_Color | null
                  } | null
                } | null
              } | null
            } | null
          } | null
        } | null
      } | null
    } | null
  } | null
  rightNewsItem?: {
    __typename?: 'BlogPostEntityResponse'
    data?: {
      __typename?: 'BlogPostEntity'
      id?: string | null
      attributes?: {
        __typename?: 'BlogPost'
        slug?: string | null
        title?: string | null
        excerpt?: string | null
        date_added?: any | null
        publishedAt?: any | null
        updatedAt?: any | null
        coverImage?: {
          __typename?: 'UploadFileEntityResponse'
          data?: {
            __typename?: 'UploadFileEntity'
            attributes?: { __typename?: 'UploadFile'; url: string } | null
          } | null
        } | null
        tag?: {
          __typename?: 'TagEntityResponse'
          data?: {
            __typename?: 'TagEntity'
            attributes?: {
              __typename?: 'Tag'
              title?: string | null
              pageCategory?: {
                __typename?: 'PageCategoryEntityResponse'
                data?: {
                  __typename?: 'PageCategoryEntity'
                  attributes?: {
                    __typename?: 'PageCategory'
                    title?: string | null
                    color?: Enum_Pagecategory_Color | null
                  } | null
                } | null
              } | null
            } | null
          } | null
        } | null
      } | null
    } | null
  } | null
  newsPageLink?: {
    __typename?: 'ComponentBlocksCommonLink'
    label: string
    url?: string | null
    plausibleId?: string | null
    page?: {
      __typename?: 'PageEntityResponse'
      data?: {
        __typename?: 'PageEntity'
        id?: string | null
        attributes?: { __typename?: 'Page'; title?: string | null; slug?: string | null } | null
      } | null
    } | null
    blogPost?: {
      __typename?: 'BlogPostEntityResponse'
      data?: {
        __typename?: 'BlogPostEntity'
        id?: string | null
        attributes?: { __typename?: 'BlogPost'; title?: string | null; slug?: string | null } | null
      } | null
    } | null
  } | null
  officialBoardPageLink?: {
    __typename?: 'ComponentBlocksCommonLink'
    label: string
    url?: string | null
    plausibleId?: string | null
    page?: {
      __typename?: 'PageEntityResponse'
      data?: {
        __typename?: 'PageEntity'
        id?: string | null
        attributes?: { __typename?: 'Page'; title?: string | null; slug?: string | null } | null
      } | null
    } | null
    blogPost?: {
      __typename?: 'BlogPostEntityResponse'
      data?: {
        __typename?: 'BlogPostEntity'
        id?: string | null
        attributes?: { __typename?: 'BlogPost'; title?: string | null; slug?: string | null } | null
      } | null
    } | null
  } | null
  roadClosuresPageLink?: {
    __typename?: 'ComponentBlocksCommonLink'
    label: string
    url?: string | null
    plausibleId?: string | null
    page?: {
      __typename?: 'PageEntityResponse'
      data?: {
        __typename?: 'PageEntity'
        id?: string | null
        attributes?: { __typename?: 'Page'; title?: string | null; slug?: string | null } | null
      } | null
    } | null
    blogPost?: {
      __typename?: 'BlogPostEntityResponse'
      data?: {
        __typename?: 'BlogPostEntity'
        id?: string | null
        attributes?: { __typename?: 'BlogPost'; title?: string | null; slug?: string | null } | null
      } | null
    } | null
  } | null
}

export type HomepageMayorAndCouncilFragment = {
  __typename?: 'ComponentSectionsHomepageMayorAndCouncil'
  title?: string | null
  text?: string | null
  mayorCard?: {
    __typename?: 'ComponentBlocksCommonLink'
    label: string
    url?: string | null
    plausibleId?: string | null
    page?: {
      __typename?: 'PageEntityResponse'
      data?: {
        __typename?: 'PageEntity'
        id?: string | null
        attributes?: { __typename?: 'Page'; title?: string | null; slug?: string | null } | null
      } | null
    } | null
    blogPost?: {
      __typename?: 'BlogPostEntityResponse'
      data?: {
        __typename?: 'BlogPostEntity'
        id?: string | null
        attributes?: { __typename?: 'BlogPost'; title?: string | null; slug?: string | null } | null
      } | null
    } | null
  } | null
  councilCard?: {
    __typename?: 'ComponentBlocksCommonLink'
    label: string
    url?: string | null
    plausibleId?: string | null
    page?: {
      __typename?: 'PageEntityResponse'
      data?: {
        __typename?: 'PageEntity'
        id?: string | null
        attributes?: { __typename?: 'Page'; title?: string | null; slug?: string | null } | null
      } | null
    } | null
    blogPost?: {
      __typename?: 'BlogPostEntityResponse'
      data?: {
        __typename?: 'BlogPostEntity'
        id?: string | null
        attributes?: { __typename?: 'BlogPost'; title?: string | null; slug?: string | null } | null
      } | null
    } | null
  } | null
}

export type TopServicesItemFragment = {
  __typename?: 'ComponentBlocksTopServicesItem'
  icon: Enum_Componentblockstopservicesitem_Icon
  link: {
    __typename?: 'ComponentBlocksCommonLink'
    label: string
    url?: string | null
    plausibleId?: string | null
    page?: {
      __typename?: 'PageEntityResponse'
      data?: {
        __typename?: 'PageEntity'
        id?: string | null
        attributes?: { __typename?: 'Page'; title?: string | null; slug?: string | null } | null
      } | null
    } | null
    blogPost?: {
      __typename?: 'BlogPostEntityResponse'
      data?: {
        __typename?: 'BlogPostEntity'
        id?: string | null
        attributes?: { __typename?: 'BlogPost'; title?: string | null; slug?: string | null } | null
      } | null
    } | null
  }
}

export type HomepageInbaFragment = {
  __typename?: 'ComponentBlocksInBa'
  title?: string | null
  content?: string | null
}

export type InbaArticleBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input']
  locale: Scalars['I18NLocaleCode']['input']
}>

export type InbaArticleBySlugQuery = {
  __typename?: 'Query'
  inbaArticles?: {
    __typename?: 'InbaArticleEntityResponseCollection'
    data: Array<{
      __typename?: 'InbaArticleEntity'
      id?: string | null
      attributes?: {
        __typename?: 'InbaArticle'
        title: string
        slug: string
        perex?: string | null
        publishedAt?: any | null
        content?: string | null
        coverImage?: {
          __typename?: 'UploadFileEntityResponse'
          data?: {
            __typename?: 'UploadFileEntity'
            attributes?: { __typename?: 'UploadFile'; url: string } | null
          } | null
        } | null
        inbaTag?: {
          __typename?: 'InbaTagEntityResponse'
          data?: {
            __typename?: 'InbaTagEntity'
            id?: string | null
            attributes?: { __typename?: 'InbaTag'; title: string } | null
          } | null
        } | null
        inbaRelease?: {
          __typename?: 'InbaReleaseEntityResponse'
          data?: {
            __typename?: 'InbaReleaseEntity'
            attributes?: {
              __typename?: 'InbaRelease'
              title: string
              releaseDate: any
              slug: string
            } | null
          } | null
        } | null
      } | null
    }>
  } | null
}

export type InbaArticlesStaticPathsQueryVariables = Exact<{ [key: string]: never }>

export type InbaArticlesStaticPathsQuery = {
  __typename?: 'Query'
  inbaArticles?: {
    __typename?: 'InbaArticleEntityResponseCollection'
    data: Array<{
      __typename?: 'InbaArticleEntity'
      id?: string | null
      attributes?: { __typename?: 'InbaArticle'; slug: string; locale?: string | null } | null
    }>
  } | null
}

export type InbaArticlesRssFeedQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode']['input']
}>

export type InbaArticlesRssFeedQuery = {
  __typename?: 'Query'
  inbaArticles?: {
    __typename?: 'InbaArticleEntityResponseCollection'
    data: Array<{
      __typename?: 'InbaArticleEntity'
      id?: string | null
      attributes?: {
        __typename?: 'InbaArticle'
        title: string
        slug: string
        perex?: string | null
        publishedAt?: any | null
        content?: string | null
        coverImage?: {
          __typename?: 'UploadFileEntityResponse'
          data?: {
            __typename?: 'UploadFileEntity'
            attributes?: { __typename?: 'UploadFile'; url: string } | null
          } | null
        } | null
        inbaTag?: {
          __typename?: 'InbaTagEntityResponse'
          data?: {
            __typename?: 'InbaTagEntity'
            id?: string | null
            attributes?: { __typename?: 'InbaTag'; title: string } | null
          } | null
        } | null
      } | null
    }>
  } | null
}

export type InbaTagsQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode']['input']
}>

export type InbaTagsQuery = {
  __typename?: 'Query'
  inbaTags?: {
    __typename?: 'InbaTagEntityResponseCollection'
    data: Array<{
      __typename?: 'InbaTagEntity'
      id?: string | null
      attributes?: { __typename?: 'InbaTag'; title: string } | null
    }>
  } | null
}

export type InbaArticleEntityFragment = {
  __typename?: 'InbaArticleEntity'
  id?: string | null
  attributes?: {
    __typename?: 'InbaArticle'
    title: string
    slug: string
    perex?: string | null
    publishedAt?: any | null
    content?: string | null
    coverImage?: {
      __typename?: 'UploadFileEntityResponse'
      data?: {
        __typename?: 'UploadFileEntity'
        attributes?: { __typename?: 'UploadFile'; url: string } | null
      } | null
    } | null
    inbaTag?: {
      __typename?: 'InbaTagEntityResponse'
      data?: {
        __typename?: 'InbaTagEntity'
        id?: string | null
        attributes?: { __typename?: 'InbaTag'; title: string } | null
      } | null
    } | null
    inbaRelease?: {
      __typename?: 'InbaReleaseEntityResponse'
      data?: {
        __typename?: 'InbaReleaseEntity'
        attributes?: {
          __typename?: 'InbaRelease'
          title: string
          releaseDate: any
          slug: string
        } | null
      } | null
    } | null
  } | null
}

export type InbaTagEntityFragment = {
  __typename?: 'InbaTagEntity'
  id?: string | null
  attributes?: { __typename?: 'InbaTag'; title: string } | null
}

export type InbaReleaseBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input']
}>

export type InbaReleaseBySlugQuery = {
  __typename?: 'Query'
  inbaReleases?: {
    __typename?: 'InbaReleaseEntityResponseCollection'
    data: Array<{
      __typename?: 'InbaReleaseEntity'
      id?: string | null
      attributes?: {
        __typename?: 'InbaRelease'
        title: string
        slug: string
        perex?: string | null
        releaseDate: any
        coverImage?: {
          __typename?: 'UploadFileEntityResponse'
          data?: {
            __typename?: 'UploadFileEntity'
            id?: string | null
            attributes?: {
              __typename?: 'UploadFile'
              url: string
              width?: number | null
              height?: number | null
              caption?: string | null
              alternativeText?: string | null
              name: string
            } | null
          } | null
        } | null
        rearImage?: {
          __typename?: 'UploadFileEntityResponse'
          data?: {
            __typename?: 'UploadFileEntity'
            id?: string | null
            attributes?: {
              __typename?: 'UploadFile'
              url: string
              width?: number | null
              height?: number | null
              caption?: string | null
              alternativeText?: string | null
              name: string
            } | null
          } | null
        } | null
        files?: Array<{
          __typename?: 'ComponentBlocksFileItem'
          title?: string | null
          media: {
            __typename?: 'UploadFileEntityResponse'
            data?: {
              __typename?: 'UploadFileEntity'
              id?: string | null
              attributes?: {
                __typename?: 'UploadFile'
                url: string
                name: string
                ext?: string | null
                size: number
                createdAt?: any | null
                updatedAt?: any | null
              } | null
            } | null
          }
        } | null> | null
      } | null
    }>
  } | null
}

export type InbaReleasesStaticPathsQueryVariables = Exact<{ [key: string]: never }>

export type InbaReleasesStaticPathsQuery = {
  __typename?: 'Query'
  inbaReleases?: {
    __typename?: 'InbaReleaseEntityResponseCollection'
    data: Array<{
      __typename?: 'InbaReleaseEntity'
      id?: string | null
      attributes?: { __typename?: 'InbaRelease'; slug: string } | null
    }>
  } | null
}

export type InbaReleasesRssFeedQueryVariables = Exact<{ [key: string]: never }>

export type InbaReleasesRssFeedQuery = {
  __typename?: 'Query'
  inbaReleases?: {
    __typename?: 'InbaReleaseEntityResponseCollection'
    data: Array<{
      __typename?: 'InbaReleaseEntity'
      id?: string | null
      attributes?: {
        __typename?: 'InbaRelease'
        title: string
        slug: string
        perex?: string | null
        publishedAt?: any | null
        coverImage?: {
          __typename?: 'UploadFileEntityResponse'
          data?: {
            __typename?: 'UploadFileEntity'
            attributes?: { __typename?: 'UploadFile'; url: string } | null
          } | null
        } | null
      } | null
    }>
  } | null
}

export type InbaReleasesPaginatedQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>
  pageSize?: InputMaybe<Scalars['Int']['input']>
}>

export type InbaReleasesPaginatedQuery = {
  __typename?: 'Query'
  inbaReleases?: {
    __typename?: 'InbaReleaseEntityResponseCollection'
    data: Array<{
      __typename?: 'InbaReleaseEntity'
      id?: string | null
      attributes?: {
        __typename?: 'InbaRelease'
        title: string
        slug: string
        perex?: string | null
        releaseDate: any
        coverImage?: {
          __typename?: 'UploadFileEntityResponse'
          data?: {
            __typename?: 'UploadFileEntity'
            id?: string | null
            attributes?: {
              __typename?: 'UploadFile'
              url: string
              width?: number | null
              height?: number | null
              caption?: string | null
              alternativeText?: string | null
              name: string
            } | null
          } | null
        } | null
        rearImage?: {
          __typename?: 'UploadFileEntityResponse'
          data?: {
            __typename?: 'UploadFileEntity'
            id?: string | null
            attributes?: {
              __typename?: 'UploadFile'
              url: string
              width?: number | null
              height?: number | null
              caption?: string | null
              alternativeText?: string | null
              name: string
            } | null
          } | null
        } | null
        files?: Array<{
          __typename?: 'ComponentBlocksFileItem'
          title?: string | null
          media: {
            __typename?: 'UploadFileEntityResponse'
            data?: {
              __typename?: 'UploadFileEntity'
              id?: string | null
              attributes?: {
                __typename?: 'UploadFile'
                url: string
                name: string
                ext?: string | null
                size: number
                createdAt?: any | null
                updatedAt?: any | null
              } | null
            } | null
          }
        } | null> | null
      } | null
    }>
  } | null
}

export type InbaReleaseEntityFragment = {
  __typename?: 'InbaReleaseEntity'
  id?: string | null
  attributes?: {
    __typename?: 'InbaRelease'
    title: string
    slug: string
    perex?: string | null
    releaseDate: any
    coverImage?: {
      __typename?: 'UploadFileEntityResponse'
      data?: {
        __typename?: 'UploadFileEntity'
        id?: string | null
        attributes?: {
          __typename?: 'UploadFile'
          url: string
          width?: number | null
          height?: number | null
          caption?: string | null
          alternativeText?: string | null
          name: string
        } | null
      } | null
    } | null
    rearImage?: {
      __typename?: 'UploadFileEntityResponse'
      data?: {
        __typename?: 'UploadFileEntity'
        id?: string | null
        attributes?: {
          __typename?: 'UploadFile'
          url: string
          width?: number | null
          height?: number | null
          caption?: string | null
          alternativeText?: string | null
          name: string
        } | null
      } | null
    } | null
    files?: Array<{
      __typename?: 'ComponentBlocksFileItem'
      title?: string | null
      media: {
        __typename?: 'UploadFileEntityResponse'
        data?: {
          __typename?: 'UploadFileEntity'
          id?: string | null
          attributes?: {
            __typename?: 'UploadFile'
            url: string
            name: string
            ext?: string | null
            size: number
            createdAt?: any | null
            updatedAt?: any | null
          } | null
        } | null
      }
    } | null> | null
  } | null
}

export type PagesStaticPathsQueryVariables = Exact<{ [key: string]: never }>

export type PagesStaticPathsQuery = {
  __typename?: 'Query'
  pages?: {
    __typename?: 'PageEntityResponseCollection'
    data: Array<{
      __typename?: 'PageEntity'
      id?: string | null
      attributes?: { __typename?: 'Page'; slug?: string | null } | null
    }>
  } | null
}

export type PageBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input']
  locale: Scalars['I18NLocaleCode']['input']
}>

export type PageBySlugQuery = {
  __typename?: 'Query'
  pages?: {
    __typename?: 'PageEntityResponseCollection'
    data: Array<{
      __typename?: 'PageEntity'
      id?: string | null
      attributes?: {
        __typename?: 'Page'
        slug?: string | null
        title?: string | null
        subtext?: string | null
        pageColor?: Enum_Page_Pagecolor | null
        metaDiscription?: string | null
        keywords?: string | null
        locale?: string | null
        pageBackgroundImage?: {
          __typename?: 'UploadFileEntityResponse'
          data?: {
            __typename?: 'UploadFileEntity'
            id?: string | null
            attributes?: { __typename?: 'UploadFile'; url: string } | null
          } | null
        } | null
        headerLinks?: Array<{
          __typename?: 'ComponentBlocksCommonLink'
          label: string
          url?: string | null
          plausibleId?: string | null
          page?: {
            __typename?: 'PageEntityResponse'
            data?: {
              __typename?: 'PageEntity'
              id?: string | null
              attributes?: {
                __typename?: 'Page'
                title?: string | null
                slug?: string | null
              } | null
            } | null
          } | null
          blogPost?: {
            __typename?: 'BlogPostEntityResponse'
            data?: {
              __typename?: 'BlogPostEntity'
              id?: string | null
              attributes?: {
                __typename?: 'BlogPost'
                title?: string | null
                slug?: string | null
              } | null
            } | null
          } | null
        } | null> | null
        sections?: Array<
          | {
              __typename: 'ComponentSectionsAccordion'
              title?: string | null
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
                width?: Enum_Componentaccordionitemsflattext_Width | null
                align?: Enum_Componentaccordionitemsflattext_Align | null
                moreLinkTitle?: string | null
                moreLinkUrl?: string | null
                moreLinkPage?: {
                  __typename?: 'PageEntityResponse'
                  data?: {
                    __typename?: 'PageEntity'
                    attributes?: {
                      __typename?: 'Page'
                      slug?: string | null
                      title?: string | null
                      locale?: string | null
                    } | null
                  } | null
                } | null
                fileList?: Array<{
                  __typename?: 'ComponentBlocksFileItem'
                  title?: string | null
                  media: {
                    __typename?: 'UploadFileEntityResponse'
                    data?: {
                      __typename?: 'UploadFileEntity'
                      id?: string | null
                      attributes?: {
                        __typename?: 'UploadFile'
                        url: string
                        name: string
                        ext?: string | null
                        size: number
                        createdAt?: any | null
                        updatedAt?: any | null
                      } | null
                    } | null
                  }
                } | null> | null
              } | null> | null
              institutionsNarrow?: Array<{
                __typename?: 'ComponentAccordionItemsInstitutionNarrow'
                title?: string | null
                subtitle?: string | null
                category?: string | null
                url?: string | null
                urlLabel?: string | null
              } | null> | null
            }
          | {
              __typename: 'ComponentSectionsBanner'
              content?: string | null
              contentPosition: Enum_Componentsectionsbanner_Contentposition
              bannerTitle: string
              bannerVariant: Enum_Componentsectionsbanner_Variant
              media: {
                __typename?: 'UploadFileEntityResponse'
                data?: {
                  __typename?: 'UploadFileEntity'
                  attributes?: { __typename?: 'UploadFile'; url: string } | null
                } | null
              }
              primaryLink?: {
                __typename?: 'ComponentBlocksCommonLink'
                label: string
                url?: string | null
                plausibleId?: string | null
                page?: {
                  __typename?: 'PageEntityResponse'
                  data?: {
                    __typename?: 'PageEntity'
                    id?: string | null
                    attributes?: {
                      __typename?: 'Page'
                      title?: string | null
                      slug?: string | null
                    } | null
                  } | null
                } | null
                blogPost?: {
                  __typename?: 'BlogPostEntityResponse'
                  data?: {
                    __typename?: 'BlogPostEntity'
                    id?: string | null
                    attributes?: {
                      __typename?: 'BlogPost'
                      title?: string | null
                      slug?: string | null
                    } | null
                  } | null
                } | null
              } | null
              secondaryLink?: {
                __typename?: 'ComponentBlocksCommonLink'
                label: string
                url?: string | null
                plausibleId?: string | null
                page?: {
                  __typename?: 'PageEntityResponse'
                  data?: {
                    __typename?: 'PageEntity'
                    id?: string | null
                    attributes?: {
                      __typename?: 'Page'
                      title?: string | null
                      slug?: string | null
                    } | null
                  } | null
                } | null
                blogPost?: {
                  __typename?: 'BlogPostEntityResponse'
                  data?: {
                    __typename?: 'BlogPostEntity'
                    id?: string | null
                    attributes?: {
                      __typename?: 'BlogPost'
                      title?: string | null
                      slug?: string | null
                    } | null
                  } | null
                } | null
              } | null
              tertiaryLink?: {
                __typename?: 'ComponentBlocksCommonLink'
                label: string
                url?: string | null
                plausibleId?: string | null
                page?: {
                  __typename?: 'PageEntityResponse'
                  data?: {
                    __typename?: 'PageEntity'
                    id?: string | null
                    attributes?: {
                      __typename?: 'Page'
                      title?: string | null
                      slug?: string | null
                    } | null
                  } | null
                } | null
                blogPost?: {
                  __typename?: 'BlogPostEntityResponse'
                  data?: {
                    __typename?: 'BlogPostEntity'
                    id?: string | null
                    attributes?: {
                      __typename?: 'BlogPost'
                      title?: string | null
                      slug?: string | null
                    } | null
                  } | null
                } | null
              } | null
            }
          | {
              __typename: 'ComponentSectionsBlogPostsByCategory'
              title?: string | null
              text?: string | null
              category?: {
                __typename?: 'PageCategoryEntityResponse'
                data?: {
                  __typename?: 'PageCategoryEntity'
                  id?: string | null
                  attributes?: { __typename?: 'PageCategory'; title?: string | null } | null
                } | null
              } | null
            }
          | {
              __typename: 'ComponentSectionsBlogPostsByTags'
              title?: string | null
              text?: string | null
              tags?: {
                __typename?: 'TagRelationResponseCollection'
                data: Array<{ __typename?: 'TagEntity'; id?: string | null }>
              } | null
            }
          | {
              __typename: 'ComponentSectionsBlogPostsList'
              title?: string | null
              text?: string | null
            }
          | {
              __typename: 'ComponentSectionsCalculator'
              hasBackground?: boolean | null
              single_adult_value?: number | null
              another_adult_value?: number | null
              child_value?: number | null
            }
          | {
              __typename: 'ComponentSectionsColumnedText'
              content?: string | null
              contentAlignment?: Enum_Componentsectionscolumnedtext_Contentalignment | null
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
                iconMedia?: {
                  __typename?: 'UploadFileEntityResponse'
                  data?: {
                    __typename?: 'UploadFileEntity'
                    attributes?: { __typename?: 'UploadFile'; url: string } | null
                  } | null
                } | null
              } | null>
            }
          | {
              __typename: 'ComponentSectionsContactsSection'
              id: string
              title?: string | null
              description?: string | null
              hasBackground?: boolean | null
              type: Enum_Componentsectionscontactssection_Type
              addressContacts?: Array<{
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
            }
          | {
              __typename: 'ComponentSectionsDivider'
              style?: Enum_Componentsectionsdivider_Style | null
            }
          | {
              __typename: 'ComponentSectionsFaqCategories'
              title?: string | null
              text?: string | null
              faqCategories?: {
                __typename?: 'FaqCategoryRelationResponseCollection'
                data: Array<{
                  __typename?: 'FaqCategoryEntity'
                  id?: string | null
                  attributes?: {
                    __typename?: 'FaqCategory'
                    title: string
                    slug: string
                    faqs?: {
                      __typename?: 'FaqRelationResponseCollection'
                      data: Array<{
                        __typename?: 'FaqEntity'
                        id?: string | null
                        attributes?: {
                          __typename?: 'Faq'
                          title: string
                          body?: string | null
                        } | null
                      }>
                    } | null
                  } | null
                }>
              } | null
            }
          | {
              __typename: 'ComponentSectionsFaqs'
              title?: string | null
              text?: string | null
              faqs?: {
                __typename?: 'FaqRelationResponseCollection'
                data: Array<{
                  __typename?: 'FaqEntity'
                  id?: string | null
                  attributes?: { __typename?: 'Faq'; title: string; body?: string | null } | null
                }>
              } | null
            }
          | {
              __typename: 'ComponentSectionsFileList'
              title?: string | null
              text?: string | null
              fileList?: Array<{
                __typename?: 'ComponentBlocksFile'
                title?: string | null
                media?: {
                  __typename?: 'UploadFileEntityResponse'
                  data?: {
                    __typename?: 'UploadFileEntity'
                    id?: string | null
                    attributes?: {
                      __typename?: 'UploadFile'
                      url: string
                      name: string
                      ext?: string | null
                      size: number
                      createdAt?: any | null
                      updatedAt?: any | null
                    } | null
                  } | null
                } | null
              } | null> | null
            }
          | {
              __typename: 'ComponentSectionsGallery'
              title?: string | null
              text?: string | null
              medias: {
                __typename?: 'UploadFileRelationResponseCollection'
                data: Array<{
                  __typename?: 'UploadFileEntity'
                  id?: string | null
                  attributes?: {
                    __typename?: 'UploadFile'
                    url: string
                    width?: number | null
                    height?: number | null
                    caption?: string | null
                    alternativeText?: string | null
                    name: string
                  } | null
                }>
              }
            }
          | {
              __typename: 'ComponentSectionsIconTitleDesc'
              title?: string | null
              list?: Array<{
                __typename?: 'ComponentBlocksIconWithTitleAndDescription'
                title?: string | null
                desc?: string | null
                disableIconBackground?: boolean | null
                icon?: {
                  __typename?: 'UploadFileEntityResponse'
                  data?: {
                    __typename?: 'UploadFileEntity'
                    id?: string | null
                    attributes?: { __typename?: 'UploadFile'; url: string } | null
                  } | null
                } | null
              } | null> | null
            }
          | {
              __typename: 'ComponentSectionsIframe'
              url: string
              iframeWidth: Enum_Componentsectionsiframe_Iframewidth
              iframeHeight: string
              fullHeight: boolean
              allowFullscreen: boolean
              css?: string | null
              allowGeolocation?: boolean | null
            }
          | {
              __typename: 'ComponentSectionsInbaArticlesList'
              title?: string | null
              text?: string | null
              featuredArticles?: {
                __typename?: 'InbaArticleRelationResponseCollection'
                data: Array<{
                  __typename?: 'InbaArticleEntity'
                  id?: string | null
                  attributes?: {
                    __typename?: 'InbaArticle'
                    title: string
                    slug: string
                    perex?: string | null
                    publishedAt?: any | null
                    content?: string | null
                    coverImage?: {
                      __typename?: 'UploadFileEntityResponse'
                      data?: {
                        __typename?: 'UploadFileEntity'
                        attributes?: { __typename?: 'UploadFile'; url: string } | null
                      } | null
                    } | null
                    inbaTag?: {
                      __typename?: 'InbaTagEntityResponse'
                      data?: {
                        __typename?: 'InbaTagEntity'
                        id?: string | null
                        attributes?: { __typename?: 'InbaTag'; title: string } | null
                      } | null
                    } | null
                    inbaRelease?: {
                      __typename?: 'InbaReleaseEntityResponse'
                      data?: {
                        __typename?: 'InbaReleaseEntity'
                        attributes?: {
                          __typename?: 'InbaRelease'
                          title: string
                          releaseDate: any
                          slug: string
                        } | null
                      } | null
                    } | null
                  } | null
                }>
              } | null
            }
          | {
              __typename: 'ComponentSectionsInbaReleases'
              title?: string | null
              text?: string | null
            }
          | {
              __typename: 'ComponentSectionsLinks'
              title?: string | null
              pageLinks?: Array<{
                __typename?: 'ComponentBlocksPageLink'
                title?: string | null
                url?: string | null
                anchor?: string | null
                page?: {
                  __typename?: 'PageEntityResponse'
                  data?: {
                    __typename?: 'PageEntity'
                    attributes?: {
                      __typename?: 'Page'
                      title?: string | null
                      slug?: string | null
                      locale?: string | null
                    } | null
                  } | null
                } | null
              } | null> | null
            }
          | {
              __typename: 'ComponentSectionsNarrowText'
              content?: string | null
              width?: Enum_Componentsectionsnarrowtext_Width | null
              align?: Enum_Componentsectionsnarrowtext_Align | null
            }
          | {
              __typename: 'ComponentSectionsNumericalList'
              id: string
              title?: string | null
              variant?: Enum_Componentsectionsnumericallist_Variant | null
              buttonText?: string | null
              buttonLink?: string | null
              items?: Array<{
                __typename?: 'ComponentBlocksNumericalListItem'
                text?: string | null
              } | null> | null
            }
          | { __typename: 'ComponentSectionsOfficialBoard' }
          | { __typename: 'ComponentSectionsOrganizationalStructure'; title?: string | null }
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
              regulations?: {
                __typename?: 'RegulationRelationResponseCollection'
                data: Array<{
                  __typename?: 'RegulationEntity'
                  id?: string | null
                  attributes?: {
                    __typename?: 'Regulation'
                    regNumber: string
                    slug: string
                    titleText?: string | null
                    fullTitle: string
                    effectiveFrom: any
                    category: Enum_Regulation_Category
                    isFullTextRegulation: boolean
                    mainDocument: {
                      __typename?: 'UploadFileEntityResponse'
                      data?: {
                        __typename?: 'UploadFileEntity'
                        id?: string | null
                        attributes?: {
                          __typename?: 'UploadFile'
                          url: string
                          name: string
                          ext?: string | null
                          size: number
                          createdAt?: any | null
                          updatedAt?: any | null
                        } | null
                      } | null
                    }
                    attachments?: {
                      __typename?: 'UploadFileRelationResponseCollection'
                      data: Array<{
                        __typename?: 'UploadFileEntity'
                        id?: string | null
                        attributes?: {
                          __typename?: 'UploadFile'
                          url: string
                          name: string
                          ext?: string | null
                          size: number
                          createdAt?: any | null
                          updatedAt?: any | null
                        } | null
                      }>
                    } | null
                    amendments?: {
                      __typename?: 'RegulationRelationResponseCollection'
                      data: Array<{
                        __typename?: 'RegulationEntity'
                        id?: string | null
                        attributes?: {
                          __typename?: 'Regulation'
                          regNumber: string
                          slug: string
                          effectiveFrom: any
                          isFullTextRegulation: boolean
                          attachments?: {
                            __typename?: 'UploadFileRelationResponseCollection'
                            data: Array<{
                              __typename?: 'UploadFileEntity'
                              id?: string | null
                              attributes?: {
                                __typename?: 'UploadFile'
                                url: string
                                name: string
                                ext?: string | null
                                size: number
                                createdAt?: any | null
                                updatedAt?: any | null
                              } | null
                            }>
                          } | null
                        } | null
                      }>
                    } | null
                    amending?: {
                      __typename?: 'RegulationRelationResponseCollection'
                      data: Array<{
                        __typename?: 'RegulationEntity'
                        id?: string | null
                        attributes?: {
                          __typename?: 'Regulation'
                          regNumber: string
                          slug: string
                          effectiveFrom: any
                          cancellation?: {
                            __typename?: 'RegulationEntityResponse'
                            data?: {
                              __typename?: 'RegulationEntity'
                              id?: string | null
                              attributes?: {
                                __typename?: 'Regulation'
                                regNumber: string
                                slug: string
                                effectiveFrom: any
                              } | null
                            } | null
                          } | null
                          amending?: {
                            __typename?: 'RegulationRelationResponseCollection'
                            data: Array<{
                              __typename?: 'RegulationEntity'
                              id?: string | null
                              attributes?: {
                                __typename?: 'Regulation'
                                regNumber: string
                                slug: string
                                cancellation?: {
                                  __typename?: 'RegulationEntityResponse'
                                  data?: {
                                    __typename?: 'RegulationEntity'
                                    id?: string | null
                                    attributes?: {
                                      __typename?: 'Regulation'
                                      regNumber: string
                                      slug: string
                                      effectiveFrom: any
                                    } | null
                                  } | null
                                } | null
                              } | null
                            }>
                          } | null
                        } | null
                      }>
                    } | null
                    cancellation?: {
                      __typename?: 'RegulationEntityResponse'
                      data?: {
                        __typename?: 'RegulationEntity'
                        id?: string | null
                        attributes?: {
                          __typename?: 'Regulation'
                          regNumber: string
                          slug: string
                          effectiveFrom: any
                        } | null
                      } | null
                    } | null
                    cancelling?: {
                      __typename?: 'RegulationRelationResponseCollection'
                      data: Array<{
                        __typename?: 'RegulationEntity'
                        id?: string | null
                        attributes?: {
                          __typename?: 'Regulation'
                          regNumber: string
                          slug: string
                          effectiveFrom: any
                        } | null
                      }>
                    } | null
                  } | null
                }>
              } | null
            }
          | {
              __typename: 'ComponentSectionsRegulationsList'
              title?: string | null
              text?: string | null
            }
          | {
              __typename: 'ComponentSectionsTestimonials'
              title?: string | null
              text?: string | null
              hasBackground?: boolean | null
              testimonials: Array<{
                __typename?: 'ComponentBlocksTestimonialItem'
                id: string
                name: string
                quote: string
              } | null>
            }
          | {
              __typename: 'ComponentSectionsTextWithImage'
              content?: string | null
              imagePosition?: Enum_Componentsectionstextwithimage_Imageposition | null
              imageShadow?: boolean | null
              imageSrc?: {
                __typename?: 'UploadFileEntityResponse'
                data?: {
                  __typename?: 'UploadFileEntity'
                  attributes?: {
                    __typename?: 'UploadFile'
                    url: string
                    alternativeText?: string | null
                    width?: number | null
                    height?: number | null
                  } | null
                } | null
              } | null
            }
          | {
              __typename: 'ComponentSectionsTimeline'
              timelineItems?: Array<{
                __typename?: 'ComponentBlocksTimelineItem'
                id: string
                title?: string | null
                content?: string | null
              } | null> | null
            }
          | {
              __typename: 'ComponentSectionsVideos'
              id: string
              title?: string | null
              subtitle?: string | null
              videos?: Array<{
                __typename?: 'ComponentBlocksVideo'
                id: string
                title?: string | null
                speaker?: string | null
                url?: string | null
              } | null> | null
            }
          | {
              __typename: 'ComponentSectionsWaves'
              position?: Enum_Componentsectionswaves_Position | null
            }
          | { __typename: 'Error' }
          | null
        > | null
        localizations?: {
          __typename?: 'PageRelationResponseCollection'
          data: Array<{
            __typename?: 'PageEntity'
            attributes?: {
              __typename?: 'Page'
              slug?: string | null
              locale?: string | null
            } | null
          }>
        } | null
        pageHeaderSections?: Array<
          | {
              __typename: 'ComponentSectionsSubpageList'
              id: string
              subpageList?: Array<{
                __typename?: 'ComponentBlocksPageLink'
                title?: string | null
                url?: string | null
                anchor?: string | null
                page?: {
                  __typename?: 'PageEntityResponse'
                  data?: {
                    __typename?: 'PageEntity'
                    attributes?: {
                      __typename?: 'Page'
                      title?: string | null
                      slug?: string | null
                      locale?: string | null
                    } | null
                  } | null
                } | null
              } | null> | null
            }
          | { __typename: 'Error' }
          | null
        > | null
        pageCategory?: {
          __typename?: 'PageCategoryEntityResponse'
          data?: {
            __typename?: 'PageCategoryEntity'
            id?: string | null
            attributes?: {
              __typename?: 'PageCategory'
              title?: string | null
              color?: Enum_Pagecategory_Color | null
            } | null
          } | null
        } | null
        relatedContents?: {
          __typename?: 'TagRelationResponseCollection'
          data: Array<{
            __typename?: 'TagEntity'
            id?: string | null
            attributes?: {
              __typename?: 'Tag'
              title?: string | null
              pageCategory?: {
                __typename?: 'PageCategoryEntityResponse'
                data?: {
                  __typename?: 'PageCategoryEntity'
                  id?: string | null
                  attributes?: {
                    __typename?: 'PageCategory'
                    title?: string | null
                    color?: Enum_Pagecategory_Color | null
                  } | null
                } | null
              } | null
            } | null
          }>
        } | null
        parentPage?: {
          __typename?: 'PageEntityResponse'
          data?: {
            __typename?: 'PageEntity'
            attributes?: {
              __typename?: 'Page'
              slug?: string | null
              locale?: string | null
              title?: string | null
              parentPage?: {
                __typename?: 'PageEntityResponse'
                data?: {
                  __typename?: 'PageEntity'
                  attributes?: {
                    __typename?: 'Page'
                    slug?: string | null
                    locale?: string | null
                    title?: string | null
                    parentPage?: {
                      __typename?: 'PageEntityResponse'
                      data?: {
                        __typename?: 'PageEntity'
                        attributes?: {
                          __typename?: 'Page'
                          slug?: string | null
                          locale?: string | null
                          title?: string | null
                          parentPage?: {
                            __typename?: 'PageEntityResponse'
                            data?: {
                              __typename?: 'PageEntity'
                              attributes?: {
                                __typename?: 'Page'
                                slug?: string | null
                                locale?: string | null
                                title?: string | null
                              } | null
                            } | null
                          } | null
                        } | null
                      } | null
                    } | null
                  } | null
                } | null
              } | null
            } | null
          } | null
        } | null
      } | null
    }>
  } | null
}

export type PageParentPagesFragment = {
  __typename?: 'PageEntity'
  attributes?: {
    __typename?: 'Page'
    slug?: string | null
    locale?: string | null
    title?: string | null
    parentPage?: {
      __typename?: 'PageEntityResponse'
      data?: {
        __typename?: 'PageEntity'
        attributes?: {
          __typename?: 'Page'
          slug?: string | null
          locale?: string | null
          title?: string | null
          parentPage?: {
            __typename?: 'PageEntityResponse'
            data?: {
              __typename?: 'PageEntity'
              attributes?: {
                __typename?: 'Page'
                slug?: string | null
                locale?: string | null
                title?: string | null
                parentPage?: {
                  __typename?: 'PageEntityResponse'
                  data?: {
                    __typename?: 'PageEntity'
                    attributes?: {
                      __typename?: 'Page'
                      slug?: string | null
                      locale?: string | null
                      title?: string | null
                      parentPage?: {
                        __typename?: 'PageEntityResponse'
                        data?: {
                          __typename?: 'PageEntity'
                          attributes?: {
                            __typename?: 'Page'
                            slug?: string | null
                            locale?: string | null
                            title?: string | null
                          } | null
                        } | null
                      } | null
                    } | null
                  } | null
                } | null
              } | null
            } | null
          } | null
        } | null
      } | null
    } | null
  } | null
}

export type PageEntityFragment = {
  __typename?: 'PageEntity'
  id?: string | null
  attributes?: {
    __typename?: 'Page'
    slug?: string | null
    title?: string | null
    subtext?: string | null
    pageColor?: Enum_Page_Pagecolor | null
    metaDiscription?: string | null
    keywords?: string | null
    locale?: string | null
    pageBackgroundImage?: {
      __typename?: 'UploadFileEntityResponse'
      data?: {
        __typename?: 'UploadFileEntity'
        id?: string | null
        attributes?: { __typename?: 'UploadFile'; url: string } | null
      } | null
    } | null
    headerLinks?: Array<{
      __typename?: 'ComponentBlocksCommonLink'
      label: string
      url?: string | null
      plausibleId?: string | null
      page?: {
        __typename?: 'PageEntityResponse'
        data?: {
          __typename?: 'PageEntity'
          id?: string | null
          attributes?: { __typename?: 'Page'; title?: string | null; slug?: string | null } | null
        } | null
      } | null
      blogPost?: {
        __typename?: 'BlogPostEntityResponse'
        data?: {
          __typename?: 'BlogPostEntity'
          id?: string | null
          attributes?: {
            __typename?: 'BlogPost'
            title?: string | null
            slug?: string | null
          } | null
        } | null
      } | null
    } | null> | null
    sections?: Array<
      | {
          __typename: 'ComponentSectionsAccordion'
          title?: string | null
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
            width?: Enum_Componentaccordionitemsflattext_Width | null
            align?: Enum_Componentaccordionitemsflattext_Align | null
            moreLinkTitle?: string | null
            moreLinkUrl?: string | null
            moreLinkPage?: {
              __typename?: 'PageEntityResponse'
              data?: {
                __typename?: 'PageEntity'
                attributes?: {
                  __typename?: 'Page'
                  slug?: string | null
                  title?: string | null
                  locale?: string | null
                } | null
              } | null
            } | null
            fileList?: Array<{
              __typename?: 'ComponentBlocksFileItem'
              title?: string | null
              media: {
                __typename?: 'UploadFileEntityResponse'
                data?: {
                  __typename?: 'UploadFileEntity'
                  id?: string | null
                  attributes?: {
                    __typename?: 'UploadFile'
                    url: string
                    name: string
                    ext?: string | null
                    size: number
                    createdAt?: any | null
                    updatedAt?: any | null
                  } | null
                } | null
              }
            } | null> | null
          } | null> | null
          institutionsNarrow?: Array<{
            __typename?: 'ComponentAccordionItemsInstitutionNarrow'
            title?: string | null
            subtitle?: string | null
            category?: string | null
            url?: string | null
            urlLabel?: string | null
          } | null> | null
        }
      | {
          __typename: 'ComponentSectionsBanner'
          content?: string | null
          contentPosition: Enum_Componentsectionsbanner_Contentposition
          bannerTitle: string
          bannerVariant: Enum_Componentsectionsbanner_Variant
          media: {
            __typename?: 'UploadFileEntityResponse'
            data?: {
              __typename?: 'UploadFileEntity'
              attributes?: { __typename?: 'UploadFile'; url: string } | null
            } | null
          }
          primaryLink?: {
            __typename?: 'ComponentBlocksCommonLink'
            label: string
            url?: string | null
            plausibleId?: string | null
            page?: {
              __typename?: 'PageEntityResponse'
              data?: {
                __typename?: 'PageEntity'
                id?: string | null
                attributes?: {
                  __typename?: 'Page'
                  title?: string | null
                  slug?: string | null
                } | null
              } | null
            } | null
            blogPost?: {
              __typename?: 'BlogPostEntityResponse'
              data?: {
                __typename?: 'BlogPostEntity'
                id?: string | null
                attributes?: {
                  __typename?: 'BlogPost'
                  title?: string | null
                  slug?: string | null
                } | null
              } | null
            } | null
          } | null
          secondaryLink?: {
            __typename?: 'ComponentBlocksCommonLink'
            label: string
            url?: string | null
            plausibleId?: string | null
            page?: {
              __typename?: 'PageEntityResponse'
              data?: {
                __typename?: 'PageEntity'
                id?: string | null
                attributes?: {
                  __typename?: 'Page'
                  title?: string | null
                  slug?: string | null
                } | null
              } | null
            } | null
            blogPost?: {
              __typename?: 'BlogPostEntityResponse'
              data?: {
                __typename?: 'BlogPostEntity'
                id?: string | null
                attributes?: {
                  __typename?: 'BlogPost'
                  title?: string | null
                  slug?: string | null
                } | null
              } | null
            } | null
          } | null
          tertiaryLink?: {
            __typename?: 'ComponentBlocksCommonLink'
            label: string
            url?: string | null
            plausibleId?: string | null
            page?: {
              __typename?: 'PageEntityResponse'
              data?: {
                __typename?: 'PageEntity'
                id?: string | null
                attributes?: {
                  __typename?: 'Page'
                  title?: string | null
                  slug?: string | null
                } | null
              } | null
            } | null
            blogPost?: {
              __typename?: 'BlogPostEntityResponse'
              data?: {
                __typename?: 'BlogPostEntity'
                id?: string | null
                attributes?: {
                  __typename?: 'BlogPost'
                  title?: string | null
                  slug?: string | null
                } | null
              } | null
            } | null
          } | null
        }
      | {
          __typename: 'ComponentSectionsBlogPostsByCategory'
          title?: string | null
          text?: string | null
          category?: {
            __typename?: 'PageCategoryEntityResponse'
            data?: {
              __typename?: 'PageCategoryEntity'
              id?: string | null
              attributes?: { __typename?: 'PageCategory'; title?: string | null } | null
            } | null
          } | null
        }
      | {
          __typename: 'ComponentSectionsBlogPostsByTags'
          title?: string | null
          text?: string | null
          tags?: {
            __typename?: 'TagRelationResponseCollection'
            data: Array<{ __typename?: 'TagEntity'; id?: string | null }>
          } | null
        }
      | {
          __typename: 'ComponentSectionsBlogPostsList'
          title?: string | null
          text?: string | null
        }
      | {
          __typename: 'ComponentSectionsCalculator'
          hasBackground?: boolean | null
          single_adult_value?: number | null
          another_adult_value?: number | null
          child_value?: number | null
        }
      | {
          __typename: 'ComponentSectionsColumnedText'
          content?: string | null
          contentAlignment?: Enum_Componentsectionscolumnedtext_Contentalignment | null
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
            iconMedia?: {
              __typename?: 'UploadFileEntityResponse'
              data?: {
                __typename?: 'UploadFileEntity'
                attributes?: { __typename?: 'UploadFile'; url: string } | null
              } | null
            } | null
          } | null>
        }
      | {
          __typename: 'ComponentSectionsContactsSection'
          id: string
          title?: string | null
          description?: string | null
          hasBackground?: boolean | null
          type: Enum_Componentsectionscontactssection_Type
          addressContacts?: Array<{
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
        }
      | {
          __typename: 'ComponentSectionsDivider'
          style?: Enum_Componentsectionsdivider_Style | null
        }
      | {
          __typename: 'ComponentSectionsFaqCategories'
          title?: string | null
          text?: string | null
          faqCategories?: {
            __typename?: 'FaqCategoryRelationResponseCollection'
            data: Array<{
              __typename?: 'FaqCategoryEntity'
              id?: string | null
              attributes?: {
                __typename?: 'FaqCategory'
                title: string
                slug: string
                faqs?: {
                  __typename?: 'FaqRelationResponseCollection'
                  data: Array<{
                    __typename?: 'FaqEntity'
                    id?: string | null
                    attributes?: { __typename?: 'Faq'; title: string; body?: string | null } | null
                  }>
                } | null
              } | null
            }>
          } | null
        }
      | {
          __typename: 'ComponentSectionsFaqs'
          title?: string | null
          text?: string | null
          faqs?: {
            __typename?: 'FaqRelationResponseCollection'
            data: Array<{
              __typename?: 'FaqEntity'
              id?: string | null
              attributes?: { __typename?: 'Faq'; title: string; body?: string | null } | null
            }>
          } | null
        }
      | {
          __typename: 'ComponentSectionsFileList'
          title?: string | null
          text?: string | null
          fileList?: Array<{
            __typename?: 'ComponentBlocksFile'
            title?: string | null
            media?: {
              __typename?: 'UploadFileEntityResponse'
              data?: {
                __typename?: 'UploadFileEntity'
                id?: string | null
                attributes?: {
                  __typename?: 'UploadFile'
                  url: string
                  name: string
                  ext?: string | null
                  size: number
                  createdAt?: any | null
                  updatedAt?: any | null
                } | null
              } | null
            } | null
          } | null> | null
        }
      | {
          __typename: 'ComponentSectionsGallery'
          title?: string | null
          text?: string | null
          medias: {
            __typename?: 'UploadFileRelationResponseCollection'
            data: Array<{
              __typename?: 'UploadFileEntity'
              id?: string | null
              attributes?: {
                __typename?: 'UploadFile'
                url: string
                width?: number | null
                height?: number | null
                caption?: string | null
                alternativeText?: string | null
                name: string
              } | null
            }>
          }
        }
      | {
          __typename: 'ComponentSectionsIconTitleDesc'
          title?: string | null
          list?: Array<{
            __typename?: 'ComponentBlocksIconWithTitleAndDescription'
            title?: string | null
            desc?: string | null
            disableIconBackground?: boolean | null
            icon?: {
              __typename?: 'UploadFileEntityResponse'
              data?: {
                __typename?: 'UploadFileEntity'
                id?: string | null
                attributes?: { __typename?: 'UploadFile'; url: string } | null
              } | null
            } | null
          } | null> | null
        }
      | {
          __typename: 'ComponentSectionsIframe'
          url: string
          iframeWidth: Enum_Componentsectionsiframe_Iframewidth
          iframeHeight: string
          fullHeight: boolean
          allowFullscreen: boolean
          css?: string | null
          allowGeolocation?: boolean | null
        }
      | {
          __typename: 'ComponentSectionsInbaArticlesList'
          title?: string | null
          text?: string | null
          featuredArticles?: {
            __typename?: 'InbaArticleRelationResponseCollection'
            data: Array<{
              __typename?: 'InbaArticleEntity'
              id?: string | null
              attributes?: {
                __typename?: 'InbaArticle'
                title: string
                slug: string
                perex?: string | null
                publishedAt?: any | null
                content?: string | null
                coverImage?: {
                  __typename?: 'UploadFileEntityResponse'
                  data?: {
                    __typename?: 'UploadFileEntity'
                    attributes?: { __typename?: 'UploadFile'; url: string } | null
                  } | null
                } | null
                inbaTag?: {
                  __typename?: 'InbaTagEntityResponse'
                  data?: {
                    __typename?: 'InbaTagEntity'
                    id?: string | null
                    attributes?: { __typename?: 'InbaTag'; title: string } | null
                  } | null
                } | null
                inbaRelease?: {
                  __typename?: 'InbaReleaseEntityResponse'
                  data?: {
                    __typename?: 'InbaReleaseEntity'
                    attributes?: {
                      __typename?: 'InbaRelease'
                      title: string
                      releaseDate: any
                      slug: string
                    } | null
                  } | null
                } | null
              } | null
            }>
          } | null
        }
      | { __typename: 'ComponentSectionsInbaReleases'; title?: string | null; text?: string | null }
      | {
          __typename: 'ComponentSectionsLinks'
          title?: string | null
          pageLinks?: Array<{
            __typename?: 'ComponentBlocksPageLink'
            title?: string | null
            url?: string | null
            anchor?: string | null
            page?: {
              __typename?: 'PageEntityResponse'
              data?: {
                __typename?: 'PageEntity'
                attributes?: {
                  __typename?: 'Page'
                  title?: string | null
                  slug?: string | null
                  locale?: string | null
                } | null
              } | null
            } | null
          } | null> | null
        }
      | {
          __typename: 'ComponentSectionsNarrowText'
          content?: string | null
          width?: Enum_Componentsectionsnarrowtext_Width | null
          align?: Enum_Componentsectionsnarrowtext_Align | null
        }
      | {
          __typename: 'ComponentSectionsNumericalList'
          id: string
          title?: string | null
          variant?: Enum_Componentsectionsnumericallist_Variant | null
          buttonText?: string | null
          buttonLink?: string | null
          items?: Array<{
            __typename?: 'ComponentBlocksNumericalListItem'
            text?: string | null
          } | null> | null
        }
      | { __typename: 'ComponentSectionsOfficialBoard' }
      | { __typename: 'ComponentSectionsOrganizationalStructure'; title?: string | null }
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
          regulations?: {
            __typename?: 'RegulationRelationResponseCollection'
            data: Array<{
              __typename?: 'RegulationEntity'
              id?: string | null
              attributes?: {
                __typename?: 'Regulation'
                regNumber: string
                slug: string
                titleText?: string | null
                fullTitle: string
                effectiveFrom: any
                category: Enum_Regulation_Category
                isFullTextRegulation: boolean
                mainDocument: {
                  __typename?: 'UploadFileEntityResponse'
                  data?: {
                    __typename?: 'UploadFileEntity'
                    id?: string | null
                    attributes?: {
                      __typename?: 'UploadFile'
                      url: string
                      name: string
                      ext?: string | null
                      size: number
                      createdAt?: any | null
                      updatedAt?: any | null
                    } | null
                  } | null
                }
                attachments?: {
                  __typename?: 'UploadFileRelationResponseCollection'
                  data: Array<{
                    __typename?: 'UploadFileEntity'
                    id?: string | null
                    attributes?: {
                      __typename?: 'UploadFile'
                      url: string
                      name: string
                      ext?: string | null
                      size: number
                      createdAt?: any | null
                      updatedAt?: any | null
                    } | null
                  }>
                } | null
                amendments?: {
                  __typename?: 'RegulationRelationResponseCollection'
                  data: Array<{
                    __typename?: 'RegulationEntity'
                    id?: string | null
                    attributes?: {
                      __typename?: 'Regulation'
                      regNumber: string
                      slug: string
                      effectiveFrom: any
                      isFullTextRegulation: boolean
                      attachments?: {
                        __typename?: 'UploadFileRelationResponseCollection'
                        data: Array<{
                          __typename?: 'UploadFileEntity'
                          id?: string | null
                          attributes?: {
                            __typename?: 'UploadFile'
                            url: string
                            name: string
                            ext?: string | null
                            size: number
                            createdAt?: any | null
                            updatedAt?: any | null
                          } | null
                        }>
                      } | null
                    } | null
                  }>
                } | null
                amending?: {
                  __typename?: 'RegulationRelationResponseCollection'
                  data: Array<{
                    __typename?: 'RegulationEntity'
                    id?: string | null
                    attributes?: {
                      __typename?: 'Regulation'
                      regNumber: string
                      slug: string
                      effectiveFrom: any
                      cancellation?: {
                        __typename?: 'RegulationEntityResponse'
                        data?: {
                          __typename?: 'RegulationEntity'
                          id?: string | null
                          attributes?: {
                            __typename?: 'Regulation'
                            regNumber: string
                            slug: string
                            effectiveFrom: any
                          } | null
                        } | null
                      } | null
                      amending?: {
                        __typename?: 'RegulationRelationResponseCollection'
                        data: Array<{
                          __typename?: 'RegulationEntity'
                          id?: string | null
                          attributes?: {
                            __typename?: 'Regulation'
                            regNumber: string
                            slug: string
                            cancellation?: {
                              __typename?: 'RegulationEntityResponse'
                              data?: {
                                __typename?: 'RegulationEntity'
                                id?: string | null
                                attributes?: {
                                  __typename?: 'Regulation'
                                  regNumber: string
                                  slug: string
                                  effectiveFrom: any
                                } | null
                              } | null
                            } | null
                          } | null
                        }>
                      } | null
                    } | null
                  }>
                } | null
                cancellation?: {
                  __typename?: 'RegulationEntityResponse'
                  data?: {
                    __typename?: 'RegulationEntity'
                    id?: string | null
                    attributes?: {
                      __typename?: 'Regulation'
                      regNumber: string
                      slug: string
                      effectiveFrom: any
                    } | null
                  } | null
                } | null
                cancelling?: {
                  __typename?: 'RegulationRelationResponseCollection'
                  data: Array<{
                    __typename?: 'RegulationEntity'
                    id?: string | null
                    attributes?: {
                      __typename?: 'Regulation'
                      regNumber: string
                      slug: string
                      effectiveFrom: any
                    } | null
                  }>
                } | null
              } | null
            }>
          } | null
        }
      | {
          __typename: 'ComponentSectionsRegulationsList'
          title?: string | null
          text?: string | null
        }
      | {
          __typename: 'ComponentSectionsTestimonials'
          title?: string | null
          text?: string | null
          hasBackground?: boolean | null
          testimonials: Array<{
            __typename?: 'ComponentBlocksTestimonialItem'
            id: string
            name: string
            quote: string
          } | null>
        }
      | {
          __typename: 'ComponentSectionsTextWithImage'
          content?: string | null
          imagePosition?: Enum_Componentsectionstextwithimage_Imageposition | null
          imageShadow?: boolean | null
          imageSrc?: {
            __typename?: 'UploadFileEntityResponse'
            data?: {
              __typename?: 'UploadFileEntity'
              attributes?: {
                __typename?: 'UploadFile'
                url: string
                alternativeText?: string | null
                width?: number | null
                height?: number | null
              } | null
            } | null
          } | null
        }
      | {
          __typename: 'ComponentSectionsTimeline'
          timelineItems?: Array<{
            __typename?: 'ComponentBlocksTimelineItem'
            id: string
            title?: string | null
            content?: string | null
          } | null> | null
        }
      | {
          __typename: 'ComponentSectionsVideos'
          id: string
          title?: string | null
          subtitle?: string | null
          videos?: Array<{
            __typename?: 'ComponentBlocksVideo'
            id: string
            title?: string | null
            speaker?: string | null
            url?: string | null
          } | null> | null
        }
      | {
          __typename: 'ComponentSectionsWaves'
          position?: Enum_Componentsectionswaves_Position | null
        }
      | { __typename: 'Error' }
      | null
    > | null
    localizations?: {
      __typename?: 'PageRelationResponseCollection'
      data: Array<{
        __typename?: 'PageEntity'
        attributes?: { __typename?: 'Page'; slug?: string | null; locale?: string | null } | null
      }>
    } | null
    pageHeaderSections?: Array<
      | {
          __typename: 'ComponentSectionsSubpageList'
          id: string
          subpageList?: Array<{
            __typename?: 'ComponentBlocksPageLink'
            title?: string | null
            url?: string | null
            anchor?: string | null
            page?: {
              __typename?: 'PageEntityResponse'
              data?: {
                __typename?: 'PageEntity'
                attributes?: {
                  __typename?: 'Page'
                  title?: string | null
                  slug?: string | null
                  locale?: string | null
                } | null
              } | null
            } | null
          } | null> | null
        }
      | { __typename: 'Error' }
      | null
    > | null
    pageCategory?: {
      __typename?: 'PageCategoryEntityResponse'
      data?: {
        __typename?: 'PageCategoryEntity'
        id?: string | null
        attributes?: {
          __typename?: 'PageCategory'
          title?: string | null
          color?: Enum_Pagecategory_Color | null
        } | null
      } | null
    } | null
    relatedContents?: {
      __typename?: 'TagRelationResponseCollection'
      data: Array<{
        __typename?: 'TagEntity'
        id?: string | null
        attributes?: {
          __typename?: 'Tag'
          title?: string | null
          pageCategory?: {
            __typename?: 'PageCategoryEntityResponse'
            data?: {
              __typename?: 'PageCategoryEntity'
              id?: string | null
              attributes?: {
                __typename?: 'PageCategory'
                title?: string | null
                color?: Enum_Pagecategory_Color | null
              } | null
            } | null
          } | null
        } | null
      }>
    } | null
    parentPage?: {
      __typename?: 'PageEntityResponse'
      data?: {
        __typename?: 'PageEntity'
        attributes?: {
          __typename?: 'Page'
          slug?: string | null
          locale?: string | null
          title?: string | null
          parentPage?: {
            __typename?: 'PageEntityResponse'
            data?: {
              __typename?: 'PageEntity'
              attributes?: {
                __typename?: 'Page'
                slug?: string | null
                locale?: string | null
                title?: string | null
                parentPage?: {
                  __typename?: 'PageEntityResponse'
                  data?: {
                    __typename?: 'PageEntity'
                    attributes?: {
                      __typename?: 'Page'
                      slug?: string | null
                      locale?: string | null
                      title?: string | null
                      parentPage?: {
                        __typename?: 'PageEntityResponse'
                        data?: {
                          __typename?: 'PageEntity'
                          attributes?: {
                            __typename?: 'Page'
                            slug?: string | null
                            locale?: string | null
                            title?: string | null
                          } | null
                        } | null
                      } | null
                    } | null
                  } | null
                } | null
              } | null
            } | null
          } | null
        } | null
      } | null
    } | null
  } | null
}

export type ParentPageFragment = {
  __typename?: 'Page'
  slug?: string | null
  locale?: string | null
  title?: string | null
}

export type LocalizationFragment = {
  __typename?: 'PageRelationResponseCollection'
  data: Array<{
    __typename?: 'PageEntity'
    attributes?: { __typename?: 'Page'; slug?: string | null; locale?: string | null } | null
  }>
}

export type AllRegulationsQueryVariables = Exact<{ [key: string]: never }>

export type AllRegulationsQuery = {
  __typename?: 'Query'
  regulations?: {
    __typename?: 'RegulationEntityResponseCollection'
    data: Array<{
      __typename?: 'RegulationEntity'
      id?: string | null
      attributes?: {
        __typename?: 'Regulation'
        regNumber: string
        slug: string
        titleText?: string | null
        fullTitle: string
        effectiveFrom: any
        category: Enum_Regulation_Category
        isFullTextRegulation: boolean
        mainDocument: {
          __typename?: 'UploadFileEntityResponse'
          data?: {
            __typename?: 'UploadFileEntity'
            id?: string | null
            attributes?: {
              __typename?: 'UploadFile'
              url: string
              name: string
              ext?: string | null
              size: number
              createdAt?: any | null
              updatedAt?: any | null
            } | null
          } | null
        }
        attachments?: {
          __typename?: 'UploadFileRelationResponseCollection'
          data: Array<{
            __typename?: 'UploadFileEntity'
            id?: string | null
            attributes?: {
              __typename?: 'UploadFile'
              url: string
              name: string
              ext?: string | null
              size: number
              createdAt?: any | null
              updatedAt?: any | null
            } | null
          }>
        } | null
        amendments?: {
          __typename?: 'RegulationRelationResponseCollection'
          data: Array<{
            __typename?: 'RegulationEntity'
            id?: string | null
            attributes?: {
              __typename?: 'Regulation'
              regNumber: string
              slug: string
              effectiveFrom: any
              isFullTextRegulation: boolean
              attachments?: {
                __typename?: 'UploadFileRelationResponseCollection'
                data: Array<{
                  __typename?: 'UploadFileEntity'
                  id?: string | null
                  attributes?: {
                    __typename?: 'UploadFile'
                    url: string
                    name: string
                    ext?: string | null
                    size: number
                    createdAt?: any | null
                    updatedAt?: any | null
                  } | null
                }>
              } | null
            } | null
          }>
        } | null
        amending?: {
          __typename?: 'RegulationRelationResponseCollection'
          data: Array<{
            __typename?: 'RegulationEntity'
            id?: string | null
            attributes?: {
              __typename?: 'Regulation'
              regNumber: string
              slug: string
              effectiveFrom: any
              cancellation?: {
                __typename?: 'RegulationEntityResponse'
                data?: {
                  __typename?: 'RegulationEntity'
                  id?: string | null
                  attributes?: {
                    __typename?: 'Regulation'
                    regNumber: string
                    slug: string
                    effectiveFrom: any
                  } | null
                } | null
              } | null
              amending?: {
                __typename?: 'RegulationRelationResponseCollection'
                data: Array<{
                  __typename?: 'RegulationEntity'
                  id?: string | null
                  attributes?: {
                    __typename?: 'Regulation'
                    regNumber: string
                    slug: string
                    cancellation?: {
                      __typename?: 'RegulationEntityResponse'
                      data?: {
                        __typename?: 'RegulationEntity'
                        id?: string | null
                        attributes?: {
                          __typename?: 'Regulation'
                          regNumber: string
                          slug: string
                          effectiveFrom: any
                        } | null
                      } | null
                    } | null
                  } | null
                }>
              } | null
            } | null
          }>
        } | null
        cancellation?: {
          __typename?: 'RegulationEntityResponse'
          data?: {
            __typename?: 'RegulationEntity'
            id?: string | null
            attributes?: {
              __typename?: 'Regulation'
              regNumber: string
              slug: string
              effectiveFrom: any
            } | null
          } | null
        } | null
        cancelling?: {
          __typename?: 'RegulationRelationResponseCollection'
          data: Array<{
            __typename?: 'RegulationEntity'
            id?: string | null
            attributes?: {
              __typename?: 'Regulation'
              regNumber: string
              slug: string
              effectiveFrom: any
            } | null
          }>
        } | null
      } | null
    }>
  } | null
}

export type RegulationsStaticPathsQueryVariables = Exact<{ [key: string]: never }>

export type RegulationsStaticPathsQuery = {
  __typename?: 'Query'
  regulations?: {
    __typename?: 'RegulationEntityResponseCollection'
    data: Array<{
      __typename?: 'RegulationEntity'
      id?: string | null
      attributes?: { __typename?: 'Regulation'; slug: string } | null
    }>
  } | null
}

export type RegulationByIdQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type RegulationByIdQuery = {
  __typename?: 'Query'
  regulation?: {
    __typename?: 'RegulationEntityResponse'
    data?: {
      __typename?: 'RegulationEntity'
      id?: string | null
      attributes?: {
        __typename?: 'Regulation'
        regNumber: string
        slug: string
        titleText?: string | null
        fullTitle: string
        effectiveFrom: any
        category: Enum_Regulation_Category
        isFullTextRegulation: boolean
        mainDocument: {
          __typename?: 'UploadFileEntityResponse'
          data?: {
            __typename?: 'UploadFileEntity'
            id?: string | null
            attributes?: {
              __typename?: 'UploadFile'
              url: string
              name: string
              ext?: string | null
              size: number
              createdAt?: any | null
              updatedAt?: any | null
            } | null
          } | null
        }
        attachments?: {
          __typename?: 'UploadFileRelationResponseCollection'
          data: Array<{
            __typename?: 'UploadFileEntity'
            id?: string | null
            attributes?: {
              __typename?: 'UploadFile'
              url: string
              name: string
              ext?: string | null
              size: number
              createdAt?: any | null
              updatedAt?: any | null
            } | null
          }>
        } | null
        amendments?: {
          __typename?: 'RegulationRelationResponseCollection'
          data: Array<{
            __typename?: 'RegulationEntity'
            id?: string | null
            attributes?: {
              __typename?: 'Regulation'
              regNumber: string
              slug: string
              effectiveFrom: any
              isFullTextRegulation: boolean
              attachments?: {
                __typename?: 'UploadFileRelationResponseCollection'
                data: Array<{
                  __typename?: 'UploadFileEntity'
                  id?: string | null
                  attributes?: {
                    __typename?: 'UploadFile'
                    url: string
                    name: string
                    ext?: string | null
                    size: number
                    createdAt?: any | null
                    updatedAt?: any | null
                  } | null
                }>
              } | null
            } | null
          }>
        } | null
        amending?: {
          __typename?: 'RegulationRelationResponseCollection'
          data: Array<{
            __typename?: 'RegulationEntity'
            id?: string | null
            attributes?: {
              __typename?: 'Regulation'
              regNumber: string
              slug: string
              effectiveFrom: any
              cancellation?: {
                __typename?: 'RegulationEntityResponse'
                data?: {
                  __typename?: 'RegulationEntity'
                  id?: string | null
                  attributes?: {
                    __typename?: 'Regulation'
                    regNumber: string
                    slug: string
                    effectiveFrom: any
                  } | null
                } | null
              } | null
              amending?: {
                __typename?: 'RegulationRelationResponseCollection'
                data: Array<{
                  __typename?: 'RegulationEntity'
                  id?: string | null
                  attributes?: {
                    __typename?: 'Regulation'
                    regNumber: string
                    slug: string
                    cancellation?: {
                      __typename?: 'RegulationEntityResponse'
                      data?: {
                        __typename?: 'RegulationEntity'
                        id?: string | null
                        attributes?: {
                          __typename?: 'Regulation'
                          regNumber: string
                          slug: string
                          effectiveFrom: any
                        } | null
                      } | null
                    } | null
                  } | null
                }>
              } | null
            } | null
          }>
        } | null
        cancellation?: {
          __typename?: 'RegulationEntityResponse'
          data?: {
            __typename?: 'RegulationEntity'
            id?: string | null
            attributes?: {
              __typename?: 'Regulation'
              regNumber: string
              slug: string
              effectiveFrom: any
            } | null
          } | null
        } | null
        cancelling?: {
          __typename?: 'RegulationRelationResponseCollection'
          data: Array<{
            __typename?: 'RegulationEntity'
            id?: string | null
            attributes?: {
              __typename?: 'Regulation'
              regNumber: string
              slug: string
              effectiveFrom: any
            } | null
          }>
        } | null
      } | null
    } | null
  } | null
}

export type RegulationBySlugQueryVariables = Exact<{
  slug?: InputMaybe<Scalars['String']['input']>
}>

export type RegulationBySlugQuery = {
  __typename?: 'Query'
  regulations?: {
    __typename?: 'RegulationEntityResponseCollection'
    data: Array<{
      __typename?: 'RegulationEntity'
      id?: string | null
      attributes?: {
        __typename?: 'Regulation'
        regNumber: string
        slug: string
        titleText?: string | null
        fullTitle: string
        effectiveFrom: any
        category: Enum_Regulation_Category
        isFullTextRegulation: boolean
        mainDocument: {
          __typename?: 'UploadFileEntityResponse'
          data?: {
            __typename?: 'UploadFileEntity'
            id?: string | null
            attributes?: {
              __typename?: 'UploadFile'
              url: string
              name: string
              ext?: string | null
              size: number
              createdAt?: any | null
              updatedAt?: any | null
            } | null
          } | null
        }
        attachments?: {
          __typename?: 'UploadFileRelationResponseCollection'
          data: Array<{
            __typename?: 'UploadFileEntity'
            id?: string | null
            attributes?: {
              __typename?: 'UploadFile'
              url: string
              name: string
              ext?: string | null
              size: number
              createdAt?: any | null
              updatedAt?: any | null
            } | null
          }>
        } | null
        amendments?: {
          __typename?: 'RegulationRelationResponseCollection'
          data: Array<{
            __typename?: 'RegulationEntity'
            id?: string | null
            attributes?: {
              __typename?: 'Regulation'
              regNumber: string
              slug: string
              effectiveFrom: any
              isFullTextRegulation: boolean
              attachments?: {
                __typename?: 'UploadFileRelationResponseCollection'
                data: Array<{
                  __typename?: 'UploadFileEntity'
                  id?: string | null
                  attributes?: {
                    __typename?: 'UploadFile'
                    url: string
                    name: string
                    ext?: string | null
                    size: number
                    createdAt?: any | null
                    updatedAt?: any | null
                  } | null
                }>
              } | null
            } | null
          }>
        } | null
        amending?: {
          __typename?: 'RegulationRelationResponseCollection'
          data: Array<{
            __typename?: 'RegulationEntity'
            id?: string | null
            attributes?: {
              __typename?: 'Regulation'
              regNumber: string
              slug: string
              effectiveFrom: any
              cancellation?: {
                __typename?: 'RegulationEntityResponse'
                data?: {
                  __typename?: 'RegulationEntity'
                  id?: string | null
                  attributes?: {
                    __typename?: 'Regulation'
                    regNumber: string
                    slug: string
                    effectiveFrom: any
                  } | null
                } | null
              } | null
              amending?: {
                __typename?: 'RegulationRelationResponseCollection'
                data: Array<{
                  __typename?: 'RegulationEntity'
                  id?: string | null
                  attributes?: {
                    __typename?: 'Regulation'
                    regNumber: string
                    slug: string
                    cancellation?: {
                      __typename?: 'RegulationEntityResponse'
                      data?: {
                        __typename?: 'RegulationEntity'
                        id?: string | null
                        attributes?: {
                          __typename?: 'Regulation'
                          regNumber: string
                          slug: string
                          effectiveFrom: any
                        } | null
                      } | null
                    } | null
                  } | null
                }>
              } | null
            } | null
          }>
        } | null
        cancellation?: {
          __typename?: 'RegulationEntityResponse'
          data?: {
            __typename?: 'RegulationEntity'
            id?: string | null
            attributes?: {
              __typename?: 'Regulation'
              regNumber: string
              slug: string
              effectiveFrom: any
            } | null
          } | null
        } | null
        cancelling?: {
          __typename?: 'RegulationRelationResponseCollection'
          data: Array<{
            __typename?: 'RegulationEntity'
            id?: string | null
            attributes?: {
              __typename?: 'Regulation'
              regNumber: string
              slug: string
              effectiveFrom: any
            } | null
          }>
        } | null
      } | null
    }>
  } | null
}

export type RegulationByYearQueryVariables = Exact<{
  year?: InputMaybe<Scalars['String']['input']>
}>

export type RegulationByYearQuery = {
  __typename?: 'Query'
  regulations?: {
    __typename?: 'RegulationEntityResponseCollection'
    data: Array<{
      __typename?: 'RegulationEntity'
      id?: string | null
      attributes?: {
        __typename?: 'Regulation'
        regNumber: string
        slug: string
        titleText?: string | null
        fullTitle: string
        effectiveFrom: any
        category: Enum_Regulation_Category
        isFullTextRegulation: boolean
        mainDocument: {
          __typename?: 'UploadFileEntityResponse'
          data?: {
            __typename?: 'UploadFileEntity'
            id?: string | null
            attributes?: {
              __typename?: 'UploadFile'
              url: string
              name: string
              ext?: string | null
              size: number
              createdAt?: any | null
              updatedAt?: any | null
            } | null
          } | null
        }
        attachments?: {
          __typename?: 'UploadFileRelationResponseCollection'
          data: Array<{
            __typename?: 'UploadFileEntity'
            id?: string | null
            attributes?: {
              __typename?: 'UploadFile'
              url: string
              name: string
              ext?: string | null
              size: number
              createdAt?: any | null
              updatedAt?: any | null
            } | null
          }>
        } | null
        amendments?: {
          __typename?: 'RegulationRelationResponseCollection'
          data: Array<{
            __typename?: 'RegulationEntity'
            id?: string | null
            attributes?: {
              __typename?: 'Regulation'
              regNumber: string
              slug: string
              effectiveFrom: any
              isFullTextRegulation: boolean
              attachments?: {
                __typename?: 'UploadFileRelationResponseCollection'
                data: Array<{
                  __typename?: 'UploadFileEntity'
                  id?: string | null
                  attributes?: {
                    __typename?: 'UploadFile'
                    url: string
                    name: string
                    ext?: string | null
                    size: number
                    createdAt?: any | null
                    updatedAt?: any | null
                  } | null
                }>
              } | null
            } | null
          }>
        } | null
        amending?: {
          __typename?: 'RegulationRelationResponseCollection'
          data: Array<{
            __typename?: 'RegulationEntity'
            id?: string | null
            attributes?: {
              __typename?: 'Regulation'
              regNumber: string
              slug: string
              effectiveFrom: any
              cancellation?: {
                __typename?: 'RegulationEntityResponse'
                data?: {
                  __typename?: 'RegulationEntity'
                  id?: string | null
                  attributes?: {
                    __typename?: 'Regulation'
                    regNumber: string
                    slug: string
                    effectiveFrom: any
                  } | null
                } | null
              } | null
              amending?: {
                __typename?: 'RegulationRelationResponseCollection'
                data: Array<{
                  __typename?: 'RegulationEntity'
                  id?: string | null
                  attributes?: {
                    __typename?: 'Regulation'
                    regNumber: string
                    slug: string
                    cancellation?: {
                      __typename?: 'RegulationEntityResponse'
                      data?: {
                        __typename?: 'RegulationEntity'
                        id?: string | null
                        attributes?: {
                          __typename?: 'Regulation'
                          regNumber: string
                          slug: string
                          effectiveFrom: any
                        } | null
                      } | null
                    } | null
                  } | null
                }>
              } | null
            } | null
          }>
        } | null
        cancellation?: {
          __typename?: 'RegulationEntityResponse'
          data?: {
            __typename?: 'RegulationEntity'
            id?: string | null
            attributes?: {
              __typename?: 'Regulation'
              regNumber: string
              slug: string
              effectiveFrom: any
            } | null
          } | null
        } | null
        cancelling?: {
          __typename?: 'RegulationRelationResponseCollection'
          data: Array<{
            __typename?: 'RegulationEntity'
            id?: string | null
            attributes?: {
              __typename?: 'Regulation'
              regNumber: string
              slug: string
              effectiveFrom: any
            } | null
          }>
        } | null
      } | null
    }>
  } | null
}

export type SetFullTitleToRegulationMutationVariables = Exact<{
  regulationId: Scalars['ID']['input']
  fullTitle?: InputMaybe<Scalars['String']['input']>
}>

export type SetFullTitleToRegulationMutation = {
  __typename?: 'Mutation'
  updateRegulation?: {
    __typename?: 'RegulationEntityResponse'
    data?: { __typename?: 'RegulationEntity'; id?: string | null } | null
  } | null
}

export type SetCancellationToRegulationMutationVariables = Exact<{
  regulationId: Scalars['ID']['input']
  cancellationId: Scalars['ID']['input']
}>

export type SetCancellationToRegulationMutation = {
  __typename?: 'Mutation'
  updateRegulation?: {
    __typename?: 'RegulationEntityResponse'
    data?: { __typename?: 'RegulationEntity'; id?: string | null } | null
  } | null
}

export type SetAmendmentsToRegulationMutationVariables = Exact<{
  regulationId: Scalars['ID']['input']
  amendmentsIds?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>
}>

export type SetAmendmentsToRegulationMutation = {
  __typename?: 'Mutation'
  updateRegulation?: {
    __typename?: 'RegulationEntityResponse'
    data?: { __typename?: 'RegulationEntity'; id?: string | null } | null
  } | null
}

export type DeleteRegulationByIdMutationVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type DeleteRegulationByIdMutation = {
  __typename?: 'Mutation'
  deleteRegulation?: {
    __typename?: 'RegulationEntityResponse'
    data?: { __typename?: 'RegulationEntity'; id?: string | null } | null
  } | null
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
  createRegulation?: {
    __typename?: 'RegulationEntityResponse'
    data?: {
      __typename?: 'RegulationEntity'
      id?: string | null
      attributes?: { __typename?: 'Regulation'; regNumber: string } | null
    } | null
  } | null
}

export type RegulationEntityFragment = {
  __typename?: 'RegulationEntity'
  id?: string | null
  attributes?: {
    __typename?: 'Regulation'
    regNumber: string
    slug: string
    titleText?: string | null
    fullTitle: string
    effectiveFrom: any
    category: Enum_Regulation_Category
    isFullTextRegulation: boolean
    mainDocument: {
      __typename?: 'UploadFileEntityResponse'
      data?: {
        __typename?: 'UploadFileEntity'
        id?: string | null
        attributes?: {
          __typename?: 'UploadFile'
          url: string
          name: string
          ext?: string | null
          size: number
          createdAt?: any | null
          updatedAt?: any | null
        } | null
      } | null
    }
    attachments?: {
      __typename?: 'UploadFileRelationResponseCollection'
      data: Array<{
        __typename?: 'UploadFileEntity'
        id?: string | null
        attributes?: {
          __typename?: 'UploadFile'
          url: string
          name: string
          ext?: string | null
          size: number
          createdAt?: any | null
          updatedAt?: any | null
        } | null
      }>
    } | null
    amendments?: {
      __typename?: 'RegulationRelationResponseCollection'
      data: Array<{
        __typename?: 'RegulationEntity'
        id?: string | null
        attributes?: {
          __typename?: 'Regulation'
          regNumber: string
          slug: string
          effectiveFrom: any
          isFullTextRegulation: boolean
          attachments?: {
            __typename?: 'UploadFileRelationResponseCollection'
            data: Array<{
              __typename?: 'UploadFileEntity'
              id?: string | null
              attributes?: {
                __typename?: 'UploadFile'
                url: string
                name: string
                ext?: string | null
                size: number
                createdAt?: any | null
                updatedAt?: any | null
              } | null
            }>
          } | null
        } | null
      }>
    } | null
    amending?: {
      __typename?: 'RegulationRelationResponseCollection'
      data: Array<{
        __typename?: 'RegulationEntity'
        id?: string | null
        attributes?: {
          __typename?: 'Regulation'
          regNumber: string
          slug: string
          effectiveFrom: any
          cancellation?: {
            __typename?: 'RegulationEntityResponse'
            data?: {
              __typename?: 'RegulationEntity'
              id?: string | null
              attributes?: {
                __typename?: 'Regulation'
                regNumber: string
                slug: string
                effectiveFrom: any
              } | null
            } | null
          } | null
          amending?: {
            __typename?: 'RegulationRelationResponseCollection'
            data: Array<{
              __typename?: 'RegulationEntity'
              id?: string | null
              attributes?: {
                __typename?: 'Regulation'
                regNumber: string
                slug: string
                cancellation?: {
                  __typename?: 'RegulationEntityResponse'
                  data?: {
                    __typename?: 'RegulationEntity'
                    id?: string | null
                    attributes?: {
                      __typename?: 'Regulation'
                      regNumber: string
                      slug: string
                      effectiveFrom: any
                    } | null
                  } | null
                } | null
              } | null
            }>
          } | null
        } | null
      }>
    } | null
    cancellation?: {
      __typename?: 'RegulationEntityResponse'
      data?: {
        __typename?: 'RegulationEntity'
        id?: string | null
        attributes?: {
          __typename?: 'Regulation'
          regNumber: string
          slug: string
          effectiveFrom: any
        } | null
      } | null
    } | null
    cancelling?: {
      __typename?: 'RegulationRelationResponseCollection'
      data: Array<{
        __typename?: 'RegulationEntity'
        id?: string | null
        attributes?: {
          __typename?: 'Regulation'
          regNumber: string
          slug: string
          effectiveFrom: any
        } | null
      }>
    } | null
  } | null
}

export type IconTitleDescriptionBlockFragment = {
  __typename?: 'ComponentBlocksIconWithTitleAndDescription'
  title?: string | null
  desc?: string | null
  disableIconBackground?: boolean | null
  icon?: {
    __typename?: 'UploadFileEntityResponse'
    data?: {
      __typename?: 'UploadFileEntity'
      id?: string | null
      attributes?: { __typename?: 'UploadFile'; url: string } | null
    } | null
  } | null
}

export type TestimonialItemBlockFragment = {
  __typename?: 'ComponentBlocksTestimonialItem'
  id: string
  name: string
  quote: string
}

export type TestimonialsSectionFragment = {
  __typename?: 'ComponentSectionsTestimonials'
  title?: string | null
  text?: string | null
  hasBackground?: boolean | null
  testimonials: Array<{
    __typename?: 'ComponentBlocksTestimonialItem'
    id: string
    name: string
    quote: string
  } | null>
}

export type TimelineItemBlockFragment = {
  __typename?: 'ComponentBlocksTimelineItem'
  id: string
  title?: string | null
  content?: string | null
}

export type GallerySectionFragment = {
  __typename?: 'ComponentSectionsGallery'
  title?: string | null
  text?: string | null
  medias: {
    __typename?: 'UploadFileRelationResponseCollection'
    data: Array<{
      __typename?: 'UploadFileEntity'
      id?: string | null
      attributes?: {
        __typename?: 'UploadFile'
        url: string
        width?: number | null
        height?: number | null
        caption?: string | null
        alternativeText?: string | null
        name: string
      } | null
    }>
  }
}

export type TimelineSectionFragment = {
  __typename?: 'ComponentSectionsTimeline'
  timelineItems?: Array<{
    __typename?: 'ComponentBlocksTimelineItem'
    id: string
    title?: string | null
    content?: string | null
  } | null> | null
}

export type BlogPostsListSectionFragment = {
  __typename?: 'ComponentSectionsBlogPostsList'
  title?: string | null
  text?: string | null
}

export type BlogPostsByTagsSectionFragment = {
  __typename?: 'ComponentSectionsBlogPostsByTags'
  title?: string | null
  text?: string | null
  tags?: {
    __typename?: 'TagRelationResponseCollection'
    data: Array<{ __typename?: 'TagEntity'; id?: string | null }>
  } | null
}

export type BlogPostsByCategorySectionFragment = {
  __typename?: 'ComponentSectionsBlogPostsByCategory'
  title?: string | null
  text?: string | null
  category?: {
    __typename?: 'PageCategoryEntityResponse'
    data?: {
      __typename?: 'PageCategoryEntity'
      id?: string | null
      attributes?: { __typename?: 'PageCategory'; title?: string | null } | null
    } | null
  } | null
}

export type InbaArticlesListSectionFragment = {
  __typename?: 'ComponentSectionsInbaArticlesList'
  title?: string | null
  text?: string | null
  featuredArticles?: {
    __typename?: 'InbaArticleRelationResponseCollection'
    data: Array<{
      __typename?: 'InbaArticleEntity'
      id?: string | null
      attributes?: {
        __typename?: 'InbaArticle'
        title: string
        slug: string
        perex?: string | null
        publishedAt?: any | null
        content?: string | null
        coverImage?: {
          __typename?: 'UploadFileEntityResponse'
          data?: {
            __typename?: 'UploadFileEntity'
            attributes?: { __typename?: 'UploadFile'; url: string } | null
          } | null
        } | null
        inbaTag?: {
          __typename?: 'InbaTagEntityResponse'
          data?: {
            __typename?: 'InbaTagEntity'
            id?: string | null
            attributes?: { __typename?: 'InbaTag'; title: string } | null
          } | null
        } | null
        inbaRelease?: {
          __typename?: 'InbaReleaseEntityResponse'
          data?: {
            __typename?: 'InbaReleaseEntity'
            attributes?: {
              __typename?: 'InbaRelease'
              title: string
              releaseDate: any
              slug: string
            } | null
          } | null
        } | null
      } | null
    }>
  } | null
}

export type InbaReleasesSectionFragment = {
  __typename?: 'ComponentSectionsInbaReleases'
  title?: string | null
  text?: string | null
}

export type IconTitleDescSectionFragment = {
  __typename?: 'ComponentSectionsIconTitleDesc'
  title?: string | null
  list?: Array<{
    __typename?: 'ComponentBlocksIconWithTitleAndDescription'
    title?: string | null
    desc?: string | null
    disableIconBackground?: boolean | null
    icon?: {
      __typename?: 'UploadFileEntityResponse'
      data?: {
        __typename?: 'UploadFileEntity'
        id?: string | null
        attributes?: { __typename?: 'UploadFile'; url: string } | null
      } | null
    } | null
  } | null> | null
}

export type DividerSectionFragment = {
  __typename?: 'ComponentSectionsDivider'
  style?: Enum_Componentsectionsdivider_Style | null
}

export type TextWithImageSectionFragment = {
  __typename?: 'ComponentSectionsTextWithImage'
  content?: string | null
  imagePosition?: Enum_Componentsectionstextwithimage_Imageposition | null
  imageShadow?: boolean | null
  imageSrc?: {
    __typename?: 'UploadFileEntityResponse'
    data?: {
      __typename?: 'UploadFileEntity'
      attributes?: {
        __typename?: 'UploadFile'
        url: string
        alternativeText?: string | null
        width?: number | null
        height?: number | null
      } | null
    } | null
  } | null
}

export type IframeSectionFragment = {
  __typename?: 'ComponentSectionsIframe'
  url: string
  iframeWidth: Enum_Componentsectionsiframe_Iframewidth
  iframeHeight: string
  fullHeight: boolean
  allowFullscreen: boolean
  css?: string | null
  allowGeolocation?: boolean | null
}

export type FileBlockFragment = {
  __typename?: 'ComponentBlocksFile'
  title?: string | null
  media?: {
    __typename?: 'UploadFileEntityResponse'
    data?: {
      __typename?: 'UploadFileEntity'
      id?: string | null
      attributes?: {
        __typename?: 'UploadFile'
        url: string
        name: string
        ext?: string | null
        size: number
        createdAt?: any | null
        updatedAt?: any | null
      } | null
    } | null
  } | null
}

export type FileListSectionFragment = {
  __typename?: 'ComponentSectionsFileList'
  title?: string | null
  text?: string | null
  fileList?: Array<{
    __typename?: 'ComponentBlocksFile'
    title?: string | null
    media?: {
      __typename?: 'UploadFileEntityResponse'
      data?: {
        __typename?: 'UploadFileEntity'
        id?: string | null
        attributes?: {
          __typename?: 'UploadFile'
          url: string
          name: string
          ext?: string | null
          size: number
          createdAt?: any | null
          updatedAt?: any | null
        } | null
      } | null
    } | null
  } | null> | null
}

export type FileItemBlockFragment = {
  __typename?: 'ComponentBlocksFileItem'
  title?: string | null
  media: {
    __typename?: 'UploadFileEntityResponse'
    data?: {
      __typename?: 'UploadFileEntity'
      id?: string | null
      attributes?: {
        __typename?: 'UploadFile'
        url: string
        name: string
        ext?: string | null
        size: number
        createdAt?: any | null
        updatedAt?: any | null
      } | null
    } | null
  }
}

export type ColumnedTextSectionFragment = {
  __typename?: 'ComponentSectionsColumnedText'
  content?: string | null
  contentAlignment?: Enum_Componentsectionscolumnedtext_Contentalignment | null
}

export type NarrowTextSectionFragment = {
  __typename?: 'ComponentSectionsNarrowText'
  content?: string | null
  width?: Enum_Componentsectionsnarrowtext_Width | null
  align?: Enum_Componentsectionsnarrowtext_Align | null
}

export type WavesSectionFragment = {
  __typename?: 'ComponentSectionsWaves'
  position?: Enum_Componentsectionswaves_Position | null
}

export type PageLinkBlockFragment = {
  __typename?: 'ComponentBlocksPageLink'
  title?: string | null
  url?: string | null
  anchor?: string | null
  page?: {
    __typename?: 'PageEntityResponse'
    data?: {
      __typename?: 'PageEntity'
      attributes?: {
        __typename?: 'Page'
        title?: string | null
        slug?: string | null
        locale?: string | null
      } | null
    } | null
  } | null
}

export type LinksSectionFragment = {
  __typename?: 'ComponentSectionsLinks'
  title?: string | null
  pageLinks?: Array<{
    __typename?: 'ComponentBlocksPageLink'
    title?: string | null
    url?: string | null
    anchor?: string | null
    page?: {
      __typename?: 'PageEntityResponse'
      data?: {
        __typename?: 'PageEntity'
        attributes?: {
          __typename?: 'Page'
          title?: string | null
          slug?: string | null
          locale?: string | null
        } | null
      } | null
    } | null
  } | null> | null
}

export type ComponentAccordionItemsInstitutionNarrowFragment = {
  __typename?: 'ComponentAccordionItemsInstitutionNarrow'
  title?: string | null
  subtitle?: string | null
  category?: string | null
  url?: string | null
  urlLabel?: string | null
}

export type ComponentAccordionItemsFlatTextFragment = {
  __typename?: 'ComponentAccordionItemsFlatText'
  category?: string | null
  content?: string | null
  width?: Enum_Componentaccordionitemsflattext_Width | null
  align?: Enum_Componentaccordionitemsflattext_Align | null
  moreLinkTitle?: string | null
  moreLinkUrl?: string | null
  moreLinkPage?: {
    __typename?: 'PageEntityResponse'
    data?: {
      __typename?: 'PageEntity'
      attributes?: {
        __typename?: 'Page'
        slug?: string | null
        title?: string | null
        locale?: string | null
      } | null
    } | null
  } | null
  fileList?: Array<{
    __typename?: 'ComponentBlocksFileItem'
    title?: string | null
    media: {
      __typename?: 'UploadFileEntityResponse'
      data?: {
        __typename?: 'UploadFileEntity'
        id?: string | null
        attributes?: {
          __typename?: 'UploadFile'
          url: string
          name: string
          ext?: string | null
          size: number
          createdAt?: any | null
          updatedAt?: any | null
        } | null
      } | null
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
    width?: Enum_Componentaccordionitemsflattext_Width | null
    align?: Enum_Componentaccordionitemsflattext_Align | null
    moreLinkTitle?: string | null
    moreLinkUrl?: string | null
    moreLinkPage?: {
      __typename?: 'PageEntityResponse'
      data?: {
        __typename?: 'PageEntity'
        attributes?: {
          __typename?: 'Page'
          slug?: string | null
          title?: string | null
          locale?: string | null
        } | null
      } | null
    } | null
    fileList?: Array<{
      __typename?: 'ComponentBlocksFileItem'
      title?: string | null
      media: {
        __typename?: 'UploadFileEntityResponse'
        data?: {
          __typename?: 'UploadFileEntity'
          id?: string | null
          attributes?: {
            __typename?: 'UploadFile'
            url: string
            name: string
            ext?: string | null
            size: number
            createdAt?: any | null
            updatedAt?: any | null
          } | null
        } | null
      }
    } | null> | null
  } | null> | null
  institutionsNarrow?: Array<{
    __typename?: 'ComponentAccordionItemsInstitutionNarrow'
    title?: string | null
    subtitle?: string | null
    category?: string | null
    url?: string | null
    urlLabel?: string | null
  } | null> | null
}

export type CalculatorSectionFragment = {
  __typename?: 'ComponentSectionsCalculator'
  hasBackground?: boolean | null
  single_adult_value?: number | null
  another_adult_value?: number | null
  child_value?: number | null
}

export type VideoBlockFragment = {
  __typename?: 'ComponentBlocksVideo'
  id: string
  title?: string | null
  speaker?: string | null
  url?: string | null
}

export type VideosSectionFragment = {
  __typename?: 'ComponentSectionsVideos'
  id: string
  title?: string | null
  subtitle?: string | null
  videos?: Array<{
    __typename?: 'ComponentBlocksVideo'
    id: string
    title?: string | null
    speaker?: string | null
    url?: string | null
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
  variant?: Enum_Componentsectionsnumericallist_Variant | null
  buttonText?: string | null
  buttonLink?: string | null
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
  iconMedia?: {
    __typename?: 'UploadFileEntityResponse'
    data?: {
      __typename?: 'UploadFileEntity'
      attributes?: { __typename?: 'UploadFile'; url: string } | null
    } | null
  } | null
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
    iconMedia?: {
      __typename?: 'UploadFileEntityResponse'
      data?: {
        __typename?: 'UploadFileEntity'
        attributes?: { __typename?: 'UploadFile'; url: string } | null
      } | null
    } | null
  } | null>
}

export type BannerSectionFragment = {
  __typename?: 'ComponentSectionsBanner'
  content?: string | null
  contentPosition: Enum_Componentsectionsbanner_Contentposition
  bannerTitle: string
  bannerVariant: Enum_Componentsectionsbanner_Variant
  media: {
    __typename?: 'UploadFileEntityResponse'
    data?: {
      __typename?: 'UploadFileEntity'
      attributes?: { __typename?: 'UploadFile'; url: string } | null
    } | null
  }
  primaryLink?: {
    __typename?: 'ComponentBlocksCommonLink'
    label: string
    url?: string | null
    plausibleId?: string | null
    page?: {
      __typename?: 'PageEntityResponse'
      data?: {
        __typename?: 'PageEntity'
        id?: string | null
        attributes?: { __typename?: 'Page'; title?: string | null; slug?: string | null } | null
      } | null
    } | null
    blogPost?: {
      __typename?: 'BlogPostEntityResponse'
      data?: {
        __typename?: 'BlogPostEntity'
        id?: string | null
        attributes?: { __typename?: 'BlogPost'; title?: string | null; slug?: string | null } | null
      } | null
    } | null
  } | null
  secondaryLink?: {
    __typename?: 'ComponentBlocksCommonLink'
    label: string
    url?: string | null
    plausibleId?: string | null
    page?: {
      __typename?: 'PageEntityResponse'
      data?: {
        __typename?: 'PageEntity'
        id?: string | null
        attributes?: { __typename?: 'Page'; title?: string | null; slug?: string | null } | null
      } | null
    } | null
    blogPost?: {
      __typename?: 'BlogPostEntityResponse'
      data?: {
        __typename?: 'BlogPostEntity'
        id?: string | null
        attributes?: { __typename?: 'BlogPost'; title?: string | null; slug?: string | null } | null
      } | null
    } | null
  } | null
  tertiaryLink?: {
    __typename?: 'ComponentBlocksCommonLink'
    label: string
    url?: string | null
    plausibleId?: string | null
    page?: {
      __typename?: 'PageEntityResponse'
      data?: {
        __typename?: 'PageEntity'
        id?: string | null
        attributes?: { __typename?: 'Page'; title?: string | null; slug?: string | null } | null
      } | null
    } | null
    blogPost?: {
      __typename?: 'BlogPostEntityResponse'
      data?: {
        __typename?: 'BlogPostEntity'
        id?: string | null
        attributes?: { __typename?: 'BlogPost'; title?: string | null; slug?: string | null } | null
      } | null
    } | null
  } | null
}

export type ContactCardBlockFragment = {
  __typename?: 'ComponentBlocksContactCard'
  overrideLabel?: string | null
  value: string
}

export type ContactsSectionFragment = {
  __typename?: 'ComponentSectionsContactsSection'
  id: string
  title?: string | null
  description?: string | null
  hasBackground?: boolean | null
  type: Enum_Componentsectionscontactssection_Type
  addressContacts?: Array<{
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
}

export type RegulationsListSectionFragment = {
  __typename?: 'ComponentSectionsRegulationsList'
  title?: string | null
  text?: string | null
}

export type RegulationsSectionFragment = {
  __typename?: 'ComponentSectionsRegulations'
  regulations?: {
    __typename?: 'RegulationRelationResponseCollection'
    data: Array<{
      __typename?: 'RegulationEntity'
      id?: string | null
      attributes?: {
        __typename?: 'Regulation'
        regNumber: string
        slug: string
        titleText?: string | null
        fullTitle: string
        effectiveFrom: any
        category: Enum_Regulation_Category
        isFullTextRegulation: boolean
        mainDocument: {
          __typename?: 'UploadFileEntityResponse'
          data?: {
            __typename?: 'UploadFileEntity'
            id?: string | null
            attributes?: {
              __typename?: 'UploadFile'
              url: string
              name: string
              ext?: string | null
              size: number
              createdAt?: any | null
              updatedAt?: any | null
            } | null
          } | null
        }
        attachments?: {
          __typename?: 'UploadFileRelationResponseCollection'
          data: Array<{
            __typename?: 'UploadFileEntity'
            id?: string | null
            attributes?: {
              __typename?: 'UploadFile'
              url: string
              name: string
              ext?: string | null
              size: number
              createdAt?: any | null
              updatedAt?: any | null
            } | null
          }>
        } | null
        amendments?: {
          __typename?: 'RegulationRelationResponseCollection'
          data: Array<{
            __typename?: 'RegulationEntity'
            id?: string | null
            attributes?: {
              __typename?: 'Regulation'
              regNumber: string
              slug: string
              effectiveFrom: any
              isFullTextRegulation: boolean
              attachments?: {
                __typename?: 'UploadFileRelationResponseCollection'
                data: Array<{
                  __typename?: 'UploadFileEntity'
                  id?: string | null
                  attributes?: {
                    __typename?: 'UploadFile'
                    url: string
                    name: string
                    ext?: string | null
                    size: number
                    createdAt?: any | null
                    updatedAt?: any | null
                  } | null
                }>
              } | null
            } | null
          }>
        } | null
        amending?: {
          __typename?: 'RegulationRelationResponseCollection'
          data: Array<{
            __typename?: 'RegulationEntity'
            id?: string | null
            attributes?: {
              __typename?: 'Regulation'
              regNumber: string
              slug: string
              effectiveFrom: any
              cancellation?: {
                __typename?: 'RegulationEntityResponse'
                data?: {
                  __typename?: 'RegulationEntity'
                  id?: string | null
                  attributes?: {
                    __typename?: 'Regulation'
                    regNumber: string
                    slug: string
                    effectiveFrom: any
                  } | null
                } | null
              } | null
              amending?: {
                __typename?: 'RegulationRelationResponseCollection'
                data: Array<{
                  __typename?: 'RegulationEntity'
                  id?: string | null
                  attributes?: {
                    __typename?: 'Regulation'
                    regNumber: string
                    slug: string
                    cancellation?: {
                      __typename?: 'RegulationEntityResponse'
                      data?: {
                        __typename?: 'RegulationEntity'
                        id?: string | null
                        attributes?: {
                          __typename?: 'Regulation'
                          regNumber: string
                          slug: string
                          effectiveFrom: any
                        } | null
                      } | null
                    } | null
                  } | null
                }>
              } | null
            } | null
          }>
        } | null
        cancellation?: {
          __typename?: 'RegulationEntityResponse'
          data?: {
            __typename?: 'RegulationEntity'
            id?: string | null
            attributes?: {
              __typename?: 'Regulation'
              regNumber: string
              slug: string
              effectiveFrom: any
            } | null
          } | null
        } | null
        cancelling?: {
          __typename?: 'RegulationRelationResponseCollection'
          data: Array<{
            __typename?: 'RegulationEntity'
            id?: string | null
            attributes?: {
              __typename?: 'Regulation'
              regNumber: string
              slug: string
              effectiveFrom: any
            } | null
          }>
        } | null
      } | null
    }>
  } | null
}

export type FaqsSectionFragment = {
  __typename?: 'ComponentSectionsFaqs'
  title?: string | null
  text?: string | null
  faqs?: {
    __typename?: 'FaqRelationResponseCollection'
    data: Array<{
      __typename?: 'FaqEntity'
      id?: string | null
      attributes?: { __typename?: 'Faq'; title: string; body?: string | null } | null
    }>
  } | null
}

export type FaqCategoriesSectionFragment = {
  __typename?: 'ComponentSectionsFaqCategories'
  title?: string | null
  text?: string | null
  faqCategories?: {
    __typename?: 'FaqCategoryRelationResponseCollection'
    data: Array<{
      __typename?: 'FaqCategoryEntity'
      id?: string | null
      attributes?: {
        __typename?: 'FaqCategory'
        title: string
        slug: string
        faqs?: {
          __typename?: 'FaqRelationResponseCollection'
          data: Array<{
            __typename?: 'FaqEntity'
            id?: string | null
            attributes?: { __typename?: 'Faq'; title: string; body?: string | null } | null
          }>
        } | null
      } | null
    }>
  } | null
}

type Sections_ComponentSectionsAccordion_Fragment = {
  __typename: 'ComponentSectionsAccordion'
  title?: string | null
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
    width?: Enum_Componentaccordionitemsflattext_Width | null
    align?: Enum_Componentaccordionitemsflattext_Align | null
    moreLinkTitle?: string | null
    moreLinkUrl?: string | null
    moreLinkPage?: {
      __typename?: 'PageEntityResponse'
      data?: {
        __typename?: 'PageEntity'
        attributes?: {
          __typename?: 'Page'
          slug?: string | null
          title?: string | null
          locale?: string | null
        } | null
      } | null
    } | null
    fileList?: Array<{
      __typename?: 'ComponentBlocksFileItem'
      title?: string | null
      media: {
        __typename?: 'UploadFileEntityResponse'
        data?: {
          __typename?: 'UploadFileEntity'
          id?: string | null
          attributes?: {
            __typename?: 'UploadFile'
            url: string
            name: string
            ext?: string | null
            size: number
            createdAt?: any | null
            updatedAt?: any | null
          } | null
        } | null
      }
    } | null> | null
  } | null> | null
  institutionsNarrow?: Array<{
    __typename?: 'ComponentAccordionItemsInstitutionNarrow'
    title?: string | null
    subtitle?: string | null
    category?: string | null
    url?: string | null
    urlLabel?: string | null
  } | null> | null
}

type Sections_ComponentSectionsBanner_Fragment = {
  __typename: 'ComponentSectionsBanner'
  content?: string | null
  contentPosition: Enum_Componentsectionsbanner_Contentposition
  bannerTitle: string
  bannerVariant: Enum_Componentsectionsbanner_Variant
  media: {
    __typename?: 'UploadFileEntityResponse'
    data?: {
      __typename?: 'UploadFileEntity'
      attributes?: { __typename?: 'UploadFile'; url: string } | null
    } | null
  }
  primaryLink?: {
    __typename?: 'ComponentBlocksCommonLink'
    label: string
    url?: string | null
    plausibleId?: string | null
    page?: {
      __typename?: 'PageEntityResponse'
      data?: {
        __typename?: 'PageEntity'
        id?: string | null
        attributes?: { __typename?: 'Page'; title?: string | null; slug?: string | null } | null
      } | null
    } | null
    blogPost?: {
      __typename?: 'BlogPostEntityResponse'
      data?: {
        __typename?: 'BlogPostEntity'
        id?: string | null
        attributes?: { __typename?: 'BlogPost'; title?: string | null; slug?: string | null } | null
      } | null
    } | null
  } | null
  secondaryLink?: {
    __typename?: 'ComponentBlocksCommonLink'
    label: string
    url?: string | null
    plausibleId?: string | null
    page?: {
      __typename?: 'PageEntityResponse'
      data?: {
        __typename?: 'PageEntity'
        id?: string | null
        attributes?: { __typename?: 'Page'; title?: string | null; slug?: string | null } | null
      } | null
    } | null
    blogPost?: {
      __typename?: 'BlogPostEntityResponse'
      data?: {
        __typename?: 'BlogPostEntity'
        id?: string | null
        attributes?: { __typename?: 'BlogPost'; title?: string | null; slug?: string | null } | null
      } | null
    } | null
  } | null
  tertiaryLink?: {
    __typename?: 'ComponentBlocksCommonLink'
    label: string
    url?: string | null
    plausibleId?: string | null
    page?: {
      __typename?: 'PageEntityResponse'
      data?: {
        __typename?: 'PageEntity'
        id?: string | null
        attributes?: { __typename?: 'Page'; title?: string | null; slug?: string | null } | null
      } | null
    } | null
    blogPost?: {
      __typename?: 'BlogPostEntityResponse'
      data?: {
        __typename?: 'BlogPostEntity'
        id?: string | null
        attributes?: { __typename?: 'BlogPost'; title?: string | null; slug?: string | null } | null
      } | null
    } | null
  } | null
}

type Sections_ComponentSectionsBlogPostsByCategory_Fragment = {
  __typename: 'ComponentSectionsBlogPostsByCategory'
  title?: string | null
  text?: string | null
  category?: {
    __typename?: 'PageCategoryEntityResponse'
    data?: {
      __typename?: 'PageCategoryEntity'
      id?: string | null
      attributes?: { __typename?: 'PageCategory'; title?: string | null } | null
    } | null
  } | null
}

type Sections_ComponentSectionsBlogPostsByTags_Fragment = {
  __typename: 'ComponentSectionsBlogPostsByTags'
  title?: string | null
  text?: string | null
  tags?: {
    __typename?: 'TagRelationResponseCollection'
    data: Array<{ __typename?: 'TagEntity'; id?: string | null }>
  } | null
}

type Sections_ComponentSectionsBlogPostsList_Fragment = {
  __typename: 'ComponentSectionsBlogPostsList'
  title?: string | null
  text?: string | null
}

type Sections_ComponentSectionsCalculator_Fragment = {
  __typename: 'ComponentSectionsCalculator'
  hasBackground?: boolean | null
  single_adult_value?: number | null
  another_adult_value?: number | null
  child_value?: number | null
}

type Sections_ComponentSectionsColumnedText_Fragment = {
  __typename: 'ComponentSectionsColumnedText'
  content?: string | null
  contentAlignment?: Enum_Componentsectionscolumnedtext_Contentalignment | null
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
    iconMedia?: {
      __typename?: 'UploadFileEntityResponse'
      data?: {
        __typename?: 'UploadFileEntity'
        attributes?: { __typename?: 'UploadFile'; url: string } | null
      } | null
    } | null
  } | null>
}

type Sections_ComponentSectionsContactsSection_Fragment = {
  __typename: 'ComponentSectionsContactsSection'
  id: string
  title?: string | null
  description?: string | null
  hasBackground?: boolean | null
  type: Enum_Componentsectionscontactssection_Type
  addressContacts?: Array<{
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
}

type Sections_ComponentSectionsDivider_Fragment = {
  __typename: 'ComponentSectionsDivider'
  style?: Enum_Componentsectionsdivider_Style | null
}

type Sections_ComponentSectionsFaqCategories_Fragment = {
  __typename: 'ComponentSectionsFaqCategories'
  title?: string | null
  text?: string | null
  faqCategories?: {
    __typename?: 'FaqCategoryRelationResponseCollection'
    data: Array<{
      __typename?: 'FaqCategoryEntity'
      id?: string | null
      attributes?: {
        __typename?: 'FaqCategory'
        title: string
        slug: string
        faqs?: {
          __typename?: 'FaqRelationResponseCollection'
          data: Array<{
            __typename?: 'FaqEntity'
            id?: string | null
            attributes?: { __typename?: 'Faq'; title: string; body?: string | null } | null
          }>
        } | null
      } | null
    }>
  } | null
}

type Sections_ComponentSectionsFaqs_Fragment = {
  __typename: 'ComponentSectionsFaqs'
  title?: string | null
  text?: string | null
  faqs?: {
    __typename?: 'FaqRelationResponseCollection'
    data: Array<{
      __typename?: 'FaqEntity'
      id?: string | null
      attributes?: { __typename?: 'Faq'; title: string; body?: string | null } | null
    }>
  } | null
}

type Sections_ComponentSectionsFileList_Fragment = {
  __typename: 'ComponentSectionsFileList'
  title?: string | null
  text?: string | null
  fileList?: Array<{
    __typename?: 'ComponentBlocksFile'
    title?: string | null
    media?: {
      __typename?: 'UploadFileEntityResponse'
      data?: {
        __typename?: 'UploadFileEntity'
        id?: string | null
        attributes?: {
          __typename?: 'UploadFile'
          url: string
          name: string
          ext?: string | null
          size: number
          createdAt?: any | null
          updatedAt?: any | null
        } | null
      } | null
    } | null
  } | null> | null
}

type Sections_ComponentSectionsGallery_Fragment = {
  __typename: 'ComponentSectionsGallery'
  title?: string | null
  text?: string | null
  medias: {
    __typename?: 'UploadFileRelationResponseCollection'
    data: Array<{
      __typename?: 'UploadFileEntity'
      id?: string | null
      attributes?: {
        __typename?: 'UploadFile'
        url: string
        width?: number | null
        height?: number | null
        caption?: string | null
        alternativeText?: string | null
        name: string
      } | null
    }>
  }
}

type Sections_ComponentSectionsIconTitleDesc_Fragment = {
  __typename: 'ComponentSectionsIconTitleDesc'
  title?: string | null
  list?: Array<{
    __typename?: 'ComponentBlocksIconWithTitleAndDescription'
    title?: string | null
    desc?: string | null
    disableIconBackground?: boolean | null
    icon?: {
      __typename?: 'UploadFileEntityResponse'
      data?: {
        __typename?: 'UploadFileEntity'
        id?: string | null
        attributes?: { __typename?: 'UploadFile'; url: string } | null
      } | null
    } | null
  } | null> | null
}

type Sections_ComponentSectionsIframe_Fragment = {
  __typename: 'ComponentSectionsIframe'
  url: string
  iframeWidth: Enum_Componentsectionsiframe_Iframewidth
  iframeHeight: string
  fullHeight: boolean
  allowFullscreen: boolean
  css?: string | null
  allowGeolocation?: boolean | null
}

type Sections_ComponentSectionsInbaArticlesList_Fragment = {
  __typename: 'ComponentSectionsInbaArticlesList'
  title?: string | null
  text?: string | null
  featuredArticles?: {
    __typename?: 'InbaArticleRelationResponseCollection'
    data: Array<{
      __typename?: 'InbaArticleEntity'
      id?: string | null
      attributes?: {
        __typename?: 'InbaArticle'
        title: string
        slug: string
        perex?: string | null
        publishedAt?: any | null
        content?: string | null
        coverImage?: {
          __typename?: 'UploadFileEntityResponse'
          data?: {
            __typename?: 'UploadFileEntity'
            attributes?: { __typename?: 'UploadFile'; url: string } | null
          } | null
        } | null
        inbaTag?: {
          __typename?: 'InbaTagEntityResponse'
          data?: {
            __typename?: 'InbaTagEntity'
            id?: string | null
            attributes?: { __typename?: 'InbaTag'; title: string } | null
          } | null
        } | null
        inbaRelease?: {
          __typename?: 'InbaReleaseEntityResponse'
          data?: {
            __typename?: 'InbaReleaseEntity'
            attributes?: {
              __typename?: 'InbaRelease'
              title: string
              releaseDate: any
              slug: string
            } | null
          } | null
        } | null
      } | null
    }>
  } | null
}

type Sections_ComponentSectionsInbaReleases_Fragment = {
  __typename: 'ComponentSectionsInbaReleases'
  title?: string | null
  text?: string | null
}

type Sections_ComponentSectionsLinks_Fragment = {
  __typename: 'ComponentSectionsLinks'
  title?: string | null
  pageLinks?: Array<{
    __typename?: 'ComponentBlocksPageLink'
    title?: string | null
    url?: string | null
    anchor?: string | null
    page?: {
      __typename?: 'PageEntityResponse'
      data?: {
        __typename?: 'PageEntity'
        attributes?: {
          __typename?: 'Page'
          title?: string | null
          slug?: string | null
          locale?: string | null
        } | null
      } | null
    } | null
  } | null> | null
}

type Sections_ComponentSectionsNarrowText_Fragment = {
  __typename: 'ComponentSectionsNarrowText'
  content?: string | null
  width?: Enum_Componentsectionsnarrowtext_Width | null
  align?: Enum_Componentsectionsnarrowtext_Align | null
}

type Sections_ComponentSectionsNumericalList_Fragment = {
  __typename: 'ComponentSectionsNumericalList'
  id: string
  title?: string | null
  variant?: Enum_Componentsectionsnumericallist_Variant | null
  buttonText?: string | null
  buttonLink?: string | null
  items?: Array<{
    __typename?: 'ComponentBlocksNumericalListItem'
    text?: string | null
  } | null> | null
}

type Sections_ComponentSectionsOfficialBoard_Fragment = {
  __typename: 'ComponentSectionsOfficialBoard'
}

type Sections_ComponentSectionsOrganizationalStructure_Fragment = {
  __typename: 'ComponentSectionsOrganizationalStructure'
  title?: string | null
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
  regulations?: {
    __typename?: 'RegulationRelationResponseCollection'
    data: Array<{
      __typename?: 'RegulationEntity'
      id?: string | null
      attributes?: {
        __typename?: 'Regulation'
        regNumber: string
        slug: string
        titleText?: string | null
        fullTitle: string
        effectiveFrom: any
        category: Enum_Regulation_Category
        isFullTextRegulation: boolean
        mainDocument: {
          __typename?: 'UploadFileEntityResponse'
          data?: {
            __typename?: 'UploadFileEntity'
            id?: string | null
            attributes?: {
              __typename?: 'UploadFile'
              url: string
              name: string
              ext?: string | null
              size: number
              createdAt?: any | null
              updatedAt?: any | null
            } | null
          } | null
        }
        attachments?: {
          __typename?: 'UploadFileRelationResponseCollection'
          data: Array<{
            __typename?: 'UploadFileEntity'
            id?: string | null
            attributes?: {
              __typename?: 'UploadFile'
              url: string
              name: string
              ext?: string | null
              size: number
              createdAt?: any | null
              updatedAt?: any | null
            } | null
          }>
        } | null
        amendments?: {
          __typename?: 'RegulationRelationResponseCollection'
          data: Array<{
            __typename?: 'RegulationEntity'
            id?: string | null
            attributes?: {
              __typename?: 'Regulation'
              regNumber: string
              slug: string
              effectiveFrom: any
              isFullTextRegulation: boolean
              attachments?: {
                __typename?: 'UploadFileRelationResponseCollection'
                data: Array<{
                  __typename?: 'UploadFileEntity'
                  id?: string | null
                  attributes?: {
                    __typename?: 'UploadFile'
                    url: string
                    name: string
                    ext?: string | null
                    size: number
                    createdAt?: any | null
                    updatedAt?: any | null
                  } | null
                }>
              } | null
            } | null
          }>
        } | null
        amending?: {
          __typename?: 'RegulationRelationResponseCollection'
          data: Array<{
            __typename?: 'RegulationEntity'
            id?: string | null
            attributes?: {
              __typename?: 'Regulation'
              regNumber: string
              slug: string
              effectiveFrom: any
              cancellation?: {
                __typename?: 'RegulationEntityResponse'
                data?: {
                  __typename?: 'RegulationEntity'
                  id?: string | null
                  attributes?: {
                    __typename?: 'Regulation'
                    regNumber: string
                    slug: string
                    effectiveFrom: any
                  } | null
                } | null
              } | null
              amending?: {
                __typename?: 'RegulationRelationResponseCollection'
                data: Array<{
                  __typename?: 'RegulationEntity'
                  id?: string | null
                  attributes?: {
                    __typename?: 'Regulation'
                    regNumber: string
                    slug: string
                    cancellation?: {
                      __typename?: 'RegulationEntityResponse'
                      data?: {
                        __typename?: 'RegulationEntity'
                        id?: string | null
                        attributes?: {
                          __typename?: 'Regulation'
                          regNumber: string
                          slug: string
                          effectiveFrom: any
                        } | null
                      } | null
                    } | null
                  } | null
                }>
              } | null
            } | null
          }>
        } | null
        cancellation?: {
          __typename?: 'RegulationEntityResponse'
          data?: {
            __typename?: 'RegulationEntity'
            id?: string | null
            attributes?: {
              __typename?: 'Regulation'
              regNumber: string
              slug: string
              effectiveFrom: any
            } | null
          } | null
        } | null
        cancelling?: {
          __typename?: 'RegulationRelationResponseCollection'
          data: Array<{
            __typename?: 'RegulationEntity'
            id?: string | null
            attributes?: {
              __typename?: 'Regulation'
              regNumber: string
              slug: string
              effectiveFrom: any
            } | null
          }>
        } | null
      } | null
    }>
  } | null
}

type Sections_ComponentSectionsRegulationsList_Fragment = {
  __typename: 'ComponentSectionsRegulationsList'
  title?: string | null
  text?: string | null
}

type Sections_ComponentSectionsTestimonials_Fragment = {
  __typename: 'ComponentSectionsTestimonials'
  title?: string | null
  text?: string | null
  hasBackground?: boolean | null
  testimonials: Array<{
    __typename?: 'ComponentBlocksTestimonialItem'
    id: string
    name: string
    quote: string
  } | null>
}

type Sections_ComponentSectionsTextWithImage_Fragment = {
  __typename: 'ComponentSectionsTextWithImage'
  content?: string | null
  imagePosition?: Enum_Componentsectionstextwithimage_Imageposition | null
  imageShadow?: boolean | null
  imageSrc?: {
    __typename?: 'UploadFileEntityResponse'
    data?: {
      __typename?: 'UploadFileEntity'
      attributes?: {
        __typename?: 'UploadFile'
        url: string
        alternativeText?: string | null
        width?: number | null
        height?: number | null
      } | null
    } | null
  } | null
}

type Sections_ComponentSectionsTimeline_Fragment = {
  __typename: 'ComponentSectionsTimeline'
  timelineItems?: Array<{
    __typename?: 'ComponentBlocksTimelineItem'
    id: string
    title?: string | null
    content?: string | null
  } | null> | null
}

type Sections_ComponentSectionsVideos_Fragment = {
  __typename: 'ComponentSectionsVideos'
  id: string
  title?: string | null
  subtitle?: string | null
  videos?: Array<{
    __typename?: 'ComponentBlocksVideo'
    id: string
    title?: string | null
    speaker?: string | null
    url?: string | null
  } | null> | null
}

type Sections_ComponentSectionsWaves_Fragment = {
  __typename: 'ComponentSectionsWaves'
  position?: Enum_Componentsectionswaves_Position | null
}

type Sections_Error_Fragment = { __typename: 'Error' }

export type SectionsFragment =
  | Sections_ComponentSectionsAccordion_Fragment
  | Sections_ComponentSectionsBanner_Fragment
  | Sections_ComponentSectionsBlogPostsByCategory_Fragment
  | Sections_ComponentSectionsBlogPostsByTags_Fragment
  | Sections_ComponentSectionsBlogPostsList_Fragment
  | Sections_ComponentSectionsCalculator_Fragment
  | Sections_ComponentSectionsColumnedText_Fragment
  | Sections_ComponentSectionsComparisonSection_Fragment
  | Sections_ComponentSectionsContactsSection_Fragment
  | Sections_ComponentSectionsDivider_Fragment
  | Sections_ComponentSectionsFaqCategories_Fragment
  | Sections_ComponentSectionsFaqs_Fragment
  | Sections_ComponentSectionsFileList_Fragment
  | Sections_ComponentSectionsGallery_Fragment
  | Sections_ComponentSectionsIconTitleDesc_Fragment
  | Sections_ComponentSectionsIframe_Fragment
  | Sections_ComponentSectionsInbaArticlesList_Fragment
  | Sections_ComponentSectionsInbaReleases_Fragment
  | Sections_ComponentSectionsLinks_Fragment
  | Sections_ComponentSectionsNarrowText_Fragment
  | Sections_ComponentSectionsNumericalList_Fragment
  | Sections_ComponentSectionsOfficialBoard_Fragment
  | Sections_ComponentSectionsOrganizationalStructure_Fragment
  | Sections_ComponentSectionsProsAndConsSection_Fragment
  | Sections_ComponentSectionsRegulations_Fragment
  | Sections_ComponentSectionsRegulationsList_Fragment
  | Sections_ComponentSectionsTestimonials_Fragment
  | Sections_ComponentSectionsTextWithImage_Fragment
  | Sections_ComponentSectionsTimeline_Fragment
  | Sections_ComponentSectionsVideos_Fragment
  | Sections_ComponentSectionsWaves_Fragment
  | Sections_Error_Fragment

export type SubpageListPageHeaderSectionFragment = {
  __typename?: 'ComponentSectionsSubpageList'
  id: string
  subpageList?: Array<{
    __typename?: 'ComponentBlocksPageLink'
    title?: string | null
    url?: string | null
    anchor?: string | null
    page?: {
      __typename?: 'PageEntityResponse'
      data?: {
        __typename?: 'PageEntity'
        attributes?: {
          __typename?: 'Page'
          title?: string | null
          slug?: string | null
          locale?: string | null
        } | null
      } | null
    } | null
  } | null> | null
}

type PageHeaderSections_ComponentSectionsSubpageList_Fragment = {
  __typename: 'ComponentSectionsSubpageList'
  id: string
  subpageList?: Array<{
    __typename?: 'ComponentBlocksPageLink'
    title?: string | null
    url?: string | null
    anchor?: string | null
    page?: {
      __typename?: 'PageEntityResponse'
      data?: {
        __typename?: 'PageEntity'
        attributes?: {
          __typename?: 'Page'
          title?: string | null
          slug?: string | null
          locale?: string | null
        } | null
      } | null
    } | null
  } | null> | null
}

type PageHeaderSections_Error_Fragment = { __typename: 'Error' }

export type PageHeaderSectionsFragment =
  | PageHeaderSections_ComponentSectionsSubpageList_Fragment
  | PageHeaderSections_Error_Fragment

export const BlogPostLinkFragmentDoc = gql`
  fragment BlogPostLink on ComponentBlocksBlogPostLink {
    blogPost {
      data {
        id
        attributes {
          title
          slug
        }
      }
    }
    title
    url
  }
`
export const UploadImageSrcEntityFragmentDoc = gql`
  fragment UploadImageSrcEntity on UploadFileEntity {
    id
    attributes {
      url
    }
  }
`
export const IconTitleDescriptionBlockFragmentDoc = gql`
  fragment IconTitleDescriptionBlock on ComponentBlocksIconWithTitleAndDescription {
    title
    desc
    disableIconBackground
    icon {
      data {
        ...UploadImageSrcEntity
      }
    }
  }
  ${UploadImageSrcEntityFragmentDoc}
`
export const IconTitleDescSectionFragmentDoc = gql`
  fragment IconTitleDescSection on ComponentSectionsIconTitleDesc {
    title
    list {
      ...IconTitleDescriptionBlock
    }
  }
  ${IconTitleDescriptionBlockFragmentDoc}
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
    imageShadow
    imageSrc {
      data {
        attributes {
          url
          alternativeText
          width
          height
        }
      }
    }
  }
`
export const IframeSectionFragmentDoc = gql`
  fragment IframeSection on ComponentSectionsIframe {
    url
    iframeWidth
    iframeHeight
    fullHeight
    allowFullscreen
    css
    allowGeolocation
  }
`
export const UploadImageEntityFragmentDoc = gql`
  fragment UploadImageEntity on UploadFileEntity {
    id
    attributes {
      url
      width
      height
      caption
      alternativeText
      name
    }
  }
`
export const GallerySectionFragmentDoc = gql`
  fragment GallerySection on ComponentSectionsGallery {
    title
    text
    medias(pagination: { limit: -1 }) {
      data {
        ...UploadImageEntity
      }
    }
  }
  ${UploadImageEntityFragmentDoc}
`
export const UploadFileEntityFragmentDoc = gql`
  fragment UploadFileEntity on UploadFileEntity {
    id
    attributes {
      url
      name
      ext
      size
      createdAt
      updatedAt
    }
  }
`
export const FileBlockFragmentDoc = gql`
  fragment FileBlock on ComponentBlocksFile {
    title
    media {
      data {
        ...UploadFileEntity
      }
    }
  }
  ${UploadFileEntityFragmentDoc}
`
export const FileListSectionFragmentDoc = gql`
  fragment FileListSection on ComponentSectionsFileList {
    title
    text
    fileList(pagination: { limit: -1 }) {
      ...FileBlock
    }
  }
  ${FileBlockFragmentDoc}
`
export const ColumnedTextSectionFragmentDoc = gql`
  fragment ColumnedTextSection on ComponentSectionsColumnedText {
    content
    contentAlignment
  }
`
export const NarrowTextSectionFragmentDoc = gql`
  fragment NarrowTextSection on ComponentSectionsNarrowText {
    content
    width
    align
  }
`
export const WavesSectionFragmentDoc = gql`
  fragment WavesSection on ComponentSectionsWaves {
    position
  }
`
export const PageLinkBlockFragmentDoc = gql`
  fragment PageLinkBlock on ComponentBlocksPageLink {
    title
    url
    anchor
    page {
      data {
        attributes {
          title
          slug
          locale
        }
      }
    }
  }
`
export const LinksSectionFragmentDoc = gql`
  fragment LinksSection on ComponentSectionsLinks {
    title
    pageLinks(pagination: { limit: -1 }) {
      ...PageLinkBlock
    }
  }
  ${PageLinkBlockFragmentDoc}
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
    title
    media {
      data {
        ...UploadFileEntity
      }
    }
  }
  ${UploadFileEntityFragmentDoc}
`
export const ComponentAccordionItemsFlatTextFragmentDoc = gql`
  fragment ComponentAccordionItemsFlatText on ComponentAccordionItemsFlatText {
    category
    content
    width
    align
    moreLinkTitle
    moreLinkUrl
    moreLinkPage {
      data {
        attributes {
          slug
          title
          locale
        }
      }
    }
    fileList {
      ...FileItemBlock
    }
  }
  ${FileItemBlockFragmentDoc}
`
export const ComponentAccordionItemsInstitutionNarrowFragmentDoc = gql`
  fragment ComponentAccordionItemsInstitutionNarrow on ComponentAccordionItemsInstitutionNarrow {
    title
    subtitle
    category
    url
    urlLabel
  }
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
    institutionsNarrow(pagination: { limit: -1 }) {
      ...ComponentAccordionItemsInstitutionNarrow
    }
  }
  ${ComponentAccordionItemsInstitutionFragmentDoc}
  ${ComponentAccordionItemsFlatTextFragmentDoc}
  ${ComponentAccordionItemsInstitutionNarrowFragmentDoc}
`
export const CalculatorSectionFragmentDoc = gql`
  fragment CalculatorSection on ComponentSectionsCalculator {
    hasBackground
    single_adult_value
    another_adult_value
    child_value
  }
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
    items {
      ...NumericalListItemBlock
    }
    title
    variant
    buttonText
    buttonLink
  }
  ${NumericalListItemBlockFragmentDoc}
`
export const BlogPostsListSectionFragmentDoc = gql`
  fragment BlogPostsListSection on ComponentSectionsBlogPostsList {
    title
    text
  }
`
export const BlogPostsByTagsSectionFragmentDoc = gql`
  fragment BlogPostsByTagsSection on ComponentSectionsBlogPostsByTags {
    title
    text
    tags {
      data {
        id
      }
    }
  }
`
export const BlogPostsByCategorySectionFragmentDoc = gql`
  fragment BlogPostsByCategorySection on ComponentSectionsBlogPostsByCategory {
    title
    text
    category {
      data {
        id
        attributes {
          title
        }
      }
    }
  }
`
export const InbaTagEntityFragmentDoc = gql`
  fragment InbaTagEntity on InbaTagEntity {
    id
    attributes {
      title
    }
  }
`
export const InbaArticleEntityFragmentDoc = gql`
  fragment InbaArticleEntity on InbaArticleEntity {
    id
    attributes {
      title
      slug
      perex
      publishedAt
      coverImage {
        data {
          attributes {
            url
          }
        }
      }
      inbaTag {
        data {
          ...InbaTagEntity
        }
      }
      content
      inbaRelease {
        data {
          attributes {
            title
            releaseDate
            slug
          }
        }
      }
    }
  }
  ${InbaTagEntityFragmentDoc}
`
export const InbaArticlesListSectionFragmentDoc = gql`
  fragment InbaArticlesListSection on ComponentSectionsInbaArticlesList {
    title
    text
    featuredArticles: featuredArts {
      data {
        ...InbaArticleEntity
      }
    }
  }
  ${InbaArticleEntityFragmentDoc}
`
export const InbaReleasesSectionFragmentDoc = gql`
  fragment InbaReleasesSection on ComponentSectionsInbaReleases {
    title
    text
  }
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
      data {
        attributes {
          url
        }
      }
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
export const CommonLinkFragmentDoc = gql`
  fragment CommonLink on ComponentBlocksCommonLink {
    label
    url
    plausibleId
    page {
      data {
        id
        attributes {
          title
          slug
        }
      }
    }
    blogPost {
      data {
        id
        attributes {
          title
          slug
        }
      }
    }
  }
`
export const BannerSectionFragmentDoc = gql`
  fragment BannerSection on ComponentSectionsBanner {
    bannerTitle: title
    content
    contentPosition
    bannerVariant: variant
    media {
      data {
        attributes {
          url
        }
      }
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
export const TimelineItemBlockFragmentDoc = gql`
  fragment TimelineItemBlock on ComponentBlocksTimelineItem {
    id
    title
    content
  }
`
export const TimelineSectionFragmentDoc = gql`
  fragment TimelineSection on ComponentSectionsTimeline {
    timelineItems {
      ...TimelineItemBlock
    }
  }
  ${TimelineItemBlockFragmentDoc}
`
export const ContactCardBlockFragmentDoc = gql`
  fragment ContactCardBlock on ComponentBlocksContactCard {
    overrideLabel
    value
  }
`
export const ContactsSectionFragmentDoc = gql`
  fragment ContactsSection on ComponentSectionsContactsSection {
    id
    title
    description
    hasBackground
    addressContacts {
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
    type
  }
  ${ContactCardBlockFragmentDoc}
`
export const RegulationsListSectionFragmentDoc = gql`
  fragment RegulationsListSection on ComponentSectionsRegulationsList {
    title
    text
  }
`
export const RegulationEntityFragmentDoc = gql`
  fragment RegulationEntity on RegulationEntity {
    id
    attributes {
      regNumber
      slug
      titleText
      fullTitle
      effectiveFrom
      category
      isFullTextRegulation
      mainDocument {
        data {
          ...UploadFileEntity
        }
      }
      attachments {
        data {
          ...UploadFileEntity
        }
      }
      amendments {
        data {
          id
          attributes {
            regNumber
            slug
            effectiveFrom
            isFullTextRegulation
            attachments {
              data {
                ...UploadFileEntity
              }
            }
          }
        }
      }
      amending {
        data {
          id
          attributes {
            regNumber
            slug
            effectiveFrom
            cancellation {
              data {
                id
                attributes {
                  regNumber
                  slug
                  effectiveFrom
                }
              }
            }
            amending {
              data {
                id
                attributes {
                  regNumber
                  slug
                  cancellation {
                    data {
                      id
                      attributes {
                        regNumber
                        slug
                        effectiveFrom
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      cancellation {
        data {
          id
          attributes {
            regNumber
            slug
            effectiveFrom
          }
        }
      }
      cancelling {
        data {
          id
          attributes {
            regNumber
            slug
            effectiveFrom
          }
        }
      }
    }
  }
  ${UploadFileEntityFragmentDoc}
`
export const RegulationsSectionFragmentDoc = gql`
  fragment RegulationsSection on ComponentSectionsRegulations {
    regulations {
      data {
        ...RegulationEntity
      }
    }
  }
  ${RegulationEntityFragmentDoc}
`
export const TestimonialItemBlockFragmentDoc = gql`
  fragment TestimonialItemBlock on ComponentBlocksTestimonialItem {
    id
    name
    quote
  }
`
export const TestimonialsSectionFragmentDoc = gql`
  fragment TestimonialsSection on ComponentSectionsTestimonials {
    title
    text
    hasBackground
    testimonials {
      ...TestimonialItemBlock
    }
  }
  ${TestimonialItemBlockFragmentDoc}
`
export const FaqEntityFragmentDoc = gql`
  fragment FaqEntity on FaqEntity {
    id
    attributes {
      title
      body
    }
  }
`
export const FaqsSectionFragmentDoc = gql`
  fragment FaqsSection on ComponentSectionsFaqs {
    title
    text
    faqs {
      data {
        ...FaqEntity
      }
    }
  }
  ${FaqEntityFragmentDoc}
`
export const FaqCategoryEntityFragmentDoc = gql`
  fragment FaqCategoryEntity on FaqCategoryEntity {
    id
    attributes {
      title
      slug
      faqs {
        data {
          ...FaqEntity
        }
      }
    }
  }
  ${FaqEntityFragmentDoc}
`
export const FaqCategoriesSectionFragmentDoc = gql`
  fragment FaqCategoriesSection on ComponentSectionsFaqCategories {
    title
    text
    faqCategories {
      data {
        ...FaqCategoryEntity
      }
    }
  }
  ${FaqCategoryEntityFragmentDoc}
`
export const SectionsFragmentDoc = gql`
  fragment Sections on PageSectionsDynamicZone {
    __typename
    ... on ComponentSectionsIconTitleDesc {
      ...IconTitleDescSection
    }
    ... on ComponentSectionsDivider {
      ...DividerSection
    }
    ... on ComponentSectionsTextWithImage {
      ...TextWithImageSection
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
    ... on ComponentSectionsNarrowText {
      ...NarrowTextSection
    }
    ... on ComponentSectionsWaves {
      ...WavesSection
    }
    ... on ComponentSectionsLinks {
      ...LinksSection
    }
    ... on ComponentSectionsAccordion {
      ...AccordionSection
    }
    ... on ComponentSectionsCalculator {
      ...CalculatorSection
    }
    ... on ComponentSectionsVideos {
      ...VideosSection
    }
    ... on ComponentSectionsNumericalList {
      ...NumericalListSection
    }
    ... on ComponentSectionsBlogPostsList {
      ...BlogPostsListSection
    }
    ... on ComponentSectionsBlogPostsByTags {
      ...BlogPostsByTagsSection
    }
    ... on ComponentSectionsBlogPostsByCategory {
      ...BlogPostsByCategorySection
    }
    ... on ComponentSectionsInbaArticlesList {
      ...InbaArticlesListSection
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
    ... on ComponentSectionsTimeline {
      ...TimelineSection
    }
    ... on ComponentSectionsContactsSection {
      ...ContactsSection
    }
    ... on ComponentSectionsRegulationsList {
      ...RegulationsListSection
    }
    ... on ComponentSectionsRegulations {
      ...RegulationsSection
    }
    ... on ComponentSectionsTestimonials {
      ...TestimonialsSection
    }
    ... on ComponentSectionsFaqs {
      ...FaqsSection
    }
    ... on ComponentSectionsFaqCategories {
      ...FaqCategoriesSection
    }
  }
  ${IconTitleDescSectionFragmentDoc}
  ${DividerSectionFragmentDoc}
  ${TextWithImageSectionFragmentDoc}
  ${IframeSectionFragmentDoc}
  ${GallerySectionFragmentDoc}
  ${FileListSectionFragmentDoc}
  ${ColumnedTextSectionFragmentDoc}
  ${NarrowTextSectionFragmentDoc}
  ${WavesSectionFragmentDoc}
  ${LinksSectionFragmentDoc}
  ${AccordionSectionFragmentDoc}
  ${CalculatorSectionFragmentDoc}
  ${VideosSectionFragmentDoc}
  ${NumericalListSectionFragmentDoc}
  ${BlogPostsListSectionFragmentDoc}
  ${BlogPostsByTagsSectionFragmentDoc}
  ${BlogPostsByCategorySectionFragmentDoc}
  ${InbaArticlesListSectionFragmentDoc}
  ${InbaReleasesSectionFragmentDoc}
  ${OrganizationalStructureSectionFragmentDoc}
  ${ProsAndConsSectionFragmentDoc}
  ${ComparisonSectionFragmentDoc}
  ${BannerSectionFragmentDoc}
  ${TimelineSectionFragmentDoc}
  ${ContactsSectionFragmentDoc}
  ${RegulationsListSectionFragmentDoc}
  ${RegulationsSectionFragmentDoc}
  ${TestimonialsSectionFragmentDoc}
  ${FaqsSectionFragmentDoc}
  ${FaqCategoriesSectionFragmentDoc}
`
export const BlogPostEntityFragmentDoc = gql`
  fragment BlogPostEntity on BlogPostEntity {
    id
    attributes {
      slug
      excerpt
      title
      updatedAt
      publishedAt
      date_added
      tag {
        data {
          attributes {
            title
            pageCategory {
              data {
                attributes {
                  title
                  color
                }
                id
              }
            }
          }
          id
        }
      }
      coverImage {
        data {
          attributes {
            url
          }
        }
      }
      moreLink {
        ...BlogPostLink
      }
      createdAt
      sections {
        ...Sections
      }
    }
  }
  ${BlogPostLinkFragmentDoc}
  ${SectionsFragmentDoc}
`
export const FooterContactItemFragmentDoc = gql`
  fragment FooterContactItem on ComponentBlocksFooterContactItem {
    label
    phone
    mail
  }
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
    address
    facebookUrl
    instagramUrl
    contacts {
      ...FooterContactItem
    }
    columns {
      ...FooterColumnBlock
    }
    accessibilityPageLink {
      ...CommonLink
    }
    innovationsLink {
      ...CommonLink
    }
  }
  ${FooterContactItemFragmentDoc}
  ${FooterColumnBlockFragmentDoc}
  ${CommonLinkFragmentDoc}
`
export const PageForMenuEntityFragmentDoc = gql`
  fragment PageForMenuEntity on PageEntity {
    id
    attributes {
      title
      slug
    }
  }
`
export const MenuLinkFragmentDoc = gql`
  fragment MenuLink on ComponentMenuMenuLink {
    id
    label
    page {
      data {
        ...PageForMenuEntity
      }
    }
    url
  }
  ${PageForMenuEntityFragmentDoc}
`
export const MenuSectionFragmentDoc = gql`
  fragment MenuSection on ComponentMenuMenuSection {
    id
    label
    icon
    page {
      data {
        ...PageForMenuEntity
      }
    }
    links {
      ...MenuLink
    }
  }
  ${PageForMenuEntityFragmentDoc}
  ${MenuLinkFragmentDoc}
`
export const MenuItemFragmentDoc = gql`
  fragment MenuItem on ComponentMenuMenuItem {
    id
    label
    icon
    page {
      data {
        ...PageForMenuEntity
      }
    }
    sections {
      ...MenuSection
    }
  }
  ${PageForMenuEntityFragmentDoc}
  ${MenuSectionFragmentDoc}
`
export const HeaderLinkFragmentDoc = gql`
  fragment HeaderLink on ComponentGeneralHeaderLink {
    label
    page {
      data {
        id
        attributes {
          title
          slug
        }
      }
    }
    url
    showOnDesktop
    showOnMobile
    icon
  }
`
export const GeneralPageRelationFragmentDoc = gql`
  fragment GeneralPageRelation on PageEntity {
    id
    attributes {
      title
      slug
    }
  }
`
export const ParentPageFragmentDoc = gql`
  fragment ParentPage on Page {
    slug
    locale
    title
  }
`
export const PageParentPagesFragmentDoc = gql`
  fragment PageParentPages on PageEntity {
    attributes {
      ...ParentPage
      parentPage {
        data {
          attributes {
            ...ParentPage
            parentPage {
              data {
                attributes {
                  ...ParentPage
                  parentPage {
                    data {
                      attributes {
                        ...ParentPage
                        parentPage {
                          data {
                            attributes {
                              ...ParentPage
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
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
      data {
        ...GeneralPageRelation
        ...PageParentPages
      }
    }
    officialBoardPage {
      data {
        ...GeneralPageRelation
      }
    }
    privacyPolicyPage {
      data {
        ...GeneralPageRelation
      }
    }
    vznPage {
      data {
        ...GeneralPageRelation
      }
    }
    inbaPage {
      data {
        ...GeneralPageRelation
      }
    }
    inbaReleasesPage {
      data {
        ...GeneralPageRelation
      }
    }
  }
  ${HeaderLinkFragmentDoc}
  ${CommonLinkFragmentDoc}
  ${GeneralPageRelationFragmentDoc}
  ${PageParentPagesFragmentDoc}
`
export const AlertFragmentDoc = gql`
  fragment Alert on Alert {
    updatedAt
    text
  }
`
export const HomepageHighlightsItemFragmentDoc = gql`
  fragment HomepageHighlightsItem on ComponentBlocksHomepageHighlightsItem {
    id
    link {
      ...CommonLink
    }
    image {
      data {
        ...UploadImageSrcEntity
      }
    }
  }
  ${CommonLinkFragmentDoc}
  ${UploadImageSrcEntityFragmentDoc}
`
export const LatestBlogPostEntityFragmentDoc = gql`
  fragment LatestBlogPostEntity on BlogPostEntity {
    id
    attributes {
      slug
      title
      excerpt
      coverImage {
        data {
          attributes {
            url
          }
        }
      }
      date_added
      publishedAt
      updatedAt
      tag {
        data {
          attributes {
            title
            pageCategory {
              data {
                attributes {
                  title
                  color
                }
              }
            }
          }
        }
      }
    }
  }
`
export const HomepageTabsFragmentDoc = gql`
  fragment HomepageTabs on ComponentSectionsHomepageTabs {
    leftNewsItem {
      data {
        ...LatestBlogPostEntity
      }
    }
    rightNewsItem {
      data {
        ...LatestBlogPostEntity
      }
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
  ${LatestBlogPostEntityFragmentDoc}
  ${CommonLinkFragmentDoc}
`
export const HomepageMayorAndCouncilFragmentDoc = gql`
  fragment HomepageMayorAndCouncil on ComponentSectionsHomepageMayorAndCouncil {
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
  }
`
export const HomepageBookmarkFragmentDoc = gql`
  fragment HomepageBookmark on ComponentBlocksHomepageBookmark {
    title
    headline
    text
    link {
      title
      href
    }
    picture {
      data {
        attributes {
          url
        }
      }
    }
    variant
  }
`
export const HomepageEntityFragmentDoc = gql`
  fragment HomepageEntity on HomepageEntity {
    id
    attributes {
      updatedAt
      createdAt
      metaTitle
      metaDescription
      welcomeHeadline
      welcomeMedia {
        data {
          ...UploadImageSrcEntity
        }
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
        ...HomepageMayorAndCouncil
      }
      eventsSection {
        title
        text
        eventsPageLink {
          ...CommonLink
        }
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
      inbaFrontImage {
        data {
          ...UploadImageSrcEntity
        }
      }
      inbaRearImage {
        data {
          ...UploadImageSrcEntity
        }
      }
      inbaUrl
      cards {
        ...HomepageBookmark
      }
      bookmarkTourists {
        ...HomepageBookmark
      }
      bookmarkUkraine {
        ...HomepageBookmark
      }
    }
  }
  ${UploadImageSrcEntityFragmentDoc}
  ${HomepageHighlightsItemFragmentDoc}
  ${HomepageTabsFragmentDoc}
  ${HomepageMayorAndCouncilFragmentDoc}
  ${CommonLinkFragmentDoc}
  ${TopServicesItemFragmentDoc}
  ${HomepageInbaFragmentDoc}
  ${HomepageBookmarkFragmentDoc}
`
export const InbaReleaseEntityFragmentDoc = gql`
  fragment InbaReleaseEntity on InbaReleaseEntity {
    id
    attributes {
      title
      slug
      perex
      releaseDate
      coverImage {
        data {
          ...UploadImageEntity
        }
      }
      rearImage {
        data {
          ...UploadImageEntity
        }
      }
      files {
        title
        media {
          data {
            ...UploadFileEntity
          }
        }
      }
    }
  }
  ${UploadImageEntityFragmentDoc}
  ${UploadFileEntityFragmentDoc}
`
export const LocalizationFragmentDoc = gql`
  fragment Localization on PageRelationResponseCollection {
    data {
      attributes {
        slug
        locale
      }
    }
  }
`
export const SubpageListPageHeaderSectionFragmentDoc = gql`
  fragment SubpageListPageHeaderSection on ComponentSectionsSubpageList {
    id
    subpageList(pagination: { limit: -1 }) {
      ...PageLinkBlock
    }
  }
  ${PageLinkBlockFragmentDoc}
`
export const PageHeaderSectionsFragmentDoc = gql`
  fragment PageHeaderSections on PagePageHeaderSectionsDynamicZone {
    __typename
    ... on ComponentSectionsSubpageList {
      ...SubpageListPageHeaderSection
    }
  }
  ${SubpageListPageHeaderSectionFragmentDoc}
`
export const PageCategoryEntityFragmentDoc = gql`
  fragment PageCategoryEntity on PageCategoryEntity {
    id
    attributes {
      title
      color
    }
  }
`
export const TagEntityFragmentDoc = gql`
  fragment TagEntity on TagEntity {
    id
    attributes {
      title
      pageCategory {
        data {
          ...PageCategoryEntity
        }
      }
    }
  }
  ${PageCategoryEntityFragmentDoc}
`
export const PageEntityFragmentDoc = gql`
  fragment PageEntity on PageEntity {
    id
    attributes {
      slug
      title
      subtext
      pageColor
      metaDiscription
      keywords
      pageBackgroundImage {
        data {
          ...UploadImageSrcEntity
        }
      }
      headerLinks {
        ...CommonLink
      }
      sections {
        ...Sections
      }
      locale
      localizations {
        ...Localization
      }
      pageHeaderSections {
        ...PageHeaderSections
      }
      pageCategory {
        data {
          id
          attributes {
            title
            color
          }
        }
      }
      relatedContents {
        data {
          ...TagEntity
        }
      }
    }
    ...PageParentPages
  }
  ${UploadImageSrcEntityFragmentDoc}
  ${CommonLinkFragmentDoc}
  ${SectionsFragmentDoc}
  ${LocalizationFragmentDoc}
  ${PageHeaderSectionsFragmentDoc}
  ${TagEntityFragmentDoc}
  ${PageParentPagesFragmentDoc}
`
export const BlogPostBySlugDocument = gql`
  query BlogPostBySlug($slug: String!, $locale: I18NLocaleCode!) {
    blogPosts(filters: { slug: { eq: $slug } }, locale: $locale) {
      data {
        ...BlogPostEntity
      }
    }
  }
  ${BlogPostEntityFragmentDoc}
`
export const LatestPostsByTagsDocument = gql`
  query LatestPostsByTags(
    $locale: I18NLocaleCode!
    $tags: [String]!
    $limit: Int = -1
    $start: Int = 0
  ) {
    blogPosts(
      locale: $locale
      filters: { tag: { title: { in: $tags } } }
      pagination: { limit: $limit, start: $start }
      sort: "publishedAt:desc"
    ) {
      data {
        ...BlogPostEntity
      }
    }
  }
  ${BlogPostEntityFragmentDoc}
`
export const BlogPostsStaticPathsDocument = gql`
  query BlogPostsStaticPaths {
    blogPosts(locale: "all", sort: "publishedAt:desc") {
      data {
        id
        attributes {
          slug
          locale
        }
      }
    }
  }
`
export const BlogPostsRssFeedDocument = gql`
  query BlogPostsRssFeed($locale: I18NLocaleCode!) {
    blogPosts(locale: $locale, sort: "publishedAt:desc") {
      data {
        id
        attributes {
          slug
          title
          publishedAt
          date_added
          excerpt
          tag {
            data {
              attributes {
                title
                pageCategory {
                  data {
                    attributes {
                      title
                    }
                  }
                }
              }
            }
          }
          coverImage {
            data {
              attributes {
                url
                mime
                size
              }
            }
          }
        }
      }
    }
  }
`
export const LatestBlogsWithTagsDocument = gql`
  query LatestBlogsWithTags(
    $sort: [String]
    $limit: Int
    $start: Int
    $filters: BlogPostFiltersInput
    $locale: I18NLocaleCode
  ) {
    blogPosts(
      sort: $sort
      pagination: { limit: $limit, start: $start }
      filters: $filters
      locale: $locale
    ) {
      data {
        ...LatestBlogPostEntity
      }
    }
  }
  ${LatestBlogPostEntityFragmentDoc}
`
export const TotalPostsCountDocument = gql`
  query TotalPostsCount($where: BlogPostFiltersInput, $limit: Int, $locale: I18NLocaleCode) {
    blogPosts(filters: $where, pagination: { limit: $limit }, locale: $locale) {
      meta {
        pagination {
          total
          pageCount
        }
      }
    }
  }
`
export const RelatedTagsDocument = gql`
  query RelatedTags($where: TagFiltersInput) {
    tags(pagination: { limit: -1 }, filters: $where) {
      data {
        attributes {
          title
          pageCategory {
            data {
              attributes {
                title
                color
              }
            }
          }
        }
      }
    }
  }
`
export const PageCategoriesDocument = gql`
  query pageCategories($locale: I18NLocaleCode) {
    pageCategories(pagination: { limit: -1 }, locale: $locale) {
      data {
        ...PageCategoryEntity
      }
    }
  }
  ${PageCategoryEntityFragmentDoc}
`
export const BlogPostsTagsDocument = gql`
  query blogPostsTags($locale: I18NLocaleCode) {
    tags(pagination: { limit: -1 }, locale: $locale) {
      data {
        ...TagEntity
      }
    }
  }
  ${TagEntityFragmentDoc}
`
export const GeneralDocument = gql`
  query General($locale: I18NLocaleCode!) {
    general(locale: $locale) {
      data {
        attributes {
          ...General
        }
      }
    }
    menu(locale: $locale) {
      data {
        attributes {
          menus {
            ...MenuItem
          }
        }
      }
    }
    footer(locale: $locale) {
      data {
        attributes {
          ...Footer
        }
      }
    }
    alert(locale: $locale) {
      data {
        attributes {
          ...Alert
        }
      }
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
      data {
        attributes {
          ...Alert
        }
      }
    }
  }
  ${AlertFragmentDoc}
`
export const HomepageDocument = gql`
  query Homepage($locale: I18NLocaleCode!) {
    homepage(locale: $locale) {
      data {
        ...HomepageEntity
      }
    }
  }
  ${HomepageEntityFragmentDoc}
`
export const InbaArticleBySlugDocument = gql`
  query InbaArticleBySlug($slug: String!, $locale: I18NLocaleCode!) {
    inbaArticles(filters: { slug: { eq: $slug } }, locale: $locale) {
      data {
        ...InbaArticleEntity
      }
    }
  }
  ${InbaArticleEntityFragmentDoc}
`
export const InbaArticlesStaticPathsDocument = gql`
  query InbaArticlesStaticPaths {
    inbaArticles(locale: "all", sort: "publishedAt:desc") {
      data {
        id
        attributes {
          slug
          locale
        }
      }
    }
  }
`
export const InbaArticlesRssFeedDocument = gql`
  query InbaArticlesRssFeed($locale: I18NLocaleCode!) {
    inbaArticles(locale: $locale, sort: "publishedAt:desc") {
      data {
        id
        attributes {
          title
          slug
          perex
          publishedAt
          coverImage {
            data {
              attributes {
                url
              }
            }
          }
          inbaTag {
            data {
              id
              attributes {
                title
              }
            }
          }
          content
        }
      }
    }
  }
`
export const InbaTagsDocument = gql`
  query InbaTags($locale: I18NLocaleCode!) {
    inbaTags(locale: $locale) {
      data {
        ...InbaTagEntity
      }
    }
  }
  ${InbaTagEntityFragmentDoc}
`
export const InbaReleaseBySlugDocument = gql`
  query InbaReleaseBySlug($slug: String!) {
    inbaReleases(filters: { slug: { eq: $slug } }) {
      data {
        ...InbaReleaseEntity
      }
    }
  }
  ${InbaReleaseEntityFragmentDoc}
`
export const InbaReleasesStaticPathsDocument = gql`
  query InbaReleasesStaticPaths {
    inbaReleases(sort: "releaseDate:desc") {
      data {
        id
        attributes {
          slug
        }
      }
    }
  }
`
export const InbaReleasesRssFeedDocument = gql`
  query InbaReleasesRssFeed {
    inbaReleases(sort: "releaseDate:desc", pagination: { limit: -1 }) {
      data {
        id
        attributes {
          title
          slug
          perex
          publishedAt
          coverImage {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`
export const InbaReleasesPaginatedDocument = gql`
  query InbaReleasesPaginated($page: Int, $pageSize: Int) {
    inbaReleases(sort: "releaseDate:desc", pagination: { page: $page, pageSize: $pageSize }) {
      data {
        ...InbaReleaseEntity
      }
    }
  }
  ${InbaReleaseEntityFragmentDoc}
`
export const PagesStaticPathsDocument = gql`
  query PagesStaticPaths {
    pages(pagination: { limit: -1 }) {
      data {
        id
        attributes {
          slug
        }
      }
    }
  }
`
export const PageBySlugDocument = gql`
  query PageBySlug($slug: String!, $locale: I18NLocaleCode!) {
    pages(filters: { slug: { eq: $slug } }, locale: $locale) {
      data {
        ...PageEntity
      }
    }
  }
  ${PageEntityFragmentDoc}
`
export const AllRegulationsDocument = gql`
  query allRegulations {
    regulations(pagination: { limit: -1 }) {
      data {
        ...RegulationEntity
      }
    }
  }
  ${RegulationEntityFragmentDoc}
`
export const RegulationsStaticPathsDocument = gql`
  query RegulationsStaticPaths {
    regulations(sort: "updatedAt:desc", pagination: { limit: 30 }) {
      data {
        id
        attributes {
          slug
        }
      }
    }
  }
`
export const RegulationByIdDocument = gql`
  query RegulationById($id: ID!) {
    regulation(id: $id) {
      data {
        ...RegulationEntity
      }
    }
  }
  ${RegulationEntityFragmentDoc}
`
export const RegulationBySlugDocument = gql`
  query RegulationBySlug($slug: String) {
    regulations(filters: { slug: { eq: $slug } }) {
      data {
        ...RegulationEntity
      }
    }
  }
  ${RegulationEntityFragmentDoc}
`
export const RegulationByYearDocument = gql`
  query RegulationByYear($year: String) {
    regulations(filters: { slug: { endsWith: $year } }) {
      data {
        ...RegulationEntity
      }
    }
  }
  ${RegulationEntityFragmentDoc}
`
export const SetFullTitleToRegulationDocument = gql`
  mutation setFullTitleToRegulation($regulationId: ID!, $fullTitle: String) {
    updateRegulation(id: $regulationId, data: { fullTitle: $fullTitle }) {
      data {
        id
      }
    }
  }
`
export const SetCancellationToRegulationDocument = gql`
  mutation setCancellationToRegulation($regulationId: ID!, $cancellationId: ID!) {
    updateRegulation(id: $regulationId, data: { cancellation: $cancellationId }) {
      data {
        id
      }
    }
  }
`
export const SetAmendmentsToRegulationDocument = gql`
  mutation setAmendmentsToRegulation($regulationId: ID!, $amendmentsIds: [ID!]) {
    updateRegulation(id: $regulationId, data: { amendments: $amendmentsIds }) {
      data {
        id
      }
    }
  }
`
export const DeleteRegulationByIdDocument = gql`
  mutation deleteRegulationById($id: ID!) {
    deleteRegulation(id: $id) {
      data {
        id
      }
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
      data {
        id
        attributes {
          regNumber
        }
      }
    }
  }
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
    BlogPostBySlug(
      variables: BlogPostBySlugQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<BlogPostBySlugQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<BlogPostBySlugQuery>(BlogPostBySlugDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'BlogPostBySlug',
        'query',
        variables,
      )
    },
    LatestPostsByTags(
      variables: LatestPostsByTagsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<LatestPostsByTagsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<LatestPostsByTagsQuery>(LatestPostsByTagsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'LatestPostsByTags',
        'query',
        variables,
      )
    },
    BlogPostsStaticPaths(
      variables?: BlogPostsStaticPathsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<BlogPostsStaticPathsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<BlogPostsStaticPathsQuery>(BlogPostsStaticPathsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'BlogPostsStaticPaths',
        'query',
        variables,
      )
    },
    BlogPostsRssFeed(
      variables: BlogPostsRssFeedQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<BlogPostsRssFeedQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<BlogPostsRssFeedQuery>(BlogPostsRssFeedDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'BlogPostsRssFeed',
        'query',
        variables,
      )
    },
    LatestBlogsWithTags(
      variables?: LatestBlogsWithTagsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<LatestBlogsWithTagsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<LatestBlogsWithTagsQuery>(LatestBlogsWithTagsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'LatestBlogsWithTags',
        'query',
        variables,
      )
    },
    TotalPostsCount(
      variables?: TotalPostsCountQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<TotalPostsCountQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<TotalPostsCountQuery>(TotalPostsCountDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'TotalPostsCount',
        'query',
        variables,
      )
    },
    RelatedTags(
      variables?: RelatedTagsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<RelatedTagsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<RelatedTagsQuery>(RelatedTagsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'RelatedTags',
        'query',
        variables,
      )
    },
    pageCategories(
      variables?: PageCategoriesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<PageCategoriesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<PageCategoriesQuery>(PageCategoriesDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'pageCategories',
        'query',
        variables,
      )
    },
    blogPostsTags(
      variables?: BlogPostsTagsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<BlogPostsTagsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<BlogPostsTagsQuery>(BlogPostsTagsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'blogPostsTags',
        'query',
        variables,
      )
    },
    General(
      variables: GeneralQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<GeneralQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GeneralQuery>(GeneralDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'General',
        'query',
        variables,
      )
    },
    Alert(
      variables: AlertQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<AlertQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AlertQuery>(AlertDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'Alert',
        'query',
        variables,
      )
    },
    Homepage(
      variables: HomepageQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<HomepageQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<HomepageQuery>(HomepageDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'Homepage',
        'query',
        variables,
      )
    },
    InbaArticleBySlug(
      variables: InbaArticleBySlugQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<InbaArticleBySlugQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<InbaArticleBySlugQuery>(InbaArticleBySlugDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'InbaArticleBySlug',
        'query',
        variables,
      )
    },
    InbaArticlesStaticPaths(
      variables?: InbaArticlesStaticPathsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<InbaArticlesStaticPathsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<InbaArticlesStaticPathsQuery>(InbaArticlesStaticPathsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'InbaArticlesStaticPaths',
        'query',
        variables,
      )
    },
    InbaArticlesRssFeed(
      variables: InbaArticlesRssFeedQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<InbaArticlesRssFeedQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<InbaArticlesRssFeedQuery>(InbaArticlesRssFeedDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'InbaArticlesRssFeed',
        'query',
        variables,
      )
    },
    InbaTags(
      variables: InbaTagsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<InbaTagsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<InbaTagsQuery>(InbaTagsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'InbaTags',
        'query',
        variables,
      )
    },
    InbaReleaseBySlug(
      variables: InbaReleaseBySlugQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<InbaReleaseBySlugQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<InbaReleaseBySlugQuery>(InbaReleaseBySlugDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'InbaReleaseBySlug',
        'query',
        variables,
      )
    },
    InbaReleasesStaticPaths(
      variables?: InbaReleasesStaticPathsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<InbaReleasesStaticPathsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<InbaReleasesStaticPathsQuery>(InbaReleasesStaticPathsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'InbaReleasesStaticPaths',
        'query',
        variables,
      )
    },
    InbaReleasesRssFeed(
      variables?: InbaReleasesRssFeedQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<InbaReleasesRssFeedQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<InbaReleasesRssFeedQuery>(InbaReleasesRssFeedDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'InbaReleasesRssFeed',
        'query',
        variables,
      )
    },
    InbaReleasesPaginated(
      variables?: InbaReleasesPaginatedQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<InbaReleasesPaginatedQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<InbaReleasesPaginatedQuery>(InbaReleasesPaginatedDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'InbaReleasesPaginated',
        'query',
        variables,
      )
    },
    PagesStaticPaths(
      variables?: PagesStaticPathsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<PagesStaticPathsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<PagesStaticPathsQuery>(PagesStaticPathsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'PagesStaticPaths',
        'query',
        variables,
      )
    },
    PageBySlug(
      variables: PageBySlugQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<PageBySlugQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<PageBySlugQuery>(PageBySlugDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'PageBySlug',
        'query',
        variables,
      )
    },
    allRegulations(
      variables?: AllRegulationsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<AllRegulationsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AllRegulationsQuery>(AllRegulationsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'allRegulations',
        'query',
        variables,
      )
    },
    RegulationsStaticPaths(
      variables?: RegulationsStaticPathsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<RegulationsStaticPathsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<RegulationsStaticPathsQuery>(RegulationsStaticPathsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'RegulationsStaticPaths',
        'query',
        variables,
      )
    },
    RegulationById(
      variables: RegulationByIdQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<RegulationByIdQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<RegulationByIdQuery>(RegulationByIdDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'RegulationById',
        'query',
        variables,
      )
    },
    RegulationBySlug(
      variables?: RegulationBySlugQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<RegulationBySlugQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<RegulationBySlugQuery>(RegulationBySlugDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'RegulationBySlug',
        'query',
        variables,
      )
    },
    RegulationByYear(
      variables?: RegulationByYearQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<RegulationByYearQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<RegulationByYearQuery>(RegulationByYearDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'RegulationByYear',
        'query',
        variables,
      )
    },
    setFullTitleToRegulation(
      variables: SetFullTitleToRegulationMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<SetFullTitleToRegulationMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<SetFullTitleToRegulationMutation>(
            SetFullTitleToRegulationDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'setFullTitleToRegulation',
        'mutation',
        variables,
      )
    },
    setCancellationToRegulation(
      variables: SetCancellationToRegulationMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<SetCancellationToRegulationMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<SetCancellationToRegulationMutation>(
            SetCancellationToRegulationDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'setCancellationToRegulation',
        'mutation',
        variables,
      )
    },
    setAmendmentsToRegulation(
      variables: SetAmendmentsToRegulationMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<SetAmendmentsToRegulationMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<SetAmendmentsToRegulationMutation>(
            SetAmendmentsToRegulationDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'setAmendmentsToRegulation',
        'mutation',
        variables,
      )
    },
    deleteRegulationById(
      variables: DeleteRegulationByIdMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<DeleteRegulationByIdMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteRegulationByIdMutation>(DeleteRegulationByIdDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'deleteRegulationById',
        'mutation',
        variables,
      )
    },
    createBareRegulation(
      variables: CreateBareRegulationMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<CreateBareRegulationMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateBareRegulationMutation>(CreateBareRegulationDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'createBareRegulation',
        'mutation',
        variables,
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
