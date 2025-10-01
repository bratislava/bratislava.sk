/**
 * internal-job controller
 */

import { factories } from '@strapi/strapi'

// Based on Notum Strapi template: https://github.com/notum-cz/strapi-next-monorepo-starter/blob/b1b128f44bc183e89affcb6d87dd3892629d69f7/apps/strapi/src/api/internal-job/controllers/internal-job.ts

export default factories.createCoreController(
  "api::internal-job.internal-job",
  ({ strapi }) => ({
    runRecalculateFullpathAll: async (ctx) => {
      // TODO: Add permission check

      const result = await strapi
        .service("api::internal-job.internal-job")
        .runAll("RECALCULATE_FULLPATH")

      return result
    },

    runCreateRedirectsAll: async (ctx) => {
      // TODO: Add permission check

      const result = await strapi
        .service("api::internal-job.internal-job")
        .runAll("CREATE_REDIRECT")

      return result
    },
  })
)
