import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BlogPostSectionsDynamicZoneInput: any;
  Date: any;
  DateTime: any;
  I18NLocaleCode: any;
  JSON: any;
  Long: any;
  PagePageHeaderSectionsDynamicZoneInput: any;
  PageSectionsDynamicZoneInput: any;
  Upload: any;
};

export type Audience = {
  __typename?: 'Audience';
  createdAt?: Maybe<Scalars['DateTime']>;
  key?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type AudienceEntity = {
  __typename?: 'AudienceEntity';
  attributes?: Maybe<Audience>;
  id?: Maybe<Scalars['ID']>;
};

export type AudienceEntityResponse = {
  __typename?: 'AudienceEntityResponse';
  data?: Maybe<AudienceEntity>;
};

export type AudienceEntityResponseCollection = {
  __typename?: 'AudienceEntityResponseCollection';
  data: Array<AudienceEntity>;
  meta: ResponseCollectionMeta;
};

export type AudienceFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<AudienceFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  key?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<AudienceFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<AudienceFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type AudienceInput = {
  key?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
};

export type Author = {
  __typename?: 'Author';
  createdAt?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  picture?: Maybe<UploadFileEntityResponse>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type AuthorEntity = {
  __typename?: 'AuthorEntity';
  attributes?: Maybe<Author>;
  id?: Maybe<Scalars['ID']>;
};

export type AuthorEntityResponse = {
  __typename?: 'AuthorEntityResponse';
  data?: Maybe<AuthorEntity>;
};

export type AuthorEntityResponseCollection = {
  __typename?: 'AuthorEntityResponseCollection';
  data: Array<AuthorEntity>;
  meta: ResponseCollectionMeta;
};

export type AuthorFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<AuthorFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<AuthorFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<AuthorFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type AuthorInput = {
  name?: InputMaybe<Scalars['String']>;
  picture?: InputMaybe<Scalars['ID']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
};

export type BlogPost = {
  __typename?: 'BlogPost';
  author?: Maybe<UsersPermissionsUserEntityResponse>;
  coverImage?: Maybe<UploadFileEntityResponse>;
  createdAt?: Maybe<Scalars['DateTime']>;
  date_added?: Maybe<Scalars['DateTime']>;
  excerpt?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<BlogPostRelationResponseCollection>;
  moreLink?: Maybe<ComponentBlocksBlogPostLink>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  sections?: Maybe<Array<Maybe<BlogPostSectionsDynamicZone>>>;
  slug?: Maybe<Scalars['String']>;
  tag?: Maybe<TagEntityResponse>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type BlogPostLocalizationsArgs = {
  filters?: InputMaybe<BlogPostFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type BlogPostEntity = {
  __typename?: 'BlogPostEntity';
  attributes?: Maybe<BlogPost>;
  id?: Maybe<Scalars['ID']>;
};

export type BlogPostEntityResponse = {
  __typename?: 'BlogPostEntityResponse';
  data?: Maybe<BlogPostEntity>;
};

export type BlogPostEntityResponseCollection = {
  __typename?: 'BlogPostEntityResponseCollection';
  data: Array<BlogPostEntity>;
  meta: ResponseCollectionMeta;
};

export type BlogPostFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<BlogPostFiltersInput>>>;
  author?: InputMaybe<UsersPermissionsUserFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  date_added?: InputMaybe<DateTimeFilterInput>;
  excerpt?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<BlogPostFiltersInput>;
  moreLink?: InputMaybe<ComponentBlocksBlogPostLinkFiltersInput>;
  not?: InputMaybe<BlogPostFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<BlogPostFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  slug?: InputMaybe<StringFilterInput>;
  tag?: InputMaybe<TagFiltersInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type BlogPostInput = {
  author?: InputMaybe<Scalars['ID']>;
  coverImage?: InputMaybe<Scalars['ID']>;
  date_added?: InputMaybe<Scalars['DateTime']>;
  excerpt?: InputMaybe<Scalars['String']>;
  moreLink?: InputMaybe<ComponentBlocksBlogPostLinkInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  sections?: InputMaybe<Array<Scalars['BlogPostSectionsDynamicZoneInput']>>;
  slug?: InputMaybe<Scalars['String']>;
  tag?: InputMaybe<Scalars['ID']>;
  title?: InputMaybe<Scalars['String']>;
};

export type BlogPostRelationResponseCollection = {
  __typename?: 'BlogPostRelationResponseCollection';
  data: Array<BlogPostEntity>;
};

export type BlogPostSectionsDynamicZone = ComponentSectionsAccordion | ComponentSectionsArticlesList | ComponentSectionsCalculator | ComponentSectionsColumnedText | ComponentSectionsContact | ComponentSectionsDivider | ComponentSectionsFileList | ComponentSectionsGallery | ComponentSectionsIconTitleDesc | ComponentSectionsIframe | ComponentSectionsLinks | ComponentSectionsListItems | ComponentSectionsNarrowText | ComponentSectionsNumericalList | ComponentSectionsOrganizationalStructure | ComponentSectionsTextWithImage | ComponentSectionsVideos | ComponentSectionsWaves | Error;

export type BooleanFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  contains?: InputMaybe<Scalars['Boolean']>;
  containsi?: InputMaybe<Scalars['Boolean']>;
  endsWith?: InputMaybe<Scalars['Boolean']>;
  eq?: InputMaybe<Scalars['Boolean']>;
  eqi?: InputMaybe<Scalars['Boolean']>;
  gt?: InputMaybe<Scalars['Boolean']>;
  gte?: InputMaybe<Scalars['Boolean']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  lt?: InputMaybe<Scalars['Boolean']>;
  lte?: InputMaybe<Scalars['Boolean']>;
  ne?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<BooleanFilterInput>;
  notContains?: InputMaybe<Scalars['Boolean']>;
  notContainsi?: InputMaybe<Scalars['Boolean']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Boolean']>>>;
  startsWith?: InputMaybe<Scalars['Boolean']>;
};

export type ComponentAccordionItemsFlatText = {
  __typename?: 'ComponentAccordionItemsFlatText';
  align?: Maybe<Enum_Componentaccordionitemsflattext_Align>;
  category?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  moreLinkPage?: Maybe<PageEntityResponse>;
  moreLinkTitle?: Maybe<Scalars['String']>;
  moreLinkUrl?: Maybe<Scalars['String']>;
  width?: Maybe<Enum_Componentaccordionitemsflattext_Width>;
};

export type ComponentAccordionItemsFlatTextFiltersInput = {
  align?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<ComponentAccordionItemsFlatTextFiltersInput>>>;
  category?: InputMaybe<StringFilterInput>;
  content?: InputMaybe<StringFilterInput>;
  moreLinkPage?: InputMaybe<PageFiltersInput>;
  moreLinkTitle?: InputMaybe<StringFilterInput>;
  moreLinkUrl?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentAccordionItemsFlatTextFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentAccordionItemsFlatTextFiltersInput>>>;
  width?: InputMaybe<StringFilterInput>;
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

export type ComponentAccordionItemsInstitutionFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentAccordionItemsInstitutionFiltersInput>>>;
  category?: InputMaybe<StringFilterInput>;
  firstColumn?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentAccordionItemsInstitutionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentAccordionItemsInstitutionFiltersInput>>>;
  secondColumn?: InputMaybe<StringFilterInput>;
  subtitle?: InputMaybe<StringFilterInput>;
  thirdColumn?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  url?: InputMaybe<StringFilterInput>;
  urlLabel?: InputMaybe<StringFilterInput>;
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

export type ComponentAccordionItemsInstitutionNarrowFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentAccordionItemsInstitutionNarrowFiltersInput>>>;
  category?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentAccordionItemsInstitutionNarrowFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentAccordionItemsInstitutionNarrowFiltersInput>>>;
  subtitle?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  url?: InputMaybe<StringFilterInput>;
  urlLabel?: InputMaybe<StringFilterInput>;
};

export type ComponentBlocksBlogPostLink = {
  __typename?: 'ComponentBlocksBlogPostLink';
  blogPost?: Maybe<BlogPostEntityResponse>;
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type ComponentBlocksBlogPostLinkFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksBlogPostLinkFiltersInput>>>;
  blogPost?: InputMaybe<BlogPostFiltersInput>;
  not?: InputMaybe<ComponentBlocksBlogPostLinkFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksBlogPostLinkFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
  url?: InputMaybe<StringFilterInput>;
};

export type ComponentBlocksBlogPostLinkInput = {
  blogPost?: InputMaybe<Scalars['ID']>;
  id?: InputMaybe<Scalars['ID']>;
  title?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
};

export type ComponentBlocksBookmarkLink = {
  __typename?: 'ComponentBlocksBookmarkLink';
  href?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};

export type ComponentBlocksBookmarkLinkFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksBookmarkLinkFiltersInput>>>;
  href?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentBlocksBookmarkLinkFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksBookmarkLinkFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentBlocksBookmarkLinkInput = {
  href?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ComponentBlocksDocListExtensions = {
  __typename?: 'ComponentBlocksDocListExtensions';
  document?: Maybe<UploadFileEntityResponse>;
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  validFrom?: Maybe<Scalars['Date']>;
};

export type ComponentBlocksDocListExtensionsFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksDocListExtensionsFiltersInput>>>;
  not?: InputMaybe<ComponentBlocksDocListExtensionsFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksDocListExtensionsFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
  validFrom?: InputMaybe<DateFilterInput>;
};

export type ComponentBlocksDocListExtensionsInput = {
  document?: InputMaybe<Scalars['ID']>;
  id?: InputMaybe<Scalars['ID']>;
  title?: InputMaybe<Scalars['String']>;
  validFrom?: InputMaybe<Scalars['Date']>;
};

export type ComponentBlocksFile = {
  __typename?: 'ComponentBlocksFile';
  category?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  media?: Maybe<UploadFileEntityResponse>;
  title?: Maybe<Scalars['String']>;
};

export type ComponentBlocksFileFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksFileFiltersInput>>>;
  category?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentBlocksFileFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksFileFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentBlocksFooterSection = {
  __typename?: 'ComponentBlocksFooterSection';
  id: Scalars['ID'];
  pageLinks?: Maybe<Array<Maybe<ComponentBlocksPageLink>>>;
  title?: Maybe<Scalars['String']>;
};


export type ComponentBlocksFooterSectionPageLinksArgs = {
  filters?: InputMaybe<ComponentBlocksPageLinkFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentBlocksFooterSectionFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksFooterSectionFiltersInput>>>;
  not?: InputMaybe<ComponentBlocksFooterSectionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksFooterSectionFiltersInput>>>;
  pageLinks?: InputMaybe<ComponentBlocksPageLinkFiltersInput>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentBlocksFooterSectionInput = {
  id?: InputMaybe<Scalars['ID']>;
  pageLinks?: InputMaybe<Array<InputMaybe<ComponentBlocksPageLinkInput>>>;
  title?: InputMaybe<Scalars['String']>;
};

export type ComponentBlocksGalleryItem = {
  __typename?: 'ComponentBlocksGalleryItem';
  id: Scalars['ID'];
  imgSubtext?: Maybe<Scalars['String']>;
  imgSubtitle?: Maybe<Scalars['String']>;
  imgTitle?: Maybe<Scalars['String']>;
  media?: Maybe<UploadFileEntityResponse>;
};

export type ComponentBlocksGalleryItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksGalleryItemFiltersInput>>>;
  imgSubtext?: InputMaybe<StringFilterInput>;
  imgSubtitle?: InputMaybe<StringFilterInput>;
  imgTitle?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentBlocksGalleryItemFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksGalleryItemFiltersInput>>>;
};

export type ComponentBlocksHomepageBookmark = {
  __typename?: 'ComponentBlocksHomepageBookmark';
  headline?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  link?: Maybe<ComponentBlocksBookmarkLink>;
  picture?: Maybe<UploadFileEntityResponse>;
  text?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  variant?: Maybe<Scalars['String']>;
};

export type ComponentBlocksHomepageBookmarkFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksHomepageBookmarkFiltersInput>>>;
  headline?: InputMaybe<StringFilterInput>;
  link?: InputMaybe<ComponentBlocksBookmarkLinkFiltersInput>;
  not?: InputMaybe<ComponentBlocksHomepageBookmarkFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksHomepageBookmarkFiltersInput>>>;
  text?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  variant?: InputMaybe<StringFilterInput>;
};

export type ComponentBlocksHomepageBookmarkInput = {
  headline?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  link?: InputMaybe<ComponentBlocksBookmarkLinkInput>;
  picture?: InputMaybe<Scalars['ID']>;
  text?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  variant?: InputMaybe<Scalars['String']>;
};

export type ComponentBlocksHomepageHeader = {
  __typename?: 'ComponentBlocksHomepageHeader';
  headline: Scalars['String'];
  id: Scalars['ID'];
  mobilePicture?: Maybe<UploadFileEntityResponse>;
  picture?: Maybe<UploadFileEntityResponse>;
};

export type ComponentBlocksHomepageHeaderInput = {
  headline?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  mobilePicture?: InputMaybe<Scalars['ID']>;
  picture?: InputMaybe<Scalars['ID']>;
};

export type ComponentBlocksHomepagePost = {
  __typename?: 'ComponentBlocksHomepagePost';
  id: Scalars['ID'];
  image?: Maybe<UploadFileEntityResponse>;
  slug?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type ComponentBlocksHomepagePostFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksHomepagePostFiltersInput>>>;
  not?: InputMaybe<ComponentBlocksHomepagePostFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksHomepagePostFiltersInput>>>;
  slug?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentBlocksHomepagePostInput = {
  id?: InputMaybe<Scalars['ID']>;
  image?: InputMaybe<Scalars['ID']>;
  slug?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ComponentBlocksIconWithTitleAndDescription = {
  __typename?: 'ComponentBlocksIconWithTitleAndDescription';
  desc?: Maybe<Scalars['String']>;
  icon?: Maybe<UploadFileEntityResponse>;
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};

export type ComponentBlocksIconWithTitleAndDescriptionFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksIconWithTitleAndDescriptionFiltersInput>>>;
  desc?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentBlocksIconWithTitleAndDescriptionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksIconWithTitleAndDescriptionFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
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
  id?: InputMaybe<Scalars['ID']>;
  images?: InputMaybe<ComponentBlocksInBaPicturesInput>;
  link?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ComponentBlocksInBaPictures = {
  __typename?: 'ComponentBlocksInBaPictures';
  frontImage?: Maybe<UploadFileEntityResponse>;
  id: Scalars['ID'];
  rearImage?: Maybe<UploadFileEntityResponse>;
};

export type ComponentBlocksInBaPicturesInput = {
  frontImage?: InputMaybe<Scalars['ID']>;
  id?: InputMaybe<Scalars['ID']>;
  rearImage?: InputMaybe<Scalars['ID']>;
};

export type ComponentBlocksListItem = {
  __typename?: 'ComponentBlocksListItem';
  circleOption?: Maybe<Enum_Componentblockslistitem_Circleoption>;
  content?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  moreLinkPage?: Maybe<PageEntityResponse>;
  moreLinkTitle?: Maybe<Scalars['String']>;
  moreLinkUrl?: Maybe<Scalars['String']>;
};

export type ComponentBlocksListItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksListItemFiltersInput>>>;
  circleOption?: InputMaybe<StringFilterInput>;
  content?: InputMaybe<StringFilterInput>;
  moreLinkPage?: InputMaybe<PageFiltersInput>;
  moreLinkTitle?: InputMaybe<StringFilterInput>;
  moreLinkUrl?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentBlocksListItemFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksListItemFiltersInput>>>;
};

export type ComponentBlocksNumericalListItem = {
  __typename?: 'ComponentBlocksNumericalListItem';
  id: Scalars['ID'];
  text?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type ComponentBlocksNumericalListItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksNumericalListItemFiltersInput>>>;
  not?: InputMaybe<ComponentBlocksNumericalListItemFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksNumericalListItemFiltersInput>>>;
  text?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentBlocksPageLink = {
  __typename?: 'ComponentBlocksPageLink';
  anchor?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  page?: Maybe<PageEntityResponse>;
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type ComponentBlocksPageLinkFiltersInput = {
  anchor?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksPageLinkFiltersInput>>>;
  not?: InputMaybe<ComponentBlocksPageLinkFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksPageLinkFiltersInput>>>;
  page?: InputMaybe<PageFiltersInput>;
  title?: InputMaybe<StringFilterInput>;
  url?: InputMaybe<StringFilterInput>;
};

export type ComponentBlocksPageLinkInput = {
  anchor?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  page?: InputMaybe<Scalars['ID']>;
  title?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
};

export type ComponentBlocksSpaceInfo = {
  __typename?: 'ComponentBlocksSpaceInfo';
  bigGapCapacity?: Maybe<Scalars['Long']>;
  buttonTitle?: Maybe<Scalars['String']>;
  footerText?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  image?: Maybe<UploadFileEntityResponse>;
  imagePosition?: Maybe<Enum_Componentblocksspaceinfo_Imageposition>;
  linkTitle?: Maybe<Scalars['String']>;
  smallGapCapacity?: Maybe<Scalars['Long']>;
  spaceTitle?: Maybe<Scalars['String']>;
  subText?: Maybe<Scalars['String']>;
};

export type ComponentBlocksSpaceInfoFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksSpaceInfoFiltersInput>>>;
  bigGapCapacity?: InputMaybe<LongFilterInput>;
  buttonTitle?: InputMaybe<StringFilterInput>;
  footerText?: InputMaybe<StringFilterInput>;
  imagePosition?: InputMaybe<StringFilterInput>;
  linkTitle?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentBlocksSpaceInfoFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksSpaceInfoFiltersInput>>>;
  smallGapCapacity?: InputMaybe<LongFilterInput>;
  spaceTitle?: InputMaybe<StringFilterInput>;
  subText?: InputMaybe<StringFilterInput>;
};

export type ComponentBlocksSubpage = {
  __typename?: 'ComponentBlocksSubpage';
  id: Scalars['ID'];
  link?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type ComponentBlocksVideo = {
  __typename?: 'ComponentBlocksVideo';
  id: Scalars['ID'];
  speaker?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type ComponentBlocksVideoFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksVideoFiltersInput>>>;
  not?: InputMaybe<ComponentBlocksVideoFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksVideoFiltersInput>>>;
  speaker?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  url?: InputMaybe<StringFilterInput>;
};

export type ComponentOsItemsAdvancedAccordionDepartment = {
  __typename?: 'ComponentOsItemsAdvancedAccordionDepartment';
  id: Scalars['ID'];
  items?: Maybe<Array<Maybe<ComponentOsItemsAdvancedAccordionSubItem>>>;
  title?: Maybe<Scalars['String']>;
};


export type ComponentOsItemsAdvancedAccordionDepartmentItemsArgs = {
  filters?: InputMaybe<ComponentOsItemsAdvancedAccordionSubItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentOsItemsAdvancedAccordionDepartmentFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentOsItemsAdvancedAccordionDepartmentFiltersInput>>>;
  items?: InputMaybe<ComponentOsItemsAdvancedAccordionSubItemFiltersInput>;
  not?: InputMaybe<ComponentOsItemsAdvancedAccordionDepartmentFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentOsItemsAdvancedAccordionDepartmentFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentOsItemsAdvancedAccordionItem = {
  __typename?: 'ComponentOsItemsAdvancedAccordionItem';
  departments?: Maybe<Array<Maybe<ComponentOsItemsAdvancedAccordionDepartment>>>;
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};


export type ComponentOsItemsAdvancedAccordionItemDepartmentsArgs = {
  filters?: InputMaybe<ComponentOsItemsAdvancedAccordionDepartmentFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentOsItemsAdvancedAccordionItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentOsItemsAdvancedAccordionItemFiltersInput>>>;
  departments?: InputMaybe<ComponentOsItemsAdvancedAccordionDepartmentFiltersInput>;
  not?: InputMaybe<ComponentOsItemsAdvancedAccordionItemFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentOsItemsAdvancedAccordionItemFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentOsItemsAdvancedAccordionSubItem = {
  __typename?: 'ComponentOsItemsAdvancedAccordionSubItem';
  id: Scalars['ID'];
  isGroupTitle?: Maybe<Scalars['Boolean']>;
  items?: Maybe<Array<Maybe<ComponentOsItemsAdvancedAccordionSubSubItem>>>;
  title?: Maybe<Scalars['String']>;
};


export type ComponentOsItemsAdvancedAccordionSubItemItemsArgs = {
  filters?: InputMaybe<ComponentOsItemsAdvancedAccordionSubSubItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentOsItemsAdvancedAccordionSubItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentOsItemsAdvancedAccordionSubItemFiltersInput>>>;
  isGroupTitle?: InputMaybe<BooleanFilterInput>;
  items?: InputMaybe<ComponentOsItemsAdvancedAccordionSubSubItemFiltersInput>;
  not?: InputMaybe<ComponentOsItemsAdvancedAccordionSubItemFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentOsItemsAdvancedAccordionSubItemFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentOsItemsAdvancedAccordionSubSubItem = {
  __typename?: 'ComponentOsItemsAdvancedAccordionSubSubItem';
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};

export type ComponentOsItemsAdvancedAccordionSubSubItemFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentOsItemsAdvancedAccordionSubSubItemFiltersInput>>>;
  not?: InputMaybe<ComponentOsItemsAdvancedAccordionSubSubItemFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentOsItemsAdvancedAccordionSubSubItemFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentSectionsAccordion = {
  __typename?: 'ComponentSectionsAccordion';
  flatText?: Maybe<Array<Maybe<ComponentAccordionItemsFlatText>>>;
  hasBackground?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  institutions?: Maybe<Array<Maybe<ComponentAccordionItemsInstitution>>>;
  institutionsNarrow?: Maybe<Array<Maybe<ComponentAccordionItemsInstitutionNarrow>>>;
  title?: Maybe<Scalars['String']>;
};


export type ComponentSectionsAccordionFlatTextArgs = {
  filters?: InputMaybe<ComponentAccordionItemsFlatTextFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type ComponentSectionsAccordionInstitutionsArgs = {
  filters?: InputMaybe<ComponentAccordionItemsInstitutionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type ComponentSectionsAccordionInstitutionsNarrowArgs = {
  filters?: InputMaybe<ComponentAccordionItemsInstitutionNarrowFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentSectionsArticlesList = {
  __typename?: 'ComponentSectionsArticlesList';
  category?: Maybe<PageCategoryEntityResponse>;
  filtering?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};

export type ComponentSectionsCalculator = {
  __typename?: 'ComponentSectionsCalculator';
  another_adult_value?: Maybe<Scalars['Float']>;
  child_value?: Maybe<Scalars['Float']>;
  hasBackground?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  single_adult_value?: Maybe<Scalars['Float']>;
};

export type ComponentSectionsColumnedText = {
  __typename?: 'ComponentSectionsColumnedText';
  content?: Maybe<Scalars['String']>;
  hasBackground?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
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

export type ComponentSectionsDivider = {
  __typename?: 'ComponentSectionsDivider';
  hasBackground?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  style?: Maybe<Enum_Componentsectionsdivider_Style>;
};

export type ComponentSectionsDocumentList = {
  __typename?: 'ComponentSectionsDocumentList';
  id: Scalars['ID'];
  vzns?: Maybe<VznRelationResponseCollection>;
};


export type ComponentSectionsDocumentListVznsArgs = {
  filters?: InputMaybe<VznFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentSectionsFeaturedBlogPosts = {
  __typename?: 'ComponentSectionsFeaturedBlogPosts';
  first_blog?: Maybe<BlogPostEntityResponse>;
  id: Scalars['ID'];
  second_blog?: Maybe<BlogPostEntityResponse>;
  third_blog?: Maybe<BlogPostEntityResponse>;
};

export type ComponentSectionsFileList = {
  __typename?: 'ComponentSectionsFileList';
  fileList?: Maybe<Array<Maybe<ComponentBlocksFile>>>;
  hasBackground?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
};


export type ComponentSectionsFileListFileListArgs = {
  filters?: InputMaybe<ComponentBlocksFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentSectionsGallery = {
  __typename?: 'ComponentSectionsGallery';
  galleryItems?: Maybe<Array<Maybe<ComponentBlocksGalleryItem>>>;
  id: Scalars['ID'];
  subtitle?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};


export type ComponentSectionsGalleryGalleryItemsArgs = {
  filters?: InputMaybe<ComponentBlocksGalleryItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentSectionsIconTitleDesc = {
  __typename?: 'ComponentSectionsIconTitleDesc';
  hasBackground?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  list?: Maybe<Array<Maybe<ComponentBlocksIconWithTitleAndDescription>>>;
  title?: Maybe<Scalars['String']>;
};


export type ComponentSectionsIconTitleDescListArgs = {
  filters?: InputMaybe<ComponentBlocksIconWithTitleAndDescriptionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentSectionsIframe = {
  __typename?: 'ComponentSectionsIframe';
  allowFullscreen: Scalars['Boolean'];
  allowGeolocation?: Maybe<Scalars['Boolean']>;
  css?: Maybe<Scalars['String']>;
  fullHeight: Scalars['Boolean'];
  id: Scalars['ID'];
  iframeHeight: Scalars['String'];
  iframeWidth: Enum_Componentsectionsiframe_Iframewidth;
  url: Scalars['String'];
};

export type ComponentSectionsLinks = {
  __typename?: 'ComponentSectionsLinks';
  hasBackground?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  pageLinks?: Maybe<Array<Maybe<ComponentBlocksPageLink>>>;
  title?: Maybe<Scalars['String']>;
};


export type ComponentSectionsLinksPageLinksArgs = {
  filters?: InputMaybe<ComponentBlocksPageLinkFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentSectionsListItems = {
  __typename?: 'ComponentSectionsListItems';
  hasBackground?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  listItems?: Maybe<Array<Maybe<ComponentBlocksListItem>>>;
  title?: Maybe<Scalars['String']>;
};


export type ComponentSectionsListItemsListItemsArgs = {
  filters?: InputMaybe<ComponentBlocksListItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentSectionsNarrowText = {
  __typename?: 'ComponentSectionsNarrowText';
  align?: Maybe<Enum_Componentsectionsnarrowtext_Align>;
  content?: Maybe<Scalars['String']>;
  hasBackground?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  width?: Maybe<Enum_Componentsectionsnarrowtext_Width>;
};

export type ComponentSectionsNewsletter = {
  __typename?: 'ComponentSectionsNewsletter';
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
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


export type ComponentSectionsNumericalListItemsArgs = {
  filters?: InputMaybe<ComponentBlocksNumericalListItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentSectionsOrganizationalStructure = {
  __typename?: 'ComponentSectionsOrganizationalStructure';
  id: Scalars['ID'];
  items?: Maybe<Array<Maybe<ComponentOsItemsAdvancedAccordionItem>>>;
  title?: Maybe<Scalars['String']>;
};


export type ComponentSectionsOrganizationalStructureItemsArgs = {
  filters?: InputMaybe<ComponentOsItemsAdvancedAccordionItemFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentSectionsSpace = {
  __typename?: 'ComponentSectionsSpace';
  id: Scalars['ID'];
  sectionTitle?: Maybe<Scalars['String']>;
  spaceInfo?: Maybe<Array<Maybe<ComponentBlocksSpaceInfo>>>;
};


export type ComponentSectionsSpaceSpaceInfoArgs = {
  filters?: InputMaybe<ComponentBlocksSpaceInfoFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentSectionsSubpageList = {
  __typename?: 'ComponentSectionsSubpageList';
  hasBackground?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  subpageList?: Maybe<Array<Maybe<ComponentBlocksPageLink>>>;
};


export type ComponentSectionsSubpageListSubpageListArgs = {
  filters?: InputMaybe<ComponentBlocksPageLinkFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentSectionsTextWithImage = {
  __typename?: 'ComponentSectionsTextWithImage';
  content?: Maybe<Scalars['String']>;
  hasBackground?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  imagePosition?: Maybe<Enum_Componentsectionstextwithimage_Imageposition>;
  imageShadow?: Maybe<Scalars['Boolean']>;
  imageSrc?: Maybe<UploadFileEntityResponse>;
};

export type ComponentSectionsVideos = {
  __typename?: 'ComponentSectionsVideos';
  buttonContent?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  subtitle?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  videos?: Maybe<Array<Maybe<ComponentBlocksVideo>>>;
};


export type ComponentSectionsVideosVideosArgs = {
  filters?: InputMaybe<ComponentBlocksVideoFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ComponentSectionsWaves = {
  __typename?: 'ComponentSectionsWaves';
  id: Scalars['ID'];
  isRich?: Maybe<Scalars['Boolean']>;
  position?: Maybe<Enum_Componentsectionswaves_Position>;
};

export type DateFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  contains?: InputMaybe<Scalars['Date']>;
  containsi?: InputMaybe<Scalars['Date']>;
  endsWith?: InputMaybe<Scalars['Date']>;
  eq?: InputMaybe<Scalars['Date']>;
  eqi?: InputMaybe<Scalars['Date']>;
  gt?: InputMaybe<Scalars['Date']>;
  gte?: InputMaybe<Scalars['Date']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  lt?: InputMaybe<Scalars['Date']>;
  lte?: InputMaybe<Scalars['Date']>;
  ne?: InputMaybe<Scalars['Date']>;
  not?: InputMaybe<DateFilterInput>;
  notContains?: InputMaybe<Scalars['Date']>;
  notContainsi?: InputMaybe<Scalars['Date']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  startsWith?: InputMaybe<Scalars['Date']>;
};

export type DateTimeFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  contains?: InputMaybe<Scalars['DateTime']>;
  containsi?: InputMaybe<Scalars['DateTime']>;
  endsWith?: InputMaybe<Scalars['DateTime']>;
  eq?: InputMaybe<Scalars['DateTime']>;
  eqi?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  ne?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<DateTimeFilterInput>;
  notContains?: InputMaybe<Scalars['DateTime']>;
  notContainsi?: InputMaybe<Scalars['DateTime']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  startsWith?: InputMaybe<Scalars['DateTime']>;
};

export enum Enum_Componentaccordionitemsflattext_Align {
  Center = 'center',
  Left = 'left',
  Right = 'right'
}

export enum Enum_Componentaccordionitemsflattext_Width {
  Default = 'default',
  Full = 'full',
  Narrow = 'narrow',
  Wide = 'wide'
}

export enum Enum_Componentblockslistitem_Circleoption {
  Primary = 'primary',
  Secondary = 'secondary'
}

export enum Enum_Componentblocksspaceinfo_Imageposition {
  Left = 'left',
  Right = 'right'
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
  Vzdelavanie = 'vzdelavanie'
}

export enum Enum_Componentsectionsiframe_Iframewidth {
  Container = 'container',
  Full = 'full'
}

export enum Enum_Componentsectionsnarrowtext_Align {
  Center = 'center',
  Left = 'left',
  Right = 'right'
}

export enum Enum_Componentsectionsnarrowtext_Width {
  Default = 'default',
  Full = 'full',
  Narrow = 'narrow',
  Wide = 'wide'
}

export enum Enum_Componentsectionsnumericallist_Variant {
  Basic = 'basic',
  Combined = 'combined',
  Roadmap = 'roadmap'
}

export enum Enum_Componentsectionstextwithimage_Imageposition {
  Left = 'left',
  Right = 'right'
}

export enum Enum_Componentsectionswaves_Position {
  Bottom = 'bottom',
  Top = 'top'
}

export enum Enum_Pagecategory_Color {
  Blue = 'blue',
  Brown = 'brown',
  Green = 'green',
  Purple = 'purple',
  Red = 'red',
  Yellow = 'yellow'
}

export enum Enum_Pagecategory_Icon {
  DopravaMapy_02 = 'doprava_mapy_02',
  Kultura_06 = 'kultura_06',
  Mesto_01 = 'mesto_01',
  SocialnaPomoc_04 = 'socialna_pomoc_04',
  Vzdelavanie_05 = 'vzdelavanie_05',
  ZpVystavba_03 = 'zp_vystavba_03'
}

export enum Enum_Pagecategory_Iconhover {
  DopravaMapyColor_02 = 'doprava_mapy_color_02',
  KulturaColor_06 = 'kultura_color_06',
  MestoColor_01 = 'mesto_color_01',
  SocialnaPomocColor_04 = 'socialna_pomoc_color_04',
  VzdelavanieColor_05 = 'vzdelavanie_color_05',
  ZpVystavbaColor_03 = 'zp_vystavba_color_03'
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
  ZivotneProstredie_03 = 'zivotne_prostredie_03'
}

export enum Enum_Page_Pagecolor {
  Blue = 'blue',
  Brown = 'brown',
  Green = 'green',
  Purple = 'purple',
  Red = 'red',
  Yellow = 'yellow'
}

export enum Enum_Vzn_Category {
  Archiv = 'archiv',
  DaneAPoplatky = 'daneAPoplatky',
  Hospodarenie = 'hospodarenie',
  Ostatne = 'ostatne',
  PomenovanieUlic = 'pomenovanieUlic',
  PoriadokACistota = 'poriadokACistota',
  SocialnaPomocASkolstvo = 'socialnaPomocASkolstvo',
  UzemnePlanovanie = 'uzemnePlanovanie'
}

export type EmailDesignerEmailTemplate = {
  __typename?: 'EmailDesignerEmailTemplate';
  bodyHtml?: Maybe<Scalars['String']>;
  bodyText?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  design?: Maybe<Scalars['JSON']>;
  enabled?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  subject?: Maybe<Scalars['String']>;
  tags?: Maybe<Scalars['JSON']>;
  templateReferenceId?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type EmailDesignerEmailTemplateEntity = {
  __typename?: 'EmailDesignerEmailTemplateEntity';
  attributes?: Maybe<EmailDesignerEmailTemplate>;
  id?: Maybe<Scalars['ID']>;
};

export type EmailDesignerEmailTemplateEntityResponse = {
  __typename?: 'EmailDesignerEmailTemplateEntityResponse';
  data?: Maybe<EmailDesignerEmailTemplateEntity>;
};

export type EmailDesignerEmailTemplateEntityResponseCollection = {
  __typename?: 'EmailDesignerEmailTemplateEntityResponseCollection';
  data: Array<EmailDesignerEmailTemplateEntity>;
  meta: ResponseCollectionMeta;
};

export type EmailDesignerEmailTemplateFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<EmailDesignerEmailTemplateFiltersInput>>>;
  bodyHtml?: InputMaybe<StringFilterInput>;
  bodyText?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  design?: InputMaybe<JsonFilterInput>;
  enabled?: InputMaybe<BooleanFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<EmailDesignerEmailTemplateFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<EmailDesignerEmailTemplateFiltersInput>>>;
  subject?: InputMaybe<StringFilterInput>;
  tags?: InputMaybe<JsonFilterInput>;
  templateReferenceId?: InputMaybe<IntFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type EmailDesignerEmailTemplateInput = {
  bodyHtml?: InputMaybe<Scalars['String']>;
  bodyText?: InputMaybe<Scalars['String']>;
  design?: InputMaybe<Scalars['JSON']>;
  enabled?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  subject?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Scalars['JSON']>;
  templateReferenceId?: InputMaybe<Scalars['Int']>;
};

export type Error = {
  __typename?: 'Error';
  code: Scalars['String'];
  message?: Maybe<Scalars['String']>;
};

export type FileInfoInput = {
  alternativeText?: InputMaybe<Scalars['String']>;
  caption?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type FloatFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  contains?: InputMaybe<Scalars['Float']>;
  containsi?: InputMaybe<Scalars['Float']>;
  endsWith?: InputMaybe<Scalars['Float']>;
  eq?: InputMaybe<Scalars['Float']>;
  eqi?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  ne?: InputMaybe<Scalars['Float']>;
  not?: InputMaybe<FloatFilterInput>;
  notContains?: InputMaybe<Scalars['Float']>;
  notContainsi?: InputMaybe<Scalars['Float']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  startsWith?: InputMaybe<Scalars['Float']>;
};

export type Footer = {
  __typename?: 'Footer';
  accessibilityLink?: Maybe<ComponentBlocksPageLink>;
  address?: Maybe<Scalars['String']>;
  copyright?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  facebookUrl?: Maybe<Scalars['String']>;
  footerSections?: Maybe<Array<Maybe<ComponentBlocksFooterSection>>>;
  instagramUrl?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<FooterRelationResponseCollection>;
  phone?: Maybe<Scalars['String']>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  youtubeUrl?: Maybe<Scalars['String']>;
};


export type FooterFooterSectionsArgs = {
  filters?: InputMaybe<ComponentBlocksFooterSectionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type FooterLocalizationsArgs = {
  publicationState?: InputMaybe<PublicationState>;
};

export type FooterEntity = {
  __typename?: 'FooterEntity';
  attributes?: Maybe<Footer>;
  id?: Maybe<Scalars['ID']>;
};

export type FooterEntityResponse = {
  __typename?: 'FooterEntityResponse';
  data?: Maybe<FooterEntity>;
};

export type FooterInput = {
  accessibilityLink?: InputMaybe<ComponentBlocksPageLinkInput>;
  address?: InputMaybe<Scalars['String']>;
  copyright?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  facebookUrl?: InputMaybe<Scalars['String']>;
  footerSections?: InputMaybe<Array<InputMaybe<ComponentBlocksFooterSectionInput>>>;
  instagramUrl?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  youtubeUrl?: InputMaybe<Scalars['String']>;
};

export type FooterRelationResponseCollection = {
  __typename?: 'FooterRelationResponseCollection';
  data: Array<FooterEntity>;
};

export type Form = {
  __typename?: 'Form';
  createdAt?: Maybe<Scalars['DateTime']>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  target?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type FormEntity = {
  __typename?: 'FormEntity';
  attributes?: Maybe<Form>;
  id?: Maybe<Scalars['ID']>;
};

export type FormEntityResponse = {
  __typename?: 'FormEntityResponse';
  data?: Maybe<FormEntity>;
};

export type FormEntityResponseCollection = {
  __typename?: 'FormEntityResponseCollection';
  data: Array<FormEntity>;
  meta: ResponseCollectionMeta;
};

export type FormFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<FormFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<FormFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<FormFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  target?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type FormInput = {
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  target?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type GenericMorph = Audience | Author | BlogPost | ComponentAccordionItemsFlatText | ComponentAccordionItemsInstitution | ComponentAccordionItemsInstitutionNarrow | ComponentBlocksBlogPostLink | ComponentBlocksBookmarkLink | ComponentBlocksDocListExtensions | ComponentBlocksFile | ComponentBlocksFooterSection | ComponentBlocksGalleryItem | ComponentBlocksHomepageBookmark | ComponentBlocksHomepageHeader | ComponentBlocksHomepagePost | ComponentBlocksIconWithTitleAndDescription | ComponentBlocksInBa | ComponentBlocksInBaPictures | ComponentBlocksListItem | ComponentBlocksNumericalListItem | ComponentBlocksPageLink | ComponentBlocksSpaceInfo | ComponentBlocksSubpage | ComponentBlocksVideo | ComponentOsItemsAdvancedAccordionDepartment | ComponentOsItemsAdvancedAccordionItem | ComponentOsItemsAdvancedAccordionSubItem | ComponentOsItemsAdvancedAccordionSubSubItem | ComponentSectionsAccordion | ComponentSectionsArticlesList | ComponentSectionsCalculator | ComponentSectionsColumnedText | ComponentSectionsContact | ComponentSectionsDivider | ComponentSectionsDocumentList | ComponentSectionsFeaturedBlogPosts | ComponentSectionsFileList | ComponentSectionsGallery | ComponentSectionsIconTitleDesc | ComponentSectionsIframe | ComponentSectionsLinks | ComponentSectionsListItems | ComponentSectionsNarrowText | ComponentSectionsNewsletter | ComponentSectionsNumericalList | ComponentSectionsOrganizationalStructure | ComponentSectionsSpace | ComponentSectionsSubpageList | ComponentSectionsTextWithImage | ComponentSectionsVideos | ComponentSectionsWaves | EmailDesignerEmailTemplate | Footer | Form | Homepage | I18NLocale | Page | PageCategory | PageSubcategory | Tag | UploadFile | UploadFolder | UsersPermissionsPermission | UsersPermissionsRole | UsersPermissionsUser | Vzn;

export type Homepage = {
  __typename?: 'Homepage';
  cards?: Maybe<Array<Maybe<ComponentBlocksHomepageBookmark>>>;
  createdAt?: Maybe<Scalars['DateTime']>;
  header?: Maybe<ComponentBlocksHomepageHeader>;
  inba?: Maybe<ComponentBlocksInBa>;
  left_highlight?: Maybe<BlogPostEntityResponse>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<HomepageRelationResponseCollection>;
  metaDescription?: Maybe<Scalars['String']>;
  posts?: Maybe<Array<Maybe<ComponentBlocksHomepagePost>>>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  right_highlight?: Maybe<BlogPostEntityResponse>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type HomepageCardsArgs = {
  filters?: InputMaybe<ComponentBlocksHomepageBookmarkFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type HomepageLocalizationsArgs = {
  publicationState?: InputMaybe<PublicationState>;
};


export type HomepagePostsArgs = {
  filters?: InputMaybe<ComponentBlocksHomepagePostFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type HomepageEntity = {
  __typename?: 'HomepageEntity';
  attributes?: Maybe<Homepage>;
  id?: Maybe<Scalars['ID']>;
};

export type HomepageEntityResponse = {
  __typename?: 'HomepageEntityResponse';
  data?: Maybe<HomepageEntity>;
};

export type HomepageInput = {
  cards?: InputMaybe<Array<InputMaybe<ComponentBlocksHomepageBookmarkInput>>>;
  header?: InputMaybe<ComponentBlocksHomepageHeaderInput>;
  inba?: InputMaybe<ComponentBlocksInBaInput>;
  left_highlight?: InputMaybe<Scalars['ID']>;
  metaDescription?: InputMaybe<Scalars['String']>;
  posts?: InputMaybe<Array<InputMaybe<ComponentBlocksHomepagePostInput>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  right_highlight?: InputMaybe<Scalars['ID']>;
  title?: InputMaybe<Scalars['String']>;
};

export type HomepageRelationResponseCollection = {
  __typename?: 'HomepageRelationResponseCollection';
  data: Array<HomepageEntity>;
};

export type I18NLocale = {
  __typename?: 'I18NLocale';
  code?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type I18NLocaleEntity = {
  __typename?: 'I18NLocaleEntity';
  attributes?: Maybe<I18NLocale>;
  id?: Maybe<Scalars['ID']>;
};

export type I18NLocaleEntityResponse = {
  __typename?: 'I18NLocaleEntityResponse';
  data?: Maybe<I18NLocaleEntity>;
};

export type I18NLocaleEntityResponseCollection = {
  __typename?: 'I18NLocaleEntityResponseCollection';
  data: Array<I18NLocaleEntity>;
  meta: ResponseCollectionMeta;
};

export type I18NLocaleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  code?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<I18NLocaleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type IdFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  contains?: InputMaybe<Scalars['ID']>;
  containsi?: InputMaybe<Scalars['ID']>;
  endsWith?: InputMaybe<Scalars['ID']>;
  eq?: InputMaybe<Scalars['ID']>;
  eqi?: InputMaybe<Scalars['ID']>;
  gt?: InputMaybe<Scalars['ID']>;
  gte?: InputMaybe<Scalars['ID']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  lt?: InputMaybe<Scalars['ID']>;
  lte?: InputMaybe<Scalars['ID']>;
  ne?: InputMaybe<Scalars['ID']>;
  not?: InputMaybe<IdFilterInput>;
  notContains?: InputMaybe<Scalars['ID']>;
  notContainsi?: InputMaybe<Scalars['ID']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  startsWith?: InputMaybe<Scalars['ID']>;
};

export type IntFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  contains?: InputMaybe<Scalars['Int']>;
  containsi?: InputMaybe<Scalars['Int']>;
  endsWith?: InputMaybe<Scalars['Int']>;
  eq?: InputMaybe<Scalars['Int']>;
  eqi?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  ne?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<IntFilterInput>;
  notContains?: InputMaybe<Scalars['Int']>;
  notContainsi?: InputMaybe<Scalars['Int']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  startsWith?: InputMaybe<Scalars['Int']>;
};

export type JsonFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  contains?: InputMaybe<Scalars['JSON']>;
  containsi?: InputMaybe<Scalars['JSON']>;
  endsWith?: InputMaybe<Scalars['JSON']>;
  eq?: InputMaybe<Scalars['JSON']>;
  eqi?: InputMaybe<Scalars['JSON']>;
  gt?: InputMaybe<Scalars['JSON']>;
  gte?: InputMaybe<Scalars['JSON']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  lt?: InputMaybe<Scalars['JSON']>;
  lte?: InputMaybe<Scalars['JSON']>;
  ne?: InputMaybe<Scalars['JSON']>;
  not?: InputMaybe<JsonFilterInput>;
  notContains?: InputMaybe<Scalars['JSON']>;
  notContainsi?: InputMaybe<Scalars['JSON']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  startsWith?: InputMaybe<Scalars['JSON']>;
};

export type LongFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['Long']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['Long']>>>;
  contains?: InputMaybe<Scalars['Long']>;
  containsi?: InputMaybe<Scalars['Long']>;
  endsWith?: InputMaybe<Scalars['Long']>;
  eq?: InputMaybe<Scalars['Long']>;
  eqi?: InputMaybe<Scalars['Long']>;
  gt?: InputMaybe<Scalars['Long']>;
  gte?: InputMaybe<Scalars['Long']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Long']>>>;
  lt?: InputMaybe<Scalars['Long']>;
  lte?: InputMaybe<Scalars['Long']>;
  ne?: InputMaybe<Scalars['Long']>;
  not?: InputMaybe<LongFilterInput>;
  notContains?: InputMaybe<Scalars['Long']>;
  notContainsi?: InputMaybe<Scalars['Long']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Long']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['Long']>>>;
  startsWith?: InputMaybe<Scalars['Long']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Change user password. Confirm with the current password. */
  changePassword?: Maybe<UsersPermissionsLoginPayload>;
  createAudience?: Maybe<AudienceEntityResponse>;
  createAuthor?: Maybe<AuthorEntityResponse>;
  createBlogPost?: Maybe<BlogPostEntityResponse>;
  createBlogPostLocalization?: Maybe<BlogPostEntityResponse>;
  createEmailDesignerEmailTemplate?: Maybe<EmailDesignerEmailTemplateEntityResponse>;
  createFooterLocalization?: Maybe<FooterEntityResponse>;
  createForm?: Maybe<FormEntityResponse>;
  createHomepageLocalization?: Maybe<HomepageEntityResponse>;
  createPage?: Maybe<PageEntityResponse>;
  createPageCategory?: Maybe<PageCategoryEntityResponse>;
  createPageCategoryLocalization?: Maybe<PageCategoryEntityResponse>;
  createPageLocalization?: Maybe<PageEntityResponse>;
  createPageSubcategory?: Maybe<PageSubcategoryEntityResponse>;
  createPageSubcategoryLocalization?: Maybe<PageSubcategoryEntityResponse>;
  createTag?: Maybe<TagEntityResponse>;
  createUploadFile?: Maybe<UploadFileEntityResponse>;
  createUploadFolder?: Maybe<UploadFolderEntityResponse>;
  /** Create a new role */
  createUsersPermissionsRole?: Maybe<UsersPermissionsCreateRolePayload>;
  /** Create a new user */
  createUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  createVzn?: Maybe<VznEntityResponse>;
  deleteAudience?: Maybe<AudienceEntityResponse>;
  deleteAuthor?: Maybe<AuthorEntityResponse>;
  deleteBlogPost?: Maybe<BlogPostEntityResponse>;
  deleteEmailDesignerEmailTemplate?: Maybe<EmailDesignerEmailTemplateEntityResponse>;
  deleteFooter?: Maybe<FooterEntityResponse>;
  deleteForm?: Maybe<FormEntityResponse>;
  deleteHomepage?: Maybe<HomepageEntityResponse>;
  deletePage?: Maybe<PageEntityResponse>;
  deletePageCategory?: Maybe<PageCategoryEntityResponse>;
  deletePageSubcategory?: Maybe<PageSubcategoryEntityResponse>;
  deleteTag?: Maybe<TagEntityResponse>;
  deleteUploadFile?: Maybe<UploadFileEntityResponse>;
  deleteUploadFolder?: Maybe<UploadFolderEntityResponse>;
  /** Delete an existing role */
  deleteUsersPermissionsRole?: Maybe<UsersPermissionsDeleteRolePayload>;
  /** Delete an existing user */
  deleteUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  deleteVzn?: Maybe<VznEntityResponse>;
  /** Confirm an email users email address */
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
  /** Request a reset password token */
  forgotPassword?: Maybe<UsersPermissionsPasswordPayload>;
  login: UsersPermissionsLoginPayload;
  multipleUpload: Array<Maybe<UploadFileEntityResponse>>;
  /** Register a user */
  register: UsersPermissionsLoginPayload;
  removeFile?: Maybe<UploadFileEntityResponse>;
  /** Reset user password. Confirm with a code (resetToken from forgotPassword) */
  resetPassword?: Maybe<UsersPermissionsLoginPayload>;
  updateAudience?: Maybe<AudienceEntityResponse>;
  updateAuthor?: Maybe<AuthorEntityResponse>;
  updateBlogPost?: Maybe<BlogPostEntityResponse>;
  updateEmailDesignerEmailTemplate?: Maybe<EmailDesignerEmailTemplateEntityResponse>;
  updateFileInfo: UploadFileEntityResponse;
  updateFooter?: Maybe<FooterEntityResponse>;
  updateForm?: Maybe<FormEntityResponse>;
  updateHomepage?: Maybe<HomepageEntityResponse>;
  updatePage?: Maybe<PageEntityResponse>;
  updatePageCategory?: Maybe<PageCategoryEntityResponse>;
  updatePageSubcategory?: Maybe<PageSubcategoryEntityResponse>;
  updateTag?: Maybe<TagEntityResponse>;
  updateUploadFile?: Maybe<UploadFileEntityResponse>;
  updateUploadFolder?: Maybe<UploadFolderEntityResponse>;
  /** Update an existing role */
  updateUsersPermissionsRole?: Maybe<UsersPermissionsUpdateRolePayload>;
  /** Update an existing user */
  updateUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  updateVzn?: Maybe<VznEntityResponse>;
  upload: UploadFileEntityResponse;
};


export type MutationChangePasswordArgs = {
  currentPassword: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
};


export type MutationCreateAudienceArgs = {
  data: AudienceInput;
};


export type MutationCreateAuthorArgs = {
  data: AuthorInput;
};


export type MutationCreateBlogPostArgs = {
  data: BlogPostInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateBlogPostLocalizationArgs = {
  data?: InputMaybe<BlogPostInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateEmailDesignerEmailTemplateArgs = {
  data: EmailDesignerEmailTemplateInput;
};


export type MutationCreateFooterLocalizationArgs = {
  data?: InputMaybe<FooterInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateFormArgs = {
  data: FormInput;
};


export type MutationCreateHomepageLocalizationArgs = {
  data?: InputMaybe<HomepageInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreatePageArgs = {
  data: PageInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreatePageCategoryArgs = {
  data: PageCategoryInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreatePageCategoryLocalizationArgs = {
  data?: InputMaybe<PageCategoryInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreatePageLocalizationArgs = {
  data?: InputMaybe<PageInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreatePageSubcategoryArgs = {
  data: PageSubcategoryInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreatePageSubcategoryLocalizationArgs = {
  data?: InputMaybe<PageSubcategoryInput>;
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationCreateTagArgs = {
  data: TagInput;
};


export type MutationCreateUploadFileArgs = {
  data: UploadFileInput;
};


export type MutationCreateUploadFolderArgs = {
  data: UploadFolderInput;
};


export type MutationCreateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
};


export type MutationCreateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
};


export type MutationCreateVznArgs = {
  data: VznInput;
};


export type MutationDeleteAudienceArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteAuthorArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteBlogPostArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteEmailDesignerEmailTemplateArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteFooterArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteFormArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteHomepageArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeletePageArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeletePageCategoryArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeletePageSubcategoryArgs = {
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationDeleteTagArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUploadFileArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUploadFolderArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUsersPermissionsRoleArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUsersPermissionsUserArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteVznArgs = {
  id: Scalars['ID'];
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
};


export type MutationRegisterArgs = {
  input: UsersPermissionsRegisterInput;
};


export type MutationRemoveFileArgs = {
  id: Scalars['ID'];
};


export type MutationResetPasswordArgs = {
  code: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
};


export type MutationUpdateAudienceArgs = {
  data: AudienceInput;
  id: Scalars['ID'];
};


export type MutationUpdateAuthorArgs = {
  data: AuthorInput;
  id: Scalars['ID'];
};


export type MutationUpdateBlogPostArgs = {
  data: BlogPostInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateEmailDesignerEmailTemplateArgs = {
  data: EmailDesignerEmailTemplateInput;
  id: Scalars['ID'];
};


export type MutationUpdateFileInfoArgs = {
  id: Scalars['ID'];
  info?: InputMaybe<FileInfoInput>;
};


export type MutationUpdateFooterArgs = {
  data: FooterInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateFormArgs = {
  data: FormInput;
  id: Scalars['ID'];
};


export type MutationUpdateHomepageArgs = {
  data: HomepageInput;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdatePageArgs = {
  data: PageInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdatePageCategoryArgs = {
  data: PageCategoryInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdatePageSubcategoryArgs = {
  data: PageSubcategoryInput;
  id: Scalars['ID'];
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type MutationUpdateTagArgs = {
  data: TagInput;
  id: Scalars['ID'];
};


export type MutationUpdateUploadFileArgs = {
  data: UploadFileInput;
  id: Scalars['ID'];
};


export type MutationUpdateUploadFolderArgs = {
  data: UploadFolderInput;
  id: Scalars['ID'];
};


export type MutationUpdateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
  id: Scalars['ID'];
};


export type MutationUpdateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
  id: Scalars['ID'];
};


export type MutationUpdateVznArgs = {
  data: VznInput;
  id: Scalars['ID'];
};


export type MutationUploadArgs = {
  field?: InputMaybe<Scalars['String']>;
  file: Scalars['Upload'];
  info?: InputMaybe<FileInfoInput>;
  ref?: InputMaybe<Scalars['String']>;
  refId?: InputMaybe<Scalars['ID']>;
};

export type Page = {
  __typename?: 'Page';
  childPages?: Maybe<PageRelationResponseCollection>;
  createdAt?: Maybe<Scalars['DateTime']>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<PageRelationResponseCollection>;
  metaDiscription?: Maybe<Scalars['String']>;
  pageBackgroundImage?: Maybe<UploadFileEntityResponse>;
  pageButtonContent?: Maybe<ComponentBlocksBlogPostLink>;
  pageCategory?: Maybe<PageCategoryEntityResponse>;
  pageColor?: Maybe<Enum_Page_Pagecolor>;
  pageHeaderSections?: Maybe<Array<Maybe<PagePageHeaderSectionsDynamicZone>>>;
  parentPage?: Maybe<PageEntityResponse>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  relatedContents?: Maybe<TagRelationResponseCollection>;
  sections?: Maybe<Array<Maybe<PageSectionsDynamicZone>>>;
  slug?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type PageChildPagesArgs = {
  filters?: InputMaybe<PageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type PageLocalizationsArgs = {
  filters?: InputMaybe<PageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type PageRelatedContentsArgs = {
  filters?: InputMaybe<TagFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type PageCategory = {
  __typename?: 'PageCategory';
  color?: Maybe<Enum_Pagecategory_Color>;
  createdAt?: Maybe<Scalars['DateTime']>;
  icon?: Maybe<Enum_Pagecategory_Icon>;
  iconHover?: Maybe<Enum_Pagecategory_Iconhover>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<PageCategoryRelationResponseCollection>;
  pages?: Maybe<PageRelationResponseCollection>;
  priority?: Maybe<Scalars['Int']>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  shortTitle?: Maybe<Scalars['String']>;
  subcategories?: Maybe<PageSubcategoryRelationResponseCollection>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type PageCategoryLocalizationsArgs = {
  filters?: InputMaybe<PageCategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type PageCategoryPagesArgs = {
  filters?: InputMaybe<PageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type PageCategorySubcategoriesArgs = {
  filters?: InputMaybe<PageSubcategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type PageCategoryEntity = {
  __typename?: 'PageCategoryEntity';
  attributes?: Maybe<PageCategory>;
  id?: Maybe<Scalars['ID']>;
};

export type PageCategoryEntityResponse = {
  __typename?: 'PageCategoryEntityResponse';
  data?: Maybe<PageCategoryEntity>;
};

export type PageCategoryEntityResponseCollection = {
  __typename?: 'PageCategoryEntityResponseCollection';
  data: Array<PageCategoryEntity>;
  meta: ResponseCollectionMeta;
};

export type PageCategoryFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<PageCategoryFiltersInput>>>;
  color?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  icon?: InputMaybe<StringFilterInput>;
  iconHover?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<PageCategoryFiltersInput>;
  not?: InputMaybe<PageCategoryFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<PageCategoryFiltersInput>>>;
  pages?: InputMaybe<PageFiltersInput>;
  priority?: InputMaybe<IntFilterInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  shortTitle?: InputMaybe<StringFilterInput>;
  subcategories?: InputMaybe<PageSubcategoryFiltersInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type PageCategoryInput = {
  color?: InputMaybe<Enum_Pagecategory_Color>;
  icon?: InputMaybe<Enum_Pagecategory_Icon>;
  iconHover?: InputMaybe<Enum_Pagecategory_Iconhover>;
  pages?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  priority?: InputMaybe<Scalars['Int']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  shortTitle?: InputMaybe<Scalars['String']>;
  subcategories?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  title?: InputMaybe<Scalars['String']>;
};

export type PageCategoryRelationResponseCollection = {
  __typename?: 'PageCategoryRelationResponseCollection';
  data: Array<PageCategoryEntity>;
};

export type PageEntity = {
  __typename?: 'PageEntity';
  attributes?: Maybe<Page>;
  id?: Maybe<Scalars['ID']>;
};

export type PageEntityResponse = {
  __typename?: 'PageEntityResponse';
  data?: Maybe<PageEntity>;
};

export type PageEntityResponseCollection = {
  __typename?: 'PageEntityResponseCollection';
  data: Array<PageEntity>;
  meta: ResponseCollectionMeta;
};

export type PageFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<PageFiltersInput>>>;
  childPages?: InputMaybe<PageFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<PageFiltersInput>;
  metaDiscription?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<PageFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<PageFiltersInput>>>;
  pageButtonContent?: InputMaybe<ComponentBlocksBlogPostLinkFiltersInput>;
  pageCategory?: InputMaybe<PageCategoryFiltersInput>;
  pageColor?: InputMaybe<StringFilterInput>;
  parentPage?: InputMaybe<PageFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  relatedContents?: InputMaybe<TagFiltersInput>;
  slug?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type PageInput = {
  childPages?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  metaDiscription?: InputMaybe<Scalars['String']>;
  pageBackgroundImage?: InputMaybe<Scalars['ID']>;
  pageButtonContent?: InputMaybe<ComponentBlocksBlogPostLinkInput>;
  pageCategory?: InputMaybe<Scalars['ID']>;
  pageColor?: InputMaybe<Enum_Page_Pagecolor>;
  pageHeaderSections?: InputMaybe<Array<Scalars['PagePageHeaderSectionsDynamicZoneInput']>>;
  parentPage?: InputMaybe<Scalars['ID']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  relatedContents?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  sections?: InputMaybe<Array<Scalars['PageSectionsDynamicZoneInput']>>;
  slug?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type PagePageHeaderSectionsDynamicZone = ComponentSectionsFeaturedBlogPosts | ComponentSectionsSubpageList | Error;

export type PageRelationResponseCollection = {
  __typename?: 'PageRelationResponseCollection';
  data: Array<PageEntity>;
};

export type PageSectionsDynamicZone = ComponentSectionsAccordion | ComponentSectionsArticlesList | ComponentSectionsCalculator | ComponentSectionsColumnedText | ComponentSectionsContact | ComponentSectionsDivider | ComponentSectionsDocumentList | ComponentSectionsFileList | ComponentSectionsGallery | ComponentSectionsIconTitleDesc | ComponentSectionsIframe | ComponentSectionsLinks | ComponentSectionsListItems | ComponentSectionsNarrowText | ComponentSectionsNewsletter | ComponentSectionsNumericalList | ComponentSectionsOrganizationalStructure | ComponentSectionsSpace | ComponentSectionsTextWithImage | ComponentSectionsVideos | ComponentSectionsWaves | Error;

export type PageSubcategory = {
  __typename?: 'PageSubcategory';
  createdAt?: Maybe<Scalars['DateTime']>;
  icon?: Maybe<Enum_Pagesubcategory_Icon>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<PageSubcategoryRelationResponseCollection>;
  moreLink?: Maybe<ComponentBlocksPageLink>;
  pages?: Maybe<Array<Maybe<ComponentBlocksPageLink>>>;
  priority?: Maybe<Scalars['Int']>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type PageSubcategoryLocalizationsArgs = {
  filters?: InputMaybe<PageSubcategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type PageSubcategoryPagesArgs = {
  filters?: InputMaybe<ComponentBlocksPageLinkFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type PageSubcategoryEntity = {
  __typename?: 'PageSubcategoryEntity';
  attributes?: Maybe<PageSubcategory>;
  id?: Maybe<Scalars['ID']>;
};

export type PageSubcategoryEntityResponse = {
  __typename?: 'PageSubcategoryEntityResponse';
  data?: Maybe<PageSubcategoryEntity>;
};

export type PageSubcategoryEntityResponseCollection = {
  __typename?: 'PageSubcategoryEntityResponseCollection';
  data: Array<PageSubcategoryEntity>;
  meta: ResponseCollectionMeta;
};

export type PageSubcategoryFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<PageSubcategoryFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  icon?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  locale?: InputMaybe<StringFilterInput>;
  localizations?: InputMaybe<PageSubcategoryFiltersInput>;
  moreLink?: InputMaybe<ComponentBlocksPageLinkFiltersInput>;
  not?: InputMaybe<PageSubcategoryFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<PageSubcategoryFiltersInput>>>;
  pages?: InputMaybe<ComponentBlocksPageLinkFiltersInput>;
  priority?: InputMaybe<IntFilterInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type PageSubcategoryInput = {
  icon?: InputMaybe<Enum_Pagesubcategory_Icon>;
  moreLink?: InputMaybe<ComponentBlocksPageLinkInput>;
  pages?: InputMaybe<Array<InputMaybe<ComponentBlocksPageLinkInput>>>;
  priority?: InputMaybe<Scalars['Int']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  title?: InputMaybe<Scalars['String']>;
};

export type PageSubcategoryRelationResponseCollection = {
  __typename?: 'PageSubcategoryRelationResponseCollection';
  data: Array<PageSubcategoryEntity>;
};

export type Pagination = {
  __typename?: 'Pagination';
  page: Scalars['Int'];
  pageCount: Scalars['Int'];
  pageSize: Scalars['Int'];
  total: Scalars['Int'];
};

export type PaginationArg = {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['Int']>;
};

export enum PublicationState {
  Live = 'LIVE',
  Preview = 'PREVIEW'
}

export type Query = {
  __typename?: 'Query';
  audience?: Maybe<AudienceEntityResponse>;
  audiences?: Maybe<AudienceEntityResponseCollection>;
  author?: Maybe<AuthorEntityResponse>;
  authors?: Maybe<AuthorEntityResponseCollection>;
  blogPost?: Maybe<BlogPostEntityResponse>;
  blogPosts?: Maybe<BlogPostEntityResponseCollection>;
  emailDesignerEmailTemplate?: Maybe<EmailDesignerEmailTemplateEntityResponse>;
  emailDesignerEmailTemplates?: Maybe<EmailDesignerEmailTemplateEntityResponseCollection>;
  footer?: Maybe<FooterEntityResponse>;
  form?: Maybe<FormEntityResponse>;
  forms?: Maybe<FormEntityResponseCollection>;
  homepage?: Maybe<HomepageEntityResponse>;
  i18NLocale?: Maybe<I18NLocaleEntityResponse>;
  i18NLocales?: Maybe<I18NLocaleEntityResponseCollection>;
  me?: Maybe<UsersPermissionsMe>;
  page?: Maybe<PageEntityResponse>;
  pageCategories?: Maybe<PageCategoryEntityResponseCollection>;
  pageCategory?: Maybe<PageCategoryEntityResponse>;
  pageSubcategories?: Maybe<PageSubcategoryEntityResponseCollection>;
  pageSubcategory?: Maybe<PageSubcategoryEntityResponse>;
  pages?: Maybe<PageEntityResponseCollection>;
  tag?: Maybe<TagEntityResponse>;
  tags?: Maybe<TagEntityResponseCollection>;
  uploadFile?: Maybe<UploadFileEntityResponse>;
  uploadFiles?: Maybe<UploadFileEntityResponseCollection>;
  uploadFolder?: Maybe<UploadFolderEntityResponse>;
  uploadFolders?: Maybe<UploadFolderEntityResponseCollection>;
  usersPermissionsRole?: Maybe<UsersPermissionsRoleEntityResponse>;
  usersPermissionsRoles?: Maybe<UsersPermissionsRoleEntityResponseCollection>;
  usersPermissionsUser?: Maybe<UsersPermissionsUserEntityResponse>;
  usersPermissionsUsers?: Maybe<UsersPermissionsUserEntityResponseCollection>;
  vzn?: Maybe<VznEntityResponse>;
  vzns?: Maybe<VznEntityResponseCollection>;
};


export type QueryAudienceArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryAudiencesArgs = {
  filters?: InputMaybe<AudienceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryAuthorArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryAuthorsArgs = {
  filters?: InputMaybe<AuthorFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryBlogPostArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryBlogPostsArgs = {
  filters?: InputMaybe<BlogPostFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryEmailDesignerEmailTemplateArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryEmailDesignerEmailTemplatesArgs = {
  filters?: InputMaybe<EmailDesignerEmailTemplateFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryFooterArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  publicationState?: InputMaybe<PublicationState>;
};


export type QueryFormArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryFormsArgs = {
  filters?: InputMaybe<FormFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryHomepageArgs = {
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  publicationState?: InputMaybe<PublicationState>;
};


export type QueryI18NLocaleArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryI18NLocalesArgs = {
  filters?: InputMaybe<I18NLocaleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryPageArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryPageCategoriesArgs = {
  filters?: InputMaybe<PageCategoryFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryPageCategoryArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryPageSubcategoriesArgs = {
  filters?: InputMaybe<PageSubcategoryFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryPageSubcategoryArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
};


export type QueryPagesArgs = {
  filters?: InputMaybe<PageFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryTagArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryTagsArgs = {
  filters?: InputMaybe<TagFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryUploadFileArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryUploadFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryUploadFolderArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryUploadFoldersArgs = {
  filters?: InputMaybe<UploadFolderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryUsersPermissionsRoleArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryUsersPermissionsRolesArgs = {
  filters?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryUsersPermissionsUserArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryUsersPermissionsUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryVznArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryVznsArgs = {
  filters?: InputMaybe<VznFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type ResponseCollectionMeta = {
  __typename?: 'ResponseCollectionMeta';
  pagination: Pagination;
};

export type StringFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  contains?: InputMaybe<Scalars['String']>;
  containsi?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  eq?: InputMaybe<Scalars['String']>;
  eqi?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  ne?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<StringFilterInput>;
  notContains?: InputMaybe<Scalars['String']>;
  notContainsi?: InputMaybe<Scalars['String']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  notNull?: InputMaybe<Scalars['Boolean']>;
  null?: InputMaybe<Scalars['Boolean']>;
  or?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type Tag = {
  __typename?: 'Tag';
  blogPosts?: Maybe<BlogPostRelationResponseCollection>;
  createdAt?: Maybe<Scalars['DateTime']>;
  pageCategory?: Maybe<PageCategoryEntityResponse>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type TagBlogPostsArgs = {
  filters?: InputMaybe<BlogPostFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type TagEntity = {
  __typename?: 'TagEntity';
  attributes?: Maybe<Tag>;
  id?: Maybe<Scalars['ID']>;
};

export type TagEntityResponse = {
  __typename?: 'TagEntityResponse';
  data?: Maybe<TagEntity>;
};

export type TagEntityResponseCollection = {
  __typename?: 'TagEntityResponseCollection';
  data: Array<TagEntity>;
  meta: ResponseCollectionMeta;
};

export type TagFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<TagFiltersInput>>>;
  blogPosts?: InputMaybe<BlogPostFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<TagFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<TagFiltersInput>>>;
  pageCategory?: InputMaybe<PageCategoryFiltersInput>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type TagInput = {
  blogPosts?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  pageCategory?: InputMaybe<Scalars['ID']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  title?: InputMaybe<Scalars['String']>;
};

export type TagRelationResponseCollection = {
  __typename?: 'TagRelationResponseCollection';
  data: Array<TagEntity>;
};

export type UploadFile = {
  __typename?: 'UploadFile';
  alternativeText?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  ext?: Maybe<Scalars['String']>;
  formats?: Maybe<Scalars['JSON']>;
  hash: Scalars['String'];
  height?: Maybe<Scalars['Int']>;
  mime: Scalars['String'];
  name: Scalars['String'];
  previewUrl?: Maybe<Scalars['String']>;
  provider: Scalars['String'];
  provider_metadata?: Maybe<Scalars['JSON']>;
  related?: Maybe<Array<Maybe<GenericMorph>>>;
  size: Scalars['Float'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  url: Scalars['String'];
  width?: Maybe<Scalars['Int']>;
};

export type UploadFileEntity = {
  __typename?: 'UploadFileEntity';
  attributes?: Maybe<UploadFile>;
  id?: Maybe<Scalars['ID']>;
};

export type UploadFileEntityResponse = {
  __typename?: 'UploadFileEntityResponse';
  data?: Maybe<UploadFileEntity>;
};

export type UploadFileEntityResponseCollection = {
  __typename?: 'UploadFileEntityResponseCollection';
  data: Array<UploadFileEntity>;
  meta: ResponseCollectionMeta;
};

export type UploadFileFiltersInput = {
  alternativeText?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  caption?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  ext?: InputMaybe<StringFilterInput>;
  folder?: InputMaybe<UploadFolderFiltersInput>;
  folderPath?: InputMaybe<StringFilterInput>;
  formats?: InputMaybe<JsonFilterInput>;
  hash?: InputMaybe<StringFilterInput>;
  height?: InputMaybe<IntFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  mime?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UploadFileFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  previewUrl?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  provider_metadata?: InputMaybe<JsonFilterInput>;
  size?: InputMaybe<FloatFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  url?: InputMaybe<StringFilterInput>;
  width?: InputMaybe<IntFilterInput>;
};

export type UploadFileInput = {
  alternativeText?: InputMaybe<Scalars['String']>;
  caption?: InputMaybe<Scalars['String']>;
  ext?: InputMaybe<Scalars['String']>;
  folder?: InputMaybe<Scalars['ID']>;
  folderPath?: InputMaybe<Scalars['String']>;
  formats?: InputMaybe<Scalars['JSON']>;
  hash?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['Int']>;
  mime?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  previewUrl?: InputMaybe<Scalars['String']>;
  provider?: InputMaybe<Scalars['String']>;
  provider_metadata?: InputMaybe<Scalars['JSON']>;
  size?: InputMaybe<Scalars['Float']>;
  url?: InputMaybe<Scalars['String']>;
  width?: InputMaybe<Scalars['Int']>;
};

export type UploadFileRelationResponseCollection = {
  __typename?: 'UploadFileRelationResponseCollection';
  data: Array<UploadFileEntity>;
};

export type UploadFolder = {
  __typename?: 'UploadFolder';
  children?: Maybe<UploadFolderRelationResponseCollection>;
  createdAt?: Maybe<Scalars['DateTime']>;
  files?: Maybe<UploadFileRelationResponseCollection>;
  name: Scalars['String'];
  parent?: Maybe<UploadFolderEntityResponse>;
  path: Scalars['String'];
  pathId: Scalars['Int'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type UploadFolderChildrenArgs = {
  filters?: InputMaybe<UploadFolderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type UploadFolderFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type UploadFolderEntity = {
  __typename?: 'UploadFolderEntity';
  attributes?: Maybe<UploadFolder>;
  id?: Maybe<Scalars['ID']>;
};

export type UploadFolderEntityResponse = {
  __typename?: 'UploadFolderEntityResponse';
  data?: Maybe<UploadFolderEntity>;
};

export type UploadFolderEntityResponseCollection = {
  __typename?: 'UploadFolderEntityResponseCollection';
  data: Array<UploadFolderEntity>;
  meta: ResponseCollectionMeta;
};

export type UploadFolderFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UploadFolderFiltersInput>>>;
  children?: InputMaybe<UploadFolderFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  files?: InputMaybe<UploadFileFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UploadFolderFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UploadFolderFiltersInput>>>;
  parent?: InputMaybe<UploadFolderFiltersInput>;
  path?: InputMaybe<StringFilterInput>;
  pathId?: InputMaybe<IntFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UploadFolderInput = {
  children?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  files?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  name?: InputMaybe<Scalars['String']>;
  parent?: InputMaybe<Scalars['ID']>;
  path?: InputMaybe<Scalars['String']>;
  pathId?: InputMaybe<Scalars['Int']>;
};

export type UploadFolderRelationResponseCollection = {
  __typename?: 'UploadFolderRelationResponseCollection';
  data: Array<UploadFolderEntity>;
};

export type UsersPermissionsCreateRolePayload = {
  __typename?: 'UsersPermissionsCreateRolePayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsDeleteRolePayload = {
  __typename?: 'UsersPermissionsDeleteRolePayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsLoginInput = {
  identifier: Scalars['String'];
  password: Scalars['String'];
  provider?: Scalars['String'];
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
  email?: Maybe<Scalars['String']>;
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

export type UsersPermissionsPasswordPayload = {
  __typename?: 'UsersPermissionsPasswordPayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsPermission = {
  __typename?: 'UsersPermissionsPermission';
  action: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  role?: Maybe<UsersPermissionsRoleEntityResponse>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UsersPermissionsPermissionEntity = {
  __typename?: 'UsersPermissionsPermissionEntity';
  attributes?: Maybe<UsersPermissionsPermission>;
  id?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsPermissionFiltersInput = {
  action?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UsersPermissionsPermissionRelationResponseCollection = {
  __typename?: 'UsersPermissionsPermissionRelationResponseCollection';
  data: Array<UsersPermissionsPermissionEntity>;
};

export type UsersPermissionsRegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UsersPermissionsRole = {
  __typename?: 'UsersPermissionsRole';
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  permissions?: Maybe<UsersPermissionsPermissionRelationResponseCollection>;
  type?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  users?: Maybe<UsersPermissionsUserRelationResponseCollection>;
};


export type UsersPermissionsRolePermissionsArgs = {
  filters?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type UsersPermissionsRoleUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type UsersPermissionsRoleEntity = {
  __typename?: 'UsersPermissionsRoleEntity';
  attributes?: Maybe<UsersPermissionsRole>;
  id?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsRoleEntityResponse = {
  __typename?: 'UsersPermissionsRoleEntityResponse';
  data?: Maybe<UsersPermissionsRoleEntity>;
};

export type UsersPermissionsRoleEntityResponseCollection = {
  __typename?: 'UsersPermissionsRoleEntityResponseCollection';
  data: Array<UsersPermissionsRoleEntity>;
  meta: ResponseCollectionMeta;
};

export type UsersPermissionsRoleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  permissions?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  users?: InputMaybe<UsersPermissionsUserFiltersInput>;
};

export type UsersPermissionsRoleInput = {
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  permissions?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  type?: InputMaybe<Scalars['String']>;
  users?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type UsersPermissionsUpdateRolePayload = {
  __typename?: 'UsersPermissionsUpdateRolePayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsUser = {
  __typename?: 'UsersPermissionsUser';
  blocked?: Maybe<Scalars['Boolean']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  posts?: Maybe<BlogPostEntityResponse>;
  provider?: Maybe<Scalars['String']>;
  role?: Maybe<UsersPermissionsRoleEntityResponse>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  username: Scalars['String'];
};

export type UsersPermissionsUserEntity = {
  __typename?: 'UsersPermissionsUserEntity';
  attributes?: Maybe<UsersPermissionsUser>;
  id?: Maybe<Scalars['ID']>;
};

export type UsersPermissionsUserEntityResponse = {
  __typename?: 'UsersPermissionsUserEntityResponse';
  data?: Maybe<UsersPermissionsUserEntity>;
};

export type UsersPermissionsUserEntityResponseCollection = {
  __typename?: 'UsersPermissionsUserEntityResponseCollection';
  data: Array<UsersPermissionsUserEntity>;
  meta: ResponseCollectionMeta;
};

export type UsersPermissionsUserFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  blocked?: InputMaybe<BooleanFilterInput>;
  confirmationToken?: InputMaybe<StringFilterInput>;
  confirmed?: InputMaybe<BooleanFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  email?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<UsersPermissionsUserFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  password?: InputMaybe<StringFilterInput>;
  posts?: InputMaybe<BlogPostFiltersInput>;
  provider?: InputMaybe<StringFilterInput>;
  resetPasswordToken?: InputMaybe<StringFilterInput>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  username?: InputMaybe<StringFilterInput>;
};

export type UsersPermissionsUserInput = {
  blocked?: InputMaybe<Scalars['Boolean']>;
  confirmationToken?: InputMaybe<Scalars['String']>;
  confirmed?: InputMaybe<Scalars['Boolean']>;
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  posts?: InputMaybe<Scalars['ID']>;
  provider?: InputMaybe<Scalars['String']>;
  resetPasswordToken?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['ID']>;
  username?: InputMaybe<Scalars['String']>;
};

export type UsersPermissionsUserRelationResponseCollection = {
  __typename?: 'UsersPermissionsUserRelationResponseCollection';
  data: Array<UsersPermissionsUserEntity>;
};

export type Vzn = {
  __typename?: 'Vzn';
  amedmentDocument?: Maybe<Array<Maybe<ComponentBlocksDocListExtensions>>>;
  cancellationDocument?: Maybe<Array<Maybe<ComponentBlocksDocListExtensions>>>;
  category?: Maybe<Enum_Vzn_Category>;
  consolidatedText?: Maybe<UploadFileEntityResponse>;
  createdAt?: Maybe<Scalars['DateTime']>;
  details?: Maybe<Scalars['String']>;
  mainDocument?: Maybe<UploadFileEntityResponse>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  validFrom?: Maybe<Scalars['Date']>;
};


export type VznAmedmentDocumentArgs = {
  filters?: InputMaybe<ComponentBlocksDocListExtensionsFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type VznCancellationDocumentArgs = {
  filters?: InputMaybe<ComponentBlocksDocListExtensionsFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type VznEntity = {
  __typename?: 'VznEntity';
  attributes?: Maybe<Vzn>;
  id?: Maybe<Scalars['ID']>;
};

export type VznEntityResponse = {
  __typename?: 'VznEntityResponse';
  data?: Maybe<VznEntity>;
};

export type VznEntityResponseCollection = {
  __typename?: 'VznEntityResponseCollection';
  data: Array<VznEntity>;
  meta: ResponseCollectionMeta;
};

export type VznFiltersInput = {
  amedmentDocument?: InputMaybe<ComponentBlocksDocListExtensionsFiltersInput>;
  and?: InputMaybe<Array<InputMaybe<VznFiltersInput>>>;
  cancellationDocument?: InputMaybe<ComponentBlocksDocListExtensionsFiltersInput>;
  category?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  details?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<VznFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<VznFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  validFrom?: InputMaybe<DateFilterInput>;
};

export type VznInput = {
  amedmentDocument?: InputMaybe<Array<InputMaybe<ComponentBlocksDocListExtensionsInput>>>;
  cancellationDocument?: InputMaybe<Array<InputMaybe<ComponentBlocksDocListExtensionsInput>>>;
  category?: InputMaybe<Enum_Vzn_Category>;
  consolidatedText?: InputMaybe<Scalars['ID']>;
  details?: InputMaybe<Scalars['String']>;
  mainDocument?: InputMaybe<Scalars['ID']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  title?: InputMaybe<Scalars['String']>;
  validFrom?: InputMaybe<Scalars['Date']>;
};

export type VznRelationResponseCollection = {
  __typename?: 'VznRelationResponseCollection';
  data: Array<VznEntity>;
};

export type BlogPostBySlugQueryVariables = Exact<{
  slug: Scalars['String'];
  locale: Scalars['I18NLocaleCode'];
}>;


export type BlogPostBySlugQuery = { __typename?: 'Query', blogPosts?: { __typename?: 'BlogPostEntityResponseCollection', data: Array<{ __typename?: 'BlogPostEntity', id?: string | null, attributes?: { __typename?: 'BlogPost', slug?: string | null, excerpt?: string | null, title?: string | null, updatedAt?: any | null, publishedAt?: any | null, date_added?: any | null, createdAt?: any | null, tag?: { __typename?: 'TagEntityResponse', data?: { __typename?: 'TagEntity', id?: string | null, attributes?: { __typename?: 'Tag', title?: string | null, pageCategory?: { __typename?: 'PageCategoryEntityResponse', data?: { __typename?: 'PageCategoryEntity', id?: string | null, attributes?: { __typename?: 'PageCategory', title?: string | null, color?: Enum_Pagecategory_Color | null } | null } | null } | null } | null } | null } | null, coverImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string } | null } | null } | null, moreLink?: { __typename?: 'ComponentBlocksBlogPostLink', title?: string | null, url?: string | null, blogPost?: { __typename?: 'BlogPostEntityResponse', data?: { __typename?: 'BlogPostEntity', id?: string | null, attributes?: { __typename?: 'BlogPost', title?: string | null, slug?: string | null } | null } | null } | null } | null, sections?: Array<{ __typename: 'ComponentSectionsAccordion', title?: string | null, hasBackground?: boolean | null, institutions?: Array<{ __typename?: 'ComponentAccordionItemsInstitution', title?: string | null, subtitle?: string | null, category?: string | null, firstColumn?: string | null, secondColumn?: string | null, thirdColumn?: string | null, url?: string | null, urlLabel?: string | null } | null> | null, flatText?: Array<{ __typename?: 'ComponentAccordionItemsFlatText', category?: string | null, content?: string | null, width?: Enum_Componentaccordionitemsflattext_Width | null, align?: Enum_Componentaccordionitemsflattext_Align | null, moreLinkTitle?: string | null, moreLinkUrl?: string | null, moreLinkPage?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug?: string | null, title?: string | null, locale?: string | null } | null } | null } | null } | null> | null, institutionsNarrow?: Array<{ __typename?: 'ComponentAccordionItemsInstitutionNarrow', title?: string | null, subtitle?: string | null, category?: string | null, url?: string | null, urlLabel?: string | null } | null> | null } | { __typename: 'ComponentSectionsArticlesList', title?: string | null, filtering?: boolean | null, category?: { __typename?: 'PageCategoryEntityResponse', data?: { __typename?: 'PageCategoryEntity', attributes?: { __typename?: 'PageCategory', title?: string | null } | null } | null } | null } | { __typename: 'ComponentSectionsCalculator', hasBackground?: boolean | null, single_adult_value?: number | null, another_adult_value?: number | null, child_value?: number | null } | { __typename: 'ComponentSectionsColumnedText', hasBackground?: boolean | null, content?: string | null } | { __typename: 'ComponentSectionsContact', title?: string | null, hasBackground?: boolean | null, description?: string | null, phone?: string | null, phoneLabel?: string | null, email?: string | null, emailLabel?: string | null, address?: string | null } | { __typename: 'ComponentSectionsDivider', hasBackground?: boolean | null, style?: Enum_Componentsectionsdivider_Style | null } | { __typename: 'ComponentSectionsFileList', hasBackground?: boolean | null, fileList?: Array<{ __typename?: 'ComponentBlocksFile', title?: string | null, category?: string | null, media?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string, createdAt?: any | null, size: number, ext?: string | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsGallery', title?: string | null, subtitle?: string | null, galleryItems?: Array<{ __typename?: 'ComponentBlocksGalleryItem', imgTitle?: string | null, imgSubtitle?: string | null, imgSubtext?: string | null, media?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string, width?: number | null, height?: number | null, caption?: string | null, alternativeText?: string | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsIconTitleDesc', title?: string | null, hasBackground?: boolean | null, list?: Array<{ __typename?: 'ComponentBlocksIconWithTitleAndDescription', title?: string | null, desc?: string | null, icon?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsIframe', url: string, iframeWidth: Enum_Componentsectionsiframe_Iframewidth, iframeHeight: string, fullHeight: boolean, allowFullscreen: boolean, css?: string | null, allowGeolocation?: boolean | null } | { __typename: 'ComponentSectionsLinks', title?: string | null, hasBackground?: boolean | null, pageLinks?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, anchor?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, locale?: string | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsListItems', title?: string | null, hasBackground?: boolean | null, listItems?: Array<{ __typename?: 'ComponentBlocksListItem', content?: string | null, moreLinkTitle?: string | null, moreLinkUrl?: string | null, circleOption?: Enum_Componentblockslistitem_Circleoption | null, moreLinkPage?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', locale?: string | null, slug?: string | null, title?: string | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsNarrowText', hasBackground?: boolean | null, content?: string | null, width?: Enum_Componentsectionsnarrowtext_Width | null, align?: Enum_Componentsectionsnarrowtext_Align | null } | { __typename: 'ComponentSectionsNumericalList', id: string, title?: string | null, variant?: Enum_Componentsectionsnumericallist_Variant | null, buttonText?: string | null, buttonLink?: string | null, hasBackground?: boolean | null, items?: Array<{ __typename?: 'ComponentBlocksNumericalListItem', text?: string | null } | null> | null } | { __typename: 'ComponentSectionsOrganizationalStructure', id: string, title?: string | null, items?: Array<{ __typename?: 'ComponentOsItemsAdvancedAccordionItem', title?: string | null, departments?: Array<{ __typename?: 'ComponentOsItemsAdvancedAccordionDepartment', title?: string | null, items?: Array<{ __typename?: 'ComponentOsItemsAdvancedAccordionSubItem', isGroupTitle?: boolean | null, title?: string | null, items?: Array<{ __typename?: 'ComponentOsItemsAdvancedAccordionSubSubItem', title?: string | null } | null> | null } | null> | null } | null> | null } | null> | null } | { __typename: 'ComponentSectionsTextWithImage', hasBackground?: boolean | null, content?: string | null, imagePosition?: Enum_Componentsectionstextwithimage_Imageposition | null, imageShadow?: boolean | null, imageSrc?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string, alternativeText?: string | null } | null } | null } | null } | { __typename: 'ComponentSectionsVideos', id: string, title?: string | null, subtitle?: string | null, videos?: Array<{ __typename?: 'ComponentBlocksVideo', id: string, title?: string | null, speaker?: string | null, url?: string | null } | null> | null } | { __typename: 'ComponentSectionsWaves', position?: Enum_Componentsectionswaves_Position | null, isRich?: boolean | null } | { __typename: 'Error' } | null> | null } | null }> } | null };

export type FooterQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode'];
}>;


export type FooterQuery = { __typename?: 'Query', footer?: { __typename?: 'FooterEntityResponse', data?: { __typename?: 'FooterEntity', attributes?: { __typename?: 'Footer', address?: string | null, copyright?: string | null, email?: string | null, facebookUrl?: string | null, instagramUrl?: string | null, phone?: string | null, youtubeUrl?: string | null, accessibilityLink?: { __typename?: 'ComponentBlocksPageLink', anchor?: string | null, title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, locale?: string | null } | null } | null } | null } | null, footerSections?: Array<{ __typename?: 'ComponentBlocksFooterSection', title?: string | null, pageLinks?: Array<{ __typename?: 'ComponentBlocksPageLink', anchor?: string | null, title?: string | null, url?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, locale?: string | null } | null } | null } | null } | null> | null } | null> | null } | null } | null } | null };

export type MainMenuQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode'];
}>;


export type MainMenuQuery = { __typename?: 'Query', pageCategories?: { __typename?: 'PageCategoryEntityResponseCollection', data: Array<{ __typename?: 'PageCategoryEntity', id?: string | null, attributes?: { __typename?: 'PageCategory', title?: string | null, color?: Enum_Pagecategory_Color | null, icon?: Enum_Pagecategory_Icon | null, iconHover?: Enum_Pagecategory_Iconhover | null, priority?: number | null, subcategories?: { __typename?: 'PageSubcategoryRelationResponseCollection', data: Array<{ __typename?: 'PageSubcategoryEntity', id?: string | null, attributes?: { __typename?: 'PageSubcategory', title?: string | null, priority?: number | null, icon?: Enum_Pagesubcategory_Icon | null, moreLink?: { __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, anchor?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, locale?: string | null } | null } | null } | null } | null, pages?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, anchor?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, locale?: string | null } | null } | null } | null } | null> | null } | null }> } | null } | null }> } | null };

export type LatestPostsByTagsQueryVariables = Exact<{
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
  limit?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['Int']>;
}>;


export type LatestPostsByTagsQuery = { __typename?: 'Query', blogPosts?: { __typename?: 'BlogPostEntityResponseCollection', data: Array<{ __typename?: 'BlogPostEntity', id?: string | null, attributes?: { __typename?: 'BlogPost', slug?: string | null, excerpt?: string | null, title?: string | null, updatedAt?: any | null, publishedAt?: any | null, date_added?: any | null, createdAt?: any | null, tag?: { __typename?: 'TagEntityResponse', data?: { __typename?: 'TagEntity', id?: string | null, attributes?: { __typename?: 'Tag', title?: string | null, pageCategory?: { __typename?: 'PageCategoryEntityResponse', data?: { __typename?: 'PageCategoryEntity', id?: string | null, attributes?: { __typename?: 'PageCategory', title?: string | null, color?: Enum_Pagecategory_Color | null } | null } | null } | null } | null } | null } | null, coverImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string } | null } | null } | null, moreLink?: { __typename?: 'ComponentBlocksBlogPostLink', title?: string | null, url?: string | null, blogPost?: { __typename?: 'BlogPostEntityResponse', data?: { __typename?: 'BlogPostEntity', id?: string | null, attributes?: { __typename?: 'BlogPost', title?: string | null, slug?: string | null } | null } | null } | null } | null, sections?: Array<{ __typename: 'ComponentSectionsAccordion', title?: string | null, hasBackground?: boolean | null, institutions?: Array<{ __typename?: 'ComponentAccordionItemsInstitution', title?: string | null, subtitle?: string | null, category?: string | null, firstColumn?: string | null, secondColumn?: string | null, thirdColumn?: string | null, url?: string | null, urlLabel?: string | null } | null> | null, flatText?: Array<{ __typename?: 'ComponentAccordionItemsFlatText', category?: string | null, content?: string | null, width?: Enum_Componentaccordionitemsflattext_Width | null, align?: Enum_Componentaccordionitemsflattext_Align | null, moreLinkTitle?: string | null, moreLinkUrl?: string | null, moreLinkPage?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug?: string | null, title?: string | null, locale?: string | null } | null } | null } | null } | null> | null, institutionsNarrow?: Array<{ __typename?: 'ComponentAccordionItemsInstitutionNarrow', title?: string | null, subtitle?: string | null, category?: string | null, url?: string | null, urlLabel?: string | null } | null> | null } | { __typename: 'ComponentSectionsArticlesList', title?: string | null, filtering?: boolean | null, category?: { __typename?: 'PageCategoryEntityResponse', data?: { __typename?: 'PageCategoryEntity', attributes?: { __typename?: 'PageCategory', title?: string | null } | null } | null } | null } | { __typename: 'ComponentSectionsCalculator', hasBackground?: boolean | null, single_adult_value?: number | null, another_adult_value?: number | null, child_value?: number | null } | { __typename: 'ComponentSectionsColumnedText', hasBackground?: boolean | null, content?: string | null } | { __typename: 'ComponentSectionsContact', title?: string | null, hasBackground?: boolean | null, description?: string | null, phone?: string | null, phoneLabel?: string | null, email?: string | null, emailLabel?: string | null, address?: string | null } | { __typename: 'ComponentSectionsDivider', hasBackground?: boolean | null, style?: Enum_Componentsectionsdivider_Style | null } | { __typename: 'ComponentSectionsFileList', hasBackground?: boolean | null, fileList?: Array<{ __typename?: 'ComponentBlocksFile', title?: string | null, category?: string | null, media?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string, createdAt?: any | null, size: number, ext?: string | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsGallery', title?: string | null, subtitle?: string | null, galleryItems?: Array<{ __typename?: 'ComponentBlocksGalleryItem', imgTitle?: string | null, imgSubtitle?: string | null, imgSubtext?: string | null, media?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string, width?: number | null, height?: number | null, caption?: string | null, alternativeText?: string | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsIconTitleDesc', title?: string | null, hasBackground?: boolean | null, list?: Array<{ __typename?: 'ComponentBlocksIconWithTitleAndDescription', title?: string | null, desc?: string | null, icon?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsIframe', url: string, iframeWidth: Enum_Componentsectionsiframe_Iframewidth, iframeHeight: string, fullHeight: boolean, allowFullscreen: boolean, css?: string | null, allowGeolocation?: boolean | null } | { __typename: 'ComponentSectionsLinks', title?: string | null, hasBackground?: boolean | null, pageLinks?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, anchor?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, locale?: string | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsListItems', title?: string | null, hasBackground?: boolean | null, listItems?: Array<{ __typename?: 'ComponentBlocksListItem', content?: string | null, moreLinkTitle?: string | null, moreLinkUrl?: string | null, circleOption?: Enum_Componentblockslistitem_Circleoption | null, moreLinkPage?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', locale?: string | null, slug?: string | null, title?: string | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsNarrowText', hasBackground?: boolean | null, content?: string | null, width?: Enum_Componentsectionsnarrowtext_Width | null, align?: Enum_Componentsectionsnarrowtext_Align | null } | { __typename: 'ComponentSectionsNumericalList', id: string, title?: string | null, variant?: Enum_Componentsectionsnumericallist_Variant | null, buttonText?: string | null, buttonLink?: string | null, hasBackground?: boolean | null, items?: Array<{ __typename?: 'ComponentBlocksNumericalListItem', text?: string | null } | null> | null } | { __typename: 'ComponentSectionsOrganizationalStructure', id: string, title?: string | null, items?: Array<{ __typename?: 'ComponentOsItemsAdvancedAccordionItem', title?: string | null, departments?: Array<{ __typename?: 'ComponentOsItemsAdvancedAccordionDepartment', title?: string | null, items?: Array<{ __typename?: 'ComponentOsItemsAdvancedAccordionSubItem', isGroupTitle?: boolean | null, title?: string | null, items?: Array<{ __typename?: 'ComponentOsItemsAdvancedAccordionSubSubItem', title?: string | null } | null> | null } | null> | null } | null> | null } | null> | null } | { __typename: 'ComponentSectionsTextWithImage', hasBackground?: boolean | null, content?: string | null, imagePosition?: Enum_Componentsectionstextwithimage_Imageposition | null, imageShadow?: boolean | null, imageSrc?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string, alternativeText?: string | null } | null } | null } | null } | { __typename: 'ComponentSectionsVideos', id: string, title?: string | null, subtitle?: string | null, videos?: Array<{ __typename?: 'ComponentBlocksVideo', id: string, title?: string | null, speaker?: string | null, url?: string | null } | null> | null } | { __typename: 'ComponentSectionsWaves', position?: Enum_Componentsectionswaves_Position | null, isRich?: boolean | null } | { __typename: 'Error' } | null> | null } | null }> } | null };

export type BlogPostsStaticPathsQueryVariables = Exact<{
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
}>;


export type BlogPostsStaticPathsQuery = { __typename?: 'Query', blogPosts?: { __typename?: 'BlogPostEntityResponseCollection', data: Array<{ __typename?: 'BlogPostEntity', id?: string | null, attributes?: { __typename?: 'BlogPost', slug?: string | null } | null }> } | null };

export type LatestBlogsWithTagsQueryVariables = Exact<{
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
  limit?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['Int']>;
  filters?: InputMaybe<BlogPostFiltersInput>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
}>;


export type LatestBlogsWithTagsQuery = { __typename?: 'Query', blogPosts?: { __typename?: 'BlogPostEntityResponseCollection', data: Array<{ __typename?: 'BlogPostEntity', id?: string | null, attributes?: { __typename?: 'BlogPost', slug?: string | null, title?: string | null, excerpt?: string | null, date_added?: any | null, publishedAt?: any | null, updatedAt?: any | null, coverImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string } | null } | null } | null, tag?: { __typename?: 'TagEntityResponse', data?: { __typename?: 'TagEntity', attributes?: { __typename?: 'Tag', title?: string | null, publishedAt?: any | null, pageCategory?: { __typename?: 'PageCategoryEntityResponse', data?: { __typename?: 'PageCategoryEntity', attributes?: { __typename?: 'PageCategory', title?: string | null, color?: Enum_Pagecategory_Color | null } | null } | null } | null } | null } | null } | null } | null }> } | null };

export type LatestBlogsFragment = { __typename?: 'BlogPostEntityResponseCollection', data: Array<{ __typename?: 'BlogPostEntity', id?: string | null, attributes?: { __typename?: 'BlogPost', slug?: string | null, title?: string | null, excerpt?: string | null, date_added?: any | null, publishedAt?: any | null, updatedAt?: any | null, coverImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string } | null } | null } | null, tag?: { __typename?: 'TagEntityResponse', data?: { __typename?: 'TagEntity', attributes?: { __typename?: 'Tag', title?: string | null, publishedAt?: any | null, pageCategory?: { __typename?: 'PageCategoryEntityResponse', data?: { __typename?: 'PageCategoryEntity', attributes?: { __typename?: 'PageCategory', title?: string | null, color?: Enum_Pagecategory_Color | null } | null } | null } | null } | null } | null } | null } | null }> };

export type TotalPostsCountQueryVariables = Exact<{
  where?: InputMaybe<BlogPostFiltersInput>;
  limit?: InputMaybe<Scalars['Int']>;
  locale?: InputMaybe<Scalars['I18NLocaleCode']>;
}>;


export type TotalPostsCountQuery = { __typename?: 'Query', blogPosts?: { __typename?: 'BlogPostEntityResponseCollection', meta: { __typename?: 'ResponseCollectionMeta', pagination: { __typename?: 'Pagination', total: number, pageCount: number } } } | null };

export type RelatedTagsQueryVariables = Exact<{
  where?: InputMaybe<TagFiltersInput>;
}>;


export type RelatedTagsQuery = { __typename?: 'Query', tags?: { __typename?: 'TagEntityResponseCollection', data: Array<{ __typename?: 'TagEntity', attributes?: { __typename?: 'Tag', title?: string | null, pageCategory?: { __typename?: 'PageCategoryEntityResponse', data?: { __typename?: 'PageCategoryEntity', attributes?: { __typename?: 'PageCategory', title?: string | null, color?: Enum_Pagecategory_Color | null } | null } | null } | null } | null }> } | null };

export type BlogPostFragment = { __typename?: 'BlogPostEntityResponseCollection', data: Array<{ __typename?: 'BlogPostEntity', id?: string | null, attributes?: { __typename?: 'BlogPost', slug?: string | null, excerpt?: string | null, title?: string | null, updatedAt?: any | null, publishedAt?: any | null, date_added?: any | null, createdAt?: any | null, tag?: { __typename?: 'TagEntityResponse', data?: { __typename?: 'TagEntity', id?: string | null, attributes?: { __typename?: 'Tag', title?: string | null, pageCategory?: { __typename?: 'PageCategoryEntityResponse', data?: { __typename?: 'PageCategoryEntity', id?: string | null, attributes?: { __typename?: 'PageCategory', title?: string | null, color?: Enum_Pagecategory_Color | null } | null } | null } | null } | null } | null } | null, coverImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string } | null } | null } | null, moreLink?: { __typename?: 'ComponentBlocksBlogPostLink', title?: string | null, url?: string | null, blogPost?: { __typename?: 'BlogPostEntityResponse', data?: { __typename?: 'BlogPostEntity', id?: string | null, attributes?: { __typename?: 'BlogPost', title?: string | null, slug?: string | null } | null } | null } | null } | null, sections?: Array<{ __typename: 'ComponentSectionsAccordion', title?: string | null, hasBackground?: boolean | null, institutions?: Array<{ __typename?: 'ComponentAccordionItemsInstitution', title?: string | null, subtitle?: string | null, category?: string | null, firstColumn?: string | null, secondColumn?: string | null, thirdColumn?: string | null, url?: string | null, urlLabel?: string | null } | null> | null, flatText?: Array<{ __typename?: 'ComponentAccordionItemsFlatText', category?: string | null, content?: string | null, width?: Enum_Componentaccordionitemsflattext_Width | null, align?: Enum_Componentaccordionitemsflattext_Align | null, moreLinkTitle?: string | null, moreLinkUrl?: string | null, moreLinkPage?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug?: string | null, title?: string | null, locale?: string | null } | null } | null } | null } | null> | null, institutionsNarrow?: Array<{ __typename?: 'ComponentAccordionItemsInstitutionNarrow', title?: string | null, subtitle?: string | null, category?: string | null, url?: string | null, urlLabel?: string | null } | null> | null } | { __typename: 'ComponentSectionsArticlesList', title?: string | null, filtering?: boolean | null, category?: { __typename?: 'PageCategoryEntityResponse', data?: { __typename?: 'PageCategoryEntity', attributes?: { __typename?: 'PageCategory', title?: string | null } | null } | null } | null } | { __typename: 'ComponentSectionsCalculator', hasBackground?: boolean | null, single_adult_value?: number | null, another_adult_value?: number | null, child_value?: number | null } | { __typename: 'ComponentSectionsColumnedText', hasBackground?: boolean | null, content?: string | null } | { __typename: 'ComponentSectionsContact', title?: string | null, hasBackground?: boolean | null, description?: string | null, phone?: string | null, phoneLabel?: string | null, email?: string | null, emailLabel?: string | null, address?: string | null } | { __typename: 'ComponentSectionsDivider', hasBackground?: boolean | null, style?: Enum_Componentsectionsdivider_Style | null } | { __typename: 'ComponentSectionsFileList', hasBackground?: boolean | null, fileList?: Array<{ __typename?: 'ComponentBlocksFile', title?: string | null, category?: string | null, media?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string, createdAt?: any | null, size: number, ext?: string | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsGallery', title?: string | null, subtitle?: string | null, galleryItems?: Array<{ __typename?: 'ComponentBlocksGalleryItem', imgTitle?: string | null, imgSubtitle?: string | null, imgSubtext?: string | null, media?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string, width?: number | null, height?: number | null, caption?: string | null, alternativeText?: string | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsIconTitleDesc', title?: string | null, hasBackground?: boolean | null, list?: Array<{ __typename?: 'ComponentBlocksIconWithTitleAndDescription', title?: string | null, desc?: string | null, icon?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsIframe', url: string, iframeWidth: Enum_Componentsectionsiframe_Iframewidth, iframeHeight: string, fullHeight: boolean, allowFullscreen: boolean, css?: string | null, allowGeolocation?: boolean | null } | { __typename: 'ComponentSectionsLinks', title?: string | null, hasBackground?: boolean | null, pageLinks?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, anchor?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, locale?: string | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsListItems', title?: string | null, hasBackground?: boolean | null, listItems?: Array<{ __typename?: 'ComponentBlocksListItem', content?: string | null, moreLinkTitle?: string | null, moreLinkUrl?: string | null, circleOption?: Enum_Componentblockslistitem_Circleoption | null, moreLinkPage?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', locale?: string | null, slug?: string | null, title?: string | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsNarrowText', hasBackground?: boolean | null, content?: string | null, width?: Enum_Componentsectionsnarrowtext_Width | null, align?: Enum_Componentsectionsnarrowtext_Align | null } | { __typename: 'ComponentSectionsNumericalList', id: string, title?: string | null, variant?: Enum_Componentsectionsnumericallist_Variant | null, buttonText?: string | null, buttonLink?: string | null, hasBackground?: boolean | null, items?: Array<{ __typename?: 'ComponentBlocksNumericalListItem', text?: string | null } | null> | null } | { __typename: 'ComponentSectionsOrganizationalStructure', id: string, title?: string | null, items?: Array<{ __typename?: 'ComponentOsItemsAdvancedAccordionItem', title?: string | null, departments?: Array<{ __typename?: 'ComponentOsItemsAdvancedAccordionDepartment', title?: string | null, items?: Array<{ __typename?: 'ComponentOsItemsAdvancedAccordionSubItem', isGroupTitle?: boolean | null, title?: string | null, items?: Array<{ __typename?: 'ComponentOsItemsAdvancedAccordionSubSubItem', title?: string | null } | null> | null } | null> | null } | null> | null } | null> | null } | { __typename: 'ComponentSectionsTextWithImage', hasBackground?: boolean | null, content?: string | null, imagePosition?: Enum_Componentsectionstextwithimage_Imageposition | null, imageShadow?: boolean | null, imageSrc?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string, alternativeText?: string | null } | null } | null } | null } | { __typename: 'ComponentSectionsVideos', id: string, title?: string | null, subtitle?: string | null, videos?: Array<{ __typename?: 'ComponentBlocksVideo', id: string, title?: string | null, speaker?: string | null, url?: string | null } | null> | null } | { __typename: 'ComponentSectionsWaves', position?: Enum_Componentsectionswaves_Position | null, isRich?: boolean | null } | { __typename: 'Error' } | null> | null } | null }> };

export type BlogPostLinkFragment = { __typename?: 'ComponentBlocksBlogPostLink', title?: string | null, url?: string | null, blogPost?: { __typename?: 'BlogPostEntityResponse', data?: { __typename?: 'BlogPostEntity', id?: string | null, attributes?: { __typename?: 'BlogPost', title?: string | null, slug?: string | null } | null } | null } | null };

export type PageLinkFragment = { __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, anchor?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, locale?: string | null } | null } | null } | null };

export type HomepageQueryVariables = Exact<{
  locale: Scalars['I18NLocaleCode'];
}>;


export type HomepageQuery = { __typename?: 'Query', homepage?: { __typename?: 'HomepageEntityResponse', data?: { __typename?: 'HomepageEntity', id?: string | null, attributes?: { __typename?: 'Homepage', updatedAt?: any | null, createdAt?: any | null, title?: string | null, metaDescription?: string | null, posts?: Array<{ __typename?: 'ComponentBlocksHomepagePost', title?: string | null, slug?: string | null, image?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string } | null } | null } | null } | null> | null, right_highlight?: { __typename?: 'BlogPostEntityResponse', data?: { __typename?: 'BlogPostEntity', attributes?: { __typename?: 'BlogPost', title?: string | null, excerpt?: string | null, slug?: string | null, updatedAt?: any | null, date_added?: any | null, coverImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string } | null } | null } | null, tag?: { __typename?: 'TagEntityResponse', data?: { __typename?: 'TagEntity', attributes?: { __typename?: 'Tag', title?: string | null, pageCategory?: { __typename?: 'PageCategoryEntityResponse', data?: { __typename?: 'PageCategoryEntity', attributes?: { __typename?: 'PageCategory', color?: Enum_Pagecategory_Color | null } | null } | null } | null } | null } | null } | null } | null } | null } | null, left_highlight?: { __typename?: 'BlogPostEntityResponse', data?: { __typename?: 'BlogPostEntity', attributes?: { __typename?: 'BlogPost', title?: string | null, excerpt?: string | null, slug?: string | null, updatedAt?: any | null, date_added?: any | null, coverImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string } | null } | null } | null, tag?: { __typename?: 'TagEntityResponse', data?: { __typename?: 'TagEntity', attributes?: { __typename?: 'Tag', title?: string | null, pageCategory?: { __typename?: 'PageCategoryEntityResponse', data?: { __typename?: 'PageCategoryEntity', attributes?: { __typename?: 'PageCategory', color?: Enum_Pagecategory_Color | null } | null } | null } | null } | null } | null } | null } | null } | null } | null, header?: { __typename?: 'ComponentBlocksHomepageHeader', headline: string, picture?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string } | null } | null } | null, mobilePicture?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string } | null } | null } | null } | null, cards?: Array<{ __typename?: 'ComponentBlocksHomepageBookmark', title?: string | null, headline?: string | null, text?: string | null, variant?: string | null, link?: { __typename?: 'ComponentBlocksBookmarkLink', title?: string | null, href?: string | null } | null, picture?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string } | null } | null } | null } | null> | null, inba?: { __typename?: 'ComponentBlocksInBa', title?: string | null, content?: string | null, link?: string | null, images?: { __typename?: 'ComponentBlocksInBaPictures', frontImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string } | null } | null } | null, rearImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string } | null } | null } | null } | null } | null } | null } | null } | null };

export type HomepageHeaderFragment = { __typename?: 'ComponentBlocksHomepageHeader', headline: string, picture?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string } | null } | null } | null, mobilePicture?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string } | null } | null } | null };

export type NewsCardBlogFragment = { __typename?: 'BlogPostEntityResponse', data?: { __typename?: 'BlogPostEntity', attributes?: { __typename?: 'BlogPost', title?: string | null, excerpt?: string | null, slug?: string | null, updatedAt?: any | null, date_added?: any | null, coverImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string } | null } | null } | null, tag?: { __typename?: 'TagEntityResponse', data?: { __typename?: 'TagEntity', attributes?: { __typename?: 'Tag', title?: string | null, pageCategory?: { __typename?: 'PageCategoryEntityResponse', data?: { __typename?: 'PageCategoryEntity', attributes?: { __typename?: 'PageCategory', color?: Enum_Pagecategory_Color | null } | null } | null } | null } | null } | null } | null } | null } | null };

