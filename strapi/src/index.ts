'use strict'

import { Strapi } from '@strapi/types/dist/core'

type PermissionSubject = 'api::page.page' | 'api::article.article'

const conditions = [
  {
    displayName: 'Entity adminGroupId includes starz',
    name: 'entity-admin-group-includes-starz',
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

  register({ strapi }: { strapi: Strapi }) {
    type AdminGroupId = 'starz'

    const getAdminGroup = async ({ adminGroupId }: { adminGroupId: AdminGroupId }) => {
      try {
        const adminGroups = await strapi.documents('api::admin-group.admin-group').findMany({
          filters: { adminGroupId },
        })

        // adminGroupId has unique values, so we get at most one result
        return adminGroups[0]
      } catch (error) {
        console.log('getAdminGroup failed with error', error)
      }
    }

    // Document Service middlewares docs: https://docs.strapi.io/cms/api/document-service/middlewares#context
    strapi.documents.use(async (context, next) => {
      if (context.uid == 'api::article.article' && context.action == 'create') {
        // Todo refactor to better handle the hardcoded 'starz' string
        const starzAdminGroup = await getAdminGroup({ adminGroupId: 'starz' })

        if (!starzAdminGroup) {
          console.log('no starz admin group found')
        }

        const article = context.params.data
        const articleCreatorId = article.createdBy

        /**
         * Here I encountered some difficulties:
         * From context.params.data, I was able to retrieve only the id of its creator user
         * However, Only documentId can be queried through document API
         * So I used the Query Engine to get user by id
         */
        const articleCreator = await strapi.db.query('admin::user').findOne({
          where: {
            id: articleCreatorId,
          },
          populate: {
            roles: true,
          },
        })

        // Check if article creator role includes starz - If yes, add starz to adminGroups
        if (
          articleCreator.roles.some((role) => {
            // TODO refactor hardcoded 'starz' string
            return new RegExp(/starz/, 'i').test(role.name)
          })
        ) {
          if (article.adminGroups && 'connect' in article.adminGroups) {
            // Some value(s) in adminGroups already present
            article.adminGroups = {
              ...article.adminGroups,
              connect: [
                // Take ids of previous adminGroups
                ...article.adminGroups.connect.map((relationItem) => relationItem.documentId),
                // Append new admin group
                starzAdminGroup.documentId,
              ],
            }
          } else {
            // No values in adminGroups relation, so we need to establish it
            article.adminGroups = { ...article.adminGroups, connect: [starzAdminGroup.documentId] }
          }
        }
      }

      return next()
    })
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Strapi }) {
    // console.log('Bootstrap function started')
    //
    // // create Revalidate webhook according to this suggestion https://github.com/strapi/strapi/pull/20487#issuecomment-2482527848
    // const webhook = await strapi.db.query('webhook').findOne({
    //   where: {
    //     name: 'Bootstrapped Revalidate',
    //   },
    // })
    //
    // if (!webhook) {
    //   await strapi.webhookStore.createWebhook({
    //     id: 'Bootstrapped Revalidate',
    //     name: 'Bootstrapped Revalidate',
    //     url: `${process.env.REVALIDATE_NEXT_URL}/api/revalidate?secret=${process.env.REVALIDATE_SECRET_TOKEN}`,
    //     events: ['entry.create', 'entry.update', 'entry.publish'],
    //     headers: {},
    //     isEnabled: true,
    //   })
    //   console.log('Revalidate webhook created')
    // } else {
    //   console.log('Revalidate webhook already exists')
    // }
    //
    // await strapi.admin.services.permission.conditionProvider.registerMany(conditions)
  },
}
