/**
 * pages-by-component controller
 */

import type { Core } from '@strapi/strapi'
import type { Context } from 'koa'

type ControllerContext = Context & { state: { strapi: Core.Strapi } }

export default {
  getComponents: async (ctx: ControllerContext) => {
    try {
      const strapi = ctx.state.strapi
      const service = strapi.service('api::pages-by-component.pages-by-component')
      return await service.getComponents(strapi)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error'
      ctx.internalServerError(`Failed to fetch components: ${message}`)
      throw error
    }
  },

  getPagesByComponent: async (ctx: ControllerContext) => {
    try {
      const strapi = ctx.state.strapi
      const { component } = ctx.query

      if (!component || typeof component !== 'string') {
        ctx.badRequest('Component parameter is required')
        return
      }

      const allPages = await strapi.documents('api::page.page').findMany({
        locale: 'sk',
        populate: {
          sections: true,
        },
      })

      const filteredPages = allPages
        .filter((page) => {
          const sections = 'sections' in page ? page.sections : undefined
          if (!Array.isArray(sections)) {
            return false
          }
          return sections.some((section) => {
            return (
              section &&
              typeof section === 'object' &&
              '__component' in section &&
              section.__component === component
            )
          })
        })
        .map((page) => ({
          id: page.id,
          documentId: page.documentId,
          title: page.title || 'Untitled',
          locale: page.locale,
        }))

      return { pages: filteredPages }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error'
      ctx.internalServerError(`Failed to fetch pages: ${message}`)
      throw error
    }
  },
}
