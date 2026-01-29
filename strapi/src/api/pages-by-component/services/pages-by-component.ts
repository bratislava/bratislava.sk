/**
 * pages-by-component service
 */

import type { Core, Data } from '@strapi/strapi'

type Component = {
  category: string
  name: string
  displayName: string
}

type ComponentsResponse = {
  components: Component[]
}

export default {
  getComponents: async (strapi: Core.Strapi): Promise<ComponentsResponse> => {
    const pageContentType = strapi.contentTypes['api::page.page']
    if (!pageContentType) {
      throw new Error('Page content type not found')
    }

    const sectionsAttribute = pageContentType.attributes.sections
    if (sectionsAttribute.type !== 'dynamiczone') {
      throw new Error('Sections field is not a dynamiczone')
    }

    const componentNames: unknown[] = sectionsAttribute.components || []
    if (!strapi.components) {
      return { components: [] }
    }

    const components: Component[] = componentNames
      .filter((name): name is string => typeof name === 'string' && name.includes('.'))
      .map((componentName: string) => {
        const [category, name] = componentName.split('.')
        const schema = strapi.components[componentName]
        if (!schema) {
          return null
        }
        return {
          category,
          name,
          displayName: schema.info.displayName || name,
        }
      })
      .filter((c): c is Component => c !== null)
      .sort((a, b) => a.displayName.localeCompare(b.displayName))

    return { components }
  },
}
