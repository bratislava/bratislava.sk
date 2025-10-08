import type { Schema, Struct } from '@strapi/strapi'

export interface AdminApiToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_tokens'
  info: {
    description: ''
    displayName: 'Api Token'
    name: 'Api Token'
    pluralName: 'api-tokens'
    singularName: 'api-token'
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
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    createdAt: Schema.Attribute.DateTime
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1
      }> &
      Schema.Attribute.DefaultTo<''>
    encryptedKey: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    expiresAt: Schema.Attribute.DateTime
    lastUsedAt: Schema.Attribute.DateTime
    lifespan: Schema.Attribute.BigInteger
    locale: Schema.Attribute.String & Schema.Attribute.Private
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::api-token'> &
      Schema.Attribute.Private
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    permissions: Schema.Attribute.Relation<'oneToMany', 'admin::api-token-permission'>
    publishedAt: Schema.Attribute.DateTime
    type: Schema.Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'read-only'>
    updatedAt: Schema.Attribute.DateTime
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
  }
}

export interface AdminApiTokenPermission extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_token_permissions'
  info: {
    description: ''
    displayName: 'API Token Permission'
    name: 'API Token Permission'
    pluralName: 'api-token-permissions'
    singularName: 'api-token-permission'
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
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    createdAt: Schema.Attribute.DateTime
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
    locale: Schema.Attribute.String & Schema.Attribute.Private
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::api-token-permission'> &
      Schema.Attribute.Private
    publishedAt: Schema.Attribute.DateTime
    token: Schema.Attribute.Relation<'manyToOne', 'admin::api-token'>
    updatedAt: Schema.Attribute.DateTime
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
  }
}

export interface AdminPermission extends Struct.CollectionTypeSchema {
  collectionName: 'admin_permissions'
  info: {
    description: ''
    displayName: 'Permission'
    name: 'Permission'
    pluralName: 'permissions'
    singularName: 'permission'
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
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    actionParameters: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>
    conditions: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<[]>
    createdAt: Schema.Attribute.DateTime
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
    locale: Schema.Attribute.String & Schema.Attribute.Private
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::permission'> &
      Schema.Attribute.Private
    properties: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>
    publishedAt: Schema.Attribute.DateTime
    role: Schema.Attribute.Relation<'manyToOne', 'admin::role'>
    subject: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    updatedAt: Schema.Attribute.DateTime
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
  }
}

export interface AdminRole extends Struct.CollectionTypeSchema {
  collectionName: 'admin_roles'
  info: {
    description: ''
    displayName: 'Role'
    name: 'Role'
    pluralName: 'roles'
    singularName: 'role'
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
    code: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    createdAt: Schema.Attribute.DateTime
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
    description: Schema.Attribute.String
    locale: Schema.Attribute.String & Schema.Attribute.Private
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::role'> & Schema.Attribute.Private
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    permissions: Schema.Attribute.Relation<'oneToMany', 'admin::permission'>
    publishedAt: Schema.Attribute.DateTime
    updatedAt: Schema.Attribute.DateTime
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
    users: Schema.Attribute.Relation<'manyToMany', 'admin::user'>
  }
}

export interface AdminTransferToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_tokens'
  info: {
    description: ''
    displayName: 'Transfer Token'
    name: 'Transfer Token'
    pluralName: 'transfer-tokens'
    singularName: 'transfer-token'
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
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    createdAt: Schema.Attribute.DateTime
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1
      }> &
      Schema.Attribute.DefaultTo<''>
    expiresAt: Schema.Attribute.DateTime
    lastUsedAt: Schema.Attribute.DateTime
    lifespan: Schema.Attribute.BigInteger
    locale: Schema.Attribute.String & Schema.Attribute.Private
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::transfer-token'> &
      Schema.Attribute.Private
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    permissions: Schema.Attribute.Relation<'oneToMany', 'admin::transfer-token-permission'>
    publishedAt: Schema.Attribute.DateTime
    updatedAt: Schema.Attribute.DateTime
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
  }
}

export interface AdminTransferTokenPermission extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_token_permissions'
  info: {
    description: ''
    displayName: 'Transfer Token Permission'
    name: 'Transfer Token Permission'
    pluralName: 'transfer-token-permissions'
    singularName: 'transfer-token-permission'
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
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    createdAt: Schema.Attribute.DateTime
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
    locale: Schema.Attribute.String & Schema.Attribute.Private
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::transfer-token-permission'> &
      Schema.Attribute.Private
    publishedAt: Schema.Attribute.DateTime
    token: Schema.Attribute.Relation<'manyToOne', 'admin::transfer-token'>
    updatedAt: Schema.Attribute.DateTime
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
  }
}

