import type { Attribute, Schema } from '@strapi/strapi'

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens'
  info: {
    description: ''
    displayName: 'Api Token'
    name: 'Api Token'
    pluralName: 'api-tokens'
    singularName: 'api-token'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<'admin::api-token', 'oneToOne', 'admin::user'> & Attribute.Private
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }> &
      Attribute.DefaultTo<''>
    expiresAt: Attribute.DateTime
    lastUsedAt: Attribute.DateTime
    lifespan: Attribute.BigInteger
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    permissions: Attribute.Relation<'admin::api-token', 'oneToMany', 'admin::api-token-permission'>
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<'admin::api-token', 'oneToOne', 'admin::user'> & Attribute.Private
  }
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions'
  info: {
    description: ''
    displayName: 'API Token Permission'
    name: 'API Token Permission'
    pluralName: 'api-token-permissions'
    singularName: 'api-token-permission'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<'admin::api-token-permission', 'oneToOne', 'admin::user'> &
      Attribute.Private
    token: Attribute.Relation<'admin::api-token-permission', 'manyToOne', 'admin::api-token'>
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<'admin::api-token-permission', 'oneToOne', 'admin::user'> &
      Attribute.Private
  }
}

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions'
  info: {
    description: ''
    displayName: 'Permission'
    name: 'Permission'
    pluralName: 'permissions'
    singularName: 'permission'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<'admin::permission', 'oneToOne', 'admin::user'> &
      Attribute.Private
    properties: Attribute.JSON & Attribute.DefaultTo<{}>
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<'admin::permission', 'oneToOne', 'admin::user'> &
      Attribute.Private
  }
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles'
  info: {
    description: ''
    displayName: 'Role'
    name: 'Role'
    pluralName: 'roles'
    singularName: 'role'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> & Attribute.Private
    description: Attribute.String
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    permissions: Attribute.Relation<'admin::role', 'oneToMany', 'admin::permission'>
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> & Attribute.Private
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>
  }
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens'
  info: {
    description: ''
    displayName: 'Transfer Token'
    name: 'Transfer Token'
    pluralName: 'transfer-tokens'
    singularName: 'transfer-token'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<'admin::transfer-token', 'oneToOne', 'admin::user'> &
      Attribute.Private
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }> &
      Attribute.DefaultTo<''>
    expiresAt: Attribute.DateTime
    lastUsedAt: Attribute.DateTime
    lifespan: Attribute.BigInteger
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<'admin::transfer-token', 'oneToOne', 'admin::user'> &
      Attribute.Private
  }
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions'
  info: {
    description: ''
    displayName: 'Transfer Token Permission'
    name: 'Transfer Token Permission'
    pluralName: 'transfer-token-permissions'
    singularName: 'transfer-token-permission'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<'admin::transfer-token-permission', 'oneToOne', 'admin::user'> &
      Attribute.Private
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<'admin::transfer-token-permission', 'oneToOne', 'admin::user'> &
      Attribute.Private
  }
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users'
  info: {
    description: ''
    displayName: 'User'
    name: 'User'
    pluralName: 'users'
    singularName: 'user'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> & Attribute.Private
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6
      }>
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    isActive: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6
      }>
    preferedLanguage: Attribute.String
    registrationToken: Attribute.String & Attribute.Private
    resetPasswordToken: Attribute.String & Attribute.Private
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> & Attribute.Private
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> & Attribute.Private
    username: Attribute.String
  }
}

export interface ApiAlertAlert extends Schema.SingleType {
  collectionName: 'alerts'
  info: {
    description: ''
    displayName: 'Alert'
    pluralName: 'alerts'
    singularName: 'alert'
  }
  options: {
    draftAndPublish: false
  }
  pluginOptions: {
    i18n: {
      localized: true
    }
  }
  attributes: {
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<'api::alert.alert', 'oneToOne', 'admin::user'> & Attribute.Private
    locale: Attribute.String
    localizations: Attribute.Relation<'api::alert.alert', 'oneToMany', 'api::alert.alert'>
    text: Attribute.RichText &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<'api::alert.alert', 'oneToOne', 'admin::user'> & Attribute.Private
  }
}

