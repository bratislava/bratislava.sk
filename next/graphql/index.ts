import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Input type for dynamic zone sections of BlogPost */
  BlogPostSectionsDynamicZoneInput: any;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** Input type for dynamic zone Inputs of Form */
  FormInputsDynamicZoneInput: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `Long` scalar type represents 52-bit integers */
  Long: any;
  /** Input type for dynamic zone pageHeaderSections of Page */
  PagePageHeaderSectionsDynamicZoneInput: any;
  /** Input type for dynamic zone sections of Page */
  PageSectionsDynamicZoneInput: any;
  /** A time string with format: HH:mm:ss.SSS */
  Time: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AdminUser = {
  __typename?: 'AdminUser';
  firstname: Scalars['String'];
  id: Scalars['ID'];
  lastname: Scalars['String'];
  username?: Maybe<Scalars['String']>;
};

export type AudienceInput = {
  created_by?: InputMaybe<Scalars['ID']>;
  key?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  updated_by?: InputMaybe<Scalars['ID']>;
};

export type Author = {
  __typename?: 'Author';
  created_at: Scalars['DateTime'];
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  picture?: Maybe<UploadFile>;
  published_at?: Maybe<Scalars['DateTime']>;
  updated_at: Scalars['DateTime'];
};

export type AuthorAggregator = {
  __typename?: 'AuthorAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type AuthorConnection = {
  __typename?: 'AuthorConnection';
  aggregate?: Maybe<AuthorAggregator>;
  groupBy?: Maybe<AuthorGroupBy>;
  values?: Maybe<Array<Maybe<Author>>>;
};

