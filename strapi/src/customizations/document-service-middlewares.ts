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
  const STARZ_ADMINGROUP_ID = 'starz' // adminGroupId of AdminGroup collection in Strapi,
  const STARZ_ROLE_NAME_REGEX = 'starz' // Admin role name in Strapi
  const STARZ_ARTICLE_TAG_TITLE = 'Šport' // Tag name to be added to starz articles on creation

  strapi.documents.use(async (context, next) => {
    if (
      (context.uid === 'api::article.article' ||
        context.uid === 'api::page.page' ||
        context.uid === 'api::document.document' ||
        context.uid === 'api::faq.faq') &&
      context.action === 'create'
    ) {
      const adminGroup = await getAdminGroup({ adminGroupId: STARZ_ADMINGROUP_ID, strapi })

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

      // Check if document creator role includes starz
      if (
        activeUser.roles.some((role) => {
          return new RegExp(STARZ_ROLE_NAME_REGEX, 'i').test(role.name)
        })
      ) {
        // Add admingroup based on document creator
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

        // Add 'sport' tag if article is created
        if (context.uid === 'api::article.article') {
          const article = context.params.data
          try {
            const tagToAssign = await strapi.db.query('api::tag.tag').findOne({
              where: {
                title: { $eq: STARZ_ARTICLE_TAG_TITLE },
              },
            })

            if (!tagToAssign) console.log('No tag ' + STARZ_ARTICLE_TAG_TITLE + 'found in database')

            article.tag = tagToAssign
          } catch (error) {
            console.log(
              'Failed to assign tag' +
                STARZ_ARTICLE_TAG_TITLE +
                ' to article documentId: ' +
                article.documentId
            )
            console.log(error)
          }
        }
      }
    }

    return next()
  })
}