export type PagesQueryVariables = Exact<{ [key: string]: never; }>;


export type PagesQuery = { __typename?: 'Query', pages?: { __typename?: 'PageEntityResponseCollection', data: Array<{ __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', slug?: string | null, sections?: Array<{ __typename: 'ComponentSectionsAccordion', title?: string | null, hasBackground?: boolean | null, institutions?: Array<{ __typename?: 'ComponentAccordionItemsInstitution', title?: string | null, subtitle?: string | null, category?: string | null, firstColumn?: string | null, secondColumn?: string | null, thirdColumn?: string | null, url?: string | null, urlLabel?: string | null } | null> | null, flatText?: Array<{ __typename?: 'ComponentAccordionItemsFlatText', category?: string | null, content?: string | null, width?: Enum_Componentaccordionitemsflattext_Width | null, align?: Enum_Componentaccordionitemsflattext_Align | null, moreLinkTitle?: string | null, moreLinkUrl?: string | null, moreLinkPage?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug?: string | null, title?: string | null, locale?: string | null } | null } | null } | null } | null> | null, institutionsNarrow?: Array<{ __typename?: 'ComponentAccordionItemsInstitutionNarrow', title?: string | null, subtitle?: string | null, category?: string | null, url?: string | null, urlLabel?: string | null } | null> | null } | { __typename: 'ComponentSectionsArticlesList', title?: string | null, filtering?: boolean | null, category?: { __typename?: 'PageCategoryEntityResponse', data?: { __typename?: 'PageCategoryEntity', attributes?: { __typename?: 'PageCategory', title?: string | null } | null } | null } | null } | { __typename: 'ComponentSectionsCalculator', hasBackground?: boolean | null, single_adult_value?: number | null, another_adult_value?: number | null, child_value?: number | null } | { __typename: 'ComponentSectionsColumnedText', hasBackground?: boolean | null, content?: string | null } | { __typename: 'ComponentSectionsContact', title?: string | null, hasBackground?: boolean | null, description?: string | null, phone?: string | null, phoneLabel?: string | null, email?: string | null, emailLabel?: string | null, address?: string | null } | { __typename: 'ComponentSectionsDivider', hasBackground?: boolean | null, style?: Enum_Componentsectionsdivider_Style | null } | { __typename: 'ComponentSectionsDocumentList', vzns?: { __typename?: 'VznRelationResponseCollection', data: Array<{ __typename?: 'VznEntity', id?: string | null, attributes?: { __typename?: 'Vzn', category?: Enum_Vzn_Category | null, details?: string | null, title?: string | null, validFrom?: any | null, amedmentDocument?: Array<{ __typename?: 'ComponentBlocksDocListExtensions', id: string, title?: string | null, validFrom?: any | null, document?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string, size: number, ext?: string | null, createdAt?: any | null } | null } | null } | null } | null> | null, cancellationDocument?: Array<{ __typename?: 'ComponentBlocksDocListExtensions', id: string, title?: string | null, validFrom?: any | null, document?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string, size: number, ext?: string | null, createdAt?: any | null } | null } | null } | null } | null> | null, mainDocument?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string, size: number, ext?: string | null, createdAt?: any | null } | null } | null } | null, consolidatedText?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, size: number, ext?: string | null, createdAt?: any | null } | null } | null } | null } | null }> } | null } | { __typename: 'ComponentSectionsFileList', hasBackground?: boolean | null, fileList?: Array<{ __typename?: 'ComponentBlocksFile', title?: string | null, category?: string | null, media?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string, createdAt?: any | null, size: number, ext?: string | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsGallery', title?: string | null, subtitle?: string | null, galleryItems?: Array<{ __typename?: 'ComponentBlocksGalleryItem', imgTitle?: string | null, imgSubtitle?: string | null, imgSubtext?: string | null, media?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string, width?: number | null, height?: number | null, caption?: string | null, alternativeText?: string | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsIconTitleDesc', title?: string | null, hasBackground?: boolean | null, list?: Array<{ __typename?: 'ComponentBlocksIconWithTitleAndDescription', title?: string | null, desc?: string | null, icon?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsIframe', url: string, iframeWidth: Enum_Componentsectionsiframe_Iframewidth, iframeHeight: string, fullHeight: boolean, allowFullscreen: boolean, css?: string | null, allowGeolocation?: boolean | null } | { __typename: 'ComponentSectionsLinks', title?: string | null, hasBackground?: boolean | null, pageLinks?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, anchor?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, locale?: string | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsListItems', title?: string | null, hasBackground?: boolean | null, listItems?: Array<{ __typename?: 'ComponentBlocksListItem', content?: string | null, moreLinkTitle?: string | null, moreLinkUrl?: string | null, circleOption?: Enum_Componentblockslistitem_Circleoption | null, moreLinkPage?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', locale?: string | null, slug?: string | null, title?: string | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsNarrowText', hasBackground?: boolean | null, content?: string | null, width?: Enum_Componentsectionsnarrowtext_Width | null, align?: Enum_Componentsectionsnarrowtext_Align | null } | { __typename: 'ComponentSectionsNewsletter' } | { __typename: 'ComponentSectionsNumericalList', id: string, title?: string | null, variant?: Enum_Componentsectionsnumericallist_Variant | null, buttonText?: string | null, buttonLink?: string | null, hasBackground?: boolean | null, items?: Array<{ __typename?: 'ComponentBlocksNumericalListItem', text?: string | null } | null> | null } | { __typename: 'ComponentSectionsOrganizationalStructure', id: string, title?: string | null, items?: Array<{ __typename?: 'ComponentOsItemsAdvancedAccordionItem', title?: string | null, departments?: Array<{ __typename?: 'ComponentOsItemsAdvancedAccordionDepartment', title?: string | null, items?: Array<{ __typename?: 'ComponentOsItemsAdvancedAccordionSubItem', isGroupTitle?: boolean | null, title?: string | null, items?: Array<{ __typename?: 'ComponentOsItemsAdvancedAccordionSubSubItem', title?: string | null } | null> | null } | null> | null } | null> | null } | null> | null } | { __typename: 'ComponentSectionsSpace' } | { __typename: 'ComponentSectionsTextWithImage', hasBackground?: boolean | null, content?: string | null, imagePosition?: Enum_Componentsectionstextwithimage_Imageposition | null, imageShadow?: boolean | null, imageSrc?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string, alternativeText?: string | null } | null } | null } | null } | { __typename: 'ComponentSectionsVideos', id: string, title?: string | null, subtitle?: string | null, videos?: Array<{ __typename?: 'ComponentBlocksVideo', id: string, title?: string | null, speaker?: string | null, url?: string | null } | null> | null } | { __typename: 'ComponentSectionsWaves', position?: Enum_Componentsectionswaves_Position | null, isRich?: boolean | null } | { __typename: 'Error' } | null> | null } | null }> } | null };

export type PagesStaticPathsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type PagesStaticPathsQuery = { __typename?: 'Query', pages?: { __typename?: 'PageEntityResponseCollection', data: Array<{ __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', slug?: string | null } | null }> } | null };

export type PageBySlugQueryVariables = Exact<{
  slug: Scalars['String'];
  locale: Scalars['I18NLocaleCode'];
}>;


export type PageBySlugQuery = { __typename?: 'Query', pages?: { __typename?: 'PageEntityResponseCollection', data: Array<{ __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', slug?: string | null, title?: string | null, pageColor?: Enum_Page_Pagecolor | null, metaDiscription?: string | null, locale?: string | null, pageBackgroundImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string } | null } | null } | null, pageButtonContent?: { __typename?: 'ComponentBlocksBlogPostLink', title?: string | null, url?: string | null } | null, sections?: Array<{ __typename: 'ComponentSectionsAccordion', title?: string | null, hasBackground?: boolean | null, institutions?: Array<{ __typename?: 'ComponentAccordionItemsInstitution', title?: string | null, subtitle?: string | null, category?: string | null, firstColumn?: string | null, secondColumn?: string | null, thirdColumn?: string | null, url?: string | null, urlLabel?: string | null } | null> | null, flatText?: Array<{ __typename?: 'ComponentAccordionItemsFlatText', category?: string | null, content?: string | null, width?: Enum_Componentaccordionitemsflattext_Width | null, align?: Enum_Componentaccordionitemsflattext_Align | null, moreLinkTitle?: string | null, moreLinkUrl?: string | null, moreLinkPage?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug?: string | null, title?: string | null, locale?: string | null } | null } | null } | null } | null> | null, institutionsNarrow?: Array<{ __typename?: 'ComponentAccordionItemsInstitutionNarrow', title?: string | null, subtitle?: string | null, category?: string | null, url?: string | null, urlLabel?: string | null } | null> | null } | { __typename: 'ComponentSectionsArticlesList', title?: string | null, filtering?: boolean | null, category?: { __typename?: 'PageCategoryEntityResponse', data?: { __typename?: 'PageCategoryEntity', attributes?: { __typename?: 'PageCategory', title?: string | null } | null } | null } | null } | { __typename: 'ComponentSectionsCalculator', hasBackground?: boolean | null, single_adult_value?: number | null, another_adult_value?: number | null, child_value?: number | null } | { __typename: 'ComponentSectionsColumnedText', hasBackground?: boolean | null, content?: string | null } | { __typename: 'ComponentSectionsContact', title?: string | null, hasBackground?: boolean | null, description?: string | null, phone?: string | null, phoneLabel?: string | null, email?: string | null, emailLabel?: string | null, address?: string | null } | { __typename: 'ComponentSectionsDivider', hasBackground?: boolean | null, style?: Enum_Componentsectionsdivider_Style | null } | { __typename: 'ComponentSectionsDocumentList', vzns?: { __typename?: 'VznRelationResponseCollection', data: Array<{ __typename?: 'VznEntity', id?: string | null, attributes?: { __typename?: 'Vzn', category?: Enum_Vzn_Category | null, details?: string | null, title?: string | null, validFrom?: any | null, amedmentDocument?: Array<{ __typename?: 'ComponentBlocksDocListExtensions', id: string, title?: string | null, validFrom?: any | null, document?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string, size: number, ext?: string | null, createdAt?: any | null } | null } | null } | null } | null> | null, cancellationDocument?: Array<{ __typename?: 'ComponentBlocksDocListExtensions', id: string, title?: string | null, validFrom?: any | null, document?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string, size: number, ext?: string | null, createdAt?: any | null } | null } | null } | null } | null> | null, mainDocument?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string, size: number, ext?: string | null, createdAt?: any | null } | null } | null } | null, consolidatedText?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, size: number, ext?: string | null, createdAt?: any | null } | null } | null } | null } | null }> } | null } | { __typename: 'ComponentSectionsFileList', hasBackground?: boolean | null, fileList?: Array<{ __typename?: 'ComponentBlocksFile', title?: string | null, category?: string | null, media?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string, createdAt?: any | null, size: number, ext?: string | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsGallery', title?: string | null, subtitle?: string | null, galleryItems?: Array<{ __typename?: 'ComponentBlocksGalleryItem', imgTitle?: string | null, imgSubtitle?: string | null, imgSubtext?: string | null, media?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string, width?: number | null, height?: number | null, caption?: string | null, alternativeText?: string | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsIconTitleDesc', title?: string | null, hasBackground?: boolean | null, list?: Array<{ __typename?: 'ComponentBlocksIconWithTitleAndDescription', title?: string | null, desc?: string | null, icon?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsIframe', url: string, iframeWidth: Enum_Componentsectionsiframe_Iframewidth, iframeHeight: string, fullHeight: boolean, allowFullscreen: boolean, css?: string | null, allowGeolocation?: boolean | null } | { __typename: 'ComponentSectionsLinks', title?: string | null, hasBackground?: boolean | null, pageLinks?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, anchor?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, locale?: string | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsListItems', title?: string | null, hasBackground?: boolean | null, listItems?: Array<{ __typename?: 'ComponentBlocksListItem', content?: string | null, moreLinkTitle?: string | null, moreLinkUrl?: string | null, circleOption?: Enum_Componentblockslistitem_Circleoption | null, moreLinkPage?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', locale?: string | null, slug?: string | null, title?: string | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsNarrowText', hasBackground?: boolean | null, content?: string | null, width?: Enum_Componentsectionsnarrowtext_Width | null, align?: Enum_Componentsectionsnarrowtext_Align | null } | { __typename: 'ComponentSectionsNewsletter' } | { __typename: 'ComponentSectionsNumericalList', id: string, title?: string | null, variant?: Enum_Componentsectionsnumericallist_Variant | null, buttonText?: string | null, buttonLink?: string | null, hasBackground?: boolean | null, items?: Array<{ __typename?: 'ComponentBlocksNumericalListItem', text?: string | null } | null> | null } | { __typename: 'ComponentSectionsOrganizationalStructure', id: string, title?: string | null, items?: Array<{ __typename?: 'ComponentOsItemsAdvancedAccordionItem', title?: string | null, departments?: Array<{ __typename?: 'ComponentOsItemsAdvancedAccordionDepartment', title?: string | null, items?: Array<{ __typename?: 'ComponentOsItemsAdvancedAccordionSubItem', isGroupTitle?: boolean | null, title?: string | null, items?: Array<{ __typename?: 'ComponentOsItemsAdvancedAccordionSubSubItem', title?: string | null } | null> | null } | null> | null } | null> | null } | null> | null } | { __typename: 'ComponentSectionsSpace' } | { __typename: 'ComponentSectionsTextWithImage', hasBackground?: boolean | null, content?: string | null, imagePosition?: Enum_Componentsectionstextwithimage_Imageposition | null, imageShadow?: boolean | null, imageSrc?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string, alternativeText?: string | null } | null } | null } | null } | { __typename: 'ComponentSectionsVideos', id: string, title?: string | null, subtitle?: string | null, videos?: Array<{ __typename?: 'ComponentBlocksVideo', id: string, title?: string | null, speaker?: string | null, url?: string | null } | null> | null } | { __typename: 'ComponentSectionsWaves', position?: Enum_Componentsectionswaves_Position | null, isRich?: boolean | null } | { __typename: 'Error' } | null> | null, localizations?: { __typename?: 'PageRelationResponseCollection', data: Array<{ __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug?: string | null, locale?: string | null } | null }> } | null, pageHeaderSections?: Array<{ __typename: 'ComponentSectionsFeaturedBlogPosts', id: string, first_blog?: { __typename?: 'BlogPostEntityResponse', data?: { __typename?: 'BlogPostEntity', attributes?: { __typename?: 'BlogPost', title?: string | null, publishedAt?: any | null, slug?: string | null, coverImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string } | null } | null } | null, tag?: { __typename?: 'TagEntityResponse', data?: { __typename?: 'TagEntity', attributes?: { __typename?: 'Tag', pageCategory?: { __typename?: 'PageCategoryEntityResponse', data?: { __typename?: 'PageCategoryEntity', attributes?: { __typename?: 'PageCategory', color?: Enum_Pagecategory_Color | null, shortTitle?: string | null } | null } | null } | null } | null } | null } | null } | null } | null } | null, second_blog?: { __typename?: 'BlogPostEntityResponse', data?: { __typename?: 'BlogPostEntity', attributes?: { __typename?: 'BlogPost', title?: string | null, publishedAt?: any | null, slug?: string | null, coverImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string } | null } | null } | null, tag?: { __typename?: 'TagEntityResponse', data?: { __typename?: 'TagEntity', attributes?: { __typename?: 'Tag', pageCategory?: { __typename?: 'PageCategoryEntityResponse', data?: { __typename?: 'PageCategoryEntity', attributes?: { __typename?: 'PageCategory', color?: Enum_Pagecategory_Color | null, shortTitle?: string | null } | null } | null } | null } | null } | null } | null } | null } | null } | null, third_blog?: { __typename?: 'BlogPostEntityResponse', data?: { __typename?: 'BlogPostEntity', attributes?: { __typename?: 'BlogPost', title?: string | null, publishedAt?: any | null, slug?: string | null, coverImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string } | null } | null } | null, tag?: { __typename?: 'TagEntityResponse', data?: { __typename?: 'TagEntity', attributes?: { __typename?: 'Tag', pageCategory?: { __typename?: 'PageCategoryEntityResponse', data?: { __typename?: 'PageCategoryEntity', attributes?: { __typename?: 'PageCategory', color?: Enum_Pagecategory_Color | null, shortTitle?: string | null } | null } | null } | null } | null } | null } | null } | null } | null } | null } | { __typename: 'ComponentSectionsSubpageList', id: string, subpageList?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, anchor?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, locale?: string | null } | null } | null } | null } | null> | null } | { __typename: 'Error' } | null> | null, parentPage?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug?: string | null, locale?: string | null, title?: string | null, parentPage?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug?: string | null, locale?: string | null, title?: string | null, parentPage?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug?: string | null, locale?: string | null, title?: string | null } | null } | null } | null } | null } | null } | null } | null } | null } | null, pageCategory?: { __typename?: 'PageCategoryEntityResponse', data?: { __typename?: 'PageCategoryEntity', id?: string | null, attributes?: { __typename?: 'PageCategory', title?: string | null, color?: Enum_Pagecategory_Color | null } | null } | null } | null } | null }> } | null, footer?: { __typename?: 'FooterEntityResponse', data?: { __typename?: 'FooterEntity', attributes?: { __typename?: 'Footer', address?: string | null, copyright?: string | null, email?: string | null, facebookUrl?: string | null, instagramUrl?: string | null, phone?: string | null, youtubeUrl?: string | null, accessibilityLink?: { __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, anchor?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, locale?: string | null } | null } | null } | null } | null, footerSections?: Array<{ __typename?: 'ComponentBlocksFooterSection', title?: string | null, pageLinks?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, anchor?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, locale?: string | null } | null } | null } | null } | null> | null } | null> | null } | null } | null } | null, mainMenu?: { __typename?: 'PageCategoryEntityResponseCollection', data: Array<{ __typename?: 'PageCategoryEntity', id?: string | null, attributes?: { __typename?: 'PageCategory', title?: string | null, color?: Enum_Pagecategory_Color | null, icon?: Enum_Pagecategory_Icon | null, iconHover?: Enum_Pagecategory_Iconhover | null, priority?: number | null, subcategories?: { __typename?: 'PageSubcategoryRelationResponseCollection', data: Array<{ __typename?: 'PageSubcategoryEntity', id?: string | null, attributes?: { __typename?: 'PageSubcategory', title?: string | null, priority?: number | null, icon?: Enum_Pagesubcategory_Icon | null, moreLink?: { __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, anchor?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, locale?: string | null } | null } | null } | null } | null, pages?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, anchor?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, locale?: string | null } | null } | null } | null } | null> | null } | null }> } | null } | null }> } | null };

export type VznDetailQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type VznDetailQuery = { __typename?: 'Query', vzn?: { __typename?: 'VznEntityResponse', data?: { __typename?: 'VznEntity', id?: string | null, attributes?: { __typename?: 'Vzn', title?: string | null, validFrom?: any | null, mainDocument?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string, size: number, ext?: string | null, createdAt?: any | null } | null } | null } | null, cancellationDocument?: Array<{ __typename?: 'ComponentBlocksDocListExtensions', id: string, title?: string | null, document?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string, size: number, ext?: string | null, createdAt?: any | null } | null } | null } | null } | null> | null, amedmentDocument?: Array<{ __typename?: 'ComponentBlocksDocListExtensions', id: string, title?: string | null, document?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string, size: number, ext?: string | null, createdAt?: any | null } | null } | null } | null } | null> | null } | null } | null } | null };

export type GeneralPageFragment = { __typename?: 'PageEntityResponseCollection', data: Array<{ __typename?: 'PageEntity', id?: string | null, attributes?: { __typename?: 'Page', slug?: string | null, title?: string | null, pageColor?: Enum_Page_Pagecolor | null, metaDiscription?: string | null, locale?: string | null, pageBackgroundImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string } | null } | null } | null, pageButtonContent?: { __typename?: 'ComponentBlocksBlogPostLink', title?: string | null, url?: string | null } | null, sections?: Array<{ __typename: 'ComponentSectionsAccordion', title?: string | null, hasBackground?: boolean | null, institutions?: Array<{ __typename?: 'ComponentAccordionItemsInstitution', title?: string | null, subtitle?: string | null, category?: string | null, firstColumn?: string | null, secondColumn?: string | null, thirdColumn?: string | null, url?: string | null, urlLabel?: string | null } | null> | null, flatText?: Array<{ __typename?: 'ComponentAccordionItemsFlatText', category?: string | null, content?: string | null, width?: Enum_Componentaccordionitemsflattext_Width | null, align?: Enum_Componentaccordionitemsflattext_Align | null, moreLinkTitle?: string | null, moreLinkUrl?: string | null, moreLinkPage?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug?: string | null, title?: string | null, locale?: string | null } | null } | null } | null } | null> | null, institutionsNarrow?: Array<{ __typename?: 'ComponentAccordionItemsInstitutionNarrow', title?: string | null, subtitle?: string | null, category?: string | null, url?: string | null, urlLabel?: string | null } | null> | null } | { __typename: 'ComponentSectionsArticlesList', title?: string | null, filtering?: boolean | null, category?: { __typename?: 'PageCategoryEntityResponse', data?: { __typename?: 'PageCategoryEntity', attributes?: { __typename?: 'PageCategory', title?: string | null } | null } | null } | null } | { __typename: 'ComponentSectionsCalculator', hasBackground?: boolean | null, single_adult_value?: number | null, another_adult_value?: number | null, child_value?: number | null } | { __typename: 'ComponentSectionsColumnedText', hasBackground?: boolean | null, content?: string | null } | { __typename: 'ComponentSectionsContact', title?: string | null, hasBackground?: boolean | null, description?: string | null, phone?: string | null, phoneLabel?: string | null, email?: string | null, emailLabel?: string | null, address?: string | null } | { __typename: 'ComponentSectionsDivider', hasBackground?: boolean | null, style?: Enum_Componentsectionsdivider_Style | null } | { __typename: 'ComponentSectionsDocumentList', vzns?: { __typename?: 'VznRelationResponseCollection', data: Array<{ __typename?: 'VznEntity', id?: string | null, attributes?: { __typename?: 'Vzn', category?: Enum_Vzn_Category | null, details?: string | null, title?: string | null, validFrom?: any | null, amedmentDocument?: Array<{ __typename?: 'ComponentBlocksDocListExtensions', id: string, title?: string | null, validFrom?: any | null, document?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string, size: number, ext?: string | null, createdAt?: any | null } | null } | null } | null } | null> | null, cancellationDocument?: Array<{ __typename?: 'ComponentBlocksDocListExtensions', id: string, title?: string | null, validFrom?: any | null, document?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string, size: number, ext?: string | null, createdAt?: any | null } | null } | null } | null } | null> | null, mainDocument?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string, size: number, ext?: string | null, createdAt?: any | null } | null } | null } | null, consolidatedText?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, size: number, ext?: string | null, createdAt?: any | null } | null } | null } | null } | null }> } | null } | { __typename: 'ComponentSectionsFileList', hasBackground?: boolean | null, fileList?: Array<{ __typename?: 'ComponentBlocksFile', title?: string | null, category?: string | null, media?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string, createdAt?: any | null, size: number, ext?: string | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsGallery', title?: string | null, subtitle?: string | null, galleryItems?: Array<{ __typename?: 'ComponentBlocksGalleryItem', imgTitle?: string | null, imgSubtitle?: string | null, imgSubtext?: string | null, media?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string, width?: number | null, height?: number | null, caption?: string | null, alternativeText?: string | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsIconTitleDesc', title?: string | null, hasBackground?: boolean | null, list?: Array<{ __typename?: 'ComponentBlocksIconWithTitleAndDescription', title?: string | null, desc?: string | null, icon?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsIframe', url: string, iframeWidth: Enum_Componentsectionsiframe_Iframewidth, iframeHeight: string, fullHeight: boolean, allowFullscreen: boolean, css?: string | null, allowGeolocation?: boolean | null } | { __typename: 'ComponentSectionsLinks', title?: string | null, hasBackground?: boolean | null, pageLinks?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, anchor?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, locale?: string | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsListItems', title?: string | null, hasBackground?: boolean | null, listItems?: Array<{ __typename?: 'ComponentBlocksListItem', content?: string | null, moreLinkTitle?: string | null, moreLinkUrl?: string | null, circleOption?: Enum_Componentblockslistitem_Circleoption | null, moreLinkPage?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', locale?: string | null, slug?: string | null, title?: string | null } | null } | null } | null } | null> | null } | { __typename: 'ComponentSectionsNarrowText', hasBackground?: boolean | null, content?: string | null, width?: Enum_Componentsectionsnarrowtext_Width | null, align?: Enum_Componentsectionsnarrowtext_Align | null } | { __typename: 'ComponentSectionsNewsletter' } | { __typename: 'ComponentSectionsNumericalList', id: string, title?: string | null, variant?: Enum_Componentsectionsnumericallist_Variant | null, buttonText?: string | null, buttonLink?: string | null, hasBackground?: boolean | null, items?: Array<{ __typename?: 'ComponentBlocksNumericalListItem', text?: string | null } | null> | null } | { __typename: 'ComponentSectionsOrganizationalStructure', id: string, title?: string | null, items?: Array<{ __typename?: 'ComponentOsItemsAdvancedAccordionItem', title?: string | null, departments?: Array<{ __typename?: 'ComponentOsItemsAdvancedAccordionDepartment', title?: string | null, items?: Array<{ __typename?: 'ComponentOsItemsAdvancedAccordionSubItem', isGroupTitle?: boolean | null, title?: string | null, items?: Array<{ __typename?: 'ComponentOsItemsAdvancedAccordionSubSubItem', title?: string | null } | null> | null } | null> | null } | null> | null } | null> | null } | { __typename: 'ComponentSectionsSpace' } | { __typename: 'ComponentSectionsTextWithImage', hasBackground?: boolean | null, content?: string | null, imagePosition?: Enum_Componentsectionstextwithimage_Imageposition | null, imageShadow?: boolean | null, imageSrc?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string, alternativeText?: string | null } | null } | null } | null } | { __typename: 'ComponentSectionsVideos', id: string, title?: string | null, subtitle?: string | null, videos?: Array<{ __typename?: 'ComponentBlocksVideo', id: string, title?: string | null, speaker?: string | null, url?: string | null } | null> | null } | { __typename: 'ComponentSectionsWaves', position?: Enum_Componentsectionswaves_Position | null, isRich?: boolean | null } | { __typename: 'Error' } | null> | null, localizations?: { __typename?: 'PageRelationResponseCollection', data: Array<{ __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug?: string | null, locale?: string | null } | null }> } | null, pageHeaderSections?: Array<{ __typename: 'ComponentSectionsFeaturedBlogPosts', id: string, first_blog?: { __typename?: 'BlogPostEntityResponse', data?: { __typename?: 'BlogPostEntity', attributes?: { __typename?: 'BlogPost', title?: string | null, publishedAt?: any | null, slug?: string | null, coverImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string } | null } | null } | null, tag?: { __typename?: 'TagEntityResponse', data?: { __typename?: 'TagEntity', attributes?: { __typename?: 'Tag', pageCategory?: { __typename?: 'PageCategoryEntityResponse', data?: { __typename?: 'PageCategoryEntity', attributes?: { __typename?: 'PageCategory', color?: Enum_Pagecategory_Color | null, shortTitle?: string | null } | null } | null } | null } | null } | null } | null } | null } | null } | null, second_blog?: { __typename?: 'BlogPostEntityResponse', data?: { __typename?: 'BlogPostEntity', attributes?: { __typename?: 'BlogPost', title?: string | null, publishedAt?: any | null, slug?: string | null, coverImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string } | null } | null } | null, tag?: { __typename?: 'TagEntityResponse', data?: { __typename?: 'TagEntity', attributes?: { __typename?: 'Tag', pageCategory?: { __typename?: 'PageCategoryEntityResponse', data?: { __typename?: 'PageCategoryEntity', attributes?: { __typename?: 'PageCategory', color?: Enum_Pagecategory_Color | null, shortTitle?: string | null } | null } | null } | null } | null } | null } | null } | null } | null } | null, third_blog?: { __typename?: 'BlogPostEntityResponse', data?: { __typename?: 'BlogPostEntity', attributes?: { __typename?: 'BlogPost', title?: string | null, publishedAt?: any | null, slug?: string | null, coverImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string } | null } | null } | null, tag?: { __typename?: 'TagEntityResponse', data?: { __typename?: 'TagEntity', attributes?: { __typename?: 'Tag', pageCategory?: { __typename?: 'PageCategoryEntityResponse', data?: { __typename?: 'PageCategoryEntity', attributes?: { __typename?: 'PageCategory', color?: Enum_Pagecategory_Color | null, shortTitle?: string | null } | null } | null } | null } | null } | null } | null } | null } | null } | null } | { __typename: 'ComponentSectionsSubpageList', id: string, subpageList?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, anchor?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, locale?: string | null } | null } | null } | null } | null> | null } | { __typename: 'Error' } | null> | null, parentPage?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug?: string | null, locale?: string | null, title?: string | null, parentPage?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug?: string | null, locale?: string | null, title?: string | null, parentPage?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug?: string | null, locale?: string | null, title?: string | null } | null } | null } | null } | null } | null } | null } | null } | null } | null, pageCategory?: { __typename?: 'PageCategoryEntityResponse', data?: { __typename?: 'PageCategoryEntity', id?: string | null, attributes?: { __typename?: 'PageCategory', title?: string | null, color?: Enum_Pagecategory_Color | null } | null } | null } | null } | null }> };

export type BlogSectionFragment = { __typename?: 'BlogPostEntityResponse', data?: { __typename?: 'BlogPostEntity', attributes?: { __typename?: 'BlogPost', title?: string | null, publishedAt?: any | null, slug?: string | null, coverImage?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string } | null } | null } | null, tag?: { __typename?: 'TagEntityResponse', data?: { __typename?: 'TagEntity', attributes?: { __typename?: 'Tag', pageCategory?: { __typename?: 'PageCategoryEntityResponse', data?: { __typename?: 'PageCategoryEntity', attributes?: { __typename?: 'PageCategory', color?: Enum_Pagecategory_Color | null, shortTitle?: string | null } | null } | null } | null } | null } | null } | null } | null } | null };

export type ParentPageFragment = { __typename?: 'Page', slug?: string | null, locale?: string | null, title?: string | null };

export type LocalizationFragment = { __typename?: 'PageRelationResponseCollection', data: Array<{ __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug?: string | null, locale?: string | null } | null }> };