export interface ApiBlogPostBlogPost extends Schema.CollectionType {
  collectionName: 'blog_posts'
  info: {
    description: ''
    displayName: '\u010Cl\u00E1nky'
    pluralName: 'blog-posts'
    singularName: 'blog-post'
  }
  options: {
    draftAndPublish: true
  }
  pluginOptions: {
    i18n: {
      localized: true
    }
  }
  attributes: {
    addedAt: Attribute.DateTime &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
    author: Attribute.Relation<
      'api::blog-post.blog-post',
      'oneToOne',
      'plugin::users-permissions.user'
    >
    coverImage: Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<'api::blog-post.blog-post', 'oneToOne', 'admin::user'> &
      Attribute.Private
    date_added: Attribute.DateTime &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    excerpt: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    locale: Attribute.String
    localizations: Attribute.Relation<
      'api::blog-post.blog-post',
      'oneToMany',
      'api::blog-post.blog-post'
    >
    moreLink: Attribute.Component<'blocks.blog-post-link'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    publishedAt: Attribute.DateTime
    sections: Attribute.DynamicZone<
      [
        'sections.columned-text',
        'sections.text-with-image',
        'sections.file-list',
        'sections.regulations',
        'sections.narrow-text',
        'sections.divider',
        'sections.videos',
        'sections.numerical-list',
        'sections.gallery'
      ]
    > &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    slug: Attribute.UID<'api::blog-post.blog-post', 'title'>
    tag: Attribute.Relation<'api::blog-post.blog-post', 'oneToOne', 'api::tag.tag'>
    title: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<'api::blog-post.blog-post', 'oneToOne', 'admin::user'> &
      Attribute.Private
  }
}

export interface ApiFaqCategoryFaqCategory extends Schema.CollectionType {
  collectionName: 'faq_categories'
  info: {
    displayName: 'faq category'
    pluralName: 'faq-categories'
    singularName: 'faq-category'
  }
  options: {
    draftAndPublish: true
  }
  pluginOptions: {
    i18n: {
      localized: true
    }
  }
  attributes: {
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<'api::faq-category.faq-category', 'oneToOne', 'admin::user'> &
      Attribute.Private
    faqs: Attribute.Relation<'api::faq-category.faq-category', 'oneToMany', 'api::faq.faq'>
    locale: Attribute.String
    localizations: Attribute.Relation<
      'api::faq-category.faq-category',
      'oneToMany',
      'api::faq-category.faq-category'
    >
    publishedAt: Attribute.DateTime
    slug: Attribute.UID<'api::faq-category.faq-category', 'title'> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<'api::faq-category.faq-category', 'oneToOne', 'admin::user'> &
      Attribute.Private
  }
}

export interface ApiFaqFaq extends Schema.CollectionType {
  collectionName: 'faqs'
  info: {
    displayName: 'faq'
    pluralName: 'faqs'
    singularName: 'faq'
  }
  options: {
    draftAndPublish: true
  }
  pluginOptions: {
    i18n: {
      localized: true
    }
  }
  attributes: {
    body: Attribute.RichText &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<'api::faq.faq', 'oneToOne', 'admin::user'> & Attribute.Private
    faqCategory: Attribute.Relation<'api::faq.faq', 'manyToOne', 'api::faq-category.faq-category'>
    locale: Attribute.String
    localizations: Attribute.Relation<'api::faq.faq', 'oneToMany', 'api::faq.faq'>
    publishedAt: Attribute.DateTime
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<'api::faq.faq', 'oneToOne', 'admin::user'> & Attribute.Private
  }
}

export interface ApiFooterFooter extends Schema.SingleType {
  collectionName: 'footers'
  info: {
    description: ''
    displayName: 'Footer'
    pluralName: 'footers'
    singularName: 'footer'
  }
  options: {
    draftAndPublish: true
  }
  pluginOptions: {
    i18n: {
      localized: true
    }
  }
  attributes: {
    accessibilityPageLink: Attribute.Component<'blocks.common-link'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    address: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    columns: Attribute.Component<'blocks.footer-column', true> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    contacts: Attribute.Component<'blocks.footer-contact-item', true> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<'api::footer.footer', 'oneToOne', 'admin::user'> &
      Attribute.Private
    facebookUrl: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    innovationsLink: Attribute.Component<'blocks.common-link'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    instagramUrl: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    locale: Attribute.String
    localizations: Attribute.Relation<'api::footer.footer', 'oneToMany', 'api::footer.footer'>
    publishedAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<'api::footer.footer', 'oneToOne', 'admin::user'> &
      Attribute.Private
  }
}

