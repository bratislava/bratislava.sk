type BlogPostBySlugQuery = {
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
              attributes?: { __typename?: 'BlogPost'; title?: string | null; slug?: string | null } | null
            } | null
          } | null
        } | null
        sections?: Array<
          | {
              __typename: 'ComponentSectionsAccordion'
              title?: string | null
              hasBackground?: boolean | null
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
              __typename: 'ComponentSectionsArticlesList'
              title?: string | null
              filtering?: boolean | null
              category?: {
                __typename?: 'PageCategoryEntityResponse'
                data?: {
                  __typename?: 'PageCategoryEntity'
                  attributes?: { __typename?: 'PageCategory'; title?: string | null } | null
                } | null
              } | null
            }
          | {
              __typename: 'ComponentSectionsCalculator'
              hasBackground?: boolean | null
              single_adult_value?: number | null
              another_adult_value?: number | null
              child_value?: number | null
            }
          | { __typename: 'ComponentSectionsColumnedText'; hasBackground?: boolean | null; content?: string | null }
          | {
              __typename: 'ComponentSectionsContact'
              title?: string | null
              hasBackground?: boolean | null
              description?: string | null
              phone?: string | null
              phoneLabel?: string | null
              email?: string | null
              emailLabel?: string | null
              address?: string | null
            }
          | {
              __typename: 'ComponentSectionsDivider'
              hasBackground?: boolean | null
              style?: Enum_Componentsectionsdivider_Style | null
            }
          | {
              __typename: 'ComponentSectionsFileList'
              hasBackground?: boolean | null
              fileList?: Array<{
                __typename?: 'ComponentBlocksFile'
                title?: string | null
                category?: string | null
                media?: {
                  __typename?: 'UploadFileEntityResponse'
                  data?: {
                    __typename?: 'UploadFileEntity'
                    attributes?: {
                      __typename?: 'UploadFile'
                      url: string
                      createdAt?: any | null
                      size: number
                      ext?: string | null
                    } | null
                  } | null
                } | null
              } | null> | null
            }
          | {
              __typename: 'ComponentSectionsIconTitleDesc'
              title?: string | null
              list?: Array<{
                __typename?: 'ComponentBlocksIconWithTitleAndDescription'
                title?: string | null
                desc?: string | null
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
              __typename: 'ComponentSectionsLinks'
              title?: string | null
              hasBackground?: boolean | null
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
              __typename: 'ComponentSectionsListItems'
              title?: string | null
              hasBackground?: boolean | null
              listItems?: Array<{
                __typename?: 'ComponentBlocksListItem'
                content?: string | null
                moreLinkTitle?: string | null
                moreLinkUrl?: string | null
                circleOption?: Enum_Componentblockslistitem_Circleoption | null
                moreLinkPage?: {
                  __typename?: 'PageEntityResponse'
                  data?: {
                    __typename?: 'PageEntity'
                    attributes?: {
                      __typename?: 'Page'
                      locale?: string | null
                      slug?: string | null
                      title?: string | null
                    } | null
                  } | null
                } | null
              } | null> | null
            }
          | {
              __typename: 'ComponentSectionsNarrowText'
              hasBackground?: boolean | null
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
              hasBackground?: boolean | null
              items?: Array<{ __typename?: 'ComponentBlocksNumericalListItem'; text?: string | null } | null> | null
            }
          | {
              __typename: 'ComponentSectionsTextWithImage'
              hasBackground?: boolean | null
              content?: string | null
              imagePosition?: Enum_Componentsectionstextwithimage_Imageposition | null
              imageShadow?: boolean | null
              imageSrc?: {
                __typename?: 'UploadFileEntityResponse'
                data?: {
                  __typename?: 'UploadFileEntity'
                  attributes?: { __typename?: 'UploadFile'; url: string } | null
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
          | {
              __typename: 'ComponentSectionsWaves'
              position?: Enum_Componentsectionswaves_Position | null
              isRich?: boolean | null
            }
          | { __typename: 'Error' }
          | null
        > | null
      } | null
    }>
  } | null
}