export type FooterFragment = { __typename?: 'FooterEntityResponse', data?: { __typename?: 'FooterEntity', attributes?: { __typename?: 'Footer', address?: string | null, copyright?: string | null, email?: string | null, facebookUrl?: string | null, instagramUrl?: string | null, phone?: string | null, youtubeUrl?: string | null, accessibilityLink?: { __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, anchor?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, locale?: string | null } | null } | null } | null } | null, footerSections?: Array<{ __typename?: 'ComponentBlocksFooterSection', title?: string | null, pageLinks?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, anchor?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, locale?: string | null } | null } | null } | null } | null> | null } | null> | null } | null } | null };

export type MainMenuItemFragment = { __typename?: 'PageCategoryEntityResponseCollection', data: Array<{ __typename?: 'PageCategoryEntity', id?: string | null, attributes?: { __typename?: 'PageCategory', title?: string | null, color?: Enum_Pagecategory_Color | null, icon?: Enum_Pagecategory_Icon | null, iconHover?: Enum_Pagecategory_Iconhover | null, priority?: number | null, subcategories?: { __typename?: 'PageSubcategoryRelationResponseCollection', data: Array<{ __typename?: 'PageSubcategoryEntity', id?: string | null, attributes?: { __typename?: 'PageSubcategory', title?: string | null, priority?: number | null, icon?: Enum_Pagesubcategory_Icon | null, moreLink?: { __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, anchor?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, locale?: string | null } | null } | null } | null } | null, pages?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, anchor?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, locale?: string | null } | null } | null } | null } | null> | null } | null }> } | null } | null }> };

