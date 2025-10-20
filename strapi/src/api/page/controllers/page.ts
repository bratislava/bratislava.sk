/**
 *  page controller
 */

import { factories } from '@strapi/strapi'
import { generateBreadcrumbs, getFullPathFromQuery } from '../../../utils/breadcrumbs'

// Based on Notum Strapi template: https://github.com/notum-cz/strapi-next-monorepo-starter/blob/953a65c51dd0c25c248f11a6a66cdb309ab670fe/apps/strapi/src/api/page/controllers/page.ts

export default factories.createCoreController(
  "api::page.page",
  ({ strapi }) => ({
    async find(ctx) {
      const { data, meta } = await super.find(ctx)

      const fullPath = getFullPathFromQuery(ctx)

      if (fullPath && data && data.length === 1) {
        // Create breadcrumbs only when a specific page is requested to avoid unnecessary processing

        meta.breadcrumbs = await generateBreadcrumbs(data[0], "api::page.page")
      }

      return { data, meta }
    },
  })
)