export interface ApiGeneralGeneral extends Schema.SingleType {
  collectionName: 'generals'
  info: {
    description: ''
    displayName: 'General'
    pluralName: 'generals'
    singularName: 'general'
  }
  options: {
    draftAndPublish: false
  }
  pluginOptions: {
    i18n: {
      localized: true
    }
  }
  attributes: {
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<'api::general.general', 'oneToOne', 'admin::user'> &
      Attribute.Private
    header: Attribute.Component<'general.header'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    inbaPage: Attribute.Relation<'api::general.general', 'oneToOne', 'api::page.page'>
    inbaReleasesPage: Attribute.Relation<'api::general.general', 'oneToOne', 'api::page.page'>
    locale: Attribute.String
    localizations: Attribute.Relation<'api::general.general', 'oneToMany', 'api::general.general'>
    newsPage: Attribute.Relation<'api::general.general', 'oneToOne', 'api::page.page'>
    officialBoardPage: Attribute.Relation<'api::general.general', 'oneToOne', 'api::page.page'>
    privacyPolicyPage: Attribute.Relation<'api::general.general', 'oneToOne', 'api::page.page'>
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<'api::general.general', 'oneToOne', 'admin::user'> &
      Attribute.Private
    vznPage: Attribute.Relation<'api::general.general', 'oneToOne', 'api::page.page'>
  }
}

export interface ApiHomepageHomepage extends Schema.SingleType {
  collectionName: 'homepages'
  info: {
    description: ''
    displayName: 'Homepage'
    pluralName: 'homepages'
    singularName: 'homepage'
  }
  options: {
    draftAndPublish: true
  }
  pluginOptions: {
    i18n: {
      localized: true
    }
  }
  attributes: {
    bookmarkTourists: Attribute.Component<'blocks.homepage-bookmark'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    bookmarkUkraine: Attribute.Component<'blocks.homepage-bookmark'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    cards: Attribute.Component<'blocks.homepage-bookmark', true> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<'api::homepage.homepage', 'oneToOne', 'admin::user'> &
      Attribute.Private
    eventsSection: Attribute.Component<'sections.homepage-events'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    highlights: Attribute.Component<'sections.homepage-highlights'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    inba: Attribute.Component<'blocks.in-ba'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    inbaFrontImage: Attribute.Media<'images'> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
    inbaRearImage: Attribute.Media<'images'> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
    inbaUrl: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
    locale: Attribute.String
    localizations: Attribute.Relation<
      'api::homepage.homepage',
      'oneToMany',
      'api::homepage.homepage'
    >
    mayorAndCouncil: Attribute.Component<'sections.homepage-mayor-and-council'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    metaDescription: Attribute.Text &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    metaTitle: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    publishedAt: Attribute.DateTime
    tabs: Attribute.Component<'sections.homepage-tabs'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    topServices: Attribute.Component<'sections.top-services'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<'api::homepage.homepage', 'oneToOne', 'admin::user'> &
      Attribute.Private
    welcomeHeadline: Attribute.Text &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    welcomeMedia: Attribute.Media<'images'> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
  }
}

export interface ApiInbaArticleInbaArticle extends Schema.CollectionType {
  collectionName: 'inba_articles'
  info: {
    description: ''
    displayName: 'in.ba \u010Dl\u00E1nky'
    pluralName: 'inba-articles'
    singularName: 'inba-article'
  }
  options: {
    draftAndPublish: true
  }
  pluginOptions: {
    i18n: {
      localized: true
    }
  }
  attributes: {
    content: Attribute.RichText &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    coverImage: Attribute.Media<'images'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<'api::inba-article.inba-article', 'oneToOne', 'admin::user'> &
      Attribute.Private
    inbaRelease: Attribute.Relation<
      'api::inba-article.inba-article',
      'manyToOne',
      'api::inba-release.inba-release'
    >
    inbaTag: Attribute.Relation<
      'api::inba-article.inba-article',
      'manyToOne',
      'api::inba-tag.inba-tag'
    >
    locale: Attribute.String
    localizations: Attribute.Relation<
      'api::inba-article.inba-article',
      'oneToMany',
      'api::inba-article.inba-article'
    >
    perex: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    publishedAt: Attribute.DateTime
    slug: Attribute.UID<'api::inba-article.inba-article', 'title'> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<'api::inba-article.inba-article', 'oneToOne', 'admin::user'> &
      Attribute.Private
  }
}

