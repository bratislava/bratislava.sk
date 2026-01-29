/**
 * pages-by-component controller
 */

import type { Core } from '@strapi/strapi'
import type { Context } from 'koa'

type ControllerContext = Context & { state: { strapi: Core.Strapi } }

export default {
  getComponents: async (ctx: ControllerContext) => {
    const strapi = ctx.state.strapi
    const service = strapi.service('api::pages-by-component.pages-by-component')
    return await service.getComponents(strapi)
  },

  getPagesByComponent: async (ctx: ControllerContext) => {
    const strapi = ctx.state.strapi
    const { component, locale } = ctx.query
    const pagination = ctx.query.pagination as { page?: number | string; pageSize?: number | string } | undefined

    if (!component || typeof component !== 'string') {
      return ctx.badRequest('Component parameter is required')
    }

    const selectedLocale = typeof locale === 'string' ? locale : 'sk'
    const page = pagination?.page ? Number(pagination.page) : 1
    const pageSize = pagination?.pageSize ? Number(pagination.pageSize) : 10

    const allPages = await strapi.documents('api::page.page').findMany({
      locale: selectedLocale,
      populate: { sections: true },
    })

    const filteredPages = allPages
      .filter((pageItem) => {
        const sections = 'sections' in pageItem && Array.isArray(pageItem.sections) ? pageItem.sections : []
        return sections.some(
          (section) =>
            section &&
            typeof section === 'object' &&
            '__component' in section &&
            section.__component === component
        )
      })
      .map((pageItem) => {
        const slug = 'slug' in pageItem && typeof pageItem.slug === 'string' ? pageItem.slug : ''
        return {
          id: pageItem.id,
          documentId: pageItem.documentId,
          title: pageItem.title || 'Untitled',
          locale: pageItem.locale,
          path: slug ? `/${slug}` : '',
        }
      })

    const total = filteredPages.length
    const pageCount = Math.ceil(total / pageSize)
    const start = (page - 1) * pageSize

    return {
      pages: filteredPages.slice(start, start + pageSize),
      pagination: {
        page,
        pageSize,
        pageCount,
        total,
      },
    }
  },
}
