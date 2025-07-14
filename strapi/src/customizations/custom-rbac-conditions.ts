// Docs: https://docs.strapi.io/cms/configurations/guides/rbac

export const customRbacConditions = [
  {
    displayName: 'Document adminGroupId includes starz',
    name: 'document-admin-group-includes-starz',
    // category (string, optional): conditions can be grouped into categories available in the admin panel; if undefined, the condition will appear under the "Default" category,
    plugin: 'content-manager',

    // Returns all documents which admin group relation contains "starz" admin group
    // See inspiration in "Has same role as creator" condition https://github.com/strapi/strapi/blob/6eead6e4f529117e9530242ce0356e111abacced/packages/core/admin/server/src/config/admin-conditions.ts#L18
    handler: async () => ({
      adminGroups: {
        $elemMatch: {
          adminGroupId: { $eq: 'starz' },
        },
      },
    }),
  },
]
