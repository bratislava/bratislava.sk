import type { Schema, Attribute } from '@strapi/strapi'

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions'
  info: {
    name: 'Permission'
    description: ''
    singularName: 'permission'
    pluralName: 'permissions'
    displayName: 'Permission'
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
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    properties: Attribute.JSON & Attribute.DefaultTo<{}>
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<'admin::permission', 'oneToOne', 'admin::user'> &
      Attribute.Private
    updatedBy: Attribute.Relation<'admin::permission', 'oneToOne', 'admin::user'> &
      Attribute.Private
  }
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users'
  info: {
    name: 'User'
    description: ''
    singularName: 'user'
    pluralName: 'users'
    displayName: 'User'
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
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    username: Attribute.String
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6
      }>
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6
      }>
    resetPasswordToken: Attribute.String & Attribute.Private
    registrationToken: Attribute.String & Attribute.Private
    isActive: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> & Attribute.Private
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>
    preferedLanguage: Attribute.String
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> & Attribute.Private
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> & Attribute.Private
  }
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles'
  info: {
    name: 'Role'
    description: ''
    singularName: 'role'
    pluralName: 'roles'
    displayName: 'Role'
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
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    description: Attribute.String
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>
    permissions: Attribute.Relation<'admin::role', 'oneToMany', 'admin::permission'>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> & Attribute.Private
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> & Attribute.Private
  }
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens'
  info: {
    name: 'Api Token'
    singularName: 'api-token'
    pluralName: 'api-tokens'
    displayName: 'Api Token'
    description: ''
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
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }> &
      Attribute.DefaultTo<''>
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    lastUsedAt: Attribute.DateTime
    permissions: Attribute.Relation<'admin::api-token', 'oneToMany', 'admin::api-token-permission'>
    expiresAt: Attribute.DateTime
    lifespan: Attribute.BigInteger
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<'admin::api-token', 'oneToOne', 'admin::user'> & Attribute.Private
    updatedBy: Attribute.Relation<'admin::api-token', 'oneToOne', 'admin::user'> & Attribute.Private
  }
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions'
  info: {
    name: 'API Token Permission'
    description: ''
    singularName: 'api-token-permission'
    pluralName: 'api-token-permissions'
    displayName: 'API Token Permission'
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
    token: Attribute.Relation<'admin::api-token-permission', 'manyToOne', 'admin::api-token'>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<'admin::api-token-permission', 'oneToOne', 'admin::user'> &
      Attribute.Private
    updatedBy: Attribute.Relation<'admin::api-token-permission', 'oneToOne', 'admin::user'> &
      Attribute.Private
  }
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens'
  info: {
    name: 'Transfer Token'
    singularName: 'transfer-token'
    pluralName: 'transfer-tokens'
    displayName: 'Transfer Token'
    description: ''
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
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }> &
      Attribute.DefaultTo<''>
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    lastUsedAt: Attribute.DateTime
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >
    expiresAt: Attribute.DateTime
    lifespan: Attribute.BigInteger
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<'admin::transfer-token', 'oneToOne', 'admin::user'> &
      Attribute.Private
    updatedBy: Attribute.Relation<'admin::transfer-token', 'oneToOne', 'admin::user'> &
      Attribute.Private
  }
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions'
  info: {
    name: 'Transfer Token Permission'
    description: ''
    singularName: 'transfer-token-permission'
    pluralName: 'transfer-token-permissions'
    displayName: 'Transfer Token Permission'
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
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<'admin::transfer-token-permission', 'oneToOne', 'admin::user'> &
      Attribute.Private
    updatedBy: Attribute.Relation<'admin::transfer-token-permission', 'oneToOne', 'admin::user'> &
      Attribute.Private
  }
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files'
  info: {
    singularName: 'file'
    pluralName: 'files'
    displayName: 'File'
    description: ''
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
    name: Attribute.String & Attribute.Required
    alternativeText: Attribute.String
    caption: Attribute.String
    width: Attribute.Integer
    height: Attribute.Integer
    formats: Attribute.JSON
    hash: Attribute.String & Attribute.Required
    ext: Attribute.String
    mime: Attribute.String & Attribute.Required
    size: Attribute.Decimal & Attribute.Required
    url: Attribute.String & Attribute.Required
    previewUrl: Attribute.String
    provider: Attribute.String & Attribute.Required
    provider_metadata: Attribute.JSON
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>
    folder: Attribute.Relation<'plugin::upload.file', 'manyToOne', 'plugin::upload.folder'> &
      Attribute.Private
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<{
        min: 1
      }>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<'plugin::upload.file', 'oneToOne', 'admin::user'> &
      Attribute.Private
    updatedBy: Attribute.Relation<'plugin::upload.file', 'oneToOne', 'admin::user'> &
      Attribute.Private
  }
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders'
  info: {
    singularName: 'folder'
    pluralName: 'folders'
    displayName: 'Folder'
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
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1
      }>
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique
    parent: Attribute.Relation<'plugin::upload.folder', 'manyToOne', 'plugin::upload.folder'>
    children: Attribute.Relation<'plugin::upload.folder', 'oneToMany', 'plugin::upload.folder'>
    files: Attribute.Relation<'plugin::upload.folder', 'oneToMany', 'plugin::upload.file'>
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1
      }>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<'plugin::upload.folder', 'oneToOne', 'admin::user'> &
      Attribute.Private
    updatedBy: Attribute.Relation<'plugin::upload.folder', 'oneToOne', 'admin::user'> &
      Attribute.Private
  }
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale'
  info: {
    singularName: 'locale'
    pluralName: 'locales'
    collectionName: 'locales'
    displayName: 'Locale'
    description: ''
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
    name: Attribute.String &
      Attribute.SetMinMax<{
        min: 1
        max: 50
      }>
    code: Attribute.String & Attribute.Unique
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<'plugin::i18n.locale', 'oneToOne', 'admin::user'> &
      Attribute.Private
    updatedBy: Attribute.Relation<'plugin::i18n.locale', 'oneToOne', 'admin::user'> &
      Attribute.Private
  }
}