export type IconTitleDescFragment = { __typename?: 'ComponentBlocksIconWithTitleAndDescription', title?: string | null, desc?: string | null, icon?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string } | null } | null } | null };

export type DocumentListFragment = { __typename?: 'ComponentSectionsDocumentList', vzns?: { __typename?: 'VznRelationResponseCollection', data: Array<{ __typename?: 'VznEntity', id?: string | null, attributes?: { __typename?: 'Vzn', category?: Enum_Vzn_Category | null, details?: string | null, title?: string | null, validFrom?: any | null, amedmentDocument?: Array<{ __typename?: 'ComponentBlocksDocListExtensions', id: string, title?: string | null, validFrom?: any | null, document?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string, size: number, ext?: string | null, createdAt?: any | null } | null } | null } | null } | null> | null, cancellationDocument?: Array<{ __typename?: 'ComponentBlocksDocListExtensions', id: string, title?: string | null, validFrom?: any | null, document?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string, size: number, ext?: string | null, createdAt?: any | null } | null } | null } | null } | null> | null, mainDocument?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string, size: number, ext?: string | null, createdAt?: any | null } | null } | null } | null, consolidatedText?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, size: number, ext?: string | null, createdAt?: any | null } | null } | null } | null } | null }> } | null };

export type FileFragment = { __typename?: 'ComponentBlocksFile', title?: string | null, category?: string | null, media?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string, createdAt?: any | null, size: number, ext?: string | null } | null } | null } | null };

