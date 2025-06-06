'use strict'

import { Strapi } from '@strapi/strapi'

type PermissionSubject = 'api::page.page' | 'api::article.article'

const conditions = [
  {
    displayName: 'Entity adminGroupId includes starz',
    name: 'entity-admin-group-includes-starz',
    plugin: 'content-manager',
    // The user object passed to handler is not typed unfortunately
    // See more: https://docs-v4.strapi.io/dev-docs/configurations
    handler: async (user: any) => {
      const entitiesWithStarzAdminGroup = await strapi.entityService.findMany(
        user.permission.subject as PermissionSubject,
        {
          fields: ['id'],
          filters: {
            adminGroups: {
              adminGroupId: 'starz',
            },
          },
          populate: ['adminGroups'],
        }
      )

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
  /*

    register({ strapi }) {
    const extensionService = strapi.plugin('graphql').service('extension');

    extensionService.use(({ nexus }) => {
      const pageBySlug = nexus.extendType({
        type: "Query",
        definition(t) {
          //  myQuery definition
          t.field('pageBySlug', {
            // Response type
            type: 'Page',

            // Args definition
            args: { slug: 'String', locale: 'String' },

            // Resolver definition
            resolve(parent, args, ctx) {
              const { slug, locale } = args;
              console.log({slug,locale})
              return strapi.db.query('application::page.page').findOne({
                where: { slug, locale },
            });
            }
          });
        }
      });

      return { types: [pageBySlug] };
    });
  },

  */

  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Strapi }) {
    console.log('Bootstrap function started')

    // create Revalidate webhook according to this suggestion https://github.com/strapi/strapi/pull/20487#issuecomment-2482527848
    const webhook = await strapi.db.query('webhook').findOne({
      where: {
        name: 'Bootstrapped Revalidate',
      },
    })

    if (!webhook) {
      await strapi.webhookStore.createWebhook({
        id: 'Bootstrapped Revalidate',
        name: 'Bootstrapped Revalidate',
        url: `${process.env.REVALIDATE_NEXT_URL}/api/revalidate?secret=${process.env.REVALIDATE_SECRET_TOKEN}`,
        events: ['entry.create', 'entry.update', 'entry.publish'],
        headers: {},
        isEnabled: true,
      })
      console.log('Revalidate webhook created')
    } else {
      console.log('Revalidate webhook already exists')
    }

    await strapi.admin.services.permission.conditionProvider.registerMany(conditions)
  },
}
