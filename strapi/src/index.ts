'use strict'

import { Core } from '@strapi/strapi'
import { registerDocumentServiceMiddlewares } from './document-service-middlewares'

type PermissionSubject = 'api::page.page' | 'api::article.article'

const conditions = [
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

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */

  register({ strapi }: { strapi: Core.Strapi }) {
    registerDocumentServiceMiddlewares({ strapi })
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    console.log('Bootstrap function started')

    // create Revalidate webhook according to this suggestion https://github.com/strapi/strapi/pull/20487#issuecomment-2419729414
    const webhook = await strapi.db.query('strapi::webhook').findOne({
      where: {
        name: 'Bootstrapped Revalidate',
      },
    })

    if (!webhook) {
      strapi.get('webhookStore').createWebhook({
        id: 'Bootstrapped Revalidate',
        name: 'Bootstrapped Revalidate',
        url: `${process.env.REVALIDATE_NEXT_URL}/api/revalidate?secret=${process.env.REVALIDATE_SECRET_TOKEN}`,
        events: ['entry.create', 'entry.update', 'entry.publish'],
        headers: {},
        enabled: true,
      })
      console.log('Revalidate webhook created')
    } else {
      console.log('Revalidate webhook already exists')
    }

    await strapi.admin.services.permission.conditionProvider.registerMany(conditions)
  },
}