export interface ApiInbaReleaseInbaRelease extends Schema.CollectionType {
  collectionName: 'inba_releases'
  info: {
    description: ''
    displayName: 'in.ba vydania'
    pluralName: 'inba-releases'
    singularName: 'inba-release'
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    coverImage: Attribute.Media<'images'>
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<'api::inba-release.inba-release', 'oneToOne', 'admin::user'> &
      Attribute.Private
    files: Attribute.Component<'blocks.file-item', true> &
      Attribute.SetMinMax<
        {
          min: 1
        },
        number
      >
    inbaArticles: Attribute.Relation<
      'api::inba-release.inba-release',
      'oneToMany',
      'api::inba-article.inba-article'
    >
    perex: Attribute.Text
    publishedAt: Attribute.DateTime
    rearImage: Attribute.Media<'images'>
    releaseDate: Attribute.Date & Attribute.Required
    slug: Attribute.UID<'api::inba-release.inba-release', 'title'> & Attribute.Required
    title: Attribute.String & Attribute.Required
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<'api::inba-release.inba-release', 'oneToOne', 'admin::user'> &
      Attribute.Private
  }
}

export interface ApiInbaTagInbaTag extends Schema.CollectionType {
  collectionName: 'inba_tags'
  info: {
    description: ''
    displayName: 'in.ba tagy'
    pluralName: 'inba-tags'
    singularName: 'inba-tag'
  }
  options: {
    draftAndPublish: false
  }
  pluginOptions: {
    i18n: {
      localized: true
    }
  }
  attributes: {
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<'api::inba-tag.inba-tag', 'oneToOne', 'admin::user'> &
      Attribute.Private
    inbaArticles: Attribute.Relation<
      'api::inba-tag.inba-tag',
      'oneToMany',
      'api::inba-article.inba-article'
    >
    locale: Attribute.String
    localizations: Attribute.Relation<
      'api::inba-tag.inba-tag',
      'oneToMany',
      'api::inba-tag.inba-tag'
    >
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<'api::inba-tag.inba-tag', 'oneToOne', 'admin::user'> &
      Attribute.Private
  }
}

export interface ApiMenuMenu extends Schema.SingleType {
  collectionName: 'menus'
  info: {
    description: ''
    displayName: 'Menu'
    pluralName: 'menus'
    singularName: 'menu'
  }
  options: {
    draftAndPublish: false
  }
  pluginOptions: {
    i18n: {
      localized: true
    }
  }
  attributes: {
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<'api::menu.menu', 'oneToOne', 'admin::user'> & Attribute.Private
    locale: Attribute.String
    localizations: Attribute.Relation<'api::menu.menu', 'oneToMany', 'api::menu.menu'>
    menus: Attribute.Component<'menu.menu-item', true> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }> &
      Attribute.SetMinMax<
        {
          max: 6
          min: 1
        },
        number
      >
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<'api::menu.menu', 'oneToOne', 'admin::user'> & Attribute.Private
  }
}

