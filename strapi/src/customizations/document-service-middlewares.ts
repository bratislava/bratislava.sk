// Document Service middlewares docs: https://docs.strapi.io/cms/api/document-service/middlewares#context

import { Core } from '@strapi/strapi'

type AdminGroupId = 'starz'

const getAdminGroup = async ({
  adminGroupId,
  strapi,
}: {
  adminGroupId: AdminGroupId
  strapi: Core.Strapi
}) => {
  try {
    const adminGroups = await strapi.documents('api::admin-group.admin-group').findMany({
      filters: { adminGroupId },
    })

    if (adminGroups.length === 0) {
      console.log('no adminGroup with adminGroupId=' + adminGroupId + ' found')
    }

    // adminGroupId has unique values, so we get at most one result
    return adminGroups[0]
  } catch (error) {
    console.log('getAdminGroup failed with error', error)
  }
}

export const registerDocumentServiceMiddlewares = ({ strapi }: { strapi: Core.Strapi }) => {
  // TODO refactor to allow more adminGroup values
  const STARZ_ADMINGROUP_ID = 'starz' // Value of field adminGroupId of AdminGroup collection in Strapi,
  const STARZ_ROLE_NAME_REGEX = 'starz' // Admin role name in Strapi

  strapi.documents.use(async (context, next) => {
    if (
      (context.uid == 'api::article.article' || context.uid == 'api::page.page') &&
      context.action == 'create'
    ) {
      const adminGroup = await getAdminGroup({ adminGroupId: STARZ_ADMINGROUP_ID, strapi })

      const document = context.params.data
      const documentCreatorId = document.createdBy

      const documentCreatorUser = await strapi.db.query('admin::user').findOne({
        where: {
          id: documentCreatorId,
        },
        populate: {
          roles: true,
        },
      })

      // Check if document creator role includes starz - If yes, add starz to adminGroups
      if (
        documentCreatorUser.roles.some((role) => {
          console.log(JSON.stringify(role))
          return new RegExp(STARZ_ROLE_NAME_REGEX, 'i').test(role.name)
        })
      ) {
        if (document.adminGroups && 'connect' in document.adminGroups) {
          // Some value(s) in adminGroups already present
          document.adminGroups = {
            ...document.adminGroups,
            connect: [
              // Take ids of previous adminGroups and add new admin group
              ...document.adminGroups.connect.map((relationItem) => relationItem.documentId),
              adminGroup.documentId,
            ],
          }
        } else {
          // No values in adminGroups relation, so we need to establish it
          document.adminGroups = { ...document.adminGroups, connect: [adminGroup.documentId] }
        }
      }
    }

    return next()
  })
}