export interface PluginUsersPermissionsPermission extends Schema.CollectionType {
  collectionName: 'up_permissions'
  info: {
    name: 'permission'
    description: ''
    singularName: 'permission'
    pluralName: 'permissions'
    displayName: 'Permission'
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
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
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
    name: 'role'
    description: ''
    singularName: 'role'
    pluralName: 'roles'
    displayName: 'Role'
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
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3
      }>
    description: Attribute.String
    type: Attribute.String & Attribute.Unique
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<'plugin::users-permissions.role', 'oneToOne', 'admin::user'> &
      Attribute.Private
    updatedBy: Attribute.Relation<'plugin::users-permissions.role', 'oneToOne', 'admin::user'> &
      Attribute.Private
  }
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users'
  info: {
    name: 'user'
    description: ''
    singularName: 'user'
    pluralName: 'users'
    displayName: 'User'
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
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3
      }>
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6
      }>
    provider: Attribute.String
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6
      }>
    resetPasswordToken: Attribute.String & Attribute.Private
    confirmationToken: Attribute.String & Attribute.Private
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >
    posts: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'api::blog-post.blog-post'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<'plugin::users-permissions.user', 'oneToOne', 'admin::user'> &
      Attribute.Private
    updatedBy: Attribute.Relation<'plugin::users-permissions.user', 'oneToOne', 'admin::user'> &
      Attribute.Private
  }
}

export interface ApiAlertAlert extends Schema.SingleType {
  collectionName: 'alerts'
  info: {
    singularName: 'alert'
    pluralName: 'alerts'
    displayName: 'Alert'
    description: ''
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
    text: Attribute.RichText &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<'api::alert.alert', 'oneToOne', 'admin::user'> & Attribute.Private
    updatedBy: Attribute.Relation<'api::alert.alert', 'oneToOne', 'admin::user'> & Attribute.Private
    localizations: Attribute.Relation<'api::alert.alert', 'oneToMany', 'api::alert.alert'>
    locale: Attribute.String
  }
}