export type InstitutionsNarrowFragment = { __typename?: 'ComponentAccordionItemsInstitutionNarrow', title?: string | null, subtitle?: string | null, category?: string | null, url?: string | null, urlLabel?: string | null };

export type FlatTextFragment = { __typename?: 'ComponentAccordionItemsFlatText', category?: string | null, content?: string | null, width?: Enum_Componentaccordionitemsflattext_Width | null, align?: Enum_Componentaccordionitemsflattext_Align | null, moreLinkTitle?: string | null, moreLinkUrl?: string | null, moreLinkPage?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug?: string | null, title?: string | null, locale?: string | null } | null } | null } | null };

export type InstitutionFragment = { __typename?: 'ComponentAccordionItemsInstitution', title?: string | null, subtitle?: string | null, category?: string | null, firstColumn?: string | null, secondColumn?: string | null, thirdColumn?: string | null, url?: string | null, urlLabel?: string | null };

export type NumericalListItemFragment = { __typename?: 'ComponentBlocksNumericalListItem', text?: string | null };

export type GalleryItemFragment = { __typename?: 'ComponentBlocksGalleryItem', imgTitle?: string | null, imgSubtitle?: string | null, imgSubtext?: string | null, media?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string, width?: number | null, height?: number | null, caption?: string | null, alternativeText?: string | null } | null } | null } | null };

