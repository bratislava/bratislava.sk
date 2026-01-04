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
      const { component, locale } = ctx.query
      const pagination = ctx.query.pagination as
        | { page?: number | string; pageSize?: number | string }
        | undefined

      if (!component || typeof component !== 'string') {
        ctx.badRequest('Component parameter is required')
        return
      }

      const selectedLocale = typeof locale === 'string' ? locale : 'sk'
      const page = pagination?.page ? Number(pagination.page) : 1
      const pageSize = pagination?.pageSize ? Number(pagination.pageSize) : 10

      const allPages = await strapi.documents('api::page.page').findMany({
        locale: selectedLocale,
        populate: {
          sections: true,
        },
      })

      const filteredPages = allPages
        .filter((pageItem) => {
          const sections = 'sections' in pageItem ? pageItem.sections : undefined
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
        .map((pageItem) => ({
          id: pageItem.id,
          documentId: pageItem.documentId,
          title: pageItem.title || 'Untitled',
          locale: pageItem.locale,
        }))

      const total = filteredPages.length
      const pageCount = Math.ceil(total / pageSize)
      const start = (page - 1) * pageSize
      const end = start + pageSize
      const paginatedPages = filteredPages.slice(start, end)

      return {
        pages: paginatedPages,
        pagination: {
          page,
          pageSize,
          pageCount,
          total,
        },
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error'
      ctx.internalServerError(`Failed to fetch pages: ${message}`)
      throw error
    }
  },
}
