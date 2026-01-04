/**
 * pages-by-component controller
 */

export default {
  getComponents: async (ctx: any) => {
    try {
      const strapi = ctx.state.strapi
      const service = strapi.service('api::pages-by-component.pages-by-component')
      return await service.getComponents(strapi)
    } catch (error: any) {
      return ctx.internalServerError(
        `Failed to fetch components: ${error?.message || 'Unknown error'}`
      )
    }
  },

  getPagesByComponent: async (ctx: any) => {
    try {
      const strapi = ctx.state.strapi
      const { component } = ctx.query

      if (!component) {
        return ctx.badRequest('Component parameter is required')
      }

      const allPages = await strapi.documents('api::page.page').findMany({
        locale: 'sk',
        populate: {
          sections: true,
        },
      })

      const filteredPages = (allPages as any[])
        .filter((page) => {
          const sections = page.sections || []
          if (!Array.isArray(sections)) {
            return false
          }
          return sections.some((section: any) => section?.__component === component)
        })
        .map((page) => ({
          id: page.id,
          documentId: page.documentId,
          title: page.title || 'Untitled',
          locale: page.locale,
        }))

      return { pages: filteredPages }
    } catch (error: any) {
      return ctx.internalServerError(`Failed to fetch pages: ${error?.message || 'Unknown error'}`)
    }
  },
}