export interface AdminUser extends Struct.CollectionTypeSchema {
  collectionName: 'admin_users'
  info: {
    description: ''
    displayName: 'User'
    name: 'User'
    pluralName: 'users'
    singularName: 'user'
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
    blocked: Schema.Attribute.Boolean & Schema.Attribute.Private & Schema.Attribute.DefaultTo<false>
    createdAt: Schema.Attribute.DateTime
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6
      }>
    firstname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    isActive: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>
    lastname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    locale: Schema.Attribute.String & Schema.Attribute.Private
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::user'> & Schema.Attribute.Private
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6
      }>
    preferedLanguage: Schema.Attribute.String
    publishedAt: Schema.Attribute.DateTime
    registrationToken: Schema.Attribute.String & Schema.Attribute.Private
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private
    roles: Schema.Attribute.Relation<'manyToMany', 'admin::role'> & Schema.Attribute.Private
    updatedAt: Schema.Attribute.DateTime
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
    username: Schema.Attribute.String
  }
}

export interface ApiAdminGroupAdminGroup extends Struct.CollectionTypeSchema {
  collectionName: 'admin_groups'
  info: {
    description: ''
    displayName: 'Admin skupiny'
    pluralName: 'admin-groups'
    singularName: 'admin-group'
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    adminGroupId: Schema.Attribute.UID<'title'>
    articles: Schema.Attribute.Relation<'manyToMany', 'api::article.article'>
    contentManagedBy: Schema.Attribute.String
    createdAt: Schema.Attribute.DateTime
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
    documents: Schema.Attribute.Relation<'manyToMany', 'api::document.document'>
    faqs: Schema.Attribute.Relation<'manyToMany', 'api::faq.faq'>
    landingPage: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>
    locale: Schema.Attribute.String & Schema.Attribute.Private
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::admin-group.admin-group'> &
      Schema.Attribute.Private
    pages: Schema.Attribute.Relation<'manyToMany', 'api::page.page'>
    publishedAt: Schema.Attribute.DateTime
    title: Schema.Attribute.String
    updatedAt: Schema.Attribute.DateTime
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
  }
}

export interface ApiAlertAlert extends Struct.SingleTypeSchema {
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
    createdAt: Schema.Attribute.DateTime
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
    locale: Schema.Attribute.String
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::alert.alert'>
    publishedAt: Schema.Attribute.DateTime
    text: Schema.Attribute.RichText &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    updatedAt: Schema.Attribute.DateTime
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
  }
}

export interface ApiArticleCategoryArticleCategory extends Struct.CollectionTypeSchema {
  collectionName: 'article_categories'
  info: {
    displayName: '\u010Cl\u00E1nky - typy'
    pluralName: 'article-categories'
    singularName: 'article-category'
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
    articles: Schema.Attribute.Relation<'oneToMany', 'api::article.article'>
    createdAt: Schema.Attribute.DateTime
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
    locale: Schema.Attribute.String
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::article-category.article-category'>
    publishedAt: Schema.Attribute.DateTime
    slug: Schema.Attribute.UID<'title'> &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    updatedAt: Schema.Attribute.DateTime
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
  }
}

export interface ApiArticleArticle extends Struct.CollectionTypeSchema {
  collectionName: 'articles'
  info: {
    description: ''
    displayName: '\u010Cl\u00E1nky'
    pluralName: 'articles'
    singularName: 'article'
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
    addedAt: Schema.Attribute.DateTime &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
    adminGroups: Schema.Attribute.Relation<'manyToMany', 'api::admin-group.admin-group'>
    alias: Schema.Attribute.UID &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    articleCategory: Schema.Attribute.Relation<
      'manyToOne',
      'api::article-category.article-category'
    >
    content: Schema.Attribute.RichText &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    coverMedia: Schema.Attribute.Media<'images'> &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
    createdAt: Schema.Attribute.DateTime
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
    files: Schema.Attribute.Component<'blocks.file', true> &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    gallery: Schema.Attribute.Media<'images', true> &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
    locale: Schema.Attribute.String
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::article.article'>
    perex: Schema.Attribute.Text &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    publishedAt: Schema.Attribute.DateTime
    slug: Schema.Attribute.UID<'title'> &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    tag: Schema.Attribute.Relation<'manyToOne', 'api::tag.tag'>
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    updatedAt: Schema.Attribute.DateTime
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
  }
}