type Sections_ComponentSectionsAccordion_Fragment = { __typename: 'ComponentSectionsAccordion', title?: string | null, hasBackground?: boolean | null, institutions?: Array<{ __typename?: 'ComponentAccordionItemsInstitution', title?: string | null, subtitle?: string | null, category?: string | null, firstColumn?: string | null, secondColumn?: string | null, thirdColumn?: string | null, url?: string | null, urlLabel?: string | null } | null> | null, flatText?: Array<{ __typename?: 'ComponentAccordionItemsFlatText', category?: string | null, content?: string | null, width?: Enum_Componentaccordionitemsflattext_Width | null, align?: Enum_Componentaccordionitemsflattext_Align | null, moreLinkTitle?: string | null, moreLinkUrl?: string | null, moreLinkPage?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', slug?: string | null, title?: string | null, locale?: string | null } | null } | null } | null } | null> | null, institutionsNarrow?: Array<{ __typename?: 'ComponentAccordionItemsInstitutionNarrow', title?: string | null, subtitle?: string | null, category?: string | null, url?: string | null, urlLabel?: string | null } | null> | null };

type Sections_ComponentSectionsArticlesList_Fragment = { __typename: 'ComponentSectionsArticlesList', title?: string | null, filtering?: boolean | null, category?: { __typename?: 'PageCategoryEntityResponse', data?: { __typename?: 'PageCategoryEntity', attributes?: { __typename?: 'PageCategory', title?: string | null } | null } | null } | null };

type Sections_ComponentSectionsCalculator_Fragment = { __typename: 'ComponentSectionsCalculator', hasBackground?: boolean | null, single_adult_value?: number | null, another_adult_value?: number | null, child_value?: number | null };

type Sections_ComponentSectionsColumnedText_Fragment = { __typename: 'ComponentSectionsColumnedText', hasBackground?: boolean | null, content?: string | null };

type Sections_ComponentSectionsContact_Fragment = { __typename: 'ComponentSectionsContact', title?: string | null, hasBackground?: boolean | null, description?: string | null, phone?: string | null, phoneLabel?: string | null, email?: string | null, emailLabel?: string | null, address?: string | null };

type Sections_ComponentSectionsDivider_Fragment = { __typename: 'ComponentSectionsDivider', hasBackground?: boolean | null, style?: Enum_Componentsectionsdivider_Style | null };

type Sections_ComponentSectionsDocumentList_Fragment = { __typename: 'ComponentSectionsDocumentList', vzns?: { __typename?: 'VznRelationResponseCollection', data: Array<{ __typename?: 'VznEntity', id?: string | null, attributes?: { __typename?: 'Vzn', category?: Enum_Vzn_Category | null, details?: string | null, title?: string | null, validFrom?: any | null, amedmentDocument?: Array<{ __typename?: 'ComponentBlocksDocListExtensions', id: string, title?: string | null, validFrom?: any | null, document?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string, size: number, ext?: string | null, createdAt?: any | null } | null } | null } | null } | null> | null, cancellationDocument?: Array<{ __typename?: 'ComponentBlocksDocListExtensions', id: string, title?: string | null, validFrom?: any | null, document?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string, size: number, ext?: string | null, createdAt?: any | null } | null } | null } | null } | null> | null, mainDocument?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string, size: number, ext?: string | null, createdAt?: any | null } | null } | null } | null, consolidatedText?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string, size: number, ext?: string | null, createdAt?: any | null } | null } | null } | null } | null }> } | null };

