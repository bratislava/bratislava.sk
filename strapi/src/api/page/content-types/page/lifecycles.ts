import { LifecycleEventType } from '../../../../../types/internals'
import { PAGES_HIERARCHY_ENABLED } from '../../../../utils/constants'
import { handleHierarchyBeforeCreate } from '../../../../utils/hierarchy'

// Based on Notum Strapi template: https://github.com/notum-cz/strapi-next-monorepo-starter/blob/1d556f0bdefd838b58e3ed31eb4c73e411ab1e88/apps/strapi/src/api/page/content-types/page/lifecycles.ts

export default {
  async beforeCreate(event: LifecycleEventType<"beforeCreate">) {
    if (PAGES_HIERARCHY_ENABLED) {
      await handleHierarchyBeforeCreate(event, "api::page.page")
    }
  },
}
