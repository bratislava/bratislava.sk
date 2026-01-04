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
      console.log(`No adminGroup with adminGroupId=${adminGroupId} found`)
    }

    // adminGroupId has unique values, so we get at most one result
    return adminGroups[0]
  } catch (error) {
    console.log('Function getAdminGroup failed with error: ', error)
  }
}

export const registerDocumentServiceMiddlewares = ({ strapi }: { strapi: Core.Strapi }) => {
  // TODO refactor to allow more adminGroup values
  const STARZ_ADMINGROUP_ID = 'starz' // adminGroupId of AdminGroup collection in Strapi,
  const STARZ_ROLE_NAME_REGEX = 'starz' // Admin role name in Strapi

  strapi.documents.use(async (context, next) => {
    if (
      (context.uid === 'api::article.article' ||
        context.uid === 'api::page.page' ||
        context.uid === 'api::document.document' ||
        context.uid === 'api::faq.faq') &&
      context.action === 'create'
    ) {
      const document = context.params.data
      const activeUserId = document.updatedBy

      const activeUser = await strapi.db.query('admin::user').findOne({
        where: {
          id: activeUserId,
        },
        populate: {
          roles: true,
        },
      })

      if (
        // Check if active user role includes starz
        activeUser.roles.some((role) => {
          return new RegExp(STARZ_ROLE_NAME_REGEX, 'i').test(role.name)
        })
      ) {
        // Assign adminGroup based on active user
        const adminGroupToAssign = await getAdminGroup({
          adminGroupId: STARZ_ADMINGROUP_ID,
          strapi,
        })

        // TODO extract this as a function
        if (document.adminGroups && 'connect' in document.adminGroups) {
          // Some value(s) in adminGroups already present
          document.adminGroups = {
            ...document.adminGroups,
            connect: [
              // Take ids of previous adminGroups and add new admin group
              ...document.adminGroups.connect.map((relationItem) => relationItem.documentId),
              adminGroupToAssign.documentId,
            ],
          }
        } else {
          // No values in adminGroups relation, so we need to establish it
          document.adminGroups = {
            ...document.adminGroups,
            connect: [adminGroupToAssign.documentId],
          }
        }
      }
    }

    return next()
  })
}