export interface ApiPageCategoryPageCategory extends Schema.CollectionType {
  collectionName: 'page_categories'
  info: {
    description: ''
    displayName: 'Kateg\u00F3rie'
    pluralName: 'page-categories'
    singularName: 'page-category'
  }
  options: {
    draftAndPublish: true
  }
  pluginOptions: {
    i18n: {
      localized: true
    }
  }
  attributes: {
    color: Attribute.Enumeration<['red', 'blue', 'green', 'yellow', 'purple', 'brown']> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<'api::page-category.page-category', 'oneToOne', 'admin::user'> &
      Attribute.Private
    icon: Attribute.Enumeration<
      [
        'mesto_01',
        'doprava_mapy_02',
        'zp_vystavba_03',
        'socialna_pomoc_04',
        'vzdelavanie_05',
        'kultura_06'
      ]
    > &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    locale: Attribute.String
    localizations: Attribute.Relation<
      'api::page-category.page-category',
      'oneToMany',
      'api::page-category.page-category'
    >
    pages: Attribute.Relation<'api::page-category.page-category', 'oneToMany', 'api::page.page'>
    publishedAt: Attribute.DateTime
    shortTitle: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    subcategories: Attribute.Relation<
      'api::page-category.page-category',
      'oneToMany',
      'api::page-subcategory.page-subcategory'
    >
    title: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<'api::page-category.page-category', 'oneToOne', 'admin::user'> &
      Attribute.Private
  }
}

