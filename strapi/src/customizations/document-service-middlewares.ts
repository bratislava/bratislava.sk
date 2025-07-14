// Document Service middlewares docs: https://docs.strapi.io/cms/api/document-service/middlewares#context

import { Core } from '@strapi/strapi'

export const registerDocumentServiceMiddlewares = ({ strapi }: { strapi: Core.Strapi }) => {
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
}