export interface ApiDocumentCategoryDocumentCategory extends Struct.CollectionTypeSchema {
  collectionName: 'document_categories'
  info: {
    description: ''
    displayName: 'Dokumenty - kateg\u00F3rie'
    pluralName: 'document-categories'
    singularName: 'document-category'
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    createdAt: Schema.Attribute.DateTime
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
    documents: Schema.Attribute.Relation<'oneToMany', 'api::document.document'>
    locale: Schema.Attribute.String & Schema.Attribute.Private
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::document-category.document-category'
    > &
      Schema.Attribute.Private
    publishedAt: Schema.Attribute.DateTime
    slug: Schema.Attribute.UID<'title'> & Schema.Attribute.Required
    title: Schema.Attribute.String & Schema.Attribute.Required
    updatedAt: Schema.Attribute.DateTime
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
  }
}

export interface ApiDocumentDocument extends Struct.CollectionTypeSchema {
  collectionName: 'documents'
  info: {
    description: ''
    displayName: 'Dokumenty'
    pluralName: 'documents'
    singularName: 'document'
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    adminGroups: Schema.Attribute.Relation<'manyToMany', 'api::admin-group.admin-group'>
    createdAt: Schema.Attribute.DateTime
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
    description: Schema.Attribute.Text
    documentCategory: Schema.Attribute.Relation<
      'manyToOne',
      'api::document-category.document-category'
    >
    files: Schema.Attribute.Media<'images' | 'files', true> & Schema.Attribute.Required
    locale: Schema.Attribute.String & Schema.Attribute.Private
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::document.document'> &
      Schema.Attribute.Private
    publishedAt: Schema.Attribute.DateTime
    slug: Schema.Attribute.UID<'title'> & Schema.Attribute.Required
    title: Schema.Attribute.String & Schema.Attribute.Required
    updatedAt: Schema.Attribute.DateTime
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
  }
}

export interface ApiFaqCategoryFaqCategory extends Struct.CollectionTypeSchema {
  collectionName: 'faq_categories'
  info: {
    displayName: 'FAQs kateg\u00F3rie'
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
    createdAt: Schema.Attribute.DateTime
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
    faqs: Schema.Attribute.Relation<'oneToMany', 'api::faq.faq'>
    locale: Schema.Attribute.String
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::faq-category.faq-category'>
    publishedAt: Schema.Attribute.DateTime
    slug: Schema.Attribute.UID<'title'> &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    updatedAt: Schema.Attribute.DateTime
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
  }
}

export interface ApiFaqFaq extends Struct.CollectionTypeSchema {
  collectionName: 'faqs'
  info: {
    displayName: 'FAQs'
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
    adminGroups: Schema.Attribute.Relation<'manyToMany', 'api::admin-group.admin-group'>
    body: Schema.Attribute.RichText &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    createdAt: Schema.Attribute.DateTime
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
    faqCategory: Schema.Attribute.Relation<'manyToOne', 'api::faq-category.faq-category'>
    locale: Schema.Attribute.String
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::faq.faq'>
    publishedAt: Schema.Attribute.DateTime
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    updatedAt: Schema.Attribute.DateTime
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
  }
}

export interface ApiFooterFooter extends Struct.SingleTypeSchema {
  collectionName: 'footers'
  info: {
    description: ''
    displayName: 'P\u00E4ti\u010Dka'
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
    accessibilityPageLink: Schema.Attribute.Component<'blocks.common-link', false> &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    columns: Schema.Attribute.Component<'blocks.footer-column', true> &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    contactText: Schema.Attribute.RichText &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    createdAt: Schema.Attribute.DateTime
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
    facebookUrl: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    innovationsLink: Schema.Attribute.Component<'blocks.common-link', false> &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    instagramUrl: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    linkedinUrl: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    locale: Schema.Attribute.String
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::footer.footer'>
    publishedAt: Schema.Attribute.DateTime
    tiktokUrl: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    updatedAt: Schema.Attribute.DateTime
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
    youtubeUrl: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
  }
}