export interface ApiBlogPostBlogPost extends Schema.CollectionType {
  collectionName: 'blog_posts'
  info: {
    singularName: 'blog-post'
    pluralName: 'blog-posts'
    displayName: '\u010Cl\u00E1nky'
    description: ''
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
    title: Attribute.Text &
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
    coverImage: Attribute.Media &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    slug: Attribute.UID<'api::blog-post.blog-post', 'title'>
    date_added: Attribute.DateTime &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    author: Attribute.Relation<
      'api::blog-post.blog-post',
      'oneToOne',
      'plugin::users-permissions.user'
    >
    tag: Attribute.Relation<'api::blog-post.blog-post', 'oneToOne', 'api::tag.tag'>
    moreLink: Attribute.Component<'blocks.blog-post-link'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
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
    addedAt: Attribute.DateTime &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<'api::blog-post.blog-post', 'oneToOne', 'admin::user'> &
      Attribute.Private
    updatedBy: Attribute.Relation<'api::blog-post.blog-post', 'oneToOne', 'admin::user'> &
      Attribute.Private
    localizations: Attribute.Relation<
      'api::blog-post.blog-post',
      'oneToMany',
      'api::blog-post.blog-post'
    >
    locale: Attribute.String
  }
}

export interface ApiFaqFaq extends Schema.CollectionType {
  collectionName: 'faqs'
  info: {
    singularName: 'faq'
    pluralName: 'faqs'
    displayName: 'faq'
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
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    body: Attribute.RichText &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    faqCategory: Attribute.Relation<'api::faq.faq', 'manyToOne', 'api::faq-category.faq-category'>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<'api::faq.faq', 'oneToOne', 'admin::user'> & Attribute.Private
    updatedBy: Attribute.Relation<'api::faq.faq', 'oneToOne', 'admin::user'> & Attribute.Private
    localizations: Attribute.Relation<'api::faq.faq', 'oneToMany', 'api::faq.faq'>
    locale: Attribute.String
  }
}

export interface ApiFaqCategoryFaqCategory extends Schema.CollectionType {
  collectionName: 'faq_categories'
  info: {
    singularName: 'faq-category'
    pluralName: 'faq-categories'
    displayName: 'faq category'
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
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    slug: Attribute.UID<'api::faq-category.faq-category', 'title'> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    faqs: Attribute.Relation<'api::faq-category.faq-category', 'oneToMany', 'api::faq.faq'>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<'api::faq-category.faq-category', 'oneToOne', 'admin::user'> &
      Attribute.Private
    updatedBy: Attribute.Relation<'api::faq-category.faq-category', 'oneToOne', 'admin::user'> &
      Attribute.Private
    localizations: Attribute.Relation<
      'api::faq-category.faq-category',
      'oneToMany',
      'api::faq-category.faq-category'
    >
    locale: Attribute.String
  }
}

export interface ApiFooterFooter extends Schema.SingleType {
  collectionName: 'footers'
  info: {
    singularName: 'footer'
    pluralName: 'footers'
    displayName: 'Footer'
    description: ''
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
    address: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    facebookUrl: Attribute.String &
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
    columns: Attribute.Component<'blocks.footer-column', true> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    accessibilityPageLink: Attribute.Component<'blocks.common-link'> &
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
    contacts: Attribute.Component<'blocks.footer-contact-item', true> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<'api::footer.footer', 'oneToOne', 'admin::user'> &
      Attribute.Private
    updatedBy: Attribute.Relation<'api::footer.footer', 'oneToOne', 'admin::user'> &
      Attribute.Private
    localizations: Attribute.Relation<'api::footer.footer', 'oneToMany', 'api::footer.footer'>
    locale: Attribute.String
  }
}

export interface ApiGeneralGeneral extends Schema.SingleType {
  collectionName: 'generals'
  info: {
    singularName: 'general'
    pluralName: 'generals'
    displayName: 'General'
    description: ''
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
    header: Attribute.Component<'general.header'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    privacyPolicyPage: Attribute.Relation<'api::general.general', 'oneToOne', 'api::page.page'>
    officialBoardPage: Attribute.Relation<'api::general.general', 'oneToOne', 'api::page.page'>
    newsPage: Attribute.Relation<'api::general.general', 'oneToOne', 'api::page.page'>
    vznPage: Attribute.Relation<'api::general.general', 'oneToOne', 'api::page.page'>
    inbaPage: Attribute.Relation<'api::general.general', 'oneToOne', 'api::page.page'>
    inbaReleasesPage: Attribute.Relation<'api::general.general', 'oneToOne', 'api::page.page'>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<'api::general.general', 'oneToOne', 'admin::user'> &
      Attribute.Private
    updatedBy: Attribute.Relation<'api::general.general', 'oneToOne', 'admin::user'> &
      Attribute.Private
    localizations: Attribute.Relation<'api::general.general', 'oneToMany', 'api::general.general'>
    locale: Attribute.String
  }
}