export interface ApiPageSubcategoryPageSubcategory extends Schema.CollectionType {
  collectionName: 'page_subcategories'
  info: {
    description: ''
    displayName: 'Podkateg\u00F3rie'
    pluralName: 'page-subcategories'
    singularName: 'page-subcategory'
  }
  options: {
    draftAndPublish: true
  }
  pluginOptions: {
    i18n: {
      localized: true
    }
  }
  attributes: {
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::page-subcategory.page-subcategory',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    icon: Attribute.Enumeration<
      [
        'sprava_mesta_01',
        'transparentne_mesto_01',
        'dane_01',
        'projekty_01',
        'partnerstva_01',
        'mhd_02',
        'cyklo_02',
        'mapy_02',
        'sprava_a_udrzba_02',
        'doprava_02',
        'parkovanie_02',
        'zdielana_mobilita_02',
        'zivotne_prostredie_03',
        'zelen_03',
        'vystavba_a_nehnutelnosti_03',
        'uzemny_plan_03',
        'rozvoj_mesta_03',
        'verejne_osvetlenie_03',
        'byvanie_04',
        'sluzby_04',
        'zariadenia_04',
        'pomoc_04',
        'aktivity_04',
        'skolstvo_05',
        'sport_05',
        'deti_a_mladez_05',
        'ocenovanie_05',
        'dotacie_05',
        'kalendar_06',
        'organizacie_06',
        'dedicstvo_06',
        'sluzby_06',
        'koncepcia_06',
        'komunity_06',
        'covid_06'
      ]
    > &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    locale: Attribute.String
    localizations: Attribute.Relation<
      'api::page-subcategory.page-subcategory',
      'oneToMany',
      'api::page-subcategory.page-subcategory'
    >
    moreLink: Attribute.Component<'blocks.page-link'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    pages: Attribute.Component<'blocks.page-link', true> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    publishedAt: Attribute.DateTime
    title: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<
      'api::page-subcategory.page-subcategory',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiPagePage extends Schema.CollectionType {
  collectionName: 'pages'
  info: {
    description: ''
    displayName: 'Str\u00E1nky'
    pluralName: 'pages'
    singularName: 'page'
  }
  options: {
    draftAndPublish: true
  }
  pluginOptions: {
    i18n: {
      localized: true
    }
  }
  attributes: {
    childPages: Attribute.Relation<'api::page.page', 'oneToMany', 'api::page.page'>
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<'api::page.page', 'oneToOne', 'admin::user'> & Attribute.Private
    headerLinks: Attribute.Component<'blocks.common-link', true> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    keywords: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    locale: Attribute.String
    localizations: Attribute.Relation<'api::page.page', 'oneToMany', 'api::page.page'>
    metaDiscription: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    pageBackgroundImage: Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    pageCategory: Attribute.Relation<
      'api::page.page',
      'manyToOne',
      'api::page-category.page-category'
    >
    pageColor: Attribute.Enumeration<['red', 'blue', 'green', 'yellow', 'purple', 'brown']> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    pageHeaderSections: Attribute.DynamicZone<['sections.subpage-list']> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    parentPage: Attribute.Relation<'api::page.page', 'manyToOne', 'api::page.page'>
    publishedAt: Attribute.DateTime
    relatedContents: Attribute.Relation<'api::page.page', 'oneToMany', 'api::tag.tag'>
    sections: Attribute.DynamicZone<
      [
        'sections.accordion',
        'sections.banner',
        'sections.blog-posts-list',
        'sections.blog-posts-by-category',
        'sections.blog-posts-by-tags',
        'sections.calculator',
        'sections.columned-text',
        'sections.comparison-section',
        'sections.contacts-section',
        'sections.divider',
        'sections.faqs',
        'sections.faq-categories',
        'sections.featured-blog-posts',
        'sections.file-list',
        'sections.gallery',
        'sections.icon-title-desc',
        'sections.iframe',
        'sections.inba-articles-list',
        'sections.inba-releases',
        'sections.links',
        'sections.narrow-text',
        'sections.numerical-list',
        'sections.official-board',
        'sections.organizational-structure',
        'sections.pros-and-cons-section',
        'sections.regulations',
        'sections.regulations-list',
        'sections.space',
        'sections.testimonials',
        'sections.text-with-image',
        'sections.timeline',
        'sections.videos',
        'sections.waves'
      ]
    > &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    slug: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    subtext: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    title: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<'api::page.page', 'oneToOne', 'admin::user'> & Attribute.Private
  }
}

export interface ApiRegulationRegulation extends Schema.CollectionType {
  collectionName: 'regulations'
  info: {
    description: ''
    displayName: 'Regulation'
    pluralName: 'regulations'
    singularName: 'regulation'
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    amending: Attribute.Relation<
      'api::regulation.regulation',
      'manyToMany',
      'api::regulation.regulation'
    >
    amendments: Attribute.Relation<
      'api::regulation.regulation',
      'manyToMany',
      'api::regulation.regulation'
    >
    attachments: Attribute.Media<'images' | 'files' | 'videos' | 'audios', true>
    cancellation: Attribute.Relation<
      'api::regulation.regulation',
      'manyToOne',
      'api::regulation.regulation'
    >
    cancelling: Attribute.Relation<
      'api::regulation.regulation',
      'oneToMany',
      'api::regulation.regulation'
    >
    category: Attribute.Enumeration<
      [
        'daneAPoplatky',
        'pomenovanieUlic',
        'hospodarenie',
        'uzemnePlanovanie',
        'poriadokACistota',
        'socialnaPomocASkolstvo',
        'ostatne',
        'archiv'
      ]
    > &
      Attribute.Required
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<'api::regulation.regulation', 'oneToOne', 'admin::user'> &
      Attribute.Private
    effectiveFrom: Attribute.Date & Attribute.Required
    fullTitle: Attribute.Text & Attribute.Required
    isFullTextRegulation: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<false>
    mainDocument: Attribute.Media<'images' | 'files' | 'videos' | 'audios'> & Attribute.Required
    publishedAt: Attribute.DateTime
    regNumber: Attribute.String & Attribute.Required & Attribute.Unique
    slug: Attribute.UID<'api::regulation.regulation', 'regNumber'> & Attribute.Required
    titleText: Attribute.String
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<'api::regulation.regulation', 'oneToOne', 'admin::user'> &
      Attribute.Private
  }
}

export interface ApiTagTag extends Schema.CollectionType {
  collectionName: 'tags'
  info: {
    description: ''
    displayName: 'Tagy'
    pluralName: 'tags'
    singularName: 'tag'
  }
  options: {
    draftAndPublish: false
  }
  pluginOptions: {
    i18n: {
      localized: true
    }
  }
  attributes: {
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<'api::tag.tag', 'oneToOne', 'admin::user'> & Attribute.Private
    locale: Attribute.String
    localizations: Attribute.Relation<'api::tag.tag', 'oneToMany', 'api::tag.tag'>
    pageCategory: Attribute.Relation<'api::tag.tag', 'oneToOne', 'api::page-category.page-category'>
    title: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<'api::tag.tag', 'oneToOne', 'admin::user'> & Attribute.Private
  }
}

export interface ApiTaxAdministratorsListTaxAdministratorsList extends Schema.SingleType {
  collectionName: 'tax_administrators_lists'
  info: {
    description: ''
    displayName: 'Tax administrators list'
    pluralName: 'tax-administrators-lists'
    singularName: 'tax-administrators-list'
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::tax-administrators-list.tax-administrators-list',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    taxAdministrators: Attribute.Component<'tax-administrators.tax-administrator', true> &
      Attribute.Required
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<
      'api::tax-administrators-list.tax-administrators-list',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiVznVzn extends Schema.CollectionType {
  collectionName: 'vzns'
  info: {
    description: ''
    displayName: 'VZN'
    pluralName: 'vzns'
    singularName: 'vzn'
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    amedmentDocument: Attribute.Component<'blocks.doc-list-extensions', true>
    cancellationDocument: Attribute.Component<'blocks.doc-list-extensions', true>
    category: Attribute.Enumeration<
      [
        'daneAPoplatky',
        'pomenovanieUlic',
        'hospodarenie',
        'uzemnePlanovanie',
        'poriadokACistota',
        'socialnaPomocASkolstvo',
        'ostatne',
        'archiv'
      ]
    >
    consolidatedText: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<'api::vzn.vzn', 'oneToOne', 'admin::user'> & Attribute.Private
    details: Attribute.RichText
    mainDocument: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>
    publishedAt: Attribute.DateTime
    title: Attribute.String
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<'api::vzn.vzn', 'oneToOne', 'admin::user'> & Attribute.Private
    validFrom: Attribute.Date
  }
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases'
  info: {
    displayName: 'Release'
    pluralName: 'releases'
    singularName: 'release'
  }
  options: {
    draftAndPublish: false
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<'plugin::content-releases.release', 'oneToOne', 'admin::user'> &
      Attribute.Private
    name: Attribute.String & Attribute.Required
    releasedAt: Attribute.DateTime
    scheduledAt: Attribute.DateTime
    status: Attribute.Enumeration<['ready', 'blocked', 'failed', 'done', 'empty']> &
      Attribute.Required
    timezone: Attribute.String
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<'plugin::content-releases.release', 'oneToOne', 'admin::user'> &
      Attribute.Private
  }
}

export interface PluginContentReleasesReleaseAction extends Schema.CollectionType {
  collectionName: 'strapi_release_actions'
  info: {
    displayName: 'Release Action'
    pluralName: 'release-actions'
    singularName: 'release-action'
  }
  options: {
    draftAndPublish: false
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    contentType: Attribute.String & Attribute.Required
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    entry: Attribute.Relation<'plugin::content-releases.release-action', 'morphToOne'>
    isEntryValid: Attribute.Boolean
    locale: Attribute.String
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale'
  info: {
    collectionName: 'locales'
    description: ''
    displayName: 'Locale'
    pluralName: 'locales'
    singularName: 'locale'
  }
  options: {
    draftAndPublish: false
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    code: Attribute.String & Attribute.Unique
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<'plugin::i18n.locale', 'oneToOne', 'admin::user'> &
      Attribute.Private
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          max: 50
          min: 1
        },
        number
      >
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<'plugin::i18n.locale', 'oneToOne', 'admin::user'> &
      Attribute.Private
  }
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files'
  info: {
    description: ''
    displayName: 'File'
    pluralName: 'files'
    singularName: 'file'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    alternativeText: Attribute.String
    caption: Attribute.String
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<'plugin::upload.file', 'oneToOne', 'admin::user'> &
      Attribute.Private
    ext: Attribute.String
    folder: Attribute.Relation<'plugin::upload.file', 'manyToOne', 'plugin::upload.folder'> &
      Attribute.Private
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1
        },
        number
      >
    formats: Attribute.JSON
    hash: Attribute.String & Attribute.Required
    height: Attribute.Integer
    mime: Attribute.String & Attribute.Required
    name: Attribute.String & Attribute.Required
    previewUrl: Attribute.String
    provider: Attribute.String & Attribute.Required
    provider_metadata: Attribute.JSON
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>
    size: Attribute.Decimal & Attribute.Required
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<'plugin::upload.file', 'oneToOne', 'admin::user'> &
      Attribute.Private
    url: Attribute.String & Attribute.Required
    width: Attribute.Integer
  }
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders'
  info: {
    displayName: 'Folder'
    pluralName: 'folders'
    singularName: 'folder'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    children: Attribute.Relation<'plugin::upload.folder', 'oneToMany', 'plugin::upload.folder'>
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<'plugin::upload.folder', 'oneToOne', 'admin::user'> &
      Attribute.Private
    files: Attribute.Relation<'plugin::upload.folder', 'oneToMany', 'plugin::upload.file'>
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1
        },
        number
      >
    parent: Attribute.Relation<'plugin::upload.folder', 'manyToOne', 'plugin::upload.folder'>
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1
        },
        number
      >
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<'plugin::upload.folder', 'oneToOne', 'admin::user'> &
      Attribute.Private
  }
}

export interface PluginUsersPermissionsPermission extends Schema.CollectionType {
  collectionName: 'up_permissions'
  info: {
    description: ''
    displayName: 'Permission'
    name: 'permission'
    pluralName: 'permissions'
    singularName: 'permission'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    action: Attribute.String & Attribute.Required
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles'
  info: {
    description: ''
    displayName: 'Role'
    name: 'role'
    pluralName: 'roles'
    singularName: 'role'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<'plugin::users-permissions.role', 'oneToOne', 'admin::user'> &
      Attribute.Private
    description: Attribute.String
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3
      }>
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >
    type: Attribute.String & Attribute.Unique
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<'plugin::users-permissions.role', 'oneToOne', 'admin::user'> &
      Attribute.Private
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >
  }
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users'
  info: {
    description: ''
    displayName: 'User'
    name: 'user'
    pluralName: 'users'
    singularName: 'user'
  }
  options: {
    draftAndPublish: false
    timestamps: true
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
  }
  attributes: {
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>
    confirmationToken: Attribute.String & Attribute.Private
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>
    createdAt: Attribute.DateTime
    createdBy: Attribute.Relation<'plugin::users-permissions.user', 'oneToOne', 'admin::user'> &
      Attribute.Private
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6
      }>
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6
      }>
    posts: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'api::blog-post.blog-post'
    >
    provider: Attribute.String
    resetPasswordToken: Attribute.String & Attribute.Private
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >
    updatedAt: Attribute.DateTime
    updatedBy: Attribute.Relation<'plugin::users-permissions.user', 'oneToOne', 'admin::user'> &
      Attribute.Private
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3
      }>
  }
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::api-token': AdminApiToken
      'admin::api-token-permission': AdminApiTokenPermission
      'admin::permission': AdminPermission
      'admin::role': AdminRole
      'admin::transfer-token': AdminTransferToken
      'admin::transfer-token-permission': AdminTransferTokenPermission
      'admin::user': AdminUser
      'api::alert.alert': ApiAlertAlert
      'api::blog-post.blog-post': ApiBlogPostBlogPost
      'api::faq-category.faq-category': ApiFaqCategoryFaqCategory
      'api::faq.faq': ApiFaqFaq
      'api::footer.footer': ApiFooterFooter
      'api::general.general': ApiGeneralGeneral
      'api::homepage.homepage': ApiHomepageHomepage
      'api::inba-article.inba-article': ApiInbaArticleInbaArticle
      'api::inba-release.inba-release': ApiInbaReleaseInbaRelease
      'api::inba-tag.inba-tag': ApiInbaTagInbaTag
      'api::menu.menu': ApiMenuMenu
      'api::page-category.page-category': ApiPageCategoryPageCategory
      'api::page-subcategory.page-subcategory': ApiPageSubcategoryPageSubcategory
      'api::page.page': ApiPagePage
      'api::regulation.regulation': ApiRegulationRegulation
      'api::tag.tag': ApiTagTag
      'api::tax-administrators-list.tax-administrators-list': ApiTaxAdministratorsListTaxAdministratorsList
      'api::vzn.vzn': ApiVznVzn
      'plugin::content-releases.release': PluginContentReleasesRelease
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction
      'plugin::i18n.locale': PluginI18NLocale
      'plugin::upload.file': PluginUploadFile
      'plugin::upload.folder': PluginUploadFolder
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission
      'plugin::users-permissions.role': PluginUsersPermissionsRole
      'plugin::users-permissions.user': PluginUsersPermissionsUser
    }
  }
}
