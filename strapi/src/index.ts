'use strict'

import { Core } from '@strapi/strapi'
import { registerDocumentServiceMiddlewares } from './customizations/document-service-middlewares'
import { bootstrapRevalidateWebhook } from './customizations/bootstrap-revalidate-webhook'
import { customRbacConditions } from './customizations/custom-rbac-conditions'

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */

  register({ strapi }: { strapi: Core.Strapi }) {
    registerDocumentServiceMiddlewares({ strapi })
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    console.log('Bootstrap function started')

    bootstrapRevalidateWebhook({ strapi })

    await strapi.admin.services.permission.conditionProvider.registerMany(customRbacConditions)
  },
}