type Sections_ComponentSectionsFileList_Fragment = { __typename: 'ComponentSectionsFileList', hasBackground?: boolean | null, fileList?: Array<{ __typename?: 'ComponentBlocksFile', title?: string | null, category?: string | null, media?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string, createdAt?: any | null, size: number, ext?: string | null } | null } | null } | null } | null> | null };

type Sections_ComponentSectionsGallery_Fragment = { __typename: 'ComponentSectionsGallery', title?: string | null, subtitle?: string | null, galleryItems?: Array<{ __typename?: 'ComponentBlocksGalleryItem', imgTitle?: string | null, imgSubtitle?: string | null, imgSubtext?: string | null, media?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string, width?: number | null, height?: number | null, caption?: string | null, alternativeText?: string | null } | null } | null } | null } | null> | null };

type Sections_ComponentSectionsIconTitleDesc_Fragment = { __typename: 'ComponentSectionsIconTitleDesc', title?: string | null, hasBackground?: boolean | null, list?: Array<{ __typename?: 'ComponentBlocksIconWithTitleAndDescription', title?: string | null, desc?: string | null, icon?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', id?: string | null, attributes?: { __typename?: 'UploadFile', url: string } | null } | null } | null } | null> | null };

type Sections_ComponentSectionsIframe_Fragment = { __typename: 'ComponentSectionsIframe', url: string, iframeWidth: Enum_Componentsectionsiframe_Iframewidth, iframeHeight: string, fullHeight: boolean, allowFullscreen: boolean, css?: string | null, allowGeolocation?: boolean | null };

type Sections_ComponentSectionsLinks_Fragment = { __typename: 'ComponentSectionsLinks', title?: string | null, hasBackground?: boolean | null, pageLinks?: Array<{ __typename?: 'ComponentBlocksPageLink', title?: string | null, url?: string | null, anchor?: string | null, page?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', title?: string | null, slug?: string | null, locale?: string | null } | null } | null } | null } | null> | null };

type Sections_ComponentSectionsListItems_Fragment = { __typename: 'ComponentSectionsListItems', title?: string | null, hasBackground?: boolean | null, listItems?: Array<{ __typename?: 'ComponentBlocksListItem', content?: string | null, moreLinkTitle?: string | null, moreLinkUrl?: string | null, circleOption?: Enum_Componentblockslistitem_Circleoption | null, moreLinkPage?: { __typename?: 'PageEntityResponse', data?: { __typename?: 'PageEntity', attributes?: { __typename?: 'Page', locale?: string | null, slug?: string | null, title?: string | null } | null } | null } | null } | null> | null };

type Sections_ComponentSectionsNarrowText_Fragment = { __typename: 'ComponentSectionsNarrowText', hasBackground?: boolean | null, content?: string | null, width?: Enum_Componentsectionsnarrowtext_Width | null, align?: Enum_Componentsectionsnarrowtext_Align | null };

type Sections_ComponentSectionsNewsletter_Fragment = { __typename: 'ComponentSectionsNewsletter' };

type Sections_ComponentSectionsNumericalList_Fragment = { __typename: 'ComponentSectionsNumericalList', id: string, title?: string | null, variant?: Enum_Componentsectionsnumericallist_Variant | null, buttonText?: string | null, buttonLink?: string | null, hasBackground?: boolean | null, items?: Array<{ __typename?: 'ComponentBlocksNumericalListItem', text?: string | null } | null> | null };

type Sections_ComponentSectionsOrganizationalStructure_Fragment = { __typename: 'ComponentSectionsOrganizationalStructure', id: string, title?: string | null, items?: Array<{ __typename?: 'ComponentOsItemsAdvancedAccordionItem', title?: string | null, departments?: Array<{ __typename?: 'ComponentOsItemsAdvancedAccordionDepartment', title?: string | null, items?: Array<{ __typename?: 'ComponentOsItemsAdvancedAccordionSubItem', isGroupTitle?: boolean | null, title?: string | null, items?: Array<{ __typename?: 'ComponentOsItemsAdvancedAccordionSubSubItem', title?: string | null } | null> | null } | null> | null } | null> | null } | null> | null };

type Sections_ComponentSectionsSpace_Fragment = { __typename: 'ComponentSectionsSpace' };

type Sections_ComponentSectionsTextWithImage_Fragment = { __typename: 'ComponentSectionsTextWithImage', hasBackground?: boolean | null, content?: string | null, imagePosition?: Enum_Componentsectionstextwithimage_Imageposition | null, imageShadow?: boolean | null, imageSrc?: { __typename?: 'UploadFileEntityResponse', data?: { __typename?: 'UploadFileEntity', attributes?: { __typename?: 'UploadFile', url: string, alternativeText?: string | null } | null } | null } | null };

type Sections_ComponentSectionsVideos_Fragment = { __typename: 'ComponentSectionsVideos', id: string, title?: string | null, subtitle?: string | null, videos?: Array<{ __typename?: 'ComponentBlocksVideo', id: string, title?: string | null, speaker?: string | null, url?: string | null } | null> | null };

type Sections_ComponentSectionsWaves_Fragment = { __typename: 'ComponentSectionsWaves', position?: Enum_Componentsectionswaves_Position | null, isRich?: boolean | null };

type Sections_Error_Fragment = { __typename: 'Error' };

export type SectionsFragment = Sections_ComponentSectionsAccordion_Fragment | Sections_ComponentSectionsArticlesList_Fragment | Sections_ComponentSectionsCalculator_Fragment | Sections_ComponentSectionsColumnedText_Fragment | Sections_ComponentSectionsContact_Fragment | Sections_ComponentSectionsDivider_Fragment | Sections_ComponentSectionsDocumentList_Fragment | Sections_ComponentSectionsFileList_Fragment | Sections_ComponentSectionsGallery_Fragment | Sections_ComponentSectionsIconTitleDesc_Fragment | Sections_ComponentSectionsIframe_Fragment | Sections_ComponentSectionsLinks_Fragment | Sections_ComponentSectionsListItems_Fragment | Sections_ComponentSectionsNarrowText_Fragment | Sections_ComponentSectionsNewsletter_Fragment | Sections_ComponentSectionsNumericalList_Fragment | Sections_ComponentSectionsOrganizationalStructure_Fragment | Sections_ComponentSectionsSpace_Fragment | Sections_ComponentSectionsTextWithImage_Fragment | Sections_ComponentSectionsVideos_Fragment | Sections_ComponentSectionsWaves_Fragment | Sections_Error_Fragment;

export const LatestBlogsFragmentDoc = gql`
    fragment LatestBlogs on BlogPostEntityResponseCollection {
  data {
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
            publishedAt
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
}
    `;
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
    `;
export const IconTitleDescFragmentDoc = gql`
    fragment IconTitleDesc on ComponentBlocksIconWithTitleAndDescription {
  title
  desc
  icon {
    data {
      id
      attributes {
        url
      }
    }
  }
}
    `;
export const DocumentListFragmentDoc = gql`
    fragment DocumentList on ComponentSectionsDocumentList {
  vzns {
    data {
      id
      attributes {
        category
        details
        amedmentDocument {
          id
          title
          validFrom
          document {
            data {
              attributes {
                url
                size
                ext
                createdAt
              }
            }
          }
        }
        cancellationDocument {
          id
          title
          validFrom
          document {
            data {
              attributes {
                url
                size
                ext
                createdAt
              }
            }
          }
        }
        title
        validFrom
        mainDocument {
          data {
            attributes {
              url
              size
              ext
              createdAt
            }
          }
        }
        consolidatedText {
          data {
            id
            attributes {
              url
              size
              ext
              createdAt
            }
          }
        }
      }
    }
  }
}
    `;
export const FileFragmentDoc = gql`
    fragment File on ComponentBlocksFile {
  title
  category
  media {
    data {
      attributes {
        url
        createdAt
        size
        ext
      }
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
    data {
      attributes {
        title
        slug
        locale
      }
    }
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
    data {
      attributes {
        slug
        title
        locale
      }
    }
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
    hasBackground
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
      data {
        attributes {
          url
          alternativeText
        }
      }
    }
  }
  ... on ComponentSectionsIframe {
    url
    iframeWidth
    iframeHeight
    fullHeight
    allowFullscreen
    css
    allowGeolocation
  }
  ... on ComponentSectionsGallery {
    title
    subtitle
    galleryItems {
      imgTitle
      imgSubtitle
      imgSubtext
      media {
        data {
          attributes {
            url
            width
            height
            caption
            alternativeText
          }
        }
      }
    }
  }
  ... on ComponentSectionsFileList {
    hasBackground
    fileList(pagination: {limit: 500}) {
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
    pageLinks(pagination: {limit: 100}) {
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
    institutions(pagination: {limit: 100}) {
      ...Institution
    }
    flatText(pagination: {limit: 100}) {
      ...FlatText
    }
    institutionsNarrow(pagination: {limit: 100}) {
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
        data {
          attributes {
            locale
            slug
            title
          }
        }
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
      data {
        attributes {
          title
        }
      }
    }
    filtering
  }
  ... on ComponentSectionsOrganizationalStructure {
    id
    items {
      title
      departments {
        title
        items(pagination: {limit: 50}) {
          isGroupTitle
          title
          items(pagination: {limit: 50}) {
            title
          }
        }
      }
    }
    title
  }
}
    ${IconTitleDescFragmentDoc}
${DocumentListFragmentDoc}
${FileFragmentDoc}
${PageLinkFragmentDoc}
${InstitutionFragmentDoc}
${FlatTextFragmentDoc}
${InstitutionsNarrowFragmentDoc}
${NumericalListItemFragmentDoc}`;
export const BlogPostFragmentDoc = gql`
    fragment BlogPost on BlogPostEntityResponseCollection {
  data {
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
}
    ${BlogPostLinkFragmentDoc}
${SectionsFragmentDoc}`;
export const HomepageHeaderFragmentDoc = gql`
    fragment HomepageHeader on ComponentBlocksHomepageHeader {
  headline
  picture {
    data {
      attributes {
        url
      }
    }
  }
  mobilePicture {
    data {
      attributes {
        url
      }
    }
  }
}
    `;
export const NewsCardBlogFragmentDoc = gql`
    fragment NewsCardBlog on BlogPostEntityResponse {
  data {
    attributes {
      title
      excerpt
      slug
      updatedAt
      date_added
      coverImage {
        data {
          attributes {
            url
          }
        }
      }
      tag {
        data {
          attributes {
            title
            pageCategory {
              data {
                attributes {
                  color
                }
              }
            }
          }
        }
      }
    }
  }
}
    `;
export const LocalizationFragmentDoc = gql`
    fragment Localization on PageRelationResponseCollection {
  data {
    attributes {
      slug
      locale
    }
  }
}
    `;
export const BlogSectionFragmentDoc = gql`
    fragment BlogSection on BlogPostEntityResponse {
  data {
    attributes {
      title
      publishedAt
      coverImage {
        data {
          attributes {
            url
          }
        }
      }
      tag {
        data {
          attributes {
            pageCategory {
              data {
                attributes {
                  color
                  shortTitle
                }
              }
            }
          }
        }
      }
      slug
    }
  }
}
    `;
export const ParentPageFragmentDoc = gql`
    fragment ParentPage on Page {
  slug
  locale
  title
}
    `;
export const GeneralPageFragmentDoc = gql`
    fragment GeneralPage on PageEntityResponseCollection {
  data {
    attributes {
      slug
      title
      pageColor
      metaDiscription
      pageBackgroundImage {
        data {
          attributes {
            url
          }
        }
      }
      pageButtonContent {
        title
        url
      }
      sections {
        ...Sections
      }
      locale
      localizations {
        ...Localization
      }
      pageHeaderSections {
        __typename
        ... on ComponentSectionsSubpageList {
          id
          subpageList(pagination: {limit: 50}) {
            ...PageLink
          }
        }
        ... on ComponentSectionsFeaturedBlogPosts {
          id
          first_blog {
            ...BlogSection
          }
          second_blog {
            ...BlogSection
          }
          third_blog {
            ...BlogSection
          }
        }
      }
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
      pageCategory {
        data {
          id
          attributes {
            title
            color
          }
        }
      }
    }
    id
  }
}
    ${SectionsFragmentDoc}
${LocalizationFragmentDoc}
${PageLinkFragmentDoc}
${BlogSectionFragmentDoc}
${ParentPageFragmentDoc}`;
export const FooterFragmentDoc = gql`
    fragment Footer on FooterEntityResponse {
  data {
    attributes {
      address
      copyright
      email
      facebookUrl
      instagramUrl
      phone
      youtubeUrl
      accessibilityLink {
        ...PageLink
      }
      footerSections {
        title
        pageLinks {
          ...PageLink
        }
      }
    }
  }
}
    ${PageLinkFragmentDoc}`;
export const MainMenuItemFragmentDoc = gql`
    fragment MainMenuItem on PageCategoryEntityResponseCollection {
  data {
    id
    attributes {
      title
      color
      icon
      iconHover
      priority
      subcategories {
        data {
          id
          attributes {
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
      }
    }
  }
}
    ${PageLinkFragmentDoc}`;
export const GalleryItemFragmentDoc = gql`
    fragment GalleryItem on ComponentBlocksGalleryItem {
  imgTitle
  imgSubtitle
  imgSubtext
  media {
    data {
      attributes {
        url
        width
        height
        caption
        alternativeText
      }
    }
  }
}
    `;
export const BlogPostBySlugDocument = gql`
    query BlogPostBySlug($slug: String!, $locale: I18NLocaleCode!) {
  blogPosts(filters: {slug: {eq: $slug}}, locale: $locale) {
    ...BlogPost
  }
}
    ${BlogPostFragmentDoc}`;
export const FooterDocument = gql`
    query Footer($locale: I18NLocaleCode!) {
  footer(locale: $locale) {
    data {
      attributes {
        address
        copyright
        email
        facebookUrl
        instagramUrl
        phone
        youtubeUrl
        accessibilityLink {
          anchor
          title
          url
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
        footerSections {
          title
          pageLinks {
            anchor
            title
            url
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
        }
      }
    }
  }
}
    `;
export const MainMenuDocument = gql`
    query MainMenu($locale: I18NLocaleCode!) {
  pageCategories(locale: $locale) {
    ...MainMenuItem
  }
}
    ${MainMenuItemFragmentDoc}`;
export const LatestPostsByTagsDocument = gql`
    query LatestPostsByTags($tags: [String], $limit: Int, $start: Int) {
  blogPosts(
    filters: {tag: {title: {in: $tags}}}
    pagination: {limit: $limit, start: $start}
    sort: "publishedAt:desc"
  ) {
    ...BlogPost
  }
}
    ${BlogPostFragmentDoc}`;
export const BlogPostsStaticPathsDocument = gql`
    query BlogPostsStaticPaths($locale: I18NLocaleCode) {
  blogPosts(locale: $locale, sort: "publishedAt:desc") {
    data {
      id
      attributes {
        slug
      }
    }
  }
}
    `;
export const LatestBlogsWithTagsDocument = gql`
    query LatestBlogsWithTags($sort: [String], $limit: Int, $start: Int, $filters: BlogPostFiltersInput, $locale: I18NLocaleCode) {
  blogPosts(
    sort: $sort
    pagination: {limit: $limit, start: $start}
    filters: $filters
    locale: $locale
  ) {
    ...LatestBlogs
  }
}
    ${LatestBlogsFragmentDoc}`;
export const TotalPostsCountDocument = gql`
    query TotalPostsCount($where: BlogPostFiltersInput, $limit: Int, $locale: I18NLocaleCode) {
  blogPosts(filters: $where, pagination: {limit: $limit}, locale: $locale) {
    meta {
      pagination {
        total
        pageCount
      }
    }
  }
}
    `;
export const RelatedTagsDocument = gql`
    query RelatedTags($where: TagFiltersInput) {
  tags(pagination: {limit: 100}, filters: $where) {
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
    `;
export const HomepageDocument = gql`
    query Homepage($locale: I18NLocaleCode!) {
  homepage(locale: $locale) {
    data {
      attributes {
        updatedAt
        createdAt
        title
        metaDescription
        posts {
          title
          slug
          image {
            data {
              attributes {
                url
              }
            }
          }
        }
        right_highlight {
          ...NewsCardBlog
        }
        left_highlight {
          ...NewsCardBlog
        }
        header {
          ...HomepageHeader
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
            data {
              attributes {
                url
              }
            }
          }
          variant
        }
        inba {
          title
          content
          images {
            frontImage {
              data {
                attributes {
                  url
                }
              }
            }
            rearImage {
              data {
                attributes {
                  url
                }
              }
            }
          }
          link
        }
      }
      id
    }
  }
}
    ${NewsCardBlogFragmentDoc}
${HomepageHeaderFragmentDoc}`;
export const PagesDocument = gql`
    query Pages {
  pages {
    data {
      id
      attributes {
        slug
        sections {
          ...Sections
        }
      }
    }
  }
}
    ${SectionsFragmentDoc}`;
export const PagesStaticPathsDocument = gql`
    query PagesStaticPaths($page: Int, $limit: Int) {
  pages(pagination: {page: $page, pageSize: $limit}) {
    data {
      id
      attributes {
        slug
      }
    }
  }
}
    `;
export const PageBySlugDocument = gql`
    query PageBySlug($slug: String!, $locale: I18NLocaleCode!) {
  pages(filters: {slug: {eq: $slug}}, locale: $locale) {
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
${MainMenuItemFragmentDoc}`;
export const VznDetailDocument = gql`
    query VznDetail($id: ID!) {
  vzn(id: $id) {
    data {
      id
      attributes {
        title
        validFrom
        mainDocument {
          data {
            attributes {
              url
              size
              ext
              createdAt
            }
          }
        }
        cancellationDocument {
          id
          title
          document {
            data {
              attributes {
                url
                size
                ext
                createdAt
              }
            }
          }
        }
        amedmentDocument {
          id
          title
          document {
            data {
              attributes {
                url
                size
                ext
                createdAt
              }
            }
          }
        }
      }
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    BlogPostBySlug(variables: BlogPostBySlugQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<BlogPostBySlugQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<BlogPostBySlugQuery>(BlogPostBySlugDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'BlogPostBySlug', 'query');
    },
    Footer(variables: FooterQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<FooterQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FooterQuery>(FooterDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Footer', 'query');
    },
    MainMenu(variables: MainMenuQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<MainMenuQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<MainMenuQuery>(MainMenuDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'MainMenu', 'query');
    },
    LatestPostsByTags(variables?: LatestPostsByTagsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<LatestPostsByTagsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<LatestPostsByTagsQuery>(LatestPostsByTagsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'LatestPostsByTags', 'query');
    },
    BlogPostsStaticPaths(variables?: BlogPostsStaticPathsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<BlogPostsStaticPathsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<BlogPostsStaticPathsQuery>(BlogPostsStaticPathsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'BlogPostsStaticPaths', 'query');
    },
    LatestBlogsWithTags(variables?: LatestBlogsWithTagsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<LatestBlogsWithTagsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<LatestBlogsWithTagsQuery>(LatestBlogsWithTagsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'LatestBlogsWithTags', 'query');
    },
    TotalPostsCount(variables?: TotalPostsCountQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TotalPostsCountQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TotalPostsCountQuery>(TotalPostsCountDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TotalPostsCount', 'query');
    },
    RelatedTags(variables?: RelatedTagsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<RelatedTagsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<RelatedTagsQuery>(RelatedTagsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'RelatedTags', 'query');
    },
    Homepage(variables: HomepageQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<HomepageQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<HomepageQuery>(HomepageDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Homepage', 'query');
    },
    Pages(variables?: PagesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PagesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PagesQuery>(PagesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Pages', 'query');
    },
    PagesStaticPaths(variables?: PagesStaticPathsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PagesStaticPathsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PagesStaticPathsQuery>(PagesStaticPathsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'PagesStaticPaths', 'query');
    },
    PageBySlug(variables: PageBySlugQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PageBySlugQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PageBySlugQuery>(PageBySlugDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'PageBySlug', 'query');
    },
    VznDetail(variables: VznDetailQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<VznDetailQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<VznDetailQuery>(VznDetailDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'VznDetail', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;