export interface ApiGeneralGeneral extends Struct.SingleTypeSchema {
  collectionName: 'generals'
  info: {
    description: ''
    displayName: 'V\u0161eobecn\u00E9 + hlavi\u010Dka'
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
    createdAt: Schema.Attribute.DateTime
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
    documentsPage: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>
    header: Schema.Attribute.Component<'general.header', false> &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    inbaPage: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>
    inbaReleasesPage: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>
    locale: Schema.Attribute.String
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::general.general'>
    newsPage: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>
    officialBoardPage: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>
    privacyPolicyPage: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>
    publishedAt: Schema.Attribute.DateTime
    updatedAt: Schema.Attribute.DateTime
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
    vznPage: Schema.Attribute.Relation<'oneToOne', 'api::page.page'>
  }
}

export interface ApiHomepageHomepage extends Struct.SingleTypeSchema {
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
    createdAt: Schema.Attribute.DateTime
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
    eventsSection: Schema.Attribute.Component<'sections.tootoot-events', false> &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    highlights: Schema.Attribute.Component<'sections.homepage-highlights', false> &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    inba: Schema.Attribute.Component<'blocks.in-ba', false> &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    locale: Schema.Attribute.String
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::homepage.homepage'>
    mayorAndCouncil: Schema.Attribute.Component<'sections.homepage-mayor-and-council', false> &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    metaDescription: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    publishedAt: Schema.Attribute.DateTime
    tabs: Schema.Attribute.Component<'sections.homepage-tabs', false> &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    topServices: Schema.Attribute.Component<'sections.top-services', false> &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    updatedAt: Schema.Attribute.DateTime
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
    welcomeHeadline: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    welcomeMedia: Schema.Attribute.Media<'images'> &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
  }
}

export interface ApiInbaArticleInbaArticle extends Struct.CollectionTypeSchema {
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
    content: Schema.Attribute.RichText &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    coverImage: Schema.Attribute.Media<'images'> &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
    createdAt: Schema.Attribute.DateTime
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
    inbaRelease: Schema.Attribute.Relation<'manyToOne', 'api::inba-release.inba-release'>
    inbaTag: Schema.Attribute.Relation<'manyToOne', 'api::inba-tag.inba-tag'>
    locale: Schema.Attribute.String
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::inba-article.inba-article'>
    perex: Schema.Attribute.Text &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    publishedAt: Schema.Attribute.DateTime
    slug: Schema.Attribute.UID<'title'> &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    updatedAt: Schema.Attribute.DateTime
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
  }
}

export interface ApiInbaReleaseInbaRelease extends Struct.CollectionTypeSchema {
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
    coverImage: Schema.Attribute.Media<'images'>
    createdAt: Schema.Attribute.DateTime
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
    files: Schema.Attribute.Component<'blocks.file', true>
    inbaArticles: Schema.Attribute.Relation<'oneToMany', 'api::inba-article.inba-article'>
    locale: Schema.Attribute.String & Schema.Attribute.Private
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::inba-release.inba-release'> &
      Schema.Attribute.Private
    perex: Schema.Attribute.Text
    publishedAt: Schema.Attribute.DateTime
    rearImage: Schema.Attribute.Media<'images'>
    releaseDate: Schema.Attribute.Date & Schema.Attribute.Required
    slug: Schema.Attribute.UID<'title'> & Schema.Attribute.Required
    title: Schema.Attribute.String & Schema.Attribute.Required
    updatedAt: Schema.Attribute.DateTime
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
  }
}

export interface ApiInbaTagInbaTag extends Struct.CollectionTypeSchema {
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
    createdAt: Schema.Attribute.DateTime
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
    inbaArticles: Schema.Attribute.Relation<'oneToMany', 'api::inba-article.inba-article'>
    locale: Schema.Attribute.String
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::inba-tag.inba-tag'>
    publishedAt: Schema.Attribute.DateTime
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    updatedAt: Schema.Attribute.DateTime
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
  }
}

export interface ApiMenuMenu extends Struct.SingleTypeSchema {
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
    createdAt: Schema.Attribute.DateTime
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
    locale: Schema.Attribute.String
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::menu.menu'>
    menus: Schema.Attribute.Component<'menu.menu-item', true> &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }> &
      Schema.Attribute.SetMinMax<
        {
          max: 6
          min: 1
        },
        number
      >
    publishedAt: Schema.Attribute.DateTime
    updatedAt: Schema.Attribute.DateTime
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
  }
}

