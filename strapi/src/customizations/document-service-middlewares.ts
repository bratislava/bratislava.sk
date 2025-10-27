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
  const STARZ_ARTICLE_TAG_TITLE = 'Šport' // Tag name to be added to starz articles on creation (works out of box on both locales)

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

        // TODO extract this as a function and unify with tags relation assignment
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

        // Add 'sport' tag if article is created
        if (context.uid === 'api::article.article') {
          const article = context.params.data
          try {
            const tagToAssign = await strapi.db.query('api::tag.tag').findOne({
              where: {
                title: { $eq: STARZ_ARTICLE_TAG_TITLE },
              },
            })

            if (!tagToAssign)
              console.log(`No tag with name ${STARZ_ARTICLE_TAG_TITLE} found in database`)

            console.log(JSON.stringify(article.tags))

            // TODO extract this as a function and unify with adminGroups relation assignment
            if (article.tags && 'connect' in article.tags) {
              // Some value(s) in tags already present
              article.tags = {
                ...article.tags,
                connect: [
                  // Take ids of previous tags and add new admin group
                  ...article.tags.connect.map((relationItem) => relationItem.documentId),
                  tagToAssign.documentId,
                ],
              }
            } else {
              // No values in tags relation, so we need to establish it
              article.tags = {
                ...article.tags,
                connect: [tagToAssign.documentId],
              }
            }

            article.tags = tagToAssign
          } catch (error) {
            console.log(
              `Failed to assign tag ${STARZ_ARTICLE_TAG_TITLE}
                to article with documentId: ${article.documentId}`
            )
            console.log(error)
          }
        }
      }
    }

    return next()
  })
}