export type AuthorConnectionCreated_At = {
  __typename?: 'AuthorConnectionCreated_at';
  connection?: Maybe<AuthorConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type AuthorConnectionId = {
  __typename?: 'AuthorConnectionId';
  connection?: Maybe<AuthorConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type AuthorConnectionName = {
  __typename?: 'AuthorConnectionName';
  connection?: Maybe<AuthorConnection>;
  key?: Maybe<Scalars['String']>;
};

export type AuthorConnectionPicture = {
  __typename?: 'AuthorConnectionPicture';
  connection?: Maybe<AuthorConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type AuthorConnectionPublished_At = {
  __typename?: 'AuthorConnectionPublished_at';
  connection?: Maybe<AuthorConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type AuthorConnectionUpdated_At = {
  __typename?: 'AuthorConnectionUpdated_at';
  connection?: Maybe<AuthorConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type AuthorGroupBy = {
  __typename?: 'AuthorGroupBy';
  created_at?: Maybe<Array<Maybe<AuthorConnectionCreated_At>>>;
  id?: Maybe<Array<Maybe<AuthorConnectionId>>>;
  name?: Maybe<Array<Maybe<AuthorConnectionName>>>;
  picture?: Maybe<Array<Maybe<AuthorConnectionPicture>>>;
  published_at?: Maybe<Array<Maybe<AuthorConnectionPublished_At>>>;
  updated_at?: Maybe<Array<Maybe<AuthorConnectionUpdated_At>>>;
};

export type AuthorInput = {
  created_by?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  picture?: InputMaybe<Scalars['ID']>;
  published_at?: InputMaybe<Scalars['DateTime']>;
  updated_by?: InputMaybe<Scalars['ID']>;
};

export type BlogPost = {
  __typename?: 'BlogPost';
  author?: Maybe<UsersPermissionsUser>;
  coverImage?: Maybe<UploadFile>;
  created_at: Scalars['DateTime'];
  date_added?: Maybe<Scalars['DateTime']>;
  excerpt?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<Array<Maybe<BlogPost>>>;
  moreLink?: Maybe<ComponentBlocksBlogPostLink>;
  published_at?: Maybe<Scalars['DateTime']>;
  sections?: Maybe<Array<Maybe<BlogPostSectionsDynamicZone>>>;
  slug?: Maybe<Scalars['String']>;
  tag?: Maybe<Tag>;
  title?: Maybe<Scalars['String']>;
  updated_at: Scalars['DateTime'];
};

export type BlogPostLocalizationsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type BlogPostAggregator = {
  __typename?: 'BlogPostAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type BlogPostConnection = {
  __typename?: 'BlogPostConnection';
  aggregate?: Maybe<BlogPostAggregator>;
  groupBy?: Maybe<BlogPostGroupBy>;
  values?: Maybe<Array<Maybe<BlogPost>>>;
};

export type BlogPostConnectionAuthor = {
  __typename?: 'BlogPostConnectionAuthor';
  connection?: Maybe<BlogPostConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type BlogPostConnectionCoverImage = {
  __typename?: 'BlogPostConnectionCoverImage';
  connection?: Maybe<BlogPostConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type BlogPostConnectionCreated_At = {
  __typename?: 'BlogPostConnectionCreated_at';
  connection?: Maybe<BlogPostConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type BlogPostConnectionDate_Added = {
  __typename?: 'BlogPostConnectionDate_added';
  connection?: Maybe<BlogPostConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type BlogPostConnectionExcerpt = {
  __typename?: 'BlogPostConnectionExcerpt';
  connection?: Maybe<BlogPostConnection>;
  key?: Maybe<Scalars['String']>;
};

export type BlogPostConnectionId = {
  __typename?: 'BlogPostConnectionId';
  connection?: Maybe<BlogPostConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type BlogPostConnectionLocale = {
  __typename?: 'BlogPostConnectionLocale';
  connection?: Maybe<BlogPostConnection>;
  key?: Maybe<Scalars['String']>;
};

export type BlogPostConnectionMoreLink = {
  __typename?: 'BlogPostConnectionMoreLink';
  connection?: Maybe<BlogPostConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type BlogPostConnectionPublished_At = {
  __typename?: 'BlogPostConnectionPublished_at';
  connection?: Maybe<BlogPostConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type BlogPostConnectionSlug = {
  __typename?: 'BlogPostConnectionSlug';
  connection?: Maybe<BlogPostConnection>;
  key?: Maybe<Scalars['String']>;
};

export type BlogPostConnectionTag = {
  __typename?: 'BlogPostConnectionTag';
  connection?: Maybe<BlogPostConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type BlogPostConnectionTitle = {
  __typename?: 'BlogPostConnectionTitle';
  connection?: Maybe<BlogPostConnection>;
  key?: Maybe<Scalars['String']>;
};

export type BlogPostConnectionUpdated_At = {
  __typename?: 'BlogPostConnectionUpdated_at';
  connection?: Maybe<BlogPostConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type BlogPostGroupBy = {
  __typename?: 'BlogPostGroupBy';
  author?: Maybe<Array<Maybe<BlogPostConnectionAuthor>>>;
  coverImage?: Maybe<Array<Maybe<BlogPostConnectionCoverImage>>>;
  created_at?: Maybe<Array<Maybe<BlogPostConnectionCreated_At>>>;
  date_added?: Maybe<Array<Maybe<BlogPostConnectionDate_Added>>>;
  excerpt?: Maybe<Array<Maybe<BlogPostConnectionExcerpt>>>;
  id?: Maybe<Array<Maybe<BlogPostConnectionId>>>;
  locale?: Maybe<Array<Maybe<BlogPostConnectionLocale>>>;
  moreLink?: Maybe<Array<Maybe<BlogPostConnectionMoreLink>>>;
  published_at?: Maybe<Array<Maybe<BlogPostConnectionPublished_At>>>;
  slug?: Maybe<Array<Maybe<BlogPostConnectionSlug>>>;
  tag?: Maybe<Array<Maybe<BlogPostConnectionTag>>>;
  title?: Maybe<Array<Maybe<BlogPostConnectionTitle>>>;
  updated_at?: Maybe<Array<Maybe<BlogPostConnectionUpdated_At>>>;
};

export type BlogPostInput = {
  author?: InputMaybe<Scalars['ID']>;
  coverImage?: InputMaybe<Scalars['ID']>;
  created_by?: InputMaybe<Scalars['ID']>;
  date_added?: InputMaybe<Scalars['DateTime']>;
  excerpt?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
  localizations?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  moreLink?: InputMaybe<ComponentBlocksBlogPostLinkInput>;
  published_at?: InputMaybe<Scalars['DateTime']>;
  sections?: InputMaybe<Array<Scalars['BlogPostSectionsDynamicZoneInput']>>;
  slug?: InputMaybe<Scalars['String']>;
  tag?: InputMaybe<Scalars['ID']>;
  title?: InputMaybe<Scalars['String']>;
  updated_by?: InputMaybe<Scalars['ID']>;
};

export type BlogPostSectionsDynamicZone =
  | ComponentSectionsAccordion
  | ComponentSectionsArticlesList
  | ComponentSectionsCalculator
  | ComponentSectionsColumnedText
  | ComponentSectionsContact
  | ComponentSectionsDivider
  | ComponentSectionsFileList
  | ComponentSectionsIconTitleDesc
  | ComponentSectionsLinks
  | ComponentSectionsListItems
  | ComponentSectionsNarrowText
  | ComponentSectionsNumericalList
  | ComponentSectionsTextWithImage
  | ComponentSectionsVideos
  | ComponentSectionsWaves;

export type ComponentAccordionItemsFlatText = {
  __typename?: 'ComponentAccordionItemsFlatText';
  align?: Maybe<Enum_Componentaccordionitemsflattext_Align>;
  category?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  moreLinkPage?: Maybe<Page>;
  moreLinkTitle?: Maybe<Scalars['String']>;
  moreLinkUrl?: Maybe<Scalars['String']>;
  width?: Maybe<Enum_Componentaccordionitemsflattext_Width>;
};

export type ComponentAccordionItemsFlatTextInput = {
  align?: InputMaybe<Enum_Componentaccordionitemsflattext_Align>;
  category?: InputMaybe<Scalars['String']>;
  content?: InputMaybe<Scalars['String']>;
  moreLinkPage?: InputMaybe<Scalars['ID']>;
  moreLinkTitle?: InputMaybe<Scalars['String']>;
  moreLinkUrl?: InputMaybe<Scalars['String']>;
  width?: InputMaybe<Enum_Componentaccordionitemsflattext_Width>;
};

export type ComponentAccordionItemsInstitution = {
  __typename?: 'ComponentAccordionItemsInstitution';
  category?: Maybe<Scalars['String']>;
  firstColumn?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  secondColumn?: Maybe<Scalars['String']>;
  subtitle?: Maybe<Scalars['String']>;
  thirdColumn?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  urlLabel?: Maybe<Scalars['String']>;
};

export type ComponentAccordionItemsInstitutionInput = {
  category?: InputMaybe<Scalars['String']>;
  firstColumn?: InputMaybe<Scalars['String']>;
  secondColumn?: InputMaybe<Scalars['String']>;
  subtitle?: InputMaybe<Scalars['String']>;
  thirdColumn?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
  urlLabel?: InputMaybe<Scalars['String']>;
};

export type ComponentAccordionItemsInstitutionNarrow = {
  __typename?: 'ComponentAccordionItemsInstitutionNarrow';
  category?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  subtitle?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  urlLabel?: Maybe<Scalars['String']>;
};

export type ComponentAccordionItemsInstitutionNarrowInput = {
  category?: InputMaybe<Scalars['String']>;
  subtitle?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
  urlLabel?: InputMaybe<Scalars['String']>;
};

export type ComponentBlocksBlogPostLink = {
  __typename?: 'ComponentBlocksBlogPostLink';
  blogPost?: Maybe<BlogPost>;
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type ComponentBlocksBlogPostLinkInput = {
  blogPost?: InputMaybe<Scalars['ID']>;
  title?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
};

export type ComponentBlocksBookmarkLink = {
  __typename?: 'ComponentBlocksBookmarkLink';
  href?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};

export type ComponentBlocksBookmarkLinkInput = {
  href?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ComponentBlocksDocListExtensionInput = {
  document?: InputMaybe<Scalars['ID']>;
  title: Scalars['String'];
  validFrom?: InputMaybe<Scalars['Date']>;
};

export type ComponentBlocksDocListExtensions = {
  __typename?: 'ComponentBlocksDocListExtensions';
  document?: Maybe<UploadFile>;
  id: Scalars['ID'];
  title: Scalars['String'];
  validFrom?: Maybe<Scalars['Date']>;
};

export type ComponentBlocksFile = {
  __typename?: 'ComponentBlocksFile';
  category?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  media?: Maybe<UploadFile>;
  title?: Maybe<Scalars['String']>;
};

export type ComponentBlocksFileInput = {
  category?: InputMaybe<Scalars['String']>;
  media?: InputMaybe<Scalars['ID']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ComponentBlocksFooterSection = {
  __typename?: 'ComponentBlocksFooterSection';
  id: Scalars['ID'];
  pageLinks?: Maybe<Array<Maybe<ComponentBlocksPageLink>>>;
  title?: Maybe<Scalars['String']>;
};

export type ComponentBlocksFooterSectionInput = {
  pageLinks?: InputMaybe<Array<InputMaybe<ComponentBlocksPageLinkInput>>>;
  title?: InputMaybe<Scalars['String']>;
};

export type ComponentBlocksHeader = {
  __typename?: 'ComponentBlocksHeader';
  id: Scalars['ID'];
  picture?: Maybe<UploadFile>;
  subtitle?: Maybe<Scalars['String']>;
};

export type ComponentBlocksHeaderInput = {
  picture?: InputMaybe<Scalars['ID']>;
  subtitle?: InputMaybe<Scalars['String']>;
};

export type ComponentBlocksHomepageBookmark = {
  __typename?: 'ComponentBlocksHomepageBookmark';
  headline?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  link?: Maybe<ComponentBlocksBookmarkLink>;
  picture?: Maybe<UploadFile>;
  text?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  variant?: Maybe<Scalars['String']>;
};

export type ComponentBlocksHomepageBookmarkInput = {
  headline?: InputMaybe<Scalars['String']>;
  link?: InputMaybe<ComponentBlocksBookmarkLinkInput>;
  picture?: InputMaybe<Scalars['ID']>;
  text?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  variant?: InputMaybe<Scalars['String']>;
};

export type ComponentBlocksHomepagePost = {
  __typename?: 'ComponentBlocksHomepagePost';
  id: Scalars['ID'];
  image?: Maybe<UploadFile>;
  slug?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type ComponentBlocksHomepagePostInput = {
  image?: InputMaybe<Scalars['ID']>;
  slug?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ComponentBlocksIconWithTitleAndDescription = {
  __typename?: 'ComponentBlocksIconWithTitleAndDescription';
  desc?: Maybe<Scalars['String']>;
  icon?: Maybe<UploadFile>;
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};

export type ComponentBlocksIconWithTitleAndDescriptionInput = {
  desc?: InputMaybe<Scalars['String']>;
  icon?: InputMaybe<Scalars['ID']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ComponentBlocksInBa = {
  __typename?: 'ComponentBlocksInBa';
  content?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  images?: Maybe<ComponentBlocksInBaPictures>;
  link?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type ComponentBlocksInBaInput = {
  content?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<ComponentBlocksInBaPictureInput>;
  link?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ComponentBlocksInBaPictureInput = {
  frontImage?: InputMaybe<Scalars['ID']>;
  rearImage?: InputMaybe<Scalars['ID']>;
};

export type ComponentBlocksInBaPictures = {
  __typename?: 'ComponentBlocksInBaPictures';
  frontImage?: Maybe<UploadFile>;
  id: Scalars['ID'];
  rearImage?: Maybe<UploadFile>;
};

export type ComponentBlocksListItem = {
  __typename?: 'ComponentBlocksListItem';
  circleOption?: Maybe<Enum_Componentblockslistitem_Circleoption>;
  content?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  moreLinkPage?: Maybe<Page>;
  moreLinkTitle?: Maybe<Scalars['String']>;
  moreLinkUrl?: Maybe<Scalars['String']>;
};

export type ComponentBlocksListItemInput = {
  circleOption?: InputMaybe<Enum_Componentblockslistitem_Circleoption>;
  content?: InputMaybe<Scalars['String']>;
  moreLinkPage?: InputMaybe<Scalars['ID']>;
  moreLinkTitle?: InputMaybe<Scalars['String']>;
  moreLinkUrl?: InputMaybe<Scalars['String']>;
};

export type ComponentBlocksNumericalListItem = {
  __typename?: 'ComponentBlocksNumericalListItem';
  id: Scalars['ID'];
  text: Scalars['String'];
};

export type ComponentBlocksNumericalListItemInput = {
  text: Scalars['String'];
};

export type ComponentBlocksPageLink = {
  __typename?: 'ComponentBlocksPageLink';
  anchor?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  page?: Maybe<Page>;
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type ComponentBlocksPageLinkInput = {
  anchor?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['ID']>;
  title?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
};

export type ComponentBlocksSubpage = {
  __typename?: 'ComponentBlocksSubpage';
  id: Scalars['ID'];
  link?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type ComponentBlocksSubpageInput = {
  link?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ComponentBlocksVideo = {
  __typename?: 'ComponentBlocksVideo';
  id: Scalars['ID'];
  speaker?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type ComponentBlocksVideoInput = {
  speaker?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
};

export type ComponentSectionsAccordion = {
  __typename?: 'ComponentSectionsAccordion';
  flatText?: Maybe<Array<Maybe<ComponentAccordionItemsFlatText>>>;
  hasBackground?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  institutions?: Maybe<Array<Maybe<ComponentAccordionItemsInstitution>>>;
  institutionsNarrow?: Maybe<
    Array<Maybe<ComponentAccordionItemsInstitutionNarrow>>
  >;
  title?: Maybe<Scalars['String']>;
};

export type ComponentSectionsAccordionInput = {
  flatText?: InputMaybe<
    Array<InputMaybe<ComponentAccordionItemsFlatTextInput>>
  >;
  hasBackground?: InputMaybe<Scalars['Boolean']>;
  institutions?: InputMaybe<
    Array<InputMaybe<ComponentAccordionItemsInstitutionInput>>
  >;
  institutionsNarrow?: InputMaybe<
    Array<InputMaybe<ComponentAccordionItemsInstitutionNarrowInput>>
  >;
  title?: InputMaybe<Scalars['String']>;
};

export type ComponentSectionsArticlesList = {
  __typename?: 'ComponentSectionsArticlesList';
  category?: Maybe<PageCategory>;
  filtering?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};

export type ComponentSectionsArticlesListInput = {
  category?: InputMaybe<Scalars['ID']>;
  filtering?: InputMaybe<Scalars['Boolean']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ComponentSectionsCalculator = {
  __typename?: 'ComponentSectionsCalculator';
  another_adult_value?: Maybe<Scalars['Float']>;
  child_value?: Maybe<Scalars['Float']>;
  hasBackground?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  single_adult_value?: Maybe<Scalars['Float']>;
};

export type ComponentSectionsCalculatorInput = {
  another_adult_value?: InputMaybe<Scalars['Float']>;
  child_value?: InputMaybe<Scalars['Float']>;
  hasBackground?: InputMaybe<Scalars['Boolean']>;
  single_adult_value?: InputMaybe<Scalars['Float']>;
};

export type ComponentSectionsColumnedText = {
  __typename?: 'ComponentSectionsColumnedText';
  content?: Maybe<Scalars['String']>;
  hasBackground?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
};

export type ComponentSectionsColumnedTextInput = {
  content?: InputMaybe<Scalars['String']>;
  hasBackground?: InputMaybe<Scalars['Boolean']>;
};

export type ComponentSectionsContact = {
  __typename?: 'ComponentSectionsContact';
  address?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  emailLabel?: Maybe<Scalars['String']>;
  hasBackground?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  phone?: Maybe<Scalars['String']>;
  phoneLabel?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type ComponentSectionsContactInput = {
  address?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  emailLabel?: InputMaybe<Scalars['String']>;
  hasBackground?: InputMaybe<Scalars['Boolean']>;
  phone?: InputMaybe<Scalars['String']>;
  phoneLabel?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ComponentSectionsDivider = {
  __typename?: 'ComponentSectionsDivider';
  hasBackground?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  style?: Maybe<Enum_Componentsectionsdivider_Style>;
};

export type ComponentSectionsDividerInput = {
  hasBackground?: InputMaybe<Scalars['Boolean']>;
  style?: InputMaybe<Enum_Componentsectionsdivider_Style>;
};

export type ComponentSectionsDocumentList = {
  __typename?: 'ComponentSectionsDocumentList';
  id: Scalars['ID'];
  vzns?: Maybe<Array<Maybe<Vzn>>>;
};

export type ComponentSectionsDocumentListVznsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type ComponentSectionsDocumentListInput = {
  vzns?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type ComponentSectionsFeaturedBlogPostInput = {
  first_blog?: InputMaybe<Scalars['ID']>;
  second_blog?: InputMaybe<Scalars['ID']>;
  third_blog?: InputMaybe<Scalars['ID']>;
};

export type ComponentSectionsFeaturedBlogPosts = {
  __typename?: 'ComponentSectionsFeaturedBlogPosts';
  first_blog?: Maybe<BlogPost>;
  id: Scalars['ID'];
  second_blog?: Maybe<BlogPost>;
  third_blog?: Maybe<BlogPost>;
};

export type ComponentSectionsFileList = {
  __typename?: 'ComponentSectionsFileList';
  fileList?: Maybe<Array<Maybe<ComponentBlocksFile>>>;
  hasBackground?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
};

export type ComponentSectionsFileListInput = {
  fileList?: InputMaybe<Array<InputMaybe<ComponentBlocksFileInput>>>;
  hasBackground?: InputMaybe<Scalars['Boolean']>;
};

export type ComponentSectionsIconTitleDesc = {
  __typename?: 'ComponentSectionsIconTitleDesc';
  id: Scalars['ID'];
  list?: Maybe<Array<Maybe<ComponentBlocksIconWithTitleAndDescription>>>;
  title?: Maybe<Scalars['String']>;
};

export type ComponentSectionsIconTitleDescInput = {
  list?: InputMaybe<
    Array<InputMaybe<ComponentBlocksIconWithTitleAndDescriptionInput>>
  >;
  title?: InputMaybe<Scalars['String']>;
};

export type ComponentSectionsIframe = {
  __typename?: 'ComponentSectionsIframe';
  id: Scalars['ID'];
  iframe_allowfullscreen?: Maybe<Scalars['Boolean']>;
  iframe_frameBorder?: Maybe<Scalars['String']>;
  iframe_height?: Maybe<Scalars['Float']>;
  iframe_scrolling?: Maybe<Scalars['String']>;
  iframe_style?: Maybe<Scalars['String']>;
  iframe_url?: Maybe<Scalars['String']>;
  iframe_width?: Maybe<Scalars['Float']>;
};

export type ComponentSectionsIframeInput = {
  iframe_allowfullscreen?: InputMaybe<Scalars['Boolean']>;
  iframe_frameBorder?: InputMaybe<Scalars['String']>;
  iframe_height?: InputMaybe<Scalars['Float']>;
  iframe_scrolling?: InputMaybe<Scalars['String']>;
  iframe_style?: InputMaybe<Scalars['String']>;
  iframe_url?: InputMaybe<Scalars['String']>;
  iframe_width?: InputMaybe<Scalars['Float']>;
};

export type ComponentSectionsLinkInput = {
  hasBackground?: InputMaybe<Scalars['Boolean']>;
  pageLinks?: InputMaybe<Array<InputMaybe<ComponentBlocksPageLinkInput>>>;
  title?: InputMaybe<Scalars['String']>;
};

export type ComponentSectionsLinks = {
  __typename?: 'ComponentSectionsLinks';
  hasBackground?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  pageLinks?: Maybe<Array<Maybe<ComponentBlocksPageLink>>>;
  title?: Maybe<Scalars['String']>;
};

export type ComponentSectionsListItemInput = {
  hasBackground?: InputMaybe<Scalars['Boolean']>;
  listItems?: InputMaybe<Array<InputMaybe<ComponentBlocksListItemInput>>>;
  title?: InputMaybe<Scalars['String']>;
};

export type ComponentSectionsListItems = {
  __typename?: 'ComponentSectionsListItems';
  hasBackground?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  listItems?: Maybe<Array<Maybe<ComponentBlocksListItem>>>;
  title?: Maybe<Scalars['String']>;
};

export type ComponentSectionsNarrowText = {
  __typename?: 'ComponentSectionsNarrowText';
  align?: Maybe<Enum_Componentsectionsnarrowtext_Align>;
  content?: Maybe<Scalars['String']>;
  hasBackground?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  width?: Maybe<Enum_Componentsectionsnarrowtext_Width>;
};

export type ComponentSectionsNarrowTextInput = {
  align?: InputMaybe<Enum_Componentsectionsnarrowtext_Align>;
  content?: InputMaybe<Scalars['String']>;
  hasBackground?: InputMaybe<Scalars['Boolean']>;
  width?: InputMaybe<Enum_Componentsectionsnarrowtext_Width>;
};

export type ComponentSectionsNewsletter = {
  __typename?: 'ComponentSectionsNewsletter';
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};

export type ComponentSectionsNewsletterInput = {
  title?: InputMaybe<Scalars['String']>;
};

export type ComponentSectionsNumericalList = {
  __typename?: 'ComponentSectionsNumericalList';
  buttonLink?: Maybe<Scalars['String']>;
  buttonText?: Maybe<Scalars['String']>;
  hasBackground?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  items?: Maybe<Array<Maybe<ComponentBlocksNumericalListItem>>>;
  title?: Maybe<Scalars['String']>;
  variant?: Maybe<Enum_Componentsectionsnumericallist_Variant>;
};

export type ComponentSectionsNumericalListInput = {
  buttonLink?: InputMaybe<Scalars['String']>;
  buttonText?: InputMaybe<Scalars['String']>;
  hasBackground?: InputMaybe<Scalars['Boolean']>;
  items?: InputMaybe<Array<ComponentBlocksNumericalListItemInput>>;
  title?: InputMaybe<Scalars['String']>;
  variant?: InputMaybe<Enum_Componentsectionsnumericallist_Variant>;
};

export type ComponentSectionsSubpageList = {
  __typename?: 'ComponentSectionsSubpageList';
  hasBackground?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  subpageList?: Maybe<Array<Maybe<ComponentBlocksPageLink>>>;
};

export type ComponentSectionsSubpageListInput = {
  hasBackground?: InputMaybe<Scalars['Boolean']>;
  subpageList?: InputMaybe<Array<InputMaybe<ComponentBlocksPageLinkInput>>>;
};

export type ComponentSectionsTextWithImage = {
  __typename?: 'ComponentSectionsTextWithImage';
  content?: Maybe<Scalars['String']>;
  hasBackground?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  imagePosition?: Maybe<Enum_Componentsectionstextwithimage_Imageposition>;
  imageShadow?: Maybe<Scalars['Boolean']>;
  imageSrc?: Maybe<UploadFile>;
};

export type ComponentSectionsTextWithImageInput = {
  content?: InputMaybe<Scalars['String']>;
  hasBackground?: InputMaybe<Scalars['Boolean']>;
  imagePosition?: InputMaybe<Enum_Componentsectionstextwithimage_Imageposition>;
  imageShadow?: InputMaybe<Scalars['Boolean']>;
  imageSrc?: InputMaybe<Scalars['ID']>;
};

export type ComponentSectionsVideoInput = {
  subtitle?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  videos?: InputMaybe<Array<InputMaybe<ComponentBlocksVideoInput>>>;
};

export type ComponentSectionsVideos = {
  __typename?: 'ComponentSectionsVideos';
  id: Scalars['ID'];
  subtitle?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  videos?: Maybe<Array<Maybe<ComponentBlocksVideo>>>;
};

export type ComponentSectionsWaveInput = {
  isRich?: InputMaybe<Scalars['Boolean']>;
  position?: InputMaybe<Enum_Componentsectionswaves_Position>;
};

export type ComponentSectionsWaves = {
  __typename?: 'ComponentSectionsWaves';
  id: Scalars['ID'];
  isRich?: Maybe<Scalars['Boolean']>;
  position?: Maybe<Enum_Componentsectionswaves_Position>;
};

export type ContentTypes = {
  __typename?: 'ContentTypes';
  available: Scalars['Boolean'];
  collectionName: Scalars['String'];
  contentTypeName: Scalars['String'];
  endpoint: Scalars['String'];
  isSingle: Scalars['Boolean'];
  label: Scalars['String'];
  labelSingular: Scalars['String'];
  name: Scalars['String'];
  relatedField: Scalars['String'];
  uid: Scalars['String'];
  visible: Scalars['Boolean'];
};

export type ContentTypesNameFields = {
  __typename?: 'ContentTypesNameFields';
  default: Array<Scalars['String']>;
};

export type CreateNavigation = {
  items: Array<InputMaybe<CreateNavigationItem>>;
  name: Scalars['String'];
};

export type CreateNavigationItem = {
  audience?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  externalPath?: InputMaybe<Scalars['String']>;
  items?: InputMaybe<Array<InputMaybe<CreateNavigationItem>>>;
  master?: InputMaybe<Scalars['Int']>;
  menuAttached: Scalars['Boolean'];
  order: Scalars['Int'];
  parent?: InputMaybe<Scalars['Int']>;
  path?: InputMaybe<Scalars['String']>;
  related?: InputMaybe<CreateNavigationRelated>;
  title: Scalars['String'];
  type: Scalars['String'];
  uiRouterKey: Scalars['String'];
};

export type CreateNavigationRelated = {
  field: Scalars['String'];
  ref: Scalars['String'];
  refId: Scalars['String'];
};

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

export enum Enum_Componentblockslistitem_Circleoption {
  Primary = 'primary',
  Secondary = 'secondary',
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

export enum Enum_Componentsectionstextwithimage_Imageposition {
  Left = 'left',
  Right = 'right',
}

export enum Enum_Componentsectionswaves_Position {
  Bottom = 'bottom',
  Top = 'top',
}

export enum Enum_Navigationnavigationitem_Type {
  External = 'EXTERNAL',
  Internal = 'INTERNAL',
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

export enum Enum_Pagecategory_Iconhover {
  DopravaMapyColor_02 = 'doprava_mapy_color_02',
  KulturaColor_06 = 'kultura_color_06',
  MestoColor_01 = 'mesto_color_01',
  SocialnaPomocColor_04 = 'socialna_pomoc_color_04',
  VzdelavanieColor_05 = 'vzdelavanie_color_05',
  ZpVystavbaColor_03 = 'zp_vystavba_color_03',
}

export enum Enum_Pagesubcategory_Icon {
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

export enum Enum_Page_Pagecolor {
  Blue = 'blue',
  Brown = 'brown',
  Green = 'green',
  Purple = 'purple',
  Red = 'red',
  Yellow = 'yellow',
}

export enum Enum_Vzn_Category {
  Archiv = 'archiv',
  DaneAPoplatky = 'daneAPoplatky',
  Hospodarenie = 'hospodarenie',
  Ostatne = 'ostatne',
  PomenovanieUlic = 'pomenovanieUlic',
  PoriadokACistota = 'poriadokACistota',
  SocialnaPomocASkolstvo = 'socialnaPomocASkolstvo',
  UzemnePlanovanie = 'uzemnePlanovanie',
}

export type EmailDesignerEmailTemplate = {
  __typename?: 'EmailDesignerEmailTemplate';
  bodyHtml?: Maybe<Scalars['String']>;
  bodyText?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  design?: Maybe<Scalars['JSON']>;
  enabled?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  sourceCodeToTemplateId?: Maybe<Scalars['Int']>;
  subject?: Maybe<Scalars['String']>;
  tags?: Maybe<Scalars['JSON']>;
  updated_at: Scalars['DateTime'];
};

export type EmailTemplateInput = {
  bodyHtml?: InputMaybe<Scalars['String']>;
  bodyText?: InputMaybe<Scalars['String']>;
  created_by?: InputMaybe<Scalars['ID']>;
  design?: InputMaybe<Scalars['JSON']>;
  enabled?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  sourceCodeToTemplateId?: InputMaybe<Scalars['Int']>;
  subject?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Scalars['JSON']>;
  updated_by?: InputMaybe<Scalars['ID']>;
};

export type FileInfoInput = {
  alternativeText?: InputMaybe<Scalars['String']>;
  caption?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type FileInput = {
  alternativeText?: InputMaybe<Scalars['String']>;
  caption?: InputMaybe<Scalars['String']>;
  created_by?: InputMaybe<Scalars['ID']>;
  ext?: InputMaybe<Scalars['String']>;
  formats?: InputMaybe<Scalars['JSON']>;
  hash: Scalars['String'];
  height?: InputMaybe<Scalars['Int']>;
  mime: Scalars['String'];
  name: Scalars['String'];
  previewUrl?: InputMaybe<Scalars['String']>;
  provider: Scalars['String'];
  provider_metadata?: InputMaybe<Scalars['JSON']>;
  related?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  size: Scalars['Float'];
  updated_by?: InputMaybe<Scalars['ID']>;
  url: Scalars['String'];
  width?: InputMaybe<Scalars['Int']>;
};

export type Footer = {
  __typename?: 'Footer';
  accessibilityLink?: Maybe<ComponentBlocksPageLink>;
  address?: Maybe<Scalars['String']>;
  copyright?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  email?: Maybe<Scalars['String']>;
  facebookUrl?: Maybe<Scalars['String']>;
  footerSections?: Maybe<Array<Maybe<ComponentBlocksFooterSection>>>;
  id: Scalars['ID'];
  instagramUrl?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<Array<Maybe<Footer>>>;
  phone?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  updated_at: Scalars['DateTime'];
  youtubeUrl?: Maybe<Scalars['String']>;
};

export type FooterLocalizationsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type FooterInput = {
  accessibilityLink?: InputMaybe<ComponentBlocksPageLinkInput>;
  address?: InputMaybe<Scalars['String']>;
  copyright?: InputMaybe<Scalars['String']>;
  created_by?: InputMaybe<Scalars['ID']>;
  email?: InputMaybe<Scalars['String']>;
  facebookUrl?: InputMaybe<Scalars['String']>;
  footerSections?: InputMaybe<
    Array<InputMaybe<ComponentBlocksFooterSectionInput>>
  >;
  instagramUrl?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
  localizations?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  phone?: InputMaybe<Scalars['String']>;
  published_at?: InputMaybe<Scalars['DateTime']>;
  updated_by?: InputMaybe<Scalars['ID']>;
  youtubeUrl?: InputMaybe<Scalars['String']>;
};

export type Form = {
  __typename?: 'Form';
  Inputs?: Maybe<Array<Maybe<FormInputsDynamicZone>>>;
  Target?: Maybe<Scalars['String']>;
  Title?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  id: Scalars['ID'];
  published_at?: Maybe<Scalars['DateTime']>;
  updated_at: Scalars['DateTime'];
};

export type FormAggregator = {
  __typename?: 'FormAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type FormConnection = {
  __typename?: 'FormConnection';
  aggregate?: Maybe<FormAggregator>;
  groupBy?: Maybe<FormGroupBy>;
  values?: Maybe<Array<Maybe<Form>>>;
};

export type FormConnectionCreated_At = {
  __typename?: 'FormConnectionCreated_at';
  connection?: Maybe<FormConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type FormConnectionId = {
  __typename?: 'FormConnectionId';
  connection?: Maybe<FormConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type FormConnectionPublished_At = {
  __typename?: 'FormConnectionPublished_at';
  connection?: Maybe<FormConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type FormConnectionTarget = {
  __typename?: 'FormConnectionTarget';
  connection?: Maybe<FormConnection>;
  key?: Maybe<Scalars['String']>;
};

export type FormConnectionTitle = {
  __typename?: 'FormConnectionTitle';
  connection?: Maybe<FormConnection>;
  key?: Maybe<Scalars['String']>;
};

export type FormConnectionUpdated_At = {
  __typename?: 'FormConnectionUpdated_at';
  connection?: Maybe<FormConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type FormGroupBy = {
  __typename?: 'FormGroupBy';
  Target?: Maybe<Array<Maybe<FormConnectionTarget>>>;
  Title?: Maybe<Array<Maybe<FormConnectionTitle>>>;
  created_at?: Maybe<Array<Maybe<FormConnectionCreated_At>>>;
  id?: Maybe<Array<Maybe<FormConnectionId>>>;
  published_at?: Maybe<Array<Maybe<FormConnectionPublished_At>>>;
  updated_at?: Maybe<Array<Maybe<FormConnectionUpdated_At>>>;
};

export type FormInput = {
  Inputs?: InputMaybe<Array<Scalars['FormInputsDynamicZoneInput']>>;
  Target?: InputMaybe<Scalars['String']>;
  Title?: InputMaybe<Scalars['String']>;
  created_by?: InputMaybe<Scalars['ID']>;
  published_at?: InputMaybe<Scalars['DateTime']>;
  updated_by?: InputMaybe<Scalars['ID']>;
};

export type FormInputsDynamicZone = {
  __typename?: 'FormInputsDynamicZone';
  _?: Maybe<Scalars['Boolean']>;
};

export type Homepage = {
  __typename?: 'Homepage';
  cards?: Maybe<Array<Maybe<ComponentBlocksHomepageBookmark>>>;
  created_at: Scalars['DateTime'];
  header?: Maybe<ComponentBlocksHeader>;
  id: Scalars['ID'];
  inba?: Maybe<ComponentBlocksInBa>;
  left_highlight?: Maybe<BlogPost>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<Array<Maybe<Homepage>>>;
  posts?: Maybe<Array<Maybe<ComponentBlocksHomepagePost>>>;
  published_at?: Maybe<Scalars['DateTime']>;
  right_highlight?: Maybe<BlogPost>;
  updated_at: Scalars['DateTime'];
};

export type HomepageLocalizationsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type HomepageInput = {
  cards?: InputMaybe<Array<InputMaybe<ComponentBlocksHomepageBookmarkInput>>>;
  created_by?: InputMaybe<Scalars['ID']>;
  header?: InputMaybe<ComponentBlocksHeaderInput>;
  inba?: InputMaybe<ComponentBlocksInBaInput>;
  left_highlight?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['String']>;
  localizations?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  posts?: InputMaybe<Array<InputMaybe<ComponentBlocksHomepagePostInput>>>;
  published_at?: InputMaybe<Scalars['DateTime']>;
  right_highlight?: InputMaybe<Scalars['ID']>;
  updated_by?: InputMaybe<Scalars['ID']>;
};

export type I18NLocale = {
  __typename?: 'I18NLocale';
  code?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  updated_at: Scalars['DateTime'];
};

export type InputId = {
  id: Scalars['ID'];
};

export type LocaleInput = {
  code?: InputMaybe<Scalars['String']>;
  created_by?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  updated_by?: InputMaybe<Scalars['ID']>;
};

export type Morph =
  | Author
  | AuthorAggregator
  | AuthorConnection
  | AuthorConnectionCreated_At
  | AuthorConnectionId
  | AuthorConnectionName
  | AuthorConnectionPicture
  | AuthorConnectionPublished_At
  | AuthorConnectionUpdated_At
  | AuthorGroupBy
  | BlogPost
  | BlogPostAggregator
  | BlogPostConnection
  | BlogPostConnectionAuthor
  | BlogPostConnectionCoverImage
  | BlogPostConnectionCreated_At
  | BlogPostConnectionDate_Added
  | BlogPostConnectionExcerpt
  | BlogPostConnectionId
  | BlogPostConnectionLocale
  | BlogPostConnectionMoreLink
  | BlogPostConnectionPublished_At
  | BlogPostConnectionSlug
  | BlogPostConnectionTag
  | BlogPostConnectionTitle
  | BlogPostConnectionUpdated_At
  | BlogPostGroupBy
  | ComponentAccordionItemsFlatText
  | ComponentAccordionItemsInstitution
  | ComponentAccordionItemsInstitutionNarrow
  | ComponentBlocksBlogPostLink
  | ComponentBlocksBookmarkLink
  | ComponentBlocksDocListExtensions
  | ComponentBlocksFile
  | ComponentBlocksFooterSection
  | ComponentBlocksHeader
  | ComponentBlocksHomepageBookmark
  | ComponentBlocksHomepagePost
  | ComponentBlocksIconWithTitleAndDescription
  | ComponentBlocksInBa
  | ComponentBlocksInBaPictures
  | ComponentBlocksListItem
  | ComponentBlocksNumericalListItem
  | ComponentBlocksPageLink
  | ComponentBlocksSubpage
  | ComponentBlocksVideo
  | ComponentSectionsAccordion
  | ComponentSectionsArticlesList
  | ComponentSectionsCalculator
  | ComponentSectionsColumnedText
  | ComponentSectionsContact
  | ComponentSectionsDivider
  | ComponentSectionsDocumentList
  | ComponentSectionsFeaturedBlogPosts
  | ComponentSectionsFileList
  | ComponentSectionsIconTitleDesc
  | ComponentSectionsIframe
  | ComponentSectionsLinks
  | ComponentSectionsListItems
  | ComponentSectionsNarrowText
  | ComponentSectionsNewsletter
  | ComponentSectionsNumericalList
  | ComponentSectionsSubpageList
  | ComponentSectionsTextWithImage
  | ComponentSectionsVideos
  | ComponentSectionsWaves
  | ContentTypes
  | ContentTypesNameFields
  | EmailDesignerEmailTemplate
  | Footer
  | Form
  | FormAggregator
  | FormConnection
  | FormConnectionCreated_At
  | FormConnectionId
  | FormConnectionPublished_At
  | FormConnectionTarget
  | FormConnectionTitle
  | FormConnectionUpdated_At
  | FormGroupBy
  | FormInputsDynamicZone
  | Homepage
  | I18NLocale
  | Navigation
  | NavigationAudience
  | NavigationConfig
  | NavigationDetails
  | NavigationItem
  | NavigationNavigation
  | NavigationNavigationitem
  | NavigationRelated
  | Page
  | PageAggregator
  | PageCategory
  | PageCategoryAggregator
  | PageCategoryAggregatorAvg
  | PageCategoryAggregatorMax
  | PageCategoryAggregatorMin
  | PageCategoryAggregatorSum
  | PageCategoryConnection
  | PageCategoryConnectionColor
  | PageCategoryConnectionCreated_At
  | PageCategoryConnectionIcon
  | PageCategoryConnectionIconHover
  | PageCategoryConnectionId
  | PageCategoryConnectionLocale
  | PageCategoryConnectionPriority
  | PageCategoryConnectionShortTitle
  | PageCategoryConnectionTitle
  | PageCategoryConnectionUpdated_At
  | PageCategoryGroupBy
  | PageConnection
  | PageConnectionCreated_At
  | PageConnectionId
  | PageConnectionLocale
  | PageConnectionMetaDiscription
  | PageConnectionPageBackgroundImage
  | PageConnectionPageButtonContent
  | PageConnectionPageCategory
  | PageConnectionPageColor
  | PageConnectionParentPage
  | PageConnectionPublished_At
  | PageConnectionSlug
  | PageConnectionTitle
  | PageConnectionUpdated_At
  | PageGroupBy
  | PageSubcategory
  | PageSubcategoryAggregator
  | PageSubcategoryAggregatorAvg
  | PageSubcategoryAggregatorMax
  | PageSubcategoryAggregatorMin
  | PageSubcategoryAggregatorSum
  | PageSubcategoryConnection
  | PageSubcategoryConnectionCreated_At
  | PageSubcategoryConnectionIcon
  | PageSubcategoryConnectionId
  | PageSubcategoryConnectionLocale
  | PageSubcategoryConnectionMoreLink
  | PageSubcategoryConnectionPriority
  | PageSubcategoryConnectionTitle
  | PageSubcategoryConnectionUpdated_At
  | PageSubcategoryGroupBy
  | Tag
  | TagAggregator
  | TagConnection
  | TagConnectionCreated_At
  | TagConnectionId
  | TagConnectionPageCategory
  | TagConnectionPublished_At
  | TagConnectionTitle
  | TagConnectionUpdated_At
  | TagGroupBy
  | UploadFile
  | UploadFileAggregator
  | UploadFileAggregatorAvg
  | UploadFileAggregatorMax
  | UploadFileAggregatorMin
  | UploadFileAggregatorSum
  | UploadFileConnection
  | UploadFileConnectionAlternativeText
  | UploadFileConnectionCaption
  | UploadFileConnectionCreated_At
  | UploadFileConnectionExt
  | UploadFileConnectionFormats
  | UploadFileConnectionHash
  | UploadFileConnectionHeight
  | UploadFileConnectionId
  | UploadFileConnectionMime
  | UploadFileConnectionName
  | UploadFileConnectionPreviewUrl
  | UploadFileConnectionProvider
  | UploadFileConnectionProvider_Metadata
  | UploadFileConnectionSize
  | UploadFileConnectionUpdated_At
  | UploadFileConnectionUrl
  | UploadFileConnectionWidth
  | UploadFileGroupBy
  | UserPermissionsPasswordPayload
  | UsersPermissionsLoginPayload
  | UsersPermissionsMe
  | UsersPermissionsMeRole
  | UsersPermissionsPermission
  | UsersPermissionsRole
  | UsersPermissionsRoleAggregator
  | UsersPermissionsRoleConnection
  | UsersPermissionsRoleConnectionDescription
  | UsersPermissionsRoleConnectionId
  | UsersPermissionsRoleConnectionName
  | UsersPermissionsRoleConnectionType
  | UsersPermissionsRoleGroupBy
  | UsersPermissionsUser
  | UsersPermissionsUserAggregator
  | UsersPermissionsUserConnection
  | UsersPermissionsUserConnectionBlocked
  | UsersPermissionsUserConnectionConfirmed
  | UsersPermissionsUserConnectionCreated_At
  | UsersPermissionsUserConnectionEmail
  | UsersPermissionsUserConnectionId
  | UsersPermissionsUserConnectionPosts
  | UsersPermissionsUserConnectionProvider
  | UsersPermissionsUserConnectionRole
  | UsersPermissionsUserConnectionUpdated_At
  | UsersPermissionsUserConnectionUsername
  | UsersPermissionsUserGroupBy
  | Vzn
  | VznAggregator
  | VznConnection
  | VznConnectionCategory
  | VznConnectionConsolidatedText
  | VznConnectionCreated_At
  | VznConnectionDetails
  | VznConnectionId
  | VznConnectionMainDocument
  | VznConnectionPublished_At
  | VznConnectionTitle
  | VznConnectionUpdated_At
  | VznConnectionValidFrom
  | VznGroupBy
  | CreateAuthorPayload
  | CreateBlogPostPayload
  | CreateFormPayload
  | CreatePageCategoryPayload
  | CreatePagePayload
  | CreatePageSubcategoryPayload
  | CreateRolePayload
  | CreateTagPayload
  | CreateUserPayload
  | CreateVznPayload
  | DeleteAuthorPayload
  | DeleteBlogPostPayload
  | DeleteFilePayload
  | DeleteFooterPayload
  | DeleteFormPayload
  | DeleteHomepagePayload
  | DeletePageCategoryPayload
  | DeletePagePayload
  | DeletePageSubcategoryPayload
  | DeleteRolePayload
  | DeleteTagPayload
  | DeleteUserPayload
  | DeleteVznPayload
  | UpdateAuthorPayload
  | UpdateBlogPostPayload
  | UpdateFooterPayload
  | UpdateFormPayload
  | UpdateHomepagePayload
  | UpdatePageCategoryPayload
  | UpdatePagePayload
  | UpdatePageSubcategoryPayload
  | UpdateRolePayload
  | UpdateTagPayload
  | UpdateUserPayload
  | UpdateVznPayload;

export type Mutation = {
  __typename?: 'Mutation';
  createAuthor?: Maybe<CreateAuthorPayload>;
  createBlogPost?: Maybe<CreateBlogPostPayload>;
  createBlogPostLocalization: BlogPost;
  createFooterLocalization: Footer;
  createForm?: Maybe<CreateFormPayload>;
  createHomepageLocalization: Homepage;
  createPage?: Maybe<CreatePagePayload>;
  createPageCategory?: Maybe<CreatePageCategoryPayload>;
  createPageCategoryLocalization: PageCategory;
  createPageLocalization: Page;
  createPageSubcategory?: Maybe<CreatePageSubcategoryPayload>;
  createPageSubcategoryLocalization: PageSubcategory;
  /** Create a new role */
  createRole?: Maybe<CreateRolePayload>;
  createTag?: Maybe<CreateTagPayload>;
  /** Create a new user */
  createUser?: Maybe<CreateUserPayload>;
  createVzn?: Maybe<CreateVznPayload>;
  deleteAuthor?: Maybe<DeleteAuthorPayload>;
  deleteBlogPost?: Maybe<DeleteBlogPostPayload>;
  /** Delete one file */
  deleteFile?: Maybe<DeleteFilePayload>;
  deleteFooter?: Maybe<DeleteFooterPayload>;
  deleteForm?: Maybe<DeleteFormPayload>;
  deleteHomepage?: Maybe<DeleteHomepagePayload>;
  deletePage?: Maybe<DeletePagePayload>;
  deletePageCategory?: Maybe<DeletePageCategoryPayload>;
  deletePageSubcategory?: Maybe<DeletePageSubcategoryPayload>;
  /** Delete an existing role */
  deleteRole?: Maybe<DeleteRolePayload>;
  deleteTag?: Maybe<DeleteTagPayload>;
  /** Delete an existing user */
  deleteUser?: Maybe<DeleteUserPayload>;
  deleteVzn?: Maybe<DeleteVznPayload>;
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
  forgotPassword?: Maybe<UserPermissionsPasswordPayload>;
  login: UsersPermissionsLoginPayload;
  multipleUpload: Array<Maybe<UploadFile>>;
  navigationCreate: Navigation;
  navigationUpdate: Navigation;
  register: UsersPermissionsLoginPayload;
  resetPassword?: Maybe<UsersPermissionsLoginPayload>;
  updateAuthor?: Maybe<UpdateAuthorPayload>;
  updateBlogPost?: Maybe<UpdateBlogPostPayload>;
  updateFileInfo: UploadFile;
  updateFooter?: Maybe<UpdateFooterPayload>;
  updateForm?: Maybe<UpdateFormPayload>;
  updateHomepage?: Maybe<UpdateHomepagePayload>;
  updatePage?: Maybe<UpdatePagePayload>;
  updatePageCategory?: Maybe<UpdatePageCategoryPayload>;
  updatePageSubcategory?: Maybe<UpdatePageSubcategoryPayload>;
  /** Update an existing role */
  updateRole?: Maybe<UpdateRolePayload>;
  updateTag?: Maybe<UpdateTagPayload>;
  /** Update an existing user */
  updateUser?: Maybe<UpdateUserPayload>;
  updateVzn?: Maybe<UpdateVznPayload>;
  upload: UploadFile;
};

export type MutationCreateAuthorArgs = {
  input?: InputMaybe<CreateAuthorInput>;
};

export type MutationCreateBlogPostArgs = {
  input?: InputMaybe<CreateBlogPostInput>;
};

export type MutationCreateBlogPostLocalizationArgs = {
  input: UpdateBlogPostInput;
};

export type MutationCreateFooterLocalizationArgs = {
  input: UpdateFooterInput;
};

export type MutationCreateFormArgs = {
  input?: InputMaybe<CreateFormInput>;
};

export type MutationCreateHomepageLocalizationArgs = {
  input: UpdateHomepageInput;
};

export type MutationCreatePageArgs = {
  input?: InputMaybe<CreatePageInput>;
};

export type MutationCreatePageCategoryArgs = {
  input?: InputMaybe<CreatePageCategoryInput>;
};

export type MutationCreatePageCategoryLocalizationArgs = {
  input: UpdatePageCategoryInput;
};

export type MutationCreatePageLocalizationArgs = {
  input: UpdatePageInput;
};

export type MutationCreatePageSubcategoryArgs = {
  input?: InputMaybe<CreatePageSubcategoryInput>;
};

export type MutationCreatePageSubcategoryLocalizationArgs = {
  input: UpdatePageSubcategoryInput;
};

export type MutationCreateRoleArgs = {
  input?: InputMaybe<CreateRoleInput>;
};

export type MutationCreateTagArgs = {
  input?: InputMaybe<CreateTagInput>;
};

export type MutationCreateUserArgs = {
  input?: InputMaybe<CreateUserInput>;
};

export type MutationCreateVznArgs = {
  input?: InputMaybe<CreateVznInput>;
};

export type MutationDeleteAuthorArgs = {
  input?: InputMaybe<DeleteAuthorInput>;
};

export type MutationDeleteBlogPostArgs = {
  input?: InputMaybe<DeleteBlogPostInput>;
};

export type MutationDeleteFileArgs = {
  input?: InputMaybe<DeleteFileInput>;
};

export type MutationDeleteFooterArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

export type MutationDeleteFormArgs = {
  input?: InputMaybe<DeleteFormInput>;
};

export type MutationDeleteHomepageArgs = {
  locale?: InputMaybe<Scalars['String']>;
};

export type MutationDeletePageArgs = {
  input?: InputMaybe<DeletePageInput>;
};

export type MutationDeletePageCategoryArgs = {
  input?: InputMaybe<DeletePageCategoryInput>;
};

export type MutationDeletePageSubcategoryArgs = {
  input?: InputMaybe<DeletePageSubcategoryInput>;
};

export type MutationDeleteRoleArgs = {
  input?: InputMaybe<DeleteRoleInput>;
};

export type MutationDeleteTagArgs = {
  input?: InputMaybe<DeleteTagInput>;
};

export type MutationDeleteUserArgs = {
  input?: InputMaybe<DeleteUserInput>;
};

export type MutationDeleteVznArgs = {
  input?: InputMaybe<DeleteVznInput>;
};

export type MutationEmailConfirmationArgs = {
  confirmation: Scalars['String'];
};

export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};

export type MutationLoginArgs = {
  input: UsersPermissionsLoginInput;
};

export type MutationMultipleUploadArgs = {
  field?: InputMaybe<Scalars['String']>;
  files: Array<InputMaybe<Scalars['Upload']>>;
  ref?: InputMaybe<Scalars['String']>;
  refId?: InputMaybe<Scalars['ID']>;
  source?: InputMaybe<Scalars['String']>;
};

export type MutationNavigationCreateArgs = {
  newNavigation: CreateNavigation;
};

export type MutationNavigationUpdateArgs = {
  id: Scalars['String'];
  navigation: CreateNavigation;
};

export type MutationRegisterArgs = {
  input: UsersPermissionsRegisterInput;
};

export type MutationResetPasswordArgs = {
  code: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
};

export type MutationUpdateAuthorArgs = {
  input?: InputMaybe<UpdateAuthorInput>;
};

export type MutationUpdateBlogPostArgs = {
  input?: InputMaybe<UpdateBlogPostInput>;
};

export type MutationUpdateFileInfoArgs = {
  id: Scalars['ID'];
  info: FileInfoInput;
};

export type MutationUpdateFooterArgs = {
  input?: InputMaybe<UpdateFooterInput>;
  locale?: InputMaybe<Scalars['String']>;
};

export type MutationUpdateFormArgs = {
  input?: InputMaybe<UpdateFormInput>;
};

export type MutationUpdateHomepageArgs = {
  input?: InputMaybe<UpdateHomepageInput>;
  locale?: InputMaybe<Scalars['String']>;
};

export type MutationUpdatePageArgs = {
  input?: InputMaybe<UpdatePageInput>;
};

export type MutationUpdatePageCategoryArgs = {
  input?: InputMaybe<UpdatePageCategoryInput>;
};

export type MutationUpdatePageSubcategoryArgs = {
  input?: InputMaybe<UpdatePageSubcategoryInput>;
};

export type MutationUpdateRoleArgs = {
  input?: InputMaybe<UpdateRoleInput>;
};

export type MutationUpdateTagArgs = {
  input?: InputMaybe<UpdateTagInput>;
};

export type MutationUpdateUserArgs = {
  input?: InputMaybe<UpdateUserInput>;
};

export type MutationUpdateVznArgs = {
  input?: InputMaybe<UpdateVznInput>;
};

export type MutationUploadArgs = {
  field?: InputMaybe<Scalars['String']>;
  file: Scalars['Upload'];
  info?: InputMaybe<FileInfoInput>;
  ref?: InputMaybe<Scalars['String']>;
  refId?: InputMaybe<Scalars['ID']>;
  source?: InputMaybe<Scalars['String']>;
};

export type Navigation = {
  __typename?: 'Navigation';
  id: Scalars['String'];
  name: Scalars['String'];
  slug: Scalars['String'];
  visible: Scalars['Boolean'];
};

export type NavigationAudience = {
  __typename?: 'NavigationAudience';
  id: Scalars['ID'];
  key?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type NavigationConfig = {
  __typename?: 'NavigationConfig';
  additionalFields: Array<Maybe<Scalars['String']>>;
  allowedLevels?: Maybe<Scalars['Int']>;
  availableAudience: Array<Maybe<NavigationAudience>>;
  contentTypes?: Maybe<Array<Maybe<ContentTypes>>>;
  contentTypesNameFields?: Maybe<ContentTypesNameFields>;
};

export type NavigationDetails = {
  __typename?: 'NavigationDetails';
  id: Scalars['String'];
  items: Array<Maybe<NavigationItem>>;
  name: Scalars['String'];
  slug: Scalars['String'];
  visible: Scalars['Boolean'];
};

export type NavigationInput = {
  created_by?: InputMaybe<Scalars['ID']>;
  items?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  name: Scalars['String'];
  slug: Scalars['String'];
  updated_by?: InputMaybe<Scalars['ID']>;
  visible?: InputMaybe<Scalars['Boolean']>;
};

export type NavigationItem = {
  __typename?: 'NavigationItem';
  audience?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** MONGO */
  createdAt?: Maybe<Scalars['String']>;
  /** MONGO */
  createdBy?: Maybe<Scalars['String']>;
  /** SQL */
  created_at?: Maybe<Scalars['String']>;
  /** SQL */
  created_by?: Maybe<Scalars['String']>;
  externalPath?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  items?: Maybe<Array<Maybe<NavigationItem>>>;
  master?: Maybe<Scalars['Int']>;
  menuAttached: Scalars['Boolean'];
  order: Scalars['Int'];
  parent?: Maybe<Scalars['Int']>;
  path?: Maybe<Scalars['String']>;
  related?: Maybe<NavigationRelated>;
  title: Scalars['String'];
  type: Scalars['String'];
  uiRouterKey: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
  updatedBy?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['String']>;
  updated_by?: Maybe<Scalars['String']>;
};

/** Navigation container */
export type NavigationNavigation = {
  __typename?: 'NavigationNavigation';
  id: Scalars['ID'];
  items?: Maybe<Array<Maybe<NavigationNavigationitem>>>;
  name: Scalars['String'];
  slug: Scalars['String'];
  visible?: Maybe<Scalars['Boolean']>;
};

/** Navigation container */
export type NavigationNavigationItemsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type NavigationNavigationitem = {
  __typename?: 'NavigationNavigationitem';
  audience?: Maybe<Array<Maybe<NavigationAudience>>>;
  created_at: Scalars['DateTime'];
  externalPath?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  master?: Maybe<NavigationNavigation>;
  menuAttached?: Maybe<Scalars['Boolean']>;
  order?: Maybe<Scalars['Int']>;
  parent?: Maybe<NavigationNavigationitem>;
  path?: Maybe<Scalars['String']>;
  related?: Maybe<Array<Maybe<Morph>>>;
  title: Scalars['String'];
  type?: Maybe<Enum_Navigationnavigationitem_Type>;
  uiRouterKey?: Maybe<Scalars['String']>;
  updated_at: Scalars['DateTime'];
};

export type NavigationNavigationitemAudienceArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type NavigationNavigationitemRelatedArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type NavigationRelated = {
  __typename?: 'NavigationRelated';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export enum NavigationRenderType {
  Flat = 'FLAT',
  Rfr = 'RFR',
  Tree = 'TREE',
}

export type NavigationitemInput = {
  audience?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  created_by?: InputMaybe<Scalars['ID']>;
  externalPath?: InputMaybe<Scalars['String']>;
  master?: InputMaybe<Scalars['ID']>;
  menuAttached?: InputMaybe<Scalars['Boolean']>;
  order?: InputMaybe<Scalars['Int']>;
  parent?: InputMaybe<Scalars['ID']>;
  path?: InputMaybe<Scalars['String']>;
  related?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  title: Scalars['String'];
  type?: InputMaybe<Enum_Navigationnavigationitem_Type>;
  uiRouterKey?: InputMaybe<Scalars['String']>;
  updated_by?: InputMaybe<Scalars['ID']>;
};

export type Page = {
  __typename?: 'Page';
  childPages?: Maybe<Array<Maybe<Page>>>;
  created_at: Scalars['DateTime'];
  id: Scalars['ID'];
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<Array<Maybe<Page>>>;
  metaDiscription?: Maybe<Scalars['String']>;
  pageBackgroundImage?: Maybe<UploadFile>;
  pageButtonContent?: Maybe<ComponentBlocksPageLink>;
  pageCategory?: Maybe<PageCategory>;
  pageColor?: Maybe<Enum_Page_Pagecolor>;
  pageHeaderSections?: Maybe<Array<Maybe<PagePageHeaderSectionsDynamicZone>>>;
  parentPage?: Maybe<Page>;
  published_at?: Maybe<Scalars['DateTime']>;
  relatedBlogPosts: Array<BlogPost>;
  relatedContents?: Maybe<Array<Maybe<Tag>>>;
  sections?: Maybe<Array<Maybe<PageSectionsDynamicZone>>>;
  slug?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updated_at: Scalars['DateTime'];
};

export type PageChildPagesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type PageLocalizationsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type PageRelatedContentsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type PageAggregator = {
  __typename?: 'PageAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type PageCategory = {
  __typename?: 'PageCategory';
  color?: Maybe<Enum_Pagecategory_Color>;
  created_at: Scalars['DateTime'];
  icon?: Maybe<Enum_Pagecategory_Icon>;
  iconHover?: Maybe<Enum_Pagecategory_Iconhover>;
  id: Scalars['ID'];
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<Array<Maybe<PageCategory>>>;
  pages?: Maybe<Array<Maybe<Page>>>;
  priority?: Maybe<Scalars['Int']>;
  shortTitle?: Maybe<Scalars['String']>;
  subcategories?: Maybe<Array<Maybe<PageSubcategory>>>;
  title?: Maybe<Scalars['String']>;
  updated_at: Scalars['DateTime'];
};

export type PageCategoryLocalizationsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type PageCategoryPagesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type PageCategorySubcategoriesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type PageCategoryAggregator = {
  __typename?: 'PageCategoryAggregator';
  avg?: Maybe<PageCategoryAggregatorAvg>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<PageCategoryAggregatorMax>;
  min?: Maybe<PageCategoryAggregatorMin>;
  sum?: Maybe<PageCategoryAggregatorSum>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type PageCategoryAggregatorAvg = {
  __typename?: 'PageCategoryAggregatorAvg';
  priority?: Maybe<Scalars['Float']>;
};

export type PageCategoryAggregatorMax = {
  __typename?: 'PageCategoryAggregatorMax';
  priority?: Maybe<Scalars['Float']>;
};

export type PageCategoryAggregatorMin = {
  __typename?: 'PageCategoryAggregatorMin';
  priority?: Maybe<Scalars['Float']>;
};

export type PageCategoryAggregatorSum = {
  __typename?: 'PageCategoryAggregatorSum';
  priority?: Maybe<Scalars['Float']>;
};

export type PageCategoryConnection = {
  __typename?: 'PageCategoryConnection';
  aggregate?: Maybe<PageCategoryAggregator>;
  groupBy?: Maybe<PageCategoryGroupBy>;
  values?: Maybe<Array<Maybe<PageCategory>>>;
};

export type PageCategoryConnectionColor = {
  __typename?: 'PageCategoryConnectionColor';
  connection?: Maybe<PageCategoryConnection>;
  key?: Maybe<Scalars['String']>;
};

export type PageCategoryConnectionCreated_At = {
  __typename?: 'PageCategoryConnectionCreated_at';
  connection?: Maybe<PageCategoryConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type PageCategoryConnectionIcon = {
  __typename?: 'PageCategoryConnectionIcon';
  connection?: Maybe<PageCategoryConnection>;
  key?: Maybe<Scalars['String']>;
};

export type PageCategoryConnectionIconHover = {
  __typename?: 'PageCategoryConnectionIconHover';
  connection?: Maybe<PageCategoryConnection>;
  key?: Maybe<Scalars['String']>;
};

export type PageCategoryConnectionId = {
  __typename?: 'PageCategoryConnectionId';
  connection?: Maybe<PageCategoryConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type PageCategoryConnectionLocale = {
  __typename?: 'PageCategoryConnectionLocale';
  connection?: Maybe<PageCategoryConnection>;
  key?: Maybe<Scalars['String']>;
};

export type PageCategoryConnectionPriority = {
  __typename?: 'PageCategoryConnectionPriority';
  connection?: Maybe<PageCategoryConnection>;
  key?: Maybe<Scalars['Int']>;
};

export type PageCategoryConnectionShortTitle = {
  __typename?: 'PageCategoryConnectionShortTitle';
  connection?: Maybe<PageCategoryConnection>;
  key?: Maybe<Scalars['String']>;
};

export type PageCategoryConnectionTitle = {
  __typename?: 'PageCategoryConnectionTitle';
  connection?: Maybe<PageCategoryConnection>;
  key?: Maybe<Scalars['String']>;
};

export type PageCategoryConnectionUpdated_At = {
  __typename?: 'PageCategoryConnectionUpdated_at';
  connection?: Maybe<PageCategoryConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type PageCategoryGroupBy = {
  __typename?: 'PageCategoryGroupBy';
  color?: Maybe<Array<Maybe<PageCategoryConnectionColor>>>;
  created_at?: Maybe<Array<Maybe<PageCategoryConnectionCreated_At>>>;
  icon?: Maybe<Array<Maybe<PageCategoryConnectionIcon>>>;
  iconHover?: Maybe<Array<Maybe<PageCategoryConnectionIconHover>>>;
  id?: Maybe<Array<Maybe<PageCategoryConnectionId>>>;
  locale?: Maybe<Array<Maybe<PageCategoryConnectionLocale>>>;
  priority?: Maybe<Array<Maybe<PageCategoryConnectionPriority>>>;
  shortTitle?: Maybe<Array<Maybe<PageCategoryConnectionShortTitle>>>;
  title?: Maybe<Array<Maybe<PageCategoryConnectionTitle>>>;
  updated_at?: Maybe<Array<Maybe<PageCategoryConnectionUpdated_At>>>;
};

export type PageCategoryInput = {
  color?: InputMaybe<Enum_Pagecategory_Color>;
  created_by?: InputMaybe<Scalars['ID']>;
  icon?: InputMaybe<Enum_Pagecategory_Icon>;
  iconHover?: InputMaybe<Enum_Pagecategory_Iconhover>;
  locale?: InputMaybe<Scalars['String']>;
  localizations?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  pages?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  priority?: InputMaybe<Scalars['Int']>;
  shortTitle?: InputMaybe<Scalars['String']>;
  subcategories?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  title?: InputMaybe<Scalars['String']>;
  updated_by?: InputMaybe<Scalars['ID']>;
};

export type PageConnection = {
  __typename?: 'PageConnection';
  aggregate?: Maybe<PageAggregator>;
  groupBy?: Maybe<PageGroupBy>;
  values?: Maybe<Array<Maybe<Page>>>;
};

export type PageConnectionCreated_At = {
  __typename?: 'PageConnectionCreated_at';
  connection?: Maybe<PageConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type PageConnectionId = {
  __typename?: 'PageConnectionId';
  connection?: Maybe<PageConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type PageConnectionLocale = {
  __typename?: 'PageConnectionLocale';
  connection?: Maybe<PageConnection>;
  key?: Maybe<Scalars['String']>;
};

export type PageConnectionMetaDiscription = {
  __typename?: 'PageConnectionMetaDiscription';
  connection?: Maybe<PageConnection>;
  key?: Maybe<Scalars['String']>;
};

export type PageConnectionPageBackgroundImage = {
  __typename?: 'PageConnectionPageBackgroundImage';
  connection?: Maybe<PageConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type PageConnectionPageButtonContent = {
  __typename?: 'PageConnectionPageButtonContent';
  connection?: Maybe<PageConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type PageConnectionPageCategory = {
  __typename?: 'PageConnectionPageCategory';
  connection?: Maybe<PageConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type PageConnectionPageColor = {
  __typename?: 'PageConnectionPageColor';
  connection?: Maybe<PageConnection>;
  key?: Maybe<Scalars['String']>;
};

export type PageConnectionParentPage = {
  __typename?: 'PageConnectionParentPage';
  connection?: Maybe<PageConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type PageConnectionPublished_At = {
  __typename?: 'PageConnectionPublished_at';
  connection?: Maybe<PageConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type PageConnectionSlug = {
  __typename?: 'PageConnectionSlug';
  connection?: Maybe<PageConnection>;
  key?: Maybe<Scalars['String']>;
};

export type PageConnectionTitle = {
  __typename?: 'PageConnectionTitle';
  connection?: Maybe<PageConnection>;
  key?: Maybe<Scalars['String']>;
};

export type PageConnectionUpdated_At = {
  __typename?: 'PageConnectionUpdated_at';
  connection?: Maybe<PageConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type PageGroupBy = {
  __typename?: 'PageGroupBy';
  created_at?: Maybe<Array<Maybe<PageConnectionCreated_At>>>;
  id?: Maybe<Array<Maybe<PageConnectionId>>>;
  locale?: Maybe<Array<Maybe<PageConnectionLocale>>>;
  metaDiscription?: Maybe<Array<Maybe<PageConnectionMetaDiscription>>>;
  pageBackgroundImage?: Maybe<Array<Maybe<PageConnectionPageBackgroundImage>>>;
  pageButtonContent?: Maybe<Array<Maybe<PageConnectionPageButtonContent>>>;
  pageCategory?: Maybe<Array<Maybe<PageConnectionPageCategory>>>;
  pageColor?: Maybe<Array<Maybe<PageConnectionPageColor>>>;
  parentPage?: Maybe<Array<Maybe<PageConnectionParentPage>>>;
  published_at?: Maybe<Array<Maybe<PageConnectionPublished_At>>>;
  slug?: Maybe<Array<Maybe<PageConnectionSlug>>>;
  title?: Maybe<Array<Maybe<PageConnectionTitle>>>;
  updated_at?: Maybe<Array<Maybe<PageConnectionUpdated_At>>>;
};

export type PageInput = {
  childPages?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  created_by?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['String']>;
  localizations?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  metaDiscription?: InputMaybe<Scalars['String']>;
  pageBackgroundImage?: InputMaybe<Scalars['ID']>;
  pageButtonContent?: InputMaybe<ComponentBlocksPageLinkInput>;
  pageCategory?: InputMaybe<Scalars['ID']>;
  pageColor?: InputMaybe<Enum_Page_Pagecolor>;
  pageHeaderSections?: InputMaybe<
    Array<Scalars['PagePageHeaderSectionsDynamicZoneInput']>
  >;
  parentPage?: InputMaybe<Scalars['ID']>;
  published_at?: InputMaybe<Scalars['DateTime']>;
  relatedContents?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  sections?: InputMaybe<Array<Scalars['PageSectionsDynamicZoneInput']>>;
  slug?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  updated_by?: InputMaybe<Scalars['ID']>;
};

export type PagePageHeaderSectionsDynamicZone =
  | ComponentSectionsFeaturedBlogPosts
  | ComponentSectionsSubpageList;

export type PageSectionsDynamicZone =
  | ComponentSectionsAccordion
  | ComponentSectionsArticlesList
  | ComponentSectionsCalculator
  | ComponentSectionsColumnedText
  | ComponentSectionsContact
  | ComponentSectionsDivider
  | ComponentSectionsDocumentList
  | ComponentSectionsFileList
  | ComponentSectionsIconTitleDesc
  | ComponentSectionsIframe
  | ComponentSectionsLinks
  | ComponentSectionsListItems
  | ComponentSectionsNarrowText
  | ComponentSectionsNewsletter
  | ComponentSectionsNumericalList
  | ComponentSectionsTextWithImage
  | ComponentSectionsVideos
  | ComponentSectionsWaves;

export type PageSubcategory = {
  __typename?: 'PageSubcategory';
  created_at: Scalars['DateTime'];
  icon?: Maybe<Enum_Pagesubcategory_Icon>;
  id: Scalars['ID'];
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<Array<Maybe<PageSubcategory>>>;
  moreLink?: Maybe<ComponentBlocksPageLink>;
  pages?: Maybe<Array<Maybe<ComponentBlocksPageLink>>>;
  priority?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  updated_at: Scalars['DateTime'];
};

export type PageSubcategoryLocalizationsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type PageSubcategoryAggregator = {
  __typename?: 'PageSubcategoryAggregator';
  avg?: Maybe<PageSubcategoryAggregatorAvg>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<PageSubcategoryAggregatorMax>;
  min?: Maybe<PageSubcategoryAggregatorMin>;
  sum?: Maybe<PageSubcategoryAggregatorSum>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type PageSubcategoryAggregatorAvg = {
  __typename?: 'PageSubcategoryAggregatorAvg';
  priority?: Maybe<Scalars['Float']>;
};

export type PageSubcategoryAggregatorMax = {
  __typename?: 'PageSubcategoryAggregatorMax';
  priority?: Maybe<Scalars['Float']>;
};

export type PageSubcategoryAggregatorMin = {
  __typename?: 'PageSubcategoryAggregatorMin';
  priority?: Maybe<Scalars['Float']>;
};

export type PageSubcategoryAggregatorSum = {
  __typename?: 'PageSubcategoryAggregatorSum';
  priority?: Maybe<Scalars['Float']>;
};

export type PageSubcategoryConnection = {
  __typename?: 'PageSubcategoryConnection';
  aggregate?: Maybe<PageSubcategoryAggregator>;
  groupBy?: Maybe<PageSubcategoryGroupBy>;
  values?: Maybe<Array<Maybe<PageSubcategory>>>;
};

export type PageSubcategoryConnectionCreated_At = {
  __typename?: 'PageSubcategoryConnectionCreated_at';
  connection?: Maybe<PageSubcategoryConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type PageSubcategoryConnectionIcon = {
  __typename?: 'PageSubcategoryConnectionIcon';
  connection?: Maybe<PageSubcategoryConnection>;
  key?: Maybe<Scalars['String']>;
};

export type PageSubcategoryConnectionId = {
  __typename?: 'PageSubcategoryConnectionId';
  connection?: Maybe<PageSubcategoryConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type PageSubcategoryConnectionLocale = {
  __typename?: 'PageSubcategoryConnectionLocale';
  connection?: Maybe<PageSubcategoryConnection>;
  key?: Maybe<Scalars['String']>;
};

export type PageSubcategoryConnectionMoreLink = {
  __typename?: 'PageSubcategoryConnectionMoreLink';
  connection?: Maybe<PageSubcategoryConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type PageSubcategoryConnectionPriority = {
  __typename?: 'PageSubcategoryConnectionPriority';
  connection?: Maybe<PageSubcategoryConnection>;
  key?: Maybe<Scalars['Int']>;
};

export type PageSubcategoryConnectionTitle = {
  __typename?: 'PageSubcategoryConnectionTitle';
  connection?: Maybe<PageSubcategoryConnection>;
  key?: Maybe<Scalars['String']>;
};

export type PageSubcategoryConnectionUpdated_At = {
  __typename?: 'PageSubcategoryConnectionUpdated_at';
  connection?: Maybe<PageSubcategoryConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type PageSubcategoryGroupBy = {
  __typename?: 'PageSubcategoryGroupBy';
  created_at?: Maybe<Array<Maybe<PageSubcategoryConnectionCreated_At>>>;
  icon?: Maybe<Array<Maybe<PageSubcategoryConnectionIcon>>>;
  id?: Maybe<Array<Maybe<PageSubcategoryConnectionId>>>;
  locale?: Maybe<Array<Maybe<PageSubcategoryConnectionLocale>>>;
  moreLink?: Maybe<Array<Maybe<PageSubcategoryConnectionMoreLink>>>;
  priority?: Maybe<Array<Maybe<PageSubcategoryConnectionPriority>>>;
  title?: Maybe<Array<Maybe<PageSubcategoryConnectionTitle>>>;
  updated_at?: Maybe<Array<Maybe<PageSubcategoryConnectionUpdated_At>>>;
};

export type PageSubcategoryInput = {
  created_by?: InputMaybe<Scalars['ID']>;
  icon?: InputMaybe<Enum_Pagesubcategory_Icon>;
  locale?: InputMaybe<Scalars['String']>;
  localizations?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  moreLink?: InputMaybe<ComponentBlocksPageLinkInput>;
  pages?: InputMaybe<Array<InputMaybe<ComponentBlocksPageLinkInput>>>;
  priority?: InputMaybe<Scalars['Int']>;
  title?: InputMaybe<Scalars['String']>;
  updated_by?: InputMaybe<Scalars['ID']>;
};

export enum PublicationState {
  Live = 'LIVE',
  Preview = 'PREVIEW',
}

export type Query = {
  __typename?: 'Query';
  author?: Maybe<Author>;
  authors?: Maybe<Array<Maybe<Author>>>;
  authorsConnection?: Maybe<AuthorConnection>;
  blogPost?: Maybe<BlogPost>;
  blogPostBySlug?: Maybe<BlogPost>;
  blogPosts?: Maybe<Array<Maybe<BlogPost>>>;
  blogPostsConnection?: Maybe<BlogPostConnection>;
  configNavigation?: Maybe<NavigationConfig>;
  files?: Maybe<Array<Maybe<UploadFile>>>;
  filesConnection?: Maybe<UploadFileConnection>;
  footer?: Maybe<Footer>;
  form?: Maybe<Form>;
  forms?: Maybe<Array<Maybe<Form>>>;
  formsConnection?: Maybe<FormConnection>;
  getByIdNavigation?: Maybe<NavigationItem>;
  getNavigation: Array<Maybe<Navigation>>;
  homepage?: Maybe<Homepage>;
  latestPostsByTags: Array<BlogPost>;
  me?: Maybe<UsersPermissionsMe>;
  page?: Maybe<Page>;
  pageBySlug?: Maybe<Page>;
  pageCategories?: Maybe<Array<Maybe<PageCategory>>>;
  pageCategoriesConnection?: Maybe<PageCategoryConnection>;
  pageCategory?: Maybe<PageCategory>;
  pageSubcategories?: Maybe<Array<Maybe<PageSubcategory>>>;
  pageSubcategoriesConnection?: Maybe<PageSubcategoryConnection>;
  pageSubcategory?: Maybe<PageSubcategory>;
  pages?: Maybe<Array<Maybe<Page>>>;
  pagesConnection?: Maybe<PageConnection>;
  relatedPostsBySlug: Array<BlogPost>;
  renderNavigation: Array<Maybe<NavigationItem>>;
  renderNavigationChild: Array<Maybe<NavigationItem>>;
  role?: Maybe<UsersPermissionsRole>;
  /** Retrieve all the existing roles. You can't apply filters on this query. */
  roles?: Maybe<Array<Maybe<UsersPermissionsRole>>>;
  rolesConnection?: Maybe<UsersPermissionsRoleConnection>;
  tag?: Maybe<Tag>;
  tags?: Maybe<Array<Maybe<Tag>>>;
  tagsConnection?: Maybe<TagConnection>;
  user?: Maybe<UsersPermissionsUser>;
  users?: Maybe<Array<Maybe<UsersPermissionsUser>>>;
  usersConnection?: Maybe<UsersPermissionsUserConnection>;
  vzn?: Maybe<Vzn>;
  vzns?: Maybe<Array<Maybe<Vzn>>>;
  vznsConnection?: Maybe<VznConnection>;
};

export type QueryAuthorArgs = {
  id: Scalars['ID'];
  publicationState?: InputMaybe<PublicationState>;
};

export type QueryAuthorsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type QueryAuthorsConnectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type QueryBlogPostArgs = {
  id: Scalars['ID'];
  publicationState?: InputMaybe<PublicationState>;
};

export type QueryBlogPostBySlugArgs = {
  locale?: InputMaybe<Scalars['String']>;
  slug: Scalars['String'];
};

export type QueryBlogPostsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type QueryBlogPostsConnectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type QueryFilesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type QueryFilesConnectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type QueryFooterArgs = {
  locale?: InputMaybe<Scalars['String']>;
  publicationState?: InputMaybe<PublicationState>;
};

export type QueryFormArgs = {
  id: Scalars['ID'];
  publicationState?: InputMaybe<PublicationState>;
};

export type QueryFormsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type QueryFormsConnectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type QueryGetByIdNavigationArgs = {
  id: Scalars['String'];
};

export type QueryHomepageArgs = {
  locale?: InputMaybe<Scalars['String']>;
  publicationState?: InputMaybe<PublicationState>;
};

export type QueryLatestPostsByTagsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
};

export type QueryPageArgs = {
  id: Scalars['ID'];
  publicationState?: InputMaybe<PublicationState>;
};

export type QueryPageBySlugArgs = {
  locale: Scalars['String'];
  slug: Scalars['String'];
};

export type QueryPageCategoriesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type QueryPageCategoriesConnectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type QueryPageCategoryArgs = {
  id: Scalars['ID'];
  publicationState?: InputMaybe<PublicationState>;
};

export type QueryPageSubcategoriesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type QueryPageSubcategoriesConnectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type QueryPageSubcategoryArgs = {
  id: Scalars['ID'];
  publicationState?: InputMaybe<PublicationState>;
};

export type QueryPagesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type QueryPagesConnectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type QueryRelatedPostsBySlugArgs = {
  locale: Scalars['String'];
  slug: Scalars['String'];
};

export type QueryRenderNavigationArgs = {
  menuOnly?: InputMaybe<Scalars['Boolean']>;
  navigationIdOrSlug: Scalars['String'];
  type?: InputMaybe<NavigationRenderType>;
};

export type QueryRenderNavigationChildArgs = {
  childUIKey: Scalars['String'];
  id: Scalars['String'];
  menuOnly?: InputMaybe<Scalars['Boolean']>;
  type?: InputMaybe<NavigationRenderType>;
};

export type QueryRoleArgs = {
  id: Scalars['ID'];
  publicationState?: InputMaybe<PublicationState>;
};

export type QueryRolesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type QueryRolesConnectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type QueryTagArgs = {
  id: Scalars['ID'];
  publicationState?: InputMaybe<PublicationState>;
};

export type QueryTagsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type QueryTagsConnectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type QueryUserArgs = {
  id: Scalars['ID'];
  publicationState?: InputMaybe<PublicationState>;
};

export type QueryUsersArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type QueryUsersConnectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type QueryVznArgs = {
  id: Scalars['ID'];
  publicationState?: InputMaybe<PublicationState>;
};

export type QueryVznsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type QueryVznsConnectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type RoleInput = {
  created_by?: InputMaybe<Scalars['ID']>;
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  permissions?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  type?: InputMaybe<Scalars['String']>;
  updated_by?: InputMaybe<Scalars['ID']>;
  users?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type Tag = {
  __typename?: 'Tag';
  blogPosts?: Maybe<Array<Maybe<BlogPost>>>;
  created_at: Scalars['DateTime'];
  id: Scalars['ID'];
  pageCategory?: Maybe<PageCategory>;
  published_at?: Maybe<Scalars['DateTime']>;
  title?: Maybe<Scalars['String']>;
  updated_at: Scalars['DateTime'];
};

export type TagBlogPostsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type TagAggregator = {
  __typename?: 'TagAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type TagConnection = {
  __typename?: 'TagConnection';
  aggregate?: Maybe<TagAggregator>;
  groupBy?: Maybe<TagGroupBy>;
  values?: Maybe<Array<Maybe<Tag>>>;
};

export type TagConnectionCreated_At = {
  __typename?: 'TagConnectionCreated_at';
  connection?: Maybe<TagConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type TagConnectionId = {
  __typename?: 'TagConnectionId';
  connection?: Maybe<TagConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type TagConnectionPageCategory = {
  __typename?: 'TagConnectionPageCategory';
  connection?: Maybe<TagConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type TagConnectionPublished_At = {
  __typename?: 'TagConnectionPublished_at';
  connection?: Maybe<TagConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type TagConnectionTitle = {
  __typename?: 'TagConnectionTitle';
  connection?: Maybe<TagConnection>;
  key?: Maybe<Scalars['String']>;
};

export type TagConnectionUpdated_At = {
  __typename?: 'TagConnectionUpdated_at';
  connection?: Maybe<TagConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type TagGroupBy = {
  __typename?: 'TagGroupBy';
  created_at?: Maybe<Array<Maybe<TagConnectionCreated_At>>>;
  id?: Maybe<Array<Maybe<TagConnectionId>>>;
  pageCategory?: Maybe<Array<Maybe<TagConnectionPageCategory>>>;
  published_at?: Maybe<Array<Maybe<TagConnectionPublished_At>>>;
  title?: Maybe<Array<Maybe<TagConnectionTitle>>>;
  updated_at?: Maybe<Array<Maybe<TagConnectionUpdated_At>>>;
};

export type TagInput = {
  blogPosts?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  created_by?: InputMaybe<Scalars['ID']>;
  pageCategory?: InputMaybe<Scalars['ID']>;
  published_at?: InputMaybe<Scalars['DateTime']>;
  title?: InputMaybe<Scalars['String']>;
  updated_by?: InputMaybe<Scalars['ID']>;
};

export type UploadFile = {
  __typename?: 'UploadFile';
  alternativeText?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  ext?: Maybe<Scalars['String']>;
  formats?: Maybe<Scalars['JSON']>;
  hash: Scalars['String'];
  height?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  mime: Scalars['String'];
  name: Scalars['String'];
  previewUrl?: Maybe<Scalars['String']>;
  provider: Scalars['String'];
  provider_metadata?: Maybe<Scalars['JSON']>;
  related?: Maybe<Array<Maybe<Morph>>>;
  size: Scalars['Float'];
  updated_at: Scalars['DateTime'];
  url: Scalars['String'];
  width?: Maybe<Scalars['Int']>;
};

export type UploadFileRelatedArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type UploadFileAggregator = {
  __typename?: 'UploadFileAggregator';
  avg?: Maybe<UploadFileAggregatorAvg>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<UploadFileAggregatorMax>;
  min?: Maybe<UploadFileAggregatorMin>;
  sum?: Maybe<UploadFileAggregatorSum>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type UploadFileAggregatorAvg = {
  __typename?: 'UploadFileAggregatorAvg';
  height?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
};

export type UploadFileAggregatorMax = {
  __typename?: 'UploadFileAggregatorMax';
  height?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
};

export type UploadFileAggregatorMin = {
  __typename?: 'UploadFileAggregatorMin';
  height?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
};

export type UploadFileAggregatorSum = {
  __typename?: 'UploadFileAggregatorSum';
  height?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
};

export type UploadFileConnection = {
  __typename?: 'UploadFileConnection';
  aggregate?: Maybe<UploadFileAggregator>;
  groupBy?: Maybe<UploadFileGroupBy>;
  values?: Maybe<Array<Maybe<UploadFile>>>;
};

export type UploadFileConnectionAlternativeText = {
  __typename?: 'UploadFileConnectionAlternativeText';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionCaption = {
  __typename?: 'UploadFileConnectionCaption';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionCreated_At = {
  __typename?: 'UploadFileConnectionCreated_at';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type UploadFileConnectionExt = {
  __typename?: 'UploadFileConnectionExt';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionFormats = {
  __typename?: 'UploadFileConnectionFormats';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['JSON']>;
};

export type UploadFileConnectionHash = {
  __typename?: 'UploadFileConnectionHash';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionHeight = {
  __typename?: 'UploadFileConnectionHeight';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['Int']>;
};

export type UploadFileConnectionId = {
  __typename?: 'UploadFileConnectionId';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type UploadFileConnectionMime = {
  __typename?: 'UploadFileConnectionMime';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionName = {
  __typename?: 'UploadFileConnectionName';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionPreviewUrl = {
  __typename?: 'UploadFileConnectionPreviewUrl';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionProvider = {
  __typename?: 'UploadFileConnectionProvider';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionProvider_Metadata = {
  __typename?: 'UploadFileConnectionProvider_metadata';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['JSON']>;
};

export type UploadFileConnectionSize = {
  __typename?: 'UploadFileConnectionSize';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['Float']>;
};

export type UploadFileConnectionUpdated_At = {
  __typename?: 'UploadFileConnectionUpdated_at';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type UploadFileConnectionUrl = {
  __typename?: 'UploadFileConnectionUrl';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UploadFileConnectionWidth = {
  __typename?: 'UploadFileConnectionWidth';
  connection?: Maybe<UploadFileConnection>;
  key?: Maybe<Scalars['Int']>;
};

export type UploadFileGroupBy = {
  __typename?: 'UploadFileGroupBy';
  alternativeText?: Maybe<Array<Maybe<UploadFileConnectionAlternativeText>>>;
  caption?: Maybe<Array<Maybe<UploadFileConnectionCaption>>>;
  created_at?: Maybe<Array<Maybe<UploadFileConnectionCreated_At>>>;
  ext?: Maybe<Array<Maybe<UploadFileConnectionExt>>>;
  formats?: Maybe<Array<Maybe<UploadFileConnectionFormats>>>;
  hash?: Maybe<Array<Maybe<UploadFileConnectionHash>>>;
  height?: Maybe<Array<Maybe<UploadFileConnectionHeight>>>;
  id?: Maybe<Array<Maybe<UploadFileConnectionId>>>;
  mime?: Maybe<Array<Maybe<UploadFileConnectionMime>>>;
  name?: Maybe<Array<Maybe<UploadFileConnectionName>>>;
  previewUrl?: Maybe<Array<Maybe<UploadFileConnectionPreviewUrl>>>;
  provider?: Maybe<Array<Maybe<UploadFileConnectionProvider>>>;
  provider_metadata?: Maybe<
    Array<Maybe<UploadFileConnectionProvider_Metadata>>
  >;
  size?: Maybe<Array<Maybe<UploadFileConnectionSize>>>;
  updated_at?: Maybe<Array<Maybe<UploadFileConnectionUpdated_At>>>;
  url?: Maybe<Array<Maybe<UploadFileConnectionUrl>>>;
  width?: Maybe<Array<Maybe<UploadFileConnectionWidth>>>;
};

export type UserInput = {
  blocked?: InputMaybe<Scalars['Boolean']>;
  confirmationToken?: InputMaybe<Scalars['String']>;
  confirmed?: InputMaybe<Scalars['Boolean']>;
  created_by?: InputMaybe<Scalars['ID']>;
  email: Scalars['String'];
  password?: InputMaybe<Scalars['String']>;
  posts?: InputMaybe<Scalars['ID']>;
  provider?: InputMaybe<Scalars['String']>;
  resetPasswordToken?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['ID']>;
  updated_by?: InputMaybe<Scalars['ID']>;
  username: Scalars['String'];
};

export type UserPermissionsPasswordPayload = {
  __typename?: 'UserPermissionsPasswordPayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsLoginInput = {
  identifier: Scalars['String'];
  password: Scalars['String'];
  provider?: InputMaybe<Scalars['String']>;
};

export type UsersPermissionsLoginPayload = {
  __typename?: 'UsersPermissionsLoginPayload';
  jwt?: Maybe<Scalars['String']>;
  user: UsersPermissionsMe;
};

export type UsersPermissionsMe = {
  __typename?: 'UsersPermissionsMe';
  blocked?: Maybe<Scalars['Boolean']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  email: Scalars['String'];
  id: Scalars['ID'];
  role?: Maybe<UsersPermissionsMeRole>;
  username: Scalars['String'];
};

export type UsersPermissionsMeRole = {
  __typename?: 'UsersPermissionsMeRole';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  type?: Maybe<Scalars['String']>;
};

export type UsersPermissionsPermission = {
  __typename?: 'UsersPermissionsPermission';
  action: Scalars['String'];
  controller: Scalars['String'];
  enabled: Scalars['Boolean'];
  id: Scalars['ID'];
  policy?: Maybe<Scalars['String']>;
  role?: Maybe<UsersPermissionsRole>;
  type: Scalars['String'];
};

export type UsersPermissionsRegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UsersPermissionsRole = {
  __typename?: 'UsersPermissionsRole';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  permissions?: Maybe<Array<Maybe<UsersPermissionsPermission>>>;
  type?: Maybe<Scalars['String']>;
  users?: Maybe<Array<Maybe<UsersPermissionsUser>>>;
};

export type UsersPermissionsRolePermissionsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type UsersPermissionsRoleUsersArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
};

export type UsersPermissionsRoleAggregator = {
  __typename?: 'UsersPermissionsRoleAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type UsersPermissionsRoleConnection = {
  __typename?: 'UsersPermissionsRoleConnection';
  aggregate?: Maybe<UsersPermissionsRoleAggregator>;
  groupBy?: Maybe<UsersPermissionsRoleGroupBy>;
  values?: Maybe<Array<Maybe<UsersPermissionsRole>>>;
};

export type UsersPermissionsRoleConnectionDescription = {
  __typename?: 'UsersPermissionsRoleConnectionDescription';
  connection?: Maybe<UsersPermissionsRoleConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UsersPermissionsRoleConnectionId = {
  __typename?: 'UsersPermissionsRoleConnectionId';
  connection?: Maybe<UsersPermissionsRoleConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsRoleConnectionName = {
  __typename?: 'UsersPermissionsRoleConnectionName';
  connection?: Maybe<UsersPermissionsRoleConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UsersPermissionsRoleConnectionType = {
  __typename?: 'UsersPermissionsRoleConnectionType';
  connection?: Maybe<UsersPermissionsRoleConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UsersPermissionsRoleGroupBy = {
  __typename?: 'UsersPermissionsRoleGroupBy';
  description?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionDescription>>>;
  id?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionId>>>;
  name?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionName>>>;
  type?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionType>>>;
};

export type UsersPermissionsUser = {
  __typename?: 'UsersPermissionsUser';
  blocked?: Maybe<Scalars['Boolean']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  created_at: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['ID'];
  posts?: Maybe<BlogPost>;
  provider?: Maybe<Scalars['String']>;
  role?: Maybe<UsersPermissionsRole>;
  updated_at: Scalars['DateTime'];
  username: Scalars['String'];
};

export type UsersPermissionsUserAggregator = {
  __typename?: 'UsersPermissionsUserAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type UsersPermissionsUserConnection = {
  __typename?: 'UsersPermissionsUserConnection';
  aggregate?: Maybe<UsersPermissionsUserAggregator>;
  groupBy?: Maybe<UsersPermissionsUserGroupBy>;
  values?: Maybe<Array<Maybe<UsersPermissionsUser>>>;
};

export type UsersPermissionsUserConnectionBlocked = {
  __typename?: 'UsersPermissionsUserConnectionBlocked';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['Boolean']>;
};

export type UsersPermissionsUserConnectionConfirmed = {
  __typename?: 'UsersPermissionsUserConnectionConfirmed';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['Boolean']>;
};

export type UsersPermissionsUserConnectionCreated_At = {
  __typename?: 'UsersPermissionsUserConnectionCreated_at';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type UsersPermissionsUserConnectionEmail = {
  __typename?: 'UsersPermissionsUserConnectionEmail';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UsersPermissionsUserConnectionId = {
  __typename?: 'UsersPermissionsUserConnectionId';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsUserConnectionPosts = {
  __typename?: 'UsersPermissionsUserConnectionPosts';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsUserConnectionProvider = {
  __typename?: 'UsersPermissionsUserConnectionProvider';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UsersPermissionsUserConnectionRole = {
  __typename?: 'UsersPermissionsUserConnectionRole';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsUserConnectionUpdated_At = {
  __typename?: 'UsersPermissionsUserConnectionUpdated_at';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type UsersPermissionsUserConnectionUsername = {
  __typename?: 'UsersPermissionsUserConnectionUsername';
  connection?: Maybe<UsersPermissionsUserConnection>;
  key?: Maybe<Scalars['String']>;
};

export type UsersPermissionsUserGroupBy = {
  __typename?: 'UsersPermissionsUserGroupBy';
  blocked?: Maybe<Array<Maybe<UsersPermissionsUserConnectionBlocked>>>;
  confirmed?: Maybe<Array<Maybe<UsersPermissionsUserConnectionConfirmed>>>;
  created_at?: Maybe<Array<Maybe<UsersPermissionsUserConnectionCreated_At>>>;
  email?: Maybe<Array<Maybe<UsersPermissionsUserConnectionEmail>>>;
  id?: Maybe<Array<Maybe<UsersPermissionsUserConnectionId>>>;
  posts?: Maybe<Array<Maybe<UsersPermissionsUserConnectionPosts>>>;
  provider?: Maybe<Array<Maybe<UsersPermissionsUserConnectionProvider>>>;
  role?: Maybe<Array<Maybe<UsersPermissionsUserConnectionRole>>>;
  updated_at?: Maybe<Array<Maybe<UsersPermissionsUserConnectionUpdated_At>>>;
  username?: Maybe<Array<Maybe<UsersPermissionsUserConnectionUsername>>>;
};

export type Vzn = {
  __typename?: 'Vzn';
  amedmentDocument?: Maybe<Array<Maybe<ComponentBlocksDocListExtensions>>>;
  cancellationDocument?: Maybe<Array<Maybe<ComponentBlocksDocListExtensions>>>;
  category: Enum_Vzn_Category;
  consolidatedText?: Maybe<UploadFile>;
  created_at: Scalars['DateTime'];
  details?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  mainDocument?: Maybe<UploadFile>;
  published_at?: Maybe<Scalars['DateTime']>;
  title: Scalars['String'];
  updated_at: Scalars['DateTime'];
  validFrom: Scalars['Date'];
};

export type VznAggregator = {
  __typename?: 'VznAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type VznConnection = {
  __typename?: 'VznConnection';
  aggregate?: Maybe<VznAggregator>;
  groupBy?: Maybe<VznGroupBy>;
  values?: Maybe<Array<Maybe<Vzn>>>;
};

export type VznConnectionCategory = {
  __typename?: 'VznConnectionCategory';
  connection?: Maybe<VznConnection>;
  key?: Maybe<Scalars['String']>;
};

export type VznConnectionConsolidatedText = {
  __typename?: 'VznConnectionConsolidatedText';
  connection?: Maybe<VznConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type VznConnectionCreated_At = {
  __typename?: 'VznConnectionCreated_at';
  connection?: Maybe<VznConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type VznConnectionDetails = {
  __typename?: 'VznConnectionDetails';
  connection?: Maybe<VznConnection>;
  key?: Maybe<Scalars['String']>;
};

export type VznConnectionId = {
  __typename?: 'VznConnectionId';
  connection?: Maybe<VznConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type VznConnectionMainDocument = {
  __typename?: 'VznConnectionMainDocument';
  connection?: Maybe<VznConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type VznConnectionPublished_At = {
  __typename?: 'VznConnectionPublished_at';
  connection?: Maybe<VznConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type VznConnectionTitle = {
  __typename?: 'VznConnectionTitle';
  connection?: Maybe<VznConnection>;
  key?: Maybe<Scalars['String']>;
};

export type VznConnectionUpdated_At = {
  __typename?: 'VznConnectionUpdated_at';
  connection?: Maybe<VznConnection>;
  key?: Maybe<Scalars['DateTime']>;
};

export type VznConnectionValidFrom = {
  __typename?: 'VznConnectionValidFrom';
  connection?: Maybe<VznConnection>;
  key?: Maybe<Scalars['ID']>;
};

export type VznGroupBy = {
  __typename?: 'VznGroupBy';
  category?: Maybe<Array<Maybe<VznConnectionCategory>>>;
  consolidatedText?: Maybe<Array<Maybe<VznConnectionConsolidatedText>>>;
  created_at?: Maybe<Array<Maybe<VznConnectionCreated_At>>>;
  details?: Maybe<Array<Maybe<VznConnectionDetails>>>;
  id?: Maybe<Array<Maybe<VznConnectionId>>>;
  mainDocument?: Maybe<Array<Maybe<VznConnectionMainDocument>>>;
  published_at?: Maybe<Array<Maybe<VznConnectionPublished_At>>>;
  title?: Maybe<Array<Maybe<VznConnectionTitle>>>;
  updated_at?: Maybe<Array<Maybe<VznConnectionUpdated_At>>>;
  validFrom?: Maybe<Array<Maybe<VznConnectionValidFrom>>>;
};

export type VznInput = {
  amedmentDocument?: InputMaybe<
    Array<InputMaybe<ComponentBlocksDocListExtensionInput>>
  >;
  cancellationDocument?: InputMaybe<
    Array<InputMaybe<ComponentBlocksDocListExtensionInput>>
  >;
  category: Enum_Vzn_Category;
  consolidatedText?: InputMaybe<Scalars['ID']>;
  created_by?: InputMaybe<Scalars['ID']>;
  details?: InputMaybe<Scalars['String']>;
  extentions?: InputMaybe<
    Array<InputMaybe<ComponentBlocksDocListExtensionInput>>
  >;
  mainDocument?: InputMaybe<Scalars['ID']>;
  published_at?: InputMaybe<Scalars['DateTime']>;
  title: Scalars['String'];
  updated_by?: InputMaybe<Scalars['ID']>;
  validFrom: Scalars['Date'];
};

export type CreateAuthorInput = {
  data?: InputMaybe<AuthorInput>;
};

export type CreateAuthorPayload = {
  __typename?: 'createAuthorPayload';
  author?: Maybe<Author>;
};

export type CreateBlogPostInput = {
  data?: InputMaybe<BlogPostInput>;
};

export type CreateBlogPostPayload = {
  __typename?: 'createBlogPostPayload';
  blogPost?: Maybe<BlogPost>;
};

export type CreateFormInput = {
  data?: InputMaybe<FormInput>;
};

export type CreateFormPayload = {
  __typename?: 'createFormPayload';
  form?: Maybe<Form>;
};

export type CreatePageCategoryInput = {
  data?: InputMaybe<PageCategoryInput>;
};

export type CreatePageCategoryPayload = {
  __typename?: 'createPageCategoryPayload';
  pageCategory?: Maybe<PageCategory>;
};

export type CreatePageInput = {
  data?: InputMaybe<PageInput>;
};

export type CreatePagePayload = {
  __typename?: 'createPagePayload';
  page?: Maybe<Page>;
};

export type CreatePageSubcategoryInput = {
  data?: InputMaybe<PageSubcategoryInput>;
};

export type CreatePageSubcategoryPayload = {
  __typename?: 'createPageSubcategoryPayload';
  pageSubcategory?: Maybe<PageSubcategory>;
};

export type CreateRoleInput = {
  data?: InputMaybe<RoleInput>;
};

export type CreateRolePayload = {
  __typename?: 'createRolePayload';
  role?: Maybe<UsersPermissionsRole>;
};

export type CreateTagInput = {
  data?: InputMaybe<TagInput>;
};

export type CreateTagPayload = {
  __typename?: 'createTagPayload';
  tag?: Maybe<Tag>;
};

export type CreateUserInput = {
  data?: InputMaybe<UserInput>;
};

export type CreateUserPayload = {
  __typename?: 'createUserPayload';
  user?: Maybe<UsersPermissionsUser>;
};

export type CreateVznInput = {
  data?: InputMaybe<VznInput>;
};

export type CreateVznPayload = {
  __typename?: 'createVznPayload';
  vzn?: Maybe<Vzn>;
};

export type DeleteAuthorInput = {
  where?: InputMaybe<InputId>;
};

export type DeleteAuthorPayload = {
  __typename?: 'deleteAuthorPayload';
  author?: Maybe<Author>;
};

export type DeleteBlogPostInput = {
  where?: InputMaybe<InputId>;
};

export type DeleteBlogPostPayload = {
  __typename?: 'deleteBlogPostPayload';
  blogPost?: Maybe<BlogPost>;
};

export type DeleteFileInput = {
  where?: InputMaybe<InputId>;
};

export type DeleteFilePayload = {
  __typename?: 'deleteFilePayload';
  file?: Maybe<UploadFile>;
};

export type DeleteFooterPayload = {
  __typename?: 'deleteFooterPayload';
  footer?: Maybe<Footer>;
};

export type DeleteFormInput = {
  where?: InputMaybe<InputId>;
};

export type DeleteFormPayload = {
  __typename?: 'deleteFormPayload';
  form?: Maybe<Form>;
};

export type DeleteHomepagePayload = {
  __typename?: 'deleteHomepagePayload';
  homepage?: Maybe<Homepage>;
};

export type DeletePageCategoryInput = {
  where?: InputMaybe<InputId>;
};

export type DeletePageCategoryPayload = {
  __typename?: 'deletePageCategoryPayload';
  pageCategory?: Maybe<PageCategory>;
};

export type DeletePageInput = {
  where?: InputMaybe<InputId>;
};

export type DeletePagePayload = {
  __typename?: 'deletePagePayload';
  page?: Maybe<Page>;
};

export type DeletePageSubcategoryInput = {
  where?: InputMaybe<InputId>;
};

export type DeletePageSubcategoryPayload = {
  __typename?: 'deletePageSubcategoryPayload';
  pageSubcategory?: Maybe<PageSubcategory>;
};

export type DeleteRoleInput = {
  where?: InputMaybe<InputId>;
};

export type DeleteRolePayload = {
  __typename?: 'deleteRolePayload';
  role?: Maybe<UsersPermissionsRole>;
};

export type DeleteTagInput = {
  where?: InputMaybe<InputId>;
};

export type DeleteTagPayload = {
  __typename?: 'deleteTagPayload';
  tag?: Maybe<Tag>;
};

export type DeleteUserInput = {
  where?: InputMaybe<InputId>;
};

export type DeleteUserPayload = {
  __typename?: 'deleteUserPayload';
  user?: Maybe<UsersPermissionsUser>;
};

export type DeleteVznInput = {
  where?: InputMaybe<InputId>;
};

export type DeleteVznPayload = {
  __typename?: 'deleteVznPayload';
  vzn?: Maybe<Vzn>;
};

export type EditAudienceInput = {
  created_by?: InputMaybe<Scalars['ID']>;
  key?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  updated_by?: InputMaybe<Scalars['ID']>;
};

export type EditAuthorInput = {
  created_by?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  picture?: InputMaybe<Scalars['ID']>;
  published_at?: InputMaybe<Scalars['DateTime']>;
  updated_by?: InputMaybe<Scalars['ID']>;
};

export type EditBlogPostInput = {
  author?: InputMaybe<Scalars['ID']>;
  coverImage?: InputMaybe<Scalars['ID']>;
  created_by?: InputMaybe<Scalars['ID']>;
  date_added?: InputMaybe<Scalars['DateTime']>;
  excerpt?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
  localizations?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  moreLink?: InputMaybe<EditComponentBlocksBlogPostLinkInput>;
  published_at?: InputMaybe<Scalars['DateTime']>;
  sections?: InputMaybe<Array<Scalars['BlogPostSectionsDynamicZoneInput']>>;
  slug?: InputMaybe<Scalars['String']>;
  tag?: InputMaybe<Scalars['ID']>;
  title?: InputMaybe<Scalars['String']>;
  updated_by?: InputMaybe<Scalars['ID']>;
};

export type EditComponentAccordionItemsFlatTextInput = {
  align?: InputMaybe<Enum_Componentaccordionitemsflattext_Align>;
  category?: InputMaybe<Scalars['String']>;
  content?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  moreLinkPage?: InputMaybe<Scalars['ID']>;
  moreLinkTitle?: InputMaybe<Scalars['String']>;
  moreLinkUrl?: InputMaybe<Scalars['String']>;
  width?: InputMaybe<Enum_Componentaccordionitemsflattext_Width>;
};

export type EditComponentAccordionItemsInstitutionInput = {
  category?: InputMaybe<Scalars['String']>;
  firstColumn?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  secondColumn?: InputMaybe<Scalars['String']>;
  subtitle?: InputMaybe<Scalars['String']>;
  thirdColumn?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
  urlLabel?: InputMaybe<Scalars['String']>;
};

export type EditComponentAccordionItemsInstitutionNarrowInput = {
  category?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  subtitle?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
  urlLabel?: InputMaybe<Scalars['String']>;
};

export type EditComponentBlocksBlogPostLinkInput = {
  blogPost?: InputMaybe<Scalars['ID']>;
  id?: InputMaybe<Scalars['ID']>;
  title?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
};

export type EditComponentBlocksBookmarkLinkInput = {
  href?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  title?: InputMaybe<Scalars['String']>;
};

export type EditComponentBlocksDocListExtensionInput = {
  document?: InputMaybe<Scalars['ID']>;
  id?: InputMaybe<Scalars['ID']>;
  title?: InputMaybe<Scalars['String']>;
  validFrom?: InputMaybe<Scalars['Date']>;
};

export type EditComponentBlocksFileInput = {
  category?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  media?: InputMaybe<Scalars['ID']>;
  title?: InputMaybe<Scalars['String']>;
};

export type EditComponentBlocksFooterSectionInput = {
  id?: InputMaybe<Scalars['ID']>;
  pageLinks?: InputMaybe<Array<InputMaybe<EditComponentBlocksPageLinkInput>>>;
  title?: InputMaybe<Scalars['String']>;
};

export type EditComponentBlocksHeaderInput = {
  id?: InputMaybe<Scalars['ID']>;
  picture?: InputMaybe<Scalars['ID']>;
  subtitle?: InputMaybe<Scalars['String']>;
};

export type EditComponentBlocksHomepageBookmarkInput = {
  headline?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  link?: InputMaybe<EditComponentBlocksBookmarkLinkInput>;
  picture?: InputMaybe<Scalars['ID']>;
  text?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  variant?: InputMaybe<Scalars['String']>;
};

export type EditComponentBlocksHomepagePostInput = {
  id?: InputMaybe<Scalars['ID']>;
  image?: InputMaybe<Scalars['ID']>;
  slug?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type EditComponentBlocksIconWithTitleAndDescriptionInput = {
  desc?: InputMaybe<Scalars['String']>;
  icon?: InputMaybe<Scalars['ID']>;
  id?: InputMaybe<Scalars['ID']>;
  title?: InputMaybe<Scalars['String']>;
};

export type EditComponentBlocksInBaInput = {
  content?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  images?: InputMaybe<EditComponentBlocksInBaPictureInput>;
  link?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type EditComponentBlocksInBaPictureInput = {
  frontImage?: InputMaybe<Scalars['ID']>;
  id?: InputMaybe<Scalars['ID']>;
  rearImage?: InputMaybe<Scalars['ID']>;
};

export type EditComponentBlocksListItemInput = {
  circleOption?: InputMaybe<Enum_Componentblockslistitem_Circleoption>;
  content?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  moreLinkPage?: InputMaybe<Scalars['ID']>;
  moreLinkTitle?: InputMaybe<Scalars['String']>;
  moreLinkUrl?: InputMaybe<Scalars['String']>;
};

export type EditComponentBlocksNumericalListItemInput = {
  id?: InputMaybe<Scalars['ID']>;
  text?: InputMaybe<Scalars['String']>;
};

export type EditComponentBlocksPageLinkInput = {
  anchor?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  page?: InputMaybe<Scalars['ID']>;
  title?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
};

export type EditComponentBlocksSubpageInput = {
  id?: InputMaybe<Scalars['ID']>;
  link?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type EditComponentBlocksVideoInput = {
  id?: InputMaybe<Scalars['ID']>;
  speaker?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
};

export type EditComponentSectionsAccordionInput = {
  flatText?: InputMaybe<
    Array<InputMaybe<EditComponentAccordionItemsFlatTextInput>>
  >;
  hasBackground?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['ID']>;
  institutions?: InputMaybe<
    Array<InputMaybe<EditComponentAccordionItemsInstitutionInput>>
  >;
  institutionsNarrow?: InputMaybe<
    Array<InputMaybe<EditComponentAccordionItemsInstitutionNarrowInput>>
  >;
  title?: InputMaybe<Scalars['String']>;
};

export type EditComponentSectionsArticlesListInput = {
  category?: InputMaybe<Scalars['ID']>;
  filtering?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['ID']>;
  title?: InputMaybe<Scalars['String']>;
};

export type EditComponentSectionsCalculatorInput = {
  another_adult_value?: InputMaybe<Scalars['Float']>;
  child_value?: InputMaybe<Scalars['Float']>;
  hasBackground?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['ID']>;
  single_adult_value?: InputMaybe<Scalars['Float']>;
};

export type EditComponentSectionsColumnedTextInput = {
  content?: InputMaybe<Scalars['String']>;
  hasBackground?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type EditComponentSectionsContactInput = {
  address?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  emailLabel?: InputMaybe<Scalars['String']>;
  hasBackground?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['ID']>;
  phone?: InputMaybe<Scalars['String']>;
  phoneLabel?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type EditComponentSectionsDividerInput = {
  hasBackground?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['ID']>;
  style?: InputMaybe<Enum_Componentsectionsdivider_Style>;
};

export type EditComponentSectionsDocumentListInput = {
  id?: InputMaybe<Scalars['ID']>;
  vzns?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type EditComponentSectionsFeaturedBlogPostInput = {
  first_blog?: InputMaybe<Scalars['ID']>;
  id?: InputMaybe<Scalars['ID']>;
  second_blog?: InputMaybe<Scalars['ID']>;
  third_blog?: InputMaybe<Scalars['ID']>;
};

export type EditComponentSectionsFileListInput = {
  fileList?: InputMaybe<Array<InputMaybe<EditComponentBlocksFileInput>>>;
  hasBackground?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type EditComponentSectionsIconTitleDescInput = {
  id?: InputMaybe<Scalars['ID']>;
  list?: InputMaybe<
    Array<InputMaybe<EditComponentBlocksIconWithTitleAndDescriptionInput>>
  >;
  title?: InputMaybe<Scalars['String']>;
};

export type EditComponentSectionsIframeInput = {
  id?: InputMaybe<Scalars['ID']>;
  iframe_allowfullscreen?: InputMaybe<Scalars['Boolean']>;
  iframe_frameBorder?: InputMaybe<Scalars['String']>;
  iframe_height?: InputMaybe<Scalars['Float']>;
  iframe_scrolling?: InputMaybe<Scalars['String']>;
  iframe_style?: InputMaybe<Scalars['String']>;
  iframe_url?: InputMaybe<Scalars['String']>;
  iframe_width?: InputMaybe<Scalars['Float']>;
};

export type EditComponentSectionsLinkInput = {
  hasBackground?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['ID']>;
  pageLinks?: InputMaybe<Array<InputMaybe<EditComponentBlocksPageLinkInput>>>;
  title?: InputMaybe<Scalars['String']>;
};

export type EditComponentSectionsListItemInput = {
  hasBackground?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['ID']>;
  listItems?: InputMaybe<Array<InputMaybe<EditComponentBlocksListItemInput>>>;
  title?: InputMaybe<Scalars['String']>;
};

export type EditComponentSectionsNarrowTextInput = {
  align?: InputMaybe<Enum_Componentsectionsnarrowtext_Align>;
  content?: InputMaybe<Scalars['String']>;
  hasBackground?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['ID']>;
  width?: InputMaybe<Enum_Componentsectionsnarrowtext_Width>;
};

export type EditComponentSectionsNewsletterInput = {
  id?: InputMaybe<Scalars['ID']>;
  title?: InputMaybe<Scalars['String']>;
};

export type EditComponentSectionsNumericalListInput = {
  buttonLink?: InputMaybe<Scalars['String']>;
  buttonText?: InputMaybe<Scalars['String']>;
  hasBackground?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['ID']>;
  items?: InputMaybe<
    Array<InputMaybe<EditComponentBlocksNumericalListItemInput>>
  >;
  title?: InputMaybe<Scalars['String']>;
  variant?: InputMaybe<Enum_Componentsectionsnumericallist_Variant>;
};

export type EditComponentSectionsSubpageListInput = {
  hasBackground?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['ID']>;
  subpageList?: InputMaybe<Array<InputMaybe<EditComponentBlocksPageLinkInput>>>;
};

export type EditComponentSectionsTextWithImageInput = {
  content?: InputMaybe<Scalars['String']>;
  hasBackground?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['ID']>;
  imagePosition?: InputMaybe<Enum_Componentsectionstextwithimage_Imageposition>;
  imageShadow?: InputMaybe<Scalars['Boolean']>;
  imageSrc?: InputMaybe<Scalars['ID']>;
};

export type EditComponentSectionsVideoInput = {
  id?: InputMaybe<Scalars['ID']>;
  subtitle?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  videos?: InputMaybe<Array<InputMaybe<EditComponentBlocksVideoInput>>>;
};

export type EditComponentSectionsWaveInput = {
  id?: InputMaybe<Scalars['ID']>;
  isRich?: InputMaybe<Scalars['Boolean']>;
  position?: InputMaybe<Enum_Componentsectionswaves_Position>;
};

export type EditEmailTemplateInput = {
  bodyHtml?: InputMaybe<Scalars['String']>;
  bodyText?: InputMaybe<Scalars['String']>;
  created_by?: InputMaybe<Scalars['ID']>;
  design?: InputMaybe<Scalars['JSON']>;
  enabled?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  sourceCodeToTemplateId?: InputMaybe<Scalars['Int']>;
  subject?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Scalars['JSON']>;
  updated_by?: InputMaybe<Scalars['ID']>;
};

export type EditFileInput = {
  alternativeText?: InputMaybe<Scalars['String']>;
  caption?: InputMaybe<Scalars['String']>;
  created_by?: InputMaybe<Scalars['ID']>;
  ext?: InputMaybe<Scalars['String']>;
  formats?: InputMaybe<Scalars['JSON']>;
  hash?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['Int']>;
  mime?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  previewUrl?: InputMaybe<Scalars['String']>;
  provider?: InputMaybe<Scalars['String']>;
  provider_metadata?: InputMaybe<Scalars['JSON']>;
  related?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  size?: InputMaybe<Scalars['Float']>;
  updated_by?: InputMaybe<Scalars['ID']>;
  url?: InputMaybe<Scalars['String']>;
  width?: InputMaybe<Scalars['Int']>;
};

export type EditFooterInput = {
  accessibilityLink?: InputMaybe<EditComponentBlocksPageLinkInput>;
  address?: InputMaybe<Scalars['String']>;
  copyright?: InputMaybe<Scalars['String']>;
  created_by?: InputMaybe<Scalars['ID']>;
  email?: InputMaybe<Scalars['String']>;
  facebookUrl?: InputMaybe<Scalars['String']>;
  footerSections?: InputMaybe<
    Array<InputMaybe<EditComponentBlocksFooterSectionInput>>
  >;
  instagramUrl?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['String']>;
  localizations?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  phone?: InputMaybe<Scalars['String']>;
  published_at?: InputMaybe<Scalars['DateTime']>;
  updated_by?: InputMaybe<Scalars['ID']>;
  youtubeUrl?: InputMaybe<Scalars['String']>;
};

export type EditFormInput = {
  Inputs?: InputMaybe<Array<Scalars['FormInputsDynamicZoneInput']>>;
  Target?: InputMaybe<Scalars['String']>;
  Title?: InputMaybe<Scalars['String']>;
  created_by?: InputMaybe<Scalars['ID']>;
  published_at?: InputMaybe<Scalars['DateTime']>;
  updated_by?: InputMaybe<Scalars['ID']>;
};

export type EditHomepageInput = {
  cards?: InputMaybe<
    Array<InputMaybe<EditComponentBlocksHomepageBookmarkInput>>
  >;
  created_by?: InputMaybe<Scalars['ID']>;
  header?: InputMaybe<EditComponentBlocksHeaderInput>;
  inba?: InputMaybe<EditComponentBlocksInBaInput>;
  left_highlight?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['String']>;
  localizations?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  posts?: InputMaybe<Array<InputMaybe<EditComponentBlocksHomepagePostInput>>>;
  published_at?: InputMaybe<Scalars['DateTime']>;
  right_highlight?: InputMaybe<Scalars['ID']>;
  updated_by?: InputMaybe<Scalars['ID']>;
};

export type EditLocaleInput = {
  code?: InputMaybe<Scalars['String']>;
  created_by?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  updated_by?: InputMaybe<Scalars['ID']>;
};

export type EditNavigationInput = {
  created_by?: InputMaybe<Scalars['ID']>;
  items?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  name?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  updated_by?: InputMaybe<Scalars['ID']>;
  visible?: InputMaybe<Scalars['Boolean']>;
};

export type EditNavigationitemInput = {
  audience?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  created_by?: InputMaybe<Scalars['ID']>;
  externalPath?: InputMaybe<Scalars['String']>;
  master?: InputMaybe<Scalars['ID']>;
  menuAttached?: InputMaybe<Scalars['Boolean']>;
  order?: InputMaybe<Scalars['Int']>;
  parent?: InputMaybe<Scalars['ID']>;
  path?: InputMaybe<Scalars['String']>;
  related?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Enum_Navigationnavigationitem_Type>;
  uiRouterKey?: InputMaybe<Scalars['String']>;
  updated_by?: InputMaybe<Scalars['ID']>;
};

export type EditPageCategoryInput = {
  color?: InputMaybe<Enum_Pagecategory_Color>;
  created_by?: InputMaybe<Scalars['ID']>;
  icon?: InputMaybe<Enum_Pagecategory_Icon>;
  iconHover?: InputMaybe<Enum_Pagecategory_Iconhover>;
  locale?: InputMaybe<Scalars['String']>;
  localizations?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  pages?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  priority?: InputMaybe<Scalars['Int']>;
  shortTitle?: InputMaybe<Scalars['String']>;
  subcategories?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  title?: InputMaybe<Scalars['String']>;
  updated_by?: InputMaybe<Scalars['ID']>;
};

export type EditPageInput = {
  childPages?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  created_by?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['String']>;
  localizations?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  metaDiscription?: InputMaybe<Scalars['String']>;
  pageBackgroundImage?: InputMaybe<Scalars['ID']>;
  pageButtonContent?: InputMaybe<EditComponentBlocksPageLinkInput>;
  pageCategory?: InputMaybe<Scalars['ID']>;
  pageColor?: InputMaybe<Enum_Page_Pagecolor>;
  pageHeaderSections?: InputMaybe<
    Array<Scalars['PagePageHeaderSectionsDynamicZoneInput']>
  >;
  parentPage?: InputMaybe<Scalars['ID']>;
  published_at?: InputMaybe<Scalars['DateTime']>;
  relatedContents?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  sections?: InputMaybe<Array<Scalars['PageSectionsDynamicZoneInput']>>;
  slug?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  updated_by?: InputMaybe<Scalars['ID']>;
};

export type EditPageSubcategoryInput = {
  created_by?: InputMaybe<Scalars['ID']>;
  icon?: InputMaybe<Enum_Pagesubcategory_Icon>;
  locale?: InputMaybe<Scalars['String']>;
  localizations?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  moreLink?: InputMaybe<EditComponentBlocksPageLinkInput>;
  pages?: InputMaybe<Array<InputMaybe<EditComponentBlocksPageLinkInput>>>;
  priority?: InputMaybe<Scalars['Int']>;
  title?: InputMaybe<Scalars['String']>;
  updated_by?: InputMaybe<Scalars['ID']>;
};

export type EditRoleInput = {
  created_by?: InputMaybe<Scalars['ID']>;
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  permissions?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  type?: InputMaybe<Scalars['String']>;
  updated_by?: InputMaybe<Scalars['ID']>;
  users?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type EditTagInput = {
  blogPosts?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  created_by?: InputMaybe<Scalars['ID']>;
  pageCategory?: InputMaybe<Scalars['ID']>;
  published_at?: InputMaybe<Scalars['DateTime']>;
  title?: InputMaybe<Scalars['String']>;
  updated_by?: InputMaybe<Scalars['ID']>;
};

export type EditUserInput = {
  blocked?: InputMaybe<Scalars['Boolean']>;
  confirmationToken?: InputMaybe<Scalars['String']>;
  confirmed?: InputMaybe<Scalars['Boolean']>;
  created_by?: InputMaybe<Scalars['ID']>;
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  posts?: InputMaybe<Scalars['ID']>;
  provider?: InputMaybe<Scalars['String']>;
  resetPasswordToken?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['ID']>;
  updated_by?: InputMaybe<Scalars['ID']>;
  username?: InputMaybe<Scalars['String']>;
};

export type EditVznInput = {
  amedmentDocument?: InputMaybe<
    Array<InputMaybe<EditComponentBlocksDocListExtensionInput>>
  >;
  cancellationDocument?: InputMaybe<
    Array<InputMaybe<EditComponentBlocksDocListExtensionInput>>
  >;
  category?: InputMaybe<Enum_Vzn_Category>;
  consolidatedText?: InputMaybe<Scalars['ID']>;
  created_by?: InputMaybe<Scalars['ID']>;
  details?: InputMaybe<Scalars['String']>;
  extentions?: InputMaybe<
    Array<InputMaybe<EditComponentBlocksDocListExtensionInput>>
  >;
  mainDocument?: InputMaybe<Scalars['ID']>;
  published_at?: InputMaybe<Scalars['DateTime']>;
  title?: InputMaybe<Scalars['String']>;
  updated_by?: InputMaybe<Scalars['ID']>;
  validFrom?: InputMaybe<Scalars['Date']>;
};

export type UpdateAuthorInput = {
  data?: InputMaybe<EditAuthorInput>;
  where?: InputMaybe<InputId>;
};

export type UpdateAuthorPayload = {
  __typename?: 'updateAuthorPayload';
  author?: Maybe<Author>;
};

export type UpdateBlogPostInput = {
  data?: InputMaybe<EditBlogPostInput>;
  where?: InputMaybe<InputId>;
};

export type UpdateBlogPostPayload = {
  __typename?: 'updateBlogPostPayload';
  blogPost?: Maybe<BlogPost>;
};

export type UpdateFooterInput = {
  data?: InputMaybe<EditFooterInput>;
};

export type UpdateFooterPayload = {
  __typename?: 'updateFooterPayload';
  footer?: Maybe<Footer>;
};

export type UpdateFormInput = {
  data?: InputMaybe<EditFormInput>;
  where?: InputMaybe<InputId>;
};

export type UpdateFormPayload = {
  __typename?: 'updateFormPayload';
  form?: Maybe<Form>;
};

export type UpdateHomepageInput = {
  data?: InputMaybe<EditHomepageInput>;
};

export type UpdateHomepagePayload = {
  __typename?: 'updateHomepagePayload';
  homepage?: Maybe<Homepage>;
};

export type UpdatePageCategoryInput = {
  data?: InputMaybe<EditPageCategoryInput>;
  where?: InputMaybe<InputId>;
};

export type UpdatePageCategoryPayload = {
  __typename?: 'updatePageCategoryPayload';
  pageCategory?: Maybe<PageCategory>;
};

export type UpdatePageInput = {
  data?: InputMaybe<EditPageInput>;
  where?: InputMaybe<InputId>;
};

export type UpdatePagePayload = {
  __typename?: 'updatePagePayload';
  page?: Maybe<Page>;
};

export type UpdatePageSubcategoryInput = {
  data?: InputMaybe<EditPageSubcategoryInput>;
  where?: InputMaybe<InputId>;
};

export type UpdatePageSubcategoryPayload = {
  __typename?: 'updatePageSubcategoryPayload';
  pageSubcategory?: Maybe<PageSubcategory>;
};

export type UpdateRoleInput = {
  data?: InputMaybe<EditRoleInput>;
  where?: InputMaybe<InputId>;
};

export type UpdateRolePayload = {
  __typename?: 'updateRolePayload';
  role?: Maybe<UsersPermissionsRole>;
};

export type UpdateTagInput = {
  data?: InputMaybe<EditTagInput>;
  where?: InputMaybe<InputId>;
};

export type UpdateTagPayload = {
  __typename?: 'updateTagPayload';
  tag?: Maybe<Tag>;
};

export type UpdateUserInput = {
  data?: InputMaybe<EditUserInput>;
  where?: InputMaybe<InputId>;
};

export type UpdateUserPayload = {
  __typename?: 'updateUserPayload';
  user?: Maybe<UsersPermissionsUser>;
};

export type UpdateVznInput = {
  data?: InputMaybe<EditVznInput>;
  where?: InputMaybe<InputId>;
};

export type UpdateVznPayload = {
  __typename?: 'updateVznPayload';
  vzn?: Maybe<Vzn>;
};

export type BlogPostBySlugQueryVariables = Exact<{
  slug: Scalars['String'];
  locale?: InputMaybe<Scalars['String']>;
}>;

export type BlogPostBySlugQuery = {
  __typename?: 'Query';
  blogPostBySlug?:
    | {
        __typename?: 'BlogPost';
        id: string;
        slug?: string | null | undefined;
        title?: string | null | undefined;
        excerpt?: string | null | undefined;
        created_at: any;
        tag?:
          | {
              __typename?: 'Tag';
              id: string;
              title?: string | null | undefined;
              pageCategory?:
                | {
                    __typename?: 'PageCategory';
                    id: string;
                    title?: string | null | undefined;
                    color?: Enum_Pagecategory_Color | null | undefined;
                  }
                | null
                | undefined;
            }
          | null
          | undefined;
        sections?:
          | Array<
              | {
                  __typename: 'ComponentSectionsAccordion';
                  title?: string | null | undefined;
                  hasBackground?: boolean | null | undefined;
                  institutions?:
                    | Array<
                        | {
                            __typename?: 'ComponentAccordionItemsInstitution';
                            title?: string | null | undefined;
                            subtitle?: string | null | undefined;
                            category?: string | null | undefined;
                            firstColumn?: string | null | undefined;
                            secondColumn?: string | null | undefined;
                            thirdColumn?: string | null | undefined;
                            url?: string | null | undefined;
                            urlLabel?: string | null | undefined;
                          }
                        | null
                        | undefined
                      >
                    | null
                    | undefined;
                  flatText?:
                    | Array<
                        | {
                            __typename?: 'ComponentAccordionItemsFlatText';
                            category?: string | null | undefined;
                            content?: string | null | undefined;
                            width?:
                              | Enum_Componentaccordionitemsflattext_Width
                              | null
                              | undefined;
                            align?:
                              | Enum_Componentaccordionitemsflattext_Align
                              | null
                              | undefined;
                            moreLinkTitle?: string | null | undefined;
                            moreLinkUrl?: string | null | undefined;
                            moreLinkPage?:
                              | {
                                  __typename?: 'Page';
                                  locale?: string | null | undefined;
                                  slug?: string | null | undefined;
                                  title?: string | null | undefined;
                                }
                              | null
                              | undefined;
                          }
                        | null
                        | undefined
                      >
                    | null
                    | undefined;
                  institutionsNarrow?:
                    | Array<
                        | {
                            __typename?: 'ComponentAccordionItemsInstitutionNarrow';
                            title?: string | null | undefined;
                            subtitle?: string | null | undefined;
                            category?: string | null | undefined;
                            url?: string | null | undefined;
                            urlLabel?: string | null | undefined;
                          }
                        | null
                        | undefined
                      >
                    | null
                    | undefined;
                }
              | {
                  __typename: 'ComponentSectionsArticlesList';
                  title?: string | null | undefined;
                  filtering?: boolean | null | undefined;
                  category?:
                    | {
                        __typename?: 'PageCategory';
                        title?: string | null | undefined;
                      }
                    | null
                    | undefined;
                }
              | {
                  __typename: 'ComponentSectionsCalculator';
                  hasBackground?: boolean | null | undefined;
                  single_adult_value?: number | null | undefined;
                  another_adult_value?: number | null | undefined;
                  child_value?: number | null | undefined;
                }
              | {
                  __typename: 'ComponentSectionsColumnedText';
                  hasBackground?: boolean | null | undefined;
                  content?: string | null | undefined;
                }
              | {
                  __typename: 'ComponentSectionsContact';
                  title?: string | null | undefined;
                  hasBackground?: boolean | null | undefined;
                  description?: string | null | undefined;
                  phone?: string | null | undefined;
                  phoneLabel?: string | null | undefined;
                  email?: string | null | undefined;
                  emailLabel?: string | null | undefined;
                  address?: string | null | undefined;
                }
              | {
                  __typename: 'ComponentSectionsDivider';
                  hasBackground?: boolean | null | undefined;
                  style?:
                    | Enum_Componentsectionsdivider_Style
                    | null
                    | undefined;
                }
              | {
                  __typename: 'ComponentSectionsFileList';
                  hasBackground?: boolean | null | undefined;
                  fileList?:
                    | Array<
                        | {
                            __typename?: 'ComponentBlocksFile';
                            title?: string | null | undefined;
                            category?: string | null | undefined;
                            media?:
                              | {
                                  __typename?: 'UploadFile';
                                  url: string;
                                  created_at: any;
                                  size: number;
                                  ext?: string | null | undefined;
                                }
                              | null
                              | undefined;
                          }
                        | null
                        | undefined
                      >
                    | null
                    | undefined;
                }
              | {
                  __typename: 'ComponentSectionsIconTitleDesc';
                  title?: string | null | undefined;
                  list?:
                    | Array<
                        | {
                            __typename?: 'ComponentBlocksIconWithTitleAndDescription';
                            title?: string | null | undefined;
                            desc?: string | null | undefined;
                            icon?:
                              | {
                                  __typename?: 'UploadFile';
                                  id: string;
                                  url: string;
                                }
                              | null
                              | undefined;
                          }
                        | null
                        | undefined
                      >
                    | null
                    | undefined;
                }
              | {
                  __typename: 'ComponentSectionsLinks';
                  title?: string | null | undefined;
                  hasBackground?: boolean | null | undefined;
                  pageLinks?:
                    | Array<
                        | {
                            __typename?: 'ComponentBlocksPageLink';
                            title?: string | null | undefined;
                            url?: string | null | undefined;
                            anchor?: string | null | undefined;
                            page?:
                              | {
                                  __typename?: 'Page';
                                  locale?: string | null | undefined;
                                  slug?: string | null | undefined;
                                  title?: string | null | undefined;
                                }
                              | null
                              | undefined;
                          }
                        | null
                        | undefined
                      >
                    | null
                    | undefined;
                }
              | {
                  __typename: 'ComponentSectionsListItems';
                  title?: string | null | undefined;
                  hasBackground?: boolean | null | undefined;
                  listItems?:
                    | Array<
                        | {
                            __typename?: 'ComponentBlocksListItem';
                            content?: string | null | undefined;
                            moreLinkTitle?: string | null | undefined;
                            moreLinkUrl?: string | null | undefined;
                            circleOption?:
                              | Enum_Componentblockslistitem_Circleoption
                              | null
                              | undefined;
                            moreLinkPage?:
                              | {
                                  __typename?: 'Page';
                                  locale?: string | null | undefined;
                                  slug?: string | null | undefined;
                                  title?: string | null | undefined;
                                }
                              | null
                              | undefined;
                          }
                        | null
                        | undefined
                      >
                    | null
                    | undefined;
                }
              | {
                  __typename: 'ComponentSectionsNarrowText';
                  hasBackground?: boolean | null | undefined;
                  content?: string | null | undefined;
                  width?:
                    | Enum_Componentsectionsnarrowtext_Width
                    | null
                    | undefined;
                  align?:
                    | Enum_Componentsectionsnarrowtext_Align
                    | null
                    | undefined;
                }
              | {
                  __typename: 'ComponentSectionsNumericalList';
                  id: string;
                  title?: string | null | undefined;
                  variant?:
                    | Enum_Componentsectionsnumericallist_Variant
                    | null
                    | undefined;
                  buttonText?: string | null | undefined;
                  buttonLink?: string | null | undefined;
                  hasBackground?: boolean | null | undefined;
                  items?:
                    | Array<
                        | {
                            __typename?: 'ComponentBlocksNumericalListItem';
                            text: string;
                          }
                        | null
                        | undefined
                      >
                    | null
                    | undefined;
                }
              | {
                  __typename: 'ComponentSectionsTextWithImage';
                  hasBackground?: boolean | null | undefined;
                  content?: string | null | undefined;
                  imagePosition?:
                    | Enum_Componentsectionstextwithimage_Imageposition
                    | null
                    | undefined;
                  imageShadow?: boolean | null | undefined;
                  imageSrc?:
                    | { __typename?: 'UploadFile'; url: string }
                    | null
                    | undefined;
                }
              | {
                  __typename: 'ComponentSectionsVideos';
                  id: string;
                  title?: string | null | undefined;
                  subtitle?: string | null | undefined;
                  videos?:
                    | Array<
                        | {
                            __typename?: 'ComponentBlocksVideo';
                            id: string;
                            title?: string | null | undefined;
                            speaker?: string | null | undefined;
                            url?: string | null | undefined;
                          }
                        | null
                        | undefined
                      >
                    | null
                    | undefined;
                }
              | {
                  __typename: 'ComponentSectionsWaves';
                  position?:
                    | Enum_Componentsectionswaves_Position
                    | null
                    | undefined;
                  isRich?: boolean | null | undefined;
                }
              | null
              | undefined
            >
          | null
          | undefined;
        coverImage?:
          | { __typename?: 'UploadFile'; url: string }
          | null
          | undefined;
        moreLink?:
          | {
              __typename?: 'ComponentBlocksBlogPostLink';
              title?: string | null | undefined;
              url?: string | null | undefined;
              blogPost?:
                | {
                    __typename?: 'BlogPost';
                    title?: string | null | undefined;
                    slug?: string | null | undefined;
                  }
                | null
                | undefined;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
  footer?:
    | {
        __typename?: 'Footer';
        address?: string | null | undefined;
        phone?: string | null | undefined;
        email?: string | null | undefined;
        copyright?: string | null | undefined;
        youtubeUrl?: string | null | undefined;
        facebookUrl?: string | null | undefined;
        instagramUrl?: string | null | undefined;
        accessibilityLink?:
          | {
              __typename?: 'ComponentBlocksPageLink';
              title?: string | null | undefined;
              url?: string | null | undefined;
              anchor?: string | null | undefined;
              page?:
                | {
                    __typename?: 'Page';
                    locale?: string | null | undefined;
                    slug?: string | null | undefined;
                    title?: string | null | undefined;
                  }
                | null
                | undefined;
            }
          | null
          | undefined;
        footerSections?:
          | Array<
              | {
                  __typename?: 'ComponentBlocksFooterSection';
                  title?: string | null | undefined;
                  pageLinks?:
                    | Array<
                        | {
                            __typename?: 'ComponentBlocksPageLink';
                            title?: string | null | undefined;
                            url?: string | null | undefined;
                            anchor?: string | null | undefined;
                            page?:
                              | {
                                  __typename?: 'Page';
                                  locale?: string | null | undefined;
                                  slug?: string | null | undefined;
                                  title?: string | null | undefined;
                                }
                              | null
                              | undefined;
                          }
                        | null
                        | undefined
                      >
                    | null
                    | undefined;
                }
              | null
              | undefined
            >
          | null
          | undefined;
      }
    | null
    | undefined;
  mainMenu?:
    | Array<
        | {
            __typename?: 'PageCategory';
            id: string;
            title?: string | null | undefined;
            color?: Enum_Pagecategory_Color | null | undefined;
            icon?: Enum_Pagecategory_Icon | null | undefined;
            iconHover?: Enum_Pagecategory_Iconhover | null | undefined;
            priority?: number | null | undefined;
            subcategories?:
              | Array<
                  | {
                      __typename?: 'PageSubcategory';
                      id: string;
                      title?: string | null | undefined;
                      priority?: number | null | undefined;
                      icon?: Enum_Pagesubcategory_Icon | null | undefined;
                      moreLink?:
                        | {
                            __typename?: 'ComponentBlocksPageLink';
                            title?: string | null | undefined;
                            url?: string | null | undefined;
                            anchor?: string | null | undefined;
                            page?:
                              | {
                                  __typename?: 'Page';
                                  locale?: string | null | undefined;
                                  slug?: string | null | undefined;
                                  title?: string | null | undefined;
                                }
                              | null
                              | undefined;
                          }
                        | null
                        | undefined;
                      pages?:
                        | Array<
                            | {
                                __typename?: 'ComponentBlocksPageLink';
                                title?: string | null | undefined;
                                url?: string | null | undefined;
                                anchor?: string | null | undefined;
                                page?:
                                  | {
                                      __typename?: 'Page';
                                      locale?: string | null | undefined;
                                      slug?: string | null | undefined;
                                      title?: string | null | undefined;
                                    }
                                  | null
                                  | undefined;
                              }
                            | null
                            | undefined
                          >
                        | null
                        | undefined;
                    }
                  | null
                  | undefined
                >
              | null
              | undefined;
          }
        | null
        | undefined
      >
    | null
    | undefined;
};

export type RelatedPostsBySlugQueryVariables = Exact<{
  slug: Scalars['String'];
  locale: Scalars['String'];
}>;

export type RelatedPostsBySlugQuery = {
  __typename?: 'Query';
  relatedPostsBySlug: Array<{
    __typename?: 'BlogPost';
    id: string;
    slug?: string | null | undefined;
    title?: string | null | undefined;
    excerpt?: string | null | undefined;
    created_at: any;
    tag?:
      | {
          __typename?: 'Tag';
          id: string;
          title?: string | null | undefined;
          pageCategory?:
            | {
                __typename?: 'PageCategory';
                id: string;
                title?: string | null | undefined;
                color?: Enum_Pagecategory_Color | null | undefined;
              }
            | null
            | undefined;
        }
      | null
      | undefined;
    sections?:
      | Array<
          | {
              __typename: 'ComponentSectionsAccordion';
              title?: string | null | undefined;
              hasBackground?: boolean | null | undefined;
              institutions?:
                | Array<
                    | {
                        __typename?: 'ComponentAccordionItemsInstitution';
                        title?: string | null | undefined;
                        subtitle?: string | null | undefined;
                        category?: string | null | undefined;
                        firstColumn?: string | null | undefined;
                        secondColumn?: string | null | undefined;
                        thirdColumn?: string | null | undefined;
                        url?: string | null | undefined;
                        urlLabel?: string | null | undefined;
                      }
                    | null
                    | undefined
                  >
                | null
                | undefined;
              flatText?:
                | Array<
                    | {
                        __typename?: 'ComponentAccordionItemsFlatText';
                        category?: string | null | undefined;
                        content?: string | null | undefined;
                        width?:
                          | Enum_Componentaccordionitemsflattext_Width
                          | null
                          | undefined;
                        align?:
                          | Enum_Componentaccordionitemsflattext_Align
                          | null
                          | undefined;
                        moreLinkTitle?: string | null | undefined;
                        moreLinkUrl?: string | null | undefined;
                        moreLinkPage?:
                          | {
                              __typename?: 'Page';
                              locale?: string | null | undefined;
                              slug?: string | null | undefined;
                              title?: string | null | undefined;
                            }
                          | null
                          | undefined;
                      }
                    | null
                    | undefined
                  >
                | null
                | undefined;
              institutionsNarrow?:
                | Array<
                    | {
                        __typename?: 'ComponentAccordionItemsInstitutionNarrow';
                        title?: string | null | undefined;
                        subtitle?: string | null | undefined;
                        category?: string | null | undefined;
                        url?: string | null | undefined;
                        urlLabel?: string | null | undefined;
                      }
                    | null
                    | undefined
                  >
                | null
                | undefined;
            }
          | {
              __typename: 'ComponentSectionsArticlesList';
              title?: string | null | undefined;
              filtering?: boolean | null | undefined;
              category?:
                | {
                    __typename?: 'PageCategory';
                    title?: string | null | undefined;
                  }
                | null
                | undefined;
            }
          | {
              __typename: 'ComponentSectionsCalculator';
              hasBackground?: boolean | null | undefined;
              single_adult_value?: number | null | undefined;
              another_adult_value?: number | null | undefined;
              child_value?: number | null | undefined;
            }
          | {
              __typename: 'ComponentSectionsColumnedText';
              hasBackground?: boolean | null | undefined;
              content?: string | null | undefined;
            }
          | {
              __typename: 'ComponentSectionsContact';
              title?: string | null | undefined;
              hasBackground?: boolean | null | undefined;
              description?: string | null | undefined;
              phone?: string | null | undefined;
              phoneLabel?: string | null | undefined;
              email?: string | null | undefined;
              emailLabel?: string | null | undefined;
              address?: string | null | undefined;
            }
          | {
              __typename: 'ComponentSectionsDivider';
              hasBackground?: boolean | null | undefined;
              style?: Enum_Componentsectionsdivider_Style | null | undefined;
            }
          | {
              __typename: 'ComponentSectionsFileList';
              hasBackground?: boolean | null | undefined;
              fileList?:
                | Array<
                    | {
                        __typename?: 'ComponentBlocksFile';
                        title?: string | null | undefined;
                        category?: string | null | undefined;
                        media?:
                          | {
                              __typename?: 'UploadFile';
                              url: string;
                              created_at: any;
                              size: number;
                              ext?: string | null | undefined;
                            }
                          | null
                          | undefined;
                      }
                    | null
                    | undefined
                  >
                | null
                | undefined;
            }
          | {
              __typename: 'ComponentSectionsIconTitleDesc';
              title?: string | null | undefined;
              list?:
                | Array<
                    | {
                        __typename?: 'ComponentBlocksIconWithTitleAndDescription';
                        title?: string | null | undefined;
                        desc?: string | null | undefined;
                        icon?:
                          | {
                              __typename?: 'UploadFile';
                              id: string;
                              url: string;
                            }
                          | null
                          | undefined;
                      }
                    | null
                    | undefined
                  >
                | null
                | undefined;
            }
          | {
              __typename: 'ComponentSectionsLinks';
              title?: string | null | undefined;
              hasBackground?: boolean | null | undefined;
              pageLinks?:
                | Array<
                    | {
                        __typename?: 'ComponentBlocksPageLink';
                        title?: string | null | undefined;
                        url?: string | null | undefined;
                        anchor?: string | null | undefined;
                        page?:
                          | {
                              __typename?: 'Page';
                              locale?: string | null | undefined;
                              slug?: string | null | undefined;
                              title?: string | null | undefined;
                            }
                          | null
                          | undefined;
                      }
                    | null
                    | undefined
                  >
                | null
                | undefined;
            }
          | {
              __typename: 'ComponentSectionsListItems';
              title?: string | null | undefined;
              hasBackground?: boolean | null | undefined;
              listItems?:
                | Array<
                    | {
                        __typename?: 'ComponentBlocksListItem';
                        content?: string | null | undefined;
                        moreLinkTitle?: string | null | undefined;
                        moreLinkUrl?: string | null | undefined;
                        circleOption?:
                          | Enum_Componentblockslistitem_Circleoption
                          | null
                          | undefined;
                        moreLinkPage?:
                          | {
                              __typename?: 'Page';
                              locale?: string | null | undefined;
                              slug?: string | null | undefined;
                              title?: string | null | undefined;
                            }
                          | null
                          | undefined;
                      }
                    | null
                    | undefined
                  >
                | null
                | undefined;
            }
          | {
              __typename: 'ComponentSectionsNarrowText';
              hasBackground?: boolean | null | undefined;
              content?: string | null | undefined;
              width?: Enum_Componentsectionsnarrowtext_Width | null | undefined;
              align?: Enum_Componentsectionsnarrowtext_Align | null | undefined;
            }
          | {
              __typename: 'ComponentSectionsNumericalList';
              id: string;
              title?: string | null | undefined;
              variant?:
                | Enum_Componentsectionsnumericallist_Variant
                | null
                | undefined;
              buttonText?: string | null | undefined;
              buttonLink?: string | null | undefined;
              hasBackground?: boolean | null | undefined;
              items?:
                | Array<
                    | {
                        __typename?: 'ComponentBlocksNumericalListItem';
                        text: string;
                      }
                    | null
                    | undefined
                  >
                | null
                | undefined;
            }
          | {
              __typename: 'ComponentSectionsTextWithImage';
              hasBackground?: boolean | null | undefined;
              content?: string | null | undefined;
              imagePosition?:
                | Enum_Componentsectionstextwithimage_Imageposition
                | null
                | undefined;
              imageShadow?: boolean | null | undefined;
              imageSrc?:
                | { __typename?: 'UploadFile'; url: string }
                | null
                | undefined;
            }
          | {
              __typename: 'ComponentSectionsVideos';
              id: string;
              title?: string | null | undefined;
              subtitle?: string | null | undefined;
              videos?:
                | Array<
                    | {
                        __typename?: 'ComponentBlocksVideo';
                        id: string;
                        title?: string | null | undefined;
                        speaker?: string | null | undefined;
                        url?: string | null | undefined;
                      }
                    | null
                    | undefined
                  >
                | null
                | undefined;
            }
          | {
              __typename: 'ComponentSectionsWaves';
              position?:
                | Enum_Componentsectionswaves_Position
                | null
                | undefined;
              isRich?: boolean | null | undefined;
            }
          | null
          | undefined
        >
      | null
      | undefined;
    coverImage?: { __typename?: 'UploadFile'; url: string } | null | undefined;
    moreLink?:
      | {
          __typename?: 'ComponentBlocksBlogPostLink';
          title?: string | null | undefined;
          url?: string | null | undefined;
          blogPost?:
            | {
                __typename?: 'BlogPost';
                title?: string | null | undefined;
                slug?: string | null | undefined;
              }
            | null
            | undefined;
        }
      | null
      | undefined;
  }>;
};

export type LatestPostsByTagsQueryVariables = Exact<{
  tags?: InputMaybe<
    Array<InputMaybe<Scalars['Int']>> | InputMaybe<Scalars['Int']>
  >;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
}>;

export type LatestPostsByTagsQuery = {
  __typename?: 'Query';
  latestPostsByTags: Array<{
    __typename?: 'BlogPost';
    id: string;
    slug?: string | null | undefined;
    title?: string | null | undefined;
    excerpt?: string | null | undefined;
    created_at: any;
    tag?:
      | {
          __typename?: 'Tag';
          id: string;
          title?: string | null | undefined;
          pageCategory?:
            | {
                __typename?: 'PageCategory';
                id: string;
                title?: string | null | undefined;
                color?: Enum_Pagecategory_Color | null | undefined;
              }
            | null
            | undefined;
        }
      | null
      | undefined;
    sections?:
      | Array<
          | {
              __typename: 'ComponentSectionsAccordion';
              title?: string | null | undefined;
              hasBackground?: boolean | null | undefined;
              institutions?:
                | Array<
                    | {
                        __typename?: 'ComponentAccordionItemsInstitution';
                        title?: string | null | undefined;
                        subtitle?: string | null | undefined;
                        category?: string | null | undefined;
                        firstColumn?: string | null | undefined;
                        secondColumn?: string | null | undefined;
                        thirdColumn?: string | null | undefined;
                        url?: string | null | undefined;
                        urlLabel?: string | null | undefined;
                      }
                    | null
                    | undefined
                  >
                | null
                | undefined;
              flatText?:
                | Array<
                    | {
                        __typename?: 'ComponentAccordionItemsFlatText';
                        category?: string | null | undefined;
                        content?: string | null | undefined;
                        width?:
                          | Enum_Componentaccordionitemsflattext_Width
                          | null
                          | undefined;
                        align?:
                          | Enum_Componentaccordionitemsflattext_Align
                          | null
                          | undefined;
                        moreLinkTitle?: string | null | undefined;
                        moreLinkUrl?: string | null | undefined;
                        moreLinkPage?:
                          | {
                              __typename?: 'Page';
                              locale?: string | null | undefined;
                              slug?: string | null | undefined;
                              title?: string | null | undefined;
                            }
                          | null
                          | undefined;
                      }
                    | null
                    | undefined
                  >
                | null
                | undefined;
              institutionsNarrow?:
                | Array<
                    | {
                        __typename?: 'ComponentAccordionItemsInstitutionNarrow';
                        title?: string | null | undefined;
                        subtitle?: string | null | undefined;
                        category?: string | null | undefined;
                        url?: string | null | undefined;
                        urlLabel?: string | null | undefined;
                      }
                    | null
                    | undefined
                  >
                | null
                | undefined;
            }
          | {
              __typename: 'ComponentSectionsArticlesList';
              title?: string | null | undefined;
              filtering?: boolean | null | undefined;
              category?:
                | {
                    __typename?: 'PageCategory';
                    title?: string | null | undefined;
                  }
                | null
                | undefined;
            }
          | {
              __typename: 'ComponentSectionsCalculator';
              hasBackground?: boolean | null | undefined;
              single_adult_value?: number | null | undefined;
              another_adult_value?: number | null | undefined;
              child_value?: number | null | undefined;
            }
          | {
              __typename: 'ComponentSectionsColumnedText';
              hasBackground?: boolean | null | undefined;
              content?: string | null | undefined;
            }
          | {
              __typename: 'ComponentSectionsContact';
              title?: string | null | undefined;
              hasBackground?: boolean | null | undefined;
              description?: string | null | undefined;
              phone?: string | null | undefined;
              phoneLabel?: string | null | undefined;
              email?: string | null | undefined;
              emailLabel?: string | null | undefined;
              address?: string | null | undefined;
            }
          | {
              __typename: 'ComponentSectionsDivider';
              hasBackground?: boolean | null | undefined;
              style?: Enum_Componentsectionsdivider_Style | null | undefined;
            }
          | {
              __typename: 'ComponentSectionsFileList';
              hasBackground?: boolean | null | undefined;
              fileList?:
                | Array<
                    | {
                        __typename?: 'ComponentBlocksFile';
                        title?: string | null | undefined;
                        category?: string | null | undefined;
                        media?:
                          | {
                              __typename?: 'UploadFile';
                              url: string;
                              created_at: any;
                              size: number;
                              ext?: string | null | undefined;
                            }
                          | null
                          | undefined;
                      }
                    | null
                    | undefined
                  >
                | null
                | undefined;
            }
          | {
              __typename: 'ComponentSectionsIconTitleDesc';
              title?: string | null | undefined;
              list?:
                | Array<
                    | {
                        __typename?: 'ComponentBlocksIconWithTitleAndDescription';
                        title?: string | null | undefined;
                        desc?: string | null | undefined;
                        icon?:
                          | {
                              __typename?: 'UploadFile';
                              id: string;
                              url: string;
                            }
                          | null
                          | undefined;
                      }
                    | null
                    | undefined
                  >
                | null
                | undefined;
            }
          | {
              __typename: 'ComponentSectionsLinks';
              title?: string | null | undefined;
              hasBackground?: boolean | null | undefined;
              pageLinks?:
                | Array<
                    | {
                        __typename?: 'ComponentBlocksPageLink';
                        title?: string | null | undefined;
                        url?: string | null | undefined;
                        anchor?: string | null | undefined;
                        page?:
                          | {
                              __typename?: 'Page';
                              locale?: string | null | undefined;
                              slug?: string | null | undefined;
                              title?: string | null | undefined;
                            }
                          | null
                          | undefined;
                      }
                    | null
                    | undefined
                  >
                | null
                | undefined;
            }
          | {
              __typename: 'ComponentSectionsListItems';
              title?: string | null | undefined;
              hasBackground?: boolean | null | undefined;
              listItems?:
                | Array<
                    | {
                        __typename?: 'ComponentBlocksListItem';
                        content?: string | null | undefined;
                        moreLinkTitle?: string | null | undefined;
                        moreLinkUrl?: string | null | undefined;
                        circleOption?:
                          | Enum_Componentblockslistitem_Circleoption
                          | null
                          | undefined;
                        moreLinkPage?:
                          | {
                              __typename?: 'Page';
                              locale?: string | null | undefined;
                              slug?: string | null | undefined;
                              title?: string | null | undefined;
                            }
                          | null
                          | undefined;
                      }
                    | null
                    | undefined
                  >
                | null
                | undefined;
            }
          | {
              __typename: 'ComponentSectionsNarrowText';
              hasBackground?: boolean | null | undefined;
              content?: string | null | undefined;
              width?: Enum_Componentsectionsnarrowtext_Width | null | undefined;
              align?: Enum_Componentsectionsnarrowtext_Align | null | undefined;
            }
          | {
              __typename: 'ComponentSectionsNumericalList';
              id: string;
              title?: string | null | undefined;
              variant?:
                | Enum_Componentsectionsnumericallist_Variant
                | null
                | undefined;
              buttonText?: string | null | undefined;
              buttonLink?: string | null | undefined;
              hasBackground?: boolean | null | undefined;
              items?:
                | Array<
                    | {
                        __typename?: 'ComponentBlocksNumericalListItem';
                        text: string;
                      }
                    | null
                    | undefined
                  >
                | null
                | undefined;
            }
          | {
              __typename: 'ComponentSectionsTextWithImage';
              hasBackground?: boolean | null | undefined;
              content?: string | null | undefined;
              imagePosition?:
                | Enum_Componentsectionstextwithimage_Imageposition
                | null
                | undefined;
              imageShadow?: boolean | null | undefined;
              imageSrc?:
                | { __typename?: 'UploadFile'; url: string }
                | null
                | undefined;
            }
          | {
              __typename: 'ComponentSectionsVideos';
              id: string;
              title?: string | null | undefined;
              subtitle?: string | null | undefined;
              videos?:
                | Array<
                    | {
                        __typename?: 'ComponentBlocksVideo';
                        id: string;
                        title?: string | null | undefined;
                        speaker?: string | null | undefined;
                        url?: string | null | undefined;
                      }
                    | null
                    | undefined
                  >
                | null
                | undefined;
            }
          | {
              __typename: 'ComponentSectionsWaves';
              position?:
                | Enum_Componentsectionswaves_Position
                | null
                | undefined;
              isRich?: boolean | null | undefined;
            }
          | null
          | undefined
        >
      | null
      | undefined;
    coverImage?: { __typename?: 'UploadFile'; url: string } | null | undefined;
    moreLink?:
      | {
          __typename?: 'ComponentBlocksBlogPostLink';
          title?: string | null | undefined;
          url?: string | null | undefined;
          blogPost?:
            | {
                __typename?: 'BlogPost';
                title?: string | null | undefined;
                slug?: string | null | undefined;
              }
            | null
            | undefined;
        }
      | null
      | undefined;
  }>;
};

export type BlogPostsStaticPathsQueryVariables = Exact<{
  locale?: InputMaybe<Scalars['String']>;
}>;

export type BlogPostsStaticPathsQuery = {
  __typename?: 'Query';
  blogPosts?:
    | Array<
        | {
            __typename?: 'BlogPost';
            id: string;
            slug?: string | null | undefined;
          }
        | null
        | undefined
      >
    | null
    | undefined;
};

export type LatestBlogsWithTagsQueryVariables = Exact<{
  sort?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Scalars['JSON']>;
}>;

export type LatestBlogsWithTagsQuery = {
  __typename?: 'Query';
  blogPosts?:
    | Array<
        | {
            __typename?: 'BlogPost';
            slug?: string | null | undefined;
            title?: string | null | undefined;
            excerpt?: string | null | undefined;
            published_at?: any | null | undefined;
            coverImage?:
              | { __typename?: 'UploadFile'; url: string }
              | null
              | undefined;
            tag?:
              | {
                  __typename?: 'Tag';
                  title?: string | null | undefined;
                  pageCategory?:
                    | {
                        __typename?: 'PageCategory';
                        title?: string | null | undefined;
                        color?: Enum_Pagecategory_Color | null | undefined;
                      }
                    | null
                    | undefined;
                }
              | null
              | undefined;
          }
        | null
        | undefined
      >
    | null
    | undefined;
};

export type TotalPostsCountQueryVariables = Exact<{
  where?: InputMaybe<Scalars['JSON']>;
}>;

export type TotalPostsCountQuery = {
  __typename?: 'Query';
  blogPostsConnection?:
    | {
        __typename?: 'BlogPostConnection';
        aggregate?:
          | {
              __typename?: 'BlogPostAggregator';
              count?: number | null | undefined;
              totalCount?: number | null | undefined;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type RelatedTagsQueryVariables = Exact<{
  where?: InputMaybe<Scalars['JSON']>;
}>;

export type RelatedTagsQuery = {
  __typename?: 'Query';
  tags?:
    | Array<
        | {
            __typename?: 'Tag';
            title?: string | null | undefined;
            pageCategory?:
              | {
                  __typename?: 'PageCategory';
                  title?: string | null | undefined;
                  color?: Enum_Pagecategory_Color | null | undefined;
                }
              | null
              | undefined;
          }
        | null
        | undefined
      >
    | null
    | undefined;
};

export type BlogPostFragment = {
  __typename?: 'BlogPost';
  id: string;
  slug?: string | null | undefined;
  title?: string | null | undefined;
  excerpt?: string | null | undefined;
  created_at: any;
  tag?:
    | {
        __typename?: 'Tag';
        id: string;
        title?: string | null | undefined;
        pageCategory?:
          | {
              __typename?: 'PageCategory';
              id: string;
              title?: string | null | undefined;
              color?: Enum_Pagecategory_Color | null | undefined;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
  sections?:
    | Array<
        | {
            __typename: 'ComponentSectionsAccordion';
            title?: string | null | undefined;
            hasBackground?: boolean | null | undefined;
            institutions?:
              | Array<
                  | {
                      __typename?: 'ComponentAccordionItemsInstitution';
                      title?: string | null | undefined;
                      subtitle?: string | null | undefined;
                      category?: string | null | undefined;
                      firstColumn?: string | null | undefined;
                      secondColumn?: string | null | undefined;
                      thirdColumn?: string | null | undefined;
                      url?: string | null | undefined;
                      urlLabel?: string | null | undefined;
                    }
                  | null
                  | undefined
                >
              | null
              | undefined;
            flatText?:
              | Array<
                  | {
                      __typename?: 'ComponentAccordionItemsFlatText';
                      category?: string | null | undefined;
                      content?: string | null | undefined;
                      width?:
                        | Enum_Componentaccordionitemsflattext_Width
                        | null
                        | undefined;
                      align?:
                        | Enum_Componentaccordionitemsflattext_Align
                        | null
                        | undefined;
                      moreLinkTitle?: string | null | undefined;
                      moreLinkUrl?: string | null | undefined;
                      moreLinkPage?:
                        | {
                            __typename?: 'Page';
                            locale?: string | null | undefined;
                            slug?: string | null | undefined;
                            title?: string | null | undefined;
                          }
                        | null
                        | undefined;
                    }
                  | null
                  | undefined
                >
              | null
              | undefined;
            institutionsNarrow?:
              | Array<
                  | {
                      __typename?: 'ComponentAccordionItemsInstitutionNarrow';
                      title?: string | null | undefined;
                      subtitle?: string | null | undefined;
                      category?: string | null | undefined;
                      url?: string | null | undefined;
                      urlLabel?: string | null | undefined;
                    }
                  | null
                  | undefined
                >
              | null
              | undefined;
          }
        | {
            __typename: 'ComponentSectionsArticlesList';
            title?: string | null | undefined;
            filtering?: boolean | null | undefined;
            category?:
              | {
                  __typename?: 'PageCategory';
                  title?: string | null | undefined;
                }
              | null
              | undefined;
          }
        | {
            __typename: 'ComponentSectionsCalculator';
            hasBackground?: boolean | null | undefined;
            single_adult_value?: number | null | undefined;
            another_adult_value?: number | null | undefined;
            child_value?: number | null | undefined;
          }
        | {
            __typename: 'ComponentSectionsColumnedText';
            hasBackground?: boolean | null | undefined;
            content?: string | null | undefined;
          }
        | {
            __typename: 'ComponentSectionsContact';
            title?: string | null | undefined;
            hasBackground?: boolean | null | undefined;
            description?: string | null | undefined;
            phone?: string | null | undefined;
            phoneLabel?: string | null | undefined;
            email?: string | null | undefined;
            emailLabel?: string | null | undefined;
            address?: string | null | undefined;
          }
        | {
            __typename: 'ComponentSectionsDivider';
            hasBackground?: boolean | null | undefined;
            style?: Enum_Componentsectionsdivider_Style | null | undefined;
          }
        | {
            __typename: 'ComponentSectionsFileList';
            hasBackground?: boolean | null | undefined;
            fileList?:
              | Array<
                  | {
                      __typename?: 'ComponentBlocksFile';
                      title?: string | null | undefined;
                      category?: string | null | undefined;
                      media?:
                        | {
                            __typename?: 'UploadFile';
                            url: string;
                            created_at: any;
                            size: number;
                            ext?: string | null | undefined;
                          }
                        | null
                        | undefined;
                    }
                  | null
                  | undefined
                >
              | null
              | undefined;
          }
        | {
            __typename: 'ComponentSectionsIconTitleDesc';
            title?: string | null | undefined;
            list?:
              | Array<
                  | {
                      __typename?: 'ComponentBlocksIconWithTitleAndDescription';
                      title?: string | null | undefined;
                      desc?: string | null | undefined;
                      icon?:
                        | { __typename?: 'UploadFile'; id: string; url: string }
                        | null
                        | undefined;
                    }
                  | null
                  | undefined
                >
              | null
              | undefined;
          }
        | {
            __typename: 'ComponentSectionsLinks';
            title?: string | null | undefined;
            hasBackground?: boolean | null | undefined;
            pageLinks?:
              | Array<
                  | {
                      __typename?: 'ComponentBlocksPageLink';
                      title?: string | null | undefined;
                      url?: string | null | undefined;
                      anchor?: string | null | undefined;
                      page?:
                        | {
                            __typename?: 'Page';
                            locale?: string | null | undefined;
                            slug?: string | null | undefined;
                            title?: string | null | undefined;
                          }
                        | null
                        | undefined;
                    }
                  | null
                  | undefined
                >
              | null
              | undefined;
          }
        | {
            __typename: 'ComponentSectionsListItems';
            title?: string | null | undefined;
            hasBackground?: boolean | null | undefined;
            listItems?:
              | Array<
                  | {
                      __typename?: 'ComponentBlocksListItem';
                      content?: string | null | undefined;
                      moreLinkTitle?: string | null | undefined;
                      moreLinkUrl?: string | null | undefined;
                      circleOption?:
                        | Enum_Componentblockslistitem_Circleoption
                        | null
                        | undefined;
                      moreLinkPage?:
                        | {
                            __typename?: 'Page';
                            locale?: string | null | undefined;
                            slug?: string | null | undefined;
                            title?: string | null | undefined;
                          }
                        | null
                        | undefined;
                    }
                  | null
                  | undefined
                >
              | null
              | undefined;
          }
        | {
            __typename: 'ComponentSectionsNarrowText';
            hasBackground?: boolean | null | undefined;
            content?: string | null | undefined;
            width?: Enum_Componentsectionsnarrowtext_Width | null | undefined;
            align?: Enum_Componentsectionsnarrowtext_Align | null | undefined;
          }
        | {
            __typename: 'ComponentSectionsNumericalList';
            id: string;
            title?: string | null | undefined;
            variant?:
              | Enum_Componentsectionsnumericallist_Variant
              | null
              | undefined;
            buttonText?: string | null | undefined;
            buttonLink?: string | null | undefined;
            hasBackground?: boolean | null | undefined;
            items?:
              | Array<
                  | {
                      __typename?: 'ComponentBlocksNumericalListItem';
                      text: string;
                    }
                  | null
                  | undefined
                >
              | null
              | undefined;
          }
        | {
            __typename: 'ComponentSectionsTextWithImage';
            hasBackground?: boolean | null | undefined;
            content?: string | null | undefined;
            imagePosition?:
              | Enum_Componentsectionstextwithimage_Imageposition
              | null
              | undefined;
            imageShadow?: boolean | null | undefined;
            imageSrc?:
              | { __typename?: 'UploadFile'; url: string }
              | null
              | undefined;
          }
        | {
            __typename: 'ComponentSectionsVideos';
            id: string;
            title?: string | null | undefined;
            subtitle?: string | null | undefined;
            videos?:
              | Array<
                  | {
                      __typename?: 'ComponentBlocksVideo';
                      id: string;
                      title?: string | null | undefined;
                      speaker?: string | null | undefined;
                      url?: string | null | undefined;
                    }
                  | null
                  | undefined
                >
              | null
              | undefined;
          }
        | {
            __typename: 'ComponentSectionsWaves';
            position?: Enum_Componentsectionswaves_Position | null | undefined;
            isRich?: boolean | null | undefined;
          }
        | null
        | undefined
      >
    | null
    | undefined;
  coverImage?: { __typename?: 'UploadFile'; url: string } | null | undefined;
  moreLink?:
    | {
        __typename?: 'ComponentBlocksBlogPostLink';
        title?: string | null | undefined;
        url?: string | null | undefined;
        blogPost?:
          | {
              __typename?: 'BlogPost';
              title?: string | null | undefined;
              slug?: string | null | undefined;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type BlogPostLinkFragment = {
  __typename?: 'ComponentBlocksBlogPostLink';
  title?: string | null | undefined;
  url?: string | null | undefined;
  blogPost?:
    | {
        __typename?: 'BlogPost';
        title?: string | null | undefined;
        slug?: string | null | undefined;
      }
    | null
    | undefined;
};

export type HomepageQueryVariables = Exact<{
  locale?: InputMaybe<Scalars['String']>;
}>;

export type HomepageQuery = {
  __typename?: 'Query';
  homepage?:
    | {
        __typename?: 'Homepage';
        id: string;
        updated_at: any;
        created_at: any;
        posts?:
          | Array<
              | {
                  __typename?: 'ComponentBlocksHomepagePost';
                  title?: string | null | undefined;
                  slug?: string | null | undefined;
                  image?:
                    | { __typename?: 'UploadFile'; url: string }
                    | null
                    | undefined;
                }
              | null
              | undefined
            >
          | null
          | undefined;
        left_highlight?:
          | {
              __typename?: 'BlogPost';
              title?: string | null | undefined;
              excerpt?: string | null | undefined;
              slug?: string | null | undefined;
              updated_at: any;
              date_added?: any | null | undefined;
              coverImage?:
                | { __typename?: 'UploadFile'; url: string }
                | null
                | undefined;
              tag?:
                | {
                    __typename?: 'Tag';
                    title?: string | null | undefined;
                    pageCategory?:
                      | {
                          __typename?: 'PageCategory';
                          color?: Enum_Pagecategory_Color | null | undefined;
                        }
                      | null
                      | undefined;
                  }
                | null
                | undefined;
            }
          | null
          | undefined;
        right_highlight?:
          | {
              __typename?: 'BlogPost';
              title?: string | null | undefined;
              excerpt?: string | null | undefined;
              slug?: string | null | undefined;
              updated_at: any;
              date_added?: any | null | undefined;
              coverImage?:
                | { __typename?: 'UploadFile'; url: string }
                | null
                | undefined;
              tag?:
                | {
                    __typename?: 'Tag';
                    title?: string | null | undefined;
                    pageCategory?:
                      | {
                          __typename?: 'PageCategory';
                          color?: Enum_Pagecategory_Color | null | undefined;
                        }
                      | null
                      | undefined;
                  }
                | null
                | undefined;
            }
          | null
          | undefined;
        header?:
          | {
              __typename?: 'ComponentBlocksHeader';
              subtitle?: string | null | undefined;
              picture?:
                | { __typename?: 'UploadFile'; url: string }
                | null
                | undefined;
            }
          | null
          | undefined;
        cards?:
          | Array<
              | {
                  __typename?: 'ComponentBlocksHomepageBookmark';
                  title?: string | null | undefined;
                  headline?: string | null | undefined;
                  text?: string | null | undefined;
                  variant?: string | null | undefined;
                  link?:
                    | {
                        __typename?: 'ComponentBlocksBookmarkLink';
                        title?: string | null | undefined;
                        href?: string | null | undefined;
                      }
                    | null
                    | undefined;
                  picture?:
                    | { __typename?: 'UploadFile'; url: string }
                    | null
                    | undefined;
                }
              | null
              | undefined
            >
          | null
          | undefined;
        inba?:
          | {
              __typename?: 'ComponentBlocksInBa';
              title?: string | null | undefined;
              content?: string | null | undefined;
              link?: string | null | undefined;
              images?:
                | {
                    __typename?: 'ComponentBlocksInBaPictures';
                    frontImage?:
                      | { __typename?: 'UploadFile'; url: string }
                      | null
                      | undefined;
                    rearImage?:
                      | { __typename?: 'UploadFile'; url: string }
                      | null
                      | undefined;
                  }
                | null
                | undefined;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type NewsCardBlogFragment = {
  __typename?: 'BlogPost';
  title?: string | null | undefined;
  excerpt?: string | null | undefined;
  slug?: string | null | undefined;
  updated_at: any;
  date_added?: any | null | undefined;
  coverImage?: { __typename?: 'UploadFile'; url: string } | null | undefined;
  tag?:
    | {
        __typename?: 'Tag';
        title?: string | null | undefined;
        pageCategory?:
          | {
              __typename?: 'PageCategory';
              color?: Enum_Pagecategory_Color | null | undefined;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type PagesQueryVariables = Exact<{ [key: string]: never }>;

export type PagesQuery = {
  __typename?: 'Query';
  pages?:
    | Array<
        | {
            __typename?: 'Page';
            id: string;
            slug?: string | null | undefined;
            sections?:
              | Array<
                  | {
                      __typename: 'ComponentSectionsAccordion';
                      title?: string | null | undefined;
                      hasBackground?: boolean | null | undefined;
                      institutions?:
                        | Array<
                            | {
                                __typename?: 'ComponentAccordionItemsInstitution';
                                title?: string | null | undefined;
                                subtitle?: string | null | undefined;
                                category?: string | null | undefined;
                                firstColumn?: string | null | undefined;
                                secondColumn?: string | null | undefined;
                                thirdColumn?: string | null | undefined;
                                url?: string | null | undefined;
                                urlLabel?: string | null | undefined;
                              }
                            | null
                            | undefined
                          >
                        | null
                        | undefined;
                      flatText?:
                        | Array<
                            | {
                                __typename?: 'ComponentAccordionItemsFlatText';
                                category?: string | null | undefined;
                                content?: string | null | undefined;
                                width?:
                                  | Enum_Componentaccordionitemsflattext_Width
                                  | null
                                  | undefined;
                                align?:
                                  | Enum_Componentaccordionitemsflattext_Align
                                  | null
                                  | undefined;
                                moreLinkTitle?: string | null | undefined;
                                moreLinkUrl?: string | null | undefined;
                                moreLinkPage?:
                                  | {
                                      __typename?: 'Page';
                                      locale?: string | null | undefined;
                                      slug?: string | null | undefined;
                                      title?: string | null | undefined;
                                    }
                                  | null
                                  | undefined;
                              }
                            | null
                            | undefined
                          >
                        | null
                        | undefined;
                      institutionsNarrow?:
                        | Array<
                            | {
                                __typename?: 'ComponentAccordionItemsInstitutionNarrow';
                                title?: string | null | undefined;
                                subtitle?: string | null | undefined;
                                category?: string | null | undefined;
                                url?: string | null | undefined;
                                urlLabel?: string | null | undefined;
                              }
                            | null
                            | undefined
                          >
                        | null
                        | undefined;
                    }
                  | {
                      __typename: 'ComponentSectionsArticlesList';
                      title?: string | null | undefined;
                      filtering?: boolean | null | undefined;
                      category?:
                        | {
                            __typename?: 'PageCategory';
                            title?: string | null | undefined;
                          }
                        | null
                        | undefined;
                    }
                  | {
                      __typename: 'ComponentSectionsCalculator';
                      hasBackground?: boolean | null | undefined;
                      single_adult_value?: number | null | undefined;
                      another_adult_value?: number | null | undefined;
                      child_value?: number | null | undefined;
                    }
                  | {
                      __typename: 'ComponentSectionsColumnedText';
                      hasBackground?: boolean | null | undefined;
                      content?: string | null | undefined;
                    }
                  | {
                      __typename: 'ComponentSectionsContact';
                      title?: string | null | undefined;
                      hasBackground?: boolean | null | undefined;
                      description?: string | null | undefined;
                      phone?: string | null | undefined;
                      phoneLabel?: string | null | undefined;
                      email?: string | null | undefined;
                      emailLabel?: string | null | undefined;
                      address?: string | null | undefined;
                    }
                  | {
                      __typename: 'ComponentSectionsDivider';
                      hasBackground?: boolean | null | undefined;
                      style?:
                        | Enum_Componentsectionsdivider_Style
                        | null
                        | undefined;
                    }
                  | { __typename: 'ComponentSectionsDocumentList' }
                  | {
                      __typename: 'ComponentSectionsDocumentList';
                      vzns?:
                        | Array<
                            | {
                                __typename?: 'Vzn';
                                id: string;
                                category: Enum_Vzn_Category;
                                details?: string | null | undefined;
                                title: string;
                                validFrom: any;
                                amedmentDocument?:
                                  | Array<
                                      | {
                                          __typename?: 'ComponentBlocksDocListExtensions';
                                          id: string;
                                          title: string;
                                          validFrom?: any | null | undefined;
                                          document?:
                                            | {
                                                __typename?: 'UploadFile';
                                                url: string;
                                                size: number;
                                                ext?: string | null | undefined;
                                                created_at: any;
                                              }
                                            | null
                                            | undefined;
                                        }
                                      | null
                                      | undefined
                                    >
                                  | null
                                  | undefined;
                                cancellationDocument?:
                                  | Array<
                                      | {
                                          __typename?: 'ComponentBlocksDocListExtensions';
                                          id: string;
                                          title: string;
                                          validFrom?: any | null | undefined;
                                          document?:
                                            | {
                                                __typename?: 'UploadFile';
                                                url: string;
                                                size: number;
                                                ext?: string | null | undefined;
                                                created_at: any;
                                              }
                                            | null
                                            | undefined;
                                        }
                                      | null
                                      | undefined
                                    >
                                  | null
                                  | undefined;
                                mainDocument?:
                                  | {
                                      __typename?: 'UploadFile';
                                      url: string;
                                      size: number;
                                      ext?: string | null | undefined;
                                      created_at: any;
                                    }
                                  | null
                                  | undefined;
                                consolidatedText?:
                                  | {
                                      __typename?: 'UploadFile';
                                      id: string;
                                      url: string;
                                      size: number;
                                      ext?: string | null | undefined;
                                      created_at: any;
                                    }
                                  | null
                                  | undefined;
                              }
                            | null
                            | undefined
                          >
                        | null
                        | undefined;
                    }
                  | {
                      __typename: 'ComponentSectionsFileList';
                      hasBackground?: boolean | null | undefined;
                      fileList?:
                        | Array<
                            | {
                                __typename?: 'ComponentBlocksFile';
                                title?: string | null | undefined;
                                category?: string | null | undefined;
                                media?:
                                  | {
                                      __typename?: 'UploadFile';
                                      url: string;
                                      created_at: any;
                                      size: number;
                                      ext?: string | null | undefined;
                                    }
                                  | null
                                  | undefined;
                              }
                            | null
                            | undefined
                          >
                        | null
                        | undefined;
                    }
                  | {
                      __typename: 'ComponentSectionsIconTitleDesc';
                      title?: string | null | undefined;
                      list?:
                        | Array<
                            | {
                                __typename?: 'ComponentBlocksIconWithTitleAndDescription';
                                title?: string | null | undefined;
                                desc?: string | null | undefined;
                                icon?:
                                  | {
                                      __typename?: 'UploadFile';
                                      id: string;
                                      url: string;
                                    }
                                  | null
                                  | undefined;
                              }
                            | null
                            | undefined
                          >
                        | null
                        | undefined;
                    }
                  | { __typename: 'ComponentSectionsIframe' }
                  | {
                      __typename: 'ComponentSectionsLinks';
                      title?: string | null | undefined;
                      hasBackground?: boolean | null | undefined;
                      pageLinks?:
                        | Array<
                            | {
                                __typename?: 'ComponentBlocksPageLink';
                                title?: string | null | undefined;
                                url?: string | null | undefined;
                                anchor?: string | null | undefined;
                                page?:
                                  | {
                                      __typename?: 'Page';
                                      locale?: string | null | undefined;
                                      slug?: string | null | undefined;
                                      title?: string | null | undefined;
                                    }
                                  | null
                                  | undefined;
                              }
                            | null
                            | undefined
                          >
                        | null
                        | undefined;
                    }
                  | {
                      __typename: 'ComponentSectionsListItems';
                      title?: string | null | undefined;
                      hasBackground?: boolean | null | undefined;
                      listItems?:
                        | Array<
                            | {
                                __typename?: 'ComponentBlocksListItem';
                                content?: string | null | undefined;
                                moreLinkTitle?: string | null | undefined;
                                moreLinkUrl?: string | null | undefined;
                                circleOption?:
                                  | Enum_Componentblockslistitem_Circleoption
                                  | null
                                  | undefined;
                                moreLinkPage?:
                                  | {
                                      __typename?: 'Page';
                                      locale?: string | null | undefined;
                                      slug?: string | null | undefined;
                                      title?: string | null | undefined;
                                    }
                                  | null
                                  | undefined;
                              }
                            | null
                            | undefined
                          >
                        | null
                        | undefined;
                    }
                  | {
                      __typename: 'ComponentSectionsNarrowText';
                      hasBackground?: boolean | null | undefined;
                      content?: string | null | undefined;
                      width?:
                        | Enum_Componentsectionsnarrowtext_Width
                        | null
                        | undefined;
                      align?:
                        | Enum_Componentsectionsnarrowtext_Align
                        | null
                        | undefined;
                    }
                  | { __typename: 'ComponentSectionsNewsletter' }
                  | {
                      __typename: 'ComponentSectionsNumericalList';
                      id: string;
                      title?: string | null | undefined;
                      variant?:
                        | Enum_Componentsectionsnumericallist_Variant
                        | null
                        | undefined;
                      buttonText?: string | null | undefined;
                      buttonLink?: string | null | undefined;
                      hasBackground?: boolean | null | undefined;
                      items?:
                        | Array<
                            | {
                                __typename?: 'ComponentBlocksNumericalListItem';
                                text: string;
                              }
                            | null
                            | undefined
                          >
                        | null
                        | undefined;
                    }
                  | {
                      __typename: 'ComponentSectionsTextWithImage';
                      hasBackground?: boolean | null | undefined;
                      content?: string | null | undefined;
                      imagePosition?:
                        | Enum_Componentsectionstextwithimage_Imageposition
                        | null
                        | undefined;
                      imageShadow?: boolean | null | undefined;
                      imageSrc?:
                        | { __typename?: 'UploadFile'; url: string }
                        | null
                        | undefined;
                    }
                  | {
                      __typename: 'ComponentSectionsVideos';
                      id: string;
                      title?: string | null | undefined;
                      subtitle?: string | null | undefined;
                      videos?:
                        | Array<
                            | {
                                __typename?: 'ComponentBlocksVideo';
                                id: string;
                                title?: string | null | undefined;
                                speaker?: string | null | undefined;
                                url?: string | null | undefined;
                              }
                            | null
                            | undefined
                          >
                        | null
                        | undefined;
                    }
                  | {
                      __typename: 'ComponentSectionsWaves';
                      position?:
                        | Enum_Componentsectionswaves_Position
                        | null
                        | undefined;
                      isRich?: boolean | null | undefined;
                    }
                  | null
                  | undefined
                >
              | null
              | undefined;
          }
        | null
        | undefined
      >
    | null
    | undefined;
};

export type PagesStaticPathsQueryVariables = Exact<{ [key: string]: never }>;

export type PagesStaticPathsQuery = {
  __typename?: 'Query';
  pages?:
    | Array<
        | { __typename?: 'Page'; id: string; slug?: string | null | undefined }
        | null
        | undefined
      >
    | null
    | undefined;
};

export type PageBySlugQueryVariables = Exact<{
  slug: Scalars['String'];
  locale: Scalars['String'];
}>;

export type PageBySlugQuery = {
  __typename?: 'Query';
  pageBySlug?:
    | {
        __typename?: 'Page';
        slug?: string | null | undefined;
        title?: string | null | undefined;
        pageColor?: Enum_Page_Pagecolor | null | undefined;
        metaDiscription?: string | null | undefined;
        locale?: string | null | undefined;
        pageBackgroundImage?:
          | { __typename?: 'UploadFile'; url: string }
          | null
          | undefined;
        pageButtonContent?:
          | {
              __typename?: 'ComponentBlocksPageLink';
              title?: string | null | undefined;
              url?: string | null | undefined;
              anchor?: string | null | undefined;
              page?:
                | {
                    __typename?: 'Page';
                    locale?: string | null | undefined;
                    slug?: string | null | undefined;
                    title?: string | null | undefined;
                  }
                | null
                | undefined;
            }
          | null
          | undefined;
        localizations?:
          | Array<
              | {
                  __typename?: 'Page';
                  slug?: string | null | undefined;
                  locale?: string | null | undefined;
                }
              | null
              | undefined
            >
          | null
          | undefined;
        sections?:
          | Array<
              | {
                  __typename: 'ComponentSectionsAccordion';
                  title?: string | null | undefined;
                  hasBackground?: boolean | null | undefined;
                  institutions?:
                    | Array<
                        | {
                            __typename?: 'ComponentAccordionItemsInstitution';
                            title?: string | null | undefined;
                            subtitle?: string | null | undefined;
                            category?: string | null | undefined;
                            firstColumn?: string | null | undefined;
                            secondColumn?: string | null | undefined;
                            thirdColumn?: string | null | undefined;
                            url?: string | null | undefined;
                            urlLabel?: string | null | undefined;
                          }
                        | null
                        | undefined
                      >
                    | null
                    | undefined;
                  flatText?:
                    | Array<
                        | {
                            __typename?: 'ComponentAccordionItemsFlatText';
                            category?: string | null | undefined;
                            content?: string | null | undefined;
                            width?:
                              | Enum_Componentaccordionitemsflattext_Width
                              | null
                              | undefined;
                            align?:
                              | Enum_Componentaccordionitemsflattext_Align
                              | null
                              | undefined;
                            moreLinkTitle?: string | null | undefined;
                            moreLinkUrl?: string | null | undefined;
                            moreLinkPage?:
                              | {
                                  __typename?: 'Page';
                                  locale?: string | null | undefined;
                                  slug?: string | null | undefined;
                                  title?: string | null | undefined;
                                }
                              | null
                              | undefined;
                          }
                        | null
                        | undefined
                      >
                    | null
                    | undefined;
                  institutionsNarrow?:
                    | Array<
                        | {
                            __typename?: 'ComponentAccordionItemsInstitutionNarrow';
                            title?: string | null | undefined;
                            subtitle?: string | null | undefined;
                            category?: string | null | undefined;
                            url?: string | null | undefined;
                            urlLabel?: string | null | undefined;
                          }
                        | null
                        | undefined
                      >
                    | null
                    | undefined;
                }
              | {
                  __typename: 'ComponentSectionsArticlesList';
                  title?: string | null | undefined;
                  filtering?: boolean | null | undefined;
                  category?:
                    | {
                        __typename?: 'PageCategory';
                        title?: string | null | undefined;
                      }
                    | null
                    | undefined;
                }
              | {
                  __typename: 'ComponentSectionsCalculator';
                  hasBackground?: boolean | null | undefined;
                  single_adult_value?: number | null | undefined;
                  another_adult_value?: number | null | undefined;
                  child_value?: number | null | undefined;
                }
              | {
                  __typename: 'ComponentSectionsColumnedText';
                  hasBackground?: boolean | null | undefined;
                  content?: string | null | undefined;
                }
              | {
                  __typename: 'ComponentSectionsContact';
                  title?: string | null | undefined;
                  hasBackground?: boolean | null | undefined;
                  description?: string | null | undefined;
                  phone?: string | null | undefined;
                  phoneLabel?: string | null | undefined;
                  email?: string | null | undefined;
                  emailLabel?: string | null | undefined;
                  address?: string | null | undefined;
                }
              | {
                  __typename: 'ComponentSectionsDivider';
                  hasBackground?: boolean | null | undefined;
                  style?:
                    | Enum_Componentsectionsdivider_Style
                    | null
                    | undefined;
                }
              | { __typename: 'ComponentSectionsDocumentList' }
              | {
                  __typename: 'ComponentSectionsDocumentList';
                  vzns?:
                    | Array<
                        | {
                            __typename?: 'Vzn';
                            id: string;
                            category: Enum_Vzn_Category;
                            details?: string | null | undefined;
                            title: string;
                            validFrom: any;
                            amedmentDocument?:
                              | Array<
                                  | {
                                      __typename?: 'ComponentBlocksDocListExtensions';
                                      id: string;
                                      title: string;
                                      validFrom?: any | null | undefined;
                                      document?:
                                        | {
                                            __typename?: 'UploadFile';
                                            url: string;
                                            size: number;
                                            ext?: string | null | undefined;
                                            created_at: any;
                                          }
                                        | null
                                        | undefined;
                                    }
                                  | null
                                  | undefined
                                >
                              | null
                              | undefined;
                            cancellationDocument?:
                              | Array<
                                  | {
                                      __typename?: 'ComponentBlocksDocListExtensions';
                                      id: string;
                                      title: string;
                                      validFrom?: any | null | undefined;
                                      document?:
                                        | {
                                            __typename?: 'UploadFile';
                                            url: string;
                                            size: number;
                                            ext?: string | null | undefined;
                                            created_at: any;
                                          }
                                        | null
                                        | undefined;
                                    }
                                  | null
                                  | undefined
                                >
                              | null
                              | undefined;
                            mainDocument?:
                              | {
                                  __typename?: 'UploadFile';
                                  url: string;
                                  size: number;
                                  ext?: string | null | undefined;
                                  created_at: any;
                                }
                              | null
                              | undefined;
                            consolidatedText?:
                              | {
                                  __typename?: 'UploadFile';
                                  id: string;
                                  url: string;
                                  size: number;
                                  ext?: string | null | undefined;
                                  created_at: any;
                                }
                              | null
                              | undefined;
                          }
                        | null
                        | undefined
                      >
                    | null
                    | undefined;
                }
              | {
                  __typename: 'ComponentSectionsFileList';
                  hasBackground?: boolean | null | undefined;
                  fileList?:
                    | Array<
                        | {
                            __typename?: 'ComponentBlocksFile';
                            title?: string | null | undefined;
                            category?: string | null | undefined;
                            media?:
                              | {
                                  __typename?: 'UploadFile';
                                  url: string;
                                  created_at: any;
                                  size: number;
                                  ext?: string | null | undefined;
                                }
                              | null
                              | undefined;
                          }
                        | null
                        | undefined
                      >
                    | null
                    | undefined;
                }
              | {
                  __typename: 'ComponentSectionsIconTitleDesc';
                  title?: string | null | undefined;
                  list?:
                    | Array<
                        | {
                            __typename?: 'ComponentBlocksIconWithTitleAndDescription';
                            title?: string | null | undefined;
                            desc?: string | null | undefined;
                            icon?:
                              | {
                                  __typename?: 'UploadFile';
                                  id: string;
                                  url: string;
                                }
                              | null
                              | undefined;
                          }
                        | null
                        | undefined
                      >
                    | null
                    | undefined;
                }
              | { __typename: 'ComponentSectionsIframe' }
              | {
                  __typename: 'ComponentSectionsLinks';
                  title?: string | null | undefined;
                  hasBackground?: boolean | null | undefined;
                  pageLinks?:
                    | Array<
                        | {
                            __typename?: 'ComponentBlocksPageLink';
                            title?: string | null | undefined;
                            url?: string | null | undefined;
                            anchor?: string | null | undefined;
                            page?:
                              | {
                                  __typename?: 'Page';
                                  locale?: string | null | undefined;
                                  slug?: string | null | undefined;
                                  title?: string | null | undefined;
                                }
                              | null
                              | undefined;
                          }
                        | null
                        | undefined
                      >
                    | null
                    | undefined;
                }
              | {
                  __typename: 'ComponentSectionsListItems';
                  title?: string | null | undefined;
                  hasBackground?: boolean | null | undefined;
                  listItems?:
                    | Array<
                        | {
                            __typename?: 'ComponentBlocksListItem';
                            content?: string | null | undefined;
                            moreLinkTitle?: string | null | undefined;
                            moreLinkUrl?: string | null | undefined;
                            circleOption?:
                              | Enum_Componentblockslistitem_Circleoption
                              | null
                              | undefined;
                            moreLinkPage?:
                              | {
                                  __typename?: 'Page';
                                  locale?: string | null | undefined;
                                  slug?: string | null | undefined;
                                  title?: string | null | undefined;
                                }
                              | null
                              | undefined;
                          }
                        | null
                        | undefined
                      >
                    | null
                    | undefined;
                }
              | {
                  __typename: 'ComponentSectionsNarrowText';
                  hasBackground?: boolean | null | undefined;
                  content?: string | null | undefined;
                  width?:
                    | Enum_Componentsectionsnarrowtext_Width
                    | null
                    | undefined;
                  align?:
                    | Enum_Componentsectionsnarrowtext_Align
                    | null
                    | undefined;
                }
              | { __typename: 'ComponentSectionsNewsletter' }
              | {
                  __typename: 'ComponentSectionsNumericalList';
                  id: string;
                  title?: string | null | undefined;
                  variant?:
                    | Enum_Componentsectionsnumericallist_Variant
                    | null
                    | undefined;
                  buttonText?: string | null | undefined;
                  buttonLink?: string | null | undefined;
                  hasBackground?: boolean | null | undefined;
                  items?:
                    | Array<
                        | {
                            __typename?: 'ComponentBlocksNumericalListItem';
                            text: string;
                          }
                        | null
                        | undefined
                      >
                    | null
                    | undefined;
                }
              | {
                  __typename: 'ComponentSectionsTextWithImage';
                  hasBackground?: boolean | null | undefined;
                  content?: string | null | undefined;
                  imagePosition?:
                    | Enum_Componentsectionstextwithimage_Imageposition
                    | null
                    | undefined;
                  imageShadow?: boolean | null | undefined;
                  imageSrc?:
                    | { __typename?: 'UploadFile'; url: string }
                    | null
                    | undefined;
                }
              | {
                  __typename: 'ComponentSectionsVideos';
                  id: string;
                  title?: string | null | undefined;
                  subtitle?: string | null | undefined;
                  videos?:
                    | Array<
                        | {
                            __typename?: 'ComponentBlocksVideo';
                            id: string;
                            title?: string | null | undefined;
                            speaker?: string | null | undefined;
                            url?: string | null | undefined;
                          }
                        | null
                        | undefined
                      >
                    | null
                    | undefined;
                }
              | {
                  __typename: 'ComponentSectionsWaves';
                  position?:
                    | Enum_Componentsectionswaves_Position
                    | null
                    | undefined;
                  isRich?: boolean | null | undefined;
                }
              | null
              | undefined
            >
          | null
          | undefined;
        pageHeaderSections?:
          | Array<
              | {
                  __typename: 'ComponentSectionsFeaturedBlogPosts';
                  first_blog?:
                    | {
                        __typename?: 'BlogPost';
                        title?: string | null | undefined;
                        published_at?: any | null | undefined;
                        coverImage?:
                          | { __typename?: 'UploadFile'; url: string }
                          | null
                          | undefined;
                        tag?:
                          | {
                              __typename?: 'Tag';
                              pageCategory?:
                                | {
                                    __typename?: 'PageCategory';
                                    color?:
                                      | Enum_Pagecategory_Color
                                      | null
                                      | undefined;
                                    shortTitle?: string | null | undefined;
                                  }
                                | null
                                | undefined;
                            }
                          | null
                          | undefined;
                      }
                    | null
                    | undefined;
                  second_blog?:
                    | {
                        __typename?: 'BlogPost';
                        title?: string | null | undefined;
                        published_at?: any | null | undefined;
                        coverImage?:
                          | { __typename?: 'UploadFile'; url: string }
                          | null
                          | undefined;
                        tag?:
                          | {
                              __typename?: 'Tag';
                              pageCategory?:
                                | {
                                    __typename?: 'PageCategory';
                                    color?:
                                      | Enum_Pagecategory_Color
                                      | null
                                      | undefined;
                                    shortTitle?: string | null | undefined;
                                  }
                                | null
                                | undefined;
                            }
                          | null
                          | undefined;
                      }
                    | null
                    | undefined;
                  third_blog?:
                    | {
                        __typename?: 'BlogPost';
                        title?: string | null | undefined;
                        published_at?: any | null | undefined;
                        coverImage?:
                          | { __typename?: 'UploadFile'; url: string }
                          | null
                          | undefined;
                        tag?:
                          | {
                              __typename?: 'Tag';
                              pageCategory?:
                                | {
                                    __typename?: 'PageCategory';
                                    color?:
                                      | Enum_Pagecategory_Color
                                      | null
                                      | undefined;
                                    shortTitle?: string | null | undefined;
                                  }
                                | null
                                | undefined;
                            }
                          | null
                          | undefined;
                      }
                    | null
                    | undefined;
                }
              | {
                  __typename: 'ComponentSectionsSubpageList';
                  subpageList?:
                    | Array<
                        | {
                            __typename?: 'ComponentBlocksPageLink';
                            title?: string | null | undefined;
                            url?: string | null | undefined;
                            anchor?: string | null | undefined;
                            page?:
                              | {
                                  __typename?: 'Page';
                                  locale?: string | null | undefined;
                                  slug?: string | null | undefined;
                                  title?: string | null | undefined;
                                }
                              | null
                              | undefined;
                          }
                        | null
                        | undefined
                      >
                    | null
                    | undefined;
                }
              | null
              | undefined
            >
          | null
          | undefined;
        pageCategory?:
          | {
              __typename?: 'PageCategory';
              id: string;
              title?: string | null | undefined;
              color?: Enum_Pagecategory_Color | null | undefined;
            }
          | null
          | undefined;
        parentPage?:
          | {
              __typename?: 'Page';
              slug?: string | null | undefined;
              locale?: string | null | undefined;
              title?: string | null | undefined;
              parentPage?:
                | {
                    __typename?: 'Page';
                    slug?: string | null | undefined;
                    locale?: string | null | undefined;
                    title?: string | null | undefined;
                    parentPage?:
                      | {
                          __typename?: 'Page';
                          slug?: string | null | undefined;
                          locale?: string | null | undefined;
                          title?: string | null | undefined;
                          parentPage?:
                            | {
                                __typename?: 'Page';
                                slug?: string | null | undefined;
                                locale?: string | null | undefined;
                                title?: string | null | undefined;
                              }
                            | null
                            | undefined;
                        }
                      | null
                      | undefined;
                  }
                | null
                | undefined;
            }
          | null
          | undefined;
        relatedBlogPosts: Array<{
          __typename?: 'BlogPost';
          id: string;
          slug?: string | null | undefined;
          title?: string | null | undefined;
          excerpt?: string | null | undefined;
          created_at: any;
          tag?:
            | {
                __typename?: 'Tag';
                id: string;
                title?: string | null | undefined;
                pageCategory?:
                  | {
                      __typename?: 'PageCategory';
                      id: string;
                      title?: string | null | undefined;
                      color?: Enum_Pagecategory_Color | null | undefined;
                    }
                  | null
                  | undefined;
              }
            | null
            | undefined;
          sections?:
            | Array<
                | {
                    __typename: 'ComponentSectionsAccordion';
                    title?: string | null | undefined;
                    hasBackground?: boolean | null | undefined;
                    institutions?:
                      | Array<
                          | {
                              __typename?: 'ComponentAccordionItemsInstitution';
                              title?: string | null | undefined;
                              subtitle?: string | null | undefined;
                              category?: string | null | undefined;
                              firstColumn?: string | null | undefined;
                              secondColumn?: string | null | undefined;
                              thirdColumn?: string | null | undefined;
                              url?: string | null | undefined;
                              urlLabel?: string | null | undefined;
                            }
                          | null
                          | undefined
                        >
                      | null
                      | undefined;
                    flatText?:
                      | Array<
                          | {
                              __typename?: 'ComponentAccordionItemsFlatText';
                              category?: string | null | undefined;
                              content?: string | null | undefined;
                              width?:
                                | Enum_Componentaccordionitemsflattext_Width
                                | null
                                | undefined;
                              align?:
                                | Enum_Componentaccordionitemsflattext_Align
                                | null
                                | undefined;
                              moreLinkTitle?: string | null | undefined;
                              moreLinkUrl?: string | null | undefined;
                              moreLinkPage?:
                                | {
                                    __typename?: 'Page';
                                    locale?: string | null | undefined;
                                    slug?: string | null | undefined;
                                    title?: string | null | undefined;
                                  }
                                | null
                                | undefined;
                            }
                          | null
                          | undefined
                        >
                      | null
                      | undefined;
                    institutionsNarrow?:
                      | Array<
                          | {
                              __typename?: 'ComponentAccordionItemsInstitutionNarrow';
                              title?: string | null | undefined;
                              subtitle?: string | null | undefined;
                              category?: string | null | undefined;
                              url?: string | null | undefined;
                              urlLabel?: string | null | undefined;
                            }
                          | null
                          | undefined
                        >
                      | null
                      | undefined;
                  }
                | {
                    __typename: 'ComponentSectionsArticlesList';
                    title?: string | null | undefined;
                    filtering?: boolean | null | undefined;
                    category?:
                      | {
                          __typename?: 'PageCategory';
                          title?: string | null | undefined;
                        }
                      | null
                      | undefined;
                  }
                | {
                    __typename: 'ComponentSectionsCalculator';
                    hasBackground?: boolean | null | undefined;
                    single_adult_value?: number | null | undefined;
                    another_adult_value?: number | null | undefined;
                    child_value?: number | null | undefined;
                  }
                | {
                    __typename: 'ComponentSectionsColumnedText';
                    hasBackground?: boolean | null | undefined;
                    content?: string | null | undefined;
                  }
                | {
                    __typename: 'ComponentSectionsContact';
                    title?: string | null | undefined;
                    hasBackground?: boolean | null | undefined;
                    description?: string | null | undefined;
                    phone?: string | null | undefined;
                    phoneLabel?: string | null | undefined;
                    email?: string | null | undefined;
                    emailLabel?: string | null | undefined;
                    address?: string | null | undefined;
                  }
                | {
                    __typename: 'ComponentSectionsDivider';
                    hasBackground?: boolean | null | undefined;
                    style?:
                      | Enum_Componentsectionsdivider_Style
                      | null
                      | undefined;
                  }
                | {
                    __typename: 'ComponentSectionsFileList';
                    hasBackground?: boolean | null | undefined;
                    fileList?:
                      | Array<
                          | {
                              __typename?: 'ComponentBlocksFile';
                              title?: string | null | undefined;
                              category?: string | null | undefined;
                              media?:
                                | {
                                    __typename?: 'UploadFile';
                                    url: string;
                                    created_at: any;
                                    size: number;
                                    ext?: string | null | undefined;
                                  }
                                | null
                                | undefined;
                            }
                          | null
                          | undefined
                        >
                      | null
                      | undefined;
                  }
                | {
                    __typename: 'ComponentSectionsIconTitleDesc';
                    title?: string | null | undefined;
                    list?:
                      | Array<
                          | {
                              __typename?: 'ComponentBlocksIconWithTitleAndDescription';
                              title?: string | null | undefined;
                              desc?: string | null | undefined;
                              icon?:
                                | {
                                    __typename?: 'UploadFile';
                                    id: string;
                                    url: string;
                                  }
                                | null
                                | undefined;
                            }
                          | null
                          | undefined
                        >
                      | null
                      | undefined;
                  }
                | {
                    __typename: 'ComponentSectionsLinks';
                    title?: string | null | undefined;
                    hasBackground?: boolean | null | undefined;
                    pageLinks?:
                      | Array<
                          | {
                              __typename?: 'ComponentBlocksPageLink';
                              title?: string | null | undefined;
                              url?: string | null | undefined;
                              anchor?: string | null | undefined;
                              page?:
                                | {
                                    __typename?: 'Page';
                                    locale?: string | null | undefined;
                                    slug?: string | null | undefined;
                                    title?: string | null | undefined;
                                  }
                                | null
                                | undefined;
                            }
                          | null
                          | undefined
                        >
                      | null
                      | undefined;
                  }
                | {
                    __typename: 'ComponentSectionsListItems';
                    title?: string | null | undefined;
                    hasBackground?: boolean | null | undefined;
                    listItems?:
                      | Array<
                          | {
                              __typename?: 'ComponentBlocksListItem';
                              content?: string | null | undefined;
                              moreLinkTitle?: string | null | undefined;
                              moreLinkUrl?: string | null | undefined;
                              circleOption?:
                                | Enum_Componentblockslistitem_Circleoption
                                | null
                                | undefined;
                              moreLinkPage?:
                                | {
                                    __typename?: 'Page';
                                    locale?: string | null | undefined;
                                    slug?: string | null | undefined;
                                    title?: string | null | undefined;
                                  }
                                | null
                                | undefined;
                            }
                          | null
                          | undefined
                        >
                      | null
                      | undefined;
                  }
                | {
                    __typename: 'ComponentSectionsNarrowText';
                    hasBackground?: boolean | null | undefined;
                    content?: string | null | undefined;
                    width?:
                      | Enum_Componentsectionsnarrowtext_Width
                      | null
                      | undefined;
                    align?:
                      | Enum_Componentsectionsnarrowtext_Align
                      | null
                      | undefined;
                  }
                | {
                    __typename: 'ComponentSectionsNumericalList';
                    id: string;
                    title?: string | null | undefined;
                    variant?:
                      | Enum_Componentsectionsnumericallist_Variant
                      | null
                      | undefined;
                    buttonText?: string | null | undefined;
                    buttonLink?: string | null | undefined;
                    hasBackground?: boolean | null | undefined;
                    items?:
                      | Array<
                          | {
                              __typename?: 'ComponentBlocksNumericalListItem';
                              text: string;
                            }
                          | null
                          | undefined
                        >
                      | null
                      | undefined;
                  }
                | {
                    __typename: 'ComponentSectionsTextWithImage';
                    hasBackground?: boolean | null | undefined;
                    content?: string | null | undefined;
                    imagePosition?:
                      | Enum_Componentsectionstextwithimage_Imageposition
                      | null
                      | undefined;
                    imageShadow?: boolean | null | undefined;
                    imageSrc?:
                      | { __typename?: 'UploadFile'; url: string }
                      | null
                      | undefined;
                  }
                | {
                    __typename: 'ComponentSectionsVideos';
                    id: string;
                    title?: string | null | undefined;
                    subtitle?: string | null | undefined;
                    videos?:
                      | Array<
                          | {
                              __typename?: 'ComponentBlocksVideo';
                              id: string;
                              title?: string | null | undefined;
                              speaker?: string | null | undefined;
                              url?: string | null | undefined;
                            }
                          | null
                          | undefined
                        >
                      | null
                      | undefined;
                  }
                | {
                    __typename: 'ComponentSectionsWaves';
                    position?:
                      | Enum_Componentsectionswaves_Position
                      | null
                      | undefined;
                    isRich?: boolean | null | undefined;
                  }
                | null
                | undefined
              >
            | null
            | undefined;
          coverImage?:
            | { __typename?: 'UploadFile'; url: string }
            | null
            | undefined;
          moreLink?:
            | {
                __typename?: 'ComponentBlocksBlogPostLink';
                title?: string | null | undefined;
                url?: string | null | undefined;
                blogPost?:
                  | {
                      __typename?: 'BlogPost';
                      title?: string | null | undefined;
                      slug?: string | null | undefined;
                    }
                  | null
                  | undefined;
              }
            | null
            | undefined;
        }>;
      }
    | null
    | undefined;
  footer?:
    | {
        __typename?: 'Footer';
        address?: string | null | undefined;
        phone?: string | null | undefined;
        email?: string | null | undefined;
        copyright?: string | null | undefined;
        youtubeUrl?: string | null | undefined;
        facebookUrl?: string | null | undefined;
        instagramUrl?: string | null | undefined;
        accessibilityLink?:
          | {
              __typename?: 'ComponentBlocksPageLink';
              title?: string | null | undefined;
              url?: string | null | undefined;
              anchor?: string | null | undefined;
              page?:
                | {
                    __typename?: 'Page';
                    locale?: string | null | undefined;
                    slug?: string | null | undefined;
                    title?: string | null | undefined;
                  }
                | null
                | undefined;
            }
          | null
          | undefined;
        footerSections?:
          | Array<
              | {
                  __typename?: 'ComponentBlocksFooterSection';
                  title?: string | null | undefined;
                  pageLinks?:
                    | Array<
                        | {
                            __typename?: 'ComponentBlocksPageLink';
                            title?: string | null | undefined;
                            url?: string | null | undefined;
                            anchor?: string | null | undefined;
                            page?:
                              | {
                                  __typename?: 'Page';
                                  locale?: string | null | undefined;
                                  slug?: string | null | undefined;
                                  title?: string | null | undefined;
                                }
                              | null
                              | undefined;
                          }
                        | null
                        | undefined
                      >
                    | null
                    | undefined;
                }
              | null
              | undefined
            >
          | null
          | undefined;
      }
    | null
    | undefined;
  mainMenu?:
    | Array<
        | {
            __typename?: 'PageCategory';
            id: string;
            title?: string | null | undefined;
            color?: Enum_Pagecategory_Color | null | undefined;
            icon?: Enum_Pagecategory_Icon | null | undefined;
            iconHover?: Enum_Pagecategory_Iconhover | null | undefined;
            priority?: number | null | undefined;
            subcategories?:
              | Array<
                  | {
                      __typename?: 'PageSubcategory';
                      id: string;
                      title?: string | null | undefined;
                      priority?: number | null | undefined;
                      icon?: Enum_Pagesubcategory_Icon | null | undefined;
                      moreLink?:
                        | {
                            __typename?: 'ComponentBlocksPageLink';
                            title?: string | null | undefined;
                            url?: string | null | undefined;
                            anchor?: string | null | undefined;
                            page?:
                              | {
                                  __typename?: 'Page';
                                  locale?: string | null | undefined;
                                  slug?: string | null | undefined;
                                  title?: string | null | undefined;
                                }
                              | null
                              | undefined;
                          }
                        | null
                        | undefined;
                      pages?:
                        | Array<
                            | {
                                __typename?: 'ComponentBlocksPageLink';
                                title?: string | null | undefined;
                                url?: string | null | undefined;
                                anchor?: string | null | undefined;
                                page?:
                                  | {
                                      __typename?: 'Page';
                                      locale?: string | null | undefined;
                                      slug?: string | null | undefined;
                                      title?: string | null | undefined;
                                    }
                                  | null
                                  | undefined;
                              }
                            | null
                            | undefined
                          >
                        | null
                        | undefined;
                    }
                  | null
                  | undefined
                >
              | null
              | undefined;
          }
        | null
        | undefined
      >
    | null
    | undefined;
};

export type GeneralPageFragment = {
  __typename?: 'Page';
  slug?: string | null | undefined;
  title?: string | null | undefined;
  pageColor?: Enum_Page_Pagecolor | null | undefined;
  metaDiscription?: string | null | undefined;
  locale?: string | null | undefined;
  pageBackgroundImage?:
    | { __typename?: 'UploadFile'; url: string }
    | null
    | undefined;
  pageButtonContent?:
    | {
        __typename?: 'ComponentBlocksPageLink';
        title?: string | null | undefined;
        url?: string | null | undefined;
        anchor?: string | null | undefined;
        page?:
          | {
              __typename?: 'Page';
              locale?: string | null | undefined;
              slug?: string | null | undefined;
              title?: string | null | undefined;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
  localizations?:
    | Array<
        | {
            __typename?: 'Page';
            slug?: string | null | undefined;
            locale?: string | null | undefined;
          }
        | null
        | undefined
      >
    | null
    | undefined;
  sections?:
    | Array<
        | {
            __typename: 'ComponentSectionsAccordion';
            title?: string | null | undefined;
            hasBackground?: boolean | null | undefined;
            institutions?:
              | Array<
                  | {
                      __typename?: 'ComponentAccordionItemsInstitution';
                      title?: string | null | undefined;
                      subtitle?: string | null | undefined;
                      category?: string | null | undefined;
                      firstColumn?: string | null | undefined;
                      secondColumn?: string | null | undefined;
                      thirdColumn?: string | null | undefined;
                      url?: string | null | undefined;
                      urlLabel?: string | null | undefined;
                    }
                  | null
                  | undefined
                >
              | null
              | undefined;
            flatText?:
              | Array<
                  | {
                      __typename?: 'ComponentAccordionItemsFlatText';
                      category?: string | null | undefined;
                      content?: string | null | undefined;
                      width?:
                        | Enum_Componentaccordionitemsflattext_Width
                        | null
                        | undefined;
                      align?:
                        | Enum_Componentaccordionitemsflattext_Align
                        | null
                        | undefined;
                      moreLinkTitle?: string | null | undefined;
                      moreLinkUrl?: string | null | undefined;
                      moreLinkPage?:
                        | {
                            __typename?: 'Page';
                            locale?: string | null | undefined;
                            slug?: string | null | undefined;
                            title?: string | null | undefined;
                          }
                        | null
                        | undefined;
                    }
                  | null
                  | undefined
                >
              | null
              | undefined;
            institutionsNarrow?:
              | Array<
                  | {
                      __typename?: 'ComponentAccordionItemsInstitutionNarrow';
                      title?: string | null | undefined;
                      subtitle?: string | null | undefined;
                      category?: string | null | undefined;
                      url?: string | null | undefined;
                      urlLabel?: string | null | undefined;
                    }
                  | null
                  | undefined
                >
              | null
              | undefined;
          }
        | {
            __typename: 'ComponentSectionsArticlesList';
            title?: string | null | undefined;
            filtering?: boolean | null | undefined;
            category?:
              | {
                  __typename?: 'PageCategory';
                  title?: string | null | undefined;
                }
              | null
              | undefined;
          }
        | {
            __typename: 'ComponentSectionsCalculator';
            hasBackground?: boolean | null | undefined;
            single_adult_value?: number | null | undefined;
            another_adult_value?: number | null | undefined;
            child_value?: number | null | undefined;
          }
        | {
            __typename: 'ComponentSectionsColumnedText';
            hasBackground?: boolean | null | undefined;
            content?: string | null | undefined;
          }
        | {
            __typename: 'ComponentSectionsContact';
            title?: string | null | undefined;
            hasBackground?: boolean | null | undefined;
            description?: string | null | undefined;
            phone?: string | null | undefined;
            phoneLabel?: string | null | undefined;
            email?: string | null | undefined;
            emailLabel?: string | null | undefined;
            address?: string | null | undefined;
          }
        | {
            __typename: 'ComponentSectionsDivider';
            hasBackground?: boolean | null | undefined;
            style?: Enum_Componentsectionsdivider_Style | null | undefined;
          }
        | { __typename: 'ComponentSectionsDocumentList' }
        | {
            __typename: 'ComponentSectionsDocumentList';
            vzns?:
              | Array<
                  | {
                      __typename?: 'Vzn';
                      id: string;
                      category: Enum_Vzn_Category;
                      details?: string | null | undefined;
                      title: string;
                      validFrom: any;
                      amedmentDocument?:
                        | Array<
                            | {
                                __typename?: 'ComponentBlocksDocListExtensions';
                                id: string;
                                title: string;
                                validFrom?: any | null | undefined;
                                document?:
                                  | {
                                      __typename?: 'UploadFile';
                                      url: string;
                                      size: number;
                                      ext?: string | null | undefined;
                                      created_at: any;
                                    }
                                  | null
                                  | undefined;
                              }
                            | null
                            | undefined
                          >
                        | null
                        | undefined;
                      cancellationDocument?:
                        | Array<
                            | {
                                __typename?: 'ComponentBlocksDocListExtensions';
                                id: string;
                                title: string;
                                validFrom?: any | null | undefined;
                                document?:
                                  | {
                                      __typename?: 'UploadFile';
                                      url: string;
                                      size: number;
                                      ext?: string | null | undefined;
                                      created_at: any;
                                    }
                                  | null
                                  | undefined;
                              }
                            | null
                            | undefined
                          >
                        | null
                        | undefined;
                      mainDocument?:
                        | {
                            __typename?: 'UploadFile';
                            url: string;
                            size: number;
                            ext?: string | null | undefined;
                            created_at: any;
                          }
                        | null
                        | undefined;
                      consolidatedText?:
                        | {
                            __typename?: 'UploadFile';
                            id: string;
                            url: string;
                            size: number;
                            ext?: string | null | undefined;
                            created_at: any;
                          }
                        | null
                        | undefined;
                    }
                  | null
                  | undefined
                >
              | null
              | undefined;
          }
        | {
            __typename: 'ComponentSectionsFileList';
            hasBackground?: boolean | null | undefined;
            fileList?:
              | Array<
                  | {
                      __typename?: 'ComponentBlocksFile';
                      title?: string | null | undefined;
                      category?: string | null | undefined;
                      media?:
                        | {
                            __typename?: 'UploadFile';
                            url: string;
                            created_at: any;
                            size: number;
                            ext?: string | null | undefined;
                          }
                        | null
                        | undefined;
                    }
                  | null
                  | undefined
                >
              | null
              | undefined;
          }
        | {
            __typename: 'ComponentSectionsIconTitleDesc';
            title?: string | null | undefined;
            list?:
              | Array<
                  | {
                      __typename?: 'ComponentBlocksIconWithTitleAndDescription';
                      title?: string | null | undefined;
                      desc?: string | null | undefined;
                      icon?:
                        | { __typename?: 'UploadFile'; id: string; url: string }
                        | null
                        | undefined;
                    }
                  | null
                  | undefined
                >
              | null
              | undefined;
          }
        | { __typename: 'ComponentSectionsIframe' }
        | {
            __typename: 'ComponentSectionsLinks';
            title?: string | null | undefined;
            hasBackground?: boolean | null | undefined;
            pageLinks?:
              | Array<
                  | {
                      __typename?: 'ComponentBlocksPageLink';
                      title?: string | null | undefined;
                      url?: string | null | undefined;
                      anchor?: string | null | undefined;
                      page?:
                        | {
                            __typename?: 'Page';
                            locale?: string | null | undefined;
                            slug?: string | null | undefined;
                            title?: string | null | undefined;
                          }
                        | null
                        | undefined;
                    }
                  | null
                  | undefined
                >
              | null
              | undefined;
          }
        | {
            __typename: 'ComponentSectionsListItems';
            title?: string | null | undefined;
            hasBackground?: boolean | null | undefined;
            listItems?:
              | Array<
                  | {
                      __typename?: 'ComponentBlocksListItem';
                      content?: string | null | undefined;
                      moreLinkTitle?: string | null | undefined;
                      moreLinkUrl?: string | null | undefined;
                      circleOption?:
                        | Enum_Componentblockslistitem_Circleoption
                        | null
                        | undefined;
                      moreLinkPage?:
                        | {
                            __typename?: 'Page';
                            locale?: string | null | undefined;
                            slug?: string | null | undefined;
                            title?: string | null | undefined;
                          }
                        | null
                        | undefined;
                    }
                  | null
                  | undefined
                >
              | null
              | undefined;
          }
        | {
            __typename: 'ComponentSectionsNarrowText';
            hasBackground?: boolean | null | undefined;
            content?: string | null | undefined;
            width?: Enum_Componentsectionsnarrowtext_Width | null | undefined;
            align?: Enum_Componentsectionsnarrowtext_Align | null | undefined;
          }
        | { __typename: 'ComponentSectionsNewsletter' }
        | {
            __typename: 'ComponentSectionsNumericalList';
            id: string;
            title?: string | null | undefined;
            variant?:
              | Enum_Componentsectionsnumericallist_Variant
              | null
              | undefined;
            buttonText?: string | null | undefined;
            buttonLink?: string | null | undefined;
            hasBackground?: boolean | null | undefined;
            items?:
              | Array<
                  | {
                      __typename?: 'ComponentBlocksNumericalListItem';
                      text: string;
                    }
                  | null
                  | undefined
                >
              | null
              | undefined;
          }
        | {
            __typename: 'ComponentSectionsTextWithImage';
            hasBackground?: boolean | null | undefined;
            content?: string | null | undefined;
            imagePosition?:
              | Enum_Componentsectionstextwithimage_Imageposition
              | null
              | undefined;
            imageShadow?: boolean | null | undefined;
            imageSrc?:
              | { __typename?: 'UploadFile'; url: string }
              | null
              | undefined;
          }
        | {
            __typename: 'ComponentSectionsVideos';
            id: string;
            title?: string | null | undefined;
            subtitle?: string | null | undefined;
            videos?:
              | Array<
                  | {
                      __typename?: 'ComponentBlocksVideo';
                      id: string;
                      title?: string | null | undefined;
                      speaker?: string | null | undefined;
                      url?: string | null | undefined;
                    }
                  | null
                  | undefined
                >
              | null
              | undefined;
          }
        | {
            __typename: 'ComponentSectionsWaves';
            position?: Enum_Componentsectionswaves_Position | null | undefined;
            isRich?: boolean | null | undefined;
          }
        | null
        | undefined
      >
    | null
    | undefined;
  pageHeaderSections?:
    | Array<
        | {
            __typename: 'ComponentSectionsFeaturedBlogPosts';
            first_blog?:
              | {
                  __typename?: 'BlogPost';
                  title?: string | null | undefined;
                  published_at?: any | null | undefined;
                  coverImage?:
                    | { __typename?: 'UploadFile'; url: string }
                    | null
                    | undefined;
                  tag?:
                    | {
                        __typename?: 'Tag';
                        pageCategory?:
                          | {
                              __typename?: 'PageCategory';
                              color?:
                                | Enum_Pagecategory_Color
                                | null
                                | undefined;
                              shortTitle?: string | null | undefined;
                            }
                          | null
                          | undefined;
                      }
                    | null
                    | undefined;
                }
              | null
              | undefined;
            second_blog?:
              | {
                  __typename?: 'BlogPost';
                  title?: string | null | undefined;
                  published_at?: any | null | undefined;
                  coverImage?:
                    | { __typename?: 'UploadFile'; url: string }
                    | null
                    | undefined;
                  tag?:
                    | {
                        __typename?: 'Tag';
                        pageCategory?:
                          | {
                              __typename?: 'PageCategory';
                              color?:
                                | Enum_Pagecategory_Color
                                | null
                                | undefined;
                              shortTitle?: string | null | undefined;
                            }
                          | null
                          | undefined;
                      }
                    | null
                    | undefined;
                }
              | null
              | undefined;
            third_blog?:
              | {
                  __typename?: 'BlogPost';
                  title?: string | null | undefined;
                  published_at?: any | null | undefined;
                  coverImage?:
                    | { __typename?: 'UploadFile'; url: string }
                    | null
                    | undefined;
                  tag?:
                    | {
                        __typename?: 'Tag';
                        pageCategory?:
                          | {
                              __typename?: 'PageCategory';
                              color?:
                                | Enum_Pagecategory_Color
                                | null
                                | undefined;
                              shortTitle?: string | null | undefined;
                            }
                          | null
                          | undefined;
                      }
                    | null
                    | undefined;
                }
              | null
              | undefined;
          }
        | {
            __typename: 'ComponentSectionsSubpageList';
            subpageList?:
              | Array<
                  | {
                      __typename?: 'ComponentBlocksPageLink';
                      title?: string | null | undefined;
                      url?: string | null | undefined;
                      anchor?: string | null | undefined;
                      page?:
                        | {
                            __typename?: 'Page';
                            locale?: string | null | undefined;
                            slug?: string | null | undefined;
                            title?: string | null | undefined;
                          }
                        | null
                        | undefined;
                    }
                  | null
                  | undefined
                >
              | null
              | undefined;
          }
        | null
        | undefined
      >
    | null
    | undefined;
  pageCategory?:
    | {
        __typename?: 'PageCategory';
        id: string;
        title?: string | null | undefined;
        color?: Enum_Pagecategory_Color | null | undefined;
      }
    | null
    | undefined;
  parentPage?:
    | {
        __typename?: 'Page';
        slug?: string | null | undefined;
        locale?: string | null | undefined;
        title?: string | null | undefined;
        parentPage?:
          | {
              __typename?: 'Page';
              slug?: string | null | undefined;
              locale?: string | null | undefined;
              title?: string | null | undefined;
              parentPage?:
                | {
                    __typename?: 'Page';
                    slug?: string | null | undefined;
                    locale?: string | null | undefined;
                    title?: string | null | undefined;
                    parentPage?:
                      | {
                          __typename?: 'Page';
                          slug?: string | null | undefined;
                          locale?: string | null | undefined;
                          title?: string | null | undefined;
                        }
                      | null
                      | undefined;
                  }
                | null
                | undefined;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
  relatedBlogPosts: Array<{
    __typename?: 'BlogPost';
    id: string;
    slug?: string | null | undefined;
    title?: string | null | undefined;
    excerpt?: string | null | undefined;
    created_at: any;
    tag?:
      | {
          __typename?: 'Tag';
          id: string;
          title?: string | null | undefined;
          pageCategory?:
            | {
                __typename?: 'PageCategory';
                id: string;
                title?: string | null | undefined;
                color?: Enum_Pagecategory_Color | null | undefined;
              }
            | null
            | undefined;
        }
      | null
      | undefined;
    sections?:
      | Array<
          | {
              __typename: 'ComponentSectionsAccordion';
              title?: string | null | undefined;
              hasBackground?: boolean | null | undefined;
              institutions?:
                | Array<
                    | {
                        __typename?: 'ComponentAccordionItemsInstitution';
                        title?: string | null | undefined;
                        subtitle?: string | null | undefined;
                        category?: string | null | undefined;
                        firstColumn?: string | null | undefined;
                        secondColumn?: string | null | undefined;
                        thirdColumn?: string | null | undefined;
                        url?: string | null | undefined;
                        urlLabel?: string | null | undefined;
                      }
                    | null
                    | undefined
                  >
                | null
                | undefined;
              flatText?:
                | Array<
                    | {
                        __typename?: 'ComponentAccordionItemsFlatText';
                        category?: string | null | undefined;
                        content?: string | null | undefined;
                        width?:
                          | Enum_Componentaccordionitemsflattext_Width
                          | null
                          | undefined;
                        align?:
                          | Enum_Componentaccordionitemsflattext_Align
                          | null
                          | undefined;
                        moreLinkTitle?: string | null | undefined;
                        moreLinkUrl?: string | null | undefined;
                        moreLinkPage?:
                          | {
                              __typename?: 'Page';
                              locale?: string | null | undefined;
                              slug?: string | null | undefined;
                              title?: string | null | undefined;
                            }
                          | null
                          | undefined;
                      }
                    | null
                    | undefined
                  >
                | null
                | undefined;
              institutionsNarrow?:
                | Array<
                    | {
                        __typename?: 'ComponentAccordionItemsInstitutionNarrow';
                        title?: string | null | undefined;
                        subtitle?: string | null | undefined;
                        category?: string | null | undefined;
                        url?: string | null | undefined;
                        urlLabel?: string | null | undefined;
                      }
                    | null
                    | undefined
                  >
                | null
                | undefined;
            }
          | {
              __typename: 'ComponentSectionsArticlesList';
              title?: string | null | undefined;
              filtering?: boolean | null | undefined;
              category?:
                | {
                    __typename?: 'PageCategory';
                    title?: string | null | undefined;
                  }
                | null
                | undefined;
            }
          | {
              __typename: 'ComponentSectionsCalculator';
              hasBackground?: boolean | null | undefined;
              single_adult_value?: number | null | undefined;
              another_adult_value?: number | null | undefined;
              child_value?: number | null | undefined;
            }
          | {
              __typename: 'ComponentSectionsColumnedText';
              hasBackground?: boolean | null | undefined;
              content?: string | null | undefined;
            }
          | {
              __typename: 'ComponentSectionsContact';
              title?: string | null | undefined;
              hasBackground?: boolean | null | undefined;
              description?: string | null | undefined;
              phone?: string | null | undefined;
              phoneLabel?: string | null | undefined;
              email?: string | null | undefined;
              emailLabel?: string | null | undefined;
              address?: string | null | undefined;
            }
          | {
              __typename: 'ComponentSectionsDivider';
              hasBackground?: boolean | null | undefined;
              style?: Enum_Componentsectionsdivider_Style | null | undefined;
            }
          | {
              __typename: 'ComponentSectionsFileList';
              hasBackground?: boolean | null | undefined;
              fileList?:
                | Array<
                    | {
                        __typename?: 'ComponentBlocksFile';
                        title?: string | null | undefined;
                        category?: string | null | undefined;
                        media?:
                          | {
                              __typename?: 'UploadFile';
                              url: string;
                              created_at: any;
                              size: number;
                              ext?: string | null | undefined;
                            }
                          | null
                          | undefined;
                      }
                    | null
                    | undefined
                  >
                | null
                | undefined;
            }
          | {
              __typename: 'ComponentSectionsIconTitleDesc';
              title?: string | null | undefined;
              list?:
                | Array<
                    | {
                        __typename?: 'ComponentBlocksIconWithTitleAndDescription';
                        title?: string | null | undefined;
                        desc?: string | null | undefined;
                        icon?:
                          | {
                              __typename?: 'UploadFile';
                              id: string;
                              url: string;
                            }
                          | null
                          | undefined;
                      }
                    | null
                    | undefined
                  >
                | null
                | undefined;
            }
          | {
              __typename: 'ComponentSectionsLinks';
              title?: string | null | undefined;
              hasBackground?: boolean | null | undefined;
              pageLinks?:
                | Array<
                    | {
                        __typename?: 'ComponentBlocksPageLink';
                        title?: string | null | undefined;
                        url?: string | null | undefined;
                        anchor?: string | null | undefined;
                        page?:
                          | {
                              __typename?: 'Page';
                              locale?: string | null | undefined;
                              slug?: string | null | undefined;
                              title?: string | null | undefined;
                            }
                          | null
                          | undefined;
                      }
                    | null
                    | undefined
                  >
                | null
                | undefined;
            }
          | {
              __typename: 'ComponentSectionsListItems';
              title?: string | null | undefined;
              hasBackground?: boolean | null | undefined;
              listItems?:
                | Array<
                    | {
                        __typename?: 'ComponentBlocksListItem';
                        content?: string | null | undefined;
                        moreLinkTitle?: string | null | undefined;
                        moreLinkUrl?: string | null | undefined;
                        circleOption?:
                          | Enum_Componentblockslistitem_Circleoption
                          | null
                          | undefined;
                        moreLinkPage?:
                          | {
                              __typename?: 'Page';
                              locale?: string | null | undefined;
                              slug?: string | null | undefined;
                              title?: string | null | undefined;
                            }
                          | null
                          | undefined;
                      }
                    | null
                    | undefined
                  >
                | null
                | undefined;
            }
          | {
              __typename: 'ComponentSectionsNarrowText';
              hasBackground?: boolean | null | undefined;
              content?: string | null | undefined;
              width?: Enum_Componentsectionsnarrowtext_Width | null | undefined;
              align?: Enum_Componentsectionsnarrowtext_Align | null | undefined;
            }
          | {
              __typename: 'ComponentSectionsNumericalList';
              id: string;
              title?: string | null | undefined;
              variant?:
                | Enum_Componentsectionsnumericallist_Variant
                | null
                | undefined;
              buttonText?: string | null | undefined;
              buttonLink?: string | null | undefined;
              hasBackground?: boolean | null | undefined;
              items?:
                | Array<
                    | {
                        __typename?: 'ComponentBlocksNumericalListItem';
                        text: string;
                      }
                    | null
                    | undefined
                  >
                | null
                | undefined;
            }
          | {
              __typename: 'ComponentSectionsTextWithImage';
              hasBackground?: boolean | null | undefined;
              content?: string | null | undefined;
              imagePosition?:
                | Enum_Componentsectionstextwithimage_Imageposition
                | null
                | undefined;
              imageShadow?: boolean | null | undefined;
              imageSrc?:
                | { __typename?: 'UploadFile'; url: string }
                | null
                | undefined;
            }
          | {
              __typename: 'ComponentSectionsVideos';
              id: string;
              title?: string | null | undefined;
              subtitle?: string | null | undefined;
              videos?:
                | Array<
                    | {
                        __typename?: 'ComponentBlocksVideo';
                        id: string;
                        title?: string | null | undefined;
                        speaker?: string | null | undefined;
                        url?: string | null | undefined;
                      }
                    | null
                    | undefined
                  >
                | null
                | undefined;
            }
          | {
              __typename: 'ComponentSectionsWaves';
              position?:
                | Enum_Componentsectionswaves_Position
                | null
                | undefined;
              isRich?: boolean | null | undefined;
            }
          | null
          | undefined
        >
      | null
      | undefined;
    coverImage?: { __typename?: 'UploadFile'; url: string } | null | undefined;
    moreLink?:
      | {
          __typename?: 'ComponentBlocksBlogPostLink';
          title?: string | null | undefined;
          url?: string | null | undefined;
          blogPost?:
            | {
                __typename?: 'BlogPost';
                title?: string | null | undefined;
                slug?: string | null | undefined;
              }
            | null
            | undefined;
        }
      | null
      | undefined;
  }>;
};

export type ParentPageFragment = {
  __typename?: 'Page';
  slug?: string | null | undefined;
  locale?: string | null | undefined;
  title?: string | null | undefined;
};

export type FooterFragment = {
  __typename?: 'Footer';
  address?: string | null | undefined;
  phone?: string | null | undefined;
  email?: string | null | undefined;
  copyright?: string | null | undefined;
  youtubeUrl?: string | null | undefined;
  facebookUrl?: string | null | undefined;
  instagramUrl?: string | null | undefined;
  accessibilityLink?:
    | {
        __typename?: 'ComponentBlocksPageLink';
        title?: string | null | undefined;
        url?: string | null | undefined;
        anchor?: string | null | undefined;
        page?:
          | {
              __typename?: 'Page';
              locale?: string | null | undefined;
              slug?: string | null | undefined;
              title?: string | null | undefined;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
  footerSections?:
    | Array<
        | {
            __typename?: 'ComponentBlocksFooterSection';
            title?: string | null | undefined;
            pageLinks?:
              | Array<
                  | {
                      __typename?: 'ComponentBlocksPageLink';
                      title?: string | null | undefined;
                      url?: string | null | undefined;
                      anchor?: string | null | undefined;
                      page?:
                        | {
                            __typename?: 'Page';
                            locale?: string | null | undefined;
                            slug?: string | null | undefined;
                            title?: string | null | undefined;
                          }
                        | null
                        | undefined;
                    }
                  | null
                  | undefined
                >
              | null
              | undefined;
          }
        | null
        | undefined
      >
    | null
    | undefined;
};

export type PageLinkFragment = {
  __typename?: 'ComponentBlocksPageLink';
  title?: string | null | undefined;
  url?: string | null | undefined;
  anchor?: string | null | undefined;
  page?:
    | {
        __typename?: 'Page';
        locale?: string | null | undefined;
        slug?: string | null | undefined;
        title?: string | null | undefined;
      }
    | null
    | undefined;
};

export type DocumentListFragment = {
  __typename?: 'ComponentSectionsDocumentList';
  vzns?:
    | Array<
        | {
            __typename?: 'Vzn';
            id: string;
            category: Enum_Vzn_Category;
            details?: string | null | undefined;
            title: string;
            validFrom: any;
            amedmentDocument?:
              | Array<
                  | {
                      __typename?: 'ComponentBlocksDocListExtensions';
                      id: string;
                      title: string;
                      validFrom?: any | null | undefined;
                      document?:
                        | {
                            __typename?: 'UploadFile';
                            url: string;
                            size: number;
                            ext?: string | null | undefined;
                            created_at: any;
                          }
                        | null
                        | undefined;
                    }
                  | null
                  | undefined
                >
              | null
              | undefined;
            cancellationDocument?:
              | Array<
                  | {
                      __typename?: 'ComponentBlocksDocListExtensions';
                      id: string;
                      title: string;
                      validFrom?: any | null | undefined;
                      document?:
                        | {
                            __typename?: 'UploadFile';
                            url: string;
                            size: number;
                            ext?: string | null | undefined;
                            created_at: any;
                          }
                        | null
                        | undefined;
                    }
                  | null
                  | undefined
                >
              | null
              | undefined;
            mainDocument?:
              | {
                  __typename?: 'UploadFile';
                  url: string;
                  size: number;
                  ext?: string | null | undefined;
                  created_at: any;
                }
              | null
              | undefined;
            consolidatedText?:
              | {
                  __typename?: 'UploadFile';
                  id: string;
                  url: string;
                  size: number;
                  ext?: string | null | undefined;
                  created_at: any;
                }
              | null
              | undefined;
          }
        | null
        | undefined
      >
    | null
    | undefined;
};

type Sections_ComponentSectionsAccordion_Fragment = {
  __typename: 'ComponentSectionsAccordion';
  title?: string | null | undefined;
  hasBackground?: boolean | null | undefined;
  institutions?:
    | Array<
        | {
            __typename?: 'ComponentAccordionItemsInstitution';
            title?: string | null | undefined;
            subtitle?: string | null | undefined;
            category?: string | null | undefined;
            firstColumn?: string | null | undefined;
            secondColumn?: string | null | undefined;
            thirdColumn?: string | null | undefined;
            url?: string | null | undefined;
            urlLabel?: string | null | undefined;
          }
        | null
        | undefined
      >
    | null
    | undefined;
  flatText?:
    | Array<
        | {
            __typename?: 'ComponentAccordionItemsFlatText';
            category?: string | null | undefined;
            content?: string | null | undefined;
            width?:
              | Enum_Componentaccordionitemsflattext_Width
              | null
              | undefined;
            align?:
              | Enum_Componentaccordionitemsflattext_Align
              | null
              | undefined;
            moreLinkTitle?: string | null | undefined;
            moreLinkUrl?: string | null | undefined;
            moreLinkPage?:
              | {
                  __typename?: 'Page';
                  locale?: string | null | undefined;
                  slug?: string | null | undefined;
                  title?: string | null | undefined;
                }
              | null
              | undefined;
          }
        | null
        | undefined
      >
    | null
    | undefined;
  institutionsNarrow?:
    | Array<
        | {
            __typename?: 'ComponentAccordionItemsInstitutionNarrow';
            title?: string | null | undefined;
            subtitle?: string | null | undefined;
            category?: string | null | undefined;
            url?: string | null | undefined;
            urlLabel?: string | null | undefined;
          }
        | null
        | undefined
      >
    | null
    | undefined;
};

type Sections_ComponentSectionsArticlesList_Fragment = {
  __typename: 'ComponentSectionsArticlesList';
  title?: string | null | undefined;
  filtering?: boolean | null | undefined;
  category?:
    | { __typename?: 'PageCategory'; title?: string | null | undefined }
    | null
    | undefined;
};

type Sections_ComponentSectionsCalculator_Fragment = {
  __typename: 'ComponentSectionsCalculator';
  hasBackground?: boolean | null | undefined;
  single_adult_value?: number | null | undefined;
  another_adult_value?: number | null | undefined;
  child_value?: number | null | undefined;
};

type Sections_ComponentSectionsColumnedText_Fragment = {
  __typename: 'ComponentSectionsColumnedText';
  hasBackground?: boolean | null | undefined;
  content?: string | null | undefined;
};

type Sections_ComponentSectionsContact_Fragment = {
  __typename: 'ComponentSectionsContact';
  title?: string | null | undefined;
  hasBackground?: boolean | null | undefined;
  description?: string | null | undefined;
  phone?: string | null | undefined;
  phoneLabel?: string | null | undefined;
  email?: string | null | undefined;
  emailLabel?: string | null | undefined;
  address?: string | null | undefined;
};

type Sections_ComponentSectionsDivider_Fragment = {
  __typename: 'ComponentSectionsDivider';
  hasBackground?: boolean | null | undefined;
  style?: Enum_Componentsectionsdivider_Style | null | undefined;
};

type Sections_ComponentSectionsDocumentList_Fragment = {
  __typename: 'ComponentSectionsDocumentList';
  vzns?:
    | Array<
        | {
            __typename?: 'Vzn';
            id: string;
            category: Enum_Vzn_Category;
            details?: string | null | undefined;
            title: string;
            validFrom: any;
            amedmentDocument?:
              | Array<
                  | {
                      __typename?: 'ComponentBlocksDocListExtensions';
                      id: string;
                      title: string;
                      validFrom?: any | null | undefined;
                      document?:
                        | {
                            __typename?: 'UploadFile';
                            url: string;
                            size: number;
                            ext?: string | null | undefined;
                            created_at: any;
                          }
                        | null
                        | undefined;
                    }
                  | null
                  | undefined
                >
              | null
              | undefined;
            cancellationDocument?:
              | Array<
                  | {
                      __typename?: 'ComponentBlocksDocListExtensions';
                      id: string;
                      title: string;
                      validFrom?: any | null | undefined;
                      document?:
                        | {
                            __typename?: 'UploadFile';
                            url: string;
                            size: number;
                            ext?: string | null | undefined;
                            created_at: any;
                          }
                        | null
                        | undefined;
                    }
                  | null
                  | undefined
                >
              | null
              | undefined;
            mainDocument?:
              | {
                  __typename?: 'UploadFile';
                  url: string;
                  size: number;
                  ext?: string | null | undefined;
                  created_at: any;
                }
              | null
              | undefined;
            consolidatedText?:
              | {
                  __typename?: 'UploadFile';
                  id: string;
                  url: string;
                  size: number;
                  ext?: string | null | undefined;
                  created_at: any;
                }
              | null
              | undefined;
          }
        | null
        | undefined
      >
    | null
    | undefined;
};

type Sections_ComponentSectionsFileList_Fragment = {
  __typename: 'ComponentSectionsFileList';
  hasBackground?: boolean | null | undefined;
  fileList?:
    | Array<
        | {
            __typename?: 'ComponentBlocksFile';
            title?: string | null | undefined;
            category?: string | null | undefined;
            media?:
              | {
                  __typename?: 'UploadFile';
                  url: string;
                  created_at: any;
                  size: number;
                  ext?: string | null | undefined;
                }
              | null
              | undefined;
          }
        | null
        | undefined
      >
    | null
    | undefined;
};

type Sections_ComponentSectionsIconTitleDesc_Fragment = {
  __typename: 'ComponentSectionsIconTitleDesc';
  title?: string | null | undefined;
  list?:
    | Array<
        | {
            __typename?: 'ComponentBlocksIconWithTitleAndDescription';
            title?: string | null | undefined;
            desc?: string | null | undefined;
            icon?:
              | { __typename?: 'UploadFile'; id: string; url: string }
              | null
              | undefined;
          }
        | null
        | undefined
      >
    | null
    | undefined;
};

type Sections_ComponentSectionsIframe_Fragment = {
  __typename: 'ComponentSectionsIframe';
  iframe_url?: string | null | undefined;
  iframe_width?: number | null | undefined;
  iframe_height?: number | null | undefined;
  iframe_frameBorder?: string | null | undefined;
  iframe_scrolling?: string | null | undefined;
  iframe_allowfullscreen?: boolean | null | undefined;
  iframe_style?: string | null | undefined;
};

type Sections_ComponentSectionsLinks_Fragment = {
  __typename: 'ComponentSectionsLinks';
  title?: string | null | undefined;
  hasBackground?: boolean | null | undefined;
  pageLinks?:
    | Array<
        | {
            __typename?: 'ComponentBlocksPageLink';
            title?: string | null | undefined;
            url?: string | null | undefined;
            anchor?: string | null | undefined;
            page?:
              | {
                  __typename?: 'Page';
                  locale?: string | null | undefined;
                  slug?: string | null | undefined;
                  title?: string | null | undefined;
                }
              | null
              | undefined;
          }
        | null
        | undefined
      >
    | null
    | undefined;
};

type Sections_ComponentSectionsListItems_Fragment = {
  __typename: 'ComponentSectionsListItems';
  title?: string | null | undefined;
  hasBackground?: boolean | null | undefined;
  listItems?:
    | Array<
        | {
            __typename?: 'ComponentBlocksListItem';
            content?: string | null | undefined;
            moreLinkTitle?: string | null | undefined;
            moreLinkUrl?: string | null | undefined;
            circleOption?:
              | Enum_Componentblockslistitem_Circleoption
              | null
              | undefined;
            moreLinkPage?:
              | {
                  __typename?: 'Page';
                  locale?: string | null | undefined;
                  slug?: string | null | undefined;
                  title?: string | null | undefined;
                }
              | null
              | undefined;
          }
        | null
        | undefined
      >
    | null
    | undefined;
};

type Sections_ComponentSectionsNarrowText_Fragment = {
  __typename: 'ComponentSectionsNarrowText';
  hasBackground?: boolean | null | undefined;
  content?: string | null | undefined;
  width?: Enum_Componentsectionsnarrowtext_Width | null | undefined;
  align?: Enum_Componentsectionsnarrowtext_Align | null | undefined;
};

type Sections_ComponentSectionsNewsletter_Fragment = {
  __typename: 'ComponentSectionsNewsletter';
};

type Sections_ComponentSectionsNumericalList_Fragment = {
  __typename: 'ComponentSectionsNumericalList';
  id: string;
  title?: string | null | undefined;
  variant?: Enum_Componentsectionsnumericallist_Variant | null | undefined;
  buttonText?: string | null | undefined;
  buttonLink?: string | null | undefined;
  hasBackground?: boolean | null | undefined;
  items?:
    | Array<
        | { __typename?: 'ComponentBlocksNumericalListItem'; text: string }
        | null
        | undefined
      >
    | null
    | undefined;
};

type Sections_ComponentSectionsTextWithImage_Fragment = {
  __typename: 'ComponentSectionsTextWithImage';
  hasBackground?: boolean | null | undefined;
  content?: string | null | undefined;
  imagePosition?:
    | Enum_Componentsectionstextwithimage_Imageposition
    | null
    | undefined;
  imageShadow?: boolean | null | undefined;
  imageSrc?: { __typename?: 'UploadFile'; url: string } | null | undefined;
};

type Sections_ComponentSectionsVideos_Fragment = {
  __typename: 'ComponentSectionsVideos';
  id: string;
  title?: string | null | undefined;
  subtitle?: string | null | undefined;
  videos?:
    | Array<
        | {
            __typename?: 'ComponentBlocksVideo';
            id: string;
            title?: string | null | undefined;
            speaker?: string | null | undefined;
            url?: string | null | undefined;
          }
        | null
        | undefined
      >
    | null
    | undefined;
};

type Sections_ComponentSectionsWaves_Fragment = {
  __typename: 'ComponentSectionsWaves';
  position?: Enum_Componentsectionswaves_Position | null | undefined;
  isRich?: boolean | null | undefined;
};

export type SectionsFragment =
  | Sections_ComponentSectionsAccordion_Fragment
  | Sections_ComponentSectionsArticlesList_Fragment
  | Sections_ComponentSectionsCalculator_Fragment
  | Sections_ComponentSectionsColumnedText_Fragment
  | Sections_ComponentSectionsContact_Fragment
  | Sections_ComponentSectionsDivider_Fragment
  | Sections_ComponentSectionsDocumentList_Fragment
  | Sections_ComponentSectionsFileList_Fragment
  | Sections_ComponentSectionsIconTitleDesc_Fragment
  | Sections_ComponentSectionsIframe_Fragment
  | Sections_ComponentSectionsLinks_Fragment
  | Sections_ComponentSectionsListItems_Fragment
  | Sections_ComponentSectionsNarrowText_Fragment
  | Sections_ComponentSectionsNewsletter_Fragment
  | Sections_ComponentSectionsNumericalList_Fragment
  | Sections_ComponentSectionsTextWithImage_Fragment
  | Sections_ComponentSectionsVideos_Fragment
  | Sections_ComponentSectionsWaves_Fragment;

export type InstitutionsNarrowFragment = {
  __typename?: 'ComponentAccordionItemsInstitutionNarrow';
  title?: string | null | undefined;
  subtitle?: string | null | undefined;
  category?: string | null | undefined;
  url?: string | null | undefined;
  urlLabel?: string | null | undefined;
};

export type FlatTextFragment = {
  __typename?: 'ComponentAccordionItemsFlatText';
  category?: string | null | undefined;
  content?: string | null | undefined;
  width?: Enum_Componentaccordionitemsflattext_Width | null | undefined;
  align?: Enum_Componentaccordionitemsflattext_Align | null | undefined;
  moreLinkTitle?: string | null | undefined;
  moreLinkUrl?: string | null | undefined;
  moreLinkPage?:
    | {
        __typename?: 'Page';
        locale?: string | null | undefined;
        slug?: string | null | undefined;
        title?: string | null | undefined;
      }
    | null
    | undefined;
};

export type InstitutionFragment = {
  __typename?: 'ComponentAccordionItemsInstitution';
  title?: string | null | undefined;
  subtitle?: string | null | undefined;
  category?: string | null | undefined;
  firstColumn?: string | null | undefined;
  secondColumn?: string | null | undefined;
  thirdColumn?: string | null | undefined;
  url?: string | null | undefined;
  urlLabel?: string | null | undefined;
};

export type IconTitleDescFragment = {
  __typename?: 'ComponentBlocksIconWithTitleAndDescription';
  title?: string | null | undefined;
  desc?: string | null | undefined;
  icon?:
    | { __typename?: 'UploadFile'; id: string; url: string }
    | null
    | undefined;
};

export type FileFragment = {
  __typename?: 'ComponentBlocksFile';
  title?: string | null | undefined;
  category?: string | null | undefined;
  media?:
    | {
        __typename?: 'UploadFile';
        url: string;
        created_at: any;
        size: number;
        ext?: string | null | undefined;
      }
    | null
    | undefined;
};

export type NumericalListItemFragment = {
  __typename?: 'ComponentBlocksNumericalListItem';
  text: string;
};

export type LocalizationFragment = {
  __typename?: 'Page';
  slug?: string | null | undefined;
  locale?: string | null | undefined;
};

export type BlogLocalizationFragment = {
  __typename?: 'BlogPost';
  slug?: string | null | undefined;
  locale?: string | null | undefined;
};

export type MainMenuItemFragment = {
  __typename?: 'PageCategory';
  id: string;
  title?: string | null | undefined;
  color?: Enum_Pagecategory_Color | null | undefined;
  icon?: Enum_Pagecategory_Icon | null | undefined;
  iconHover?: Enum_Pagecategory_Iconhover | null | undefined;
  priority?: number | null | undefined;
  subcategories?:
    | Array<
        | {
            __typename?: 'PageSubcategory';
            id: string;
            title?: string | null | undefined;
            priority?: number | null | undefined;
            icon?: Enum_Pagesubcategory_Icon | null | undefined;
            moreLink?:
              | {
                  __typename?: 'ComponentBlocksPageLink';
                  title?: string | null | undefined;
                  url?: string | null | undefined;
                  anchor?: string | null | undefined;
                  page?:
                    | {
                        __typename?: 'Page';
                        locale?: string | null | undefined;
                        slug?: string | null | undefined;
                        title?: string | null | undefined;
                      }
                    | null
                    | undefined;
                }
              | null
              | undefined;
            pages?:
              | Array<
                  | {
                      __typename?: 'ComponentBlocksPageLink';
                      title?: string | null | undefined;
                      url?: string | null | undefined;
                      anchor?: string | null | undefined;
                      page?:
                        | {
                            __typename?: 'Page';
                            locale?: string | null | undefined;
                            slug?: string | null | undefined;
                            title?: string | null | undefined;
                          }
                        | null
                        | undefined;
                    }
                  | null
                  | undefined
                >
              | null
              | undefined;
          }
        | null
        | undefined
      >
    | null
    | undefined;
};

export const NewsCardBlogFragmentDoc = gql`
  fragment NewsCardBlog on BlogPost {
    title
    excerpt
    slug
    updated_at
    date_added
    coverImage {
      url
    }
    tag {
      title
      pageCategory {
        color
      }
    }
  }
`;
export const PageLinkFragmentDoc = gql`
  fragment PageLink on ComponentBlocksPageLink {
    title
    url
    anchor
    page {
      locale
      slug
      title
    }
  }
`;
export const LocalizationFragmentDoc = gql`
  fragment Localization on Page {
    slug
    locale
  }
`;
export const IconTitleDescFragmentDoc = gql`
  fragment IconTitleDesc on ComponentBlocksIconWithTitleAndDescription {
    title
    desc
    icon {
      id
      url
    }
  }
`;
export const DocumentListFragmentDoc = gql`
  fragment DocumentList on ComponentSectionsDocumentList {
    vzns {
      id
      category
      details
      amedmentDocument {
        id
        title
        validFrom
        document {
          url
          size
          ext
          created_at
        }
      }
      cancellationDocument {
        id
        title
        validFrom
        document {
          url
          size
          ext
          created_at
        }
      }
      title
      validFrom
      mainDocument {
        url
        size
        ext
        created_at
      }
      consolidatedText {
        id
        url
        size
        ext
        created_at
      }
    }
  }
`;
export const FileFragmentDoc = gql`
  fragment File on ComponentBlocksFile {
    title
    category
    media {
      url
      created_at
      size
      ext
    }
  }
`;
export const InstitutionFragmentDoc = gql`
  fragment Institution on ComponentAccordionItemsInstitution {
    title
    subtitle
    category
    firstColumn
    secondColumn
    thirdColumn
    url
    urlLabel
  }
`;
export const FlatTextFragmentDoc = gql`
  fragment FlatText on ComponentAccordionItemsFlatText {
    category
    content
    width
    align
    moreLinkTitle
    moreLinkUrl
    moreLinkPage {
      locale
      slug
      title
    }
  }
`;
export const InstitutionsNarrowFragmentDoc = gql`
  fragment institutionsNarrow on ComponentAccordionItemsInstitutionNarrow {
    title
    subtitle
    category
    url
    urlLabel
  }
`;
export const NumericalListItemFragmentDoc = gql`
  fragment NumericalListItem on ComponentBlocksNumericalListItem {
    text
  }
`;
export const SectionsFragmentDoc = gql`
  fragment Sections on PageSectionsDynamicZone {
    __typename
    ... on ComponentSectionsIconTitleDesc {
      title
      list {
        ...IconTitleDesc
      }
    }
    ... on ComponentSectionsDocumentList {
      ...DocumentList
    }
    ... on ComponentSectionsDivider {
      hasBackground
      style
    }
    ... on ComponentSectionsTextWithImage {
      hasBackground
      content
      imagePosition
      imageShadow
      imageSrc {
        url
      }
    }
    ... on ComponentSectionsFileList {
      hasBackground
      fileList {
        ...File
      }
    }
    ... on ComponentSectionsColumnedText {
      hasBackground
      content
    }
    ... on ComponentSectionsNarrowText {
      hasBackground
      content
      width
      align
    }
    ... on ComponentSectionsWaves {
      position
      isRich
    }
    ... on ComponentSectionsLinks {
      title
      hasBackground
      pageLinks {
        ...PageLink
      }
    }
    ... on ComponentSectionsContact {
      title
      hasBackground
      description
      phone
      phoneLabel
      email
      emailLabel
      address
    }
    ... on ComponentSectionsAccordion {
      title
      hasBackground
      institutions {
        ...Institution
      }
      flatText {
        ...FlatText
      }
      institutionsNarrow {
        ...institutionsNarrow
      }
    }
    ... on ComponentSectionsCalculator {
      hasBackground
      single_adult_value
      another_adult_value
      child_value
    }
    ... on ComponentSectionsListItems {
      title
      hasBackground
      listItems {
        content
        moreLinkTitle
        moreLinkUrl
        moreLinkPage {
          locale
          slug
          title
        }
        circleOption
      }
    }
    ... on ComponentSectionsVideos {
      id
      title
      subtitle
      videos {
        id
        title
        speaker
        url
      }
    }
    ... on ComponentSectionsNumericalList {
      id
      items {
        ...NumericalListItem
      }
      title
      variant
      buttonText
      buttonLink
      hasBackground
    }
    ... on ComponentSectionsArticlesList {
      title
      category {
        title
      }
      filtering
    }

    ... on ComponentSectionsIframe {
      iframe_url
      iframe_width
      iframe_height
      iframe_frameBorder
      iframe_scrolling
      iframe_allowfullscreen
      iframe_style
    }
  }
  ${IconTitleDescFragmentDoc}
  ${DocumentListFragmentDoc}
  ${FileFragmentDoc}
  ${PageLinkFragmentDoc}
  ${InstitutionFragmentDoc}
  ${FlatTextFragmentDoc}
  ${InstitutionsNarrowFragmentDoc}
  ${NumericalListItemFragmentDoc}
`;
export const ParentPageFragmentDoc = gql`
  fragment ParentPage on Page {
    slug
    locale
    title
  }
`;
export const BlogPostLinkFragmentDoc = gql`
  fragment BlogPostLink on ComponentBlocksBlogPostLink {
    title
    url
    blogPost {
      title
      slug
    }
  }
`;
export const BlogPostFragmentDoc = gql`
  fragment BlogPost on BlogPost {
    id
    slug
    title
    excerpt
    tag {
      id
      title
      pageCategory {
        id
        title
        color
      }
    }
    sections {
      ...Sections
    }
    coverImage {
      url
    }
    moreLink {
      ...BlogPostLink
    }
    created_at
  }
  ${SectionsFragmentDoc}
  ${BlogPostLinkFragmentDoc}
`;
export const GeneralPageFragmentDoc = gql`
  fragment GeneralPage on Page {
    slug
    title
    pageColor
    metaDiscription
    pageBackgroundImage {
      url
    }
    pageButtonContent {
      ...PageLink
    }
    locale
    localizations {
      ...Localization
    }
    sections {
      ...Sections
    }
    pageHeaderSections {
      __typename
      ... on ComponentSectionsSubpageList {
        subpageList {
          ...PageLink
        }
      }
      ... on ComponentSectionsFeaturedBlogPosts {
        first_blog {
          title
          published_at
          coverImage {
            url
          }
          tag {
            pageCategory {
              color
              shortTitle
            }
          }
        }
        second_blog {
          title
          published_at
          coverImage {
            url
          }
          tag {
            pageCategory {
              color
              shortTitle
            }
          }
        }
        third_blog {
          title
          published_at
          coverImage {
            url
          }
          tag {
            pageCategory {
              color
              shortTitle
            }
          }
        }
      }
    }
    pageCategory {
      id
      title
      color
    }
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
    relatedBlogPosts {
      ...BlogPost
    }
  }
  ${PageLinkFragmentDoc}
  ${LocalizationFragmentDoc}
  ${SectionsFragmentDoc}
  ${ParentPageFragmentDoc}
  ${BlogPostFragmentDoc}
`;
export const FooterFragmentDoc = gql`
  fragment Footer on Footer {
    address
    phone
    email
    copyright
    accessibilityLink {
      ...PageLink
    }
    youtubeUrl
    facebookUrl
    instagramUrl
    footerSections {
      title
      pageLinks {
        ...PageLink
      }
    }
  }
  ${PageLinkFragmentDoc}
`;
export const MainMenuItemFragmentDoc = gql`
  fragment MainMenuItem on PageCategory {
    id
    title
    color
    icon
    iconHover
    priority
    subcategories {
      id
      title
      priority
      icon
      moreLink {
        ...PageLink
      }
      pages {
        ...PageLink
      }
    }
  }
  ${PageLinkFragmentDoc}
`;
export const BlogPostBySlugDocument = gql`
  query BlogPostBySlug($slug: String!, $locale: String) {
    blogPostBySlug(slug: $slug, locale: $locale) {
      ...BlogPost
    }
    footer(locale: $locale) {
      ...Footer
    }
    mainMenu: pageCategories(locale: $locale) {
      ...MainMenuItem
    }
  }
  ${BlogPostFragmentDoc}
  ${FooterFragmentDoc}
  ${MainMenuItemFragmentDoc}
`;
export const RelatedPostsBySlugDocument = gql`
  query RelatedPostsBySlug($slug: String!, $locale: String!) {
    relatedPostsBySlug(slug: $slug, locale: $locale) {
      ...BlogPost
    }
  }
  ${BlogPostFragmentDoc}
`;
export const LatestPostsByTagsDocument = gql`
  query LatestPostsByTags($tags: [Int], $limit: Int, $offset: Int) {
    latestPostsByTags(tags: $tags, limit: $limit, offset: $offset) {
      ...BlogPost
    }
  }
  ${BlogPostFragmentDoc}
`;
export const BlogPostsStaticPathsDocument = gql`
  query BlogPostsStaticPaths($locale: String) {
    blogPosts(locale: $locale) {
      id
      slug
    }
  }
`;
export const LatestBlogsWithTagsDocument = gql`
  query LatestBlogsWithTags(
    $sort: String
    $limit: Int
    $offset: Int
    $where: JSON
  ) {
    blogPosts(sort: $sort, limit: $limit, start: $offset, where: $where) {
      slug
      title
      excerpt
      coverImage {
        url
      }
      tag {
        title
        pageCategory {
          title
          color
        }
      }
      published_at
    }
  }
`;
export const TotalPostsCountDocument = gql`
  query TotalPostsCount($where: JSON) {
    blogPostsConnection(where: $where) {
      aggregate {
        count
        totalCount
      }
    }
  }
`;
export const RelatedTagsDocument = gql`
  query RelatedTags($where: JSON) {
    tags(where: $where) {
      title
      pageCategory {
        title
        color
      }
    }
  }
`;
export const HomepageDocument = gql`
  query Homepage($locale: String) {
    homepage(locale: $locale) {
      id
      updated_at
      created_at
      posts {
        title
        slug
        image {
          url
        }
      }
      left_highlight {
        ...NewsCardBlog
      }
      right_highlight {
        ...NewsCardBlog
      }
      header {
        picture {
          url
        }
        subtitle
      }
      cards {
        title
        headline
        text
        link {
          title
          href
        }
        picture {
          url
        }
        variant
      }
      inba {
        title
        content
        images {
          frontImage {
            url
          }
          rearImage {
            url
          }
        }
        link
      }
    }
  }
  ${NewsCardBlogFragmentDoc}
`;
export const PagesDocument = gql`
  query Pages {
    pages {
      id
      slug
      sections {
        ...Sections
      }
    }
  }
  ${SectionsFragmentDoc}
`;
export const PagesStaticPathsDocument = gql`
  query PagesStaticPaths {
    pages {
      id
      slug
    }
  }
`;
export const PageBySlugDocument = gql`
  query PageBySlug($slug: String!, $locale: String!) {
    pageBySlug(slug: $slug, locale: $locale) {
      ...GeneralPage
    }
    footer(locale: $locale) {
      ...Footer
    }
    mainMenu: pageCategories(locale: $locale) {
      ...MainMenuItem
    }
  }
  ${GeneralPageFragmentDoc}
  ${FooterFragmentDoc}
  ${MainMenuItemFragmentDoc}
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  return {
    BlogPostBySlug(
      variables: BlogPostBySlugQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<BlogPostBySlugQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<BlogPostBySlugQuery>(
            BlogPostBySlugDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'BlogPostBySlug'
      );
    },
    RelatedPostsBySlug(
      variables: RelatedPostsBySlugQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<RelatedPostsBySlugQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<RelatedPostsBySlugQuery>(
            RelatedPostsBySlugDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'RelatedPostsBySlug'
      );
    },
    LatestPostsByTags(
      variables?: LatestPostsByTagsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<LatestPostsByTagsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<LatestPostsByTagsQuery>(
            LatestPostsByTagsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'LatestPostsByTags'
      );
    },
    BlogPostsStaticPaths(
      variables?: BlogPostsStaticPathsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<BlogPostsStaticPathsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<BlogPostsStaticPathsQuery>(
            BlogPostsStaticPathsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'BlogPostsStaticPaths'
      );
    },
    LatestBlogsWithTags(
      variables?: LatestBlogsWithTagsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<LatestBlogsWithTagsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<LatestBlogsWithTagsQuery>(
            LatestBlogsWithTagsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'LatestBlogsWithTags'
      );
    },
    TotalPostsCount(
      variables?: TotalPostsCountQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<TotalPostsCountQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<TotalPostsCountQuery>(
            TotalPostsCountDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'TotalPostsCount'
      );
    },
    RelatedTags(
      variables?: RelatedTagsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<RelatedTagsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<RelatedTagsQuery>(RelatedTagsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'RelatedTags'
      );
    },
    Homepage(
      variables?: HomepageQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<HomepageQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<HomepageQuery>(HomepageDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'Homepage'
      );
    },
    Pages(
      variables?: PagesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<PagesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<PagesQuery>(PagesDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'Pages'
      );
    },
    PagesStaticPaths(
      variables?: PagesStaticPathsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<PagesStaticPathsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<PagesStaticPathsQuery>(
            PagesStaticPathsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'PagesStaticPaths'
      );
    },
    PageBySlug(
      variables: PageBySlugQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<PageBySlugQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<PageBySlugQuery>(PageBySlugDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'PageBySlug'
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