export interface ApiPageCategoryPageCategory extends Struct.CollectionTypeSchema {
  collectionName: 'page_categories'
  info: {
    description: ''
    displayName: 'Hlavn\u00E9 kateg\u00F3rie'
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
    color: Schema.Attribute.Enumeration<['red', 'blue', 'green', 'yellow', 'purple', 'brown']> &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    createdAt: Schema.Attribute.DateTime
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
    icon: Schema.Attribute.Enumeration<
      [
        'mesto_01',
        'doprava_mapy_02',
        'zp_vystavba_03',
        'socialna_pomoc_04',
        'vzdelavanie_05',
        'kultura_06',
      ]
    > &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    locale: Schema.Attribute.String
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::page-category.page-category'>
    pages: Schema.Attribute.Relation<'oneToMany', 'api::page.page'>
    publishedAt: Schema.Attribute.DateTime
    shortTitle: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    title: Schema.Attribute.Text &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    updatedAt: Schema.Attribute.DateTime
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
  }
}

export interface ApiPagePage extends Struct.CollectionTypeSchema {
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
    adminGroups: Schema.Attribute.Relation<'manyToMany', 'api::admin-group.admin-group'>
    alias: Schema.Attribute.UID &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    childPages: Schema.Attribute.Relation<'oneToMany', 'api::page.page'>
    createdAt: Schema.Attribute.DateTime
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
    headerLinks: Schema.Attribute.Component<'blocks.common-link', true> &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    keywords: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    locale: Schema.Attribute.String
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::page.page'>
    metaDiscription: Schema.Attribute.Text &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    pageBackgroundImage: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    pageCategory: Schema.Attribute.Relation<'manyToOne', 'api::page-category.page-category'>
    pageColor: Schema.Attribute.Enumeration<
      ['red', 'blue', 'green', 'yellow', 'purple', 'brown', 'starz']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
    pageHeaderSections: Schema.Attribute.DynamicZone<
      ['header-sections.event', 'header-sections.facility', 'sections.subpage-list']
    > &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }> &
      Schema.Attribute.SetMinMax<
        {
          max: 1
        },
        number
      >
    parentPage: Schema.Attribute.Relation<'manyToOne', 'api::page.page'>
    publishedAt: Schema.Attribute.DateTime
    relatedContents: Schema.Attribute.Relation<'oneToMany', 'api::tag.tag'>
    sections: Schema.Attribute.DynamicZone<
      [
        'sections.accordion',
        'sections.articles',
        'sections.banner',
        'sections.calculator',
        'sections.columned-text',
        'sections.columns',
        'sections.comparison-section',
        'sections.contacts-section',
        'sections.divider',
        'sections.documents',
        'sections.events',
        'sections.facilities',
        'sections.faqs',
        'sections.faq-categories',
        'sections.file-list',
        'sections.gallery',
        'sections.iframe',
        'sections.inba-articles-list',
        'sections.inba-releases',
        'sections.links',
        'sections.narrow-text',
        'sections.newsletter',
        'sections.numbers-overview',
        'sections.numerical-list',
        'sections.official-board',
        'sections.organizational-structure',
        'sections.opening-hours',
        'sections.partners',
        'sections.pros-and-cons-section',
        'sections.regulations',
        'sections.starz-landing-page',
        'sections.text-with-image',
        'sections.text-with-image-overlapped',
        'sections.tootoot-events',
        'sections.videos',
      ]
    > &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    showTableOfContents: Schema.Attribute.Boolean &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }> &
      Schema.Attribute.DefaultTo<false>
    sidebar: Schema.Attribute.DynamicZone<['sidebars.empty-sidebar']> &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }> &
      Schema.Attribute.SetMinMax<
        {
          max: 1
        },
        number
      >
    slug: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    subnavigation: Schema.Attribute.Component<'sections.subnavigation', false> &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    subtext: Schema.Attribute.Text &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    updatedAt: Schema.Attribute.DateTime
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
  }
}