export interface ApiHomepageHomepage extends Schema.SingleType {
  collectionName: 'homepages'
  info: {
    singularName: 'homepage'
    pluralName: 'homepages'
    displayName: 'Homepage'
    description: ''
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
    metaTitle: Attribute.String &
      Attribute.Required &
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
    welcomeHeadline: Attribute.Text &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    welcomeMedia: Attribute.Media &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
    highlights: Attribute.Component<'sections.homepage-highlights'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    tabs: Attribute.Component<'sections.homepage-tabs'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    mayorAndCouncil: Attribute.Component<'sections.homepage-mayor-and-council'> &
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
    inba: Attribute.Component<'blocks.in-ba'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    inbaFrontImage: Attribute.Media &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
    inbaRearImage: Attribute.Media &
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
    eventsSection: Attribute.Component<'sections.homepage-events'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<'api::homepage.homepage', 'oneToOne', 'admin::user'> &
      Attribute.Private
    updatedBy: Attribute.Relation<'api::homepage.homepage', 'oneToOne', 'admin::user'> &
      Attribute.Private
    localizations: Attribute.Relation<
      'api::homepage.homepage',
      'oneToMany',
      'api::homepage.homepage'
    >
    locale: Attribute.String
  }
}

export interface ApiInbaArticleInbaArticle extends Schema.CollectionType {
  collectionName: 'inba_articles'
  info: {
    singularName: 'inba-article'
    pluralName: 'inba-articles'
    displayName: 'in.ba \u010Dl\u00E1nky'
    description: ''
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
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    slug: Attribute.UID<'api::inba-article.inba-article', 'title'> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    coverImage: Attribute.Media &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
    inbaTag: Attribute.Relation<
      'api::inba-article.inba-article',
      'manyToOne',
      'api::inba-tag.inba-tag'
    >
    inbaRelease: Attribute.Relation<
      'api::inba-article.inba-article',
      'manyToOne',
      'api::inba-release.inba-release'
    >
    perex: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    content: Attribute.RichText &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<'api::inba-article.inba-article', 'oneToOne', 'admin::user'> &
      Attribute.Private
    updatedBy: Attribute.Relation<'api::inba-article.inba-article', 'oneToOne', 'admin::user'> &
      Attribute.Private
    localizations: Attribute.Relation<
      'api::inba-article.inba-article',
      'oneToMany',
      'api::inba-article.inba-article'
    >
    locale: Attribute.String
  }
}

export interface ApiInbaReleaseInbaRelease extends Schema.CollectionType {
  collectionName: 'inba_releases'
  info: {
    singularName: 'inba-release'
    pluralName: 'inba-releases'
    displayName: 'in.ba vydania'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    title: Attribute.String & Attribute.Required
    slug: Attribute.UID<'api::inba-release.inba-release', 'title'> & Attribute.Required
    releaseDate: Attribute.Date & Attribute.Required
    perex: Attribute.Text
    coverImage: Attribute.Media
    rearImage: Attribute.Media
    files: Attribute.Component<'blocks.file-item', true> &
      Attribute.SetMinMax<{
        min: 1
      }>
    inbaArticles: Attribute.Relation<
      'api::inba-release.inba-release',
      'oneToMany',
      'api::inba-article.inba-article'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<'api::inba-release.inba-release', 'oneToOne', 'admin::user'> &
      Attribute.Private
    updatedBy: Attribute.Relation<'api::inba-release.inba-release', 'oneToOne', 'admin::user'> &
      Attribute.Private
  }
}

export interface ApiInbaTagInbaTag extends Schema.CollectionType {
  collectionName: 'inba_tags'
  info: {
    singularName: 'inba-tag'
    pluralName: 'inba-tags'
    displayName: 'in.ba tagy'
    description: ''
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
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    inbaArticles: Attribute.Relation<
      'api::inba-tag.inba-tag',
      'oneToMany',
      'api::inba-article.inba-article'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<'api::inba-tag.inba-tag', 'oneToOne', 'admin::user'> &
      Attribute.Private
    updatedBy: Attribute.Relation<'api::inba-tag.inba-tag', 'oneToOne', 'admin::user'> &
      Attribute.Private
    localizations: Attribute.Relation<
      'api::inba-tag.inba-tag',
      'oneToMany',
      'api::inba-tag.inba-tag'
    >
    locale: Attribute.String
  }
}

