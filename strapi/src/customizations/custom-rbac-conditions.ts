type PermissionSubject = 'api::page.page' | 'api::article.article'

export const customRbacConditions = [
  {
    displayName: 'Document adminGroupId includes starz',
    name: 'document-admin-group-includes-starz',
    // category (string, optional): conditions can be grouped into categories available in the admin panel; if undefined, the condition will appear under the "Default" category,
    plugin: 'content-manager',
    // The user object passed to handler is not typed unfortunately
    // See more: https://docs-v4.strapi.io/dev-docs/configurations
    handler: async (user: any) => {
      const entitiesWithStarzAdminGroup = await strapi
        .documents(user.permission.subject as PermissionSubject)
        .findMany({
          fields: ['id'],
          filters: {
            adminGroups: {
              adminGroupId: 'starz',
            },
          },
          populate: ['adminGroups'],
        })

      const entityIds = entitiesWithStarzAdminGroup?.map((entity: any) => entity.id) ?? []

      return { id: { $in: entityIds } }
    },
  },
]

// User object example:

// {
//   id: 29,
//     firstname: 'Developer',
//   lastname: 'Account',
//   username: null,
//   email: 'dev@debug.com',
//   password: '$2a$10$cC2sbJ0wmtV2vaOOTYMEPe/XUOWvuAelJBRK4cd6aQZkovzstewVa',
//   resetPasswordToken: null,
//   registrationToken: null,
//   isActive: true,
//   blocked: false,
//   preferedLanguage: null,
//   createdAt: '2022-07-14T05:22:00.761Z',
//   updatedAt: '2025-07-13T18:26:14.754Z',
//   documentId: 'ulofc6n1m0axc44kjf7oybqs',
//   locale: null,
//   publishedAt: '2025-07-09T12:03:54.397Z',
//   roles: [
//   {
//     id: 10,
//     name: 'Starz',
//     code: 'starz-md207wo9',
//     description: 'Vytvorené July 13th, 2025',
//     createdAt: '2025-07-13T18:24:41.769Z',
//     updatedAt: '2025-07-14T06:15:03.192Z',
//     documentId: 'rd59edquhmlucexkq2dj82g8',
//     locale: null,
//     publishedAt: '2025-07-13T18:24:41.770Z'
//   }
// ],
//   permission: {
//   actionParameters: {},
//   conditions: [ 'plugin::content-manager.document-admin-group-includes-starz' ],
//     properties: {
//     fields: [
//       'title',       'slug',
//       'perex',       'alias',
//       'coverMedia',  'tag',
//       'addedAt',     'content',
//       'files.title', 'files.media',
//       'gallery',     'adminGroups'
//     ],
//       locales: [ 'en', 'sk' ]
//   },
//   subject: 'api::article.article',
//     id: 3872,
//     action: 'plugin::content-manager.explorer.read'
// }
// }