export interface ApiRegulationRegulation extends Struct.CollectionTypeSchema {
  collectionName: 'regulations'
  info: {
    description: ''
    displayName: 'V\u0161eobecne z\u00E1v\u00E4zn\u00E9 nariadenia'
    pluralName: 'regulations'
    singularName: 'regulation'
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    amending: Schema.Attribute.Relation<'manyToMany', 'api::regulation.regulation'>
    amendments: Schema.Attribute.Relation<'manyToMany', 'api::regulation.regulation'>
    attachments: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios', true>
    cancellation: Schema.Attribute.Relation<'manyToOne', 'api::regulation.regulation'>
    cancelling: Schema.Attribute.Relation<'oneToMany', 'api::regulation.regulation'>
    category: Schema.Attribute.Enumeration<
      [
        'daneAPoplatky',
        'pomenovanieUlic',
        'hospodarenie',
        'uzemnePlanovanie',
        'poriadokACistota',
        'socialnaPomocASkolstvo',
        'ostatne',
        'archiv',
      ]
    > &
      Schema.Attribute.Required
    createdAt: Schema.Attribute.DateTime
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
    effectiveFrom: Schema.Attribute.Date & Schema.Attribute.Required
    fullTitle: Schema.Attribute.Text & Schema.Attribute.Required
    isFullTextRegulation: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>
    locale: Schema.Attribute.String & Schema.Attribute.Private
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::regulation.regulation'> &
      Schema.Attribute.Private
    mainDocument: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.Required
    publishedAt: Schema.Attribute.DateTime
    regNumber: Schema.Attribute.String & Schema.Attribute.Required & Schema.Attribute.Unique
    slug: Schema.Attribute.UID<'regNumber'> & Schema.Attribute.Required
    titleText: Schema.Attribute.String
    updatedAt: Schema.Attribute.DateTime
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
  }
}

export interface ApiTagTag extends Struct.CollectionTypeSchema {
  collectionName: 'tags'
  info: {
    description: ''
    displayName: '\u010Cl\u00E1nky - t\u00E9my'
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
    articles: Schema.Attribute.Relation<'oneToMany', 'api::article.article'>
    createdAt: Schema.Attribute.DateTime
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
    locale: Schema.Attribute.String
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::tag.tag'>
    pageCategory: Schema.Attribute.Relation<'oneToOne', 'api::page-category.page-category'>
    publishedAt: Schema.Attribute.DateTime
    title: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    updatedAt: Schema.Attribute.DateTime
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
  }
}

export interface ApiTaxAdministratorsListTaxAdministratorsList extends Struct.SingleTypeSchema {
  collectionName: 'tax_administrators_lists'
  info: {
    description: ''
    displayName: 'Zoznam spr\u00E1vcov dan\u00ED'
    pluralName: 'tax-administrators-lists'
    singularName: 'tax-administrators-list'
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    createdAt: Schema.Attribute.DateTime
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
    locale: Schema.Attribute.String & Schema.Attribute.Private
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::tax-administrators-list.tax-administrators-list'
    > &
      Schema.Attribute.Private
    publishedAt: Schema.Attribute.DateTime
    taxAdministrators: Schema.Attribute.Component<'tax-administrators.tax-administrator', true> &
      Schema.Attribute.Required
    updatedAt: Schema.Attribute.DateTime
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
  }
}

export interface PluginContentReleasesRelease extends Struct.CollectionTypeSchema {
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
    actions: Schema.Attribute.Relation<'oneToMany', 'plugin::content-releases.release-action'>
    createdAt: Schema.Attribute.DateTime
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
    locale: Schema.Attribute.String & Schema.Attribute.Private
    localizations: Schema.Attribute.Relation<'oneToMany', 'plugin::content-releases.release'> &
      Schema.Attribute.Private
    name: Schema.Attribute.String & Schema.Attribute.Required
    publishedAt: Schema.Attribute.DateTime
    releasedAt: Schema.Attribute.DateTime
    scheduledAt: Schema.Attribute.DateTime
    status: Schema.Attribute.Enumeration<['ready', 'blocked', 'failed', 'done', 'empty']> &
      Schema.Attribute.Required
    timezone: Schema.Attribute.String
    updatedAt: Schema.Attribute.DateTime
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
  }
}

export interface PluginContentReleasesReleaseAction extends Struct.CollectionTypeSchema {
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
    contentType: Schema.Attribute.String & Schema.Attribute.Required
    createdAt: Schema.Attribute.DateTime
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
    entryDocumentId: Schema.Attribute.String
    isEntryValid: Schema.Attribute.Boolean
    locale: Schema.Attribute.String & Schema.Attribute.Private
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    > &
      Schema.Attribute.Private
    publishedAt: Schema.Attribute.DateTime
    release: Schema.Attribute.Relation<'manyToOne', 'plugin::content-releases.release'>
    type: Schema.Attribute.Enumeration<['publish', 'unpublish']> & Schema.Attribute.Required
    updatedAt: Schema.Attribute.DateTime
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
  }
}