export interface ApiMenuMenu extends Schema.SingleType {
  collectionName: 'menus'
  info: {
    singularName: 'menu'
    pluralName: 'menus'
    displayName: 'Menu'
    description: ''
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
    menus: Attribute.Component<'menu.menu-item', true> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }> &
      Attribute.SetMinMax<{
        min: 1
        max: 6
      }>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<'api::menu.menu', 'oneToOne', 'admin::user'> & Attribute.Private
    updatedBy: Attribute.Relation<'api::menu.menu', 'oneToOne', 'admin::user'> & Attribute.Private
    localizations: Attribute.Relation<'api::menu.menu', 'oneToMany', 'api::menu.menu'>
    locale: Attribute.String
  }
}

export interface ApiPagePage extends Schema.CollectionType {
  collectionName: 'pages'
  info: {
    singularName: 'page'
    pluralName: 'pages'
    displayName: 'Str\u00E1nky'
    description: ''
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
    title: Attribute.Text &
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
    metaDiscription: Attribute.Text &
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
    pageBackgroundImage: Attribute.Media &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    headerLinks: Attribute.Component<'blocks.common-link', true> &
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
    parentPage: Attribute.Relation<'api::page.page', 'manyToOne', 'api::page.page'>
    childPages: Attribute.Relation<'api::page.page', 'oneToMany', 'api::page.page'>
    relatedContents: Attribute.Relation<'api::page.page', 'oneToMany', 'api::tag.tag'>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<'api::page.page', 'oneToOne', 'admin::user'> & Attribute.Private
    updatedBy: Attribute.Relation<'api::page.page', 'oneToOne', 'admin::user'> & Attribute.Private
    localizations: Attribute.Relation<'api::page.page', 'oneToMany', 'api::page.page'>
    locale: Attribute.String
  }
}

export interface ApiPageCategoryPageCategory extends Schema.CollectionType {
  collectionName: 'page_categories'
  info: {
    singularName: 'page-category'
    pluralName: 'page-categories'
    displayName: 'Kateg\u00F3rie'
    description: ''
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
    title: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    shortTitle: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    color: Attribute.Enumeration<['red', 'blue', 'green', 'yellow', 'purple', 'brown']> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
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
    pages: Attribute.Relation<'api::page-category.page-category', 'oneToMany', 'api::page.page'>
    subcategories: Attribute.Relation<
      'api::page-category.page-category',
      'oneToMany',
      'api::page-subcategory.page-subcategory'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<'api::page-category.page-category', 'oneToOne', 'admin::user'> &
      Attribute.Private
    updatedBy: Attribute.Relation<'api::page-category.page-category', 'oneToOne', 'admin::user'> &
      Attribute.Private
    localizations: Attribute.Relation<
      'api::page-category.page-category',
      'oneToMany',
      'api::page-category.page-category'
    >
    locale: Attribute.String
  }
}

export interface ApiPageSubcategoryPageSubcategory extends Schema.CollectionType {
  collectionName: 'page_subcategories'
  info: {
    singularName: 'page-subcategory'
    pluralName: 'page-subcategories'
    displayName: 'Podkateg\u00F3rie'
    description: ''
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
    title: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
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
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::page-subcategory.page-subcategory',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::page-subcategory.page-subcategory',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    localizations: Attribute.Relation<
      'api::page-subcategory.page-subcategory',
      'oneToMany',
      'api::page-subcategory.page-subcategory'
    >
    locale: Attribute.String
  }
}

