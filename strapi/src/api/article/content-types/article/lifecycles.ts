import { Attribute } from '@strapi/types'
import { Event } from '@strapi/database/dist/lifecycles'

type LifecycleEvent<T> = Event & {
  result?: T
}
type ArticleLifecycleEvent = LifecycleEvent<Attribute.GetValues<'api::article.article'>>

/**
 * TODO
 * - handle hardcoded strings better - maybe som config object is warranted
 * - we want to connect to a specific adminGroupId value, and also to an admin role
 * - make this more generic to allow more organizations in the future
 * - consider extracting some logic to avoid code duplicity across different content types
 */

type AdminGroupId = 'starz'

const getAdminGroup = async ({ adminGroupId }: { adminGroupId: AdminGroupId }) => {
  try {
    const adminGroups = await strapi.entityService.findMany('api::admin-group.admin-group', {
      filters: { adminGroupId },
    })

    if (!adminGroups?.length)
      throw new Error(`found no adminGroups for adminGroupId='${adminGroupId}'`)

    // adminGroupId has unique values, so we get at most one result
    return adminGroups[0]
  } catch (error) {
    console.log('getAdminGroup failed with error', error)
  }
}

export default {
  async afterCreate(event: ArticleLifecycleEvent) {
    const { result: article } = event

    const starzAdminGroup = await getAdminGroup({ adminGroupId: 'starz' })

    if (!starzAdminGroup) return

    const articleCreator = await strapi.entityService.findOne('admin::user', article.createdBy.id, {
      populate: 'roles',
    })

    // Return if creator role doesn't include starz
    // TODO consider a more robust validation, this is just a quick simple solution for a specific case
    if (
      !articleCreator.roles.some((role) => {
        return new RegExp(/starz/, 'i').test(role.name)
      })
    )
      return

    const existingGroupIds = article.adminGroups ? article.adminGroups.map((group) => group.id) : []

    // Don't add starz group ID if already present
    // TODO check if this is even needed - maybe appending an already existing id to the array will do no harm
    if (existingGroupIds.includes(starzAdminGroup.id)) {
      return
    }

    // Update the article with the new adminGroups relation
    await strapi.entityService.update('api::article.article', article.id, {
      data: {
        adminGroups: [...article.adminGroups.map((group) => group.id), starzAdminGroup.id],
      },
    })
  },
}