export interface PluginI18NLocale extends Struct.CollectionTypeSchema {
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
    code: Schema.Attribute.String & Schema.Attribute.Unique
    createdAt: Schema.Attribute.DateTime
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
    locale: Schema.Attribute.String & Schema.Attribute.Private
    localizations: Schema.Attribute.Relation<'oneToMany', 'plugin::i18n.locale'> &
      Schema.Attribute.Private
    name: Schema.Attribute.String &
      Schema.Attribute.SetMinMax<
        {
          max: 50
          min: 1
        },
        number
      >
    publishedAt: Schema.Attribute.DateTime
    updatedAt: Schema.Attribute.DateTime
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
  }
}

export interface PluginReviewWorkflowsWorkflow extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows'
  info: {
    description: ''
    displayName: 'Workflow'
    name: 'Workflow'
    pluralName: 'workflows'
    singularName: 'workflow'
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
    contentTypes: Schema.Attribute.JSON &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'[]'>
    createdAt: Schema.Attribute.DateTime
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
    locale: Schema.Attribute.String & Schema.Attribute.Private
    localizations: Schema.Attribute.Relation<'oneToMany', 'plugin::review-workflows.workflow'> &
      Schema.Attribute.Private
    name: Schema.Attribute.String & Schema.Attribute.Required & Schema.Attribute.Unique
    publishedAt: Schema.Attribute.DateTime
    stageRequiredToPublish: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::review-workflows.workflow-stage'
    >
    stages: Schema.Attribute.Relation<'oneToMany', 'plugin::review-workflows.workflow-stage'>
    updatedAt: Schema.Attribute.DateTime
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
  }
}

export interface PluginReviewWorkflowsWorkflowStage extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows_stages'
  info: {
    description: ''
    displayName: 'Stages'
    name: 'Workflow Stage'
    pluralName: 'workflow-stages'
    singularName: 'workflow-stage'
  }
  options: {
    draftAndPublish: false
    version: '1.1.0'
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
    color: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#4945FF'>
    createdAt: Schema.Attribute.DateTime
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
    locale: Schema.Attribute.String & Schema.Attribute.Private
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    > &
      Schema.Attribute.Private
    name: Schema.Attribute.String
    permissions: Schema.Attribute.Relation<'manyToMany', 'admin::permission'>
    publishedAt: Schema.Attribute.DateTime
    updatedAt: Schema.Attribute.DateTime
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
    workflow: Schema.Attribute.Relation<'manyToOne', 'plugin::review-workflows.workflow'>
  }
}

export interface PluginUploadFile extends Struct.CollectionTypeSchema {
  collectionName: 'files'
  info: {
    description: ''
    displayName: 'File'
    pluralName: 'files'
    singularName: 'file'
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
    alternativeText: Schema.Attribute.String
    caption: Schema.Attribute.String
    createdAt: Schema.Attribute.DateTime
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
    ext: Schema.Attribute.String
    folder: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'> &
      Schema.Attribute.Private
    folderPath: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    formats: Schema.Attribute.JSON
    hash: Schema.Attribute.String & Schema.Attribute.Required
    height: Schema.Attribute.Integer
    locale: Schema.Attribute.String & Schema.Attribute.Private
    localizations: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.file'> &
      Schema.Attribute.Private
    mime: Schema.Attribute.String & Schema.Attribute.Required
    name: Schema.Attribute.String & Schema.Attribute.Required
    previewUrl: Schema.Attribute.String
    provider: Schema.Attribute.String & Schema.Attribute.Required
    provider_metadata: Schema.Attribute.JSON
    publishedAt: Schema.Attribute.DateTime
    related: Schema.Attribute.Relation<'morphToMany'>
    size: Schema.Attribute.Decimal & Schema.Attribute.Required
    updatedAt: Schema.Attribute.DateTime
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
    url: Schema.Attribute.String & Schema.Attribute.Required
    width: Schema.Attribute.Integer
  }
}

export interface PluginUploadFolder extends Struct.CollectionTypeSchema {
  collectionName: 'upload_folders'
  info: {
    displayName: 'Folder'
    pluralName: 'folders'
    singularName: 'folder'
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
    children: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.folder'>
    createdAt: Schema.Attribute.DateTime
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
    files: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.file'>
    locale: Schema.Attribute.String & Schema.Attribute.Private
    localizations: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.folder'> &
      Schema.Attribute.Private
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    parent: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'>
    path: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    pathId: Schema.Attribute.Integer & Schema.Attribute.Required & Schema.Attribute.Unique
    publishedAt: Schema.Attribute.DateTime
    updatedAt: Schema.Attribute.DateTime
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
  }
}