export interface ApiRegulationRegulation extends Schema.CollectionType {
  collectionName: 'regulations'
  info: {
    singularName: 'regulation'
    pluralName: 'regulations'
    displayName: 'Regulation'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    regNumber: Attribute.String & Attribute.Required & Attribute.Unique
    slug: Attribute.UID<'api::regulation.regulation', 'regNumber'> & Attribute.Required
    titleText: Attribute.String
    fullTitle: Attribute.Text & Attribute.Required
    effectiveFrom: Attribute.Date & Attribute.Required
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
    isFullTextRegulation: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<false>
    mainDocument: Attribute.Media & Attribute.Required
    attachments: Attribute.Media
    amendments: Attribute.Relation<
      'api::regulation.regulation',
      'manyToMany',
      'api::regulation.regulation'
    >
    amending: Attribute.Relation<
      'api::regulation.regulation',
      'manyToMany',
      'api::regulation.regulation'
    >
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
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<'api::regulation.regulation', 'oneToOne', 'admin::user'> &
      Attribute.Private
    updatedBy: Attribute.Relation<'api::regulation.regulation', 'oneToOne', 'admin::user'> &
      Attribute.Private
  }
}

export interface ApiTagTag extends Schema.CollectionType {
  collectionName: 'tags'
  info: {
    singularName: 'tag'
    pluralName: 'tags'
    displayName: 'Tagy'
    description: ''
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
    title: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    pageCategory: Attribute.Relation<'api::tag.tag', 'oneToOne', 'api::page-category.page-category'>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<'api::tag.tag', 'oneToOne', 'admin::user'> & Attribute.Private
    updatedBy: Attribute.Relation<'api::tag.tag', 'oneToOne', 'admin::user'> & Attribute.Private
    localizations: Attribute.Relation<'api::tag.tag', 'oneToMany', 'api::tag.tag'>
    locale: Attribute.String
  }
}

export interface ApiTaxAdministratorsListTaxAdministratorsList extends Schema.SingleType {
  collectionName: 'tax_administrators_lists'
  info: {
    singularName: 'tax-administrators-list'
    pluralName: 'tax-administrators-lists'
    displayName: 'Tax administrators list'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    taxAdministrators: Attribute.Component<'tax-administrators.tax-administrator', true> &
      Attribute.Required
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::tax-administrators-list.tax-administrators-list',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
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
    singularName: 'vzn'
    pluralName: 'vzns'
    displayName: 'VZN'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    title: Attribute.String
    details: Attribute.RichText
    mainDocument: Attribute.Media
    validFrom: Attribute.Date
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
    consolidatedText: Attribute.Media
    cancellationDocument: Attribute.Component<'blocks.doc-list-extensions', true>
    amedmentDocument: Attribute.Component<'blocks.doc-list-extensions', true>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<'api::vzn.vzn', 'oneToOne', 'admin::user'> & Attribute.Private
    updatedBy: Attribute.Relation<'api::vzn.vzn', 'oneToOne', 'admin::user'> & Attribute.Private
  }
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission
      'admin::user': AdminUser
      'admin::role': AdminRole
      'admin::api-token': AdminApiToken
      'admin::api-token-permission': AdminApiTokenPermission
      'admin::transfer-token': AdminTransferToken
      'admin::transfer-token-permission': AdminTransferTokenPermission
      'plugin::upload.file': PluginUploadFile
      'plugin::upload.folder': PluginUploadFolder
      'plugin::i18n.locale': PluginI18NLocale
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission
      'plugin::users-permissions.role': PluginUsersPermissionsRole
      'plugin::users-permissions.user': PluginUsersPermissionsUser
      'api::alert.alert': ApiAlertAlert
      'api::blog-post.blog-post': ApiBlogPostBlogPost
      'api::faq.faq': ApiFaqFaq
      'api::faq-category.faq-category': ApiFaqCategoryFaqCategory
      'api::footer.footer': ApiFooterFooter
      'api::general.general': ApiGeneralGeneral
      'api::homepage.homepage': ApiHomepageHomepage
      'api::inba-article.inba-article': ApiInbaArticleInbaArticle
      'api::inba-release.inba-release': ApiInbaReleaseInbaRelease
      'api::inba-tag.inba-tag': ApiInbaTagInbaTag
      'api::menu.menu': ApiMenuMenu
      'api::page.page': ApiPagePage
      'api::page-category.page-category': ApiPageCategoryPageCategory
      'api::page-subcategory.page-subcategory': ApiPageSubcategoryPageSubcategory
      'api::regulation.regulation': ApiRegulationRegulation
      'api::tag.tag': ApiTagTag
      'api::tax-administrators-list.tax-administrators-list': ApiTaxAdministratorsListTaxAdministratorsList
      'api::vzn.vzn': ApiVznVzn
    }
  }
}