export interface PluginUsersPermissionsPermission extends Struct.CollectionTypeSchema {
  collectionName: 'up_permissions'
  info: {
    description: ''
    displayName: 'Permission'
    name: 'permission'
    pluralName: 'permissions'
    singularName: 'permission'
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
    action: Schema.Attribute.String & Schema.Attribute.Required
    createdAt: Schema.Attribute.DateTime
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
    locale: Schema.Attribute.String & Schema.Attribute.Private
    localizations: Schema.Attribute.Relation<'oneToMany', 'plugin::users-permissions.permission'> &
      Schema.Attribute.Private
    publishedAt: Schema.Attribute.DateTime
    role: Schema.Attribute.Relation<'manyToOne', 'plugin::users-permissions.role'>
    updatedAt: Schema.Attribute.DateTime
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
  }
}

export interface PluginUsersPermissionsRole extends Struct.CollectionTypeSchema {
  collectionName: 'up_roles'
  info: {
    description: ''
    displayName: 'Role'
    name: 'role'
    pluralName: 'roles'
    singularName: 'role'
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
    createdAt: Schema.Attribute.DateTime
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
    description: Schema.Attribute.String
    locale: Schema.Attribute.String & Schema.Attribute.Private
    localizations: Schema.Attribute.Relation<'oneToMany', 'plugin::users-permissions.role'> &
      Schema.Attribute.Private
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3
      }>
    permissions: Schema.Attribute.Relation<'oneToMany', 'plugin::users-permissions.permission'>
    publishedAt: Schema.Attribute.DateTime
    type: Schema.Attribute.String & Schema.Attribute.Unique
    updatedAt: Schema.Attribute.DateTime
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
    users: Schema.Attribute.Relation<'oneToMany', 'plugin::users-permissions.user'>
  }
}

export interface PluginUsersPermissionsUser extends Struct.CollectionTypeSchema {
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
  attributes: {
    blocked: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>
    confirmationToken: Schema.Attribute.String & Schema.Attribute.Private
    confirmed: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>
    createdAt: Schema.Attribute.DateTime
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6
      }>
    locale: Schema.Attribute.String & Schema.Attribute.Private
    localizations: Schema.Attribute.Relation<'oneToMany', 'plugin::users-permissions.user'> &
      Schema.Attribute.Private
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6
      }>
    provider: Schema.Attribute.String
    publishedAt: Schema.Attribute.DateTime
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private
    role: Schema.Attribute.Relation<'manyToOne', 'plugin::users-permissions.role'>
    updatedAt: Schema.Attribute.DateTime
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> & Schema.Attribute.Private
    username: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3
      }>
  }
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ContentTypeSchemas {
      'admin::api-token': AdminApiToken
      'admin::api-token-permission': AdminApiTokenPermission
      'admin::permission': AdminPermission
      'admin::role': AdminRole
      'admin::transfer-token': AdminTransferToken
      'admin::transfer-token-permission': AdminTransferTokenPermission
      'admin::user': AdminUser
      'api::admin-group.admin-group': ApiAdminGroupAdminGroup
      'api::alert.alert': ApiAlertAlert
      'api::article-category.article-category': ApiArticleCategoryArticleCategory
      'api::article.article': ApiArticleArticle
      'api::document-category.document-category': ApiDocumentCategoryDocumentCategory
      'api::document.document': ApiDocumentDocument
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
      'api::page.page': ApiPagePage
      'api::regulation.regulation': ApiRegulationRegulation
      'api::tag.tag': ApiTagTag
      'api::tax-administrators-list.tax-administrators-list': ApiTaxAdministratorsListTaxAdministratorsList
      'plugin::content-releases.release': PluginContentReleasesRelease
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction
      'plugin::i18n.locale': PluginI18NLocale
      'plugin::review-workflows.workflow': PluginReviewWorkflowsWorkflow
      'plugin::review-workflows.workflow-stage': PluginReviewWorkflowsWorkflowStage
      'plugin::upload.file': PluginUploadFile
      'plugin::upload.folder': PluginUploadFolder
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission
      'plugin::users-permissions.role': PluginUsersPermissionsRole
      'plugin::users-permissions.user': PluginUsersPermissionsUser
    }
  }
}
